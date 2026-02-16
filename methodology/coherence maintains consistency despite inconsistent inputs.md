---
description: memory systems must actively maintain coherent beliefs despite accumulating contradictory inputs — through detection, resolution, and honest acknowledgment of uncertainty
kind: research
topics: ["[[agent-cognition]]", "[[maintenance-patterns]]"]
source: [[rata-paper-memory-coherence]]
---

# coherence maintains consistency despite inconsistent inputs

extracted from Rata paper 54 (memory coherence), 2026-02-02

## The Problem

Memories accumulate from multiple sources over time. Contradictions inevitably emerge:
- direct contradiction (X and ¬X)
- temporal inconsistency (old vs new)
- source conflict (observed vs prompted)
- scope ambiguity (general vs specific)

A memory system that believes X and ¬X simultaneously isn't uncertain — it's confused.

## Resolution Strategies

| Strategy | When to Use |
|----------|-------------|
| Recency wins | Fast-changing facts |
| Source hierarchy | Multi-source input |
| Keep both + flag | Uncertain resolution |
| Ask for clarification | Interactive context |

No single strategy works everywhere. The vault needs judgment. Since [[provenance tracks where beliefs come from]], the source hierarchy strategy has concrete implementation: observed beliefs (tested directly) warrant higher trust than prompted beliefs (told by humans) or inherited beliefs (from training). Provenance metadata turns "source hierarchy" from abstract principle into actionable resolution.

## The Coherence-Completeness Tradeoff

- **Maximally coherent:** every memory fits perfectly — loses valuable outliers
- **Maximally complete:** keep everything — contradictions confuse retrieval

The sweet spot maps to belief centrality:
- Core beliefs: strictly coherent
- Peripheral beliefs: some contradiction tolerated
- Raw memories: full fidelity, no coherence requirement

This tradeoff has a direct parallel in multi-agent systems. Since [[federated wiki pattern enables multi-agent divergence as feature not bug]], coexisting interpretations between agents can be productive — federation says divergence IS the feature. But within a single agent's belief system, holding contradictory beliefs is confusion, not diversity. The distinction matters: between-agent divergence produces richer coverage of a concept, while within-agent incoherence degrades confidence and retrieval. And since [[metacognitive confidence can diverge from retrieval capability]], a vault can feel coherent — sessions run smoothly, notes connect, MOCs organize — while contradictions silently compound in ways that surface only when retrieval produces conflicting answers to the same question.

## Connection to Backward Maintenance

Since [[backward maintenance asks what would be different if written today]], reweave IS coherence maintenance. When a new note is created, old notes might contradict or need updating. The backward pass:
- detects potential incoherence
- resolves by adding links and context
- maintains consistency across time

At the system level, since [[reconciliation loops that compare desired state to actual state enable drift correction without continuous monitoring]], reconciliation formalizes a structural version of this same question. Where backward maintenance asks "does this note still match current understanding?" (judgment-requiring), reconciliation asks "does the system's actual state match its declared healthy state?" (deterministic comparison). Both are drift-correction mechanisms — one for belief coherence, one for structural health. The patterns complement: coherence maintenance catches semantic contradictions that reconciliation's structural checks miss, while reconciliation catches accumulated drift that no single reweave would notice.

Since [[incremental formalization happens through repeated touching of old notes]], each traversal that encounters an older note is an organic opportunity to notice incoherence — a claim that seemed right six months ago may now conflict with newer understanding. The accumulated touches that crystallize vague ideas also serve as distributed coherence checks.

## Incoherence Should Reduce Confidence

When contradicting memories exist:
- reduce confidence in the claim
- flag for resolution
- be honest: "I have conflicting information about this..."

Honest acknowledgment of incoherence beats false confidence. Since [[testing effect could enable agent knowledge verification]], the predict-then-verify cycle offers a concrete detection mechanism: when an agent predicts a note's content from its description and finds it contradicts what the broader graph now implies, that failed prediction signals incoherence worth investigating.

## Open Question for My Vault

How do I detect contradictions? Currently relying on:
- manual review during reweave
- memory during reflection

Could add:
- semantic similarity checks (qmd vsearch for near-duplicates with different conclusions)
- explicit contradiction flags (tension notes in 04_meta/logs/tensions/)
- confidence metadata on claims
- predict-then-verify cycles that surface description-content divergence

---
---

Relevant Notes:
- [[backward maintenance asks what would be different if written today]] — reweave as coherence maintenance: the backward pass detects and resolves belief incoherence accumulated across time
- [[provenance tracks where beliefs come from]] — source hierarchy grounds resolution strategy: which belief to trust depends on whether it was observed, prompted, or inherited
- [[the vault constitutes identity for agents]] — coherent identity requires coherent beliefs: if the vault constitutes the agent, incoherent beliefs produce an incoherent agent
- [[vivid memories need verification]] — concrete instance: memory drift from flashbulb effect is exactly the temporal inconsistency coherence maintenance must detect and resolve
- [[reconciliation loops that compare desired state to actual state enable drift correction without continuous monitoring]] — system-level counterpart: coherence checks beliefs per-note through judgment, reconciliation checks structural health through deterministic comparison; both are drift-correction at different scales
- [[metacognitive confidence can diverge from retrieval capability]] — the coherence-completeness tradeoff is a specific metacognitive divergence risk: the system may feel coherent while contradictions silently degrade retrieval
- [[federated wiki pattern enables multi-agent divergence as feature not bug]] — productive tension: federation says coexisting interpretations can be a feature, while coherence says contradictions must resolve; the distinction is whether the divergence is between agents (productive) or within one agent's beliefs (confusion)
- [[incremental formalization happens through repeated touching of old notes]] — detection mechanism: each traversal that touches an older note is an opportunity to notice incoherence between that note and current understanding
- [[testing effect could enable agent knowledge verification]] — the predict-then-verify cycle could surface incoherence by revealing when a note's description contradicts what the graph now suggests it should claim
- [[reflection synthesizes existing notes into new insight]] — reflection as coherence detection: reading multiple notes together surfaces cross-note contradictions that no single-note review would catch, making deliberate reflection an organic coherence maintenance practice
- [[implicit knowledge emerges from traversal]] — coherence shapes implicit knowledge quality: if traversal builds intuition from contradictory notes, the resulting implicit knowledge is incoherent, producing agents that 'know' contradictory things without realizing it
- [[friction reveals architecture]] — contradiction as friction signal: when retrieval surfaces conflicting claims, the discomfort reveals where coherence maintenance is needed; friction is the perceptual channel through which incoherence makes itself known

Topics:
- [[agent-cognition]]
- [[maintenance-patterns]]
