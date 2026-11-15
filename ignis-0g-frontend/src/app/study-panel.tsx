import { useState } from "react"
import { useQueries } from "@tanstack/react-query"
import { Tabs } from "radix-ui"
import { studyQueries } from "@/api/queries"
import {
  ArrowUpRight,
  Bookmark,
  ChartNoAxesCombined,
  CheckCircle2,
  ChevronRight,
  Database,
  FileText,
  Flame,
  FlaskConical,
  GitCompare,
  Layers3,
  Network,
  Share,
  ShieldCheck,
} from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { isStudySaved, localizeCategory, localizeFlowRegime, localizePillar, toggleSavedStudy } from "@/domain/knowledge"
import flame from "@/assets/flex-flame.webp"
import type { Finding, StudyConditions, StudyDetail, StudySummary } from "@/domain/types"
import { useLocale, type Locale } from "@/i18n"
import { QueryFailure, QueryLoading } from "./query-feedback"
import { SourceList } from "./research-sources"
import { nasaContentUrl } from "@/lib/nasa-content"
import { ModelingRuns, StudyMeasurements, StudyNexusGraph, StudySafety, StudyVideo, studyRunsTarget } from "./study-evidence"

const views = [
  { id: "overview", nameEn: "Overview", nameRu: "Обзор", icon: Layers3 },
  { id: "measurements", nameEn: "Datasets", nameRu: "Данные", icon: Database },
  { id: "visualization", nameEn: "Charts & Media", nameRu: "Графики", icon: ChartNoAxesCombined },
  { id: "findings", nameEn: "Findings", nameRu: "Выводы", icon: Network },
  { id: "safety", nameEn: "Fire Safety", nameRu: "Безопасность", icon: ShieldCheck },
] as const

export type View = (typeof views)[number]["id"]

export function isStudyView(value: string): value is View {
  return views.some(({ id }) => id === value)
}

function formatRange(range: unknown, unit: string): string | undefined {
  if (!Array.isArray(range) || range.length === 0) return undefined
  const [min, max] = range as [number | null | undefined, number | null | undefined]
  if (min == null && max == null) return undefined
  if (min != null && max != null && min !== max) return `${min}–${max} ${unit}`
  return `${min ?? max} ${unit}`
}

function fuelStateLabel(state: string | undefined, locale: Locale) {
  switch (state) {
    case "liquid":
      return locale === "ru" ? "Жидкие капли" : "Liquid droplets"
    case "solid":
      return locale === "ru" ? "Твёрдые материалы" : "Solid materials"
    case "gas":
      return locale === "ru" ? "Газовое пламя" : "Gaseous flame"
    case "aerosol_pyrolysis":
      return locale === "ru" ? "Дым и аэрозоли" : "Smoke & aerosols"
    case "reference":
      return locale === "ru" ? "Нормативный профиль" : "Reference profile"
    default:
      return locale === "ru" ? "Микрогравитация" : "Microgravity"
  }
}

const relationLabels: Record<Locale, Record<string, string>> = {
  en: {
    supports: "supports",
    contradicts: "refines / contrasts",
    complements: "complements",
    similar: "similar to",
  },
  ru: {
    supports: "подтверждает",
    contradicts: "опровергает / уточняет",
    complements: "дополняет",
    similar: "схоже с",
  },
}

function FindingsList({ findings, locale }: { findings: Finding[]; locale: Locale }) {
  if (!findings.length) {
    return (
      <p className="muted">
        {locale === "ru"
          ? "Для этого эксперимента пока нет зафиксированных выводов."
          : "No verified findings have been recorded for this investigation yet."}
      </p>
    )
  }
  return (
    <ul className="findings">
      {findings.map((finding) => (
        <li key={finding.id}>
          <CheckCircle2 size={16} />
          <div>
            <strong>{finding.claim}</strong>
            <p>{finding.evidence}{finding.locator ? ` (${finding.locator})` : ""}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

function StudyActions({
  study,
  isCompared,
  onToggleCompare,
  locale,
  currentView,
}: {
  study: StudySummary
  isCompared: boolean
  onToggleCompare: () => void
  locale: Locale
  currentView?: View
}) {
  const [saved, setSaved] = useState(() => isStudySaved(study.id))
  const [notice, setNotice] = useState("")

  function toggleSaved() {
    const next = toggleSavedStudy(study.id)
    setSaved(next)
    setNotice(
      next
        ? locale === "ru" ? "Сохранено в закладках" : "Saved to bookmarks"
        : locale === "ru" ? "Удалено из закладок" : "Removed from bookmarks",
    )
  }

  async function share() {
    const url = new URL("/explorer", window.location.origin)
    url.searchParams.set("study", study.id)
    if (currentView && currentView !== "overview") url.searchParams.set("tab", currentView)
    try {
      await navigator.clipboard.writeText(url.href)
      setNotice(locale === "ru" ? "Ссылка скопирована" : "Link copied")
    } catch {
      setNotice(locale === "ru" ? "Не удалось скопировать ссылку" : "Could not copy link")
    }
  }

  return (
    <div className="study-actions">
      <Button
        type="button"
        variant={isCompared ? "default" : "outline"}
        size="sm"
        onClick={onToggleCompare}
        title={locale === "ru" ? "Добавить или убрать из матрицы сравнения" : "Add or remove from comparison matrix"}
      >
        <GitCompare size={15} />{" "}
        {isCompared
          ? locale === "ru" ? "В сравнении" : "Comparing"
          : locale === "ru" ? "Сравнить" : "Compare"}
      </Button>
      <button
        type="button"
        className="icon-button"
        aria-label={locale === "ru" ? "Сохранить исследование" : "Bookmark study"}
        aria-pressed={saved}
        title={locale === "ru" ? "Закладка" : "Bookmark"}
        onClick={toggleSaved}
      >
        <Bookmark size={18} />
      </button>
      <button
        type="button"
        className="icon-button"
        aria-label={locale === "ru" ? "Скопировать ссылку на исследование" : "Copy link to study"}
        title={locale === "ru" ? "Поделиться" : "Share"}
        onClick={() => void share()}
      >
        <Share size={18} />
      </button>
      <span className="study-action-notice" role="status">
        {notice}
      </span>
    </div>
  )
}

function ExperimentSchematic({
  study,
  conditions,
  locale,
}: {
  study: StudySummary
  conditions: StudyConditions
  locale: Locale
}) {
  const isFlex1 = study.id === "flex-1" || study.id === "flex"
  const naLabel = locale === "ru" ? "н/д" : "N/A"
  const o2Text = formatRange(conditions.o2_pct, "% O₂") ?? naLabel
  const pText = formatRange(conditions.pressure_kpa, locale === "ru" ? "кПа" : "kPa") ?? naLabel
  const flowText = formatRange(conditions.flow_cms, locale === "ru" ? "см/с" : "cm/s") ?? naLabel

  if (isFlex1) {
    return (
      <figure className="experiment-figure">
        <img
          src={flame}
          alt={
            locale === "ru"
              ? "Иллюстрация сферического пламени капли в микрогравитации"
              : "Illustration of a spherical droplet flame in microgravity"
          }
        />
        <figcaption>
          {locale === "ru"
            ? "FLEX-1 · Сферическое диффузионное пламя капли (CIR / MDCA)"
            : "FLEX-1 · Spherical droplet diffusion flame (CIR / MDCA)"}
        </figcaption>
      </figure>
    )
  }

  return (
    <figure className="experiment-figure schematic-card">
      <div className="schematic-visual">
        <div className="schematic-badge-row">
          <span className="schematic-pill">{conditions.facility ?? study.category}</span>
          <span className="schematic-pill">{fuelStateLabel(conditions.fuel_state, locale)}</span>
        </div>
        <div className="schematic-core">
          <Flame size={34} />
          <strong>{study.category}</strong>
          <span>{conditions.fuel_material ?? study.title}</span>
        </div>
        <dl className="schematic-metrics">
          <div>
            <dt>{locale === "ru" ? "Кислород" : "Oxygen"}</dt>
            <dd>{o2Text}</dd>
          </div>
          <div>
            <dt>{locale === "ru" ? "Давление" : "Pressure"}</dt>
            <dd>{pText}</dd>
          </div>
          <div>
            <dt>{locale === "ru" ? "Поток" : "Airflow"}</dt>
            <dd>{flowText}</dd>
          </div>
        </dl>
      </div>
      <figcaption>
        {locale === "ru" ? "Схема условий эксперимента" : "Experimental Condition Schematic"} ·{" "}
        {conditions.facility ?? "NASA ISS / Ground"}
      </figcaption>
    </figure>
  )
}

export function StudyPanel({
  studySummary,
  studies = [],
  isCompared,
  onToggleCompare,
  onSelectStudy,
  onBackToCatalog,
  onView,
  currentView,
}: {
  studySummary: StudySummary
  studies?: StudySummary[]
  isCompared: boolean
  onToggleCompare: () => void
  onSelectStudy: (id: string) => void
  onBackToCatalog: () => void
  onView: (view: View) => void
  currentView?: View
}) {
  const locale = useLocale()
  const [selectedDatasetId, setSelectedDatasetId] = useState("")
  const [selectedSeriesId, setSelectedSeriesId] = useState("")
  const [prevStudyId, setPrevStudyId] = useState(studySummary.id)
  if (studySummary.id !== prevStudyId) {
    setPrevStudyId(studySummary.id)
    setSelectedDatasetId("")
    setSelectedSeriesId("")
  }
  const [detailQuery, relationsQuery] = useQueries({
    queries: [studyQueries.detail(studySummary.id, locale), studyQueries.relations(studySummary.id, locale)],
  })

  const detail: StudyDetail | undefined = detailQuery.data
  const conditions: StudyConditions = detail?.conditions ?? {}

  const o2Text = formatRange(conditions.o2_pct, "% O₂")
  const pText = formatRange(conditions.pressure_kpa, locale === "ru" ? "кПа" : "kPa")
  const flowText = formatRange(conditions.flow_cms, locale === "ru" ? "см/с" : "cm/s")
  const diluents = Array.isArray(conditions.diluents)
    ? conditions.diluents.join(", ")
    : undefined

  const localizedTags = studySummary.tags.map((t) => localizePillar(t, locale))
  const flowRegime =
    typeof conditions.flow_regime === "string"
      ? localizeFlowRegime(conditions.flow_regime, locale)
      : undefined
  const loiText =
    conditions.loi_pct != null
      ? locale === "ru" && String(conditions.loi_pct) === "< 1g"
        ? "ниже, чем при 1g"
        : String(conditions.loi_pct)
      : undefined

  const parameters: [string, string | undefined][] = [
    [locale === "ru" ? "Программа" : "Program", localizeCategory(studySummary.category, locale)],
    [locale === "ru" ? "Направление" : "Safety Pillar", localizedTags.join(", ") || undefined],
    [locale === "ru" ? "Установка" : "Facility / Rack", conditions.facility],
    [locale === "ru" ? "Топливо / образец" : "Fuel / Sample", conditions.fuel_material],
    [locale === "ru" ? "Размер образца" : "Sample Dimensions", conditions.sample_size_mm],
    [locale === "ru" ? "Режим потока" : "Flow Regime", flowRegime],
    [locale === "ru" ? "Концентрация O₂" : "O₂ Concentration", o2Text],
    [locale === "ru" ? "Давление" : "Pressure", pText],
    [locale === "ru" ? "Скорость потока" : "Airflow Velocity", flowText],
    [locale === "ru" ? "Разбавители" : "Diluents", diluents],
    [locale === "ru" ? "O₂ в потоке горелки (макс.)" : "Burner O₂ (max)", conditions.burner_o2_max_pct == null ? undefined : `${conditions.burner_o2_max_pct}%`],
    [locale === "ru" ? "Предельный O₂ (LOI)" : "LOI", loiText],
    [locale === "ru" ? "Научный руководитель" : "Principal Investigator (PI)", conditions.principal_investigators],
  ]

  return (
    <>
      <header className="study-heading">
        <div className="breadcrumb">
          <button type="button" className="breadcrumb-link" onClick={onBackToCatalog}>
            {locale === "ru" ? "Все исследования" : "All Studies"}
          </button>
          <ChevronRight size={13} />
          <span>{localizeCategory(studySummary.category, locale)}</span>
          <ChevronRight size={13} />
          <span>{studySummary.title.split(" (")[0]}</span>
        </div>

        <div className="study-title-row">
          <h1>{studySummary.title}</h1>
          <StudyActions
            key={studySummary.id}
            study={studySummary}
            isCompared={isCompared}
            onToggleCompare={onToggleCompare}
            locale={locale}
            currentView={currentView}
          />
        </div>
        <p>{detail?.description ?? studySummary.description}</p>
        <ul className="study-topics" aria-label={locale === "ru" ? "Темы и направления" : "Topics and safety pillars"}>
          <li className="topic-program">{localizeCategory(studySummary.category, locale)}</li>
          {studySummary.tags.map((tag) => (
            <li key={tag}>{localizePillar(tag, locale)}</li>
          ))}
        </ul>

        <Tabs.List aria-label={locale === "ru" ? "Разделы исследования" : "Study sections"} className="study-tabs study-tabs-inline">
          {views.map(({ id, nameEn, nameRu, icon: Icon }) => {
            let count = ""
            if (id === "measurements" && detail?.datasets.length) count = ` (${detail.datasets.length})`
            if (id === "findings" && detail?.findings.length) count = ` (${detail.findings.length})`
            return (
              <Tabs.Trigger key={id} value={id}>
                <Icon size={16} />
                {locale === "ru" ? nameRu : nameEn}
                {count}
              </Tabs.Trigger>
            )
          })}
        </Tabs.List>
      </header>

      <Tabs.Content value="overview" className="study-content">
        <div className="overview-grid">
          <ExperimentSchematic study={studySummary} conditions={conditions} locale={locale} />
          <ModelingRuns runs={conditions.modeling_runs ?? []} />
          {(() => {
            const runsTarget = studyRunsTarget(studySummary.id, locale)
            return runsTarget ? (
              <a href={runsTarget.href}>
                {locale === "ru" ? "Открыть сравнение отдельных прогонов" : "Open individual test run comparison"}
              </a>
            ) : null
          })()}
          <section className="study-block">
            <h2>
              <FlaskConical size={17} /> {locale === "ru" ? "Условия и параметры" : "Experimental Conditions & Parameters"}
            </h2>
            <dl className="parameters">
              {parameters
                .filter(([, value]) => Boolean(value))
                .map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
            </dl>
          </section>
        </div>

        {detail?.methodology && (
          <section className="study-block">
            <h2>{locale === "ru" ? "Методология и аппаратура" : "Methodology & Hardware"}</h2>
            <p className="study-prose">{detail.methodology}</p>
          </section>
        )}

        <section className="overview-findings">
          <div className="panel-head-row">
            <h2>{locale === "ru" ? "Выводы исследования" : "Key Findings"}</h2>
            <button type="button" className="reset-filter" onClick={() => onView("measurements")}>
              {locale === "ru" ? "Перейти к данным" : "Go to datasets"} <ChevronRight size={14} />
            </button>
          </div>
          {detailQuery.isPending && <QueryLoading label={locale === "ru" ? "Загрузка выводов…" : "Loading findings…"} />}
          {detailQuery.isError && (
            <QueryFailure
              label={locale === "ru" ? "Не удалось загрузить детали исследования." : "Failed to load study details."}
              fetching={detailQuery.isFetching}
              retry={() => void detailQuery.refetch()}
            />
          )}
          {detail && <FindingsList findings={detail.findings} locale={locale} />}
        </section>

        <section className="study-block">
          <h2>
            <FileText size={17} /> {locale === "ru" ? "Источники NASA" : "Primary NASA Sources"}
          </h2>
          {detailQuery.isPending && <QueryLoading label={locale === "ru" ? "Загрузка источников…" : "Loading sources…"} />}
          {detail && <SourceList sources={detail.sources} />}
        </section>
      </Tabs.Content>

      <Tabs.Content value="measurements" className="study-content">
        <StudyMeasurements
          studyId={studySummary.id}
          selectedDatasetId={selectedDatasetId}
          onSelectDatasetId={setSelectedDatasetId}
          selectedSeriesId={selectedSeriesId}
          onSelectSeriesId={setSelectedSeriesId}
        />
      </Tabs.Content>

      <Tabs.Content value="visualization" className="study-content">
        <StudyMeasurements
          studyId={studySummary.id}
          chart
          selectedDatasetId={selectedDatasetId}
          onSelectDatasetId={setSelectedDatasetId}
          selectedSeriesId={selectedSeriesId}
          onSelectSeriesId={setSelectedSeriesId}
        />
        <StudyVideo studyId={studySummary.id} media={detail?.media ?? []} />
        <StudyNexusGraph studyId={studySummary.id} onSelectStudy={onSelectStudy} />
      </Tabs.Content>

      <Tabs.Content value="findings" className="study-content">
        <section className="study-block">
          <h2>
            <CheckCircle2 size={17} />{" "}
            {locale === "ru" ? "Основные выводы и доказательства" : "Verified Claims & Evidence"}
          </h2>
          {detailQuery.isPending && <QueryLoading label={locale === "ru" ? "Загрузка выводов…" : "Loading findings…"} />}
          {detail && <FindingsList findings={detail.findings} locale={locale} />}
        </section>

        <section className="study-block">
          <h2>
            <Network size={17} />{" "}
            {locale === "ru" ? "Проверенные связи между исследованиями" : "Verified Cross-Study Relations"}
          </h2>
          {relationsQuery.isPending && <QueryLoading label={locale === "ru" ? "Загрузка связей…" : "Loading relations…"} />}
          {relationsQuery.isError && (
            <QueryFailure
              label={locale === "ru" ? "Не удалось загрузить связи." : "Failed to load relations."}
              fetching={relationsQuery.isFetching}
              retry={() => void relationsQuery.refetch()}
            />
          )}
          {relationsQuery.data?.length === 0 && (
            <p className="muted">
              {locale === "ru"
                ? "Для этого эксперимента пока нет проверенных связей с другими исследованиями."
                : "No verified cross-study relations are available for this investigation yet."}
            </p>
          )}
          {relationsQuery.data && relationsQuery.data.length > 0 && (
            <ul className="relation-cards">
              {relationsQuery.data.map((rel) => {
                const otherId = rel.from_study_id === studySummary.id ? rel.to_study_id : rel.from_study_id
                const otherTitle = studies.find((s) => s.id === otherId)?.title.split(" (")[0] ?? otherId
                return (
                  <li key={rel.id} className="relation-card">
                    <div className="relation-card-head">
                      <span className="relation-badge">{relationLabels[locale][rel.relation_type] ?? rel.relation_type}</span>
                      <button type="button" className="chip-btn" onClick={() => onSelectStudy(otherId)}>
                        {otherTitle} <ChevronRight size={13} />
                      </button>
                    </div>
                    <p>{rel.explanation}</p>
                    <small className="muted">
                      {locale === "ru" ? "Цитата:" : "Excerpt:"} “{rel.evidence.excerpt}”{" "}
                      <a href={nasaContentUrl(rel.source_url)} target="_blank" rel="noreferrer">
                        {locale === "ru" ? "Источник" : "Source"} <ArrowUpRight size={12} />
                      </a>
                    </small>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </Tabs.Content>

      <Tabs.Content value="safety" className="study-content">
        <StudySafety
          implications={detail?.safety_implications ?? []}
          studyId={studySummary.id}
          relations={relationsQuery.data ?? []}
          studies={studies}
          onSelectStudy={onSelectStudy}
        />
      </Tabs.Content>
    </>
  )
}
