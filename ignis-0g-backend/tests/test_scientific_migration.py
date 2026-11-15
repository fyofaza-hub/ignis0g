"""Exercise upgrade on a legacy snapshot and rollback DDL in one test transaction."""
import asyncio
import importlib.util
import json
from pathlib import Path
from uuid import uuid4

from alembic.migration import MigrationContext
from alembic.operations import Operations
from sqlalchemy import text

from app.core.database import engine


def test_legacy_snapshot_migration_preserves_values_and_queryable_units():
    path = Path(__file__).resolve().parents[1] / 'migrations/versions/0004_scientific_units.py'
    spec = importlib.util.spec_from_file_location('scientific_units_migration', path)
    migration = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(migration)

    async def run():
        try:
            async with engine.connect() as connection:
                transaction = await connection.begin()
                try:
                    def downgrade(sync):
                        with Operations.context(MigrationContext.configure(sync)):
                            migration.downgrade()
                    await connection.run_sync(downgrade)
                    identifier = uuid4()
                    old = {'experiment_runs': [
                        {'campaign':'FLEX-1','run_id':'FLEX-001','thickness_mm':1.69,'spread_rate_mm_s':[0.42],
                         'source_url':'https://ntrs.nasa.gov/citations/20150023456','locator':'Table IX'},
                        {'campaign':'BASS-II','run_id':'M8','thickness_mm':0.32,'spread_rate_mm_s':[0.057]},
                    ], 'untouched':'preserved'}
                    await connection.execute(text('''INSERT INTO studies(id,slug,title,description,category,conditions)
                        VALUES (:id,:slug,'Test','Synthetic','test',CAST(:data AS jsonb))'''),
                        {'id':identifier,'slug':'migration-'+identifier.hex,'data':json.dumps(old)})
                    def upgrade(sync):
                        with Operations.context(MigrationContext.configure(sync)):
                            migration.upgrade()
                    await connection.run_sync(upgrade)
                    data = await connection.scalar(text('SELECT conditions FROM studies WHERE id=:id'), {'id':identifier})
                    assert data['untouched'] == 'preserved'
                    flex, bass = data['experiment_runs']
                    assert flex['initial_droplet_diameter_mm'] == 1.69
                    assert flex['burning_rate_constant_mm2_s'] == [0.42]
                    assert flex['spread_rate_mm_s'] is None and flex['thickness_mm'] is None
                    assert bass == old['experiment_runs'][1]
                    rows = (await connection.execute(text('SELECT * FROM experiment_observations WHERE study_id=:id ORDER BY campaign'), {'id':identifier})).mappings().all()
                    assert len(rows) == 2
                    assert rows[1]['initial_droplet_diameter_mm'] == 1.69
                    assert rows[1]['burning_rate_constant_mm2_s'] == [0.42]
                    assert rows[1]['source_url'] == flex['source_url']
                finally:
                    await transaction.rollback()
        finally:
            await engine.dispose()
    asyncio.run(run())
