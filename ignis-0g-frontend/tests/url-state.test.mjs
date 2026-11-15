import test from "node:test"
import assert from "node:assert/strict"
import { SCENARIO_PRESETS } from "../src/domain/knowledge.ts"
import { buildExplorerSearchParams, parseExplorerUrl } from "../src/domain/url-state.ts"

test("parseExplorerUrl falls back cleanly on empty or invalid parameters", () => {
  const clean = parseExplorerUrl("")
  assert.equal(clean.section, "Дашборд и рейтинг")
  assert.equal(clean.preset, "iss-cabin")
  assert.deepEqual(clean.conditions, SCENARIO_PRESETS["iss-cabin"])
  assert.deepEqual(clean.compareIds, [])
  assert.equal(clean.tab, "overview")
  assert.equal(clean.dirPillar, "All")

  const corrupted = parseExplorerUrl("?view=nexus&tab=unknown&o2=150&p=-5&flow=9999&g=2&fuel=plasma&pillar=Other&tag=Weird")
  assert.equal(corrupted.section, "Дашборд и рейтинг")
  assert.equal(corrupted.tab, "overview")
  assert.deepEqual(corrupted.conditions, SCENARIO_PRESETS["iss-cabin"])
  assert.equal(corrupted.dirPillar, "All")
})

test("URL state round-trips presets, custom scenario filters, compare list, directory, and run selections", () => {
  const customState = {
    section: "Среды обитания",
    studyMode: "directory",
    studyId: null,
    tab: "overview",
    preset: null,
    conditions: {
      o2_pct: 34,
      pressure_kpa: 56.5,
      flow_cms: 10,
      gravity_g: 0.16,
      fuel: "solid",
      pillar: "Prevention",
    },
    compareIds: ["flex-1", "bass-bass-ii-bass-m", "sofie-mist"],
    dirQuery: "SAME",
    dirPillar: "Detection",
    dirSavedOnly: true,
    envAxis: "pressure-o2",
    envAllRuns: true,
    compareDiff: "diff",
    compareFocus: "lunar 34% O2",
    runsCampaign: "BASS-II",
    runsQuery: "SIBAL",
    runsSelected: ["BASS-II / GMT45-T1", "FLEX-1 / FLEX-004"],
    locale: "ru",
  }

  const params = buildExplorerSearchParams(customState)
  const parsed = parseExplorerUrl(params.toString())

  assert.equal(parsed.section, "Среды обитания")
  assert.equal(parsed.preset, null)
  assert.deepEqual(parsed.conditions, customState.conditions)
  assert.deepEqual(parsed.compareIds, customState.compareIds)
  assert.equal(parsed.dirQuery, "SAME")
  assert.equal(parsed.dirPillar, "Detection")
  assert.equal(parsed.dirSavedOnly, true)
  assert.equal(parsed.envAxis, "pressure-o2")
  assert.equal(parsed.envAllRuns, true)
  assert.equal(parsed.compareDiff, "diff")
  assert.equal(parsed.compareFocus, "lunar 34% O2")
  assert.equal(parsed.runsCampaign, "BASS-II")
  assert.equal(parsed.runsQuery, "SIBAL")
  assert.deepEqual(parsed.runsSelected, customState.runsSelected)
  assert.equal(parsed.locale, "ru")
})

test("preset serialization stays minimal and study detail preserves tab across reload", () => {
  const presetParams = buildExplorerSearchParams({
    ...parseExplorerUrl(""),
    section: "Исследования",
    studyMode: "detail",
    studyId: "flex-1",
    tab: "safety",
    preset: "lunar-base",
    conditions: SCENARIO_PRESETS["lunar-base"],
    compareIds: ["flex-1"],
  })

  const qs = presetParams.toString()
  assert.match(qs, /study=flex-1/)
  assert.match(qs, /tab=safety/)
  assert.match(qs, /preset=lunar-base/)
  assert.match(qs, /compare=flex-1/)
  assert.doesNotMatch(qs, /o2=/)

  const parsed = parseExplorerUrl(qs)
  assert.equal(parsed.section, "Исследования")
  assert.equal(parsed.studyMode, "detail")
  assert.equal(parsed.studyId, "flex-1")
  assert.equal(parsed.tab, "safety")
  assert.equal(parsed.preset, "lunar-base")
  assert.deepEqual(parsed.conditions, SCENARIO_PRESETS["lunar-base"])
  assert.deepEqual(parsed.compareIds, ["flex-1"])
})
