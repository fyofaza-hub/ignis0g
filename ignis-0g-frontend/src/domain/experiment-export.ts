import type { ExperimentRun } from "./types"

/** Each physical quantity has its own unit-bearing column, independent of campaign. */
export function experimentRecords(runs: ExperimentRun[]) {
  return runs.map((run) => ({
    campaign: run.campaign, run_id: run.run_id, gravity_regime: run.gravity_regime,
    material: run.material, geometry: run.geometry, width_cm: run.width_cm, length_cm: run.length_cm,
    thickness_mm: run.thickness_mm, initial_droplet_diameter_mm: run.initial_droplet_diameter_mm,
    burning_sides: run.burning_sides, direction: run.direction,
    airflow_cms: run.airflow_cms, airflow_basis: run.airflow_basis,
    oxygen_vol_pct: run.oxygen_vol_pct, oxygen_basis: run.oxygen_basis, pressure_atm: run.pressure_atm,
    spread_rate_mm_s: run.spread_rate_mm_s, burning_rate_constant_mm2_s: run.burning_rate_constant_mm2_s,
    burn_duration_s: run.burn_duration_s, outcome: run.outcome, diagnostics: run.diagnostics, notes: run.notes,
    source_url: run.source_url, locator: run.locator, supplementary_url: run.supplementary_url,
  }))
}

export function recordsCsv(records: ReturnType<typeof experimentRecords>) {
  if (!records.length) return ""
  return [Object.keys(records[0]), ...records.map(Object.values)].map((row) => row.map((cell) => {
    const raw = Array.isArray(cell) ? JSON.stringify(cell) : String(cell ?? "")
    const safe = /^[\s]*[=+@-]|^[\t\r\n]/.test(raw) ? "'" + raw : raw
    return '"' + safe.replaceAll('"', '""') + '"'
  }).join(",")).join("\r\n")
}
