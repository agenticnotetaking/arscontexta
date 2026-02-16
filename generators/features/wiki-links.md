# Feature: Wiki-Links

## Context File Block

```markdown
## Wiki-Links — Your Knowledge Graph

{DOMAIN:Notes} connect via `[[wiki links]]`. Each link is an edge in your knowledge graph. Wiki links are the INVARIANT reference form in this system — every internal reference uses wiki link syntax, never bare file paths, never markdown links to internal {DOMAIN:notes}. The system scans for and enforces this convention because consistent linking is what makes the graph traversable and queryable.

### How Links Work

- `[[{DOMAIN:note} title]]` links to the {DOMAIN:note} with that filename
- Links resolve by filename, not path — every filename must be unique across the entire workspace
- Links work as prose: "Since [[Mom prefers phone calls on Sunday mornings]], I should call her this weekend"
- Wiki links are bidirectionally discoverable — you can find what links TO a {DOMAIN:note} by searching for its title in double brackets

### The Link Philosophy

Links are not citations. They are not "see also" references. They are propositional connections — each link carries semantic weight because the surrounding prose explains the relationship.

When you write `because [[the anxiety usually starts when I skip morning routine]], maintaining the routine is non-negotiable`, you are making an argument. The link is part of the reasoning chain, not a footnote pointing elsewhere. This is what makes wiki links in prose more valuable than bullet-pointed reference lists: the connection is embedded in the argument.

### Inline vs Footer Links

**Inline links** are woven into prose. They carry richer relationship data because the surrounding sentence explains the connection:

> The insight is that [[spaced repetition works better when I study after exercise]], which suggests the physical component is not just correlation but causation.

**Footer links** appear at the bottom of the {DOMAIN:note} in a structured section:

```markdown
---

Relevant Notes:
- [[related note]] — extends this by adding the temporal dimension
- [[another note]] — provides the evidence this builds on

Topics:
- [[methodology]]
```

**Prefer inline links.** They carry more information because the argument structure explains WHY the connection matters. Footer links are useful for connections that do not fit naturally into the prose — but every footer link should still have a context phrase explaining the relationship.

### Propositional Semantics

Every connection must articulate the relationship. The question is never "are these related?" but "HOW are these related?"

Standard relationship types:
- **extends** — builds on an idea by adding a new dimension
- **foundation** — provides the evidence or reasoning this depends on
- **contradicts** — conflicts with this claim (capture as a tension if significant)
- **enables** — makes this possible or practical
- **example** — illustrates or demonstrates this concept in practice

Bad: `[[{DOMAIN:note}]] — related`
Good: `[[{DOMAIN:note}]] — extends this by adding the temporal dimension`
Good: `[[{DOMAIN:note}]] — provides the foundation this challenges`

The context phrase serves two audiences: it tells a future agent WHY to follow this link (should I read this or skip it?), and it documents the intellectual relationship for anyone maintaining the graph.

### Dangling Link Policy

Every `[[link]]` must point to a real file. Dangling links — wiki links to {DOMAIN:notes} that do not exist — create confusion during traversal and pollute health checks. The policy:

- **Before creating a link:** Verify the target {DOMAIN:note} exists
- **If the target should exist but does not:** Create it, then link
- **If you are unsure whether to create the target:** Do not create the link. Capture the idea in your current {DOMAIN:note}'s prose instead
- **During health checks:** Dangling links are flagged as high-priority issues (session-level consequence speed)

Dangling links also serve as demand signals. When `/health` reports dangling links, they reveal what {DOMAIN:notes} your graph expects to exist. Creating those {DOMAIN:notes} fills structural gaps.

### Filename Uniqueness

Every filename must be unique across the entire workspace. Wiki links resolve by name, not path. If `[[{DOMAIN:note} name]]` matches multiple files in different folders, the link becomes ambiguous and may resolve unpredictably.

This is a consequence of flat folder architecture with wiki links as the connection layer. Unlike traditional file systems where paths disambiguate (`folder/file.md` vs `other/file.md`), wiki links only see the filename.

**The rule is simple:** one filename, one file, anywhere in the workspace. When naming {DOMAIN:notes}, use the full claim-as-title pattern — natural language titles are inherently unique because they express specific ideas. Generic titles like "notes" or "ideas" will collide.

### Bidirectional Linking

When A links to B, consider whether B should link back to A. Not every link needs reciprocation — if A extends B, then B might reference A, but only if A genuinely adds to B's argument. Forced bidirectionality creates noise. Genuine bidirectionality makes the graph navigable from either direction.

The /{DOMAIN:connect} and /{DOMAIN:maintain} phases handle this systematically. When adding forward connections to a new {DOMAIN:note}, they also check whether the target {DOMAIN:notes} should be updated to link back. This backward pass is how the graph stays bidirectionally coherent without manual effort.
```

## Dependencies
None — this is a foundational feature.
