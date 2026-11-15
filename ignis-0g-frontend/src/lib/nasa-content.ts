// Snapshots contain collection URLs with the old local frontend origin.
export function nasaContentUrl(url: string): string {
  return url.replace(/^https?:\/\/(?:127\.0\.0\.1|localhost):8080(?=\/nasa-content\/)/i, "")
}

// Exported CSV/JSON files need a full origin so links open outside the browser.
export function exportSourceUrl(
  url: string,
  origin = typeof window !== "undefined" ? window.location.origin : "",
): string {
  const normalized = nasaContentUrl(url)
  if (normalized.startsWith("/nasa-content/") && origin) {
    return `${origin.replace(/\/+$/, "")}${normalized}`
  }
  return normalized
}
