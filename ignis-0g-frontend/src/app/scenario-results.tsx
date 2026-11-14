import { useQuery } from "@tanstack/react-query"
import { api, useMocks } from "@/api/client"
import { Button } from "@/components/ui/button"
import type { Scenario, ScenarioStudy } from "@/domain/types"
import { useLocale } from "@/i18n"
import { getMockStudyDetail } from "@/mocks/data"
import { QueryFailure, QueryLoading } from "./query-feedback"
import { downloadFile } from "./study-evidence"

const fields = [
  { key: "o2_pct", labelEn: "O₂, %", labelRu: "O₂, %", max: 100 },
  { key: "pressure_kpa", labelEn: "Pressure, kPa", labelRu: "Давление, кПа", max: 100 },
  { key: "flow_cms", labelEn: "Airflow, cm/s", labelRu: "Поток, см/с", max: 50 },
  { key: "gravity_g", labelEn: "Gravity, g", labelRu: "Гравитация, g", max: 1 },
] as const

function exportResults(format: "csv" | "json", scenario: Scenario, studies: ScenarioStudy[]) {
  if (format === "json") {
    downloadFile("ignis-scenario.json", JSON.stringify({ scenario, basis: "independent_catalog_ranges", studies }, null, 2), "application/json")
    return
  }
  const rows = [
    [
      "study_id", "title", "score", "fuel", "material", "facility", "source_urls", "matched", "outside", "unknown", "basis",
      ...fields.flatMap(({ key }) => [`target_${key}`, `min_${key}`, `max_${key}`]), "target_fuel", "target_pillar",
    ],
    ...studies.map((study) => [
      study.study_id, study.title, study.score, study.fuel, study.material, study.facility,
      study.source_urls.join(" "), study.matched.join(" "), study.outside.join(" "), study.unknown.join(" "),
      "independent_catalog_ranges", ...fields.flatMap(({ key }) => [scenario[key], study[key]?.[0], study[key]?.[1]]),
      scenario.fuel, scenario.pillar,
    ]),
  ]
  const content = rows.map((row) => row.map((value) => {
    const raw = String(value ?? "")
    const safe = /^[\s]*[=+\-@]|^[\t\r\n]/.test(raw) && typeof value === "string" ? "'" + raw : raw
    return '"' + safe.replaceAll('"', '""') + '"'
  }).join(",")).join("\r\n")
  downloadFile("ignis-scenario.csv", content, "text/csv;charset=utf-8")
}

export function ScenarioResults({
  scenario,
  onSelectStudy,
  compareIds,
  onToggleCompare,
}: {
  scenario: Scenario
  onSelectStudy: (id: string) => void
  compareIds?: string[]
  onToggleCompare?: (id: string) => void
}) {
  const locale = useLocale()
  const ru = locale === "ru"

  const query = useQuery({
    queryKey: ["scenario-ranking", locale, scenario],
    queryFn: async ({ signal }) => {
      const res = await api.rankScenario(scenario, signal)
      return res.map((study) => {
        const localized = getMockStudyDetail(study.study_id, locale)
        return {
          ...study,
          title: localized?.title ?? study.title,
          material: (localized?.conditions.fuel_material as string | undefined) ?? study.material,
        }
      })
    },
    staleTime: 60_000,
    gcTime: 60_000,
  })

  if (query.isPending) {
    return <QueryLoading label={ru ? "Подбираем исследования…" : "Matching studies to scenario…"} />
  }
  if (query.isError) {
    return (
      <QueryFailure
        label={ru ? "Не удалось подобрать исследования." : "Failed to rank studies for this scenario."}
        fetching={query.isFetching}
        retry={() => void query.refetch()}
      />
    )
  }

  const studies = query.data
  const coverageNote = ru
    ? "Диапазоны проверяются по отдельности. Совпадение не подтверждает испытание всей комбинации условий. Балл равен доле совпавших параметров из четырёх."
    : "Parameter ranges are evaluated independently. A range match does not imply the combined condition was jointly tested. Score equals the share of matched parameters out of four."

  return (
    <section className="panel panel-padding">
      <div className="panel-head-row">
        <h2>{ru ? `Релевантность исследований (${studies.length})` : `Study Relevance & Range Coverage (${studies.length})`}</h2>
        {studies.length > 0 && (
          <div className="export-actions">
            <Button size="sm" variant="outline" onClick={() => exportResults("csv", scenario, studies)}>CSV</Button>
            <Button size="sm" variant="outline" onClick={() => exportResults("json", scenario, studies)}>JSON</Button>
          </div>
        )}
      </div>
      {useMocks && <p className="muted">{ru ? "Демонстрационный каталог NASA PSI." : "NASA PSI demonstration catalog."}</p>}
      <p className="muted">{coverageNote}</p>
      {!studies.length && <p>{ru ? "По выбранным фильтрам в каталоге нет исследований." : "No studies in the catalog match the selected filters."}</p>}
      <div className="ranking-grid">
        {studies.map((study) => {
          const isCompared = compareIds?.includes(study.study_id)
          return (
            <article className="panel ranking-card" key={study.study_id}>
              <h3>
                <button className="card-title-btn" onClick={() => onSelectStudy(study.study_id)}>
                  {study.title}
                </button>
              </h3>
              <p>
                {study.score}/100 ·{" "}
                {ru
                  ? `${study.matched.length} совпало · ${study.outside.length} вне диапазона · ${study.unknown.length} неизвестно`
                  : `${study.matched.length} matched · ${study.outside.length} outside · ${study.unknown.length} unreported`}
              </p>
              {study.material && (
                <p>
                  {study.material}
                  {study.facility ? ` · ${study.facility}` : ""}
                </p>
              )}
              {fields.map(({ key, labelEn, labelRu, max }) => {
                const label = ru ? labelRu : labelEn
                const bounds = study[key]
                if (!bounds) {
                  return (
                    <div key={key} className="muted">
                      {label} · {ru ? "нет диапазона" : "unreported"}
                    </div>
                  )
                }
                const scale = Math.max(max, bounds[1], scenario[key])
                const text = bounds[0] === bounds[1] ? bounds[0] : `${bounds[0]}–${bounds[1]}`
                return (
                  <div key={key}>
                    <small>
                      {label} · {text} · {ru ? "цель" : "target"} {scenario[key]}
                    </small>
                    <div className="scenario-range" aria-hidden="true">
                      <span style={{ left: `${(100 * bounds[0]) / scale}%`, width: `${(100 * (bounds[1] - bounds[0])) / scale}%` }} />
                      <i style={{ left: `${(100 * scenario[key]) / scale}%` }} />
                    </div>
                  </div>
                )
              })}
              {study.source_urls.length > 0 && (
                <div className="ranking-card-sources">
                  {study.source_urls.map((url, index) => (
                    <a key={url} href={url} target="_blank" rel="noreferrer">
                      {ru ? `Источник ${index + 1}` : `Source ${index + 1}`}
                    </a>
                  ))}
                </div>
              )}
              {onToggleCompare && (
                <div className="ranking-card-actions">
                  <Button
                    size="sm"
                    variant="outline"
                    aria-pressed={isCompared}
                    onClick={() => onToggleCompare(study.study_id)}
                  >
                    {isCompared ? (ru ? "В сравнении" : "Comparing") : ru ? "Сравнить" : "Compare"}
                  </Button>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
