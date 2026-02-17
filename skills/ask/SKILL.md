---
name: ask
description: Query the bundled research knowledge graph for methodology guidance. Routes questions through a 3-tier knowledge base — WHY (research claims), HOW (guidance docs), WHAT IT LOOKS LIKE (domain examples) — plus structured reference documents. Returns research-backed answers grounded in specific claims with practical application to the user's system. Triggers on "/ask", "/ask [question]", "why does my system...", "how should I...".
version: "1.0"
generated_from: "arscontexta-v1.6"
context: fork
model: opus
allowed-tools: Read, Grep, Glob, mcp__qmd__search, mcp__qmd__vector_search, mcp__qmd__deep_search, mcp__qmd__get, mcp__qmd__multi_get
argument-hint: "[question about knowledge systems or methodology]"
---

## EXECUTE NOW

**Question: $ARGUMENTS**

If no question provided, ask the user what they want to know.

**Execute these steps:**

1. **Classify the question** — determine which knowledge base tier(s) to consult (see Query Classification below)
2. **Search the knowledge base** — route to appropriate tiers based on classification
3. **Read relevant claims and docs** — load 3-7 most relevant sources fully (use `mcp__qmd__multi_get` when reading multiple IDs)
4. **Check user context** — read `ops/derivation.md` if the question involves their specific system
5. **Synthesize an answer** — weave claims into a coherent, opinionated argument
6. **Cite sources** — reference specific claims and documents so the user can explore further

**START NOW.** Reference below explains routing and synthesis methodology.

---

## The Three-Tier Knowledge Base

The plugin's knowledge base has three distinct parts, each serving a different function. Effective answers often draw from multiple tiers.

### Tier 1: Research Graph (WHY)

**Location:** `${CLAUDE_PLUGIN_ROOT}/methodology/` — filter by `kind: research`
**Content:** 213 interconnected research claims grounded in cognitive science, knowledge system theory, and agent cognition research.
**Use for:** Questions about principles, trade-offs, why things work, theoretical foundations.

**What it contains:**
- Claims about how knowledge systems work (human and agent)
- Cognitive science foundations (working memory, attention, retrieval)
- Methodology comparisons (Zettelkasten vs PARA, atomic vs compound)
- Design dimensions (trade-off spectrums with poles and decision factors)
- Failure modes and anti-patterns
- Agent-specific constraints (context windows, session boundaries)

**Search strategy:** Use `mcp__qmd__deep_search` (highest quality, LLM-reranked) for conceptual questions. Use `mcp__qmd__vector_search` for semantic exploration. Use `mcp__qmd__search` for known terminology. All searches use the `methodology` collection.

### Tier 2: Guidance Docs (HOW)

**Location:** `${CLAUDE_PLUGIN_ROOT}/methodology/` — filter by `kind: guidance`
**Content:** 9 operational documents covering procedures, workflows, and implementation rationale.
**Use for:** Questions about how to do things, operational best practices, workflow mechanics.

**Documents include:**
- Schema enforcement rationale and procedures
- Pipeline philosophy and processing workflow
- MOC methodology and navigation patterns
- Maintenance patterns and condition-based triggers
- Memory architecture and session management
- Vocabulary transformation procedures
- Failure mode prevention patterns
- Multi-domain composition rules
- Onboarding and evolution decisions

**Search strategy:** `mcp__qmd__search` with keywords from the question using the `methodology` collection. To narrow to guidance docs, add `kind:guidance` to your grep filter on results.

### Tier 3: Domain Examples (WHAT IT LOOKS LIKE)

**Location:** `${CLAUDE_PLUGIN_ROOT}/methodology/` — filter by `kind: example`
**Content:** 12 domain-specific compositions showing what generated vaults look like in practice.
**Use for:** Questions about how to apply methodology to specific domains, inspiration for novel domain mapping.

**Examples include domains like:**
- Research vaults (academic literature reviews, claim extraction)
- Personal assistant vaults (life management, therapy, health wellness)
- Project management vaults (decision tracking, stakeholder context)
- Creative vaults (worldbuilding, character tracking)
- Engineering, legal, trading, student learning, relationships

**Search strategy:** Use `mcp__qmd__vector_search` across the `methodology` collection for semantic domain matching. To list all examples: `rg '^kind: example' ${CLAUDE_PLUGIN_ROOT}/methodology/`.

### Reference Documents (structured derivation context)

**Location:** `${CLAUDE_PLUGIN_ROOT}/reference/`
**Content:** Structured reference documents supporting derivation and system architecture.
**Use for:** Deep dives into specific architectural topics, cross-referencing dimension positions, understanding interaction constraints.

**Core Architecture:**
- `methodology.md` — universal principles and processing pipeline
- `components.md` — component blueprints and feature blocks
- `kernel.yaml` — the 12 non-negotiable primitives
- `three-spaces.md` — self/notes/ops architecture and boundary rules

**Configuration & Derivation:**
- `dimension-claim-map.md` — which research claims inform which dimensions
- `interaction-constraints.md` — how dimension choices create pressure on others
- `tradition-presets.md` — named points in configuration space
- `vocabulary-transforms.md` — universal-to-domain term mapping
- `derivation-validation.md` — validation tests for derived systems

**Behavioral & Quality:**
- `personality-layer.md` — personality derivation and encoding
- `conversation-patterns.md` — worked examples of full derivation paths
- `failure-modes.md` — how knowledge systems die and prevention patterns

**Lifecycle & Operations:**
- `use-case-presets.md` — preset configurations for common domains
- `session-lifecycle.md` — session rhythm, context budget, orient-work-persist
- `evolution-lifecycle.md` — seed-evolve-reseed, condition-based maintenance
- `self-space.md` — agent identity generation, self/ architecture
- `semantic-vs-keyword.md` — search modality selection guidance
- `open-questions.md` — unresolved research questions and deferred items

**Also read:** `claim-map.md` — the routing index showing which claims map to which topics. Start here when you need to find relevant claims quickly.

---

## Query Classification

Before searching, classify the user's question to determine which tier(s) to consult.

### Classification Rules

| Question Type | Signals | Primary Tier | Secondary Tier |
|--------------|---------|-------------|----------------|
| **WHY** | "why does...", "what's the reasoning...", "what's the theory behind...", "why not just..." | Research Graph | Guidance Docs |
| **HOW** | "how do I...", "what's the workflow for...", "how should I...", "what's the process..." | Guidance Docs | Research Graph |
| **WHAT** | "what does X look like...", "show me an example...", "how would this work for...", "what would a Y vault..." | Domain Examples | Guidance Docs |
| **COMPARE** | "X vs Y", "what's the difference between...", "should I use X or Y...", "trade-offs between..." | Research Graph | Examples |
| **DIAGNOSE** | "something feels wrong...", "why isn't this working...", "my system is doing X when it should..." | Guidance Docs + Reference (failure-modes.md) | Research Graph |
| **CONFIGURE** | "what dimension...", "how should I set...", "what configuration for...", "which preset..." | Reference (dimensions, constraints) | Research Graph |
| **EVOLVE** | "should I change...", "my system has grown...", "this doesn't fit anymore..." | Reference (evolution-lifecycle.md) | Guidance Docs |

### Multi-Tier Questions

Many questions require consulting multiple tiers. The classification above shows primary and secondary tiers. Always check: would the answer be stronger with evidence from another tier?

**Example multi-tier routing:**

Question: "Why does my system use atomic notes instead of longer documents?"
1. **WHY tier** — search research graph for claims about atomicity, granularity, composability
2. **Reference** — check `dimension-claim-map.md` for the granularity dimension's informing claims
3. **User context** — check `ops/derivation.md` for their specific granularity position and reasoning
4. **WHAT tier** — optionally pull an example showing what atomic notes look like in a similar domain

Question: "How should I handle therapy session notes that are very long?"
1. **HOW tier** — search guidance for processing workflow, chunking strategies
2. **WHAT tier** — check examples for therapy or personal domains with similar challenges
3. **WHY tier** — search for claims about context degradation, chunking benefits, large source handling

---

## Search Strategy

### Step 1: Route to Claim-Map

Read `${CLAUDE_PLUGIN_ROOT}/reference/claim-map.md` first. This is the routing index — it shows which topic areas are relevant to the user's question and which claims to start with. Do NOT skip this step and search blindly.

### Step 2: Search the Appropriate Tier

**For WHY questions (Research Graph):**
```
mcp__qmd__deep_search  query="[user's question rephrased as a search]"  collection="methodology"  limit=10
```
Use `mcp__qmd__deep_search` (hybrid + LLM reranking) for conceptual questions because the best connections often use different vocabulary than the question. Results will include all kinds; prioritize `kind: research` results.

**For HOW questions (Guidance Docs):**
```
mcp__qmd__search  query="[key terms from question]"  collection="methodology"  limit=5
```
Use keyword search first since guidance docs use consistent terminology. Fall back to semantic if keyword misses. Prioritize `kind: guidance` results.

**For WHAT questions (Domain Examples):**
```
mcp__qmd__vector_search  query="[domain + what the user wants to see]"  collection="methodology"  limit=5
```
Use semantic search to find the most relevant domain examples even if the exact domain name differs. Prioritize `kind: example` results.

**Fallback chain for qmd lookups:**
- MCP tools (`mcp__qmd__deep_search`, `mcp__qmd__vector_search`, `mcp__qmd__search`)
- qmd CLI (`qmd query`, `qmd vsearch`, `qmd search`)
- direct file reads/grep on `${CLAUDE_PLUGIN_ROOT}/methodology/` and `${CLAUDE_PLUGIN_ROOT}/reference/`

**For Reference documents:**
Read specific reference documents based on the topic. The claim-map will indicate which reference docs are relevant. Load the 2-4 most relevant — not all of them.

### Step 3: Read Deeply

Do NOT skim search results. For the top 3-7 results:
1. Read the full claim note or document
2. Follow wiki links to related claims (1 hop)
3. Note connections between claims that strengthen the answer

**The depth principle:** A shallow answer citing 10 claims is worse than a deep answer weaving 4 claims into a coherent argument. Read fewer sources more deeply.

### Step 4: Check User Context

If the question involves the user's specific system:

1. **Read derivation** — `ops/derivation.md` contains their dimension positions, vocabulary, constraints, and the reasoning behind every configuration choice
2. **Apply vocabulary** — use `${CLAUDE_PLUGIN_ROOT}/reference/vocabulary-transforms.md` to translate universal terms into their domain language. Answer about "reflections" not "claims" if they are running a therapy system
3. **Check constraints** — reference `${CLAUDE_PLUGIN_ROOT}/reference/interaction-constraints.md` to see if their configuration creates specific pressures relevant to the question
4. **Cite dimension-specific research** — use `${CLAUDE_PLUGIN_ROOT}/reference/dimension-claim-map.md` to ground answers in the specific claims that inform their configuration

### Step 5: Check Local Methodology

Read `ops/methodology/` for system-specific self-knowledge. Methodology notes may be more current than the derivation document — they capture ongoing operational learnings that the original derivation did not anticipate.

```bash
# Load all methodology notes
for f in ops/methodology/*.md; do
  echo "=== $f ==="
  cat "$f"
  echo ""
done
```

**When methodology notes address the user's question:**
- Cite them alongside research claims: "Your system's methodology notes say [X], which aligns with the research claim [[Y]]"
- If methodology notes contradict research claims, flag the tension: "Your methodology note says [X], but the research suggests [Y] — this may be worth investigating with /{DOMAIN:rethink}"
- Methodology notes about system behavior are more authoritative for "how does MY system work" questions than the general research graph

**When to prioritize methodology over research:**
- Questions about "why does my system do X" — methodology notes capture the specific rationale
- Questions about behavioral patterns — methodology notes capture system-specific learnings
- Questions about configuration — methodology notes may document post-init changes not in derivation.md

**When to prioritize research over methodology:**
- Questions about "why is X a good idea in general" — research claims provide the theoretical foundation
- Questions about alternative approaches — the research graph covers options the system did not choose
- Questions about methodology comparisons — research claims compare traditions systematically

---

## Answer Synthesis

### Structure

Every answer follows this structure:

1. **Direct answer** — Lead with the answer, not the search process. Do not say "I searched for X and found Y." Say what the answer IS.

2. **Research backing** — What specific claims support this answer. Cite by title: "According to [[claim title]]..."

3. **Practical implications** — What this means for the user's specific situation. Use their domain vocabulary if available from derivation.

4. **Tensions or caveats** — Any unresolved conflicts, limitations, or situations where the answer might not hold. The research has genuine tensions — share them honestly.

5. **Further exploration** — Related claims or topics the user might want to explore. These are departure points, not assignments.

6. **Sources consulted** — Briefly note which knowledge layers were used: "Research: [N] claims consulted. Local methodology: [M] notes consulted." When local methodology was relevant, name the specific note: "Your methodology note [[title]] informed the [specific part] of this answer."

### Quality Standards

**Ground answers in specific claims, not general knowledge.** The knowledge base exists so answers are evidence-based. If you answer from general knowledge without consulting the graph, you are bypassing the tool.

**Acknowledge gaps honestly.** When the research does not cover something, say so. "The current research graph doesn't have claims about X" is a legitimate answer. Do not fabricate coverage.

**Distinguish certainty levels.** Some claims are well-established with multiple supporting claims. Others are preliminary observations or research directions. The `confidence` field in claim frontmatter signals this:
- No confidence field — standard established claim
- `confidence: speculative` — early-stage observation, not fully evaluated
- `confidence: emerging` — promising but needs more support
- `confidence: supported` — well-evidenced claim
- `confidence: established` — foundational, widely supported
- `status: archived` — superseded or dissolved claim

**Be opinionated.** The research has positions. Share them. "The research strongly suggests X because..." is better than "some sources say X, others say Y." If there IS genuine disagreement, present it as a tension, not as false balance.

**Translate to user context.** When the user has a derivation, apply findings to their system. Generic advice is less useful than specific application. "In your therapy vault, this means..." is better than "in general, this means..."

### Worked Examples

#### Example 1: WHY Question

**Question:** "Why does my system use atomic notes instead of longer documents?"

**Classification:** WHY -> Primary: Research Graph. Secondary: Reference (dimension-claim-map).

**Search:**
1. `mcp__qmd__deep_search  query="atomic notes vs compound documents granularity"  collection="methodology"  limit=8`
2. Read `reference/dimension-claim-map.md` — find granularity dimension's informing claims
3. Read `ops/derivation.md` — check user's granularity position

**Answer:**
> Your system uses atomic granularity because your conversation signaled "precise claims from papers." The research shows that atomic notes enable independent linking and recombination — according to [[atomic notes maximize recombinable surface area]], each note can be linked from any context without dragging unrelated content along. Your processing pipeline (extract -> reflect -> reweave -> verify) specifically requires atomic granularity to maintain the link fabric, because [[verify phase checks link density per note]] and compound documents would inflate link counts artificially.
>
> The trade-off: atomic notes create more files and require denser navigation structures. [[flat organization requires semantic search at scale]] explains why your system includes semantic search — without it, finding notes in a flat atomic structure becomes impractical beyond ~50 notes.
>
> **Tension:** [[composability and context compete at the note level]] — making notes small enough to link cleanly sometimes makes them too small to carry their own argument. Your system handles this through the description field and topic map context phrases.

#### Example 2: HOW Question

**Question:** "How do I process a large research paper?"

**Classification:** HOW -> Primary: Guidance Docs. Secondary: Research Graph.

**Search:**
1. `mcp__qmd__search  query="large source processing chunking"  collection="methodology"  limit=5`
2. `mcp__qmd__deep_search  query="context degradation large documents extraction"  collection="methodology"  limit=5`

**Answer:**
> For sources over 2500 lines, chunk into segments of 350-1200 lines and process each chunk with fresh context. [Guidance: pipeline processing workflow] explains the chunking strategy in detail.
>
> The reason is [[context quality degrades as conversation grows]] — your extraction quality in the later sections of a 3000-line document will be measurably worse than in the early sections. Fresh context per chunk ensures each section gets your best attention.
>
> **Practical steps:**
> 1. Run /seed to create the extraction task
> 2. /reduce will automatically detect the source size and plan chunks
> 3. Each chunk extracts independently with a running duplicate list across chunks
> 4. The final extraction report covers all chunks combined
>
> **Your config** has `processing.depth: standard`, which means chunks process sequentially in the current session. If you switch to `deep`, each chunk would get its own isolated context (maximum quality, but slower).

#### Example 3: WHAT Question

**Question:** "What would a cooking recipe vault look like?"

**Classification:** WHAT -> Primary: Domain Examples. Secondary: Guidance Docs.

**Search:**
1. `mcp__qmd__vector_search  query="cooking recipes culinary knowledge system"  collection="methodology"  limit=5`
2. Read closest domain examples for structural inspiration

**Answer:**
> [Answer synthesized from examples, showing concrete folder structure, note examples, topic map examples, and vocabulary choices specific to a culinary domain. References the closest existing domain example for structural patterns.]

---

## Anti-Patterns

### What NOT to Do

| Anti-Pattern | Why It Fails | Instead |
|-------------|-------------|---------|
| Answer without searching | Bypasses the knowledge base entirely | Always search, even for "obvious" questions |
| List claims without synthesis | Dumps search results, forces user to connect dots | Weave claims into a coherent argument |
| Search only one tier | Misses HOW when answering WHY, or vice versa | Check if secondary tier strengthens the answer |
| Ignore user's derivation | Generic advice when specific is available | Read ops/derivation.md for user context |
| Use universal vocabulary | Says "notes" when their system says "reflections" | Apply vocabulary transforms |
| Fabricate claim citations | Cites claims that do not exist in the graph | Only cite claims you actually read |
| Skip the claim-map | Searches blindly without routing | Read claim-map first for topic orientation |
| Present false balance | "Some say X, others say Y" when research has a clear position | Be opinionated — share the research's position |

### The Honesty Standard

If the knowledge base genuinely does not cover a topic:

1. Say so explicitly: "The current research graph doesn't have claims about X."
2. Offer what IS available: "The closest related research is about Y, which suggests..."
3. Flag it as a gap: "This might be worth investigating as a research direction."

Do NOT extrapolate wildly from tangentially related claims. An honest "I don't know, but here's what's adjacent" is more valuable than a fabricated answer.

---

## Domain-Aware Answering

When the user's question involves their specific system (not abstract methodology):

### Step 1: Read Their Derivation

Check for `ops/derivation.md` to understand:
- Their dimension positions (granularity, organization, processing depth, etc.)
- Their vocabulary choices (what are "notes" called in their domain?)
- Their tradition mapping (which methodology preset, if any?)
- Their personality settings (formal/warm, clinical/conversational)
- Their constraint profile (which interaction constraints are active?)

### Step 2: Apply Domain Vocabulary

Use `${CLAUDE_PLUGIN_ROOT}/reference/vocabulary-transforms.md` to translate universal terms into their domain language. This is not cosmetic — it is about making the answer *native* to their system.

| Universal Term | Therapy Domain | PM Domain | Research Domain |
|---------------|---------------|-----------|-----------------|
| notes | reflections | decisions | claims |
| topic map | theme map | project map | MOC |
| reduce | surface | extract | reduce |
| reflect | connect | link | reflect |
| inbox | journal | intake | inbox |

### Step 3: Check Interaction Constraints

Reference `${CLAUDE_PLUGIN_ROOT}/reference/interaction-constraints.md` to understand whether their configuration creates specific pressures relevant to the question. Some dimension combinations create tensions that affect the answer:
- High granularity + flat organization = needs strong semantic search
- Permissive selectivity + deep processing = high volume, slower throughput
- Self space enabled + warm personality = rich identity layer

### Step 4: Cite Dimension-Specific Research

Use `${CLAUDE_PLUGIN_ROOT}/reference/dimension-claim-map.md` to ground answers in the specific claims that inform their configuration choices. This makes the answer traceable: "Your system does X because claim Y supports it for your configuration."
