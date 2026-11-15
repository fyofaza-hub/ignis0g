import { useEffect, useState } from "react"
import { ArrowRight, Menu, Network, X } from "@/components/ui/icons"
import { LanguageSwitch, useLocale, type Locale } from "@/i18n"
import { catalogEntry, getResearch } from "@/mocks/catalog"
import { studyUrl } from "./research-flow"
import "./landing.css"

const summaries: Record<Locale, Record<string, string>> = {
  en: {
    "flex-1": "How droplets of liquid fuel burn, form cool flames, and extinguish in microgravity.",
    "bass-bass-ii-bass-m": "How airflow affects burning and extinguishment in solid materials.",
    "saffire-i-iii": "How fire spreads in a full-scale cargo spacecraft.",
    "acme-bre": "How a gaseous porous burner emulates solid material flammability in still air.",
    "sofie-mist": "How reduced pressure and oxygen concentration affect solid fuel ignition.",
    "same-same-r": "How microgravity smoke particle size distribution affects spacecraft fire detection.",
  },
  ru: {
    "flex-1": "Как капли жидкого топлива горят, образуют холодное пламя и гаснут в невесомости.",
    "bass-bass-ii-bass-m": "Как поток воздуха влияет на горение и тушение твёрдых материалов.",
    "saffire-i-iii": "Как огонь распространяется внутри полномасштабного грузового корабля Cygnus.",
    "acme-bre": "Как газовая горелка моделирует воспламеняемость материалов без потока воздуха.",
    "sofie-mist": "Как пониженное давление и концентрация кислорода влияют на воспламенение твёрдого топлива.",
    "same-same-r": "Как размер частиц дыма в невесомости влияет на обнаружение пожара в космосе.",
  },
}

function Brand({ locale }: { locale: Locale }) {
  return (
    <a className="landing-brand" href="/" aria-label={locale === "ru" ? "IGNIS 0G — главная" : "IGNIS 0G home"}>
      <img src="/ignis-logo.png" alt="" width={28} height={28} style={{ borderRadius: 6 }} />
      <span>
        <span style={{ color: "#ededed" }}>IGNIS</span>{" "}
        <span style={{ color: "var(--brand)" }}>0G</span>
      </span>
    </a>
  )
}

export function Landing() {
  const locale = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)
  const researchList = getResearch(locale)

  const navigation = [
    { href: "#start", label: locale === "ru" ? "О проекте" : "Overview" },
    { href: "#workflow", label: locale === "ru" ? "Как пользоваться" : "Workflow" },
    { href: "#catalog", label: locale === "ru" ? "Эксперименты" : "Experiments" },
    
  ]

  useEffect(() => {
    document.title =
      locale === "ru" ? "IGNIS 0G — огонь в невесомости" : "IGNIS 0G — Microgravity Research Explorer"
  }, [locale])


  return (
    <div className="landing">
      <a className="landing-skip" href="#landing-main">
        {locale === "ru" ? "К содержимому" : "Skip to content"}
      </a>
      <header className="landing-header">
        <div className="landing-container landing-header-inner">
          <Brand locale={locale} />
          <nav className="landing-desktop-nav" aria-label={locale === "ru" ? "Основная навигация" : "Main navigation"}>
            {navigation.map(({ href, label }) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="landing-header-actions">
            <LanguageSwitch />
            <a className="landing-button landing-header-cta" href="/explorer">
              <Network size={17} /> {locale === "ru" ? "Открыть Explorer" : "Open Explorer"}
            </a>
            <button
              type="button"
              className="landing-menu-trigger"
              aria-label={menuOpen ? (locale === "ru" ? "Закрыть меню" : "Close navigation") : (locale === "ru" ? "Открыть меню" : "Open navigation")}
              aria-expanded={menuOpen}
              aria-controls="landing-mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <nav id="landing-mobile-nav" className="landing-mobile-nav" aria-label={locale === "ru" ? "Мобильное меню" : "Mobile navigation"} hidden={!menuOpen}>
          {navigation.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a href="/explorer">
            {locale === "ru" ? "Открыть Explorer" : "Open Explorer"} <ArrowRight size={17} />
          </a>
        </nav>
      </header>

      <main id="landing-main" className="landing-container landing-simple">
        <section className="simple-hero" id="start">
          <p className="simple-eyebrow">NASA SPACE APPS CHALLENGE · FLAME IN FREEFALL</p>
          <h1>{locale === "ru" ? <>Огонь в<br /><em>невесомости</em></> : <>Fire in<br /><em>microgravity</em></>}</h1>
          <p className="simple-intro">{locale === "ru"
            ? "Исследования NASA о горении, дыме и тушении в космосе — в одном пространстве для поиска и сравнения."
            : "NASA research on combustion, smoke, and extinguishment in space, brought together for exploration and comparison."}</p>
          <div className="landing-actions">
            <a className="landing-button" href="/explorer">{locale === "ru" ? "Открыть Explorer" : "Open Explorer"} <ArrowRight size={18} /></a>
            <a className="simple-link" href="#workflow">{locale === "ru" ? "Как это работает" : "How it works"} <ArrowRight size={17} /></a>
          </div>
        </section>

        <section id="workflow" className="simple-section">
          <div className="simple-section-heading">
            <p className="simple-eyebrow">{locale === "ru" ? "ВОЗМОЖНОСТИ" : "CAPABILITIES"}</p>
            <h2>{locale === "ru" ? "От вопроса к исследованию" : "From question to research"}</h2>
          </div>
          <div className="simple-features">
            <article>
              <h3>{locale === "ru" ? "Найдите эксперимент" : "Find an experiment"}</h3>
              <p>{locale === "ru" ? "Ищите исследования по названию или теме и изучайте их условия, результаты и источники." : "Search studies by name or topic and explore their conditions, findings, and sources."}</p>
              <a className="simple-link" href="/explorer?section=studies">{locale === "ru" ? "Открыть исследования" : "Browse studies"} <ArrowRight size={16} /></a>
            </article>
            <article>
              <h3>{locale === "ru" ? "Сравните условия" : "Compare conditions"}</h3>
              <p>{locale === "ru" ? "Сопоставьте диапазоны кислорода, давления, обдува и гравитации с выбранным профилем." : "Compare published oxygen, pressure, airflow, and gravity ranges with a selected profile."}</p>
              <a className="simple-link" href="/explorer?section=environments">{locale === "ru" ? "Условия среды" : "Explore environments"} <ArrowRight size={16} /></a>
            </article>
            <article>
              <h3>{locale === "ru" ? "Изучите данные" : "Explore the data"}</h3>
              <p>{locale === "ru" ? "Сравнивайте отдельные прогоны, переходите к первоисточникам и задавайте вопросы ИИ-ассистенту." : "Compare individual runs, follow source links, and ask the AI research assistant."}</p>
              <a className="simple-link" href={studyUrl("bass-bass-ii-bass-m")}>{locale === "ru" ? "Открыть BASS" : "Explore BASS"} <ArrowRight size={16} /></a>
            </article>
          </div>
          <p className="simple-note">{locale === "ru" ? "Рейтинг показывает совпадение отдельных диапазонов. Он не подтверждает испытание всей комбинации условий и не является прогнозом пожара." : "Ranking reflects individual range matches. It does not establish that the combined conditions were tested or predict fire."}</p>
        </section>

        <section className="simple-section" id="catalog">
          <div className="simple-section-heading">
            <p className="simple-eyebrow">{locale === "ru" ? "ИССЛЕДОВАНИЯ NASA" : "NASA RESEARCH"}</p>
            <h2>{locale === "ru" ? "Избранные эксперименты" : "Featured experiments"}</h2>
            <p>{locale === "ru" ? "От горения капель топлива до распространения огня на космическом корабле." : "From burning fuel droplets to fire spread aboard a spacecraft."}</p>
          </div>
          <ul className="simple-studies">
            {researchList.map(({ id, title }) => (
              <li key={id}>
                <a href={studyUrl(id)}>
                  <strong>{catalogEntry(id)?.code}</strong>
                  <span><b>{title}</b><small>{summaries[locale][id]}</small></span>
                  <ArrowRight size={19} />
                </a>
              </li>
            ))}
          </ul>
          <a className="simple-link simple-all" href="/explorer?section=studies">{locale === "ru" ? "Все исследования" : "All studies"} <ArrowRight size={17} /></a>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-container">
          <div>
            <Brand locale={locale} />
            <p>
              {locale === "ru"
                ? "Исследование горения и пожарной безопасности в невесомости."
                : "Explore combustion research in microgravity."}
            </p>
          </div>
          <nav aria-label={locale === "ru" ? "Навигация в подвале" : "Footer navigation"}>
            {navigation.map(({ href, label }) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            <a href="/explorer">
              {locale === "ru" ? "Открыть Explorer" : "Open Explorer"} <ArrowRight size={15} />
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
