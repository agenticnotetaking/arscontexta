---
name: reduce
description: Extract structured knowledge from source material. Comprehensive extraction is the default — every insight that serves the domain gets extracted. For domain-relevant sources, skip rate must be below 10%. Zero extraction from a domain-relevant source is a BUG. Triggers on "/reduce", "/reduce [file]", "extract insights", "mine this", "process this".
version: "1.0"
generated_from: "arscontexta-v1.6"
user-invocable: true
allowed-tools: Read, Write, Grep, Glob, mcp__qmd__vector_search
context: fork
---

## Runtime Configuration (Step 0 — before any processing)

Read these files to configure domain-specific behavior:

1. **`ops/derivation-manifest.md`** — vocabulary mapping, extraction categories, platform hints
   - Use `vocabulary.notes` for the notes folder name
   - Use `vocabulary.inbox` for the inbox folder name
   - Use `vocabulary.note` for the note type name in output
   - Use `vocabulary.note_plural` for the plural form
   - Use `vocabulary.reduce` for the process verb in output
   - Use `vocabulary.cmd_reflect` for the next-phase command name
   - Use `vocabulary.cmd_reweave` for the backward-pass command name
   - Use `vocabulary.cmd_verify` for the verification command name
   - Use `vocabulary.extraction_categories` for domain-specific extraction table
   - Use `vocabulary.topic_map` for MOC/topic map references
   - Use `vocabulary.topic_maps` for plural form

2. **`ops/config.yaml`** — processing depth, pipeline chaining, selectivity
   - `processing.depth`: deep | standard | quick
   - `processing.chaining`: manual | suggested | automatic
   - `processing.extraction.selectivity`: strict | moderate | permissive

3. **`ops/queue/queue.json`** — current task queue (for handoff mode)

If these files don't exist (pre-init invocation or standalone use), use universal defaults:
- depth: standard
- chaining: suggested
- selectivity: moderate
- notes folder: `notes/`
- inbox folder: `inbox/`

---

## THE MISSION (READ THIS OR YOU WILL FAIL)

You are the extraction engine. Raw source material enters. Structured, atomic {vocabulary.note_plural} exit. Everything between is your judgment — and that judgment must err toward extraction, not rejection.

### The Core Distinction

| Concept | What It Means | Example |
|---------|---------------|---------|
| **Having knowledge** | The vault contains information | "We store notes in folders" |
| **Articulated reasoning** | The vault explains WHY something works as a traversable {vocabulary.note} | "folder structure mirrors cognitive chunking because..." |

**Having knowledge is not the same as articulating it.** Even if information is embedded in the system, the vault may lack the externalized reasoning explaining WHY it works. That reasoning is what you extract.

### The Comprehensive Extraction Principle

**For domain-relevant sources, COMPREHENSIVE EXTRACTION is the default.** This means:

1. **Extract ALL core {vocabulary.note_plural}** — direct assertions about the domain that can stand alone as atomic propositions.

2. **Extract ALL evidence and validations** — if source confirms an approach, that confirmation IS the {vocabulary.note}. Evidence is extractable even when the conclusion is already known, because the reasoning path matters.

3. **Extract ALL patterns and methods** — techniques, workflows, practices. Named patterns are referenceable. Unnamed intuitions are not.

4. **Extract ALL tensions** — contradictions, trade-offs, conflicts. These are wisdom, not problems.

5. **Extract ALL enrichments** — if source adds detail to existing {vocabulary.note_plural}, create enrichment tasks. Near-duplicates almost always add value.

**"We already know this" means we NEED the articulation, not that we should skip it.**

### The Extraction Question (ask for EVERY candidate)

**"Would a future session benefit from this reasoning being a retrievable {vocabulary.note}?"**

If YES -> extract to appropriate category
If NO -> verify it is truly off-topic before skipping

### INVALID Skip Reasons (these are BUGS)

- "validates existing approach" — validations ARE the evidence. Extract them.
- "already captured in system config" — config is implementation, not articulation. The WHY needs a {vocabulary.note}.
- "we already do this" — DOING is not EXPLAINING. The explanation needs externalization.
- "obvious" — obvious to whom? Future sessions need explicit reasoning.
- "near-duplicate" — near-duplicates almost always add detail. Create enrichment task.
- "not a claim" — is it an implementation idea? tension? validation? Those ARE extractable.

### VALID Skip Reasons (rare)

- Completely off-topic (unrelated to {vocabulary.domain})
- Too vague to act on (applies to everything, disagrees with nothing)
- Pure summary with zero extractable insight
- LITERALLY identical text already exists (not "same topic" — IDENTICAL)

**For domain-relevant sources: skip rate < 10%. Zero extraction = BUG.**

---

## EXECUTE NOW

**Target: $ARGUMENTS**

Parse immediately:
- If target contains a file path: extract insights from that file
- If target contains `--handoff`: output RALPH HANDOFF block + task entries at end
- If target is empty: scan {vocabulary.inbox}/ for unprocessed items, pick one
- If target is "inbox" or "all": process all inbox items sequentially

**Execute these steps:**

1. Read the source file fully — understand what it contains
2. **Source size check:** If source exceeds 2500 lines, STOP. Plan chunks of 350-1200 lines. Process each chunk with fresh context. See "Large Source Handling" section below.
3. Hunt for insights that serve the domain (see extraction categories below)
4. For each candidate:
   - Tier 1 (preferred): use `mcp__qmd__vector_search` with query "[claim as sentence]", collection="{vocabulary.notes_collection}", limit=5
   - Tier 2 (CLI fallback): `qmd vsearch "[claim as sentence]" --collection {vocabulary.notes_collection} -n 5`
   - Tier 3 fallback if qmd is unavailable: use keyword grep duplicate checks
   - If duplicate exists: evaluate for enrichment or skip
   - Classify as OPEN (needs more investigation) or CLOSED (standalone, ready)
5. Output extraction report with titles, classifications, extraction rationale
6. Wait for user approval before creating files
7. If `--handoff` in target: create per-claim task files, update queue, output RALPH HANDOFF block

**START NOW.** Reference below explains methodology — use to guide, not as output.

### Observation Capture (during work, not at end)

When you encounter friction, surprises, methodology insights, process gaps, or contradictions — capture IMMEDIATELY:

| Observation | Action |
|-------------|--------|
| Any observation | Create atomic note in `ops/observations/` with prose-sentence title |
| Tension: content contradicts existing {vocabulary.note} | Create atomic note in `ops/tensions/` with prose-sentence title |

The handoff Learnings section summarizes what you ALREADY logged during processing.

---

# Reduce

Extract composable {vocabulary.note_plural} from source material into {vocabulary.notes}/.

## Philosophy

**Extract the REASONING behind what works, not just observations about what works.**

This is the extraction phase of the pipeline. You receive raw content and extract insights that serve the vault's domain. The mission is building **externalized, retrievable reasoning** — a graph of atomic propositions that can be traversed, connected, and built upon.

**THE CORE DISTINCTION:**

| Concept | Example | What to Extract |
|---------|---------|-----------------|
| **We DO this** | "We tag notes with topics" | — (not sufficient) |
| **We explain WHY** | "topic tagging enables cross-domain navigation because..." | This |

The vault is not just an implementation. It is **the articulated argument for WHY the implementation works.**

**THE EXTRACTION QUESTION:**

- BASIC thinking: "Is this a standalone composable claim?"
- BETTER thinking: "Does this serve {vocabulary.domain}?"
- BEST thinking: **"Would a future session benefit from this reasoning being a retrievable {vocabulary.note}?"**

If YES -> extract to appropriate category (even if "we already know this")
If NO -> skip (RARE for domain-relevant sources — verify it is truly off-topic)

**THE RULE:** Implementation without articulation is incomplete. If we DO something but lack a {vocabulary.note} explaining WHY it works, that articulation needs extraction.

---

## Extraction Categories

### What To Extract

{DOMAIN:extraction_categories}

**The structural invariant:** Every domain's extraction has these universal categories regardless of domain:

| Category | What to Find | Output Type | Gate Required? |
|----------|--------------|-------------|----------------|
| Core domain {vocabulary.note_plural} | Direct assertions about {vocabulary.domain} | {vocabulary.note} | NO |
| Patterns | Recurring structures across sources | {vocabulary.note} | NO |
| Comparisons | How different approaches compare, X vs Y, trade-offs | {vocabulary.note} | NO |
| Tensions | Contradictions, conflicts, unresolved trade-offs | tension note | NO |
| Anti-patterns | What breaks, what to avoid, failure modes | problem note | NO |
| Enrichments | Content that adds detail to existing {vocabulary.note_plural} | enrichment task | NO |
| Open questions | Unresolved questions worth tracking | {vocabulary.note} (open) | NO |
| Implementation ideas | Techniques, workflows, features to build | methodology note | NO |
| Validations | Evidence confirming an approach works | {vocabulary.note} | NO |
| Off-topic general content | Insight unrelated to {vocabulary.domain} | apply selectivity gate | YES |

**IMPORTANT:** Categories 1-9 bypass the selectivity gate. They extract directly to the appropriate output type. The selectivity gate exists ONLY for filtering off-topic content from general sources.

### Category Detection Signals

Hunt for these signals in every source:

**Core domain signals:**
- Direct assertions: "the key insight is...", "this means that...", "the pattern is..."
- Evidence: "research shows...", "data indicates...", "studies confirm..."
- Named methods: any named system, technique, or framework relevant to {vocabulary.domain}

**Comparison signals:**
- "X vs Y", "trade-off between...", "prefer X when...", "unlike Y, this..."
- "choose X when...", "depends on whether..."

**Tension signals:**
- "contrary to...", "however...", "the problem with...", "fails when..."
- "on the other hand...", "but this conflicts with..."

**Anti-pattern signals:**
- "systems fail when...", "the anti-pattern is...", "avoid this because..."
- Warnings, cautionary examples, failure postmortems

**Enrichment signals:**
- Content covering ground similar to an existing {vocabulary.note}
- New examples, evidence, or framing for an established claim
- Deeper explanation of something already captured shallowly

**Implementation signals:**
- "we could build...", "would enable...", "a tool that...", "pattern for..."
- Actionable techniques, concrete workflows

**Validation signals:**
- "this supports...", "evidence shows...", "validates...", "confirms..."
- Research that grounds existing practice in theory

### The Mission Lens (REQUIRED)

For EVERY candidate, ask: **"Does this serve {vocabulary.domain}?"**

- YES -> **extract to appropriate category** (gate does NOT apply)
- NO -> apply selectivity gate (for off-topic filtering only)

**For domain-relevant sources:** almost everything is YES. The gate barely applies. Skip rate < 10%.

---

## The Selectivity Gate (for OFF-TOPIC content filtering)

**CRITICAL:** This gate exists to filter OUT content that does not serve {vocabulary.domain}. It applies ONLY to standard claims from GENERAL (off-topic) sources.

**Do NOT use gate to reject:**
- Implementation ideas ("not a claim" is WRONG — it is roadmap)
- Tensions ("not a claim" is WRONG — it is wisdom)
- Enrichments ("duplicate" is WRONG — it adds detail)
- Validations ("already known" is WRONG — it is evidence)
- Open questions ("not testable" is WRONG — it is direction)

For STANDARD claims from general sources, verify all four criteria pass:

### 1. Standalone

The claim is understandable without source context. Someone reading this {vocabulary.note} cold can grasp what it argues without needing to know where it came from.

Fail: "the author's third point about methodology"
Pass: "explicit structure beats implicit convention"

### 2. Composable

This {vocabulary.note} would be linked FROM elsewhere. {vocabulary.note_plural} function as APIs. If you cannot imagine writing `since [[this claim]]...` in another {vocabulary.note}, it is not composable.

Fail: a summary of someone's argument
Pass: a claim you could invoke while building your own argument

### 3. Novel

Not already captured in the vault. Semantic duplicate check AND existing {vocabulary.note_plural} scan both clear.

Fail: semantically equivalent to an existing {vocabulary.note}
Pass: genuinely new angle not yet articulated

### 4. Connected

Relates to existing thinking in the vault. Isolated insights that do not connect to anything are orphans. They rot.

Fail: interesting observation about unrelated domain
Pass: extends, contradicts, or deepens existing {vocabulary.note_plural}

**If ANY criterion fails: do not extract.**

---

## Workflow

### 1. Orient

Before reading the source, understand what already exists:

```bash
# Get descriptions from existing notes
for f in {vocabulary.notes}/*.md; do
  [[ -f "$f" ]] && echo "=== $(basename "$f" .md) ===" && rg "^description:" "$f" -A 0
done
```

Scan descriptions to understand current {vocabulary.note_plural}. This prevents duplicate extraction and helps identify connection points and enrichment opportunities.

### 2. Read Source Fully

Read the ENTIRE source. Understand what it contains, what it argues, what domain it serves.

**Planning the extraction:**
- How many {vocabulary.note_plural} do you expect from this source?
- What categories will be represented?
- Is this domain-relevant (comprehensive extraction) or general (gate applies)?

**Explicit signal phrases to hunt:**
- "the key insight is..."
- "this means that..."
- "the pattern is..."
- "contrary to..."
- "the implication..."
- "what matters here is..."
- "the real issue is..."
- "this suggests..."

**Implicit signals (the best insights often hide in):**
- Problems that imply solutions
- Constraints that reveal what works
- Failures that suggest approaches
- Asides that contain principles
- Tangents that reveal mental models

**What you are hunting:**
- Assertions that could be argued for or against
- Patterns that apply beyond this specific source
- Insights that change how you think about something
- Claims that would be useful to invoke elsewhere

### 3. Categorize FIRST, Then Route (MANDATORY)

**STOP. Before ANY filtering, determine the category of each candidate.**

This is the critical step that prevents over-rejection. Categorize FIRST, then route to the appropriate extraction path.

| Category | How to Identify | Route To |
|----------|-----------------|----------|
| Core domain {vocabulary.note} | Direct assertion about {vocabulary.domain} | -> {vocabulary.note} (SKIP selectivity gate) |
| Implementation idea | Describes a feature, tool, system, or workflow to build | -> methodology note (SKIP selectivity gate) |
| Tension/challenge | Describes a conflict, risk, or trade-off | -> tension note (SKIP selectivity gate) |
| Validation | Evidence confirming an approach works | -> {vocabulary.note} (SKIP selectivity gate) |
| Near-duplicate | Semantic search finds related vault {vocabulary.note} | -> evaluate for enrichment task |
| Off-topic claim | General insight not about {vocabulary.domain} | -> apply selectivity gate |

**CRITICAL:** Implementation ideas, tensions, validations, and domain {vocabulary.note_plural} do NOT need to pass the 4-criterion selectivity gate. The gate is for off-topic filtering ONLY.

**Why this matters:** The selectivity gate was designed for filtering general insights. But implementation ideas ("build a trails feature"), tensions ("optimization vs readability trade-off"), and validations ("research confirms our approach") are DIFFERENT output types that serve different purposes. Applying the selectivity gate to them is a category error.

### 4. Semantic Search for Duplicates and Enrichment

For each candidate, run duplicate detection:

```
mcp__qmd__vector_search  query="[proposed claim as sentence]"  collection="{vocabulary.notes_collection}"  limit=5
```
If MCP is unavailable, run:
```bash
qmd vsearch "[proposed claim as sentence]" --collection {vocabulary.notes_collection} -n 5
```
If qmd CLI is unavailable, fall back to keyword grep duplicate checks.

**Why `vector_search` (vector semantic) instead of keyword search:** Duplicate detection is where keyword search fails hardest. A claim about "friction in systems" will not find "resistance to change" via keyword matching even though they may be semantic duplicates. Vector search (~5s) catches same-concept-different-words duplicates that keyword search misses entirely. For a batch of 30-50 candidates, this adds ~3 minutes total — worth it to catch duplicates early rather than discovering them during {vocabulary.cmd_reflect}.

**Scores are signals, not decisions.** For ANY result with a relevant title or snippet:

1. **READ the full {vocabulary.note}**
2. Compare: is this the SAME claim in different words?
3. Ask: **"What does source add that existing {vocabulary.note} lacks?"**

**The Enrichment Judgment (DEFAULT TO ENRICHMENT):**

| Situation | Action |
|-----------|--------|
| Exact text already exists | SKIP (truly identical — RARE) |
| Same claim, different words, source adds nothing | SKIP (verify by re-reading existing {vocabulary.note}) |
| Same claim, source has MORE detail/examples/framing | -> ENRICHMENT TASK (update existing {vocabulary.note}) |
| Same topic, DIFFERENT claim | -> EXTRACT as new {vocabulary.note}, flag for cross-linking |
| Related mechanism, different scope | -> EXTRACT as new {vocabulary.note}, flag for cross-linking |

**DEFAULT TO ENRICHMENT.** If source mentions the same topic, it almost certainly adds something. Truly identical content is RARE.

**MANDATORY protocol when semantic search finds overlap:**

1. **READ the existing {vocabulary.note} fully** (not just title/description)
2. Ask: "What does source ADD that existing {vocabulary.note} LACKS?"
   - New examples -> ENRICHMENT
   - Deeper framing -> ENRICHMENT
   - Citations/evidence -> ENRICHMENT
   - Different angle -> ENRICHMENT
   - Concrete implementation -> ENRICHMENT
   - Literally identical -> skip (RARE)
3. If source adds ANYTHING: **CREATE ENRICHMENT TASK**
4. Only skip if source adds literally NOTHING new (verify this claim)

**Near-duplicates are opportunities, not rejections.** Creating enrichment tasks is CORRECT behavior. If you are skipping near-duplicates without enrichment tasks, you are probably wrong.

### 5. Classify Each Extraction

Every extracted candidate gets classified:

- **CLOSED** — standalone claim, design decision, ready for processing as-is
- **OPEN** — needs more investigation, testable hypothesis, requires evidence

Classification affects downstream handling but does NOT affect whether to extract. Both open and closed candidates get extracted.

### 6. Present Findings

Report what you found by category. **Include counts:**

```
Extraction scan complete.

SUMMARY:
- {vocabulary.note_plural}: N
- implementation ideas: N
- tensions: N
- enrichment tasks: N
- validations: N
- open questions: N
- skipped: N
- TOTAL OUTPUTS: N

---

CLAIMS ({vocabulary.note_plural}):
1. [claim as sentence] — connects to [[existing note]]
2. [claim as sentence] — extends [[existing note]]
...

IMPLEMENTATION IDEAS (methodology notes):
1. [feature/pattern] — what it enables, why it matters
...

TENSIONS (tension notes):
1. [X vs Y] — the conflict, why it matters
...

ENRICHMENT TASKS (update existing {vocabulary.note_plural}):
1. [[existing note]] — source adds [what is missing]
...

SKIPPED (truly nothing to add):
- [description] — why nothing extractable
```

**Wait for user approval before creating files.** Never auto-extract.

### 7. Extract (With User Approval)

For each approved {vocabulary.note}:

**a. Craft the title**

The title IS the claim. Express the concept in exactly the words that capture it.

Test: "this {vocabulary.note} argues that [title]"
- Must make grammatical sense
- Must be something you could agree or disagree with
- Composability over brevity — a full sentence is fine if the concept requires it
- Lowercase with spaces
- No punctuation that breaks filesystems: . * ? + [ ] ( ) { } | \ ^

Good: "explicit structure beats implicit convention for agent navigation"
Good: "small differences compound through repeated selection"
Bad: "context management strategies" (topic label, not a claim)

**b. Write the {vocabulary.note}**

```markdown
---
description: [~150 chars elaborating the claim, adds info beyond title]
type: [claim | methodology | problem | learning | tension]
created: YYYY-MM-DD
[domain-specific fields from derivation-manifest]
---

# [prose-as-title proposition]

[Body: 150-400 words showing reasoning]

Use connective words: because, but, therefore, which means, however.
Acknowledge uncertainty where appropriate.
Consider the strongest counterargument.
Show the path to the conclusion, not just the conclusion.

---

Source: [[source filename]]

Relevant Notes:
- [[related claim]] — [why it relates: extends, contradicts, builds on]

Topics:
- [[relevant {vocabulary.topic_map}]]
```

**c. Verify before writing**

- Title passes the claim test ("this {vocabulary.note} argues that [title]")
- Description adds information beyond the title (not a restatement)
- Body shows reasoning, not just assertion
- At least one relevant {vocabulary.note} connection identified
- At least one {vocabulary.topic_map} link
- Source attribution present

**d. Create the file**

Write to: `{vocabulary.notes}/[title].md`

---

## Large Source Handling

**For sources exceeding 2500 lines: chunk processing is MANDATORY.**

Context degrades as it fills. A single-pass extraction of a 3000-line source will miss insights in the later sections because your attention has degraded by the time you reach them. Chunking ensures each section gets fresh attention.

### Chunking Strategy

| Source Size | Chunk Count | Chunk Size | Rationale |
|-------------|------------|------------|-----------|
| 2500-4000 lines | 3-4 chunks | 700-1200 lines | Standard chunking |
| 4000-6000 lines | 4-5 chunks | 800-1200 lines | Balanced attention |
| 6000+ lines | 5+ chunks | 1000-1500 lines | Prevent context overflow |

**Chunk boundaries:** Split at natural section breaks (headings, topic transitions). Never split mid-paragraph or mid-argument. A chunk should be a coherent unit of content.

### Processing Depth Adaptation

| Depth (from config) | Chunking Behavior |
|---------------------|-------------------|
| deep | Fresh context per chunk (spawn subagent per chunk if platform supports). Maximum quality. |
| standard | Process chunks sequentially in current session. Reset orientation between chunks. |
| quick | Larger chunks (1500-2000 lines). Fewer, faster passes. |

### Cross-Chunk Coordination

When processing in chunks:
1. Keep a running list of extracted {vocabulary.note_plural} across chunks
2. Later chunks check against earlier chunks' extractions (not just existing vault {vocabulary.note_plural})
3. Cross-chunk connections get flagged for {vocabulary.cmd_reflect}
4. The final extraction report covers ALL chunks combined

**The anti-pattern:** Processing chunk 3 and extracting a duplicate of something already extracted in chunk 1 because you lost track. Maintain the running list.

---

## Enrichment Detection

When source content adds value to an EXISTING {vocabulary.note} rather than creating a new one, create an enrichment task instead.

### When to Create Enrichment Tasks

| Signal | Action |
|--------|--------|
| Source has better examples for an existing {vocabulary.note} | Enrichment: add examples |
| Source has deeper framing or context | Enrichment: strengthen reasoning |
| Source has citations or evidence | Enrichment: add evidence base |
| Source has a different angle on the same claim | Enrichment: add perspective |
| Source has concrete implementation details | Enrichment: add actionable specifics |

### Enrichment Task Format

Each enrichment task specifies:
- **Target:** Which existing {vocabulary.note} to enrich (by title)
- **What to add:** Specific content from the source
- **Why:** What the existing {vocabulary.note} lacks that this adds
- **Source lines:** Where in the source the enrichment content is found

**The enrichment default:** When in doubt between "new {vocabulary.note}" and "enrichment to existing {vocabulary.note}", lean toward enrichment. The existing {vocabulary.note} already has connections, {vocabulary.topic_map} placement, and integration. Adding to it compounds existing value.

---

## Quality Gates

### Red Flags: Extraction Too Tight (THE COMMON FAILURE MODE)

**If you catch yourself doing ANY of these, STOP IMMEDIATELY and recalibrate:**

#### The Cardinal Sins (NEVER do these)

1. **"validates existing approach" as skip reason**
   - WRONG: "This just confirms what we do, skip"
   - RIGHT: Validations ARE valuable. Extract as {vocabulary.note} with evidence framing.
   - WHY: Future sessions need to see WHY an approach is validated, not just that it works.

2. **"already captured in system config" as skip reason**
   - WRONG: "We already have this in our config, skip"
   - RIGHT: Extract "session handoff creates continuity without persistent memory"
   - WHY: Config is implementation. {vocabulary.note_plural} explain WHY it works.

3. **"we already do this" as skip reason**
   - WRONG: "We use wiki links, this is obvious, skip"
   - RIGHT: Extract the reasoning that explains WHY it works
   - WHY: DOING is not EXPLAINING. The reasoning needs externalization.

4. **"obvious" or "well known" as skip reason**
   - WRONG: "Everyone knows structure helps, skip"
   - RIGHT: Extract the specific, named, referenceable claim
   - WHY: Named patterns are referenceable. Unnamed intuitions are not.

5. **Treating near-duplicates as skips instead of enrichments**
   - WRONG: "Similar to existing note, skip"
   - RIGHT: Create enrichment task to add source's details to existing {vocabulary.note}
   - WHY: Near-duplicates almost always add framing, examples, or evidence.

#### Other Red Flags

- Rejecting implementation ideas as "not claims" (they ARE extractable as methodology notes)
- Rejecting tensions as "not claims" (they become tension notes)
- Zero extraction from a domain-relevant source (the source IS about your domain)
- Rejecting open questions as "not testable" (directions guide future work)
- Applying the 4-criterion gate to non-standard-claim categories (gate is for off-topic filtering)
- Skip rate > 10% on domain-relevant sources (most domain content should extract to SOME category)

#### The Test

Before skipping ANYTHING, ask: **"Would a future session benefit from this being a retrievable {vocabulary.note}?"**

If YES -> extract (even if "we already know this")
If NO -> verify it is truly off-topic or literally identical to existing content

### Red Flags: Extraction Too Loose

- Extracting vague observations with no actionable content
- Creating {vocabulary.note_plural} without articulating vault connection
- Titles that are topics, not claims ("knowledge management" instead of "knowledge management fails without active maintenance")
- Body text that is pure summary without reasoning

### Calibration Check (REQUIRED Before Finishing)

**STOP before outputting results.** Count your outputs by category:

```
{vocabulary.note_plural} extracted: ?
implementation ideas: ?
tensions: ?
enrichment tasks: ?
validations: ?
open questions: ?
truly skipped: ?
TOTAL: ?
```

**Expected yields by source size:**

| Source Size | Expected Outputs | Skip Rate |
|-------------|------------------|-----------|
| ~100 lines | 5-10 outputs | varies by relevance |
| ~350 lines | 15-30 outputs | < 10% for domain-relevant |
| ~500+ lines | 25-50+ outputs | < 10% for domain-relevant |
| ~1000+ lines | 40-70 outputs | < 5% for domain-relevant |

**Zero extraction from a domain-relevant source is a BUG.**

**If your total outputs are significantly below these ranges, you are over-filtering.**

### Selectivity Adaptation

Processing selectivity adapts based on `ops/config.yaml`:

| Selectivity (config) | Gate Behavior | Skip Rate Target |
|----------------------|---------------|-----------------|
| strict | 4-criterion gate applies to ALL claims including domain-relevant | Higher skip rate acceptable |
| moderate (default) | Gate applies only to off-topic content. Domain-relevant bypasses gate | < 10% for domain sources |
| permissive | Gate barely applies. Extract nearly everything, heavy enrichment | < 5% overall |

**Strict mode** is for mature vaults where noise reduction matters more than coverage.
**Permissive mode** is for new vaults building initial density.
**Moderate** is the default — comprehensive extraction for domain content, selective for off-topic.

### Mandatory Review If Low Yield

Go back through candidates you marked as "duplicate" or "rejected":

1. **Did any "duplicates" have source content that enriches existing {vocabulary.note_plural}?**
   - YES -> convert to enrichment task (DEFAULT TO ENRICHMENT)
   - NO -> verify by re-reading existing {vocabulary.note} FULLY

2. **Did any "rejected" items describe features to build?**
   - YES -> extract as implementation idea
   - NO -> verify it is truly unactionable

3. **Did any "rejected" items describe conflicts or challenges?**
   - YES -> extract as tension note
   - NO -> verify it is truly vague

4. **Did any "rejected" items provide evidence for existing approaches?**
   - YES -> extract as validation claim
   - NO -> verify it does not support existing methodology

5. **Did any "rejected" items suggest questions worth investigating?**
   - YES -> extract as open question {vocabulary.note}
   - NO -> verify it is not worth tracking

**Do not proceed with handoff until low yield is investigated.**

---

## Note Design Reference

### Titles

Titles are claims that work as prose when linked:

```
since [[explicit structure beats implicit convention]], the question becomes...
the insight is that [[small differences compound through repeated selection]]
because [[capture speed beats filing precision]], we separate the two...
```

The claim test: "this {vocabulary.note} argues that [title]"

| Example | Passes? |
|---------|---------|
| quality requires active judgment | yes: "argues that quality requires active judgment" |
| knowledge management | no: "argues that knowledge management" (incomplete) |
| small differences compound through selection | yes: "argues that small differences compound through selection" |
| tools for thought | no: "argues that tools for thought" (incomplete) |

### Description

One field. ~150 characters. Must add NEW information beyond the title — scope, mechanism, or implication.

Bad (restates title): "quality is important in knowledge work"
Good (adds mechanism + implication): "when creation becomes trivial, maintaining signal-to-noise becomes the primary challenge — selection IS the work"

The description is progressive disclosure: title says WHAT the claim is, description says WHY it matters or HOW it works. If the description just rephrases the title, it wastes context and provides no filter value.

### Body

Show reasoning. Use connective words. Acknowledge uncertainty.

Bad:
> Quality matters. When creation is easy, curation becomes the work.

Good:
> The easy part is capture. We bookmark things, save screenshots, clip articles we never open again. The hard part is doing something with it all. Automation makes this worse because generation is now trivial — anyone can produce endless content. So the constraint shifts from production to selection. Since [[structure without processing provides no value]], the question becomes: who does the selecting?

Characteristics:
- Conversational flow (because, but, therefore)
- Shows path to conclusion
- Acknowledges where thinking might be wrong
- Considers strongest objection
- Invokes other {vocabulary.note_plural} as prose

### Section Headings

Headings serve navigation, not decoration. Use when agents would benefit from grepping the outline.

**Always use headings for:**
- Tension notes (sections: Quick Test, When Each Pole Wins, Dissolution Attempts, Practical Applications)
- {vocabulary.topic_map} notes (sections: Synthesis, Core Ideas, Tensions, Explorations Needed, Agent Notes)
- Implementation patterns with discrete steps
- Notes exploring multiple facets of a concept (>1000 words AND distinct sub-topics)

**Use prose without headings for:**
- Single flowing arguments under ~1000 words
- Notes where transitions like "since [[X]]..." already carry structure

### Footer

```markdown
---

Source: [[source filename]]

Relevant Notes:
- [[related claim]] — extends this by adding the temporal dimension

Topics:
- [[relevant {vocabulary.topic_map}]]
```

The relationship context explains WHY to follow the link:
- Bad: "-- related"
- Good: "-- contradicts by arguing for explicit structure"
- Good: "-- provides the foundation this challenges"

---

## The Composability Test

Before finalizing ANY {vocabulary.note}, verify:

**1. Standalone Sense**
If you link to this {vocabulary.note} from another context, will it make sense without reading three other {vocabulary.note_plural} first?

**2. Specificity**
Could someone disagree with this claim? Vague {vocabulary.note_plural} cannot be built on.

**3. Clean Linking**
Would linking to this {vocabulary.note} drag unrelated content along? If yes, the {vocabulary.note} covers too much.

**When to skip:** content does not pass all four selectivity criteria (off-topic content only)
**When to split:** multiple distinct claims in one extraction
**When to sharpen:** claim too vague, title is label not statement

---

## Research Provenance

When the source file contains provenance metadata (source_type, research_prompt, research_server, generated), preserve the chain:

- Each created {vocabulary.note}'s Source footer links to the source file
- The source file's YAML contains the research prompt
- The chain: research query -> inbox file -> /{vocabulary.reduce} -> {vocabulary.notes}

If source has `source_type` in frontmatter, this is research-generated content — handle with extra care for attribution.

**Provenance fields to preserve:**

| Field | Purpose |
|-------|---------|
| source_type | How this content was generated |
| research_prompt | The query or directive that produced this content |
| research_server | Which research tool was used |
| generated | When the research was produced |

The research_prompt is the most critical field — it captures the intellectual context that shaped what was returned. Knowing "I searched for X because I was exploring Y" is part of the knowledge graph.

---

## Example: What Good Extraction Looks Like

### Example 1: 300-line domain-relevant source

**Source:** 300-line research document directly relevant to {vocabulary.domain}

**Scan found:** ~45 items across sections

**Extraction results:**
- 12 core {vocabulary.note_plural}
- 6 implementation ideas -> methodology notes
- 4 tensions -> tension notes
- 5 enrichment tasks -> update existing {vocabulary.note_plural}
- 3 validations -> {vocabulary.note_plural}
- 3 skipped (too vague to act on)

**Total: 30 outputs, 3 skipped (~9% skip rate)**

### Example 2: 100-line general article

**Source:** 100-line article with partial relevance to {vocabulary.domain}

**Extraction results:**
- 4 core {vocabulary.note_plural}
- 1 enrichment task
- 2 skipped (off-topic)
- 3 skipped (too vague)

**Total: 5 outputs, 5 skipped (50% skip rate — acceptable for general source)**

### Contrast: WRONG Behavior

- 45 candidates -> 0 outputs (everything "rejected as duplicate or not a claim")
- Treating implementation ideas as "not claims" and skipping
- Treating tensions as "not claims" and skipping
- Treating near-duplicates as skips instead of enrichment tasks
- Skip rate > 10% on a domain-relevant source

---

## Critical

Never auto-extract. Always present findings and wait for user approval.

**When in doubt, extract.** For domain-relevant sources, err toward capturing. Implementation ideas, tensions, validations, open questions, and near-duplicates all have value — they become different output types, not rejections.

**The principle:** the goal is to capture everything relevant to {vocabulary.domain}. For domain-relevant sources, that is MOST of the content. The selectivity gate exists for OFF-TOPIC filtering, not for rejecting on-mission content that happens to have a different form.

**Remember:**
- Implementation ideas are NOT "not claims" — they are roadmap
- Tensions are NOT "not claims" — they are wisdom
- Enrichments are NOT "duplicates" — they add detail
- Validations are NOT "already known" — they are evidence
- Open questions are NOT "not testable" — they are guidance

**For domain-relevant sources: skip rate < 10%. Zero extraction = BUG.**

---

## Handoff Mode (--handoff flag)

When invoked with `--handoff`, this skill handles queue management for orchestrated execution. This includes creating per-claim task files and updating the task queue.

**Detection:** Check if `$ARGUMENTS` contains `--handoff`.

### Per-Claim Task Files (REQUIRED in handoff mode)

After extraction, for EACH claim, create a task file in `ops/queue/`:

**Filename:** `{source}-NNN.md` where:
- {source} is the source basename (from the extract task)
- NNN is the claim number, starting from `next_claim_start` in the extract task file

**Example:** If `article-name.md` task has `next_claim_start: 010`, claims are:
- `article-name-010.md`, `article-name-011.md`, etc.

**Why unique names:** Claim filenames must be unique across the entire vault. Claim numbers are global and never reused across batches. The pattern `{source}-NNN.md` ensures every claim file is uniquely identifiable even after archiving.

**Structure:**

```markdown
---
claim: "[the claim as a sentence]"
classification: closed | open
source_task: [source-basename]
semantic_neighbor: "[related note title]" | null
---

# Claim NNN: [claim title]

Source: [[source filename]] (lines NNN-NNN)

## Reduce Notes

Extracted from [source_task]. This is a [CLOSED/OPEN] claim.

Rationale: [why this claim was extracted, what it contributes]

Semantic neighbor: [if found, explain why DISTINCT not DUPLICATE]

---

## Create
(to be filled by create phase)

## {vocabulary.cmd_reflect}
(to be filled by {vocabulary.cmd_reflect} phase)

## {vocabulary.cmd_reweave}
(to be filled by {vocabulary.cmd_reweave} phase)

## {vocabulary.cmd_verify}
(to be filled by {vocabulary.cmd_verify} phase)
```

### Enrichment Task Files (REQUIRED in handoff mode)

For each ENRICHMENT detected, create a task file in `ops/queue/`:

**Filename:** `{source}-EEE.md` where:
- {source} is the source basename (same as claims)
- EEE is the enrichment number, continuing from where claims left off

**Example:** If claims are 010-015, enrichments start at 016.

**Why unique names:** Enrichments share the numbering system with claims. Both use the global `next_claim_start` counter. This ensures every task file is uniquely identifiable across the entire vault.

**Structure:**

```markdown
---
type: enrichment
target_note: "[[existing note title]]"
source_task: [source-basename]
addition: "what to add from source"
source_lines: "NNN-NNN"
---

# Enrichment EEE: [[existing note title]]

Source: [[source filename]] (lines NNN-NNN)

## Reduce Notes

Enrichment for [[existing note title]]. Source adds [what it adds].

Rationale: [why this enriches rather than duplicates]

---

## Enrich
(to be filled by enrich phase)

## {vocabulary.cmd_reflect}
(to be filled by {vocabulary.cmd_reflect} phase)

## {vocabulary.cmd_reweave}
(to be filled by {vocabulary.cmd_reweave} phase)

## {vocabulary.cmd_verify}
(to be filled by {vocabulary.cmd_verify} phase)
```

### Queue Updates (REQUIRED in handoff mode)

After creating task files, update `ops/queue/queue.json`:

1. Mark the extract task as `"status": "done"` with completion timestamp
2. For EACH claim, add ONE queue entry:

```json
{
  "id": "claim-NNN",
  "type": "claim",
  "status": "pending",
  "target": "[claim title]",
  "classification": "closed|open",
  "batch": "[source-basename]",
  "file": "[source-basename]-NNN.md",
  "created": "[ISO timestamp]",
  "current_phase": "create",
  "completed_phases": []
}
```

3. For EACH enrichment, add ONE queue entry:

```json
{
  "id": "enrich-EEE",
  "type": "enrichment",
  "status": "pending",
  "target": "[existing note title]",
  "source_detail": "[what to add]",
  "batch": "[source-basename]",
  "file": "[source-basename]-EEE.md",
  "created": "[ISO timestamp]",
  "current_phase": "enrich",
  "completed_phases": []
}
```

**Critical queue rules:**
- ONE entry per claim (NOT one per phase) — phase progression is tracked via `current_phase` and `completed_phases`
- `type` is `"claim"` or `"enrichment"` — these are the task's single queue entries
- Every task MUST have `"file"` pointing to its uniquely-named task file
- Every task MUST have `"batch"` identifying which source batch it belongs to
- Task IDs use `claim-NNN` or `enrich-EEE` format with the global claim number
- Claim numbers are global and never reused across batches
- `current_phase` starts at `"create"` for claims, `"enrich"` for enrichments
- The orchestrator advances phases through the configured phase_order sequence

### Claim Numbering

- Start from `next_claim_start` value in the extract task file (set by /seed)
- /seed calculated this by checking the queue and archive for the highest existing claim number
- Example: if highest claim in vault is 009, next_claim_start will be 010
- Claim numbers are GLOBAL and never reused across batches
- Enrichments continue the same numbering sequence after claims

### Handoff Output Format

After creating files and updating queue, output:

```
=== RALPH HANDOFF: reduce ===
Target: [source file]

Work Done:
- Extracted N claims from [source]
- Created claim files: {source}-NNN.md through {source}-NNN.md
- Created M enrichment files: {source}-EEE.md through {source}-EEE.md (if any)
- Duplicates skipped: [list or "none"]
- Semantic neighbors flagged for cross-linking: [list or "none"]

Files Modified:
- ops/queue/{source}-NNN.md (claim files)
- ops/queue/{source}-EEE.md (enrichment files, if any)
- ops/queue/queue.json (N claim tasks + M enrichment tasks, 1 entry each)

Learnings:
- [Friction]: [description] | NONE
- [Surprise]: [description] | NONE
- [Methodology]: [description] | NONE
- [Process gap]: [description] | NONE

Queue Updates:
- Mark: {source} done
- Create: claim-NNN entries (1 per claim, current_phase: "create")
- Create: enrich-EEE entries (1 per enrichment, current_phase: "enrich", if any)
=== END HANDOFF ===
```

**Critical:** The handoff mode adds queue management ON TOP of the standard reduce workflow. Do the full extraction workflow first, then create task files, update queue, and output handoff.

### Queue Update (Interactive Execution)

When running interactively (NOT via orchestrator), YOU must execute the queue updates. The orchestrator parses the handoff block and handles this automatically, but interactive sessions do not.

**After completing extraction, update the queue:**

```bash
# Get timestamp
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Mark extract task done (replace TASK_ID with actual task ID)
jq '(.tasks[] | select(.id=="TASK_ID")).status = "done" | (.tasks[] | select(.id=="TASK_ID")).completed = "'"$TIMESTAMP"'"' ops/queue/queue.json > tmp.json && mv tmp.json ops/queue/queue.json
```

The handoff block's "Queue Updates" section is not just output — it is your own todo list when running interactively.

---

## Skill Selection Routing

When processing content, route to the correct skill:

| Task Type | Required Skill | Why |
|-----------|---------------|-----|
| New content to process | /{vocabulary.reduce} | Extraction requires quality gates |
| {vocabulary.note} just created | /{vocabulary.cmd_reflect} | New {vocabulary.note_plural} need connections |
| After connecting | /{vocabulary.cmd_reweave} | Old {vocabulary.note_plural} need updating |
| Quality check | /{vocabulary.cmd_verify} | Combined verification gate |
| System health | /health | Systematic diagnostics |

## Pipeline Chaining

After extraction completes, output the next step based on `ops/config.yaml` pipeline chaining mode:

- **manual:** Output "Next: {vocabulary.cmd_reflect} [created notes]" — user decides when to proceed
- **suggested:** Output next step AND add each created {vocabulary.note} to `ops/queue/queue.json` with `current_phase: "create"` and `completed_phases: []`
- **automatic:** Queue entries created and processing continues immediately via orchestration

The chaining output uses domain-native command names from the derivation manifest.
