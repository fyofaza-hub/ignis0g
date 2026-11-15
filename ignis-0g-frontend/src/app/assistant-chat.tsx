import { useEffect, useRef, useState, type FormEvent } from "react"
import { ArrowUpRight, Bot, ChevronRight, Reset, Send, Sparkles } from "@/components/ui/icons"
import { ApiError, api } from "@/api/client"
import { localizeCategory } from "@/domain/knowledge"
import type { ChatMessage, ChatResponse, Scenario, StudySummary } from "@/domain/types"
import { useLocale, type Locale } from "@/i18n"
import { CitationInspector, CitationList, RichCitedText } from "./citation-view"

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
  const prevStudyIdRef = useRef<string | undefined>(study?.id)

  const activeKey = scope === "study" && study ? `study:${study.id}` : "global"
  const exchanges = historyByScope[activeKey] ?? []

  useEffect(() => {
    if (!study) {
      if (scope === "study") setScope("global")
    } else if (prevStudyIdRef.current !== study.id) {
      setScope("study")
    }
    prevStudyIdRef.current = study?.id
  }, [study, scope])

  async function send(question: string) {
    const text = question.trim()
    if (!text || pending) return
    const targetScope = scope === "study" && study ? "study" : "global"
    const key = targetScope === "study" && study ? `study:${study.id}` : "global"
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

function PendingRagStage({ locale }: { locale: Locale }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1)
    }, 1000)
    return () => window.clearInterval(id)
  }, [])
  const label =
    locale === "ru"
      ? "Выполняем запрос к источникам NASA PSI и проверку ответа…"
      : "Querying NASA PSI sources and verifying response…"
  const suffix = elapsedSeconds > 0 ? (locale === "ru" ? ` (${elapsedSeconds} с)` : ` (${elapsedSeconds}s)`) : ""
  return (
    <p className="muted" role="status" aria-live="polite">
      {label}
      {suffix}
    </p>
  )
}

export function AssistantChat({
  chat,
  studies = [],
  onOpenPage,
  onCollapse,
  onSelectStudy,
}: {
  chat: ReturnType<typeof useStudyChat>
  studies?: StudySummary[]
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
  const studyShortTitle = study ? study.title.split(" (")[0] : ""

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
                ? `${studyShortTitle} · ${localizeCategory(study.category, locale)}`
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

              {response && (() => {
                const activeIndex =
                  openCitationKey?.startsWith(`${index}:`)
                    ? Number(openCitationKey.split(":")[1])
                    : null
                const activeCitation =
                  activeIndex !== null && Number.isInteger(activeIndex)
                    ? response.citations[activeIndex]
                    : undefined
                const toggleCitation = (citeIdx: number) => {
                  const key = `${index}:${citeIdx}`
                  setOpenCitationKey((prev) => (prev === key ? null : key))
                }
                return (
                  <div className="chat-answer-block">
                    {response.status === "insufficient_evidence" && (
                      <span className="chat-status-tag">
                        {locale === "ru" ? "Недостаточно данных в источниках" : "Insufficient evidence in primary sources"}
                      </span>
                    )}
                    <RichCitedText
                      text={response.answer}
                      citations={response.citations}
                      activeIndex={activeIndex}
                      onClickCitation={toggleCitation}
                      locale={locale}
                    />
                    {activeCitation && activeIndex !== null && (
                      <CitationInspector
                        citation={activeCitation}
                        index={activeIndex}
                        onClose={() => setOpenCitationKey(null)}
                        locale={locale}
                      />
                    )}
                    {response.related_study_ids.length > 0 && onSelectStudy && (
                      <div className="chat-related-pills">
                        {response.related_study_ids.map((id) => {
                          const found = studies.find((s) => s.id === id)
                          const label = found ? found.title.split(" (")[0] : id
                          return (
                            <button key={id} type="button" className="inline-study-pill" onClick={() => onSelectStudy(id)}>
                              {label} <ArrowUpRight size={12} />
                            </button>
                          )
                        })}
                      </div>
                    )}
                    <CitationList
                      citations={response.citations}
                      activeIndex={activeIndex}
                      onToggleIndex={toggleCitation}
                      locale={locale}
                    />
                    {response.status === "answered" && response.citations.length > 0 && (
                      <p className="muted" style={{ fontSize: "0.78rem", marginTop: "0.45rem" }}>
                        {locale === "ru"
                          ? "Нажмите на маркер [n], чтобы сразу открыть фрагмент источника, страницу/таблицу и ссылку NASA."
                          : "Click any [n] marker to immediately inspect the source excerpt, page/table locator, and NASA link."}
                      </p>
                    )}
                  </div>
                )
              })()}
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
            {study ? (
              <div className="composer-scope-pills" role="group" aria-label={locale === "ru" ? "Область поиска" : "Search scope"}>
                <button
                  type="button"
                  aria-pressed={scope === "study"}
                  onClick={() => setScope("study")}
                >
                  <Sparkles size={12} /> {studyShortTitle}
                </button>
                <button
                  type="button"
                  aria-pressed={scope === "global"}
                  onClick={() => setScope("global")}
                >
                  {locale === "ru" ? "Весь каталог" : "Full Catalog"}
                </button>
              </div>
            ) : (
              <span className="composer-scope-badge">
                {locale === "ru" ? "Поиск по всему каталогу" : "Searching full catalog"}
              </span>
            )}
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
