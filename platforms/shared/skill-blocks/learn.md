# Skill Generation Block: learn

## Generation Metadata

```yaml
skill_name: learn
purpose: "Research a topic and grow the knowledge graph"
domain_verb: "{DOMAIN:learn}"
output_type: "inbox file with full provenance, chained to pipeline"
triggers:
  - "/{DOMAIN:learn}"
  - "/{DOMAIN:learn} [topic]"
  - "research this"
  - "find out about"
  - "explore [topic]"
search_mode: none  # learn produces content, does not search existing graph
quality_gates:
  - provenance metadata complete (exa_prompt, exa_tool, generated timestamp)
  - results filed to inbox (not pasted inline)
  - topic connected to goals if applicable
  - pipeline chaining offered (manual, suggested, or automatic)
handoff_protocol: false  # interactive research, not orchestrated
pipeline_position: pre_pipeline  # feeds INTO the pipeline via inbox
next_phase: "{DOMAIN:seed}"
```

## Vocabulary Transformation Map

| Marker | Resolves To | Example (Research) | Example (Personal) |
|--------|-------------|-------------------|-------------------|
| `{vocabulary.inbox}` | Inbox folder name | `inbox/` | `journal/` |
| `{vocabulary.note}` / `{vocabulary.note_plural}` | Note type | `claim` / `claims` | `reflection` / `reflections` |
| `{vocabulary.cmd_reduce}` | Process command for chaining | `/reduce` | `/distill` |
| `{vocabulary.cmd_seed}` | Seed command for chaining | `/seed` | `/seed` |
| `{DOMAIN:the knowledge domain}` | Research focus lens | `agent-operated knowledge systems` | `personal growth` |

## Processing Depth Calibration

Learn supports three research depths that map to different tool cascades:

| Depth | Primary Tool | Fallback | Use Case |
|-------|-------------|----------|----------|
| **deep** | exa-deep-research | exa-web-search | Comprehensive topic exploration, literature review |
| **moderate** | exa-web-search | web-search | Targeted research on specific question |
| **light** | web-search | none | Quick fact-checking, current events |

Depth is set by: explicit flag (`--deep`, `--moderate`, `--light`) > `ops/config.yaml` default > fallback to moderate.

## Skill Template

**Source:** `skill-sources/learn/SKILL.md` (reference implementation, 255 lines)

The derivation engine reads the full `skill-sources/learn/SKILL.md` and applies vocabulary transformation:

1. Replace skill frontmatter with domain vocabulary
2. Replace all `{vocabulary.X}` markers with resolved values
3. Replace `{DOMAIN:...}` markers with domain-specific terms
4. Preserve three-depth research cascade (deep, moderate, light)
5. Preserve full Exa provenance metadata requirements
6. Preserve pipeline chaining options (manual, suggested, automatic)
7. Preserve goals.md integration (read for topics, update with discoveries)

### Research Flow (Invariant)

```
1. READ CONFIG — tool preferences, depth, domain vocabulary
2. DETERMINE DEPTH — from flags, config, or default (moderate)
3. RESEARCH — tool cascade: primary → fallback → last resort
4. FILE TO INBOX — {vocabulary.inbox}/{date}-{topic-slug}.md
5. CHAIN TO PIPELINE — based on pipeline.chaining setting
6. UPDATE GOALS — append new research directions if discovered
```

### Provenance Requirements (Invariant)

Every research result filed to inbox MUST include these YAML fields:

| Exa Tool | source_type | Required Fields |
|----------|-------------|-----------------|
| deep_researcher | `exa-deep-research` | exa_prompt, exa_research_id, exa_model, generated |
| web_search | `exa-web-search` | exa_prompt, exa_tool, generated |
| get_code_context | `exa-web-search` | exa_prompt, exa_tool, generated |
| WebSearch | `web-search` | search_query, generated |

**The exa_prompt field is critical** — it captures the intellectual context that shaped what Exa returned. Without it, claims cannot be traced back to their research origin.

### Pipeline Chaining

After filing research to inbox, chain based on `ops/config.yaml` setting:

| Mode | Behavior |
|------|----------|
| `manual` | Show path to filed research. User decides next step. |
| `suggested` | Show path + suggest: "Run /{vocabulary.cmd_seed} {filepath} to begin extraction." |
| `automatic` | Automatically invoke /{vocabulary.cmd_seed} on the filed research. |

### Goals Integration

If `self/goals.md` exists:
- Before research: read goals to see if topic aligns with existing priorities
- After research: if new research directions were discovered, append them to goals

### No-Topic Fallback

If invoked without a topic:
1. Read `self/goals.md` for highest-priority unexplored direction
2. If found: propose it ("Your goals mention [X] — want me to research that?")
3. If no goals file: ask "What would you like to research?"

## Validation Criteria

- [ ] Three research depths documented (deep, moderate, light)
- [ ] Tool cascade for each depth specified
- [ ] Provenance metadata table present
- [ ] Pipeline chaining modes documented (manual, suggested, automatic)
- [ ] Goals integration (read before, update after)
- [ ] No-topic fallback logic present
- [ ] Inbox filing with date-prefix filename convention
- [ ] `{vocabulary.X}` markers used throughout
