"""Rank catalog summaries by their marginal ranges, without predicting combustion."""
import math

from app.schemas.scenario import Scenario, ScenarioStudy


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
    return ScenarioStudy(
        study_id=row.slug, title=row.title, **ranges, fuel=fuel,
        material=data.get("fuel_material") if isinstance(data.get("fuel_material"), str) else None,
        facility=data.get("facility") if isinstance(data.get("facility"), str) else None,
        source_urls=source_urls, matched=matched, outside=outside, unknown=unknown,
        score=round(100 * len(matched) / len(ranges)),
    )
