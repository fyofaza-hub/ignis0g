import { queryOptions } from "@tanstack/react-query"
import { getLocale, type Locale } from "@/i18n"
import type { Graph, StudyDetail, StudySummary } from "@/domain/types"
import {
  getDatasetsForStudy,
  getMockRelations,
  getMockStudyDetail,
  getProgramMedia,
} from "@/mocks/data"
import { mockExperimentRuns } from "@/mocks/experiment-runs-data"
import { api, type ListStudiesParams } from "./client"

const studiesKey = ["studies"] as const
const studyKey = (id: string, locale: Locale) => [...studiesKey, "detail", id, locale] as const

function enrichSummary(item: StudySummary, locale: Locale): StudySummary {
  const fallback = getMockStudyDetail(item.id, locale)
  if (!fallback) return item
  return {
    ...item,
    title: fallback.title || item.title,
    description: fallback.description || item.description,
    thumbnail_url: item.thumbnail_url ?? fallback.thumbnail_url,
  }
}

function enrichDetail(detail: StudyDetail, locale: Locale): StudyDetail {
  const fallback = getMockStudyDetail(detail.id, locale)
  const fallbackDatasets = getDatasetsForStudy(detail.id, detail.category, locale)
  const fallbackMedia = getProgramMedia(detail.category, locale)

  return {
    ...detail,
    title: fallback?.title || detail.title,
    description: fallback?.description || detail.description,
    methodology: fallback?.methodology || detail.methodology,
    thumbnail_url: detail.thumbnail_url ?? fallback?.thumbnail_url ?? null,
    conditions: {
      ...detail.conditions,
      ...(fallback?.conditions ?? {}),
      modeling_runs: detail.conditions.modeling_runs?.length
        ? detail.conditions.modeling_runs
        : fallback?.conditions.modeling_runs,
    },
    findings: fallback?.findings.length ? fallback.findings : detail.findings,
    safety_implications: fallback?.safety_implications.length
      ? fallback.safety_implications
      : detail.safety_implications,
    media: fallbackMedia.length ? fallbackMedia : detail.media,
    datasets: detail.datasets.length
      ? detail.datasets
      : fallbackDatasets.map(({ id, source_id, title, chart_type, locator, notes }) => ({
          id,
          source_id,
          title,
          chart_type,
          locator,
          notes,
        })),
  }
}

function enrichGraph(graph: Graph, locale: Locale, studyId?: string): Graph {
  const relations = getMockRelations(locale)
  if (graph.edges.length > 0) return graph
  const nodeIds = new Set(graph.nodes.map((n) => n.id))
  const edges = relations
    .filter((r) => {
      if (studyId) return r.from_study_id === studyId || r.to_study_id === studyId
      return nodeIds.has(r.from_study_id) && nodeIds.has(r.to_study_id)
    })
    .map((r) => ({
      id: r.id,
      source: r.from_study_id,
      target: r.to_study_id,
      type: r.relation_type,
      explanation: r.explanation,
      source_id: r.source_id,
      source_url: r.source_url,
      evidence: r.evidence,
    }))
  const neededNodes = new Set<string>(graph.nodes.map((n) => n.id))
  for (const e of edges) {
    neededNodes.add(e.source)
    neededNodes.add(e.target)
  }
  const nodes = Array.from(neededNodes).map((id) => {
    const localized = getMockStudyDetail(id, locale)
    const existing = graph.nodes.find((n) => n.id === id)
    if (existing) {
      return { ...existing, label: localized?.title ?? existing.label }
    }
    return { id, type: "study" as const, label: localized?.title ?? id }
  })
  return { nodes, edges, truncated: graph.truncated }
}

export const studyQueries = {
  all: studiesKey,
  list: (params: ListStudiesParams = { limit: 100, offset: 0 }, locale: Locale = getLocale()) =>
    queryOptions({
      queryKey: [...studiesKey, "list", locale, params],
      queryFn: async ({ signal }) => {
        const res = await api.listStudies(params, signal)
        return { ...res, items: res.items.map((item) => enrichSummary(item, locale)) }
      },
    }),
  filters: () =>
    queryOptions({
      queryKey: [...studiesKey, "filters"],
      queryFn: ({ signal }) => api.getFilters(signal),
    }),
  detail: (id: string, locale: Locale = getLocale()) =>
    queryOptions({
      queryKey: studyKey(id, locale),
      queryFn: async ({ signal }) => enrichDetail(await api.getStudy(id, signal), locale),
      enabled: Boolean(id),
    }),
  runs: (id: string) =>
    queryOptions({
      queryKey: [...studiesKey, "detail", id, "runs"],
      queryFn: async ({ signal }) => {
        const res = await api.listRuns(id, signal)
        return res.length ? res : (mockExperimentRuns[id] ?? [])
      },
      enabled: Boolean(id),
    }),
  datasets: (id: string, locale: Locale = getLocale()) =>
    queryOptions({
      queryKey: [...studyKey(id, locale), "datasets"],
      queryFn: async ({ signal }) => {
        const res = await api.listDatasets(id, signal)
        const localized = getDatasetsForStudy(id, undefined, locale)
        if (!res.length) return localized
        if (locale !== "ru") return res
        const byId = new Map(localized.map((item) => [item.id, item]))
        return res.map((item) => {
          const match = byId.get(item.id)
          return match
            ? {
                ...item,
                title: match.title,
                notes: match.notes,
                x_label: match.x_label,
                y_label: match.y_label,
                units: match.units,
                series: item.series.map((s) => {
                  const mSeries = match.series.find((ms) => ms.id === s.id)
                  return mSeries ? { ...s, label: mSeries.label } : s
                }),
              }
            : item
        })
      },
      enabled: Boolean(id),
    }),
  relations: (id: string, locale: Locale = getLocale()) =>
    queryOptions({
      queryKey: [...studyKey(id, locale), "relations"],
      queryFn: async ({ signal }) => {
        const res = await api.listRelations(id, signal)
        const fallback = getMockRelations(locale).filter(
          (r) => r.from_study_id === id || r.to_study_id === id,
        )
        return fallback.length ? fallback : res
      },
      enabled: Boolean(id),
    }),
  graph: (studyId?: string, depth = 1, locale: Locale = getLocale()) =>
    queryOptions({
      queryKey: ["nexus", "graph", locale, studyId ?? "all", depth],
      queryFn: async ({ signal }) => enrichGraph(await api.getGraph(studyId, depth, signal), locale, studyId),
    }),
}
