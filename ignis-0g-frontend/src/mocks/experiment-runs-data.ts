import type { ExperimentRun } from "@/domain/types"

export const mockExperimentRuns: Record<string, ExperimentRun[]> = {
  "bass-bass-ii-bass-m": [
    {
      "campaign": "BASS-II",
      "run_id": "GMT45-T1",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        10.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.5
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": null,
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Table 7.1 footnote b flags the O₂ reading as potentially inaccurate."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT45-T1; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT45-T2",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        10.0,
        5.0
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        18.5
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": null,
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Table 7.1 footnote b flags the O₂ reading as potentially inaccurate.",
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT45-T2; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT45-T4",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        10.0,
        2.2
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        18.7
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "quenched",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT45-T4; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT45-T15",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        10.0,
        29.0
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        18.7
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "no_blowoff",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT45-T15; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT100-T5",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        10.0,
        2.4
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        18.8
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": null,
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT100-T5; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT100-T6",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        4.5,
        2.6
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        18.8
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": null,
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT100-T6; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT100-T13",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        4.0,
        2.2
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        17.5
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "quenched",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT100-T13; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT100-T16",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        4.0,
        3.0
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        17.6
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": null,
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT100-T16; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT175-T9",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        10.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        16.4
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "no_ignition",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT175-T9; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT175-T10",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        5.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        16.4
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "no_ignition",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT175-T10; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT175-T18",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        5.0,
        2.6
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        17.4
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "quenched",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT175-T18; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT178-T11",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        4.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.1
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": null,
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT178-T11; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT178-T12",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        5.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        16.8
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "no_ignition",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT178-T12; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT178-T14",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        4.0,
        2.8
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        16.9
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "quenched",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT178-T14; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT178-T17",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        6.0,
        53.0
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        16.9
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "no_blowoff",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT178-T17; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT190-T19",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 1.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        11.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.2
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": null,
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT190-T19; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT190-T20",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 1.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        11.0,
        3.0
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        17.2
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "quenched",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT190-T20; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT190-T21",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 1.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        11.0,
        47.0
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        17.2
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "blowoff",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT190-T21; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT190-T22",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 1.2,
      "length_cm": 10,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        10.5,
        5.0
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        17.1
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "quenched",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT190-T22; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT190-T23",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": null,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        10.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.2
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "no_ignition",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Previously used specimen. Section 7.1.4 describes reduced unburned length; the original exposed length is not assigned to this run."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT190-T23; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT190-T24",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": null,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        10.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.2
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "one_sided_flame",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Previously used specimen. Section 7.1.4 describes reduced unburned length; the original exposed length is not assigned to this run."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT190-T24; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT216-T25",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": null,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        5.0,
        2.5
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        20.8
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "ignited",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Previously used specimen. Section 7.1.4 describes reduced unburned length; the original exposed length is not assigned to this run.",
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT216-T25; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT216-T26",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 2.2,
      "length_cm": null,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        5.0,
        2.5
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        20.8
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "ignited",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Previously used specimen. Section 7.1.4 describes reduced unburned length; the original exposed length is not assigned to this run.",
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT216-T26; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT216-T27",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 1.2,
      "length_cm": null,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        5.0,
        2.0
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        20.7
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "ignited",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Previously used specimen. Section 7.1.4 describes reduced unburned length; the original exposed length is not assigned to this run.",
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT216-T27; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT216-T28a",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 1.2,
      "length_cm": null,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        5.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.7
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "no_ignition",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Previously used specimen. Section 7.1.4 describes reduced unburned length; the original exposed length is not assigned to this run."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT216-T28a; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT216-T28b",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 1.2,
      "length_cm": null,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        5.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.7
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "no_ignition",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Previously used specimen. Section 7.1.4 describes reduced unburned length; the original exposed length is not assigned to this run."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT216-T28b; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "GMT216-T29",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat fabric",
      "width_cm": 1.2,
      "length_cm": null,
      "thickness_mm": 0.32,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        5.0,
        2.0
      ],
      "airflow_basis": "start_end",
      "oxygen_vol_pct": [
        20.7
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "ignited",
      "diagnostics": [
        "Side-view video camera",
        "Top-view still camera"
      ],
      "notes": [
        "Previously used specimen. Section 7.1.4 describes reduced unburned length; the original exposed length is not assigned to this run.",
        "Air speed is reported at the start and end; the transition rate was not standardized."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 7.1, p. 96, GMT216-T29; setup §7.1.3",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M1",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 1.0,
      "burning_sides": 1,
      "direction": "opposed",
      "airflow_cms": [
        9.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        22.2,
        21.9
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.071
      ],
      "burn_duration_s": 384.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M1; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M2",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 3.0,
      "burning_sides": 1,
      "direction": "opposed",
      "airflow_cms": [
        20.0,
        15.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        22.2,
        21.2
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.052,
        0.033
      ],
      "burn_duration_s": 1374.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M2; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M3",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 5.0,
      "burning_sides": 1,
      "direction": "opposed",
      "airflow_cms": [
        10.0,
        20.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        20.8,
        19.7
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.029,
        0.024
      ],
      "burn_duration_s": 1206.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M3; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M4",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 5.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        5.0,
        3.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        21.8,
        19.8
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.045,
        0.033
      ],
      "burn_duration_s": 1188.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M4; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M5",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 3.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        10.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        22.2,
        19.0
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.071
      ],
      "burn_duration_s": 1632.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M5; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M6",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 1.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        10.0,
        8.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        21.8,
        20.7
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1008.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau.",
        "The report did not track the spread rate."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M6; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M7",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 1.2,
      "length_cm": 10,
      "thickness_mm": 1.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        10.0,
        6.0,
        5.0,
        3.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        18.9,
        18.4
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.106,
        0.099,
        0.083,
        0.07
      ],
      "burn_duration_s": 1104.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M7; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M8",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 1.2,
      "length_cm": 10,
      "thickness_mm": 2.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        10.0,
        6.0,
        5.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        19.1,
        18.2
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.057,
        0.056,
        0.04
      ],
      "burn_duration_s": 1512.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M8; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M9",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 1.2,
      "length_cm": 10,
      "thickness_mm": 3.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        14.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0,
        17.6
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.025
      ],
      "burn_duration_s": 1008.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M9; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M10",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 1.2,
      "length_cm": 10,
      "thickness_mm": 4.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        15.0,
        10.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        20.1,
        18.6
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.0373,
        0.03
      ],
      "burn_duration_s": 1830.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M10; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M11",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 1.2,
      "length_cm": 10,
      "thickness_mm": 5.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        21.0,
        15.0,
        13.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        20.0,
        18.5
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.048,
        0.028,
        0.022
      ],
      "burn_duration_s": 1710.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M11; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M12",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 2.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        12.0,
        10.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        21.7,
        20.4
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": null,
      "burn_duration_s": 972.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau.",
        "The report did not track the spread rate."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M12; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M13",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 4.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        6.0,
        5.0,
        4.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        20.8,
        19.0
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.047,
        0.035,
        0.033
      ],
      "burn_duration_s": 1230.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M13; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M14",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 2.0,
      "burning_sides": 1,
      "direction": "opposed",
      "airflow_cms": [
        15.0,
        14.0,
        10.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        22.2,
        21.6
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.0624,
        0.055,
        0.0353
      ],
      "burn_duration_s": 924.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M14; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M15",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 4.0,
      "burning_sides": 1,
      "direction": "opposed",
      "airflow_cms": [
        20.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0,
        20.0
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.045
      ],
      "burn_duration_s": 1320.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M15; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M16",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 1.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        5.0,
        3.0,
        2.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        19.2,
        18.7
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.144,
        0.1309,
        0.1062
      ],
      "burn_duration_s": 504.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M16; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M17",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 2.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        5.0,
        4.0,
        3.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        18.8,
        17.1
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.053,
        0.042,
        0.026
      ],
      "burn_duration_s": 1842.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M17; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M18",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 3.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        10.0,
        8.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        17.9,
        16.8
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.026,
        0.013
      ],
      "burn_duration_s": 1530.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M18; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M19",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 4.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        10.0,
        6.0
      ],
      "airflow_basis": "plateaus",
      "oxygen_vol_pct": [
        19.0,
        17.4
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.027,
        0.0159
      ],
      "burn_duration_s": 1542.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M19; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "BASS-II",
      "run_id": "M20",
      "gravity_regime": "microgravity",
      "material": "Clear cast PMMA",
      "geometry": "flat slab",
      "width_cm": 2.2,
      "length_cm": 10,
      "thickness_mm": 5.0,
      "burning_sides": 2,
      "direction": "opposed",
      "airflow_cms": [
        10.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0,
        17.4
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.012
      ],
      "burn_duration_s": 990.0,
      "outcome": null,
      "diagnostics": [
        "Two cameras; flame-front tracking"
      ],
      "notes": [
        "O₂ was recorded at the start and end of the run, not per airflow plateau."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20210011385",
      "locator": "Table 5.1, p. 57, M20; setup §5.1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    }
  ],
  "flex-1": [
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-001",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.997,
      "spread_rate_mm_s": null,
      "burn_duration_s": 4.3,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 20CAL08; test date: 3/5/09 (17:22:03 GMT).",
        "Ambient pressure: 757.7 mmHg (0.997 atm); initial mole fractions: O2=0.21, N2=0.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 0.89 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–001",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.69,
      "burning_rate_constant_mm2_s": [
        0.52
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-002",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0026,
      "spread_rate_mm_s": null,
      "burn_duration_s": 5.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 20CAL10; test date: 3/5/09 (19:20:06 GMT).",
        "Ambient pressure: 762 mmHg (1.0026 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: .94 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–002",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.86,
      "burning_rate_constant_mm2_s": [
        0.6
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-003",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0055,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 20CAL12; test date: 3/5/09 (21:17:46 GMT).",
        "Ambient pressure: 764.2 mmHg (1.0055 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: .92 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–003",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.61,
      "burning_rate_constant_mm2_s": [
        0.58
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-004",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0,
      "spread_rate_mm_s": null,
      "burn_duration_s": 7.64,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 30CAL02; test date: 3/31/09 (17:16:18 GMT).",
        "Ambient pressure: 760 mmHg (1.0 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–004",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.06,
      "burning_rate_constant_mm2_s": [
        0.6
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-005",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0,
      "spread_rate_mm_s": null,
      "burn_duration_s": 6.34,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 30CAL03; test date: 3/31/09 (19:00:48 GMT).",
        "Ambient pressure: 760 mmHg (1.0 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: .81 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–005",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.92,
      "burning_rate_constant_mm2_s": [
        0.48
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-006",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 40CAL01; test date: 3/31/09 (20:05:49 GMT).",
        "Ambient pressure: 760 mmHg (1.0 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.53 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–006",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.54,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-007",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0017,
      "spread_rate_mm_s": null,
      "burn_duration_s": 5.3,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 20CAL13; test date: 4/10/09 (13:26:11 GMT).",
        "Ambient pressure: 761.3 mmHg (1.0017 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–007",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.87,
      "burning_rate_constant_mm2_s": [
        0.67
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-008",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0032,
      "spread_rate_mm_s": null,
      "burn_duration_s": 14.8,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 30CAL06; test date: 4/10/09 (18:07:15 GMT).",
        "Ambient pressure: 762.4 mmHg (1.0032 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–008",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.95,
      "burning_rate_constant_mm2_s": [
        0.79
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-009",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 30CAL07; test date: 4/10/09 (GMT not reported).",
        "Ambient pressure: 760 mmHg (1.0 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–009",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-010",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 3.0522,
      "spread_rate_mm_s": null,
      "burn_duration_s": 13.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 256F002; test date: 5/22/09 (14:53:27 GMT).",
        "Ambient pressure: 2319.7 mmHg (3.0522 atm); initial mole fractions: O2=.21, N2=.09, CO2=.7, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–010",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.86,
      "burning_rate_constant_mm2_s": [
        0.37
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-011",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 3.0511,
      "spread_rate_mm_s": null,
      "burn_duration_s": 16.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 256R001; test date: 5/22/09 (15:33:47 GMT).",
        "Ambient pressure: 2318.8 mmHg (3.0511 atm); initial mole fractions: O2=.21, N2=.09, CO2=.7, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–011",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.03,
      "burning_rate_constant_mm2_s": [
        0.4
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-012",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 3.0525,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 264F003; test date: 5/22/09 (19:23:35 GMT).",
        "Ambient pressure: 2319.9 mmHg (3.0525 atm); initial mole fractions: O2=.21, N2=.09, CO2=.7, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–012",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.74,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-013",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 2.7292,
      "spread_rate_mm_s": null,
      "burn_duration_s": 10.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 256R002; test date: 6/25/09 (15:33:05 GMT).",
        "Ambient pressure: 2074.2 mmHg (2.7292 atm); initial mole fractions: O2=.21, N2=.09, CO2=.7, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–013",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.59,
      "burning_rate_constant_mm2_s": [
        0.49
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-014",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 2.7047,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.3,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 256F007; test date: 6/29/09 (12:26:06 GMT).",
        "Ambient pressure: 2055.6 mmHg (2.7047 atm); initial mole fractions: O2=.21, N2=.09, CO2=.7, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–014",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.7,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-015",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 2.7192,
      "spread_rate_mm_s": null,
      "burn_duration_s": 23.1,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 256F008; test date: 6/29/09 (13:56:06 GMT).",
        "Ambient pressure: 2066.6 mmHg (2.7192 atm); initial mole fractions: O2=.21, N2=.09, CO2=.7, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–015",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.42,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-016",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 2.7264,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 256F009; test date: 6/29/09 (15:34:58 GMT).",
        "Ambient pressure: 2072.1 mmHg (2.7264 atm); initial mole fractions: O2=.21, N2=.09, CO2=.7, He=0.",
        "Visible flame extinction diameter: 1 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–016",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.66,
      "burning_rate_constant_mm2_s": [
        0.53
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-017",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 2.0338,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.4,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 240R003; test date: 7/1/09 (12:28:41 GMT).",
        "Ambient pressure: 1545.7 mmHg (2.0338 atm); initial mole fractions: O2=.21, N2=.09, CO2=.7, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–017",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.67,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-018",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 2.0445,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.1,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 248F001; test date: 7/1/09 (16:28:56 GMT).",
        "Ambient pressure: 1553.8 mmHg (2.0445 atm); initial mole fractions: O2=.21, N2=.09, CO2=.7, He=0.",
        "Visible flame extinction diameter: 1.77 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–018",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.74,
      "burning_rate_constant_mm2_s": [
        0.61
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-019",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        34.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7093,
      "spread_rate_mm_s": null,
      "burn_duration_s": 4.2,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 196F001; test date: 8/26/09 (19:07:28 GMT).",
        "Ambient pressure: 539.1 mmHg (0.7093 atm); initial mole fractions: O2=.34, N2=.66, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–019",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.39,
      "burning_rate_constant_mm2_s": [
        0.9
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-020",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        34.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7099,
      "spread_rate_mm_s": null,
      "burn_duration_s": 17.4,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 192F001; test date: 10/24/09 (14:09:04 GMT).",
        "Ambient pressure: 539.5 mmHg (0.7099 atm); initial mole fractions: O2=.34, N2=.66, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.56 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–020",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.4,
      "burning_rate_constant_mm2_s": [
        0.53
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-021",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        34.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7113,
      "spread_rate_mm_s": null,
      "burn_duration_s": 17.8,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 192F002; test date: 10/24/09 (15:15:24 GMT).",
        "Ambient pressure: 540.6 mmHg (0.7113 atm); initial mole fractions: O2=.34, N2=.66, CO2=0, He=0.",
        "Visible flame extinction diameter: .95 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–021",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.49,
      "burning_rate_constant_mm2_s": [
        0.66
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-022",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        34.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7112,
      "spread_rate_mm_s": null,
      "burn_duration_s": 18.2,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 192F003; test date: 10/24/09 (15:39:48 GMT).",
        "Ambient pressure: 540.5 mmHg (0.7112 atm); initial mole fractions: O2=.34, N2=.66, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–022",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.5,
      "burning_rate_constant_mm2_s": [
        0.65
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-023",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        34.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7129,
      "spread_rate_mm_s": null,
      "burn_duration_s": 13.1,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 196F002; test date: 10/24/09 (18:29:53 GMT).",
        "Ambient pressure: 541.8 mmHg (0.7129 atm); initial mole fractions: O2=.34, N2=.66, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–023",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.01,
      "burning_rate_constant_mm2_s": [
        0.73
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-024",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        34.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7142,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 196F003; test date: 10/24/09 (19:44:04 GMT).",
        "Ambient pressure: 542.8 mmHg (0.7142 atm); initial mole fractions: O2=.34, N2=.66, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–024",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-025",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.707,
      "spread_rate_mm_s": null,
      "burn_duration_s": 10.3,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 191R001; test date: 11/9/09 (11:42:23 GMT).",
        "Ambient pressure: 537.3 mmHg (0.707 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: .59 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–025",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.6,
      "burning_rate_constant_mm2_s": [
        0.65
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-026",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7084,
      "spread_rate_mm_s": null,
      "burn_duration_s": 22.2,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 191F001; test date: 11/9/09 (11:59:59 GMT).",
        "Ambient pressure: 538.4 mmHg (0.7084 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: .4 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–026",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.63,
      "burning_rate_constant_mm2_s": [
        0.62
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-027",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7114,
      "spread_rate_mm_s": null,
      "burn_duration_s": 23.8,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 195F001; test date: 11/9/09 (14:04:11 GMT).",
        "Ambient pressure: 540.7 mmHg (0.7114 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–027",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.87,
      "burning_rate_constant_mm2_s": [
        0.64
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-028",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7101,
      "spread_rate_mm_s": null,
      "burn_duration_s": 17.3,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 195F002; test date: 11/9/09 (14:56:05 GMT).",
        "Ambient pressure: 539.7 mmHg (0.7101 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–028",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.36,
      "burning_rate_constant_mm2_s": [
        0.64
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-029",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0091,
      "spread_rate_mm_s": null,
      "burn_duration_s": 10.4,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 178R001; test date: 11/13/09 (13:11:23 GMT).",
        "Ambient pressure: 766.9 mmHg (1.0091 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–029",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.57,
      "burning_rate_constant_mm2_s": [
        0.74
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-030",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0121,
      "spread_rate_mm_s": null,
      "burn_duration_s": 15.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 178F001; test date: 11/13/09 (14:03:46 GMT).",
        "Ambient pressure: 769.2 mmHg (1.0121 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.32 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–030",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.26,
      "burning_rate_constant_mm2_s": [
        0.59
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-031",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0138,
      "spread_rate_mm_s": null,
      "burn_duration_s": 18.4,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 182F001; test date: 11/13/09 (18:33:39 GMT).",
        "Ambient pressure: 770.5 mmHg (1.0138 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 20 (PDF p. 26), FLEX–031",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.39,
      "burning_rate_constant_mm2_s": [
        0.85
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-032",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0145,
      "spread_rate_mm_s": null,
      "burn_duration_s": 14.0,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 182F002; test date: 11/13/09 (19:04:33 GMT).",
        "Ambient pressure: 771 mmHg (1.0145 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–032",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.07,
      "burning_rate_constant_mm2_s": [
        0.68
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-033",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0059,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 177R002; test date: 11/27/09 (10:02:15 GMT).",
        "Ambient pressure: 764.5 mmHg (1.0059 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.25 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–033",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.62,
      "burning_rate_constant_mm2_s": [
        0.48
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-034",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0101,
      "spread_rate_mm_s": null,
      "burn_duration_s": 27.3,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 177F001; test date: 11/27/09 (11:15:38 GMT).",
        "Ambient pressure: 767.7 mmHg (1.0101 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 2 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–034",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.89,
      "burning_rate_constant_mm2_s": [
        0.44
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-035",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0107,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 181F001; test date: 11/27/09 (13:01:24 GMT).",
        "Ambient pressure: 768.1 mmHg (1.0107 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 3.34 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–035",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.85,
      "burning_rate_constant_mm2_s": [
        0.43
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-036",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7092,
      "spread_rate_mm_s": null,
      "burn_duration_s": 7.1,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 190R002; test date: 12/15/09 (10:39:35 GMT).",
        "Ambient pressure: 539 mmHg (0.7092 atm); initial mole fractions: O2=.2, N2=.8, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.67 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–036",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.4,
      "burning_rate_constant_mm2_s": [
        0.45
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-037",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        34.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.703,
      "spread_rate_mm_s": null,
      "burn_duration_s": 10.7,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 220R001; test date: 1/7/10 (19:08:46 GMT).",
        "Ambient pressure: 534.3 mmHg (0.703 atm); initial mole fractions: O2=.34, N2=.66, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–037",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.31,
      "burning_rate_constant_mm2_s": [
        0.72
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-038",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        34.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7032,
      "spread_rate_mm_s": null,
      "burn_duration_s": 15.3,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 220R002; test date: 1/7/10 (19:20:38 GMT).",
        "Ambient pressure: 534.4 mmHg (0.7032 atm); initial mole fractions: O2=.34, N2=.66, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–038",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.59,
      "burning_rate_constant_mm2_s": [
        0.71
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-039",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        34.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7038,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.9,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 224F001; test date: 1/7/10 (21:51:19 GMT).",
        "Ambient pressure: 534.9 mmHg (0.7038 atm); initial mole fractions: O2=.34, N2=.66, CO2=0, He=0.",
        "Visible flame extinction diameter: 0 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–039",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.91,
      "burning_rate_constant_mm2_s": [
        0.8
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-040",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7041,
      "spread_rate_mm_s": null,
      "burn_duration_s": 19.2,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 219R001; test date: 1/8/10 (5:02:52 GMT).",
        "Ambient pressure: 535.1 mmHg (0.7041 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–040",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.77,
      "burning_rate_constant_mm2_s": [
        0.62
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-041",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.703,
      "spread_rate_mm_s": null,
      "burn_duration_s": 14.1,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 219F001; test date: 1/8/10 (4:41:55 GMT).",
        "Ambient pressure: 534.3 mmHg (0.703 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–041",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.35,
      "burning_rate_constant_mm2_s": [
        0.65
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-042",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7039,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.3,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 223F001; test date: 1/8/10 (1:02:04 GMT).",
        "Ambient pressure: 535 mmHg (0.7039 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–042",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.92,
      "burning_rate_constant_mm2_s": [
        0.58
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-043",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7038,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.4,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 223F002; test date: 1/8/10 (3:16:16 GMT).",
        "Ambient pressure: 534.9 mmHg (0.7038 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: 0 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–043",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.97,
      "burning_rate_constant_mm2_s": [
        0.78
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-044",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0089,
      "spread_rate_mm_s": null,
      "burn_duration_s": 16.6,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 206F001; test date: 1/11/10 (10:33:22 GMT).",
        "Ambient pressure: 766.8 mmHg (1.0089 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–044",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.49,
      "burning_rate_constant_mm2_s": [
        0.63
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-045",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0109,
      "spread_rate_mm_s": null,
      "burn_duration_s": 6.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 206R001; test date: 1/11/10 (10:54:25 GMT).",
        "Ambient pressure: 768.3 mmHg (1.0109 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.01 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–045",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.42,
      "burning_rate_constant_mm2_s": [
        0.73
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-046",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0125,
      "spread_rate_mm_s": null,
      "burn_duration_s": 13.1,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 205R001; test date: 1/12/10 (13:14:25 GMT).",
        "Ambient pressure: 769.5 mmHg (1.0125 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.08 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–046",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.78,
      "burning_rate_constant_mm2_s": [
        0.54
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-047",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0133,
      "spread_rate_mm_s": null,
      "burn_duration_s": 17.1,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 209F001; test date: 1/12/10 (15:48:17 GMT).",
        "Ambient pressure: 770.1 mmHg (1.0133 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–047",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.36,
      "burning_rate_constant_mm2_s": [
        0.5
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-048",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0114,
      "spread_rate_mm_s": null,
      "burn_duration_s": 23.5,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 205F001; test date: 1/12/10 (12:14:55 GMT).",
        "Ambient pressure: 768.7 mmHg (1.0114 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–048",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.66,
      "burning_rate_constant_mm2_s": [
        0.27
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-049",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0064,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 209F003; test date: 1/19/10 (9:09:16 GMT).",
        "Ambient pressure: 764.9 mmHg (1.0064 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.78 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–049",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.46,
      "burning_rate_constant_mm2_s": [
        0.59
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-050",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0133,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 209F004; test date: 1/19/10 (14:08:17 GMT).",
        "Ambient pressure: 770.1 mmHg (1.0133 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.98 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–050",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.57,
      "burning_rate_constant_mm2_s": [
        0.52
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-051",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.015,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.2,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 209F005; test date: 1/19/10 (16:38:35 GMT).",
        "Ambient pressure: 771.4 mmHg (1.015 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 0 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–051",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.41,
      "burning_rate_constant_mm2_s": [
        0.65
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-052",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        30.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0146,
      "spread_rate_mm_s": null,
      "burn_duration_s": 18.3,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 210F002; test date: 1/11/10 (13:46:44 GMT).",
        "Ambient pressure: 771.1 mmHg (1.0146 atm); initial mole fractions: O2=.3, N2=.7, CO2=0, He=0.",
        "Visible flame extinction diameter: 0 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–052",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.53,
      "burning_rate_constant_mm2_s": [
        0.7
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-053",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0134,
      "spread_rate_mm_s": null,
      "burn_duration_s": 18.5,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 209F002; test date: 1/12/10 (16:29:37 GMT).",
        "Ambient pressure: 770.2 mmHg (1.0134 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–053",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-054",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7124,
      "spread_rate_mm_s": null,
      "burn_duration_s": 29.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 190F003; test date: 1/29/10 (11:27:01 GMT).",
        "Ambient pressure: 541.4 mmHg (0.7124 atm); initial mole fractions: O2=.2, N2=.8, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–054",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.56,
      "burning_rate_constant_mm2_s": [
        0.41
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-055",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7139,
      "spread_rate_mm_s": null,
      "burn_duration_s": 20.5,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 218F001; test date: 1/29/10 (16:06:50 GMT).",
        "Ambient pressure: 542.6 mmHg (0.7139 atm); initial mole fractions: O2=.2, N2=.8, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.39 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–055",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.37,
      "burning_rate_constant_mm2_s": [
        0.46
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-056",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7159,
      "spread_rate_mm_s": null,
      "burn_duration_s": 7.9,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 194F001; test date: 1/29/10 (19:13:22 GMT).",
        "Ambient pressure: 544.1 mmHg (0.7159 atm); initial mole fractions: O2=.2, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 3.04 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–056",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.56,
      "burning_rate_constant_mm2_s": [
        0.44
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-057",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7163,
      "spread_rate_mm_s": null,
      "burn_duration_s": 6.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 303F001; test date: 1/29/10 (19:50:16 GMT).",
        "Ambient pressure: 544.4 mmHg (0.7163 atm); initial mole fractions: O2=.2, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.49 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–057",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.1,
      "burning_rate_constant_mm2_s": [
        0.54
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-058",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0175,
      "spread_rate_mm_s": null,
      "burn_duration_s": 29.1,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 176F001; test date: 2/4/10 (2:32:01 GMT).",
        "Ambient pressure: 773.3 mmHg (1.0175 atm); initial mole fractions: O2=.18, N2=.82, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–058",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.69,
      "burning_rate_constant_mm2_s": [
        0.42
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-059",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0121,
      "spread_rate_mm_s": null,
      "burn_duration_s": 17.7,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 176R001; test date: 2/4/10 (0:26:28 GMT).",
        "Ambient pressure: 769.2 mmHg (1.0121 atm); initial mole fractions: O2=.18, N2=.82, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.39 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–059",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.93,
      "burning_rate_constant_mm2_s": [
        0.43
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-060",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.018,
      "spread_rate_mm_s": null,
      "burn_duration_s": 23.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 204F001; test date: 2/4/10 (3:26:05 GMT).",
        "Ambient pressure: 773.7 mmHg (1.018 atm); initial mole fractions: O2=.18, N2=.82, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–060",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.43,
      "burning_rate_constant_mm2_s": [
        0.45
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-061",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0186,
      "spread_rate_mm_s": null,
      "burn_duration_s": 25.7,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 204R001; test date: 2/4/10 (3:52:39 GMT).",
        "Ambient pressure: 774.1 mmHg (1.0186 atm); initial mole fractions: O2=.18, N2=.82, CO2=0, He=0.",
        "Visible flame extinction diameter: 2 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–061",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.68,
      "burning_rate_constant_mm2_s": [
        0.41
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-062",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0024,
      "spread_rate_mm_s": null,
      "burn_duration_s": 4.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 301F001; test date: 3/11/10 (21:37:48 GMT).",
        "Ambient pressure: 761.8 mmHg (1.0024 atm); initial mole fractions: O2=.18, N2=.82, CO2=0, He=0.",
        "Visible flame extinction diameter: 3.17 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–062",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.43,
      "burning_rate_constant_mm2_s": [
        0.39
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-063",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.01,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.6,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 301F002; test date: 3/11/10 (23:07:51 GMT).",
        "Ambient pressure: 767.6 mmHg (1.01 atm); initial mole fractions: O2=.18, N2=.81, CO2=0, He=0.",
        "Visible flame extinction diameter: 0 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–063",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.15,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-064",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0061,
      "spread_rate_mm_s": null,
      "burn_duration_s": 5.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 302F001; test date: 3/11/10 (22:12:39 GMT).",
        "Ambient pressure: 764.6 mmHg (1.0061 atm); initial mole fractions: O2=.18, N2=.81, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.07 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–064",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.69,
      "burning_rate_constant_mm2_s": [
        0.6
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-065",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0078,
      "spread_rate_mm_s": null,
      "burn_duration_s": 24.3,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 189R001; test date: 3/19/10 (8:42:53 GMT).",
        "Ambient pressure: 765.9 mmHg (1.0078 atm); initial mole fractions: O2=.15, N2=.85, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 21 (PDF p. 27), FLEX–065",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.37,
      "burning_rate_constant_mm2_s": [
        0.4
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-066",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0089,
      "spread_rate_mm_s": null,
      "burn_duration_s": 12.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 189F001; test date: 3/19/10 (9:26:45 GMT).",
        "Ambient pressure: 766.8 mmHg (1.0089 atm); initial mole fractions: O2=.15, N2=.85, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.32 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–066",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.52,
      "burning_rate_constant_mm2_s": [
        0.38
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-067",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0101,
      "spread_rate_mm_s": null,
      "burn_duration_s": 14.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 189F002; test date: 3/19/10 (10:17:06 GMT).",
        "Ambient pressure: 767.7 mmHg (1.0101 atm); initial mole fractions: O2=.15, N2=.85, CO2=0, He=0.",
        "Visible flame extinction diameter: 3.3 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–067",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.97,
      "burning_rate_constant_mm2_s": [
        0.36
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-068",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0116,
      "spread_rate_mm_s": null,
      "burn_duration_s": 10.7,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 189R003; test date: 3/19/10 (12:04:45 GMT).",
        "Ambient pressure: 768.8 mmHg (1.0116 atm); initial mole fractions: O2=.15, N2=.84, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.29 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–068",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.38,
      "burning_rate_constant_mm2_s": [
        0.39
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-069",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        14.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0093,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.3,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 193R002; test date: 3/23/10 (10:23:00 GMT).",
        "Ambient pressure: 767.1 mmHg (1.0093 atm); initial mole fractions: O2=.14, N2=.84, CO2=0, He=0.",
        "Visible flame extinction diameter: 0 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–069",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.1,
      "burning_rate_constant_mm2_s": [
        0.94
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-070",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0013,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 193F001; test date: 3/23/10 (7:25:43 GMT).",
        "Ambient pressure: 761 mmHg (1.0013 atm); initial mole fractions: O2=.15, N2=.84, CO2=0, He=0.",
        "Visible flame extinction diameter: 4.6 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–070",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.67,
      "burning_rate_constant_mm2_s": [
        0.41
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-071",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0109,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 189R002; test date: 3/19/10 (11:19:22 GMT).",
        "Ambient pressure: 768.3 mmHg (1.0109 atm); initial mole fractions: O2=.15, N2=.84, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–071",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.25,
      "burning_rate_constant_mm2_s": [
        0.4
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-072",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0068,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.5,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 193R001; test date: 3/23/10 (9:06:37 GMT).",
        "Ambient pressure: 765.2 mmHg (1.0068 atm); initial mole fractions: O2=.15, N2=.84, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–072",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.13,
      "burning_rate_constant_mm2_s": [
        0.52
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-073",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0013,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 193F001; test date: 3/23/10 (7:25:43 GMT).",
        "Ambient pressure: 761 mmHg (1.0013 atm); initial mole fractions: O2=.15, N2=.84, CO2=0, He=0.",
        "Visible flame extinction diameter: 4.58 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–073",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.64,
      "burning_rate_constant_mm2_s": [
        0.56
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-074",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0078,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.3,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 221F001; test date: 3/23/10 (9:44:36 GMT).",
        "Ambient pressure: 765.9 mmHg (1.0078 atm); initial mole fractions: O2=.15, N2=.84, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–074",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.33,
      "burning_rate_constant_mm2_s": [
        0.77
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-075",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        13.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0142,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.1,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 203R002; test date: 3/29/10 (21:06:40 GMT).",
        "Ambient pressure: 770.8 mmHg (1.0142 atm); initial mole fractions: O2=.13, N2=.85, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.78 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–075",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.54,
      "burning_rate_constant_mm2_s": [
        0.37
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-076",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        13.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0125,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 203F001; test date: 3/29/10 (19:24:36 GMT).",
        "Ambient pressure: 769.5 mmHg (1.0125 atm); initial mole fractions: O2=.13, N2=.85, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.78 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–076",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.21,
      "burning_rate_constant_mm2_s": [
        0.37
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-077",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        14.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0111,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 175R001; test date: 3/29/10 (18:39:20 GMT).",
        "Ambient pressure: 768.4 mmHg (1.0111 atm); initial mole fractions: O2=.14, N2=.85, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.91 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–077",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.33,
      "burning_rate_constant_mm2_s": [
        0.34
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-078",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        14.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0079,
      "spread_rate_mm_s": null,
      "burn_duration_s": 12.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 175F001; test date: 3/29/10 (17:49:23 GMT).",
        "Ambient pressure: 766 mmHg (1.0079 atm); initial mole fractions: O2=.14, N2=.85, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.66 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–078",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.66,
      "burning_rate_constant_mm2_s": [
        0.35
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-079",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        13.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0107,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 179F001; test date: 3/30/10 (0:40:16 GMT).",
        "Ambient pressure: 768.1 mmHg (1.0107 atm); initial mole fractions: O2=.13, N2=.85, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.86 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–079",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.92,
      "burning_rate_constant_mm2_s": [
        0.25
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-080",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        13.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0132,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 207F001; test date: 3/30/10 (2:29:19 GMT).",
        "Ambient pressure: 770 mmHg (1.0132 atm); initial mole fractions: O2=.13, N2=.85, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–080",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-081",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        13.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0134,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 207F002; test date: 3/30/10 (3:59:28 GMT).",
        "Ambient pressure: 770.2 mmHg (1.0134 atm); initial mole fractions: O2=.13, N2=.85, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–081",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-082",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        13.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0061,
      "spread_rate_mm_s": null,
      "burn_duration_s": 7.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 304F001; test date: 4/19/10 (17:19:17 GMT).",
        "Ambient pressure: 764.6 mmHg (1.0061 atm); initial mole fractions: O2=.13, N2=.87, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.39 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–082",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.84,
      "burning_rate_constant_mm2_s": [
        0.35
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-083",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        12.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0158,
      "spread_rate_mm_s": null,
      "burn_duration_s": 5.45,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 304F002; test date: 4/19/10 (21:18:05 GMT).",
        "Ambient pressure: 772 mmHg (1.0158 atm); initial mole fractions: O2=.12, N2=.87, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–083",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-084",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        12.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0095,
      "spread_rate_mm_s": null,
      "burn_duration_s": 10.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 304R001; test date: 4/19/10 (17:51:24 GMT).",
        "Ambient pressure: 767.2 mmHg (1.0095 atm); initial mole fractions: O2=.12, N2=.87, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.42 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–084",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.35,
      "burning_rate_constant_mm2_s": [
        0.35
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-085",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        12.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0147,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.3,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 304R002; test date: 4/19/10 (20:12:58 GMT).",
        "Ambient pressure: 771.2 mmHg (1.0147 atm); initial mole fractions: O2=.12, N2=.87, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.77 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–085",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.4,
      "burning_rate_constant_mm2_s": [
        0.35
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-086",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        12.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0132,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 305F002; test date: 4/19/10 (19:16:37 GMT).",
        "Ambient pressure: 770 mmHg (1.0132 atm); initial mole fractions: O2=.12, N2=.87, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.56 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–086",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.07,
      "burning_rate_constant_mm2_s": [
        0.35
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-087",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        12.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0147,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.3,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 305F003; test date: 4/19/10 (20:38:54 GMT).",
        "Ambient pressure: 771.2 mmHg (1.0147 atm); initial mole fractions: O2=.12, N2=.87, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.92 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–087",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.64,
      "burning_rate_constant_mm2_s": [
        0.38
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-088",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        25.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7072,
      "spread_rate_mm_s": null,
      "burn_duration_s": 14.8,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 053R001; test date: 5/5/10 (22:37:54 GMT).",
        "Ambient pressure: 537.5 mmHg (0.7072 atm); initial mole fractions: O2=.25, N2=.6, CO2=.15, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–088",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.01,
      "burning_rate_constant_mm2_s": [
        0.53
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-089",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        25.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7071,
      "spread_rate_mm_s": null,
      "burn_duration_s": 24.0,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 053F001; test date: 5/5/10 (22:19:33 GMT).",
        "Ambient pressure: 537.4 mmHg (0.7071 atm); initial mole fractions: O2=.25, N2=.6, CO2=.15, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–089",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.7,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-090",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        25.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7095,
      "spread_rate_mm_s": null,
      "burn_duration_s": 20.1,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 141R001; test date: 5/6/10 (0:07:51 GMT).",
        "Ambient pressure: 539.2 mmHg (0.7095 atm); initial mole fractions: O2=.25, N2=.6, CO2=.15, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–090",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.62,
      "burning_rate_constant_mm2_s": [
        0.53
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-091",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        25.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7083,
      "spread_rate_mm_s": null,
      "burn_duration_s": 18.0,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 141F001; test date: 5/5/10 (23:10:01 GMT).",
        "Ambient pressure: 538.3 mmHg (0.7083 atm); initial mole fractions: O2=.25, N2=.6, CO2=.15, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–091",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.51,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-092",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        25.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7057,
      "spread_rate_mm_s": null,
      "burn_duration_s": 21.7,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 061F002; test date: 6/14/10 (22:54:56 GMT).",
        "Ambient pressure: 536.3 mmHg (0.7057 atm); initial mole fractions: O2=.25, N2=.6, CO2=.15, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–092",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.41,
      "burning_rate_constant_mm2_s": [
        0.55
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-093",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        25.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.707,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.3,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: 149F001; test date: 6/15/10 (0:32:31 GMT).",
        "Ambient pressure: 537.3 mmHg (0.707 atm); initial mole fractions: O2=.25, N2=.6, CO2=.15, He=0.",
        "Visible flame extinction diameter: 0 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–093",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.48,
      "burning_rate_constant_mm2_s": [
        0.71
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-094",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7021,
      "spread_rate_mm_s": null,
      "burn_duration_s": 10.1,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C08H101; test date: 6/15/10 (2:10:43 GMT).",
        "Ambient pressure: 533.6 mmHg (0.7021 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: 2.76 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–094",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.53,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-095",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7032,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C08H201; test date: 6/15/10 (3:22:41 GMT).",
        "Ambient pressure: 534.4 mmHg (0.7032 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: 3.04 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–095",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.6,
      "burning_rate_constant_mm2_s": [
        0.58
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-096",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7032,
      "spread_rate_mm_s": null,
      "burn_duration_s": 5.2,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C08H301; test date: 6/15/10 (4:37:39 GMT).",
        "Ambient pressure: 534.4 mmHg (0.7032 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–096",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-097",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7029,
      "spread_rate_mm_s": null,
      "burn_duration_s": 26.5,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C08M101; test date: 6/16/10 (22:43:35 GMT).",
        "Ambient pressure: 534.2 mmHg (0.7029 atm); initial mole fractions: O2=.23, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: 2.6 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–097",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.25,
      "burning_rate_constant_mm2_s": [
        0.45
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-098",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7067,
      "spread_rate_mm_s": null,
      "burn_duration_s": 22.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C09M201; test date: 6/21/10 (14:21:26 GMT).",
        "Ambient pressure: 537.1 mmHg (0.7067 atm); initial mole fractions: O2=.23, N2=.52, CO2=.25, He=0.",
        "Visible flame extinction diameter: 1.74 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–098",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.64,
      "burning_rate_constant_mm2_s": [
        0.47
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-099",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7039,
      "spread_rate_mm_s": null,
      "burn_duration_s": 33.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C09M101; test date: 6/21/10 (12:57:34 GMT).",
        "Ambient pressure: 535 mmHg (0.7039 atm); initial mole fractions: O2=.23, N2=.52, CO2=.25, He=0.",
        "Visible flame extinction diameter: 2.32 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–099",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.28,
      "burning_rate_constant_mm2_s": [
        0.42
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-100",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7062,
      "spread_rate_mm_s": null,
      "burn_duration_s": 6.1,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C09H101; test date: 6/29/10 (8:30:46 GMT).",
        "Ambient pressure: 536.7 mmHg (0.7062 atm); initial mole fractions: O2=.23, N2=.52, CO2=.25, He=0.",
        "Visible flame extinction diameter: 3.98 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 22 (PDF p. 28), FLEX–100",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.14,
      "burning_rate_constant_mm2_s": [
        0.34
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-101",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7088,
      "spread_rate_mm_s": null,
      "burn_duration_s": 6.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C09H201; test date: 6/29/10 (9:38:10 GMT).",
        "Ambient pressure: 538.7 mmHg (0.7088 atm); initial mole fractions: O2=.23, N2=.52, CO2=.25, He=0.",
        "Visible flame extinction diameter: 3.45 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–101",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.88,
      "burning_rate_constant_mm2_s": [
        0.5
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-102",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7029,
      "spread_rate_mm_s": null,
      "burn_duration_s": 4.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C10H101; test date: 6/29/10 (11:21:09 GMT).",
        "Ambient pressure: 534.2 mmHg (0.7029 atm); initial mole fractions: O2=.21, N2=.49, CO2=.3, He=0.",
        "Visible flame extinction diameter: 3.43 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–102",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.57,
      "burning_rate_constant_mm2_s": [
        0.33
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-103",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.703,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C10H201; test date: 6/29/10 (11:56:02 GMT).",
        "Ambient pressure: 534.3 mmHg (0.703 atm); initial mole fractions: O2=.21, N2=.49, CO2=.3, He=0.",
        "Visible flame extinction diameter: 3.88 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–103",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.0,
      "burning_rate_constant_mm2_s": [
        0.35
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-104",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7028,
      "spread_rate_mm_s": null,
      "burn_duration_s": 23.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C08M201; test date: 6/16/10 (23:04:00 GMT).",
        "Ambient pressure: 534.1 mmHg (0.7028 atm); initial mole fractions: O2=.23, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: 1.58 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–104",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.6,
      "burning_rate_constant_mm2_s": [
        0.49
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-105",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7034,
      "spread_rate_mm_s": null,
      "burn_duration_s": 30.7,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C08M301; test date: 6/16/10 (23:29:19 GMT).",
        "Ambient pressure: 534.6 mmHg (0.7034 atm); initial mole fractions: O2=.23, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: 2 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–105",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.17,
      "burning_rate_constant_mm2_s": [
        0.47
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-106",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7083,
      "spread_rate_mm_s": null,
      "burn_duration_s": 14.1,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C09M401; test date: 6/21/10 (15:52:51 GMT).",
        "Ambient pressure: 538.3 mmHg (0.7083 atm); initial mole fractions: O2=.23, N2=.52, CO2=.25, He=0.",
        "Visible flame extinction diameter: 1.75 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–106",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.08,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-107",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7039,
      "spread_rate_mm_s": null,
      "burn_duration_s": 15.1,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C08M401; test date: 6/16/10 (23:51:26 GMT).",
        "Ambient pressure: 535 mmHg (0.7039 atm); initial mole fractions: O2=.23, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–107",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.18,
      "burning_rate_constant_mm2_s": [
        0.52
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-108",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7083,
      "spread_rate_mm_s": null,
      "burn_duration_s": 24.3,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C09M301; test date: 6/21/10 (15:35:57 GMT).",
        "Ambient pressure: 538.3 mmHg (0.7083 atm); initial mole fractions: O2=.23, N2=.52, CO2=.25, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–108",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.75,
      "burning_rate_constant_mm2_s": [
        0.47
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-109",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7059,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C10M102; test date: 8/31/10 (5:38:01 GMT).",
        "Ambient pressure: 536.5 mmHg (0.7059 atm); initial mole fractions: O2=.21, N2=.49, CO2=.3, He=0.",
        "Visible flame extinction diameter: 1.92 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–109",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.56,
      "burning_rate_constant_mm2_s": [
        0.42
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-110",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7066,
      "spread_rate_mm_s": null,
      "burn_duration_s": 13.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C10M201; test date: 8/31/10 (7:16:40 GMT).",
        "Ambient pressure: 537 mmHg (0.7066 atm); initial mole fractions: O2=.21, N2=.49, CO2=.3, He=0.",
        "Visible flame extinction diameter: 1.57 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–110",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.83,
      "burning_rate_constant_mm2_s": [
        0.45
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-111",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7064,
      "spread_rate_mm_s": null,
      "burn_duration_s": 16.4,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C10M303; test date: 8/31/10 (8:58:24 GMT).",
        "Ambient pressure: 536.9 mmHg (0.7064 atm); initial mole fractions: O2=.21, N2=.49, CO2=.3, He=0.",
        "Visible flame extinction diameter: 2.1 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–111",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.37,
      "burning_rate_constant_mm2_s": [
        0.45
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-112",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6983,
      "spread_rate_mm_s": null,
      "burn_duration_s": 25.2,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C10M401; test date: 9/1/10 (15:27:44 GMT).",
        "Ambient pressure: 530.7 mmHg (0.6983 atm); initial mole fractions: O2=.21, N2=.49, CO2=.3, He=0.",
        "Visible flame extinction diameter: 2.35 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–112",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.99,
      "burning_rate_constant_mm2_s": [
        0.43
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-113",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7034,
      "spread_rate_mm_s": null,
      "burn_duration_s": 18.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C11M101; test date: 9/1/10 (19:17:58 GMT).",
        "Ambient pressure: 534.6 mmHg (0.7034 atm); initial mole fractions: O2=.2, N2=.45, CO2=.35, He=0.",
        "Visible flame extinction diameter: 2.85 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–113",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.2,
      "burning_rate_constant_mm2_s": [
        0.49
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-114",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": null,
      "spread_rate_mm_s": null,
      "burn_duration_s": 18.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C11M201; test date: 9/6/10 (19:14:22 GMT).",
        "Ambient pressure printed as 0 mmHg in Table IX (treated as unrecorded -> null); initial mole fractions: O2=.2, N2=.45, CO2=.35, He=0.",
        "Visible flame extinction diameter: 1.68 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–114",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.23,
      "burning_rate_constant_mm2_s": [
        0.42
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-115",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.705,
      "spread_rate_mm_s": null,
      "burn_duration_s": 22.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C11M301; test date: 9/1/10 (20:40:16 GMT).",
        "Ambient pressure: 535.8 mmHg (0.705 atm); initial mole fractions: O2=.2, N2=.45, CO2=.35, He=0.",
        "Visible flame extinction diameter: 2.61 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–115",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.97,
      "burning_rate_constant_mm2_s": [
        0.41
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-116",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7057,
      "spread_rate_mm_s": null,
      "burn_duration_s": 16.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C11M401; test date: 9/1/10 (20:57:41 GMT).",
        "Ambient pressure: 536.3 mmHg (0.7057 atm); initial mole fractions: O2=.2, N2=.45, CO2=.35, He=0.",
        "Visible flame extinction diameter: 1.57 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–116",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.16,
      "burning_rate_constant_mm2_s": [
        0.46
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-117",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6988,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C11H101; test date: 9/6/10 (18:14:53 GMT).",
        "Ambient pressure: 531.1 mmHg (0.6988 atm); initial mole fractions: O2=.2, N2=.45, CO2=.35, He=0.",
        "Visible flame extinction diameter: 3.77 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–117",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.84,
      "burning_rate_constant_mm2_s": [
        0.25
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-118",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7011,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C11H201; test date: 9/6/10 (19:14:22 GMT).",
        "Ambient pressure: 532.8 mmHg (0.7011 atm); initial mole fractions: O2=.2, N2=.44, CO2=.35, He=0.",
        "Visible flame extinction diameter: 2.93 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–118",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.03,
      "burning_rate_constant_mm2_s": [
        0.38
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-119",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7008,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.3,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C12H103; test date: 9/7/10 (1:50:01 GMT).",
        "Ambient pressure: 532.6 mmHg (0.7008 atm); initial mole fractions: O2=.18, N2=.42, CO2=.4, He=0.",
        "Visible flame extinction diameter: 2.48 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–119",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.6,
      "burning_rate_constant_mm2_s": [
        0.37
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-120",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7007,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.43,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C12H201; test date: 9/7/10 (1:08:26 GMT).",
        "Ambient pressure: 532.5 mmHg (0.7007 atm); initial mole fractions: O2=.18, N2=.42, CO2=.4, He=0.",
        "Visible flame extinction diameter: 2.39 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–120",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.45,
      "burning_rate_constant_mm2_s": [
        0.38
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-121",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6925,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C12M101; test date: 9/8/10 (19:21:31 GMT).",
        "Ambient pressure: 526.3 mmHg (0.6925 atm); initial mole fractions: O2=.18, N2=.42, CO2=.4, He=0.",
        "Visible flame extinction diameter: 3.92 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–121",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.25,
      "burning_rate_constant_mm2_s": [
        0.34
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-122",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6989,
      "spread_rate_mm_s": null,
      "burn_duration_s": 13.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C12M201; test date: 9/8/10 (21:44:37 GMT).",
        "Ambient pressure: 531.2 mmHg (0.6989 atm); initial mole fractions: O2=.18, N2=.42, CO2=.4, He=0.",
        "Visible flame extinction diameter: 2.58 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–122",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.46,
      "burning_rate_constant_mm2_s": [
        0.41
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-123",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.7,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C12M301; test date: 9/8/10 (22:16:51 GMT).",
        "Ambient pressure: 532 mmHg (0.7 atm); initial mole fractions: O2=.18, N2=.42, CO2=.4, He=0.",
        "Visible flame extinction diameter: 3.79 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–123",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.13,
      "burning_rate_constant_mm2_s": [
        0.35
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-124",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7005,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C12M401; test date: 9/8/10 (22:45:54 GMT).",
        "Ambient pressure: 532.4 mmHg (0.7005 atm); initial mole fractions: O2=.18, N2=.42, CO2=.4, He=0.",
        "Visible flame extinction diameter: 2.74 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–124",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.87,
      "burning_rate_constant_mm2_s": [
        0.3
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-125",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7068,
      "spread_rate_mm_s": null,
      "burn_duration_s": 5.7,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C13M103; test date: 9/13/10 (21:07:02 GMT).",
        "Ambient pressure: 537.2 mmHg (0.7068 atm); initial mole fractions: O2=.17, N2=.38, CO2=.45, He=0.",
        "Visible flame extinction diameter: 3.37 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–125",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.63,
      "burning_rate_constant_mm2_s": [
        0.35
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-126",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7054,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.7,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C13M201; test date: 9/13/10 (18:11:39 GMT).",
        "Ambient pressure: 536.1 mmHg (0.7054 atm); initial mole fractions: O2=.17, N2=.38, CO2=.45, He=0.",
        "Visible flame extinction diameter: 1.84 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–126",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.8,
      "burning_rate_constant_mm2_s": [
        0.4
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-127",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7062,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C13M301; test date: 9/13/10 (19:22:49 GMT).",
        "Ambient pressure: 536.7 mmHg (0.7062 atm); initial mole fractions: O2=.17, N2=.38, CO2=.45, He=0.",
        "Visible flame extinction diameter: 2.53 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–127",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.22,
      "burning_rate_constant_mm2_s": [
        0.38
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-128",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.707,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C13M401; test date: 9/13/10 (19:49:24 GMT).",
        "Ambient pressure: 537.3 mmHg (0.707 atm); initial mole fractions: O2=.17, N2=.38, CO2=.45, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–128",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.91,
      "burning_rate_constant_mm2_s": [
        0.39
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-129",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7055,
      "spread_rate_mm_s": null,
      "burn_duration_s": 0.55,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C13H102; test date: 9/17/10 (1:32:49 GMT).",
        "Ambient pressure: 536.2 mmHg (0.7055 atm); initial mole fractions: O2=.17, N2=.38, CO2=.45, He=0.",
        "Visible flame extinction diameter: 3.34 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–129",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.33,
      "burning_rate_constant_mm2_s": [
        0.33
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-130",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7068,
      "spread_rate_mm_s": null,
      "burn_duration_s": 0.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C13H201; test date: 9/17/10 (3:55:59 GMT).",
        "Ambient pressure: 537.2 mmHg (0.7068 atm); initial mole fractions: O2=.17, N2=.38, CO2=.45, He=0.",
        "Visible flame extinction diameter: 2.89 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–130",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.91,
      "burning_rate_constant_mm2_s": [
        0.05
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-131",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0051,
      "spread_rate_mm_s": null,
      "burn_duration_s": 4.9,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C21H101; test date: 10/6/10 (11:28:52 GMT).",
        "Ambient pressure: 763.9 mmHg (1.0051 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: .52 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–131",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.72,
      "burning_rate_constant_mm2_s": [
        0.61
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-132",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0068,
      "spread_rate_mm_s": null,
      "burn_duration_s": 12.4,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C21H201; test date: 10/6/10 (12:59:06 GMT).",
        "Ambient pressure: 765.2 mmHg (1.0068 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: .53 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–132",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.63,
      "burning_rate_constant_mm2_s": [
        0.6
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-133",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0088,
      "spread_rate_mm_s": null,
      "burn_duration_s": 19.0,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C21H301; test date: 10/6/10 (13:59:59 GMT).",
        "Ambient pressure: 766.7 mmHg (1.0088 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: .55 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–133",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.25,
      "burning_rate_constant_mm2_s": [
        0.56
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-134",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0095,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C21H401; test date: 10/6/10 (14:57:06 GMT).",
        "Ambient pressure: 767.2 mmHg (1.0095 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: 2.88 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–134",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.66,
      "burning_rate_constant_mm2_s": [
        0.56
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-135",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0108,
      "spread_rate_mm_s": null,
      "burn_duration_s": 10.8,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C21H501; test date: 10/6/10 (16:22:15 GMT).",
        "Ambient pressure: 768.2 mmHg (1.0108 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: 0 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 23 (PDF p. 29), FLEX–135",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.78,
      "burning_rate_constant_mm2_s": [
        0.59
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-136",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0107,
      "spread_rate_mm_s": null,
      "burn_duration_s": 17.0,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C21H302; test date: 10/6/10 (17:30:58 GMT).",
        "Ambient pressure: 768.1 mmHg (1.0107 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–136",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.08,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-137",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0108,
      "spread_rate_mm_s": null,
      "burn_duration_s": 17.5,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C21H303; test date: 10/6/10 (17:53:35 GMT).",
        "Ambient pressure: 768.2 mmHg (1.0108 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–137",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.13,
      "burning_rate_constant_mm2_s": [
        0.55
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-138",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0113,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C21H304; test date: 10/6/10 (18:08:43 GMT).",
        "Ambient pressure: 768.6 mmHg (1.0113 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–138",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-139",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0105,
      "spread_rate_mm_s": null,
      "burn_duration_s": 5.4,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C21H305; test date: 10/6/10 (19:09:45 GMT).",
        "Ambient pressure: 768 mmHg (1.0105 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–139",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.75,
      "burning_rate_constant_mm2_s": [
        0.63
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-140",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.702,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.3,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C14M101; test date: 11/4/10 (16:52:39 GMT).",
        "Ambient pressure: 533.5 mmHg (0.702 atm); initial mole fractions: O2=.15, N2=.35, CO2=.5, He=0.",
        "Visible flame extinction diameter: 3.95 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–140",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.98,
      "burning_rate_constant_mm2_s": [
        0.2
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-141",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7028,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.3,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C14M201; test date: 11/4/10 (18:07:51 GMT).",
        "Ambient pressure: 534.1 mmHg (0.7028 atm); initial mole fractions: O2=.15, N2=.35, CO2=.5, He=0.",
        "Visible flame extinction diameter: 2.73 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–141",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.86,
      "burning_rate_constant_mm2_s": [
        0.3
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-142",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7033,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C14M301; test date: 11/4/10 (19:11:39 GMT).",
        "Ambient pressure: 534.5 mmHg (0.7033 atm); initial mole fractions: O2=.15, N2=.35, CO2=.5, He=0.",
        "Visible flame extinction diameter: 1.48 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–142",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.86,
      "burning_rate_constant_mm2_s": [
        0.39
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-143",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7036,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.7,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C14M302; test date: 11/4/10 (20:19:22 GMT).",
        "Ambient pressure: 534.7 mmHg (0.7036 atm); initial mole fractions: O2=.15, N2=.35, CO2=.5, He=0.",
        "Visible flame extinction diameter: 2.06 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–143",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.25,
      "burning_rate_constant_mm2_s": [
        0.36
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-144",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0025,
      "spread_rate_mm_s": null,
      "burn_duration_s": 23.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C01M101; test date: 11/16/10 (9:42:08 GMT).",
        "Ambient pressure: 761.9 mmHg (1.0025 atm); initial mole fractions: O2=.2, N2=.75, CO2=.05, He=0.",
        "Visible flame extinction diameter: 1.53 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–144",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.53,
      "burning_rate_constant_mm2_s": [
        0.45
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-145",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0046,
      "spread_rate_mm_s": null,
      "burn_duration_s": 20.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C01M201; test date: 11/16/10 (10:21:24 GMT).",
        "Ambient pressure: 763.5 mmHg (1.0046 atm); initial mole fractions: O2=.2, N2=.75, CO2=.05, He=0.",
        "Visible flame extinction diameter: 1.61 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–145",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.33,
      "burning_rate_constant_mm2_s": [
        0.45
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-146",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0072,
      "spread_rate_mm_s": null,
      "burn_duration_s": 39.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C01M301; test date: 11/16/10 (10:54:23 GMT).",
        "Ambient pressure: 765.5 mmHg (1.0072 atm); initial mole fractions: O2=.2, N2=.75, CO2=.05, He=0.",
        "Visible flame extinction diameter: 1.95 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–146",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.35,
      "burning_rate_constant_mm2_s": [
        0.41
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-147",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7049,
      "spread_rate_mm_s": null,
      "burn_duration_s": 7.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C13M102; test date: 9/13/10 (17:35:49 GMT).",
        "Ambient pressure: 535.7 mmHg (0.7049 atm); initial mole fractions: O2=.17, N2=.38, CO2=.45, He=0.",
        "Visible flame extinction diameter: 2.49 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–147",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.02,
      "burning_rate_constant_mm2_s": [
        0.4
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-148",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0058,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.8,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C01H101; test date: 11/18/10 (8:39:27 GMT).",
        "Ambient pressure: 764.4 mmHg (1.0058 atm); initial mole fractions: O2=.2, N2=.75, CO2=.05, He=0.",
        "Visible flame extinction diameter: 1.15 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–148",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.58,
      "burning_rate_constant_mm2_s": [
        0.54
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-149",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0082,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.9,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C01H201; test date: 11/18/10 (9:25:38 GMT).",
        "Ambient pressure: 766.2 mmHg (1.0082 atm); initial mole fractions: O2=.2, N2=.75, CO2=.05, He=0.",
        "Visible flame extinction diameter: .82 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–149",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.21,
      "burning_rate_constant_mm2_s": [
        0.53
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-150",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.01,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C01H302; test date: 11/18/10 (10:17:02 GMT).",
        "Ambient pressure: 767.6 mmHg (1.01 atm); initial mole fractions: O2=.2, N2=.75, CO2=.05, He=0.",
        "Visible flame extinction diameter: 2.54 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–150",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.18,
      "burning_rate_constant_mm2_s": [
        0.46
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-151",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0033,
      "spread_rate_mm_s": null,
      "burn_duration_s": 31.3,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C03M101; test date: 12/8/10 (18:31:22 GMT).",
        "Ambient pressure: 762.5 mmHg (1.0033 atm); initial mole fractions: O2=.18, N2=.67, CO2=.15, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–151",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.86,
      "burning_rate_constant_mm2_s": [
        0.36
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-152",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0066,
      "spread_rate_mm_s": null,
      "burn_duration_s": 23.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C03M201; test date: 12/8/10 (20:10:32 GMT).",
        "Ambient pressure: 765 mmHg (1.0066 atm); initial mole fractions: O2=.18, N2=.67, CO2=.15, He=0.",
        "Visible flame extinction diameter: 1.23 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–152",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.33,
      "burning_rate_constant_mm2_s": [
        0.43
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-153",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0074,
      "spread_rate_mm_s": null,
      "burn_duration_s": 15.7,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C03M301; test date: 12/8/10 (21:08:17 GMT).",
        "Ambient pressure: 765.6 mmHg (1.0074 atm); initial mole fractions: O2=.18, N2=.67, CO2=.15, He=0.",
        "Visible flame extinction diameter: 1.19 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–153",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.78,
      "burning_rate_constant_mm2_s": [
        0.42
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-154",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.003,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C03H101; test date: 12/9/10 (16:02:14 GMT).",
        "Ambient pressure: 762.3 mmHg (1.003 atm); initial mole fractions: O2=.18, N2=.67, CO2=.15, He=0.",
        "Visible flame extinction diameter: 3.6 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–154",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.7,
      "burning_rate_constant_mm2_s": [
        0.34
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-155",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0064,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.7,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C03H201; test date: 12/9/10 (17:49:08 GMT).",
        "Ambient pressure: 764.9 mmHg (1.0064 atm); initial mole fractions: O2=.18, N2=.67, CO2=.15, He=0.",
        "Visible flame extinction diameter: 2.52 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–155",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.73,
      "burning_rate_constant_mm2_s": [
        0.39
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-157",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0075,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.2,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C03H401; test date: 12/9/10 (19:12:27 GMT).",
        "Ambient pressure: 765.7 mmHg (1.0075 atm); initial mole fractions: O2=.18, N2=.67, CO2=.15, He=0.",
        "Visible flame extinction diameter: .45 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–157",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.34,
      "burning_rate_constant_mm2_s": [
        0.48
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-158",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        16.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0028,
      "spread_rate_mm_s": null,
      "burn_duration_s": 7.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C05M101; test date: 12/14/10 (13:41:00 GMT).",
        "Ambient pressure: 762.1 mmHg (1.0028 atm); initial mole fractions: O2=.16, N2=.59, CO2=.25, He=0.",
        "Visible flame extinction diameter: 3.96 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–158",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.24,
      "burning_rate_constant_mm2_s": [
        0.3
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-159",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        16.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0058,
      "spread_rate_mm_s": null,
      "burn_duration_s": 10.1,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C05M201; test date: 12/14/10 (14:30:46 GMT).",
        "Ambient pressure: 764.4 mmHg (1.0058 atm); initial mole fractions: O2=.16, N2=.59, CO2=.25, He=0.",
        "Visible flame extinction diameter: 3.22 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–159",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.7,
      "burning_rate_constant_mm2_s": [
        0.37
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-160",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        16.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0072,
      "spread_rate_mm_s": null,
      "burn_duration_s": 14.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C05M301; test date: 12/14/10 (15:17:59 GMT).",
        "Ambient pressure: 765.5 mmHg (1.0072 atm); initial mole fractions: O2=.16, N2=.59, CO2=.25, He=0.",
        "Visible flame extinction diameter: 1.34 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–160",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.71,
      "burning_rate_constant_mm2_s": [
        0.38
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-161",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        16.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.01,
      "spread_rate_mm_s": null,
      "burn_duration_s": 14.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C05M401; test date: 12/14/10 (17:51:58 GMT).",
        "Ambient pressure: 767.6 mmHg (1.01 atm); initial mole fractions: O2=.16, N2=.59, CO2=.25, He=0.",
        "Visible flame extinction diameter: 1.52 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–161",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.77,
      "burning_rate_constant_mm2_s": [
        0.38
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-162",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0043,
      "spread_rate_mm_s": null,
      "burn_duration_s": 6.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C06M101; test date: 12/28/10 (11:41:39 GMT).",
        "Ambient pressure: 763.3 mmHg (1.0043 atm); initial mole fractions: O2=.15, N2=.54, CO2=.32, He=0.",
        "Visible flame extinction diameter: 3.5 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–162",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.72,
      "burning_rate_constant_mm2_s": [
        0.28
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-163",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0058,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C06M201; test date: 12/28/10 (12:05:23 GMT).",
        "Ambient pressure: 764.4 mmHg (1.0058 atm); initial mole fractions: O2=.15, N2=.53, CO2=.32, He=0.",
        "Visible flame extinction diameter: 2.54 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–163",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.05,
      "burning_rate_constant_mm2_s": [
        0.37
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-164",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0078,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C06M301; test date: 12/28/10 (13:00:43 GMT).",
        "Ambient pressure: 765.9 mmHg (1.0078 atm); initial mole fractions: O2=.15, N2=.53, CO2=.32, He=0.",
        "Visible flame extinction diameter: 1.63 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–164",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.59,
      "burning_rate_constant_mm2_s": [
        0.37
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-165",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.008,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C06M401; test date: 12/28/10 (13:36:43 GMT).",
        "Ambient pressure: 766.1 mmHg (1.008 atm); initial mole fractions: O2=.15, N2=.53, CO2=.32, He=0.",
        "Visible flame extinction diameter: 1.79 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–165",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.59,
      "burning_rate_constant_mm2_s": [
        0.42
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-166",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0071,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C03H302; test date: 12/9/10 (18:51:34 GMT).",
        "Ambient pressure: 765.4 mmHg (1.0071 atm); initial mole fractions: O2=.18, N2=.67, CO2=.15, He=0.",
        "Visible flame extinction diameter: 1.39 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–166",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.96,
      "burning_rate_constant_mm2_s": [
        0.54
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-167",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        14.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0011,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C07M101; test date: 1/12/11 (21:56:45 GMT).",
        "Ambient pressure: 760.8 mmHg (1.0011 atm); initial mole fractions: O2=.14, N2=.5, CO2=.36, He=0.",
        "Visible flame extinction diameter: 3.08 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–167",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.22,
      "burning_rate_constant_mm2_s": [
        0.28
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-168",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        14.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0021,
      "spread_rate_mm_s": null,
      "burn_duration_s": 5.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C07M201; test date: 1/12/11 (22:11:40 GMT).",
        "Ambient pressure: 761.6 mmHg (1.0021 atm); initial mole fractions: O2=.14, N2=.5, CO2=.36, He=0.",
        "Visible flame extinction diameter: 1.84 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–168",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.32,
      "burning_rate_constant_mm2_s": [
        0.37
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-169",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0045,
      "spread_rate_mm_s": null,
      "burn_duration_s": 15.6,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C15M101; test date: 1/18/11 (12:54:25 GMT).",
        "Ambient pressure: 763.4 mmHg (1.0045 atm); initial mole fractions: O2=.21, N2=.64, CO2=.15, He=0.",
        "Visible flame extinction diameter: 1.57 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–169",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.03,
      "burning_rate_constant_mm2_s": [
        0.48
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-170",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.008,
      "spread_rate_mm_s": null,
      "burn_duration_s": 16.7,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C15M201; test date: 1/18/11 (14:19:29 GMT).",
        "Ambient pressure: 766.1 mmHg (1.008 atm); initial mole fractions: O2=.21, N2=.64, CO2=.15, He=0.",
        "Visible flame extinction diameter: 1.28 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–170",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.05,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-171",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0088,
      "spread_rate_mm_s": null,
      "burn_duration_s": 23.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C15M301; test date: 1/18/11 (15:58:46 GMT).",
        "Ambient pressure: 766.7 mmHg (1.0088 atm); initial mole fractions: O2=.21, N2=.64, CO2=.15, He=0.",
        "Visible flame extinction diameter: 1.59 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 24 (PDF p. 30), FLEX–171",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.53,
      "burning_rate_constant_mm2_s": [
        0.46
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-172",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9999,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C03H501; test date: 2/21/11 (17:56:40 GMT).",
        "Ambient pressure: 759.9 mmHg (0.9999 atm); initial mole fractions: O2=.18, N2=.67, CO2=.15, He=0.",
        "Visible flame extinction diameter: 3.68 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–172",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.74,
      "burning_rate_constant_mm2_s": [
        0.35
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-173",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0026,
      "spread_rate_mm_s": null,
      "burn_duration_s": 4.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C03H601; test date: 2/21/11 (19:07:48 GMT).",
        "Ambient pressure: 762 mmHg (1.0026 atm); initial mole fractions: O2=.18, N2=.67, CO2=.15, He=0.",
        "Visible flame extinction diameter: 1.96 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–173",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.4,
      "burning_rate_constant_mm2_s": [
        0.46
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-174",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0028,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.6,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C03H701; test date: 2/21/11 (19:17:37 GMT).",
        "Ambient pressure: 762.1 mmHg (1.0028 atm); initial mole fractions: O2=.18, N2=.67, CO2=.15, He=0.",
        "Visible flame extinction diameter: .47 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–174",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.35,
      "burning_rate_constant_mm2_s": [
        0.5
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-175",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6996,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.2,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C08H502; test date: 2/21/11 (22:15:54 GMT).",
        "Ambient pressure: 531.7 mmHg (0.6996 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: .21 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–175",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.5,
      "burning_rate_constant_mm2_s": [
        0.56
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-176",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7001,
      "spread_rate_mm_s": null,
      "burn_duration_s": 15.6,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C08H601; test date: 2/21/11 (22:43:37 GMT).",
        "Ambient pressure: 532.1 mmHg (0.7001 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–176",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.88,
      "burning_rate_constant_mm2_s": [
        0.55
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-177",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7064,
      "spread_rate_mm_s": null,
      "burn_duration_s": 38.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C08M501; test date: 4/18/11 (20:27:36 GMT).",
        "Ambient pressure: 536.9 mmHg (0.7064 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–177",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.53,
      "burning_rate_constant_mm2_s": [
        0.46
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-178",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7066,
      "spread_rate_mm_s": null,
      "burn_duration_s": 14.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C08M601; test date: 4/18/11 (20:52:24 GMT).",
        "Ambient pressure: 537 mmHg (0.7066 atm); initial mole fractions: O2=.24, N2=.56, CO2=.2, He=0.",
        "Visible flame extinction diameter: 1.35 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–178",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.02,
      "burning_rate_constant_mm2_s": [
        0.52
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-179",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7021,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C09H501; test date: 4/20/11 (17:56:25 GMT).",
        "Ambient pressure: 533.6 mmHg (0.7021 atm); initial mole fractions: O2=.23, N2=.52, CO2=.25, He=0.",
        "Visible flame extinction diameter: 2.61 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–179",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.32,
      "burning_rate_constant_mm2_s": [
        0.5
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-180",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7032,
      "spread_rate_mm_s": null,
      "burn_duration_s": 7.5,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C09H601; test date: 4/20/11 (18:22:58 GMT).",
        "Ambient pressure: 534.4 mmHg (0.7032 atm); initial mole fractions: O2=.23, N2=.52, CO2=.25, He=0.",
        "Visible flame extinction diameter: .48 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–180",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.07,
      "burning_rate_constant_mm2_s": [
        0.57
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-181",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        19.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9979,
      "spread_rate_mm_s": null,
      "burn_duration_s": 4.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C02H101; test date: 4/20/11 (20:00:24 GMT).",
        "Ambient pressure: 758.4 mmHg (0.9979 atm); initial mole fractions: O2=.19, N2=.71, CO2=.1, He=0.",
        "Visible flame extinction diameter: 3.13 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–181",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.4,
      "burning_rate_constant_mm2_s": [
        0.41
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-182",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        19.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9988,
      "spread_rate_mm_s": null,
      "burn_duration_s": 7.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C02H201; test date: 4/20/11 (21:14:08 GMT).",
        "Ambient pressure: 759.1 mmHg (0.9988 atm); initial mole fractions: O2=.19, N2=.71, CO2=.1, He=0.",
        "Visible flame extinction diameter: 1.68 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–182",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.48,
      "burning_rate_constant_mm2_s": [
        0.49
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-183",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        19.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9987,
      "spread_rate_mm_s": null,
      "burn_duration_s": 5.1,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C02H202; test date: 4/20/11 (21:26:02 GMT).",
        "Ambient pressure: 759 mmHg (0.9987 atm); initial mole fractions: O2=.19, N2=.71, CO2=.1, He=0.",
        "Visible flame extinction diameter: .49 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–183",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.64,
      "burning_rate_constant_mm2_s": [
        0.54
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-184",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7032,
      "spread_rate_mm_s": null,
      "burn_duration_s": 26.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C09M501; test date: 8/8/11 (13:14:11 GMT).",
        "Ambient pressure: 534.4 mmHg (0.7032 atm); initial mole fractions: O2=.23, N2=.52, CO2=.25, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–184",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.72,
      "burning_rate_constant_mm2_s": [
        0.53
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-185",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7041,
      "spread_rate_mm_s": null,
      "burn_duration_s": 15.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C09M502; test date: 8/8/11 (13:30:14 GMT).",
        "Ambient pressure: 535.1 mmHg (0.7041 atm); initial mole fractions: O2=.23, N2=.52, CO2=.25, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–185",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.42,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-186",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7042,
      "spread_rate_mm_s": null,
      "burn_duration_s": 12.7,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C09M601; test date: 8/8/11 (13:42:04 GMT).",
        "Ambient pressure: 535.2 mmHg (0.7042 atm); initial mole fractions: O2=.23, N2=.52, CO2=.25, He=0.",
        "Visible flame extinction diameter: 1.33 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–186",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.8,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-187",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7055,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C09M701; test date: 8/8/11 (14:52:15 GMT).",
        "Ambient pressure: 536.2 mmHg (0.7055 atm); initial mole fractions: O2=.23, N2=.52, CO2=.25, He=0.",
        "Visible flame extinction diameter: 1.21 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–187",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.47,
      "burning_rate_constant_mm2_s": [
        0.52
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-188",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        19.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9974,
      "spread_rate_mm_s": null,
      "burn_duration_s": 21.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C02M101; test date: 8/8/11 (16:16:48 GMT).",
        "Ambient pressure: 758 mmHg (0.9974 atm); initial mole fractions: O2=.19, N2=.71, CO2=.1, He=0.",
        "Visible flame extinction diameter: 1.29 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–188",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.38,
      "burning_rate_constant_mm2_s": [
        0.47
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-189",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        19.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9975,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C02M201; test date: 8/8/11 (17:49:19 GMT).",
        "Ambient pressure: 758.1 mmHg (0.9975 atm); initial mole fractions: O2=.19, N2=.71, CO2=.1, He=0.",
        "Visible flame extinction diameter: 1.08 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–189",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.47,
      "burning_rate_constant_mm2_s": [
        0.46
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-190",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0016,
      "spread_rate_mm_s": null,
      "burn_duration_s": 30.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C03M501; test date: 8/9/11 (10:53:21 GMT).",
        "Ambient pressure: 761.2 mmHg (1.0016 atm); initial mole fractions: O2=.18, N2=.67, CO2=.15, He=0.",
        "Visible flame extinction diameter: 1.78 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–190",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.77,
      "burning_rate_constant_mm2_s": [
        0.42
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-191",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0061,
      "spread_rate_mm_s": null,
      "burn_duration_s": 14.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C03M601; test date: 8/9/11 (12:28:41 GMT).",
        "Ambient pressure: 764.6 mmHg (1.0061 atm); initial mole fractions: O2=.18, N2=.67, CO2=.15, He=0.",
        "Visible flame extinction diameter: .95 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–191",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.74,
      "burning_rate_constant_mm2_s": [
        0.5
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-192",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.007,
      "spread_rate_mm_s": null,
      "burn_duration_s": 5.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C03M701; test date: 8/9/11 (12:46:53 GMT).",
        "Ambient pressure: 765.3 mmHg (1.007 atm); initial mole fractions: O2=.18, N2=.67, CO2=.15, He=0.",
        "Visible flame extinction diameter: .81 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–192",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.76,
      "burning_rate_constant_mm2_s": [
        0.46
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-193",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9993,
      "spread_rate_mm_s": null,
      "burn_duration_s": 21.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C04M101; test date: 8/9/11 (17:07:27 GMT).",
        "Ambient pressure: 759.5 mmHg (0.9993 atm); initial mole fractions: O2=.17, N2=.63, CO2=.2, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–193",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.46,
      "burning_rate_constant_mm2_s": [
        0.39
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-194",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9988,
      "spread_rate_mm_s": null,
      "burn_duration_s": 15.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C04M201; test date: 8/9/11 (18:26:45 GMT).",
        "Ambient pressure: 759.1 mmHg (0.9988 atm); initial mole fractions: O2=.17, N2=.63, CO2=.2, He=0.",
        "Visible flame extinction diameter: 1.27 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–194",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.77,
      "burning_rate_constant_mm2_s": [
        0.4
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-195",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9895,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C04H101; test date: 8/17/11 (22:31:20 GMT).",
        "Ambient pressure: 752 mmHg (0.9895 atm); initial mole fractions: O2=.17, N2=.63, CO2=.2, He=0.",
        "Visible flame extinction diameter: 3.71 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–195",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.76,
      "burning_rate_constant_mm2_s": [
        0.29
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-196",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9901,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C04H201; test date: 8/17/11 (22:53:58 GMT).",
        "Ambient pressure: 752.5 mmHg (0.9901 atm); initial mole fractions: O2=.17, N2=.63, CO2=.2, He=0.",
        "Visible flame extinction diameter: 2.79 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–196",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.9,
      "burning_rate_constant_mm2_s": [
        0.36
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-197",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9979,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C01H501; test date: 8/18/11 (0:24:31 GMT).",
        "Ambient pressure: 758.4 mmHg (0.9979 atm); initial mole fractions: O2=.2, N2=.75, CO2=.05, He=0.",
        "Visible flame extinction diameter: 2.28 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–197",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.06,
      "burning_rate_constant_mm2_s": [
        0.52
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-198",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9997,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.1,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C01H601; test date: 8/18/11 (1:38:10 GMT).",
        "Ambient pressure: 759.8 mmHg (0.9997 atm); initial mole fractions: O2=.2, N2=.75, CO2=.05, He=0.",
        "Visible flame extinction diameter: 2.33 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–198",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.04,
      "burning_rate_constant_mm2_s": [
        0.49
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-199",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0001,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.7,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C01H701; test date: 8/18/11 (1:55:56 GMT).",
        "Ambient pressure: 760.1 mmHg (1.0001 atm); initial mole fractions: O2=.2, N2=.75, CO2=.05, He=0.",
        "Visible flame extinction diameter: .13 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–199",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.12,
      "burning_rate_constant_mm2_s": [
        0.53
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-200",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9921,
      "spread_rate_mm_s": null,
      "burn_duration_s": 21.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C01M501; test date: 8/24/11 (15:07:47 GMT).",
        "Ambient pressure: 754 mmHg (0.9921 atm); initial mole fractions: O2=.2, N2=.75, CO2=.05, He=0.",
        "Visible flame extinction diameter: .98 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–200",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.37,
      "burning_rate_constant_mm2_s": [
        0.49
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-201",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9949,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.7,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C01M602; test date: 8/24/11 (15:56:17 GMT).",
        "Ambient pressure: 756.1 mmHg (0.9949 atm); initial mole fractions: O2=.2, N2=.75, CO2=.05, He=0.",
        "Visible flame extinction diameter: 1.13 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–201",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.57,
      "burning_rate_constant_mm2_s": [
        0.47
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-202",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9959,
      "spread_rate_mm_s": null,
      "burn_duration_s": 10.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: C01M603; test date: 8/24/11 (16:18:58 GMT).",
        "Ambient pressure: 756.9 mmHg (0.9959 atm); initial mole fractions: O2=.2, N2=.75, CO2=.05, He=0.",
        "Visible flame extinction diameter: 1.05 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–202",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.4,
      "burning_rate_constant_mm2_s": [
        0.48
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-203",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0003,
      "spread_rate_mm_s": null,
      "burn_duration_s": 19.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N01M101; test date: 8/24/11 (21:05:01 GMT).",
        "Ambient pressure: 760.2 mmHg (1.0003 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.42 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–203",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.3,
      "burning_rate_constant_mm2_s": [
        0.47
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-204",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0021,
      "spread_rate_mm_s": null,
      "burn_duration_s": 12.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N01M201; test date: 8/24/11 (21:58:36 GMT).",
        "Ambient pressure: 761.6 mmHg (1.0021 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.11 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–204",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.75,
      "burning_rate_constant_mm2_s": [
        0.52
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-206",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9954,
      "spread_rate_mm_s": null,
      "burn_duration_s": 23.9,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N01H101; test date: 8/29/11 (19:04:50 GMT).",
        "Ambient pressure: 756.5 mmHg (0.9954 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 25 (PDF p. 31), FLEX–206",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.56,
      "burning_rate_constant_mm2_s": [
        0.43
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-207",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9964,
      "spread_rate_mm_s": null,
      "burn_duration_s": 24.0,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N01H102; test date: 8/29/11 (19:21:49 GMT).",
        "Ambient pressure: 757.3 mmHg (0.9964 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–207",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.58,
      "burning_rate_constant_mm2_s": [
        0.42
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-208",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0003,
      "spread_rate_mm_s": null,
      "burn_duration_s": 17.1,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N01H201; test date: 8/29/11 (20:28:30 GMT).",
        "Ambient pressure: 760.2 mmHg (1.0003 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: .47 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–208",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.96,
      "burning_rate_constant_mm2_s": [
        0.5
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-209",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0036,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.5,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N01H202; test date: 8/29/11 (21:54:40 GMT).",
        "Ambient pressure: 762.7 mmHg (1.0036 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.13 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–209",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.72,
      "burning_rate_constant_mm2_s": [
        0.54
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-210",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0038,
      "spread_rate_mm_s": null,
      "burn_duration_s": 12.8,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N01H301; test date: 8/29/11 (22:19:47 GMT).",
        "Ambient pressure: 762.9 mmHg (1.0038 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–210",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.92,
      "burning_rate_constant_mm2_s": [
        0.69
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-211",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        16.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9997,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N02H101; test date: 8/29/11 (23:36:18 GMT).",
        "Ambient pressure: 759.8 mmHg (0.9997 atm); initial mole fractions: O2=.16, N2=.84, CO2=0, He=0.",
        "Visible flame extinction diameter: 3.18 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–211",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.34,
      "burning_rate_constant_mm2_s": [
        0.34
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-212",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        16.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9997,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N02H201; test date: 8/29/11 (23:51:11 GMT).",
        "Ambient pressure: 759.8 mmHg (0.9997 atm); initial mole fractions: O2=.16, N2=.84, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–212",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-214",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        16.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9999,
      "spread_rate_mm_s": null,
      "burn_duration_s": 4.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N02H203; test date: 8/30/11 (0:58:06 GMT).",
        "Ambient pressure: 759.9 mmHg (0.9999 atm); initial mole fractions: O2=.16, N2=.84, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.13 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–214",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.52,
      "burning_rate_constant_mm2_s": [
        0.42
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-215",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0053,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N03H101; test date: 9/1/11 (19:44:42 GMT).",
        "Ambient pressure: 764 mmHg (1.0053 atm); initial mole fractions: O2=.15, N2=.85, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.31 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–215",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.55,
      "burning_rate_constant_mm2_s": [
        0.37
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-216",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0082,
      "spread_rate_mm_s": null,
      "burn_duration_s": 6.7,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N03H201; test date: 9/1/11 (21:02:30 GMT).",
        "Ambient pressure: 766.2 mmHg (1.0082 atm); initial mole fractions: O2=.15, N2=.85, CO2=0, He=0.",
        "Visible flame extinction diameter: .33 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–216",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.77,
      "burning_rate_constant_mm2_s": [
        0.47
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-217",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        14.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9997,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N04H101; test date: 9/1/11 (22:54:16 GMT).",
        "Ambient pressure: 759.8 mmHg (0.9997 atm); initial mole fractions: O2=.14, N2=.86, CO2=0, He=0.",
        "Visible flame extinction diameter: 4.15 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–217",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 4.16,
      "burning_rate_constant_mm2_s": [
        0.24
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-218",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        14.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9999,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N04H201; test date: 9/1/11 (23:17:17 GMT).",
        "Ambient pressure: 759.9 mmHg (0.9999 atm); initial mole fractions: O2=.14, N2=.86, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–218",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.83,
      "burning_rate_constant_mm2_s": [
        0.39
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-219",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        14.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9968,
      "spread_rate_mm_s": null,
      "burn_duration_s": 26.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N04M101; test date: 9/8/11 (17:00:27 GMT).",
        "Ambient pressure: 757.6 mmHg (0.9968 atm); initial mole fractions: O2=.14, N2=.86, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–219",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.5,
      "burning_rate_constant_mm2_s": [
        0.3
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-220",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        14.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9978,
      "spread_rate_mm_s": null,
      "burn_duration_s": 15.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N04M201; test date: 9/8/11 (17:21:15 GMT).",
        "Ambient pressure: 758.3 mmHg (0.9978 atm); initial mole fractions: O2=.14, N2=.86, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.27 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–220",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.67,
      "burning_rate_constant_mm2_s": [
        0.38
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-221",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        13.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9992,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N05M101; test date: 9/8/11 (19:00:48 GMT).",
        "Ambient pressure: 759.4 mmHg (0.9992 atm); initial mole fractions: O2=.13, N2=.87, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.96 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–221",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.46,
      "burning_rate_constant_mm2_s": [
        0.36
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-222",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        13.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0008,
      "spread_rate_mm_s": null,
      "burn_duration_s": 16.3,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N05M201; test date: 9/8/11 (20:24:20 GMT).",
        "Ambient pressure: 760.6 mmHg (1.0008 atm); initial mole fractions: O2=.13, N2=.87, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.46 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–222",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.75,
      "burning_rate_constant_mm2_s": [
        0.35
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-223",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        12.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0021,
      "spread_rate_mm_s": null,
      "burn_duration_s": 6.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N06M101; test date: 9/9/11 (13:09:53 GMT).",
        "Ambient pressure: 761.6 mmHg (1.0021 atm); initial mole fractions: O2=.12, N2=.88, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.09 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–223",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.6,
      "burning_rate_constant_mm2_s": [
        0.36
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-224",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        12.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0025,
      "spread_rate_mm_s": null,
      "burn_duration_s": 7.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N06M201; test date: 9/9/11 (13:28:43 GMT).",
        "Ambient pressure: 761.9 mmHg (1.0025 atm); initial mole fractions: O2=.12, N2=.88, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.05 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–224",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.94,
      "burning_rate_constant_mm2_s": [
        0.35
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-225",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        12.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0049,
      "spread_rate_mm_s": null,
      "burn_duration_s": 6.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N06M202; test date: 9/9/11 (14:26:07 GMT).",
        "Ambient pressure: 763.7 mmHg (1.0049 atm); initial mole fractions: O2=.12, N2=.88, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.04 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–225",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.84,
      "burning_rate_constant_mm2_s": [
        0.38
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-226",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9989,
      "spread_rate_mm_s": null,
      "burn_duration_s": 14.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H01M102; test date: 9/9/11 (17:41:47 GMT).",
        "Ambient pressure: 759.2 mmHg (0.9989 atm); initial mole fractions: O2=.2, N2=.75, CO2=0, He=.05.",
        "Visible flame extinction diameter: 1.12 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–226",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.91,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-227",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9995,
      "spread_rate_mm_s": null,
      "burn_duration_s": 6.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H01M104; test date: 9/9/11 (18:27:14 GMT).",
        "Ambient pressure: 759.6 mmHg (0.9995 atm); initial mole fractions: O2=.2, N2=.75, CO2=0, He=.05.",
        "Visible flame extinction diameter: not reported (–).",
        "Burn duration reported as approximate (~6 s) in Table IX."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–227",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-229",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9938,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.0,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H01H102; test date: 9/13/11 (11:55:40 GMT).",
        "Ambient pressure: 755.3 mmHg (0.9938 atm); initial mole fractions: O2=.2, N2=.75, CO2=0, He=.05.",
        "Visible flame extinction diameter: not reported (–).",
        "Burn duration reported as approximate (~9 s) in Table IX."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–229",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.25,
      "burning_rate_constant_mm2_s": [
        0.57
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-230",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9954,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.8,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H01H103; test date: 9/13/11 (12:22:18 GMT).",
        "Ambient pressure: 756.5 mmHg (0.9954 atm); initial mole fractions: O2=.2, N2=.75, CO2=0, He=.05.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–230",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.3,
      "burning_rate_constant_mm2_s": [
        0.58
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-231",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        19.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9913,
      "spread_rate_mm_s": null,
      "burn_duration_s": 12.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H02M101; test date: 9/21/11 (22:28:54 GMT).",
        "Ambient pressure: 753.4 mmHg (0.9913 atm); initial mole fractions: O2=.19, N2=.71, CO2=0, He=.1.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–231",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.78,
      "burning_rate_constant_mm2_s": [
        0.57
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-232",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9989,
      "spread_rate_mm_s": null,
      "burn_duration_s": 12.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H03M101; test date: 9/22/11 (0:02:52 GMT).",
        "Ambient pressure: 759.2 mmHg (0.9989 atm); initial mole fractions: O2=.18, N2=.67, CO2=0, He=.15.",
        "Visible flame extinction diameter: 1.3 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–232",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.79,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-233",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0004,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.7,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H03M201; test date: 9/22/11 (0:44:55 GMT).",
        "Ambient pressure: 760.3 mmHg (1.0004 atm); initial mole fractions: O2=.18, N2=.67, CO2=0, He=.15.",
        "Visible flame extinction diameter: 1.67 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–233",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.95,
      "burning_rate_constant_mm2_s": [
        0.53
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-234",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0097,
      "spread_rate_mm_s": null,
      "burn_duration_s": 17.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N01H401; test date: 9/23/11 (23:18:09 GMT).",
        "Ambient pressure: 767.4 mmHg (1.0097 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 1.37 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–234",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.32,
      "burning_rate_constant_mm2_s": [
        0.52
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-235",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0107,
      "spread_rate_mm_s": null,
      "burn_duration_s": 10.6,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N01H502; test date: 9/24/11 (0:06:41 GMT).",
        "Ambient pressure: 768.1 mmHg (1.0107 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–235",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.39,
      "burning_rate_constant_mm2_s": [
        0.57
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-236",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0121,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: N01H601; test date: 9/24/11 (1:06:33 GMT).",
        "Ambient pressure: 769.2 mmHg (1.0121 atm); initial mole fractions: O2=.21, N2=.79, CO2=0, He=0.",
        "Visible flame extinction diameter: 2.85 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–236",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.65,
      "burning_rate_constant_mm2_s": [
        0.57
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-237",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        19.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9984,
      "spread_rate_mm_s": null,
      "burn_duration_s": 12.0,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H02H101; test date: 9/24/11 (2:44:09 GMT).",
        "Ambient pressure: 758.8 mmHg (0.9984 atm); initial mole fractions: O2=.19, N2=.71, CO2=0, He=.1.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–237",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.59,
      "burning_rate_constant_mm2_s": [
        0.54
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-238",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0049,
      "spread_rate_mm_s": null,
      "burn_duration_s": 4.1,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H03H101; test date: 9/27/11 (12:08:14 GMT).",
        "Ambient pressure: 763.7 mmHg (1.0049 atm); initial mole fractions: O2=.18, N2=.67, CO2=0, He=.15.",
        "Visible flame extinction diameter: 3.28 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–238",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.52,
      "burning_rate_constant_mm2_s": [
        0.41
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-239",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0078,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.1,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H03H201; test date: 9/27/11 (13:00:54 GMT).",
        "Ambient pressure: 765.9 mmHg (1.0078 atm); initial mole fractions: O2=.18, N2=.67, CO2=0, He=.15.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–239",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.3,
      "burning_rate_constant_mm2_s": [
        0.49
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-240",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0086,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.6,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H03H202; test date: 9/27/11 (13:25:07 GMT).",
        "Ambient pressure: 766.5 mmHg (1.0086 atm); initial mole fractions: O2=.18, N2=.67, CO2=0, He=.15.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–240",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.27,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-241",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9991,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H04H101; test date: 9/27/11 (15:00:33 GMT).",
        "Ambient pressure: 759.3 mmHg (0.9991 atm); initial mole fractions: O2=.17, N2=.63, CO2=0, He=.2.",
        "Visible flame extinction diameter: 2.6 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 26 (PDF p. 32), FLEX–241",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.85,
      "burning_rate_constant_mm2_s": [
        0.46
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-242",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9991,
      "spread_rate_mm_s": null,
      "burn_duration_s": 4.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H04H201; test date: 9/27/11 (15:12:24 GMT).",
        "Ambient pressure: 759.3 mmHg (0.9991 atm); initial mole fractions: O2=.17, N2=.63, CO2=0, He=.2.",
        "Visible flame extinction diameter: 1.39 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–242",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.12,
      "burning_rate_constant_mm2_s": [
        0.59
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-243",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9995,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.7,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H04H302; test date: 9/27/11 (16:18:19 GMT).",
        "Ambient pressure: 759.6 mmHg (0.9995 atm); initial mole fractions: O2=.17, N2=.63, CO2=0, He=.2.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–243",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-244",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9997,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.7,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H04H303; test date: 9/27/11 (16:40:04 GMT).",
        "Ambient pressure: 759.8 mmHg (0.9997 atm); initial mole fractions: O2=.17, N2=.63, CO2=0, He=.2.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–244",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.61,
      "burning_rate_constant_mm2_s": [
        0.91
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-245",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9924,
      "spread_rate_mm_s": null,
      "burn_duration_s": 9.1,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H04M101; test date: 10/1/11 (0:34:58 GMT).",
        "Ambient pressure: 754.2 mmHg (0.9924 atm); initial mole fractions: O2=.17, N2=.63, CO2=0, He=.2.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–245",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.99,
      "burning_rate_constant_mm2_s": [
        0.49
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-246",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9961,
      "spread_rate_mm_s": null,
      "burn_duration_s": 13.1,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H04M202; test date: 10/1/11 (1:21:41 GMT).",
        "Ambient pressure: 757 mmHg (0.9961 atm); initial mole fractions: O2=.17, N2=.63, CO2=0, He=.2.",
        "Visible flame extinction diameter: 1.42 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–246",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.9,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-247",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        16.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9999,
      "spread_rate_mm_s": null,
      "burn_duration_s": 7.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H05M102; test date: 10/1/11 (2:58:40 GMT).",
        "Ambient pressure: 759.9 mmHg (0.9999 atm); initial mole fractions: O2=.16, N2=.59, CO2=0, He=.25.",
        "Visible flame extinction diameter: 2.79 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–247",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.4,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-248",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        16.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0013,
      "spread_rate_mm_s": null,
      "burn_duration_s": 5.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H05M202; test date: 10/1/11 (4:26:52 GMT).",
        "Ambient pressure: 761 mmHg (1.0013 atm); initial mole fractions: O2=.16, N2=.59, CO2=0, He=.25.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–248",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-249",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        16.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9972,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H05H103; test date: 10/5/11 (14:58:32 GMT).",
        "Ambient pressure: 757.9 mmHg (0.9972 atm); initial mole fractions: O2=.16, N2=.59, CO2=0, He=.25.",
        "Visible flame extinction diameter: .69 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–249",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.49,
      "burning_rate_constant_mm2_s": [
        0.6
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-250",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9942,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H06M102; test date: 10/7/11 (12:12:14 GMT).",
        "Ambient pressure: 755.6 mmHg (0.9942 atm); initial mole fractions: O2=.15, N2=.55, CO2=0, He=.3.",
        "Visible flame extinction diameter: 3.47 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–250",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.67,
      "burning_rate_constant_mm2_s": [
        0.43
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-251",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        15.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9957,
      "spread_rate_mm_s": null,
      "burn_duration_s": 4.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H06M201; test date: 10/7/11 (13:00:56 GMT).",
        "Ambient pressure: 756.7 mmHg (0.9957 atm); initial mole fractions: O2=.15, N2=.55, CO2=0, He=.3.",
        "Visible flame extinction diameter: 2.06 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–251",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.52,
      "burning_rate_constant_mm2_s": [
        0.56
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-252",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        14.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9989,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H07M101; test date: 10/7/11 (14:25:42 GMT).",
        "Ambient pressure: 759.2 mmHg (0.9989 atm); initial mole fractions: O2=.14, N2=.51, CO2=0, He=.35.",
        "Visible flame extinction diameter: 2.26 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–252",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.44,
      "burning_rate_constant_mm2_s": [
        0.56
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-253",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        14.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.9997,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H07M202; test date: 10/7/11 (15:06:17 GMT).",
        "Ambient pressure: 759.8 mmHg (0.9997 atm); initial mole fractions: O2=.14, N2=.51, CO2=0, He=.35.",
        "Visible flame extinction diameter: 1.73 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–253",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.88,
      "burning_rate_constant_mm2_s": [
        0.58
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-254",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        13.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0046,
      "spread_rate_mm_s": null,
      "burn_duration_s": 0.3,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H08M101; test date: 10/11/11 (12:11:56 GMT).",
        "Ambient pressure: 763.5 mmHg (1.0046 atm); initial mole fractions: O2=.13, N2=.47, CO2=0, He=.4.",
        "Visible flame extinction diameter: 3.54 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–254",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.56,
      "burning_rate_constant_mm2_s": [
        0.51
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-255",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7026,
      "spread_rate_mm_s": null,
      "burn_duration_s": 12.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H10H101; test date: 10/12/11 (20:16:43 GMT).",
        "Ambient pressure: 534 mmHg (0.7026 atm); initial mole fractions: O2=.24, N2=.56, CO2=0, He=.2.",
        "Visible flame extinction diameter: 2.52 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–255",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.78,
      "burning_rate_constant_mm2_s": [
        0.72
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-256",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7003,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.4,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H11H101; test date: 10/12/11 (21:58:55 GMT).",
        "Ambient pressure: 532.2 mmHg (0.7003 atm); initial mole fractions: O2=.23, N2=.52, CO2=0, He=.25.",
        "Visible flame extinction diameter: .12 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–256",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.8,
      "burning_rate_constant_mm2_s": [
        0.71
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-257",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.703,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.2,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H10M101; test date: 11/18/11 (14:48:10 GMT).",
        "Ambient pressure: 534.3 mmHg (0.703 atm); initial mole fractions: O2=.24, N2=.56, CO2=0, He=.2.",
        "Visible flame extinction diameter: 1.03 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–257",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.82,
      "burning_rate_constant_mm2_s": [
        0.62
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-258",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        24.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7034,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.1,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H10M102; test date: 11/18/11 (15:19:28 GMT).",
        "Ambient pressure: 534.6 mmHg (0.7034 atm); initial mole fractions: O2=.24, N2=.56, CO2=0, He=.2.",
        "Visible flame extinction diameter: 1.53 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–258",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.79,
      "burning_rate_constant_mm2_s": [
        0.7
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-259",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6996,
      "spread_rate_mm_s": null,
      "burn_duration_s": 8.3,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H11M101; test date: 11/18/11 (16:59:20 GMT).",
        "Ambient pressure: 531.7 mmHg (0.6996 atm); initial mole fractions: O2=.23, N2=.52, CO2=0, He=.25.",
        "Visible flame extinction diameter: .86 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–259",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.45,
      "burning_rate_constant_mm2_s": [
        0.6
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-260",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        23.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6997,
      "spread_rate_mm_s": null,
      "burn_duration_s": 6.3,
      "outcome": "disruption",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H11M102; test date: 11/18/11 (17:51:23 GMT).",
        "Ambient pressure: 531.8 mmHg (0.6997 atm); initial mole fractions: O2=.23, N2=.52, CO2=0, He=.25.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–260",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.61,
      "burning_rate_constant_mm2_s": [
        0.73
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-261",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6999,
      "spread_rate_mm_s": null,
      "burn_duration_s": 10.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H12M101; test date: 11/18/11 (18:53:50 GMT).",
        "Ambient pressure: 531.9 mmHg (0.6999 atm); initial mole fractions: O2=.21, N2=.49, CO2=0, He=.3.",
        "Visible flame extinction diameter: not reported (–)."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–261",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.22,
      "burning_rate_constant_mm2_s": [
        0.56
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-262",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6989,
      "spread_rate_mm_s": null,
      "burn_duration_s": 12.1,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H12M102; test date: 11/18/11 (21:29:35 GMT).",
        "Ambient pressure: 531.2 mmHg (0.6989 atm); initial mole fractions: O2=.21, N2=.49, CO2=0, He=.3.",
        "Visible flame extinction diameter: 1.78 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–262",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.25,
      "burning_rate_constant_mm2_s": [
        0.65
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-263",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6989,
      "spread_rate_mm_s": null,
      "burn_duration_s": 7.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H12M201; test date: 11/18/11 (21:53:16 GMT).",
        "Ambient pressure: 531.2 mmHg (0.6989 atm); initial mole fractions: O2=.21, N2=.49, CO2=0, He=.3.",
        "Visible flame extinction diameter: 1.42 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–263",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.67,
      "burning_rate_constant_mm2_s": [
        0.7
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-264",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6968,
      "spread_rate_mm_s": null,
      "burn_duration_s": 7.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H12H101; test date: 11/22/11 (13:04:17 GMT).",
        "Ambient pressure: 529.6 mmHg (0.6968 atm); initial mole fractions: O2=.21, N2=.49, CO2=0, He=.3.",
        "Visible flame extinction diameter: 2.33 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–264",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.23,
      "burning_rate_constant_mm2_s": [
        0.67
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-265",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6961,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H12H201; test date: 11/22/11 (15:49:36 GMT).",
        "Ambient pressure: 529 mmHg (0.6961 atm); initial mole fractions: O2=.21, N2=.49, CO2=0, He=.3.",
        "Visible flame extinction diameter: .71 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–265",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.86,
      "burning_rate_constant_mm2_s": [
        0.7
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-266",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7007,
      "spread_rate_mm_s": null,
      "burn_duration_s": 4.3,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H13H101; test date: 11/22/11 (20:40:42 GMT).",
        "Ambient pressure: 532.5 mmHg (0.7007 atm); initial mole fractions: O2=.2, N2=.45, CO2=0, He=.35.",
        "Visible flame extinction diameter: 3.32 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–266",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.69,
      "burning_rate_constant_mm2_s": [
        0.61
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-267",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7,
      "spread_rate_mm_s": null,
      "burn_duration_s": 5.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H13H201; test date: 11/22/11 (20:58:21 GMT).",
        "Ambient pressure: 532 mmHg (0.7 atm); initial mole fractions: O2=.2, N2=.45, CO2=0, He=.35.",
        "Visible flame extinction diameter: 1.69 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–267",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.08,
      "burning_rate_constant_mm2_s": [
        0.67
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-268",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6942,
      "spread_rate_mm_s": null,
      "burn_duration_s": 17.4,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H13M102; test date: 11/28/11 (13:13:31 GMT).",
        "Ambient pressure: 527.6 mmHg (0.6942 atm); initial mole fractions: O2=.2, N2=.45, CO2=0, He=.35.",
        "Visible flame extinction diameter: 2.24 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–268",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.87,
      "burning_rate_constant_mm2_s": [
        0.6
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-269",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        20.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6946,
      "spread_rate_mm_s": null,
      "burn_duration_s": 10.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H13M201; test date: 11/28/11 (13:24:55 GMT).",
        "Ambient pressure: 527.9 mmHg (0.6946 atm); initial mole fractions: O2=.2, N2=.45, CO2=0, He=.35.",
        "Visible flame extinction diameter: 1.5 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–269",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.95,
      "burning_rate_constant_mm2_s": [
        0.63
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-270",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7005,
      "spread_rate_mm_s": null,
      "burn_duration_s": 7.8,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H14M101; test date: 11/28/11 (15:07:28 GMT).",
        "Ambient pressure: 532.4 mmHg (0.7005 atm); initial mole fractions: O2=.18, N2=.42, CO2=0, He=.4.",
        "Visible flame extinction diameter: 2.67 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–270",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.5,
      "burning_rate_constant_mm2_s": [
        0.59
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-271",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7012,
      "spread_rate_mm_s": null,
      "burn_duration_s": 5.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H14M201; test date: 11/28/11 (15:35:38 GMT).",
        "Ambient pressure: 532.9 mmHg (0.7012 atm); initial mole fractions: O2=.18, N2=.42, CO2=0, He=.4.",
        "Visible flame extinction diameter: 1.92 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–271",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.7,
      "burning_rate_constant_mm2_s": [
        0.63
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-272",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7016,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.3,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H14M202; test date: 11/28/11 (15:54:09 GMT).",
        "Ambient pressure: 533.2 mmHg (0.7016 atm); initial mole fractions: O2=.18, N2=.42, CO2=0, He=.4.",
        "Visible flame extinction diameter: 1.3 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–272",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.84,
      "burning_rate_constant_mm2_s": [
        0.62
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-273",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6947,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H14H101; test date: 11/30/11 (8:39:18 GMT).",
        "Ambient pressure: 528 mmHg (0.6947 atm); initial mole fractions: O2=.18, N2=.42, CO2=0, He=.4.",
        "Visible flame extinction diameter: 1.64 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–273",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.27,
      "burning_rate_constant_mm2_s": [
        0.71
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-274",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        18.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6978,
      "spread_rate_mm_s": null,
      "burn_duration_s": 3.5,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H14H201; test date: 11/30/11 (9:49:07 GMT).",
        "Ambient pressure: 530.3 mmHg (0.6978 atm); initial mole fractions: O2=.18, N2=.42, CO2=0, He=.4.",
        "Visible flame extinction diameter: .84 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–274",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.86,
      "burning_rate_constant_mm2_s": [
        0.77
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-275",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7003,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H15H101; test date: 11/30/11 (11:30:51 GMT).",
        "Ambient pressure: 532.2 mmHg (0.7003 atm); initial mole fractions: O2=.17, N2=.38, CO2=0, He=.45.",
        "Visible flame extinction diameter: 1.86 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 27 (PDF p. 33), FLEX–275",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.22,
      "burning_rate_constant_mm2_s": [
        0.76
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-276",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.7007,
      "spread_rate_mm_s": null,
      "burn_duration_s": 1.4,
      "outcome": "completion",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H15H201; test date: 11/30/11 (12:09:00 GMT).",
        "Ambient pressure: 532.5 mmHg (0.7007 atm); initial mole fractions: O2=.17, N2=.38, CO2=0, He=.45.",
        "Visible flame extinction diameter: .91 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 28 (PDF p. 34), FLEX–276",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 1.61,
      "burning_rate_constant_mm2_s": [
        1.06
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-277",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6979,
      "spread_rate_mm_s": null,
      "burn_duration_s": 4.0,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H15M102; test date: 12/5/11 (22:54:10 GMT).",
        "Ambient pressure: 530.4 mmHg (0.6979 atm); initial mole fractions: O2=.17, N2=.38, CO2=0, He=.45.",
        "Visible flame extinction diameter: 2.3 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 28 (PDF p. 34), FLEX–277",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.79,
      "burning_rate_constant_mm2_s": [
        0.63
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-278",
      "gravity_regime": "microgravity",
      "material": "Methanol (CH₃OH)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        17.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 0.6993,
      "spread_rate_mm_s": null,
      "burn_duration_s": 2.9,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H15M201; test date: 12/5/11 (23:39:04 GMT).",
        "Ambient pressure: 531.5 mmHg (0.6993 atm); initial mole fractions: O2=.17, N2=.38, CO2=0, He=.45.",
        "Visible flame extinction diameter: 2.31 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 28 (PDF p. 34), FLEX–278",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.68,
      "burning_rate_constant_mm2_s": [
        0.66
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-279",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0062,
      "spread_rate_mm_s": null,
      "burn_duration_s": 7.6,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H19H101; test date: 12/8/11 (22:29:44 GMT).",
        "Ambient pressure: 764.7 mmHg (1.0062 atm); initial mole fractions: O2=.21, N2=.64, CO2=0, He=.15.",
        "Visible flame extinction diameter: 2.91 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 28 (PDF p. 34), FLEX–279",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 3.54,
      "burning_rate_constant_mm2_s": [
        0.55
      ]
    },
    {
      "campaign": "FLEX-1",
      "run_id": "FLEX-280",
      "gravity_regime": "microgravity",
      "material": "n-Heptane (C₇H₁₆)",
      "geometry": "Isolated droplet",
      "width_cm": null,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "quiescent",
      "airflow_cms": [
        0.0
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.0
      ],
      "oxygen_basis": "fixed",
      "pressure_atm": 1.0082,
      "spread_rate_mm_s": null,
      "burn_duration_s": 11.7,
      "outcome": "extinction",
      "diagnostics": [],
      "notes": [
        "CIR identifier: H19H201; test date: 12/8/11 (23:41:45 GMT).",
        "Ambient pressure: 766.2 mmHg (1.0082 atm); initial mole fractions: O2=.21, N2=.64, CO2=0, He=.15.",
        "Visible flame extinction diameter: .73 mm."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20150023456",
      "locator": "Table IX, p. 28 (PDF p. 34), FLEX–280",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": 2.82,
      "burning_rate_constant_mm2_s": [
        0.65
      ]
    }
  ],
  "saffire-i-iii": [
    {
      "campaign": "Saffire I",
      "run_id": "I-1",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat specimen",
      "width_cm": 40.6,
      "length_cm": 94,
      "thickness_mm": 0.37,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        20
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.7,
        21.5
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        1.8
      ],
      "burn_duration_s": 420,
      "outcome": null,
      "diagnostics": [
        "Video imaging and flame-front tracking"
      ],
      "notes": [],
      "source_url": "https://ntrs.nasa.gov/citations/20180005168",
      "locator": "Table 1, slides 30–31, I-1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "Saffire I",
      "run_id": "I-2",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat specimen",
      "width_cm": 40.6,
      "length_cm": 10,
      "thickness_mm": 0.37,
      "burning_sides": null,
      "direction": "opposed",
      "airflow_cms": [
        20
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.5
      ],
      "oxygen_basis": "approximate",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        1.3
      ],
      "burn_duration_s": 70,
      "outcome": null,
      "diagnostics": [
        "Video imaging and flame-front tracking"
      ],
      "notes": [
        "The listed length is approximate and refers to residual fabric after the concurrent burn."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20180005168",
      "locator": "Table 1, slides 30–31, I-2",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "Saffire II",
      "run_id": "II-1",
      "gravity_regime": "microgravity",
      "material": "Silicone",
      "geometry": "flat specimen",
      "width_cm": 5,
      "length_cm": 29,
      "thickness_mm": 0.27,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        20
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        22.1
      ],
      "oxygen_basis": "approximate",
      "pressure_atm": null,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "no_propagation",
      "diagnostics": [
        "Video imaging"
      ],
      "notes": [
        "Qualitative outcome cross-checked against NASA NTRS 20180004258, slide 18."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20180005168",
      "locator": "Table 1, slides 30–31, II-1",
      "supplementary_url": "https://ntrs.nasa.gov/citations/20180004258",
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "Saffire II",
      "run_id": "II-2",
      "gravity_regime": "microgravity",
      "material": "Silicone",
      "geometry": "flat specimen",
      "width_cm": 5,
      "length_cm": 29,
      "thickness_mm": 0.61,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        20
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        22.1
      ],
      "oxygen_basis": "approximate",
      "pressure_atm": null,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "no_propagation",
      "diagnostics": [
        "Video imaging"
      ],
      "notes": [
        "Qualitative outcome cross-checked against NASA NTRS 20180004258, slide 18."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20180005168",
      "locator": "Table 1, slides 30–31, II-2",
      "supplementary_url": "https://ntrs.nasa.gov/citations/20180004258",
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "Saffire II",
      "run_id": "II-3",
      "gravity_regime": "microgravity",
      "material": "Silicone",
      "geometry": "flat specimen",
      "width_cm": 5,
      "length_cm": 29,
      "thickness_mm": 1.03,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        20
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        22.1
      ],
      "oxygen_basis": "approximate",
      "pressure_atm": null,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "no_propagation",
      "diagnostics": [
        "Video imaging"
      ],
      "notes": [
        "Qualitative outcome cross-checked against NASA NTRS 20180004258, slide 18."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20180005168",
      "locator": "Table 1, slides 30–31, II-3",
      "supplementary_url": "https://ntrs.nasa.gov/citations/20180004258",
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "Saffire II",
      "run_id": "II-4",
      "gravity_regime": "microgravity",
      "material": "Silicone",
      "geometry": "flat specimen",
      "width_cm": 5,
      "length_cm": 29,
      "thickness_mm": 0.37,
      "burning_sides": null,
      "direction": "opposed",
      "airflow_cms": [
        20
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        22.1
      ],
      "oxygen_basis": "approximate",
      "pressure_atm": null,
      "spread_rate_mm_s": null,
      "burn_duration_s": null,
      "outcome": "no_propagation",
      "diagnostics": [
        "Video imaging"
      ],
      "notes": [
        "Qualitative outcome cross-checked against NASA NTRS 20180004258, slide 18."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20180005168",
      "locator": "Table 1, slides 30–31, II-4",
      "supplementary_url": "https://ntrs.nasa.gov/citations/20180004258",
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "Saffire II",
      "run_id": "II-5",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat specimen",
      "width_cm": 5,
      "length_cm": 29,
      "thickness_mm": 0.37,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        20
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        22.1
      ],
      "oxygen_basis": "approximate",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        2.1
      ],
      "burn_duration_s": 145,
      "outcome": "burned_to_end",
      "diagnostics": [
        "Video imaging and flame-front tracking"
      ],
      "notes": [
        "Qualitative outcome cross-checked against NASA NTRS 20180004258, slide 18."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20180005168",
      "locator": "Table 1, slides 30–31, II-5",
      "supplementary_url": "https://ntrs.nasa.gov/citations/20180004258",
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "Saffire II",
      "run_id": "II-6",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat specimen",
      "width_cm": 5,
      "length_cm": 29,
      "thickness_mm": 0.37,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        25
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        22.1
      ],
      "oxygen_basis": "approximate",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        2.6
      ],
      "burn_duration_s": 115,
      "outcome": "burned_to_end",
      "diagnostics": [
        "Video imaging and flame-front tracking"
      ],
      "notes": [
        "Qualitative outcome cross-checked against NASA NTRS 20180004258, slide 18."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20180005168",
      "locator": "Table 1, slides 30–31, II-6",
      "supplementary_url": "https://ntrs.nasa.gov/citations/20180004258",
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "Saffire II",
      "run_id": "II-7",
      "gravity_regime": "microgravity",
      "material": "PMMA / Nomex",
      "geometry": "two sections: PMMA (5 cm long, 0.85 mm thick) and Nomex (24 cm long, 0.37 mm thick)",
      "width_cm": 5,
      "length_cm": null,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        20
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        22.1
      ],
      "oxygen_basis": "approximate",
      "pressure_atm": null,
      "spread_rate_mm_s": null,
      "burn_duration_s": 140,
      "outcome": "no_spread_into_nomex",
      "diagnostics": [
        "Video imaging"
      ],
      "notes": [
        "Qualitative outcome cross-checked against NASA NTRS 20180004258, slide 18."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20180005168",
      "locator": "Table 1, slides 30–31, II-7",
      "supplementary_url": "https://ntrs.nasa.gov/citations/20180004258",
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "Saffire II",
      "run_id": "II-8",
      "gravity_regime": "microgravity",
      "material": "PMMA",
      "geometry": "structured PMMA; see figure referenced in Table 1",
      "width_cm": 5,
      "length_cm": 29,
      "thickness_mm": null,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        20
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        22.1,
        22.0
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": null,
      "burn_duration_s": 600,
      "outcome": null,
      "diagnostics": [
        "Video imaging"
      ],
      "notes": [],
      "source_url": "https://ntrs.nasa.gov/citations/20180005168",
      "locator": "Table 1, slides 30–31, II-8",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "Saffire II",
      "run_id": "II-9",
      "gravity_regime": "microgravity",
      "material": "PMMA",
      "geometry": "flat specimen",
      "width_cm": 5,
      "length_cm": 29,
      "thickness_mm": 10,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        20
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        22.0,
        21.9
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": null,
      "burn_duration_s": 900,
      "outcome": null,
      "diagnostics": [
        "Video imaging"
      ],
      "notes": [],
      "source_url": "https://ntrs.nasa.gov/citations/20180005168",
      "locator": "Table 1, slides 30–31, II-9",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "Saffire III",
      "run_id": "III-1",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat specimen",
      "width_cm": 40.6,
      "length_cm": 94,
      "thickness_mm": 0.37,
      "burning_sides": null,
      "direction": "concurrent",
      "airflow_cms": [
        25
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.2,
        21.0
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        2.3
      ],
      "burn_duration_s": 300,
      "outcome": null,
      "diagnostics": [
        "Video imaging and flame-front tracking"
      ],
      "notes": [],
      "source_url": "https://ntrs.nasa.gov/citations/20180005168",
      "locator": "Table 1, slides 30–31, III-1",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    },
    {
      "campaign": "Saffire III",
      "run_id": "III-2",
      "gravity_regime": "microgravity",
      "material": "SIBAL (cotton/fiberglass)",
      "geometry": "flat specimen",
      "width_cm": 40.6,
      "length_cm": 10,
      "thickness_mm": 0.37,
      "burning_sides": null,
      "direction": "opposed",
      "airflow_cms": [
        25
      ],
      "airflow_basis": "constant",
      "oxygen_vol_pct": [
        21.2,
        21.0
      ],
      "oxygen_basis": "start_end",
      "pressure_atm": null,
      "spread_rate_mm_s": [
        0.98
      ],
      "burn_duration_s": 60,
      "outcome": null,
      "diagnostics": [
        "Video imaging and flame-front tracking"
      ],
      "notes": [
        "Table 1 reports an approximate specimen length."
      ],
      "source_url": "https://ntrs.nasa.gov/citations/20180005168",
      "locator": "Table 1, slides 30–31, III-2",
      "supplementary_url": null,
      "initial_droplet_diameter_mm": null,
      "burning_rate_constant_mm2_s": null
    }
  ]
}
