"""Scientific contract and adversarial regressions, without paid model calls."""
import asyncio
from pathlib import Path
from uuid import uuid4

import httpx
import pytest
from pydantic import ValidationError
from starlette.requests import Request

from app.ai.retrieval import Evidence
from app.ai.service import validate_answer, validate_comparison
from app.core.rate_limit import client_identity
from app.schemas.experiment_run import ExperimentRun
from app.schemas.ingestion import Package
from app.schemas.scenario import Scenario
from app.services.scenario import rank_study
from scripts.import_nasa_kb import load_package


def package():
    return load_package(Path(__file__).resolve().parents[2] / 'nasa-fire-safety-kb')


def test_all_336_runs_have_distinct_physical_quantities_and_provenance():
    runs = [ExperimentRun.model_validate(r) for s in package().studies
            for r in s.conditions.get('experiment_runs', [])]
    assert len(runs) == 336
    assert len({(r.campaign, r.run_id) for r in runs}) == 336
    for r in runs:
        assert r.locator and str(r.source_url).startswith('https://ntrs.nasa.gov/')
        if r.campaign == 'FLEX-1':
            assert r.spread_rate_mm_s is None and r.thickness_mm is None
            assert r.initial_droplet_diameter_mm is None or r.initial_droplet_diameter_mm > 0
        else:
            assert r.burning_rate_constant_mm2_s is None
            assert r.initial_droplet_diameter_mm is None


def test_legacy_flex_round_trip_and_conflicts():
    run = next(s for s in package().studies if s.slug == 'flex-1').conditions['experiment_runs'][0]
    legacy = {**run, 'thickness_mm': run['initial_droplet_diameter_mm'],
              'spread_rate_mm_s': run['burning_rate_constant_mm2_s']}
    del legacy['initial_droplet_diameter_mm'], legacy['burning_rate_constant_mm2_s']
    assert ExperimentRun.model_validate(legacy).model_dump(mode='json') == run
    with pytest.raises(ValidationError, match='Conflicting'):
        ExperimentRun.model_validate({**run, 'thickness_mm': 999})


def test_import_rejects_duplicate_or_invalid_runs_before_writes():
    data = package().model_dump(mode='json')
    study = next(s for s in data['studies'] if s['slug'] == 'flex-1')
    study['conditions']['experiment_runs'].append(study['conditions']['experiment_runs'][0])
    with pytest.raises(ValidationError, match='duplicate experiment run'):
        Package.model_validate(data)
    study['conditions']['experiment_runs'].pop()
    study['conditions']['experiment_runs'][0]['pressure_atm'] = -1
    with pytest.raises(ValidationError):
        Package.model_validate(data)


def test_joint_observation_is_not_inferred_from_independent_ranges():
    source = next(s for s in package().studies if s.slug == 'flex-1')
    run = next(r for r in source.conditions['experiment_runs'] if r['pressure_atm'])
    target = Scenario(o2_pct=run['oxygen_vol_pct'][0], pressure_kpa=run['pressure_atm']*101.325,
                      flow_cms=0, gravity_g=0)
    result = rank_study(source, ['https://ntrs.nasa.gov/citations/20150023456'], target)
    assert f"FLEX-1/{run['run_id']}" in result.jointly_reported_run_ids
    assert result.run_count == 276
    lunar = rank_study(source, [], target.model_copy(update={'gravity_g': 0.17}))
    assert not lunar.jointly_reported_run_ids
    assert 'microgravity_results_do_not_validate_partial_or_earth_gravity' in lunar.limitations
    assert 'no_source_links' in lunar.limitations
    assert result.score == 25 * len(result.matched)
    assert result.reported_parameter_count + len(result.unknown) == 4


@pytest.mark.parametrize('peer,headers,trusted,expected', [
    ('198.51.100.7', {'x-forwarded-for':'1.1.1.1'}, '', '198.51.100.7'),
    ('198.51.100.7', {'cf-connecting-ip':'1.1.1.1'}, '127.0.0.1/32', '198.51.100.7'),
    ('127.0.0.1', {'x-forwarded-for':'1.1.1.1, 198.51.100.7'}, '127.0.0.1/32', '198.51.100.7'),
    ('127.0.0.1', {'x-forwarded-for':'198.51.100.7, 10.0.0.2'}, '127.0.0.1/32,10.0.0.0/24', '198.51.100.7'),
    ('127.0.0.1', {'x-forwarded-for':'malformed'}, '127.0.0.1/32', '127.0.0.1'),
    ('::1', {'x-forwarded-for':'2001:db8::2'}, '::1/128', '2001:db8::2'),
])
def test_forwarded_identity(peer, headers, trusted, expected, monkeypatch):
    monkeypatch.setenv('TRUSTED_PROXY_CIDRS', trusted)
    request = Request({'type':'http', 'client':(peer, 123),
                       'headers':[(k.encode(), v.encode()) for k,v in headers.items()]})
    assert client_identity(request) == expected


def test_rotating_spoofed_headers_cannot_bypass_limit(monkeypatch):
    import importlib
    main = importlib.import_module('app.main')
    from app.ai.service import insufficient_evidence
    async def answer(request): return insufficient_evidence()
    monkeypatch.setattr(main, 'ask', answer)
    monkeypatch.setenv('ASSISTANT_RATE_LIMIT', '2')
    monkeypatch.setenv('TRUSTED_PROXY_CIDRS', '')
    async def run():
        main.rate_windows.clear()
        try:
            async with httpx.AsyncClient(transport=httpx.ASGITransport(app=main.app), base_url='http://test') as client:
                statuses = []
                for i in range(3):
                    r = await client.post('/api/v1/assistant/chat', json={'message':'FLEX?'},
                        headers={'x-forwarded-for': f'198.51.100.{i}', 'cf-connecting-ip':f'198.51.100.{i}'})
                    statuses.append(r.status_code)
                assert statuses == [200, 200, 429]
                assert int(r.headers['Retry-After']) > 0
        finally: main.rate_windows.clear()
    asyncio.run(run())


def evidence():
    return [Evidence(uuid4(), uuid4(), 'flex-1', 'FLEX', 'https://ntrs.nasa.gov/citations/20150023456',
                     'Oxygen 21%; droplet burning rate constant K in mm²/s.', 'Table IX')]


@pytest.mark.parametrize('text', [
    'The measured oxygen concentration was 85% and was sustained.\nA separate fact [1].',
    'The measured constant was 5 mm²/s in this experiment.\nA separate fact [1].',
    'Claim [0].', 'Claim [2].', '<script>attack</script> [1].',
    'Claim [1](https://evil.test).', 'Claim without citations.',
])
def test_adversarial_chat_responses_are_rejected(text):
    assert validate_answer({'status':'answered', 'answer':text}, evidence(), 'Question').status == 'insufficient_evidence'


@pytest.mark.parametrize('change', [
    {'summary':'No citation'}, {'summary':'Invalid [9]'}, {'summary':'Linked [1](https://evil.test)'},
    {'similarities':[{'text':'Claim [1][9]', 'citation_indices':[1]}]},
    {'similarities':[{'text':'Claim [1]', 'citation_indices':[True]}]},
    {'similarities':[{'text':'Claim [1]', 'citation_indices':[9]}]},
    {'limitations':['Forged [9]']},
])
def test_comparison_never_silently_accepts_invalid_citations(change):
    raw = {'status':'answered', 'summary':'Overview [1]',
           'similarities':[{'text':'Claim [1]', 'citation_indices':[1]}], 'differences':[], 'limitations':[]}
    assert validate_comparison({**raw, **change}, evidence()).status == 'insufficient_evidence'


def test_supported_comparison_still_passes():
    raw = {'status':'answered', 'summary':'Overview [1]',
           'similarities':[{'text':'Claim [1]', 'citation_indices':[1]}],
           'differences':[], 'limitations':['No partial gravity observations.']}
    response = validate_comparison(raw, evidence())
    assert response.status == 'answered'
    assert response.summary == 'Overview [1]'
    assert response.citations[0].locator == 'Table IX'
