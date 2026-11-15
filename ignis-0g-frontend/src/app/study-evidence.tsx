import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Background, Controls, ReactFlow, type Edge, type Node } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { studyQueries } from "@/api/queries"
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  Download,
  FlaskConical,
  Network,
  ShieldCheck,
} from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { localizeProvenance } from "@/domain/knowledge"
import type { Dataset, Media, ModelingRun, Relation, SafetyImplication, StudySummary } from "@/domain/types"
import { useLocale, type Locale } from "@/i18n"
import { QueryFailure, QueryLoading } from "./query-feedback"

const formatEn = new Intl.NumberFormat("en", { maximumFractionDigits: 3 })
const formatRu = new Intl.NumberFormat("ru", { maximumFractionDigits: 3 })

export function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function exportDatasetCsv(dataset: Dataset) {
  const header = ["series_id", "series_label", dataset.x_label, `${dataset.y_label}${dataset.units.y ? ` (${dataset.units.y})` : ""}`]
  const rows = dataset.series.flatMap((s) =>
    s.points.map((p) => [s.id, s.label, String(p.x), p.y === null ? "" : String(p.y)]),
  )
  const csv = [header, ...rows]
    .map((cols) => cols.map((c) => `"${c.replace(/"/g, '""')}"`).join(","))
    .join("\n")
  downloadFile(`${dataset.id}.csv`, csv, "text/csv;charset=utf-8")
}

function exportDatasetJson(dataset: Dataset) {
  downloadFile(`${dataset.id}.json`, JSON.stringify(dataset, null, 2), "application/json;charset=utf-8")
}

export function ModelingRuns({ runs }: { runs: ModelingRun[] }) {
  const locale = useLocale()
  if (!runs.length) return null

  return (
    <section className="panel panel-padding">
      <div className="panel-head-row">
        <h2>{locale === "ru" ? "Опубликованные условия для моделирования" : "Published Modeling Boundary Conditions"}</h2>
        <Button size="sm" variant="outline" onClick={() => downloadFile("ignis-modeling-params.json", JSON.stringify(runs, null, 2), "application/json")}>
          <Download size={14} /> JSON
        </Button>
      </div>
      <div className="compare-table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{locale === "ru" ? "Серия" : "Case"}</th>
              <th>{locale === "ru" ? "Сопло, мм" : "Nozzle, mm"}</th>
              <th>{locale === "ru" ? "CH₄ в топливе, %" : "CH₄ in fuel, %"}</th>
              <th>{locale === "ru" ? "Поток топлива, см/с" : "Fuel flow, cm/s"}</th>
              <th>{locale === "ru" ? "Поток воздуха, см/с" : "Coflow air, cm/s"}</th>
              <th>{locale === "ru" ? "Источник" : "Source"}</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run) => (
              <tr key={run.case}>
                <td>{run.case}</td><td>{run.nozzle_inner_diameter_mm}</td><td>{run.methane_in_fuel_pct}</td>
                <td>{run.fuel_flow_cms.join("–")}</td><td>{run.coflow_air_cms.join("–")}</td>
                <td><a href={run.source_url} target="_blank" rel="noreferrer">{run.locator}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted">
        {locale === "ru"
          ? "Граничные условия отдельных серий SLICE в микрогравитации. Для полного расчёта сверяйте постановку с источником."
          : "Boundary conditions for SLICE microgravity cases. Verify the full computational setup against the primary source."}
      </p>
    </section>
  )
}

export function StudyMeasurements({
  studyId,
  chart = false,
  selectedDatasetId: controlledDatasetId,
  onSelectDatasetId,
  selectedSeriesId: controlledSeriesId,
  onSelectSeriesId,
}: {
  studyId: string
  chart?: boolean
  selectedDatasetId?: string
  onSelectDatasetId?: (id: string) => void
  selectedSeriesId?: string
  onSelectSeriesId?: (id: string) => void
}) {
  const locale = useLocale()
  const format = locale === "ru" ? formatRu : formatEn
  const query = useQuery(studyQueries.datasets(studyId, locale))
  const [localDatasetId, setLocalDatasetId] = useState<string>("")
  const [localSeriesId, setLocalSeriesId] = useState<string>("")

  const selectedDatasetId = controlledDatasetId ?? localDatasetId
  const selectedSeriesId = controlledSeriesId ?? localSeriesId
  const setSelectedDatasetId = onSelectDatasetId ?? setLocalDatasetId
  const setSelectedSeriesId = onSelectSeriesId ?? setLocalSeriesId

  const datasets = query.data ?? []
  const dataset = datasets.find((d) => d.id === selectedDatasetId) ?? datasets[0]
  const activeSeries =
    dataset?.series.find((s) => s.id === selectedSeriesId) ?? dataset?.series[0]

  const maxY = useMemo(() => {
    if (!activeSeries) return 1
    const vals = activeSeries.points.map((p) => p.y).filter((y): y is number => y !== null && Number.isFinite(y))
    return vals.length ? Math.max(...vals, 0.001) : 1
  }, [activeSeries])

  if (query.isPending) return <QueryLoading label={locale === "ru" ? "Загрузка наборов данных…" : "Loading datasets…"} />
  if (query.isError) {
    return (
      <QueryFailure
        label={locale === "ru" ? "Не удалось загрузить экспериментальные данные." : "Failed to load experimental datasets."}
        fetching={query.isFetching}
        retry={() => void query.refetch()}
      />
    )
  }

  return (
    <section className="panel panel-padding measurement-panel">
      <div className="panel-head-row">
        <h2>
          {chart ? <ChartNoAxesCombined size={17} /> : <FlaskConical size={17} />}
          {chart
            ? locale === "ru" ? "Визуализация рядов данных" : "Data Series Visualization"
            : locale === "ru" ? "Экспериментальные данные и экспорт" : "Experimental Datasets & Export"}
        </h2>
        {dataset && (
          <div className="export-actions">
            <Button type="button" variant="outline" size="sm" onClick={() => exportDatasetCsv(dataset)}>
              <Download size={14} /> CSV
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => exportDatasetJson(dataset)}>
              <Download size={14} /> JSON
            </Button>
          </div>
        )}
      </div>

      {!dataset ? (
        <p className="muted">
          {locale === "ru"
            ? "Для этого исследования в базе пока нет оцифрованных числовых рядов. Вы можете изучить текстовые выводы, условия среды или запросить данные у ИИ-ассистента."
            : "No digitized numeric series are available for this study yet. You can review the findings, atmospheric conditions, or query the AI Assistant."}
        </p>
      ) : (
        <>
          <p className="muted">
            {dataset.title} · {locale === "ru" ? "Происхождение:" : "Provenance:"}{" "}
            <strong>{localizeProvenance(dataset.provenance, locale)}</strong>
            {dataset.locator ? ` · ${dataset.locator}` : ""}
          </p>
          {dataset.notes && <p className="muted">{dataset.notes}</p>}

          <div className="data-toolbar">
            {datasets.length > 1 && (
              <label>
                {locale === "ru" ? "Набор данных" : "Dataset"}
                <select
                  value={dataset.id}
                  onChange={(e) => {
                    setSelectedDatasetId(e.target.value)
                    setSelectedSeriesId("")
                  }}
                >
                  {datasets.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title}
                    </option>
                  ))}
                </select>
              </label>
            )}
            {dataset.series.length > 1 && activeSeries && (
              <label>
                {locale === "ru" ? "Серия измерений" : "Measurement series"}
                <select value={activeSeries.id} onChange={(e) => setSelectedSeriesId(e.target.value)}>
                  {dataset.series.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          {activeSeries && chart ? (
            <>
              <div className="measurement-axis" aria-hidden="true">
                <span>{dataset.x_label}</span>
                <div>
                  <span>0</span>
                  <span>{format.format(maxY / 2)}</span>
                  <span>
                    {format.format(maxY)} {dataset.units.y ?? ""}
                  </span>
                </div>
              </div>
              <ul className="measurement-chart" aria-label={dataset.title}>
                {activeSeries.points.map((point, idx) => (
                  <li key={`${String(point.x)}-${idx}`}>
                    <span>
                      {String(point.x)}
                      {dataset.units.x ? ` ${dataset.units.x}` : ""}
                    </span>
                    <div className="measurement-track" aria-hidden="true">
                      <div
                        style={{
                          width: point.y !== null ? `${Math.max(2, (point.y / maxY) * 100)}%` : "0%",
                        }}
                      />
                    </div>
                    <strong>
                      {point.y !== null
                        ? `${format.format(point.y)}${dataset.units.y ? ` ${dataset.units.y}` : ""}`
                        : locale === "ru" ? "н/д" : "N/A"}
                    </strong>
                  </li>
                ))}
              </ul>
            </>
          ) : activeSeries ? (
            <table className="measurement-table">
              <thead>
                <tr>
                  <th scope="col">
                    {dataset.x_label}
                    {dataset.units.x ? `, ${dataset.units.x}` : ""}
                  </th>
                  <th scope="col">
                    {dataset.y_label}
                    {dataset.units.y ? `, ${dataset.units.y}` : ""}
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeSeries.points.map((point, idx) => (
                  <tr key={`${String(point.x)}-${idx}`}>
                    <th scope="row">{String(point.x)}</th>
                    <td>{point.y !== null ? format.format(point.y) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </>
      )}
    </section>
  )
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

export function StudyNexusGraph({
  studyId,
  onSelectStudy,
}: {
  studyId: string
  onSelectStudy: (id: string) => void
}) {
  const locale = useLocale()
  const graphQuery = useQuery(studyQueries.graph(studyId, 1, locale))

  const { nodes, edges } = useMemo(() => {
    const data = graphQuery.data
    if (!data) return { nodes: [] as Node[], edges: [] as Edge[] }
    const others = data.nodes.filter((n) => n.id !== studyId)
    const radius = Math.max(170, others.length * 36)
    const flowNodes: Node[] = data.nodes.map((n) => {
      if (n.id === studyId) {
        return {
          id: n.id,
          position: { x: 240, y: 150 },
          data: { label: n.label },
          style: {
            background: "#2b1e16",
            borderColor: "#f5a16e",
            color: "#fafafa",
            fontWeight: 600,
            borderRadius: 12,
            padding: 8,
            width: 190,
          },
        }
      }
      const idx = others.findIndex((o) => o.id === n.id)
      const angle = (2 * Math.PI * idx) / Math.max(others.length, 1) - Math.PI / 2
      return {
        id: n.id,
        position: {
          x: Math.round(240 + Math.cos(angle) * radius),
          y: Math.round(150 + Math.sin(angle) * (radius * 0.62)),
        },
        data: { label: n.label },
        style: {
          background: "#1b1d25",
          borderColor: "#3a3f4d",
          color: "#ededed",
          borderRadius: 12,
          padding: 8,
          width: 175,
          cursor: "pointer",
        },
      }
    })
    const flowEdges: Edge[] = data.edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      label: relationLabels[locale][e.type] ?? e.type,
      animated: e.type === "supports" || e.type === "complements",
      labelStyle: { fill: "#c2c7d4", fontSize: 11 },
      labelBgStyle: { fill: "#15171e", fillOpacity: 0.92 },
      style: { stroke: e.type === "contradicts" ? "#ff7a6b" : "#7c8599" },
    }))
    return { nodes: flowNodes, edges: flowEdges }
  }, [graphQuery.data, studyId, locale])

  if (graphQuery.isPending) return <QueryLoading label={locale === "ru" ? "Загрузка графа связей Nexus…" : "Loading Nexus knowledge graph…"} />
  if (graphQuery.isError) {
    return (
      <QueryFailure
        label={locale === "ru" ? "Не удалось загрузить граф связей." : "Failed to load the knowledge graph."}
        fetching={graphQuery.isFetching}
        retry={() => void graphQuery.refetch()}
      />
    )
  }

  return (
    <section className="panel panel-padding">
      <h2>
        <Network size={17} /> {locale === "ru" ? "Граф научных связей (Nexus)" : "Scientific Knowledge Graph (Nexus)"}
      </h2>
      <p className="muted">
        {locale === "ru"
          ? "Нажмите на соседний узел, чтобы перейти к связанному исследованию."
          : "Click an adjacent node to navigate to the related investigation."}
      </p>
      {nodes.length <= 1 ? (
        <p className="muted">
          {locale === "ru"
            ? "Проверенные межэкспериментальные связи для этого узла пока не добавлены."
            : "No verified cross-study relations have been added for this node yet."}
        </p>
      ) : (
        <div className="nexus-canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            nodesConnectable={false}
            onNodeClick={(_, node) => {
              if (node.id !== studyId) onSelectStudy(node.id)
            }}
          >
            <Background gap={18} size={1} />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
      )}
    </section>
  )
}

export function StudySafety({
  implications,
  studyId,
  relations = [],
  studies = [],
  onSelectStudy,
}: {
  implications: SafetyImplication[]
  studyId?: string
  relations?: Relation[]
  studies?: StudySummary[]
  onSelectStudy?: (id: string) => void
}) {
  const locale = useLocale()
  const relatedPeers = relations
    .map((rel) => {
      const peerId = rel.from_study_id === studyId ? rel.to_study_id : rel.from_study_id
      const peer = studies.find((s) => s.id === peerId)
      return {
        id: peerId,
        title: peer ? peer.title : peerId,
        explanation: rel.explanation,
      }
    })
    .filter((item, idx, arr) => item.id !== studyId && arr.findIndex((x) => x.id === item.id) === idx)

  const fallbackTech = [
    {
      match: ["same-same-r", "daft"],
      url: "https://ntrs.nasa.gov/citations/20070031686",
      label: "SAME & DAFT",
      descRu: "исследуют частицы дыма и фоновые аэрозоли для разработки датчиков.",
      descEn: "investigate smoke particle size distributions and background aerosols for spacecraft detector design.",
    },
    {
      match: ["flex-1", "flex"],
      url: "https://psi.nasa.gov/physci/repo/data/investigations/PSI-69",
      label: "FLEX",
      descRu: "изучает подавление пламени капель газами, включая CO₂ и He.",
      descEn: "studies droplet flame suppression using gaseous agents including CO₂ and He.",
    },
    {
      match: [],
      url: "https://ntrs.nasa.gov/citations/20100001376",
      label: locale === "ru" ? "Разработка водяного тумана для МКС" : "ISS Water Mist Portable Fire Extinguisher",
      descRu: "— технология тушения для замкнутых космических и наземных отсеков.",
      descEn: "— spacecraft fire-suppression technology transferable to enclosed compartments.",
    },
  ].filter((item) => !studyId || !item.match.includes(studyId))

  return (
    <section className="panel panel-padding">
      <h2>
        <ShieldCheck size={17} />{" "}
        {locale === "ru" ? "Выводы для пожарной безопасности" : "Fire Safety Implications"}
      </h2>
      {implications.length > 0 ? (
        <ul className="safety-list">
          {implications.map((imp) => <li key={imp.finding_id}>{imp.text}</li>)}
        </ul>
      ) : (
        <p className="muted">
          {locale === "ru"
            ? "В каталоге пока нет отдельных выводов для этой карточки. Откройте первоисточники или задайте вопрос ассистенту."
            : "No standalone fire-safety implications are listed for this card yet. Open the primary sources or query the AI Assistant."}
        </p>
      )}
      <h3>{locale === "ru" ? "Связанные исследования и технологии" : "Related Investigations & Technologies"}</h3>
      <ul className="safety-list">
        {relatedPeers.map((peer) => (
          <li key={peer.id}>
            {onSelectStudy ? (
              <button type="button" className="compare-study-link" onClick={() => onSelectStudy(peer.id)}>
                {peer.title}
              </button>
            ) : (
              <strong>{peer.title}</strong>
            )}
            {" — "}
            {peer.explanation}
          </li>
        ))}
        {fallbackTech.map((tech) => (
          <li key={tech.url}>
            <a href={tech.url} target="_blank" rel="noreferrer">
              {tech.label}
            </a>{" "}
            {locale === "ru" ? tech.descRu : tech.descEn}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function StudyVideo({ studyId, media }: { studyId: string; media: Media[] }) {
  const locale = useLocale()
  const isFlex1 = studyId === "flex-1" || studyId === "flex"
  const images = media.filter((m) => m.media_type === "image")
  const videos = media.filter((m) => m.media_type === "video")
  if (!isFlex1 && videos.length === 0 && images.length === 0) return null

  return (
    <section className="panel panel-padding study-video">
      <h2>{locale === "ru" ? "Материалы NASA" : "NASA Media & Imagery"}</h2>
      {images.length > 0 && (
        <div className="study-media-grid">
          {images.map((image) => (
            <figure key={image.id} className="study-media-card">
              <a
                href={image.url}
                target="_blank"
                rel="noreferrer"
                aria-label={locale === "ru" ? `Открыть изображение: ${image.caption}` : `Open image: ${image.caption}`}
              >
                <img src={image.url} alt={image.caption} loading="lazy" />
              </a>
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
      {isFlex1 && (
        <a href="https://svs.gsfc.nasa.gov/11318/" target="_blank" rel="noreferrer">
          {locale === "ru" ? "Видео FLEX на NASA SVS" : "FLEX Video on NASA SVS"} <ArrowUpRight size={14} />
        </a>
      )}
      {videos.map((v) => (
        <div key={v.id} className="media-link-row">
          <a href={v.url} target="_blank" rel="noreferrer">
            {v.caption || (locale === "ru" ? "Видеозапись эксперимента" : "Experiment video recording")}{" "}
            <ArrowUpRight size={14} />
          </a>
        </div>
      ))}
    </section>
  )
}
