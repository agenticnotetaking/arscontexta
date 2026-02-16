# Skill Generation Block: tasks

## Generation Metadata

```yaml
skill_name: tasks
purpose: "View and manage the task stack and processing queue"
domain_verb: "{DOMAIN:tasks}"
output_type: "combined task stack and queue display"
triggers:
  - "/{DOMAIN:tasks}"
  - "show tasks"
  - "what's pending"
  - "task list"
  - "queue status"
search_mode: none  # reads task files, does not search content
quality_gates:
  - task stack and queue shown in unified view
  - pipeline phases displayed with progress indicators
  - domain vocabulary used throughout
  - discoveries section preserved as separate concern
handoff_protocol: false  # display + management skill, not orchestrated
pipeline_position: meta_cognitive  # operates outside the main pipeline
```

## Vocabulary Transformation Map

| Marker | Resolves To | Example (Research) | Example (Personal) |
|--------|-------------|-------------------|-------------------|
| `{vocabulary.notes}` | Notes folder name | `claims/` | `reflections/` |
| `{vocabulary.note}` / `{vocabulary.note_plural}` | Note type | `claim` / `claims` | `reflection` / `reflections` |
| `{vocabulary.topic_map}` | MOC reference | `MOC` | `theme map` |
| `{vocabulary.cmd_reflect}` | Connection command | `/reflect` | `/find-patterns` |
| `{vocabulary.cmd_reweave}` | Backward-pass command | `/reweave` | `/revisit` |
| `{vocabulary.cmd_verify}` | Verification command | `/verify` | `/verify` |

## Processing Depth Calibration

Tasks does not vary by processing depth — it is a display and management operation. The task stack and queue are structural, not content-dependent.

## Skill Template

**Source:** `skill-sources/tasks/SKILL.md` (reference implementation, 402 lines)

The derivation engine reads the full `skill-sources/tasks/SKILL.md` and applies vocabulary transformation:

1. Replace skill frontmatter with domain vocabulary
2. Replace all `{vocabulary.X}` markers with resolved values
3. Replace `{DOMAIN:...}` markers with domain-specific terms
4. Preserve all 6 operations (status, add, done, drop, reorder, discoveries)
5. Preserve two-system unified view (task stack + pipeline queue)
6. Preserve pipeline phase progress display
7. Preserve discoveries section as separate concern

### Two Systems, One View (Invariant)

The /tasks skill provides a unified view over two distinct tracking systems:

| System | File | Purpose | Items |
|--------|------|---------|-------|
| **Task Stack** | `ops/tasks.md` | User priorities, manual work, ad-hoc tasks | Markdown list with status markers |
| **Pipeline Queue** | `ops/queue/queue.json` | Automated processing pipeline state | JSON entries with phase tracking |

Both are shown in one output. The task stack is user-controlled (add, done, drop, reorder). The pipeline queue is system-controlled (phases advance via /{DOMAIN:process} pipeline).

### Operations (Invariant — all 6 must be present)

| Operation | Syntax | What It Does |
|-----------|--------|-------------|
| `status` | `/{DOMAIN:tasks}` or `/{DOMAIN:tasks} status` | Show task stack + queue state |
| `add` | `/{DOMAIN:tasks} add [description]` | Add a task to the stack |
| `done` | `/{DOMAIN:tasks} done [number]` | Mark a task as completed |
| `drop` | `/{DOMAIN:tasks} drop [number]` | Remove a task without completing |
| `reorder` | `/{DOMAIN:tasks} reorder [number] [position]` | Move a task to a different position |
| `discoveries` | `/{DOMAIN:tasks} discoveries` | Show only the Discoveries section |

### Status Output Format (Invariant)

```
--=={ name : tasks }==--

  Task Stack (ops/tasks.md)
    1. [x] Completed task
    2. [ ] Pending task
    3. [ ] Another pending task

  Pipeline Queue
    | Batch | Phase | Pending | Done |
    |-------|-------|---------|------|
    | source-name | reflect | 3 | 5 |
    | other-source | verify | 1 | 7 |

    Total: {N} pending across {M} batches

  Discoveries
    - {discovery from recent work}
    - {another discovery}
```

### Task Stack Format (ops/tasks.md)

```markdown
# Tasks

## Active
- [ ] Task description here
- [ ] Another task

## Completed
- [x] Done task (completed {date})

## Discoveries
- Discovered during work: [description]
- Another discovery: [description]
```

### Pipeline Phase Progress

For each batch in the queue, show phase progress:

```
source-name: [=====>  ] reflect (5/8 {vocabulary.note_plural} complete)
```

Phase order: create → {vocabulary.cmd_reflect} → {vocabulary.cmd_reweave} → {vocabulary.cmd_verify}

### Discoveries Section

Discoveries are captured during work — things noticed that should not derail the current task but should not be lost. They are separate from tasks because they are observations, not commitments.

Operations:
- Accumulate during any work session
- Review via `/{DOMAIN:tasks} discoveries`
- Promote to task via `/{DOMAIN:tasks} add [discovery text]`
- Clear after promotion

### Add Operation Details

When adding a task:
1. Append to `ops/tasks.md` under `## Active`
2. Use `- [ ]` marker
3. Confirm with task number assignment:
   ```
   Added task #{N}: {description}
   ```

### Done/Drop Operation Details

When completing or dropping:
1. Find task by number in `ops/tasks.md`
2. For done: move to `## Completed` with date, change `[ ]` to `[x]`
3. For drop: remove entirely (no archive)
4. Confirm:
   ```
   Completed task #{N}: {description}
   ```
   or
   ```
   Dropped task #{N}: {description}
   ```

## Validation Criteria

- [ ] Two-system unified view documented (task stack + pipeline queue)
- [ ] All 6 operations documented with syntax
- [ ] Status output format with all three sections
- [ ] Pipeline phase progress display documented
- [ ] Discoveries section documented as separate concern
- [ ] Task stack file format (ops/tasks.md) specified
- [ ] `{vocabulary.X}` markers used throughout
- [ ] Pipeline phase order uses domain vocabulary commands
