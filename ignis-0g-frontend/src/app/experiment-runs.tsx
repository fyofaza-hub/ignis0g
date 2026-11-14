import { useEffect, useState } from "react"
import { useQueries } from "@tanstack/react-query"
import { studyQueries } from "@/api/queries"
import { Button } from "@/components/ui/button"
import type { ExperimentRun } from "@/domain/types"
import { useLocale, type Locale } from "@/i18n"
import { QueryFailure, QueryLoading } from "./query-feedback"
import { downloadFile } from "./study-evidence"

const studyIds = ["bass-bass-ii-bass-m", "saffire-i-iii", "flex-1"]
const campaigns = ["BASS-II", "Saffire I", "Saffire II", "Saffire III", "FLEX-1"]

const outcomesByLocale: Record<Locale, Record<string, string>> = {
  en: {
    quenched: "Quenched",
    no_blowoff: "No blowoff observed",
    blowoff: "Blowoff",
    no_ignition: "No ignition",
    one_sided_flame: "One-sided flame",
    ignited: "Ignited",
    no_propagation: "No propagation",
    burned_to_end: "Burned to end of sample",
    no_spread_into_nomex: "No spread into Nomex",
    cool_flame: "Two-stage cool flame",
    extinction: "Flame extinction",
    completion: "Burned to completion",
    disruption: "Droplet disruption",
  },
  ru: {
    quenched: "Затухание",
    no_blowoff: "Срыва пламени не было",
    blowoff: "Срыв пламени",
    no_ignition: "Без воспламенения",
    one_sided_flame: "Пламя с одной стороны",
    ignited: "Воспламенился",
    no_propagation: "Пламя не распространилось",
    burned_to_end: "Образец прогорел до конца",
    no_spread_into_nomex: "Пламя не перешло на Nomex",
    cool_flame: "Двухстадийное холодное пламя",
    extinction: "Затухание пламени",
    completion: "Полное выгорание",
    disruption: "Разрушение капли (disruption)",
  },
}

function key(run: ExperimentRun) {
  return `${run.campaign} / ${run.run_id}`
}

function airflow(run: ExperimentRun) {
  return run.airflow_cms.join(run.airflow_basis === "start_end" ? " → " : " / ")
}

function oxygen(run: ExperimentRun) {
  return (run.oxygen_basis === "approximate" ? "≈ " : "") + run.oxygen_vol_pct.join(" → ")
}

function rates(run: ExperimentRun, locale: Locale) {
  if (!run.spread_rate_mm_s) return null
  const rateUnit = run.campaign === "FLEX-1" ? (locale === "ru" ? "мм²/с" : "mm²/s") : locale === "ru" ? "мм/с" : "mm/s"
  return run.spread_rate_mm_s
    .map((rate, index) =>
      locale === "ru"
        ? `${rate} ${rateUnit} при ${run.airflow_cms[index]} см/с`
        : `${rate} ${rateUnit} at ${run.airflow_cms[index]} cm/s`,
    )
    .join(" / ")
}

function getRows(locale: Locale): { label: string; get: (run: ExperimentRun) => string | number | null }[] {
  const outcomes = outcomesByLocale[locale]
  if (locale === "ru") {
    return [
      { label: "Материал / топливо", get: (r) => r.material },
      { label: "Геометрия", get: (r) => r.geometry },
      { label: "Ширина / диаметр, см", get: (r) => r.width_cm },
      { label: "Длина, см", get: (r) => r.length_cm },
      { label: "Толщина / d₀, мм", get: (r) => r.thickness_mm },
      { label: "Горящих сторон", get: (r) => r.burning_sides },
      { label: "Гравитация", get: () => "Микрогравитация" },
      { label: "Направление распространения", get: (r) => (r.direction === "quiescent" ? "Штиль (без потока)" : r.direction === "concurrent" ? "По потоку / сопутств." : "Против потока") },
      { label: "Поток воздуха, см/с", get: airflow },
      { label: "O₂, об. %", get: oxygen },
      { label: "Давление, атм", get: (r) => r.pressure_atm },
      { label: "Скорость пламени (мм/с) / K (мм²/с)", get: (r) => rates(r, locale) },
      { label: "Время горения, с", get: (r) => r.burn_duration_s },
      { label: "Наблюдение", get: (r) => (r.outcome ? outcomes[r.outcome] ?? r.outcome : null) },
      { label: "Диагностика", get: (r) => r.diagnostics.join("; ") || null },
      { label: "Примечания источника", get: (r) => r.notes.join(" ") || null },
    ]
  }
  return [
    { label: "Material / fuel", get: (r) => r.material },
    { label: "Geometry", get: (r) => r.geometry },
    { label: "Width / diameter, cm", get: (r) => r.width_cm },
    { label: "Length, cm", get: (r) => r.length_cm },
    { label: "Thickness / d₀, mm", get: (r) => r.thickness_mm },
    { label: "Burning sides", get: (r) => r.burning_sides },
    { label: "Gravity", get: () => "Microgravity" },
    { label: "Spread direction", get: (r) => (r.direction === "quiescent" ? "Quiescent" : r.direction === "concurrent" ? "Concurrent" : "Opposed") },
    { label: "Airflow, cm/s", get: airflow },
    { label: "O₂, vol %", get: oxygen },
    { label: "Pressure, atm", get: (r) => r.pressure_atm },
    { label: "Spread rate (mm/s) / K (mm²/s)", get: (r) => rates(r, locale) },
    { label: "Burn duration, s", get: (r) => r.burn_duration_s },
    { label: "Outcome", get: (r) => (r.outcome ? outcomes[r.outcome] ?? r.outcome : null) },
    { label: "Diagnostics", get: (r) => r.diagnostics.join("; ") || null },
    { label: "Source notes", get: (r) => r.notes.join(" ") || null },
  ]
}

function exportRuns(runs: ExperimentRun[], format: "csv" | "json") {
  const filename = `ignis-experiment-runs.${format}`
  const records = runs.map((run) => ({
    campaign: run.campaign, run_id: run.run_id, gravity_regime: run.gravity_regime,
    material: run.material, geometry: run.geometry, width_cm: run.width_cm, length_cm: run.length_cm,
    thickness_mm: run.thickness_mm, burning_sides: run.burning_sides, direction: run.direction,
    airflow_cms: run.airflow_cms, airflow_basis: run.airflow_basis, oxygen_vol_pct: run.oxygen_vol_pct,
    oxygen_basis: run.oxygen_basis, pressure_atm: run.pressure_atm, spread_rate_mm_s: run.spread_rate_mm_s,
    burn_duration_s: run.burn_duration_s, outcome: run.outcome, diagnostics: run.diagnostics, notes: run.notes,
    source_url: run.source_url, locator: run.locator, supplementary_url: run.supplementary_url,
  }))
  if (format === "json") {
    downloadFile(filename, JSON.stringify(records, null, 2), "application/json")
    return
  }
  const data = [Object.keys(records[0]), ...records.map(Object.values)]
  const csv = data.map((row) => row.map((cell) => {
    const raw = Array.isArray(cell) ? JSON.stringify(cell) : String(cell ?? "")
    const safe = /^[\s]*[=+@-]|^[\t\r\n]/.test(raw) ? "'" + raw : raw
    return '"' + safe.replaceAll('"', '""') + '"'
  }).join(",")).join("\r\n")
  downloadFile(filename, csv, "text/csv;charset=utf-8")
}

function RunSource({ run, locale }: { run: ExperimentRun; locale: Locale }) {
  return <>
    <a href={run.source_url} target="_blank" rel="noreferrer">{run.locator}</a>
    {run.supplementary_url && <> · <a href={run.supplementary_url} target="_blank" rel="noreferrer">{locale === "ru" ? "Наблюдение" : "Observation"}</a></>}
  </>
}

export function ExperimentRuns({ availableStudyIds }: { availableStudyIds: string[] }) {
  const locale = useLocale()
  const queries = useQueries({ queries: studyIds.filter((id) => availableStudyIds.includes(id)).map(studyQueries.runs) })
  const [campaign, setCampaign] = useState("")
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string[]>([])
  const studies = queries.flatMap((query) => query.data ?? [])
  const selection = selected.flatMap((id) => studies.find((run) => key(run) === id) ?? [])
  const query = search.trim().toLowerCase()
  const visible = studies.filter((run) => (!campaign || run.campaign === campaign) &&
    `${key(run)} ${run.material}`.toLowerCase().includes(query))
  const rows = getRows(locale)

  useEffect(() => {
    if (window.location.hash === "#experiment-runs") {
      document.getElementById("experiment-runs")?.scrollIntoView({ block: "start" })
    }
  }, [])

  function toggle(id: string) {
    setSelected((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : prev.length < 4 ? [...prev, id] : prev)
  }

  return (
    <section className="panel panel-padding" id="experiment-runs">
      <h2>
        {locale === "ru"
          ? "Оцифрованные прогоны из таблиц NASA (BASS-II, Saffire I–III, FLEX-1)"
          : "Digitized NASA Test Runs (BASS-II, Saffire I–III, FLEX-1)"}
      </h2>
      <p className="muted">
        {locale === "ru"
          ? `База включает ${studies.length} верифицированных прогонов из первичных отчётов NASA: твёрдые полимеры и ткани (BASS-II, Saffire I–III) и жидкие капли (FLEX-1). Выберите от 2 до 4 прогонов для прямого сопоставления.`
          : `Includes ${studies.length} verified test runs extracted from primary NASA tables across solid polymers & fabrics (BASS-II, Saffire I–III) and isolated liquid droplets (FLEX-1). Select 2 to 4 test runs to compare side by side.`}
      </p>
      {queries.some((result) => result.isPending) && (
        <QueryLoading label={locale === "ru" ? "Загружаем прогоны…" : "Loading test runs…"} />
      )}
      {queries.some((result) => result.isError) && (
        <QueryFailure
          label={locale === "ru" ? "Часть прогонов не загрузилась." : "Some test runs failed to load."}
          fetching={queries.some((result) => result.isFetching)}
          retry={() => { for (const result of queries) if (result.isError) void result.refetch() }}
        />
      )}
      {studies.length === 0 && queries.every((result) => result.isSuccess) && (
        <p>{locale === "ru" ? "Прогоны пока не загружены в каталог." : "No test runs loaded in the catalog yet."}</p>
      )}
      {studies.length > 0 && <>
        <div className="scenario-controls">
          <label>{locale === "ru" ? "Серия" : "Campaign"}
            <select value={campaign} onChange={(event) => setCampaign(event.target.value)}>
              <option value="">{locale === "ru" ? "Все серии" : "All campaigns"}</option>
              {campaigns.map((name) => <option key={name}>{name}</option>)}
            </select>
          </label>
          <label>{locale === "ru" ? "Номер прогона или материал" : "Run ID or material"}
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
        </div>
        <div className="export-actions">
          <Button size="sm" variant="outline" disabled={!visible.length} onClick={() => exportRuns(visible, "csv")}>
            {locale === "ru" ? "Результаты · CSV" : "Export visible · CSV"}
          </Button>
          <Button size="sm" variant="outline" disabled={!visible.length} onClick={() => exportRuns(visible, "json")}>
            {locale === "ru" ? "Результаты · JSON" : "Export visible · JSON"}
          </Button>
        </div>
        <p className="muted">
          {locale === "ru"
            ? `Показано ${visible.length} из ${studies.length} прогонов`
            : `Showing ${visible.length} of ${studies.length} published test runs`}
        </p>
        {selection.length > 0 && <div className="study-block">
          <h3>{locale === "ru" ? `Выбрано для сравнения (${selection.length}/4)` : `Selected for comparison (${selection.length}/4)`}</h3>
          <div className="ranking-card-actions">
            {selection.map((run) => <Button variant="outline" size="sm" key={key(run)} onClick={() => toggle(key(run))}>{key(run)} ×</Button>)}
          </div>
          {selection.length >= 2 && <>
            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col">{locale === "ru" ? "Параметр" : "Parameter"}</th>
                    {selection.map((run) => <th scope="col" key={key(run)}>{key(run)}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ label, get }) => {
                    const values = selection.map(get)
                    const known = values.every((value) => value !== null)
                    const rowClass = known && new Set(values).size > 1 ? "compare-row-diff" : undefined
                    return (
                      <tr key={label} className={rowClass}>
                        <th scope="row">{label}</th>
                        {values.map((value, index) => <td key={key(selection[index])}>{value ?? (locale === "ru" ? "н/д" : "N/A")}</td>)}
                      </tr>
                    )
                  })}
                  <tr>
                    <th scope="row">{locale === "ru" ? "Источник" : "Source"}</th>
                    {selection.map((run) => <td key={key(run)}><RunSource run={run} locale={locale} /></td>)}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="muted">
              {locale === "ru"
                ? "Стрелка (→) показывает начальное и конечное значения. Скорости пламени указаны при соответствующих скоростях потока (для капель FLEX-1 указана константа скорости горения K в мм²/с)."
                : "Arrows (→) indicate start and end values. Flame spread rates correspond to the listed airflow velocities (for FLEX-1 droplets, K is reported in mm²/s)."}
            </p>
            <div className="export-actions">
              <Button size="sm" variant="outline" onClick={() => exportRuns(selection, "csv")}>
                {locale === "ru" ? "Выбранные · CSV" : "Selected · CSV"}
              </Button>
              <Button size="sm" variant="outline" onClick={() => exportRuns(selection, "json")}>
                {locale === "ru" ? "Выбранные · JSON" : "Selected · JSON"}
              </Button>
            </div>
          </>}
        </div>}
        <div className="compare-table-wrap experiment-run-list" tabIndex={0} aria-label={locale === "ru" ? "Список прогонов" : "Test run list"}>
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col">{locale === "ru" ? "Прогон" : "Run"}</th>
                <th scope="col">{locale === "ru" ? "Материал" : "Material"}</th>
                <th scope="col">{locale === "ru" ? "Поток, см/с" : "Airflow, cm/s"}</th>
                <th scope="col">{locale === "ru" ? "O₂, об. %" : "O₂, vol %"}</th>
                <th scope="col">{locale === "ru" ? "Источник" : "Source"}</th>
              </tr>
            </thead>
            <tbody>{visible.map((run) => (
              <tr key={key(run)}>
                <td><label><input type="checkbox" checked={selected.includes(key(run))}
                  disabled={selected.length >= 4 && !selected.includes(key(run))}
                  onChange={() => toggle(key(run))} /> {key(run)}</label></td>
                <td>{run.material}</td><td>{airflow(run)}</td><td>{oxygen(run)}</td><td><RunSource run={run} locale={locale} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        {visible.length === 0 && <p>{locale === "ru" ? "Прогоны по этим фильтрам не найдены." : "No test runs match these filters."}</p>}
      </>}
    </section>
  )
}
