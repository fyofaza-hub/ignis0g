from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field, HttpUrl, model_validator

Positive = Annotated[float, Field(gt=0)]
Nonnegative = Annotated[float, Field(ge=0)]
Percent = Annotated[float, Field(ge=0, le=100)]


class ExperimentRun(BaseModel):
    """A sourced observation with flow values in publication order."""

    model_config = ConfigDict(extra="forbid", allow_inf_nan=False)

    campaign: Literal[
        "BASS-II", "Saffire I", "Saffire II", "Saffire III",
        "FLEX-1",
    ]
    run_id: str = Field(pattern=r"^[A-Za-z0-9-]+$", max_length=64)
    gravity_regime: Literal["microgravity"] = "microgravity"
    material: str = Field(min_length=1)
    geometry: str = Field(min_length=1)
    width_cm: Positive | None = None
    length_cm: Positive | None = None
    thickness_mm: Positive | None = None
    initial_droplet_diameter_mm: Positive | None = None
    burning_rate_constant_mm2_s: list[Nonnegative] | None = Field(default=None, min_length=1)
    burning_sides: Literal[1, 2] | None = None
    direction: Literal["concurrent", "opposed", "quiescent"]
    airflow_cms: list[Nonnegative] = Field(min_length=1)
    airflow_basis: Literal["constant", "start_end", "plateaus"]
    oxygen_vol_pct: list[Percent] = Field(min_length=1, max_length=2)
    oxygen_basis: Literal["fixed", "start_end", "approximate"]
    pressure_atm: Positive | None = None
    spread_rate_mm_s: list[Nonnegative] | None = Field(default=None, min_length=1)
    burn_duration_s: Positive | None = None
    outcome: Literal[
        "quenched", "no_blowoff", "blowoff", "no_ignition", "one_sided_flame",
        "ignited", "no_propagation", "burned_to_end", "no_spread_into_nomex",
        "cool_flame", "extinction", "completion", "disruption",
    ] | None = None
    diagnostics: list[str] = Field(default_factory=list)
    notes: list[str] = Field(default_factory=list)
    source_url: HttpUrl
    locator: str = Field(min_length=1)
    supplementary_url: HttpUrl | None = None

    @model_validator(mode="before")
    @classmethod
    def upgrade_legacy_flex(cls, value):
        # Compatibility for existing snapshots; all output uses dimensionally correct keys.
        if isinstance(value, dict) and value.get("campaign") == "FLEX-1":
            value = dict(value)
            for old, new in (("thickness_mm", "initial_droplet_diameter_mm"),
                             ("spread_rate_mm_s", "burning_rate_constant_mm2_s")):
                if value.get(old) is not None:
                    if value.get(new) is not None and value[new] != value[old]:
                        raise ValueError(f"Conflicting legacy and canonical values: {new}")
                    value[new], value[old] = value[old], None
        return value

    @model_validator(mode="after")
    def check_observation_alignment(self):
        if self.campaign != "FLEX-1" and (
            self.initial_droplet_diameter_mm is not None or self.burning_rate_constant_mm2_s is not None
        ):
            raise ValueError("Droplet measurements require FLEX-1")
        if self.burning_rate_constant_mm2_s is not None and len(self.burning_rate_constant_mm2_s) != 1:
            raise ValueError("A droplet run reports one burning rate constant")
        count = len(self.airflow_cms)
        if (self.airflow_basis == "constant" and count != 1
                or self.airflow_basis == "start_end" and count != 2
                or self.airflow_basis == "plateaus" and count < 2):
            raise ValueError("Airflow values must match their reporting basis")
        if len(self.oxygen_vol_pct) != (2 if self.oxygen_basis == "start_end" else 1):
            raise ValueError("Oxygen values must match their reporting basis")
        if self.spread_rate_mm_s is not None and (
            self.airflow_basis == "start_end" or len(self.spread_rate_mm_s) != count
        ):
            raise ValueError("Each spread rate must be paired with a constant flow or plateau")
        return self
