import asyncio
import logging
import re
from time import monotonic
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, StrictInt, ValidationError

from app.ai.embeddings import vector_parameter
from app.ai.ingestion import index_revision
from app.ai.prompts import build_compare_messages, build_messages, rewrite_messages
from app.ai.providers import EmbeddingProvider, LLMProvider, ProviderUnavailable, RerankerProvider
from app.ai.retrieval import Evidence, PgVectorRepository, named_studies, section_pattern
from app.ai.settings import RagSettings, settings_from_env
from app.ai.wiring import configured_providers
from app.schemas.assistant import ChatRequest, ChatResponse, Citation, CompareItem, CompareRequest, CompareResponse


logger = logging.getLogger("uvicorn.error.rag")


class GroundedAnswer(BaseModel):
    model_config = ConfigDict(strict=True)
    status: Literal["answered", "insufficient_evidence"]
    basis: Literal["sources", "general_knowledge"] = "sources"
    answer: str
    citation_indices: list[int] = Field(default_factory=list)
    suggested_questions: object = None


class GroundedCompareItem(BaseModel):
    text: str
    citation_indices: list[StrictInt] = []


class GroundedComparison(BaseModel):
    status: Literal["answered", "insufficient_evidence"]
    summary: str = ""
    similarities: list[GroundedCompareItem] = []
    differences: list[GroundedCompareItem] = []
    limitations: list[str] = []


def insufficient_evidence(
    question: str = "", *, suggestions: list[str] | None = None,
) -> ChatResponse:
    russian = not question or bool(re.search(r"[А-Яа-яЁё]", question))
    message = (
        "В доступных источниках пока нет сведений, на которые можно опереться для ответа."
        if russian else "I couldn’t find enough evidence in the available sources to answer this question."
    )
    return ChatResponse(
        status="insufficient_evidence",
        answer=message,
        citations=[],
        related_study_ids=[],
        suggested_questions=suggestions or [],
    )


def invalid_answer(question: str, reason: str) -> ChatResponse:
    # Keep the public status contract, but distinguish validation failures
    # from missing scientific evidence in the user-facing message.
    logger.warning("rag stage=validation outcome=%s", reason)
    response = insufficient_evidence(question)
    response.answer = (
        "Не удалось проверить формат ответа и ссылки на источники. Повторите запрос."
        if not question or re.search(r"[А-Яа-яЁё]", question)
        else "Could not verify the answer format and source references. Please try again."
    )
    return response


def insufficient_evidence_compare(
    focus: str | None = None,
    locale: Literal["en", "ru"] | None = None,
) -> CompareResponse:
    russian = locale == "ru" or bool(focus and re.search(r"[А-Яа-яЁё]", focus))
    summary = (
        "В проиндексированных источниках недостаточно данных для прямого ИИ-сравнения выбранных экспериментов."
        if russian else "Insufficient indexed evidence to compare the selected experiments."
    )
    return CompareResponse(
        status="insufficient_evidence",
        summary=summary,
        similarities=[],
        differences=[],
        limitations=[],
        citations=[],
    )


class RagService:
    def __init__(
        self, embedding: EmbeddingProvider, reranker: RerankerProvider | None,
        llm: LLMProvider, settings: RagSettings, repository: PgVectorRepository,
    ):
        self.embedding = embedding
        self.reranker = reranker
        self.llm = llm
        self.settings = settings
        self.repository = repository

    async def ask(self, request: ChatRequest) -> ChatResponse:
        started = monotonic()
        revision = index_revision(self.embedding, self.settings)
        if not await self.repository.has_chunks(request, revision):
            logger.info("rag outcome=no_index")
            return insufficient_evidence(request.message)

        query = request.message
        if request.history and needs_rewrite(request.message):
            try:
                async with asyncio.timeout(2.5):
                    rewritten = await self.llm.generate(rewrite_messages(request))
            except (ProviderUnavailable, TimeoutError):
                logger.info("rag stage=rewrite outcome=fallback")
                rewritten = None
            previous = next((item.content for item in reversed(request.history) if item.role == "user"), "")
            query = (request.message + "\n" + previous[:500]).strip()
            if isinstance(rewritten, dict) and isinstance(rewritten.get("query"), str):
                candidate = rewritten["query"].strip()
                if 0 < len(candidate) <= 2000:
                    query = candidate

        if request.scenario:
            scenario = request.scenario
            query += (
                f" | Scenario: {scenario.o2_pct}% O2, {scenario.pressure_kpa:g} kPa, "
                f"{scenario.flow_cms:g} cm/s, {scenario.gravity_g:g}g"
                f"{', ' + scenario.fuel if scenario.fuel else ''}"
                f"{', ' + scenario.pillar if scenario.pillar else ''}"
            )

        logger.info("rag stage=embedding")
        vector = vector_parameter(await self.embedding.embed_query(query))
        search_request = request.model_copy(update={"message": query[:2000]})
        evidence = await self.repository.search(search_request, vector, revision, self.settings.candidate_limit)
        logger.info("rag stage=retrieval candidates=%d", len(evidence))
        if not evidence:
            return insufficient_evidence(request.message)
        if self.reranker:
            try:
                async with asyncio.timeout(2.5):
                    ranking = await self.reranker.rerank(query, evidence)
                if all(type(index) is int and 0 <= index < len(evidence) for index in ranking):
                    ranking = list(dict.fromkeys(ranking))
                    ranked = set(ranking)
                    evidence = [evidence[index] for index in ranking] + [
                        item for index, item in enumerate(evidence) if index not in ranked
                    ]
            except (ProviderUnavailable, TimeoutError):
                logger.info("rag stage=rerank outcome=fallback")

        context = select_context(
            evidence, self.settings.context_limit, question=query, diversify=request.scope == "global",
        )
        logger.info("rag stage=generation context_count=%d", len(context))
        result = validate_answer(await self.llm.generate(build_messages(request, context)), context, request.message)
        logger.info("rag outcome=%s citations=%d elapsed_ms=%d", result.status, len(result.citations), (monotonic() - started) * 1000)
        return result

    async def compare(self, request: CompareRequest) -> CompareResponse:
        started = monotonic()
        revision = index_revision(self.embedding, self.settings)
        query = (request.focus or "").strip() or (
            f"Compare experimental conditions, fuel, hardware, flame regimes, measured outcomes, "
            f"limitations, and fire safety implications: {', '.join(request.study_ids)}"
        )

        if hasattr(self.repository, "indexed_studies") and hasattr(self.repository, "search_comparison"):
            indexed = await self.repository.indexed_studies(request.study_ids, revision)
            if len(indexed) < 2:
                logger.info("rag compare outcome=no_index")
                return insufficient_evidence_compare(request.focus, request.locale)
            vector = vector_parameter(await self.embedding.embed_query(f"{', '.join(request.study_ids)}: {query}"))
            candidate_limit = max(self.settings.candidate_limit, len(request.study_ids) * 4)
            evidence = await self.repository.search_comparison(
                request.study_ids, query, vector, revision, candidate_limit,
            )
            if len({item.study_slug for item in evidence}) < 2:
                return insufficient_evidence_compare(request.focus, request.locale)
            interleaved = evidence
        else:
            scoped_requests = [
                ChatRequest(message=query[:2000], study_id=slug, scope="study")
                for slug in request.study_ids
            ]
            if not any([await self.repository.has_chunks(req, revision) for req in scoped_requests]):
                logger.info("rag compare outcome=no_index")
                return insufficient_evidence_compare(request.focus, request.locale)

            vector = vector_parameter(await self.embedding.embed_query(query))
            per_study_limit = max(3, self.settings.candidate_limit // len(request.study_ids))
            buckets = [
                await self.repository.search(req, vector, revision, per_study_limit)
                for req in scoped_requests
            ]
            interleaved = []
            max_len = max((len(b) for b in buckets), default=0)
            for i in range(max_len):
                for b in buckets:
                    if i < len(b):
                        interleaved.append(b[i])
            if any(not bucket for bucket in buckets):
                return insufficient_evidence_compare(request.focus, request.locale)

        if self.reranker and request.focus:
            try:
                async with asyncio.timeout(2.5):
                    ranking = await self.reranker.rerank(query, interleaved)
                if all(type(index) is int and 0 <= index < len(interleaved) for index in ranking):
                    ranking = list(dict.fromkeys(ranking))
                    ranked = set(ranking)
                    interleaved = [interleaved[index] for index in ranking] + [
                        item for index, item in enumerate(interleaved) if index not in ranked
                    ]
            except (ProviderUnavailable, TimeoutError):
                logger.info("rag compare stage=rerank outcome=fallback")

        context_limit = max(self.settings.context_limit, len(request.study_ids) * 2)
        context = select_context(
            interleaved, context_limit, question=f"{' '.join(request.study_ids)} {query}", diversify=True,
        )
        raw = await self.llm.generate(build_compare_messages(request, context))
        result = validate_comparison(raw, context, request.focus, request.locale)
        logger.info("rag compare outcome=%s citations=%d elapsed_ms=%d", result.status, len(result.citations), (monotonic() - started) * 1000)
        return result


async def ask(request: ChatRequest) -> ChatResponse:
    if request.study_id is None:
        message = request.message.casefold().rstrip(".!?…").rstrip()
        if message in {"привет", "здравствуй", "здравствуйте", "доброе утро", "добрый день", "добрый вечер"}:
            greeting = "Привет! Чем помочь? Можно спросить об экспериментах NASA или горении в микрогравитации."
        elif message in {"hi", "hello", "hey", "good morning", "good afternoon", "good evening"}:
            greeting = "Hello! How can I help? Ask me about NASA experiments or combustion in microgravity."
        else:
            greeting = None

        if greeting is not None:
            return ChatResponse(
                status="answered",
                answer=greeting,
                citations=[],
                related_study_ids=[],
                suggested_questions=[],
            )

    settings = settings_from_env()
    async with configured_providers(settings) as (embedding, reranker, llm):
        return await RagService(embedding, reranker, llm, settings, PgVectorRepository()).ask(request)


async def compare(request: CompareRequest) -> CompareResponse:
    settings = settings_from_env()
    async with configured_providers(settings) as (embedding, reranker, llm):
        return await RagService(embedding, reranker, llm, settings, PgVectorRepository()).compare(request)


def needs_rewrite(question: str) -> bool:
    return bool(re.search(
        r"\b(это|этот|этом|этого|эти|этим|они|оно|их|его|такой|такие|там|выше|"
        r"it|its|they|them|those|that|this|these)\b|"
        r"^(?:а |и )?(?:почему[?!.]*|подробнее[?!.]*|объясни проще[?!.]*|продолжи[?!.]*)$|"
        r"^(?:simplify|elaborate|continue)\b",
        question.casefold().strip(),
    ))


def select_context(
    evidence: list[Evidence], limit: int, *, question: str = "", diversify: bool = False,
) -> list[Evidence]:
    pattern = section_pattern(question) if question else r"a^"
    if question:
        evidence = sorted(evidence, key=lambda item: not re.search(pattern, item.locator or "", re.I))
    targets = named_studies(question, [item.study_slug for item in evidence]) if question else []
    groups = [[item for item in evidence if item.study_slug == slug] for slug in targets]
    # Reserve context for every requested study, even after reranking. Cycle
    # through their sections so one study cannot crowd out the comparison.
    priority = [group[i] for i in range(max(map(len, groups), default=0)) for group in groups if i < len(group)]
    selected = []
    deferred = []
    seen_passages = set()
    seen_studies = set()
    for item in priority + evidence:
        key = (item.study_slug, " ".join(item.excerpt.casefold().split()))
        if key in seen_passages:
            continue
        seen_passages.add(key)
        if diversify and not targets and item.study_slug in seen_studies:
            deferred.append(item)
        else:
            selected.append(item)
            seen_studies.add(item.study_slug)
        if len(selected) == limit:
            break
    return (selected + deferred)[:limit]


def suggested_questions(raw: object, current_question: str) -> list[str]:
    if not isinstance(raw, list):
        return []
    questions = []
    seen = {" ".join(current_question.casefold().split())}
    for item in raw:
        if not isinstance(item, str):
            continue
        question = " ".join(item.split())
        if (
            not 5 <= len(question) <= 160
            or not question.endswith(("?", "？", "؟"))
            or re.search(r"[<>\[\]`]|://", question)
        ):
            continue
        key = question.casefold()
        if key in seen:
            continue
        seen.add(key)
        questions.append(question)
        if len(questions) == 2:
            break
    return questions


def normalize_citations(answer: str, count: int) -> str:
    def replace(match: re.Match) -> str:
        indices = []
        for group in match[1].split(","):
            parts = re.split(r"\s*[-–]\s*", group.strip())
            if len(parts) > 2 or not all(part.isdecimal() for part in parts):
                raise ValueError("Invalid citation")
            start, end = int(parts[0]), int(parts[-1])
            if not 1 <= start <= end <= count:
                raise ValueError("Citation outside retrieved evidence")
            indices.extend(range(start, end + 1))
        return "".join(f"[{index}]" for index in dict.fromkeys(indices))

    # Normalize grouped and ranged references before checking their IDs; never
    # remove invalid IDs to make an unsupported response appear grounded.
    return re.sub(r"\[([0-9][0-9,\s–-]*)\]", replace, answer)


def validate_answer(raw: object, evidence: list[Evidence], question: str) -> ChatResponse:
    try:
        result = GroundedAnswer.model_validate(raw)
    except ValidationError:
        return invalid_answer(question, "invalid_response_shape")

    suggestions = suggested_questions(result.suggested_questions, question)
    if result.status == "insufficient_evidence":
        return insufficient_evidence(question, suggestions=suggestions)

    answer = result.answer.strip()
    try:
        answer = normalize_citations(answer, len(evidence))
    except ValueError:
        return invalid_answer(question, "citation_out_of_range")

    markers = list(dict.fromkeys(re.findall(r"\[([0-9]+)\]", answer)))
    indices = list(dict.fromkeys(result.citation_indices))
    if result.basis == "general_knowledge":
        if not answer or indices or markers or re.search(r"<(?:/?[A-Za-z]|!--)", answer):
            return invalid_answer(question, "ungrounded_general_answer")
        label = (
            "Общие знания — пояснение вне загруженных исследований."
            if not question or re.search(r"[А-Яа-яЁё]", question)
            else "General knowledge — explanation outside the uploaded studies."
        )
        return ChatResponse(
            status="answered",
            answer=f"{label}\n\n{answer}",
            citations=[],
            related_study_ids=[],
            suggested_questions=suggestions,
        )

    valid_markers = {str(index) for index in range(1, len(evidence) + 1)}
    reason = None
    if not answer:
        reason = "empty_answer"
    elif re.search(r"<(?:/?[A-Za-z]|!--)", answer):
        reason = "html_in_answer"
    elif not markers:
        reason = "no_citations"
    elif any(marker not in valid_markers for marker in markers) or any(
        not 1 <= index <= len(evidence) for index in indices
    ):
        reason = "invalid_citation_indices"
    elif re.search(r"\[[0-9]+\]\([^\n)]*\)|(?m:^\s{0,3}\[[0-9]+\]:)", answer):
        reason = "linked_citation"
    elif any(
        len(block.strip()) > 35
        and not block.strip().startswith("#")
        and not block.strip().endswith(":")
        and not re.search(r"\[[0-9]+\]", block)
        and re.search(r"\b\d+(?:[.,]\d+)?\s*(?:%|атм|кПа|мм²/с|мм/с|см/с|atm|kPa|mm²/s|mm/s|cm/s)(?!\w)", block, re.I)
        for block in re.split(r"\n+", answer)
    ):
        reason = "uncited_measurement"
    if reason:
        return invalid_answer(question, reason)

    cited = [evidence[int(marker) - 1] for marker in markers]
    renumber = {marker: str(number) for number, marker in enumerate(markers, start=1)}
    answer = re.sub(r"\[([0-9]+)\]", lambda match: f"[{renumber[match[1]]}]", answer)
    citations = [
        Citation(
            chunk_id=item.chunk_id, source_id=item.source_id, title=item.title,
            url=item.url, excerpt=item.excerpt, locator=item.locator,
        )
        for item in cited
    ]
    return ChatResponse(
        status="answered",
        answer=answer,
        citations=citations,
        related_study_ids=list(dict.fromkeys(item.study_slug for item in cited)),
        suggested_questions=suggestions,
    )


def validate_comparison(
    raw: object,
    evidence: list[Evidence],
    focus: str | None = None,
    locale: Literal["en", "ru"] | None = None,
) -> CompareResponse:
    try:
        result = GroundedComparison.model_validate(raw)
    except ValidationError:
        logger.info("rag compare stage=validation outcome=invalid_response_shape")
        return insufficient_evidence_compare(focus, locale)
    if result.status == "insufficient_evidence":
        return insufficient_evidence_compare(focus, locale)

    summary = result.summary.strip()
    if not summary or re.search(r"<(?:/?[A-Za-z]|!--)", summary):
        return insufficient_evidence_compare(focus, locale)
    try:
        summary = normalize_citations(summary, len(evidence))
    except ValueError:
        return insufficient_evidence_compare(focus, locale)
    if re.search(r"\[[0-9]+\]\([^\n)]*\)|(?m:^\s{0,3}\[[0-9]+\]:)", summary):
        return insufficient_evidence_compare(focus, locale)

    valid = range(1, len(evidence) + 1)
    used_indices: list[int] = []

    def collect_inline(text: str) -> list[int]:
        return [int(m) for m in re.findall(r"\[([0-9]+)\]", text)]

    summary_idxs = collect_inline(summary)
    if not summary_idxs or any(i not in valid for i in summary_idxs):
        return insufficient_evidence_compare(focus, locale)
    for i in summary_idxs:
        if i not in used_indices:
            used_indices.append(i)

    def normalize_items(items: list[GroundedCompareItem]) -> list[tuple[str, list[int]]] | None:
        normalized: list[tuple[str, list[int]]] = []
        for item in items:
            text = item.text.strip()
            if not text or re.search(r"<(?:/?[A-Za-z]|!--)", text):
                return None
            try:
                text = normalize_citations(text, len(evidence))
            except ValueError:
                return None
            if re.search(r"\[[0-9]+\]\([^\n)]*\)|(?m:^\s{0,3}\[[0-9]+\]:)", text):
                return None
            inline = collect_inline(text)
            explicit = list(dict.fromkeys(item.citation_indices))
            combined = explicit or inline
            if not inline or not combined or any(i not in valid for i in inline) or any(i not in valid for i in combined):
                return None
            for i in dict.fromkeys([*inline, *combined]):
                if i not in used_indices:
                    used_indices.append(i)
            normalized.append((text, list(dict.fromkeys(combined))))
        return normalized

    sim_raw = normalize_items(result.similarities)
    diff_raw = normalize_items(result.differences)
    if sim_raw is None or diff_raw is None or (not sim_raw and not diff_raw):
        return insufficient_evidence_compare(focus, locale)

    limitations: list[str] = []
    for lim in result.limitations:
        if not isinstance(lim, str):
            return insufficient_evidence_compare(focus, locale)
        cleaned = lim.strip()
        if not cleaned:
            continue
        if re.search(r"<(?:/?[A-Za-z]|!--)|\[[0-9]+", cleaned):
            return insufficient_evidence_compare(focus, locale)
        limitations.append(cleaned)

    renumber = {old: new for new, old in enumerate(used_indices, start=1)}

    def rewrite_item(text: str, idxs: list[int]) -> CompareItem:
        rewritten = re.sub(
            r"\[([0-9]+)\]",
            lambda m: f"[{renumber[int(m[1])]}]" if int(m[1]) in renumber else "",
            text,
        ).strip()
        return CompareItem(
            text=rewritten,
            citation_indices=[renumber[i] for i in idxs if i in renumber],
        )

    citations = [
        Citation(
            chunk_id=evidence[idx - 1].chunk_id,
            source_id=evidence[idx - 1].source_id,
            title=evidence[idx - 1].title,
            url=evidence[idx - 1].url,
            excerpt=evidence[idx - 1].excerpt,
            locator=evidence[idx - 1].locator,
        )
        for idx in used_indices
    ]

    return CompareResponse(
        status="answered",
        summary=rewrite_item(summary, []).text,
        similarities=[rewrite_item(t, idxs) for t, idxs in sim_raw],
        differences=[rewrite_item(t, idxs) for t, idxs in diff_raw],
        limitations=limitations,
        citations=citations,
    )
