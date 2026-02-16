---
description: Plain text with embedded metadata survives tool death and requires no authentication, making any LLM a valid reader without bootstrapping infrastructure
kind: research
topics: ["[[agent-cognition]]"]
---

# local-first file formats are inherently agent-native

Jekyll's YAML frontmatter "liberated metadata, placing it in plain text alongside content." When metadata lives in the file itself rather than a database, agents can read any note in isolation without bootstrapping external systems.

This is why markdown plus wiki links works as an agent substrate.

## The portability property

Most knowledge systems encode metadata externally: Notion stores relationships in a database, Roam stores block references in JSON that only Roam interprets, Confluence requires API authentication. To read these formats, you need the software that created them — or reverse-engineered access.

Markdown with YAML frontmatter and wiki links inverts this. The file IS the complete artifact. Any text reader sees the structure. Any LLM can parse the YAML, follow the wiki links, understand the content. No API keys, no database connections, no format translators.

This matters for longevity: tools die, but plain text survives. If Obsidian disappears tomorrow, these files remain navigable. The wiki link syntax `[[note title]]` is human-readable even without link resolution — it tells you which concept connects without requiring software to interpret it. Since [[complex systems evolve from simple working systems]], this durability is predictable — the simplest substrate (files + text) proves more robust than complex infrastructures (databases + APIs) because it has fewer failure modes. And since [[data exit velocity measures how quickly content escapes vendor lock-in]], this portability advantage is not just an intuition but an auditable metric: plain text + YAML + wiki links score as high velocity (export = copy a folder), while database-backed tools score low velocity (export requires conversion that loses relationships). The three-tier framework makes format decisions evaluable rather than philosophical.

## Why agents care about this

An agent operating a knowledge system needs read access. External metadata creates dependencies:
- Database-backed: agent needs database credentials
- API-backed: agent needs API authentication
- Proprietary format: agent needs format translator

Local-first file formats eliminate these dependencies. The agent reads files from the filesystem. The metadata is in the file. The connections are in the file. Nothing external is required.

Since [[wiki links implement GraphRAG without the infrastructure]], the local-first property explains WHY this is possible. GraphRAG typically requires entity extraction pipelines, graph databases, clustering algorithms -- infrastructure. But when the graph IS the wiki links and the metadata IS the YAML, the infrastructure is the filesystem itself. The full extent of this infrastructure-free property goes further than graph traversal alone: since [[markdown plus YAML plus ripgrep implements a queryable graph database without infrastructure]], four layers (wiki link edges, YAML metadata, faceted classification, soft validation) compose into a complete graph database architecture where the infrastructure is just a filesystem and a text search tool. Local-first is the substrate property that makes all four layers possible without external dependencies.

## The design choice

This is a CLOSED claim — a foundational decision we made, not a hypothesis we're testing. The corollary is that content which exists in non-text formats must convert: since [[temporal media must convert to spatial text for agent traversal]], video, audio, and podcasts lack the random access that agents need for graph traversal, so they must produce markdown artifacts as their first processing step. The conversion is lossy but mandatory — a lossy transcript that agents can search and link outperforms a perfect recording that sits inert.

Agent-operated knowledge systems use markdown files with YAML frontmatter and wiki links because they need:

1. Tool independence: any LLM can read these files
2. Portability: files survive software transitions
3. Simplicity: no external services to maintain
4. Inspectability: humans can read the raw files

The alternative — using a database, a proprietary format, or API-mediated access — would create dependencies that limit which agents can operate the system. This is precisely why since [[platform capability tiers determine which knowledge system features can be implemented]], the core knowledge system features (markdown conventions, wiki links, YAML schemas, MOCs) work at every tier -- they require nothing beyond what local-first files provide. Local-first is the mechanism behind tier-universality: features that need only files and text are platform-independent by construction.

## The tradeoff

Local-first means no server-side features: no real-time sync, no multi-user collaboration, no hosted backups. These are genuine losses. But for a single-operator vault where the agent needs unmediated access to all content, the tradeoff favors local files. A subtler tension emerges as operations scale: since [[intermediate representation pattern enables reliable vault operations beyond regex]], parsing files into structured objects before operating on them trades the simplicity of raw-text operations for reliability. The files remain the source of truth, but the operation layer gains a dependency that raw regex didn't have. This is a tension within the local-first principle rather than a contradiction of it — the storage substrate stays local-first even when the operation layer adds structure.

The bet: longevity and agent accessibility matter more than collaboration features. For a tools-for-thought-for-agents project, this bet seems right — the agent needs to read everything without credentials, and the files need to outlive any particular software stack. Since [[retrieval utility should drive design over capture completeness]], this is retrieval-first thinking applied to format choice: optimize for any agent being able to find and read content, even at the cost of capture features that require specific infrastructure. The tradeoff accepts losses (collaboration, sync) to maximize retrieval accessibility (any LLM reads without dependencies).

Local-first formats also enable the [[bootstrapping principle enables self-improving systems]]: the system can modify itself because it needs no external coordination or authentication to access its own files. The system writes the skills that process its own content, which only works because reading and writing require nothing beyond filesystem access. This property is why [[session handoff creates continuity without persistent memory]] works: the briefing mechanism (work queue, task files, structured handoff blocks) requires only filesystem access. Any LLM can read the briefing without authentication or external services. Continuity through structure succeeds where continuity through capability fails precisely because the structure is local-first.
---

Relevant Notes:
- [[markdown plus YAML plus ripgrep implements a queryable graph database without infrastructure]] — synthesis: local-first is the substrate property that enables all four layers of the infrastructure-free graph database; the database requires only filesystem access because every layer builds on plain text with embedded metadata
- [[wiki links implement GraphRAG without the infrastructure]] — explains what the local-first substrate enables: a curated knowledge graph with no external dependencies
- [[complex systems evolve from simple working systems]] — explains WHY simple formats survive: fewer failure modes than complex infrastructures
- [[retrieval utility should drive design over capture completeness]] — local-first is retrieval-first design applied to format choice: optimize for any agent reading over capture features requiring infrastructure
- [[bootstrapping principle enables self-improving systems]] — local-first enables recursive improvement: the system modifies itself without external coordination
- [[session handoff creates continuity without persistent memory]] — local-first enables file-based handoffs: any LLM can read the briefing without authentication, making structure-based continuity possible
- [[digital mutability enables note evolution that physical permanence forbids]] — local-first enables mutability: direct file access means agents can edit notes without APIs, enabling the revision that physical cards forbade
- [[data exit velocity measures how quickly content escapes vendor lock-in]] — makes the portability principle auditable: a three-tier framework (high/medium/low velocity) turns abstract local-first advantages into a concrete design metric
- [[intermediate representation pattern enables reliable vault operations beyond regex]] — productive tension: an IR adds an in-memory operation layer above local-first files, trading the simplicity of raw-text operations for reliability at scale while preserving files as the source of truth
- [[temporal media must convert to spatial text for agent traversal]] — the corollary: content that is NOT already local-first text must become it; temporal media like audio, video, and podcasts lack the random access that agent traversal requires, so conversion to markdown is architecturally mandatory
- [[four abstraction layers separate platform-agnostic from platform-dependent knowledge system features]] — formalizes local-first as the foundation layer: the bottom of a four-layer hierarchy where each layer adds platform requirements, and the foundation layer has maximum portability precisely because it needs no infrastructure beyond a filesystem
- [[platform capability tiers determine which knowledge system features can be implemented]] — local-first is the mechanism behind tier-universality: core features (wiki links, YAML, MOCs) work at every tier because they require nothing beyond files and text

Topics:
- [[agent-cognition]]
