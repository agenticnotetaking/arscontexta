---
description: Extraction, connection, reweaving, and verification pipelines -- the four-phase processing skeleton
type: moc
---

# processing-workflows

The pipeline that transforms raw material into connected knowledge. Capture, reduce, reflect, verify -- each phase's purpose, quality gates, and orchestration patterns.

## Core Ideas

### Research
- [[LLM attention degrades as context fills]] -- The first ~40% of context window is the "smart zone" where reasoning is sharp; beyond that, attention diffuses and quali
- [[PKM failure follows a predictable cycle]] -- PKM systems fail through a predictable 7-stage cascade from Collector's Fallacy to abandonment, where each stage creates
- [[ThreadMode to DocumentMode transformation is the core value creation step]] -- Ward Cunningham's wiki distinction names what the vault pipeline actually does — inbox captures are chronological thread
- [[WIP limits force processing over accumulation]] -- Hard inbox caps create forcing functions that shift behavior from capture to processing more effectively than soft guide
- [[Zeigarnik effect validates capture-first philosophy because open loops drain attention]] -- Uncompleted tasks occupy working memory until externalized, making zero-friction capture cognitively necessary not just 
- [[aspect-oriented programming solved the same cross-cutting concern problem that hooks solve]] -- AOP declared join points and advice to eliminate scattered logging and validation code in the 1990s, and agent hooks rep
- [[attention residue may have a minimum granularity that cannot be subdivided]] -- Micro-interruptions as brief as 2.8 seconds double error rates, suggesting an irreducible attention quantum below which 
- [[batching by context similarity reduces switching costs in agent processing]] -- Once you have fresh context per task, the next question is how to sequence work within a session — organizing by topic s
- [[behavioral anti-patterns matter more than tool selection]] -- PKM failure research shows systems break through habits not software — the Collector's Fallacy, productivity porn, and u
- [[bootstrapping principle enables self-improving systems]] -- Engelbart's insight that using current best tools to build better tools creates recursive improvement where each enhance
- [[capture the reaction to content not just the content itself]] -- Reactions seed synthesis while raw content only seeds reference — prompting "what is your reaction?" during capture crea
- [[closure rituals create clean breaks that prevent attention residue bleed]] -- Explicitly marking tasks as complete signals the brain to release them from working memory — for agents this means writi
- [[complex systems evolve from simple working systems]] -- Gall's Law — design from scratch fails because complexity requires evolutionary scaffolding that only working simplicity
- [[continuous small-batch processing eliminates review dread]] -- For humans, prevents psychological overwhelm that causes abandonment; for agents, enables session isolation and fresh co
- [[does agent processing recover what fast capture loses]] -- Agent processing can recover practical benefits of slow capture for the system, but the human loses encoding benefits be
- [[every knowledge domain shares a four-phase processing skeleton that diverges only in the process step]] -- Capture, connect, and verify are domain-invariant operations while the process step (extract claims, detect patterns, bu
- [[false universalism applies same processing logic regardless of domain]] -- The derivation anti-pattern where the universal four-phase skeleton is exported without adapting the process step — "ext
- [[fresh context per task preserves quality better than chaining phases]] -- Context rot means later phases run on degraded attention, so each task gets its own session to stay in the smart zone — 
- [[generation effect gate blocks processing without transformation]] -- Before any note exits inbox, require at least one agent-generated artifact exists — a description, synthesis comment, or
- [[hook composition creates emergent methodology from independent single-concern components]] -- Nine hooks across five events compose into quality pipelines, session bookends, and coordination awareness that no singl
- [[hook enforcement guarantees quality while instruction enforcement merely suggests it]] -- Hooks fire automatically regardless of attention state so quality checks happen on every operation, while instructions d
- [[hook-driven learning loops create self-improving methodology through observation accumulation]] -- Hooks enforce quality and nudge observation capture, observations accumulate until they trigger meta-cognitive review, r
- [[hooks cannot replace genuine cognitive engagement yet more automation is always tempting]] -- The same mechanism that frees agents for substantive work -- delegating procedural checks to hooks -- could progressivel
- [[incremental reading enables cross-source connection finding]] -- Interleaving extracts from multiple sources in a shared queue creates juxtaposition that surfaces relationships sequenti
- [[insight accretion differs from productivity in knowledge systems]] -- Evergreen systems optimize for depth of understanding over efficiency of output, which means the vault exists for thinki
- [[intermediate packets enable assembly over creation]] -- Work products structured as composable packets let agents assemble outputs from existing material rather than creating f
- [[intermediate representation pattern enables reliable vault operations beyond regex]] -- Parsing markdown to structured objects (JSON with link objects, metadata blocks, content sections) before operating and 
- [[methodology development should follow the trajectory from documentation to skill to hook as understanding hardens]] -- The three encoding levels -- instruction, skill, hook -- represent increasing guarantee strength, and methodology patter
- [[nudge theory explains graduated hook enforcement as choice architecture for agents]] -- Thaler and Sunstein's choice architecture maps directly to hook enforcement design -- blocking hooks are mandates, conte
- [[processing effort should follow retrieval demand]] -- Just-in-time processing on retrieval beats just-in-case front-loading because most captured notes are never revisited
- [[productivity porn risk in meta-system building]] -- Building sophisticated agent workflows becomes procrastination when output stays flat while complexity grows—building su
- [[reflection synthesizes existing notes into new insight]] -- re-reading own notes surfaces cross-note patterns invisible in any single note — exploratory traversal with fresh contex
- [[schema enforcement via validation agents enables soft consistency]] -- Validation hooks that warn on schema violations without blocking preserve flexibility while encouraging consistency — qu
- [[schema templates reduce cognitive overhead at capture time]] -- Pre-defined fields shift capture decisions from "what should I record" to "fill these boxes," reducing cognitive load fo
- [[session boundary hooks implement cognitive bookends for orientation and reflection]] -- SessionStart loads situational awareness (spatial, temporal, task, metacognitive orientation) while Stop forces metacogn
- [[session handoff creates continuity without persistent memory]] -- Externalized state in task files and work queues gives each fresh session a briefing from the previous one, solving the 
- [[session outputs are packets for future selves]] -- each session's output should be a composable building block for future sessions — the intermediate packets pattern appli
- [[skills encode methodology so manual execution bypasses quality gates]] -- Skills contain selectivity gates, verification steps, and phase boundaries that ad-hoc execution cannot replicate consis
- [[structure without processing provides no value]] -- The "Lazy Cornell" anti-pattern shows that drawing lines without doing the work produces no benefit over linear notes — 
- [[temporal processing priority creates age-based inbox urgency]] -- Age thresholds convert the Ebbinghaus decay principle into actionable queue logic — notes under 24 hours are standard, 2
- [[temporal separation of capture and processing preserves context freshness]] -- Dump first then structure within 24 hours — Ebbinghaus decay means capture context fades fast, so inbox processing shoul
- [[the determinism boundary separates hook methodology from skill methodology]] -- Operations producing identical results regardless of input content, context state, or reasoning quality belong in hooks;
- [[three capture schools converge through agent-mediated synthesis]] -- Accumulationist speed, Interpretationist quality, and Temporal context preservation stop being tradeoffs when agent proc
- [[throughput matters more than accumulation]] -- Success in knowledge systems is measured by processing velocity from capture to synthesis, not by the size of the archiv
- [[vibe notetaking is the emerging industry consensus for AI-native self-organization]] -- The "dump and AI organizes" pattern converges across tools, but most implementations use opaque embeddings while agent-c
- [[voice capture is the highest-bandwidth channel for agent-delegated knowledge systems]] -- Voice at 150 wpm triples typing speed while preserving emotional markers (tone, urgency, emphasis) that inform which con

### Guidance
- [[adapt the four-phase processing pipeline to domain-specific throughput needs]] -- Pipeline philosophy for the derivation engine — when heavy, medium, or light processing is appropriate, how the four-pha

## Tensions

(Capture conflicts as they emerge)

## Open Questions

- What is the optimal context isolation strategy for multi-phase processing?
- When does compressed processing degrade quality unacceptably?

---

Topics:
- [[index]]
