import asyncio
from pathlib import Path

from httpx import ASGITransport, AsyncClient

from app.main import app
from app.repositories import catalog
from app.schemas.scenario import Scenario
from app.services.scenario import rank_study
from scripts.import_nasa_kb import load_package


def test_catalog_scenario_and_reported_modeling_conditions(monkeypatch):
    package = load_package(Path(__file__).resolve().parents[2] / "nasa-fire-safety-kb")
    studies = {study.slug: study for study in package.studies}
    cfi = studies["acme-cfi-g"]
    lunar = Scenario(o2_pct=32, pressure_kpa=56.5, flow_cms=5, gravity_g=0.17)
    result = rank_study(cfi, [str(cfi.sources[0].url)], lunar)

    assert result.o2_pct is None
    assert "o2_pct" in result.unknown
    assert "gravity_g" in result.outside
    assert result.score == 25
    assert cfi.conditions["burner_o2_max_pct"] == 85
    assert rank_study(cfi, [], lunar.model_copy(update={"fuel": "solid"})) is None

    async def rank(scenario):
        assert scenario == lunar
        return [result]

    async def detail(study_id):
        return studies[study_id]

    monkeypatch.setattr(catalog, "rank", rank)
    monkeypatch.setattr(catalog, "detail", detail)

    async def run():
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post("/api/v1/rank", json=lunar.model_dump())
            assert response.status_code == 200
            assert response.json()[0]["unknown"] == ["o2_pct"]
            invalid = await client.post("/api/v1/rank", json={**lunar.model_dump(), "o2_pct": 101})
            assert invalid.status_code == 422
            response = await client.get("/api/v1/studies/slice-acme-cld-precursor/modeling-params")
            assert response.status_code == 200
            case_a, case_b = response.json()
            assert case_a["fuel_flow_cms"] == [17, 89]
            assert case_a["coflow_air_cms"] == [17, 17]
            assert case_b["coflow_air_cms"] == [14, 34]
            assert case_b["source_url"].endswith("/20160012298")

    asyncio.run(run())
