# Skill Generation Block: refactor

## Generation Metadata

```yaml
skill_name: refactor
purpose: "Plan vault restructuring from configuration changes"
domain_verb: "{DOMAIN:refactor}"
output_type: "restructuring plan with approval gate"
triggers:
  - "/{DOMAIN:refactor}"
  - "/{DOMAIN:refactor} [dimension]"
  - "restructure vault"
  - "change vault structure"
search_mode: none  # reads config diffs, does not search content
quality_gates:
  - plan shown before any execution
  - affected artifacts enumerated
  - risk assessment per change
  - rollback instructions included
  - post-restructuring validation run
handoff_protocol: false  # interactive, requires human approval
pipeline_position: meta_cognitive  # operates outside the main pipeline
```

## Vocabulary Transformation Map

| Marker | Resolves To | Example (Research) | Example (Personal) |
|--------|-------------|-------------------|-------------------|
| `{vocabulary.notes}` | Notes folder name | `claims/` | `reflections/` |
| `{vocabulary.note}` / `{vocabulary.note_plural}` | Note type | `claim` / `claims` | `reflection` / `reflections` |
| `{vocabulary.topic_map}` / `{vocabulary.topic_map_plural}` | MOC reference | `MOC` / `MOCs` | `theme map` / `theme maps` |
| `{vocabulary.inbox}` | Inbox folder name | `inbox/` | `journal/` |
| `{DOMAIN:config dimensions}` | Configurable aspects | Research dimensions | Personal dimensions |

## Processing Depth Calibration

Refactor does not vary by processing depth — it is a structural operation that compares configuration states and plans changes. The plan's scope is determined by what changed in config.yaml, not by a depth setting.

## Skill Template

**Source:** `skill-sources/refactor/SKILL.md` (reference implementation, 448 lines)

The derivation engine reads the full `skill-sources/refactor/SKILL.md` and applies vocabulary transformation:

1. Replace skill frontmatter with domain vocabulary
2. Replace all `{vocabulary.X}` markers with resolved values
3. Replace `{DOMAIN:...}` markers with domain-specific terms
4. Preserve approval gate (NEVER execute without user approval)
5. Preserve dimension detection from config.yaml vs derivation.md
6. Preserve risk assessment per change
7. Preserve post-restructuring validation
8. Preserve --dry-run mode

### Refactor Flow (Invariant)

```
1. DETECT — compare ops/config.yaml (current) against ops/derivation.md (original)
2. CLASSIFY — which dimensions changed and what restructuring each requires
3. PLAN — enumerate affected artifacts, risk level, and rollback instructions
4. APPROVE — show plan, wait for explicit user approval (or --dry-run stops here)
5. EXECUTE — apply changes in safe order (structural first, content second)
6. VALIDATE — run post-restructuring checks
```

### Configuration Dimensions (Invariant)

These are the dimensions that can trigger restructuring:

| Dimension | Config Key | What Changes |
|-----------|-----------|-------------|
| Granularity | `dimensions.granularity` | Note atomicity rules, split/merge thresholds |
| Organization | `dimensions.organization` | Folder structure, {vocabulary.topic_map} hierarchy |
| Linking depth | `dimensions.linking` | Required link density, relationship types |
| Metadata weight | `dimensions.metadata` | Required YAML fields, schema strictness |
| Processing depth | `processing.depth` | Extraction thoroughness, verification rigor |
| Automation level | `processing.automation` | Hook behavior, auto-remediation scope |
| Self space | `features.self_space` | self/ directory presence, identity files |
| Pipeline chaining | `pipeline.chaining` | manual vs suggested vs automatic |

### Risk Assessment Categories (Invariant)

| Risk Level | Meaning | Example |
|------------|---------|---------|
| **safe** | Additive change, nothing breaks | Adding optional YAML field |
| **moderate** | Existing content needs updating but data is preserved | Renaming folders, adding required fields |
| **high** | Content may need restructuring, links may break | Changing organization model, splitting notes |

### Approval Gate (INVARIANT)

```
--=={ name : refactor }==--

  Plan: [N] changes across [M] dimensions

  [Change 1]
    Dimension: [name]
    Before: [old value]
    After: [new value]
    Risk: [safe|moderate|high]
    Affected: [N] files
    Rollback: [instructions]

  [Change 2] ...

  Approve this plan? (yes/no/modify)
```

**NEVER execute without explicit approval.** --dry-run mode shows the plan and exits.

### Post-Restructuring Validation

After execution:
1. Check all wiki links still resolve
2. Check all {vocabulary.note_plural} have required YAML fields
3. Check {vocabulary.topic_map} coverage (no orphans created)
4. Check no duplicate filenames created
5. Report results

## Validation Criteria

- [ ] Config dimension comparison documented
- [ ] All 8 dimensions listed with config keys
- [ ] Risk assessment categories present (safe, moderate, high)
- [ ] Approval gate explicitly documented (NEVER auto-execute)
- [ ] --dry-run mode documented
- [ ] Post-restructuring validation checks listed
- [ ] Rollback instructions required per change
- [ ] `{vocabulary.X}` markers used throughout
