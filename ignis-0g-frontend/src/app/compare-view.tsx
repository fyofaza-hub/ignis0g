import { useMemo, useState } from "react"
import { useQueries } from "@tanstack/react-query"
import { ApiError, api } from "@/api/client"
import { studyQueries } from "@/api/queries"
import { AlertTriangle, Cpu, GitCompare, Sparkles, X } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { getHardwareRacks, localizeCategory, localizePillar } from "@/domain/knowledge"
import type { CompareResponse, StudySummary } from "@/domain/types"
import type { CompareDiffFilter } from "@/domain/url-state"
import { useLocale, type Locale } from "@/i18n"

import { CitationInspector, CitationList, RichCitedText } from "./citation-view"
import { ExperimentRuns, type RunsFilterState } from "./experiment-runs"

type DiffFilter = CompareDiffFilter

function formatRange(range: unknown, unit: string, naLabel: string) {
  if (!Array.isArray(range) || !range.length) return naLabel
  const [min, max] = range as [number | null | undefined, number | null | undefined]
  if (min == null && max == null) return naLabel
  if (min != null && max != null && min !== max) return `${min}–${max} ${unit}`
  return `${min ?? max} ${unit}`
}

const FUEL_STATE_LABELS: Record<Locale, Record<string, string>> = {
  en: {
    liquid: "Liquid",
    solid: "Solid",
    gas: "Gaseous",
    aerosol_pyrolysis: "Smoke / aerosols",
    reference: "Reference",
  },
  ru: {
    liquid: "Жидкое",
    solid: "Твёрдое",
    gas: "Газообразное",
    aerosol_pyrolysis: "Дым / аэрозоли",
    reference: "Эталон",
  },
}

export function CompareView({
  studies,
  compareIds,
  onSetCompareIds,
  onSelectStudy,
  diffFilter: controlledDiffFilter,
  onDiffFilterChange,
  focus: controlledFocus,
  onFocusChange,
  runsFilterState,
}: {
  studies: StudySummary[]
  compareIds: string[]
  onSetCompareIds: (ids: string[]) => void
  onSelectStudy: (id: string) => void
  diffFilter?: DiffFilter
  onDiffFilterChange?: (next: DiffFilter) => void
  focus?: string
  onFocusChange?: (next: string) => void
  runsFilterState?: RunsFilterState
}) {
  const locale = useLocale()
  const [aiResult, setAiResult] = useState<CompareResponse | null>(null)
  const [aiError, setAiError] = useState<string | null>(null)
  const [aiPending, setAiPending] = useState(false)
  const [activeCiteIndex, setActiveCiteIndex] = useState<number | null>(null)
  const [localFocus, setLocalFocus] = useState("")
  const [localDiffFilter, setLocalDiffFilter] = useState<DiffFilter>("all")

  const focus = controlledFocus ?? localFocus
  const setFocus = onFocusChange ?? setLocalFocus
  const diffFilter = controlledDiffFilter ?? localDiffFilter
  const setDiffFilter = onDiffFilterChange ?? setLocalDiffFilter

  const availableIds = new Set(studies.map((study) => study.id))
  const selectedIds = compareIds.filter((id) => availableIds.has(id)).slice(0, 4)
  const effectiveIds = selectedIds.length >= 2
    ? selectedIds
    : [...selectedIds, ...studies.filter((study) => !selectedIds.includes(study.id)).map((study) => study.id)].slice(0, 2)

  const detailQueries = useQueries({
    queries: effectiveIds.map((id) => studyQueries.detail(id, locale)),
  })

  const naLabel = locale === "ru" ? "н/д" : "N/A"
  const racks = getHardwareRacks(locale)

  const diffRows = useMemo(() => {
    const rawRows = [
      {
        label: locale === "ru" ? "Программа и направление" : "Program / Pillar",
        cells: effectiveIds.map((id) => {
          const s = studies.find((item) => item.id === id)
          const localizedTags = s ? s.tags.map((t) => localizePillar(t, locale)).join(", ") : ""
          return {
            display: s ? `${localizeCategory(s.category, locale)} · ${localizedTags}` : naLabel,
            key: s ? `${s.category}|${[...s.tags].sort().join(",")}` : naLabel,
          }
        }),
      },
      {
        label: locale === "ru" ? "Установка" : "Facility / Rack",
        cells: effectiveIds.map((_, idx) => {
          const facility = detailQueries[idx]?.data?.conditions.facility ?? naLabel
          return {
            display: facility,
            key: facility,
          }
        }),
      },
      {
        label: locale === "ru" ? "Фаза и тип топлива" : "Fuel phase & material",
        cells: effectiveIds.map((_, idx) => {
          const m = detailQueries[idx]?.data?.conditions
          const phase = m?.fuel_state ? (FUEL_STATE_LABELS[locale][m.fuel_state] ?? m.fuel_state) : undefined
          return {
            display: `${phase ? `${phase}: ` : ""}${m?.fuel_material ?? naLabel}${m?.sample_size_mm ? ` (${m.sample_size_mm})` : ""}`,
            key: m?.fuel_material ? `${m.fuel_state}|${m.fuel_material}|${m.sample_size_mm ?? ""}` : naLabel,
          }
        }),
      },
      {
        label: locale === "ru" ? "Кислород (O₂)" : "Oxygen (O₂)",
        cells: effectiveIds.map((_, idx) => {
          const cond = detailQueries[idx]?.data?.conditions
          const val = formatRange(cond?.o2_pct, "%", naLabel)
          return { display: val, key: val }
        }),
      },
      {
        label: locale === "ru" ? "Давление" : "Pressure",
        cells: effectiveIds.map((_, idx) => {
          const cond = detailQueries[idx]?.data?.conditions
          const val = formatRange(cond?.pressure_kpa, locale === "ru" ? "кПа" : "kPa", naLabel)
          return { display: val, key: val }
        }),
      },
      {
        label: locale === "ru" ? "Скорость потока" : "Airflow velocity",
        cells: effectiveIds.map((_, idx) => {
          const cond = detailQueries[idx]?.data?.conditions
          const val = formatRange(cond?.flow_cms, locale === "ru" ? "см/с" : "cm/s", naLabel)
          return { display: val, key: val }
        }),
      },
      {
        label: locale === "ru" ? "Методика и оборудование" : "Methodology & instrumentation",
        cells: detailQueries.map((query) => {
          const value = query.data?.methodology ?? naLabel
          return { display: value, key: value }
        }),
      },
      {
        label: locale === "ru" ? "Ключевой вывод" : "Key finding",
        cells: effectiveIds.map((id, idx) => {
          const s = studies.find((item) => item.id === id)
          const val = detailQueries[idx]?.data?.description ?? s?.description ?? "—"
          return { display: val, key: val }
        }),
      },
      {
        label: locale === "ru" ? "Пожарная безопасность" : "Fire safety implication",
        cells: effectiveIds.map((_id, idx) => {
          const imp =
            detailQueries[idx]?.data?.safety_implications[0]?.text ??
            (locale === "ru" ? "см. карточку исследования" : "see study card")
          return { display: imp, key: imp }
        }),
      },
    ]

    return rawRows.map((row) => {
      const keys = row.cells.map((c) => c.key)
      const isSame = keys.length > 1 && keys.every((k) => k !== naLabel && k !== "—" && k === keys[0])
      return { ...row, isSame }
    })
  }, [effectiveIds, studies, detailQueries, locale, naLabel])

  const sameCount = diffRows.filter((r) => r.isSame).length
  const diffCount = diffRows.length - sameCount
  const visibleRows = diffRows.filter((row) => {
    if (diffFilter === "same") return row.isSame
    if (diffFilter === "diff") return !row.isSame
    return true
  })

  function updateSlot(index: number, nextId: string) {
    const next = [...effectiveIds]
    if (next.includes(nextId)) return
    next[index] = nextId
    onSetCompareIds(next)
    setAiResult(null)
  }

  function addSlot() {
    const candidate = studies.find((s) => !effectiveIds.includes(s.id))
    if (candidate) {
      onSetCompareIds([...effectiveIds, candidate.id])
      setAiResult(null)
    }
  }

  function removeSlot(index: number) {
    if (effectiveIds.length <= 2) return
    onSetCompareIds(effectiveIds.filter((_, i) => i !== index))
    setAiResult(null)
  }

  async function runAiCompare() {
    if (effectiveIds.length < 2 || aiPending) return
    setAiPending(true)
    setAiError(null)
    setActiveCiteIndex(null)
    try {
      const res = await api.compareStudies({
        study_ids: effectiveIds,
        focus: focus.trim() || null,
        locale,
      })
      setAiResult(res)
    } catch (err) {
      setAiError(
        err instanceof ApiError
          ? err.message
          : locale === "ru"
            ? "Не удалось выполнить ИИ-сравнение."
            : "Failed to run AI comparison.",
      )
    } finally {
      setAiPending(false)
    }
  }

  return (
    <div className="section-view">
      <div>
        <h1>{locale === "ru" ? "Сравнение исследований и оборудование МКС" : "Study Comparison & ISS Hardware Racks"}</h1>
        <p className="muted">
          {locale === "ru"
            ? "Сопоставьте 2–4 эксперимента по условиям атмосферы, типу топлива, переменным и применимости к пожарной безопасности — с автоподсветкой сходств и различий."
            : "Compare 2 to 4 investigations side by side across atmospheric conditions, fuel phase, variables, and fire-safety applicability — with automatic similarity and difference highlighting."}
        </p>
      </div>

      <section className="panel panel-padding">
        <div className="panel-head-row">
          <h2>
            <GitCompare size={17} />{" "}
            {locale === "ru"
              ? `Матрица сравнения (${effectiveIds.length} исследования)`
              : `Comparison Matrix (${effectiveIds.length} studies)`}
          </h2>
          {effectiveIds.length < 4 && studies.length > effectiveIds.length && (
            <Button type="button" variant="outline" size="sm" onClick={addSlot} disabled={aiPending}>
              {locale === "ru" ? "+ Добавить исследование" : "+ Add study"}
            </Button>
          )}
        </div>

        {selectedIds.length < 2 && (
          <p className="compare-autofill-notice" role="status">
            {selectedIds.length === 0
              ? locale === "ru"
                ? "Вы не выбрали исследования — показана демонстрационная пара из каталога. Выберите любые 2–4 исследования ниже."
                : "No studies selected — showing a representative example pair. Pick any 2–4 studies below."
              : locale === "ru"
                ? "Выбрано 1 исследование — второе добавлено из каталога как пример. Замените его любым исследованием ниже."
                : "1 study selected — a second catalog example is shown alongside it. Pick any study below to customize."}
          </p>
        )}

        <div className="compare-selectors">
          {effectiveIds.map((id, idx) => (
            <div key={`${id}-${idx}`} className="compare-slot">
              <select
                aria-label={locale === "ru" ? `Исследование ${idx + 1}` : `Study ${idx + 1}`}
                value={id}
                disabled={aiPending}
                onChange={(e) => updateSlot(idx, e.target.value)}
              >
                {studies.map((s) => (
                  <option
                    key={s.id}
                    value={s.id}
                    disabled={effectiveIds.includes(s.id) && s.id !== id}
                  >
                    {s.title}
                  </option>
                ))}
              </select>
              {effectiveIds.length > 2 && (
                <button
                  type="button"
                  className="icon-button"
                  aria-label={locale === "ru" ? "Убрать из сравнения" : "Remove from comparison"}
                  onClick={() => removeSlot(idx)}
                  disabled={aiPending}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="compare-diff-toolbar">
          <div className="diff-filter-pills" role="group" aria-label={locale === "ru" ? "Фильтр сходств и различий" : "Similarity and difference filter"}>
            <button
              type="button"
              className={diffFilter === "all" ? "pill-active" : ""}
              onClick={() => setDiffFilter("all")}
            >
              {locale === "ru" ? `Все параметры (${diffRows.length})` : `All parameters (${diffRows.length})`}
            </button>
            <button
              type="button"
              className={diffFilter === "diff" ? "pill-active" : ""}
              onClick={() => setDiffFilter("diff")}
            >
              {locale === "ru" ? `Различия (${diffCount})` : `Differences (${diffCount})`}
            </button>
            <button
              type="button"
              className={diffFilter === "same" ? "pill-active" : ""}
              onClick={() => setDiffFilter("same")}
            >
              {locale === "ru" ? `Сходства (${sameCount})` : `Similarities (${sameCount})`}
            </button>
          </div>
          <div className="diff-legend">
            <span className="diff-status-pill same">{locale === "ru" ? "Совпадает" : "Match"}</span>
            <span className="diff-status-pill diff">{locale === "ru" ? "Различается" : "Differs"}</span>
          </div>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col">{locale === "ru" ? "Параметр" : "Parameter"}</th>
                {effectiveIds.map((id, idx) => {
                  const s = studies.find((item) => item.id === id)
                  return (
                    <th key={id} scope="col">
                      <button type="button" className="compare-study-link" onClick={() => onSelectStudy(id)}>
                        {s?.title ?? id}
                      </button>
                      {detailQueries[idx]?.isPending && (
                        <small className="muted"> {locale === "ru" ? "(загрузка…)" : "(loading…)"}</small>
                      )}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {visibleRows.length ? (
                visibleRows.map((row) => (
                  <tr key={row.label} className={row.isSame ? "compare-row-same" : "compare-row-diff"}>
                    <th scope="row">
                      <div className="compare-param-cell">
                        <span>{row.label}</span>
                        <span className={`diff-status-pill ${row.isSame ? "same" : "diff"}`}>
                          {row.isSame
                            ? locale === "ru" ? "Совпадает" : "Match"
                            : locale === "ru" ? "Различается" : "Differs"}
                        </span>
                      </div>
                    </th>
                    {row.cells.map((cell, idx) => (
                      <td key={`${row.label}-${effectiveIds[idx]}`}>{cell.display}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={effectiveIds.length + 1} className="muted">
                    {locale === "ru"
                      ? "Нет параметров, соответствующих выбранному фильтру Diff."
                      : "No parameters match the selected Diff filter."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="compare-ai-bar">
          <input
            type="text"
            placeholder={
              locale === "ru"
                ? "Фокус сравнения (опционально: например, лунная база 34% O₂ или датчики дыма)…"
                : "Comparison focus (optional: e.g., lunar habitat 34% O₂ or smoke detectors)…"
            }
            value={focus}
            maxLength={300}
            onChange={(e) => setFocus(e.target.value)}
          />
          <Button type="button" onClick={() => void runAiCompare()} disabled={aiPending || effectiveIds.length < 2}>
            <Sparkles size={15} />{" "}
            {aiPending
              ? locale === "ru" ? "Анализ…" : "Analyzing…"
              : locale === "ru" ? "ИИ-анализ сходств и различий" : "AI Synthesis of Similarities & Differences"}
          </Button>
        </div>

        {aiError && <p className="query-failure">{aiError}</p>}

        {aiResult && (() => {
          const toggleCite = (idx: number) =>
            setActiveCiteIndex((prev) => (prev === idx ? null : idx))
          const activeCitation =
            activeCiteIndex !== null ? aiResult.citations[activeCiteIndex] : undefined
          return (
            <div className="compare-ai-result">
              <h3>{aiResult.summary}</h3>
              <div className="compare-ai-cols">
                <div>
                  <h4>{locale === "ru" ? "Сходства" : "Similarities"}</h4>
                  <ul>
                    {aiResult.similarities.length ? (
                      aiResult.similarities.map((item, i) => (
                        <li key={i}>
                          <RichCitedText
                            as="span"
                            className="compare-cite-text"
                            text={item.text}
                            citations={aiResult.citations}
                            activeIndex={activeCiteIndex}
                            onClickCitation={toggleCite}
                            locale={locale}
                          />
                        </li>
                      ))
                    ) : (
                      <li className="muted">{locale === "ru" ? "Не выявлено" : "None identified"}</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h4>{locale === "ru" ? "Различия" : "Differences"}</h4>
                  <ul>
                    {aiResult.differences.length ? (
                      aiResult.differences.map((item, i) => (
                        <li key={i}>
                          <RichCitedText
                            as="span"
                            className="compare-cite-text"
                            text={item.text}
                            citations={aiResult.citations}
                            activeIndex={activeCiteIndex}
                            onClickCitation={toggleCite}
                            locale={locale}
                          />
                        </li>
                      ))
                    ) : (
                      <li className="muted">{locale === "ru" ? "Не выявлено" : "None identified"}</li>
                    )}
                  </ul>
                </div>
              </div>
              {activeCitation && activeCiteIndex !== null && (
                <CitationInspector
                  citation={activeCitation}
                  index={activeCiteIndex}
                  onClose={() => setActiveCiteIndex(null)}
                  locale={locale}
                />
              )}
              {aiResult.limitations.length > 0 && (
                <p className="muted">
                  <strong>{locale === "ru" ? "Ограничения сопоставимости:" : "Comparability limitations:"}</strong>{" "}
                  {aiResult.limitations.join(" ")}
                </p>
              )}
              {aiResult.citations.length > 0 && (
                <>
                  <CitationList
                    citations={aiResult.citations}
                    activeIndex={activeCiteIndex}
                    onToggleIndex={toggleCite}
                    locale={locale}
                  />
                  <p className="muted" style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                    {locale === "ru"
                      ? "Нажмите на маркер [n], чтобы сразу увидеть фрагмент отчёта, страницу/таблицу и ссылку NASA."
                      : "Click any [n] marker to inspect the report excerpt, page/table locator, and NASA link."}
                  </p>
                </>
              )}
            </div>
          )
        })()}
      </section>

      <section className="panel panel-padding">
        <h2>
          <Cpu size={17} />{" "}
          {locale === "ru"
            ? "Группировка по оборудованию и стойкам (CIR, MDCA, MSG, Cygnus)"
            : "ISS Hardware Racks & Orbital Platforms (CIR, MDCA, MSG, Cygnus)"}
        </h2>
        <div className="hardware-grid">
          {racks.map((rack) => (
            <article key={rack.id} className="hardware-card">
              <span className="muted">{rack.location}</span>
              <h3>{rack.title}</h3>
              <p>{rack.description}</p>
              <div className="hardware-links">
                {rack.studyIds.map((sid) => {
                  const found = studies.find((s) => s.id === sid)
                  if (!found) return null
                  return (
                    <button key={sid} type="button" className="chip-btn" onClick={() => onSelectStudy(sid)}>
                      {found.title.split(" (")[0]}
                    </button>
                  )
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <ExperimentRuns availableStudyIds={studies.map((study) => study.id)} filterState={runsFilterState} />

      <section className="panel panel-padding partial-gravity-note">
        <h2>
          <AlertTriangle size={17} />{" "}
          {locale === "ru"
            ? "Пробел данных по частичной гравитации (Луна 1/6g, Марс 3/8g)"
            : "Partial-Gravity Evidence Gap (Moon 1/6g, Mars 3/8g)"}
        </h2>
        <p>
          {locale === "ru"
            ? "Для лунного или марсианского сценария проверяйте применимость результатов отдельно. Данные 0g и 1g полезны для сравнения, но сами по себе не гарантируют границы для частичной гравитации. E-FIELD изучает ионный поток, создаваемый электрическим полем."
            : "For lunar or Martian scenarios, verify applicability carefully. While 0g and 1g data bound buoyancy-free and normal-buoyancy regimes, partial gravity (0.16g–0.38g) can produce mixed buoyant + forced flows where materials extinguish in 0g and 1g yet sustain flame spread in partial gravity."}
        </p>
      </section>
    </div>
  )
}
