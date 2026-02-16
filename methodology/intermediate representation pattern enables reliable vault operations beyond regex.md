---
description: Parsing markdown to structured objects (JSON with link objects, metadata blocks, content sections) before operating and serializing back eliminates regex fragility in link finding, schema validation,
kind: research
topics: ["[[processing-workflows]]", "[[agent-cognition]]"]
confidence: speculative
methodology: ["Original"]
source: [[tft-research-part3]]
---

# intermediate representation pattern enables reliable vault operations beyond regex

Pandoc converts between dozens of document formats — markdown to LaTeX, HTML to EPUB, reStructuredText to DOCX — but it doesn't maintain N*M converters for every source-target pair. Instead, it parses every input into an Abstract Syntax Tree (a canonical intermediate representation), then serializes from that AST to the output format. N readers plus M writers give N+M implementations for N*M conversions. The architectural insight is that a canonical intermediate structure decouples input parsing from output generation, making both more reliable. This same decompose-reconstruct architecture operates at the platform infrastructure level: since [[platform adapter translation is semantic not mechanical because hook event meanings differ]], translating hooks across platforms requires decomposing each hook into its quality guarantee properties and reconstructing them independently, solving the N*M platform-adapter problem through the same intermediate-decomposition strategy that Pandoc applies to document formats.

Agent-operated vaults face a structurally similar problem. Every vault operation — finding all links to a note, validating YAML frontmatter, checking link targets, updating wiki link text across files, migrating footer formats to YAML — currently works on raw markdown strings via regex. And regex on markdown is inherently fragile. A pattern like `\[\[([^\]]+)\]\]` to match wiki links breaks when someone writes `[[note with \] in title]]` or when a code block contains example wiki link syntax. YAML parsing via `rg "^description:"` works until a description spans multiple lines or a code fence contains YAML-like content. Each edge case demands another regex refinement, and the refinements interact in ways that create new edge cases.

The intermediate representation (IR) pattern proposes a different architecture: parse markdown files into structured objects first, operate on those objects, then serialize back to markdown. A note becomes a JSON-like structure with typed fields — a frontmatter dictionary, an array of content blocks (paragraphs, headings, code fences, tables), and an array of link objects with source position, target title, and surrounding context. Operations become property lookups and object mutations rather than string matches.

## What this changes in practice

The benefits are most visible in link operations, since [[wiki links implement GraphRAG without the infrastructure]] makes wiki links the primary retrieval mechanism. Finding all notes that link to X currently requires regex across all files. With an IR, it becomes a property lookup on pre-parsed link objects — faster, exact, and immune to false positives from code blocks or backtick-wrapped examples. Backlink resolution, which the vault uses heavily for connection finding and orphan detection, goes from "grep and hope the regex handles edge cases" to "query the link index." And since [[propositional link semantics transform wiki links from associative to reasoned]], link objects with typed relationship fields would make semantic edge queries ("find all notes that contradict X") a property filter rather than NLP inference on surrounding prose — the parsing opportunity that propositional semantics identifies becomes tractable infrastructure rather than aspirational pattern matching.

Schema validation also benefits. Since [[schema enforcement via validation agents enables soft consistency]], validation agents currently parse YAML frontmatter from raw text each time they check a note. With an IR, frontmatter is already a typed dictionary — checking for required fields, validating enum values, and measuring description length become property checks on structured data. The validator doesn't need to handle YAML parsing edge cases because the parser already did. This matters especially because [[faceted classification treats notes as multi-dimensional objects rather than folder contents]] — Ranganathan's insight that notes have multiple queryable dimensions assumes those dimensions are reliably accessible, and an IR makes faceted queries property lookups on typed objects rather than regex extraction that breaks on multiline values or edge-case YAML.

Bulk transformations become safer too. Migrating from markdown footers to YAML relevant_notes (which the vault has done) required careful sed/awk scripting with risk of corrupting content. With an IR, the migration reads from the old structure, writes to the new structure, and serialization guarantees valid output. The transformation logic never sees raw text.

## The agent translation

This pattern maps cleanly to agent operation because it separates concerns that agents handle poorly when combined. An agent reading raw markdown must simultaneously parse structure (where does frontmatter end?), extract semantics (which wiki links are real vs. examples?), and operate (update this link target). Each concern introduces failure modes. An IR pipeline separates these: the parser handles structure, the operation handles semantics, the serializer handles output format. Each stage can be validated independently.

Since [[skills encode methodology so manual execution bypasses quality gates]], an IR layer would function as a quality gate at the infrastructure level. Skills that operate on structured objects cannot produce malformed output because the serializer enforces format invariants — you cannot accidentally delete a closing `---` from frontmatter because the serializer generates delimiters from structure, not from string manipulation.

Since [[programmable notes could enable property-triggered workflows]], an IR makes property triggers straightforward. When notes are already parsed objects with typed fields, checking "is status seedling AND age > 14 days?" is a property comparison, not a YAML extraction followed by date arithmetic on strings.

## The cost and the question

The cost is real. Building and maintaining a parse-operate-serialize pipeline adds infrastructure. The vault currently works with regex — imperfectly, but functionally. Since [[local-first file formats are inherently agent-native]] precisely because they require no infrastructure beyond a filesystem, adding an IR layer introduces a dependency that regex doesn't have. And because [[data exit velocity measures how quickly content escapes vendor lock-in]], the IR layer's infrastructure cost is measurable: the files themselves retain high exit velocity (they're still plain markdown), but operations that depend on the IR cannot be performed by tools that lack the parser. If the parser breaks, operations halt. If the parser drifts from the actual file format, silent corruption follows.

There's also a philosophical tension. The vault philosophy says "files ARE the database" — YAML frontmatter queried by ripgrep provides database-like functionality without a database. An IR layer partially contradicts this by creating an in-memory representation that diverges from the file during operations. The file remains the source of truth, but operations happen on a copy. This is manageable (parse fresh each time, or invalidate on file change), but it adds a consistency concern that raw-file operations avoid.

The open question is where the crossover point lies. At the current vault scale (~120 notes), regex works and edge cases are manageable. At 500 notes, bulk operations become more common and regex fragility compounds. At 5000 notes, an IR layer likely becomes necessary because the combinatorics of edge cases exceed what regex can handle reliably. The bet is that investing in the IR early prevents the technical debt that accumulates from patching regex solutions. But the counter-argument — that regex with good test coverage suffices indefinitely — hasn't been disproven at this scale.

The implementation direction, if pursued: start with read-only IR for queries (link finding, schema validation, backlink resolution) where the benefit is immediate and the risk of corruption is zero. Add write-through IR for transformations only when read-only proves its value. This follows both [[schema enforcement via validation agents enables soft consistency]] and [[complex systems evolve from simple working systems]] — Gall's Law applied to vault infrastructure means the IR should emerge at friction points rather than being designed comprehensively upfront. The crossover-point question above is precisely the "has pain emerged that justifies this complexity?" test.

---
---

Relevant Notes:
- [[schema enforcement via validation agents enables soft consistency]] — validates against the same structured representation rather than parsing raw YAML each time, making validation composable
- [[local-first file formats are inherently agent-native]] — the substrate this operates on: plain text files remain the storage format, but agents work through a structured intermediary rather than treating files as raw strings
- [[wiki links implement GraphRAG without the infrastructure]] — link operations are the primary beneficiary: finding all notes that link to X becomes a property lookup on structured objects rather than a regex match that breaks on edge cases
- [[skills encode methodology so manual execution bypasses quality gates]] — an IR layer would itself be a quality gate: skills operating on structured objects cannot produce malformed output because the serializer enforces format invariants
- [[note titles should function as APIs enabling sentence transclusion]] — the notes-as-APIs pattern maps directly: in an IR, each note IS a structured API object with typed fields, and invocation becomes method dispatch rather than string interpolation
- [[programmable notes could enable property-triggered workflows]] — property triggers become straightforward when notes are already parsed objects with typed fields rather than text files requiring YAML extraction
- [[complex systems evolve from simple working systems]] — grounds the incremental adoption strategy: start read-only, add write-through where pain demonstrates need; the crossover-point question is Gall's Law asking 'has pain emerged?'
- [[propositional link semantics transform wiki links from associative to reasoned]] — typed link objects in an IR make relationship extraction trivial: the parsing opportunity that propositional semantics identifies becomes a property lookup rather than NLP inference on surrounding prose
- [[faceted classification treats notes as multi-dimensional objects rather than folder contents]] — provides the theoretical framework: Ranganathan's multi-dimensional classification assumes queryable properties, and an IR makes those properties typed objects rather than regex-extracted strings
- [[data exit velocity measures how quickly content escapes vendor lock-in]] — the portability tension: an IR layer introduces an in-memory dependency that lowers exit velocity even though the underlying files remain plain text; exit velocity provides the formal metric for evaluating whether the IR's reliability gains justify the infrastructure cost
- [[platform adapter translation is semantic not mechanical because hook event meanings differ]] — structural isomorphism: the adapter pattern decomposes hook guarantees into constituent properties and reconstructs them independently per platform, solving the same N*M combinatorial translation problem that Pandoc's AST solves for document formats; the difference is that the IR's intermediate structure is a data format while the adapter's intermediate structure is a set of quality guarantee properties

Topics:
- [[processing-workflows]]
- [[agent-cognition]]
