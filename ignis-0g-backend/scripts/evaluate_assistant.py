"""Run an explicit live acceptance check against a deployed API (uses model credits).

Automated checks measure contract/abstention/scope, not semantic truth. The report
includes a human review criterion per answer; do not call this a factual accuracy score.
"""
import argparse
import asyncio
import json
from pathlib import Path
import time

import httpx

from app.schemas.assistant import ChatResponse


async def evaluate(base_url: str, output: Path, delay: float):
    cases = json.loads((Path(__file__).resolve().parents[1] / 'evals/questions.json').read_text())
    results = []
    async with httpx.AsyncClient(timeout=50) as client:
        for index, case in enumerate(cases):
            if index:
                await asyncio.sleep(delay)
            started = time.monotonic()
            try:
                response = await client.post(base_url.rstrip('/') + '/api/v1/assistant/chat', json={
                    'message': case['message'], 'study_id': case['study_id'], 'scope': 'study',
                })
                response.raise_for_status()
                answer = ChatResponse.model_validate(response.json())
                checks = {
                    'expected_status': answer.status == case['expected_status'],
                    'citation_presence': bool(answer.citations) == (answer.status == 'answered'),
                    'scope': all(slug == case['study_id'] for slug in answer.related_study_ids),
                }
                result = {'id': case['id'], 'checks': checks, 'answer': answer.model_dump(mode='json'),
                          'human_review_required': case['review']}
            except (httpx.HTTPError, ValueError) as exc:
                # Avoid logging request bodies, credentials or environment configuration.
                result = {'id': case['id'], 'checks': {'request_succeeded': False}, 'error_type': type(exc).__name__}
            result['elapsed_ms'] = round((time.monotonic() - started) * 1000)
            results.append(result)
    report = {'kind': 'live_acceptance_not_factual_accuracy', 'cases': results,
              'passed': sum(all(r['checks'].values()) for r in results), 'total': len(results)}
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(f"Acceptance checks: {report['passed']}/{report['total']}; review answers in {output}")
    return 0 if report['passed'] == report['total'] else 1


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-url', required=True)
    parser.add_argument('--output', type=Path, default=Path('/tmp/ignis-assistant-evaluation.json'))
    parser.add_argument('--delay', type=float, default=13, help='Seconds between calls; respects the default 5/min API limit')
    args = parser.parse_args()
    if args.delay < 0:
        parser.error('--delay must be nonnegative')
    raise SystemExit(asyncio.run(evaluate(args.base_url, args.output, args.delay)))


if __name__ == '__main__':
    main()
