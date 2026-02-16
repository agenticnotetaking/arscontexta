---
name: upgrade
description: Apply plugin knowledge base updates to an existing generated system. Consults the Ars Contexta research graph for methodology improvements, proposes skill upgrades with research justification. Never auto-implements. Triggers on "/upgrade", "upgrade skills", "check for improvements", "update methodology".
version: "1.0"
generated_from: "arscontexta-v1.6"
user-invocable: true
context: fork
model: opus
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
---

## Runtime Configuration (Step 0 — before any processing)

Read these files to configure domain-specific behavior:

1. **`ops/derivation-manifest.md`** — vocabulary mapping, platform hints
   - Use `vocabulary.notes` for the notes folder name
   - Use `vocabulary.note` / `vocabulary.note_plural` for note type references
   - Use `vocabulary.reduce` for the extraction verb
   - Use `vocabulary.reflect` for the connection-finding verb
   - Use `vocabulary.reweave` for the backward-pass verb
   - Use `vocabulary.verify` for the verification verb
   - Use `vocabulary.rethink` for the meta-cognitive verb
   - Use `vocabulary.topic_map` for MOC references

2. **`ops/config.yaml`** — processing depth, domain context

3. **`ops/derivation.md`** — derivation state and engine version

If these files don't exist, use universal defaults.

## EXECUTE NOW

**Target: $ARGUMENTS**

Parse immediately:
- If target contains a specific skill name (e.g., "upgrade reduce"): check only that skill
- If target contains "--all": check all generated skills
- If target is empty: check all generated skills (same as --all)

**START NOW.** Reference below defines the upgrade process.

---

## Why Consultation, Not Hashing

Skills do not upgrade through hash comparison against a generation manifest. Hash comparison answers a narrow question: "Has this file changed?" Meta-skill consultation answers the right question: "Is this skill's approach still the best approach given what we know?"

A skill could be unchanged but outdated because the knowledge base has grown. Or a skill could be heavily edited by the user but already incorporate the latest thinking through a different path. Reasoning about methodology is more valuable than diffing bytes.

---

## Two Upgrade Paths

Generated skills and meta-skills follow fundamentally different upgrade mechanisms:

| Category | Skills | Upgrade Mechanism |
|----------|--------|-------------------|
| **Generated skills** | /{vocabulary.reduce}, /{vocabulary.reflect}, /{vocabulary.reweave}, /{vocabulary.verify}, /ralph, /next, /remember, /{vocabulary.rethink}, /stats, /graph, /tasks, /refactor, /learn, /recommend, /ask | Runtime consultation with knowledge graph |
| **Meta-skills** | /setup, /architect, /health, /reseed, /add-domain, /help, /tutorial, /upgrade | Plugin release cycle — update the plugin itself |

/upgrade evaluates generated skills. It cannot evaluate itself or other meta-skills — that is the plugin maintainers' responsibility.

---

## Step 1: Inventory Current System

Gather the vault's current state:

1. Read `ops/derivation.md` for:
   - Original derivation state
   - Engine version that generated the system
   - Domain description and dimensional positions

2. Read `ops/generation-manifest.yaml` (if exists) for:
   - Skill versions and generation timestamps
   - Which plugin version generated each skill

3. List all installed skills:
   ```bash
   # Find all skill directories with SKILL.md
   for dir in .claude/skills/*/; do
     skill=$(basename "$dir")
     version=$(grep '^version:' "$dir/SKILL.md" 2>/dev/null | head -1 | awk -F'"' '{print $2}')
     gen_from=$(grep '^generated_from:' "$dir/SKILL.md" 2>/dev/null | head -1 | awk -F'"' '{print $2}')
     echo "$skill  v$version  (from $gen_from)"
   done
   ```

4. Read `ops/config.yaml` for current dimensional positions

5. Check for user modifications:
   ```bash
   # Detect skills modified after generation
   for dir in .claude/skills/*/; do
     skill=$(basename "$dir")
     file="$dir/SKILL.md"
     [[ ! -f "$file" ]] && continue
     # Check git status — modified files indicate user customization
     git_status=$(git status --porcelain "$file" 2>/dev/null)
     if [[ -n "$git_status" ]]; then
       echo "MODIFIED: $skill"
     fi
   done
   ```

Present inventory:

```
--=={ upgrade : inventory }==--

System: {domain description}
Engine: arscontexta-{version}
Skills: {count} installed ({modified_count} user-modified)

  Skill               Version  Generated From    Modified
  /{vocabulary.reduce}    1.0  arscontexta-v1.6  no
  /{vocabulary.reflect}   1.0  arscontexta-v1.6  yes
  ...
```

---

## Step 2: Consult Knowledge Base

For each generated skill (or the specific skill if targeted), consult the plugin's bundled knowledge base to evaluate whether the skill's current approach reflects current best practices.

### Knowledge Base Tiers

Read from the plugin's four content tiers:

| Tier | Path | What It Contains |
|------|------|------------------|
| Methodology graph | `${CLAUDE_PLUGIN_ROOT}/methodology/` | All content — filter by `kind:` field (research/guidance/example) |
| Reference docs | `${CLAUDE_PLUGIN_ROOT}/reference/` | WHAT — structured reference documents and dimension maps |

Notes in `methodology/` are differentiated by their `kind:` frontmatter field:
- `kind: research` — WHY: principles and cognitive science grounding (213 claims)
- `kind: guidance` — HOW: operational procedures and best practices (9 docs)
- `kind: example` — WHAT IT LOOKS LIKE: domain compositions (12 examples)
- `type: moc` — Navigation: topic maps linking related notes (15 maps)

### Consultation Process Per Skill

For each skill being evaluated:

1. **Read the current vault skill** — understand its complete approach, quality gates, edge case handling

2. **Read relevant knowledge base documents:**
   - Research claims about this skill's domain (e.g., for /{vocabulary.reduce}: claims about extraction methodology)
   - Guidance docs about processing pipeline best practices
   - Reference docs about the skill's operational patterns

3. **Compare methodology, not text:**
   - Does the skill implement the quality gates the knowledge base recommends?
   - Does it handle edge cases the knowledge base identifies?
   - Does it use the discovery/search patterns the knowledge base recommends?
   - Has the knowledge base added new techniques since this skill was generated?

4. **Classify each finding:**

   | Classification | Meaning | Example |
   |---------------|---------|---------|
   | **Current** | Skill reflects knowledge base best practices | No action needed |
   | **Enhancement** | Knowledge base adds technique the skill lacks | New quality gate, better search pattern |
   | **Correction** | Knowledge base contradicts skill's approach | Outdated methodology, known anti-pattern |
   | **Extension** | Knowledge base covers scenario skill ignores | New edge case, new domain pattern |

5. **Check user modifications:**
   If the skill has been modified by the user, read both the current (user-modified) version and evaluate whether:
   - The user's changes already incorporate the improvement (skip it)
   - The user's changes are orthogonal to the improvement (can coexist)
   - The user's changes conflict with the improvement (flag for side-by-side review)

---

## Step 3: Generate Upgrade Plan

For each skill with available improvements, create a structured proposal:

```
Skill: /{domain:skill-name}
Status: {current | enhancement | correction | extension}
User-modified: {yes | no}

Current approach:
  {2-3 sentences describing what the skill currently does}

Proposed improvement:
  {2-3 sentences describing what would change}

Research backing:
  {Specific claims from the knowledge base that support this change}
  - "{claim title}" — {how it applies}
  - "{claim title}" — {how it applies}

Impact: {what changes for the user's workflow}
Risk: low | medium | high
Reversible: yes (previous version archived to ops/skills-archive/)
```

### Risk Assessment

| Risk Level | Criteria |
|-----------|----------|
| **Low** | Additive change (new quality gate, better logging). Existing behavior unchanged. |
| **Medium** | Modified behavior (different extraction strategy, changed search pattern). Output quality affected. |
| **High** | Structural change (different phase ordering, changed handoff format). Pipeline coordination affected. |

### Side-by-Side for User-Modified Skills

When a skill has been modified by the user AND an upgrade is available, show a side-by-side comparison:

```
Skill: /{domain:skill-name} (USER-MODIFIED)

Your version:                     Recommended:
  [relevant section excerpt]        [what knowledge base suggests]

Your customization:
  {description of what the user changed and why it appears intentional}

Options:
  (a) Keep your version unchanged
  (b) Apply upgrade, preserving your customizations
  (c) Apply upgrade, replacing your version (archived to ops/skills-archive/)
```

Option (b) requires the upgrade to be compatible with the user's changes. If they conflict, explain why and recommend (a) or (c).

---

## Step 4: Present Plan

```
--=={ upgrade }==--

Plugin: arscontexta-{current_version}
Knowledge base: {count} research claims, {count} guidance docs
Skills checked: {count}

Upgrades available: {count}
  Enhancements: {n}  |  Corrections: {n}  |  Extensions: {n}

  1. /{domain:skill-name}
     Type: Enhancement
     Change: {one-line summary}
     Research: "{claim title}"
     Risk: low

  2. /{domain:skill-name} (USER-MODIFIED)
     Type: Correction
     Change: {one-line summary}
     Research: "{claim title}", "{claim title}"
     Risk: medium
     Note: Side-by-side comparison available

  ...

{If no upgrades:}
  All {count} skills reflect current best practices.
  No upgrades needed.

Apply all? Select specific upgrades (e.g., "1, 3")?
Or "show 2" for side-by-side detail on a specific skill.
```

Wait for user response. Do NOT proceed without explicit approval.

---

## Step 5: Apply Approved Upgrades

For each approved upgrade:

### 5a. Archive Current Version

```bash
mkdir -p ops/skills-archive
SKILL_NAME="{skill-name}"
DATE=$(date +%Y-%m-%d)
cp ".claude/skills/${SKILL_NAME}/SKILL.md" \
   "ops/skills-archive/${SKILL_NAME}-${DATE}.md"
```

### 5b. Generate Updated Skill

1. Read the skill's generation block from the plugin (if available)
2. Apply the specific improvements identified in Step 2
3. Preserve the user's vocabulary transformation from `ops/derivation-manifest.md`
4. Preserve the user's dimensional positions from `ops/config.yaml`
5. For user-modified skills with option (b): merge the user's customizations into the updated skill

### 5c. Update Version Tracking

Update the skill's frontmatter:

```yaml
---
version: "{incremented}"
generated_from: "arscontexta-{current_plugin_version}"
---
```

### 5d. Update Generation Manifest

If `ops/generation-manifest.yaml` exists, update the entry for this skill:

```yaml
skills:
  {skill-name}:
    version: "{new_version}"
    upgraded: "{ISO 8601 UTC}"
    upgrade_source: "knowledge-graph-consultation"
    changes: "{brief description of what changed}"
```

---

## Step 6: Validate

After applying all approved upgrades:

1. **Kernel validation** — run kernel checks to confirm structural invariants hold:
   ```bash
   # Verify skill files are valid
   for dir in .claude/skills/*/; do
     [[ -f "$dir/SKILL.md" ]] || echo "MISSING: $dir/SKILL.md"
   done
   ```

2. **Context file check** — verify all skill references in the context file still resolve

3. **Vocabulary check** — confirm upgraded skills use domain vocabulary consistently:
   ```bash
   # Spot-check that vocabulary markers were resolved
   grep -l '{vocabulary\.' .claude/skills/*/SKILL.md 2>/dev/null
   # Should return nothing — all markers should be resolved
   ```

4. **Pipeline compatibility** — if pipeline skills were upgraded (/{vocabulary.reduce}, /{vocabulary.reflect}, /{vocabulary.reweave}, /{vocabulary.verify}), verify handoff format compatibility with /ralph

---

## Final Report

```
--=={ upgrade complete }==--

Applied: {N} upgrades
Archived: {N} previous versions to ops/skills-archive/
Skipped: {N} (user-modified, kept as-is)

Changes:
  - /{skill}: {what changed} (Research: "{claim}")
  - /{skill}: {what changed} (Research: "{claim}")

Validation: {PASS | FAIL with details}

{If any validation failed:}
  WARNING: Validation issue detected.
  Previous versions available in ops/skills-archive/
  for manual rollback.

Note: Run /{vocabulary.verify} on a recent {vocabulary.note}
to confirm upgraded skills work correctly in practice.
```

---

## INVARIANT

**/upgrade never auto-implements.** The upgrade plan is always presented to the user first. The user decides which upgrades to apply. This prevents the cognitive outsourcing failure mode where the system changes itself without human understanding.

All upgrades are advisory. The user owns the files.

---

## Edge Cases

**No improvements available:** Report "All skills reflect current best practices. No upgrades needed." with the count of skills checked.

**No generation manifest:** Treat all skills as version 0 (unknown generation state). Compare methodology against current knowledge base. This is fine — consultation reasons about approach, not version numbers.

**Skill has been user-modified:** Present the side-by-side comparison. Offer three options: keep user version, merge upgrade with customizations, or replace (with archive). Never silently overwrite.

**No ops/derivation-manifest.md:** Use universal vocabulary for all output.

**Plugin knowledge base unavailable:** Report that knowledge base consultation requires the Ars Contexta plugin. Without the plugin's bundled methodology/ and reference/ directories, /upgrade cannot evaluate skills.

**User rejects upgrades consistently:** This is a signal, not an error. Note the pattern — it may indicate the knowledge base recommendations don't match this user's domain. Log to ops/observations/ if it persists across multiple /upgrade runs.

**Correction conflicts with user modification:** When the knowledge base identifies a correction (not just enhancement) but the user has modified the skill, explain the conflict clearly. The user may have modified the skill precisely because the original approach was wrong — their fix may already address the correction. Show both and let the user decide.

**Multiple skills share a change:** If the same knowledge base improvement applies to several skills (e.g., a new search pattern), present it as a single conceptual change affecting multiple skills rather than listing it redundantly per skill.
