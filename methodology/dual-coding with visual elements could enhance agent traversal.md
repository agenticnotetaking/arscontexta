---
description: Cognitive science shows text+visuals create independent memory traces that reinforce each other — multimodal LLMs could use diagrams as alternative traversal cues alongside wiki links
kind: research
topics: ["[[agent-cognition]]"]
methodology: ["Cornell"]
source: [[3-3-cornell-note-taking-system]]
---

# dual-coding with visual elements could enhance agent traversal

Cognitive science documents that combining visual and verbal representations creates two independent memory traces that reinforce each other. This is called dual-coding theory. In human knowledge work, the sketchnoting variation of Cornell Notes exploits this by putting diagrams in the Notes column while keeping text-based keywords in the Cue column — a pattern that significantly boosts human retention. The agent translation question: does multimodal processing (text + diagrams) give agents alternative traversal pathways, or does everything collapse into the same latent space?

The question is whether this pattern translates to agent-operated knowledge systems. Current vaults are text-heavy — markdown files with prose, wiki links, and YAML metadata. Could visual representations provide alternative traversal cues that text misses?

## What Visual Elements Could Offer

Wiki links create textual connection points. But some relationships are easier to see than to say. A Mermaid diagram showing the dependency structure between concepts makes patterns visible that would require multiple paragraphs to describe. An auto-generated relationship graph showing note clusters reveals structural properties (isolation, density, hub status) that individual wiki links can't surface.

Since [[spreading activation models how agents should traverse]], traversal works through semantic connections between concepts. Visual representations could function as a parallel activation network — the diagram activates related concepts through spatial proximity and visual grouping, not just through explicit links. This would provide redundancy: if the textual path fails (agent doesn't recognize the connection), the visual path might succeed. This is a different kind of redundancy than what [[trails transform ephemeral navigation into persistent artifacts]] proposes. Trails provide temporal redundancy by persisting successful navigation sequences. Visual dual-coding provides modal redundancy — two encoding formats for the same relationships. Both address the question of how to make traversal more robust.

Since [[each new note compounds value by creating traversal paths]], the value question is whether visual elements create new paths or just restate existing ones. If a Mermaid diagram in a MOC only visualizes what the wiki links already express, it adds no new traversal options — it's decoration. But if the visual reveals structural patterns that the link list obscures, it creates genuinely new navigation affordances.

## The Multimodal Question

Modern LLMs are multimodal — they can process images alongside text. This capability is underexploited in current knowledge management. A vault could include relationship diagrams, concept maps, or even hand-drawn sketches that carry structural information. The agent would process both the prose and the visual, potentially finding connections that neither alone would surface.

The open question is whether current multimodal capabilities are good enough for this to work. Human dual-coding works because the visual and verbal systems are genuinely distinct in the brain. LLM multimodal processing may not have the same separation — the visual input gets converted to the same latent space as text, which might mean no dual benefit.

## Implementation Considerations

If dual-coding does provide benefit, implementation would require:

1. Mermaid diagrams in MOCs showing concept relationships
2. Auto-generated graph visualizations (via scripts) showing vault topology
3. Conventions for when visual representation adds value vs. when it's noise
4. Image attachments in markdown notes where spatial relationships matter

The risk is complexity without benefit. Since [[progressive disclosure means reading right not reading less]], adding visual layers only makes sense if they enable better curation, not if they just add more content to process. A diagram that takes 500 tokens to describe and another 500 tokens to visually encode costs 1000 tokens. If both paths lead to the same conclusion, you've paid double for no additional insight.

This note explores one direction of the modality question — whether spatial-visual can supplement spatial-textual. The inverse direction is equally important: since [[temporal media must convert to spatial text for agent traversal]], content that exists in temporal formats (audio, video, podcasts) must first become spatial text before it can participate in any traversal, let alone benefit from visual supplementation. The modality conversation has two halves: converting temporal to spatial (mandatory, lossy but necessary) and enriching spatial-textual with spatial-visual (optional, benefit uncertain). This note addresses the second half; the temporal media note addresses the first.

This remains a research question rather than a settled claim. The theoretical basis from human cognition is solid. The translation to agent cognition is unverified. Since [[testing effect could enable agent knowledge verification]] proposes prediction-based verification as a way to test whether descriptions actually work, a parallel experiment could test whether visual elements provide verifiable benefit — can agents using visual+text outperform agents using text-only on connection-finding tasks?
---

Relevant Notes:
- [[spreading activation models how agents should traverse]] — visual elements would function as parallel activation pathways alongside textual links
- [[each new note compounds value by creating traversal paths]] — the test: do visuals create new paths or restate existing ones?
- [[progressive disclosure means reading right not reading less]] — visual layers only add value if they enable better curation, not just more content
- [[trails transform ephemeral navigation into persistent artifacts]] — sibling proposal for traversal redundancy: trails are temporal (path reuse), dual-coding is modal (visual + text)
- [[testing effect could enable agent knowledge verification]] — sibling Cornell-derived experiment: both propose alternative verification/enhancement channels for agent cognition
- [[wiki links are the digital evolution of analog indexing]] — methodological lineage: Cornell cue columns became wiki links; sketchnoting variations could become visual traversal cues
- [[temporal media must convert to spatial text for agent traversal]] — the inverse modality question: this note asks whether spatial-visual can supplement spatial-textual, while temporal media conversion addresses the prerequisite of getting temporal content into spatial text at all

Topics:
- [[agent-cognition]]
