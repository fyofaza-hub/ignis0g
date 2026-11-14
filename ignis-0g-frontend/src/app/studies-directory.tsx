import { useMemo, useState } from "react"
import { ArrowRight, FlaskConical, GitCompare, Search } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import type { StudySummary } from "@/domain/types"
import { useLocale, type Locale } from "@/i18n"

const pillars = ["All", "Prevention", "Detection", "Suppression", "Fundamental", "Reference"] as const

const programDescriptions: Record<Locale, Record<string, string>> = {
  en: {
    FLEX: "Liquid fuel droplet combustion, cool flames, and gas suppression (CIR / MDCA)",
    BASS: "Solid materials and fabrics in low forced flow (MSG / SPICE)",
    ACME: "Gaseous flames, spherical burners, and electric fields (CIR / CIA)",
    Saffire: "Full-scale fire spread aboard the uncrewed Cygnus spacecraft",
    SAME: "Smoke detection and aerosol morphology in microgravity (MSG)",
    SoFIE: "Solid fuel ignition and flammability at reduced pressure (CIR / SoFIE)",
    SPICE: "Smoke point of laminar coflow gas jet flames (MSG / SPICE)",
    DAFT: "Background aerosols and dust in crewed ISS modules (DustTrak / P-Trak)",
    Reference: "Reference atmospheric profiles for ISS, Earth, and lunar habitats",
  },
  ru: {
    FLEX: "Горение и тушение капель жидкого топлива (CIR / MDCA)",
    BASS: "Твёрдые материалы и ткани при слабом потоке (MSG / SPICE)",
    ACME: "Газовые пламёна, сферические горелки и электрополе (CIR / CIA)",
    Saffire: "Полномасштабные пожары на борту корабля Cygnus",
    SAME: "Обнаружение дыма и морфология аэрозолей (MSG)",
    SoFIE: "Воспламенение твёрдых тел при пониженном давлении (CIR / SoFIE)",
    SPICE: "Порог сажеобразования газовых струй в спутном потоке (MSG / SPICE)",
    DAFT: "Фоновые аэрозоли и пыль в обитаемых отсеках МКС (DustTrak / P-Trak)",
    Reference: "Нормативные профили атмосферы МКС, Земли и Луны",
  },
}

export function StudiesDirectory({
  studies,
  compareIds,
  onToggleCompare,
  onSelectStudy,
}: {
  studies: StudySummary[]
  compareIds: string[]
  onToggleCompare: (id: string) => void
  onSelectStudy: (id: string) => void
}) {
  const locale = useLocale()
  const [query, setQuery] = useState("")
  const [pillar, setPillar] = useState<string>("All")

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = studies.filter((s) => {
      if (pillar !== "All" && !s.tags.some((t) => t.toLowerCase().includes(pillar.toLowerCase()))) return false
      if (q) {
        const hay = `${s.id} ${s.title} ${s.description} ${s.category} ${s.tags.join(" ")}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })

    const map = new Map<string, StudySummary[]>()
    for (const study of filtered) {
      const list = map.get(study.category) ?? []
      list.push(study)
      map.set(study.category, list)
    }
    return Array.from(map.entries())
  }, [studies, query, pillar])

  return (
    <div className="section-view">
      <div className="dashboard-hero">
        <div>
          <h1>{locale === "ru" ? "Все исследования и эксперименты NASA PSI" : "All NASA PSI Investigations & Experiments"}</h1>
          <p className="muted">
            {locale === "ru"
              ? "Эксперименты сгруппированы по программам и бортовым установкам. Нажмите на карточку, чтобы открыть параметры, данные и источники."
              : "Investigations grouped by program and orbital facility. Click any card to inspect parameters, datasets, and primary NASA sources."}
          </p>
        </div>
      </div>

      <section className="filter-bar" aria-label={locale === "ru" ? "Фильтр исследований" : "Filter studies"}>
        <label className="search-field ranking-search">
          <Search size={15} />
          <input
            type="search"
            placeholder={locale === "ru" ? "Поиск по названию или описанию…" : "Search by title or description…"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="pillar-pills" role="group" aria-label={locale === "ru" ? "Направление безопасности" : "Safety pillar"}>
          {pillars.map((p) => (
            <button
              key={p}
              type="button"
              className="chip-btn"
              aria-pressed={pillar === p}
              onClick={() => setPillar(p)}
            >
              {p === "All" ? (locale === "ru" ? "Все" : "All") : p}
            </button>
          ))}
        </div>
      </section>

      {grouped.length === 0 && (
        <section className="panel panel-padding">
          <p className="muted">
            {locale === "ru" ? "По заданным фильтрам исследования не найдены." : "No investigations match the selected filters."}
          </p>
        </section>
      )}

      <div className="directory-columns">
        {grouped.map(([program, items]) => (
          <section key={program} className="directory-column">
            <header className="directory-column-header">
              <div className="directory-column-title">
                <FlaskConical size={16} />
                <h2>{program}</h2>
                <span className="directory-count">{items.length}</span>
              </div>
              {programDescriptions[locale][program] && <p className="muted">{programDescriptions[locale][program]}</p>}
            </header>

            <div className="directory-column-cards">
              {items.map((study) => {
                const isCompared = compareIds.includes(study.id)

                return (
                  <article key={study.id} className="panel directory-study-card">
                    <div className="ranking-badges">
                      {study.tags.map((t) => (
                        <span key={t} className="badge-pillar">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3>
                      <button type="button" className="card-title-btn" onClick={() => onSelectStudy(study.id)}>
                        {study.title}
                      </button>
                    </h3>
                    <p className="ranking-desc">{study.description}</p>
                    <div className="ranking-card-actions">
                      <Button type="button" size="sm" onClick={() => onSelectStudy(study.id)}>
                        {locale === "ru" ? "Открыть" : "Open"} <ArrowRight size={14} />
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant={isCompared ? "default" : "outline"}
                        onClick={() => onToggleCompare(study.id)}
                      >
                        <GitCompare size={14} />{" "}
                        {isCompared
                          ? locale === "ru" ? "В сравнении" : "Comparing"
                          : locale === "ru" ? "Сравнить" : "Compare"}
                      </Button>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
