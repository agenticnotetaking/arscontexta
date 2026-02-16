---
description: Research suggests skeleton outlines provided before capture reduce cognitive load more than structuring afterward, challenging the zero-friction capture pattern where raw dumps get agent-processed
kind: research
topics: ["[[note-design]]"]
methodology: ["Cornell"]
source: [[3-3-cornell-note-taking-system]]
---

# guided notes might outperform post-hoc structuring for high-volume capture

There's a tension in capture methodology between two approaches. The first: dump everything fast, structure later. The second: provide structure upfront, fill in as you go. Research on "Guided Notes" — skeleton outlines given to students before lectures — suggests the second approach might win when capture volume is high enough that structuring while listening becomes a competing cognitive task.

The core issue is dual-task interference. Cornell notes require metacognitive effort to decide what goes in the cue column vs. the notes column, all while content keeps flowing. Guided Notes eliminate that design decision: the skeleton tells you what categories exist, so you just slot content into pre-existing buckets. For novices or high-velocity contexts, this may reduce cognitive load more effectively than systems that require real-time structural decisions. But unlike Lazy Cornell where drawing lines alone produces nothing, since [[structure without processing provides no value]], the guided notes skeleton demands genuine cognitive work — identifying a main point, flagging a question, noting supporting evidence. The structure guides processing rather than replacing it.

This challenges a foundational assumption of agent-delegated processing. The vault's current model (zero-friction capture into dumps, then agent processing) assumes the human should do minimal work at capture time and let the agent handle structuring. But if the human does zero structuring, they may miss encoding benefits that come from active organization. Since [[the generation effect requires active transformation not just storage]], pure dumps might sacrifice cognitive benefits that even minimal guided structure would preserve.

The research question is whether agents can recover what pure capture loses. Since [[does agent processing recover what fast capture loses]] remains open, guided notes offer a middle path: some structure at capture (enough to get generation effects), but not so much that it slows the dump. A guided template like "main point, evidence, questions" is lightweight enough to fill in real-time but structured enough to prompt generative processing.

This connects to but differs from schema templates. Since [[schema templates reduce cognitive overhead at capture time]], there's overlap: both externalize structure to reduce design work. But schema templates focus on what fields to record (author, date, claims), while guided notes focus on how to organize incoming flow (main ideas vs. supporting details vs. questions). Schema templates work well for discrete content (a book, an article). Guided notes might work better for streaming content (lectures, meetings, conversations) where information arrives faster than you can fully process. The same principle appears in description-writing: since [[good descriptions layer heuristic then mechanism then implication]], the layering formula provides a guided note pattern for writing descriptions — instead of "what should I say about this note?" you fill in three pre-defined layers.

The agent adaptation question: should agents provide capture scaffolding before humans dump? Instead of a blank page, the agent could offer prompts: "What's the main claim?" "What surprised you?" "What connects to existing thinking?" This would be guided capture for the agent-delegated processing context. The hypothesis is that lightweight upfront prompts might preserve generation effects without adding friction that blocks capture. The counter-hypothesis is that any upfront structure interrupts flow and zero-friction capture's value comes precisely from removing all barriers. This counter-hypothesis gains force from voice capture: since [[voice capture is the highest-bandwidth channel for agent-delegated knowledge systems]], speaking at 150 wpm produces the purest stream-of-consciousness — and any guided prompt mid-stream ("what's the main claim?") interrupts the very flow state that makes voice capture valuable. Voice also partially compensates for the loss of guided structure by preserving emotional metadata (emphasis, tone shifts, hesitation) that provides agent extraction heuristics without requiring the human to stop and categorize.

Worth testing: compare agent extraction quality across three capture conditions. First, pure dump with no structure. Second, lightweight guided prompts offered before dumping. Third, post-hoc structuring by agent only. The prediction from guided notes research is that condition two produces richer content for the agent to extract from, because the prompts triggered generation during capture rather than leaving all transformation to the agent. The secondary question is whether the human retains stronger understanding of the material — relevant for the human-agent partnership but not the primary design criterion for agent-delegated knowledge systems.
---

Relevant Notes:
- [[schema templates reduce cognitive overhead at capture time]] — related intervention at capture time but focused on discrete content fields rather than streaming flow organization
- [[the generation effect requires active transformation not just storage]] — the cognitive mechanism that guided notes might preserve where pure dumps lose it
- [[does agent processing recover what fast capture loses]] — the open question this research direction probes: if agents can't fully recover generation benefits, guided capture becomes more valuable
- [[structure without processing provides no value]] — distinguishes guided notes from Lazy Cornell: the skeleton demands genuine processing (identifying main points, noting questions), not just formatting
- [[good descriptions layer heuristic then mechanism then implication]] — the description layering formula applies the same cognitive intervention: transform what should I say? into fill in these three layers
- [[continuous small-batch processing eliminates review dread]] — sibling intervention targeting psychological friction at a different stage: small batches address review dread, guided notes address capture-time cognitive load
- [[voice capture is the highest-bandwidth channel for agent-delegated knowledge systems]] — the extreme post-hoc counterargument: voice capture at 150 wpm produces pure stream-of-consciousness where any guided prompt interrupts flow, but emotional metadata partially compensates for missing structure by giving agents extraction heuristics
- [[vibe notetaking is the emerging industry consensus for AI-native self-organization]] — the paradigm this note challenges: vibe notetaking assumes zero-friction capture with post-hoc AI structuring, but guided notes research suggests some upfront structure preserves encoding benefits that pure dumps lose

Topics:
- [[note-design]]
