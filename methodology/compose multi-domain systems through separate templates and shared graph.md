---
description: How domains compose when users have multiple use cases — shared infrastructure, separate schemas, and the graph as the integration layer
kind: guidance
status: active
topics: ["[[multi-domain-composition]]"]
---

# compose multi-domain systems through separate templates and shared graph

Most users don't fit a single domain. A researcher also manages projects. A therapist tracks their own health. An engineer has personal goals. Since [[multi-domain systems compose through separate templates and shared graph]], the plugin must generate vaults that serve multiple domains without conflict.

This doc tells the plugin HOW to compose domains and where composition breaks down.

## Why Compose Instead of Separate Vaults

The temptation with multiple use cases is to create separate vaults — one for research, one for personal life, one for projects. This feels clean but destroys the primary value of a knowledge graph: cross-domain connections.

Separate vaults miss connections that only exist across domain boundaries:

- A research finding about cognitive load directly explains why your therapy patient struggles with a specific intervention
- Your project management estimation patterns correlate with your personal health data during crunch periods
- Your creative writing research into medieval trade routes connects to your personal finance mental model

These connections are invisible in separate vaults because the graph edges that would connect them don't exist. The value of a composed system comes precisely from connections that separate systems would miss.

The cost of composition is maintenance complexity. The benefit is connection density. Since [[cross-links between MOC territories indicate creative leaps and integration depth]], the connections justify the complexity.

## The Five Composition Rules

Every multi-domain system must follow these five rules. They are the invariants that prevent domain interference while enabling cross-domain value.

### Rule 1: Separate Templates, Shared Graph

Each domain gets its own note templates with domain-specific schemas. But all notes live in the same graph (same wiki link namespace, same connection space). Templates isolate structure; the graph unifies meaning.

### Rule 2: No Field Name Conflicts

When two domains use the same field name with different semantics, prefix to disambiguate. Research `status: preliminary | open | dissolved` and PM `status: not-started | in-progress | done` become `research_status` and `project_status`. Universal fields (`description`, `topics`) maintain consistent semantics.

### Rule 3: Cross-Domain Reflect

The reflect phase searches across ALL domains, not just the domain of the new note. A therapy insight might connect to a research claim. A project decision might link to an engineering ADR. Connection-finding that stays within domain boundaries defeats the purpose of composition.

### Rule 4: Domain-Specific Processing

The process step (reduce phase) adapts per domain. Research extraction differs from therapy pattern detection which differs from PM decision documentation. Since [[every knowledge domain shares a four-phase processing skeleton that diverges only in the process step]], the pipeline skeleton is shared but each domain's process step is distinct.

### Rule 5: Progressive Context Loading

The context file loads universal methodology first, then loads domain-specific configuration only when the user is working in that domain. A multi-domain context file that dumps all domain configurations at once wastes context window space. Progressive loading means the agent gets full depth in the active domain without noise from inactive ones.

## The Composition Principle

Domains compose through three layers:

| Layer | Shared or Separate | Why |
|-------|--------------------|-----|
| **Infrastructure** | Shared | One inbox, one context file, one processing pipeline, one maintenance system |
| **Schemas** | Separate per domain | Each domain has its own note types with domain-specific fields |
| **Graph** | Shared | Cross-domain connections are where the real value lives |

The infrastructure layer runs once. The schema layer runs per domain. The graph layer connects everything.

## What's Shared

### Inbox
One capture zone for all domains. Content gets routed to the correct domain during processing (the reduce phase classifies and routes). A single inbox means: one place to dump, no decision about where to put things at capture time.

### Context File
One CLAUDE.md (or equivalent) with universal methodology + per-domain configuration sections. The agent loads one file at session start, not one per domain.

### Processing Pipeline
The four-phase skeleton (capture → process → connect → verify) runs for all domains. The process step adapts per domain, but the skeleton is shared infrastructure. Since [[every knowledge domain shares a four-phase processing skeleton that diverges only in the process step]], there's no need for separate pipelines.

### Maintenance System
Structural health checks (orphan detection, schema validation, MOC sizing) run across all domains simultaneously. Since [[maintenance operations are more universal than creative pipelines because structural health is domain-invariant]], one maintenance system covers all domains.

### Universal Schema Fields
These fields exist on every note regardless of domain:
- `description` — retrieval filter
- `topics` — MOC membership (domain-specific MOCs)

## What's Separate

### Note Templates
Each domain has its own note types with domain-specific schemas:
```
templates/
├── research-claim.md       # Research domain
├── research-source.md
├── therapy-reflection.md   # Therapy domain
├── therapy-pattern.md
├── project-decision.md     # PM domain
├── project-risk.md
```

Templates don't conflict because note types are distinct. A `therapy-reflection` and a `research-claim` have different schemas and serve different purposes.

### MOC Hierarchies
Each domain generates its own MOC tree:
```
01_thinking/
├── research/
│   ├── index.md
│   ├── methodology.md
│   └── [topic MOCs]
├── therapy/
│   ├── patterns.md
│   ├── growth.md
│   └── [pattern MOCs]
├── projects/
│   ├── project-a.md
│   └── project-b.md
```

### Processing Logic
The process step (reduce phase) applies domain-specific extraction:
- Research reduce: extract claims, classify methodology
- Therapy reduce: detect patterns, identify triggers
- PM reduce: document decisions, extract action items

The pipeline routes to the right extraction logic based on content type.

## The Cross-Domain Graph

This is where composition creates unique value. Because all domains share one graph, connections can span domains:

- A research finding about cognitive load connects to a therapy pattern about overwhelm
- A PM decision links to a research claim that influenced it
- A personal health pattern correlates with a trading performance pattern
- An engineering ADR links to a product management PRD that motivated it

Since [[concept-orientation beats source-orientation for cross-domain connections]], cross-domain connections happen naturally when notes are organized by concept rather than source domain.

### Four Cross-Domain Connection Patterns

Not all cross-domain connections are the same. The plugin recognizes four patterns, each with different discovery mechanisms:

**1. Temporal Correlation**
Events in different domains that co-occur in time. Sleep quality (health domain) drops on the same days that trading losses increase (trading domain). Therapy mood entries correlate with project stress periods.

**Discovery mechanism:** Temporal overlap detection across domain notes. Query notes from different domains that share date ranges and compare field values.

**Example:** "Your mood entries below 3 cluster on weeks where your PM domain shows sprint overruns. The correlation is 0.7 over the last 3 months."

**2. Entity Sharing**
The same person, concept, or object appears across domains. A colleague tracked in your PM domain (stakeholder) is also in your People domain (relationship). A research concept appears in both your academic and creative writing domains.

**Discovery mechanism:** Wiki link and entity name matching across domain boundaries. When the same `[[person]]` or `[[concept]]` appears in notes from different domains, the connection is structural.

**Example:** "[[marcus-chen]] appears in your PM domain as a stakeholder and in your People domain as a mentoring relationship. His communication preferences in one inform engagement strategy in the other."

**3. Causal Chains**
A finding or event in one domain causes or explains something in another. A research claim about attention limits explains why a PM process fails. A health protocol change produces measurable effects on creative output.

**Discovery mechanism:** Semantic search across domains. The reflect phase uses `mcp__qmd__query` without domain filtering to find conceptually related notes across all domains.

**Example:** "Your research claim that [[attention degrades nonlinearly after the third concurrent task]] may explain the PM pattern in [[cross-team dependencies cause more delays than technical complexity]] — the dependencies force context switching that triggers the attention degradation."

**4. Goal Alignment**
Goals or outcomes in different domains serve the same higher purpose. Research productivity goals align with personal growth goals. Engineering quality goals align with product user satisfaction goals.

**Discovery mechanism:** Goal-tracing across domain MOCs. When domain MOCs reference similar outcomes or objectives, the alignment surfaces through MOC comparison.

**Example:** "Your personal goal 'reduce work stress' connects to your PM goal 'improve sprint estimation accuracy' — both address the same root cause (overcommitment)."

### Cross-Domain Connection Finding

The reflect phase finds connections regardless of domain boundaries. Since [[elaborative encoding is the quality gate for new notes]], connection quality requires articulating WHY two cross-domain notes relate, not just that they do.

The plugin generates cross-domain reflect prompts:
- "Does this therapy pattern connect to any personal health notes?" (temporal correlation)
- "Does this research finding have implications for any active projects?" (causal chain)
- "Does this engineering decision relate to any product management goals?" (goal alignment)
- "Does this person appear in any other domain context?" (entity sharing)

### Cross-Domain MOC References

Notes can appear in MOCs from multiple domains:
```yaml
topics: ["[[research-methodology]]", "[[therapy-patterns]]"]
```

A note about "cognitive load affects emotional regulation" genuinely belongs in both research and therapy MOCs. Multi-MOC membership IS the cross-domain connection.

## Progressive Context Loading for Multi-Domain

Rule 5 (progressive context loading) requires careful implementation. In a multi-domain vault, the context file must serve multiple domains without wasting context window space on inactive ones.

### Context File Structure

```
context-file.md
├── Universal Methodology (always loaded)
│   ├── Note design patterns
│   ├── Processing skeleton
│   └── Quality standards
├── Domain: Research (loaded when working on research)
│   ├── Claim extraction protocol
│   ├── Research-specific schemas
│   └── Citation management
├── Domain: Therapy (loaded when working on therapy)
│   ├── Ethical constraints
│   ├── Pattern detection protocol
│   └── Session preparation workflow
└── Cross-Domain (loaded when connections span domains)
    ├── Cross-domain reflect prompts
    ├── Shared entity resolution
    └── Temporal correlation detection
```

### Loading Strategy

The agent determines which domain section to load based on:
1. **User's stated task** — "Let's work on my research" → load Research section
2. **Note being processed** — a therapy entry → load Therapy section
3. **Cross-domain detection** — a therapy note mentions a research concept → load Cross-Domain section additionally

This prevents context file bloat in multi-domain systems. A 3-domain context file might be 3000 lines total, but any single session loads only the universal section (500 lines) plus one domain section (800 lines) — manageable context window usage.

## Composition Patterns

### Pattern 1: Primary + Secondary

One domain is primary (most content, deepest structure), others are secondary (lighter use).

**Example:** Researcher + Personal Assistant (see [[academic research uses structured extraction with cross-source synthesis]] + [[personal assistant uses life area management with review automation]])

**Architecture:**
- Research gets full three-tier MOC hierarchy with heavy processing
- Personal Life gets flat-peer MOCs for life areas with light processing
- Shared inbox with content-based routing during reduce
- Cross-domain: research insights link to personal goals; research workload patterns connect to personal energy management

**Practical composition:** Dr. Engel's vault (from the research example) adds a personal domain tracking life areas, goals, and relationships. Her research goal "publish attention allocation paper by Q3" appears in both research MOCs (as a project) and personal goals (as a life area milestone). When her research processing detects a productivity pattern, the agent can surface its connection to her personal goal of better work-life balance.

### Pattern 2: Equal Peers

Multiple domains receive roughly equal investment.

**Example:** Creative Writing + Research (see [[creative writing uses worldbuilding consistency with character tracking]] + [[academic research uses structured extraction with cross-source synthesis]])

**Architecture:**
- Each domain gets full MOC hierarchy
- Shared processing pipeline with domain-routing
- Cross-domain: research findings feed worldbuilding decisions; creative exploration generates research questions

**Practical composition:** A speculative fiction writer researching quantum physics for hard sci-fi. Research claims about quantum entanglement become worldbuilding constraints. The creative writing domain's consistency graph links to research claims: when a research claim is updated (new experiment contradicts the physics), the agent flags dependent world rules and scenes. Research and fiction share a vocabulary — but the fiction domain uses it metaphorically while the research domain uses it literally. The vocabulary transformation layer handles this.

### Pattern 3: Professional + Personal

Work and life domains compose.

**Example:** Engineering + Health + People (see [[engineering uses technical decision tracking with architectural memory]] + [[health wellness uses symptom-trigger correlation with multi-dimensional tracking]] + [[people relationships uses Dunbar-layered graphs with interaction tracking]])

**Architecture:**
- Engineering gets three-tier MOCs with medium processing
- Health gets flat-peer dimension MOCs with light processing (data accumulation)
- People spans both contexts (colleagues + friends + family)
- Cross-domain: health patterns correlate with work performance; people notes span professional and personal contexts

**Practical composition:** An engineering manager tracks technical decisions (ADRs, architecture), personal health metrics (sleep, exercise, stress), and relationships (team members, mentors, friends). The People domain's entity sharing means `[[marcus-chen]]` exists as both a direct report (engineering context) and someone the manager mentors (people context). Health data correlates with engineering productivity: the agent can surface "Your sleep quality drops below 6 hours on weeks with 3+ architecture reviews — consider spacing them differently."

## Composition Conflicts

Most composition is additive (domains add note types, no conflicts). But some configurations can interfere:

### Schema Field Collisions
If two domains use the same field name with different semantics:
- Research `status: preliminary | open | dissolved` (claim maturity)
- PM `status: not-started | in-progress | done` (task completion)

**Resolution:** Namespace domain-specific fields when collision detected: `research_status`, `project_status`. Universal fields (`description`, `topics`) use consistent semantics.

### Processing Priority Conflicts
When inbox items could belong to multiple domains:

**Resolution:** The reduce phase classifies first, then routes. Classification is based on content signals, not user tagging. The plugin can ask when ambiguous.

### MOC Overlap
When a topic belongs in multiple domain hierarchies:

**Resolution:** Multi-MOC membership is a feature, not a conflict. The note appears in all relevant MOCs. Since [[cross-links between MOC territories indicate creative leaps and integration depth]], this is actively valuable.

### Maintenance Burden Scaling
More domains = more note types = more maintenance checks.

**Resolution:** Structural maintenance is shared (orphan detection works on all note types). Domain-specific maintenance (therapy pattern staleness, PM risk register review) scales per domain but is condition-triggered, not scheduled. The plugin warns when total domain count creates maintenance pressure.

## How the Plugin Handles Multi-Domain

### During /setup
1. Ask "What domains do you work in?" (may be multiple)
2. Identify primary domain
3. Generate shared infrastructure once
4. Add domain-specific layers per domain
5. Explain cross-domain connection opportunities

### During /extend
When the user adds a new domain to an existing vault:
1. Add new note templates (no conflict with existing)
2. Add new MOC hierarchy (separate from existing)
3. Update processing pipeline to recognize new content types
4. Run cross-domain reflect to find connections between new and existing domains
5. Update context file with new domain configuration

### During /recommend
Check for cross-domain opportunities:
- Notes that could connect across domains but don't
- Domains with no cross-domain links (isolated silos)
- Common patterns across domains (same concept, different vocabulary)

## Domain Composition Matrix

Which domains compose well and what unique value the composition creates:

| Primary | Secondary | Cross-Domain Value |
|---------|-----------|-------------------|
| Research | PM | Research findings inform project decisions |
| Research | Personal | Research goals align with life goals |
| Therapy | Health | Mood-health correlations across domains |
| Therapy | People | Relationship patterns inform therapeutic insights |
| PM | Engineering | Decisions trace to technical implementation |
| PM | Product | Project execution ties to product strategy |
| Creative | Research | Worldbuilding grounded in real research |
| Learning | Research | Study notes become research foundations |
| Trading | Health | Health patterns correlate with trading performance |
| Personal | Health | Life area health includes physical health |
| Personal | People | Relationship maintenance as life area |
| Engineering | Product | Technical decisions linked to product requirements |

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| Separate vaults per domain | Loses cross-domain connections — the primary value of composition | Shared graph, separate schemas |
| One schema for all domains | Since [[false universalism applies same processing logic regardless of domain]] | Domain-specific templates |
| No cross-domain reflect | Domains become silos within the same vault | Explicit cross-domain connection finding |
| Too many domains at once | Maintenance burden overwhelms | Start with 1-2 domains, add as needed |
| Identical processing for all domains | Each domain's process step differs | Route to domain-specific extraction logic |

## Domain Examples

These domain compositions can be combined to demonstrate composition patterns:

- [[therapy journal uses warm personality with pattern detection for emotional processing]] + [[health wellness uses symptom-trigger correlation with multi-dimensional tracking]] — Mood-health correlation: therapy `mood` and `trigger` fields connect to health `sleep_quality`, `exercise`, and `nutrition` fields, enabling cross-domain pattern detection
- [[academic research uses structured extraction with cross-source synthesis]] + [[project management uses decision tracking with stakeholder context]] — Research findings inform project decisions: a claim note about methodology links to a decision note that cited the finding as rationale
- [[engineering uses technical decision tracking with architectural memory]] + [[product management uses feedback pipelines with experiment tracking]] — Technical decisions linked to product requirements: ADRs reference PRD goals, feature MOCs link to architecture decisions
- [[personal assistant uses life area management with review automation]] + [[people relationships uses Dunbar-layered graphs with interaction tracking]] — Relationship maintenance as life area: person MOCs cross-reference life area goals, interaction tracking feeds into personal growth patterns
- [[trading uses conviction tracking with thesis-outcome correlation]] + [[health wellness uses symptom-trigger correlation with multi-dimensional tracking]] — Performance-health correlation: trading journal `emotions_during` fields connect to health metrics, enabling detection of physiological factors in trading performance

## Grounding

This guidance is grounded in:
- [[multi-domain systems compose through separate templates and shared graph]] — the foundational composition principle (Rule 1)
- [[every knowledge domain shares a four-phase processing skeleton that diverges only in the process step]] — shared pipeline, domain-specific process steps (Rule 4)
- [[concept-orientation beats source-orientation for cross-domain connections]] — cross-domain links need concept organization, not domain silos
- [[maintenance operations are more universal than creative pipelines because structural health is domain-invariant]] — shared maintenance across all domains
- [[cross-links between MOC territories indicate creative leaps and integration depth]] — cross-domain links as the primary value signal of composition
- [[false universalism applies same processing logic regardless of domain]] — why Rule 4 (domain-specific processing) is necessary
- [[friction-driven module adoption prevents configuration debt by adding complexity only at pain points]] — why add-domain is incremental, not upfront
- [[schema evolution follows observe-then-formalize not design-then-enforce]] — domain-specific fields emerge from use, not from upfront design

---

Topics:
- [[index]]
- [[index]]
---

Topics:
- [[multi-domain-composition]]
