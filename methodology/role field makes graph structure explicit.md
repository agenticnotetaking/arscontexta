---
description: A role field distinguishing moc/hub/leaf/synthesis would let agents make smarter traversal decisions without inferring structure from link counts
kind: research
topics: ["[[graph-structure]]"]
source: TFT research corpus (00_inbox/heinrich/)
---

# role field makes graph structure explicit

The system currently encodes graph structure implicitly through link patterns. MOCs have many outgoing links. Hubs have high bidirectional connectivity. Leaves have few connections. Synthesis notes bundle multiple incoming claims. Agents must count links and analyze patterns to understand what kind of node they're visiting.

A `role:` field would make this structure explicit in metadata.

## The Proposal

Add a `role:` field to thinking notes with values:

| Role | Description | Traversal Behavior |
|------|-------------|-------------------|
| `moc` | Map of content, navigation hub | Start here for overview, follow links for depth |
| `hub` | High-link-density connector | Traverse through for dense connections, expect many options |
| `leaf` | Endpoint note with few links | Read for specific claim, limited onward traversal |
| `synthesis` | Combines multiple claims | Load to see how ideas connect, follow backward to sources |

## Why Role Is Orthogonal to Type

The system already has a `type:` field (claim, learning, tension, experiment, methodology, problem). Type describes content kind — what the note IS. Role describes graph position — what the note DOES in the network.

A claim can be a leaf (specific assertion with few connections) or a hub (central idea that connects many thoughts). A synthesis note is a synthesis by type, but by role it might be a hub (if it becomes a central connection point) or a leaf (if it synthesizes without spawning further connections). The dimensions don't overlap. Since [[faceted classification treats notes as multi-dimensional objects rather than folder contents]], this orthogonality follows Ranganathan's formal independence test: a facet earns its place when it classifies along an axis independent of existing facets. Knowing a note is a "claim" (type) tells you nothing about whether it functions as a hub or leaf (role), confirming that role adds genuine retrieval power rather than redundant noise.

The role/type orthogonality extends further. Since [[IBIS framework maps claim-based architecture to structured argumentation]], a third independent classification exists: discourse function. A note can be a hub (role: structurally central), a claim (type: content kind), and a Position (IBIS: staking argumentative ground) simultaneously. Role, type, and IBIS discourse function form three orthogonal facets that together with [[propositional link semantics transform wiki links from associative to reasoned]] at the edge level create a fully typed graph.

There's another dimension role metadata might capture: cross-MOC membership. Since [[cross-links between MOC territories indicate creative leaps and integration depth]], notes appearing in multiple MOCs are integration hubs that bridge topic boundaries. A role value like `bridge` could flag notes that connect distant domains — structurally valuable shortcuts that create creative leaps. Whether this should be a role value or its own metadata field depends on whether the property is stable (like moc vs leaf) or emergent (like hub status that accumulates over time).

## Agent Traversal Benefits

Since [[small-world topology requires hubs and dense local links]], agents benefit from knowing which nodes are hubs before loading them. Currently, an agent following links from a MOC might load a note, count its outgoing links, and only then realize it's a leaf with nowhere to go. Role metadata prevents this wasted context.

The traversal optimization:

1. Agent builds context for a task
2. Loads MOC for topic orientation (role: moc)
3. Follows promising links, prioritizing hubs over leaves when breadth matters
4. Reads leaves when depth on specific claims matters
5. Loads synthesis when looking for how ideas connect

This is analogous to how since [[progressive disclosure means reading right not reading less]], role enables navigational disclosure — knowing the structural function of a note before deciding whether to load it.

## Inference vs Explicit Metadata

The counterargument: agents can infer role from link patterns. Count outgoing links, check incoming links, analyze the connectivity signature. True, but expensive.

Since [[LLM attention degrades as context fills]], the inference step costs tokens that could go to actual reasoning. For a large vault, checking link counts across dozens of notes during traversal adds up. The role field trades one-time classification cost for repeated traversal savings.

The question is whether the classification burden creates more friction than it saves. Since [[each new note compounds value by creating traversal paths]], role classification could happen during the reflect phase when link patterns are already being analyzed. But role is not static — a note starts as a leaf and becomes a hub as connections accumulate. Role metadata needs maintenance, unlike type which is intrinsic.

## The Maintenance Challenge

This is the key uncertainty. Since [[gardening cycle implements tend prune fertilize operations]], vault maintenance already includes periodic passes. Role verification could be added: does this note still match its classified role? Has a leaf become a hub? But this adds another field to maintain, another potential staleness vector.

Possible mitigations:

- Infer role dynamically rather than storing it (but this eliminates the traversal efficiency gain)
- Update role during reweave passes when link patterns change
- Treat role as approximate guidance rather than ground truth
- Accept that roles drift and treat discrepancies as maintenance signals

The [[maturity field enables agent context prioritization]] experiment faces similar maintenance challenges. Both propose YAML fields that require ongoing classification. The pattern of adding more metadata fields may accumulate overhead even when each individual field seems valuable.

## Evaluation Criteria

Before implementing, test whether role metadata actually improves traversal:

1. Compare traversal efficiency when role is known vs inferred
2. Measure how often notes change roles as they accumulate links
3. Check if agents make qualitatively different traversal decisions with role visibility
4. Assess whether the classification burden during creation outweighs traversal savings

If role rarely changes and classification is easy, the field provides value. If roles are fluid and classification is contentious, the inference approach may be simpler.
---

Relevant Notes:
- [[small-world topology requires hubs and dense local links]] — explains the network science foundation: role metadata makes the power-law distribution navigable
- [[each new note compounds value by creating traversal paths]] — role metadata helps agents choose which paths to prioritize during traversal
- [[progressive disclosure means reading right not reading less]] — role is navigational disclosure: know a note's structural function before loading it
- [[LLM attention degrades as context fills]] — role metadata saves the inference cost that otherwise consumes smart-zone tokens
- [[maturity field enables agent context prioritization]] — sibling metadata proposal facing similar maintenance challenges
- [[gardening cycle implements tend prune fertilize operations]] — role verification would fit in the tend operation: checking if roles still match reality
- [[betweenness centrality identifies bridge notes connecting disparate knowledge domains]] — provides computable criterion for the proposed bridge role: betweenness scores identify which notes function as structural connectors, automating what would otherwise require manual classification
- [[faceted classification treats notes as multi-dimensional objects rather than folder contents]] — formal independence test: Ranganathan's framework provides the criterion for whether role is genuinely orthogonal to type; role passes because graph position and content kind classify along independent axes
- [[IBIS framework maps claim-based architecture to structured argumentation]] — parallel discourse-role classification: role assigns graph-structural function (hub, leaf, synthesis) while IBIS assigns discourse function (Issue, Position, Argument); the two systems are orthogonal and composable, forming a three-layer typing stack with propositional link semantics at the edge level

Topics:
- [[graph-structure]]
