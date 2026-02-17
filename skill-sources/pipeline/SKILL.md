---
name: pipeline
description: End-to-end source processing -- seed, reduce, process all claims through reflect/reweave/verify, archive. The full pipeline in one command. Triggers on "/pipeline", "/pipeline [file]", "process this end to end", "full pipeline".
version: "1.0"
generated_from: "arscontexta-v1.6"
user-invocable: true
context: fork
model: sonnet
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, Task
argument-hint: "[file] — path to source file to process end-to-end"
---

## EXECUTE NOW

**Target: $ARGUMENTS**

Parse immediately:
- Source file path: the file to process (required)
- `--handoff`: output RALPH HANDOFF block at end (for chaining)
- If target is empty: list files in {DOMAIN:inbox}/ and ask which to process

### Step 0: Read Vocabulary

Read `ops/derivation-manifest.md` (or fall back to `ops/derivation.md`) for domain vocabulary mapping. All output must use domain-native terms. If neither file exists, use universal terms.

**START NOW.** Run the full pipeline.

---

## Pipeline Overview

The pipeline chains four phases. Each phase uses skill invocation or /ralph for subagent-based processing. State lives in the queue file — the pipeline is stateless orchestration on top of stateful queue entries.

```
Source file
    |
    v
Phase 1: /seed — create extract task, move source to archive
    |
    v
Phase 2: /reduce (via /ralph) — extract claims from source
    |
    v
Phase 3: /ralph (all claims) — create -> reflect -> reweave -> verify
    |
    v
Phase 4: /archive-batch — move task files, generate summary
    |
    v
Complete
```

The pipeline is the convenience wrapper. /ralph is the engine. /seed is the entry point.

---

## Phase 1: Seed

Invoke /seed on the target file to create the extract task, check for duplicates, and move the source to its archive folder.

**How to invoke:**

Use the Skill tool if available, otherwise execute the /seed workflow directly:
- Validate source exists
- Check for prior processing (duplicate detection)
- Create archive folder
- Move source from {DOMAIN:inbox} to archive
- Create extract task file
- Add extract task to queue

**Capture from seed output:**
- **Batch ID**: the source basename (used for --batch filtering in subsequent steps)
- **Archive folder path**: where the source was moved
- **next_claim_start**: the claim numbering start

Report: `$ Seeded: {source-name}`

**If seed reports the file was already processed:** Ask the user whether to proceed or skip. Do NOT auto-skip — the user may want to re-process with different scope.

---

## Phase 2: Extract (Reduce)

Process the extract task via /ralph. This spawns a subagent that runs /reduce, extracting claims from the source and creating task entries in the queue.

**How to invoke:**

```
/ralph 1 --batch {batch_id} --type extract
```

Or via Task tool:
```
Task(
  prompt = "Run /ralph 1 --batch {batch_id} --type extract",
  description = "extract: {batch_id}"
)
```

After completion, read the queue to count extracted claims and enrichments:

Check how many pending tasks exist for this batch. The reduce phase creates 1 queue entry per claim and 1 per enrichment.

Report:
```
$ Extracted: {N} {DOMAIN:note_plural}, {M} enrichments
  Processing {total_tasks} tasks through the pipeline...
```

**If zero claims extracted:** Report the issue. For TFT sources, zero extraction is a bug — the source almost certainly contains extractable content. Ask the user whether to retry with different scope or skip.

---

## Phase 3: Process All Claims

Count total pending tasks for this batch from the queue. Then process all of them through the full phase sequence.

**How to invoke:**

```
/ralph {remaining_count} --batch {batch_id}
```

Or via Task tool:
```
Task(
  prompt = "Run /ralph {remaining_count} --batch {batch_id}",
  description = "process: {batch_id} ({remaining_count} tasks)"
)
```

This processes every claim through: create -> reflect -> reweave -> verify. And every enrichment through: enrich -> reflect -> reweave -> verify.

Each phase runs in an isolated subagent with fresh context. /ralph handles all the orchestration: subagent spawning, handoff parsing, queue advancement, learnings capture.

**Progress reporting:**

The /ralph invocation reports progress per task. The pipeline relays this:
```
$ Processing {DOMAIN:note} 1/{total}: {title}
  $ create... done
  $ reflect... done (3 connections found)
  $ reweave... done (2 {DOMAIN:note_plural} updated)
  $ verify... done (PASS)
```

**For large batches (20+ claims):** /ralph handles context isolation automatically via subagents. The pipeline does NOT need to chunk — /ralph processes N tasks sequentially with fresh context per phase.

---

## Phase 4: Verify Completion

After /ralph finishes, verify all tasks for this batch are done.

Check the queue: count tasks for this batch that are NOT done.

**If tasks remain pending:**
- Report which tasks are incomplete and at which phase
- Show the specific task IDs and their current_phase
- Suggest: "Run `/ralph --batch {batch_id}` to continue from where it stopped"
- Do NOT proceed to archive

**If all tasks are done:** Proceed to Phase 5.

---

## Phase 5: Archive Batch

When all tasks for the batch are complete, archive the batch.

**How to invoke:**

```
/archive-batch {batch_id}
```

Or execute directly:
1. Move all task files from `ops/queue/` to `ops/queue/archive/{date}-{batch_id}/`
2. Generate a batch summary file: `{batch_id}-summary.md`
3. Remove completed entries from the queue (or mark as archived)

The summary should include:
- Source file name and original location
- Number of claims extracted
- Number of enrichments
- List of created {DOMAIN:note_plural} with titles
- Any notable learnings from the batch

---

## Phase 6: Final Report

```
--=={ pipeline }==--

Source: {source_file}
Batch: {batch_id}

Extraction:
  {DOMAIN:note_plural} extracted: {N}
  Enrichments identified: {M}

Processing:
  {DOMAIN:note_plural} created: {N}
  Existing {DOMAIN:note_plural} enriched: {M}
  Connections added: {C}
  {DOMAIN:topic map}s updated: {T}
  Older {DOMAIN:note_plural} updated via reweave: {R}

Quality:
  All verify checks: {PASS/FAIL count}

Archive: ops/queue/archive/{date}-{batch_id}/
Summary: {batch_id}-summary.md

{DOMAIN:note_plural} created:
- [[claim title 1]]
- [[claim title 2]]
- ...
```

If `--handoff` flag was set, also output:

```
=== RALPH HANDOFF: pipeline ===
Target: {source_file}

Work Done:
- Seeded source: {batch_id}
- Extracted {N} {DOMAIN:note_plural} and {M} enrichments
- Processed all claims through 4-phase pipeline
- Archived batch to {archive_path}

Files Modified:
- {DOMAIN:notes}/ ({N} new {DOMAIN:note_plural})
- ops/queue/archive/{date}-{batch_id}/ (archived)

Learnings:
- [Friction]: {description} | NONE
- [Surprise]: {description} | NONE
- [Methodology]: {description} | NONE
- [Process gap]: {description} | NONE

Queue Updates:
- All tasks for batch {batch_id} marked done and archived
=== END HANDOFF ===
```

---

## Error Handling

**Phase failure at any stage:**
1. Report the failure with context (which phase, which task, what error)
2. Show the current queue state for this batch
3. Suggest remediation: "Run `/ralph --batch {batch_id}` to continue from where it stopped"
4. Do NOT attempt to continue automatically past failures

**The pipeline is resumable.** Queue state persists across sessions:
- /seed detects prior processing and asks whether to proceed
- /ralph picks up from the last completed phase (queue is the source of truth)
- /archive-batch verifies completeness before archiving

**Seed failure:** If /seed fails (file not found, duplicate detected and user declines), stop the pipeline entirely.

**Extract failure:** If /reduce extracts zero claims, report and stop. Do not proceed to an empty processing phase.

**Processing failure:** If /ralph fails mid-batch, the queue preserves state. Individual claims resume from their failed phase on next /ralph invocation.

**Archive failure:** If archiving fails, the claims are still created and connected. Only the organizational cleanup is missing — re-run /archive-batch manually.

---

## Resumability

The pipeline is designed to be interrupted and resumed at any point:

| Interrupted At | How to Resume |
|----------------|---------------|
| Before seed | Run /pipeline again (starts fresh) |
| After seed, before reduce | /ralph 1 --batch {id} --type extract |
| After reduce, during claims | /ralph --batch {id} (picks up from failed phase) |
| After all claims, before archive | /archive-batch {id} |

State lives in the queue file. The pipeline reads queue state, not session state. This means you can interrupt, close the session, and resume later.

---

## Edge Cases

**No target file:** List {DOMAIN:inbox}/ candidates, suggest the best one based on age and relevance.

**Source already seeded:** /seed detects this and asks the user. If they decline, the pipeline stops cleanly.

**Large source (2500+ lines):** /reduce handles chunking automatically. The pipeline does not need special handling.

**No ops/derivation-manifest.md:** Use universal vocabulary for all output.

---

## Critical Constraints

**never:**
- Skip the seed phase (duplicate detection is important)
- Continue past a failed phase automatically
- Process claims inline instead of via /ralph subagents
- Archive a batch with incomplete tasks

**always:**
- Report progress at each phase boundary
- Verify all tasks are done before archiving
- Show the user what was created (list of {DOMAIN:note_plural})
- Suggest next steps if interrupted
- Use domain-native vocabulary from derivation manifest
