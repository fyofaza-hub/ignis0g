import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { Tabs } from "radix-ui"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Menu, Search, X } from "@/components/ui/icons"
import { studyQueries } from "@/api/queries"
import { SCENARIO_PRESETS, type MissionScenarioId } from "@/domain/knowledge"
import type { Scenario, StudySummary } from "@/domain/types"
import {
  buildExplorerSearchParams,
  parseExplorerUrl,
  type CompareDiffFilter,
  type EnvAxisMode,
} from "@/domain/url-state"
import { LanguageSwitch, useLocale } from "@/i18n"
import { AssistantChat, useStudyChat } from "./assistant-chat"
import { CompareView } from "./compare-view"
import { EnvironmentsView } from "./environments-view"
import { QueryFailure, QueryLoading } from "./query-feedback"
import { RankingDashboard } from "./ranking-dashboard"
import { Sidebar, type Section } from "./sidebar"
import { StudiesDirectory } from "./studies-directory"
import { isStudyView, StudyPanel, type View } from "./study-panel"
import { WorkspacePane } from "./workspace-pane"
import "./workspace.css"

const mobileCatalog = window.matchMedia("(max-width: 650px)")
const inspectorDrawer = window.matchMedia("(max-width: 1100px)")

function subscribeToLayout(callback: () => void) {
  mobileCatalog.addEventListener("change", callback)
  inspectorDrawer.addEventListener("change", callback)
  return () => {
    mobileCatalog.removeEventListener("change", callback)
    inspectorDrawer.removeEventListener("change", callback)
  }
}

function QuickSearchDialog({
  dialog,
  studies,
  onSelectStudy,
}: {
  dialog: { current: HTMLDialogElement | null }
  studies: StudySummary[]
  onSelectStudy: (id: string) => void
}) {
  const locale = useLocale()
  const ru = locale === "ru"
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()
  const matches = studies.filter((s) =>
    `${s.id} ${s.title} ${s.description} ${s.category} ${s.tags.join(" ")}`.toLowerCase().includes(q),
  )

  return (
    <dialog
      ref={dialog}
      className="quick-search-dialog"
      aria-labelledby="quick-search-title"
      onClose={() => setQuery("")}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
    >
      <div>
        <div className="quick-search-head">
          <h2 id="quick-search-title">{ru ? "Быстрый поиск по NASA PSI" : "Quick Search Across NASA PSI"}</h2>
          <button
            type="button"
            className="icon-button"
            aria-label={ru ? "Закрыть поиск" : "Close search"}
            onClick={() => dialog.current?.close()}
          >
            <X size={18} />
          </button>
        </div>
        <label className="quick-search-input">
          <Search size={18} />
          <input
            autoFocus
            type="search"
            placeholder={
              ru
                ? "Название, программа (FLEX, BASS, ACME, SAME, SoFIE) или тема…"
                : "Study name, program (FLEX, BASS, ACME, SAME, SoFIE) or topic…"
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault()
                dialog.current?.close()
              }
            }}
          />
        </label>
        <ul>
          {matches.slice(0, 12).map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => {
                  onSelectStudy(s.id)
                  dialog.current?.close()
                }}
              >
                <strong>{s.category}</strong>
                <span>{s.title}</span>
                <ArrowRight size={15} />
              </button>
            </li>
          ))}
        </ul>
        {!matches.length && <p className="muted">{ru ? "Совпадений не найдено." : "No matching studies found."}</p>}
      </div>
    </dialog>
  )
}

export function App() {
  const locale = useLocale()
  const ru = locale === "ru"
  const catalogIsDrawer = useSyncExternalStore(subscribeToLayout, () => mobileCatalog.matches)
  const inspectorIsDrawer = useSyncExternalStore(subscribeToLayout, () => inspectorDrawer.matches)
  const searchDialog = useRef<HTMLDialogElement>(null)

  const query = useQuery(studyQueries.list({ limit: 100, offset: 0 }, locale))
  const studies = query.data?.items ?? []

  const initialUrlRef = useRef<ReturnType<typeof parseExplorerUrl> | null>(null)
  if (!initialUrlRef.current) {
    initialUrlRef.current = parseExplorerUrl(window.location.search)
  }
  const init = initialUrlRef.current
  const explicitLangRef = useRef(init.locale !== undefined)

  const [selectedId, setSelectedId] = useState<string | undefined>(() => init.studyId ?? undefined)
  const [section, setSection] = useState<Section>(() => init.section)
  const [studyMode, setStudyMode] = useState<"directory" | "detail">(() => init.studyMode)
  const [view, setView] = useState<View>(() => init.tab)
  const [scenario, setScenario] = useState<MissionScenarioId | null>(() => init.preset)
  const [conditions, setConditions] = useState<Scenario>(() => init.conditions)

  function applyScenario(id: MissionScenarioId) {
    setScenario(id)
    setConditions(SCENARIO_PRESETS[id])
  }
  const [compareIds, setCompareIds] = useState<string[]>(() => init.compareIds)
  const [dirQuery, setDirQuery] = useState<string>(() => init.dirQuery)
  const [dirPillar, setDirPillar] = useState<string>(() => init.dirPillar)
  const [dirSavedOnly, setDirSavedOnly] = useState<boolean>(() => init.dirSavedOnly)
  const [envAxis, setEnvAxis] = useState<EnvAxisMode>(() => init.envAxis)
  const [envAllRuns, setEnvAllRuns] = useState<boolean>(() => init.envAllRuns)
  const [compareDiff, setCompareDiff] = useState<CompareDiffFilter>(() => init.compareDiff)
  const [compareFocus, setCompareFocus] = useState<string>(() => init.compareFocus)
  const [runsCampaign, setRunsCampaign] = useState<string>(() => init.runsCampaign)
  const [runsQuery, setRunsQuery] = useState<string>(() => init.runsQuery)
  const [runsSelected, setRunsSelected] = useState<string[]>(() => init.runsSelected)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [inspectorOpen, setInspectorOpen] = useState(false)
  const [inspectorExpanded, setInspectorExpanded] = useState(false)
  const [compareNotice, setCompareNotice] = useState<string | null>(null)
  const previousSectionRef = useRef<Section>("Дашборд и рейтинг")

  useEffect(() => {
    if (locale === "ru") explicitLangRef.current = true
  }, [locale])

  useEffect(() => {
    if (section !== "ИИ-ассистент") previousSectionRef.current = section
  }, [section])

  useEffect(() => {
    if (!compareNotice) return
    const timer = window.setTimeout(() => setCompareNotice(null), 4500)
    return () => window.clearTimeout(timer)
  }, [compareNotice])

  const assistantPage = section === "ИИ-ассистент"
  const study = studies.find(({ id }) => id === selectedId) ?? studies[0]
  const effectiveStudyId = study?.id ?? selectedId ?? null
  const chat = useStudyChat(
    studyMode === "detail" && section === "Исследования" ? study : undefined,
    section === "Исследования" ? undefined : conditions,
  )

  useEffect(() => {
    if (section === "Сравнение и установки" && window.location.hash === "#experiment-runs") {
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [section, studyMode, selectedId, view])

  useEffect(() => {
    const params = buildExplorerSearchParams({
      section,
      studyMode,
      studyId: effectiveStudyId,
      tab: view,
      preset: scenario,
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
      locale: explicitLangRef.current || locale === "ru" ? locale : undefined,
    })
    const qs = params.toString()
    const nextUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    const hash = section === "Сравнение и установки" && window.location.hash === "#experiment-runs" ? window.location.hash : ""
    window.history.replaceState(null, "", nextUrl + hash)
  }, [
    section,
    studyMode,
    effectiveStudyId,
    view,
    scenario,
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
  ])

  useEffect(() => {
    document.title = locale === "ru" ? "IGNIS 0G — каталог исследований" : "IGNIS 0G — Explorer"
  }, [locale])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        if (!searchDialog.current?.open) searchDialog.current?.showModal()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  function selectStudy(id: string) {
    setSelectedId(id)
    setSection("Исследования")
    setStudyMode("detail")
    setView("overview")
    setSidebarOpen(false)
    setInspectorOpen(false)
  }

  function openStudiesDirectory() {
    setSection("Исследования")
    setStudyMode("directory")
    setSidebarOpen(false)
    setInspectorOpen(false)
  }

  function toggleCompare(id: string) {
    if (compareIds.includes(id)) {
      setCompareIds((prev) => prev.filter((item) => item !== id))
      return
    }
    if (compareIds.length >= 4) {
      const removedId = compareIds[0]
      const removedTitle = studies.find((s) => s.id === removedId)?.title.split(" (")[0] ?? removedId
      const addedTitle = studies.find((s) => s.id === id)?.title.split(" (")[0] ?? id
      setCompareIds((prev) => (prev.length >= 4 ? [...prev.slice(1), id] : [...prev, id]))
      setCompareNotice(
        ru
          ? `Максимум 4 исследования в сравнении: «${removedTitle}» заменено на «${addedTitle}»`
          : `Limit 4 studies in comparison: replaced “${removedTitle}” with “${addedTitle}”`,
      )
      return
    }
    setCompareIds((prev) => [...prev, id])
  }

  return (
    <Tabs.Root
      asChild
      value={view}
      onValueChange={(value) => {
        if (isStudyView(value)) setView(value)
      }}
    >
      <div className="workspace workspace-shell">
        <a className="workspace-skip" href="#research-main">
          {ru ? "К содержимому" : "Skip to content"}
        </a>

        {(catalogIsDrawer || inspectorIsDrawer) && (
          <header className="mobile-bar">
            {catalogIsDrawer && (
              <button
                type="button"
                className="workspace-header-action"
                aria-controls="catalog-dialog"
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu size={18} /> {ru ? "Меню" : "Menu"}
              </button>
            )}
            <a className="workspace-title" href="/">
              <img src="/ignis-logo.png" alt="" className="brand-logo-img" />
              <span className="brand-wordmark">
                <span className="brand-ignis">IGNIS</span>{" "}
                <span className="brand-zero-g">0G</span>
              </span>
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <LanguageSwitch />
              {!assistantPage && inspectorIsDrawer && (
                <button
                  type="button"
                  className="workspace-header-action assistant-toggle"
                  aria-controls="inspector-dialog"
                  aria-expanded={inspectorOpen}
                  onClick={() => setInspectorOpen(!inspectorOpen)}
                >
                  <Bot size={18} /> {ru ? "ИИ" : "AI"}
                </button>
              )}
            </div>
          </header>
        )}

        <QuickSearchDialog dialog={searchDialog} studies={studies} onSelectStudy={selectStudy} />

        <div className="workspace-grid" data-inspector={!assistantPage && inspectorExpanded}>
          <WorkspacePane
            id="catalog-dialog"
            label={ru ? "Навигация" : "Navigation"}
            className="sidebar-wrap"
            breakpoint={650}
            expanded
            drawer={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          >
            <Sidebar
              studiesCount={studies.length}
              section={section}
              compareCount={compareIds.length}
              onSection={(next) => {
                if (next === "Сравнение и установки" && window.location.hash === "#experiment-runs") {
                  window.history.replaceState(null, "", window.location.pathname + window.location.search)
                }
                setSection(next)
                if (next === "Исследования") setStudyMode("directory")
                setSidebarOpen(false)
                setInspectorOpen(false)
              }}
              onOpenSearch={() => searchDialog.current?.showModal()}
            />
          </WorkspacePane>

          <main id="research-main" className="main-panel" tabIndex={-1}>
            {compareNotice && (
              <div className="compare-toast" role="status" aria-live="polite">
                <span>{compareNotice}</span>
                <button
                  type="button"
                  className="icon-button"
                  aria-label={ru ? "Закрыть уведомление" : "Dismiss notification"}
                  onClick={() => setCompareNotice(null)}
                >
                  <X size={15} />
                </button>
              </div>
            )}

            {!assistantPage && !inspectorIsDrawer && !inspectorExpanded && (
              <button
                type="button"
                className="floating-ai-reopen"
                onClick={() => setInspectorExpanded(true)}
                title={ru ? "Развернуть панель ИИ-ассистента" : "Expand AI Research Assistant"}
              >
                <Bot size={17} />
                <span>{ru ? "ИИ-ассистент по исследованиям" : "AI Research Assistant"}</span>
              </button>
            )}

            {query.isPending && (
              <div className="empty-main">
                <QueryLoading label={ru ? "Загрузка каталога NASA PSI…" : "Loading NASA PSI catalog…"} />
              </div>
            )}

            {query.isError && (
              <div className="empty-main">
                <QueryFailure
                  label={ru ? "Не удалось загрузить каталог исследований." : "Failed to load the research catalog."}
                  fetching={query.isFetching}
                  retry={() => void query.refetch()}
                />
              </div>
            )}

            {!query.isPending && !query.isError && (
              <>
                {section === "Дашборд и рейтинг" && (
                  <RankingDashboard
                    conditions={conditions}
                    scenario={scenario}
                    onScenarioChange={applyScenario}
                    compareIds={compareIds}
                    onToggleCompare={toggleCompare}
                    onSelectStudy={selectStudy}
                    onOpenCompare={() => setSection("Сравнение и установки")}
                    onOpenEnvironments={() => setSection("Среды обитания")}
                    onOpenAllStudies={openStudiesDirectory}
                  />
                )}

                {section === "Исследования" && studyMode === "directory" && (
                  <StudiesDirectory
                    studies={studies}
                    compareIds={compareIds}
                    onToggleCompare={toggleCompare}
                    onSelectStudy={selectStudy}
                    filterState={{
                      query: dirQuery,
                      onQueryChange: setDirQuery,
                      pillar: dirPillar,
                      onPillarChange: setDirPillar,
                      savedOnly: dirSavedOnly,
                      onSavedOnlyChange: setDirSavedOnly,
                    }}
                  />
                )}

                {section === "Исследования" && studyMode === "detail" && study && (
                  <StudyPanel
                    studySummary={study}
                    studies={studies}
                    isCompared={compareIds.includes(study.id)}
                    onToggleCompare={() => toggleCompare(study.id)}
                    onSelectStudy={selectStudy}
                    onBackToCatalog={openStudiesDirectory}
                    currentView={view}
                    onView={setView}
                  />
                )}

                {section === "Исследования" && studyMode === "detail" && !study && (
                  <div className="empty-main">
                    <p>{ru ? "В каталоге пока нет исследований." : "No studies found in the catalog."}</p>
                  </div>
                )}

                {section === "Сравнение и установки" && (
                  <CompareView
                    studies={studies}
                    compareIds={compareIds}
                    onSetCompareIds={setCompareIds}
                    onSelectStudy={selectStudy}
                    diffFilter={compareDiff}
                    onDiffFilterChange={setCompareDiff}
                    focus={compareFocus}
                    onFocusChange={setCompareFocus}
                    runsFilterState={{
                      campaign: runsCampaign,
                      onCampaignChange: setRunsCampaign,
                      search: runsQuery,
                      onSearchChange: setRunsQuery,
                      selected: runsSelected,
                      onSelectedChange: setRunsSelected,
                    }}
                  />
                )}

                {section === "Среды обитания" && (
                  <EnvironmentsView
                    scenario={conditions}
                    onChange={(next) => {
                      setScenario(null)
                      setConditions(next)
                    }}
                    onPreset={applyScenario}
                    onAsk={() => {
                      if (inspectorIsDrawer) setInspectorOpen(true)
                      else setInspectorExpanded(true)
                    }}
                    onSelectStudy={selectStudy}
                    compareIds={compareIds}
                    onToggleCompare={toggleCompare}
                    viewState={{
                      axisMode: envAxis,
                      onAxisModeChange: setEnvAxis,
                      showAllRuns: envAllRuns,
                      onShowAllRunsChange: setEnvAllRuns,
                    }}
                  />
                )}

                {assistantPage && (
                  <div className="section-view">
                    <div className="assistant-page-head">
                      <h1>{ru ? "ИИ-ассистент по исследованиям" : "AI Research Assistant"}</h1>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSection(previousSectionRef.current)}
                      >
                        {ru ? "← Назад" : "← Back"}
                      </Button>
                    </div>
                    <AssistantChat chat={chat} studies={studies} onSelectStudy={selectStudy} />
                  </div>
                )}
              </>
            )}
          </main>

          {!assistantPage && (
            <WorkspacePane
              id="inspector-dialog"
              label={ru ? "ИИ-ассистент по исследованиям" : "AI Research Assistant"}
              className="context-panel"
              breakpoint={1100}
              expanded={inspectorExpanded}
              drawer={inspectorOpen}
              onClose={() => setInspectorOpen(false)}
            >
              <AssistantChat
                chat={chat}
                studies={studies}
                onOpenPage={() => {
                  setSection("ИИ-ассистент")
                  setInspectorOpen(false)
                }}
                onCollapse={inspectorIsDrawer ? undefined : () => setInspectorExpanded(false)}
                onSelectStudy={selectStudy}
              />
            </WorkspacePane>
          )}
        </div>
      </div>
    </Tabs.Root>
  )
}
