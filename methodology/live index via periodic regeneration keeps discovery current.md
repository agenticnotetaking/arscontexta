---
description: A maintenance agent regenerating index files on note changes bridges static indices that go stale with dynamic queries that cost tokens each time
kind: research
topics: ["[[discovery-retrieval]]"]
methodology: ["Original"]
source: [[2-4-metadata-properties]]
---

# live index via periodic regeneration keeps discovery current

Static index files solve the problem of repeated queries: instead of running `rg "^description:"` every time an agent needs to scan available notes, a pre-built index provides immediate access. But static files go stale. A note created this morning won't appear in an index generated last week. Since [[stale navigation actively misleads because agents trust curated maps completely]], the agent operates on outdated information without knowing it — and because it trusts the curated view, it never searches for what the stale index omits.

Dynamic queries solve staleness but introduce cost. Every JIT query costs tokens and time. When an agent needs to understand what exists before deciding what to read, querying descriptions across hundreds of notes adds overhead to every decision point. Since [[progressive disclosure means reading right not reading less]], the agent needs to filter frequently — and frequent filtering shouldn't require repeated full-vault scans.

The solution is periodic regeneration by a maintenance agent. When notes change, the agent regenerates the relevant index. The index remains a static file that loads instantly, but its contents stay current because regeneration happens at the boundary of change rather than the moment of query.

This pattern has several implementation variations:

| Approach | Trigger | Trade-off |
|----------|---------|-----------|
| Post-commit hook | Every git commit | Frequent updates, minimal staleness, some overhead |
| Session-end regeneration | When agent session ends | Groups changes, slight delay before currency |
| Scheduled regeneration | Cron-style periodic runs | Predictable staleness window, low overhead |
| Change detection | File watcher triggers rebuild | Near-instant currency, requires infrastructure |

The vault already demonstrates this pattern implicitly. CLAUDE.md documents dynamic querying via ripgrep (`rg "^description:" 01_thinking/*.md`), but also injects the file tree at session start via hook — that's periodic regeneration of structural information. The tree injection keeps agents current without requiring them to run `find` commands repeatedly.

Multiple specialized indices become possible when regeneration is cheap:

- **By topic:** Which MOC would each note appear under?
- **By maturity:** Seedling notes vs fully developed claims (since [[maturity field enables agent context prioritization]], pre-computed maturity indices let agents filter before loading)
- **By type:** All methodology notes, all tensions, all problems
- **By recency:** Notes modified in last 7 days
- **By link density:** Well-connected vs orphan notes

Each index serves a different navigation mode. An agent exploring new territory might want the by-topic index. An agent doing maintenance wants the by-recency or by-link-density view. Since [[type field enables structured queries without folder hierarchies]], pre-computing type-based indices avoids repetitive filtering at query time.

Periodic regeneration is a specific instance of a broader architectural pattern. Since [[reconciliation loops that compare desired state to actual state enable drift correction without continuous monitoring]], the index regeneration pattern is a reconciliation loop where the desired state is "index matches current file state" and the detection mechanism is comparing file modification times or counts against index entries. The reconciliation table in that note includes qmd index freshness as one of its rows, with the Phase 0 freshness check (comparing indexed document count against actual file count) as the detection tool and `qmd update && qmd embed` as the remediation. Periodic index regeneration is the most mature reconciliation loop in the vault because it already has both automated detection and automated remediation — the check is deterministic and the fix is idempotent.

The deeper insight is that this dissolves the static/dynamic trade-off. Traditional systems force a choice: maintain indices manually (they go stale) or query dynamically (expensive at scale). Agent-operated systems can regenerate automatically because the maintenance work itself can be delegated. The human doesn't maintain the index — the agent does, as part of routine vault hygiene. Since [[skills encode methodology so manual execution bypasses quality gates]], index regeneration should be encoded in hooks or skills rather than run ad-hoc — the quality gate here is ensuring regeneration happens at the right moments without human memory.

This connects to the broader pattern in CLAUDE.md of hooks automating what would otherwise be manual ceremony. The file tree injection hook already implements this pattern for structure. Extending it to description aggregation, link density metrics, or topic indices follows the same logic: compute once at change boundaries, use cheaply at query time. This is the [[bootstrapping principle enables self-improving systems]] in action at the infrastructure level — the vault already uses its own patterns (hooks, automation) to improve its own discovery mechanisms.
---

Relevant Notes:
- [[progressive disclosure means reading right not reading less]] — why agents need efficient filtering mechanisms in the first place
- [[type field enables structured queries without folder hierarchies]] — metadata dimensions that become cheaply queryable through pre-computed indices
- [[metadata reduces entropy enabling precision over recall]] — the information-theoretic basis for why indices help: pre-computed low-entropy representations
- [[skills encode methodology so manual execution bypasses quality gates]] — regeneration should be encoded in hooks/skills, not manual ad-hoc commands, to ensure it happens reliably
- [[bootstrapping principle enables self-improving systems]] — the vault already demonstrates this pattern: hooks that improve discovery use the same automation philosophy they serve
- [[maturity field enables agent context prioritization]] — maturity is one of several index dimensions that become cheaply queryable when regeneration is cheap
- [[spaced repetition scheduling could optimize vault maintenance]] — interval-based scheduling addresses WHEN maintenance happens; trigger-based regeneration is a complementary mechanism
- [[gardening cycle implements tend prune fertilize operations]] — gardening operations could serve as regeneration triggers; tend the note, regenerate indices that include it
- [[reconciliation loops that compare desired state to actual state enable drift correction without continuous monitoring]] — names the architectural pattern: periodic regeneration is a reconciliation loop where the desired state is index-matches-files and remediation is idempotent rebuild
- [[stale navigation actively misleads because agents trust curated maps completely]] — motivates the urgency: stale indices and stale MOCs share the same failure mode where agents trust outdated curated views without suspecting staleness, making periodic regeneration not just convenient but necessary to prevent silent navigation corruption

Topics:
- [[discovery-retrieval]]
