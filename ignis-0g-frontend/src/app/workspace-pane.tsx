import { useEffect, useRef, type ReactNode } from "react"
import { X } from "@/components/ui/icons"
import { useLocale } from "@/i18n"

export function WorkspacePane({
  id,
  label,
  className,
  breakpoint,
  expanded,
  drawer,
  onClose,
  resizeWidth,
  onResize,
  children,
}: {
  id: string
  label: string
  className: string
  breakpoint: number
  expanded: boolean
  drawer: boolean
  onClose: () => void
  resizeWidth?: number | null
  onResize?: (width: number) => void
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const locale = useLocale()
  const ru = locale === "ru"

  function resize(clientX: number) {
    const right = ref.current?.getBoundingClientRect().right ?? window.innerWidth
    const max = window.innerWidth <= breakpoint
      ? window.innerWidth * 0.94
      : window.innerWidth - 550
    onResize?.(Math.round(Math.max(300, Math.min(max, right - clientX))))
  }

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpoint}px)`)
    function sync() {
      const dialog = ref.current
      if (!dialog) return
      const modal = query.matches && drawer
      const visible = query.matches ? drawer : expanded
      if (dialog.open && (!visible || dialog.matches(":modal") !== modal)) dialog.close()
      if (!visible || dialog.open) return
      if (modal) dialog.showModal()
      else {
        const focused = document.activeElement
        dialog.show()
        if (focused instanceof HTMLElement && focused !== document.body) focused.focus()
        else if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
      }
    }

    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [breakpoint, expanded, drawer])

  return (
    <dialog
      id={id}
      ref={ref}
      className={className}
      aria-label={label}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && event.currentTarget.matches(":modal")) onClose()
      }}
    >
      {onResize && (
        <div
          className="pane-resize-handle"
          role="separator"
          aria-orientation="vertical"
          aria-label={ru ? "Изменить ширину чата" : "Resize chat"}
          aria-valuemin={300}
          aria-valuemax={Math.max(300, Math.floor(window.innerWidth <= breakpoint ? window.innerWidth * 0.94 : window.innerWidth - 550))}
          aria-valuenow={resizeWidth ?? Math.round(Math.min(window.innerWidth * 0.32, 500))}
          tabIndex={0}
          onPointerDown={(event) => {
            if (event.button !== 0) return
            event.preventDefault()
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) resize(event.clientX)
          }}
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
            event.preventDefault()
            const rect = ref.current?.getBoundingClientRect()
            if (rect) resize(rect.left + (event.key === "ArrowLeft" ? -20 : 20))
          }}
        />
      )}
      <div className="pane-drawer-heading">
        <strong>{label}</strong>
        <button
          type="button"
          className="icon-button"
          aria-label={ru ? `Закрыть: ${label}` : `Close: ${label}`}
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
      {children}
    </dialog>
  )
}
