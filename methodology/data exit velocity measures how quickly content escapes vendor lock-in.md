---
description: Three-tier framework (high/medium/low velocity) turns abstract portability into an auditable metric where every feature gets evaluated by whether it traps content or frees it
kind: research
topics: ["[[agent-cognition]]", "[[graph-structure]]"]
methodology: ["PKM Research"]
source: [[tft-research-part3]]
---

# data exit velocity measures how quickly content escapes vendor lock-in

The portability research introduces a concept that turns a vague intuition into something you can actually audit: Data Exit Velocity. The framework categorizes tools by how quickly content can leave:

- **High Velocity (low risk):** plain text, markdown, YAML. "Export" means copying a folder. Any tool reads it tomorrow.
- **Medium Velocity (medium risk):** proprietary formats with export capabilities. OPML preserves hierarchy but conversion costs exist.
- **Low Velocity (high risk):** sharded databases like Notion or Evernote. Export requires conversion that typically loses relationships, metadata, or layout fidelity.

The insight isn't just classification — it's that exit velocity becomes a design metric. Every feature decision should pass the test: does this lower exit velocity? Wiki links in markdown maintain high velocity because the link syntax is human-readable even without resolution software. YAML frontmatter maintains high velocity because any text parser reads it. But agent state living outside markdown files would lower exit velocity, because it introduces dependencies that aren't portable. Since [[four abstraction layers separate platform-agnostic from platform-dependent knowledge system features]], exit velocity decreases monotonically through the layers: foundation features (files, wiki links) have maximum velocity, convention features (context file instructions) remain high because they are still just text, automation features (hooks, skills, MCP) introduce platform dependencies that lower velocity, and orchestration features (pipelines, teams) have minimum velocity because they require the most platform-specific infrastructure. The layer hierarchy is literally an exit velocity gradient. And the automation layer's low velocity is not merely a matter of file format differences -- since [[platform adapter translation is semantic not mechanical because hook event meanings differ]], the event semantics themselves resist mechanical porting, which means adapting automation features requires decomposing each hook into its quality guarantee properties and reconstructing them independently on the target platform.

## Why agents care about this metric

Since [[local-first file formats are inherently agent-native]], the portability argument already exists in principle. But principles are hard to audit. Exit velocity makes the abstract concrete: can everything in this vault be fully utilized by any markdown-compatible tool tomorrow?

For agent-operated systems, exit velocity has a specific edge. Agents don't just need to read content — they need to traverse structure, parse metadata, and follow connections. A database-backed system with API access has low exit velocity not only because migration is hard, but because every agent needs credentials, API knowledge, and format-specific parsers. High exit velocity means any LLM with filesystem access can operate the system immediately. This extends [[retrieval utility should drive design over capture completeness]] to the format layer: the retrieval-first question "how will I find this later" becomes "how will any future agent read this in any tool."

High exit velocity also enables the [[bootstrapping principle enables self-improving systems]]: the recursive improvement loop requires the system to read and modify its own files without external coordination. If those files live in proprietary formats requiring API authentication, bootstrapping stalls at the boundary of the tool. The exit velocity metric makes this dependency auditable — every feature that lowers velocity is a potential bootstrapping bottleneck.

The research categorizes PKM tools along this axis: "file-first" tools (Obsidian, Logseq) prioritize local plain text and have high exit velocity. "Database-first" tools (Notion, Anytype) prioritize structured queries but trap content. Since [[complex systems evolve from simple working systems]], this isn't surprising — the simplest substrate proves the most durable because it accumulates fewer dependencies that could break.

## The evaluation practice

The metric suggests a concrete audit: walk through every custom feature and ask "does this require specific tooling to function?" For this vault:

- Wiki links: need conversion for standard markdown but content remains readable. Moderate exit cost.
- YAML frontmatter: fully portable, any parser reads it. Zero exit cost.
- Obsidian-specific features (canvas files, plugins): Obsidian-specific. High exit cost if relied upon.
- qmd semantic search: external tool, but the notes it indexes are plain text. The search layer has low velocity but the content it operates on has high velocity.

The target the research suggests: >95% of content should be portable. The remaining 5% is acceptable tooling convenience, not structural dependency. Since [[wiki links implement GraphRAG without the infrastructure]], the graph structure itself lives in the portable layer — the most valuable structural feature has high exit velocity.

## The shadow side

The exit velocity framework extends beyond tool lock-in to format lock-in. Since [[temporal media must convert to spatial text for agent traversal]], knowledge trapped in audio, video, and podcast formats has effectively zero knowledge exit velocity — agents cannot search, link, or synthesize temporal content. Transcription is the exit operation: it converts temporally locked knowledge into high-velocity text that participates in the graph. The conversion is lossy (tone, emphasis, gesture are lost), but the alternative is knowledge that never exits its temporal container at all. This suggests a fourth tier beyond the three vendor-based categories: content that exists in formats agents cannot traverse represents the lowest possible exit velocity, regardless of the tool that created it.

The exit velocity gradient also maps to platform capability. Since [[platform capability tiers determine which knowledge system features can be implemented]], features that work at every tier (markdown conventions, wiki links, YAML schemas) are precisely the high-velocity features, while features that require tier-one infrastructure (hooks, pipelines, semantic search) are the low-velocity ones. This is not a coincidence -- portability and tier-universality measure the same property from different angles. A feature that requires platform-specific infrastructure both lowers exit velocity and raises the tier floor.

Exit velocity as a metric could become overly conservative. Some low-velocity features genuinely improve capability — database queries are powerful, real-time collaboration requires servers, vector search needs embeddings. The question isn't "maximize exit velocity at all costs" but rather "is the capability worth the lock-in?" For a single-operator vault optimized for agent traversal, the answer usually favors high velocity. For a team knowledge base needing structured queries, the tradeoff might flip. The metric clarifies the decision; it doesn't make it for you.

There is also a multi-agent dimension. Since [[federated wiki pattern enables multi-agent divergence as feature not bug]], federation requires content that can exist independently across different systems. Low exit velocity makes federation structurally impossible — if interpretations are locked into one platform, parallel versions cannot coexist across sites. Exit velocity is therefore a prerequisite for the divergence-as-feature pattern: the content must be free before it can be federated.

Since [[digital mutability enables note evolution that physical permanence forbids]], high exit velocity extends mutability beyond a single tool's lifetime. Notes locked in a dying tool are as immutable as Luhmann's paper cards — not because the medium forbids editing, but because the tool forbids leaving. Exit velocity ensures that the evolutionary potential of digital notes survives tool transitions.

And since [[the system is the argument]], this vault can be audited against its own metric. The >95% portability target applies here: the vast majority of content is markdown with YAML and wiki links, readable by any text parser. The audit practice the note describes is self-referential — the vault demonstrates what it claims.

---
---

Relevant Notes:
- [[local-first file formats are inherently agent-native]] — foundation: the portability principle this note makes measurable; that note argues for plain text, this note provides the yardstick
- [[complex systems evolve from simple working systems]] — explains why high-velocity formats survive: fewer dependencies mean fewer failure modes, which is the mechanism behind exit velocity
- [[wiki links implement GraphRAG without the infrastructure]] — example of high exit velocity: wiki links encode graph structure in plain text, requiring no infrastructure to read or migrate
- [[federated wiki pattern enables multi-agent divergence as feature not bug]] — exit velocity is prerequisite for federation: parallel interpretations across sites only work when content can exist independently of its creating tool
- [[retrieval utility should drive design over capture completeness]] — exit velocity operationalizes retrieval-first thinking at the format level: 'how will any future agent read this' extends 'how will I find this later'
- [[bootstrapping principle enables self-improving systems]] — bootstrapping depends on high exit velocity: the recursive improvement loop requires filesystem-level read/write that proprietary formats block
- [[the system is the argument]] — this vault demonstrates exit velocity: >95% plain text content makes the portability claim verifiable against its own architecture
- [[digital mutability enables note evolution that physical permanence forbids]] — high exit velocity extends mutability across tools, not just within one: notes can evolve regardless of which software reads them
- [[intermediate representation pattern enables reliable vault operations beyond regex]] — the tension in practice: an IR layer adds infrastructure dependency that lowers exit velocity at the tooling layer even though the files it operates on remain high-velocity plain text; the tradeoff is between operational reliability (IR wins) and infrastructure independence (raw files win)
- [[temporal media must convert to spatial text for agent traversal]] — exit velocity applied to media format: temporal media has effectively zero knowledge exit velocity because agents cannot traverse it; transcription is the exit operation that converts trapped temporal knowledge into high-velocity text
- [[four abstraction layers separate platform-agnostic from platform-dependent knowledge system features]] — formalizes exit velocity as a gradient: foundation has maximum velocity (copy a folder), convention still high (just instructions), automation introduces platform dependencies that lower velocity, orchestration has minimum velocity; the layer hierarchy IS an exit velocity gradient
- [[platform adapter translation is semantic not mechanical because hook event meanings differ]] — mechanism: explains WHY automation-layer features have low exit velocity; hook semantics do not transfer mechanically because event meanings differ across platforms, making semantic adapter translation the concrete obstacle behind low portability scores at the automation layer
- [[platform capability tiers determine which knowledge system features can be implemented]] — exit velocity and tier-universality measure the same property from different angles: high-velocity features work at every tier, low-velocity features require tier-specific infrastructure

Topics:
- [[agent-cognition]]
- [[graph-structure]]
