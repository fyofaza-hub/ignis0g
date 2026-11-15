from dataclasses import dataclass
import re
from uuid import NAMESPACE_URL, UUID, uuid5

from sqlalchemy import text

from app.core.database import session_factory
from app.schemas.assistant import ChatRequest


@dataclass(frozen=True)
class Evidence:
    chunk_id: UUID
    source_id: UUID
    study_slug: str
    title: str
    url: str
    excerpt: str
    locator: str | None
    kind: str = "chunk"


_CURRENT_CHUNKS = """
    FROM chunks AS c
    JOIN sources AS s ON s.id = c.source_id
    JOIN studies AS st ON st.id = s.study_id
    WHERE s.indexed_hash = s.content_hash
      AND (c.metadata ->> 'index_revision') = :revision
      AND (CAST(:scope_slug AS text) IS NULL OR st.slug = :scope_slug)
"""

_HAS_CHUNKS = text("SELECT EXISTS (SELECT 1 " + _CURRENT_CHUNKS + ")")
_SEARCH = text("""
    SELECT c.id AS chunk_id, s.id AS source_id, st.slug AS study_slug,
           s.title, s.url, c.content AS excerpt, c.metadata ->> 'locator' AS locator
""" + _CURRENT_CHUNKS + """
    ORDER BY c.embedding <=> CAST(:embedding AS vector),
             (st.slug = CAST(:preferred_slug AS text)) DESC NULLS LAST, c.id
    LIMIT :limit
""")

_STUDIES = text("SELECT DISTINCT st.slug " + _CURRENT_CHUNKS)
_INDEXED_COMPARISON_STUDIES = text(
    "SELECT DISTINCT st.slug " + _CURRENT_CHUNKS + " AND st.slug = ANY(CAST(:target_slugs AS text[]))"
)
_TARGETED_SEARCH = text("""
    SELECT chunk_id, source_id, study_slug, title, url, excerpt, locator
    FROM (
        SELECT c.id AS chunk_id, s.id AS source_id, st.slug AS study_slug,
               s.title, s.url, c.content AS excerpt, c.metadata ->> 'locator' AS locator,
               c.embedding <=> CAST(:embedding AS vector) AS distance,
               coalesce(c.metadata ->> 'locator', '') ~* :section_pattern AS section_match,
               row_number() OVER (
                   PARTITION BY st.slug ORDER BY
                       (coalesce(c.metadata ->> 'locator', '') ~* :section_pattern) DESC,
                       c.embedding <=> CAST(:embedding AS vector), c.id
               ) AS position
""" + _CURRENT_CHUNKS + """
          AND st.slug = ANY(CAST(:target_slugs AS text[]))
    ) AS ranked
    ORDER BY position, section_match DESC, distance, chunk_id
    LIMIT :limit
""")


def section_pattern(question: str) -> str:
    """Lightweight section hints for structured scientific cards, not fact matching."""
    hints = [
        (r"установ|оборудован|стойк|модул|hardware|apparatus|setup|rack", r"установ|оборудован|hardware|apparatus|setup"),
        (r"открыт|явлен|результат|observ|finding|result|discover", r"явлен|результат|observ|finding|result"),
        (r"топлив|услов|давлен|температур|кислород|o2|гравитац|gravity|fuel|condition|limit|предел", r"услов|параметр|condition|parameter"),
        (r"связ|преем|безопас|применен|relation|connect|heritage|safety", r"преем|применен|relation|connect|application"),
        (r"задач|цел[ьи]|исследовател|руковод|\bpi\b|principal|objective|purpose", r"общая информация|команда|team|overview|objective"),
        (r"идентифик|публикац|отч[её]т|\bdoi\b|\bntrs\b|identifier|publication|report", r"идентифик|публикац|identifier|publication|reference"),
    ]
    return "|".join(section for query, section in hints if re.search(query, question, re.I)) or r"a^"


def named_studies(question: str, slugs: list[str]) -> list[str]:
    """Resolve names against the actual catalog, preferring the longest mention.

    Prefixes identify a program/version; suffixes let a shared program name be
    omitted (e.g. 'ACME Flame Design and BRE'). No invented study IDs are used.
    """
    def normalize(value: str) -> str:
        return " ".join(re.findall(r"[a-z0-9]+", value.casefold()))

    query = normalize(question)
    aliases: dict[str, list[str]] = {}
    generic = {"program", "overview", "experiments", "precursor", "reference"}
    for slug in dict.fromkeys(slugs):
        words = normalize(slug).split()
        for end in range(1, len(words) + 1):
            for parts in (words[:end], words[-end:]):
                if len(parts) == 1 and (len(parts[0]) < 3 or parts[0] in generic):
                    continue
                aliases.setdefault(" ".join(parts), []).append(slug)

    mentions = []
    for alias, candidates in aliases.items():
        for match in re.finditer(r"(?<!\w)" + re.escape(alias) + r"(?!\w)", query):
            # A family mention selects its overview, then its base/combined card.
            slug = min(candidates, key=lambda s: (
                "overview" not in s,
                s.split("-").count(s.split("-")[0]) < 2,
                len(s), s,
            ))
            mentions.append((match.start(), match.end(), slug))
    selected = []
    for start, end, slug in sorted(mentions, key=lambda m: (m[0] - m[1], m[0])):
        if not any(start < old_end and end > old_start for old_start, old_end, _ in selected):
            selected.append((start, end, slug))
    return list(dict.fromkeys(slug for _, _, slug in sorted(selected)))


def _filters(request: ChatRequest, revision: str) -> dict:
    return {
        "scope_slug": request.study_id if request.scope == "study" else None,
        "revision": revision,
    }


_RUN_SOURCES_QUERY = text("""
    SELECT st.slug,
           st.title,
           st.conditions -> 'experiment_runs' AS runs,
           coalesce(
               (SELECT jsonb_agg(jsonb_build_object('id', src.id::text, 'url', src.url)
                                 ORDER BY (src.url LIKE 'https://ntrs.nasa.gov%') DESC, src.id)
                FROM sources src
                WHERE src.study_id = st.id),
               '[]'::jsonb
           ) AS sources
    FROM studies st
    WHERE st.conditions ? 'experiment_runs'
      AND jsonb_array_length(st.conditions -> 'experiment_runs') > 0
      AND (CAST(:scope_slug AS text) IS NULL OR st.slug = :scope_slug)
""")

_RUN_MEASUREMENT_CUE_RE = re.compile(
    r"\b(?:runs?|droplets?|diameters?|burning[- ]rate|spread[- ]rate|flame[- ]spread|burn[- ]duration|"
    r"quench(?:ed|ing)?|extinguish(?:ed|ment)?|disruption|tabular|table|k[- ]?values?)\b|"
    r"(?:mm²/s|mm2/s|mm/s|мм²/с|мм/с)|"
    r"(?:прогон\w*|таблиц\w*|констант\w*\s+горен\w*|скорост\w*\s+(?:горен|распространен)\w*|"
    r"капл\w*|капел\w*|диаметр\w*|разрушен\w*|затухан\w*|потух\w*)",
    re.I,
)
_CAPITAL_K_RE = re.compile(r"(?:^|[\s(=])K(?:$|[\s?.,;:)=/])")
_RUN_ID_CANDIDATE_RE = re.compile(r"(?<![A-Za-z0-9])[A-Za-z]{1,8}[-–]?\d+(?:[-–][A-Za-z0-9]+)?")


def _clean_user_question(question: str) -> str:
    return question.split(" | Scenario:", 1)[0].strip()


def _has_run_measurement_cue(question: str) -> bool:
    cleaned = _clean_user_question(question)
    return bool(_RUN_MEASUREMENT_CUE_RE.search(cleaned) or _CAPITAL_K_RE.search(cleaned))


def _has_run_id_candidate(question: str) -> bool:
    return bool(_RUN_ID_CANDIDATE_RE.search(_clean_user_question(question)))


def _format_num_list(values: object, unit: str) -> str | None:
    if not isinstance(values, list) or not values:
        return None
    nums = [f"{v:g}" if isinstance(v, (int, float)) else str(v) for v in values if v is not None]
    if not nums:
        return None
    joined = nums[0] if len(nums) == 1 else f"{nums[0]}–{nums[-1]}"
    return f"{joined} {unit}".strip()


def format_run_excerpt(run: dict) -> str:
    """Render one digitized ExperimentRun JSON object as a compact, unit-explicit evidence passage."""
    campaign = str(run.get("campaign") or "").strip()
    run_id = str(run.get("run_id") or "").strip()
    material = str(run.get("material") or "").strip()
    geometry = str(run.get("geometry") or "").strip()

    dims = []
    if (d0 := run.get("initial_droplet_diameter_mm")) is not None:
        dims.append(f"d0 = {d0:g} mm")
    if (t_mm := run.get("thickness_mm")) is not None:
        dims.append(f"thickness = {t_mm:g} mm")
    if (w_cm := run.get("width_cm")) is not None:
        dims.append(f"width = {w_cm:g} cm")
    if (l_cm := run.get("length_cm")) is not None:
        dims.append(f"length = {l_cm:g} cm")

    conds = []
    if o2 := _format_num_list(run.get("oxygen_vol_pct"), "%"):
        basis = run.get("oxygen_basis")
        conds.append(f"O2 = {o2}" + (f" ({basis})" if basis else ""))
    if (p_atm := run.get("pressure_atm")) is not None:
        conds.append(f"pressure = {p_atm:g} atm")
    if flow := _format_num_list(run.get("airflow_cms"), "cm/s"):
        flow_parts = [p for p in (run.get("direction"), run.get("airflow_basis")) if p]
        conds.append(f"airflow = {flow}" + (f" ({', '.join(flow_parts)})" if flow_parts else ""))
    if grav := run.get("gravity_regime"):
        conds.append(f"gravity = {grav}")

    outcomes = []
    if k_val := _format_num_list(run.get("burning_rate_constant_mm2_s"), "mm²/s"):
        outcomes.append(f"burning rate constant K = {k_val}")
    if sr := _format_num_list(run.get("spread_rate_mm_s"), "mm/s"):
        outcomes.append(f"flame spread rate = {sr}")
    if (dur := run.get("burn_duration_s")) is not None:
        outcomes.append(f"burn duration = {dur:g} s")
    if outcome := run.get("outcome"):
        outcomes.append(f"outcome = {outcome}")

    parts = [f"Digitized test run {campaign} {run_id}".strip()]
    specimen = ", ".join(p for p in (material, geometry, *dims) if p)
    if specimen:
        parts.append(f"Specimen: {specimen}")
    if conds:
        parts.append(f"Conditions: {', '.join(conds)}")
    if outcomes:
        parts.append(f"Measurements: {', '.join(outcomes)}")
    if locator := run.get("locator"):
        parts.append(f"Source locator: {locator}")
    if notes := run.get("notes"):
        if isinstance(notes, list) and notes:
            parts.append("Notes: " + "; ".join(str(n) for n in notes))
    return ". ".join(parts) + "."


def _resolve_run_source_id(run_url: str | None, sources: list[dict]) -> UUID | None:
    if run_url:
        for src in sources:
            if src.get("url") == run_url and src.get("id"):
                return UUID(str(src["id"]))
    for src in sources:
        if src.get("id"):
            return UUID(str(src["id"]))
    return None


def _run_primary_metric(run: dict) -> float:
    for field in ("burning_rate_constant_mm2_s", "spread_rate_mm_s", "oxygen_vol_pct"):
        vals = run.get(field)
        if isinstance(vals, list) and vals and isinstance(vals[0], (int, float)):
            return float(vals[0])
    if (d0 := run.get("initial_droplet_diameter_mm")) is not None:
        return float(d0)
    return 0.0


def experiment_run_evidence(
    question: str,
    rows: list[dict],
    *,
    target_slugs: list[str] | None = None,
    limit: int = 4,
) -> list[Evidence]:
    """Select grounded ExperimentRun records relevant to specific run IDs or quantitative queries."""
    cleaned = _clean_user_question(question)
    q_low = cleaned.casefold()
    cue = _has_run_measurement_cue(cleaned)
    has_id_token = _has_run_id_candidate(cleaned)
    if not cue and not has_id_token:
        return []

    target_set = set(target_slugs or [])
    q_words = set(re.findall(r"[a-zа-яё0-9]+", q_low))
    q_numbers = [float(m) for m in re.findall(r"\b\d+(?:\.\d+)?\b", q_low)]
    asks_k = bool(re.search(r"\bburning[- ]rate\b|\bk[- ]?values?\b|констант\w*\s+горен\w*|mm²/s|mm2/s|мм²/с", q_low) or _CAPITAL_K_RE.search(cleaned))
    asks_spread = bool(re.search(r"spread[- ]rate|flame[- ]spread|скорост\w*\s+распространен|mm/s|мм/с", q_low))
    asks_droplet = bool(re.search(r"droplet|diameter|капл|капел|диаметр", q_low))

    exact_hits: list[tuple[int, int, Evidence]] = []
    general_hits: list[tuple[int, str, str, float, Evidence]] = []

    for row in rows:
        slug = str(row.get("slug") or "")
        study_title = str(row.get("title") or slug)
        runs = row.get("runs") or []
        sources = row.get("sources") or []
        if not isinstance(runs, list):
            continue

        for run in runs:
            if not isinstance(run, dict):
                continue
            run_id = str(run.get("run_id") or "").strip()
            campaign = str(run.get("campaign") or "").strip()
            if not run_id:
                continue
            src_url = str(run.get("source_url") or "")
            source_id = _resolve_run_source_id(src_url, sources)
            if not src_url or source_id is None:
                continue

            ev_chunk_id = uuid5(NAMESPACE_URL, f"ignis:experiment_run:{slug}:{campaign}:{run_id}")
            ev_title = f"{study_title} — {campaign} run {run_id}".strip()

            # Check exact run ID match first (tolerating space/en-dash variants like FLEX–001).
            exact_pos: int | None = None
            if has_id_token:
                id_pattern = re.escape(run_id).replace(r"\-", r"[-–\s]?")
                match = re.search(r"(?<![A-Za-z0-9])" + id_pattern + r"(?![A-Za-z0-9])", cleaned, re.I)
                if match:
                    exact_pos = match.start()

            if exact_pos is not None:
                exact_hits.append((
                    0 if (not target_set or slug in target_set) else 1,
                    exact_pos,
                    Evidence(
                        chunk_id=ev_chunk_id,
                        source_id=source_id,
                        study_slug=slug,
                        title=ev_title,
                        url=src_url,
                        excerpt=format_run_excerpt(run),
                        locator=run.get("locator"),
                        kind="experiment_run_exact",
                    ),
                ))
                continue

            if not cue:
                continue
            if target_set and slug not in target_set:
                continue

            material = str(run.get("material") or "")
            mat_words = {w for w in re.findall(r"[a-zа-яё0-9]+", material.casefold()) if len(w) >= 4}
            score = 1
            if slug in target_set:
                score += 4
            if campaign and campaign.casefold() in q_low:
                score += 3
            if mat_words & q_words:
                score += 4
            if outcome := run.get("outcome"):
                if str(outcome).casefold() in q_low:
                    score += 3
            if asks_k and run.get("burning_rate_constant_mm2_s"):
                score += 4
            elif asks_k and not run.get("burning_rate_constant_mm2_s"):
                score -= 2
            if asks_spread and run.get("spread_rate_mm_s"):
                score += 4
            if asks_droplet and run.get("initial_droplet_diameter_mm") is not None:
                score += 3
            if q_numbers:
                o2_vals = run.get("oxygen_vol_pct") or []
                d0 = run.get("initial_droplet_diameter_mm")
                for num in q_numbers:
                    if isinstance(o2_vals, list) and any(isinstance(v, (int, float)) and abs(v - num) <= 0.3 for v in o2_vals):
                        score += 4
                    if isinstance(d0, (int, float)) and abs(d0 - num) <= 0.05:
                        score += 3
            # Require either a study/material/campaign match or strong metric match so unrelated global questions stay clean.
            if score < 4:
                continue

            general_hits.append((
                score,
                slug,
                material,
                _run_primary_metric(run),
                Evidence(
                    chunk_id=ev_chunk_id,
                    source_id=source_id,
                    study_slug=slug,
                    title=ev_title,
                    url=src_url,
                    excerpt=format_run_excerpt(run),
                    locator=run.get("locator"),
                    kind="experiment_run",
                ),
            ))

    if exact_hits:
        exact_hits.sort(key=lambda item: (item[0], item[1], item[2].title))
        deduped = []
        seen_ids = set()
        for _, _, ev in exact_hits:
            if ev.chunk_id not in seen_ids:
                seen_ids.add(ev.chunk_id)
                deduped.append(ev)
        return deduped[:limit]

    if not general_hits:
        return []

    # Group by (slug, material) so multi-fuel studies (e.g. FLEX-1 Methanol & n-Heptane) return diverse extremes.
    groups: dict[tuple[str, str], list[tuple[int, float, Evidence]]] = {}
    for score, slug, material, metric, ev in general_hits:
        groups.setdefault((slug, material), []).append((score, metric, ev))

    ordered_groups = sorted(
        groups.values(),
        key=lambda items: (-max(i[0] for i in items), items[0][2].study_slug, items[0][2].title),
    )
    selected: list[Evidence] = []
    seen_ids = set()
    # Pick low and high metric extremes within top groups first, then round-robin top-scoring items.
    group_picks: list[list[Evidence]] = []
    for items in ordered_groups:
        top_score = max(i[0] for i in items)
        best_tier = [i for i in items if i[0] >= top_score - 1]
        by_metric = sorted(best_tier, key=lambda i: (i[1], i[2].title))
        picks = [by_metric[0][2]]
        if len(by_metric) > 1 and by_metric[-1][2].chunk_id != by_metric[0][2].chunk_id:
            picks.append(by_metric[-1][2])
        for _, _, ev in sorted(items, key=lambda i: (-i[0], i[2].title)):
            if len(picks) >= limit:
                break
            if ev.chunk_id not in {p.chunk_id for p in picks}:
                picks.append(ev)
        group_picks.append(picks)

    max_len = max((len(p) for p in group_picks), default=0)
    for idx in range(max_len):
        for picks in group_picks:
            if idx < len(picks) and picks[idx].chunk_id not in seen_ids:
                seen_ids.add(picks[idx].chunk_id)
                selected.append(picks[idx])
                if len(selected) >= limit:
                    return selected
    return selected


class PgVectorRepository:
    async def indexed_studies(self, slugs: list[str], revision: str) -> set[str]:
        async with session_factory() as session:
            rows = await session.scalars(_INDEXED_COMPARISON_STUDIES, {
                "scope_slug": None, "target_slugs": slugs, "revision": revision,
            })
            return set(rows)

    async def _search_runs(
        self, session, request: ChatRequest, target_slugs: list[str] | None, *, limit: int = 4,
    ) -> list[Evidence]:
        cleaned = _clean_user_question(request.message)
        if not (_has_run_measurement_cue(cleaned) or _has_run_id_candidate(cleaned)):
            return []
        scope_slug = request.study_id if request.scope == "study" else None
        rows = (await session.execute(_RUN_SOURCES_QUERY, {"scope_slug": scope_slug})).mappings().all()
        if not rows:
            return []
        effective_targets = [request.study_id] if request.scope == "study" and request.study_id else target_slugs
        return experiment_run_evidence(cleaned, rows, target_slugs=effective_targets, limit=limit)

    async def search_comparison(
        self, slugs: list[str], query: str, vector: str, revision: str, limit: int,
    ) -> list[Evidence]:
        async with session_factory() as session:
            rows = await session.execute(_TARGETED_SEARCH, {
                "scope_slug": None, "target_slugs": slugs, "revision": revision,
                "embedding": vector, "section_pattern": section_pattern(query), "limit": limit,
            })
            chunks = [Evidence(**row) for row in rows.mappings()]
            if _has_run_measurement_cue(query) or _has_run_id_candidate(query):
                run_rows = (await session.execute(_RUN_SOURCES_QUERY, {"scope_slug": None})).mappings().all()
                runs = experiment_run_evidence(query, run_rows, target_slugs=slugs, limit=min(4, limit))
                return (runs + chunks)[:limit]
            return chunks

    async def has_chunks(self, request: ChatRequest, revision: str) -> bool:
        async with session_factory() as session:
            return bool(await session.scalar(_HAS_CHUNKS, _filters(request, revision)))

    async def search(self, request: ChatRequest, vector: str, revision: str, limit: int) -> list[Evidence]:
        async with session_factory() as session:
            params = {
                **_filters(request, revision), "preferred_slug": request.study_id,
                "embedding": vector, "limit": limit,
            }
            rows = await session.execute(_SEARCH, params)
            nearest = [Evidence(**row) for row in rows.mappings()]
            slugs = list((await session.scalars(_STUDIES, params)).all())
            targets = named_studies(request.message, slugs)
            runs = await self._search_runs(
                session, request, targets, limit=min(6, max(4, limit // 4)),
            )
            if not targets:
                return (runs + nearest)[:limit] if runs else nearest
            rows = await session.execute(_TARGETED_SEARCH, {
                **params, "target_slugs": targets,
                "section_pattern": section_pattern(request.message),
                "limit": min(limit, max(limit // 2, len(targets) * 4)),
            })
            targeted = [Evidence(**row) for row in rows.mappings()]
            seen = {item.chunk_id for item in targeted} | {item.chunk_id for item in runs}
            return (runs + targeted + [item for item in nearest if item.chunk_id not in seen])[:limit]
