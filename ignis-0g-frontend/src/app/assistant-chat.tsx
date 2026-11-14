import { useEffect, useRef, useState, type FormEvent } from "react"
import { ArrowUpRight, Bot, ChevronRight, Reset, Send, Sparkles } from "@/components/ui/icons"
import { ApiError, api } from "@/api/client"
import type { ChatMessage, ChatResponse, Citation, Scenario, StudySummary } from "@/domain/types"
import { useLocale, type Locale } from "@/i18n"

interface Exchange {
  question: string
  response?: ChatResponse
  error?: string
}

export function useStudyChat(study: StudySummary | undefined, scenario?: Scenario) {
  const locale = useLocale()
  const [scope, setScope] = useState<"study" | "global">(study ? "study" : "global")
  const [historyByScope, setHistoryByScope] = useState<Record<string, Exchange[]>>({})
  const [pending, setPending] = useState(false)

  const suffix = (scenario ? `:${JSON.stringify(scenario)}` : "") + `:${locale}`
  const activeKey = (scope === "study" && study ? `study:${study.id}` : "global") + suffix
  const exchanges = historyByScope[activeKey] ?? []

  useEffect(() => {
    if (!study && scope === "study") setScope("global")
  }, [study, scope])

  async function send(question: string) {
    const text = question.trim()
    if (!text || pending) return
    const targetScope = scope === "study" && study ? "study" : "global"
    const key = (targetScope === "study" && study ? `study:${study.id}` : "global") + suffix
    const prior = historyByScope[key] ?? []

    const chatHistory: ChatMessage[] = []
    for (const ex of prior.slice(-3)) {
      if (ex.response) {
        chatHistory.push({ role: "user", content: ex.question.slice(0, 2000) })
        chatHistory.push({ role: "assistant", content: ex.response.answer.slice(0, 2000) })
      }
    }

    setHistoryByScope((prev) => ({
      ...prev,
      [key]: [...(prev[key] ?? []), { question: text }],
    }))
    setPending(true)

    try {
      const response = await api.askAssistant({
        message: text,
        study_id: targetScope === "study" && study ? study.id : null,
        history: chatHistory,
        scope: targetScope,
        scenario,
      })
      setHistoryByScope((prev) => {
        const list = [...(prev[key] ?? [])]
        list[list.length - 1] = { question: text, response }
        return { ...prev, [key]: list }
      })
    } catch (err) {
      let msg =
        locale === "ru"
          ? "Не удалось получить ответ от ИИ-ассистента."
          : "Failed to get a response from the AI Assistant."
      if (err instanceof ApiError) {
        if (err.status === 429) {
          msg =
            locale === "ru"
              ? `Превышен лимит запросов.${err.retryAfter ? ` Повторите через ${err.retryAfter} с.` : ""}`
              : `Rate limit exceeded.${err.retryAfter ? ` Retry after ${err.retryAfter} s.` : ""}`
        } else if (err.status === 503) {
          msg =
            locale === "ru"
              ? "Сервис ИИ временно недоступен (503)."
              : "AI service temporarily unavailable (503)."
        } else if (err.status === 504) {
          msg =
            locale === "ru"
              ? "Превышено время ожидания ответа ИИ (504)."
              : "AI response timed out (504)."
        } else {
          msg = err.message
        }
      }
      setHistoryByScope((prev) => {
        const list = [...(prev[key] ?? [])]
        list[list.length - 1] = { question: text, error: msg }
        return { ...prev, [key]: list }
      })
    } finally {
      setPending(false)
    }
  }

  function clear() {
    setHistoryByScope((prev) => ({ ...prev, [activeKey]: [] }))
  }

  return {
    scope,
    setScope,
    study,
    scenario,
    exchanges,
    pending,
    send,
    clear,
  }
}

function RichCitedText({
  text,
  citations,
  onClickCitation,
  locale,
}: {
  text: string
  citations: Citation[]
  onClickCitation: (index: number) => void
  locale: Locale
}) {
  const parts = text.split(/(\[\d+\])/g)
  return (
    <p className="chat-answer-text">
      {parts.map((part, idx) => {
        const m = /^\[(\d+)\]$/.exec(part)
        if (m) {
          const num = Number(m[1])
          const cite = citations[num - 1]
          return (
            <button
              key={idx}
              type="button"
              className="inline-citation-badge"
              title={
                cite
                  ? `${cite.title}${cite.locator ? ` · ${cite.locator}` : ""}`
                  : locale === "ru" ? `Источник [${num}]` : `Source [${num}]`
              }
              onClick={() => onClickCitation(num - 1)}
            >
              [{num}]
            </button>
          )
        }
        return <span key={idx}>{part}</span>
      })}
    </p>
  )
}

const RAG_PROGRESS_STAGES: Record<Locale, string[]> = {
  en: [
    "Stage 1/3: Retrieving vector chunks from NASA PSI (pgvector)…",
    "Stage 2/3: Neural reranking of experimental reports…",
    "Stage 3/3: Synthesizing grounded answer and verifying [n] citations…",
  ],
  ru: [
    "Этап 1/3: Поиск векторных чанков в базе NASA PSI (pgvector)…",
    "Этап 2/3: Нейросетевой реранкинг экспериментальных отчётов…",
    "Этап 3/3: Синтез ответа и верификация инлайн-цитат [n]…",
  ],
}

function PendingRagStage({ locale }: { locale: Locale }) {
  const [stage, setStage] = useState(0)
  const stages = RAG_PROGRESS_STAGES[locale]
  useEffect(() => {
    const id = window.setInterval(() => {
      setStage((s) => (s < stages.length - 1 ? s + 1 : s))
    }, 1800)
    return () => window.clearInterval(id)
  }, [stages.length])
  return <p className="muted">{stages[stage]}</p>
}

function CitationList({
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
  return (
    <div className="chat-citations">
      {citations.map((c, idx) => (
        <details
          key={`${c.chunk_id}-${idx}`}
          open={activeIndex === idx}
          onToggle={(e) => {
            if ((e.currentTarget as HTMLDetailsElement).open) onToggleIndex(idx)
          }}
        >
          <summary>
            [{idx + 1}] {c.title}
            {c.locator ? ` · ${c.locator}` : ""}
          </summary>
          <p>{c.excerpt}</p>
          <a href={c.url} target="_blank" rel="noreferrer">
            {locale === "ru" ? "Открыть источник" : "Open source"} <ArrowUpRight size={13} />
          </a>
        </details>
      ))}
    </div>
  )
}

export function AssistantChat({
  chat,
  onOpenPage,
  onCollapse,
  onSelectStudy,
}: {
  chat: ReturnType<typeof useStudyChat>
  onOpenPage?: () => void
  onCollapse?: () => void
  onSelectStudy?: (id: string) => void
}) {
  const locale = useLocale()
  const [draft, setDraft] = useState("")
  const [openCitationKey, setOpenCitationKey] = useState<string | null>(null)
  const log = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)
  const { scope, setScope, study, scenario, exchanges, pending, send, clear } = chat

  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight
  }, [exchanges.length, pending])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!draft.trim() || pending) return
    void send(draft)
    setDraft("")
    input.current?.focus()
  }

  const starterSuggestions =
    scope === "study" && study
      ? locale === "ru"
        ? [
            `Основные выводы ${study.title.split(" (")[0]}?`,
            "Условия O₂, давления и оборудования?",
            "Применимость к лунной базе (34% O₂)?",
          ]
        : [
            `What are the key findings of ${study.title.split(" (")[0]}?`,
            "What O₂, pressure, and hardware conditions were tested?",
            "How does this apply to a lunar habitat (34% O₂)?",
          ]
      : locale === "ru"
        ? [
            "Какие параметры для моделирования можно извлечь из этих источников?",
            "Какие исследования полезны для разработки датчиков и систем тушения?",
            "Какие результаты применимы к пожарной безопасности на Земле?",
          ]
        : [
            "What modeling boundary parameters can be extracted from these NASA sources?",
            "Which studies inform spacecraft smoke detection and fire suppression?",
            "Which microgravity combustion findings apply to lunar habitats (34% O₂)?",
          ]

  const lastSuggestions =
    exchanges.length > 0
      ? exchanges[exchanges.length - 1]?.response?.suggested_questions ?? []
      : starterSuggestions

  return (
    <section className="assistant">
      <div className="assistant-header">
        <div className="assistant-title-group">
          <div className="assistant-avatar">
            <Bot size={18} />
          </div>
          <div>
            <h2>{locale === "ru" ? "ИИ-ассистент по исследованиям" : "AI Research Assistant"}</h2>
            <span>
              {scope === "study" && study
                ? study.category
                : locale === "ru" ? "Весь каталог NASA PSI" : "Full NASA PSI Catalog"}
            </span>
          </div>
        </div>
        <div className="assistant-head-actions">
          {exchanges.length > 0 && (
            <button
              type="button"
              className="icon-button"
              title={locale === "ru" ? "Новый диалог" : "New conversation"}
              aria-label={locale === "ru" ? "Очистить диалог" : "Clear conversation"}
              onClick={clear}
            >
              <Reset size={16} />
            </button>
          )}
          {onOpenPage && (
            <button
              type="button"
              className="icon-button"
              aria-label={locale === "ru" ? "Развернуть ассистента" : "Expand assistant"}
              title={locale === "ru" ? "Развернуть на весь экран" : "Expand full screen"}
              onClick={onOpenPage}
            >
              <ArrowUpRight size={17} />
            </button>
          )}
          {onCollapse && (
            <button
              type="button"
              className="icon-button"
              aria-label={locale === "ru" ? "Свернуть чат" : "Collapse chat"}
              title={locale === "ru" ? "Свернуть панель ИИ-ассистента" : "Collapse AI Assistant panel"}
              onClick={onCollapse}
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      {scenario && (
        <p className="muted">
          {locale === "ru"
            ? `Условия запроса · ${scenario.o2_pct}% O₂ · ${scenario.pressure_kpa} кПа · ${scenario.flow_cms} см/с · ${scenario.gravity_g} g`
            : `Query scenario · ${scenario.o2_pct}% O₂ · ${scenario.pressure_kpa} kPa · ${scenario.flow_cms} cm/s · ${scenario.gravity_g} g`}
        </p>
      )}
      <div className="chat-body" ref={log}>
        {exchanges.length === 0 && (
          <div className="chat-intro-brief">
            <p className="chat-intro-title">
              {locale === "ru"
                ? "Задайте вопрос об условиях, измерениях или применимости исследования."
                : "Ask a question about experimental conditions, measurements, or mission applicability."}
            </p>
            {study && onSelectStudy && (
              <button type="button" className="inline-study-pill" onClick={() => onSelectStudy(study.id)}>
                {study.title.split(" (")[0]} <ArrowUpRight size={12} />
              </button>
            )}
          </div>
        )}

        <div
          className="chat-log"
          role="log"
          aria-label={locale === "ru" ? "История сообщений" : "Message history"}
          tabIndex={exchanges.length ? 0 : undefined}
        >
          {exchanges.map(({ question, response, error }, index) => (
            <div className="chat-exchange" key={index}>
              <p className="chat-message chat-question">{question}</p>

              {!response && !error && (
                <div className="chat-answer-block">
                  <PendingRagStage locale={locale} />
                </div>
              )}

              {error && (
                <div className="chat-answer-block chat-error-text">
                  <p>{error}</p>
                </div>
              )}

              {response && (
                <div className="chat-answer-block">
                  {response.status === "insufficient_evidence" && (
                    <span className="chat-status-tag">
                      {locale === "ru" ? "Недостаточно данных в источниках" : "Insufficient evidence in primary sources"}
                    </span>
                  )}
                  <RichCitedText
                    text={response.answer}
                    citations={response.citations}
                    onClickCitation={(citeIdx) => setOpenCitationKey(`${index}:${citeIdx}`)}
                    locale={locale}
                  />
                  {response.related_study_ids.length > 0 && onSelectStudy && (
                    <div className="chat-related-pills">
                      {response.related_study_ids.map((id) => (
                        <button key={id} type="button" className="inline-study-pill" onClick={() => onSelectStudy(id)}>
                          {id} <ArrowUpRight size={12} />
                        </button>
                      ))}
                    </div>
                  )}
                  <CitationList
                    citations={response.citations}
                    activeIndex={
                      openCitationKey?.startsWith(`${index}:`)
                        ? Number(openCitationKey.split(":")[1])
                        : null
                    }
                    onToggleIndex={(citeIdx) => setOpenCitationKey(`${index}:${citeIdx}`)}
                    locale={locale}
                  />
                  {response.status === "answered" && response.citations.length > 0 && (
                    <p className="muted" style={{ fontSize: "0.78rem", marginTop: "0.45rem" }}>
                      {locale === "ru"
                        ? "Проверка ссылок подтверждает привязку [n] к фрагментам отчётов; сверяйте конкретные числа и пересчёты с раскрытой выдержкой источника."
                        : "Citations link [n] markers to retrieved NASA excerpts; verify specific numerical values and unit conversions against the expanded excerpt."}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-composer-area">
        {lastSuggestions.length > 0 && (
          <div className="chat-pill-suggestions">
            {lastSuggestions.map((q) => (
              <button
                key={q}
                type="button"
                disabled={pending}
                onClick={() => {
                  void send(q)
                  input.current?.focus()
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <form className="chat-composer-card" onSubmit={submit}>
          <textarea
            ref={input}
            rows={2}
            aria-label={locale === "ru" ? "Сообщение ассистенту" : "Message to assistant"}
            placeholder={locale === "ru" ? "Спросите что угодно…" : "Ask anything about NASA fire safety studies…"}
            maxLength={2000}
            disabled={pending}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return
              event.preventDefault()
              event.currentTarget.form?.requestSubmit()
            }}
          />
          <div className="chat-composer-footer">
            <div className="composer-scope-pills" role="group" aria-label={locale === "ru" ? "Область поиска" : "Search scope"}>
              <button
                type="button"
                disabled={!study}
                aria-pressed={scope === "study"}
                onClick={() => setScope("study")}
              >
                <Sparkles size={12} /> {study ? study.category : locale === "ru" ? "Исследование" : "Current Study"}
              </button>
              <button
                type="button"
                aria-pressed={scope === "global"}
                onClick={() => setScope("global")}
              >
                {locale === "ru" ? "Весь каталог" : "Full Catalog"}
              </button>
            </div>
            <button
              type="submit"
              className="composer-send-btn"
              aria-label={locale === "ru" ? "Отправить сообщение" : "Send message"}
              disabled={pending || !draft.trim()}
            >
              <Send size={15} />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
