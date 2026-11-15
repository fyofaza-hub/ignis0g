import { useEffect, useRef, useState } from "react"
import { ArrowRight, BookOpen, FlaskConical, Menu, Network, Search, X } from "@/components/ui/icons"
import { api, useMocks } from "@/api/client"
import flame from "@/assets/flex-flame.webp"
import type { StudySummary } from "@/domain/types"
import { LanguageSwitch, useLocale, type Locale } from "@/i18n"
import { catalogEntry, getResearch, topics } from "@/mocks/catalog"
import { getMockStudies } from "@/mocks/data"
import { ResearchFlow, WorkflowFlow, studyUrl } from "./research-flow"
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
        <span style={{ color: "#000000" }}>IGNIS</span>{" "}
        <span style={{ color: "var(--brand)" }}>0G</span>
      </span>
    </a>
  )
}

function ExperimentSearch({ dialog, locale }: { dialog: { current: HTMLDialogElement | null }; locale: Locale }) {
  const [query, setQuery] = useState("")
  const [liveStudies, setLiveStudies] = useState<StudySummary[]>([])

  useEffect(() => {
    if (useMocks) return
    const controller = new AbortController()
    api
      .listStudies({ limit: 100, offset: 0 }, controller.signal)
      .then((result) => setLiveStudies(result.items))
      .catch(() => {
        if (!controller.signal.aborted) setLiveStudies([])
      })
    return () => controller.abort()
  }, [])

  const localStudies = getMockStudies(locale)
  const merged = new Map(localStudies.map((study) => [study.id, study]))
  for (const study of liveStudies) {
    if (!merged.has(study.id)) merged.set(study.id, study)
  }
  const list = Array.from(merged.values())
  const q = query.trim().toLowerCase()
  const matches = list.filter((study) =>
    `${study.id} ${catalogEntry(study.id)?.code ?? ""} ${study.category} ${study.title} ${study.description} ${study.tags.join(" ")} ${summaries[locale][study.id] ?? ""}`
      .toLowerCase()
      .includes(q),
  )
  return (
    <dialog
      ref={dialog}
      className="landing-search-dialog"
      aria-labelledby="experiment-search-title"
      onClose={() => setQuery("")}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
    >
      <div>
        <div className="landing-search-heading">
          <h2 id="experiment-search-title">{locale === "ru" ? "Поиск экспериментов" : "Search experiments"}</h2>
          <button type="button" aria-label={locale === "ru" ? "Закрыть поиск" : "Close search"} onClick={() => dialog.current?.close()}>
            <X size={20} />
          </button>
        </div>
        <label className="landing-search-input">
          <Search size={20} />
          <input
            autoFocus
            type="search"
            aria-label={locale === "ru" ? "Поиск по названию или теме" : "Search by name or topic"}
            placeholder={locale === "ru" ? "Поиск по названию или теме…" : "Search by name or topic…"}
            value={query}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault()
                dialog.current?.close()
              }
            }}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <ul>
          {matches.map(({ id, title, category }) => (
            <li key={id}>
              <a href={studyUrl(id)}>
                <strong>{catalogEntry(id)?.code ?? category}</strong>
                <span>{title}</span>
                <ArrowRight size={17} />
              </a>
            </li>
          ))}
        </ul>
        {!matches.length && <p role="status">{locale === "ru" ? "Эксперименты не найдены." : "No experiments found."}</p>}
      </div>
    </dialog>
  )
}

export function Landing() {
  const locale = useLocale()
  const dialog = useRef<HTMLDialogElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [featuredId, setFeaturedId] = useState("flex-1")
  const researchList = getResearch(locale)
  const featured = researchList.find(({ id }) => id === featuredId) ?? researchList[0]

  const navigation = [
    { href: "#start", label: locale === "ru" ? "С чего начать" : "Quickstart" },
    { href: "#workflow", label: locale === "ru" ? "Как пользоваться" : "Workflow" },
    { href: "#catalog", label: locale === "ru" ? "Эксперименты" : "Experiments" },
    { href: "#about", label: locale === "ru" ? "О проекте" : "About" },
  ]

  useEffect(() => {
    document.title =
      locale === "ru" ? "IGNIS 0G — огонь в невесомости" : "IGNIS 0G — Microgravity Research Explorer"
  }, [locale])

  useEffect(() => {
    function searchShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        if (!dialog.current?.open) dialog.current?.showModal()
      }
    }
    window.addEventListener("keydown", searchShortcut)
    return () => window.removeEventListener("keydown", searchShortcut)
  }, [])

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
            <button
              type="button"
              className="landing-search-trigger"
              aria-label={locale === "ru" ? "Поиск экспериментов" : "Search experiments"}
              onClick={() => dialog.current?.showModal()}
            >
              <Search size={18} />
              <span>{locale === "ru" ? "Поиск" : "Search"}</span>
              <kbd>Ctrl K</kbd>
            </button>
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
      <ExperimentSearch dialog={dialog} locale={locale} />

      <main id="landing-main">
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="landing-container landing-hero-inner">
            <div className="landing-pitch">
              <h1 id="landing-title">
                {locale === "ru" ? (
                  <>
                    Огонь в<br /> <em>невесомости</em>
                  </>
                ) : (
                  <>
                    Explore fire in<br /> <em>microgravity</em>
                  </>
                )}
              </h1>
              <p>
                {locale === "ru"
                  ? "Исследуйте, как в космосе горят материалы, появляется дым и гаснет пламя. В каждом эксперименте собраны результаты и ссылки на источники NASA."
                  : "Discover how flames take shape, spread, and go out through NASA experiments in space."}
              </p>
              <div className="landing-actions">
                <a className="landing-button" href="/explorer">
                  <Network size={19} /> {locale === "ru" ? "Открыть Explorer" : "Open Explorer"}
                </a>
                <a className="landing-button landing-outline" href="/explorer?section=studies">
                  <FlaskConical size={19} /> {locale === "ru" ? "Смотреть исследования" : "Browse studies"}
                </a>
              </div>
            </div>
            <ResearchFlow />
          </div>
        </section>

        <section className="landing-container landing-stats" aria-label={locale === "ru" ? "Обзор каталога" : "Catalog overview"}>
          <dl>
            <div>
              <dt>{locale === "ru" ? "Эксперименты" : "Experiments"}</dt>
              <dd>{researchList.length}</dd>
            </div>
            <div>
              <dt>{locale === "ru" ? "Направления" : "Research topics"}</dt>
              <dd>{topics.length}</dd>
            </div>
            <div>
              <dt>{locale === "ru" ? "Программа" : "Research program"}</dt>
              <dd>NASA</dd>
            </div>
          </dl>
          <div>
            <p>
              {locale === "ru"
                ? "IGNIS 0G объединяет эксперименты по горению в космосе, их результаты и первоисточники NASA."
                : "IGNIS 0G brings together experiments on fire in space, their findings, and the sources behind them."}
            </p>
            <a className="landing-button landing-outline" href="#catalog">
              <BookOpen size={18} /> {locale === "ru" ? "Смотреть каталог" : "View catalog"}
            </a>
          </div>
        </section>

        <section id="start" className="landing-container">
          <div className="landing-dark landing-quickstart">
            <h2>{locale === "ru" ? "С чего начать в IGNIS 0G" : "Getting started with IGNIS 0G"}</h2>
            <p>
              {locale === "ru"
                ? "Выберите эксперимент. На его странице можно посмотреть условия, результаты и первоисточники."
                : "Pick an experiment to open its overview, findings, and sources."}
            </p>
            <div className="landing-terminal">
              <div className="landing-terminal-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <a href={studyUrl("flex-1")}>
                {locale === "ru" ? "Открыть" : "Open"} <strong>FLEX-1</strong> <ArrowRight size={17} />
              </a>
            </div>
            <a href="/explorer?section=studies" className="landing-dark-footer">
              {locale === "ru" ? "Посмотреть все исследования" : "Browse all studies"} <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <section className="landing-container landing-workflow" id="workflow" aria-label={locale === "ru" ? "Как пользоваться каталогом" : "Research workflow"}>
          <article className="landing-feature">
            <div>
              <h2>{locale === "ru" ? "Найдите эксперимент" : "Start with a question"}</h2>
              <p>
                {locale === "ru"
                  ? "Ищите по названию, сокращению или теме исследования."
                  : "Search for an experiment by name or acronym, or narrow your search by topic."}
              </p>
              <button type="button" className="landing-button" onClick={() => dialog.current?.showModal()}>
                {locale === "ru" ? "Найти эксперимент" : "Search experiments"}
              </button>
            </div>
            <WorkflowFlow />
          </article>
          <article className="landing-feature landing-feature-reverse">
            <div>
              <h2>{locale === "ru" ? "Изучите результаты" : "Read the evidence"}</h2>
              <p>
                {locale === "ru"
                  ? "Посмотрите, что проверяли исследователи, к каким выводам пришли и где опубликованы данные NASA."
                  : "Review what a study tested, what it found, and where the results were published."}
              </p>
              <a className="landing-button" href={studyUrl("flex-1")}>
                {locale === "ru" ? "Открыть FLEX-1" : "Explore FLEX-1"}
              </a>
            </div>
            <figure className="landing-feature-image">
              <img
                src={flame}
                alt={
                  locale === "ru"
                    ? "Иллюстрация синего сферического пламени вокруг капли топлива"
                    : "Illustration of a spherical blue flame surrounding a fuel droplet"
                }
                loading="lazy"
              />
              <figcaption>{locale === "ru" ? "FLEX · иллюстрация пламени" : "FLEX · Flame illustration"}</figcaption>
            </figure>
          </article>
          <article className="landing-feature">
            <div>
              <h2>{locale === "ru" ? "Сравните условия" : "Compare environments"}</h2>
              <p>
                {locale === "ru"
                  ? "Узнайте, как концентрация кислорода, давление и тип топлива влияют на результаты разных экспериментов."
                  : "See how oxygen concentration, cabin pressure, airflow, and fuel type shift experimental regimes across studies."}
              </p>
              <a className="landing-button" href="/explorer?section=environments">
                {locale === "ru" ? "Посмотреть условия среды" : "Explore O₂ regimes"}
              </a>
            </div>
            <WorkflowFlow overview />
          </article>
        </section>

        <section className="landing-container" id="catalog" aria-labelledby="catalog-title">
          <div className="landing-dark landing-showcase">
            <div className="landing-showcase-heading">
              <div>
                <p>{locale === "ru" ? "Каталог экспериментов" : "Experiment catalog"}</p>
                <h2 id="catalog-title">
                  {locale === "ru" ? (
                    <>
                      Изучение огня<br />в космосе
                    </>
                  ) : (
                    <>
                      Studying fire<br />in space
                    </>
                  )}
                </h2>
              </div>
              <div>
                <p>
                  {locale === "ru"
                    ? "От горения одной капли топлива до пожара на грузовом корабле — каждый эксперимент отвечает на свой вопрос."
                    : "From burning a single fuel droplet to tracking fire aboard a cargo spacecraft, each experiment answers a different question."}
                </p>
                <a className="landing-button landing-button-white" href="/explorer?section=studies">
                  {locale === "ru" ? "Открыть каталог" : "Open catalog"}
                </a>
              </div>
            </div>
            <div className="landing-featured">
              <div className="landing-featured-grid" aria-hidden="true">
                <Network size={78} />
              </div>
              <div id="featured-experiment" aria-live="polite">
                <strong>{catalogEntry(featured.id)?.code}</strong>
                <h3>{featured.title}</h3>
                <p>{summaries[locale][featured.id]}</p>
                <a className="landing-button" href={studyUrl(featured.id)}>
                  {locale === "ru" ? "Открыть эксперимент" : "Open experiment"} <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <div className="landing-study-buttons" role="group" aria-label={locale === "ru" ? "Предпросмотр эксперимента" : "Preview an experiment"}>
              {researchList.map(({ id }) => (
                <button
                  type="button"
                  key={id}
                  aria-pressed={id === featuredId}
                  aria-controls="featured-experiment"
                  onClick={() => setFeaturedId(id)}
                >
                  {catalogEntry(id)?.code}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-container landing-directory" aria-labelledby="directory-title">
          <h2 id="directory-title">{locale === "ru" ? "Все эксперименты" : "All experiments"}</h2>
          <ul>
            {researchList.map(({ id, title }) => (
              <li key={id}>
                <a href={studyUrl(id)}>
                  <strong>{catalogEntry(id)?.code}</strong>
                  <span>{title}</span>
                  <ArrowRight size={17} />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="landing-container landing-about" id="about">
          <h2>{locale === "ru" ? "О проекте IGNIS 0G" : "About IGNIS 0G"}</h2>
          <p>
            {locale === "ru"
              ? "IGNIS 0G — каталог исследований горения в невесомости. Он помогает проследить выводы экспериментов до опубликованных источников NASA."
              : "IGNIS 0G is a research workspace for exploring combustion in microgravity and tracing findings back to their sources."}
          </p>
          <a href="/explorer">
            {locale === "ru" ? "Открыть Explorer" : "Open Explorer"} <ArrowRight size={16} />
          </a>
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
