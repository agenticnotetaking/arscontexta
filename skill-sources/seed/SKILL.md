---
name: seed
description: Add a source file to the processing queue. Checks for duplicates, creates archive folder, moves source from inbox, creates extract task, and updates queue. Triggers on "/seed", "/seed [file]", "queue this for processing".
version: "1.0"
generated_from: "arscontexta-v1.6"
user-invocable: true
context: fork
model: sonnet
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
argument-hint: "[file] — path to source file to seed for processing"
---

## EXECUTE NOW

**Target: $ARGUMENTS**

The target MUST be a file path. If no target provided, list {DOMAIN:inbox}/ contents and ask which to seed.

### Step 0: Read Vocabulary

Read `ops/derivation-manifest.md` (or fall back to `ops/derivation.md`) for domain vocabulary mapping. All output must use domain-native terms. If neither file exists, use universal terms.

**START NOW.** Seed the source file into the processing queue.

---

## Step 1: Validate Source

Confirm the target file exists. If it does not, check common locations:
- `{DOMAIN:inbox}/{filename}`
- Subdirectories of {DOMAIN:inbox}/

If the file cannot be found, report error and stop:
```
ERROR: Source file not found: {path}
Checked: {locations checked}
```

Read the file to understand:
- **Content type**: what kind of material is this? (research article, documentation, transcript, etc.)
- **Size**: line count (affects chunking decisions in /reduce)
- **Format**: markdown, plain text, structured data

## Step 2: Duplicate Detection

Check if this source has already been processed. Two levels of detection:

### 2a. Filename Match

Search the queue file and archive folders for matching source names:

```bash
SOURCE_NAME=$(basename "$FILE" .md | tr ' ' '-' | tr '[:upper:]' '[:lower:]')

# Check queue for existing entry
# Search in ops/queue.yaml, ops/queue/queue.yaml, or ops/queue/queue.json
grep -l "$SOURCE_NAME" ops/queue*.yaml ops/queue/*.yaml ops/queue/*.json 2>/dev/null

# Check archive folders
ls -d ops/queue/archive/*-${SOURCE_NAME}* 2>/dev/null
```

### 2b. Content Similarity (if semantic search available)

If semantic search is available (qmd MCP tools or CLI), check for content overlap:

```
mcp__qmd__search query="claims from {source filename}" limit=5
```

Or via keyword search in the {DOMAIN:notes}/ directory:
```bash
grep -rl "{key terms from source title}" {DOMAIN:notes}/ 2>/dev/null | head -5
```

### 2c. Report Duplicates

If either check finds a match:
- Show what was found (filename match or content overlap)
- Ask: "This source may have been processed before. Proceed anyway? (y/n)"
- If the user declines, stop cleanly
- If the user confirms (or no duplicate found), continue

## Step 3: Create Archive Structure

Create the archive folder. The date-prefixed folder name ensures uniqueness.

```bash
DATE=$(date -u +"%Y-%m-%d")
SOURCE_BASENAME=$(basename "$FILE" .md | tr ' ' '-' | tr '[:upper:]' '[:lower:]')
ARCHIVE_DIR="ops/queue/archive/${DATE}-${SOURCE_BASENAME}"
mkdir -p "$ARCHIVE_DIR"
```

The archive folder serves two purposes:
1. Permanent home for the source file (moved from {DOMAIN:inbox})
2. Destination for task files after batch completion (/archive-batch moves them here)

## Step 4: Move Source to Archive

Move the source file from its current location to the archive folder. This is the **claiming step** — once moved, the source is owned by this processing batch.

**{DOMAIN:inbox} sources get moved:**
```bash
if [[ "$FILE" == *"{DOMAIN:inbox}"* ]] || [[ "$FILE" == *"inbox"* ]]; then
  mv "$FILE" "$ARCHIVE_DIR/"
  FINAL_SOURCE="$ARCHIVE_DIR/$(basename "$FILE")"
fi
```

**Sources outside {DOMAIN:inbox} stay in place:**
```bash
# Living docs (like configuration files) stay where they are
# Archive folder is still created for task files
FINAL_SOURCE="$FILE"
```

Use `$FINAL_SOURCE` in the task file — this is the path all downstream phases reference.

**Why move immediately:** All references (task files, {DOMAIN:note_plural}' Source footers) use the final archived path from the start. No path updates needed later. If it is in {DOMAIN:inbox}, it is unclaimed. Claimed sources live in archive.

## Step 5: Determine Claim Numbering

Find the highest existing claim number across the queue and archive to ensure globally unique claim IDs.

```bash
# Check queue for highest claim number in file references
QUEUE_MAX=$(grep -oE '[0-9]{3}\.md' ops/queue*.yaml ops/queue/*.yaml 2>/dev/null | \
  grep -oE '[0-9]{3}' | sort -n | tail -1)
QUEUE_MAX=${QUEUE_MAX:-0}

# Check archive for highest claim number
ARCHIVE_MAX=$(find ops/queue/archive -name "*-[0-9][0-9][0-9].md" 2>/dev/null | \
  grep -v summary | sed 's/.*-\([0-9][0-9][0-9]\)\.md/\1/' | sort -n | tail -1)
ARCHIVE_MAX=${ARCHIVE_MAX:-0}

# Next claim starts after the highest
NEXT_CLAIM_START=$((QUEUE_MAX > ARCHIVE_MAX ? QUEUE_MAX + 1 : ARCHIVE_MAX + 1))
```

Claim numbers are globally unique and never reused across batches. This ensures every claim file name (`{source}-{NNN}.md`) is unique vault-wide.

## Step 6: Create Extract Task File

Write the task file to `ops/queue/${SOURCE_BASENAME}.md`:

```markdown
---
id: {SOURCE_BASENAME}
type: extract
source: {FINAL_SOURCE}
original_path: {original file path before move}
archive_folder: {ARCHIVE_DIR}
created: {UTC timestamp}
next_claim_start: {NEXT_CLAIM_START}
---

# Extract {DOMAIN:note_plural} from {source filename}

## Source
Original: {original file path}
Archived: {FINAL_SOURCE}
Size: {line count} lines
Content type: {detected type}

## Scope
{scope guidance if provided via --scope, otherwise: "Full document"}

## Acceptance Criteria
- Extract claims, implementation ideas, tensions, and testable hypotheses
- Duplicate check against {DOMAIN:notes}/ during extraction
- Near-duplicates create enrichment tasks (do not skip)
- Each output type gets appropriate handling

## Execution Notes
(filled by /reduce)

## Outputs
(filled by /reduce)
```

## Step 7: Update Queue

Add the extract task entry to the queue file.

**For YAML queues (ops/queue.yaml):**
```yaml
- id: {SOURCE_BASENAME}
  type: extract
  status: pending
  source: "{FINAL_SOURCE}"
  file: "{SOURCE_BASENAME}.md"
  created: "{UTC timestamp}"
  next_claim_start: {NEXT_CLAIM_START}
```

**For JSON queues (ops/queue/queue.json):**
```json
{
  "id": "{SOURCE_BASENAME}",
  "type": "extract",
  "status": "pending",
  "source": "{FINAL_SOURCE}",
  "file": "{SOURCE_BASENAME}.md",
  "created": "{UTC timestamp}",
  "next_claim_start": {NEXT_CLAIM_START}
}
```

**If no queue file exists:** Create one with the appropriate schema header (phase_order definitions) and this first task entry.

## Step 8: Report

```
--=={ seed }==--

Seeded: {SOURCE_BASENAME}
Source: {original path} -> {FINAL_SOURCE}
Archive folder: {ARCHIVE_DIR}
Size: {line count} lines
Content type: {detected type}

Task file: ops/queue/{SOURCE_BASENAME}.md
Claims will start at: {NEXT_CLAIM_START}
Claim files will be: {SOURCE_BASENAME}-{NNN}.md (unique across vault)
Queue: updated with extract task

Next steps:
  /ralph 1 --batch {SOURCE_BASENAME}     (extract claims)
  /pipeline will handle this automatically
```

---

## Why This Skill Exists

Manual queue management is error-prone. This skill:
- Ensures consistent task file format across batches
- Handles claim numbering automatically (globally unique)
- Checks for duplicates before creating unnecessary work
- Moves sources to their permanent archive location immediately
- Provides clear next steps for the user

## Naming Convention

Task files use the source basename for human readability:
- Task file: `{source-basename}.md`
- Claim files: `{source-basename}-{NNN}.md`
- Summary: `{source-basename}-summary.md`
- Archive folder: `{date}-{source-basename}/`

Claim numbers (NNN) are globally unique across all batches, ensuring every filename is unique vault-wide. This is required because wiki links resolve by filename, not path.

## Source Handling Patterns

**{DOMAIN:inbox} source (most common):**
```
{DOMAIN:inbox}/research/article.md
    | /seed
    v
ops/queue/archive/2026-01-30-article/article.md  <- source moved here
ops/queue/article.md                               <- task file created
```

**Living doc (outside {DOMAIN:inbox}):**
```
CLAUDE.md -> stays as CLAUDE.md (no move)
ops/queue/archive/2026-01-30-claude-md/           <- folder still created
ops/queue/claude-md.md                             <- task file created
```

When /archive-batch runs later, it moves task files into the existing archive folder and generates a summary.

---

## Edge Cases

**Source outside {DOMAIN:inbox}:** Works — source stays in place, archive folder is created for task files only.

**No queue file:** Create `ops/queue/queue.yaml` (or `.json`) with schema header and this first entry.

**Large source (2500+ lines):** Note in output: "Large source ({N} lines) -- /reduce will chunk automatically."

**Source is a URL or non-file:** Report error: "/seed requires a file path."

**No ops/derivation-manifest.md:** Use universal vocabulary for all output.

---

## Critical Constraints

**never:**
- Skip duplicate detection (prevents wasted processing)
- Move a source that is not in {DOMAIN:inbox} (living docs stay in place)
- Reuse claim numbers from previous batches (globally unique is required)
- Create a task file without updating the queue (both must happen together)

**always:**
- Ask before proceeding when duplicates are detected
- Create the archive folder even for living docs (task files need it)
- Use the archived path (not original) in the task file for {DOMAIN:inbox} sources
- Report next steps clearly so the user knows what to do next
- Compute next_claim_start from both queue AND archive (not just one)
