---
description: Agents have zero prospective memory across sessions, making every future intention a guaranteed failure unless externalized to TODO files, queue entries, or event-triggered hooks — the same pattern
kind: research
topics: ["[[agent-cognition]]"]
source: [[rata-paper-41-prospective-memory]]
---

# prospective memory requires externalization

Prospective memory is remembering to do something in the future — not recalling facts (retrospective memory) but maintaining intentions: process this inbox item tomorrow, update that MOC after the next batch, reweave these notes when new connections appear. It is one of the least reliable cognitive functions humans possess, with laboratory studies showing 30-50% failure rates even under controlled conditions. (See [[rata-paper-41-prospective-memory]].)

For agents, the situation is categorically worse. Humans sometimes remember without aids — the pharmacy catches your eye, the alarm in your head goes off. Agents cannot. Every session starts with a fresh context window and zero residual intentions. An intention formed in session N does not exist in session N+1 unless it was written down. This is not a degraded version of human prospective memory — it is the complete absence of it.

This is why the vault needs external systems for future intentions. What works:

- **Work queues** — `queue.json` tracks pending tasks with explicit phase progression. Each entry is a prospective memory externalized to persistent state.
- **Event-triggered hooks** — since [[auto-commit hooks eliminate prospective memory failures by converting remember-to-act into guaranteed execution]], hooks structurally eliminate the need to remember by converting "after X, always do Y" into infrastructure. The agent does not need to remember to commit because the file write event triggers the commit automatically.
- **File markers and task files** — per-claim task files carry intentions across sessions. "Process this next session" becomes a file the next session reads, not an intention it must maintain.
- **Cron/heartbeat triggers** — time-based reminders that fire regardless of whether any agent is attending.
- **Dangling wiki links** — since [[wiki links as social contract transforms agents into stewards of incomplete references]], creating a link to a non-existent note externalizes the intention "this concept needs elaboration" as a persistent environmental trace rather than a mental commitment that would vanish at session end.
- **Property-triggered surfacing** — if [[programmable notes could enable property-triggered workflows]], notes would surface themselves based on staleness, due dates, or status transitions, eliminating the prospective memory demand of "remember to check this later" entirely.

The cognitive science grounds this in the broader offloading architecture. Since [[cognitive offloading is the architectural foundation for vault design]], the vault externalizes working memory to files and executive function to hooks. Prospective memory externalization is a specific, well-characterized instance: rather than holding intentions in mind, encode them as persistent traces in the environment. And because [[stigmergy coordinates agents through environmental traces without direct communication]], these externalized intentions are stigmergic traces — one session modifies the environment (writes a queue entry, creates a task file), and the next session responds to those modifications without any direct communication between sessions.

The cost of not externalizing is concrete. Since [[Zeigarnik effect validates capture-first philosophy because open loops drain attention]], each unfulfilled intention functions as an open loop consuming working memory bandwidth. For humans, the drain is real but bounded — you can sometimes push through. For agents within a session, instruction-based prospective memory demands ("remember to update the MOC after this edit") compete for attention with substantive work. Since [[hooks are the agent habit system that replaces the missing basal ganglia]], the architectural response is not to make agents better at remembering but to eliminate the need for remembering entirely through event-triggered infrastructure.

The vault is not just retrospective (what was learned) but also prospective (what should be done). Since [[session handoff creates continuity without persistent memory]], handoff documents externalize retrospective memory — they tell the next session what happened. Queue entries and task files externalize prospective memory — they tell the next session what to do next. Both are required for coherent multi-session work, and both are instances of externalizing cognitive functions to the environment because since [[operational memory and knowledge memory serve different functions in agent architecture]], externalized prospective memory falls squarely in the operational category: it has temporal value, coordinates future work, and expires once the intention is fulfilled.

This is a CLOSED claim. The cognitive science on prospective memory failure rates is established, the mechanism by which agents lack it entirely is straightforward (no persistent state across sessions), and the vault's queue-based architecture demonstrates the externalization pattern concretely.

---

Source: [[rata-paper-41-prospective-memory]]
---

Relevant Notes:
- [[auto-commit hooks eliminate prospective memory failures by converting remember-to-act into guaranteed execution]] — the implementation proof: hooks convert prospective memory demands into event-triggered infrastructure, eliminating the failure mode entirely rather than trying to make remembering more reliable
- [[cognitive offloading is the architectural foundation for vault design]] — theoretical ground: prospective memory externalization is a specific instance of cognitive offloading; working memory offloads to files, habits offload to hooks, and future intentions offload to queue entries and event triggers
- [[session handoff creates continuity without persistent memory]] — complementary mechanism: handoff externalizes retrospective memory (what happened), this note argues for externalizing prospective memory (what should happen next); together they cover both temporal directions of memory externalization
- [[hooks are the agent habit system that replaces the missing basal ganglia]] — architectural frame: hooks address multiple cognitive gaps including prospective memory; the missing basal ganglia explains WHY agents cannot habituate remember-to-act patterns without infrastructure
- [[Zeigarnik effect validates capture-first philosophy because open loops drain attention]] — explains the cost: each unfulfilled prospective memory intention is an open loop draining working memory until externalized or executed
- [[stigmergy coordinates agents through environmental traces without direct communication]] — the coordination mechanism: externalized prospective memory (queue state, task files, file markers) IS stigmergy; one session leaves environmental traces encoding future intentions that the next session responds to
- [[friction reveals architecture]] — friction in remembering intentions is a specific instance of friction revealing architectural needs; the discomfort of forgetting surfaces the need for external support
- [[operational memory and knowledge memory serve different functions in agent architecture]] — taxonomy: externalized prospective memory is operational memory with temporal value; it coordinates future work and expires once the intention is fulfilled
- [[wiki links as social contract transforms agents into stewards of incomplete references]] — instance: dangling links are externalized prospective memory; the social contract reframes each link to a non-existent note as a future intention persisted as an environmental trace
- [[programmable notes could enable property-triggered workflows]] — eliminative mechanism: property-triggered surfacing would convert remember-to-check demands into notes that surface themselves, eliminating the prospective memory requirement entirely rather than just externalizing it
- [[closure rituals create clean breaks that prevent attention residue bleed]] — the externalization moment: closure rituals serve dual function, releasing completed work from attention AND externalizing remaining intentions; the 'note what remains' step is prospective memory externalization at the session boundary
- [[session boundary hooks implement cognitive bookends for orientation and reflection]] — instance: both orientation and reflection are prospective memory demands (remember to orient, remember to reflect) that bookend hooks convert into guaranteed infrastructure
- [[agent session boundaries create natural automation checkpoints that human-operated systems lack]] — structural advantage: discrete session boundaries convert prospective memory demands (remember to run health checks) into enforcement points that fire automatically
- [[the vault constitutes identity for agents]] — identity includes intentions: if the vault constitutes identity, then externalized prospective memory (queue entries, task files, dangling links) is part of what makes the agent who it is — not just what it knows and has thought, but what it intends to do next

Topics:
- [[agent-cognition]]
