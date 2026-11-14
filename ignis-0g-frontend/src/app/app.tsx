import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { Tabs } from "radix-ui"
import { useQuery } from "@tanstack/react-query"
import { ArrowRight, Bot, Menu, Search, X } from "@/components/ui/icons"
import { studyQueries } from "@/api/queries"
import { SCENARIO_PRESETS, type MissionScenarioId } from "@/domain/knowledge"
import type { Scenario, StudySummary } from "@/domain/types"
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

function initialSectionFromUrl(): Section {
  const params = new URLSearchParams(window.location.search)
  const view = params.get("view")
  const sec = params.get("section")
  if (view === "assistant" || view === "nexus" || sec === "assistant") return "ИИ-ассистент"
  if (sec === "compare") return "Сравнение и установки"
  if (sec === "environments") return "Среды обитания"
  if (sec === "studies" || params.has("study")) return "Исследования"
  return "Дашборд и рейтинг"
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

  const [selectedId, setSelectedId] = useState<string | undefined>(
    () => new URLSearchParams(window.location.search).get("study") ?? undefined,
  )
  const [section, setSection] = useState<Section>(initialSectionFromUrl)
  const [studyMode, setStudyMode] = useState<"directory" | "detail">(() =>
    new URLSearchParams(window.location.search).has("study") ? "detail" : "directory",
  )
  const [view, setView] = useState<View>(() => {
    const tab = new URLSearchParams(window.location.search).get("tab") ?? ""
    return isStudyView(tab) ? tab : "overview"
  })
  const [scenario, setScenario] = useState<MissionScenarioId | null>("iss-cabin")
  const [conditions, setConditions] = useState<Scenario>(SCENARIO_PRESETS["iss-cabin"])

  function applyScenario(id: MissionScenarioId) {
    setScenario(id)
    setConditions(SCENARIO_PRESETS[id])
  }
  const [compareIds, setCompareIds] = useState<string[]>(() => {
    const raw = new URLSearchParams(window.location.search).get("compare")
    return raw ? [...new Set(raw.split(",").filter(Boolean))].slice(0, 4) : []
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [inspectorOpen, setInspectorOpen] = useState(false)
  const [inspectorExpanded, setInspectorExpanded] = useState(true)

  const assistantPage = section === "ИИ-ассистент"
  const study = studies.find(({ id }) => id === selectedId) ?? studies[0]
  const chat = useStudyChat(
    studyMode === "detail" && section === "Исследования" ? study : undefined,
    section === "Исследования" ? undefined : conditions,
  )

  useEffect(() => {
    const params = new URLSearchParams()
    if (section === "Исследования") {
      if (studyMode === "detail" && study) {
        params.set("study", study.id)
        if (view !== "overview") params.set("tab", view)
      } else {
        params.set("section", "studies")
      }
    } else if (section === "Сравнение и установки") {
      params.set("section", "compare")
      if (compareIds.length >= 2) params.set("compare", compareIds.join(","))
    } else if (section === "Среды обитания") {
      params.set("section", "environments")
    } else if (section === "ИИ-ассистент") {
      params.set("section", "assistant")
    }
    const qs = params.toString()
    const nextUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    const hash = section === "Сравнение и установки" && window.location.hash === "#experiment-runs" ? window.location.hash : ""
    window.history.replaceState(null, "", nextUrl + hash)
  }, [section, studyMode, study, view, compareIds])

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
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id)
      if (prev.length >= 4) return [...prev.slice(1), id]
      return [...prev, id]
    })
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
                setSection(next)
                if (next === "Исследования") setStudyMode("directory")
                setSidebarOpen(false)
                setInspectorOpen(false)
              }}
              onOpenSearch={() => searchDialog.current?.showModal()}
            />
          </WorkspacePane>

          <main id="research-main" className="main-panel" tabIndex={-1}>
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
                  />
                )}

                {section === "Исследования" && studyMode === "detail" && study && (
                  <StudyPanel
                    studySummary={study}
                    isCompared={compareIds.includes(study.id)}
                    onToggleCompare={() => toggleCompare(study.id)}
                    onSelectStudy={selectStudy}
                    onBackToCatalog={openStudiesDirectory}
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
                    onAsk={() => setSection("ИИ-ассистент")}
                    onSelectStudy={selectStudy}
                    compareIds={compareIds}
                    onToggleCompare={toggleCompare}
                  />
                )}

                {assistantPage && (
                  <div className="section-view">
                    <h1>{ru ? "ИИ-ассистент по исследованиям" : "AI Research Assistant"}</h1>
                    <AssistantChat chat={chat} onSelectStudy={selectStudy} />
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
