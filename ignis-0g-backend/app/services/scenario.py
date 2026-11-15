"""Rank catalog summaries by their marginal ranges, without predicting combustion."""
import logging
import math

from app.schemas.scenario import Scenario, ScenarioStudy
from app.schemas.experiment_run import ExperimentRun
from pydantic import ValidationError

logger = logging.getLogger(__name__)


def reported_range(value):
    if not isinstance(value, (list, tuple)) or len(value) != 2:
        return None
    low, high = value
    if any(type(bound) not in (int, float) or not math.isfinite(bound) for bound in (low, high)):
        return None
    return (low, high) if low <= high else None


def rank_study(row, source_urls: list[str], scenario: Scenario) -> ScenarioStudy | None:
    if row.category.lower() == "reference":
        return None
    data = row.conditions
    fuel = data.get("fuel_state")
    if fuel not in ("solid", "liquid", "gas", "aerosol_pyrolysis", "reference"):
        fuel = None
    if scenario.fuel and scenario.fuel != fuel:
        return None
    pillars = {part.strip().casefold() for tag in row.tags for part in tag.split("/")}
    if scenario.pillar and scenario.pillar.casefold() not in pillars:
        return None

    ranges = {key: reported_range(data.get(key)) for key in ("o2_pct", "pressure_kpa", "flow_cms", "gravity_g")}
    matched, outside, unknown = [], [], []
    targets = scenario.model_dump()
    for key, bounds in ranges.items():
        if bounds is None:
            unknown.append(key)
        elif bounds[0] <= targets[key] <= bounds[1]:
            matched.append(key)
        else:
            outside.append(key)
    runs = []
    for raw in data.get("experiment_runs", []):
        try:
            runs.append(ExperimentRun.model_validate(raw))
        except ValidationError as exc:
            logger.warning("Skipping malformed experiment run in study=%s: %s", getattr(row, "slug", "?"), exc)
            continue  # Legacy malformed records cannot establish joint coverage.
    joint = []
    for run in runs:
        # Only fixed, jointly reported conditions count. Endpoint ranges are not interpolated.
        if (scenario.gravity_g == 0 and run.oxygen_basis == "fixed"
                and run.airflow_basis == "constant" and run.pressure_atm is not None
                and math.isclose(run.oxygen_vol_pct[0], scenario.o2_pct, rel_tol=0, abs_tol=1e-8)
                and math.isclose(run.airflow_cms[0], scenario.flow_cms, rel_tol=0, abs_tol=1e-8)
                and math.isclose(run.pressure_atm * 101.325, scenario.pressure_kpa, rel_tol=0, abs_tol=1e-6)):
            joint.append(f"{run.campaign}/{run.run_id}")
    limitations = ["range_matches_do_not_predict_fire_risk"]
    if not joint:
        limitations.append("joint_conditions_not_established")
    if unknown:
        limitations.append("missing_reported_parameters")
    if scenario.gravity_g > 0 and data.get("gravity_g") == [0, 0]:
        limitations.append("microgravity_results_do_not_validate_partial_or_earth_gravity")
    if not source_urls:
        limitations.append("no_source_links")
    return ScenarioStudy(
        reported_parameter_count=len(ranges) - len(unknown),
        source_count=len(set(source_urls)), run_count=len(runs),
        jointly_reported_run_ids=joint, limitations=limitations,
        study_id=row.slug, title=row.title, **ranges, fuel=fuel,
        material=data.get("fuel_material") if isinstance(data.get("fuel_material"), str) else None,
        facility=data.get("facility") if isinstance(data.get("facility"), str) else None,
        source_urls=source_urls, matched=matched, outside=outside, unknown=unknown,
        score=round(100 * len(matched) / len(ranges)),
    )
