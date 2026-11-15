export type UUID = string
export type StudyId = string
export type SourceType = "article" | "report" | "webpage" | "dataset" | "video" | "other"
export type RelationType = "supports" | "contradicts" | "complements" | "similar"

export interface StudyConditions {
  facility?: string
  fuel_material?: string
  fuel_state?: string
  sample_size_mm?: string
  principal_investigators?: string
  burner_o2_max_pct?: number
  modeling_runs?: ModelingRun[]
  gravity_g?: [number | null, number | null] | null
  flow_regime?: string | null
  pressure_kpa?: [number | null, number | null] | null
  o2_pct?: [number | null, number | null] | null
  flow_cms?: [number | null, number | null] | null
  diluents?: string[] | null
  loi_pct?: string | number | null
  [key: string]: unknown
}

export interface StudySummary {
  id: StudyId
  title: string
  description: string
  category: string
  tags: string[]
  thumbnail_url: string | null
}

export interface Source {
  id: UUID
  study_id: StudyId
  title: string
  url: string
  source_type: SourceType
}

export interface Finding {
  id: UUID
  source_id: UUID
  claim: string
  evidence: string
  locator: string | null
  safety_impact: string | null
}

export interface Media {
  id: UUID
  source_id: UUID
  media_type: "image" | "video" | "link"
  url: string
  caption: string
}

export interface DatasetSummary {
  id: UUID
  source_id: UUID
  title: string
  chart_type: "line" | "scatter" | "bar"
  locator: string | null
  notes: string | null
}

export interface SafetyImplication {
  finding_id: UUID
  source_id: UUID
  text: string
}

export interface StudyDetail extends StudySummary {
  methodology: string | null
  conditions: StudyConditions
  findings: Finding[]
  sources: Source[]
  media: Media[]
  datasets: DatasetSummary[]
  safety_implications: SafetyImplication[]
}

export interface StudyList {
  items: StudySummary[]
  total: number
  limit: number
  offset: number
}

export interface CatalogFilters {
  categories: string[]
  tags: string[]
}

export interface DataPoint {
  x: number | string
  y: number | null
}

export interface DataSeries {
  id: string
  label: string
  points: DataPoint[]
}

export interface Dataset extends DatasetSummary {
  x_label: string
  y_label: string
  units: { x: string | null; y: string | null }
  series: DataSeries[]
  provenance: "reported" | "digitized" | "derived"
}

export interface RelationEvidence {
  excerpt: string
  locator: string | null
}

export interface Relation {
  id: UUID
  from_study_id: StudyId
  to_study_id: StudyId
  relation_type: RelationType
  explanation: string
  source_id: UUID
  source_url: string
  evidence: RelationEvidence
}

export interface GraphNode {
  id: StudyId
  type: "study"
  label: string
}

export interface GraphEdge {
  id: UUID
  source: StudyId
  target: StudyId
  type: RelationType
  explanation: string
  source_id: UUID
  source_url: string
  evidence: RelationEvidence
}

export interface Graph {
  nodes: GraphNode[]
  edges: GraphEdge[]
  truncated: boolean
}

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export interface ChatRequest {
  scenario?: Scenario
  message: string
  study_id?: StudyId | null
  history?: ChatMessage[]
  scope?: "study" | "global"
}

export interface Citation {
  chunk_id: UUID
  source_id: UUID
  title: string
  url: string
  excerpt: string
  locator: string | null
}

export interface ChatResponse {
  status: "answered" | "insufficient_evidence"
  answer: string
  citations: Citation[]
  related_study_ids: StudyId[]
  suggested_questions: string[]
}

export interface CompareRequest {
  study_ids: StudyId[]
  focus?: string | null
  locale?: "en" | "ru" | null
}

export interface CompareItem {
  text: string
  citation_indices: number[]
}

export interface CompareResponse {
  status: "answered" | "insufficient_evidence"
  summary: string
  similarities: CompareItem[]
  differences: CompareItem[]
  limitations: string[]
  citations: Citation[]
}

export interface BackendErrorResponse {
  error: {
    code: string
    message: string
    request_id: string
    details: { field: string; message: string }[]
  }
}

export interface Scenario {
  o2_pct: number
  pressure_kpa: number
  flow_cms: number
  gravity_g: number
  fuel?: "solid" | "liquid" | "gas" | "aerosol_pyrolysis" | "reference" | null
  pillar?: "Prevention" | "Detection" | "Suppression" | null
}

export interface ScenarioStudy {
  study_id: StudyId
  title: string
  o2_pct: [number, number] | null
  pressure_kpa: [number, number] | null
  flow_cms: [number, number] | null
  gravity_g: [number, number] | null
  fuel: Scenario["fuel"]
  material: string | null
  facility: string | null
  source_urls: string[]
  matched: string[]
  outside: string[]
  unknown: string[]
  score: number
  ranking_version?: "range-coverage-v1"
  score_basis?: "independent_catalog_ranges"
  reported_parameter_count?: number
  source_count?: number
  run_count?: number
  jointly_reported_run_ids?: string[]
  limitations?: string[]
}


export interface ModelingRun {
  case: string
  nozzle_inner_diameter_mm: number
  methane_in_fuel_pct: number
  fuel_flow_cms: [number, number]
  coflow_air_cms: [number, number]
  gravity_regime: "microgravity"
  source_url: string
  locator: string
}

export interface ExperimentRun {
  campaign: "BASS-II" | "Saffire I" | "Saffire II" | "Saffire III" | "FLEX-1"
  run_id: string
  gravity_regime: "microgravity"
  material: string
  geometry: string
  width_cm: number | null
  length_cm: number | null
  thickness_mm: number | null
  initial_droplet_diameter_mm: number | null
  burning_rate_constant_mm2_s: number[] | null
  burning_sides: 1 | 2 | null
  direction: "concurrent" | "opposed" | "quiescent"
  airflow_cms: number[]
  airflow_basis: "constant" | "start_end" | "plateaus"
  oxygen_vol_pct: number[]
  oxygen_basis: "fixed" | "start_end" | "approximate"
  pressure_atm: number | null
  spread_rate_mm_s: number[] | null
  burn_duration_s: number | null
  outcome: string | null
  diagnostics: string[]
  notes: string[]
  source_url: string
  locator: string
  supplementary_url: string | null
}
