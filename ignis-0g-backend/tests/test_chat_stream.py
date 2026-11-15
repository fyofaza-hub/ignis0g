import asyncio
import importlib
import json
from uuid import uuid4

import httpx
import pytest

from app.ai.llm import RemoteLLM
from app.ai.providers import JsonAPI, ProviderUnavailable
from app.ai.retrieval import Evidence
from app.ai.service import RagService
from app.ai.settings import RagSettings
from app.schemas.assistant import ChatRequest
from tests.rag_mocks import MockEmbedding


def sse(frame):
    return f"data: {json.dumps(frame)}\r\n\r\n".encode()


@pytest.mark.parametrize("finish", ["stop", "length", "error", None])
def test_provider_streams_only_answer_text_before_completion(finish):
    class Repository:
        async def has_chunks(self, request, revision):
            return True

        async def search(self, request, vector, revision, limit):
            return [Evidence(uuid4(), uuid4(), "test", "title", "https://example.org", "test", None)]

    async def run():
        chunks = []
        answer = 'La flamme perd de la chaleur.\nUne mesure de température aide à le vérifier. 🔬'
        head, tail = answer.split("\n")
        fragment = json.dumps(head, ensure_ascii=True)[:-1]
        last_fragment = json.dumps("\n" + tail, ensure_ascii=True)[1:]

        async def emit(text):
            chunks.append(text)

        class ResponseBody(httpx.AsyncByteStream):
            async def __aiter__(self):
                yield b": processing\r\n\r\n"
                for part in [
                    '{"status":"answered","basis":"general_knowledge","evidence_assessment":{"note":"internal"},',
                    '"answer":' + fragment,
                ]:
                    yield sse({"choices": [{"delta": {"content": part}}]})
                assert "".join(chunks) == head
                if finish == "error":
                    yield sse({"error": {"message": "upstream error"}})
                    return
                yield sse({"choices": [{"delta": {"content": last_fragment + ',"citation_indices":[]}'}}]})
                if finish is not None:
                    yield sse({"choices": [{"delta": {}, "finish_reason": finish}]})
                yield b"data: [DONE]\r\n\r\n"

        async def handle(request):
            payload = json.loads(request.content)
            assert payload["stream"] is True
            data = json.loads(payload["messages"][1]["content"])
            assert data["question"] == "Pourquoi la flamme s’éteint-elle ?"
            assert data["conversation"][0]["content"] == "Explain flame extinction."
            assert "directly in that language" in payload["messages"][0]["content"]
            return httpx.Response(200, headers={"content-type": "text/event-stream"}, stream=ResponseBody())

        async with httpx.AsyncClient(transport=httpx.MockTransport(handle)) as client:
            llm = RemoteLLM(JsonAPI(client, "https://openrouter.ai/api/v1", "mock", 2, 0), "test", 1000)
            rag = RagService(MockEmbedding(), None, llm, RagSettings(), Repository())
            request = ChatRequest(
                message="Pourquoi la flamme s’éteint-elle ?",
                history=[{"role": "user", "content": "Explain flame extinction."}],
            )
            if finish == "stop":
                result = await rag.ask(request, on_delta=emit)
                assert result.status == "answered" and result.answer.endswith(answer)
                assert "".join(chunks) == answer
            else:
                with pytest.raises(ProviderUnavailable):
                    await rag.ask(request, on_delta=emit)

    asyncio.run(run())


def test_provider_without_streaming_falls_back_to_one_json_response():
    requests = []

    async def handle(request):
        streaming = json.loads(request.content).get("stream", False)
        requests.append(streaming)
        if streaming:
            return httpx.Response(400)
        return httpx.Response(200, json={"choices": [{"finish_reason": "stop", "message": {
            "content": '{"status":"answered","answer":"Bonjour"}',
        }}]})

    async def emit(text):
        pytest.fail(f"Unexpected delta: {text}")

    async def run():
        async with httpx.AsyncClient(transport=httpx.MockTransport(handle)) as client:
            llm = RemoteLLM(JsonAPI(client, "https://example.test/v1", "mock", 2, 0), "test", 1000)
            result = await llm.generate_stream([], emit)
            assert result["answer"] == "Bonjour"

    asyncio.run(run())
    assert requests == [True, False]


@pytest.mark.parametrize('timeout', [False, True])
def test_chat_event_stream(monkeypatch, timeout):
    from app.ai.providers import ProviderTimeout
    from app.ai.service import insufficient_evidence

    main = importlib.import_module('app.main')

    async def ask_stub(payload, *, on_delta):
        await on_delta('First ')
        await on_delta('fragment')
        if timeout:
            raise ProviderTimeout()
        return insufficient_evidence(payload.message)

    monkeypatch.setattr(main, 'ask', ask_stub)
    monkeypatch.setattr(main, 'rate_windows', {})

    async def run():
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app=main.app), base_url='http://test') as client:
            invalid = await client.post('/api/v1/assistant/chat/stream', json={'message': ' '})
            assert invalid.status_code == 422
            response = await client.post('/api/v1/assistant/chat/stream', json={'message': 'Explain results'})
        assert response.status_code == 200
        assert response.headers['content-type'].startswith('text/event-stream')
        assert response.headers['x-accel-buffering'] == 'no'
        events = []
        for block in response.text.replace('\r\n', '\n').strip().split('\n\n'):
            fields = dict(line.split(': ', 1) for line in block.splitlines())
            events.append((fields['event'], json.loads(fields['data'])))
        assert events[0] == ('accepted', {'request_id': response.headers['x-request-id']})
        assert events[1:3] == [('delta', {'text': 'First '}), ('delta', {'text': 'fragment'})]
        assert len(events) == 4
        if timeout:
            assert events[-1][0] == 'error'
            assert events[-1][1]['error']['code'] == 'AI_TIMEOUT'
        else:
            assert events[-1][0] == 'result'
            assert events[-1][1]['status'] == 'insufficient_evidence'

    asyncio.run(run())


def test_closing_chat_stream_cancels_generation(monkeypatch):
    from starlette.requests import Request
    from app.schemas.assistant import ChatRequest

    main = importlib.import_module('app.main')

    async def run():
        cancelled = asyncio.Event()

        async def blocking_model(payload, *, on_delta):
            try:
                await on_delta('fragment')
                await asyncio.Future()
            finally:
                cancelled.set()

        monkeypatch.setattr(main, 'ask', blocking_model)
        request = Request({'type': 'http'})
        request.state.request_id = 'test'
        stream = main.chat_stream(ChatRequest(message='Explain results'), request)
        try:
            assert (await anext(stream)).event == 'accepted'
            assert (await asyncio.wait_for(anext(stream), timeout=1)).event == 'delta'
        finally:
            await stream.aclose()
        assert cancelled.is_set()

    asyncio.run(run())
