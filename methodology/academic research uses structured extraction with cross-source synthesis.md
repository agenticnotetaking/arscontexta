---
description: Academic research knowledge system — inspirational composition showing derived architecture for literature reviews, claim extraction, and cross-source synthesis
kind: example
domain: research
topics: ["[[domain-compositions]]"]
---

# academic research uses structured extraction with cross-source synthesis

An academic researcher needs a system that does more than store papers. The real work is synthesis: extracting claims from sources, connecting them across disciplines, detecting when findings conflict, and maintaining the provenance chain from raw data to published argument. Human researchers lose this thread constantly — they read a paper, highlight passages, file it by topic, and six months later can't remember which study demonstrated what. The agent doesn't forget. It maintains the full citation graph, detects contradictions exhaustively, and flags when new evidence invalidates old synthesis.

## Persona

Dr. Maren Engel is a cognitive science postdoc studying attention allocation in human-AI collaboration. Her research sits at the intersection of cognitive psychology, HCI, and AI systems — three fields that use different vocabulary for overlapping phenomena. She reads 15-20 papers per week, attends two lab meetings, and is writing three papers simultaneously. Her current pain: she knows she read something about divided attention in multitasking interfaces, but she organized her notes by paper, not by concept. Finding the specific claim means re-reading five papers. Her literature reviews go stale because she writes them once and never updates as new evidence arrives.

What Maren needs is a system where claims are the atomic unit, not papers. Where "attention degrades nonlinearly after the third concurrent task" lives as a node she can link to from any paper, any draft, any argument — with full provenance back to the original study. Where the agent can tell her: "Three papers in your vault measured attention degradation in multi-task environments. Henderson 2024 and Park 2025 agree on nonlinear degradation, but Li 2025 found linear degradation with expert participants. This is an unresolved tension."

## Configuration

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| Granularity | Atomic (one claim per note) | Academic synthesis requires recombinable claims. A compound note about "Henderson 2024" locks claims together — but Maren needs to cite Henderson's method in one paper and Henderson's finding in another. Atomic claims enable this. |
| Organization | Flat with MOC overlay | Concept-based organization beats source-based. Notes organized by "who wrote it" prevent cross-source synthesis. Flat files with wiki links let the same claim appear in multiple conceptual contexts without folder conflicts. |
| Linking | Explicit with typed relationships + semantic discovery | Academic relationships are specific: "replicates," "contradicts," "extends," "provides evidence for." Untyped "see also" links lose the relationship that matters. Semantic search supplements manual linking to catch cross-vocabulary connections (the HCI paper using "cognitive load" connects to the psych paper using "working memory capacity"). |
| Metadata | Dense — methodology, source, confidence, replication status | Academic claims need provenance. A claim without methodology attribution is gossip. Dense schema enables queries like "find all claims from randomized controlled trials with sample size > 100" — the kind of systematic review query that makes the vault a research instrument. |
| Processing | Heavy — full extract/reflect/reweave/verify pipeline | Every source gets deep extraction. Claims are cross-referenced against all existing claims. Synthesis notes get updated when underlying claims change. This is the full processing investment because academic work compounds through connections. |
| Formalization | High — explicit schemas, validation, templates | Academic rigor demands it. A claim note without methodology and confidence fields is incomplete. Schema validation catches drift before it corrupts the evidence base. Templates enforce the minimum viable metadata for every note type. |
| Review | Quarterly deep review + event-triggered updates | Core concepts evolve slowly, but new papers arrive weekly. Event-triggered review (new paper contradicts existing claim) supplements quarterly systematic review. Literature reviews get freshness checks — if underlying claims changed, the synthesis is stale. |
| Scope | Domain-focused with cross-discipline bridges | Maren's three fields (cognitive psych, HCI, AI systems) each have their own vocabulary. The vault bridges them: a claim from cognitive psych about attention limits connects to an HCI finding about interface design because the agent sees the semantic relationship across vocabularies. |

## Vault Structure

```
vault/
├── 00_inbox/
│   ├── papers/                          # PDFs and paper notes awaiting processing
│   │   ├── 2026-02-henderson-attention-allocation.md
│   │   ├── 2026-01-park-multitask-interfaces.md
│   │   └── 2026-02-li-expert-attention.md
│   ├── seminars/                        # seminar and lab meeting notes
│   │   └── 2026-02-12-lab-meeting-embodied-cognition.md
│   └── ideas/                           # research sparks before processing
│       └── cross-modal-attention-hypothesis.md
├── 01_thinking/                         # flat — all claims, MOCs, syntheses
│   ├── index.md                         # hub MOC
│   ├── attention-allocation.md          # topic MOC
│   ├── cognitive-load.md                # topic MOC
│   ├── human-ai-collaboration.md        # domain MOC
│   ├── methodology-comparison.md        # topic MOC
│   ├── attention degrades nonlinearly after the third concurrent task.md
│   ├── divided attention costs increase when modalities overlap.md
│   ├── expert performers show linear not nonlinear attention degradation.md
│   ├── interface complexity mediates attention allocation more than task count.md
│   ├── ecological validity problems plague most lab-based attention studies.md
│   ├── self-reported cognitive load correlates poorly with physiological measures.md
│   └── ... (claim notes, tension notes, methodology notes)
├── 02_archive/
│   ├── references/
│   │   ├── articles/                    # archived paper metadata
│   │   │   ├── henderson-2024-attention-allocation-multitask.md
│   │   │   ├── park-2025-interface-design-cognitive-load.md
│   │   │   └── li-2025-expert-attention-linear.md
│   │   └── books/
│   │       └── kahneman-2011-thinking-fast-slow.md
│   └── literature-reviews/              # completed lit review snapshots
│       └── 2025-q4-attention-allocation-review.md
├── 03_writing/                          # active manuscripts
│   ├── drafts/
│   │   ├── attention-degradation-paper/
│   │   │   ├── draft-v3.md
│   │   │   └── reviewer-comments-r1.md
│   │   └── cross-modal-attention-paper/
│   │       └── outline.md
│   └── published/
│       └── engel-2025-attention-interfaces.md
├── 04_meta/
│   ├── logs/
│   │   ├── observations.md
│   │   ├── observations/
│   │   ├── tensions.md
│   │   └── tensions/
│   ├── templates/
│   │   ├── claim-note.md
│   │   ├── source-capture.md
│   │   ├── literature-review.md
│   │   ├── methodology-note.md
│   │   └── tension-note.md
│   ├── tasks/
│   │   ├── queue.json
│   │   └── archive/
│   └── scripts/
│       ├── citation-graph.sh
│       ├── replication-status.sh
│       └── stale-synthesis.sh
└── self/
    ├── research-identity.md
    ├── methodology-preferences.md
    └── active-threads.md
```

## Note Schemas

### Claim Note (the primary unit)

```yaml
---
description: Divided attention costs in multi-task environments increase superlinearly when two tasks share the same sensory modality but remain additive when modalities differ
methodology: ["Cognitive Psychology", "Experimental"]
source: "[[henderson-2024-attention-allocation-multitask]]"
confidence: high
evidence_type: experimental
sample_size: 142
replication_status: replicated
classification: closed
topics: ["[[attention-allocation]]", "[[cognitive-load]]"]
relevant_notes:
  - "[[attention degrades nonlinearly after the third concurrent task]] — extends: specifies the modality condition under which nonlinearity appears"
  - "[[expert performers show linear not nonlinear attention degradation]] — contradicts: this finding holds for novices but experts show different pattern"
  - "[[interface complexity mediates attention allocation more than task count]] — enables: provides the mechanism explanation for why complexity matters more"
---
```

### Source Capture (paper metadata)

```yaml
---
description: Henderson et al 2024 — experimental study of attention allocation across concurrent tasks using eye tracking and dual-task paradigms (N=142)
source_type: journal-article
title: "Attention Allocation in Multi-Task Environments: Modality-Specific Costs"
authors: ["Henderson, K.", "Nakamura, T.", "Fischer, R."]
year: 2024
journal: "Journal of Experimental Psychology: Human Perception and Performance"
doi: "10.1037/xhp0001234"
status: deep-read
read_date: 2026-01-15
claims_extracted: 4
key_methods: ["dual-task paradigm", "eye tracking", "NASA-TLX"]
topics: ["[[attention-allocation]]"]
---
```

### Literature Review

```yaml
---
description: Systematic review of attention allocation research 2020-2025 covering 34 sources — identifies the modality-specificity consensus and the expert-novice gap
type: literature-review
scope: "Attention allocation in multi-task and multi-interface environments"
sources_covered: 34
date_range: "2020-2025"
last_updated: 2026-01-20
status: active
gaps_identified:
  - "No studies combining real-world tasks with physiological attention measures"
  - "Expert-novice differences understudied in AI-assisted contexts"
synthesis_statement: "Modality-specific costs are well-established for novices but the expert pattern remains contested"
freshness_check: "3 underlying claims updated since last review — needs revision"
topics: ["[[attention-allocation]]", "[[methodology-comparison]]"]
---
```

### Tension Note

```yaml
---
description: Henderson 2024 finds nonlinear attention degradation while Li 2025 finds linear degradation in experts — the expertise variable may dissolve the contradiction or reveal a genuine moderation effect
observed: 2026-02-10
involves:
  - "[[attention degrades nonlinearly after the third concurrent task]]"
  - "[[expert performers show linear not nonlinear attention degradation]]"
status: open
resolution_candidates:
  - "Moderation by expertise level (both correct for their populations)"
  - "Methodological difference (Li used simulated tasks, Henderson used real-world)"
  - "Sample difference (Li's experts had 10+ years, Henderson's had 2-5)"
topics: ["[[attention-allocation]]"]
---
```

### Methodology Note

```yaml
---
description: Dual-task paradigm as attention measure — strengths in ecological control, weaknesses in artificiality, reliability concerns when tasks are not matched for difficulty
type: methodology
tradition: Cognitive Psychology
first_used: "Pashler, 1994"
strengths:
  - "Controlled measurement of attention allocation"
  - "Well-established norms for comparison"
weaknesses:
  - "Lab tasks may not generalize to real-world multitasking"
  - "Difficulty matching confounds comparisons across studies"
used_in: ["[[henderson-2024-attention-allocation-multitask]]", "[[li-2025-expert-attention-linear]]"]
topics: ["[[methodology-comparison]]"]
---
```

## Example Notes

### Example 1: Atomic Claim Note

```markdown
---
description: Divided attention costs in multi-task environments increase superlinearly when two tasks share the same sensory modality but remain additive when modalities differ
methodology: ["Cognitive Psychology", "Experimental"]
source: "[[henderson-2024-attention-allocation-multitask]]"
confidence: high
evidence_type: experimental
sample_size: 142
replication_status: replicated
classification: closed
topics: ["[[attention-allocation]]", "[[cognitive-load]]"]
relevant_notes:
  - "[[attention degrades nonlinearly after the third concurrent task]] — extends: specifies the modality condition under which nonlinearity appears"
  - "[[expert performers show linear not nonlinear attention degradation]] — contradicts: this finding holds for novices but experts show different pattern"
  - "[[interface complexity mediates attention allocation more than task count]] — enables: provides the mechanism explanation for why complexity matters more"
---

# divided attention costs increase when modalities overlap

The central finding from Henderson et al. 2024 is that attention doesn't just degrade with more tasks — it degrades *differently* depending on whether tasks compete for the same sensory channel. Two visual tasks competing for foveal attention produce superlinear costs: performance on each drops more than half, because eye movements become the bottleneck. But a visual task paired with an auditory task shows roughly additive costs: each task takes its expected toll independently.

This matters because since [[attention degrades nonlinearly after the third concurrent task]], the natural question was always "nonlinear how?" The answer appears to be modality-specific bottlenecks. When two tasks need the same perceptual resource — the same part of the visual field, the same auditory channel — they compete destructively. When they need different resources, they coexist with independent costs.

The implication for interface design is direct. Since [[interface complexity mediates attention allocation more than task count]], a well-designed multi-panel interface should distribute information across modalities. An air traffic control display that combines visual radar with auditory alerts should produce less degradation than one that presents all information visually — even though the total information load is identical.

However, this finding has a significant boundary condition. Since [[expert performers show linear not nonlinear attention degradation]], the superlinear modality effect may be specific to novice performers. Li 2025 found that expert operators (10+ years experience) showed linear degradation even with same-modality tasks, suggesting that expertise either creates modality-independent processing strategies or automates perceptual parsing enough to eliminate the bottleneck. This creates an unresolved tension: is the modality effect a fundamental constraint or a trainable limitation?

The methodological grounding is solid — Henderson used both eye tracking and NASA-TLX self-report, and the eye tracking data shows the modality effect even when self-report doesn't detect it. Since [[self-reported cognitive load correlates poorly with physiological measures]], the physiological confirmation strengthens the claim.

---

Source: [[henderson-2024-attention-allocation-multitask]]
```

### Example 2: Synthesis Note

```markdown
---
description: Three independent measurement approaches to cognitive load (physiological, behavioral, self-report) produce systematically different pictures of the same phenomenon, suggesting load is not a unitary construct
methodology: ["Cognitive Psychology", "Measurement Theory"]
confidence: moderate
classification: open
topics: ["[[cognitive-load]]", "[[methodology-comparison]]"]
relevant_notes:
  - "[[self-reported cognitive load correlates poorly with physiological measures]] — foundation: the specific finding this synthesis builds on"
  - "[[divided attention costs increase when modalities overlap]] — evidence: Henderson's eye-tracking data showed modality effects invisible to self-report"
  - "[[ecological validity problems plague most lab-based attention studies]] — constrains: if lab tasks produce different load profiles than real tasks, measurement divergence may be partly artifactual"
---

# cognitive load may be three constructs not one

The standard assumption in cognitive science is that "cognitive load" is a single dimension that different instruments measure with varying accuracy. The NASA-TLX captures subjective experience. Eye tracking captures visual attention allocation. Heart rate variability captures autonomic stress response. The expectation is that these should correlate — they're all measuring the same thing, just through different windows.

They don't correlate well. And the pattern of divergence isn't random — it's systematic.

Since [[self-reported cognitive load correlates poorly with physiological measures]], the divergence has been known for decades. But treating it as a "measurement problem" — NASA-TLX is less accurate than physiological measures — may be the wrong frame. What if the instruments don't agree because they're measuring genuinely different things?

Consider the evidence from Henderson's modality study. Since [[divided attention costs increase when modalities overlap]], eye tracking reveals modality-specific bottlenecks that participants don't report experiencing. The superlinear cost of same-modality dual tasks is invisible to introspection but obvious in gaze data. This isn't measurement noise — it's a systematic dissociation between experienced load and perceptual-motor load.

The implication is that "cognitive load" might decompose into at least three constructs:

1. **Perceptual-motor load** — competition for sensory channels and motor effectors, measurable through behavioral and physiological methods, largely opaque to introspection
2. **Executive load** — demands on central executive resources (working memory, task switching), partially accessible to self-report, measurable through dual-task costs
3. **Experienced load** — the subjective sense of difficulty, fully accessible to self-report, influenced by factors beyond actual performance (anxiety, motivation, metacognitive beliefs)

If this decomposition is correct, the question "is this interface high cognitive load?" has three different answers depending on which construct you mean. A system could impose high perceptual-motor load (many visual elements competing for fixation) while producing low experienced load (the user feels comfortable) — which is exactly what expertise does. Since [[expert performers show linear not nonlinear attention degradation]], expertise may specifically reduce perceptual-motor load while leaving executive load unchanged.

This is speculative. The three-construct model needs its own empirical test. But it reframes how the vault should organize load-related claims: not as a single dimension where measurements disagree, but as three dimensions where measurements correctly capture different phenomena.

---

Source: [[henderson-2024-attention-allocation-multitask]], [[li-2025-expert-attention-linear]]
```

### Example 3: Topic MOC

```markdown
---
description: Claims about how attention is distributed across concurrent tasks and interfaces — the core phenomenon Maren's research investigates
type: moc
topics: ["[[human-ai-collaboration]]"]
---

# attention-allocation

How attention divides across concurrent tasks is the central question of Maren's research program. The vault tracks three converging threads: the modality-specificity of attention costs, the expert-novice divide, and the measurement problem. These threads interact — expertise may change modality-specific costs, and measurement choice determines which costs you see.

## Core Ideas

- [[divided attention costs increase when modalities overlap]] — the modality-specificity finding that reframes attention degradation from "how many tasks" to "which sensory channels compete"
- [[attention degrades nonlinearly after the third concurrent task]] — the foundational finding that costs are not additive, now qualified by modality conditions
- [[expert performers show linear not nonlinear attention degradation]] — the expertise boundary condition that may dissolve the nonlinearity finding for trained operators
- [[interface complexity mediates attention allocation more than task count]] — the design implication: reduce complexity per panel rather than reducing panel count
- [[cognitive load may be three constructs not one]] — synthesis note arguing load decomposition based on measurement divergence

## Tensions

The expert-novice divide is the central unresolved tension. Henderson 2024 and Li 2025 may both be correct for their populations, or Li's methodology (simulated tasks) may explain the divergence. Resolving this affects whether interface design should optimize for novice patterns (modality separation) or assume expertise development (modality-agnostic design).

The measurement problem cuts across everything: which findings depend on the measurement instrument? If self-reported cognitive load misses modality effects, how many other phenomena are invisible to self-report?

## Explorations Needed

- No studies combining AI-assisted attention (where the AI handles some monitoring) with modality-specific measurements — this is the gap Maren's third paper targets
- Cross-cultural replication: all major studies used Western university populations
- Longitudinal expertise development: at what point does the nonlinear pattern shift to linear?

---

Agent Notes:
When traversing this topic, always check methodology-comparison for measurement-related caveats. Many claims in this MOC have boundary conditions that depend on measurement choice. The three-construct synthesis note is speculative — weight it accordingly when building arguments.
```

### Example 4: Tension Note

```markdown
---
description: Henderson 2024 finds nonlinear attention degradation while Li 2025 finds linear degradation in experts — the expertise variable may dissolve the contradiction or reveal a genuine moderation effect
observed: 2026-02-10
involves:
  - "[[attention degrades nonlinearly after the third concurrent task]]"
  - "[[expert performers show linear not nonlinear attention degradation]]"
status: open
topics: ["[[attention-allocation]]"]
relevant_notes:
  - "[[divided attention costs increase when modalities overlap]] — context: Henderson's modality finding suggests the mechanism behind the nonlinearity"
  - "[[ecological validity problems plague most lab-based attention studies]] — complicates: if lab tasks misrepresent real-world attention demands, the disagreement may be artifactual"
---

# attention degradation may be nonlinear for novices but linear for experts

Two well-designed studies reach opposite conclusions about attention degradation patterns. Henderson et al. 2024 (N=142, university students, real-world-inspired tasks) found superlinear degradation after three concurrent tasks. Li et al. 2025 (N=68, professional operators with 10+ years experience, simulated control tasks) found linear degradation across all task counts tested (2-7 concurrent tasks).

### Quick Test

Are both findings reliable independently? Henderson's large sample and converging measures (eye tracking + behavioral + self-report) are strong. Li's smaller sample but highly specific expert population is appropriate for the question asked. Neither study has obvious methodological flaws.

### When Each Pole Wins

If expertise moderates the effect, both are correct: nonlinear for novices, linear for experts. This would mean interface design must target the user's expertise level — a training implication, not just a design implication.

If methodology explains the difference (Li's simulated tasks vs Henderson's realistic tasks), the expertise finding is confounded. Simulated tasks may be inherently more predictable, reducing the nonlinear surprise component of attention costs.

If sample explains it (Li's experts had 10+ years, Henderson's participants had 2-5 years of general task experience), there may be a threshold effect: degradation is nonlinear until sufficient expertise is acquired, then transitions to linear.

### Dissolution Attempts

The modality-specificity finding from Henderson helps: since [[divided attention costs increase when modalities overlap]], the nonlinearity may be specifically about modality competition. Li's expert operators may have learned modality-independent processing strategies that eliminate the bottleneck — they've automated the perceptual parsing step. This would explain both findings without contradiction: nonlinearity exists at the perceptual-motor level, expertise eliminates it through automation of perceptual routines.

### Practical Implications

Until resolved, interface design should assume nonlinear costs for general populations. For expert-targeted systems (air traffic control, surgical interfaces, trading platforms), linear cost assumptions may be appropriate. Since [[interface complexity mediates attention allocation more than task count]], the practical recommendation is the same either way: reduce per-task complexity rather than limiting task count.

---

Source: [[henderson-2024-attention-allocation-multitask]], [[li-2025-expert-attention-linear]]
```

### Example 5: Source Capture Note

```markdown
---
description: Henderson et al 2024 — experimental study of attention allocation across concurrent tasks using eye tracking and dual-task paradigms (N=142)
source_type: journal-article
title: "Attention Allocation in Multi-Task Environments: Modality-Specific Costs"
authors: ["Henderson, K.", "Nakamura, T.", "Fischer, R."]
year: 2024
journal: "Journal of Experimental Psychology: Human Perception and Performance"
doi: "10.1037/xhp0001234"
status: deep-read
read_date: 2026-01-15
claims_extracted: 4
key_methods: ["dual-task paradigm", "eye tracking", "NASA-TLX"]
quality_assessment: "Strong methodology. Large sample for attention research. Converging measures strengthen findings. Main limitation: university student sample limits generalizability to expert populations."
topics: ["[[attention-allocation]]"]
relevant_notes:
  - "[[divided attention costs increase when modalities overlap]] — primary finding extracted"
  - "[[attention degrades nonlinearly after the third concurrent task]] — supporting finding extracted"
  - "[[self-reported cognitive load correlates poorly with physiological measures]] — methodological finding extracted"
---

# Henderson 2024 — Attention Allocation in Multi-Task Environments

## Key Arguments

Henderson et al. tested whether attention degradation in multi-task environments follows the same pattern across sensory modalities. Using a dual-task paradigm with eye tracking, they found that same-modality task pairs produce superlinear costs while cross-modality pairs produce additive costs. The modality-specificity finding reframes the attention degradation question from "how many tasks" to "which tasks compete for the same channel."

## Relevance to Research

This is the foundational paper for Maren's modality-specific attention framework. The finding that eye tracking detects modality effects invisible to self-report motivates the three-construct decomposition of cognitive load. The cross-modality additive finding has direct implications for interface design — the attention-degradation paper (draft v3) builds its design recommendations on this.

## Methodological Notes

Three measurement streams (eye tracking, behavioral performance, NASA-TLX) with planned triangulation. The dissociation between physiological and self-report measures is itself a finding, not just a methodological curiosity. Sample was 142 university undergraduates — sufficient for between-subjects modality comparisons but limits generalizability to expert populations.

---

Source: https://doi.org/10.1037/xhp0001234
```

## Processing Workflow

### Capture

Papers enter `00_inbox/papers/` as markdown source captures with full bibliographic metadata. Seminar notes enter `00_inbox/seminars/`. Research sparks enter `00_inbox/ideas/`. Speed of capture beats precision of filing — get the metadata right (authors, year, DOI) and move on.

### Reduce (Extraction)

The agent reads each source through the research lens: "What atomic claims does this source make? What evidence supports each claim? What methodology was used?" Every substantive finding becomes a claim note. Every methodological observation becomes a methodology note or enriches an existing one.

The extraction is exhaustive for the research domain. A 20-page paper typically yields 3-8 claim notes, 1-2 methodology observations, and 0-2 tension identifications. The agent checks each candidate claim against existing notes: "Does this replicate, extend, or contradict something already in the vault?" Near-duplicates become enrichments rather than new notes.

**Domain-specific extraction categories:**
- Empirical findings with evidence (claim notes)
- Methodological innovations or limitations (methodology notes)
- Contradictions with existing claims (tension notes)
- Replication results (enrich existing claims with replication status)
- Review/meta-analysis results (literature review notes)

### Reflect (Connect Forward)

For each new claim, the agent searches the existing vault for connections. In academic research, connections are typed: "replicates," "contradicts," "extends," "provides evidence for," "uses same methodology as." The agent uses semantic search to find cross-vocabulary connections — a cognitive psychology finding about "resource competition" connects to an HCI finding about "interface contention" because the agent recognizes the underlying concept.

MOC updates happen here. Every claim gets placed in its topic MOC(s) with a context phrase explaining why it belongs. The agent updates the Tensions section if the new claim conflicts with existing thinking. The Explorations Needed section gets updated if the new claim reveals a gap.

### Reweave (Connect Backward)

Older notes get updated with connections to new claims. A claim written three months ago about attention degradation now needs a link to the new modality-specificity finding. The agent also checks: has understanding evolved enough that the older claim needs rewriting? Is the older synthesis note still valid given new evidence?

**Academic-specific reweaving:** Literature reviews get freshness checks. If a synthesis note's underlying claims have changed — new evidence, contradictions discovered, replication failures — the synthesis is flagged as stale. The agent can tell Maren: "Your attention allocation literature review cites 34 sources. Since you wrote it, 3 claims have been updated and 1 new contradiction was discovered. The synthesis statement may need revision."

### Verify

Combined verification: description quality (would searching for this claim find it?), schema compliance (does every claim have methodology and source?), structural health (orphan detection, link integrity). Academic-specific checks include: provenance chain verification (every claim traces to a source), replication status currency (has a cited finding been replicated or challenged?), and stale synthesis detection.

## MOC Structure

```
index.md (Hub)
├── human-ai-collaboration.md (Domain MOC)
│   ├── attention-allocation.md (Topic MOC)
│   ├── cognitive-load.md (Topic MOC)
│   ├── interface-design-patterns.md (Topic MOC)
│   └── trust-calibration.md (Topic MOC)
├── methodology-comparison.md (Topic MOC — cross-cutting)
│   ├── measurement-instruments.md (Sub-topic if it grows)
│   └── study-design-patterns.md (Sub-topic if it grows)
└── meta-research.md (Topic MOC)
    ├── replication-crisis.md (Topic MOC)
    └── publication-bias.md (Topic MOC)
```

### Example Hub MOC

```markdown
---
description: Entry point for Maren's research vault — three research threads and supporting infrastructure
type: moc
topics: []
---

# index

Maren's research sits at the intersection of cognitive science and human-AI interaction. Three threads converge: how attention allocates across concurrent tasks, how cognitive load should be measured and modeled, and how AI assistance changes both.

## Research Domains

- [[human-ai-collaboration]] — the primary research program: how humans and AI systems share cognitive work, with attention allocation as the core phenomenon
- [[methodology-comparison]] — cross-cutting: which measurement instruments capture which phenomena, and where they disagree
- [[meta-research]] — the research environment itself: replication, publication bias, methodological evolution

## Infrastructure

- [[active-threads]] — what Maren is working on right now
- [[observations]] — operational learnings from running this vault
- [[tensions]] — unresolved conflicts between findings
```

## Graph Query Examples

```bash
# Find all claims from a specific source
rg '^source:.*henderson-2024' vault/01_thinking/

# Find unreplicated high-confidence claims (potential priorities for review)
rg -l '^confidence: high' vault/01_thinking/ | xargs rg -l '^replication_status: unreplicated'

# Find all open tensions (unresolved contradictions between findings)
rg -l '^status: open' vault/04_meta/logs/tensions/

# Find stale literature reviews (underlying claims changed since review)
rg '^freshness_check:.*needs revision' vault/01_thinking/ vault/02_archive/literature-reviews/

# Find all claims using a specific methodology (for methodology comparison)
rg '^key_methods:.*eye tracking' vault/02_archive/references/articles/

# Find sources read but with zero claims extracted (possibly under-processed)
rg -l '^claims_extracted: 0' vault/02_archive/references/articles/

# Count claims per topic MOC to detect imbalanced coverage
for moc in vault/01_thinking/*.md; do
  if rg -q '^type: moc' "$moc"; then
    name=$(basename "$moc" .md)
    count=$(rg -c "\[\[$name\]\]" vault/01_thinking/ 2>/dev/null | awk -F: '{s+=$2}END{print s+0}')
    echo "$count $name"
  fi
done | sort -rn
```

## What Makes This Domain Unique

**Provenance is non-negotiable.** In most knowledge domains, "where did this idea come from?" is nice to know. In academic research, it's the difference between a valid argument and unsubstantiated opinion. Every claim traces back through a verifiable chain: claim note → source capture → DOI → published paper. The agent maintains this chain automatically and detects when it breaks.

**Contradiction is productive, not destructive.** In personal journaling, two conflicting entries are just growth. In project management, conflicting decisions are a bug. In academic research, contradictions between findings are the most valuable signals in the vault — they point to unresolved questions, boundary conditions, and publication-worthy synthesis opportunities. The tension tracking system is not a debugging tool here, it's a research generator.

**Cross-vocabulary synthesis is the killer feature.** Cognitive psychology calls it "resource competition." HCI calls it "interface contention." Neuroscience calls it "neural channel capacity." These are the same phenomenon described in different professional vocabularies. The agent's semantic search connects them; a human researcher working in one tradition may never encounter the others.

## Agent-Native Advantages

### Exhaustive Cross-Referencing at Ingest

When Maren reads a new paper, she connects it to the 5-10 papers she remembers being relevant. The agent connects it to every paper in the vault. At 200 sources, a human researcher can't hold the full citation graph in working memory. The agent can. This means:

- Every new claim is checked against every existing claim, not just the ones Maren happens to remember
- Contradictions surface even when the conflicting studies use different vocabulary and were read months apart
- Cross-discipline connections emerge that a human working in one tradition would miss

This isn't just "better search." It's the difference between finding connections you were looking for and discovering connections you didn't know existed.

### Stale Synthesis Detection

Human researchers write literature reviews and then treat them as finished. The review goes stale silently — new papers arrive, findings get challenged, replications fail — but the review still reads as authoritative because no one is checking its foundations.

The agent monitors the dependency chain continuously. When a claim underlying a synthesis note gets updated, contradicted, or enriched, the synthesis note gets flagged. Maren doesn't have to remember to re-check her literature review — the vault tells her: "Your 2025-Q4 review's synthesis statement depends on 34 claims. Three have been modified since the review was written. Specifically: claim X now has a boundary condition from Li 2025, claim Y was enriched with replication data, and claim Z is involved in an unresolved tension."

This is programmatic provenance chain monitoring. A human would need to manually re-check every cited finding against the current state of knowledge. The agent does it as a background maintenance operation.

### Replication Status Tracking

The replication crisis means individual studies are unreliable. What matters is the pattern across studies: has this finding been replicated? By independent labs? With different populations? Using different methods?

The agent maintains replication status as a schema field on every claim. When a new paper reports a replication attempt, the agent updates the original claim's status and enriches it with the replication details. Over time, the vault accumulates a private replication database specific to Maren's research domain — not the abstract replication rates published in meta-analyses, but the specific status of every claim she builds arguments on.

This enables queries a human researcher can't feasibly run: "Show me every claim in my attention allocation argument that has NOT been independently replicated." That query might reveal that a seemingly well-supported argument rests on three unreplicated findings — a structural vulnerability invisible without exhaustive tracking.

### Methodology-Aware Connection Finding

The agent doesn't just find topically related claims — it finds claims that used the same methodology, enabling comparison. "What other studies used dual-task paradigms? What did they find compared to studies using different paradigms?" This isn't the same as a keyword search for "dual-task" — it's a structured query across the methodology field that returns claims organized by method, revealing whether findings are robust across methodological approaches or method-dependent.

When the agent detects that all supporting evidence for a claim comes from a single methodology, it flags this as a methodological dependency — the claim is only as strong as the method. This kind of structural vulnerability analysis requires the systematic metadata tracking that schema-dense academic notes enable.

### Citation Graph Analysis

The agent maintains not just individual citations but the citation graph — which papers cite each other, which findings depend on which. This enables impact analysis that no reference manager provides:

- When a paper is retracted, the agent identifies every claim in the vault that depends on it
- When Maren discovers a new paper, the agent shows where it fits in the existing citation structure: "This paper extends Henderson 2024 and contradicts Li 2025, placing it in the existing attention-degradation debate"
- When writing a paper, the agent can verify that the argument's citation chain is consistent: no circular citations, no citing-through-retracted-papers, no missing links between claims and evidence

This transforms the vault from a note collection into a live citation graph that a researcher can query, traverse, and use to verify the structural integrity of their arguments.
---

Topics:
- [[domain-compositions]]
