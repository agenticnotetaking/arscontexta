# Testing Milestones

Seven validation milestones for the Ars Contexta v1.6 plugin. Each milestone tests a distinct layer of the system: from kernel correctness through vocabulary transformation to cross-platform parity. Run them in order — later milestones depend on earlier ones passing.

---

## Milestone 1: Kernel Validation

**What it tests:** A freshly generated vault contains all 15 universal primitives from kernel.yaml. This is the foundational check — if the kernel is missing primitives, nothing built on top of it will function correctly.

**Prerequisites:**
- A generated vault from /setup (any domain, any preset)
- The vault must have at least 3 notes created (to exercise link and MOC checks)
- `validate-kernel.sh` accessible at `./reference/validate-kernel.sh`

**Pass criteria:** 15/15 checks pass (PASS status). WARN is acceptable for semantic search (primitive 8) if the platform does not support qmd and for self space (primitive 9) if disabled via configuration, but all other primitives must be PASS.

**Verification steps:**

```bash
# Run kernel validation against the generated vault
./reference/validate-kernel.sh /path/to/generated-vault

# Expected: 15 PASS lines, 0 FAIL lines
# Acceptable: 14 PASS + 1 WARN (semantic search when qmd not configured, or self space when disabled)
```

**Expected output on success:**

```
=== Kernel Validation: /path/to/generated-vault ===

1. Markdown files with YAML frontmatter
  PASS N markdown files, all with YAML frontmatter
2. Wiki links as graph edges
  PASS N of N files contain wiki links
3. MOC hierarchy for attention management
  PASS N MOCs found
4. Tree injection at session start
  PASS Tree injection mechanism found
5. Description field for progressive disclosure
  PASS All N notes have description fields
6. Topics footer linking notes to MOCs
  PASS All N notes have topics
7. Schema enforcement via validation
  PASS Templates and validation mechanism found
8. Semantic search capability
  PASS Semantic search capability found
9. Self space for agent persistent memory
  PASS self/ with N files (identity, methodology, goals present)
10. Session rhythm: orient, work, persist
  PASS Session rhythm documented or automated
10A. Unique addresses (wiki links as INVARIANT reference form)
  PASS All internal references use wiki links, filenames are unique
11. Discovery-first quality gate
  PASS Discovery-first gate in context file and skills
12. Operational learning loop
  PASS Operational learning loop: observations, tensions, review trigger, rethink mechanism
13. Task stack for work prioritization
  PASS Task stack mechanism found (ops/tasks/ or equivalent)
14. Methodology folder for vault self-knowledge
  PASS ops/methodology/ exists with linked notes
15. Session capture for automatic transcript persistence
  PASS Session transcripts saved to ops/sessions/, mining tasks auto-created

=== Kernel Validation Summary ===
  PASS: 15
  WARN: 0
  FAIL: 0

All 15 primitives validated successfully.
```

**Common failure modes and remediation:**

| Failure | Cause | Fix |
|---------|-------|-----|
| FAIL on primitive 1 (YAML frontmatter) | Template generation skipped frontmatter | Check `generators/features/templates.md` — ensure all templates output YAML blocks |
| FAIL on primitive 3 (MOC hierarchy) | Generated notes lack `type: moc` in frontmatter | Verify MOC template includes `type: moc` in YAML |
| FAIL on primitive 9 (self space) | self/ directory not created when enabled | Check that /setup creates self/identity.md, self/methodology.md, self/goals.md when self space is enabled |
| WARN on primitive 9 (self space) | self space disabled via configuration | Acceptable — self space is CONFIGURABLE, off by default for research presets, on for personal assistant |
| WARN on primitive 7 (schema enforcement) | Templates exist but no validation script generated | Ensure /setup creates a validate.sh or validate skill |
| WARN on primitive 11 (discovery-first) | Context file has discovery section but skills lack discovery checks | Add discovery-first check to generated skill templates |
| FAIL on primitive 12 (learning loop) | Missing ops/observations/ or ops/tensions/ directories | Ensure /setup creates both directories and documents condition-based triggers in context file |
| FAIL on primitive 13 (task stack) | Missing ops/tasks/ or task stack mechanism | Ensure /setup creates task stack infrastructure |
| FAIL on primitive 14 (methodology folder) | Missing ops/methodology/ directory | Ensure /setup creates ops/methodology/ with linked notes |
| FAIL on primitive 15 (session capture) | Missing ops/sessions/ or stop hook for transcript persistence | Ensure /setup creates ops/sessions/ and configures session capture hook |

---

## Milestone 2: Context File Composition

**What it tests:** The generated context file (CLAUDE.md) contains all required sections with domain-appropriate content. No placeholder variables remain. No orphaned references to features that were not enabled.

**Prerequisites:**
- /setup completed for a specific domain (e.g., research)
- Generated context file exists at the vault root

**Pass criteria:**
1. All required sections present (see checklist below)
2. Zero `{DOMAIN:...}` placeholder tokens remaining
3. Zero references to disabled feature blocks
4. Vocabulary is domain-native throughout (no universal terms leaking)

**Verification steps:**

```bash
VAULT="/path/to/generated-vault"
CTX="$VAULT/CLAUDE.md"

# 1. Check required sections exist
echo "=== Required Sections ==="
for section in \
    "Session Rhythm" \
    "Discovery-First" \
    "Note Design" \
    "Quality Standards" \
    "Common Pitfalls" \
    "System Evolution" \
    "Constraints"; do
    if grep -qi "$section" "$CTX"; then
        echo "  PASS: $section"
    else
        echo "  FAIL: $section missing"
    fi
done

# 2. Check for unresolved placeholders
echo ""
echo "=== Placeholder Check ==="
PLACEHOLDERS=$(grep -c '{DOMAIN:' "$CTX" 2>/dev/null || echo "0")
if [ "$PLACEHOLDERS" -eq 0 ]; then
    echo "  PASS: No unresolved {DOMAIN:} placeholders"
else
    echo "  FAIL: $PLACEHOLDERS unresolved placeholders found:"
    grep '{DOMAIN:' "$CTX"
fi

# 3. Check for orphaned feature references
echo ""
echo "=== Orphaned Reference Check ==="
# Get the active blocks from the derivation manifest
if [ -f "$VAULT/ops/derivation-manifest.md" ]; then
    # Check that referenced features were actually enabled
    # Example: if semantic-search is NOT in active blocks, it should not appear in context
    echo "  Manual check: compare feature references against derivation-manifest.md"
else
    echo "  WARN: No derivation-manifest.md found — cannot verify feature alignment"
fi

# 4. Check vocabulary transformation completeness
echo ""
echo "=== Vocabulary Check (research domain example) ==="
# For a therapy domain, these terms should NOT appear:
# grep -c "claim\|reduce\|MOC\|extract" "$CTX"  # should be 0
echo "  (See Milestone 3 for full vocabulary validation)"
```

**Expected output on success:**

```
=== Required Sections ===
  PASS: Session Rhythm
  PASS: Discovery-First
  PASS: Note Design
  PASS: Quality Standards
  PASS: Common Pitfalls
  PASS: System Evolution
  PASS: Constraints

=== Placeholder Check ===
  PASS: No unresolved {DOMAIN:} placeholders

=== Orphaned Reference Check ===
  (all referenced features present in active blocks)

=== Vocabulary Check ===
  (deferred to Milestone 3)
```

**Common failure modes and remediation:**

| Failure | Cause | Fix |
|---------|-------|-----|
| Missing "Common Pitfalls" section | Feature block conditional logic skipped it | Check `generators/features/ethical-guardrails.md` — pitfalls are always-on |
| Unresolved `{DOMAIN:rethink}` placeholder | Vocabulary transform missed skill names | Ensure skill name mapping from `vocabulary-transforms.md` is applied during generation |
| Orphaned semantic-search references in a convention-only system | Feature block included unconditionally | Add conditional gating: only emit semantic-search section when `search >= 0.5` |
| "Self-Extension Blueprints" section references unavailable features | Blueprint selection not filtered by configuration | Filter blueprints by current configuration — disabled features should not appear in blueprints |
| Missing "System Evolution" section | The section is generated by `self-evolution.md` feature block which is always-on but may have a generation bug | Verify the always-on feature blocks list includes `self-evolution` |

---

## Milestone 3: Vocabulary Transformation

**What it tests:** Zero research-domain terms appear in non-research domain output. The vocabulary transformation from `vocabulary-transforms.md` is applied completely and consistently across all generated files — context file, templates, skill names, folder names, and self/ files.

**Prerequisites:**
- /setup completed for a non-research domain (therapy is the canonical test case because it has the highest vocabulary contrast)
- All generated files in place

**Pass criteria:** Zero instances of research-specific terms ("claim", "reduce", "MOC", "extract", "thinking notes", "01_thinking") in generated files, excluding ops/ directory (which uses universal operational terms).

**Verification steps:**

```bash
VAULT="/path/to/generated-vault"

echo "=== Vocabulary Transformation Validation ==="

# Define research terms that should NOT appear in non-research output
RESEARCH_TERMS="claim\|reduce\|MOC\|extract\|thinking notes\|01_thinking"

# Exclude ops/ (operational terms are universal) and the derivation files
HITS=$(grep -ri "$RESEARCH_TERMS" "$VAULT" \
    --include="*.md" \
    --include="*.yaml" \
    --include="*.json" \
    --include="*.sh" \
    --exclude-dir=ops \
    --exclude-dir=.git \
    --exclude-dir=node_modules \
    -l 2>/dev/null | wc -l | tr -d ' ')

if [ "$HITS" -eq 0 ]; then
    echo "  PASS: Zero research terms found in generated output"
else
    echo "  FAIL: $HITS files contain research-domain vocabulary:"
    grep -ri "$RESEARCH_TERMS" "$VAULT" \
        --include="*.md" \
        --include="*.yaml" \
        --include="*.json" \
        --include="*.sh" \
        --exclude-dir=ops \
        --exclude-dir=.git \
        --exclude-dir=node_modules \
        -n 2>/dev/null
fi

# Check domain-native terms ARE present (therapy example)
echo ""
echo "=== Domain-Native Terms Present ==="
THERAPY_TERMS="reflection\|surface\|theme\|find patterns\|check resonance"
NATIVE_HITS=$(grep -ri "$THERAPY_TERMS" "$VAULT/CLAUDE.md" -c 2>/dev/null || echo "0")
if [ "$NATIVE_HITS" -gt 0 ]; then
    echo "  PASS: $NATIVE_HITS domain-native term usages found"
else
    echo "  FAIL: No domain-native vocabulary detected — transformation may not have run"
fi

# Check folder names match domain vocabulary
echo ""
echo "=== Folder Name Validation ==="
if [ -d "$VAULT/reflections" ]; then
    echo "  PASS: reflections/ directory exists (therapy domain)"
elif [ -d "$VAULT/notes" ]; then
    echo "  WARN: Generic notes/ directory — expected domain-specific name"
fi

# Check template names match domain vocabulary
echo ""
echo "=== Template Name Validation ==="
if [ -f "$VAULT/templates/reflection-note.md" ]; then
    echo "  PASS: reflection-note.md template exists (therapy domain)"
elif [ -f "$VAULT/templates/base-note.md" ]; then
    echo "  WARN: Generic base-note.md — expected domain-specific template name"
fi

# Check skill names match domain vocabulary
echo ""
echo "=== Skill Name Validation ==="
for skill_dir in "$VAULT/.claude/skills/"*/; do
    skill_name=$(basename "$skill_dir")
    case "$skill_name" in
        surface|find-patterns|check-resonance|revisit)
            echo "  PASS: Therapy-native skill: $skill_name"
            ;;
        reduce|reflect|verify|reweave)
            echo "  FAIL: Research-native skill name leaked: $skill_name"
            ;;
    esac
done
```

**Expected output on success (therapy domain):**

```
=== Vocabulary Transformation Validation ===
  PASS: Zero research terms found in generated output

=== Domain-Native Terms Present ===
  PASS: 47 domain-native term usages found

=== Folder Name Validation ===
  PASS: reflections/ directory exists (therapy domain)

=== Template Name Validation ===
  PASS: reflection-note.md template exists (therapy domain)

=== Skill Name Validation ===
  PASS: Therapy-native skill: surface
  PASS: Therapy-native skill: find-patterns
  PASS: Therapy-native skill: check-resonance
  PASS: Therapy-native skill: revisit
```

**Common failure modes and remediation:**

| Failure | Cause | Fix |
|---------|-------|-----|
| "MOC" appears in generated CLAUDE.md | Vocabulary transform missed a reference in a feature block | Search all feature block templates in `generators/features/` for hardcoded "MOC" |
| "reduce" appears in a skill's SKILL.md | Skill name was transformed but internal instructions were not | Apply vocabulary transform to skill body text, not just skill directory name |
| Folder still named "notes/" instead of "reflections/" | Folder name mapping not applied during directory creation | Check /setup folder creation logic against `vocabulary-transforms.md` folder mapping |
| Template still named "base-note.md" | Template name mapping not applied | Check /setup template file creation against `vocabulary-transforms.md` template mapping |
| "extract" appears in self/methodology.md | Self/ file generation uses hardcoded research language | Ensure self/ file generators pull from vocabulary mapping |
| "claim" in session-orient.sh hook script | Hook scripts hardcode research terms | Parameterize hook scripts with vocabulary variables or generate domain-specific versions |

---

## Milestone 4: Processing Pipeline Smoke Test

**What it tests:** The full capture-to-connected-note lifecycle works end-to-end. A note enters the inbox, gets processed through the pipeline, and ends up as a properly connected note in the notes directory with MOC membership.

**Prerequisites:**
- Generated vault with processing skills and templates (all presets ship with full automation)
- At least 3 existing notes and 1 MOC in the vault (so connections can form)
- Agent session active with generated context file loaded

**Pass criteria:**
1. Test note can be created in inbox with minimal friction
2. Processing skill (/reduce or domain equivalent) extracts at least one insight
3. Extracted note appears in the notes directory with valid schema
4. Connection skill (/reflect or domain equivalent) links the note to at least one existing note
5. The note appears in at least one MOC's Core Ideas section (or domain equivalent)

**Verification steps:**

```bash
VAULT="/path/to/generated-vault"
NOTES_DIR="notes"        # or domain-specific: reflections, concepts, etc.
INBOX_DIR="inbox"        # or domain-specific: journal, encounters, etc.

# Step 1: Create a test note in inbox
cat > "$VAULT/$INBOX_DIR/test-pipeline-input.md" << 'EOF'
---
description: Test input for pipeline validation
---
# Test Pipeline Input

The most effective learning happens when new information is actively connected to
existing knowledge rather than stored in isolation. This principle applies to both
human and agent memory systems.

Connections create compound value: each new node increases the value of existing
nodes by creating new traversal paths.
EOF

echo "Step 1: Test note created in $INBOX_DIR/"

# Step 2: Run processing (manually invoke or use skill)
echo "Step 2: Invoke /reduce (or domain equivalent) on test-pipeline-input.md"
echo "  [Agent processes the inbox note]"

# Step 3: Verify extracted note exists with valid schema
echo ""
echo "=== Step 3: Schema Validation ==="
# After processing, check for new note(s) in notes directory
NEW_NOTES=$(find "$VAULT/$NOTES_DIR" -name "*.md" -newer "$VAULT/$INBOX_DIR/test-pipeline-input.md" 2>/dev/null)
if [ -n "$NEW_NOTES" ]; then
    echo "  PASS: New note(s) created:"
    echo "$NEW_NOTES"
    # Validate schema on each new note
    for note in $NEW_NOTES; do
        if head -1 "$note" | grep -q "^---$"; then
            echo "  PASS: $note has YAML frontmatter"
        else
            echo "  FAIL: $note missing YAML frontmatter"
        fi
        if grep -q "^description:" "$note"; then
            echo "  PASS: $note has description field"
        else
            echo "  FAIL: $note missing description"
        fi
        if grep -q "^topics:" "$note"; then
            echo "  PASS: $note has topics field"
        else
            echo "  FAIL: $note missing topics"
        fi
    done
else
    echo "  FAIL: No new notes found in $NOTES_DIR/"
fi

# Step 4: Verify connections exist
echo ""
echo "=== Step 4: Connection Validation ==="
for note in $NEW_NOTES; do
    LINKS=$(grep -c '\[\[' "$note" 2>/dev/null || echo "0")
    if [ "$LINKS" -gt 0 ]; then
        echo "  PASS: $note has $LINKS wiki link(s)"
    else
        echo "  FAIL: $note has no wiki links — reflect phase may have failed"
    fi
done

# Step 5: Verify MOC membership
echo ""
echo "=== Step 5: MOC Membership ==="
for note in $NEW_NOTES; do
    TITLE=$(basename "$note" .md)
    MOC_REFS=$(grep -rl "\[\[$TITLE\]\]" "$VAULT/$NOTES_DIR"/*.md 2>/dev/null | grep -v "$note")
    if [ -n "$MOC_REFS" ]; then
        echo "  PASS: '$TITLE' referenced from:"
        echo "$MOC_REFS"
    else
        echo "  FAIL: '$TITLE' not referenced from any MOC"
    fi
done

# Cleanup
rm -f "$VAULT/$INBOX_DIR/test-pipeline-input.md"
```

**Expected output on success:**

```
Step 1: Test note created in inbox/
Step 2: Invoke /reduce on test-pipeline-input.md

=== Step 3: Schema Validation ===
  PASS: New note(s) created:
  /path/to/vault/notes/connections create compound value through new traversal paths.md
  PASS: notes/connections... has YAML frontmatter
  PASS: notes/connections... has description field
  PASS: notes/connections... has topics field

=== Step 4: Connection Validation ===
  PASS: notes/connections... has 2 wiki link(s)

=== Step 5: MOC Membership ===
  PASS: 'connections create compound value...' referenced from:
  /path/to/vault/notes/knowledge-work.md
```

**Common failure modes and remediation:**

| Failure | Cause | Fix |
|---------|-------|-----|
| No new notes created after /reduce | Extraction skill did not recognize content as relevant to the domain | Check skill's extraction criteria — ensure it handles general knowledge input |
| Note created but missing topics field | Create phase did not include topics in template | Verify note template includes topics as required field |
| Note has no wiki links after /reflect | No existing notes matched semantically | Ensure the test vault has enough starter notes for connections to form |
| Note not referenced from any MOC | Reflect phase did not update MOC | Check reflect skill for MOC update logic |
| Schema validation errors | Template mismatch between generated template and note creation logic | Compare template `_schema` required fields against what /reduce outputs |

---

## Milestone 5: Session Persistence

**What it tests:** Agent state (particularly self/goals.md) survives a /clear command and is properly re-read on session re-orientation. This validates that the session-rhythm primitive (orient-work-persist) functions as a persistence mechanism.

**Prerequisites:**
- Generated Claude Code vault with session-start hook (session-orient.sh)
- self/ directory populated with identity.md, methodology.md, goals.md
- Active Claude Code session

**Pass criteria:**
1. goals.md can be updated during a session
2. After /clear, a new session orientation re-reads the updated goals.md
3. The agent demonstrates awareness of the updated goals in the new session

**Verification steps:**

```bash
VAULT="/path/to/generated-vault"

# Step 1: Record initial goals state
echo "=== Step 1: Initial Goals State ==="
cat "$VAULT/self/goals.md"
INITIAL_HASH=$(md5 -q "$VAULT/self/goals.md" 2>/dev/null || md5sum "$VAULT/self/goals.md" | cut -d' ' -f1)
echo "  Hash: $INITIAL_HASH"

# Step 2: Update goals.md (simulate session work)
echo ""
echo "=== Step 2: Update Goals ==="
# Add a test goal
echo "" >> "$VAULT/self/goals.md"
echo "- [ ] TEST_GOAL: Validate session persistence mechanism" >> "$VAULT/self/goals.md"
UPDATED_HASH=$(md5 -q "$VAULT/self/goals.md" 2>/dev/null || md5sum "$VAULT/self/goals.md" | cut -d' ' -f1)
echo "  Updated hash: $UPDATED_HASH"
if [ "$INITIAL_HASH" != "$UPDATED_HASH" ]; then
    echo "  PASS: goals.md was modified"
else
    echo "  FAIL: goals.md unchanged"
fi

# Step 3: Simulate /clear + re-orient
echo ""
echo "=== Step 3: Verify Persistence ==="
# The session-orient.sh hook should re-read self/
# After /clear, run the hook manually to verify
bash "$VAULT/.claude/hooks/scripts/session-orient.sh"

# Step 4: Verify goals.md still contains the update
echo ""
echo "=== Step 4: Goals Still Present ==="
if grep -q "TEST_GOAL" "$VAULT/self/goals.md"; then
    echo "  PASS: Test goal survived /clear"
else
    echo "  FAIL: Test goal lost after /clear"
fi

# Step 5: Verify orientation script points to self/
echo ""
echo "=== Step 5: Orient Script References Self ==="
if grep -q "self" "$VAULT/.claude/hooks/scripts/session-orient.sh" 2>/dev/null; then
    echo "  PASS: session-orient.sh references self/ directory"
else
    echo "  FAIL: session-orient.sh does not reference self/"
fi

# Cleanup: remove test goal
sed -i.bak '/TEST_GOAL/d' "$VAULT/self/goals.md"
rm -f "$VAULT/self/goals.md.bak"
```

**Expected output on success:**

```
=== Step 1: Initial Goals State ===
  [current goals content]
  Hash: abc123...

=== Step 2: Update Goals ===
  Updated hash: def456...
  PASS: goals.md was modified

=== Step 3: Verify Persistence ===
  ## Workspace Structure
  [tree output]
  ---
  **Remember:** Read self/identity.md and self/goals.md to orient.

=== Step 4: Goals Still Present ===
  PASS: Test goal survived /clear

=== Step 5: Orient Script References Self ===
  PASS: session-orient.sh references self/ directory
```

**Common failure modes and remediation:**

| Failure | Cause | Fix |
|---------|-------|-----|
| goals.md unchanged after write | File permissions or path error | Check that the generated vault has write permissions on self/ |
| Test goal lost after /clear | /clear deleted files (should only clear context, not files) | /clear is a context reset, not a file operation — if files are deleted, the hook or command is misconfigured |
| session-orient.sh does not reference self/ | Hook template does not include self/ orientation | Update `hooks/scripts/session-orient.sh` to check for self/ directory and remind agent to read it |
| Orient script does not run after /clear | Hook not configured for SessionStart event | Verify `.claude/settings.json` has SessionStart hook mapping session-orient.sh |
| Agent does not demonstrate awareness of updated goals | Context file does not instruct reading goals.md at orient | Add explicit "Read self/goals.md" instruction to Session Rhythm section |

---

## Milestone 5b: Session Capture

**What it tests:** The stop hook saves session transcripts to ops/sessions/ and auto-creates mining tasks for future processing. Session capture is Primitive 15 (INVARIANT) — it must function for all presets.

**Prerequisites:**
- Generated vault with stop hook configured for session capture
- ops/sessions/ directory exists
- Active agent session

**Pass criteria:**
1. Session transcript is saved to ops/sessions/ with timestamp filename
2. Mining task is auto-created for future processing of the transcript
3. Session capture works regardless of whether self space is enabled or disabled

**Verification steps:**

```bash
VAULT="/path/to/generated-vault"

# Step 1: Check ops/sessions/ exists
echo "=== Step 1: Session Directory ==="
if [ -d "$VAULT/ops/sessions" ]; then
    echo "  PASS: ops/sessions/ exists"
else
    echo "  FAIL: ops/sessions/ not found"
fi

# Step 2: Check stop hook is configured
echo ""
echo "=== Step 2: Stop Hook Configuration ==="
if [ -f "$VAULT/.claude/settings.json" ]; then
    if grep -q '"Stop"' "$VAULT/.claude/settings.json"; then
        echo "  PASS: Stop hook configured in settings.json"
    else
        echo "  FAIL: No Stop hook found in settings.json"
    fi
else
    echo "  FAIL: .claude/settings.json not found"
fi

# Step 3: After a session, verify transcript was saved
echo ""
echo "=== Step 3: Transcript Persistence (post-session) ==="
SESSIONS=$(find "$VAULT/ops/sessions" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
if [ "$SESSIONS" -gt 0 ]; then
    echo "  PASS: $SESSIONS session transcript(s) found"
else
    echo "  WARN: No session transcripts found yet — run a session first"
fi
```

**Common failure modes and remediation:**

| Failure | Cause | Fix |
|---------|-------|-----|
| ops/sessions/ missing | /setup did not create session directory | Add ops/sessions/ creation to /setup — session capture is INVARIANT |
| Stop hook not configured | Hook template missing session capture | Add session-capture to stop hook template for all presets |
| Transcript not saved | Stop hook script has permissions or path error | Check hook script writes to correct path with write permissions |
| Mining task not created | Auto-task creation logic missing from stop hook | Add task creation to stop hook — transcripts should be queued for mining |

---

## Milestone 5c: Condition-Based Maintenance

**What it tests:** Maintenance triggers fire based on vault state conditions, not time-based schedules. Condition-based maintenance replaces all time-based triggers in v1.6.

**Prerequisites:**
- Generated vault with condition-based hooks configured
- At least 10 notes created (to exercise threshold conditions)
- Session-start hook with condition evaluation

**Pass criteria:**
1. No time-based triggers (weekly, monthly, quarterly) in the generated context file unless time genuinely is the right trigger (e.g., content staleness)
2. Condition-based hooks evaluate vault state at session start
3. Fired conditions surface as tasks on the task stack via /next
4. Conditions do not stack during periods of inactivity

**Verification steps:**

```bash
VAULT="/path/to/generated-vault"
CTX="$VAULT/CLAUDE.md"

# Step 1: Check for time-based trigger language
echo "=== Step 1: Time-Based Trigger Check ==="
TIME_TRIGGERS=$(grep -ci "weekly\|monthly\|quarterly\|every week\|every month\|once a week\|once a month" "$CTX" 2>/dev/null || echo "0")
if [ "$TIME_TRIGGERS" -eq 0 ]; then
    echo "  PASS: No time-based maintenance triggers found"
else
    echo "  WARN: $TIME_TRIGGERS time-based references found — verify they are genuinely time-appropriate"
    grep -ni "weekly\|monthly\|quarterly\|every week\|every month" "$CTX"
fi

# Step 2: Check for condition-based trigger documentation
echo ""
echo "=== Step 2: Condition-Based Triggers ==="
CONDITION_REFS=$(grep -ci "condition\|threshold\|when.*exceed\|when.*detect" "$CTX" 2>/dev/null || echo "0")
if [ "$CONDITION_REFS" -gt 0 ]; then
    echo "  PASS: $CONDITION_REFS condition-based trigger references found"
else
    echo "  FAIL: No condition-based maintenance language detected"
fi

# Step 3: Check session-start hook evaluates conditions
echo ""
echo "=== Step 3: Session-Start Condition Evaluation ==="
if [ -f "$VAULT/.claude/hooks/scripts/session-orient.sh" ]; then
    if grep -qi "condition\|threshold\|orphan\|stale\|pending" "$VAULT/.claude/hooks/scripts/session-orient.sh"; then
        echo "  PASS: Session-start hook evaluates vault state conditions"
    else
        echo "  WARN: Session-start hook exists but may not evaluate conditions"
    fi
else
    echo "  FAIL: session-orient.sh not found"
fi
```

**Common failure modes and remediation:**

| Failure | Cause | Fix |
|---------|-------|-----|
| Time-based triggers in context file | Feature block template uses old time-based language | Update maintenance feature block to use condition-based triggers |
| No condition evaluation at session start | Hook template does not include state checks | Add vault state evaluation (orphans, stale nodes, pending observations) to session-start hook |
| Conditions stack during inactivity | Conditions fire even when vault has not changed | Add staleness check — if vault unchanged since last session, skip condition evaluation |
| /next does not show fired conditions | Task stack not updated by condition hooks | Ensure condition hooks write fired conditions to ops/tasks/ for /next to surface |

---

## Milestone 6: Preset Validation

**What it tests:** All 3 presets (Research, Personal Assistant, Experimental) produce valid, coherent configurations that pass kernel validation with domain-appropriate vocabulary.

**Prerequisites:**
- All 3 preset configurations available (Research, Personal Assistant, Experimental)
- /setup wizard functional
- validate-kernel.sh accessible

**Pass criteria:** For each preset:
1. Kernel validation passes (15/15, or 14/15 with WARN for semantic search if qmd not configured, or self space if disabled)
2. Vocabulary is domain-native (zero cross-domain term leakage)
3. Interaction constraints are satisfied (no hard constraint violations)
4. Active feature blocks match the preset's `active_blocks` list (17 blocks available)
5. Personality dimensions are reflected in self/identity.md voice (when self space is enabled)

**Verification steps:**

```bash
PRESETS=("research" "personal-assistant" "experimental")

for PRESET in "${PRESETS[@]}"; do
    echo "========================================"
    echo "=== Validating Preset: $PRESET ==="
    echo "========================================"

    # Assume /setup was run with this preset, output in /tmp/test-$PRESET
    VAULT="/tmp/test-$PRESET"

    # 1. Kernel validation
    echo ""
    echo "--- Kernel Validation ---"
    ./reference/validate-kernel.sh "$VAULT"
    echo ""

    # 2. Vocabulary check (domain-specific terms)
    echo "--- Vocabulary Check ---"
    case "$PRESET" in
        research)
            # Research terms SHOULD appear
            EXPECTED="claim\|reduce\|topic map"
            FORBIDDEN="reflection\|surface\|encounter"
            ;;
        personal-assistant)
            # Personal assistant terms SHOULD appear
            EXPECTED="memory\|remember\|life area"
            FORBIDDEN="claim\|reduce\|extract"
            ;;
        experimental)
            # Experimental uses custom vocabulary from conversation
            EXPECTED="note\|connect\|discover"
            FORBIDDEN=""  # No forbidden terms — experimental is custom
            ;;
    esac

    EXPECTED_HITS=$(grep -ri "$EXPECTED" "$VAULT/CLAUDE.md" -c 2>/dev/null || echo "0")
    FORBIDDEN_HITS=$(grep -ri "$FORBIDDEN" "$VAULT" \
        --include="*.md" --exclude-dir=ops --exclude-dir=.git -c 2>/dev/null || echo "0")

    if [ "$EXPECTED_HITS" -gt 0 ]; then
        echo "  PASS: Domain-native terms present ($EXPECTED_HITS hits)"
    else
        echo "  FAIL: No domain-native terms found"
    fi

    if [ "$FORBIDDEN_HITS" -eq 0 ]; then
        echo "  PASS: No cross-domain term leakage"
    else
        echo "  FAIL: $FORBIDDEN_HITS cross-domain terms found"
    fi

    # 3. Interaction constraint check
    echo ""
    echo "--- Interaction Constraints ---"
    # Read dimensions from preset.yaml and check coherence
    GRAN=$(grep 'granularity:' "presets/$PRESET/preset.yaml" | awk '{print $2}')
    PROC=$(grep 'processing:' "presets/$PRESET/preset.yaml" | awk '{print $2}')
    AUTO=$(grep 'automation:' "presets/$PRESET/preset.yaml" | awk '{print $2}')

    # Hard constraint: atomic + light processing
    if (( $(echo "$GRAN > 0.7" | bc -l) )) && (( $(echo "$PROC < 0.3" | bc -l) )); then
        echo "  FAIL: HARD CONSTRAINT — atomic granularity ($GRAN) with light processing ($PROC)"
    else
        echo "  PASS: Granularity-processing coherence ($GRAN / $PROC)"
    fi

    # Hard constraint: heavy processing + manual automation
    if (( $(echo "$PROC > 0.7" | bc -l) )) && (( $(echo "$AUTO < 0.2" | bc -l) )); then
        echo "  FAIL: HARD CONSTRAINT — heavy processing ($PROC) with manual automation ($AUTO)"
    else
        echo "  PASS: Processing-automation coherence ($PROC / $AUTO)"
    fi

    # 4. Feature block alignment
    echo ""
    echo "--- Feature Block Alignment ---"
    ACTIVE_BLOCKS=$(grep -A50 'active_blocks:' "presets/$PRESET/preset.yaml" | grep '^ *-' | sed 's/^ *- *//')
    for block in $ACTIVE_BLOCKS; do
        # Check that each active block produced output in the generated vault
        case "$block" in
            semantic-search)
                if grep -qi "semantic\|vector\|embedding" "$VAULT/CLAUDE.md" 2>/dev/null; then
                    echo "  PASS: $block — referenced in context file"
                else
                    echo "  WARN: $block — enabled but not referenced in context file"
                fi
                ;;
            processing-pipeline)
                if grep -qi "pipeline\|processing\|extract" "$VAULT/CLAUDE.md" 2>/dev/null; then
                    echo "  PASS: $block — referenced in context file"
                else
                    echo "  WARN: $block — enabled but not referenced in context file"
                fi
                ;;
            *)
                echo "  PASS: $block — (check manually)"
                ;;
        esac
    done

    # 5. Personality in identity.md
    echo ""
    echo "--- Personality Validation ---"
    if [ -f "$VAULT/self/identity.md" ]; then
        WARMTH=$(grep 'warmth:' "presets/$PRESET/preset.yaml" | awk '{print $2}')
        if (( $(echo "$WARMTH > 0.5" | bc -l) )); then
            # High warmth — identity should feel warm
            if grep -qi "care\|support\|here for you\|partner\|companion" "$VAULT/self/identity.md"; then
                echo "  PASS: Warm personality reflected in identity.md"
            else
                echo "  WARN: High warmth preset but identity.md lacks warm language"
            fi
        else
            # Low warmth — identity should be analytical/neutral
            if grep -qi "analy\|systematic\|rigorous\|precise" "$VAULT/self/identity.md"; then
                echo "  PASS: Analytical personality reflected in identity.md"
            else
                echo "  WARN: Low warmth preset but identity.md lacks analytical language"
            fi
        fi
    else
        echo "  FAIL: self/identity.md not found"
    fi

    echo ""
done
```

**Expected output on success:**

Each preset should produce:
- Kernel: 15/15 PASS, or 14/15 PASS + 1 WARN (semantic search if qmd not configured, or self space if disabled)
- Vocabulary: domain-native terms present, zero cross-domain leakage
- Constraints: all coherence checks PASS
- Features: all active blocks (from 16 available) produce output in context file
- Personality: voice in identity.md matches warmth/formality dimensions (when self space is enabled)
- Session capture: ops/sessions/ exists and stop hook configured

**Common failure modes and remediation:**

| Failure | Cause | Fix |
|---------|-------|-----|
| Personal Assistant preset fails kernel on MOC hierarchy | Light-processing preset skipped MOC generation | Even light-processing systems need at least a hub MOC — enforce in /setup |
| Experimental preset leaks "claim" into context file | Feature block `atomic-notes.md` uses "claim" generically | Parameterize all feature blocks with vocabulary variables |
| Any preset missing ops/observations/ | Operational learning loop not generated | Learning loop is a kernel primitive — must be generated regardless of preset |
| Research personality says "I care about you" | Personality template not filtered by warmth dimension | Generate identity.md text conditionally based on personality.warmth value |
| Session capture missing from generated vault | Stop hook not configured or ops/sessions/ not created | Session capture is Primitive 15 (INVARIANT) — must be generated for all presets |
| Self space generated when disabled | Preset has self space OFF but self/ was created | Check self space optionality flag — research preset defaults to OFF |

---

## Running All Milestones

**Recommended execution order:**

```bash
# 1. Generate test vaults for each preset and platform
# (assume /setup produces output in specified directories)

# 2. Run milestones in order
echo "=== Milestone 1: Kernel ===" && ./reference/validate-kernel.sh /tmp/test-research
echo "=== Milestone 2: Context ==="  # (run section checks manually or via script above)
echo "=== Milestone 3: Vocabulary ===" # (run against therapy vault)
echo "=== Milestone 4: Pipeline ===" # (requires active agent session)
echo "=== Milestone 5: Persistence ===" # (requires active Claude Code session)
echo "=== Milestone 5b: Session Capture ===" # (verify stop hook and ops/sessions/)
echo "=== Milestone 5c: Condition-Based ===" # (verify condition triggers, no time-based)
echo "=== Milestone 6: Presets ===" # (run for all 3 presets)
```

**Milestone dependencies:**

```
M1 (Kernel) ← no dependencies
M2 (Context) ← M1 (kernel must pass first)
M3 (Vocabulary) ← M2 (context must exist)
M4 (Pipeline) ← M1 + M2 (kernel + context)
M5 (Persistence) ← M1 (kernel, specifically session-rhythm)
M5b (Session Capture) ← M1 (kernel, specifically Primitive 15)
M5c (Condition-Based) ← M1 + M2 (kernel + context)
M6 (Presets) ← M1 + M2 + M3 (validates all three for each preset)
```

Milestones 1-3 can be automated as a CI check. Milestones 4-5c require an active agent session. Milestone 6 requires generating multiple vaults and is best run as a manual test suite.
