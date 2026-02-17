---
name: architect
description: Research-backed evolution advice for your knowledge system. Analyzes health reports, friction patterns, and derivation history to propose specific changes with research justification. Never auto-implements — proposals require your approval.
version: "1.0"
generated_from: "arscontexta-v1.6"
user-invocable: true
context: fork
model: opus
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, mcp__qmd__search, mcp__qmd__vector_search, mcp__qmd__deep_search, mcp__qmd__get, mcp__qmd__multi_get
argument-hint: "[optional: specific area to focus on, e.g. 'schema', 'processing', 'MOC structure']"
---

## Runtime Configuration (Step 0 — before any processing)

Read these files to configure domain-specific behavior:

1. **`ops/derivation-manifest.md`** — vocabulary mapping, platform hints
   - Use `vocabulary.notes` for the notes folder name
   - Use `vocabulary.note` / `vocabulary.note_plural` for note type references
   - Use `vocabulary.topic_map` / `vocabulary.topic_map_plural` for MOC references
   - Use `vocabulary.inbox` for the inbox folder name
   - Use `vocabulary.cmd_reflect` for connection-finding command name
   - Use `vocabulary.cmd_reweave` for backward-pass command name
   - Use `vocabulary.cmd_verify` for verification command name
   - Use `vocabulary.architect` for the command name in output

2. **`ops/config.yaml`** — processing depth, pipeline chaining, automation settings

3. **`ops/derivation.md`** — original derivation record (the design intent baseline)

If these files don't exist, use universal defaults and warn the user.

---

## EXECUTE NOW

**Target: $ARGUMENTS**

Parse immediately:
- If target names a specific area (e.g., "schema", "processing", "MOC structure"): focus analysis on that area
- If target is empty: run full-system analysis across all dimensions
- If target is `--dry-run`: run analysis but do not offer implementation

**Execute these phases sequentially:**

1. Locate system files and detect platform
2. Read derivation record for design intent
3. Analyze health data (recent report or live check)
4. Scan for friction patterns across operational surfaces
5. Consult research to ground evidence in specific claims
6. Generate 3-5 ranked recommendations with full evidence chains
7. Present to user and implement on approval

**START NOW.** Reference below defines the seven-phase workflow.

---

## Philosophy

**Evidence beats intuition. Research beats habit.**

Every rule in the context file was a hypothesis. Every skill workflow was a design choice. Hypotheses need testing against operational reality. This skill connects three evidence streams — health data, friction patterns, and research claims — to produce specific, actionable recommendations.

You are not guessing what might help. You are diagnosing what IS happening (health + friction) and prescribing what research says SHOULD happen. Every recommendation traces to specific evidence. "I think this would be better" is not a recommendation. "Health shows 12 orphans, friction log shows repeated orphan complaints, research claim [[orphan notes decay faster than connected ones]] supports adding a condition-triggered reweave pass" — THAT is a recommendation.

**The 25% meta-work budget:** In a 60-minute session, at most 15 minutes should be spent on system evolution. If a recommendation estimates >15 minutes to implement, the recommendation should be "defer to next session." The system serves the work, not the other way around.

**INVARIANT: Architect NEVER auto-implements.** Every recommendation requires explicit user approval before any files are modified. This prevents the cognitive outsourcing failure mode — the human must remain in the judgment loop for system evolution.

---

## PHASE 1: Locate

Automated. No user interaction needed.

Detect the platform and find the system's key files:

```
Check filesystem:
  .claude/ directory exists         -> platform = "claude-code"
  Neither                           -> platform = "minimal"
```

Locate these files (paths vary by domain vocabulary):

| File Type | What To Find | Typical Locations |
|-----------|-------------|-------------------|
| Context file | System methodology and rules | CLAUDE.md, README.md |
| Self space | Agent identity and memory | self/identity.md, self/methodology.md, self/goals.md |
| Ops directory | Operational infrastructure | ops/derivation.md, ops/config.yaml, ops/sessions/, ops/observations/, ops/health/ |
| Notes directory | Primary knowledge directory | {vocabulary.notes}/ (may be domain-named: reflections/, concepts/, etc.) |
| Queue system | Pipeline state | ops/queue/queue.yaml or ops/queue/queue.json |
| Templates | Note schemas | ops/templates/ or templates/ |
| Methodology | Learned patterns | ops/methodology/ |

**If `ops/derivation.md` does not exist:** Warn the user: "No derivation record found. Recommendations will be based on current state analysis only, without historical context of design decisions."

**If `ops/config.yaml` does not exist:** Warn: "No config file found. Using observed behavior to infer current configuration."

Record all file locations for use in subsequent phases.

---

## PHASE 2: Read Derivation

Read `ops/derivation.md` to understand the system's original design intent. This is the baseline against which drift is measured.

**Extract from derivation:**

| Element | What To Look For | Why It Matters |
|---------|-----------------|----------------|
| Dimension positions | The 8 configuration dimensions and their derived values | Baseline for drift detection |
| Conversation signals | What the user said that drove each choice | Understanding original intent |
| Personality | Warmth, formality, opinionatedness, emotional awareness | Voice consistency check |
| Vocabulary mapping | Universal-to-domain term translations | Output must use domain language |
| Coherence validation | What constraints were active at derivation time | Know which constraints to re-check |
| Failure mode risks | Which failure modes were flagged as HIGH risk | Prioritize monitoring these |

Also read `ops/config.yaml` — this is the live operational config that may have drifted from derivation. Compare dimension positions between derivation and config:

```
For each of the 8 dimensions:
  derivation_value = [from ops/derivation.md]
  config_value = [from ops/config.yaml]
  drifted = derivation_value != config_value
```

Record any drift for Phase 6. Drift is not inherently bad — it may represent healthy evolution. But UNRECOGNIZED drift creates incoherence.

If a specific focus area was requested ($ARGUMENTS), note which dimensions and failure modes are most relevant to that area and prioritize them in subsequent phases.

---

## PHASE 3: Health Analysis

Check for a recent health report in `ops/health/`:

```bash
# Find health reports from the last 7 days
find ops/health/ -name "*.md" -mtime -7 2>/dev/null | sort -r | head -1
```

**If a recent report exists:** Read it fully. Extract every FAIL and WARN item as structured evidence:

```
For each FAIL/WARN:
  category: [schema | orphan | link | description | stale | moc | boundary | throughput]
  severity: [FAIL | WARN]
  detail: [specific finding — which notes, which fields, which links]
  count: [how many instances]
```

**If no recent report exists:** Run a live health assessment. Check each category:

| Category | How to Check | FAIL Threshold | WARN Threshold |
|----------|-------------|---------------|----------------|
| Schema compliance | `grep -rL '^description:' {vocabulary.notes}/*.md` | N/A | Any note missing required fields |
| Orphan detection | Notes with zero incoming wiki-links (scan for `[[filename]]` across all notes) | N/A | Any orphan |
| Link health | Wiki-links pointing to non-existent files | Any dangling link | N/A |
| Three-space boundaries | Content in wrong space (notes in ops/, operational files in notes/) | N/A | Any violation |
| Processing throughput | Count inbox items vs notes count | >3:1 ratio | >2:1 ratio |
| Stale notes | Notes with <2 incoming links AND not modified in last 30 days | N/A | >15% of notes |
| MOC coherence | Note count per MOC | N/A | >40 notes (split candidate) or <5 (merge candidate) |
| Description quality | Descriptions that restate the title without adding information | N/A | Any restatement |

**Live check implementation:**

```bash
# Count total notes
NOTE_COUNT=$(ls -1 {vocabulary.notes}/*.md 2>/dev/null | wc -l | tr -d ' ')

# Find orphans (notes with no incoming links)
for f in {vocabulary.notes}/*.md; do
  NAME=$(basename "$f" .md)
  LINKS=$(grep -rl "\[\[$NAME\]\]" {vocabulary.notes}/ 2>/dev/null | wc -l | tr -d ' ')
  [[ "$LINKS" -eq 0 ]] && echo "ORPHAN: $NAME"
done

# Find dangling links
grep -ohP '\[\[([^\]]+)\]\]' {vocabulary.notes}/*.md | sort -u | while read -r link; do
  NAME=$(echo "$link" | sed 's/\[\[//;s/\]\]//')
  [[ ! -f "{vocabulary.notes}/$NAME.md" ]] && echo "DANGLING: $NAME"
done

# Count inbox items
INBOX_COUNT=$(ls -1 {vocabulary.inbox}/ 2>/dev/null | wc -l | tr -d ' ')

# MOC sizes
grep -rl '^type: moc' {vocabulary.notes}/*.md 2>/dev/null | while read -r moc; do
  COUNT=$(grep -c '^\- \[\[' "$moc" 2>/dev/null)
  echo "MOC: $(basename "$moc" .md) = $COUNT notes"
done

# Missing descriptions
grep -rL '^description:' {vocabulary.notes}/*.md 2>/dev/null
```

Record all findings as evidence for Phase 6. Every finding must include the specific notes, links, or fields affected — not just counts.

---

## PHASE 4: Read Friction

Scan for friction patterns across multiple operational surfaces. Friction is the gap between how the system should work and how it actually works.

### 4a. Observation Notes

```bash
# Find all pending observations
grep -rl '^status: pending' ops/observations/ 2>/dev/null
```

Read each pending observation. Categorize by type:

| Category | Signal | Evidence Value |
|----------|--------|---------------|
| Friction | "this was harder than it should be" | High — points to workflow mismatch |
| Process Gap | "there is no way to do X" | High — missing capability |
| Surprise | "I did not expect this behavior" | Medium — misaligned expectations |
| Methodology | "I learned that X works better" | Medium — operational insight |
| Quality | "the output was not good enough" | High — quality gate failure |

Count occurrences per category. 3+ items in the same category = a friction pattern worth investigating.

### 4b. Methodology Notes

```bash
# Read all methodology notes
ls ops/methodology/*.md 2>/dev/null
```

Read each methodology note. Look for:
- Recurring themes across multiple notes
- Tensions between stated methodology and actual practice
- Behavioral corrections that suggest the original design was wrong
- Methodology notes with multiple evidence entries (strong signal)

### 4c. Session Logs

```bash
# Read recent session logs (last 5-10 sessions)
ls -t ops/sessions/*.md 2>/dev/null | head -10
```

Scan session logs for:
- Repeated complaints or workarounds
- Steps that get skipped consistently
- Patterns in what the agent does vs what the system recommends
- Error patterns or tool failures

### 4d. Self Space

If self/ exists, read:
- `self/methodology.md` — how the agent describes its own process
- `self/goals.md` — whether current priorities align with system capabilities
- `self/memory/` — any notes about workflow frustrations

### 4e. Build Friction Inventory

Compile all friction evidence into a structured inventory:

```
Friction Inventory:
  1. [category]: [description]
     Frequency: [N observations across M sessions]
     Sources: [filenames]
     Impact: [what breaks or degrades]
     System area: [which dimension/skill/workflow affected]

  2. [category]: [description]
     ...
```

Rank by frequency * impact. The most frequent, highest-impact friction patterns get priority in Phase 6.

---

## PHASE 5: Consult Research

Ground the evidence in research. This is what separates /architect from ad-hoc troubleshooting — every recommendation connects to specific research claims, not general intuition.

Read the reference files:

| Reference | What It Contains | When To Use |
|-----------|-----------------|-------------|
| `${CLAUDE_PLUGIN_ROOT}/reference/dimension-claim-map.md` | Which research claims inform which dimensions | Mapping friction to dimension adjustments |
| `${CLAUDE_PLUGIN_ROOT}/reference/interaction-constraints.md` | How dimension choices create pressure on others | Cascade analysis for proposed changes |
| `${CLAUDE_PLUGIN_ROOT}/reference/methodology.md` | Universal principles and processing pipeline | Grounding recommendations in first principles |
| `${CLAUDE_PLUGIN_ROOT}/reference/failure-modes.md` | 10 failure modes with domain vulnerability matrix | Connecting friction to known failure patterns |
| `${CLAUDE_PLUGIN_ROOT}/reference/tradition-presets.md` | Named points in configuration space | Alternative configurations to consider |
| `${CLAUDE_PLUGIN_ROOT}/reference/vocabulary-transforms.md` | Universal-to-domain term mapping | Ensuring output uses domain vocabulary |
| `${CLAUDE_PLUGIN_ROOT}/reference/three-spaces.md` | Self/notes/ops architecture and boundary rules | Three-space boundary analysis |
| `${CLAUDE_PLUGIN_ROOT}/reference/derivation-validation.md` | Validation tests for derived systems | Post-change validation criteria |
| `${CLAUDE_PLUGIN_ROOT}/reference/evolution-lifecycle.md` | Seed-evolve-reseed patterns, friction-driven adoption | When to evolve vs when to reseed |
| `${CLAUDE_PLUGIN_ROOT}/reference/self-space.md` | Agent identity generation and self/ architecture | Self-space related recommendations |

### Research Matching Process

For each friction pattern or health issue identified in Phases 3-4:

**Step 1: Check dimension-claim-map.md**
- Which research claims relate to this issue?
- What dimension positions do those claims support?
- Does the current configuration conflict with what research recommends?

**Step 2: Check interaction-constraints.md**
- Is this friction a CASCADE effect from a dimension mismatch?
- Would changing one dimension to fix this create pressure on another?
- Are there compensating mechanisms documented?

**Step 3: Check failure-modes.md**
- Does this match a known failure mode pattern?
- Was this failure mode flagged as HIGH risk during derivation?
- What does the failure mode document say about mitigation?

**Step 4: Search the knowledge graph**
- Use `mcp__qmd__deep_search` to find claims that address the specific friction
- Fall back to `mcp__qmd__vector_search` if hybrid search is unavailable
- If MCP is unavailable, fall back to qmd CLI (`qmd query` then `qmd vsearch`)
- Fall back to reading bundled reference files directly only if both MCP and qmd CLI are unavailable
- Search for the friction pattern described in natural language
- Search for the system area affected
- Search for proposed solution concepts

```
mcp__qmd__deep_search  query="[friction description in natural language]"  limit=10
```

Read the top results. For each relevant claim:
- Note the claim title (for citation in recommendations)
- Note what the claim argues
- Note how it applies to the current friction

**The goal is to connect EVERY recommendation to specific research, not general intuition.**

---

## PHASE 6: Generate Recommendations

Synthesize evidence from Phases 2-5 into 3-5 concrete recommendations, ranked by impact-to-effort ratio.

### Ranking Criteria

| Criterion | Scale | What It Measures |
|-----------|-------|-----------------|
| Impact | high / medium / low | How much does this improve the system? |
| Effort | minutes / hours / days | How much work to implement? |
| Risk | reversible / partially reversible / irreversible | What could go wrong? |
| Evidence strength | strong (5+ data points) / moderate (3-4) / speculative (1-2) | How much supporting evidence? |

**Limit to 3-5 recommendations.** More than 5 creates decision paralysis. If you found more issues, prioritize ruthlessly — the rest can wait for the next /architect pass.

### Priority Ordering

1. **FAIL items from health** — these are broken, fix first
2. **High-frequency friction patterns** — recurring pain, address next
3. **Drift corrections** — config diverged from derivation without rationale
4. **Research-backed optimizations** — improvements supported by strong evidence
5. **Speculative improvements** — interesting ideas with thin evidence (include at most 1)

### Implementation Time Estimation

Every recommendation MUST include a concrete time estimate:

| Effort Level | Typical Changes | Estimated Time |
|-------------|----------------|----------------|
| minutes | Config value change, template field addition, single file edit | 5-15 minutes |
| hours | Skill regeneration, MOC restructuring, schema migration | 30-120 minutes |
| days | Full reseed, architecture change, multi-skill redesign | Multiple sessions |

**Apply the 25% budget rule:** If the estimated implementation time exceeds 25% of a typical session (>15 minutes for a 60-minute session), recommend deferring to next session unless the issue is a FAIL-level health problem.

### Recommendation Format

For each recommendation, construct the full analysis:

```
### [N]. [Specific change title]

**What:** [Concrete change — specific enough to implement without further clarification.
           Name the exact file, section, and value that changes.]

**Why:** [Evidence chain from health analysis + friction patterns]
  - Health: [specific FAIL/WARN from Phase 3, with note names/counts]
  - Friction: [specific patterns from Phase 4, with observation filenames]

**Research:** [Specific claims supporting this change]
  - From dimension-claim-map: [claim title and what it argues]
  - From knowledge graph: [related claims found via search, with titles]
  - From failure-modes: [if this matches a documented failure mode]

**Interaction effects:** [Cascade analysis from interaction-constraints.md]
  - Changing [dimension X] from [current] to [proposed] creates pressure on [dimension Y]
  - Compensating mechanism: [how to handle the cascade, or "none needed"]
  - If no interaction effects: "No cascade effects detected for this change."

**Impact:** [effort] effort / [benefit] benefit / [risk] risk
**Estimated implementation time:** ~X minutes
**Expected benefit:** [Measurable outcome the user can verify]
**Recommendation:** implement now / defer to next session
**Reversible:** [yes / no / partially — with explanation]

**Steps:**
1. [First concrete step — exact file and change]
2. [Second concrete step]
3. [Update ops/derivation.md with change rationale]
4. [Run validation to confirm nothing broke]
```

### Quality Gates for Recommendations

Every recommendation MUST have:

1. **Specific file references** — not "update the context file" but "update CLAUDE.md, section 'Processing Pipeline', line ~150"
2. **Evidence backing** — at least 2 data points (health finding + friction observation, or 2+ friction observations)
3. **Research citation** — at least 1 specific claim from the knowledge base
4. **Risk awareness** — what could go wrong, stated explicitly
5. **Reversibility assessment** — can this be undone if it makes things worse?
6. **Time estimate** — concrete, not vague
7. **Implementation steps** — ordered, each step references exact files

**Reject recommendations that fail any of these gates.** Thin recommendations erode trust. Better to present 2 strong recommendations than 5 weak ones.

---

## PHASE 7: Present to User

Present the ranked recommendations. Use the user's domain vocabulary (from derivation.md vocabulary mapping) throughout — never expose universal terms to a domain user.

### Output Format

```
=== ARCHITECT REPORT ===
System: [domain name from derivation]
Platform: [detected platform]
Focus: [specific area if requested, or "full system"]
Date: [YYYY-MM-DD]

Evidence Summary:
  Health: [N FAIL, N WARN, N PASS — from Phase 3]
  Friction: [top 3 friction patterns with frequency counts]
  Drift: [dimensions that shifted from derivation, if any, or "none detected"]
  Failure modes: [HIGH-risk modes from derivation that show activity, or "none active"]

--- Recommendations (ranked by impact-to-effort) ---

[Recommendation 1 — full format from Phase 6]

[Recommendation 2 — full format from Phase 6]

[Recommendation 3 — full format from Phase 6]

[Optional: Recommendations 4-5]

--- Next Steps ---
Which recommendations would you like to implement? I will execute the steps
and update ops/derivation.md with the rationale.

Options:
  - "all" — implement all recommendations
  - "1, 3" — implement specific recommendations
  - "none" — defer all to next session
  - "explain 2" — get more detail on a specific recommendation
=== END REPORT ===
```

### On User Approval

Implement the selected recommendations following the steps listed. For each implementation:

1. **Make the change** — edit the specific files as described in Steps
2. **Show before/after** for non-trivial changes (section replacements, config changes)
3. **Update `ops/derivation.md`** with:
   - What changed
   - Why (evidence summary — health findings + friction patterns)
   - Research backing (claim references from knowledge base)
   - Date of change
   - Interaction effects noted (if any)
4. **Log to `ops/changelog.md`** (create if missing):
   ```markdown
   ## YYYY-MM-DD: [change title]

   **Source:** /architect — [evidence summary]
   **Change:** [what was modified, which files]
   **Research:** [supporting claims]
   **Risk:** [risk assessment]
   ```
5. **Run post-change validation:**
   - All wiki links still resolve
   - All notes still have required schema fields
   - MOC hierarchy intact
   - No three-space boundary violations introduced
   - Session orient still loads correctly

Report validation results:
```
Implementation complete.
  Changed: [list of files modified]
  Validation: [N]/[N] checks PASS
  [Any warnings or issues]
```

### On Rejection

- Do not re-propose the same change without new evidence
- Optionally ask why — capture the reasoning as a new observation if it reveals design philosophy
- Mark the recommendation as "considered and deferred" — do not keep re-surfacing it

### When Evidence Suggests /reseed

If analysis reveals:
- Dimension incoherence across >3 dimensions
- Vocabulary no longer matches user's actual language
- Three-space boundaries dissolved
- Template divergence >40%

Then recommend /reseed instead of incremental patches:
```
  NOTICE: The evidence suggests systemic drift across multiple dimensions.
  Incremental patching may create more incoherence. Consider running /reseed
  for a principled re-derivation from first principles.

  Drift detected in: [list dimensions]
  Evidence: [key observations]
```

---

## Edge Cases

### No ops/derivation.md

Recommendations based on current state analysis only. Note in report: "Without derivation history, recommendations cannot assess drift or design intent. Consider running /reseed to establish a derivation baseline."

### No ops/observations/ or ops/sessions/

Friction analysis is limited. Note: "No operational friction data available. Recommendations based on health analysis and research only. Begin capturing observations during work to enable friction-based evolution."

### Small Vault (<10 notes)

Graph analysis metrics (density, orphans, clusters) are less meaningful at small scale. Note: "Vault is early-stage. Graph health metrics will become more meaningful as the knowledge graph grows. Focus on capture and processing rather than structural optimization."

### No Research Results

If MCP tools fail and bundled reference files are the only source:
- Read all relevant reference files directly
- Note in report: "Research grounding from bundled references only. Semantic search unavailable."
- Recommendations are still valid — reference files contain the core research

### Focus Area Requested

If $ARGUMENTS names a specific area:
1. Run all phases but weight findings toward the focus area
2. Still report other FAIL-level health issues even if outside focus
3. Note: "Focused on [area]. Other findings noted but not prioritized."

---

## Quality Standards

- Ground every recommendation in specific evidence (health data + friction patterns + research claims) — no intuition-only recommendations
- Use domain vocabulary throughout — never expose universal terms to a domain user
- Be opinionated — the research has positions, share them — but explain your reasoning
- Acknowledge when evidence is thin: "This is speculative based on limited friction data" is honest
- Distinguish between urgent fixes (FAIL items) and strategic improvements (optimization opportunities)
- Never recommend more infrastructure than the system's maturity warrants — check the current automation level
- Every time estimate should be honest — underestimating erodes trust more than overestimating
- The 25% budget rule is a guideline, not a straitjacket — FAIL-level issues justify exceeding it
