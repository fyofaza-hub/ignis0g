from typing import Annotated, Literal

from pydantic import AfterValidator, BaseModel, ConfigDict, Field, HttpUrl

Fuel = Literal["solid", "liquid", "gas", "aerosol_pyrolysis", "reference"]
Pillar = Literal["Prevention", "Detection", "Suppression"]
def ordered_range(bounds: tuple[float, float]) -> tuple[float, float]:
    if bounds[0] > bounds[1]:
        raise ValueError("Range must be ordered from minimum to maximum")
    return bounds


Range = Annotated[tuple[float, float], AfterValidator(ordered_range)]


class Scenario(BaseModel):
    model_config = ConfigDict(extra="forbid")

    o2_pct: float = Field(ge=0, le=100)
    pressure_kpa: float = Field(gt=0, le=1000)
    flow_cms: float = Field(ge=0, le=1000)
    gravity_g: float = Field(ge=0, le=1)
    fuel: Fuel | None = None
    pillar: Pillar | None = None


class ScenarioStudy(BaseModel):
    study_id: str
    title: str
    o2_pct: Range | None
    pressure_kpa: Range | None
    flow_cms: Range | None
    gravity_g: Range | None
    fuel: Fuel | None
    material: str | None
    facility: str | None
    source_urls: list[str]
    matched: list[str]
    outside: list[str]
    unknown: list[str]
    score: int


class ModelingRun(BaseModel):
    model_config = ConfigDict(extra="forbid", allow_inf_nan=False)

    case: str
    nozzle_inner_diameter_mm: float = Field(gt=0)
    methane_in_fuel_pct: float = Field(ge=0, le=100)
    fuel_flow_cms: Range
    coflow_air_cms: Range
    gravity_regime: Literal["microgravity"]
    source_url: HttpUrl
    locator: str
