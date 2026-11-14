import { Button } from "@/components/ui/button"
import { useLocale } from "@/i18n"

export function QueryLoading({ label }: { label: string }) {
  return (
    <div className="query-loading" role="status">
      <span>{label}</span>
      <div className="query-skeleton" aria-hidden="true" />
    </div>
  )
}

export function QueryFailure({
  label,
  retry,
  fetching,
}: {
  label: string
  retry: () => void
  fetching: boolean
}) {
  const locale = useLocale()
  const ru = locale === "ru"
  return (
    <div className="query-failure">
      <p role="alert">{label}</p>
      <Button type="button" size="sm" variant="outline" disabled={fetching} onClick={retry}>
        {fetching ? (ru ? "Загрузка…" : "Loading…") : ru ? "Повторить" : "Retry"}
      </Button>
    </div>
  )
}
