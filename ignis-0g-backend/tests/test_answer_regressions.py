import asyncio
from uuid import uuid4

import httpx
import pytest

from app.ai.llm import RemoteLLM
from app.ai.providers import JsonAPI, ProviderUnavailable
from app.ai.retrieval import Evidence, named_studies
from app.ai.service import RagService, ask, select_context, validate_answer, validate_comparison
from app.ai.settings import RagSettings
from app.schemas.assistant import ChatRequest
from tests.rag_mocks import MockEmbedding, MockLLM


def passage(slug, content="Synthetic observation", section="Results"):
    return Evidence(uuid4(), uuid4(), slug, slug, "https://example.org", content, section)


@pytest.mark.parametrize("answer,indices", [
    ("Both studies [2, 1]. Again [2].", [1, 2]),
    ("Both studies [1–2].", [1, 2]),
    ("One [2]. Two [1].", [1, 2]),
])
def test_valid_citation_formats_do_not_become_missing_evidence(answer, indices):
    evidence = [passage("alpha"), passage("beta")]
    result = validate_answer({"status": "answered", "answer": answer, "citation_indices": indices}, evidence, "Compare")
    assert result.status == "answered"
    assert len(result.citations) == 2
    assert "[1]" in result.answer and "[2]" in result.answer
    assert result.citations[0].chunk_id == evidence[indices[0] - 1 if "–" in answer else 1].chunk_id


@pytest.mark.parametrize("answer", ["Claim [1, 99].", "Claim [1–999999].", "Claim [1, 2](https://fake.test)."])
def test_citation_normalization_does_not_accept_invented_sources(answer):
    result = validate_answer({"status": "answered", "answer": answer, "citation_indices": [1, 2]}, [passage("alpha"), passage("beta")], "Question")
    assert not result.citations
    assert result.status == "insufficient_evidence"


def test_general_explanation_is_labelled_and_has_no_fake_citations():
    result = validate_answer({
        "status": "answered", "basis": "general_knowledge",
        "answer": "PI — руководитель исследования; Co-I — соисследователь.", "citation_indices": [],
    }, [passage("alpha")], "Кто такие PI и Co-I?")
    assert result.status == "answered"
    assert result.answer.startswith("Общие знания")
    assert "руководитель" in result.answer
    assert not result.citations and not result.related_study_ids


def test_general_explanation_cannot_borrow_an_unrelated_source():
    result = validate_answer({
        "status": "answered", "basis": "general_knowledge",
        "answer": "A general explanation [1].", "citation_indices": [1],
    }, [passage("alpha")], "Define a term")
    assert result.status == "insufficient_evidence"
    assert not result.citations


def test_inline_markers_remain_required_for_source_backed_claims():
    evidence = [passage("orion")]
    response = validate_answer({
        "status": "answered", "answer": "ORION included Alpha and Beta modules.",
        "citation_indices": [1],
    }, evidence, "Which modules were in ORION?")
    assert response.status == "insufficient_evidence"
    assert not response.citations


@pytest.mark.parametrize("indices", [[1, 4, 5, 3, 7, 6], [1, 4, 5, 3, 3], [1, 3], []])
def test_valid_inline_citations_are_authoritative_over_redundant_list(indices):
    evidence = [passage("overview", f"Synthetic section {i}") for i in range(7)]
    response = validate_answer({
        "status": "answered", "basis": "sources",
        "answer": "Program objectives [1, 4, 5]. Shared facility [3]. Six experiments [4].",
        "citation_indices": indices,
    }, evidence, "What were the program objectives and facilities?")
    assert response.status == "answered"
    assert [item.chunk_id for item in response.citations] == [evidence[i - 1].chunk_id for i in [1, 4, 5, 3]]
    assert response.answer == "Program objectives [1][2][3]. Shared facility [4]. Six experiments [2]."


def test_unknown_declared_source_is_still_rejected():
    result = validate_answer({"status": "answered", "answer": "Fact [1].", "citation_indices": [1, 99]}, [passage("alpha")], "Question")
    assert result.status == "insufficient_evidence" and not result.citations


def test_parenthetical_explanation_after_citation_is_not_a_forged_link():
    result = validate_answer({"status": "answered", "answer": "The shared facility [1] (used for both modules).", "citation_indices": [1]}, [passage("alpha")], "Question")
    assert result.status == "answered"


def test_invalid_response_is_not_reported_as_missing_scientific_information():
    result = validate_answer({"status": "answered", "answer": "Fact [99].", "citation_indices": [99]}, [passage("alpha")], "Question")
    assert result.status == "insufficient_evidence"
    assert "couldn’t find enough evidence" not in result.answer
    assert "verify" in result.answer.lower()


def test_greeting_replies_locally():
    async def run():
        ru = await ask(ChatRequest(message="Привет!"))
        en = await ask(ChatRequest(message="Hello"))
        assert ru.status == "answered" and "Привет!" in ru.answer and not ru.citations
        assert en.status == "answered" and "Hello!" in en.answer and not en.citations
    asyncio.run(run())


def test_new_question_does_not_inherit_previous_study():
    class Repository:
        async def has_chunks(self, request, revision):
            return True

        async def search(self, request, vector, revision, limit):
            return [passage("acme-program-overview")]

    async def run():
        llm = MockLLM([{"status": "answered", "answer": "Overview [1].", "citation_indices": [1]}])
        embedding = MockEmbedding()
        request = ChatRequest(
            message="Какие основные задачи решала серия экспериментов NASA ACME на МКС?",
            history=[{"role": "user", "content": "Кто руководил BASS?"}],
        )
        result = await RagService(embedding, None, llm, RagSettings(), Repository()).ask(request)
        assert result.status == "answered"
        assert embedding.queries == [request.message]
        assert len(llm.messages) == 1
    asyncio.run(run())


def test_query_rewrite_does_not_promote_a_previous_assistant_claim():
    import json
    from app.ai.prompts import rewrite_messages

    request = ChatRequest(message="Повтори этот вывод и найди подтверждение.", history=[
        {"role": "user", "content": "Что измеряли в TEST-A?"},
        {"role": "assistant", "content": "Масса уменьшилась на 73%, погрешность нулевая."},
    ])
    data = json.loads(rewrite_messages(request)[-1]["content"])
    assert "TEST-A" in json.dumps(data)
    assert "73%" not in json.dumps(data)
    assert data["question"] == request.message


def test_query_rewrite_preserves_numbers_explicitly_asked_by_the_user():
    import json
    from app.ai.prompts import rewrite_messages

    request = ChatRequest(message="Подтверждено ли снижение на 73%?", history=[
        {"role": "user", "content": "Что измеряли в TEST-A?"},
        {"role": "assistant", "content": "Ошибочное утверждение."},
    ])
    data = json.loads(rewrite_messages(request)[-1]["content"])
    assert data["question"] == "Подтверждено ли снижение на 73%?"


def test_comparison_keeps_each_named_study_despite_ranking():
    documents = [passage("acme-program-overview", f"Section {n}") for n in range(6)]
    documents += [passage("flex-1"), passage("bass-bass-ii")]
    selected = select_context(documents, 5, question="Сравни ACME, FLEX и BASS")
    assert {item.study_slug for item in selected} == {"acme-program-overview", "flex-1", "bass-bass-ii"}


def test_overview_is_selected_before_related_experiments():
    documents = [passage(slug) for slug in [
        "acme-cld-flame", "slice-acme-cld-precursor", "same-same-r",
        "acme-flame-design", "acme-cfi-g", "acme-program-overview-6-experiments",
    ]]
    selected = select_context(documents, 5, question="Какие основные задачи решала серия экспериментов NASA ACME?")
    assert selected[0].study_slug == "acme-program-overview-6-experiments"


def test_comparison_selects_requested_sections_before_publication_lists():
    documents = [passage(slug, f"{slug} {section}", section) for section in [
        "7. Официальные идентификаторы и публикации", "1. Общая информация и научная команда",
        "2. Экспериментальная установка (Hardware & Diagnostics)", "4. Ключевые физические явления и результаты",
    ] for slug in ["orion", "lyra"]]
    selected = select_context(documents, 4, question="Сравни ORION и LYRA по установке и результатам")
    assert {item.study_slug for item in selected} == {"orion", "lyra"}
    assert all("установка" in item.locator or "результаты" in item.locator for item in selected)


def test_explicit_experiment_names_are_not_replaced_with_family():
    slugs = [
        "acme-program-overview-6-experiments", "acme-bre", "acme-flame-design",
        "flex-1", "flex-2-cfi", "flex-2j-jaxa", "bass-bass-ii", "bass-m",
    ]
    assert named_studies("Укажи PI для ACME Flame Design и BRE", slugs) == ["acme-flame-design", "acme-bre"]
    assert named_studies("Сравни FLEX, FLEX-2 и FLEX-2J (JAXA)", slugs) == ["flex-1", "flex-2-cfi", "flex-2j-jaxa"]
    assert named_studies("Сравни ACME, FLEX и BASS", slugs) == [slugs[0], "flex-1", "bass-bass-ii"]


def test_llm_fallback_handles_primary_failure_and_parses_think_blocks():
    models = []

    def handler(request: httpx.Request) -> httpx.Response:
        import json
        payload = json.loads(request.content)
        models.append(payload["model"])
        if payload["model"] == "primary":
            return httpx.Response(503, json={"error": "overloaded"})
        return httpx.Response(200, json={
            "choices": [{
                "finish_reason": "stop",
                "message": {"content": '<think>reasoning</think>```json\n{"status": "answered", "answer": "Ok [1]."}\n```'},
            }]
        })

    async def run():
        async with httpx.AsyncClient(transport=httpx.MockTransport(handler)) as client:
            fallback = RemoteLLM(JsonAPI(client, "https://llm.alem.ai/v1", "mock", 2, 0), "secondary", 1024)
            llm = RemoteLLM(JsonAPI(client, "https://llm.alem.ai/v1", "mock", 2, 0), "primary", 1024, fallback=fallback)
            result = await llm.generate([{"role": "user", "content": "Hi"}])
            assert result == {"status": "answered", "answer": "Ok [1]."}
            assert models == ["primary", "secondary"]
    asyncio.run(run())


def test_primary_incomplete_completion_raises_and_triggers_fallback():
    def handler(request: httpx.Request) -> httpx.Response:
        import json
        payload = json.loads(request.content)
        if payload["model"] == "primary":
            return httpx.Response(200, json={"choices": [{"finish_reason": "content_filter", "message": {"content": "{}"}}]})
        return httpx.Response(503, json={})

    async def run():
        async with httpx.AsyncClient(transport=httpx.MockTransport(handler)) as client:
            fallback = RemoteLLM(JsonAPI(client, "https://llm.alem.ai/v1", "mock", 2, 0), "secondary", 1024)
            llm = RemoteLLM(JsonAPI(client, "https://llm.alem.ai/v1", "mock", 2, 0), "primary", 1024, fallback=fallback)
            with pytest.raises(ProviderUnavailable):
                await llm.generate([{"role": "user", "content": "Hi"}])
    asyncio.run(run())


def test_compare_normalizes_grouped_citations_while_preserving_inline_badges():
    evidence = [passage("flex-1", "21% O2 droplet"), passage("bass-ii", "18.7% O2 quench")]
    result = validate_comparison({
        "status": "answered",
        "summary": "Overview [2, 1].",
        "similarities": [{"text": "Both studied microgravity flames [2, 1].", "citation_indices": [2, 1]}],
        "differences": [],
        "limitations": ["Different setups and fuels."],
    }, evidence, focus="Compare", locale="en")
    assert result.status == "answered"
    assert result.summary == "Overview [1][2]."
    assert result.similarities[0].text == "Both studied microgravity flames [1][2]."
    assert result.similarities[0].citation_indices == [1, 2]
    assert [c.title for c in result.citations] == ["bass-ii", "flex-1"]


def test_named_retrieval_recovers_a_study_outside_vector_top_k(monkeypatch):
    from sqlalchemy.ext.asyncio import async_sessionmaker
    from app.ai import ingestion, retrieval
    from app.ai.embeddings import vector_parameter
    from app.core.database import engine
    from app.schemas.ingestion import Package
    from app.services.ingestion import import_package

    class Embedding(MockEmbedding):
        async def embed_documents(self, texts):
            return [self.vector if "ORION" in text else [0.0, 1.0] + [0.0] * 1022 for text in texts]

    async def run():
        async with engine.connect() as connection:
            transaction = await connection.begin()
            factory = async_sessionmaker(connection, expire_on_commit=False, join_transaction_mode="create_savepoint")
            monkeypatch.setattr(ingestion, "session_factory", factory)
            monkeypatch.setattr(retrieval, "session_factory", factory)
            try:
                await import_package(Package.model_validate({"schema_version": 1, "studies": [
                    {"slug": name.lower(), "title": name, "description": "Synthetic test", "category": "test", "sources": [
                        {"source_key": "report", "title": name, "url": "https://example.org", "source_type": "report",
                         "text_content": "\n".join(f"## {section}\n{name} synthetic fact {i}." for i, section in enumerate(["References", "Team", "Results", "Hardware", "Methods", "Other"]))}
                    ]} for name in ["ORION", "LYRA"]
                ]}), factory=factory)
                embedding = Embedding()
                settings = RagSettings()
                await ingestion.index_sources(embedding, settings)
                repository = retrieval.PgVectorRepository()
                revision = ingestion.index_revision(embedding, settings)
                vector = vector_parameter(embedding.vector)
                rows = await repository.search(ChatRequest(message="Compare ORION and LYRA hardware and results"), vector, revision, 4)
                assert len(rows) == 4 and len({row.chunk_id for row in rows}) == 4
                assert {row.study_slug for row in rows} == {"orion", "lyra"}
                assert all(row.locator in {"Results", "Hardware"} for row in rows)
                scoped = await repository.search(ChatRequest(message="Compare ORION and LYRA", study_id="orion"), vector, revision, 4)
                assert all(row.study_slug == "orion" for row in scoped)
                assert await repository.search(ChatRequest(message="ORION"), vector, "stale-revision", 4) == []
                selected = ["lyra", "orion", "missing"]
                assert await repository.indexed_studies(selected, revision) == {"lyra", "orion"}
                comparison = await repository.search_comparison(selected, "hardware", vector, revision, 2)
                assert {row.study_slug for row in comparison} == {"lyra", "orion"}
                assert all(row.locator == "Hardware" for row in comparison)
                assert await repository.indexed_studies(selected, "stale-revision") == set()
                assert await repository.search_comparison(["lyra"], "hardware", vector, revision, 1) == [
                    next(row for row in comparison if row.study_slug == "lyra")
                ]
            finally:
                await transaction.rollback()
        await engine.dispose()
    asyncio.run(run())


def test_english_prompts_avoid_cyrillic_and_set_explicit_response_language():
    import json
    import re
    from app.ai.prompts import build_compare_messages, build_messages, rewrite_messages
    from app.schemas.assistant import CompareRequest

    cyrillic = re.compile(r"[А-Яа-яЁё]")
    ru_evidence = [passage("flex-1", "Cool flame observed at 700 K.", "4. Ключевые физические явления")]

    chat_msgs = build_messages(
        ChatRequest(
            message="What did FLEX-1 observe?",
            history=[{"role": "user", "content": "Расскажи про FLEX-1"}],
        ),
        ru_evidence,
    )
    assert not cyrillic.search(chat_msgs[0]["content"])
    assert json.loads(chat_msgs[1]["content"])["response_language"] == "English"

    ru_msgs = build_messages(ChatRequest(message="Что наблюдали в FLEX-1?"), ru_evidence)
    assert json.loads(ru_msgs[1]["content"])["response_language"] == "Russian"

    rewrite_msgs = rewrite_messages(
        ChatRequest(
            message="Compare it with BRE",
            history=[{"role": "user", "content": "Что про FLEX-1?"}],
        )
    )
    assert json.loads(rewrite_msgs[1]["content"])["query_language"] == "English"

    cmp_en_msgs = build_compare_messages(
        CompareRequest(study_ids=["flex-1", "acme-bre"], focus="Compare flame regimes", locale="ru"),
        ru_evidence,
    )
    assert not cyrillic.search(cmp_en_msgs[0]["content"])
    assert json.loads(cmp_en_msgs[1]["content"])["response_language"] == "English"

    cmp_ru_msgs = build_compare_messages(
        CompareRequest(study_ids=["flex-1", "acme-bre"], focus=None, locale="ru"),
        ru_evidence,
    )
    assert json.loads(cmp_ru_msgs[1]["content"])["response_language"] == "Russian"


def test_english_requests_retry_if_model_replies_in_russian():
    from app.schemas.assistant import CompareRequest

    class Repository:
        async def has_chunks(self, request, revision):
            return True

        async def search(self, request, vector, revision, limit):
            return [passage("flex-1", "Steady cool flames (~700 K) in microgravity.")]

    class CompareRepo(Repository):
        async def indexed_studies(self, study_ids, revision):
            return set(study_ids)

        async def search_comparison(self, study_ids, query, vector, revision, limit):
            return [
                passage("flex-1", "FLEX-1 cool flame (~700 K)."),
                passage("acme-bre", "ACME BRE porous burner extinction."),
            ]

    async def run():
        chat_llm = MockLLM([
            {
                "status": "answered",
                "answer": "В FLEX-1 наблюдалось холодное пламя [1].",
                "citation_indices": [1],
                "suggested_questions": ["Какие условия были?"],
            },
            {
                "status": "answered",
                "answer": "FLEX-1 observed steady cool flames (~700 K) [1].",
                "citation_indices": [1],
                "suggested_questions": [
                    "Что ещё тестировали?",
                    "What fuels sustained the cool flame?",
                ],
            },
        ])
        chat_res = await RagService(MockEmbedding(), None, chat_llm, RagSettings(), Repository()).ask(
            ChatRequest(message="What did FLEX-1 observe?")
        )
        assert len(chat_llm.messages) == 2
        assert chat_res.status == "answered"
        assert "FLEX-1 observed steady cool flames" in chat_res.answer
        assert chat_res.suggested_questions == ["What fuels sustained the cool flame?"]

        cmp_llm = MockLLM([
            {
                "status": "answered",
                "summary": "FLEX-1 и BRE изучали затухание [1][2].",
                "similarities": [{"text": "Оба проводились в микрогравитации [1][2].", "citation_indices": [1, 2]}],
                "differences": [],
                "limitations": [],
            },
            {
                "status": "answered",
                "summary": "FLEX-1 and ACME BRE studied extinction regimes [1][2].",
                "similarities": [{"text": "Both ran in microgravity [1][2].", "citation_indices": [1, 2]}],
                "differences": [{"text": "FLEX-1 tested droplets whereas BRE used a porous burner [1][2].", "citation_indices": [1, 2]}],
                "limitations": ["Different fuel phases."],
            },
        ])
        cmp_res = await RagService(MockEmbedding(), None, cmp_llm, RagSettings(), CompareRepo()).compare(
            CompareRequest(study_ids=["flex-1", "acme-bre"], focus="Compare extinction regimes", locale="ru")
        )
        assert len(cmp_llm.messages) == 2
        assert cmp_res.status == "answered"
        assert "FLEX-1 and ACME BRE" in cmp_res.summary
        assert cmp_res.similarities[0].text.startswith("Both ran in microgravity")

    asyncio.run(run())


def test_repair_retry_recovers_from_uncited_measurement_without_leaking_cyrillic():
    class Repository:
        async def has_chunks(self, request, revision):
            return True

        async def search(self, request, vector, revision, limit):
            return [passage("bass-bass-ii-bass-m", "BASS-II PMMA rod O13a burned down to 13.6% O2 in 0g.")]

    async def run():
        repaired_llm = MockLLM([
            {
                "status": "answered",
                "basis": "sources",
                "answer": (
                    "The scenario targets 34% O2 at 56.5 kPa and 0.16g gravity.\n\n"
                    "BASS-II O13a burned down to 13.6% O2 in microgravity [1]."
                ),
                "citation_indices": [1],
                "suggested_questions": [],
            },
            {
                "status": "answered",
                "basis": "sources",
                "answer": (
                    "The selected scenario conditions lack direct 0.16g measurements.\n\n"
                    "BASS-II O13a burned down to 13.6% O2 in microgravity [1]."
                ),
                "citation_indices": [1],
                "suggested_questions": [],
            },
        ])
        res = await RagService(MockEmbedding(), None, repaired_llm, RagSettings(), Repository()).ask(
            ChatRequest(message="What evidence exists for 34% O2 at 56.5 kPa?")
        )
        assert len(repaired_llm.messages) == 2
        assert res.status == "answered"
        assert len(res.citations) == 1
        assert "13.6% O2" in res.answer

        cyrillic_repair_llm = MockLLM([
            {
                "status": "answered",
                "basis": "sources",
                "answer": (
                    "The selected scenario covers 34% O2 at 56.5 kPa.\n\n"
                    "BASS-II O13a burned at 13.6% O2 [1]."
                ),
                "citation_indices": [1],
                "suggested_questions": [],
            },
            {
                "status": "answered",
                "basis": "sources",
                "answer": "В BASS-II O13a горение наблюдалось при 13.6% O2 [1].",
                "citation_indices": [1],
                "suggested_questions": [],
            },
        ])
        rejected = await RagService(MockEmbedding(), None, cyrillic_repair_llm, RagSettings(), Repository()).ask(
            ChatRequest(message="Compare BASS-II O13a against 34% O2")
        )
        assert rejected.status == "insufficient_evidence"
        assert not rejected.citations
        assert "verify" in rejected.answer.lower()

        two_step_llm = MockLLM([
            {
                "status": "answered",
                "basis": "sources",
                "answer": (
                    "No experiment tested 34% O2 at 56.5 kPa directly.\n\n"
                    "BASS-II O13a burned down to 13.6% O2 [1].\n\n"
                    "Next step: check solid samples at 34% O2 and 56.5 kPa."
                ),
                "citation_indices": [1],
                "suggested_questions": [],
            },
            {
                "status": "answered",
                "basis": "sources",
                "answer": (
                    "No experiment tested the target lunar atmosphere directly.\n\n"
                    "BASS-II O13a burned down to 13.6% O2 [1].\n\n"
                    "Next step: check solid samples at 34% O2 and 56.5 kPa."
                ),
                "citation_indices": [1],
                "suggested_questions": [],
            },
            {
                "status": "answered",
                "basis": "sources",
                "answer": (
                    "No experiment tested the target lunar atmosphere directly.\n\n"
                    "BASS-II O13a burned down to 13.6% O2 [1].\n\n"
                    "Next step: test solid samples under the exploration atmosphere target."
                ),
                "citation_indices": [1],
                "suggested_questions": [],
            },
        ])
        recovered_2 = await RagService(MockEmbedding(), None, two_step_llm, RagSettings(), Repository()).ask(
            ChatRequest(message="Which findings apply to lunar habitats (34% O2)?")
        )
        assert len(two_step_llm.messages) == 3
        assert recovered_2.status == "answered"
        assert "13.6% O2" in recovered_2.answer

    asyncio.run(run())
