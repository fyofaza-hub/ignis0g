import { getLocale, type Locale } from "@/i18n"
import type {
  ChatRequest,
  ChatResponse,
  Citation,
  CompareItem,
  CompareRequest,
  CompareResponse,
  Graph,
  Scenario,
  ScenarioStudy,
} from "@/domain/types"
import { getQuickMeta } from "@/domain/knowledge"
import {
  getDatasetsForStudy,
  getMockRelations,
  getMockStudies,
  getMockStudyDetail,
} from "./data"
import { mockExperimentRuns } from "./experiment-runs-data"

function notFound(code: string, message: string) {
  return Response.json(
    { error: { code, message, request_id: "mock-req", details: [] } },
    { status: 404 },
  )
}

function detectResponseLocale(text?: string | null): Locale {
  if (text && /[А-Яа-яЁё]/.test(text)) return "ru"
  if (text && /[A-Za-z]{3,}/.test(text) && !/[А-Яа-яЁё]/.test(text)) return getLocale()
  return getLocale()
}

function buildGraph(locale: Locale, studyId?: string, depth = 1): Graph {
  const studies = getMockStudies(locale)
  const relations = getMockRelations(locale)
  const titleMap = new Map(studies.map((s) => [s.id, s.title]))
  const selected = new Set<string>()
  if (!studyId) {
    studies.slice(0, 50).forEach((s) => selected.add(s.id))
  } else {
    selected.add(studyId)
    let frontier = new Set<string>([studyId])
    for (let d = 0; d < depth; d++) {
      const next = new Set<string>()
      for (const rel of relations) {
        if (frontier.has(rel.from_study_id) && !selected.has(rel.to_study_id)) next.add(rel.to_study_id)
        if (frontier.has(rel.to_study_id) && !selected.has(rel.from_study_id)) next.add(rel.from_study_id)
      }
      next.forEach((id) => selected.add(id))
      frontier = next
    }
  }
  const nodes = Array.from(selected)
    .sort()
    .map((id) => ({ id, type: "study" as const, label: titleMap.get(id) ?? id }))
  const edges = relations
    .filter((r) => selected.has(r.from_study_id) && selected.has(r.to_study_id))
    .map((r) => ({
      id: r.id,
      source: r.from_study_id,
      target: r.to_study_id,
      type: r.relation_type,
      explanation: r.explanation,
      source_id: r.source_id,
      source_url: r.source_url,
      evidence: r.evidence,
    }))
  return { nodes, edges, truncated: false }
}

function handleChat(body: ChatRequest): ChatResponse {
  const locale = detectResponseLocale(body.message)
  const ru = locale === "ru"
  const q = body.message.toLowerCase()
  const detail = body.study_id ? getMockStudyDetail(body.study_id, locale) : undefined
  const relations = getMockRelations(locale)

  if (body.study_id && !detail) {
    return {
      status: "insufficient_evidence",
      answer: ru
        ? "Исследование не найдено в локальном каталоге."
        : "Study not found in the local catalog.",
      citations: [],
      related_study_ids: [],
      suggested_questions: [],
    }
  }

  if (detail) {
    const meta = getQuickMeta(detail.id, locale)
    const src = detail.sources[0]
    const citation: Citation = {
      chunk_id: `chunk-${detail.id}`,
      source_id: src.id,
      title: src.title,
      url: src.url,
      excerpt: detail.findings[0]?.evidence ?? detail.description,
      locator: detail.findings[0]?.locator ?? detail.datasets[0]?.locator ?? null,
    }
    const o2 = meta?.conditions.o2_pct
    const p = meta?.conditions.pressure_kpa
    const o2Text =
      o2 && o2[0] !== null
        ? `${o2[0]}–${o2[1] ?? o2[0]}% O₂`
        : ru
          ? "диапазон O₂ уточняется"
          : "O₂ range reported per run"
    const pText =
      p && p[0] !== null
        ? `${p[0]}–${p[1] ?? p[0]} ${ru ? "кПа" : "kPa"}`
        : ru
          ? "давление уточняется"
          : "pressure reported per run"

    let answer = ru
      ? `${detail.description} [1]\n\n**Ключевое влияние на пожарную безопасность:** ${detail.safety_implications[0]?.text ?? "см. отчёт NASA."}`
      : `${detail.description} [1]\n\n**Key Spacecraft Fire Safety Implication:** ${detail.safety_implications[0]?.text ?? "see NASA technical report."}`

    if (/услови|кислород|o2|давлен|поток|топлив|оборуд|стойк|cir|msg|condition|oxygen|pressure|flow|fuel|hardware|rack/i.test(q)) {
      answer = ru
        ? `**Условия и установка (${detail.title}):**\n- Установка: ${meta?.facility ?? "МКС"}\n- Топливо/образец: ${meta?.fuelMaterial ?? "см. методологию"}\n- Атмосфера: ${o2Text}, ${pText}\n- Методология: ${detail.methodology ?? "—"} [1]`
        : `**Experimental Conditions & Hardware (${detail.title}):**\n- Facility: ${meta?.facility ?? "ISS"}\n- Fuel / Specimen: ${meta?.fuelMaterial ?? "see methodology"}\n- Atmosphere: ${o2Text}, ${pText}\n- Methodology: ${detail.methodology ?? "—"} [1]`
    } else if (/вывод|результат|итог|безопасн|лун|земл|finding|result|outcome|safety|lunar|moon|earth/i.test(q)) {
      answer = ru
        ? `**Основные выводы (${detail.title}):**\n${detail.description} [1]\n\n**Практическое значение:** ${detail.safety_implications[0]?.text ?? ""}`
        : `**Key Findings (${detail.title}):**\n${detail.description} [1]\n\n**Engineering Implication:** ${detail.safety_implications[0]?.text ?? ""}`
    }

    const relatedIds = relations
      .filter((r) => r.from_study_id === detail.id || r.to_study_id === detail.id)
      .map((r) => (r.from_study_id === detail.id ? r.to_study_id : r.from_study_id))
      .slice(0, 3)

    return {
      status: "answered",
      answer,
      citations: [citation],
      related_study_ids: relatedIds,
      suggested_questions: ru
        ? [
            `Какие условия O₂ и давления использовались в ${detail.category}?`,
            "Как эти результаты влияют на пожарную безопасность лунной базы?",
          ]
        : [
            `What O₂ and pressure conditions were tested in ${detail.category}?`,
            "How do these findings affect Lunar habitat fire safety (34% O₂)?",
          ],
    }
  }

  const studies = getMockStudies(locale)
  const stopWords = new Set(["what", "which", "how", "can", "from", "these", "for", "and", "the", "are", "with", "какие", "как", "для", "при", "или", "что", "чем", "этих"])
  const tokens = q
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !stopWords.has(t))

  let ranked = studies
    .map((s) => {
      const enDet = getMockStudyDetail(s.id, "en")
      const ruDet = getMockStudyDetail(s.id, "ru")
      const hay = `${s.id} ${s.title} ${enDet?.description ?? ""} ${ruDet?.description ?? ""} ${s.category} ${s.tags.join(" ")}`.toLowerCase()
      const hits = tokens.filter((t) => hay.includes(t)).length
      return { study: s, hits }
    })
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 3)

  if (!ranked.length) {
    ranked = ["flex-1", "bass-bass-ii-bass-m", "sofie-mist"]
      .map((id) => ({ study: studies.find((s) => s.id === id)!, hits: 1 }))
      .filter((x) => Boolean(x.study))
  }

  const citations: Citation[] = ranked.map(({ study }) => {
    const det = getMockStudyDetail(study.id, locale)!
    const src = det.sources[0]
    return {
      chunk_id: `chunk-${study.id}`,
      source_id: src.id,
      title: src.title,
      url: src.url,
      excerpt: det.findings[0]?.evidence || study.description,
      locator: det.findings[0]?.locator ?? det.datasets[0]?.locator ?? null,
    }
  })

  const lines = ranked.map(({ study }, idx) => `- **${study.title}** [${idx + 1}]: ${study.description}`)
  return {
    status: "answered",
    answer: ru
      ? `По базе NASA PSI наиболее релевантные исследования:\n\n${lines.join("\n")}`
      : `Most relevant studies across the NASA PSI catalog:\n\n${lines.join("\n")}`,
    citations,
    related_study_ids: ranked.map((r) => r.study.id),
    suggested_questions: ru
      ? [
          "Какие исследования наиболее важны для лунной базы (34% O₂)?",
          "Какие технологии применимы для пожарной безопасности на Земле?",
        ]
      : [
          "Which experiments are most critical for a Lunar habitat (34% O₂)?",
          "How does smoke particle size in 0g affect spacecraft fire detectors (SAME)?",
        ],
  }
}

function handleCompare(body: CompareRequest): CompareResponse {
  const locale = body.locale ?? detectResponseLocale(body.focus)
  const ru = locale === "ru"
  const details = body.study_ids.map((id) => getMockStudyDetail(id, locale)).filter((d): d is NonNullable<typeof d> => Boolean(d))
  if (details.length !== body.study_ids.length) {
    return {
      status: "insufficient_evidence",
      summary: ru
        ? "Одно или несколько исследований не найдены."
        : "One or more selected studies were not found.",
      similarities: [],
      differences: [],
      limitations: [
        ru
          ? "Проверьте идентификаторы выбранных исследований."
          : "Verify the selected study identifiers.",
      ],
      citations: [],
    }
  }

  const citations: Citation[] = details.map((d) => ({
    chunk_id: `chunk-${d.id}`,
    source_id: d.sources[0].id,
    title: d.sources[0].title,
    url: d.sources[0].url,
    excerpt: d.findings[0]?.evidence || d.description,
    locator: d.findings[0]?.locator ?? d.datasets[0]?.locator ?? null,
  }))

  const similarities: CompareItem[] = []
  const differences: CompareItem[] = []
  const metas = details.map((d) => getQuickMeta(d.id, locale))

  const sameCategory = new Set(details.map((d) => d.category)).size === 1
  if (sameCategory) {
    similarities.push({
      text: ru
        ? `Все выбранные исследования относятся к программе ${details[0].category} [${details.map((_, i) => i + 1).join("][")}].`
        : `All selected studies belong to the ${details[0].category} program [${details.map((_, i) => i + 1).join("][")}].`,
      citation_indices: details.map((_, i) => i + 1),
    })
  } else {
    differences.push({
      text: ru
        ? `Исследования принадлежат разным программам NASA: ${details.map((d) => d.category).join(" vs ")} [${details.map((_, i) => i + 1).join("][")}].`
        : `Studies span different NASA programs: ${details.map((d) => d.category).join(" vs ")} [${details.map((_, i) => i + 1).join("][")}].`,
      citation_indices: details.map((_, i) => i + 1),
    })
  }

  const facilities = metas.map((m) => m?.facility ?? (ru ? "н/д" : "N/A"))
  if (new Set(facilities).size === 1) {
    similarities.push({
      text: ru
        ? `Использована единая бортовая установка: ${facilities[0]} [${details.map((_, i) => i + 1).join("][")}].`
        : `Conducted inside the same orbital facility: ${facilities[0]} [${details.map((_, i) => i + 1).join("][")}].`,
      citation_indices: details.map((_, i) => i + 1),
    })
  } else {
    differences.push({
      text: ru
        ? `Различаются экспериментальные установки: ${details.map((d, i) => `${d.category} (${facilities[i]})`).join(", ")} [${details.map((_, i) => i + 1).join("][")}].`
        : `Different experimental hardware facilities: ${details.map((d, i) => `${d.category} (${facilities[i]})`).join(", ")} [${details.map((_, i) => i + 1).join("][")}].`,
      citation_indices: details.map((_, i) => i + 1),
    })
  }

  const states = metas.map((m) => m?.fuelState ?? (ru ? "н/д" : "N/A"))
  if (new Set(states).size === 1) {
    similarities.push({
      text: ru
        ? `Одинаковое агрегатное состояние топлива/образцов (${states[0]}) [${details.map((_, i) => i + 1).join("][")}].`
        : `Same fuel phase / specimen state (${states[0]}) [${details.map((_, i) => i + 1).join("][")}].`,
      citation_indices: details.map((_, i) => i + 1),
    })
  } else {
    differences.push({
      text: ru
        ? `Разные типы горючих сред: ${details.map((d, i) => `${d.title.split(" ")[0]} — ${metas[i]?.fuelMaterial ?? states[i]}`).join("; ")} [${details.map((_, i) => i + 1).join("][")}].`
        : `Different fuel types and materials: ${details.map((d, i) => `${d.title.split(" ")[0]} — ${metas[i]?.fuelMaterial ?? states[i]}`).join("; ")} [${details.map((_, i) => i + 1).join("][")}].`,
      citation_indices: details.map((_, i) => i + 1),
    })
  }

  return {
    status: "answered",
    summary: ru
      ? `Сравнение ${details.map((d) => d.title.split(" (")[0]).join(" и ")} по условиям среды, оборудованию и выводам пожарной безопасности.`
      : `Comparison of ${details.map((d) => d.title.split(" (")[0]).join(" and ")} across ambient conditions, flight hardware, and spacecraft fire safety implications.`,
    similarities,
    differences,
    limitations: [
      ru
        ? "В базе PSI отсутствуют прямые испытания при частичной гравитации (1/6g Луна, 3/8g Марс); сопоставление выполнено по 0g и наземному 1g."
        : "Direct partial-gravity combustion tests (1/6g Moon, 3/8g Mars) are absent in PSI; comparison is bounded by 0g flight and 1g ground baselines.",
    ],
    citations,
  }
}

export async function mockFetch(
  path: string,
  options: { method?: "GET" | "POST"; body?: string; signal?: AbortSignal } = {},
): Promise<Response> {
  options.signal?.throwIfAborted()
  const locale = getLocale()
  const studies = getMockStudies(locale)
  const relations = getMockRelations(locale)
  const [pathname, search = ""] = path.split("?")
  const params = new URLSearchParams(search)

  if (pathname === "/studies" && (options.method ?? "GET") === "GET") {
    const q = (params.get("q") ?? "").trim().toLowerCase()
    const category = params.get("category")
    const tag = params.get("tag")
    const limit = Number(params.get("limit") ?? 100)
    const offset = Number(params.get("offset") ?? 0)

    const filtered = studies.filter((s) => {
      if (category && s.category !== category) return false
      if (tag && !s.tags.includes(tag)) return false
      if (q) {
        const hay = `${s.id} ${s.title} ${s.description} ${s.category} ${s.tags.join(" ")}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })

    return Response.json({
      items: filtered.slice(offset, offset + limit),
      total: filtered.length,
      limit,
      offset,
    })
  }

  if (pathname === "/catalog/filters") {
    const categories = Array.from(new Set(studies.map((s) => s.category))).sort()
    const tags = Array.from(new Set(studies.flatMap((s) => s.tags))).sort()
    return Response.json({ categories, tags })
  }

  if (pathname === "/nexus/graph") {
    const studyId = params.get("study_id") ?? undefined
    const depth = Number(params.get("depth") ?? 1)
    if (studyId && !getMockStudyDetail(studyId, locale)) {
      return notFound("STUDY_NOT_FOUND", "Study not found")
    }
    return Response.json(buildGraph(locale, studyId, depth))
  }

  if (pathname === "/rank" && options.method === "POST") {
    const scenario = JSON.parse(options.body ?? "{}") as Scenario
    const keys = ["o2_pct", "pressure_kpa", "flow_cms", "gravity_g"] as const
    const ranked: ScenarioStudy[] = []
    for (const study of studies) {
      if (study.category === "Reference") continue
      const meta = getQuickMeta(study.id, locale)
      const detail = getMockStudyDetail(study.id, locale)
      const fuel = meta?.fuelState ?? null
      if (scenario.fuel && scenario.fuel !== fuel) continue
      if (scenario.pillar && !study.tags.some((tag) => tag.toLowerCase() === scenario.pillar?.toLowerCase())) continue
      const ranges: Pick<ScenarioStudy, (typeof keys)[number]> = {
        o2_pct: null,
        pressure_kpa: null,
        flow_cms: null,
        gravity_g: null,
      }
      const matched: string[] = []
      const outside: string[] = []
      const unknown: string[] = []
      for (const key of keys) {
        const range = detail?.conditions[key]
        if (!Array.isArray(range) || range[0] == null || range[1] == null) {
          unknown.push(key)
          continue
        }
        ranges[key] = [range[0], range[1]]
        const group = scenario[key] >= range[0] && scenario[key] <= range[1] ? matched : outside
        group.push(key)
      }
      const sourceUrls = [...new Set(detail?.sources.map((source) => source.url) ?? [])]
      const runs = mockExperimentRuns[study.id] ?? []
      const joint = runs
        .filter(
          (run) =>
            scenario.gravity_g === 0 &&
            run.oxygen_basis === "fixed" &&
            run.airflow_basis === "constant" &&
            run.pressure_atm !== null &&
            Math.abs(run.oxygen_vol_pct[0] - scenario.o2_pct) <= 1e-8 &&
            Math.abs(run.airflow_cms[0] - scenario.flow_cms) <= 1e-8 &&
            Math.abs(run.pressure_atm * 101.325 - scenario.pressure_kpa) <= 1e-6,
        )
        .map((run) => `${run.campaign}/${run.run_id}`)

      const limitations = ["range_matches_do_not_predict_fire_risk"]
      if (!joint.length) limitations.push("joint_conditions_not_established")
      if (unknown.length) limitations.push("missing_reported_parameters")
      if (scenario.gravity_g > 0 && ranges.gravity_g?.[0] === 0 && ranges.gravity_g?.[1] === 0) {
        limitations.push("microgravity_results_do_not_validate_partial_or_earth_gravity")
      }
      if (!sourceUrls.length) limitations.push("no_source_links")

      ranked.push({
        study_id: study.id,
        title: study.title,
        ...ranges,
        matched,
        outside,
        unknown,
        fuel,
        material: meta?.fuelMaterial ?? null,
        facility: meta?.facility ?? null,
        source_urls: sourceUrls,
        score: 25 * matched.length,
        ranking_version: "range-coverage-v1",
        score_basis: "independent_catalog_ranges",
        reported_parameter_count: keys.length - unknown.length,
        source_count: sourceUrls.length,
        run_count: runs.length,
        jointly_reported_run_ids: joint,
        limitations,
      })
    }
    return Response.json(
      ranked.sort(
        (a, b) =>
          b.score - a.score ||
          a.outside.length - b.outside.length ||
          Number((b.jointly_reported_run_ids?.length ?? 0) > 0) - Number((a.jointly_reported_run_ids?.length ?? 0) > 0) ||
          Number((b.run_count ?? 0) > 0) - Number((a.run_count ?? 0) > 0) ||
          (b.run_count ?? 0) - (a.run_count ?? 0) ||
          (b.source_count ?? 0) - (a.source_count ?? 0) ||
          a.title.localeCompare(b.title),
      ),
    )
  }

  if (pathname === "/assistant/chat" && options.method === "POST") {
    const body = JSON.parse(options.body ?? "{}") as ChatRequest
    return Response.json(handleChat(body))
  }

  if (pathname === "/assistant/compare" && options.method === "POST") {
    const body = JSON.parse(options.body ?? "{}") as CompareRequest
    return Response.json(handleCompare(body))
  }

  const match = /^\/studies\/([^/]+)(?:\/(datasets|relations|runs))?$/.exec(pathname)
  if (!match) return notFound("NOT_FOUND", "Route not found")

  const id = decodeURIComponent(match[1])
  const sub = match[2]
  const detail = getMockStudyDetail(id, locale)
  if (!detail) return notFound("STUDY_NOT_FOUND", "Study not found")

  if (!sub) return Response.json(detail)
  if (sub === "runs") return Response.json(mockExperimentRuns[id] ?? [])
  if (sub === "datasets") return Response.json(getDatasetsForStudy(id, detail.category, locale))
  if (sub === "relations") {
    return Response.json(relations.filter((r) => r.from_study_id === id || r.to_study_id === id))
  }

  return notFound("NOT_FOUND", "Route not found")
}
