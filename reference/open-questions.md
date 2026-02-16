# Open Questions and Deferred Items

What we know we don't know, and what we deliberately deferred. This document tracks research questions that inform future versions, features deferred from v1 with rationale, and items deferred to v2. The derivation engine consults this when users ask about capabilities that don't yet exist, and the architect command references it when proposing evolution paths.

---

## Deferred to v1.1

These items are specified but not implemented in v1.0. They are concrete enough to ship in the next minor release.

### 1. Scan Mode for Health Command

**What:** `/health --scan` performs a lightweight, non-destructive health check that outputs metrics without modifying any files. Currently, `/health` both diagnoses and proposes fixes. Scan mode separates diagnosis from prescription.

**Why deferred:** Health command works without scan mode — the combined mode handles most use cases. Scan mode becomes valuable when users want to monitor without committing to action (CI pipelines, automated monitoring).

**When to ship:** When the first user asks for health metrics in their CI pipeline, or when automated monitoring reveals demand for read-only health checks.

### 2. Migration Assistant

**What:** A guided flow for importing existing note collections into a generated Ars Contexta system. Detects common formats (Obsidian, Notion export, plain markdown), maps existing structure to the three-space architecture, and proposes schema additions for existing frontmatter.

**Why deferred:** Migration is engineering-heavy and domain-specific (Obsidian exports differ from Notion exports). New systems (greenfield) are the primary v1 target. Migration matters for adoption but doesn't affect the derivation engine's correctness.

**When to ship:** When user feedback shows significant demand from existing vault owners who want to adopt Ars Contexta methodology on top of their current content.

### 3. Multi-Platform Support

**What:** Supporting additional agent platforms beyond Claude Code, with shared notes/ and self/ while maintaining platform-specific ops/ and automation.

**Why deferred:** Requires solving platform-specific session isolation, context file format adaptation, and shared state reconciliation. Currently focused on Claude Code as the sole supported platform.

**When to ship:** When a second platform stabilizes enough for reliable operation, and when user demand validates multi-platform as a real use case.

### 4. arscontexta.dev Website

**What:** A web frontend rendering the research graph through a sliding-pane reader for human browsing, plus an MCP endpoint for agent architect queries. Built on the same knowledge graph that the derivation engine reasons from.

**Why deferred:** The website is a distribution channel, not a core capability. The plugin and MCP server deliver the derivation engine's value directly. The website extends reach to human audiences who want to browse the research without installing anything.

**When to ship:** After v1.0 plugin and MCP server are stable, when human-readable research presentation becomes the growth bottleneck.

### 5. MCP Hosted Server

**What:** A hosted version of the Ars Contexta MCP server that users connect to without running locally. Provides `arscontexta_query`, `arscontexta_recommend`, and `arscontexta_dimensions` tools through a cloud endpoint.

**Why deferred:** The local MCP server (`npx arscontexta-mcp`) works for v1. Hosting adds infrastructure, authentication, rate limiting, and operational costs. The trade-off is reach (easier onboarding) vs complexity (ops burden).

**When to ship:** When the local MCP server sees enough adoption that hosting becomes a friction reducer rather than a premature investment.

### 6. Advanced Derivation Heuristics

**What:** Richer conversation analysis beyond keyword-to-dimension mapping. Includes: conversation flow analysis (not just individual signals but signal sequences), confidence calibration across dimensions (some signals are stronger than others), and automated heuristic testing against the conversation pattern corpus.

**Why deferred:** The basic heuristics (keyword signals -> dimension positions -> cascade checking) work for the five tested patterns. Advanced heuristics add complexity before we have enough deployment data to validate the improvement.

**When to ship:** After collecting derivation logs from 50+ real conversations, when patterns in heuristic failures reveal specific improvement targets.

### 7. Sleep-Time Compute

**What:** Background inference during inactive periods — processing inbox items, finding connections between existing notes, running backward maintenance, detecting synthesis opportunities. Produces a morning briefing in ops/.

**Why deferred:** Requires platform-specific scheduling (hook-suggested on Claude Code). The core derivation engine and processing pipeline work without background compute. Sleep-time compute is an acceleration mechanism, not a prerequisite.

**When to ship:** After the processing pipeline skills are proven reliable, when the incremental value of background processing justifies the scheduling complexity.

### 8. Observation Export

**What:** `/health --export-observations` packages ops/observations/ into an anonymized JSON bundle with system context (dimension positions, note count, feature blocks) but no user content. Always manual, always opt-in, always reviewable before sharing.

**Why deferred:** The recursive improvement loop benefits from observation export, but v1 can improve through direct user feedback and our own vault's operational learning. The formal export pipeline adds engineering complexity (format specification, privacy verification, submission channel) that isn't necessary for initial validation.

**When to ship:** When the deployed user base is large enough that aggregate observation data would meaningfully improve the research graph beyond what our own vault provides.

---

## Deferred to v2

These items require architectural decisions or ecosystem maturity that v1 doesn't address.

### 1. Organization Contribution Workflow

**What:** A full feedback loop where deployed systems submit anonymized observations, which pass through quality gates (staging, deduplication, human review, claim creation with attribution) before integration into the research graph. The export side is specified (observation export above); this is the import and curation side.

**Why deferred to v2:** Requires: (a) enough deployed systems generating observations to justify a curation pipeline, (b) governance decisions about how community contributions are attributed and validated, (c) infrastructure for staging, review, and integration. This is an ecosystem feature, not a product feature.

### 2. Programmatic Skills API Deployment

**What:** Using the Claude.ai Skills API (`/v1/skills`) to programmatically deploy, update, and manage skills on Claude accounts — including organization-level deployment to Team/Enterprise Claude plans. Enables: admin-deployed methodology for entire teams, self-evolving systems that create their own skills via API, automated skill updates during reseed.

**Why deferred to v2:** Per-account authentication, skill versioning (mid-session updates), per-role customization (junior vs senior), and compliance auditing are distribution engineering problems that don't block the core product. Plugin and marketplace distribution serve v1 needs.

---

## Open Research Questions

These questions don't have clear answers yet. They inform the research graph's direction and may lead to new claims, new dimensions, or new architectural decisions.

### Constraint-Surprise Metric

**Question:** Can we measure diminishing information gain per conversation turn to determine when the derivation conversation should stop?

**Context:** The init wizard currently asks 3-5 follow-up questions. But some conversations reveal everything in 2 turns (unambiguous signals) while others need 7+ (contradictory signals, novel domains). A principled stopping criterion would replace the arbitrary "3-5 questions" heuristic.

**Approach:** Measure information gain per turn — how much each user response reduces uncertainty across the 8 dimensions. When gain drops below a threshold, the conversation is complete. This is analogous to active learning in machine learning — sample where uncertainty is highest.

**Related work:** HyperMapper (arXiv:1810.05236) uses active learning and multi-objective Bayesian optimization for design space exploration. The init conversation is functionally design space exploration — each user response samples a region of the 8-dimensional configuration space.

**What a solution looks like:** A scoring function that takes (signals_extracted, dimensions_resolved, confidence_levels) and returns (conversation_sufficient: boolean, next_best_question: string | null). When marginal constraint from the next question drops below threshold, stop asking.

### DialogComplete Model

**Question:** Can an RL-based classifier determine when a derivation conversation has enough information to produce a confident configuration?

**Context:** Alternative to the constraint-surprise metric. Instead of measuring information gain, train a model to classify conversation state as "ready to derive" vs "needs more information" based on which dimensions have confident positions.

**Research direction:** Would require a corpus of successful derivation conversations labeled with "minimum sufficient" turn count. The reward signal would be: did the derived system need reseeding within 30 days? Currently speculative — the constraint-surprise metric would need to exist first as foundation.

### Graph Density Scoring

**Question:** How do we measure whether a knowledge graph has "enough" connections without just counting links?

**Context:** Health checks count orphans (notes with no incoming links) and link density (links per note). But these are crude — a note with 20 links to vaguely related content is worse than a note with 3 precisely contextualized connections.

**Approach:** A quality-weighted density metric that considers:
- Link context quality (does the inline prose explain WHY?)
- Relationship type diversity (all "extends" is monotone; mix of extends/contradicts/enables is richer)
- Cluster connectivity (are topic clusters well-connected internally AND bridged externally?)
- Small-world properties (average path length, clustering coefficient)

**What a solution looks like:** A composite metric that can answer: "Is this graph navigable? Where are the weakest connection points? Which notes would benefit most from new links?" This would feed directly into the /health command's connection recommendations.

### Optimal MOC Split/Merge Thresholds

**Question:** When exactly should a MOC split into sub-MOCs, and when should small MOCs merge?

**Context:** Heuristic thresholds — split at 50+ links, merge at <10 links. These come from practice in the research vault, not from principled analysis.

**Approach:** Thresholds should derive from cognitive science (working memory limits, context window constraints) and graph theory (community detection algorithms identifying natural cluster boundaries). The optimal split point likely depends on domain — a research MOC with 40 densely-linked claims may need splitting, while a companion MOC with 40 loosely-linked memories may not.

**What a solution looks like:** Domain-sensitive threshold functions: `should_split(moc, domain_config) -> (bool, suggested_subclusters)` using community detection on the link subgraph within the MOC.

### Context-Bench Integration

**Question:** How do we standardize evaluation of generated knowledge systems?

**Context:** Evaluation is manual — derivation-validation.md runs 4 worked tests (self-derivation, cross-domain, novel domain, multi-domain composition). These verify structural coherence but not operational effectiveness.

**Approach:** A benchmark suite that tests generated systems on:
- Retrieval quality: can the agent find relevant notes given a query?
- Processing fidelity: does the processing pipeline produce quality output?
- Maintenance sustainability: does the system degrade gracefully over time?
- Cross-domain composition: do multi-domain systems maintain coherence?

**What a solution looks like:** A test harness that generates systems for each use-case preset, populates them with synthetic content, runs processing and maintenance cycles, and measures quality metrics over simulated time.

### Cross-Platform Hook Equivalence

**Question:** Can we ensure generated systems work equally well across Claude Code and future platforms?

**Context:** The kernel specifies platform-variant implementations for hooks and tree injection. But the variants are hand-specified, not systematically tested for behavioral equivalence.

**Approach:** Platform adapters that translate abstract hook specifications into platform-native implementations, with behavioral equivalence tests verifying that each platform's hooks produce equivalent outcomes.

### Multi-Agent Collaboration in Generated Systems

**Question:** Can a generated system support multiple agents with different roles?

**Context:** The research vault supports two operators (Cornelius/Heinrich) with shared methodology and separate infrastructure. But this is hand-crafted, not generated. Multi-agent templates would need: shared notes/ and ops/, per-agent self/, task distribution across agents, and conflict resolution when agents modify the same notes.

**Research direction:** Federated wiki patterns, CRDTs for markdown, and stigmergic coordination (agents leaving traces for others) are potential approaches. No generated system has tested multi-agent operation yet.

### Vocabulary Transformation Quality Metrics

**Question:** Does deep vocabulary transformation actually improve agent compliance compared to shallow transformation?

**Context:** Full transformation is expensive — every skill instruction, every context file section, every template field. If shallow transformation (key terms only) produces equivalent agent behavior, the derivation engine can be simpler.

**Approach:** Generate two systems for the same domain — one with full transformation, one with shallow. Compare: agent compliance with methodology, user satisfaction with system voice, and long-term engagement.

### Personality Drift Detection

**Question:** How do we detect when the agent's actual behavior has drifted from its encoded personality?

**Context:** Personality is encoded in ops/derivation.md and expressed through generated files. But there's no mechanism to verify that the agent's runtime behavior matches the encoded profile. A warm agent might gradually become clinical if the user's content becomes more analytical.

**Approach:** Periodic personality audits that sample recent agent outputs (health reports, skill completions, session logs), score them against the personality encoding, and flag drift when measured personality diverges from encoded personality.

**What a solution looks like:** A /architect sub-command that reads recent ops/sessions/ entries, scores linguistic markers (warmth, formality, emotional acknowledgment), and compares against the personality encoding.

### Selective Forgetting Algorithms

**Question:** Should knowledge systems deliberately forget?

**Context:** The current philosophy is "archive, don't delete." Content moves to archive/ when no longer active, but nothing is destroyed. This preserves history but may create retrieval noise over time.

**Approach:** Principled forgetting based on:
- Access patterns: notes never accessed or linked in 12+ months
- Temporal validity: content that is explicitly dated and has expired
- Supersession chains: when a decision is superseded 3 times, the original may be archivable
- Confidence decay: speculative notes that were never confirmed

**What a solution looks like:** A forgetting policy per domain that moves notes from notes/ to a deep-archive/ (still recoverable, but excluded from search indices and MOCs). Not deletion — graduated obscurity.

### Governance Layer for Enterprise Domains

**Question:** What additional constraints apply when generated systems handle sensitive content in organizational contexts?

**Context:** Ethical guardrails exist for therapy (no diagnosis) and general content (privacy, transparency, autonomy). Enterprise use cases add: data classification, access control, audit trails, compliance requirements.

**Approach:** A governance feature block activated by organizational domain signals, adding content classification fields, access control metadata, audit trail requirements, retention policies, and compliance mapping.

### Multi-Domain Composition Rules Validation

**Question:** What are the limits of composing multiple domains in a single system?

**Context:** derivation-validation.md Test 4 demonstrates Research + Relationships composition. The five composition rules are stated but not exhaustively tested.

**Approach:** Systematic testing of composition pairs (Research + Therapy, PM + Creative, Learning + Companion, three-domain compositions) to build a composition compatibility matrix showing which domain pairs compose cleanly, which require adaptation, and which conflict.

### Background Compute Integration

**Question:** How should generated systems leverage background processing (sleep/nightly pipelines)?

**Context:** The components blueprint includes a "Sleep Skill" for nightly processing. But integration with platform scheduling is not generated — it's left to the user. Temporal separation of capture and processing is one of the strongest patterns from the research.

**Approach:** A `sleep-pipeline` feature block that generates scheduling configuration, sleep skill, and morning briefing template, activated when processing >= moderate.

### Optimal Context File Size

**Question:** Is there a point where the generated CLAUDE.md becomes counterproductive?

**Context:** Our vault's CLAUDE.md is ~30KB. Generated context files are 5-15KB depending on feature blocks. At some point, methodology instructions may crowd out task-relevant context.

**Approach:** Test generated systems at various context file sizes on standard vault operations. Measure: task completion quality, hallucination rate, methodology compliance, context window utilization.

---

## Priority Assessment

| Question | Impact | Feasibility | Priority |
|----------|--------|-------------|----------|
| Constraint-surprise metric | High — affects all derivations | Medium — needs formalization | High |
| Graph density scoring | High — affects all health checks | Medium — needs quality metrics | High |
| Context-Bench integration | High — enables objective measurement | Medium — needs test harness | High |
| MOC split/merge thresholds | Medium — affects maintenance | Medium — community detection is well-studied | Medium |
| Cross-platform hook equivalence | Medium — affects portability | High — engineering problem | Medium |
| Personality drift detection | Medium — affects user trust | Medium — needs linguistic analysis | Medium |
| Background compute | Medium — enables sleep pipeline | High — well-understood scheduling | Medium |
| Governance layer | High for enterprise — blocking for adoption | Medium — domain expertise needed | Medium |
| Multi-domain composition rules | Medium — affects advanced users | Medium — systematic testing needed | Medium |
| Optimal context file size | Medium — affects all generated systems | High — empirical testing | Medium |
| Vocabulary quality metrics | Low — current approach works | Medium — needs user testing | Low |
| Selective forgetting | Medium — affects long-term health | Low — needs longitudinal data | Low |
| Multi-agent collaboration | High — next capability frontier | Low — needs coordination primitives | Low (future) |
| DialogComplete model | High — but speculative | Low — needs prerequisite metrics | Low (future) |

---

## Integration with the Derivation Engine

The derivation engine references this document in three situations:

1. **User asks about a deferred feature:** The engine explains the feature, why it's deferred, and the current workaround (if any). It does not pretend the feature exists.

2. **Architect command encounters an open question:** The command acknowledges the uncertainty and recommends the conservative approach. "We don't yet know the optimal context file size, so the recommendation is to start with the standard template and adjust based on observed friction."

3. **Reseed considers open research:** When new research claims address an open question, the reseed audit mode flags it: "New evidence about optimal context file size — consider reviewing your context file length."

---

## Cross-Reference

- **Research claims that ground these questions:** See `claim-map.md` for TFT research claims referenced throughout.
- **Interaction constraints that complicate answers:** See `interaction-constraints.md` — many open questions involve dimension interactions.
- **Failure modes these questions would prevent:** See `failure-modes.md` for the failure modes that better metrics would detect earlier.
- **Current validation tests:** See `derivation-validation.md` for the 4 worked tests that validate the derivation engine today.
- **Personality layer questions:** See `personality-layer.md` for how personality drift detection relates to the encoding format.
- **Three-space architecture questions:** See `three-spaces.md` for the memory type routing that selective forgetting would extend.
