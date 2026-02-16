# Skill Generation Block: next

## Generation Metadata

```yaml
skill_name: next
purpose: "Surface the most valuable next action based on vault state"
domain_verb: "{DOMAIN:next}"
output_type: "prioritized recommendation with rationale"
triggers:
  - "/{DOMAIN:next}"
  - "what should I do"
  - "what's next"
  - "what needs attention"
search_mode: none  # reads state, does not search
quality_gates:
  - recommendation is singular (one action, not a list)
  - rationale references specific vault state
  - consequence speed classification is explicit
  - deduplication against recent recommendations
handoff_protocol: false  # advisory skill, not orchestrated
pipeline_position: meta_cognitive  # operates outside the main pipeline
```

## Vocabulary Transformation Map

| Marker | Resolves To | Example (Research) | Example (Personal) |
|--------|-------------|-------------------|-------------------|
| `{vocabulary.notes}` | Notes folder name | `claims/` | `reflections/` |
| `{vocabulary.inbox}` | Inbox folder name | `inbox/` | `journal/` |
| `{vocabulary.note}` / `{vocabulary.note_plural}` | Note type | `claim` / `claims` | `reflection` / `reflections` |
| `{vocabulary.topic_map}` | MOC reference | `MOC` | `theme map` |
| `{vocabulary.cmd_reduce}` | Processing command | `/reduce` | `/distill` |
| `{vocabulary.cmd_reflect}` | Connection command | `/reflect` | `/find-patterns` |
| `{vocabulary.cmd_reweave}` | Backward-pass command | `/reweave` | `/revisit` |
| `{vocabulary.rethink}` | Rethink command | `rethink` | `reassess` |

## Processing Depth Calibration

/next does not vary by processing depth — it is a read-only advisory operation that measures vault state and recommends one action. The recommendation may reference depth-appropriate actions (e.g., suggesting quick processing vs deep extraction) but the skill itself always runs the same way.

## Skill Template

**Source:** `skill-sources/next/SKILL.md` (reference implementation, 329 lines)

The derivation engine reads the full `skill-sources/next/SKILL.md` and applies vocabulary transformation:

1. Replace skill frontmatter with domain vocabulary
2. Replace all `{vocabulary.X}` markers with resolved values
3. Replace `{DOMAIN:...}` markers with domain-specific terms
4. Preserve 14-signal vault state collection
5. Preserve consequence speed classification (session > multi-session > slow)
6. Preserve 4-level priority cascade (task stack > session > multi-session > slow)
7. Preserve deduplication via ops/next-log.md
8. Apply clean output format (no branded frames per Section 10.5)

### Vault State Signals (Invariant — all 14 must be collected)

| Signal | What It Measures |
|--------|-----------------|
| Task stack depth | ops/tasks.md pending items |
| Queue pending count | ops/queue/queue.json pending tasks |
| Queue blocked count | Tasks waiting on dependencies |
| Inbox count | Unprocessed items in {vocabulary.inbox}/ |
| Pending observations | ops/observations/*.md count |
| Pending tensions | ops/tensions/*.md count |
| Unprocessed sessions | ops/sessions/*.json count |
| Orphan {vocabulary.note_plural} | Notes with zero incoming links |
| Dangling links | Wiki links to non-existent files |
| {vocabulary.topic_map} coverage | Notes not appearing in any {vocabulary.topic_map} |
| Stale {vocabulary.note_plural} | Notes not modified in 30+ days with low link density |
| Goals staleness | Days since goals file was last updated |
| Tutorial state | Incomplete tutorial step |
| Pipeline pressure | Active batches with incomplete phases |
| Maintenance queue state | ops/queue/queue.json maintenance tasks |

### Consequence Speed Classification (Invariant)

| Speed | Meaning | Examples |
|-------|---------|---------|
| **session** | Inaction degrades THIS session | Orphans, dangling links, inbox pressure, task stack items |
| **multi_session** | Inaction degrades over 2-5 sessions | Pipeline batches, observation accumulation, stale goals |
| **slow** | Inaction degrades over weeks | {vocabulary.topic_map} oversizing, rethink thresholds, deep maintenance |

### Priority Cascade (Invariant)

```
Level 1: Task stack items (user's explicit priorities — always first)
Level 2: Session-speed signals (what degrades THIS session)
Level 3: Multi-session signals (what degrades over 2-5 sessions)
Level 4: Slow signals (weeks-scale degradation)
```

Within each level, pick the signal with the highest count or most severe consequence.

### Output Format

```
next

  Recommended: [one specific action with command]

  Why: [2-3 sentences referencing specific vault state]

  Consequence speed: [session|multi_session|slow]
  Signal: [which signal triggered this]

  Other signals: [brief list of non-critical signals]
```

### Deduplication

After each recommendation, append to `ops/next-log.md`:

```markdown
- {YYYY-MM-DD}: Recommended {action} (signal: {signal}, speed: {speed})
```

Before recommending, check the log: if the same signal was recommended in the last 2 entries and the user did not act on it, deprioritize it and surface the next-highest signal instead. Persistent ignoring signals intent.

## Validation Criteria

- [ ] All 14 vault state signals documented with collection method
- [ ] Consequence speed classification present (session, multi_session, slow)
- [ ] Priority cascade documented (4 levels)
- [ ] Singular recommendation output (not a list)
- [ ] Deduplication via next-log.md
- [ ] Clean output format (no branded frames)
- [ ] Maintenance queue reconciliation documented with create/close/update logic
- [ ] Condition reconciliation runs BEFORE state collection
- [ ] `{vocabulary.X}` markers used throughout (no hardcoded terms)
