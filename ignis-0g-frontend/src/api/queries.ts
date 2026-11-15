import { queryOptions } from "@tanstack/react-query"
import { getLocale, type Locale } from "@/i18n"
import { api, type ListStudiesParams } from "./client"

const studiesKey = ["studies"] as const
const studyKey = (id: string, locale: Locale) => [...studiesKey, "detail", id, locale] as const

// Scientific content comes from the selected transport only. UI translations
// must never overwrite observations, provenance, units or missing API records.
export const studyQueries = {
  all: studiesKey,
  list: (params: ListStudiesParams = { limit: 100, offset: 0 }, locale: Locale = getLocale()) =>
    queryOptions({
      queryKey: [...studiesKey, "list", locale, params],
      queryFn: ({ signal }) => api.listStudies(params, signal),
    }),
  filters: () =>
    queryOptions({
      queryKey: [...studiesKey, "filters"],
      queryFn: ({ signal }) => api.getFilters(signal),
    }),
  detail: (id: string, locale: Locale = getLocale()) =>
    queryOptions({
      queryKey: studyKey(id, locale),
      queryFn: ({ signal }) => api.getStudy(id, signal),
      enabled: Boolean(id),
    }),
  runs: (id: string) =>
    queryOptions({
      queryKey: [...studiesKey, "detail", id, "runs"],
      queryFn: ({ signal }) => api.listRuns(id, signal),
      enabled: Boolean(id),
    }),
  datasets: (id: string, locale: Locale = getLocale()) =>
    queryOptions({
      queryKey: [...studyKey(id, locale), "datasets"],
      queryFn: ({ signal }) => api.listDatasets(id, signal),
      enabled: Boolean(id),
    }),
  relations: (id: string, locale: Locale = getLocale()) =>
    queryOptions({
      queryKey: [...studyKey(id, locale), "relations"],
      queryFn: ({ signal }) => api.listRelations(id, signal),
      enabled: Boolean(id),
    }),
  graph: (studyId?: string, depth = 1, locale: Locale = getLocale()) =>
    queryOptions({
      queryKey: ["nexus", "graph", locale, studyId ?? "all", depth],
      queryFn: ({ signal }) => api.getGraph(studyId, depth, signal),
    }),
}
