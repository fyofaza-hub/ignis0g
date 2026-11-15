import { ArrowUpRight, FileText, X } from "@/components/ui/icons"
import type { Citation } from "@/domain/types"
import type { Locale } from "@/i18n"
import { nasaContentUrl } from "@/lib/nasa-content"

function formatSourceHost(url: string): string {
  const normalized = nasaContentUrl(url)
  if (normalized.startsWith("/")) return normalized
  try {
    const parsed = new URL(normalized)
    const suffix = parsed.pathname && parsed.pathname !== "/" ? parsed.pathname : ""
    return `${parsed.hostname}${suffix}`
  } catch {
    return normalized
  }
}

export function RichCitedText({
  text,
  citations,
  activeIndex = null,
  onClickCitation,
  locale,
  as = "p",
  className = "chat-answer-text",
}: {
  text: string
  citations: Citation[]
  activeIndex?: number | null
  onClickCitation: (index: number) => void
  locale: Locale
  as?: "p" | "span"
  className?: string
}) {
  const parts = text.split(/(\[\d+\])/g)
  const Tag = as
  return (
    <Tag className={className}>
      {parts.map((part, idx) => {
        const match = /^\[(\d+)\]$/.exec(part)
        if (!match) return <span key={idx}>{part}</span>
        const num = Number(match[1])
        const citeIdx = num - 1
        const cite = citations[citeIdx]
        if (!cite) return <span key={idx}>{part}</span>
        const isActive = activeIndex === citeIdx
        return (
          <button
            key={idx}
            type="button"
            className={`inline-citation-badge${isActive ? " active" : ""}`}
            aria-pressed={isActive}
            aria-label={
              locale === "ru"
                ? `Проверить цитату [${num}]: ${cite.title}`
                : `Verify citation [${num}]: ${cite.title}`
            }
            title={`${cite.title}${cite.locator ? ` · ${cite.locator}` : ""}`}
            onClick={() => onClickCitation(citeIdx)}
          >
            [{num}]
          </button>
        )
      })}
    </Tag>
  )
}

export function CitationInspector({
  citation,
  index,
  onClose,
  locale,
}: {
  citation: Citation
  index: number
  onClose: () => void
  locale: Locale
}) {
  const ru = locale === "ru"
  const hostLabel = formatSourceHost(citation.url)

  return (
    <aside
      className="citation-inspector-card"
      aria-label={ru ? `Проверка источника [${index + 1}]` : `Citation [${index + 1}] verification`}
    >
      <div className="citation-inspector-head">
        <div className="citation-inspector-title-wrap">
          <span className="citation-inspector-index">[{index + 1}]</span>
          <div className="citation-inspector-doc">
            <span className="citation-inspector-label">
              {ru ? "Документ" : "Document"}
            </span>
            <strong>{citation.title}</strong>
          </div>
        </div>
        <button
          type="button"
          className="icon-button"
          aria-label={ru ? "Скрыть карточку цитаты" : "Close citation details"}
          onClick={onClose}
        >
          <X size={15} />
        </button>
      </div>

      <div className="citation-inspector-meta">
        <span>
          <FileText size={13} />{" "}
          {ru ? "Страница / таблица:" : "Page / table:"}{" "}
          <strong>
            {citation.locator ?? (ru ? "Не указана в индексе" : "Not specified in index")}
          </strong>
        </span>
      </div>

      <div className="citation-inspector-excerpt-block">
        <span className="citation-inspector-label">
          {ru ? "Фрагмент источника" : "Source excerpt"}
        </span>
        <blockquote>{citation.excerpt}</blockquote>
      </div>

      <div className="citation-inspector-footer">
        <a
          className="citation-nasa-link"
          href={nasaContentUrl(citation.url)}
          target="_blank"
          rel="noreferrer"
        >
          <span>{ru ? "Открыть источник NASA" : "Open NASA source"}</span>
          <small>{hostLabel}</small>
          <ArrowUpRight size={14} />
        </a>
      </div>
    </aside>
  )
}

export function CitationList({
  citations,
  activeIndex,
  onToggleIndex,
  locale,
}: {
  citations: Citation[]
  activeIndex: number | null
  onToggleIndex: (idx: number) => void
  locale: Locale
}) {
  if (!citations.length) return null
  const ru = locale === "ru"
  return (
    <div className="chat-citations">
      {citations.map((c, idx) => {
        const isActive = activeIndex === idx
        return (
          <details
            key={`${c.chunk_id}-${idx}`}
            className={isActive ? "citation-active" : undefined}
            open={isActive}
          >
            <summary
              onClick={(e) => {
                e.preventDefault()
                onToggleIndex(idx)
              }}
            >
              <span>
                [{idx + 1}] {c.title}
                {c.locator ? ` · ${c.locator}` : ""}
              </span>
            </summary>
            <div className="citation-detail-meta">
              <span>
                <strong>{ru ? "Документ:" : "Document:"}</strong> {c.title}
              </span>
              <span>
                <strong>{ru ? "Страница / таблица:" : "Page / table:"}</strong>{" "}
                {c.locator ?? (ru ? "Не указана" : "Not specified")}
              </span>
            </div>
            <p>{c.excerpt}</p>
            <a href={nasaContentUrl(c.url)} target="_blank" rel="noreferrer">
              {ru ? "Открыть источник NASA" : "Open NASA source"} ({formatSourceHost(c.url)}) <ArrowUpRight size={13} />
            </a>
          </details>
        )
      })}
    </div>
  )
}
