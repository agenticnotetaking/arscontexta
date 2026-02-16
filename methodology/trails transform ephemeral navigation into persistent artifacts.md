---
description: Named traversal sequences through the knowledge graph could let agents reuse discovered navigation paths across sessions
kind: research
topics: ["[[agent-cognition]]"]
source: TFT research corpus (00_inbox/heinrich/)
---

# trails transform ephemeral navigation into persistent artifacts

Bush's Memex introduced the concept of trails: named, shareable paths through an information space. When a researcher navigated from topic A through B to insight C, they could save that traversal sequence and share it with others. The trail captured not just the destination but the journey that made the destination meaningful.

For agent-operated vaults, this concept addresses a core tension. When an agent navigates through notes during a session, that path typically vanishes when the session ends. The next session must rediscover the route. Trails would make these paths persistent — a folder containing markdown files that list wiki links in traversal order with annotations about why each step was taken.

Trails assume the paths exist to begin with. But since [[navigational vertigo emerges in pure association systems without local hierarchy]], some semantic neighbors have no link path at all — they're close in meaning but disconnected in graph space. Trails capture successful traversals, but they can't capture the traversals that couldn't happen because the links weren't there. This is why trails complement MOCs rather than replace them: MOCs create the local hierarchy that makes paths exist, trails persist the paths worth reusing.

This directly addresses the session isolation problem described in [[fresh context per task preserves quality better than chaining phases]]. Session isolation preserves quality by giving each task fresh context, but the cost is that navigation discoveries don't persist. Since [[session handoff creates continuity without persistent memory]] through externalized briefings, trails would extend this pattern: a trail is a navigation briefing, capturing not just what was discovered but the path that led there. The agent doesn't remember the route — it reads the trail.

Since [[intermediate packets enable assembly over creation]], trails would function as a new type of packet: navigation packets that structure traversal knowledge for reuse. Packets make session isolation practical by enabling handoffs through files. Trails extend this pattern: instead of just handing off work products, we hand off the navigation paths that produced them.

The key insight from Bush is that trails are not merely bookmarks or link collections. They encode the reasoning that connected the nodes — the "why this, then that" logic that made the traversal productive. Without this reasoning, you have a list of notes. With it, you have reusable navigation knowledge.

Since [[dual-coding with visual elements could enhance agent traversal]], trails represent one of several redundancy strategies for traversal robustness. Trails provide temporal redundancy by persisting successful navigation sequences across sessions. Visual dual-coding provides modal redundancy by encoding relationships in both text and visual form. Both address the question: how do we make traversal more robust when the primary path fails?
---

Relevant Notes:
- [[topological organization beats temporal for knowledge work]] — trails only make sense in a topological system; in a stream you navigate by recency, in a garden you navigate by meaning and paths become worth preserving
- [[fresh context per task preserves quality better than chaining phases]] — describes the session isolation that creates the redundant navigation problem trails would solve
- [[session handoff creates continuity without persistent memory]] — trails extend the handoff pattern to navigation: work handoffs brief the next session on what was done, navigation handoffs brief the next session on how to get there
- [[intermediate packets enable assembly over creation]] — trails extend the packet pattern to navigation; packets hand off work products, trails hand off the paths that produced them
- [[session outputs are packets for future selves]] — the work-product instance that trails extend to navigation: session outputs are the composable packets trails would make navigable, adding the path dimension to what handoffs already preserve as content
- [[each new note compounds value by creating traversal paths]] — trails are explicit named paths; this note describes implicit paths through wiki links
- [[spreading activation models how agents should traverse]] — trails would be pre-computed activation paths that skip the spreading computation
- [[queries evolve during search so agents should checkpoint]] — trails could capture how queries evolved, preserving the checkpoint decisions that led to insight
- [[dual-coding with visual elements could enhance agent traversal]] — sibling redundancy strategy: trails provide temporal redundancy (path reuse), dual-coding provides modal redundancy (visual + text encoding)
- [[logic column pattern separates reasoning from procedure]] — sibling reasoning-persistence pattern: trails persist navigation reasoning (why this, then that), logic columns persist procedural reasoning (why this step); both transform ephemeral understanding into reusable artifacts
- [[navigational vertigo emerges in pure association systems without local hierarchy]] — trails assume paths exist; this note identifies when paths DON'T exist (semantic neighbors with no link path), which is why trails complement rather than replace MOCs

Topics:
- [[agent-cognition]]
