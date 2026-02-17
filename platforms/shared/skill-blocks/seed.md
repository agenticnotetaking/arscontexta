---
# GENERATION TEMPLATE — Do not edit directly
# This template is transformed by the derivation engine during /setup.
# All {vocabulary.*} markers resolve from the preset's vocabulary.yaml.
# All {config.*} markers resolve from the preset's preset.yaml.
# All {DOMAIN:*} markers resolve from conversation-derived domain context.
# All {if ...}{endif} blocks are conditionally included based on config.
source_skill: seed
min_processing_depth: quick
platform: shared
---

---
name: seed
description: Add a source file to the processing queue. Checks for duplicates, creates archive folder, moves source from {vocabulary.inbox}, creates extract task, and updates queue. Triggers on "/seed", "/seed [file]", "queue this for processing".
version: "1.0"
generated_from: "arscontexta-{plugin_version}"
user-invocable: true
context: fork
model: opus
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
argument-hint: "[file] — path to source file to seed for processing"
---

## EXECUTE NOW

**Target: $ARGUMENTS**

The target MUST be a file path. If no target provided, list {config.inbox_dir}/ contents and ask which to seed.

### Step 0: Read Vocabulary

Read `{config.ops_dir}/derivation-manifest.md` (or fall back to `{config.ops_dir}/derivation.md`) for domain vocabulary mapping. All output must use domain-native terms. If neither file exists, use universal terms.

**START NOW.** Seed the source file into the processing queue.

---

## Step 1: Validate Source

Confirm the target file exists. If it does not, check common locations:
- `{config.inbox_dir}/{filename}`
- Subdirectories of {config.inbox_dir}/

If the file cannot be found, report error and stop:
```
ERROR: Source file not found: {path}
Checked: {locations checked}
```

Read the file to understand:
- **Content type**: what kind of material is this? (research article, documentation, transcript, etc.)
- **Size**: line count (affects chunking decisions in /{vocabulary.reduce})
- **Format**: markdown, plain text, structured data

## Step 2: Duplicate Detection

Check if this source has already been processed. Two levels of detection:

### 2a. Filename Match

Search the queue file and archive folders for matching source names:

```bash
SOURCE_NAME=$(basename "$FILE" .md | tr ' ' '-' | tr '[:upper:]' '[:lower:]')

# Check queue for existing entry
# Search in {config.ops_dir}/queue.yaml, {config.ops_dir}/queue/queue.yaml, or {config.ops_dir}/queue/queue.json
grep -l "$SOURCE_NAME" {config.ops_dir}/queue*.yaml {config.ops_dir}/queue/*.yaml {config.ops_dir}/queue/*.json 2>/dev/null

# Check archive folders
ls -d {config.ops_dir}/queue/archive/*-${SOURCE_NAME}* 2>/dev/null
```

### 2b. Content Similarity (if semantic search available)

{if config.semantic_search}
If semantic search is available (qmd MCP tools or CLI), check for content overlap:

```
mcp__qmd__search query="{vocabulary.note_plural} from {source filename}" collection="{vocabulary.notes_collection}" limit=5
```
{endif}

{if !config.semantic_search}
Check for content overlap via keyword search in the {config.notes_dir}/ directory:
{endif}

```bash
grep -rl "{key terms from source title}" {config.notes_dir}/ 2>/dev/null | head -5
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
ARCHIVE_DIR="{config.ops_dir}/queue/archive/${DATE}-${SOURCE_BASENAME}"
mkdir -p "$ARCHIVE_DIR"
```

The archive folder serves two purposes:
1. Permanent home for the source file (moved from {config.inbox_dir})
2. Destination for task files after batch completion (/archive-batch moves them here)

## Step 4: Move Source to Archive

Move the source file from its current location to the archive folder. This is the **claiming step** — once moved, the source is owned by this processing batch.

**{config.inbox_dir} sources get moved:**
```bash
if [[ "$FILE" == *"{config.inbox_dir}"* ]] || [[ "$FILE" == *"inbox"* ]]; then
  mv "$FILE" "$ARCHIVE_DIR/"
  FINAL_SOURCE="$ARCHIVE_DIR/$(basename "$FILE")"
fi
```

**Sources outside {config.inbox_dir} stay in place:**
```bash
# Living docs (like configuration files) stay where they are
# Archive folder is still created for task files
FINAL_SOURCE="$FILE"
```

Use `$FINAL_SOURCE` in the task file — this is the path all downstream phases reference.

**Why move immediately:** All references (task files, {vocabulary.note_plural}' Source footers) use the final archived path from the start. No path updates needed later. If it is in {config.inbox_dir}, it is unclaimed. Claimed sources live in archive.

## Step 5: Determine Claim Numbering

Find the highest existing {vocabulary.note} number across the queue and archive to ensure globally unique {vocabulary.note} IDs.

```bash
# Check queue for highest claim number in file references
QUEUE_MAX=$(grep -oE '[0-9]{3}\.md' {config.ops_dir}/queue*.yaml {config.ops_dir}/queue/*.yaml 2>/dev/null | \
  grep -oE '[0-9]{3}' | sort -n | tail -1)
QUEUE_MAX=${QUEUE_MAX:-0}

# Check archive for highest claim number
ARCHIVE_MAX=$(find {config.ops_dir}/queue/archive -name "*-[0-9][0-9][0-9].md" 2>/dev/null | \
  grep -v summary | sed 's/.*-\([0-9][0-9][0-9]\)\.md/\1/' | sort -n | tail -1)
ARCHIVE_MAX=${ARCHIVE_MAX:-0}

# Next claim starts after the highest
NEXT_CLAIM_START=$((QUEUE_MAX > ARCHIVE_MAX ? QUEUE_MAX + 1 : ARCHIVE_MAX + 1))
```

{vocabulary.note_title} numbers are globally unique and never reused across batches. This ensures every {vocabulary.note} file name (`{source}-{NNN}.md`) is unique vault-wide.

## Step 6: Create Extract Task File

Write the task file to `{config.ops_dir}/queue/${SOURCE_BASENAME}.md`:

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

# Extract {vocabulary.note_plural} from {source filename}

## Source
Original: {original file path}
Archived: {FINAL_SOURCE}
Size: {line count} lines
Content type: {detected type}

## Scope
{scope guidance if provided via --scope, otherwise: "Full document"}

## Acceptance Criteria
- Extract {vocabulary.note_plural}, implementation ideas, tensions, and testable hypotheses
- Duplicate check against {config.notes_dir}/ during extraction
- Near-duplicates create enrichment tasks (do not skip)
- Each output type gets appropriate handling

## Execution Notes
(filled by /{vocabulary.reduce})

## Outputs
(filled by /{vocabulary.reduce})
```

## Step 7: Update Queue

Add the extract task entry to the queue file.

**For YAML queues ({config.ops_dir}/queue.yaml):**
```yaml
- id: {SOURCE_BASENAME}
  type: extract
  status: pending
  source: "{FINAL_SOURCE}"
  file: "{SOURCE_BASENAME}.md"
  created: "{UTC timestamp}"
  next_claim_start: {NEXT_CLAIM_START}
```

**For JSON queues ({config.ops_dir}/queue/queue.json):**
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

Task file: {config.ops_dir}/queue/{SOURCE_BASENAME}.md
{vocabulary.note_plural_title} will start at: {NEXT_CLAIM_START}
{vocabulary.note_title} files will be: {SOURCE_BASENAME}-{NNN}.md (unique across vault)
Queue: updated with extract task

Next steps:
  /ralph 1 --batch {SOURCE_BASENAME}     (extract {vocabulary.note_plural})
  /pipeline will handle this automatically
```

---

## Why This Skill Exists

Manual queue management is error-prone. This skill:
- Ensures consistent task file format across batches
- Handles {vocabulary.note} numbering automatically (globally unique)
- Checks for duplicates before creating unnecessary work
- Moves sources to their permanent archive location immediately
- Provides clear next steps for the user

## Naming Convention

Task files use the source basename for human readability:
- Task file: `{source-basename}.md`
- {vocabulary.note_title} files: `{source-basename}-{NNN}.md`
- Summary: `{source-basename}-summary.md`
- Archive folder: `{date}-{source-basename}/`

{vocabulary.note_title} numbers (NNN) are globally unique across all batches, ensuring every filename is unique vault-wide. This is required because wiki links resolve by filename, not path.

## Source Handling Patterns

**{config.inbox_dir} source (most common):**
```
{config.inbox_dir}/research/article.md
    | /seed
    v
{config.ops_dir}/queue/archive/2026-01-30-article/article.md  <- source moved here
{config.ops_dir}/queue/article.md                               <- task file created
```

**Living doc (outside {config.inbox_dir}):**
```
CLAUDE.md -> stays as CLAUDE.md (no move)
{config.ops_dir}/queue/archive/2026-01-30-claude-md/           <- folder still created
{config.ops_dir}/queue/claude-md.md                             <- task file created
```

When /archive-batch runs later, it moves task files into the existing archive folder and generates a summary.

---

## Edge Cases

**Source outside {config.inbox_dir}:** Works — source stays in place, archive folder is created for task files only.

**No queue file:** Create `{config.ops_dir}/queue/queue.yaml` (or `.json`) with schema header and this first entry.

**Large source (2500+ lines):** Note in output: "Large source ({N} lines) -- /{vocabulary.reduce} will chunk automatically."

**Source is a URL or non-file:** Report error: "/seed requires a file path."

**No {config.ops_dir}/derivation-manifest.md:** Use universal vocabulary for all output.

---

## Critical Constraints

**never:**
- Skip duplicate detection (prevents wasted processing)
- Move a source that is not in {config.inbox_dir} (living docs stay in place)
- Reuse {vocabulary.note} numbers from previous batches (globally unique is required)
- Create a task file without updating the queue (both must happen together)

**always:**
- Ask before proceeding when duplicates are detected
- Create the archive folder even for living docs (task files need it)
- Use the archived path (not original) in the task file for {config.inbox_dir} sources
- Report next steps clearly so the user knows what to do next
- Compute next_claim_start from both queue AND archive (not just one)
