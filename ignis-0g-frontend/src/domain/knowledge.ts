import type { Locale } from "@/i18n"
import type { Scenario, StudyConditions } from "./types"

export const SCENARIO_PRESETS = {
  "iss-cabin": { o2_pct: 21, pressure_kpa: 101.3, flow_cms: 10, gravity_g: 0 },
  "lunar-base": { o2_pct: 34, pressure_kpa: 56.5, flow_cms: 10, gravity_g: 0.16 },
  "mars-base": { o2_pct: 34, pressure_kpa: 56.5, flow_cms: 10, gravity_g: 0.38 },
  spacesuit: { o2_pct: 100, pressure_kpa: 29.6, flow_cms: 5, gravity_g: 0 },
  detection: { o2_pct: 21, pressure_kpa: 101.3, flow_cms: 10, gravity_g: 0, pillar: "Detection" },
  suppression: { o2_pct: 21, pressure_kpa: 101.3, flow_cms: 10, gravity_g: 0, pillar: "Suppression" },
} satisfies Record<string, Scenario>

export type MissionScenarioId = keyof typeof SCENARIO_PRESETS

export const MISSION_SCENARIOS: { id: MissionScenarioId; label: string; labelRu: string }[] = [
  { id: "iss-cabin", label: "ISS Cabin · 0g", labelRu: "Отсек МКС · 0g" },
  { id: "lunar-base", label: "Lunar Base / Rover SEA", labelRu: "Луна / Ровер SEA" },
  { id: "mars-base", label: "Mars Habitat", labelRu: "Марсианский модуль" },
  { id: "spacesuit", label: "EVA Spacesuit", labelRu: "Скафандр EVA" },
  { id: "detection", label: "Smoke Detection", labelRu: "Обнаружение" },
  { id: "suppression", label: "Fire Suppression", labelRu: "Тушение" },
]

export function getMissionScenarios(locale: Locale = "en") {
  return MISSION_SCENARIOS.map((item) => ({
    id: item.id,
    label: locale === "ru" ? item.labelRu : item.label,
  }))
}

export interface StudyQuickMeta {
  facility: string
  fuelMaterial: string
  fuelMaterialRu: string
  fuelState: "liquid" | "solid" | "gas" | "aerosol_pyrolysis" | "reference"
  sampleSizeMm?: string
  sampleSizeMmRu?: string
  conditions: StudyConditions
  pi?: string
}

export const STUDY_QUICK_META: Record<string, StudyQuickMeta> = {
  "flex-1": {
    facility: "CIR / MDCA",
    fuelMaterial: "n-heptane, methanol",
    fuelMaterialRu: "n-гептан, метанол",
    fuelState: "liquid",
    sampleSizeMm: "1.5–4.2 mm",
    sampleSizeMmRu: "1.5–4.2 мм",
    conditions: { flow_regime: "quiescent", gravity_g: [0, 0], pressure_kpa: [50.7, 304.0], o2_pct: [12.0, 34.0], flow_cms: [0, 0], diluents: ["N2", "CO2", "He", "Xe"], loi_pct: "14.0–15.0" },
    pi: "F. A. Williams, F. L. Dryer, D. L. Dietrich, V. Nayagam",
  },
  "flex-2-cfi": {
    facility: "CIR / MDCA",
    fuelMaterial: "n-octane, n-decane, heptane/iso-octane mixtures",
    fuelMaterialRu: "n-октан, n-декан, смеси гептан/изооктан",
    fuelState: "liquid",
    sampleSizeMm: "1.5–4.2 mm",
    sampleSizeMmRu: "1.5–4.2 мм",
    conditions: { flow_regime: "quiescent", gravity_g: [0, 0], pressure_kpa: [50.7, 304.0], o2_pct: [10.0, 50.0], flow_cms: [0, 0], diluents: ["N2", "CO2", "He", "Xe"] },
    pi: "F. A. Williams, F. L. Dryer, D. L. Dietrich, V. Nayagam, P. V. Ferkul",
  },
  "flex-2j-jaxa": {
    facility: "CIR / MDCA",
    fuelMaterial: "n-decane (droplet arrays)",
    fuelMaterialRu: "n-декан (массивы капель)",
    fuelState: "liquid",
    sampleSizeMm: "0.5–2.0 mm",
    sampleSizeMmRu: "0.5–2.0 мм",
    conditions: { flow_regime: "quiescent", gravity_g: [0, 0], pressure_kpa: [101.0, 101.3], o2_pct: [14.0, 21.0], flow_cms: [0, 0], diluents: ["N2", "CO2"] },
    pi: "M. Mikami (JAXA)",
  },
  "flex-ice-ga": {
    facility: "CIR / MDCA",
    fuelMaterial: "heptane/ethanol, decane/1-hexanol",
    fuelMaterialRu: "гептан/этанол, декан/1-гексанол",
    fuelState: "liquid",
    sampleSizeMm: "1.5–3.5 mm",
    sampleSizeMmRu: "1.5–3.5 мм",
    conditions: { flow_regime: "quiescent", gravity_g: [0, 0], pressure_kpa: [101.0, 202.7], o2_pct: [15.0, 21.0], flow_cms: [0, 0], diluents: ["N2", "CO2"] },
    pi: "P. Massoli (CNR-IM), D. L. Dietrich",
  },
  "bass-bass-ii-bass-m": {
    facility: "MSG / SPICE",
    fuelMaterial: "SIBAL (cotton/fiberglass), PMMA, Nomex, Ultem",
    fuelMaterialRu: "SIBAL (хлопок/стекловолокно), PMMA, Nomex, Ultem",
    fuelState: "solid",
    sampleSizeMm: "0.125–12.7 mm",
    sampleSizeMmRu: "0.125–12.7 мм",
    conditions: { flow_regime: "coflow; opposed", gravity_g: [0, 0], pressure_kpa: [101.0, 101.3], o2_pct: [13.6, 21.0], flow_cms: [0, 53.0], diluents: ["N2"], loi_pct: "13.6" },
    pi: "S. L. Olson, F. J. Miller",
  },
  "bass-m-milliken": {
    facility: "MSG / SPICE",
    fuelMaterial: "10 flame-retardant FR textiles (cotton, nylon, Nomex)",
    fuelMaterialRu: "10 огнестойких тканей FR (хлопок, нейлон, Nomex)",
    fuelState: "solid",
    sampleSizeMm: "0.2–1.0 mm",
    sampleSizeMmRu: "0.2–1.0 мм",
    conditions: { flow_regime: "opposed; concurrent", gravity_g: [0, 0], pressure_kpa: [101.0, 101.3], o2_pct: [21.0, 21.0], flow_cms: [1.0, 50.0], diluents: ["N2"] },
    pi: "Milliken & Co., S. L. Olson, P. V. Ferkul",
  },
  "acme-bre": {
    facility: "CIR (Porous Burner)",
    fuelMaterial: "ethylene, methane (emulating paper, plastic, alcohol)",
    fuelMaterialRu: "этилен, метан (эмуляция бумаги, пластика, спирта)",
    fuelState: "gas",
    sampleSizeMm: "25–50 mm",
    sampleSizeMmRu: "25–50 мм",
    conditions: { flow_regime: "quiescent", gravity_g: [0, 0], pressure_kpa: [50.7, 101.3], o2_pct: [21.0, 34.0], flow_cms: [0, 0], diluents: ["N2"] },
    pi: "J. G. Quintiere, P. B. Sunderland",
  },
  "acme-s-flame": {
    facility: "CIR (Spherical Burner)",
    fuelMaterial: "H₂, CH₄, C₂H₄",
    fuelMaterialRu: "H₂, CH₄, C₂H₄",
    fuelState: "gas",
    sampleSizeMm: "6.35–12.7 mm",
    sampleSizeMmRu: "6.35–12.7 мм",
    conditions: { flow_regime: "spherical_flow", gravity_g: [0, 0], pressure_kpa: [50.7, 101.3], o2_pct: [15.0, 35.0], flow_cms: [0, 0], diluents: ["N2", "He", "CO2"] },
    pi: "C. K. Law",
  },
  "acme-e-field-flames": {
    facility: "CIR (High-Voltage Mesh)",
    fuelMaterial: "CH₄, C₂H₄ (electric field up to 10 kV)",
    fuelMaterialRu: "CH₄, C₂H₄ (электрополе до 10 кВ)",
    fuelState: "gas",
    sampleSizeMm: "2.1 / 25 mm",
    sampleSizeMmRu: "2.1 / 25 мм",
    conditions: { flow_regime: "coflow_jet", gravity_g: [0, 0], pressure_kpa: [101.0, 101.3], o2_pct: [21.0, 21.0], flow_cms: [10.0, 40.0], diluents: ["N2"] },
    pi: "D. Dunn-Rankin",
  },
  "acme-cfi-g": {
    facility: "CIR (Spherical Burner)",
    fuelMaterial: "propane, n-butane, n-pentane (inverse diffusion flame)",
    fuelMaterialRu: "пропан, н-бутан, н-пентан (обратное пламя)",
    fuelState: "gas",
    sampleSizeMm: "6.35–12.7 mm",
    sampleSizeMmRu: "6.35–12.7 мм",
    conditions: { flow_regime: "spherical_flow", gravity_g: [0, 0], pressure_kpa: [50.7, 101.3], o2_pct: [null, null], burner_o2_max_pct: 85, flow_cms: [0, 0], diluents: ["N2"] },
    pi: "NASA GRC ACME CFI-G Team",
  },
  "acme-flame-design": {
    facility: "CIR (Spherical Burner)",
    fuelMaterial: "C₂H₄, CH₄",
    fuelMaterialRu: "C₂H₄, CH₄",
    fuelState: "gas",
    sampleSizeMm: "6.35–12.7 mm",
    sampleSizeMmRu: "6.35–12.7 мм",
    conditions: { flow_regime: "spherical_flow", gravity_g: [0, 0], pressure_kpa: [50.7, 101.3], o2_pct: [18.0, 50.0], flow_cms: [0, 0], diluents: ["N2", "He"] },
    pi: "R. L. Axelbaum",
  },
  "acme-cld-flame": {
    facility: "CIR (Coflow Burner)",
    fuelMaterial: "CH₄, C₂H₄ (N₂-diluted)",
    fuelMaterialRu: "CH₄, C₂H₄ (разбавленные N₂)",
    fuelState: "gas",
    sampleSizeMm: "2.1 / 25 mm",
    sampleSizeMmRu: "2.1 / 25 мм",
    conditions: { flow_regime: "coflow_jet", gravity_g: [0, 0], pressure_kpa: [101.0, 300.0], o2_pct: [21.0, 21.0], flow_cms: [10.0, 40.0], diluents: ["N2"] },
    pi: "M. B. Long, M. D. Smooke",
  },
  "acme-program-overview-6-experiments": {
    facility: "CIR (ACME CIA)",
    fuelMaterial: "H₂, CH₄, C₂H₄, propane, butane, pentane",
    fuelMaterialRu: "H₂, CH₄, C₂H₄, пропан, бутан, пентан",
    fuelState: "gas",
    sampleSizeMm: "0.4–50.0 mm",
    sampleSizeMmRu: "0.4–50.0 мм",
    conditions: { flow_regime: "quiescent / spherical / coflow", gravity_g: [0, 0], pressure_kpa: [50.0, 304.0], o2_pct: [null, null], flow_cms: [0, 40.0], diluents: ["N2", "He", "CO2"] },
    pi: "NASA GRC ACME Project",
  },
  "slice-acme-cld-precursor": {
    facility: "MSG / SPICE",
    fuelMaterial: "CH₄, C₂H₄ (jet diffusion)",
    fuelMaterialRu: "CH₄, C₂H₄ (струйная диффузия)",
    fuelState: "gas",
    sampleSizeMm: "1.0–3.2 mm",
    sampleSizeMmRu: "1.0–3.2 мм",
    conditions: {
      flow_regime: "coflow_jet",
      gravity_g: [0, 0],
      pressure_kpa: [101.0, 101.3],
      o2_pct: [21.0, 21.0],
      flow_cms: [5.0, 40.0],
      diluents: ["N2"],
      modeling_runs: [
        {
          case: "A",
          nozzle_inner_diameter_mm: 3.2,
          methane_in_fuel_pct: 40,
          fuel_flow_cms: [17, 89],
          coflow_air_cms: [17, 17],
          gravity_regime: "microgravity",
          source_url: "https://ntrs.nasa.gov/citations/20160012298",
          locator: "SLICE conditions table, Case A",
        },
        {
          case: "B",
          nozzle_inner_diameter_mm: 1.6,
          methane_in_fuel_pct: 70,
          fuel_flow_cms: [62, 62],
          coflow_air_cms: [14, 34],
          gravity_regime: "microgravity",
          source_url: "https://ntrs.nasa.gov/citations/20160012298",
          locator: "SLICE conditions table, Case B",
        },
      ],
    },
    pi: "M. B. Long, M. D. Smooke",
  },
  "saffire-i-iii": {
    facility: "Cygnus Cargo Vehicle",
    fuelMaterial: "SIBAL (40×100 cm), Nomex, acrylic/PMMA",
    fuelMaterialRu: "SIBAL (40×100 см), Nomex, акрил/PMMA",
    fuelState: "solid",
    sampleSizeMm: "400×1000 mm",
    sampleSizeMmRu: "400×1000 мм",
    conditions: { flow_regime: "forced_duct", gravity_g: [0, 0], pressure_kpa: [101.0, 101.3], o2_pct: [21.0, 21.0], flow_cms: [null, null], diluents: ["N2"] },
    pi: "D. L. Urban, G. A. Ruff",
  },
  "saffire-iv-v": {
    facility: "Cygnus Cargo Vehicle",
    fuelMaterial: "PMMA (40×18 cm), cotton & SIBAL (40×50 cm)",
    fuelMaterialRu: "PMMA (40×18 см), хлопок и SIBAL (40×50 см)",
    fuelState: "solid",
    sampleSizeMm: "400×180–500 mm",
    sampleSizeMmRu: "400×180–500 мм",
    conditions: { flow_regime: "forced_duct", gravity_g: [0, 0], pressure_kpa: [101.0, 101.3], o2_pct: [21.0, 21.0], flow_cms: [null, null], diluents: ["N2"] },
    pi: "D. L. Urban, G. A. Ruff",
  },
  "same-same-r": {
    facility: "MSG",
    fuelMaterial: "Teflon, Kapton, Pyrell foam, cellulose, silicone",
    fuelMaterialRu: "Тефлон, Каптон, пена Pyrell, целлюлоза, силикон",
    fuelState: "aerosol_pyrolysis",
    conditions: { flow_regime: "forced_duct", gravity_g: [0, 0], pressure_kpa: [101.0, 101.3], o2_pct: [21.0, 21.0], flow_cms: [0, 8.1], diluents: ["N2"] },
    pi: "D. L. Urban, M. E. Meyer",
  },
  "sofie-gel": {
    facility: "CIR / SoFIE",
    fuelMaterial: "PMMA spheres (internal heating)",
    fuelMaterialRu: "сферы PMMA (внутренний нагрев)",
    fuelState: "solid",
    conditions: { flow_regime: "low_flow", gravity_g: [0, 0], pressure_kpa: [40.0, 100.0], o2_pct: [null, null], flow_cms: [null, null], diluents: ["N2"] },
    pi: "P. V. Ferkul / NASA GRC",
  },
  "sofie-mist": {
    facility: "CIR / SoFIE",
    fuelMaterial: "black cast PMMA rods (+ 0–3.3 kW/m² radiant flux)",
    fuelMaterialRu: "стержни чёрного литого PMMA (+ 0–3.3 кВт/м²)",
    fuelState: "solid",
    sampleSizeMm: "6.4–12.7 mm",
    sampleSizeMmRu: "6.4–12.7 мм",
    conditions: { flow_regime: "opposed_flow", gravity_g: [0, 0], pressure_kpa: [40.0, 100.0], o2_pct: [null, null], flow_cms: [10.0, 10.0], diluents: ["N2"], loi_pct: "< 1g" },
    pi: "F. J. Miller / NASA GRC",
  },
  spice: {
    facility: "ISS Microgravity Science Glovebox",
    fuelMaterial: "Gas-jet diffusion flames in coflow",
    fuelMaterialRu: "Газовые диффузионные пламёна в спутном потоке",
    fuelState: "gas",
    conditions: { gravity_g: [0, 0] },
    pi: "D. L. Urban / NASA GRC",
  },
  "daft-daft-2": {
    facility: "ISS Cabin",
    fuelMaterial: "Background cabin aerosols (DustTrak / P-Trak)",
    fuelMaterialRu: "Фоновые аэрозоли кабины МКС (DustTrak / P-Trak)",
    fuelState: "aerosol_pyrolysis",
    conditions: { gravity_g: [0, 0] },
    pi: "D. L. Urban / NASA GRC",
  },
  "earth-baseline-nasa-std-6001-test-1": {
    facility: "Ground 1g Lab",
    fuelMaterial: "Standard upward flame propagation test",
    fuelMaterialRu: "Стандартный тест восходящего распространения пламени",
    fuelState: "reference",
    conditions: { flow_regime: "buoyancy_1g", gravity_g: [1, 1], pressure_kpa: [101.3, 101.3], o2_pct: [21.0, 21.0], flow_cms: [null, null], diluents: ["N2"] },
    pi: "NASA",
  },
  "iss-cabin-atmosphere": {
    facility: "ISS Orbit 0g",
    fuelMaterial: "Nominal habitable compartment",
    fuelMaterialRu: "Номинальный обитаемый отсек",
    fuelState: "reference",
    conditions: { flow_regime: "hvac_low_flow", gravity_g: [0, 0], pressure_kpa: [101.0, 101.3], o2_pct: [21.0, 21.0], flow_cms: [5.0, 20.0], diluents: ["N2"] },
    pi: "NASA",
  },
  "exploration-atmosphere-sea-lunar-mars": {
    facility: "Gateway / Lunar Surface / Rover",
    fuelMaterial: "Habitable modules (1/6g or 0g)",
    fuelMaterialRu: "Обитаемые модули (1/6g или 0g)",
    fuelState: "reference",
    conditions: { flow_regime: "hvac_low_flow", pressure_kpa: [56.5, 56.5], o2_pct: [34.0, 34.0], flow_cms: [null, null], diluents: ["N2"] },
    pi: "NASA EAWG",
  },
}

export function getQuickMeta(id: string, locale: Locale = "en"): StudyQuickMeta | undefined {
  if (!Object.hasOwn(STUDY_QUICK_META, id)) return undefined
  const base = STUDY_QUICK_META[id]
  if (locale === "ru") {
    return {
      ...base,
      fuelMaterial: base.fuelMaterialRu,
      sampleSizeMm: base.sampleSizeMmRu ?? base.sampleSizeMm,
    }
  }
  return base
}

export type FlameRegime = "flame_spread" | "smoldering_cool" | "quenched"

export interface PsiTestRunPoint {
  id: string
  runCode: string
  studyId: string
  program: string
  fuelCategory: "solid" | "liquid" | "gas"
  fuelLabel: string
  fuelLabelRu: string
  o2Pct: number
  pressureKpa: number | null
  flowCms: number
  gravityG: number
  regime: FlameRegime
  metric: string
  metricRu: string
  citation: string
}

/** Schematic microgravity 1-atm U-curve guide anchored to the 13.6% O₂ BASS-II PMMA minimum (TM-20210011385 §6.1.4.2). */
export const BASS_U_CURVE_POINTS: { flowCms: number; locO2Pct: number }[] = [
  { flowCms: 0.2, locO2Pct: 22.0 },
  { flowCms: 0.8, locO2Pct: 18.0 },
  { flowCms: 1.5, locO2Pct: 16.2 },
  { flowCms: 3.0, locO2Pct: 14.8 },
  { flowCms: 5.0, locO2Pct: 13.6 },
  { flowCms: 10.0, locO2Pct: 15.1 },
  { flowCms: 15.0, locO2Pct: 16.0 },
  { flowCms: 25.0, locO2Pct: 17.5 },
  { flowCms: 35.0, locO2Pct: 19.0 },
  { flowCms: 50.0, locO2Pct: 20.4 },
]

export function interpolateBassLocO2(flowCms: number): number {
  const pts = BASS_U_CURVE_POINTS
  if (flowCms <= pts[0].flowCms) return pts[0].locO2Pct
  if (flowCms >= pts[pts.length - 1].flowCms) return pts[pts.length - 1].locO2Pct
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i]
    const b = pts[i + 1]
    if (flowCms >= a.flowCms && flowCms <= b.flowCms) {
      const t = (flowCms - a.flowCms) / (b.flowCms - a.flowCms)
      return Number((a.locO2Pct + t * (b.locO2Pct - a.locO2Pct)).toFixed(1))
    }
  }
  return 16.0
}

export interface BassLocReference {
  locO2Pct: number
  isCalibrated: boolean
}

/**
 * Returns the 0g 1-atm BASS-II reference boundary without applying uncalibrated
 * empirical pressure or gravity correction constants.
 */
export function getReferenceBassLoc(params: {
  flowCms: number
  pressureKpa: number
  gravityG: number
  fuel?: "solid" | "liquid" | "gas" | "aerosol_pyrolysis" | "reference" | null
}): BassLocReference {
  const locO2Pct = interpolateBassLocO2(params.flowCms)
  const nearMicrogravity = params.gravityG < 0.05
  const nearOneAtm = Math.abs(params.pressureKpa - 101.3) <= 10
  const compatibleFuel = !params.fuel || params.fuel === "solid" || params.fuel === "reference"
  return {
    locO2Pct,
    isCalibrated: nearMicrogravity && nearOneAtm && compatibleFuel,
  }
}

export function computeEffectiveLoi(params: {
  flowCms: number
  pressureKpa: number
  gravityG: number
}): number {
  return interpolateBassLocO2(params.flowCms)
}

export const PSI_TEST_RUNS: PsiTestRunPoint[] = [
  {
    id: "bass-run-gmt45-t4",
    runCode: "BASS-II GMT45-T4",
    studyId: "bass-bass-ii-bass-m",
    program: "BASS",
    fuelCategory: "solid",
    fuelLabel: "SIBAL fabric (2.2 cm wide)",
    fuelLabelRu: "Ткань SIBAL (ширина 2.2 см)",
    o2Pct: 18.7,
    pressureKpa: 101.3,
    flowCms: 2.2,
    gravityG: 0,
    regime: "quenched",
    metric: "Quenched as airflow stepped down from 10 to 2.2 cm/s",
    metricRu: "Затухание при снижении обдува с 10 до 2.2 см/с",
    citation: "NASA/TM-20210011385 Table 7.1",
  },
  {
    id: "bass-run-gmt178-t14",
    runCode: "BASS-II GMT178-T14",
    studyId: "bass-bass-ii-bass-m",
    program: "BASS",
    fuelCategory: "solid",
    fuelLabel: "SIBAL fabric (2.2 cm wide)",
    fuelLabelRu: "Ткань SIBAL (ширина 2.2 см)",
    o2Pct: 16.9,
    pressureKpa: 101.3,
    flowCms: 2.8,
    gravityG: 0,
    regime: "quenched",
    metric: "Quenched as airflow stepped down from 4 to 2.8 cm/s",
    metricRu: "Затухание при снижении обдува с 4 до 2.8 см/с",
    citation: "NASA/TM-20210011385 Table 7.1",
  },
  {
    id: "bass-run-gmt190-t21",
    runCode: "BASS-II GMT190-T21",
    studyId: "bass-bass-ii-bass-m",
    program: "BASS",
    fuelCategory: "solid",
    fuelLabel: "SIBAL fabric (1.2 cm wide, blowoff 11→47 cm/s)",
    fuelLabelRu: "Ткань SIBAL (ширина 1.2 см, срыв 11→47 см/с)",
    o2Pct: 17.2,
    pressureKpa: 101.3,
    flowCms: 47.0,
    gravityG: 0,
    regime: "quenched",
    metric: "Convective flame blow-off at 47 cm/s",
    metricRu: "Конвективный срыв пламени при 47 см/с",
    citation: "NASA/TM-20210011385 Table 7.1",
  },
  {
    id: "bass-run-m8",
    runCode: "BASS-II M8",
    studyId: "bass-bass-ii-bass-m",
    program: "BASS",
    fuelCategory: "solid",
    fuelLabel: "PMMA slab (plateaus 10→6→5 cm/s)",
    fuelLabelRu: "Пластина PMMA (плато 10→6→5 см/с)",
    o2Pct: 19.1,
    pressureKpa: null,
    flowCms: 6.0,
    gravityG: 0,
    regime: "flame_spread",
    metric: "Flame spread rate 0.057 → 0.056 → 0.04 mm/s (final 18.2% O₂)",
    metricRu: "Скорость пламени 0.057 → 0.056 → 0.04 мм/с (конечн. 18.2% O₂)",
    citation: "NASA/TM-20210011385 Table 5.1",
  },
  {
    id: "bass-run-o13a",
    runCode: "BASS-II O13a",
    studyId: "bass-bass-ii-bass-m",
    program: "BASS",
    fuelCategory: "solid",
    fuelLabel: "Clear PMMA rod (12.7 mm dia.)",
    fuelLabelRu: "Стержень PMMA (Ø 12.7 мм)",
    o2Pct: 13.6,
    pressureKpa: null,
    flowCms: 5.0,
    gravityG: 0,
    regime: "flame_spread",
    metric: "Post-ignition flame survived to 13.6% final O₂ before self-extinction",
    metricRu: "После розжига пламя держалось до 13.6% O₂ перед самозатуханием",
    citation: "NASA/TM-20210011385 §6.1.4 p. 68, Table A.5",
  },
  {
    id: "saffire-run-i-1",
    runCode: "Saffire I-1",
    studyId: "saffire-i-iii",
    program: "Saffire",
    fuelCategory: "solid",
    fuelLabel: "SIBAL panel (40.6×94 cm)",
    fuelLabelRu: "Панель SIBAL (40.6×94 см)",
    o2Pct: 21.7,
    pressureKpa: null,
    flowCms: 20.0,
    gravityG: 0,
    regime: "flame_spread",
    metric: "Steady spread at 1.8 mm/s (420 s burn, O₂ 21.7→21.5%)",
    metricRu: "Стационарное распространение 1.8 мм/с (420 с, O₂ 21.7→21.5%)",
    citation: "NTRS 20180005168 Table 1",
  },
  {
    id: "flex-run-035",
    runCode: "FLEX-035",
    studyId: "flex-1",
    program: "FLEX",
    fuelCategory: "liquid",
    fuelLabel: "n-Heptane droplet (3.85 mm, free-floating)",
    fuelLabelRu: "Капля н-гептана (3.85 мм, свободная)",
    o2Pct: 21.0,
    pressureKpa: 102.4,
    flowCms: 0,
    gravityG: 0,
    regime: "smoldering_cool",
    metric: "Radiative visible extinction followed by cool flame burning (8.9 s visible burn)",
    metricRu: "Видимое затухание и последующее холодное пламя (8.9 с)",
    citation: "NASA/TP-2015-216046 Table IX & Fig. 39",
  },
  {
    id: "flex-run-054",
    runCode: "FLEX-054",
    studyId: "flex-1",
    program: "FLEX",
    fuelCategory: "liquid",
    fuelLabel: "Methanol droplet (3.56 mm, 541.4 mmHg)",
    fuelLabelRu: "Капля метанола (3.56 мм, 541.4 мм рт. ст.)",
    o2Pct: 20.0,
    pressureKpa: 72.2,
    flowCms: 0,
    gravityG: 0,
    regime: "quenched",
    metric: "Radiative extinction at 0.71 atm (29 s burn, K=0.41 mm²/s)",
    metricRu: "Радиационное затухание при 0.71 атм (29 с, K=0.41 мм²/с)",
    citation: "NASA/TP-2015-216046 Table IX",
  },
  {
    id: "flex-run-069",
    runCode: "FLEX-069",
    studyId: "flex-1",
    program: "FLEX",
    fuelCategory: "liquid",
    fuelLabel: "n-Heptane droplet (1.10 mm, 767.1 mmHg)",
    fuelLabelRu: "Капля н-гептана (1.10 мм, 767.1 мм рт. ст.)",
    o2Pct: 14.0,
    pressureKpa: 102.3,
    flowCms: 0,
    gravityG: 0,
    regime: "flame_spread",
    metric: "Burned to completion in 14% O₂ (1.3 s, K=0.94 mm²/s)",
    metricRu: "Полное выгорание при 14% O₂ (1.3 с, K=0.94 мм²/с)",
    citation: "NASA/TP-2015-216046 Table IX",
  },
]

export function detectEvidenceGaps(
  params: {
    o2Pct: number
    pressureKpa: number
    flowCms: number
    gravityG: number
  },
  locale: Locale = "en",
): { title: string; detail: string; severity: "warning" | "info" }[] {
  const gaps: { title: string; detail: string; severity: "warning" | "info" }[] = []
  const ru = locale === "ru"
  if (params.gravityG >= 0.05 && params.gravityG <= 0.85) {
    gaps.push({
      title: ru
        ? `Частичная гравитация (${params.gravityG.toFixed(2)}g — Луна 0.16g / Марс 0.38g)`
        : `Partial Gravity Gap (${params.gravityG.toFixed(2)}g — Lunar 0.16g / Martian 0.38g)`,
      detail: ru
        ? "Прямые длительные испытания в частичной гравитации на борту МКС отсутствуют. Чистая 0g и земная 1g не ограничивают риск 0.16g–0.38g сверху: слабая плавучесть подпитывает зону реакции свежим O₂ без сдувания пламени."
        : "Long-duration partial-gravity combustion tests are absent from ISS datasets. Pure 0g and 1g do not bound 0.16g–0.38g fire risk: gentle buoyancy feeds fresh O₂ into the flame zone without blowing it off.",
      severity: "warning",
    })
  }
  if (params.o2Pct > 50) {
    gaps.push({
      title: ru
        ? `Высококислородная атмосфера (${params.o2Pct}% O₂ / режим скафандра EVA)`
        : `High-Oxygen Atmosphere (${params.o2Pct}% O₂ / EVA Spacesuit Regime)`,
      detail: ru
        ? "При O₂ > 50% и пониженном давлении (29.6 кПа) большинство конструкционных полимеров и тканей МКС переходят в режим быстрого выгорания; открытая база PSI содержит преимущественно точки ≤ 50% O₂."
        : "Above 50% O₂ at reduced pressure (29.6 kPa), most structural polymers and fabrics transition to rapid burning; open PSI datasets primarily cover ≤ 50% O₂.",
      severity: "warning",
    })
  }
  return gaps
}

export interface CrewEnvironmentCard {
  id: string
  name: string
  subtitle: string
  pressureText: string
  o2Text: string
  ppO2Text: string
  gravityText: string
  ventilationText: string
  fireRiskSummary: string
  linkedStudyIds: string[]
}

const CREW_ENVIRONMENTS_BILINGUAL: { en: CrewEnvironmentCard; ru: CrewEnvironmentCard }[] = [
  {
    en: {
      id: "earth-std",
      name: "Earth Baseline (1g · NASA-STD-6001 Test 1)",
      subtitle: "Ground Certification Standard",
      pressureText: "14.7 psia (101.3 kPa)",
      o2Text: "20.9% O₂",
      ppO2Text: "3.1 psia (21.2 kPa)",
      gravityText: "1.0 g (natural buoyant flow ~20–30 cm/s)",
      ventilationText: "Natural upward convection",
      fireRiskSummary:
        "Buoyancy sweeps hot products upward and can blow off weak flames, while accelerating upward spread. Not always conservative for 0g under low HVAC airflow.",
      linkedStudyIds: ["earth-baseline-nasa-std-6001-test-1", "bass-bass-ii-bass-m", "bass-m-milliken"],
    },
    ru: {
      id: "earth-std",
      name: "Земля (1g · NASA-STD-6001 Test 1)",
      subtitle: "Наземный сертификационный эталон",
      pressureText: "14.7 psia (101.3 кПа)",
      o2Text: "20.9% O₂",
      ppO2Text: "3.1 psia (21.2 кПа)",
      gravityText: "1.0 g (естественная плавучесть ~20–30 см/с)",
      ventilationText: "Естественная конвекция вверх",
      fireRiskSummary:
        "Плавучесть уносит горячие продукты вверх и может сдувать слабые пламёна, но ускоряет вертикальное распространение огня. Не всегда консервативен для 0g при слабом потоке HVAC.",
      linkedStudyIds: ["earth-baseline-nasa-std-6001-test-1", "bass-bass-ii-bass-m", "bass-m-milliken"],
    },
  },
  {
    en: {
      id: "iss-cabin",
      name: "ISS Cabin Atmosphere (0g)",
      subtitle: "Nominal Orbital Habitat",
      pressureText: "14.7 psia (101.3 kPa)",
      o2Text: "21% O₂ (max 23.5–24.1%)",
      ppO2Text: "3.1 psia (21.3 kPa)",
      gravityText: "0g (microgravity)",
      ventilationText: "Forced HVAC ventilation 5–20 cm/s",
      fireRiskSummary:
        "In still air, flames radiative-quench; however, low HVAC flow (1–10 cm/s) hits the BASS U-curve minimum where solids burn at lower O₂ (down to 13.6% in BASS-II) and smoke particles grow larger.",
      linkedStudyIds: ["iss-cabin-atmosphere", "bass-bass-ii-bass-m", "saffire-i-iii", "same-same-r"],
    },
    ru: {
      id: "iss-cabin",
      name: "Отсек МКС (ISS Cabin · 0g)",
      subtitle: "Текущая орбитальная атмосфера",
      pressureText: "14.7 psia (101.3 кПа)",
      o2Text: "21% O₂ (макс. 23.5–24.1%)",
      ppO2Text: "3.1 psia (21.3 кПа)",
      gravityText: "0g (микрогравитация)",
      ventilationText: "Принудительная вентиляция HVAC 5–20 см/с",
      fireRiskSummary:
        "В штиле пламя гаснет от радиационных потерь, но слабый обдув HVAC (1–10 см/с) создаёт минимум U-кривой: материалы горят при более низком O₂ (до 13.6% в BASS-II), а частицы дыма крупнее.",
      linkedStudyIds: ["iss-cabin-atmosphere", "bass-bass-ii-bass-m", "saffire-i-iii", "same-same-r"],
    },
  },
  {
    en: {
      id: "lunar-sea",
      name: "Lunar & Mars · Exploration (SEA · 34% O₂)",
      subtitle: "Artemis Habitat, Rover & Airlock Modules",
      pressureText: "8.2 psia (56.5 kPa)",
      o2Text: "34% O₂ (N₂ diluent)",
      ppO2Text: "2.79 psia (19.2 kPa)",
      gravityText: "Moon 1/6 g (0.16 g) · Mars 3/8 g (0.38 g)",
      ventilationText: "ECLSS ventilation + partial-gravity buoyancy",
      fireRiskSummary:
        "Higher O₂ mole fraction (34%) reduces nitrogen thermal ballast and sharply accelerates solid polymer ignition and spread. At 1/6g, buoyant convection supplies O₂ more effectively than in 0g.",
      linkedStudyIds: ["exploration-atmosphere-sea-lunar-mars", "sofie-mist", "sofie-gel", "acme-bre"],
    },
    ru: {
      id: "lunar-sea",
      name: "Луна и Марс · Exploration (SEA · 34% O₂)",
      subtitle: "Лунная база Artemis, ровер и шлюзовые модули",
      pressureText: "8.2 psia (56.5 кПа)",
      o2Text: "34% O₂ (разбавитель N₂)",
      ppO2Text: "2.79 psia (19.2 кПа)",
      gravityText: "Луна 1/6 g (0.16 g) · Марс 3/8 g (0.38 g)",
      ventilationText: "Вентиляция жизнеобеспечения + слабая плавучесть",
      fireRiskSummary:
        "Повышенная мольная доля O₂ (34%) снижает теплоёмкость балластного азота и резко ускоряет прогрев и разгар твёрдых полимеров. В 1/6g конвекция доставляет O₂ к фронту пламени эффективнее, чем в 0g.",
      linkedStudyIds: ["exploration-atmosphere-sea-lunar-mars", "sofie-mist", "sofie-gel", "acme-bre"],
    },
  },
]

export const CREW_ENVIRONMENTS: CrewEnvironmentCard[] = CREW_ENVIRONMENTS_BILINGUAL.map((x) => x.en)

export function getCrewEnvironments(locale: Locale = "en"): CrewEnvironmentCard[] {
  return CREW_ENVIRONMENTS_BILINGUAL.map((x) => (locale === "ru" ? x.ru : x.en))
}

export interface HardwareRackGroup {
  id: string
  title: string
  location: string
  description: string
  studyIds: string[]
}

const HARDWARE_RACKS_BILINGUAL: { en: HardwareRackGroup; ru: HardwareRackGroup }[] = [
  {
    en: {
      id: "cir-acme",
      title: "CIR + ACME CIA (Combustion Integrated Rack, Gas Burners)",
      location: "ISS · Destiny Lab",
      description: "6 non-premixed gaseous fuel experiments using a modular ACME chamber insert (spherical, porous, coflow burners, and high-voltage electrodes).",
      studyIds: ["acme-bre", "acme-s-flame", "acme-e-field-flames", "acme-cfi-g", "acme-flame-design", "acme-cld-flame"],
    },
    ru: {
      id: "cir-acme",
      title: "CIR + ACME CIA (Стойка горения, газовые горелки)",
      location: "МКС · Модуль Destiny",
      description: "6 экспериментов с газообразным топливом на единой модульной вставке ACME (сферические, пористые, коаксиальные горелки и электроды).",
      studyIds: ["acme-bre", "acme-s-flame", "acme-e-field-flames", "acme-cfi-g", "acme-flame-design", "acme-cld-flame"],
    },
  },
  {
    en: {
      id: "cir-mdca",
      title: "CIR + MDCA (Multi-user Droplet Combustion Apparatus)",
      location: "ISS · Destiny Lab",
      description: "Isolated single, binary, and array liquid fuel droplet combustion and cool-flame studies (FLEX, FLEX-2/CFI, FLEX-2J, FLEX-ICE-GA).",
      studyIds: ["flex-1", "flex-2-cfi", "flex-2j-jaxa", "flex-ice-ga"],
    },
    ru: {
      id: "cir-mdca",
      title: "CIR + MDCA (Аппаратура капельного горения)",
      location: "МКС · Модуль Destiny",
      description: "Исследования одиночных, двойных и массивов капель жидкого топлива (FLEX, FLEX-2/CFI, FLEX-2J, FLEX-ICE-GA).",
      studyIds: ["flex-1", "flex-2-cfi", "flex-2j-jaxa", "flex-ice-ga"],
    },
  },
  {
    en: {
      id: "cir-sofie",
      title: "CIR + SoFIE (Solid Fuel Ignition and Extinction)",
      location: "ISS · Destiny Lab",
      description: "Ignition and extinction limits of thick solid polymers under reduced pressure and elevated O₂ exploration atmospheres.",
      studyIds: ["sofie-gel", "sofie-mist"],
    },
    ru: {
      id: "cir-sofie",
      title: "CIR + SoFIE (Твёрдые материалы в CIR)",
      location: "МКС · Модуль Destiny",
      description: "Изучение воспламенения и затухания толстых твёрдых образцов при пониженном давлении и повышенном O₂.",
      studyIds: ["sofie-gel", "sofie-mist"],
    },
  },
  {
    en: {
      id: "msg-spice",
      title: "MSG + SPICE Flow Duct (Microgravity Science Glovebox)",
      location: "ISS · Microgravity Science Glovebox",
      description: "Small wind-tunnel flow duct for solid textiles/polymers (BASS, BASS-II, BASS-M) and laminar gas jets (SPICE, SLICE).",
      studyIds: ["bass-bass-ii-bass-m", "bass-m-milliken", "spice", "slice-acme-cld-precursor"],
    },
    ru: {
      id: "msg-spice",
      title: "MSG + канал SPICE (Перчаточный бокс)",
      location: "МКС · Microgravity Science Glovebox",
      description: "Вентиляционный канал SPICE для твёрдых тканей/полимеров (BASS, BASS-II, BASS-M), газовых струй (SPICE, SLICE).",
      studyIds: ["bass-bass-ii-bass-m", "bass-m-milliken", "spice", "slice-acme-cld-precursor"],
    },
  },
  {
    en: {
      id: "cygnus",
      title: "Cygnus Cargo Spacecraft (Full-Scale Fire Tests)",
      location: "Post-ISS Unberthing",
      description: "Large-scale spacecraft fire propagation tests (samples up to 40×100 cm), combustion gas monitoring, and post-fire scrubbing.",
      studyIds: ["saffire-i-iii", "saffire-iv-v"],
    },
    ru: {
      id: "cygnus",
      title: "Грузовой корабль Cygnus (Полномасштабные испытания)",
      location: "После расстыковки с МКС",
      description: "Крупномасштабные пожарные тесты в реальном объёме отсека (образцы до 40×100 см), токсичные газы и прототипы очистки воздуха.",
      studyIds: ["saffire-i-iii", "saffire-iv-v"],
    },
  },
]

export const HARDWARE_RACKS: HardwareRackGroup[] = HARDWARE_RACKS_BILINGUAL.map((x) => x.en)

export function getHardwareRacks(locale: Locale = "en"): HardwareRackGroup[] {
  return HARDWARE_RACKS_BILINGUAL.map((x) => (locale === "ru" ? x.ru : x.en))
}

const PILLAR_LABELS_RU: Record<string, string> = {
  All: "Все",
  Prevention: "Предотвращение",
  Detection: "Обнаружение",
  Suppression: "Тушение",
  Fundamental: "Фундаментальная физика",
  Reference: "Нормативы",
  Spray: "Распыление",
}

export function localizePillar(tag: string, locale: Locale = "en"): string {
  if (locale !== "ru") return tag
  return tag
    .split("/")
    .map((part) => {
      const trimmed = part.trim()
      return PILLAR_LABELS_RU[trimmed] ?? trimmed
    })
    .join(" / ")
}

export function localizeCategory(category: string, locale: Locale = "en"): string {
  if (locale !== "ru") return category
  if (category === "Reference") return "Нормативы"
  return category
}

const FLOW_REGIME_LABELS_EN: Record<string, string> = {
  quiescent: "Quiescent (still air)",
  opposed_flow: "Opposed flow",
  "coflow; opposed": "Coflow & opposed flow",
  "opposed; concurrent": "Opposed & concurrent flow",
  spherical_flow: "Spherical radial flow",
  coflow_jet: "Coflow laminar jet",
  "quiescent / spherical / coflow": "Quiescent / spherical / coflow",
  forced_duct: "Forced duct flow",
  low_flow: "Low forced flow",
  buoyancy_1g: "Buoyant convection (1g)",
  hvac_low_flow: "HVAC low ventilation flow",
}

const FLOW_REGIME_LABELS_RU: Record<string, string> = {
  quiescent: "Штиль (без потока)",
  opposed_flow: "Встречный поток (противоток)",
  "coflow; opposed": "Спутный и встречный поток",
  "opposed; concurrent": "Встречный и спутный поток",
  spherical_flow: "Сферический поток",
  coflow_jet: "Спутная газовая струя",
  "quiescent / spherical / coflow": "Штиль / сферический / спутный",
  forced_duct: "Принудительный поток в канале",
  low_flow: "Слабый принудительный поток",
  buoyancy_1g: "Естественная конвекция (1g)",
  hvac_low_flow: "Вентиляция HVAC (слабый поток)",
}

export function localizeFlowRegime(regime: string, locale: Locale = "en"): string {
  const key = regime.trim()
  if (locale === "ru") return FLOW_REGIME_LABELS_RU[key] ?? key.replaceAll("_", " ")
  return FLOW_REGIME_LABELS_EN[key] ?? key.replaceAll("_", " ")
}

const PROVENANCE_LABELS_RU: Record<string, string> = {
  reported: "опубликовано в отчёте",
  digitized: "оцифровано с графика",
  derived: "расчётная величина",
}

const PROVENANCE_LABELS_EN: Record<string, string> = {
  reported: "reported in primary source",
  digitized: "digitized from figure",
  derived: "derived",
}

export function localizeProvenance(provenance: string, locale: Locale = "en"): string {
  if (locale === "ru") return PROVENANCE_LABELS_RU[provenance] ?? provenance
  return PROVENANCE_LABELS_EN[provenance] ?? provenance
}

const SAVED_PREFIX = "ignis-saved-study-"
export const SAVED_STUDIES_EVENT = "ignis-bookmarks-changed"

export function isStudySaved(studyId: string): boolean {
  try {
    return window.localStorage.getItem(`${SAVED_PREFIX}${studyId}`) === "true"
  } catch {
    return false
  }
}

export function getSavedStudyIds(): string[] {
  try {
    const ids: string[] = []
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i)
      if (k && k.startsWith(SAVED_PREFIX) && window.localStorage.getItem(k) === "true") {
        ids.push(k.slice(SAVED_PREFIX.length))
      }
    }
    return ids
  } catch {
    return []
  }
}

export function toggleSavedStudy(studyId: string): boolean {
  const next = !isStudySaved(studyId)
  try {
    if (next) window.localStorage.setItem(`${SAVED_PREFIX}${studyId}`, "true")
    else window.localStorage.removeItem(`${SAVED_PREFIX}${studyId}`)
    window.dispatchEvent(new Event(SAVED_STUDIES_EVENT))
  } catch {
    // Ignore storage errors in restricted browsing modes.
  }
  return next
}
