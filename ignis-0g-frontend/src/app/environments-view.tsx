import { useMemo, useState } from "react"
import { useQueries } from "@tanstack/react-query"
import {
  AlertTriangle,
  ArrowRight,
  Flame,
  Rocket,
  Wind,
} from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { studyQueries } from "@/api/queries"
import {
  BASS_U_CURVE_POINTS,
  detectEvidenceGaps,
  getCrewEnvironments,
  getMissionScenarios,
  type MissionScenarioId,
} from "@/domain/knowledge"
import type { Scenario } from "@/domain/types"
import type { EnvAxisMode } from "@/domain/url-state"
import { useLocale } from "@/i18n"
import { ScenarioResults } from "./scenario-results"
import { QueryFailure, QueryLoading } from "./query-feedback"
import { useMocks } from "@/api/client"
import {
  OUTCOME_COLORS, OUTCOME_LABELS, axisFraction, chartAxis,
  filterExperimentPoints, representativePoints, scenarioEvidence, toExperimentPoints,
} from "@/domain/experiment-chart"

type ChartAxisMode = EnvAxisMode

export interface EnvironmentsViewFilterState {
  axisMode: ChartAxisMode
  onAxisModeChange: (next: ChartAxisMode) => void
  showAllRuns: boolean
  onShowAllRunsChange: (next: boolean) => void
}

const DIGITIZED_RUN_STUDY_IDS = ["bass-bass-ii-bass-m", "saffire-i-iii", "flex-1"] as const

export function EnvironmentsView({
  scenario,
  onChange,
  onPreset,
  onAsk,
  onSelectStudy,
  compareIds,
  onToggleCompare,
  viewState,
}: {
  scenario: Scenario
  onChange: (scenario: Scenario) => void
  onPreset: (id: MissionScenarioId) => void
  onAsk: () => void
  onSelectStudy: (id: string) => void
  compareIds: string[]
  onToggleCompare: (id: string) => void
  viewState?: EnvironmentsViewFilterState
}) {
  const locale = useLocale()
  const ru = locale === "ru"
  const [localAxisMode, setLocalAxisMode] = useState<ChartAxisMode>("flow-o2")
  const [localShowAllRuns, setLocalShowAllRuns] = useState(false)
  const axisMode = viewState?.axisMode ?? localAxisMode
  const setAxisMode = viewState?.onAxisModeChange ?? setLocalAxisMode
  const showAllRuns = viewState?.showAllRuns ?? localShowAllRuns
  const setShowAllRuns = viewState?.onShowAllRunsChange ?? setLocalShowAllRuns
  const [selectedRunId, setSelectedRunId] = useState<string>("")
  const [showSchematic, setShowSchematic] = useState(false)
  const [hoveredRunId, setHoveredRunId] = useState<string | null>(null)

  const runQueries = useQueries({
    queries: DIGITIZED_RUN_STUDY_IDS.map((id) => studyQueries.runs(id)),
  })
  const digitizedRuns = useMemo(
    () =>
      DIGITIZED_RUN_STUDY_IDS.flatMap((id, idx) =>
        toExperimentPoints(id, runQueries[idx]?.data ?? []),
      ),
    [runQueries],
  )

  const o2Pct = scenario.o2_pct
  const pressureKpa = scenario.pressure_kpa
  const flowCms = scenario.flow_cms
  const gravityG = scenario.gravity_g

  const ppO2Kpa = Number(((pressureKpa * o2Pct) / 100).toFixed(1))
  const allFilteredRuns = useMemo(
    () => filterExperimentPoints(digitizedRuns, scenario.fuel),
    [digitizedRuns, scenario.fuel],
  )
  const keyRuns = useMemo(() => representativePoints(allFilteredRuns), [allFilteredRuns])
  const filteredRuns = showAllRuns ? allFilteredRuns : keyRuns
  const runsLoading = runQueries.some((query) => query.isPending)
  const runsFailed = runQueries.some((query) => query.isError)
  const evidence = scenarioEvidence(allFilteredRuns, scenario)

  const plottedRuns = useMemo(() => {
    if (axisMode === "pressure-o2") {
      return filteredRuns.filter((r) => r.pressureKpa !== null)
    }
    return filteredRuns
  }, [axisMode, filteredRuns])

  const omittedNoPressureCount =
    axisMode === "pressure-o2" ? filteredRuns.length - plottedRuns.length : 0

  const activeRun = useMemo(
    () =>
      plottedRuns.find((r) => r.id === (hoveredRunId ?? selectedRunId)) ??
      filteredRuns.find((r) => r.id === (hoveredRunId ?? selectedRunId)) ??
      plottedRuns[0] ??
      filteredRuns[0],
    [filteredRuns, hoveredRunId, plottedRuns, selectedRunId],
  )

  const gaps = useMemo(
    () => detectEvidenceGaps({ o2Pct, pressureKpa, flowCms, gravityG }, locale),
    [o2Pct, pressureKpa, flowCms, gravityG, locale],
  )

  const evidenceTitle = runsLoading
    ? ru ? "Загрузка экспериментальных данных" : "Loading experimental data"
    : runsFailed
      ? ru ? "Данные загружены не полностью" : "Experimental data is incomplete"
      : evidence.matched > 0
        ? ru ? "Параметры среды встречаются в опубликованных прогонах" : "Environmental parameters found in published runs"
        : evidence.complete > 0
          ? ru ? "Совпадение всех четырёх параметров не найдено" : "No match for all four environmental parameters"
          : ru ? "Недостаточно данных для сопоставления условий" : "Insufficient data to match conditions"
  const evidenceDetail = ru
    ? `Загружено прогонов для выбранной фазы топлива: ${evidence.total}. С фиксированными O₂, обдувом и указанным давлением: ${evidence.complete}; совпадают O₂, давление, обдув и гравитация: ${evidence.matched}. Совпадение относится только к материалу и геометрии соответствующего прогона. Карта не рассчитывает пожарный риск или безопасные пределы.`
    : `Loaded runs for the selected fuel phase: ${evidence.total}. With fixed O₂, constant airflow and reported pressure: ${evidence.complete}; matching O₂, pressure, airflow and gravity: ${evidence.matched}. A match applies only to the material and geometry of that run. This map does not calculate fire risk or safe limits.`

  const svgW = 680
  const svgH = 290
  const padL = 52
  const padR = 22
  const padT = 22
  const padB = 40
  const plotW = svgW - padL - padR
  const plotH = svgH - padT - padB

  const flowAxis = chartAxis([flowCms, ...plottedRuns.map((r) => r.flowCms)], [0, 50], 10)
  const pressureAxis = chartAxis([pressureKpa, ...plottedRuns.flatMap((r) => r.pressureKpa === null ? [] : [r.pressureKpa])], [0, 125], 25)
  const oxygenAxis = chartAxis([o2Pct, ...plottedRuns.map((r) => r.o2Pct)], [10, 46], 5)
  const flowToX = (flow: number) => padL + axisFraction(flow, flowAxis) * plotW
  const pressToX = (pressure: number) => padL + axisFraction(pressure, pressureAxis) * plotW
  const o2ToY = (oxygen: number) => padT + (1 - axisFraction(oxygen, oxygenAxis)) * plotH
  const uCurvePointsStr = BASS_U_CURVE_POINTS.map(
    (pt) => `${flowToX(pt.flowCms).toFixed(1)},${o2ToY(pt.locO2Pct).toFixed(1)}`,
  ).join(" ")

  const userX = axisMode === "flow-o2" ? flowToX(flowCms) : pressToX(pressureKpa)
  const userY = o2ToY(o2Pct)
  const scenarios = getMissionScenarios(locale)
  const crewEnvs = getCrewEnvironments(locale)

  return (
    <div className="section-view">
      <div>
        <h1>
          {ru
            ? "Условия миссии и 2D-карта экспериментальных данных"
            : "Mission Environments & 2D Experimental Data Map"}
        </h1>
        <p className="muted">
          {ru
            ? "Выберите пресет миссии или настройте параметры среды слева. Наведите или нажмите на любую точку на графике, чтобы посмотреть данные конкретного прогона NASA PSI."
            : "Select a mission preset or tune ambient parameters on the left. Hover or click any plotted point to inspect a specific NASA PSI test run."}
        </p>
      </div>

      <section className="panel panel-padding envelope-simulator">
        <div className="env-Presets">
          {scenarios.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className="env-preset-btn"
              onClick={() => onPreset(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="regime-toolbar-row">
          <div className="regime-mode-tabs" role="tablist" aria-label={ru ? "Режим осей 2D-карты" : "2D chart axis mode"}>
            <button
              type="button"
              role="tab"
              aria-selected={axisMode === "flow-o2"}
              className={`regime-tab-btn ${axisMode === "flow-o2" ? "active" : ""}`}
              onClick={() => setAxisMode("flow-o2")}
            >
              {ru ? "Поток vs O₂" : "Airflow vs O₂"}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={axisMode === "pressure-o2"}
              className={`regime-tab-btn ${axisMode === "pressure-o2" ? "active" : ""}`}
              onClick={() => setAxisMode("pressure-o2")}
            >
              {ru ? "Давление vs O₂" : "Pressure vs O₂"}
            </button>
            <button
              type="button"
              aria-pressed={showAllRuns}
              className={`regime-tab-btn ${showAllRuns ? "active" : ""}`}
              disabled={!digitizedRuns.length}
              onClick={() => setShowAllRuns(!showAllRuns)}
            >
              {showAllRuns
                ? ru ? `Все прогоны (${allFilteredRuns.length})` : `All Runs (${allFilteredRuns.length})`
                : ru ? `Обзор (${keyRuns.length})` : `Overview (${keyRuns.length})`}
            </button>
          </div>

          <div className="regime-mode-tabs" role="group" aria-label={ru ? "Фаза топлива" : "Fuel Phase"}>
            {([
              { value: null, labelEn: "All Fuels", labelRu: "Все топлива" },
              { value: "solid", labelEn: "Solids (PMMA / Fabrics)", labelRu: "Твёрдые (ткани / PMMA)" },
              { value: "liquid", labelEn: "Liquid Droplets", labelRu: "Жидкие капли" },
              { value: "gas", labelEn: "Gas Burners", labelRu: "Газовые горелки" },
            ] as const).map((item) => {
              const active = (scenario.fuel ?? null) === item.value
              return (
                <button
                  key={item.labelEn}
                  type="button"
                  aria-pressed={active}
                  className={`regime-tab-btn ${active ? "active" : ""}`}
                  onClick={() => onChange({ ...scenario, fuel: item.value })}
                >
                  {ru ? item.labelRu : item.labelEn}
                </button>
              )
            })}
          </div>
        </div>

        <div className="envelope-simulator-grid">
          <div className="envelope-controls">
            <label>
              <div className="slider-head">
                <span>{ru ? "Кислород O₂" : "Oxygen O₂"}</span>
                <strong>
                  {o2Pct}% O₂
                </strong>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={o2Pct}
                onChange={(e) => onChange({ ...scenario, o2_pct: e.currentTarget.valueAsNumber })}
              />
            </label>

            <label>
              <div className="slider-head">
                <span>{ru ? "Обдув HVAC" : "HVAC Airflow"}</span>
                <strong>
                  {flowCms} {ru ? "см/с" : "cm/s"}
                </strong>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                step={0.5}
                value={flowCms}
                onChange={(e) => onChange({ ...scenario, flow_cms: e.currentTarget.valueAsNumber })}
              />
            </label>

            <label>
              <div className="slider-head">
                <span>{ru ? "Давление" : "Pressure"}</span>
                <strong>
                  {pressureKpa} {ru ? "кПа" : "kPa"} (pO₂ {ppO2Kpa} {ru ? "кПа" : "kPa"})
                </strong>
              </div>
              <input
                type="range"
                min={1}
                max={150}
                step={0.1}
                value={pressureKpa}
                onChange={(e) => onChange({ ...scenario, pressure_kpa: e.currentTarget.valueAsNumber })}
              />
            </label>

            <label>
              <div className="slider-head">
                <span>{ru ? "Гравитация" : "Gravity"}</span>
                <strong>{gravityG.toFixed(2)} g</strong>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={gravityG}
                onChange={(e) => onChange({ ...scenario, gravity_g: e.currentTarget.valueAsNumber })}
              />
            </label>

            <div className="regime-legend-inline">
              <span><i style={{ background: "#ff7a6b" }} /> {ru ? "Горение / выгорание" : "Burning / completion"}</span>
              <span><i style={{ background: "#ffc46b" }} /> {ru ? "Холодное пламя" : "Cool flame"}</span>
              <span><i style={{ background: "#63e2b7" }} /> {ru ? "Затухание / срыв" : "Extinction / blowoff"}</span>
              <span><i style={{ background: "#b8becb" }} /> {ru ? "Другой / неизвестный исход" : "Other / unknown outcome"}</span>
            </div>
            {axisMode === "flow-o2" && (
              <Button type="button" variant="outline" size="sm" aria-pressed={showSchematic} onClick={() => setShowSchematic(!showSchematic)}>
                {showSchematic
                  ? ru ? "Скрыть схему BASS-II" : "Hide BASS-II schematic"
                  : ru ? "Показать схему BASS-II" : "Show BASS-II schematic"}
              </Button>
            )}

            <Button type="button" variant="outline" size="sm" onClick={onAsk}>
              {ru ? "Спросить ИИ об этих условиях" : "Ask AI About This Scenario"}
            </Button>
          </div>

          <div className="envelope-chart-wrap">
            <div className="envelope-chart-scroll">
              <svg
                viewBox={`0 0 ${svgW} ${svgH}`}
                className="envelope-svg"
                role="img"
                aria-label={ru ? "Двумерная карта экспериментальных данных NASA" : "NASA experimental observations"}
              >
                {oxygenAxis.ticks.map((o2Val) => {
                  const y = o2ToY(o2Val)
                  return (
                    <g key={o2Val}>
                      <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                      <text x={padL - 8} y={y + 4} textAnchor="end" fill="#b8becb" fontSize="11">
                        {o2Val}%
                      </text>
                    </g>
                  )
                })}

                {axisMode === "flow-o2" ? (
                  <>
                    {flowAxis.ticks.map((fVal) => {
                      const x = flowToX(fVal)
                      return (
                        <g key={fVal}>
                          <line x1={x} y1={padT} x2={x} y2={svgH - padB} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                          <text x={x} y={svgH - 22} textAnchor="middle" fill="#b8becb" fontSize="11">
                            {fVal}
                          </text>
                        </g>
                      )
                    })}
                    <text x={padL + plotW / 2} y={svgH - 5} textAnchor="middle" fill="#cfd5e2" fontSize="11.5">
                      {ru
                        ? "Скорость обдува (см/с)"
                        : "Forced Airflow Velocity (cm/s)"}
                    </text>

                    {showSchematic && (
                      <polyline
                        points={uCurvePointsStr}
                        fill="none"
                        stroke="#ff9e64"
                        strokeWidth="2.4"
                        strokeDasharray="6 4"
                        strokeOpacity={0.6}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {pressureAxis.ticks.map((pKpa) => {
                      const x = pressToX(pKpa)
                      return (
                        <g key={pKpa}>
                          <line x1={x} y1={padT} x2={x} y2={svgH - padB} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                          <text x={x} y={svgH - 22} textAnchor="middle" fill="#b8becb" fontSize="11">
                            {pKpa}
                          </text>
                        </g>
                      )
                    })}
                    <text x={padL + plotW / 2} y={svgH - 5} textAnchor="middle" fill="#cfd5e2" fontSize="11.5">
                      {ru
                        ? "Давление (кПа)"
                        : "Pressure (kPa)"}
                    </text>


                  </>
                )}

                <text
                  x={15}
                  y={padT + plotH / 2}
                  textAnchor="middle"
                  fill="#cfd5e2"
                  fontSize="11.5"
                  transform={`rotate(-90 15 ${padT + plotH / 2})`}
                >
                  O₂ (%)
                </text>

                {plottedRuns.length === 0 && (
                  <text
                    x={padL + plotW / 2}
                    y={padT + plotH / 2 - 4}
                    textAnchor="middle"
                    fill="#cfd5e2"
                    fontSize="12"
                  >
                    {filteredRuns.length === 0
                      ? ru
                        ? "Для выбранной фазы топлива нет подтверждённых табличных прогонов"
                        : "No primary-table test runs available for this fuel phase yet"
                      : ru
                        ? "У отфильтрованных прогонов давление в первичном отчёте не указано"
                        : "No chamber pressure values reported for the filtered test runs"}
                  </text>
                )}

                {plottedRuns.map((run) => {
                  const cx =
                    axisMode === "flow-o2" ? flowToX(run.flowCms) : pressToX(run.pressureKpa!)
                  const cy = o2ToY(run.o2Pct)
                  const isSelected = activeRun?.id === run.id
                  const color = OUTCOME_COLORS[run.outcome]
                  return (
                    <g
                      key={run.id}
                      className="psi-run-dot"
                      onClick={() => setSelectedRunId(run.id)}
                      onMouseEnter={() => setHoveredRunId(run.id)}
                      onMouseLeave={() => setHoveredRunId(null)}
                      style={{ cursor: "pointer" }}
                    >
                      {isSelected && (
                        <circle cx={cx} cy={cy} r="11" fill="none" stroke="#fff" strokeWidth="1.6" strokeDasharray="2 2" />
                      )}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? "6.8" : "5"}
                        fill={color}
                        stroke="#141210"
                        strokeWidth="1.5"
                      />
                      {isSelected && (
                        <text
                          x={cx > svgW - 150 ? cx - 11 : cx + 11}
                          y={cy + 4}
                          textAnchor={cx > svgW - 150 ? "end" : "start"}
                          fill="#fff"
                          fontSize="11.5"
                          fontWeight="700"
                        >
                          {run.runCode}
                        </text>
                      )}
                    </g>
                  )
                })}

                <line x1={userX} y1={padT} x2={userX} y2={svgH - padB} stroke="rgba(255,158,100,0.45)" strokeDasharray="3 3" />
                <line x1={padL} y1={userY} x2={svgW - padR} y2={userY} stroke="rgba(255,158,100,0.45)" strokeDasharray="3 3" />
                <circle cx={userX} cy={userY} r="11" fill="rgba(255, 158, 100, 0.22)" />
                <circle cx={userX} cy={userY} r="5.5" fill="#ff9e64" stroke="#181412" strokeWidth="2" />
                <rect
                  x={Math.min(svgW - 165, Math.max(padL + 4, userX + 8))}
                  y={Math.max(padT + 2, userY - 26)}
                  width="148"
                  height="22"
                  rx="5"
                  fill="#ff9e64"
                />
                <text
                  x={Math.min(svgW - 165, Math.max(padL + 4, userX + 8)) + 74}
                  y={Math.max(padT + 2, userY - 26) + 14.5}
                  textAnchor="middle"
                  fill="#181210"
                  fontSize="11"
                  fontWeight="700"
                >
                  {axisMode === "flow-o2"
                    ? `${flowCms} ${ru ? "см/с" : "cm/s"} · ${o2Pct}% O₂`
                    : `${pressureKpa} ${ru ? "кПа" : "kPa"} · ${o2Pct}% O₂`}
                </text>
              </svg>
            </div>

            {useMocks && <p className="muted">{ru ? "Демонстрационный режим: локальный каталог." : "Demo mode: local catalog."}</p>}
            {runsLoading && <QueryLoading label={ru ? "Загрузка прогонов…" : "Loading experiment runs…"} />}
            {runsFailed && <QueryFailure
              label={ru ? "Часть прогонов не загружена; карта может быть неполной." : "Some runs could not be loaded; the map may be incomplete."}
              fetching={runQueries.some((query) => query.isFetching)}
              retry={() => { runQueries.forEach((query) => { if (query.isError) void query.refetch() }) }}
            />}
            {showSchematic && axisMode === "flow-o2" && <p className="muted">
              {ru
                ? "Пунктир — иллюстративная U-кривая IGNIS с опорным минимумом 13.6% O₂ для стержня PMMA O13a (BASS-II, 0g, 1 атм). Остальные точки схемы не являются измерениями или калиброванной границей. Схема не переносится на другие материалы, геометрию или условия."
                : "Dashed line: IGNIS illustrative U-curve anchored to the reported 13.6% O₂ minimum for PMMA rod O13a (BASS-II, 0g, 1 atm). Other schematic points are not measurements or a calibrated boundary. It does not apply to other materials, geometries or conditions."}{" "}
              <a href="https://ntrs.nasa.gov/citations/20210011385" target="_blank" rel="noreferrer">NASA/TM-20210011385 §6.1.4.2</a>
            </p>}

            {plottedRuns.length > 0 && (
              <div className="mobile-run-cards" role="list" aria-label={ru ? "Точки испытаний NASA PSI" : "NASA PSI test runs"}>
                {plottedRuns.slice(0, 12).map((run) => {
                  const isSelected = activeRun?.id === run.id
                  return (
                    <button
                      key={run.id}
                      type="button"
                      className={`mobile-run-card ${isSelected ? "active" : ""}`}
                      onClick={() => setSelectedRunId(run.id)}
                    >
                      <div className="mobile-run-card-top">
                        <i style={{ background: OUTCOME_COLORS[run.outcome] }} />
                        <strong>{run.runCode}</strong>
                        <span>{run.o2Pct}% O₂</span>
                      </div>
                      <small>
                        {run.flowCms} {ru ? "см/с" : "cm/s"} · {run.fuelLabel}
                      </small>
                    </button>
                  )
                })}
              </div>
            )}

            {omittedNoPressureCount > 0 && (
              <p className="muted" style={{ fontSize: "0.8rem", margin: "0.45rem 0 0" }}>
                {ru
                  ? `Пропущено прогонов без указания давления в первичном отчёте: ${omittedNoPressureCount} (давление не подставляется автоматически).`
                  : `Omitted ${omittedNoPressureCount} test run(s) whose primary table does not report chamber pressure (no default pressure assumed).`}
              </p>
            )}

            {activeRun && (
              <div className="psi-run-inspector">
                <div className="psi-run-inspector-head">
                  <div>
                    <span className="regime-pill" style={{ borderColor: OUTCOME_COLORS[activeRun.outcome], color: OUTCOME_COLORS[activeRun.outcome] }}>
                      {OUTCOME_LABELS[activeRun.outcome][ru ? 1 : 0]}
                    </span>
                    <strong>
                      {activeRun.runCode} ({activeRun.fuelLabel})
                    </strong>
                    <span className="muted"> · {activeRun.citation}</span>
                  </div>
                  <Button type="button" size="sm" variant="outline" onClick={() => onSelectStudy(activeRun.studyId)}>
                    {ru ? "К исследованию" : "Open Study"} <ArrowRight size={13} />
                  </Button>
                </div>
                <p className="muted" style={{ margin: 0 }}>
                  {activeRun.o2Pct}% O₂ ·{" "}
                  {activeRun.pressureKpa !== null
                    ? `${Number(activeRun.pressureKpa.toFixed(3))} ${ru ? "кПа" : "kPa"}`
                    : ru
                      ? "давление не указано"
                      : "pressure unrecorded"}{" "}
                  · {ru ? "обдув" : "flow"} {activeRun.flowCms} {ru ? "см/с" : "cm/s"} —{" "}
                  {ru ? activeRun.metricRu : activeRun.metric}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="envelope-status">
          <div>
            <strong><Wind size={16} /> {evidenceTitle}</strong>
            <p>{evidenceDetail}</p>
          </div>
        </div>

        {gaps.map((g, idx) => (
          <div key={idx} className={`evidence-gap-banner severity-${g.severity}`}>
            <AlertTriangle size={16} />
            <div>
              <strong>
                {ru ? "Белое пятно в базе NASA PSI:" : "NASA PSI Evidence Gap:"} {g.title}
              </strong>
              <p>{g.detail}</p>
            </div>
          </div>
        ))}
      </section>

      <ScenarioResults
        scenario={scenario}
        onSelectStudy={onSelectStudy}
        compareIds={compareIds}
        onToggleCompare={onToggleCompare}
      />

      <div className="env-cards-grid">
        {crewEnvs.map((env) => (
          <article key={env.id} className="panel panel-padding env-card">
            <div className="env-card-head">
              <Rocket size={18} />
              <div>
                <h2>{env.name}</h2>
                <span className="muted">{env.subtitle}</span>
              </div>
            </div>

            <dl className="env-metrics">
              <div>
                <dt>{ru ? "Общее давление" : "Total Pressure"}</dt>
                <dd>{env.pressureText}</dd>
              </div>
              <div>
                <dt>{ru ? "Доля кислорода" : "Oxygen Fraction"}</dt>
                <dd>{env.o2Text}</dd>
              </div>
              <div>
                <dt>{ru ? "Парциальное pO₂" : "Partial Pressure pO₂"}</dt>
                <dd>{env.ppO2Text}</dd>
              </div>
              <div>
                <dt>{ru ? "Гравитация / поток" : "Gravity / Flow"}</dt>
                <dd>{env.gravityText}</dd>
              </div>
            </dl>

            <div className="env-risk-box">
              <strong>
                <Flame size={14} /> {ru ? "Особенности горения и безопасности" : "Combustion Behavior & Safety Notes"}
              </strong>
              <p>{env.fireRiskSummary}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
