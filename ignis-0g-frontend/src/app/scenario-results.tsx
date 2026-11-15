import { exportSourceUrl, nasaContentUrl } from "@/lib/nasa-content"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { api, useMocks } from "@/api/client"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, Share, X } from "@/components/ui/icons"
import type { Scenario, ScenarioStudy } from "@/domain/types"
import { useLocale } from "@/i18n"
import { QueryFailure, QueryLoading } from "./query-feedback"
import { downloadFile } from "./study-evidence"

const fields = [
  { key: "o2_pct", labelEn: "O₂, %", labelRu: "O₂, %", shortEn: "O₂", shortRu: "O₂", max: 100 },
  { key: "pressure_kpa", labelEn: "Pressure, kPa", labelRu: "Давление, кПа", shortEn: "Pressure", shortRu: "Давление", max: 100 },
  { key: "flow_cms", labelEn: "Airflow, cm/s", labelRu: "Поток, см/с", shortEn: "Airflow", shortRu: "Поток", max: 50 },
  { key: "gravity_g", labelEn: "Gravity, g", labelRu: "Гравитация, g", shortEn: "Gravity", shortRu: "Гравитация", max: 1 },
] as const

function fieldShortLabel(key: string, ru: boolean): string {
  const found = fields.find((f) => f.key === key)
  if (!found) return key
  return ru ? found.shortRu : found.shortEn
}

function exportResults(format: "csv" | "json", scenario: Scenario, studies: ScenarioStudy[]) {
  if (format === "json") {
    const exportedStudies = studies.map((study) => ({
      ...study,
      source_urls: study.source_urls.map((url) => exportSourceUrl(url)),
    }))
    downloadFile("ignis-scenario.json", JSON.stringify({ scenario, basis: "independent_catalog_ranges", studies: exportedStudies }, null, 2), "application/json")
    return
  }
  const rows = [
    [
      "study_id", "title", "score", "fuel", "material", "facility", "source_urls", "matched", "outside", "unknown", "basis",
      ...fields.flatMap(({ key }) => [`target_${key}`, `min_${key}`, `max_${key}`]), "target_fuel", "target_pillar", "ranking_version", "reported_parameter_count", "source_count", "run_count", "jointly_reported_run_ids", "limitations",
    ],
    ...studies.map((study) => [
      study.study_id, study.title, study.score, study.fuel, study.material, study.facility,
      study.source_urls.map((url) => exportSourceUrl(url)).join(" "), study.matched.join(" "), study.outside.join(" "), study.unknown.join(" "),
      "independent_catalog_ranges", ...fields.flatMap(({ key }) => [scenario[key], study[key]?.[0], study[key]?.[1]]),
      scenario.fuel, scenario.pillar, study.ranking_version, study.reported_parameter_count, study.source_count, study.run_count, study.jointly_reported_run_ids?.join("; "), study.limitations?.join("; "),
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
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [pinnedId, setPinnedId] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)

  useEffect(() => {
    if (!pinnedId) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setPinnedId(null)
        setHoveredId(null)
      }
    }
    function onPointerDown(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (target && !target.closest(".ranking-score-wrap")) {
        setPinnedId(null)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    document.addEventListener("mousedown", onPointerDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("mousedown", onPointerDown)
    }
  }, [pinnedId])

  async function copyScenarioLink() {
    const href = window.location.href
    try {
      await navigator.clipboard?.writeText(href)
      setCopiedLink(true)
      window.setTimeout(() => setCopiedLink(false), 1800)
    } catch {
      window.prompt(ru ? "Скопируйте ссылку сценария:" : "Copy scenario link:", href)
    }
  }

  const query = useQuery({
    queryKey: ["scenario-ranking", locale, scenario],
    queryFn: ({ signal }) => api.rankScenario(scenario, signal),
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
        <div className="export-actions">
          <Button size="sm" variant="outline" onClick={() => void copyScenarioLink()}>
            <Share size={14} />{" "}
            {copiedLink ? (ru ? "Скопировано!" : "Copied!") : ru ? "Ссылка" : "Share link"}
          </Button>
          {studies.length > 0 && (
            <>
              <Button size="sm" variant="outline" onClick={() => exportResults("csv", scenario, studies)}>CSV</Button>
              <Button size="sm" variant="outline" onClick={() => exportResults("json", scenario, studies)}>JSON</Button>
            </>
          )}
        </div>
      </div>
      {useMocks && <p className="muted">{ru ? "Демонстрационный каталог NASA PSI." : "NASA PSI demonstration catalog."}</p>}
      <p className="muted">{coverageNote}</p>
      {!studies.length && <p>{ru ? "По выбранным фильтрам в каталоге нет исследований." : "No studies in the catalog match the selected filters."}</p>}
      <div className="ranking-grid">
        {studies.map((study) => {
          const isCompared = compareIds?.includes(study.study_id)
          const scoreTone = study.score >= 75 ? "good" : study.score >= 50 ? "mid" : "low"
          const isPinned = pinnedId === study.study_id
          const isBreakdownOpen = isPinned || hoveredId === study.study_id
          const jointRuns = study.jointly_reported_run_ids ?? []
          const hasJointMatch = jointRuns.length > 0
          const partialGravityWarning = study.limitations?.includes(
            "microgravity_results_do_not_validate_partial_or_earth_gravity",
          )

          return (
            <article className="panel ranking-card" key={study.study_id}>
              <div className="ranking-card-head">
                <h3>
                  <button className="card-title-btn" onClick={() => onSelectStudy(study.study_id)}>
                    {study.title}
                  </button>
                </h3>
                <div
                  className="ranking-score-wrap"
                  onMouseEnter={() => setHoveredId(study.study_id)}
                  onMouseLeave={() => setHoveredId((prev) => (prev === study.study_id ? null : prev))}
                >
                  <button
                    type="button"
                    className={`ranking-score-badge ${scoreTone}${isBreakdownOpen ? " active" : ""}`}
                    aria-expanded={isBreakdownOpen}
                    aria-controls={`score-breakdown-${study.study_id}`}
                    title={
                      ru
                        ? "Наведите или нажмите для разбора совпадений и проверки по прогонам"
                        : "Hover or click to inspect matched fields and run verification"
                    }
                    onClick={() => {
                      if (isPinned) {
                        setPinnedId(null)
                        setHoveredId(null)
                      } else {
                        setPinnedId(study.study_id)
                      }
                    }}
                  >
                    <span>{study.score}/100</span>
                    <span className="ranking-score-hint" aria-hidden="true">?</span>
                  </button>

                  {isBreakdownOpen && (
                    <div
                      id={`score-breakdown-${study.study_id}`}
                      className="ranking-score-popover"
                      role="region"
                      aria-label={
                        ru ? `Детализация балла: ${study.title}` : `Score breakdown: ${study.title}`
                      }
                    >
                      <div className="score-popover-head">
                        <strong>
                          {ru
                            ? `Совпадение: ${study.matched.length} из 4 (${study.score}/100)`
                            : `Match score: ${study.matched.length} of 4 (${study.score}/100)`}
                        </strong>
                        <button
                          type="button"
                          className="icon-button"
                          aria-label={ru ? "Закрыть разбор" : "Close breakdown"}
                          onClick={() => {
                            setPinnedId(null)
                            setHoveredId(null)
                          }}
                        >
                          <X size={14} />
                        </button>
                      </div>

                      <div className="score-popover-row">
                        <span className="score-row-label">{ru ? "Совпали:" : "Matched:"}</span>
                        <div className="score-tag-list">
                          {study.matched.length > 0 ? (
                            study.matched.map((key) => (
                              <span key={key} className="score-tag matched">
                                {fieldShortLabel(key, ru)}
                              </span>
                            ))
                          ) : (
                            <span className="muted">{ru ? "нет" : "none"}</span>
                          )}
                        </div>
                      </div>

                      {study.outside.length > 0 && (
                        <div className="score-popover-row">
                          <span className="score-row-label">{ru ? "Вне диапазона:" : "Outside:"}</span>
                          <div className="score-tag-list">
                            {study.outside.map((key) => (
                              <span key={key} className="score-tag outside">
                                {fieldShortLabel(key, ru)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="score-popover-row">
                        <span className="score-row-label">{ru ? "Нет данных:" : "No data:"}</span>
                        <div className="score-tag-list">
                          {study.unknown.length > 0 ? (
                            study.unknown.map((key) => (
                              <span key={key} className="score-tag unknown">
                                {fieldShortLabel(key, ru)}
                              </span>
                            ))
                          ) : (
                            <span className="score-tag ok">
                              {ru ? "все 4 параметра указаны" : "all 4 parameters reported"}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className={`score-joint-status ${hasJointMatch ? "verified" : "unverified"}`}>
                        <div className="score-joint-head">
                          {hasJointMatch ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                          <strong>
                            {hasJointMatch
                              ? ru
                                ? `Подтверждено конкретным прогоном (${jointRuns.length})`
                                : `Verified by specific test run (${jointRuns.length})`
                              : ru
                                ? "Комбинация не подтверждена отдельным прогоном"
                                : "Combination not confirmed by a single run"}
                          </strong>
                        </div>
                        {hasJointMatch ? (
                          <div className="score-tag-list">
                            {jointRuns.slice(0, 4).map((runId) => (
                              <span key={runId} className="score-tag matched">
                                {runId}
                              </span>
                            ))}
                            {jointRuns.length > 4 && (
                              <span className="muted">+{jointRuns.length - 4}</span>
                            )}
                          </div>
                        ) : (
                          <p className="muted">
                            {(study.run_count ?? 0) > 0
                              ? ru
                                ? `Проверено по ${study.run_count} прогонам: одновременного совпадения O₂, давления и потока при 0g нет.`
                                : `Checked ${study.run_count} digitized runs: no single fixed run matches O₂, pressure, airflow, and 0g together.`
                              : ru
                                ? "Совпадение оценено по независимым диапазонам; табличных прогонов для перекрёстной проверки нет."
                                : "Evaluated from marginal ranges only; no fixed-condition run table is indexed for joint verification."}
                          </p>
                        )}
                      </div>

                      {partialGravityWarning && (
                        <p className="score-warning-note">
                          {ru
                            ? "Данные 0g не подтверждают горение при частичной или земной гравитации."
                            : "0g results do not validate partial or Earth gravity."}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <p className="ranking-match-summary">
                {ru
                  ? `${study.matched.length} совпало · ${study.outside.length} вне диапазона · ${study.unknown.length} н/д`
                  : `${study.matched.length} matched · ${study.outside.length} outside · ${study.unknown.length} N/A`}
                {hasJointMatch && (
                  <span className="ranking-joint-inline">
                    {" "}· ✓ {ru ? `прогон ${jointRuns[0]}` : `run ${jointRuns[0]}`}
                  </span>
                )}
              </p>
              {study.material && (
                <p className="ranking-material-line">
                  {study.material}
                  {study.facility ? ` · ${study.facility}` : ""}
                </p>
              )}
              {fields.map(({ key, labelEn, labelRu, max }) => {
                const label = ru ? labelRu : labelEn
                const bounds = study[key]
                if (!bounds) {
                  return (
                    <div key={key} className="muted ranking-field-unreported">
                      {label} · {ru ? "нет диапазона" : "unreported"}
                    </div>
                  )
                }
                const scale = Math.max(max, bounds[1], scenario[key], 1)
                const leftPct = Math.min(100, Math.max(0, (100 * bounds[0]) / scale))
                const widthPct = Math.min(100 - leftPct, Math.max(2, (100 * (bounds[1] - bounds[0])) / scale))
                const targetPct = Math.min(98.5, Math.max(1.5, (100 * scenario[key]) / scale))
                const text = bounds[0] === bounds[1] ? bounds[0] : `${bounds[0]}–${bounds[1]}`
                return (
                  <div key={key}>
                    <small>
                      {label} · {text} · {ru ? "цель" : "target"} {scenario[key]}
                    </small>
                    <div className="scenario-range" aria-hidden="true">
                      <span style={{ left: `${leftPct}%`, width: `${widthPct}%` }} />
                      <i style={{ left: `${targetPct}%` }} />
                    </div>
                  </div>
                )
              })}
              {study.source_urls.length > 0 && (
                <div className="ranking-card-sources">
                  {study.source_urls.map((url, index) => (
                    <a key={url} href={nasaContentUrl(url)} target="_blank" rel="noreferrer">
                      {ru ? `Источник ${index + 1}` : `Source ${index + 1}`}
                    </a>
                  ))}
                </div>
              )}
              <div className="ranking-card-actions">
                <Button size="sm" onClick={() => onSelectStudy(study.study_id)}>
                  {ru ? "Открыть" : "Open"}
                </Button>
                {onToggleCompare && (
                  <Button
                    size="sm"
                    variant="outline"
                    aria-pressed={isCompared}
                    onClick={() => onToggleCompare(study.study_id)}
                  >
                    {isCompared ? (ru ? "В сравнении" : "Comparing") : ru ? "Сравнить" : "Compare"}
                  </Button>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
