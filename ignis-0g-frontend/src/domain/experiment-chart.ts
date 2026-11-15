import type { ExperimentRun, Scenario } from "./types"

export const OUTCOME_LABELS = {
  quenched: ["Quenched", "Затухание"],
  no_blowoff: ["No blowoff observed", "Срыва пламени не было"],
  blowoff: ["Blowoff", "Срыв пламени"],
  no_ignition: ["No ignition", "Без воспламенения"],
  one_sided_flame: ["One-sided flame", "Пламя с одной стороны"],
  ignited: ["Ignited", "Воспламенился"],
  no_propagation: ["No propagation", "Пламя не распространилось"],
  burned_to_end: ["Burned to end of sample", "Образец прогорел до конца"],
  no_spread_into_nomex: ["No spread into Nomex", "Пламя не перешло на Nomex"],
  cool_flame: ["Two-stage cool flame", "Двухстадийное холодное пламя"],
  extinction: ["Flame extinction", "Затухание пламени"],
  completion: ["Burned to completion", "Полное выгорание"],
  disruption: ["Droplet disruption", "Разрушение капли"],
  unknown: ["Outcome not established", "Исход не установлен"],
} as const

export type ChartOutcome = keyof typeof OUTCOME_LABELS

export function chartOutcome(outcome: string | null): ChartOutcome {
  return outcome && Object.hasOwn(OUTCOME_LABELS, outcome) ? outcome as ChartOutcome : "unknown"
}

export const OUTCOME_COLORS: Record<ChartOutcome, string> = {
  quenched: "#63e2b7", extinction: "#63e2b7", blowoff: "#63e2b7",
  no_ignition: "#b8becb", no_propagation: "#b8becb", no_spread_into_nomex: "#b8becb",
  no_blowoff: "#ff7a6b", one_sided_flame: "#ff7a6b", ignited: "#ff7a6b",
  burned_to_end: "#ff7a6b", completion: "#ff7a6b",
  cool_flame: "#ffc46b", disruption: "#b8becb", unknown: "#b8becb",
}

export interface ExperimentPoint {
  id: string
  runCode: string
  studyId: string
  fuelCategory: "liquid" | "solid"
  fuelLabel: string
  o2Pct: number
  pressureKpa: number | null
  flowCms: number
  outcome: ChartOutcome
  metric: string
  metricRu: string
  citation: string
  run: ExperimentRun
}

// A changing condition is represented by its reported endpoint, not an
// interpolated measurement. The complete sequence/basis is shown in the inspector.
export function toExperimentPoints(studyId: string, runs: ExperimentRun[]): ExperimentPoint[] {
  return runs.flatMap((run) => {
    const flow = run.airflow_cms.at(-1)
    const oxygen = run.oxygen_vol_pct.at(-1)
    if (flow === undefined || oxygen === undefined || !Number.isFinite(flow) || !Number.isFinite(oxygen)) return []
    const outcome = chartOutcome(run.outcome)
    const flex = run.campaign === "FLEX-1"
    const rate = flex ? run.burning_rate_constant_mm2_s : run.spread_rate_mm_s
    const quantity = flex ? ["K", "K"] : ["spread", "скорость распространения"]
    const units = flex ? ["mm²/s", "мм²/с"] : ["mm/s", "мм/с"]
    const metric = (lang: 0 | 1) => {
      const parts: string[] = [OUTCOME_LABELS[outcome][lang]]
      if (outcome === "unknown" && run.outcome) parts.push(run.outcome)
      if (rate?.length) parts.push(`${quantity[lang]}=${rate.join(" → ")} ${units[lang]}`)
      if (flex && run.initial_droplet_diameter_mm !== null) {
        parts.push(`d₀=${run.initial_droplet_diameter_mm} ${lang ? "мм" : "mm"}`)
      }
      if (run.airflow_basis !== "constant") {
        parts.push(`${lang ? "обдув" : "airflow"}: ${run.airflow_cms.join(" → ")} ${lang ? "см/с" : "cm/s"} (${lang ? "точка: последнее значение" : "point: final value"})`)
      }
      if (run.oxygen_basis !== "fixed") {
        parts.push(`O₂: ${run.oxygen_vol_pct.join(" → ")}% (${run.oxygen_basis === "approximate"
          ? lang ? "приблизительно" : "approximate"
          : lang ? "точка: конечное значение" : "point: final value"})`)
      }
      return parts.join(" · ")
    }
    return [{
      id: `${studyId}-${run.campaign}-${run.run_id}`, runCode: `${run.campaign} #${run.run_id}`,
      studyId, fuelCategory: flex ? "liquid" as const : "solid" as const,
      fuelLabel: `${run.material} (${run.geometry})`, o2Pct: oxygen,
      pressureKpa: run.pressure_atm === null ? null : run.pressure_atm * 101.325,
      flowCms: flow, outcome, metric: metric(0), metricRu: metric(1), citation: run.locator, run,
    }]
  })
}

export function filterExperimentPoints(points: ExperimentPoint[], fuel: Scenario["fuel"]) {
  return fuel ? points.filter((point) => point.fuelCategory === fuel) : points
}

// A deterministic overview of actual loaded records, never a fallback dataset.
export function representativePoints(points: ExperimentPoint[]): ExperimentPoint[] {
  const seen = new Set<string>()
  return points.filter((point) => {
    const key = `${point.studyId}:${point.outcome}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function scenarioEvidence(points: ExperimentPoint[], scenario: Scenario) {
  const close = (a: number, b: number) => Math.abs(a - b) <= 1e-6
  const complete = points.filter(({ run }) => run.pressure_atm !== null
    && run.oxygen_basis === "fixed" && run.airflow_basis === "constant")
  const matched = complete.filter(({ run, pressureKpa, o2Pct, flowCms }) =>
    run.gravity_regime === "microgravity" && scenario.gravity_g === 0
    && close(pressureKpa!, scenario.pressure_kpa)
    && close(o2Pct, scenario.o2_pct) && close(flowCms, scenario.flow_cms))
  return { matched: matched.length, complete: complete.length, total: points.length }
}

export interface ChartAxis { min: number; max: number; ticks: number[] }

export function chartAxis(values: number[], baseline: [number, number], step: number): ChartAxis {
  const finite = values.filter(Number.isFinite)
  const low = Math.min(baseline[0], ...finite)
  const high = Math.max(baseline[1], ...finite)
  const roughStep = Math.max(step, (high - low) / 6)
  const magnitude = 10 ** Math.floor(Math.log10(roughStep))
  const unit = [1, 2, 5, 10].find((n) => n * magnitude >= roughStep) ?? 10
  const tickStep = unit * magnitude
  const min = Math.floor(low / tickStep) * tickStep
  const max = Math.ceil(high / tickStep) * tickStep
  const ticks = Array.from({ length: Math.round((max - min) / tickStep) + 1 }, (_, i) => min + i * tickStep)
  return { min, max, ticks }
}

export function axisFraction(value: number, axis: ChartAxis): number {
  return (value - axis.min) / (axis.max - axis.min)
}
