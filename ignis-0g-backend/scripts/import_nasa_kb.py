"""Import local NASA knowledge-base cards through the existing catalog importer."""
import argparse
import asyncio
import json
import re
from pathlib import Path

from app.ai.ingestion import read_document
from app.core.database import engine
from app.schemas.experiment_run import ExperimentRun
from app.schemas.ingestion import Package
from app.schemas.scenario import ModelingRun
from app.services.ingestion import import_package


def load_package(directory: Path) -> Package:
    index = directory / "00_index"
    experiments = json.loads((index / "ignis_master_db.json").read_text(encoding="utf-8"))
    registry = json.loads((index / "sources_registry.json").read_text(encoding="utf-8"))
    registry_by_experiment = {row["sub_experiment"]: row for row in registry}
    cards = {}
    for folder in ("01_experiment_cards", "02_normative_baselines"):
        for path in sorted((directory / folder).rglob("*.md")):
            body = read_document(path)
            frontmatter = re.match(r"\A---\s*\n(.*?)\n---[ \t]*(?:\n|$)", body, re.S)
            identifier = re.search(r"(?m)^id:[ \t]*(\d+)[ \t]*$", frontmatter[1]) if frontmatter else None
            if not identifier or int(identifier[1]) in cards:
                raise ValueError(f"Missing or duplicate card identifier: {path.name}")
            cards[int(identifier[1])] = body

    if set(cards) != {row["id"] for row in experiments}:
        raise ValueError("The master index and Markdown cards contain different identifiers")

    run_directory = directory / "03_experiment_runs"
    run_files = {path.stem: path for path in run_directory.glob("*.json")}
    studies = []
    for row in experiments:
        title = row["sub_experiment"]
        source = registry_by_experiment[title]
        if source["source_id"] != row["source_id"]:
            raise ValueError(f"Source mismatch in registry for {title}")
        slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
        source_key = f"nasa-kb-card-{row['id']}"
        runs_path = run_files.pop(slug, None)
        runs = [
            ExperimentRun.model_validate(run)
            for run in json.loads(runs_path.read_text(encoding="utf-8"))
        ] if runs_path else []
        if len({(run.campaign, run.run_id) for run in runs}) != len(runs):
            raise ValueError(f"Duplicate experiment run IDs for {slug}")
        conditions = {
            **row["conditions"],
            "facility": row["iss_facility"],
            "fuel_state": row["fuel"]["state"],
            "fuel_material": row["fuel"]["material"],
            "sample_size_mm": row["fuel"]["sample_size_mm"],
            "principal_investigators": row["principal_investigators"],
            "modeling_runs": [ModelingRun.model_validate(run).model_dump(mode="json") for run in row.get("modeling_runs", [])],
        }
        if runs:
            conditions["experiment_runs"] = [run.model_dump(mode="json") for run in runs]
        # Nominal regime of flight-only study summaries, rather than a measured acceleration.
        if row["program"] != "Reference" and row["id"] not in (6, 19, 22):
            conditions["gravity_g"] = [0, 0]
        studies.append({
            "slug": slug, "title": title, "category": row["program"],
            "description": row["key_phenomenon_and_finding"],
            "methodology": row["hardware_and_rack_details"],
            "conditions": conditions,
            "tags": row["safety_pillar"].split(" / "),
            "sources": [{
                "source_key": source_key,
                "title": f"NASA KB card: {title} ({source['source_id']})",
                "url": source.get("source_url", source["ntrs_portal"]),
                "source_type": "other",
                "text_content": cards[row["id"]],
            }],
        })

    if run_files:
        raise ValueError(f"Run files have no matching study: {sorted(run_files)}")
    return Package.model_validate({"schema_version": 1, "studies": studies})


async def run(directory: Path, dry_run: bool):
    package = load_package(directory)
    try:
        await import_package(package, dry_run=dry_run)
        print(f"{'Validated' if dry_run else 'Imported'} {len(package.studies)} study cards")
    finally:
        await engine.dispose()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", type=Path)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    asyncio.run(run(args.directory, args.dry_run))
