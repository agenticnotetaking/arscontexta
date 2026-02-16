---
description: Define a persona and goal, allocate compute budget, get back a populated knowledge graph — the pattern shifts knowledge creation from interactive sessions to programmatic research campaigns
kind: research
topics: ["[[agent-cognition]]", "[[design-dimensions]]"]
confidence: speculative
methodology: ["Original"]
---

# goal-driven memory orchestration enables autonomous domain learning through directed compute allocation

The standard way to build a knowledge system is interactive: a human captures content, an agent processes it, they iterate over sessions. This works but scales linearly with human attention. Goal-driven orchestration inverts the relationship. Instead of the human driving each session, the human defines a goal — a persona, a domain, a set of research seeds — and the orchestrator allocates compute to achieve it. The human returns to find a populated knowledge graph they can navigate, challenge, and extend.

The mechanism is a two-agent architecture. The orchestrator agent lives in a research vault (like this one) and has access to research tools (Exa deep research, web search). The domain agent lives in a freshly derived target vault and has access to knowledge processing skills (reduce, reflect, reweave, verify). The orchestrator researches topics, writes results to the target vault's inbox, and drives the target's pipeline via `claude -p` one-shot commands. The domain agent processes each source in fresh context, creating notes, finding connections, and verifying quality. The orchestrator reads the target vault's files directly to evaluate what was learned and decide what to research next.

This is not just automation. The orchestrator is a research director making strategic decisions about what to investigate next. After each research cycle, it reads the target vault's notes and MOCs to assess coverage against the stated goal. If the attention models cluster is dense but the computational modeling cluster is sparse, it generates a follow-up research query targeted at that gap. If contradictions emerge between notes, it researches the contradiction specifically. The orchestrator's intelligence is in directing research, not just executing it.

Since [[fresh context per task preserves quality better than chaining phases]], each `claude -p` invocation gives the target vault's agent a fresh context window. This is the same quality principle that /ralph uses for pipeline processing, extended to the orchestration layer. The orchestrator maintains state between calls (tracking budget, completed cycles, knowledge coverage), but the domain agent starts fresh every time. This means 20 research cycles produce 20 high-quality processing sessions, not one degraded marathon.

The economic model is "spend compute to learn about X." A vision file specifies a budget ($50, $100, whatever the user is willing to allocate), and the orchestrator manages that budget across research and processing calls. Each `claude -p` call has a per-call cap via `--max-budget-usd`. When the budget approaches its limit, the orchestrator shifts from research to consolidation — running health checks, backward connections, and MOC updates to ensure the existing knowledge is well-integrated before stopping.

Since [[derivation generates knowledge systems from composable research claims not template customization]], the orchestrator doesn't generate the target vault from scratch. It uses ArsContexta's init wizard to derive a properly configured knowledge system for the persona's domain, complete with domain-native vocabulary, appropriate processing pipeline, and coherent configuration. Orchestration adds the content layer on top of the structural layer that derivation provides.

The coordination pattern is stigmergic. Since [[stigmergy coordinates agents through environmental traces without direct communication]], the orchestrator and target vault never exchange messages directly. The orchestrator writes research files to the target's inbox directory. The target's pipeline processes whatever it finds in inbox. The orchestrator reads the target's notes directory to see what was created. State lives in the filesystem, not in any communication protocol. This makes the architecture simple and debuggable — you can inspect every artifact at every stage.

The open question is whether `claude -p` can reliably drive the init wizard, which uses `AskUserQuestion` for interactive flow. The hypothesis is that a sufficiently detailed persona prompt provides enough signal for the wizard to resolve all eight configuration dimensions without follow-up questions. If this fails, the fallback is adding a `--vision` flag to the init command that reads a configuration file directly — which is also a valuable product feature.

There is a deeper implication. If orchestration works, it means knowledge system creation becomes a commodity: define what you want to know, allocate budget, receive a navigable knowledge graph. This shifts the value from the creation process to the quality of the derivation engine and the research direction intelligence. The competitive advantage is not in running pipelines (anyone can automate that) but in knowing what to research next and how to evaluate whether the resulting knowledge graph actually serves the stated goal. And since [[external memory shapes cognition more than base model]], the knowledge graph the orchestrator produces IS the cognitive upgrade — more impactful than any model improvement because it changes what the domain agent retrieves and therefore what it thinks. Directed compute allocation to memory architecture is high-ROI precisely because architecture determines cognition.

---
---

Relevant Notes:
- [[derivation generates knowledge systems from composable research claims not template customization]] — derivation creates the empty system; orchestration fills it with domain knowledge through directed research
- [[fresh context per task preserves quality better than chaining phases]] — the orchestrator inherits the same isolation principle: each research cycle and pipeline invocation gets fresh context via claude -p
- [[the derivation engine improves recursively as deployed systems generate observations]] — orchestrated vaults are mass-produced experiments: each generates observations that sharpen the derivation engine faster than manual deployments
- [[stigmergy coordinates agents through environmental traces without direct communication]] — the orchestrator and target vault coordinate through files on disk, not message passing: research results are written to inbox, pipeline state is read from queue files
- [[external memory shapes cognition more than base model]] — economic justification: directed compute allocation to memory architecture is high-ROI because architecture determines what the domain agent retrieves and therefore thinks; the knowledge graph IS the cognitive upgrade, more impactful than model improvement

Topics:
- [[agent-cognition]]
- [[design-dimensions]]
