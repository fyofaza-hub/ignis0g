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

    // Environments U-curve scientifically labels schematic 13.6% PMMA (O13a) anchor, never SIBAL calibration
    await page.goto("/explorer?section=environments&o2=12&p=101.3&flow=5&g=0")
    await expect(page.locator(".envelope-controls")).toContainText(/PMMA guide/i)
    await expect(page.locator(".envelope-status")).toContainText(/PMMA.*O13a/i)
    await expect(page.locator(".envelope-status")).toContainText(/SIBAL.*16\.9/i)
  })

  test("complete research workflow: open study -> inspect [1] citation -> choose conditions -> compare -> export CSV/JSON", async ({ page }, testInfo) => {
    await setupApiRoutes(page)
    await page.goto("/explorer")

    // 1. Open FLEX-1 study dossier from Dashboard
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

    await page.getByRole("tab", { name: /Конверт: Давление vs O₂/ }).click()
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
    await expect(page.getByRole("tab", { name: /Конверт: Давление vs O₂/ })).toHaveAttribute("aria-selected", "true")
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
})
