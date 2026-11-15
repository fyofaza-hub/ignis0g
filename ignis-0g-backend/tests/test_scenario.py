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


def test_malformed_experiment_run_logs_warning_and_tiebreaker_prioritizes_verified_runs(caplog):
    import logging
    from types import SimpleNamespace
    from uuid import uuid4
    from sqlalchemy.ext.asyncio import async_sessionmaker
    from app.core.database import engine
    from app.models import Study

    bad_row = SimpleNamespace(
        slug="broken-run-study",
        title="Alpha Study",
        category="Test",
        tags=[],
        conditions={
            "o2_pct": [21, 21],
            "pressure_kpa": [101.3, 101.4],
            "flow_cms": [0, 0],
            "gravity_g": [0, 0],
            "experiment_runs": [{"run_id": "BAD-1"}],  # missing required campaign, material, geometry, source_url, locator
        },
    )
    caplog.set_level(logging.WARNING, logger="app.services.scenario")
    scenario = Scenario(o2_pct=21, pressure_kpa=101.325, flow_cms=0, gravity_g=0)
    ranked = rank_study(bad_row, [], scenario)
    assert ranked is not None
    assert ranked.run_count == 0
    assert any("broken-run-study" in rec.message for rec in caplog.records)

    async def run_tiebreak():
        try:
            async with engine.connect() as connection:
                transaction = await connection.begin()
                factory = async_sessionmaker(connection, expire_on_commit=False)
                original = catalog.session_factory
                catalog.session_factory = factory
                try:
                    prefix = "tiebreak-" + uuid4().hex[:8]
                    async with factory() as session:
                        # Alphabetically earlier unverified study vs later study with exact verified joint run
                        unverified = Study(
                            slug=f"{prefix}-alpha",
                            title=f"AAA Unverified {prefix}",
                            description="range summary only",
                            category="Solid Materials",
                            tags=[],
                            conditions={
                                "o2_pct": [18, 25],
                                "pressure_kpa": [100, 102],
                                "flow_cms": [0, 15],
                                "gravity_g": [0, 0],
                            },
                        )
                        verified = Study(
                            slug=f"{prefix}-zeta",
                            title=f"ZZZ Verified {prefix}",
                            description="digitized run",
                            category="Solid Materials",
                            tags=[],
                            conditions={
                                "o2_pct": [18, 25],
                                "pressure_kpa": [100, 102],
                                "flow_cms": [0, 15],
                                "gravity_g": [0, 0],
                                "experiment_runs": [
                                    {
                                        "campaign": "BASS-II",
                                        "run_id": "R1",
                                        "material": "PMMA",
                                        "geometry": "rod",
                                        "direction": "concurrent",
                                        "airflow_cms": [10.0],
                                        "airflow_basis": "constant",
                                        "oxygen_vol_pct": [21.0],
                                        "oxygen_basis": "fixed",
                                        "pressure_atm": 1.0,
                                        "source_url": "https://ntrs.nasa.gov/citations/20210011385",
                                        "locator": "Table 1",
                                    }
                                ],
                            },
                        )
                        session.add_all([unverified, verified])
                        await session.flush()

                    results = await catalog.rank(Scenario(o2_pct=21, pressure_kpa=101.325, flow_cms=10, gravity_g=0))
                    ours = [r.study_id for r in results if r.study_id.startswith(prefix)]
                    assert ours == [f"{prefix}-zeta", f"{prefix}-alpha"]
                finally:
                    catalog.session_factory = original
                    await transaction.rollback()
        finally:
            await engine.dispose()

    asyncio.run(run_tiebreak())
