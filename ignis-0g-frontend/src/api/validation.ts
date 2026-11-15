import type {
  CatalogFilters,
  ChatResponse,
  Citation,
  CompareItem,
  CompareResponse,
  Dataset,
  DatasetSummary,
  ExperimentRun,
  Finding,
  Graph,
  GraphEdge,
  GraphNode,
  Media,
  Relation,
  ScenarioStudy,
  SafetyImplication,
  Source,
  StudyDetail,
  StudyList,
  StudySummary,
} from "@/domain/types"

type Validator<T> = (value: unknown) => value is T

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isId(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string"
}

function isWebUrl(value: unknown): value is string {
  if (typeof value !== "string") return false
  if (value.startsWith("/") && !value.startsWith("//")) return true
  try {
    const url = new URL(value)
    return (url.protocol === "https:" || url.protocol === "http:") && !url.username && !url.password
  } catch {
    return false
  }
}

export function isStudySummary(value: unknown): value is StudySummary {
  return isRecord(value) && isId(value.id) && isId(value.title) &&
    typeof value.description === "string" &&
    typeof value.category === "string" &&
    Array.isArray(value.tags) && value.tags.every((t) => typeof t === "string") &&
    (value.thumbnail_url === null || isWebUrl(value.thumbnail_url))
}

export function isStudyList(value: unknown): value is StudyList {
  return isRecord(value) &&
    Array.isArray(value.items) && value.items.every(isStudySummary) &&
    typeof value.total === "number" &&
    typeof value.limit === "number" &&
    typeof value.offset === "number"
}

export function isCatalogFilters(value: unknown): value is CatalogFilters {
  return isRecord(value) &&
    Array.isArray(value.categories) && value.categories.every((c) => typeof c === "string") &&
    Array.isArray(value.tags) && value.tags.every((t) => typeof t === "string")
}

export function isSource(value: unknown): value is Source {
  return isRecord(value) && isId(value.id) && isId(value.study_id) && isId(value.title) &&
    isWebUrl(value.url) &&
    (value.source_type === "article" || value.source_type === "report" || value.source_type === "webpage" ||
      value.source_type === "dataset" || value.source_type === "video" || value.source_type === "other")
}

export function isFinding(value: unknown): value is Finding {
  return isRecord(value) && isId(value.id) && isId(value.source_id) &&
    typeof value.claim === "string" && typeof value.evidence === "string" &&
    isNullableString(value.locator) && isNullableString(value.safety_impact)
}

export function isMedia(value: unknown): value is Media {
  return isRecord(value) && isId(value.id) && isId(value.source_id) &&
    (value.media_type === "image" || value.media_type === "video" || value.media_type === "link") &&
    isWebUrl(value.url) && typeof value.caption === "string"
}

export function isDatasetSummary(value: unknown): value is DatasetSummary {
  return isRecord(value) && isId(value.id) && isId(value.source_id) && isId(value.title) &&
    (value.chart_type === "line" || value.chart_type === "scatter" || value.chart_type === "bar") &&
    isNullableString(value.locator) && isNullableString(value.notes)
}

export function isSafetyImplication(value: unknown): value is SafetyImplication {
  return isRecord(value) && isId(value.finding_id) && isId(value.source_id) && typeof value.text === "string"
}

function isNumericRange(value: unknown): value is [number, number] {
  return Array.isArray(value) && value.length === 2 &&
    value.every((bound) => typeof bound === "number" && Number.isFinite(bound)) && value[0] <= value[1]
}

function isConditions(value: unknown): boolean {
  return isRecord(value) && (value.modeling_runs === undefined || (Array.isArray(value.modeling_runs) &&
    value.modeling_runs.every((run) => isRecord(run) && isId(run.case) && isId(run.locator) &&
      isWebUrl(run.source_url) && run.gravity_regime === "microgravity" &&
      typeof run.nozzle_inner_diameter_mm === "number" && typeof run.methane_in_fuel_pct === "number" &&
      isNumericRange(run.fuel_flow_cms) && isNumericRange(run.coflow_air_cms))))
}

export function isStudyDetail(value: unknown): value is StudyDetail {
  return isStudySummary(value) &&
    isNullableString((value as StudyDetail).methodology) &&
    isConditions((value as StudyDetail).conditions) &&
    Array.isArray((value as StudyDetail).findings) && (value as StudyDetail).findings.every(isFinding) &&
    Array.isArray((value as StudyDetail).sources) && (value as StudyDetail).sources.every(isSource) &&
    Array.isArray((value as StudyDetail).media) && (value as StudyDetail).media.every(isMedia) &&
    Array.isArray((value as StudyDetail).datasets) && (value as StudyDetail).datasets.every(isDatasetSummary) &&
    Array.isArray((value as StudyDetail).safety_implications) && (value as StudyDetail).safety_implications.every(isSafetyImplication)
}

export function isDataset(value: unknown): value is Dataset {
  return isDatasetSummary(value) &&
    typeof (value as Dataset).x_label === "string" &&
    typeof (value as Dataset).y_label === "string" &&
    isRecord((value as Dataset).units) &&
    isNullableString((value as Dataset).units.x) &&
    isNullableString((value as Dataset).units.y) &&
    Array.isArray((value as Dataset).series) &&
    ((value as Dataset).provenance === "reported" || (value as Dataset).provenance === "digitized" || (value as Dataset).provenance === "derived")
}

function isRelationType(value: unknown): value is Relation["relation_type"] {
  return value === "supports" || value === "contradicts" || value === "complements" || value === "similar"
}

export function isRelation(value: unknown): value is Relation {
  return isRecord(value) && isId(value.id) && isId(value.from_study_id) && isId(value.to_study_id) &&
    isRelationType(value.relation_type) && typeof value.explanation === "string" &&
    isId(value.source_id) && isWebUrl(value.source_url) &&
    isRecord(value.evidence) && typeof value.evidence.excerpt === "string" && isNullableString(value.evidence.locator)
}

function isGraphNode(value: unknown): value is GraphNode {
  return isRecord(value) && isId(value.id) && value.type === "study" && typeof value.label === "string"
}

function isGraphEdge(value: unknown): value is GraphEdge {
  return isRecord(value) && isId(value.id) && isId(value.source) && isId(value.target) &&
    isRelationType(value.type) && typeof value.explanation === "string" &&
    isId(value.source_id) && isWebUrl(value.source_url) &&
    isRecord(value.evidence) && typeof value.evidence.excerpt === "string" && isNullableString(value.evidence.locator)
}

export function isGraph(value: unknown): value is Graph {
  return isRecord(value) &&
    Array.isArray(value.nodes) && value.nodes.every(isGraphNode) &&
    Array.isArray(value.edges) && value.edges.every(isGraphEdge) &&
    typeof value.truncated === "boolean"
}

function isCitation(value: unknown): value is Citation {
  return isRecord(value) && isId(value.chunk_id) && isId(value.source_id) &&
    typeof value.title === "string" && isWebUrl(value.url) &&
    typeof value.excerpt === "string" && isNullableString(value.locator)
}

export function isChatResponse(value: unknown): value is ChatResponse {
  return isRecord(value) &&
    (value.status === "answered" || value.status === "insufficient_evidence") &&
    typeof value.answer === "string" &&
    Array.isArray(value.citations) && value.citations.every(isCitation) &&
    Array.isArray(value.related_study_ids) && value.related_study_ids.every(isId) &&
    Array.isArray(value.suggested_questions) && value.suggested_questions.every((q) => typeof q === "string")
}

function isCompareItem(value: unknown): value is CompareItem {
  return isRecord(value) && typeof value.text === "string" &&
    Array.isArray(value.citation_indices) && value.citation_indices.every((i) => typeof i === "number")
}

export function isCompareResponse(value: unknown): value is CompareResponse {
  return isRecord(value) &&
    (value.status === "answered" || value.status === "insufficient_evidence") &&
    typeof value.summary === "string" &&
    Array.isArray(value.similarities) && value.similarities.every(isCompareItem) &&
    Array.isArray(value.differences) && value.differences.every(isCompareItem) &&
    Array.isArray(value.limitations) && value.limitations.every((l) => typeof l === "string") &&
    Array.isArray(value.citations) && value.citations.every(isCitation)
}

export function isArrayOf<T>(validate: Validator<T>): Validator<T[]> {
  return (value): value is T[] => Array.isArray(value) && value.every(validate)
}

export function isScenarioStudy(value: unknown): value is ScenarioStudy {
  if (!isRecord(value)) return false
  const validOptionalNumber = (field: unknown) =>
    field === undefined || (typeof field === "number" && Number.isFinite(field) && field >= 0)
  const validOptionalStringArray = (field: unknown) =>
    field === undefined || (Array.isArray(field) && field.every((item) => typeof item === "string"))
  return isId(value.study_id) && typeof value.title === "string" &&
    typeof value.score === "number" && value.score >= 0 && value.score <= 100 &&
    ["material", "facility", "fuel"].every((key) => isNullableString(value[key])) &&
    ["matched", "outside", "unknown"].every((key) => {
      const fields = value[key]
      return Array.isArray(fields) && fields.every((field) => typeof field === "string")
    }) &&
    Array.isArray(value.source_urls) && value.source_urls.every(isWebUrl) &&
    ["o2_pct", "pressure_kpa", "flow_cms", "gravity_g"].every((key) => {
      const range = value[key]
      return range === null || isNumericRange(range)
    }) &&
    (value.ranking_version === undefined || value.ranking_version === "range-coverage-v1") &&
    (value.score_basis === undefined || value.score_basis === "independent_catalog_ranges") &&
    validOptionalNumber(value.reported_parameter_count) &&
    validOptionalNumber(value.source_count) &&
    validOptionalNumber(value.run_count) &&
    validOptionalStringArray(value.jointly_reported_run_ids) &&
    validOptionalStringArray(value.limitations)
}

export function isExperimentRun(value: unknown): value is ExperimentRun {
  if (!isRecord(value)) return false

  const numberList = (field: unknown) => Array.isArray(field) && field.length > 0 &&
    field.every((item) => typeof item === "number" && Number.isFinite(item) && item >= 0)
  const textList = (field: unknown) => Array.isArray(field) &&
    field.every((item) => typeof item === "string")
  return ["BASS-II", "Saffire I", "Saffire II", "Saffire III", "FLEX-1"].some((name) => value.campaign === name) &&
    value.gravity_regime === "microgravity" && isId(value.run_id) &&
    isId(value.material) && isId(value.geometry) && isId(value.locator) && isWebUrl(value.source_url) &&
    (value.supplementary_url === null || isWebUrl(value.supplementary_url)) &&
    (value.direction === "concurrent" || value.direction === "opposed" || value.direction === "quiescent") &&
    ["constant", "start_end", "plateaus"].some((basis) => basis === value.airflow_basis) &&
    ["fixed", "start_end", "approximate"].some((basis) => basis === value.oxygen_basis) &&
    numberList(value.airflow_cms) && numberList(value.oxygen_vol_pct) &&
    (value.spread_rate_mm_s === null || numberList(value.spread_rate_mm_s)) &&
    (value.burning_rate_constant_mm2_s === null ||
      (numberList(value.burning_rate_constant_mm2_s) && (value.burning_rate_constant_mm2_s as unknown[]).length === 1)) &&
    (value.campaign === "FLEX-1"
      ? value.spread_rate_mm_s === null && value.thickness_mm === null
      : value.burning_rate_constant_mm2_s === null && value.initial_droplet_diameter_mm === null) &&
    (value.oxygen_vol_pct as number[]).every((n) => n <= 100) &&
    (value.oxygen_vol_pct as number[]).length === (value.oxygen_basis === "start_end" ? 2 : 1) &&
    (value.airflow_basis === "constant" ? (value.airflow_cms as number[]).length === 1
      : value.airflow_basis === "start_end" ? (value.airflow_cms as number[]).length === 2
      : (value.airflow_cms as number[]).length >= 2) &&
    (value.spread_rate_mm_s === null || (value.airflow_basis !== "start_end" &&
      (value.spread_rate_mm_s as number[]).length === (value.airflow_cms as number[]).length)) &&
    ["width_cm", "length_cm", "thickness_mm", "initial_droplet_diameter_mm", "pressure_atm", "burn_duration_s"].every((key) => {
      const member = value[key]
      return member === null || (typeof member === "number" && Number.isFinite(member) && member > 0)
    }) &&
    (value.burning_sides === null || value.burning_sides === 1 || value.burning_sides === 2) &&
    isNullableString(value.outcome) && textList(value.notes) && textList(value.diagnostics)
}
