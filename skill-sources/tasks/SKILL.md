---
name: tasks
description: View and manage the task stack and processing queue. Shows pending work, active tasks, completed items, and queue state. Triggers on "/tasks", "show tasks", "what's pending", "task list", "queue status".
version: "1.0"
generated_from: "arscontexta-v1.6"
user-invocable: true
context: fork
model: sonnet
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
argument-hint: "[add|done|drop|reorder|status] [description|number] — manage task stack and view queue"
---

## Runtime Configuration (Step 0 — before any processing)

Read these files to configure domain-specific behavior:

1. **`ops/derivation-manifest.md`** — vocabulary mapping
   - Use `vocabulary.notes` for the notes folder name
   - Use `vocabulary.note` / `vocabulary.note_plural` for note type references
   - Use `vocabulary.topic_map` for MOC references
   - Use `vocabulary.cmd_reflect` / `vocabulary.cmd_reweave` / `vocabulary.cmd_verify` for phase command names

2. **`ops/config.yaml`** — pipeline chaining mode, automation settings

If no derivation file exists, use universal terms.

---

## EXECUTE NOW

**Target: $ARGUMENTS**

Parse the operation:
- No arguments or `status`: show task stack + queue state (combined view)
- `add [description]`: add a task to the stack
- `done [task-number]`: mark a task as completed
- `drop [task-number]`: remove a task without completing
- `reorder [number] [position]`: move a task to a different position in the stack
- `discoveries`: show only the Discoveries section

**START NOW.** Execute the requested operation.

---

## Philosophy

**Two systems, one view.**

The task stack (`ops/tasks.md`) and the pipeline queue (`ops/queue/queue.yaml` or `ops/queue/queue.json`) serve different purposes:

| System | Purpose | Managed By | Updated By |
|--------|---------|-----------|------------|
| Task stack | Human priorities — what YOU want to work on | You (via /tasks) | Manual: /tasks add, /tasks done |
| Pipeline queue | Automated processing state — what the SYSTEM needs to process | Pipeline skills | Automatic: /reduce, /ralph, /reflect |

/tasks shows BOTH so you always have a unified view of all pending work. The task stack is your working memory. The pipeline queue is the system's working memory. Together they answer: "What should I do next?"

---

## Operations

### /tasks (or /tasks status)

Show both the human task stack and the automated queue.

**Step 1: Read task stack**

```bash
# Read ops/tasks.md
cat ops/tasks.md 2>/dev/null
```

Parse the task stack into sections:
- **Current** (or Active): items marked `- [ ]`
- **Completed**: items marked `- [x]`
- **Discoveries**: items noted during work (plain text, no checkbox)

If `ops/tasks.md` does not exist, note: "No task stack found. Run `/tasks add [description]` to create one."

**Step 2: Read queue state**

```bash
# Check for queue file (YAML or JSON)
if [[ -f "ops/queue/queue.yaml" ]]; then
  QUEUE_FILE="ops/queue/queue.yaml"
  PENDING_TASKS=$(grep -c 'status: pending' "$QUEUE_FILE" 2>/dev/null || echo 0)
  DONE_TASKS=$(grep -c 'status: done' "$QUEUE_FILE" 2>/dev/null || echo 0)
elif [[ -f "ops/queue/queue.json" ]]; then
  QUEUE_FILE="ops/queue/queue.json"
  PENDING_TASKS=$(grep -c '"status": "pending"' "$QUEUE_FILE" 2>/dev/null || echo 0)
  DONE_TASKS=$(grep -c '"status": "done"' "$QUEUE_FILE" 2>/dev/null || echo 0)
else
  QUEUE_FILE=""
  PENDING_TASKS=0
  DONE_TASKS=0
fi
```

If a queue file exists, extract pending task details:
- Task ID
- Current phase
- Target (note title)
- Batch name

**Step 3: Check for archivable batches**

A batch is archivable when ALL its tasks have `status: done`:

```bash
# For each unique batch in the queue, check if all tasks are done
if [[ -n "$QUEUE_FILE" ]]; then
  # Extract unique batch names
  # Check each batch: are all tasks done?
  # Report archivable batches
fi
```

**Step 4: Present combined view**

```
--=={ tasks }==--

  Task Stack (ops/tasks.md)
  =========================
  Current:
    1. [ ] {task description}
    2. [ ] {task description}
    3. [ ] {task description}

  Completed:
    - [x] {task description} (2026-02-10)
    - [x] {task description} (2026-02-08)

  Discoveries:
    - {discovery noted during work}

  Pipeline Queue
  ==============
  Pending: {count} tasks
    - {task-id}: {current_phase} — {target title} (batch: {batch})
    - {task-id}: {current_phase} — {target title} (batch: {batch})
    ...

  Done: {count} tasks
  Archivable batches: {list of batch names where all tasks are done}

  Summary: {total current} tasks on stack, {queue pending} in pipeline
```

**Interpretation notes:**

| Condition | Note |
|-----------|------|
| Task stack empty | "No tasks on stack. Use `/tasks add [description]` to add one, or `/next` for suggestions." |
| Pipeline has pending tasks | "Pipeline has {N} pending tasks. Run /ralph to process them." |
| Archivable batches exist | "Batch '{name}' is ready to archive. Run /archive-batch {name}." |
| Both empty | "All clear. Use `/next` to find what to work on." |

### /tasks add [description]

Add a new task to the task stack.

**Step 1: Read current ops/tasks.md**

If the file does not exist, create it with the standard structure:

```markdown
# Task Stack

## Current

## Completed

## Discoveries
```

**Step 2: Add to Current section**

Append the new task as a checkbox item at the END of the Current section:

```markdown
- [ ] {description}
```

**Step 3: Write updated file**

Use Edit tool to insert the new item at the end of the Current section, preserving existing content.

**Step 4: Report**

```
Added to task stack: {description}
Position: #{N} of {total}

Stack now has {total} current tasks.
```

### /tasks done [number]

Mark a task as completed.

**Step 1: Read current ops/tasks.md**

Parse the Current section to find the Nth task.

**Step 2: Validate**

If the number is out of range (< 1 or > number of current tasks):
```
Error: Task #{number} does not exist. Current tasks: 1-{max}.
```

**Step 3: Move to Completed**

1. Remove the item from Current section
2. Add to Completed section with today's date:
   ```markdown
   - [x] {description} ({YYYY-MM-DD})
   ```
3. Renumber remaining Current items (if display uses numbers)

**Step 4: Write updated file**

**Step 5: Report**

```
Completed: {description}

Remaining: {N} current tasks.
```

**Integration with /next:** If the completed task was the top-priority item, suggest: "Top task completed. Run `/next` for the next recommendation."

### /tasks drop [number]

Remove a task without completing it.

**Step 1: Read current ops/tasks.md**

Parse the Current section to find the Nth task.

**Step 2: Validate**

Same range check as /tasks done.

**Step 3: Remove from Current**

Remove the item entirely. Do NOT move to Completed.

**Step 4: Write updated file**

**Step 5: Report**

```
Dropped: {description}

Remaining: {N} current tasks.
```

### /tasks reorder [number] [position]

Move a task to a different position in the stack.

**Step 1: Read current ops/tasks.md**

Parse all Current items.

**Step 2: Validate**

Both [number] (source) and [position] (destination) must be within range.

**Step 3: Reorder**

1. Remove the task from position [number]
2. Insert at position [position]
3. Renumber remaining items

**Step 4: Write updated file**

**Step 5: Report**

```
Moved: {description}
  From position #{number} to #{position}

Current stack:
  1. [ ] {task 1}
  2. [ ] {task 2}
  ...
```

### /tasks discoveries

Show only the Discoveries section from ops/tasks.md.

```
  Discoveries (process later):
    - {discovery 1}
    - {discovery 2}
    ...

  [If empty: "No discoveries captured. Discoveries are noted during work
   for processing in a future session."]
```

Discoveries are captured during pipeline work (e.g., /reduce notes a connection opportunity, /reflect notices a split candidate). They accumulate here until the user decides to convert them to tasks or discard them.

---

## Queue Integration

The task stack (ops/tasks.md) and pipeline queue coexist but serve different audiences:

| Aspect | Task Stack | Pipeline Queue |
|--------|-----------|---------------|
| File | ops/tasks.md | ops/queue/queue.yaml (or .json) |
| Format | Markdown checklist | YAML/JSON with phase tracking |
| Managed by | User via /tasks | Pipeline skills automatically |
| Read by | /next (priority #1) | /ralph (phase routing) |
| Purpose | Human priorities | Automated processing state |

**/next reads the task stack first.** If the stack has items, /next recommends from the stack (user-set priorities override automated recommendations). If the stack is empty, /next evaluates queue state and vault health to suggest actions.

**Skills that generate pipeline work update BOTH:**
- `/reduce` adds tasks to the queue AND notes discoveries in tasks.md
- `/seed` adds extract tasks to the queue
- `/architect` may add implementation tasks to the task stack

---

## Task Stack Format Specification

The task stack is a simple markdown checklist, always present from day one. Format:

```markdown
# Task Stack

## Current
- [ ] First priority task
- [ ] Second priority task
- [ ] Third priority task

## Completed
- [x] Something finished (2026-02-10)
- [x] Earlier task (2026-02-08)

## Discoveries
- Interesting connection between [[note A]] and [[note B]] found during /reduce
- MOC [[topic]] might need splitting (40+ notes observed during /reflect)
```

**Current** is ordered by priority. Position 1 is highest priority. /tasks reorder adjusts position.

**Completed** is ordered by completion date (most recent first). Provides history of what was accomplished.

**Discoveries** is unordered. Items accumulate during pipeline work. The user converts them to Current tasks or discards them.

---

## Edge Cases

### No ops/tasks.md

Create it with empty sections on first `/tasks add`. For `/tasks status`, report: "No task stack found. Use `/tasks add [description]` to create one."

### No Queue File

Skip the Pipeline Queue section entirely in the status display. Do not show an error.

### Task Number Out of Range

Report the error with the valid range: "Task #{N} does not exist. Current tasks: 1-{max}."

### Empty Task Stack (Current section empty)

```
  Task Stack (ops/tasks.md)
  =========================
  Current:
    (empty)

  Use `/tasks add [description]` to add a task,
  or `/next` for automated suggestions.
```

### No ops/derivation-manifest.md

Use universal vocabulary. All operations work identically.

### Concurrent Modification

If multiple agents modify ops/tasks.md simultaneously, last write wins. The file is small enough that conflicts are unlikely, but if detected, report: "Task stack may have been modified by another session. Please review."

### Discovery Promotion

When a user wants to convert a discovery to a task:
1. Show the discovery
2. Ask for confirmation and priority position
3. Add to Current section
4. Remove from Discoveries section

This is a manual workflow — discoveries do not auto-promote.
