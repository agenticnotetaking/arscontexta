---
description: Interleaving extracts from multiple sources in a shared queue creates juxtaposition that surfaces relationships sequential source-by-source processing misses
kind: research
topics: ["[[processing-workflows]]"]
methodology: ["Cognitive Science"]
source: [[4-2-processing-workflows]]
---

# incremental reading enables cross-source connection finding

Piotr Wozniak's Incremental Reading processes multiple texts simultaneously through interleaving. Instead of finishing source A before starting source B, the reader extracts key passages from both and processes them together in a mixed queue. The scheduling algorithm determines what surfaces next, creating juxtapositions between unrelated sources that sequential reading would never produce.

The mechanism is forced context collision. When an extract from a cognitive science paper appears next to an extract from network topology research, the reader must mentally switch between frames. This switching creates opportunities for transfer: patterns in one domain illuminate patterns in another. Sequential processing preserves each source's internal coherence but sacrifices cross-source collision. Interleaving sacrifices narrative flow to gain serendipitous connection. Since [[queries evolve during search so agents should checkpoint]], the collision moments function as natural checkpoints where the agent might reframe what it's looking for — encountering an extract from source B while processing source A could reveal that the original extraction criteria for A were too narrow.

This matters for agent-operated extraction workflows because [[fresh context per task preserves quality better than chaining phases]] currently processes sources in isolation. The reduce phase finishes one source before starting the next. This preserves deep engagement with each source but may miss connections that would emerge from interleaved processing. The question is whether the gains from cross-source collision outweigh the costs of fragmenting source comprehension.

The agent adaptation would extract passages from multiple sources into a shared processing queue, then run connection-finding across the mixed extracts rather than source by source. Each extract becomes an atomic unit divorced from its original document structure. The agent processes the queue in whatever order the scheduling algorithm produces, looking for relationships between extracts that came from different sources.

There are costs. Incremental Reading in SuperMemo is notoriously complex, and users report losing the narrative arc of long texts by chopping them into disconnected bits. The time spent managing the system can exceed the time spent reading. For agents, the coordination overhead of maintaining a mixed queue across sources might exceed the value of occasional cross-source insights. Sequential processing is simpler to implement and reason about.

The open question: does the vault's reflect phase already capture cross-source connections by finding relationships between claim notes regardless of their source, or does the initial extraction phase's sequential processing cause connections to be missed before they ever become claims? If reduce extracts claims source-by-source and reflect only runs after extraction, then connections between sources must be visible in the already-extracted claims. But if a connection only becomes visible when two extracts are juxtaposed during processing, sequential extraction might never surface it as a claim in the first place.

This suggests an experiment: run parallel extractions from two related sources, process extracts in interleaved order, and compare the connections found against sequential extraction followed by reflect. If interleaved processing surfaces connections that sequential + reflect misses, incremental reading patterns have value for agent workflows. If reflect already catches cross-source connections adequately, the added complexity isn't worth it.

The comparison with [[random note resurfacing prevents write-only memory]] is instructive: both mechanisms create serendipitous discovery, but through different paths. Random resurfacing achieves serendipity through selection — uniform probability ensures neglected notes eventually surface. Incremental reading achieves serendipity through process — forced context collision creates unexpected juxtapositions. Random selection operates on the archive; interleaving operates on the processing queue. Both counteract the tendency toward familiar, expected connections. And since [[controlled disorder engineers serendipity through semantic rather than topical linking]], there is a third path: structural serendipity baked into the graph itself through semantic cross-links. Together the three mechanisms cover different temporal windows — incremental reading creates serendipity at capture time (process), random resurfacing at maintenance time (selection), and controlled disorder permanently in the graph (structure). The structural mechanism compounds as the graph grows; the other two are operational and must be repeatedly invoked.
---

Relevant Notes:
- [[fresh context per task preserves quality better than chaining phases]] — the current design decision that incremental reading might challenge; session isolation processes sources separately
- [[intermediate packets enable assembly over creation]] — extracts function as packets; incremental reading produces smaller, more atomic packets than source-level processing
- [[queries evolve during search so agents should checkpoint]] — forced context collision through interleaving creates natural checkpoint moments where the agent might reframe its extraction criteria
- [[random note resurfacing prevents write-only memory]] — alternative serendipity mechanism: random selection creates discovery through uniform probability; incremental reading creates discovery through process-based context collision
- [[spreading activation models how agents should traverse]] — addresses discovery at different stages: spreading activation traverses existing connections; incremental reading discovers connections before extraction creates links
- [[throughput matters more than accumulation]] — tests the serendipity claim: throughput argues density over volume creates serendipity; incremental reading tests whether interleaved processing creates additional serendipity that sequential + reflect misses
- [[batching by context similarity reduces switching costs in agent processing]] — opposing sequencing strategy: batching minimizes switching cost by grouping similar topics, while incremental reading maximizes switching for serendipitous discovery; the tension is efficiency vs cross-source collision
- [[controlled disorder engineers serendipity through semantic rather than topical linking]] — complementary serendipity at the structural level: incremental reading creates process serendipity at capture time, while controlled disorder creates permanent structural serendipity in the graph; together they cover different temporal windows

Topics:
- [[processing-workflows]]
