import fs from "node:fs/promises"
import { expect, test, type Page, type Route } from "@playwright/test"
import { setLocale } from "../src/i18n.ts"
import { mockFetch } from "../src/mocks/transport.ts"

type ApiOverride = (params: {
  apiPath: string
  method: string
  body: string | null
  route: Route
}) => Promise<boolean> | boolean

async function setupApiRoutes(page: Page, override?: ApiOverride) {
  await page.route("**/api/v1/**", async (route) => {
    const req = route.request()
    const reqUrl = new URL(req.url())
    const apiPath = `${reqUrl.pathname.replace(/^\/api\/v1/, "")}${reqUrl.search}`
    const method = req.method()
    const body = req.postData()

    let pageLang: string | null = null
    try {
      const currentUrl = page.url()
      if (currentUrl && currentUrl.startsWith("http")) {
        pageLang = new URL(currentUrl).searchParams.get("lang")
      }
    } catch {
      // Ignore transient URL reads during navigation
    }
    setLocale(pageLang === "ru" ? "ru" : "en")

    if (override) {
      const handled = await override({ apiPath, method, body, route })
      if (handled) return
    }

    const res = await mockFetch(apiPath, { method, body: body ?? undefined })
    const text = await res.text()
    const headers: Record<string, string> = {}
    res.headers.forEach((value, key) => {
      headers[key] = value
    })
    await route.fulfill({
      status: res.status,
      headers,
      body: text,
    })
  })
}

test.describe("Ignis 0G scientific Explorer E2E workflows", () => {
  test("live queries preserve server content and empty collections in both locales", async ({ page }) => {
    await setupApiRoutes(page, async ({ apiPath, method, body, route }) => {
      const response = await mockFetch(apiPath, { method, body: body ?? undefined })
      const data = await response.json()
      if (apiPath.startsWith("/studies?")) {
        for (const item of data.items) {
          item.title = `SERVER ${item.id}`
          item.description = "Server description"
        }
      } else if (apiPath === "/studies/flex-1") {
        Object.assign(data, {
          title: "SERVER flex-1", description: "Server description", methodology: "Server methodology",
          conditions: { pressure_kpa: [42, 43], fuel_material: "Server material", o2_pct: null },
          findings: [], safety_implications: [], media: [], datasets: [],
        })
      } else if (/\/(runs|datasets|relations)$/.test(apiPath)) {
        await route.fulfill({ json: [] })
        return true
      } else if (apiPath.startsWith("/nexus/graph")) {
        await route.fulfill({ json: { nodes: [], edges: [], truncated: false } })
        return true
      } else if (apiPath === "/rank") {
        for (const item of data) { item.title = `SERVER ${item.study_id}`; item.material = "Server material" }
      }
      await route.fulfill({ json: data })
      return true
    })
    for (const locale of ["en", "ru"]) {
      await page.goto(`/explorer?lang=${locale}`)
      await expect(page.locator(".ranking-card").first()).toContainText("SERVER")
      const result = await page.evaluate(async (lang) => {
        const modulePath = "/src/api/queries.ts"
        const { studyQueries } = await import(modulePath)
        const context = { signal: new AbortController().signal }
        return Promise.all([
          studyQueries.list({}, lang).queryFn(context),
          studyQueries.detail("flex-1", lang).queryFn(context),
          studyQueries.runs("flex-1").queryFn(context),
          studyQueries.datasets("flex-1", lang).queryFn(context),
          studyQueries.relations("flex-1", lang).queryFn(context),
          studyQueries.graph(undefined, 1, lang).queryFn(context),
        ])
      }, locale)
      expect(result[0].items.every((item: { title: string }) => item.title.startsWith("SERVER"))).toBe(true)
      expect(result[1]).toMatchObject({
        title: "SERVER flex-1", methodology: "Server methodology",
        conditions: { pressure_kpa: [42, 43], fuel_material: "Server material", o2_pct: null },
        findings: [], safety_implications: [], media: [], datasets: [],
      })
      expect(result[1].conditions.flow_cms).toBeUndefined()
      expect(result.slice(2, 5)).toEqual([[], [], []])
      expect(result[5]).toEqual({ nodes: [], edges: [], truncated: false })
    }
  })

  test("empty live runs stay empty and map extremes are not clamped", async ({ page }, testInfo) => {
    let empty = true
    await setupApiRoutes(page, async ({ apiPath, route }) => {
      if (empty && apiPath.endsWith("/runs")) {
        await route.fulfill({ json: [] })
        return true
      }
      return false
    })
    await page.goto("/explorer?section=environments&o2=100&p=1&flow=60&g=0.16")
    await expect(page.locator(".envelope-status")).toContainText("Insufficient data")
    await expect(page.locator(".psi-run-dot")).toHaveCount(0)
    await expect(page.locator(".psi-run-inspector")).toHaveCount(0)
    await expect(page.locator(".envelope-svg")).toContainText("100%")
    await expect(page.locator(".envelope-status")).not.toHaveClass(/status-(safe|danger)/)
    await page.screenshot({ path: testInfo.outputPath("environments-empty.png"), fullPage: true })

    empty = false
    await page.reload()
    await expect(page.locator(".psi-run-dot").first()).toBeVisible()
    await expect(page.locator(".envelope-status")).toContainText("No match for all four")
    await page.getByRole("button", { name: "Liquid Droplets", exact: true }).click()
    await expect(page.locator(".psi-run-inspector")).toContainText(/K=.*mm²\/s/)
    await page.getByRole("button", { name: "Show BASS-II schematic" }).click()
    await page.screenshot({ path: testInfo.outputPath("environments-data.png"), fullPage: true })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.screenshot({ path: testInfo.outputPath("environments-mobile.png"), fullPage: true })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  })

  test("score breakdown popover shows matched fields, missing data, and joint run verification", async ({ page }) => {
    await setupApiRoutes(page)
    await page.goto("/explorer")

    //Wait for ranking cards on Dashboard (ISS Cabin preset: 21% O2, 101.3 kPa, 10 cm/s, 0g)
    const firstCard = page.locator(".ranking-card").first()
    await expect(firstCard).toBeVisible()

    // Click score badge on BASS / BASS-II or FLEX-1 card to pin score breakdown
    const firstScoreBtn = firstCard.locator(".ranking-score-badge")
    await firstScoreBtn.click()
    const firstPopover = firstCard.locator(".ranking-score-popover")
    await expect(firstPopover).toBeVisible()
    await expect(firstPopover).toContainText(/Match score:/i)
    await expect(firstPopover).toContainText(/Matched:/i)
    await expect(firstPopover).toContainText(/No data:/i)
    await expect(firstPopover).toContainText(/not confirmed by a single run/i)

    // Hover affordance also reveals breakdown on another card cleanly
    const secondCard = page.locator(".ranking-card").nth(1)
    await secondCard.locator(".ranking-score-wrap").hover()
    await expect(secondCard.locator(".ranking-score-popover")).toBeVisible()

    // Direct joint-run match scenario: FLEX-1 fixed quiescent 21% O2, 101.325 kPa, 0 cm/s, 0g
    await page.goto("/explorer?o2=21&p=101.325&flow=0&g=0")
    const flexCard = page.locator(".ranking-card", { hasText: "FLEX-1 (Flame Extinguishment Experiment)" })
    await expect(flexCard).toBeVisible()
    await expect(flexCard).toContainText(/run FLEX-1\/FLEX-004/i)

    await flexCard.locator(".ranking-score-badge").click()
    const flexPopover = flexCard.locator(".ranking-score-popover")
    await expect(flexPopover).toBeVisible()
    await expect(flexPopover).toContainText(/Verified by specific test run/i)
    await expect(flexPopover).toContainText(/FLEX-1\/FLEX-004/)

    // The schematic is optional and never produces a safety verdict.
    await page.goto("/explorer?section=environments&o2=12&p=101.3&flow=5&g=0")
    await expect(page.locator(".envelope-status")).toContainText(/does not calculate fire risk/i)
    await expect(page.locator(".envelope-svg polyline")).toHaveCount(0)
    await page.getByRole("button", { name: "Show BASS-II schematic" }).click()
    await expect(page.locator(".envelope-svg polyline")).toHaveCount(1)
    await expect(page.locator(".envelope-chart-wrap")).toContainText(/not measurements or a calibrated boundary/i)

  })

  test("complete research workflow: open study -> inspect [1] citation -> choose conditions -> compare -> export CSV/JSON", async ({ page }, testInfo) => {
    await setupApiRoutes(page)
    await page.goto("/explorer")

    // 1. Open FLEX-1 study dossier from Dashboard (after expanding collapsed top-6 list)
    await expect(page.locator(".ranking-card")).toHaveCount(6)
    await page.getByRole("button", { name: /Show all \(21\)/i }).click()
    const flexCard = page.locator(".ranking-card", { hasText: "FLEX-1 (Flame Extinguishment Experiment)" })
    await flexCard.getByRole("button", { name: /^Open$/ }).click()
    await expect(page.getByRole("heading", { level: 1, name: /FLEX-1/ })).toBeVisible()
    await expect(page).toHaveURL(/study=flex-1/)

    // Switch dataset -> chart tab and ensure shared dataset state stays valid
    await page.getByRole("tab", { name: "Datasets" }).click()
    await expect(page).toHaveURL(/tab=measurements/)
    await page.getByRole("tab", { name: "Charts & Media" }).click()
    await expect(page).toHaveURL(/tab=visualization/)

    // 2. Verify inline [1] citation inspector inside AI Assistant panel
    await page.getByRole("button", { name: /AI Research Assistant/i }).click()
    const inspector = page.locator("#inspector-dialog")
    await expect(inspector).toBeVisible()
    await inspector.getByRole("button", { name: /Key findings/i }).click()

    const inlineCitationBtn = inspector.locator(".inline-citation-badge", { hasText: "[1]" }).first()
    await expect(inlineCitationBtn).toBeVisible()
    await inlineCitationBtn.click()

    const citationCard = inspector.locator(".citation-inspector-card")
    await expect(citationCard).toBeVisible()
    await expect(citationCard).toContainText(/Document/i)
    await expect(citationCard).toContainText("NASA/TP-2015-216046")
    await expect(citationCard).toContainText(/Table IX, p\. 42/)
    await expect(citationCard).toContainText(/Source excerpt/i)
    const nasaLink = citationCard.locator("a.citation-nasa-link")
    await expect(nasaLink).toHaveAttribute("href", "https://ntrs.nasa.gov/citations/20150023456")

    // Collapse AI inspector and add FLEX-1 to comparison
    await inspector.getByRole("button", { name: /Collapse chat/i }).click()
    await page.locator(".study-title-row").getByRole("button", { name: /^Compare$/ }).click()

    // 3. Choose Lunar conditions preset & select a second study to compare
    await page.getByRole("navigation", { name: "Sections" }).getByRole("button", { name: "Overview" }).click()
    await page.getByRole("button", { name: "Lunar Base / Rover SEA" }).click()
    await expect(page).toHaveURL(/preset=lunar-base/)

    await expect(page.locator(".ranking-card")).toHaveCount(6)
    await page.getByRole("button", { name: /Show all \(21\)/i }).click()
    await expect(page.locator(".ranking-card")).toHaveCount(21)

    const bassCard = page.locator(".ranking-card", { hasText: "BASS / BASS-II" })
    await bassCard.getByRole("button", { name: /^Compare$/ }).click()

    // Download scenario JSON + CSV export and verify content
    const jsonDownloadPromise = page.waitForEvent("download")
    await page.getByRole("button", { name: /^JSON$/ }).click()
    const jsonDownload = await jsonDownloadPromise
    expect(jsonDownload.suggestedFilename()).toBe("ignis-scenario.json")
    const jsonPath = testInfo.outputPath("ignis-scenario.json")
    await jsonDownload.saveAs(jsonPath)
    const exportedScenario = JSON.parse(await fs.readFile(jsonPath, "utf8"))
    expect(exportedScenario.scenario.o2_pct).toBe(34)
    expect(exportedScenario.scenario.gravity_g).toBe(0.16)
    expect(Array.isArray(exportedScenario.studies)).toBe(true)

    // 4. Open Compare view -> run AI synthesis -> inspect [1] citation -> compare digitized runs -> export CSV
    await page.getByRole("button", { name: /Compare \(2\)/ }).click()
    await expect(page).toHaveURL(/section=compare/)
    await page.getByRole("button", { name: /AI Synthesis of Similarities/i }).click()

    const compareCiteBtn = page.locator(".compare-ai-result .inline-citation-badge", { hasText: "[1]" }).first()
    await expect(compareCiteBtn).toBeVisible()
    await compareCiteBtn.click()
    const compareCiteCard = page.locator(".compare-ai-result .citation-inspector-card")
    await expect(compareCiteCard).toBeVisible()
    await expect(compareCiteCard).toContainText(/NASA/i)

    // Filter and select 2 experiment runs, then export CSV
    const runsSection = page.locator("#experiment-runs")
    const checkboxes = runsSection.locator("tbody input[type='checkbox']")
    await checkboxes.nth(0).check()
    await checkboxes.nth(1).check()
    await expect(runsSection).toContainText(/Selected for comparison \(2\/4\)/)

    const csvDownloadPromise = page.waitForEvent("download")
    await runsSection.getByRole("button", { name: "Selected · CSV" }).click()
    const csvDownload = await csvDownloadPromise
    expect(csvDownload.suggestedFilename()).toBe("ignis-experiment-runs.csv")
    const csvPath = testInfo.outputPath("ignis-experiment-runs.csv")
    await csvDownload.saveAs(csvPath)
    const csvContent = await fs.readFile(csvPath, "utf8")
    expect(csvContent).toMatch(/campaign/)
    expect(csvContent).toMatch(/source_url/)
  })

  test("preserves selected conditions, filters, comparison IDs, and locale across page reload", async ({ page }) => {
    await setupApiRoutes(page)
    await page.goto("/explorer")

    // Switch to Russian UI, select Lunar preset, go to O2 Environments, filter Solid fuels & Pressure axis
    await page.getByRole("button", { name: "RU", exact: true }).click()
    await page.getByRole("button", { name: "Луна / Ровер SEA" }).click()
    await page.getByRole("button", { name: "Среды О₂" }).click()

    await page.getByRole("tab", { name: /Давление vs O₂/ }).click()
    await page.getByRole("button", { name: /Твёрдые \(ткани \/ PMMA\)/ }).click()

    // Add two solid-fuel studies to comparison from Environment scenario cards
    const bassCard = page.locator(".ranking-card", { hasText: "BASS / BASS-II" })
    const sofieCard = page.locator(".ranking-card", { hasText: "SoFIE-MIST" })
    await bassCard.getByRole("button", { name: /^Сравнить$/ }).click()
    await sofieCard.getByRole("button", { name: /^Сравнить$/ }).click()

    await expect(page).toHaveURL(/lang=ru/)
    await expect(page).toHaveURL(/section=environments/)
    await expect(page).toHaveURL(/axis=pressure-o2/)
    await expect(page).toHaveURL(/fuel=solid/)
    await expect(page).toHaveURL(/compare=bass-bass-ii-bass-m(,|%2C)sofie-mist/)

    // Full browser reload (F5) must restore every condition, filter, compare list, and locale
    await page.reload()

    await expect(page.getByRole("heading", { level: 1, name: /Условия миссии/ })).toBeVisible()
    await expect(page.getByRole("tab", { name: /Давление vs O₂/ })).toHaveAttribute("aria-selected", "true")
    await expect(page.getByRole("button", { name: /Твёрдые \(ткани \/ PMMA\)/ })).toHaveAttribute("aria-pressed", "true")
    await expect(page.locator(".nav-count")).toHaveText("2")
  })

  test("mobile 390x844 navigation, AI drawer, and score breakdown stay within viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await setupApiRoutes(page)
    await page.goto("/explorer")

    // Mobile hamburger opens sidebar navigation drawer
    const navBtn = page.getByRole("button", { name: "Menu", exact: true })
    await expect(navBtn).toBeVisible()
    await navBtn.click()
    await page.getByRole("navigation", { name: "Sections" }).getByRole("button", { name: /Studies/ }).click()
    await expect(page.getByRole("heading", { level: 1, name: /All NASA PSI Investigations/ })).toBeVisible()

    // Navigate back to Overview via mobile drawer and test score popover fits cleanly inside 390px
    await navBtn.click()
    await page.getByRole("navigation", { name: "Sections" }).getByRole("button", { name: /Overview/ }).click()
    const scoreBtn = page.locator(".ranking-card").first().locator(".ranking-score-badge")
    await scoreBtn.click()
    const popover = page.locator(".ranking-card").first().locator(".ranking-score-popover")
    await expect(popover).toBeVisible()

    const box = await popover.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.x).toBeGreaterThanOrEqual(0)
    expect(box!.x + box!.width).toBeLessThanOrEqual(390)

    const noHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    )
    expect(noHorizontalOverflow).toBe(true)

    // Mobile AI drawer opens & closes cleanly
    await page.getByRole("button", { name: "AI", exact: true }).click()
    const drawer = page.locator("#inspector-dialog")
    await expect(drawer).toBeVisible()
    await drawer.getByRole("button", { name: /^Close:/i }).click()
    await expect(drawer).toBeHidden()
  })

  test("handles API 503/500/429 failures gracefully and recovers cleanly after retry", async ({ page }) => {
    let failRank = true
    let failChat = true

    await setupApiRoutes(page, async ({ apiPath, route }) => {
      if (apiPath === "/rank" && failRank) {
        await route.fulfill({
          status: 503,
          contentType: "application/json",
          body: JSON.stringify({
            error: {
              code: "DATABASE_UNAVAILABLE",
              message: "Simulated 503 backend failure",
              request_id: "e2e-req-1",
              details: [],
            },
          }),
        })
        return true
      }
      if (apiPath === "/assistant/chat" && failChat) {
        await route.fulfill({
          status: 429,
          headers: { "Retry-After": "12", "Content-Type": "application/json" },
          body: JSON.stringify({
            error: {
              code: "RATE_LIMITED",
              message: "Rate limit exceeded",
              request_id: "e2e-req-2",
              details: [],
            },
          }),
        })
        return true
      }
      return false
    })

    await page.goto("/explorer")

    // Ranking API error renders QueryFailure without crashing app
    const failureBox = page.locator(".query-failure")
    await expect(failureBox).toBeVisible()
    await expect(failureBox).toContainText(/Failed to rank studies/i)

    // Flip recovery ON and click Retry -> cards appear
    failRank = false
    await failureBox.getByRole("button", { name: /^Retry$/i }).click()
    await expect(page.locator(".ranking-card").first()).toBeVisible()

    // Open AI panel -> hit 429 rate-limit error -> recover on next ask
    await page.getByRole("button", { name: /AI Research Assistant/i }).click()
    const inspector = page.locator("#inspector-dialog")
    const input = inspector.getByLabel(/Message to assistant/i)
    await input.fill("What is FLEX-1?")
    await inspector.locator('button[type="submit"]').click()
    await expect(inspector.locator(".chat-error-text")).toContainText(/12\s*s/i)

    failChat = false
    await input.fill("What is FLEX-1?")
    await inspector.locator('button[type="submit"]').click()
    await expect(inspector.locator(".inline-citation-badge", { hasText: "[1]" }).first()).toBeVisible()
  })

  test("landing supports full EN/RU localization, experiment search, and direct Explorer links", async ({ page }) => {
    await setupApiRoutes(page)
    await page.goto("/")

    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Explore fire in\s*microgravity/i)
    await page.getByRole("button", { name: "RU", exact: true }).click()
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Огонь в\s*невесомости/i)
    await expect(page).toHaveTitle(/IGNIS 0G — огонь в невесомости/)

    // Quick search modal lists studies and links straight into Explorer
    await page.getByRole("button", { name: "Поиск экспериментов" }).click()
    const searchModal = page.locator("dialog.landing-search-dialog")
    await expect(searchModal).toBeVisible()
    await searchModal.getByRole("searchbox").fill("FLEX-1")
    await searchModal.getByRole("link", { name: /FLEX-1/ }).first().click()
    await expect(page).toHaveURL(/\/explorer\?study=flex-1/)
    await expect(page.getByRole("heading", { level: 1, name: /FLEX-1/ })).toBeVisible()
  })

  test("BASS-II end-to-end flow: runs button (47), citation link, and exported ranking URLs rewrite local 8080 snapshots", async ({ page }, testInfo) => {
    await setupApiRoutes(page, async ({ apiPath, method, body, route }) => {
      if (apiPath === "/rank") {
        const res = await mockFetch(apiPath, { method, body: body ?? undefined })
        const data = await res.json()
        for (const item of data) {
          if (item.study_id === "bass-bass-ii-bass-m") {
            item.source_urls = ["http://127.0.0.1:8080/nasa-content/research-pages/bass-program.md", ...item.source_urls]
          }
        }
        await route.fulfill({ json: data })
        return true
      }
      if (apiPath === "/assistant/chat") {
        await route.fulfill({
          json: {
            status: "answered",
            answer: "PMMA rod O13a burned down to 13.6% O2 in BASS-II [1].",
            citations: [{
              chunk_id: "00000000-0000-0000-0000-000000000001",
              source_id: "00000000-0000-0000-0000-000000000002",
              title: "BASS Program Overview",
              url: "http://127.0.0.1:8080/nasa-content/research-pages/bass-program.md",
              excerpt: "Cylindrical PMMA rod O13a burned down to 13.6% O2.",
              locator: "Section 4",
            }],
            related_study_ids: ["bass-bass-ii-bass-m"],
            suggested_questions: [],
          },
        })
        return true
      }
      return false
    })

    await page.goto("/explorer?study=bass-bass-ii-bass-m&tab=measurements&lang=en")
    const runsLink = page.getByRole("link", { name: /Open BASS-II test runs \(47\)/ })
    await expect(runsLink).toBeVisible()

    // Check AI citation rewrites local 8080 snapshot URL to relative /nasa-content/
    await page.getByRole("button", { name: /AI Research Assistant/i }).click()
    const inspector = page.locator("#inspector-dialog")
    await inspector.getByLabel(/Message to assistant/i).fill("What was O13a LOI in BASS-II?")
    await inspector.locator('button[type="submit"]').click()
    await inspector.locator(".inline-citation-badge", { hasText: "[1]" }).first().click()
    await expect(inspector.locator("a.citation-nasa-link")).toHaveAttribute("href", "/nasa-content/research-pages/bass-program.md")
    await inspector.getByRole("button", { name: /Collapse chat/i }).click()

    // Check Overview ranking export rewrites 127.0.0.1:8080 to current origin in JSON and CSV
    await page.getByRole("navigation", { name: "Sections" }).getByRole("button", { name: "Overview" }).click()
    const [jsonDl] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: /^JSON$/ }).click(),
    ])
    const jsonPath = testInfo.outputPath("ranking.json")
    await jsonDl.saveAs(jsonPath)
    const exportedJson = await fs.readFile(jsonPath, "utf8")
    expect(exportedJson).not.toContain("127.0.0.1:8080")
    expect(exportedJson).toContain("/nasa-content/research-pages/bass-program.md")

    const [csvDl] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: /^CSV$/ }).click(),
    ])
    const csvPath = testInfo.outputPath("ranking.csv")
    await csvDl.saveAs(csvPath)
    const exportedCsv = await fs.readFile(csvPath, "utf8")
    expect(exportedCsv).not.toContain("127.0.0.1:8080")
    expect(exportedCsv).toMatch(/http:\/\/127\.0\.0\.1:\d+\/nasa-content\/research-pages\/bass-program\.md/)

    // Follow BASS-II datasets link into filtered runs table
    await page.goto("/explorer?study=bass-bass-ii-bass-m&tab=measurements&lang=en")
    await runsLink.click()
    await expect(page).toHaveURL(/rcamp=BASS-II/)
    await expect(page.locator("#experiment-runs")).toContainText(/Showing 47 of 336 published test runs/)
  })

  test("honest pending indicator, HTTP share-link fallback, and API-driven environments run discovery", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(Navigator.prototype, "clipboard", { get: () => undefined, configurable: true })
      document.execCommand = () => false
      ;(window as unknown as { __promptedUrl?: string }).__promptedUrl = undefined
      window.prompt = (_msg?: string, val?: string) => {
        ;(window as unknown as { __promptedUrl?: string }).__promptedUrl = val
        return null
      }
    })

    await setupApiRoutes(page, async ({ apiPath, route }) => {
      if (apiPath === "/assistant/chat") {
        await new Promise((r) => setTimeout(r, 400))
        await route.fulfill({
          json: {
            status: "answered",
            answer: "FLEX-1 measured K values in microgravity [1].",
            citations: [{
              chunk_id: "00000000-0000-0000-0000-000000000011",
              source_id: "00000000-0000-0000-0000-000000000012",
              title: "FLEX-1 Report",
              url: "https://ntrs.nasa.gov/citations/20150023456",
              excerpt: "Burning rate constant K = 0.52 mm²/s",
              locator: "Table IX",
            }],
            related_study_ids: ["flex-1"],
            suggested_questions: [],
          },
        })
        return true
      }
      if (apiPath === "/rank") {
        await route.fulfill({
          json: [{
            study_id: "custom-new-study",
            title: "Custom Dynamic Study",
            o2_pct: [18, 25],
            pressure_kpa: [95, 105],
            flow_cms: [0, 15],
            gravity_g: [0, 0],
            matched: ["o2_pct", "pressure_kpa", "flow_cms", "gravity_g"],
            outside: [],
            unknown: [],
            fuel: "solid",
            material: "PMMA",
            facility: "ISS",
            source_urls: ["https://ntrs.nasa.gov/citations/20210011385"],
            score: 100,
            ranking_version: "range-coverage-v1",
            score_basis: "independent_catalog_ranges",
            reported_parameter_count: 4,
            source_count: 1,
            run_count: 1,
            jointly_reported_run_ids: ["CUSTOM/R-1"],
            limitations: [],
          }],
        })
        return true
      }
      if (apiPath === "/studies/custom-new-study/runs") {
        await route.fulfill({
          json: [{
            campaign: "BASS-II",
            run_id: "R-1",
            gravity_regime: "microgravity",
            material: "PMMA",
            geometry: "rod",
            width_cm: null,
            length_cm: null,
            thickness_mm: null,
            initial_droplet_diameter_mm: null,
            burning_rate_constant_mm2_s: null,
            burning_sides: null,
            direction: "concurrent",
            airflow_cms: [10],
            airflow_basis: "constant",
            oxygen_vol_pct: [21],
            oxygen_basis: "fixed",
            pressure_atm: 1.0,
            spread_rate_mm_s: null,
            burn_duration_s: null,
            outcome: "ignited",
            diagnostics: [],
            notes: [],
            source_url: "https://ntrs.nasa.gov/citations/20210011385",
            locator: "Table 1",
            supplementary_url: null,
          }],
        })
        return true
      }
      return false
    })

    await page.goto("/explorer?lang=en")
    // Card highlights verified run availability without clipboard false-positive on HTTP/LAN
    const shareBtn = page.getByRole("button", { name: "Share link" })
    await shareBtn.click()
    await expect(shareBtn).toHaveText(/Share link/)
    const promptedUrl = await page.evaluate(() => (window as unknown as { __promptedUrl?: string }).__promptedUrl)
    expect(promptedUrl).toContain("/explorer")

    // Honest neutral pending indicator without fake Stage 1/3 progress
    await page.getByRole("button", { name: /AI Research Assistant/i }).click()
    const inspector = page.locator("#inspector-dialog")
    await inspector.getByLabel(/Message to assistant/i).fill("What is K?")
    await inspector.locator('button[type="submit"]').click()
    const status = inspector.locator('[role="status"]')
    await expect(status).toContainText(/Querying NASA PSI sources/i)
    await expect(status).not.toContainText(/Stage 1\/3/i)
    await expect(inspector.locator(".inline-citation-badge", { hasText: "[1]" }).first()).toBeVisible()
    await inspector.getByRole("button", { name: /Collapse chat/i }).click()

    // Environments view dynamically discovers custom-new-study runs via /rank
    await page.getByRole("button", { name: /O₂ Environments/i }).click()
    await expect(page.locator(".psi-run-dot")).toHaveCount(1)
    await expect(page.locator(".psi-run-inspector")).toContainText(/R-1/)
  })

  test("renders creative blue-flame 404 page on unknown routes with EN/RU toggle and navigation links", async ({ page }, testInfo) => {
    await setupApiRoutes(page)
    await page.goto("/unknown-orbital-sector")

    await expect(page).toHaveTitle(/404/)
    await expect(page.locator(".nf-code")).toHaveText("404")
    await expect(page.locator(".nf-flame-svg")).toBeVisible()
    await expect(page.locator(".nf-telemetry")).toContainText("/unknown-orbital-sector")

    // Interactive blue-flame gravity toggle + spark burst
    const modeBtn = page.getByRole("button", { name: /0g Mode/i })
    await modeBtn.click()
    await expect(page.locator(".nf-stage")).toHaveAttribute("data-gravity", "1g")
    await page.locator(".nf-stage").click()
    await expect(page.locator(".nf-chamber")).toContainText(/pulse #1/i)

    // Switch language to Russian cleanly
    await page.getByRole("button", { name: "RU", exact: true }).click()
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/ничего не горит/i)
    await expect(page.getByRole("link", { name: "На главную", exact: true })).toHaveAttribute("href", "/")
    await expect(page.getByRole("link", { name: "Открыть Explorer", exact: true })).toHaveAttribute("href", "/explorer")

    await page.screenshot({ path: testInfo.outputPath("not-found-blue-flame.png"), fullPage: true })
    await page.setViewportSize({ width: 390, height: 844 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  })
})
