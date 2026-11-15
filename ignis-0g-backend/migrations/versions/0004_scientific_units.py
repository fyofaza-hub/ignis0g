"""Correct FLEX units in existing snapshots; expose queryable run observations.

The view avoids a second copy of the catalog data and preserves import atomicity.
"""
from alembic import op

revision = "0004_scientific_units"
down_revision = "0003_embedding_dimension_1024"
branch_labels = None
depends_on = None


def upgrade():
    op.execute("""
        UPDATE studies s SET conditions = jsonb_set(conditions, '{experiment_runs}', (
            SELECT jsonb_agg(CASE WHEN r->>'campaign' = 'FLEX-1' THEN
                r || jsonb_build_object(
                    'initial_droplet_diameter_mm', COALESCE(NULLIF(r->'initial_droplet_diameter_mm', 'null'::jsonb), r->'thickness_mm', 'null'::jsonb),
                    'burning_rate_constant_mm2_s', COALESCE(NULLIF(r->'burning_rate_constant_mm2_s', 'null'::jsonb), r->'spread_rate_mm_s', 'null'::jsonb),
                    'thickness_mm', NULL, 'spread_rate_mm_s', NULL)
                ELSE r END ORDER BY position)
            FROM jsonb_array_elements(conditions->'experiment_runs') WITH ORDINALITY AS runs(r, position)
        )) WHERE jsonb_typeof(conditions->'experiment_runs') = 'array'
            AND conditions->'experiment_runs' <> '[]'::jsonb
    """)
    op.create_check_constraint('ck_studies_conditions_object', 'studies', "jsonb_typeof(conditions) = 'object'")
    op.execute("""
        CREATE VIEW experiment_observations AS
        SELECT s.id AS study_id, s.slug AS study_slug,
               r->>'campaign' AS campaign, r->>'run_id' AS run_id,
               r->>'source_url' AS source_url, r->>'locator' AS locator,
               (r->>'pressure_atm')::double precision AS pressure_atm,
               (r->>'thickness_mm')::double precision AS thickness_mm,
               (r->>'initial_droplet_diameter_mm')::double precision AS initial_droplet_diameter_mm,
               r->'spread_rate_mm_s' AS spread_rate_mm_s,
               r->'burning_rate_constant_mm2_s' AS burning_rate_constant_mm2_s,
               r AS observation
        FROM studies s CROSS JOIN LATERAL
            jsonb_array_elements(CASE WHEN jsonb_typeof(s.conditions->'experiment_runs') = 'array'
                THEN s.conditions->'experiment_runs' ELSE '[]'::jsonb END) r
    """)


def downgrade():
    op.execute('DROP VIEW experiment_observations')
    op.drop_constraint('ck_studies_conditions_object', 'studies', type_='check')
    # Keep corrected scientific quantities; downgrading must not restore mislabeled data.
