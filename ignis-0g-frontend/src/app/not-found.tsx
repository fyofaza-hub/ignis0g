import { useEffect, useRef, useState } from "react"
import { ArrowRight, FlaskConical } from "@/components/ui/icons"
import { LanguageSwitch, useLocale } from "@/i18n"
import "./not-found.css"

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
}

export function NotFoundPage({ pathname }: { pathname?: string }) {
  const locale = useLocale()
  const ru = locale === "ru"
  const [gravity, setGravity] = useState<"0g" | "1g">("0g")
  const [pulseCount, setPulseCount] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const sparksRef = useRef<Spark[]>([])
  const gravityRef = useRef<"0g" | "1g">(gravity)
  gravityRef.current = gravity

  const currentPath =
    pathname ?? (typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : "/")

  useEffect(() => {
    document.title = ru ? "404 — Сектор не найден | IGNIS 0G" : "404 — Sector Not Found | IGNIS 0G"
  }, [ru])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reducedMotion =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    const size = 340
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const cx = size / 2
    const cy = size * 0.57

    function spawnSpark(burst = false): Spark {
      const angle = Math.random() * Math.PI * 2
      const radius = burst ? 6 + Math.random() * 14 : 18 + Math.random() * 44
      const speed = burst ? 0.65 + Math.random() * 1.45 : 0.18 + Math.random() * 0.55
      const upBias = gravityRef.current === "1g" ? -(0.65 + Math.random() * 0.85) : 0
      return {
        x: cx + Math.cos(angle) * radius * 0.72,
        y: cy + Math.sin(angle) * radius * 0.65,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed * (gravityRef.current === "1g" ? 0.4 : 1) + upBias,
        life: 0,
        maxLife: 45 + Math.random() * 65,
        size: burst ? 1.5 + Math.random() * 2.4 : 1 + Math.random() * 1.8,
        hue: 194 + Math.random() * 34,
      }
    }

    if (sparksRef.current.length === 0) {
      for (let i = 0; i < 34; i++) {
        const s = spawnSpark(false)
        s.life = Math.random() * s.maxLife * 0.8
        sparksRef.current.push(s)
      }
    }

    if (reducedMotion) {
      ctx.clearRect(0, 0, size, size)
      for (const s of sparksRef.current) {
        ctx.fillStyle = `hsla(${s.hue}, 96%, 72%, 0.65)`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
      }
      return
    }

    let frameId = 0
    function tick() {
      if (!ctx) return
      ctx.clearRect(0, 0, size, size)
      ctx.globalCompositeOperation = "lighter"

      while (sparksRef.current.length < 44) {
        sparksRef.current.push(spawnSpark(false))
      }

      const next: Spark[] = []
      for (const s of sparksRef.current) {
        s.life += 1
        if (s.life >= s.maxLife) continue
        if (gravityRef.current === "1g") {
          s.vy -= 0.018
          s.vx *= 0.985
        } else {
          // Gentle orbital diffusion away from the spherical cool-flame core.
          const dx = s.x - cx
          const dy = s.y - cy
          s.vx += dx * 0.0007
          s.vy += dy * 0.0007
        }
        s.x += s.vx
        s.y += s.vy

        const progress = s.life / s.maxLife
        const alpha = Math.sin(progress * Math.PI) * 0.85
        ctx.fillStyle = `hsla(${s.hue}, 98%, ${72 + progress * 14}%, ${alpha})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size * (1 - progress * 0.35), 0, Math.PI * 2)
        ctx.fill()
        next.push(s)
      }
      sparksRef.current = next
      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [])

  function igniteBurst() {
    setPulseCount((count) => count + 1)
    const size = 340
    const cx = size / 2
    const cy = size * 0.57
    for (let i = 0; i < 16; i++) {
      const angle = (Math.PI * 2 * i) / 16 + Math.random() * 0.3
      const speed = 0.8 + Math.random() * 1.4
      sparksRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + (gravity === "1g" ? -0.9 : 0),
        life: 0,
        maxLife: 40 + Math.random() * 45,
        size: 1.6 + Math.random() * 2.2,
        hue: 192 + Math.random() * 38,
      })
    }
  }

  return (
    <div className="nf-page">
      <div className="nf-grid-bg" aria-hidden="true" />
      <header className="nf-header">
        <a className="nf-brand" href="/" aria-label={ru ? "IGNIS 0G — на главную" : "IGNIS 0G home"}>
          <img src="/ignis-logo.png" alt="" width={28} height={28} style={{ borderRadius: 6 }} />
          <span>
            <span>IGNIS</span> <span className="nf-brand-zero">0G</span>
          </span>
        </a>
        <LanguageSwitch />
      </header>

      <main className="nf-main">
        <section className="nf-chamber" aria-labelledby="not-found-title">
          <div
            className="nf-stage"
            data-gravity={gravity}
            onClick={igniteBurst}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                igniteBurst()
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={
              ru
                ? "Синее пламя в невесомости — нажмите для всплеска искр"
                : "Microgravity blue flame — press for an ignition pulse"
            }
          >
            <div className="nf-chamber-rings" aria-hidden="true" />
            <div className="nf-aurora" aria-hidden="true" />
            <canvas ref={canvasRef} className="nf-sparks-canvas" aria-hidden="true" />

            <div className="nf-flame-wrap" aria-hidden="true">
              <svg className="nf-flame-svg" viewBox="0 0 220 240" fill="none">
                <defs>
                  <radialGradient id="nf-blue-sphere" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.95" />
                    <stop offset="38%" stopColor="#38bdf8" stopOpacity="0.82" />
                    <stop offset="72%" stopColor="#2563eb" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="nf-tongue-cobalt" x1="110" y1="28" x2="110" y2="196" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.95" />
                    <stop offset="55%" stopColor="#2563eb" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="nf-tongue-cyan" x1="110" y1="56" x2="110" y2="188" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.98" />
                    <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.92" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.15" />
                  </linearGradient>
                  <radialGradient id="nf-core-white" cx="50%" cy="48%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="45%" stopColor="#bae6fd" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Spherical 0g outer CH* diffusion corona */}
                <circle className="nf-sphere-halo" cx="110" cy="134" r="76" fill="url(#nf-blue-sphere)" />
                <circle className="nf-sphere-halo" cx="110" cy="134" r="34" fill="url(#nf-core-white)" />

                {/* Outer blue flame lobes */}
                <path
                  className="nf-tongue-outer"
                  d="M110 34 C132 68, 166 96, 162 140 C158 175, 136 192, 110 192 C84 192, 62 175, 58 140 C54 96, 88 68, 110 34 Z"
                  fill="url(#nf-tongue-cobalt)"
                />

                {/* Mid electric-cyan reaction zone */}
                <path
                  className="nf-tongue-mid"
                  d="M110 58 C128 88, 148 108, 144 142 C140 169, 126 184, 110 184 C94 184, 80 169, 76 142 C72 108, 92 88, 110 58 Z"
                  fill="url(#nf-tongue-cyan)"
                />

                {/* Hot inner blue-white core */}
                <path
                  className="nf-tongue-inner"
                  d="M110 92 C121 110, 130 124, 128 144 C126 161, 118 170, 110 170 C102 170, 94 161, 92 144 C90 124, 99 110, 110 92 Z"
                  fill="url(#nf-core-white)"
                />
              </svg>
            </div>

            <div className="nf-reflection" aria-hidden="true" />
          </div>

          <div className="nf-mode-row">
            <button
              type="button"
              className="nf-mode-pill"
              onClick={() => setGravity((prev) => (prev === "0g" ? "1g" : "0g"))}
              aria-pressed={gravity === "1g"}
            >
              <span className="nf-dot-live" aria-hidden="true" />
              {gravity === "0g"
                ? ru
                  ? "Режим 0g · сферическое синее пламя"
                  : "0g Mode · Spherical Blue Flame"
                : ru
                  ? "Режим 1g · тяга конвекции"
                  : "1g Mode · Buoyant Convection"}
            </button>
            {pulseCount > 0 && (
              <span className="nf-telemetry" style={{ padding: "5px 10px" }}>
                CH* {ru ? "импульс" : "pulse"} #{pulseCount}
              </span>
            )}
          </div>

          <p className="nf-code" aria-label="404">
            404
          </p>
          <h1 id="not-found-title" className="nf-title">
            {ru ? "Ой! В этом отсеке ничего не горит" : "Oops! Nothing is burning in this chamber"}
          </h1>
          <p className="nf-subtitle">
            {ru
              ? "Запрошенный маршрут не найден в IGNIS 0G. Остался только холодный синий огонёк — вернитесь на главную или в исследовательский каталог NASA PSI."
              : "The requested route could not be found in IGNIS 0G. Only a cool blue 0g flame lingers here — head back home or jump into the NASA PSI Explorer."}
          </p>

          <div className="nf-telemetry" role="note">
            <span>
              STATUS: <strong>404_NO_FLAME</strong>
            </span>
            <span>·</span>
            <span>
              SPECTRA: <strong>CH* ~430 nm</strong>
            </span>
            <span>·</span>
            <span className="nf-path-chip">PATH: {currentPath}</span>
          </div>

          <div className="nf-actions">
            <a className="nf-btn nf-btn-primary" href="/">
              {ru ? "На главную" : "Back to Home"} <ArrowRight size={16} />
            </a>
            <a className="nf-btn nf-btn-secondary" href="/explorer">
              <FlaskConical size={16} /> {ru ? "Открыть Explorer" : "Open Explorer"}
            </a>
          </div>

          <p className="nf-note">
            {ru
              ? "Факт 0g: без конвекции пламя не тянется вверх свечой и не образует яркой сажи — кислород поступает сферой, поэтому огонь светится синим."
              : "0g physics note: without buoyant convection, soot formation drops and oxygen diffuses spherically — turning microgravity cool flames distinctly blue."}
          </p>
        </section>
      </main>
    </div>
  )
}

export default NotFoundPage
