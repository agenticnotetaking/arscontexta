---
description: An 'answers' YAML field listing questions a note answers could enable question-driven search rather than keyword-driven search
kind: research
topics: ["[[discovery-retrieval]]"]
source: TFT research corpus (00_inbox/heinrich/)
---

The pattern comes from Cornell Note-Taking, where the cue column stores questions and the note area stores answers. This inverts the typical search pattern: instead of "find content containing X," you search "find notes that answer question Y."

An `answers:` YAML field containing 1-3 questions that a note answers would enable question-driven retrieval. Rather than matching keywords to content, agents could match their current question directly to notes that explicitly declare "I answer this."

Proposed implementation:

```yaml
answers:
  - "why do descriptions work as retrieval filters?"
  - "what makes a good note description?"
```

This could enable Socratic navigation: follow questions to answers to new questions. An agent at a reassessment point (see [[queries evolve during search so agents should checkpoint]]) could match "what question am I now asking?" directly to notes that answer it.

The key question is whether this question framing provides genuine signal beyond what [[descriptions are retrieval filters not summaries]] already captures. Since [[faceted classification treats notes as multi-dimensional objects rather than folder contents]], Ranganathan's independence test provides a formal way to evaluate this: does the answers field classify along an axis genuinely independent of existing fields (description, type, topics)? If "what questions does this answer" correlates highly with "what does the description say," it's a redundant facet that adds ceremony without retrieval power. But if question framing captures a dimension that descriptions miss -- the user's need rather than the note's content -- it would pass the independence test and earn its place as an orthogonal facet.

If question-matching works, it would add a new dimension to [[progressive disclosure means reading right not reading less]]: question-matching becomes an even faster filter than description scanning.
---

Relevant Notes:
- [[descriptions are retrieval filters not summaries]] — the existing retrieval mechanism this would extend; both derive from Cornell Note-Taking's cue column pattern
- [[queries evolve during search so agents should checkpoint]] — answers field enables question-matching at checkpoints; what question am I now asking? matches directly to notes that answer it
- [[spreading activation models how agents should traverse]] — answers field adds an activation dimension: question-matching creates implicit links from queries to answers, complementing wiki link traversal
- [[progressive disclosure means reading right not reading less]] — answers field adds a new disclosure layer: question-matching as an even faster filter than description scanning
- [[maturity field enables agent context prioritization]] — sibling research direction from same batch exploring TFT patterns for agent optimization; both extend progressive disclosure with new YAML metadata dimensions
- [[trails transform ephemeral navigation into persistent artifacts]] — sibling experiment testing persistent metadata for retrieval; trails persist paths, answers persist retrieval cues
- [[the generation effect requires active transformation not just storage]] — writing the answers field IS generative processing; even if retrieval gains are marginal, question generation creates cognitive hooks that passive description writing might not
- [[processing effort should follow retrieval demand]] — if validated, the answers field would improve JIT retrieval accuracy; questions provide a pre-computed retrieval cue that makes demand-driven processing more efficient
- [[faceted classification treats notes as multi-dimensional objects rather than folder contents]] — independence test: Ranganathan's framework provides the formal criterion for whether an answers field earns its place as a genuinely orthogonal facet rather than redundant metadata that correlates with existing fields

Topics:
- [[discovery-retrieval]]
