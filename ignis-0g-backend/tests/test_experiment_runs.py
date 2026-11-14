import asyncio
from pathlib import Path

import pytest
from httpx import ASGITransport, AsyncClient
from pydantic import ValidationError

from app.main import app
from app.repositories import catalog
from app.schemas.experiment_run import ExperimentRun
from scripts.import_nasa_kb import load_package


def test_published_run_sources_and_ordering(monkeypatch):
    package = load_package(Path(__file__).resolve().parents[2] / "nasa-fire-safety-kb")
    studies = {study.slug: study for study in package.studies}

    async def runs(slug):
        return studies[slug].conditions.get("experiment_runs", [])

    monkeypatch.setattr(catalog, "experiment_runs", runs)

    async def run():
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            bass = await client.get("/api/v1/studies/bass-bass-ii-bass-m/runs")
            saffire = await client.get("/api/v1/studies/saffire-i-iii/runs")
            flex1 = await client.get("/api/v1/studies/flex-1/runs")
            sofie = await client.get("/api/v1/studies/sofie-mist/runs")
            bre = await client.get("/api/v1/studies/acme-bre/runs")
            assert bass.status_code == saffire.status_code == flex1.status_code == sofie.status_code == bre.status_code == 200
            assert len(bass.json()) == 47
            assert len(saffire.json()) == 13
            assert len(flex1.json()) == 276
            assert sofie.json() == []
            assert bre.json() == []

            flex_035 = next(row for row in flex1.json() if row["run_id"] == "FLEX-035")
            assert flex_035["airflow_cms"] == [0.0]
            assert flex_035["direction"] == "quiescent"
            assert flex_035["oxygen_vol_pct"] == [21.0]
            assert flex_035["outcome"] == "extinction"
            assert flex_035["source_url"].endswith("/20150023456")
            assert "Table IX" in flex_035["locator"]
            m8 = next(row for row in bass.json() if row["run_id"] == "M8")
            assert m8["airflow_cms"] == [10, 6, 5]
            assert m8["spread_rate_mm_s"] == [0.057, 0.056, 0.04]
            assert m8["oxygen_vol_pct"] == [19.1, 18.2]
            assert m8["source_url"].endswith("/20210011385")
            assert "Table 5.1" in m8["locator"]

            blowoff = next(row for row in bass.json() if row["run_id"] == "GMT190-T21")
            assert blowoff["airflow_cms"] == [11, 47]
            assert blowoff["airflow_basis"] == "start_end"
            assert blowoff["spread_rate_mm_s"] is None
            with pytest.raises(ValidationError):
                ExperimentRun.model_validate({**blowoff, "spread_rate_mm_s": [1, 2]})

            sample = next(row for row in saffire.json() if row["run_id"] == "II-1")
            assert sample["outcome"] == "no_propagation"
            assert sample["spread_rate_mm_s"] is None
            assert sample["burn_duration_s"] is None
            assert sample["source_url"].endswith("/20180005168")

            sl = await client.get("/api/v1/studies/slice-acme-cld-precursor/runs")
            assert sl.status_code == 200 and sl.json() == []

    asyncio.run(run())
