import { Component, lazy, StrictMode, Suspense, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import "@fontsource/ibm-plex-mono/latin-400.css"
import "@fontsource/ibm-plex-mono/cyrillic-400.css"
import { getLocale } from "./i18n"
import "./index.css"

const isExplorer = window.location.pathname.replace(/\/$/, "") === "/explorer"
const Page = isExplorer
  ? lazy(() => import("@/app/explorer"))
  : lazy(() => import("@/landing/landing").then(({ Landing }) => ({ default: Landing })))

const initialLocale = getLocale()
document.documentElement.lang = initialLocale
document.title = isExplorer
  ? initialLocale === "ru"
    ? "IGNIS 0G — каталог исследований"
    : "IGNIS 0G — Explorer"
  : initialLocale === "ru"
    ? "IGNIS 0G — огонь в невесомости"
    : "IGNIS 0G — Microgravity Research Explorer"

class PageBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children
    const ru = getLocale() === "ru"
    return (
      <main className="page-state">
        <p role="alert">{ru ? "Не удалось открыть страницу." : "Unable to open the page."}</p>
        <button type="button" onClick={() => window.location.reload()}>
          {ru ? "Перезагрузить" : "Reload page"}
        </button>
      </main>
    )
  }
}

const root = document.getElementById("root")
if (root) {
  const ru = getLocale() === "ru"
  createRoot(root).render(
    <StrictMode>
      <PageBoundary>
        <Suspense fallback={<p className="page-state" role="status">{ru ? "Загрузка…" : "Loading…"}</p>}>
          <Page />
        </Suspense>
      </PageBoundary>
    </StrictMode>,
  )
}
