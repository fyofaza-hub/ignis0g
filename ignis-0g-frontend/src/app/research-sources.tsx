import { ArrowUpRight } from "@/components/ui/icons"
import type { Source, SourceType } from "@/domain/types"
import { useLocale } from "@/i18n"

const kindsEn: Record<SourceType, string> = {
  article: "Journal Article",
  report: "NASA Report",
  webpage: "Webpage",
  dataset: "Dataset",
  video: "Video",
  other: "Document",
}

const kindsRu: Record<SourceType, string> = {
  article: "Статья",
  report: "Отчёт NASA",
  webpage: "Веб-страница",
  dataset: "Набор данных",
  video: "Видео",
  other: "Документ",
}

export function SourceList({ sources }: { sources: Source[] }) {
  const locale = useLocale()
  const ru = locale === "ru"
  const kinds = ru ? kindsRu : kindsEn
  if (!sources.length) {
    return (
      <p className="muted">
        {ru ? "Для этого эксперимента пока нет источников." : "No sources are listed for this experiment yet."}
      </p>
    )
  }
  return (
    <ul className="source-list">
      {sources.map((source) => (
        <li key={source.id}>
          <span className="muted">{kinds[source.source_type] ?? (ru ? "Документ" : "Document")}</span>
          {source.url ? (
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.title}
              <ArrowUpRight size={14} />
            </a>
          ) : (
            <span>{source.title}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
