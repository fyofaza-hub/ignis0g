import {
  FlaskConical,
  GitCompare,
  Layers3,
  Rocket,
  Search,
} from "@/components/ui/icons"
import { LanguageSwitch, useLocale } from "@/i18n"

export const sections = [
  { name: "Дашборд и рейтинг", labelEn: "Overview", labelRu: "Главная", icon: Layers3 },
  { name: "Исследования", labelEn: "Studies", labelRu: "Исследования", icon: FlaskConical },
  { name: "Сравнение и установки", labelEn: "Comparison", labelRu: "Сравнение", icon: GitCompare },
  { name: "Среды обитания", labelEn: "O₂ Environments", labelRu: "Среды О₂", icon: Rocket },
] as const

export type Section = (typeof sections)[number]["name"] | "ИИ-ассистент"

interface SidebarProps {
  studiesCount: number
  section: Section
  compareCount: number
  onSection: (section: Section) => void
  onOpenSearch: () => void
}

export function Sidebar({
  studiesCount,
  section,
  compareCount,
  onSection,
  onOpenSearch,
}: SidebarProps) {
  const locale = useLocale()
  const ru = locale === "ru"

  return (
    <aside className="sidebar" aria-label={ru ? "Навигация" : "Navigation"}>
      <div className="sidebar-brand-row">
        <a className="workspace-title" href="/">
          <img src="/ignis-logo.png" alt="" className="brand-logo-img" />
          <span className="brand-wordmark">
            <span className="brand-ignis">IGNIS</span>{" "}
            <span className="brand-zero-g">0G</span>
          </span>
        </a>
        <LanguageSwitch />
      </div>

      <button type="button" className="sidebar-primary-cta" onClick={onOpenSearch}>
        <Search size={16} />
        <span>{ru ? "Быстрый поиск" : "Quick Search"}</span>
        <kbd>Ctrl K</kbd>
      </button>

      <div className="sidebar-group-label">{ru ? "НАВИГАЦИЯ" : "NAVIGATION"}</div>
      <nav aria-label={ru ? "Разделы" : "Sections"} className="side-nav">
        {sections.map(({ name, labelEn, labelRu, icon: Icon }) => (
          <button
            key={name}
            type="button"
            aria-current={section === name ? "page" : undefined}
            onClick={() => onSection(name)}
          >
            <Icon size={17} />
            <span>{ru ? labelRu : labelEn}</span>
            {name === "Исследования" && studiesCount > 0 && (
              <span className="nav-count-muted">{studiesCount}</span>
            )}
            {name === "Сравнение и установки" && compareCount > 0 && (
              <span className="nav-count">{compareCount}</span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  )
}
