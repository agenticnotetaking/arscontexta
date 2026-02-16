---
description: The berrypicking model shows information needs transform during retrieval, so agent traversal should include explicit reassessment points where the search direction can shift
kind: research
topics: ["[[agent-cognition]]"]
---

# queries evolve during search so agents should checkpoint

The berrypicking model from information retrieval research shows that complex knowledge work changes what you're looking for as you find things. You start searching for X, discover Y which reframes the problem, and now you're actually looking for Z. This isn't search failure — it's how understanding deepens through discovery.

For agents navigating knowledge graphs, this means traversal can't be a simple breadth-first or depth-first walk. After loading each note, the agent should checkpoint: has my understanding of what I'm looking for changed? Should I shift direction? Is this still the right search path?

This is more expensive than mechanical traversal. Each checkpoint requires semantic reassessment. But it's necessary for synthesis across domains. If you're trying to connect ideas about agent cognition and network topology, the first few notes you read will reshape what connections you're hunting for. Without checkpoints, you'd follow the original query even after it became obsolete.

The question becomes: when to checkpoint? After every note is expensive. Never is mechanical. The berrypicking model suggests checkpointing when you encounter conceptual shifts — when a note introduces a framework you didn't have, contradicts something you assumed, or bridges two domains you hadn't connected. This is retrieval-first design applied to search behavior: since [[retrieval utility should drive design over capture completeness]], checkpointing serves "how do I find what I actually need?" rather than "what was my original query?"

Checkpointing requires efficient reassessment. Since [[progressive disclosure means reading right not reading less]], each checkpoint is a curation decision: which paths deserve deeper loading? The discovery layers enable this: [[descriptions are retrieval filters not summaries]] lets agents scan many candidates without committing full context. Since [[metadata reduces entropy enabling precision over recall]], the description layer pre-computes low-entropy representations that answer "should I pivot to this?" at low token cost. This makes frequent checkpointing viable: reassessment is cheap when you're comparing descriptions rather than full content. An extension being tested: [[question-answer metadata enables inverted search patterns]] proposes that at checkpoints, agents could match "what question am I now asking?" directly to notes that answer it, bypassing keyword matching entirely.

The efficiency of checkpointing depends on network structure. Because [[small-world topology requires hubs and dense local links]], most concepts connect through hub nodes (MOCs) with short paths between them. Checkpointing is where you decide whether to change which hub you're traversing through. You started heading toward MOC-A, but this note reframes the problem — now MOC-B is the right navigation center. Without small-world topology, changing direction mid-search would be expensive. With it, you're usually only 2-3 hops from any relevant hub.

Since [[spreading activation models how agents should traverse]] already establishes how to load context via wiki links with decaying activation strength, this extends that by adding the temporal/process dimension. Spreading activation tells you which notes to load next based on link strength. Checkpointing tells you when to reassess whether you're still looking for the right thing. And since [[incremental reading enables cross-source connection finding]], context collision during interleaved processing creates natural checkpoint moments — encountering an extract from source B while working on source A can reveal that your original extraction criteria were too narrow.
---

Relevant Notes:
- [[progressive disclosure means reading right not reading less]] — checkpointing IS progressive disclosure applied to search: each checkpoint is a curation decision
- [[spreading activation models how agents should traverse]] — provides the mechanism for which notes to load; this adds when to reassess the search direction
- [[incremental reading enables cross-source connection finding]] — context collision during interleaved processing creates natural checkpoint moments; the collision reframes what you're looking for
- [[wiki links implement GraphRAG without the infrastructure]] — creates the graph structure that agents traverse with these checkpoint-aware searches
- [[small-world topology requires hubs and dense local links]] — provides the structural efficiency that makes mid-search direction changes viable
- [[descriptions are retrieval filters not summaries]] — enables efficient reassessment at each checkpoint: scan descriptions to evaluate pivot candidates
- [[trails transform ephemeral navigation into persistent artifacts]] — proposes persisting successful checkpoint sequences as reusable navigation paths
- [[retrieval utility should drive design over capture completeness]] — checkpointing is retrieval-first design: optimizing for what do I actually need now? over what did I originally ask for?

Topics:
- [[agent-cognition]]
