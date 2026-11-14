# IGNIS 0G workspace

The frontend uses the existing FastAPI service and PostgreSQL database from `ignis-0g-backend/compose.yaml`. The database already contains the imported research catalog; this workspace Compose file starts only the frontend.

## Start the full app

Start the backend database. The committed database snapshot can restore the current catalog on a fresh workspace before starting the API:

```sh
cd ignis-0g-backend
docker compose up -d --wait db
docker compose exec -T db pg_restore --no-owner --no-privileges -U ignis -d ignis < ../database-snapshots/ignis-20261114-185736.dump
docker compose up -d --wait api
```

Skip the restore command when the database already contains the catalog. Restore only into an empty database.

Then, from the workspace root, build and start the frontend:

```sh
docker compose up --build -d --wait
```

Open the app at <http://localhost:8080>. It requests live data from the existing API at `127.0.0.1:8000` through Nginx; the API docs are at <http://localhost:8000/docs>. The frontend container uses host networking to reach the already-running API. To stop just the frontend, run `docker compose stop` from this directory. Manage the backend and database from `ignis-0g-backend/` as usual.

## Local frontend development

With the backend already running, from the frontend directory:

```sh
cd ignis-0g-frontend
cp .env.example .env.local
npm ci
npm run dev
```

Vite serves the frontend at <http://localhost:5173> and proxies `/api` and `/health` to the backend. The local frontend environment file opts into the live API; mock mode remains available by setting `VITE_USE_MOCKS=true`.

The active database now contains 22 studies, 29 sources, 24 media records, and 237 indexed chunks. The 22 knowledge-base cards were already present; the 7 program overview pages and all 24 assets from `nasa-combustion-media-collection/` have now been added and indexed. Markdown is the canonical text copy; matching TXT and DOCX exports were not duplicated. The frontend serves local source files under `/nasa-content/` and renders attached NASA images in study details.

To repeat or refresh this supplemental import after changing the source material:

```sh
cd ignis-0g-backend
.venv/bin/python -m scripts.import_nasa_collection --dry-run
.venv/bin/python -m scripts.import_nasa_collection
docker compose exec -T api python -m scripts.index_sources
cd ..
docker compose up --build -d --wait
```

The importer adds pages and media to existing study IDs, so it can be rerun without duplicating them. LLM settings are managed by the existing backend Compose project, not this frontend-only Compose file.

## Refresh the research catalog after restoring a snapshot

The existing snapshot predates the scenario fields, the SPICE and DAFT cards, the SLICE modeling conditions, and the BASS-II / Saffire I–III run rows. Import the updated KB into the restored database. The importer keeps existing study IDs and upserts the catalog in a transaction. The following runs against the backend database from the workspace root using the host Python environment documented in the backend README:

```sh
cd ignis-0g-backend
.venv/bin/python -m scripts.import_nasa_kb ../nasa-fire-safety-kb --dry-run
.venv/bin/python -m scripts.import_nasa_kb ../nasa-fire-safety-kb
docker compose exec -T api python -m scripts.index_sources
```

The last command requires the configured embedding provider. The catalog, comparison table and scenario ranking work with PostgreSQL alone. The assistant requires an indexed catalog and model credentials in the backend's local `.env`.

The scenario score counts matches across four separately reported ranges (oxygen, pressure, airflow, gravity). Unknown fields remain unknown. A range match does not establish a jointly tested condition or a fire prediction. The SLICE card includes two published modeling configurations with separate fuel and air velocities.

After the import, open Explorer → Comparison to compare up to four individual runs. The view exports filtered or selected rows in CSV and JSON with units and source locators. The run data and transcription scope are documented in `nasa-fire-safety-kb/03_experiment_runs/README.md`.

## Workspace layout

- `ignis-0g-frontend/` — React, TypeScript, and Vite app.
- `ignis-0g-backend/` — FastAPI API, PostgreSQL migrations, and data import/indexing tools.
- `nasa-combustion-media-collection/` — research pages and associated NASA media.
- `compose.yaml` — starts the frontend and connects it to the existing API.
