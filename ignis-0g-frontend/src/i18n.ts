import { createElement, useSyncExternalStore } from "react"

export type Locale = "en" | "ru"

const STORAGE_KEY = "ignis-lang"
const listeners = new Set<() => void>()

function readInitialLocale(): Locale {
  if (typeof window === "undefined") return "en"
  const param = new URLSearchParams(window.location.search).get("lang")
  if (param === "ru" || param === "en") {
    try {
      window.localStorage.setItem(STORAGE_KEY, param)
    } catch {
      // Ignore storage errors
    }
    return param
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "ru" || stored === "en") return stored
  } catch {
    // Ignore storage errors
  }
  return "en"
}

let currentLocale: Locale = readInitialLocale()
if (typeof document !== "undefined") {
  document.documentElement.lang = currentLocale
}

export function getLocale(): Locale {
  return currentLocale
}

export function setLocale(next: Locale) {
  if (next === currentLocale) return
  currentLocale = next
  try {
    window.localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Ignore storage errors
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = next
  }
  listeners.forEach((cb) => cb())
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, getLocale, () => "en" as Locale)
}

export function tr(locale: Locale, en: string, ru: string): string {
  return locale === "ru" ? ru : en
}

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const locale = useLocale()
  return createElement(
    "div",
    {
      className: `lang-switch ${className}`.trim(),
      role: "group",
      "aria-label": locale === "ru" ? "Язык интерфейса" : "Interface language",
    },
    createElement(
      "button",
      {
        type: "button",
        className: locale === "en" ? "active" : "",
        "aria-pressed": locale === "en",
        onClick: () => setLocale("en"),
      },
      "EN",
    ),
    createElement(
      "button",
      {
        type: "button",
        className: locale === "ru" ? "active" : "",
        "aria-pressed": locale === "ru",
        onClick: () => setLocale("ru"),
      },
      "RU",
    ),
  )
}
