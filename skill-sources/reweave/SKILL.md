---
name: reweave
description: Update old notes with new connections. The backward pass that /reflect doesn't do. Revisit existing notes that predate newer related content, add connections, sharpen claims, consider splits. Triggers on "/reweave", "/reweave [note]", "update old notes", "backward connections", "revisit notes".
user-invocable: true
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, mcp__qmd__search, mcp__qmd__vector_search, mcp__qmd__deep_search, mcp__qmd__status
context: fork
---

## Runtime Configuration (Step 0 — before any processing)

Read these files to configure domain-specific behavior:

1. **`ops/derivation-manifest.md`** — vocabulary mapping, platform hints
   - Use `vocabulary.notes` for the notes folder name
   - Use `vocabulary.note` / `vocabulary.note_plural` for note type references
   - Use `vocabulary.reweave` for the process verb in output
   - Use `vocabulary.topic_map` / `vocabulary.topic_map_plural` for MOC references
   - Use `vocabulary.cmd_verify` for the next-phase suggestion

2. **`ops/config.yaml`** — processing depth, pipeline chaining
   - `processing.depth`: deep | standard | quick
   - `processing.chaining`: manual | suggested | automatic
   - `processing.reweave.scope`: related | broad | full

If these files don't exist, use universal defaults.

**Processing depth adaptation:**

| Depth | Reweave Behavior |
|-------|-----------------|
| deep | Full reconsideration. Search extensively for newer related {vocabulary.note_plural}. Consider splits, rewrites, challenges. Evaluate claim sharpening. Multiple search passes. |
| standard | Balanced review. Search semantic neighbors and same-{vocabulary.topic_map} {vocabulary.note_plural}. Add connections, sharpen if needed. |
| quick | Minimal backward pass. Add obvious connections only. No rewrites or splits. |

**Reweave scope:**

| Scope | Behavior |
|-------|----------|
| related | Search {vocabulary.note_plural} directly related to the target (same {vocabulary.topic_map}, semantic neighbors) |
| broad | Search across all {vocabulary.topic_map_plural} and semantic space for potential connections |
| full | Complete review including potential splits, rewrites, and claim challenges |

## EXECUTE NOW

**Target: $ARGUMENTS**

Parse immediately:
- If target contains `[[note name]]` or note name: reweave that specific {vocabulary.note}
- If target contains `--handoff`: output RALPH HANDOFF block at end
- If target is empty: find {vocabulary.note_plural} that most need reweaving (oldest, sparsest, most outdated)
- If target is "recent" or "--since Nd": reweave {vocabulary.note_plural} not touched in N days
- If target is "sparse": find {vocabulary.note_plural} with fewest connections

**Execute these steps:**

1. **Read the target {vocabulary.note} fully** — understand its current claim, connections, and age
2. **Ask the reweave question:** "If I wrote this {vocabulary.note} today, with everything I now know, what would be different?"
3. **If a task file exists** (pipeline execution): read it to see what /reflect discovered. The Reflect section shows which connections were just added and which {vocabulary.topic_map_plural} were updated — this is your starting context for the backward pass.
4. **Search for newer related {vocabulary.note_plural}** — use dual discovery (semantic search + {vocabulary.topic_map} browsing) to find {vocabulary.note_plural} created AFTER the target that should connect
5. **Evaluate what needs changing:**
   - Add connections to newer {vocabulary.note_plural} that did not exist when this was written
   - Sharpen the claim if understanding has evolved
   - Consider splitting if the {vocabulary.note} now covers what should be separate ideas
   - Challenge the claim if new evidence contradicts it
   - Rewrite prose if understanding is deeper now
6. **Make the changes** — edit the {vocabulary.note} with new connections (inline links with context), improved prose, sharper claim if needed
7. **Update {vocabulary.topic_map_plural}** — if the {vocabulary.note}'s topic membership changed, update relevant {vocabulary.topic_map_plural}
8. **If task file exists:** update the {vocabulary.reweave} section
9. **Report** — structured summary of what changed and why
10. If `--handoff` in target: output RALPH HANDOFF block

**START NOW.** Reference below explains methodology — use to guide, not as output.

---

# Reweave

Revisit old {vocabulary.note_plural} with everything you know today. {vocabulary.note_plural} are living documents — they grow, get rewritten, split apart, sharpen their claims. This is the backward pass that keeps the network alive.

## Philosophy

**{vocabulary.note_plural} are living documents, not finished artifacts.**

A {vocabulary.note} written last month was written with last month's understanding. Since then:
- New {vocabulary.note_plural} exist that relate to it
- Understanding of the topic deepened
- The claim might need sharpening or challenging
- What was one idea might now be three
- Connections that were not obvious then are obvious now

Reweaving is not just "add backward links." It is completely reconsidering the {vocabulary.note} based on current knowledge. Ask: **"If I wrote this {vocabulary.note} today, what would be different?"**

> "The {vocabulary.note} you wrote yesterday is a hypothesis. Today's knowledge is the test."

## What Reweaving Can Do

| Action | When to Do It |
|--------|---------------|
| **Add connections** | Newer {vocabulary.note_plural} exist that should link here |
| **Rewrite content** | Understanding evolved, prose should reflect it |
| **Sharpen the claim** | Title is too vague to be useful |
| **Split the {vocabulary.note}** | Multiple claims bundled together |
| **Challenge the claim** | New evidence contradicts the original |
| **Improve the description** | Better framing emerged |
| **Update examples** | Better illustrations exist now |

Reweaving is NOT just Phase 4 of /reflect applied backward. It is a full reconsideration.

## Invocation Patterns

### /reweave [[note]]

Fully reconsider a specific {vocabulary.note} against current knowledge.

### /reweave (no argument)

Scan for candidates needing reweaving, present ranked list.

### /reweave --sparse

Process {vocabulary.note_plural} flagged as sparse by /health.

### /reweave --since Nd

Reweave all {vocabulary.note_plural} not updated in N days.

**How to find candidates:**
```bash
# Find notes not modified in 30 days
find {vocabulary.notes}/ -name "*.md" -mtime +30 -type f
```

### /reweave --handoff [[note]]

External loop mode for /ralph:
- Execute full workflow as normal
- At the end, output structured RALPH HANDOFF block
- Used when running isolated phases with fresh context per task

---

## Workflow

### Phase 1: Understand the {vocabulary.note} as It Exists

Read the target {vocabulary.note} completely. Understand:
- What claim does it make?
- What reasoning supports the claim?
- What connections does it have?
- When was it written/last modified?
- What was the context when it was created?

**Also read the task file** if one exists (pipeline execution). The task file's Reflect section shows:
- What connections /reflect just added
- Which {vocabulary.topic_map_plural} were updated
- What synthesis opportunities were flagged
- What the discovery trace looked like

This context prevents redundant work — you know what /reflect already found, so you can focus on what it missed or what needs deeper reconsideration.

### Phase 2: Gather Current Knowledge (Dual Discovery)

Use the same dual discovery pattern as /reflect — {vocabulary.topic_map} exploration AND semantic search in parallel.

**Path 1: {vocabulary.topic_map} Exploration** — curated navigation

From the {vocabulary.note}'s Topics footer, identify which {vocabulary.topic_map}(s) it belongs to:
- Read the relevant {vocabulary.topic_map}(s)
- What synthesis exists that might affect this {vocabulary.note}?
- What newer {vocabulary.note_plural} in Core Ideas should this {vocabulary.note} reference?
- What tensions involve this {vocabulary.note}?

**Path 2: Semantic Search** — find what {vocabulary.topic_map_plural} might miss

**Three-tier fallback for semantic search:**

**Tier 1 — MCP tools (preferred):** Use `mcp__qmd__deep_search` (hybrid search with expansion + reranking):
- query: "[{vocabulary.note}'s core concepts and mechanisms]"
- limit: 15

**Tier 2 — bash qmd with lock serialization:** If MCP tools fail or are unavailable:
```bash
LOCKDIR="ops/queue/.locks/qmd.lock"
while ! mkdir "$LOCKDIR" 2>/dev/null; do sleep 2; done
qmd query "[note's core concepts]" --collection {vocabulary.notes_collection} --limit 15 2>/dev/null
rm -rf "$LOCKDIR"
```

The lock prevents multiple parallel workers from loading large models simultaneously.

**Tier 3 — grep only:** If both MCP and bash fail, log "qmd unavailable, grep-only discovery" and rely on {vocabulary.topic_map} + keyword search only. This degrades quality but does not block work.

Evaluate results by relevance — read any result where title or snippet suggests genuine connection.

**Also check:**
- Backlinks — what {vocabulary.note_plural} already reference this one? Do they suggest the target should cite back?

```bash
grep -rl '\[\[target note title\]\]' {vocabulary.notes}/ --include="*.md"
```

**Key question:** What do I know today that I did not know when this {vocabulary.note} was written?

### Phase 3: Evaluate the Claim

**Does the original claim still hold?**

| Finding | Action |
|---------|--------|
| Claim holds, evidence strengthened | Add supporting connections |
| Claim holds but framing is weak | Rewrite for clarity |
| Claim is too vague | Sharpen to be more specific |
| Claim is too broad | Split into focused {vocabulary.note_plural} |
| Claim is partially wrong | Revise with nuance |
| Claim is contradicted | Flag tension, propose revision |

**The Sharpening Test:**

Read the title. Ask: could someone disagree with this specific claim?
- If yes, the claim is sharp enough
- If no, it is too vague and needs sharpening

Example:
- Vague: "context matters" (who would disagree?)
- Sharp: "explicit context beats automatic memory" (arguable position)

**The Split Test:**

Does this {vocabulary.note} make multiple claims that could stand alone?
- If the {vocabulary.note} connects to 5+ topics across different domains, it probably needs splitting
- If you would want to link to part of it but not all, it is a split candidate

### Phase 4: Evaluate Connections

**Backward connections (what this {vocabulary.note} should reference):**

For each newer {vocabulary.note}, ask:
- Does it extend this {vocabulary.note}'s argument?
- Does it provide evidence or examples?
- Does it share mechanisms?
- Does it create tension worth acknowledging?
- Would referencing it strengthen the reasoning?

**Forward connections (what should reference this {vocabulary.note}):**

Check newer {vocabulary.note_plural} that SHOULD link here but do not:
- Do they make arguments that rely on this claim?
- Would following this link provide useful context?

**Agent Traversal Check (apply to all connections):**

Ask: **"If an agent follows this link during traversal, what decision or understanding does it enable?"**

Connections exist to serve agent navigation. Adding a link because content is "related" without operational value creates noise. Every backward or forward connection should answer:
- Does this help an agent understand WHY something works?
- Does this help an agent decide HOW to implement something?
- Does this surface a tension the agent should consider?

Reject connections that are merely "interesting" without agent utility.

**Articulation requirement:**

Every new connection must articulate WHY:
- "extends this by adding the temporal dimension"
- "provides evidence that supports this claim"
- "contradicts this — needs resolution"

Never: "related" or "see also"

### Phase 5: Apply Changes

**For pipeline execution (--handoff mode):** Apply changes directly. The pipeline needs to proceed without waiting for approval.

**For interactive execution (no --handoff):** Present the reweave proposal first, then apply after approval.

**Reweave proposal format (interactive only):**

```markdown
## Reweave Proposal: [[target note]]

**Last modified:** YYYY-MM-DD
**Current knowledge evaluated:** N newer {vocabulary.note_plural}, M backlinks

### Claim Assessment

[Does the claim hold? Need sharpening? Splitting? Revision?]

### Proposed Changes

**1. [change type]: [description]**

Current:
> [existing text]

Proposed:
> [new text]

Rationale: [why this change]

**2. [change type]: [description]**
...

### Connections to Add

- [[newer note A]] — [relationship]: [specific reason]
- [[newer note B]] — [relationship]: [specific reason]

### Connections to Verify (other {vocabulary.note_plural} should link here)

- [[note X]] might benefit from referencing this because...

### Not Changing

- [What was considered but rejected, and why]

---

Apply these changes? (yes/no/modify)
```

**When applying changes:**

1. Make changes atomically
2. Preserve existing valid content
3. Maintain prose flow — new links should read naturally inline
4. Verify all link targets exist
5. Update description if claim changed

---

## The Five Reweave Actions

### 1. Add Connections

The simplest action. Newer {vocabulary.note_plural} exist that should be referenced.

**Inline connections (preferred):**
```markdown
# before
The constraint shifts from capture to curation.

# after
The constraint shifts from capture to curation, and since [[throughput matters more than accumulation]], the question becomes who does the selecting.
```

**Footer connections:**
```yaml
relevant_notes:
  - "[[newer note]] — extends this by adding temporal dimension"
```

### 2. Rewrite Content

Understanding evolved. The prose should reflect current thinking, not historical thinking.

**When to rewrite:**
- Reasoning is clearer now
- Better examples exist
- Phrasing was awkward
- Important nuance was missing

**How to rewrite:**
- Preserve the core claim (unless challenging it)
- Improve the path to the conclusion
- Incorporate new connections as prose
- Maintain the {vocabulary.note}'s voice

### 3. Sharpen the Claim

Vague claims cannot be built on. Sharpen means making the claim more specific and arguable.

**Sharpening patterns:**

| Vague | Sharp |
|-------|-------|
| "X is important" | "X matters because Y, which enables Z" |
| "consider doing X" | "X works when [condition] because [mechanism]" |
| "there are tradeoffs" | "[specific tradeoff]: gaining X costs Y" |

**When sharpening, also update:**
- Title (if claim changed) — use the rename script if available
- Description (must match new claim)
- Body (reasoning must support sharpened claim)

### 4. Split the {vocabulary.note}

One {vocabulary.note} became multiple ideas over time. Splitting creates focused, composable pieces.

**Split indicators:**
- Connects to 5+ topics across different domains
- Makes multiple distinct claims
- You would want to link to part but not all
- Different sections could be referenced independently

**Split process:**

1. Identify the distinct claims
2. Create new {vocabulary.note_plural} for each claim
3. Each new {vocabulary.note} gets:
   - Focused title (the claim)
   - Own description
   - Relevant subset of content
   - Appropriate connections
4. Original {vocabulary.note} either:
   - Becomes a synthesis linking to the splits
   - Gets archived if splits fully replace it
   - Retains one claim and links to others

**Example split:**

Original: "knowledge systems need both structure and flexibility"

Splits:
- [[structure enables retrieval at scale]]
- [[flexibility allows organic growth]]
- [[structure and flexibility create tension]] (links to both)

**When NOT to split:**
- {vocabulary.note} is genuinely about one thing that touches many areas
- Connections are all variations of the same relationship
- Splitting would create {vocabulary.note_plural} too thin to stand alone

### 5. Challenge the Claim

New evidence contradicts the original. Do not silently "fix" — acknowledge the evolution.

**Challenge patterns:**

```markdown
# if partially wrong
The original insight was [X]. However, [[newer evidence]] suggests [Y]. The refined claim is [Z].

# if tension exists
This argues [X]. But [[contradicting note]] argues [Y]. The tension remains unresolved — possibly [X] applies in context A while [Y] applies in context B.

# if significantly wrong
This note originally claimed [X]. Based on [[evidence]], the claim is revised: [new claim].
```

**Always log challenges:** When a claim is challenged or revised, this is a significant event. Note it in the task file Reweave section with the original claim, the new evidence, and the revised position.

---

## Enrichment-Triggered Actions

When processing a {vocabulary.note} that came through the enrichment pipeline, check the task file for `post_enrich_action` signals. These were surfaced by /enrich and need execution:

### title-sharpen

The enrich phase determined the {vocabulary.note}'s title is too vague after content integration.

1. Read `post_enrich_detail` for the recommended new title
2. Evaluate: is the suggested title actually better? (sharper claim, more specific, still composable as prose)
3. If yes and a rename script exists: use it to rename. Otherwise rename manually and update all wiki links.
4. Update the {vocabulary.note}'s description to match the new title
5. Log the rename in the task file Reweave section

### split-recommended

The enrich phase determined the {vocabulary.note} now covers multiple distinct claims.

1. Read `post_enrich_detail` for the split recommendation
2. Evaluate: does splitting genuinely improve the vault? (each piece must stand alone)
3. If yes:
   - Create new {vocabulary.note} files for each split claim
   - Move relevant content from original to splits
   - Update original to either link to splits or retain one claim
   - Create queue entries for the new {vocabulary.note_plural} starting at the connect phase
4. Log the split in the task file Reweave section

### merge-candidate

The enrich phase determined this {vocabulary.note} substantially overlaps with another.

**Do NOT auto-merge or auto-delete.** This requires human judgment.

1. Log the merge recommendation in the task file Reweave section
2. Note which {vocabulary.note_plural} overlap and why
3. The final report surfaces this for human review

---

## Quality Gates

### Gate 1: Articulation Test

Every change must be articulable. "I am adding this because..." with a specific reason.

### Gate 2: Improvement Test

After changes, is the {vocabulary.note} better? More useful? More connected? More accurate?

If you cannot confidently say yes, do not make the change.

### Gate 3: Coherence Test

After changes, does the {vocabulary.note} still cohere as a single focused piece? Or did you accidentally make it broader?

### Gate 4: Network Test

Do the changes improve the network? More traversal paths? Better paths?

### Gate 5: When NOT to Change

- The {vocabulary.note} is accurate, well-connected, and recent — leave it alone
- The "improvement" would just be cosmetic rewording — do not churn
- The {vocabulary.note} is a historical record — these evolve through status changes, not rewrites

---

## Output Format

```markdown
## Reweave Complete: [[target note]]

### Changes Applied

| Type | Description |
|------|-------------|
| connection | added [[note A]] inline, [[note B]] to footer |
| rewrite | clarified reasoning in paragraph 2 |
| sharpen | title unchanged, description updated |

### Claim Status

[unchanged | sharpened | split | challenged]

### Network Effect

- Outgoing links: 3 -> 5
- This {vocabulary.note} now bridges [[domain A]] and [[domain B]]

### Cascade Recommendations

- [[related note]] might benefit from reweave (similar vintage)
- {vocabulary.topic_map} [[topic]] should be updated to reflect changes

### Observations

[Patterns noticed, insights for future]
```

---

## What Success Looks Like

Successful reweaving:
- {vocabulary.note} reflects current understanding, not historical understanding
- Claim is sharp enough to disagree with
- Connections exist to relevant newer content
- {vocabulary.note} participates actively in the network
- Someone reading it today gets the best version

The test: **if this {vocabulary.note} were written today with everything you know, would it be meaningfully different?** If yes and you did not change it, reweaving failed.

---

## Critical Constraints

**Never:**
- Silently change claims without acknowledging evolution
- Split {vocabulary.note_plural} into pieces too thin to stand alone
- Add connections without articulating why
- Rewrite voice/style (preserve the {vocabulary.note}'s character)
- Make changes without approval in interactive mode
- Create wiki links to non-existent files

**Always:**
- Present proposals before editing (interactive mode)
- Explain rationale for each change
- Preserve what is still valid
- Log significant claim changes
- Verify link targets exist

---

## The Network Lives Through Evolution

{vocabulary.note_plural} written yesterday do not know about today. {vocabulary.note_plural} written with old understanding do not reflect new understanding. Without reweaving, the vault becomes a graveyard of outdated thinking that happens to be organized.

Reweaving is how knowledge stays alive. Not just connecting, but questioning, sharpening, splitting, rewriting. Every {vocabulary.note} is a hypothesis. Every reweave is a test.

The network compounds through evolution, not just accumulation.

---

## Handoff Mode (--handoff flag)

When invoked with `--handoff`, output this structured format at the END of the session. This enables external loops (/ralph) to parse results and update the task queue.

**Detection:** Check if `$ARGUMENTS` contains `--handoff`. If yes, append this block after completing normal workflow.

**Handoff format:**

```
=== RALPH HANDOFF: {vocabulary.reweave} ===
Target: [[note name]]

Work Done:
- Older {vocabulary.note_plural} updated: N
- Claim status: unchanged | sharpened | challenged | split
- Network effect: M new traversal paths

Files Modified:
- {vocabulary.notes}/[older note 1].md (inline link added)
- {vocabulary.notes}/[older note 2].md (footer connection added)
- [task file path] ({vocabulary.reweave} section)

Learnings:
- [Friction]: [description] | NONE
- [Surprise]: [description] | NONE
- [Methodology]: [description] | NONE
- [Process gap]: [description] | NONE

Queue Updates:
- Advance phase: {vocabulary.reweave} -> {vocabulary.verify}
=== END HANDOFF ===
```

### Task File Update (when invoked via ralph loop)

When running in handoff mode via /ralph, the prompt includes the task file path. After completing the workflow, update the `## {vocabulary.reweave}` section of that task file with:
- Older {vocabulary.note_plural} updated and why
- Claim status (unchanged/sharpened/challenged/split)
- Network effect summary

**Critical:** The handoff block is OUTPUT, not a replacement for the workflow. Do the full reweave workflow first, update task file, then format results as handoff.

### Queue Update (interactive execution)

When running interactively (NOT via /ralph), YOU must advance the phase in the queue. /ralph handles this automatically, but interactive sessions do not.

**After completing the workflow, advance the phase:**

```bash
# get timestamp
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# advance phase (current_phase -> next, append to completed_phases)
# NEXT_PHASE is the phase after reweave in phase_order (i.e., verify)
jq '(.tasks[] | select(.id=="TASK_ID")).current_phase = "{vocabulary.verify}" |
    (.tasks[] | select(.id=="TASK_ID")).completed_phases += ["{vocabulary.reweave}"]' \
    ops/queue/queue.json > tmp.json && mv tmp.json ops/queue/queue.json
```

The handoff block's "Queue Updates" section is not just output — it is your own todo list when running interactively.

## Pipeline Chaining

After reweaving completes, output the next step based on `ops/config.yaml` pipeline.chaining mode:

- **manual:** Output "Next: {vocabulary.cmd_verify} [note]" — user decides when to proceed
- **suggested:** Output next step AND advance task queue entry to `current_phase: "{vocabulary.verify}"`
- **automatic:** Queue entry advanced and verification proceeds immediately

The chaining output uses domain-native command names from the derivation manifest.
