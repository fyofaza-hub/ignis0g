import test from 'node:test'
import assert from 'node:assert/strict'
import { exportSourceUrl, nasaContentUrl } from '../src/lib/nasa-content.ts'
import { getCrewEnvironments } from '../src/domain/knowledge.ts'

test('nasaContentUrl and exportSourceUrl rewrite local 8080 snapshots and keep external NASA links', () => {
  const localSnap = 'http://127.0.0.1:8080/nasa-content/research-pages/bass-program.md'
  const ntrs = 'https://ntrs.nasa.gov/citations/20210011385'

  assert.equal(nasaContentUrl(localSnap), '/nasa-content/research-pages/bass-program.md')
  assert.equal(nasaContentUrl(ntrs), ntrs)
  assert.equal(
    exportSourceUrl(localSnap, 'https://ignis-0g.space'),
    'https://ignis-0g.space/nasa-content/research-pages/bass-program.md',
  )
  assert.equal(exportSourceUrl(ntrs, 'https://ignis-0g.space'), ntrs)
})

test('crew environment summaries tie numerical claims to named NASA studies and conditions', () => {
  for (const locale of ['en', 'ru']) {
    const cards = getCrewEnvironments(locale)
    const iss = cards.find((c) => c.id === 'iss-cabin')
    const lunar = cards.find((c) => c.id === 'lunar-sea')
    assert.ok(iss && lunar)
    assert.match(iss.fireRiskSummary, /PMMA.*O13a/)
    assert.match(iss.fireRiskSummary, /SIBAL/)
    assert.match(iss.fireRiskSummary, /SAME/)
    assert.doesNotMatch(iss.fireRiskSummary, /smoke particles grow larger|частицы дыма крупнее/i)
    assert.match(lunar.fireRiskSummary, /SoFIE-MIST/)
    assert.match(lunar.fireRiskSummary, /PMMA/)
    assert.doesNotMatch(lunar.fireRiskSummary, /sharply accelerates|резко ускоряет/i)
  }
})
