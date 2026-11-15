from __future__ import annotations

import json
import logging
import re
from collections.abc import Sequence
from urllib.parse import urlsplit

from app.ai.providers import JsonAPI, Message, ProviderUnavailable

logger = logging.getLogger("uvicorn.error.rag")


def _parse_json_object(raw: str) -> object:
    cleaned = re.sub(r"<think>[\s\S]*?</think>", "", raw, flags=re.I).strip()
    fence = re.match(r"^```(?:json)?\s*([\s\S]*?)\s*```$", cleaned, flags=re.I)
    if fence:
        cleaned = fence.group(1).strip()
    try:
        return json.loads(cleaned)
    except ValueError:
        start = cleaned.find("{")
        end = cleaned.rfind("}")
        if start != -1 and end > start:
            return json.loads(cleaned[start : end + 1])
        raise


class RemoteLLM:
    def __init__(
        self,
        api: JsonAPI,
        model: str,
        max_output_tokens: int,
        *,
        fallback: RemoteLLM | None = None,
    ):
        self.api = api
        self.model = model
        self.max_output_tokens = max_output_tokens
        self.fallback = fallback

    async def generate(self, messages: Sequence[Message]) -> object:
        try:
            return await self._generate(messages)
        except ProviderUnavailable as error:
            if self.fallback is None:
                raise
            logger.info("rag stage=generation outcome=fallback error=%s", type(error).__name__)
            return await self.fallback.generate(messages)

    async def _generate(self, messages: Sequence[Message]) -> object:
        if not self.model:
            raise ProviderUnavailable("Chat model is missing")
        payload = {
            "model": self.model,
            "messages": list(messages),
            "max_tokens": self.max_output_tokens,
            "temperature": 0.2,
        }
        if urlsplit(self.api.base_url).hostname == "openrouter.ai":
            payload["reasoning"] = {"enabled": False}
            payload["response_format"] = {"type": "json_object"}
            payload["provider"] = {"sort": "latency", "require_parameters": True}
        response = await self.api.post("/chat/completions", payload)
        try:
            choice = response["choices"][0]
            if choice["finish_reason"] == "length":
                raise ProviderUnavailable("Chat response exceeded the output token limit")
            if choice["finish_reason"] not in {"stop", "end_turn"}:
                logger.info("rag stage=generation outcome=incomplete_completion")
                raise ProviderUnavailable("Chat response ended before completion")
            content = choice["message"]["content"].strip()
            result = _parse_json_object(content)
            if not isinstance(result, dict):
                raise ValueError("Expected JSON object")
            return result
        except ProviderUnavailable:
            raise
        except (ValueError, KeyError, TypeError, AttributeError, IndexError):
            logger.info("rag stage=generation outcome=invalid_completion_json")
            raise ProviderUnavailable("Invalid chat response") from None
