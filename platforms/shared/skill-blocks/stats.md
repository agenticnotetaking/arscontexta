# Skill Generation Block: stats

## Generation Metadata

```yaml
skill_name: stats
purpose: "Show vault statistics and knowledge graph metrics"
domain_verb: "{DOMAIN:stats}"
output_type: "formatted metrics display with optional shareable output"
triggers:
  - "/{DOMAIN:stats}"
  - "vault stats"
  - "show metrics"
  - "how big is my vault"
search_mode: none  # counts files and links, does not search content
quality_gates:
  - all metric categories present (growth, health, pipeline, connections)
  - numbers are facts not judgments
  - shareable format compact and branded
  - domain vocabulary used throughout
handoff_protocol: false  # display skill, not orchestrated
pipeline_position: meta_cognitive  # operates outside the main pipeline
```

## Vocabulary Transformation Map

| Marker | Resolves To | Example (Research) | Example (Personal) |
|--------|-------------|-------------------|-------------------|
| `{vocabulary.notes}` | Notes folder name | `claims/` | `reflections/` |
| `{vocabulary.note}` / `{vocabulary.note_plural}` | Note type | `claim` / `claims` | `reflection` / `reflections` |
| `{vocabulary.topic_map}` / `{vocabulary.topic_map_plural}` | MOC reference | `MOC` / `MOCs` | `theme map` / `theme maps` |
| `{vocabulary.inbox}` | Inbox folder name | `inbox/` | `journal/` |
| `{vocabulary.notes_collection}` | qmd collection name | `thinking` | `reflections` |

## Processing Depth Calibration

Stats does not vary by processing depth — it always collects the full set of metrics. The `--share` flag controls output format but not collection scope.

## Skill Template

**Source:** `skill-sources/stats/SKILL.md` (reference implementation, 371 lines)

The derivation engine reads the full `skill-sources/stats/SKILL.md` and applies vocabulary transformation:

1. Replace skill frontmatter with domain vocabulary
2. Replace all `{vocabulary.X}` markers with resolved values
3. Replace `{DOMAIN:...}` markers with domain-specific terms
4. Preserve all 4 metric categories (growth, health, connections, pipeline)
5. Preserve shareable format output
6. Preserve branded output frame
7. Preserve category-specific filtering

### Metric Categories (Invariant)

#### Growth Metrics

| Metric | How to Collect |
|--------|---------------|
| Total {vocabulary.note_plural} | `ls -1 {vocabulary.notes}/*.md \| wc -l` |
| Total {vocabulary.topic_map_plural} | `rg -l '^type: moc' {vocabulary.notes}/` |
| Inbox items | `ls -1 {vocabulary.inbox}/*.md \| wc -l` |
| Archived sources | `ls -1d ops/queue/archive/*/ \| wc -l` |
| {vocabulary.note_plural} this week | `find {vocabulary.notes}/ -name "*.md" -mtime -7 \| wc -l` |
| {vocabulary.note_plural} this month | `find {vocabulary.notes}/ -name "*.md" -mtime -30 \| wc -l` |
| Total words | `wc -w {vocabulary.notes}/*.md \| tail -1` |

#### Health Metrics

| Metric | How to Collect | Healthy | Warning |
|--------|---------------|---------|---------|
| Orphan {vocabulary.note_plural} | Notes with zero incoming links | 0 | Any |
| Dangling links | Wiki links to non-existent files | 0 | Any |
| Missing descriptions | Notes without description field | 0 | Any |
| Missing topics | Notes without topics field | 0 | Any |
| Avg description length | Mean character count of descriptions | >80 | <40 |

#### Connection Metrics

| Metric | How to Collect |
|--------|---------------|
| Total wiki links | `rg -o '\[\[' {vocabulary.notes}/ \| wc -l` |
| Avg links per {vocabulary.note} | total links / total {vocabulary.note_plural} |
| Most-linked {vocabulary.note_plural} | Top 5 by incoming link count |
| {vocabulary.topic_map} coverage | % of {vocabulary.note_plural} in at least one {vocabulary.topic_map} |
| Cross-{vocabulary.topic_map} {vocabulary.note_plural} | Notes appearing in 2+ {vocabulary.topic_map_plural} |

#### Pipeline Metrics

| Metric | How to Collect |
|--------|---------------|
| Queue depth | Pending tasks in ops/queue/queue.json |
| Active batches | Extract tasks with incomplete claims |
| Completed batches | Tasks with status: done |
| Pending observations | `ls -1 ops/observations/*.md \| wc -l` |
| Pending tensions | `ls -1 ops/tensions/*.md \| wc -l` |
| Methodology notes | `ls -1 ops/methodology/*.md \| wc -l` |

### Full Output Format

```
--=={ name : stats }==--

  Growth
    {vocabulary.note_plural}: {N} total ({M} this week, {K} this month)
    {vocabulary.topic_map_plural}: {N}
    Words: {N}

  Health
    Orphans: {N}  |  Dangling: {N}
    Missing descriptions: {N}  |  Missing topics: {N}
    Avg description: {N} chars

  Connections
    Wiki links: {N} total ({avg}/note)
    {vocabulary.topic_map} coverage: {N}%
    Cross-{vocabulary.topic_map}: {N} {vocabulary.note_plural}
    Top linked: {list}

  Pipeline
    Queue: {N} pending  |  Inbox: {N}
    Observations: {N}  |  Tensions: {N}
    Methodology: {N}

  Vault age: {days} days  |  First note: {date}
```

### Shareable Format (--share flag)

```
--=={ name }==--
{N} {vocabulary.note_plural} | {M} links | {K} {vocabulary.topic_map_plural}
{W} words | {D} days | {O} orphans
```

Single line, compact, suitable for sharing.

## Validation Criteria

- [ ] All 4 metric categories present (growth, health, connections, pipeline)
- [ ] Collection commands documented for each metric
- [ ] Health thresholds defined (healthy vs warning)
- [ ] Shareable format documented
- [ ] Branded output frame present
- [ ] `{vocabulary.X}` markers used throughout (no hardcoded terms)
- [ ] Category filtering documented (single category output)
