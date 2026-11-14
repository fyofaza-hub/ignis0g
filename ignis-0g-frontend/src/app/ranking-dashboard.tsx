import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Background, Controls, ReactFlow, type Edge, type Node } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { studyQueries } from "@/api/queries"
import { GitCompare, Network, SlidersHorizontal } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { getMissionScenarios, type MissionScenarioId } from "@/domain/knowledge"
import type { Scenario } from "@/domain/types"
import { useLocale } from "@/i18n"
import { ScenarioResults } from "./scenario-results"

function OverviewKnowledgeGraph({ onSelectStudy }: { onSelectStudy: (id: string) => void }) {
  const locale = useLocale()
  const ru = locale === "ru"
  const graphQuery = useQuery(studyQueries.graph(undefined, 1, locale))

  const { nodes, edges } = useMemo(() => {
    const data = graphQuery.data
    if (!data || !data.edges.length) return { nodes: [] as Node[], edges: [] as Edge[] }
    const connectedIds = new Set<string>()
    data.edges.forEach((e) => {
      connectedIds.add(e.source)
      connectedIds.add(e.target)
    })
    const activeNodes = data.nodes.filter((n) => connectedIds.has(n.id))
    const radiusX = 280
    const radiusY = 125
    const flowNodes: Node[] = activeNodes.map((n, idx) => {
      const angle = (2 * Math.PI * idx) / Math.max(activeNodes.length, 1) - Math.PI / 2
      return {
        id: n.id,
        position: {
          x: Math.round(310 + Math.cos(angle) * radiusX),
          y: Math.round(145 + Math.sin(angle) * radiusY),
        },
        data: { label: n.label.split(" (")[0] },
        style: {
          background: "#201b18",
          borderColor: "rgba(255, 148, 102, 0.38)",
          color: "#f5efea",
          fontWeight: 600,
          fontSize: 12,
          borderRadius: 10,
          padding: "6px 10px",
          width: 155,
          cursor: "pointer",
        },
      }
    })
    const flowEdges: Edge[] = data.edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      animated: e.type === "supports" || e.type === "complements",
      style: { stroke: e.type === "contradicts" ? "#ff7a6b" : "#a1958c", strokeWidth: 1.5 },
    }))
    return { nodes: flowNodes, edges: flowEdges }
  }, [graphQuery.data])

  if (!nodes.length) return null

  return (
    <section className="panel panel-padding">
      <div className="panel-head-row">
        <h2>
          <Network size={17} />{" "}
          {ru
            ? "Карта межэкспериментальных связей NASA PSI (Knowledge Graph)"
            : "NASA PSI Cross-Experiment Knowledge Graph (Nexus)"}
        </h2>
        <span className="muted">
          {ru ? "Нажмите на узел, чтобы открыть карточку эксперимента" : "Click any node to open the experiment dossier"}
        </span>
      </div>
      <div className="nexus-canvas" style={{ height: 310 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          nodesConnectable={false}
          onNodeClick={(_, node) => onSelectStudy(node.id)}
        >
          <Background gap={20} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </section>
  )
}

export function RankingDashboard({
  scenario,
  conditions,
  onScenarioChange,
  compareIds,
  onToggleCompare,
  onSelectStudy,
  onOpenCompare,
  onOpenEnvironments,
  onOpenAllStudies,
}: {
  scenario: MissionScenarioId | null
  conditions: Scenario
  onScenarioChange: (id: MissionScenarioId) => void
  compareIds: string[]
  onToggleCompare: (id: string) => void
  onSelectStudy: (id: string) => void
  onOpenCompare: () => void
  onOpenEnvironments: () => void
  onOpenAllStudies: () => void
}) {
  const locale = useLocale()
  const ru = locale === "ru"
  const scenarios = getMissionScenarios(locale)

  return (
    <div className="section-view">
      <section className="panel panel-padding">
        <div className="dashboard-hero" style={{ marginBottom: 8 }}>
          <div>
            <h1>
              {ru
                ? "Каталог и ранжирование исследований NASA PSI"
                : "NASA PSI Combustion Research Catalog & Scenario Ranking"}
            </h1>
            <p className="muted">
              {ru ? "Текущий профиль:" : "Active target profile:"}{" "}
              <strong>{conditions.o2_pct}% O₂</strong> ·{" "}
              <strong>
                {conditions.pressure_kpa} {ru ? "кПа" : "kPa"}
              </strong>{" "}
              · {ru ? "обдув" : "airflow"}{" "}
              <strong>
                {conditions.flow_cms} {ru ? "см/с" : "cm/s"}
              </strong>{" "}
              · {ru ? "гравитация" : "gravity"} <strong>{conditions.gravity_g} g</strong>
            </p>
          </div>
          <div className="ranking-card-actions">
            <Button variant="outline" size="sm" onClick={onOpenEnvironments}>
              <SlidersHorizontal size={14} /> {ru ? "2D-симулятор и среды O₂" : "2D Simulator & O₂ Regimes"}
            </Button>
            <Button variant="outline" size="sm" onClick={onOpenAllStudies}>
              {ru ? "Все исследования" : "All Studies"}
            </Button>
            {compareIds.length >= 2 && (
              <Button size="sm" onClick={onOpenCompare}>
                <GitCompare size={14} /> {ru ? `Сравнить (${compareIds.length})` : `Compare (${compareIds.length})`}
              </Button>
            )}
          </div>
        </div>

        <div className="scenario-pills" role="group" aria-label={ru ? "Сценарии миссии" : "Mission scenarios"}>
          {scenarios.map((item) => (
            <button
              key={item.id}
              type="button"
              className="scenario-pill"
              aria-pressed={scenario === item.id}
              onClick={() => onScenarioChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <ScenarioResults
        scenario={conditions}
        onSelectStudy={onSelectStudy}
        compareIds={compareIds}
        onToggleCompare={onToggleCompare}
      />

      <OverviewKnowledgeGraph onSelectStudy={onSelectStudy} />
    </div>
  )
}
