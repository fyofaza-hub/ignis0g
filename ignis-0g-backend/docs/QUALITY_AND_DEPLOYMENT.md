# Scientific quality and Linux deployment

The existing LLM, embedding and optional reranker integrations are preserved.
Use the purchased API credentials in the server's `.env`; no credentials belong in Git.

## Changes without a redesign

- FLEX now uses `initial_droplet_diameter_mm` and `burning_rate_constant_mm2_s`.
  `thickness_mm` and `spread_rate_mm_s` remain null for FLEX. BASS/Saffire retain
  their original physical meanings. Unknown measurements remain null.
- Legacy snapshot rows are converted by Alembic revision `0004_scientific_units`.
  API validation also accepts legacy FLEX inputs and emits canonical fields.
- SQL view `experiment_observations` exposes one row per run with study identity,
  source URL, locator and separate quantities. The JSONB catalog remains the
  canonical storage, so imports do not create unsynchronized duplicate tables.
- Every importer using `Package` validates run values and unique campaign/run IDs.
- Scenario scores still mean **independent range coverage**, not probability,
  confidence or fire risk. Formula: `100 * matched_parameters / 4`. The response
  includes version, reported parameter count, source/run counts, limitations and
  IDs of jointly reported runs. A joint run requires fixed oxygen, constant flow,
  reported pressure and matching microgravity conditions. Endpoint ranges are
  not interpolated; all material/setup limitations still apply.
- Comparison summaries and items require valid citations. Invalid indices,
  contradictory explicit/inline citations and HTML/link substitutions are rejected.
  This is structural grounding protection, not proof of semantic truth.
- Mock data must be explicitly enabled with `VITE_USE_MOCKS=true`. Production
  defaults to the live API.
- Forwarded addresses are accepted only from `TRUSTED_PROXY_CIDRS`. Empty means
  use the socket peer. Configure only the exact controlled proxy addresses/CIDRs,
  never `0.0.0.0/0`. A spoofed leftmost X-Forwarded-For cannot override an
  untrusted immediate client. The in-process limiter is bounded; nginx additionally
  shares a 30/minute-per-peer limit across its workers. Multiple independent API
  deployments still require a shared gateway/limiter.

## Server update

Back up the existing database before deploying. Do not restore a snapshot over a
populated database. From `ignis-0g-backend/`, with `.env` configured:

```sh
docker compose build
docker compose up -d --wait db
docker compose run --rm migrate
docker compose up -d --wait api
```

From the repository root rebuild the frontend:

```sh
docker compose up --build -d --wait
```

Deploy backend and frontend together: the export contract now has separate
unit-bearing fields. Migration changes JSON metadata, not source text or vector
contents, so it does not require paid re-embedding by itself. If updating KB text,
run the documented import/index workflow as usual. The frontend production nginx
config includes shared rate limiting and a 50-second assistant proxy timeout.

## Verification

CI is in **root** `.github/workflows/quality.yml`; a workflow nested inside the
backend directory is not discovered by GitHub for this monorepo. CI uses Python
3.12, PostgreSQL 17 + pgvector, Node 22 and runs frontend tests/build, all backend
tests, schema drift checks and migration upgrade/downgrade checks.

Backend regression tests include 336 run records, legacy migration, transaction
rollback, units, unknown values, source locators, joint-condition limits,
spoofed IP headers, citation rejection and provider failures. Frontend tests cover
record validation, export dimensions and CSV formula/quote escaping.

After configuring the purchased model and indexing the catalog, run:

```sh
python -m scripts.evaluate_assistant --base-url http://127.0.0.1:8000
```

This makes six model-backed requests and uses API credits. The default 13-second
spacing respects the default five-per-minute API limit. The JSON report in
`/tmp/ignis-assistant-evaluation.json` records status/citation/scope checks and
human review criteria. Review the answers against the cited NASA passages:
automated acceptance success is **not** a factual accuracy percentage. Questions
cover units, airflow, lunar extrapolation, missing facts, injection and Russian.

## Verification performed for this change

- Python 3.12.15, isolated PostgreSQL 16.2 with pgvector: **66 tests passed**.
- Alembic upgrade to head, schema drift check, downgrade to base and re-upgrade:
  passed. The legacy-unit migration is separately exercised with old JSON records.
- Frontend: **4 regression tests passed**, including validation of all 336 mock
  records; TypeScript checking and Vite production build passed.
- PostgreSQL 17 is configured in CI but that remote CI run has not been observed.
- Paid model calls, deployed nginx and the final Linux deployment have not been
  exercised here. The existing working database and its credentials were not changed.
