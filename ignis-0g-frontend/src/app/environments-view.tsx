import { useMemo, useState } from "react"
import { useQueries } from "@tanstack/react-query"
import {
  AlertTriangle,
  ArrowRight,
  Flame,
  Rocket,
  ShieldCheck,
  Wind,
} from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { studyQueries } from "@/api/queries"
import {
  BASS_U_CURVE_POINTS,
  PSI_TEST_RUNS,
  detectEvidenceGaps,
  getCrewEnvironments,
  getMissionScenarios,
  getReferenceBassLoc,
  type FlameRegime,
  type MissionScenarioId,
  type PsiTestRunPoint,
} from "@/domain/knowledge"
import type { ExperimentRun, Scenario } from "@/domain/types"
import { useLocale } from "@/i18n"
import { ScenarioResults } from "./scenario-results"

type ChartAxisMode = "flow-o2" | "pressure-o2"

const DIGITIZED_RUN_STUDY_IDS = ["bass-bass-ii-bass-m", "saffire-i-iii", "flex-1"] as const

const OUTCOME_LABELS_EN: Record<string, string> = {
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
}

const OUTCOME_LABELS_RU: Record<string, string> = {
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
  disruption: "Разрушение капли",
}

const REGIME_LABELS_EN: Record<FlameRegime, string> = {
  flame_spread: "Sustained Flame Spread",
  smoldering_cool: "Smoldering / Cool Flame",
  quenched: "Extinguished / Non-Propagating",
}

const REGIME_LABELS_RU: Record<FlameRegime, string> = {
  flame_spread: "Устойчивое горение",
  smoldering_cool: "Тление / холодное пламя",
  quenched: "Затухание / нет распространения",
}

const REGIME_COLORS: Record<FlameRegime, string> = {
  flame_spread: "#ff7a6b",
  smoldering_cool: "#ffc46b",
  quenched: "#63e2b7",
}

function toDigitizedRunPoints(studyId: string, runs: ExperimentRun[]): PsiTestRunPoint[] {
  return runs.map((run) => {
    const out = run.outcome ?? ""
    const isTerminalTransition = out === "quenched" || out === "blowoff"
    const flow =
      (isTerminalTransition ? run.airflow_cms[run.airflow_cms.length - 1] : run.airflow_cms[0]) ?? 0
    const o2 = run.oxygen_vol_pct[0] ?? 21
    const pKpa = run.pressure_atm !== null ? Number((run.pressure_atm * 101.325).toFixed(1)) : null
    const fuelCategory: "solid" | "liquid" | "gas" = run.campaign === "FLEX-1" ? "liquid" : "solid"
    const regime: FlameRegime =
      out === "cool_flame"
        ? "smoldering_cool"
        : out === "quenched" ||
            out === "blowoff" ||
            out === "no_ignition" ||
            out === "no_propagation" ||
            out === "extinction" ||
            out === "disruption"
          ? "quenched"
          : "flame_spread"

    const rateEn = run.spread_rate_mm_s
      ? `${run.campaign === "FLEX-1" ? "K=" : "spread "}${run.spread_rate_mm_s.join("→")} ${run.campaign === "FLEX-1" ? "mm²/s" : "mm/s"}`
      : null
    const rateRu = run.spread_rate_mm_s
      ? `${run.campaign === "FLEX-1" ? "K=" : "скорость "}${run.spread_rate_mm_s.join("→")} ${run.campaign === "FLEX-1" ? "мм²/с" : "мм/с"}`
      : null

    const metric = OUTCOME_LABELS_EN[out] ?? rateEn ?? `Measured at ${run.airflow_cms.join("→")} cm/s`
    const metricRu = OUTCOME_LABELS_RU[out] ?? rateRu ?? `Измерено при ${run.airflow_cms.join("→")} см/с`

    return {
      id: `${studyId}-${run.run_id}`,
      runCode: `${run.campaign} #${run.run_id}`,
      studyId,
      program: run.campaign,
      fuelCategory,
      fuelLabel: `${run.material} (${run.geometry})`,
      fuelLabelRu: `${run.material} (${run.geometry})`,
      o2Pct: o2,
      pressureKpa: pKpa,
      flowCms: flow,
      gravityG: 0,
      regime,
      metric: rateEn && OUTCOME_LABELS_EN[out] ? `${OUTCOME_LABELS_EN[out]} (${rateEn})` : metric,
      metricRu: rateRu && OUTCOME_LABELS_RU[out] ? `${OUTCOME_LABELS_RU[out]} (${rateRu})` : metricRu,
      citation: run.locator,
    }
  })
}

export function EnvironmentsView({
  scenario,
  onChange,
  onPreset,
  onAsk,
  onSelectStudy,
  compareIds,
  onToggleCompare,
}: {
  scenario: Scenario
  onChange: (scenario: Scenario) => void
  onPreset: (id: MissionScenarioId) => void
  onAsk: () => void
  onSelectStudy: (id: string) => void
  compareIds: string[]
  onToggleCompare: (id: string) => void
}) {
  const locale = useLocale()
  const ru = locale === "ru"
  const [axisMode, setAxisMode] = useState<ChartAxisMode>("flow-o2")
  const [showAllRuns, setShowAllRuns] = useState(false)
  const [selectedRunId, setSelectedRunId] = useState<string>("bass-run-gmt45-t4")
  const [hoveredRunId, setHoveredRunId] = useState<string | null>(null)

  const runQueries = useQueries({
    queries: DIGITIZED_RUN_STUDY_IDS.map((id) => studyQueries.runs(id)),
  })
  const digitizedRuns = useMemo(
    () =>
      DIGITIZED_RUN_STUDY_IDS.flatMap((id, idx) =>
        toDigitizedRunPoints(id, runQueries[idx]?.data ?? []),
      ),
    [runQueries],
  )

  const o2Pct = scenario.o2_pct
  const pressureKpa = scenario.pressure_kpa
  const flowCms = scenario.flow_cms
  const gravityG = scenario.gravity_g

  const ppO2Kpa = Number(((pressureKpa * o2Pct) / 100).toFixed(1))
  const ppO2Psi = Number((ppO2Kpa / 6.89476).toFixed(2))
  const refLoc = getReferenceBassLoc({ flowCms, pressureKpa, gravityG, fuel: scenario.fuel })
  const effectiveLoi = refLoc.locO2Pct

  const sourceRuns = showAllRuns && digitizedRuns.length > 0 ? digitizedRuns : PSI_TEST_RUNS
  const filteredRuns = useMemo(() => {
    const f = scenario.fuel
    if (!f || f === "aerosol_pyrolysis" || f === "reference") return sourceRuns
    return sourceRuns.filter((r) => r.fuelCategory === f)
  }, [scenario.fuel, sourceRuns])

  const plottedRuns = useMemo(() => {
    if (axisMode === "pressure-o2") {
      return filteredRuns.filter((r): r is PsiTestRunPoint & { pressureKpa: number } => r.pressureKpa !== null)
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

  let riskState: "safe" | "caution" | "danger" = "caution"
  let riskTitle = ru
    ? "Пограничный режим (вблизи эталонной U-кривой BASS-II)"
    : "Marginal Regime (Near BASS-II SIBAL Reference Curve)"
  let riskDetail = ru
    ? `Текущий O₂ (${o2Pct}%) близок к эталонному порогу SIBAL (0g, 101.3 кПа: ~${effectiveLoi}% O₂ при обдуве ${flowCms} см/с).`
    : `Current O₂ (${o2Pct}%) is near the SIBAL reference boundary (0g, 101.3 kPa: ~${effectiveLoi}% O₂ at ${flowCms} cm/s).`

  if (o2Pct >= 28 || ppO2Kpa >= 23) {
    riskState = "danger"
    riskTitle = ru
      ? "Повышенный риск SEA / EVA (высокая доля O₂ / pO₂)"
      : "Elevated SEA / EVA Hazard (High O₂ / pO₂)"
    riskDetail = ru
      ? `pO₂ = ${ppO2Psi} psi (${ppO2Kpa} кПа). Повышенная концентрация кислорода усиливает воспламеняемость материалов относительно стандартного режима МКС.`
      : `pO₂ = ${ppO2Psi} psi (${ppO2Kpa} kPa). Elevated O₂ mole fraction increases material flammability relative to nominal ISS air.`
  } else if (!refLoc.isCalibrated) {
    riskState = "caution"
    riskTitle = ru
      ? "Вне области калибровки U-кривой BASS-II (101.3 кПа, 0g, тонкие твёрдые ткани)"
      : "Outside BASS-II U-Curve Calibration (101.3 kPa, 0g, thin solids)"
    riskDetail = ru
      ? `Опубликованная граница SIBAL (~${effectiveLoi}% O₂ при ${flowCms} см/с) измерена только для тонкой ткани SIBAL в 0g и 1 атм. Для выбранных параметров (${pressureKpa} кПа, ${gravityG.toFixed(2)}g) пересчёт LOI без эмпирических испытаний не производится.`
      : `The published SIBAL curve (~${effectiveLoi}% O₂ at ${flowCms} cm/s) is calibrated only for thin SIBAL fabric at 0g and 1 atm. No uncalibrated pressure or partial-gravity LOI extrapolation is applied for (${pressureKpa} kPa, ${gravityG.toFixed(2)}g).`
  } else if (o2Pct < effectiveLoi - 0.5) {
    riskState = "safe"
    riskTitle = ru
      ? "Ниже эталонной границы SIBAL BASS-II (зона затухания при 0g, 1 атм)"
      : "Below BASS-II SIBAL Reference Limit (0g, 1 atm Quench Zone)"
    riskDetail = ru
      ? `Концентрация O₂ (${o2Pct}%) ниже эталона горючести ткани SIBAL (~${effectiveLoi}% O₂ при ${flowCms} см/с, 0g, 101.3 кПа). Для других материалов и толщин (напр., PMMA до 13.6% O₂) проверяйте отдельные прогоны.`
      : `O₂ (${o2Pct}%) falls below the thin SIBAL fabric reference boundary (~${effectiveLoi}% O₂ at ${flowCms} cm/s, 0g, 101.3 kPa). Check individual runs for thicker materials such as PMMA (down to 13.6% O₂).`
  } else if (flowCms >= 2 && flowCms <= 15) {
    riskState = "danger"
    riskTitle = ru
      ? "Зона минимума U-кривой BASS-II (слабый обдув 2–15 см/с)"
      : "BASS-II U-Curve Trough (Low Forced Flow 2–15 cm/s)"
    riskDetail = ru
      ? `При обдуве ${flowCms} см/с в 0g отсутствует плавучий унос тепла, а эталонный порог SIBAL минимален (~${effectiveLoi}% O₂).`
      : `At ${flowCms} cm/s in 0g, buoyant cooling is absent and the thin-fabric SIBAL reference boundary drops to ~${effectiveLoi}% O₂.`
  }

  const svgW = 680
  const svgH = 290
  const padL = 52
  const padR = 22
  const padT = 22
  const padB = 40
  const plotW = svgW - padL - padR
  const plotH = svgH - padT - padB

  const pressMax =
    axisMode === "pressure-o2" &&
    (pressureKpa > 125 || plottedRuns.some((r) => (r.pressureKpa ?? 0) > 130))
      ? 320
      : 125
  const flowToX = (f: number) => padL + (Math.min(50, Math.max(0, f)) / 50) * plotW
  const pressToX = (pKpa: number) =>
    padL + ((Math.min(pressMax, Math.max(25, pKpa)) - 25) / (pressMax - 25)) * plotW
  const o2ToY = (o2: number) => padT + (1 - (Math.min(46, Math.max(10, o2)) - 10) / 36) * plotH

  const uCurvePointsStr = BASS_U_CURVE_POINTS.map(
    (pt) => `${flowToX(pt.flowCms).toFixed(1)},${o2ToY(pt.locO2Pct).toFixed(1)}`,
  ).join(" ")

  const uCurveFillStr = `${flowToX(0.2).toFixed(1)},${o2ToY(46).toFixed(1)} ${uCurvePointsStr} ${flowToX(50).toFixed(1)},${o2ToY(46).toFixed(1)}`

  const userX = axisMode === "flow-o2" ? flowToX(flowCms) : pressToX(pressureKpa)
  const userY = o2ToY(o2Pct)
  const regimeLabels = ru ? REGIME_LABELS_RU : REGIME_LABELS_EN
  const scenarios = getMissionScenarios(locale)
  const crewEnvs = getCrewEnvironments(locale)

  return (
    <div className="section-view">
      <div>
        <h1>
          {ru
            ? "Условия миссии и 2D-карта режимов горения"
            : "Mission Environments & 2D Combustion Regime Map"}
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
              {ru ? "U-кривая: Поток vs O₂" : "U-Curve: Airflow vs O₂"}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={axisMode === "pressure-o2"}
              className={`regime-tab-btn ${axisMode === "pressure-o2" ? "active" : ""}`}
              onClick={() => setAxisMode("pressure-o2")}
            >
              {ru ? "Конверт: Давление vs O₂" : "Envelope: Pressure vs O₂"}
            </button>
            <button
              type="button"
              aria-pressed={showAllRuns}
              className={`regime-tab-btn ${showAllRuns ? "active" : ""}`}
              disabled={!digitizedRuns.length}
              onClick={() => setShowAllRuns((v) => !v)}
            >
              {showAllRuns
                ? ru ? `Все прогоны (${digitizedRuns.length})` : `All Runs (${digitizedRuns.length})`
                : ru ? `Ключевые точки (${PSI_TEST_RUNS.length})` : `Key Runs (${PSI_TEST_RUNS.length})`}
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
                  {refLoc.isCalibrated
                    ? `${o2Pct}% (${ru ? "SIBAL ref" : "SIBAL ref"} ~${effectiveLoi}%)`
                    : `${o2Pct}% O₂`}
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
              <span>
                <i style={{ background: "#ff7a6b" }} /> {ru ? "Горение" : "Flame"}
              </span>
              <span>
                <i style={{ background: "#ffc46b" }} /> {ru ? "Тление" : "Cool/Smolder"}
              </span>
              <span>
                <i style={{ background: "#63e2b7" }} /> {ru ? "Затухание" : "Quenched"}
              </span>
            </div>

            <Button type="button" variant="outline" size="sm" onClick={onAsk}>
              {ru ? "Спросить ИИ об этих условиях" : "Ask AI About This Scenario"}
            </Button>
          </div>

          <div className="envelope-chart-wrap">
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="envelope-svg"
              role="img"
              aria-label={ru ? "Двумерная карта режимов горения NASA PSI" : "NASA PSI 2D Combustion Regime Map"}
            >
              {[15, 20, 25, 30, 35, 40, 45].map((o2Val) => {
                const y = o2ToY(o2Val)
                return (
                  <g key={o2Val}>
                    <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    <text x={padL - 8} y={y + 4} textAnchor="end" fill="#8f8b87" fontSize="10">
                      {o2Val}%
                    </text>
                  </g>
                )
              })}

              {axisMode === "flow-o2" ? (
                <>
                  {[0, 10, 20, 30, 40, 50].map((fVal) => {
                    const x = flowToX(fVal)
                    return (
                      <g key={fVal}>
                        <line x1={x} y1={padT} x2={x} y2={svgH - padB} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                        <text x={x} y={svgH - 22} textAnchor="middle" fill="#8f8b87" fontSize="10">
                          {fVal}
                        </text>
                      </g>
                    )
                  })}
                  <text x={padL + plotW / 2} y={svgH - 6} textAnchor="middle" fill="#b3aba3" fontSize="10.5">
                    {ru
                      ? "Скорость обдува (см/с) · ориентирная U-кривая NASA BASS-II"
                      : "Forced Airflow Velocity (cm/s) · Schematic NASA BASS-II Ref"}
                  </text>

                  <polygon
                    points={uCurveFillStr}
                    fill={refLoc.isCalibrated ? "rgba(232, 93, 74, 0.1)" : "rgba(232, 93, 74, 0.04)"}
                  />
                  <polyline
                    points={uCurvePointsStr}
                    fill="none"
                    stroke="#ff9e64"
                    strokeWidth="2.2"
                    strokeDasharray={refLoc.isCalibrated ? undefined : "6 4"}
                    strokeOpacity={refLoc.isCalibrated ? 1 : 0.45}
                  />

                  <text x={svgW - padR - 8} y={padT + 14} textAnchor="end" fill="#ff9e8e" fontSize="10" fontWeight="600">
                    {ru ? "Устойчивое горение" : "Sustained Flame Spread"}
                  </text>
                  <text x={svgW - padR - 8} y={svgH - padB - 8} textAnchor="end" fill="#63e2b7" fontSize="10">
                    {refLoc.isCalibrated
                      ? ru
                        ? `Ориентир затухания BASS-II (<${effectiveLoi}% O₂)`
                        : `BASS-II Schematic Ref (<${effectiveLoi}% O₂)`
                      : ru
                        ? "Ориентир BASS-II (только 0g, 101.3 кПа)"
                        : "BASS-II schematic ref (0g, 101.3 kPa only)"}
                  </text>
                </>
              ) : (
                <>
                  {(pressMax === 320 ? [50, 101, 150, 200, 250, 300] : [30, 50, 70, 90, 110]).map((pKpa) => {
                    const x = pressToX(pKpa)
                    return (
                      <g key={pKpa}>
                        <line x1={x} y1={padT} x2={x} y2={svgH - padB} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                        <text x={x} y={svgH - 22} textAnchor="middle" fill="#8f8b87" fontSize="10">
                          {pKpa}
                        </text>
                      </g>
                    )
                  })}
                  <text x={padL + plotW / 2} y={svgH - 6} textAnchor="middle" fill="#b3aba3" fontSize="10.5">
                    {ru
                      ? "Давление отсека (кПа) · Конверт норм NASA SEA"
                      : "Cabin Pressure (kPa) · NASA SEA Exploration Envelope"}
                  </text>

                  <polygon
                    points={`${pressToX(25)},${o2ToY(46)} ${pressToX(125)},${o2ToY(46)} ${pressToX(125)},${o2ToY(21)} ${pressToX(56.5)},${o2ToY(34)} ${pressToX(25)},${o2ToY(36)}`}
                    fill="rgba(232, 93, 74, 0.12)"
                    stroke="rgba(232, 93, 74, 0.45)"
                    strokeDasharray="5 3"
                  />
                  <rect
                    x={pressToX(52)}
                    y={o2ToY(36)}
                    width={Math.max(4, pressToX(64) - pressToX(52))}
                    height={o2ToY(30) - o2ToY(36)}
                    rx="5"
                    fill="rgba(255, 170, 76, 0.16)"
                    stroke="#ffaa4c"
                  />
                  <text x={pressToX(58)} y={o2ToY(36) - 5} textAnchor="middle" fill="#ffbe73" fontSize="10" fontWeight="600">
                    {ru ? "Луна SEA (34% O₂)" : "Lunar SEA (34% O₂)"}
                  </text>
                </>
              )}

              <text
                x={14}
                y={padT + plotH / 2}
                textAnchor="middle"
                fill="#b3aba3"
                fontSize="10.5"
                transform={`rotate(-90 14 ${padT + plotH / 2})`}
              >
                O₂ (%)
              </text>

              {plottedRuns.length === 0 && (
                <text
                  x={padL + plotW / 2}
                  y={padT + plotH / 2 - 4}
                  textAnchor="middle"
                  fill="#b3aba3"
                  fontSize="11.5"
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
                const color = REGIME_COLORS[run.regime]
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
                      <circle cx={cx} cy={cy} r="10" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="2 2" />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? "6" : "4.2"}
                      fill={color}
                      stroke="#141210"
                      strokeWidth="1.5"
                    />
                    {isSelected && (
                      <text
                        x={cx > svgW - 140 ? cx - 9 : cx + 9}
                        y={cy + 4}
                        textAnchor={cx > svgW - 140 ? "end" : "start"}
                        fill="#fff"
                        fontSize="10.5"
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
                x={Math.min(svgW - 155, Math.max(padL + 4, userX + 8))}
                y={Math.max(padT + 2, userY - 24)}
                width="138"
                height="20"
                rx="5"
                fill="#ff9e64"
              />
              <text
                x={Math.min(svgW - 155, Math.max(padL + 4, userX + 8)) + 69}
                y={Math.max(padT + 2, userY - 24) + 13.5}
                textAnchor="middle"
                fill="#181210"
                fontSize="10"
                fontWeight="700"
              >
                {axisMode === "flow-o2"
                  ? `${flowCms} ${ru ? "см/с" : "cm/s"} · ${o2Pct}% O₂`
                  : `${pressureKpa} ${ru ? "кПа" : "kPa"} · ${o2Pct}% O₂`}
              </text>
            </svg>

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
                    <span className="regime-pill" style={{ borderColor: REGIME_COLORS[activeRun.regime], color: REGIME_COLORS[activeRun.regime] }}>
                      {regimeLabels[activeRun.regime]}
                    </span>
                    <strong>
                      {activeRun.runCode} ({ru ? activeRun.fuelLabelRu : activeRun.fuelLabel})
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
                    ? `${activeRun.pressureKpa} ${ru ? "кПа" : "kPa"}`
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

        <div className={`envelope-status status-${riskState}`}>
          <div>
            <strong>
              {riskState === "danger" ? <Flame size={16} /> : riskState === "caution" ? <Wind size={16} /> : <ShieldCheck size={16} />}
              {riskTitle}
            </strong>
            <p>{riskDetail}</p>
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
