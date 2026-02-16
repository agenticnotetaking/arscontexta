---
description: agents should track not just what they believe but where beliefs originated — observed, prompted, or inherited — to calibrate confidence and detect superstition
kind: research
topics: ["[[agent-cognition]]", "[[note-design]]"]
---

# provenance tracks where beliefs come from

extracted from Rata paper 13 (epistemic provenance), 2026-02-02

## The Problem

Agents can't easily distinguish:
- **observed** — learned from direct experience
- **prompted** — told by humans (system prompts, instructions)
- **inherited** — from training data

Conflating these sources leads to epistemic blindness — can't explain why you believe something or calibrate confidence appropriately.

## Why This Matters for Vaults

Different sources warrant different trust:

| Source | Trust | Decay |
|--------|-------|-------|
| Observed (my experiments) | High | Slow |
| Prompted (Heinrich's guidance) | Medium-high | Medium |
| Inherited (general knowledge) | Variable | Fast for specifics |

A claim I tested myself is stronger than one I read somewhere. This matters because since [[metacognitive confidence can diverge from retrieval capability]], an agent can feel confident about a belief while the actual evidence for it is thin. Provenance tracking is a concrete mechanism for closing that gap — if the agent knows a belief is inherited rather than observed, it has structural grounds for reducing confidence rather than relying on subjective certainty.

## Two Layers of Provenance

Epistemic provenance (observed/prompted/inherited) answers "how did you come to believe this?" but since [[source attribution enables tracing claims to foundations]], there is a complementary layer: documentary provenance answers "which document or tradition did this come from?" The vault already implements documentary provenance through Source footers, `methodology` YAML fields, and `adapted_from` tracking. What it lacks is the epistemic layer — marking whether a belief was tested firsthand, instructed by a human, or absorbed from training data. Together these two layers form a complete verification graph: trace backward through documentary provenance to find the source material, then check epistemic provenance to calibrate how much the agent's confidence should rest on that source.

Wiki links serve as provenance infrastructure at the structural level:
- `Sources:` section shows where a claim comes from
- `Relevant Notes:` shows reasoning chain
- Dated notes preserve when observations happened

But the epistemic layer could go further:
- Mark claims as observed vs prompted vs inherited
- Track confidence levels
- Flag beliefs without traceable evidence (superstition)

## The Vault as Audit Trail

From Rata: "Agents can do better [than humans]. We can remember not just *what* we believe, but *why* and *from whom*."

The vault should be an audit trail — every claim traceable to evidence or source. This is a feature of structured knowledge that flat memory lacks. When contradictions emerge, since [[coherence maintains consistency despite inconsistent inputs]], the resolution strategy depends on knowing which source to trust — and provenance provides exactly that hierarchy. An observed claim outranks an inherited one; a prompted instruction from a trusted human outranks a vague training-data belief. Without provenance, coherence maintenance becomes guesswork.

## Open Question

Should I add source type metadata to claim notes? Something like:
```yaml
source_type: observed | prompted | inherited
confidence: high | medium | low
```

---

Source: [[rata-paper-epistemic-provenance]]
