import test from 'node:test'
import assert from 'node:assert/strict'
import { mockExperimentRuns } from '../src/mocks/experiment-runs-data.ts'
import {
  toExperimentPoints, chartOutcome, chartAxis, axisFraction,
  representativePoints, scenarioEvidence, filterExperimentPoints,
} from '../src/domain/experiment-chart.ts'

const flex = mockExperimentRuns['flex-1'].find(run => run.burning_rate_constant_mm2_s !== null)

test('FLEX chart shows published K and diameter using their physical units', () => {
  const [point] = toExperimentPoints('flex-1', [flex])
  assert.match(point.metric, /K=.*mm²\/s/)
  assert.ok(point.metric.includes(flex.burning_rate_constant_mm2_s.join(' → ')))
  assert.match(point.metricRu, /K=.*мм²\/с/)
  assert.ok(point.metric.includes(`d₀=${flex.initial_droplet_diameter_mm}`))
  assert.equal(point.pressureKpa, flex.pressure_atm * 101.325)
  assert.equal(point.citation, flex.locator)
})

test('unknown, disruption, non-ignition and extinction remain distinct outcomes', () => {
  for (const outcome of ['disruption', 'no_ignition', 'no_propagation', 'extinction', 'blowoff']) {
    const [point] = toExperimentPoints('flex-1', [{ ...flex, outcome }])
    assert.equal(point.outcome, outcome)
  }
  assert.equal(chartOutcome(null), 'unknown')
  assert.equal(chartOutcome('unrecognized result'), 'unknown')
  assert.equal(chartOutcome('toString'), 'unknown')
})

test('endpoint observations show full sequences and never synthesize missing coordinates', () => {
  const run = { ...flex, airflow_cms: [10, 2.2], airflow_basis: 'start_end',
    oxygen_vol_pct: [21, 19], oxygen_basis: 'start_end', pressure_atm: null }
  const [point] = toExperimentPoints('flex-1', [run])
  assert.equal(point.flowCms, 2.2)
  assert.equal(point.o2Pct, 19)
  assert.equal(point.pressureKpa, null)
  assert.match(point.metric, /10 → 2.2/)
  assert.match(point.metric, /21 → 19/)
  assert.deepEqual(toExperimentPoints('flex-1', [{ ...run, airflow_cms: [] }]), [])
  assert.deepEqual(toExperimentPoints('flex-1', [{ ...run, oxygen_vol_pct: [] }]), [])
})

test('axis expansion preserves extremes and separates values formerly clamped together', () => {
  for (const [values, baseline, step] of [
    [[0, 10, 46, 100], [10, 46], 5],
    [[0, 50, 60], [0, 50], 10],
    [[1, 25, 101.325, 309.3, 500], [0, 125], 25],
  ]) {
    const axis = chartAxis(values, baseline, step)
    for (const value of values) {
      assert.ok(axisFraction(value, axis) >= 0 && axisFraction(value, axis) <= 1)
    }
    assert.equal(new Set(values.map(value => axisFraction(value, axis))).size, values.length)
    assert.ok(axis.ticks.includes(axis.min) && axis.ticks.includes(axis.max))
  }
})

test('all 336 records retain their outcome, endpoint and pressure in the plot adapter', () => {
  for (const [studyId, runs] of Object.entries(mockExperimentRuns)) {
    const points = toExperimentPoints(studyId, runs)
    assert.equal(points.length, runs.length)
    for (const [index, point] of points.entries()) {
      assert.equal(point.outcome, chartOutcome(runs[index].outcome))
      assert.equal(point.flowCms, runs[index].airflow_cms.at(-1))
      assert.equal(point.o2Pct, runs[index].oxygen_vol_pct.at(-1))
      assert.equal(point.pressureKpa, runs[index].pressure_atm === null ? null : runs[index].pressure_atm * 101.325)
    }
    assert.ok(representativePoints(points).every(point => points.includes(point)))
  }
  assert.deepEqual(representativePoints([]), [])
})

test('environment matches require jointly fixed measured conditions; no gravity or range inference', () => {
  const run = { ...flex, pressure_atm: 1, airflow_cms: [0], airflow_basis: 'constant',
    oxygen_vol_pct: [21], oxygen_basis: 'fixed' }
  const points = toExperimentPoints('flex-1', [run])
  const scenario = { o2_pct: 21, pressure_kpa: 101.325, flow_cms: 0, gravity_g: 0 }
  assert.deepEqual(scenarioEvidence(points, scenario), { matched: 1, complete: 1, total: 1 })
  for (const delta of [{ gravity_g: 0.01 }, { gravity_g: 0.16 }, { pressure_kpa: 100 }, { o2_pct: 22 }]) {
    assert.equal(scenarioEvidence(points, { ...scenario, ...delta }).matched, 0)
  }
  for (const delta of [{ pressure_atm: null }, { oxygen_basis: 'approximate' }, { airflow_basis: 'start_end', airflow_cms: [10, 0] }]) {
    assert.equal(scenarioEvidence(toExperimentPoints('flex-1', [{ ...run, ...delta }]), scenario).matched, 0)
  }
  assert.equal(filterExperimentPoints(points, 'solid').length, 0)
  assert.equal(filterExperimentPoints(points, 'gas').length, 0)
  assert.equal(filterExperimentPoints(points, 'liquid').length, 1)
  assert.equal(scenarioEvidence([], scenario).total, 0)
})
