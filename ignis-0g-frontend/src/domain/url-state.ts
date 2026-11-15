import { SCENARIO_PRESETS, type MissionScenarioId } from "./knowledge"
import type { Locale } from "@/i18n"
import type { Scenario } from "./types"

export type ExplorerSection =
  | "Дашборд и рейтинг"
  | "Исследования"
  | "Сравнение и установки"
  | "Среды обитания"
  | "ИИ-ассистент"

export type StudyTabView = "overview" | "measurements" | "visualization" | "findings" | "safety"
export type EnvAxisMode = "flow-o2" | "pressure-o2"
export type CompareDiffFilter = "all" | "diff" | "same"

export interface ExplorerUrlState {
  section: ExplorerSection
  studyMode: "directory" | "detail"
  studyId: string | null
  tab: StudyTabView
  preset: MissionScenarioId | null
  conditions: Scenario
  compareIds: string[]
  dirQuery: string
  dirPillar: string
  dirSavedOnly: boolean
  envAxis: EnvAxisMode
  envAllRuns: boolean
  compareDiff: CompareDiffFilter
  compareFocus: string
  runsCampaign: string
  runsQuery: string
  runsSelected: string[]
  locale?: Locale
}

const VALID_TABS = new Set<StudyTabView>(["overview", "measurements", "visualization", "findings", "safety"])
const VALID_FUELS = new Set<NonNullable<Scenario["fuel"]>>([
  "solid",
  "liquid",
  "gas",
  "aerosol_pyrolysis",
  "reference",
])
const VALID_PILLARS = new Set<NonNullable<Scenario["pillar"]>>([
  "Prevention",
  "Detection",
  "Suppression",
])
const VALID_DIR_PILLARS = new Set([
  "All",
  "Prevention",
  "Detection",
  "Suppression",
  "Fundamental",
  "Reference",
])

function isMissionScenarioId(value: string | null): value is MissionScenarioId {
  return value !== null && Object.hasOwn(SCENARIO_PRESETS, value)
}

function parseBoundedNumber(raw: string | null, min: number, max: number, allowMin: boolean): number | null {
  if (raw === null || raw.trim() === "") return null
  const num = Number(raw)
  if (!Number.isFinite(num)) return null
  if (allowMin ? num < min : num <= min) return null
  if (num > max) return null
  return num
}

export function scenariosEqual(a: Scenario, b: Scenario): boolean {
  return (
    a.o2_pct === b.o2_pct &&
    a.pressure_kpa === b.pressure_kpa &&
    a.flow_cms === b.flow_cms &&
    a.gravity_g === b.gravity_g &&
    (a.fuel ?? null) === (b.fuel ?? null) &&
    (a.pillar ?? null) === (b.pillar ?? null)
  )
}

function parseSection(params: URLSearchParams): { section: ExplorerSection; studyMode: "directory" | "detail" } {
  const view = params.get("view")
  const sec = params.get("section")
  if (view === "assistant" || sec === "assistant") {
    return { section: "ИИ-ассистент", studyMode: "directory" }
  }
  if (sec === "compare") {
    return { section: "Сравнение и установки", studyMode: "directory" }
  }
  if (sec === "environments") {
    return { section: "Среды обитания", studyMode: "directory" }
  }
  if (sec === "studies" || params.has("study")) {
    return { section: "Исследования", studyMode: params.has("study") ? "detail" : "directory" }
  }
  return { section: "Дашборд и рейтинг", studyMode: "directory" }
}

export function parseExplorerUrl(search: string): ExplorerUrlState {
  const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`)
  const { section, studyMode } = parseSection(params)

  const studyRaw = params.get("study")?.trim() ?? ""
  const studyId = studyRaw.length > 0 ? studyRaw : null

  const tabRaw = params.get("tab") ?? ""
  const tab: StudyTabView = VALID_TABS.has(tabRaw as StudyTabView) ? (tabRaw as StudyTabView) : "overview"

  const presetRaw = params.get("preset")
  const initialPreset: MissionScenarioId = isMissionScenarioId(presetRaw) ? presetRaw : "iss-cabin"
  const conditions: Scenario = { ...SCENARIO_PRESETS[initialPreset] }

  const o2 = parseBoundedNumber(params.get("o2"), 0, 100, true)
  const pressure = parseBoundedNumber(params.get("p"), 0, 1000, false)
  const flow = parseBoundedNumber(params.get("flow"), 0, 1000, true)
  const gravity = parseBoundedNumber(params.get("g"), 0, 1, true)
  const fuelRaw = params.get("fuel")
  const pillarRaw = params.get("pillar")

  let hasCustomCondition = false
  if (o2 !== null) {
    conditions.o2_pct = o2
    hasCustomCondition = true
  }
  if (pressure !== null) {
    conditions.pressure_kpa = pressure
    hasCustomCondition = true
  }
  if (flow !== null) {
    conditions.flow_cms = flow
    hasCustomCondition = true
  }
  if (gravity !== null) {
    conditions.gravity_g = gravity
    hasCustomCondition = true
  }
  if (fuelRaw && VALID_FUELS.has(fuelRaw as NonNullable<Scenario["fuel"]>)) {
    conditions.fuel = fuelRaw as NonNullable<Scenario["fuel"]>
    hasCustomCondition = true
  }
  if (pillarRaw && VALID_PILLARS.has(pillarRaw as NonNullable<Scenario["pillar"]>)) {
    conditions.pillar = pillarRaw as NonNullable<Scenario["pillar"]>
    hasCustomCondition = true
  }

  const preset: MissionScenarioId | null =
    hasCustomCondition && !scenariosEqual(conditions, SCENARIO_PRESETS[initialPreset]) ? null : initialPreset

  const compareRaw = params.get("compare") ?? ""
  const compareIds = compareRaw
    ? [...new Set(compareRaw.split(",").map((s) => s.trim()).filter(Boolean))].slice(0, 4)
    : []

  const dirQuery = (params.get("q") ?? "").slice(0, 200)
  const tagRaw = params.get("tag") ?? "All"
  const dirPillar = VALID_DIR_PILLARS.has(tagRaw) ? tagRaw : "All"
  const dirSavedOnly = params.get("saved") === "1"

  const envAxis: EnvAxisMode = params.get("axis") === "pressure-o2" ? "pressure-o2" : "flow-o2"
  const envAllRuns = params.get("all_runs") === "1"

  const diffRaw = params.get("diff")
  const compareDiff: CompareDiffFilter =
    diffRaw === "diff" || diffRaw === "same" ? diffRaw : "all"
  const compareFocus = (params.get("focus") ?? "").slice(0, 300)

  const runsCampaign = (params.get("rcamp") ?? "").slice(0, 40)
  const runsQuery = (params.get("rq") ?? "").slice(0, 120)
  const runsRaw = params.get("runs") ?? ""
  const runsSelected = runsRaw
    ? [...new Set(runsRaw.split(",").map((s) => s.trim()).filter(Boolean))].slice(0, 4)
    : []

  const langRaw = params.get("lang")
  const locale: Locale | undefined = langRaw === "ru" || langRaw === "en" ? langRaw : undefined

  return {
    section,
    studyMode,
    studyId,
    tab,
    preset,
    conditions,
    compareIds,
    dirQuery,
    dirPillar,
    dirSavedOnly,
    envAxis,
    envAllRuns,
    compareDiff,
    compareFocus,
    runsCampaign,
    runsQuery,
    runsSelected,
    locale,
  }
}

export function buildExplorerSearchParams(state: ExplorerUrlState): URLSearchParams {
  const params = new URLSearchParams()

  if (state.section === "Исследования") {
    if (state.studyMode === "detail" && state.studyId) {
      params.set("study", state.studyId)
      if (state.tab !== "overview") params.set("tab", state.tab)
    } else {
      params.set("section", "studies")
    }
  } else if (state.section === "Сравнение и установки") {
    params.set("section", "compare")
  } else if (state.section === "Среды обитания") {
    params.set("section", "environments")
  } else if (state.section === "ИИ-ассистент") {
    params.set("section", "assistant")
  }

  if (state.compareIds.length > 0) {
    params.set("compare", state.compareIds.slice(0, 4).join(","))
  }

  const base = SCENARIO_PRESETS["iss-cabin"]
  if (state.preset) {
    if (state.preset !== "iss-cabin") {
      params.set("preset", state.preset)
    }
  } else if (!scenariosEqual(state.conditions, base)) {
    params.set("o2", String(state.conditions.o2_pct))
    params.set("p", String(state.conditions.pressure_kpa))
    params.set("flow", String(state.conditions.flow_cms))
    params.set("g", String(state.conditions.gravity_g))
    if (state.conditions.fuel) params.set("fuel", state.conditions.fuel)
    if (state.conditions.pillar) params.set("pillar", state.conditions.pillar)
  }

  if (state.dirQuery.trim()) params.set("q", state.dirQuery.trim())
  if (state.dirPillar !== "All") params.set("tag", state.dirPillar)
  if (state.dirSavedOnly) params.set("saved", "1")

  if (state.envAxis !== "flow-o2") params.set("axis", state.envAxis)
  if (state.envAllRuns) params.set("all_runs", "1")

  if (state.compareDiff !== "all") params.set("diff", state.compareDiff)
  if (state.compareFocus.trim()) params.set("focus", state.compareFocus.trim())
  if (state.runsCampaign) params.set("rcamp", state.runsCampaign)
  if (state.runsQuery.trim()) params.set("rq", state.runsQuery.trim())
  if (state.runsSelected.length > 0) params.set("runs", state.runsSelected.slice(0, 4).join(","))

  if (state.locale === "ru") {
    params.set("lang", "ru")
  } else if (state.locale === "en") {
    params.set("lang", "en")
  }

  return params
}
