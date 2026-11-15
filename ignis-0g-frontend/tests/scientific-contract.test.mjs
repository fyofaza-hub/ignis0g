import test from 'node:test'
import assert from 'node:assert/strict'
import { mockExperimentRuns } from '../src/mocks/experiment-runs-data.ts'
import { isExperimentRun } from '../src/api/validation.ts'
import { experimentRecords, recordsCsv } from '../src/domain/experiment-export.ts'

test('all 336 experiment records satisfy the API contract', () => {
  const runs = Object.values(mockExperimentRuns).flat()
  assert.equal(runs.length, 336)
  for (const run of runs) assert.ok(isExperimentRun(run), run.run_id)
})

test('FLEX export preserves dimensions and does not populate velocity or thickness', () => {
  const run = mockExperimentRuns['flex-1'].find(r => r.burning_rate_constant_mm2_s !== null)
  const [record] = experimentRecords([run])
  assert.equal(record.spread_rate_mm_s, null)
  assert.equal(record.thickness_mm, null)
  assert.deepEqual(record.burning_rate_constant_mm2_s, run.burning_rate_constant_mm2_s)
  assert.equal(record.initial_droplet_diameter_mm, run.initial_droplet_diameter_mm)
  const csv = recordsCsv([record])
  assert.match(csv, /"burning_rate_constant_mm2_s"/)
  assert.match(csv, /"initial_droplet_diameter_mm"/)
  assert.equal(record.source_url, run.source_url)
})

test('CSV escapes quotes, newlines and spreadsheet formulas', () => {
  const [record] = experimentRecords(mockExperimentRuns['flex-1'].slice(0, 1))
  record.material = '=HYPERLINK("https://evil.test")\nnext'
  assert.ok(recordsCsv([record]).includes('"\'=HYPERLINK(""https://evil.test"")\nnext"'))
  assert.equal(recordsCsv([]), '')
})

test('malformed units, ranges and alignment are rejected', () => {
  const flex = mockExperimentRuns['flex-1'][0]
  for (const changes of [
    { spread_rate_mm_s: [1] }, { thickness_mm: 1 },
    { burning_rate_constant_mm2_s: [1, 2] }, { oxygen_vol_pct: [101] },
    { pressure_atm: Infinity }, { airflow_cms: [] }, { oxygen_vol_pct: [20, 21] },
  ]) assert.equal(isExperimentRun({ ...flex, ...changes }), false)
  const bass = mockExperimentRuns['bass-bass-ii-bass-m'][0]
  assert.equal(isExperimentRun({ ...bass, burning_rate_constant_mm2_s: [1] }), false)
  assert.equal(isExperimentRun({ ...bass, airflow_basis: 'start_end', spread_rate_mm_s: [1] }), false)
})
