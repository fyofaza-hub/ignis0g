"""Refresh NASA source links and add report findings without replacing study data."""

import argparse
import asyncio
import json
from hashlib import sha256
from pathlib import Path

from pydantic import BaseModel, Field, HttpUrl
from sqlalchemy import select, text, update

from app.core.database import engine, session_factory
from app.models import Dataset as DatasetModel
from app.models import Finding as FindingModel, Source as SourceModel, Study
from app.schemas.ingestion import Dataset, Finding, Source
from app.services.ingestion import upsert


class Report(BaseModel):
    slug: str
    source: Source
    finding: Finding
    datasets: list[Dataset] = Field(default_factory=list)


class Evidence(BaseModel):
    direct_links: dict[str, HttpUrl]
    reports: list[Report]


async def main(path: Path, dry_run: bool) -> None:
    package = Evidence.model_validate_json(path.read_bytes())
    try:
        async with session_factory() as session, session.begin():
            await session.execute(text("SELECT pg_advisory_xact_lock(49371001)"))
            studies = dict((await session.execute(select(Study.slug, Study.id))).all())
            missing = (set(package.direct_links) | {r.slug for r in package.reports}) - studies.keys()
            if missing:
                raise ValueError(f"Unknown studies: {sorted(missing)}")
            for report in package.reports:
                if any(item.source_key != report.source.source_key for item in [report.finding, *report.datasets]):
                    raise ValueError(f"Mismatched finding source for {report.slug}")
            if not dry_run:
                for slug, url in package.direct_links.items():
                    await session.execute(
                        update(SourceModel)
                        .where(SourceModel.study_id == studies[slug], SourceModel.url == "https://ntrs.nasa.gov/")
                        .values(url=str(url))
                    )
                for report in package.reports:
                    study_id = studies[report.slug]
                    source = report.source.model_dump(mode="json")
                    source["study_id"] = study_id
                    source["content_hash"] = sha256((report.source.text_content or "").encode()).hexdigest()
                    source_id = await upsert(session, SourceModel, ["study_id", "source_key"], source)
                    finding = report.finding.model_dump(exclude={"source_key"})
                    finding.update(study_id=study_id, source_id=source_id)
                    await upsert(session, FindingModel, ["study_id", "finding_key"], finding)
                    for dataset in report.datasets:
                        values = dataset.model_dump(mode="json", exclude={"source_key"})
                        values["data"] = {
                            key: values.pop(key) for key in ("x_label", "y_label", "series", "provenance")
                        }
                        values.update(study_id=study_id, source_id=source_id)
                        await upsert(session, DatasetModel, ["study_id", "dataset_key"], values)
        print(f"{'Validated' if dry_run else 'Imported'} {len(package.reports)} reports and {len(package.direct_links)} link mappings")
    finally:
        await engine.dispose()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("path", type=Path)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    asyncio.run(main(args.path, args.dry_run))
