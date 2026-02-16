---
description: MOC best practices for derived knowledge systems — hierarchy patterns, lifecycle management, and health metrics adapted across domains
kind: guidance
status: active
topics: ["[[note-design]]", "[[maintenance-patterns]]"]
---

# design MOCs as attention management devices with lifecycle governance

MOCs (Maps of Content) are attention management devices. Since [[MOCs are attention management devices not just organizational tools]], they don't just organize notes — they tell agents where to focus, what connects to what, and where synthesis opportunities exist. Every derived vault needs MOCs, but different domains need different MOC patterns.

This doc tells the plugin HOW to generate MOC structures for each domain.

## Why MOCs Are Non-Negotiable

Without MOCs, agents face navigational vertigo. Since [[navigational vertigo emerges in pure association systems without local hierarchy]], a flat vault of interconnected notes provides no starting point for orientation. MOCs solve this by creating curated entry points — the agent doesn't read everything; it reads the MOC and follows relevant links.

Since [[MOC construction forces synthesis that automated generation from metadata cannot replicate]], MOCs carry intellectual value beyond navigation. The act of curating which notes appear in a MOC and writing context phrases for each link IS synthesis. Automated MOCs generated from metadata tags lack this synthesis — they're address books, not maps.

Since [[complete navigation requires four complementary types that no single mechanism provides]], MOCs fill the local navigation role — the "what's nearby?" question that search, hub navigation, and inline links cannot answer. Missing this one type creates a predictable blind spot: agents can find things (search) and follow connections (links) but cannot orient within a domain.

## The Dump-Lump-Jump Construction Process

Nick Milo's construction pattern has three phases that do fundamentally different cognitive work:

### Phase 1: Dump (Gather Everything)

Pull every note that might belong to the MOC's territory. This is exhaustive collection without judgment — cast the net wide. Automated tools handle this well: tag queries, semantic search, and link graph traversal can identify candidate notes reliably.

### Phase 2: Lump (Classify and Context)

Group notes by relationship, write context phrases for each link explaining WHY to follow it. This is where since [[basic level categorization determines optimal MOC granularity]], the builder exercises categorization judgment — deciding which notes cluster together, what the groupings mean, and whether the current granularity is right.

Context phrases are mandatory. Every link in a MOC must explain its relationship:

**Good:** `- [[mood patterns predict trigger sensitivity]] — connects daily mood ratings to identified triggers, showing which moods lower the threshold`

**Bad:** `- [[mood patterns predict trigger sensitivity]]` (bare link — address book entry, not a map)

The context phrase tells the agent: "If you're looking for X, follow this link." Without it, the agent must read every linked note to decide if it's relevant.

### Phase 3: Jump (Synthesize)

Identify tensions between notes, write the orientation synthesis, capture insights that emerge from seeing the collection as a whole. The Jump phase is where the MOC transcends its index function. Two clusters might be in tension. A gap might become visible. A higher-order claim might emerge from the arrangement.

**Why the Jump phase matters for agents:** Since [[the generation effect requires active transformation not just storage]], the cognitive value accrues to whoever does the construction. Even if an automated system could produce identical output, the act of construction produces understanding that informs future reasoning.

**Why manual synthesis matters:** Automated MOC generation can produce the Dump phase flawlessly and approximate the Lump phase through clustering. But it cannot perform the Jump because the Jump requires judgment about what matters, what conflicts, and what the collection means as a whole. The resulting MOC is structurally valid but functionally hollow — it satisfies the navigation need without providing genuine orientation, so the agent never looks further.

## Seven MOC Types

Different organizational needs call for different MOC structures. The plugin recognizes seven types:

### 1. Hub MOC

Entry point for the entire vault. Pure navigation, under 100 lines. Links to domain MOCs with brief orientation.

**Example:** `index.md` — one per vault, rarely changes, highest traffic.

### 2. Domain MOC

Entry point for a research area. Contains cross-cutting synthesis and links to topic MOCs.

**Example:** `knowledge-work.md` — links to graph-structure, agent-cognition, processing-workflow, etc.

### 3. Topic MOC

Active workspace for a specific subdomain. Core ideas, tensions, gaps, agent notes. This is where most intellectual work happens.

**Example:** `graph-structure.md` — 15-40 notes about graph topology, navigation, linking patterns.

### 4. Self MOC

Agent identity and operational memory. Flat peer structure, no hierarchy between peers.

**Example:** `identity.md`, `methodology.md`, `goals.md` — facets of agent state.

### 5. Operational MOC

Procedure tracking with atomic entries in subdirectories. Groups operational notes by category.

**Example:** `observations.md` — categorizes observation notes by type (methodology, process gap, friction).

### 6. Content Hub MOC

Domain workflow hub combining navigation with operational guidance. Lives at the root of a domain folder.

**Example:** `twitter.md` — navigation to drafts, published content, people, plus workflow instructions.

### 7. Entity MOC

Per-person, per-project, or per-character tracking. Accumulates context about a specific entity across time.

**Example:** `people/angie-bowen.md` — interaction history, relationship context, follow-up items.

**When to use which:**

| Need | MOC Type | Why |
|------|----------|-----|
| Vault-wide orientation | Hub | Single entry point, rare changes |
| Research area overview | Domain | Cross-cutting synthesis across topics |
| Active knowledge work | Topic | Working surface for claims, tensions, gaps |
| Agent self-knowledge | Self | Flat peers for identity facets |
| Operational logging | Operational | Categorized atomic entries |
| Workflow + navigation | Content Hub | Domain that needs both process and map |
| Tracking entities | Entity | Accumulating context about people, projects, characters |

## Three Hierarchy Patterns

The plugin chooses from three patterns based on domain characteristics:

### Pattern A: Three-Tier Research

```
Hub (index.md) -> Domain MOCs -> Topic MOCs -> Claim Notes
```

**Best for:** Domains with deep conceptual structure, many interconnected ideas, and synthesis as a primary value. The hierarchy provides layered orientation: hub for broad navigation, domain for area context, topic for active workspace.

**Domain examples:** Research and Academic, Legal (precedent hierarchies), Engineering (architecture domains), Student Learning (course and concept hierarchies)

**Plugin generates:**
- One hub MOC linking domain MOCs
- Domain MOCs for major knowledge areas
- Topic MOCs when 20+ notes cluster around a subtopic
- Auto-split suggestion when topic MOCs exceed 50 notes

### Pattern B: Flat Peer

```
MOC-A | MOC-B | MOC-C | MOC-D  (no hierarchy, equal peers)
```

**Best for:** Domains with distinct areas that don't nest hierarchically. Each area is a self-contained workspace. No area is "parent" to another.

**Domain examples:** Personal Assistant (life areas), Health and Wellness (fitness / nutrition / sleep / symptoms as peers), Trading (strategy areas as peers)

**Plugin generates:**
- One MOC per life area or dimension
- No hub MOC — each area is a direct entry point
- Cross-area links in Agent Notes sections to surface correlations

### Pattern C: Hub-Plus-Entities

```
Hub MOC -> Entity MOCs (person/project/character)
            -> Entity-specific notes
```

**Best for:** Domains centered around entities (people, projects, characters, cases) where each entity accumulates its own context over time.

**Domain examples:** People and Relationships (person MOCs), Creative Writing (character/location MOCs), Product Management (feature/customer MOCs), Project Management (project MOCs), Legal (case MOCs)

**Plugin generates:**
- One hub MOC with overview and quick reference
- Entity MOCs created dynamically as entities are added
- Entity subdirectories for clean organization
- Relationship-between-entities tracking

**Decision framework:** Active research -> Three-Tier. Agent identity -> Flat Peer. Domain workflow with entities -> Hub-Plus-Entities. Never exceed 4 tiers.

## MOC Content Rules

The plugin generates MOCs with these structural rules:

### Context Phrases Are Mandatory

Every link in a MOC must have a context phrase explaining WHY to follow that link. Since [[context phrase clarity determines how deep a navigation hierarchy can scale]], the quality of these phrases directly determines how far the MOC hierarchy can scale. Ambiguous phrases force agents to load linked notes to assess relevance, converting attention savings back into attention cost.

### Synthesis Lives in Notes, Not MOCs

When a MOC section starts containing developed arguments (multi-paragraph analysis, detailed reasoning), that content should be extracted into a synthesis note and the MOC should link to it.

MOCs navigate. Notes argue. The plugin flags when MOC sections exceed ~200 words as a signal to extract.

### Agent Notes Section

Every MOC should end with an Agent Notes section containing:
- Navigation shortcuts (e.g., "Start with note X if you're looking for Y")
- Dead ends documented (e.g., "Note Z looks relevant but doesn't lead anywhere for this topic")
- Productive combinations (e.g., "Notes A and B together form a complete argument about...")

Since [[agent notes externalize navigation intuition that search cannot discover and traversal cannot reconstruct]], agent notes provide strategic attention management — while the synthesis paragraph orients to WHAT the topic contains, agent notes orient to HOW to navigate it.

Agent notes are updated during reflect/reweave passes. They encode the navigation intuition that search alone cannot provide.

## Staleness Risk

Since [[stale navigation actively misleads because agents trust curated maps completely]], MOC staleness is the single most dangerous maintenance failure in agent-operated systems.

**Why staleness is worse than absence:** A missing MOC causes vertigo — disorienting but honest. The agent falls back to search, which accesses current content. A stale MOC is deceptive. It presents an outdated view as current, and the agent has no mechanism to suspect otherwise. Notes created after the last MOC update are invisible — not because they're hard to find, but because the agent never looks for them. The curated map satisfies the navigation need, so no further search occurs.

**Why agents are especially vulnerable:** Humans retain cross-session memory that might trigger doubt ("I remember writing something about this"). Agents have zero such intuition. Each session loads the MOC and treats its contents as authoritative.

**Detection mechanisms:**
- Reconciliation checks: compare notes with matching topics to MOC entries
- Coverage metrics: percentage of topic notes actually linked from their MOC
- Staleness signals: MOC last-updated date vs newest note in its territory

**Prevention:**
- Pipeline integration: /reflect updates MOCs as part of standard processing
- Batch-level checks: after processing batches, verify new notes appear in relevant MOCs
- Periodic MOC review: flag MOCs not updated in 90+ days for active topics

## Domain-Specific MOC Adaptations

Each domain adapts the MOC structure to match its natural organizing principles. See the domain examples in `examples/` for complete illustrations.

| Domain | Hierarchy | Key MOC Features |
|--------|-----------|-----------------|
| Research | Three-tier | Topic MOCs have Tensions and Explorations Needed sections |
| Therapy | Flat peer | Pattern MOC links to all detected patterns with date ranges |
| PM | Hub + entities | Project MOCs have Decision Log and Risk sections |
| Creative | Hub + entities | Character MOCs track arc evolution across scenes |
| Learning | Three-tier | Concept MOCs have prerequisite dependency information |
| Personal | Flat peer | Area MOCs have health indicators and review frequency |
| People | Hub + entities | Person MOCs track interaction recency and follow-ups |
| Engineering | Three-tier | System MOCs have dependency maps and ADR links |
| Trading | Flat peer | Strategy MOCs track win rate and drift metrics |
| Health | Flat peer | Each dimension MOC has correlation analysis links |
| Product | Hub + entities | Feature MOCs link to customer feedback and experiments |
| Legal | Three-tier + entities | Matter MOCs have precedent chains and deadline tracking |

**Domain-specific MOC sections beyond Core Ideas:**

| Domain | Extra Sections | Purpose |
|--------|---------------|---------|
| Research | Tensions, Explorations Needed | Track intellectual conflict and gaps |
| Therapy | Active Patterns, Strategy Effectiveness | Track therapeutic progress |
| PM | Decisions, Open Risks, Action Items | Track project health |
| Creative | Canon Facts, Continuity Notes | Track worldbuilding consistency |
| Learning | Prerequisites, Mastery Progress | Track learning dependencies |
| Trading | Active Theses, Performance Metrics | Track strategy effectiveness |

## MOC Lifecycle Management

The plugin generates lifecycle triggers:

### Creation Triggers
- 20+ notes cluster around a topic (detected via topic field analysis)
- Navigation friction reported: "I can't find notes about X"
- New domain area activated by user
- Mental squeeze point: the builder notices orientation within a topic has become effortful

### Split Triggers
- MOC exceeds 50 notes (since [[basic level categorization determines optimal MOC granularity]])
- Distinct sub-clusters emerge with different update frequencies
- Agent notes section exceeds 30 lines (too much navigation knowledge for one level)

**How to split:** Create sub-MOC(s) named `parent-subtopic.md`. Move Core Ideas for the sub-cluster. Parent becomes domain-style with synthesis and links to sub-MOCs. Update all affected notes' Topics footers.

### Merge Triggers
- Two MOCs have < 30 combined notes with significant overlap
- Same update frequency and related topics
- Since [[community detection algorithms can inform when MOCs should split or merge]]

### Archive Triggers
- < 5 notes and stagnant for 6+ months
- Topic absorbed into a broader MOC
- Domain area deactivated by user

## Health Metrics

The plugin monitors MOC health through these metrics:

| Metric | Healthy | Warning | Action |
|--------|---------|---------|--------|
| Notes per topic MOC | 10-40 | >50 | Suggest split |
| Orphan notes | 0 | Any | Flag for MOC addition |
| Context phrase coverage | 100% | <80% | Flag bare links |
| Agent notes length | 5-20 lines | >30 lines | Suggest observation extraction |
| Last updated | <30 days | >90 days | Flag for review |
| Cross-MOC membership | >10% of notes | <5% | Notes may be too siloed |
| Coverage (notes in topic vs MOC entries) | >95% | <80% | MOC is going stale |

## Compounding Returns

Since [[MOC maintenance investment compounds because orientation savings multiply across every future session]], maintenance is not overhead but investment. A single context phrase update costs seconds but saves orientation time in every future session that loads the MOC. If the MOC loads fifty times, a thirty-second investment returns minutes of cumulative savings.

**Prioritize by traffic:** Hub MOCs that load every session have the highest temporal multiplier. Topic MOCs that load in domain-specific sessions have moderate multiplier. Entity MOCs that load when that entity is active have the lowest but still positive multiplier. Maintenance effort should flow toward the highest-traffic MOCs.

**The hidden second return:** MOC maintenance forces genuine intellectual engagement — the maintainer reads notes in context, notices tensions, writes synthesis. Since [[the generation effect requires active transformation not just storage]], the act of maintaining IS thinking. The return is double: measurable orientation savings plus synthesis opportunities that emerge from reconsidering arrangements.

## Domain Examples

These domain compositions demonstrate MOC patterns in practice:

- [[academic research uses structured extraction with cross-source synthesis]] — Three-tier research pattern: Hub -> Literature Review MOCs -> Topic MOCs; demonstrates split triggers when topic MOCs exceed 50 claims
- [[personal assistant uses life area management with review automation]] — Flat peer pattern: life areas (Career, Health, Relationships, Finance, Growth) as equal MOCs with area health indicators
- [[people relationships uses Dunbar-layered graphs with interaction tracking]] — Hub-plus-entities pattern: hub MOC with quick reference table, individual person MOCs accumulating interaction context over time
- [[creative writing uses worldbuilding consistency with character tracking]] — Hub-plus-entities with mixed types: character MOCs track arc evolution, location MOCs serve as worldbuilding reference, plot thread MOCs track foreshadowing-to-resolution
- [[health wellness uses symptom-trigger correlation with multi-dimensional tracking]] — Flat peer with cross-dimensional links: fitness, nutrition, sleep, and symptom MOCs are peers, but Agent Notes sections surface correlations across dimensions
- [[student learning uses prerequisite graphs with spaced retrieval]] — Three-tier with prerequisite awareness: concept MOCs include dependency information, enabling the agent to identify prerequisite gaps

## Grounding

This guidance is grounded in:
- [[MOCs are attention management devices not just organizational tools]] — MOCs as attention management
- [[MOC construction forces synthesis that automated generation from metadata cannot replicate]] — why curation matters
- [[navigational vertigo emerges in pure association systems without local hierarchy]] — why MOCs are necessary
- [[basic level categorization determines optimal MOC granularity]] — optimal MOC size
- [[community detection algorithms can inform when MOCs should split or merge]] — algorithmic split/merge signals
- [[MOC maintenance investment compounds because orientation savings multiply across every future session]] — why MOC investment pays off
- [[stale navigation actively misleads because agents trust curated maps completely]] — the danger of unmaintained MOCs
- [[complete navigation requires four complementary types that no single mechanism provides]] — MOCs fill the local navigation role
- [[context phrase clarity determines how deep a navigation hierarchy can scale]] — context phrase quality constrains hierarchy depth
- [[the generation effect requires active transformation not just storage]] — why manual construction produces understanding

---

Topics:
- [[index]]
- [[index]]
---

Topics:
- [[note-design]]
- [[maintenance-patterns]]
