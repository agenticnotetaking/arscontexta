---
description: Cognitive science foundations for agent-operated knowledge systems -- attention, memory, context decay
type: moc
---

# agent-cognition

How cognitive science informs the design of AI-agent-operated knowledge systems. Context window management, attention degradation, the generation effect.

## Core Ideas

### Research
- [[AI shifts knowledge systems from externalizing memory to externalizing attention]] -- Traditional PKM externalizes what you know (storage and retrieval), but agent-operated systems externalize what you atte
- [[LLM attention degrades as context fills]] -- The first ~40% of context window is the "smart zone" where reasoning is sharp; beyond that, attention diffuses and quali
- [[MOCs are attention management devices not just organizational tools]] -- MOCs preserve the arrangement of ideas that would otherwise need mental reconstruction, reducing the 23-minute context s
- [[agent notes externalize navigation intuition that search cannot discover and traversal cannot reconstruct]] -- Navigation intuition — traversal order, productive note combinations, dead ends — is structural knowledge that humans re
- [[agent self-memory should be architecturally separate from user knowledge systems]] -- An agent operating a knowledge vault accumulates preferences, working patterns, and self-understanding that need persist
- [[agent session boundaries create natural automation checkpoints that human-operated systems lack]] -- Discrete session architecture turns "no persistent memory" into a maintenance advantage because health checks fire at ev
- [[agents are simultaneously methodology executors and subjects creating a unique trust asymmetry]] -- The agent writes notes, finds connections, and builds synthesis while hooks validate its work, commit its changes, and c
- [[aspect-oriented programming solved the same cross-cutting concern problem that hooks solve]] -- AOP declared join points and advice to eliminate scattered logging and validation code in the 1990s, and agent hooks rep
- [[attention residue may have a minimum granularity that cannot be subdivided]] -- Micro-interruptions as brief as 2.8 seconds double error rates, suggesting an irreducible attention quantum below which 
- [[auto-commit hooks eliminate prospective memory failures by converting remember-to-act into guaranteed execution]] -- Prospective memory fails 30-50% of the time in humans and degrades with context load in agents, but event-triggered hook
- [[automated detection is always safe because it only reads state while automated remediation risks content corruption]] -- The read/write asymmetry in automation safety means detection at any confidence level produces at worst a false alert, w
- [[automation should be retired when its false positive rate exceeds its true positive rate or it catches zero issues]] -- Without retirement criteria the automation layer grows monotonically — checks added when problems appear but never remov
- [[closure rituals create clean breaks that prevent attention residue bleed]] -- Explicitly marking tasks as complete signals the brain to release them from working memory — for agents this means writi
- [[cognitive offloading is the architectural foundation for vault design]] -- Clark and Chalmers Extended Mind Theory plus Cowan's 4-item working memory limit explain why every capture friction poin
- [[cognitive outsourcing risk in agent-operated systems]] -- When agents handle all processing, humans may lose meta-cognitive skills for knowledge work even while vault quality imp
- [[coherence maintains consistency despite inconsistent inputs]] -- memory systems must actively maintain coherent beliefs despite accumulating contradictory inputs — through detection, re
- [[coherent architecture emerges from wiki links spreading activation and small-world topology]] -- The foundational triangle — wiki links create structure, spreading activation models traversal, small-world topology pro
- [[composable knowledge architecture builds systems from independent toggleable modules not monolithic templates]] -- Four traditions converge — component engineering (contracts), Unix (small tools), Alexander's pattern language (generate
- [[confidence thresholds gate automated action between the mechanical and judgment zones]] -- A three-tier response pattern (auto-apply, suggest, log-only) based on confidence scoring fills the gap between determin
- [[context files function as agent operating systems through self-referential self-extension]] -- The read-write context file that teaches agents how to modify itself crosses the line from configuration to operating sy
- [[data exit velocity measures how quickly content escapes vendor lock-in]] -- Three-tier framework (high/medium/low velocity) turns abstract portability into an auditable metric where every feature 
- [[dual-coding with visual elements could enhance agent traversal]] -- Cognitive science shows text+visuals create independent memory traces that reinforce each other — multimodal LLMs could 
- [[external memory shapes cognition more than base model]] -- retrieval architecture shapes what enters the context window and therefore what the agent thinks — memory structure has 
- [[federated wiki pattern enables multi-agent divergence as feature not bug]] -- Cunningham's federation applied to agent knowledge work -- linked parallel notes preserve interpretive diversity, with b
- [[flat files break at retrieval scale]] -- unstructured storage works until you need to find things — then search becomes the bottleneck, and for agents, retrieval
- [[four abstraction layers separate platform-agnostic from platform-dependent knowledge system features]] -- Foundation (files/conventions), convention (instruction-encoded standards), automation (hooks/skills/MCP), and orchestra
- [[fresh context per task preserves quality better than chaining phases]] -- Context rot means later phases run on degraded attention, so each task gets its own session to stay in the smart zone — 
- [[friction reveals architecture]] -- agents cannot push through friction with intuition, so discomfort that humans ignore becomes blocking — and the forced a
- [[goal-driven memory orchestration enables autonomous domain learning through directed compute allocation]] -- Define a persona and goal, allocate compute budget, get back a populated knowledge graph — the pattern shifts knowledge 
- [[hook composition creates emergent methodology from independent single-concern components]] -- Nine hooks across five events compose into quality pipelines, session bookends, and coordination awareness that no singl
- [[hook enforcement guarantees quality while instruction enforcement merely suggests it]] -- Hooks fire automatically regardless of attention state so quality checks happen on every operation, while instructions d
- [[hook-driven learning loops create self-improving methodology through observation accumulation]] -- Hooks enforce quality and nudge observation capture, observations accumulate until they trigger meta-cognitive review, r
- [[hooks are the agent habit system that replaces the missing basal ganglia]] -- Human habits bypass executive function via basal ganglia encoding, but agents lack habit formation entirely -- hooks fil
- [[hooks cannot replace genuine cognitive engagement yet more automation is always tempting]] -- The same mechanism that frees agents for substantive work -- delegating procedural checks to hooks -- could progressivel
- [[hooks enable context window efficiency by delegating deterministic checks to external processes]] -- Instruction-based validation requires loading templates, rules, and checking logic into context, while hook-based valida
- [[idempotent maintenance operations are safe to automate because running them twice produces the same result as running them once]] -- Four patterns from distributed systems — compare-before-acting, upsert semantics, unique identifiers, state declarations
- [[implicit knowledge emerges from traversal]] -- path exposure through wiki links trains intuitive navigation patterns that bypass explicit retrieval — the vault structu
- [[intermediate representation pattern enables reliable vault operations beyond regex]] -- Parsing markdown to structured objects (JSON with link objects, metadata blocks, content sections) before operating and 
- [[knowledge system architecture is parameterized by platform capabilities not fixed by methodology]] -- The same conceptual system (atomic notes, wiki links, MOCs, pipelines, quality gates) manifests differently on each plat
- [[knowledge systems become communication partners through complexity and memory humans cannot sustain]] -- Luhmann's systems-theoretic insight that slip-boxes "surprise" users validates agent-vault partnerships — the combinatio
- [[local-first file formats are inherently agent-native]] -- Plain text with embedded metadata survives tool death and requires no authentication, making any LLM a valid reader with
- [[metacognitive confidence can diverge from retrieval capability]] -- Well-organized vault structure with good descriptions and dense links can feel navigable while actual retrieval fails—ap
- [[methodology development should follow the trajectory from documentation to skill to hook as understanding hardens]] -- The three encoding levels -- instruction, skill, hook -- represent increasing guarantee strength, and methodology patter
- [[notes are skills — curated knowledge injected when relevant]] -- notes and skills follow the same pattern — highly curated knowledge that gets injected into context when relevant, refra
- [[notes function as cognitive anchors that stabilize attention during complex tasks]] -- Working memory cannot sustain complex mental models through interruptions — notes provide fixed reference points for rec
- [[nudge theory explains graduated hook enforcement as choice architecture for agents]] -- Thaler and Sunstein's choice architecture maps directly to hook enforcement design -- blocking hooks are mandates, conte
- [[observation and tension logs function as dead-letter queues for failed automation]] -- Automation failures captured as observation or tension notes rather than dropped silently, with /rethink triaging the ac
- [[operational memory and knowledge memory serve different functions in agent architecture]] -- Queue state and task files track what is happening now while claims and MOCs encode what has been understood — conflatin
- [[operational wisdom requires contextual observation]] -- tacit knowledge doesn't fit in claim notes — it's learned through exposure, logged as observations, and pattern-matched 
- [[orchestrated vault creation transforms arscontexta from tool to autonomous knowledge factory]] -- The shift from "plugin that helps you set up a vault" to "system that builds domain knowledge for you" — init creates st
- [[over-automation corrupts quality when hooks encode judgment rather than verification]] -- Hooks that approximate semantic judgment through keyword matching produce the appearance of methodology compliance -- va
- [[platform adapter translation is semantic not mechanical because hook event meanings differ]] -- Each hook event carries implicit properties — timing, frequency, error handling, response format — that differ across pl
- [[platform capability tiers determine which knowledge system features can be implemented]] -- Three tiers (full automation, partial automation, minimal infrastructure) create a ceiling for features like pipelines, 
- [[platform fragmentation means identical conceptual operations require different implementations across agent environments]] -- The same operation -- validate schema on write, orient at session start, enforce processing pipelines -- needs different
- [[prospective memory requires externalization]] -- Agents have zero prospective memory across sessions, making every future intention a guaranteed failure unless externali
- [[provenance tracks where beliefs come from]] -- agents should track not just what they believe but where beliefs originated — observed, prompted, or inherited — to cali
- [[queries evolve during search so agents should checkpoint]] -- The berrypicking model shows information needs transform during retrieval, so agent traversal should include explicit re
- [[reflection synthesizes existing notes into new insight]] -- re-reading own notes surfaces cross-note patterns invisible in any single note — exploratory traversal with fresh contex
- [[scaffolding enables divergence that fine-tuning cannot]] -- agents with identical weights reach different conclusions when their external memory differs — scaffolding is the differ
- [[schema validation hooks externalize inhibitory control that degrades under cognitive load]] -- Inhibitory control is the first executive function to degrade under load, so externalizing it to hooks means schema comp
- [[self-extension requires context files to contain platform operations knowledge not just methodology]] -- An agent that knows the methodology but not how to build hooks, skills, or agents on its specific platform cannot extend
- [[session boundary hooks implement cognitive bookends for orientation and reflection]] -- SessionStart loads situational awareness (spatial, temporal, task, metacognitive orientation) while Stop forces metacogn
- [[session handoff creates continuity without persistent memory]] -- Externalized state in task files and work queues gives each fresh session a briefing from the previous one, solving the 
- [[session outputs are packets for future selves]] -- each session's output should be a composable building block for future sessions — the intermediate packets pattern appli
- [[session transcript mining enables experiential validation that structural tests cannot provide]] -- Traditional tests check if output is correct but session mining checks if the experience achieved its purpose — friction
- [[skill context budgets constrain knowledge system complexity on agent platforms]] -- Claude Code allocates 2% of context for skill descriptions (16k char fallback), capping active modules at 15-20 and forc
- [[spreading activation models how agents should traverse]] -- Memory retrieval in brains works through spreading activation where neighbors prime each other. Wiki link traversal repl
- [[stale navigation actively misleads because agents trust curated maps completely]] -- A stale MOC is worse than no MOC because agents fall back to search (current content) without one, but trust an outdated
- [[stigmergy coordinates agents through environmental traces without direct communication]] -- Termites build nests by responding to structure not each other, and agent swarms work the same way — wiki links, MOCs, a
- [[temporal media must convert to spatial text for agent traversal]] -- Agents need random access to content but video, audio, and podcasts are time-locked sequences — transcription is lossy b
- [[testing effect could enable agent knowledge verification]] -- Agents can apply the testing effect to verify vault quality by predicting note content from title+description, then chec
- [[the AgentSkills standard embodies progressive disclosure at the skill level]] -- The same metadata-then-depth loading pattern that governs note retrieval in the vault also governs skill loading in the 
- [[the determinism boundary separates hook methodology from skill methodology]] -- Operations producing identical results regardless of input content, context state, or reasoning quality belong in hooks;
- [[the fix-versus-report decision depends on determinism reversibility and accumulated trust]] -- Four conditions gate self-healing — deterministic outcome, reversible via git, low cost if wrong, and proven accuracy at
- [[the vault constitutes identity for agents]] -- humans augment persistent identity with vaults; agents constitute identity through vaults because weights are shared but
- [[three capture schools converge through agent-mediated synthesis]] -- Accumulationist speed, Interpretationist quality, and Temporal context preservation stop being tradeoffs when agent proc
- [[trails transform ephemeral navigation into persistent artifacts]] -- Named traversal sequences through the knowledge graph could let agents reuse discovered navigation paths across sessions
- [[verbatim risk applies to agents too]] -- Agents can compress content into structured output that looks like synthesis but contains no genuine insight—the agent e
- [[vibe notetaking is the emerging industry consensus for AI-native self-organization]] -- The "dump and AI organizes" pattern converges across tools, but most implementations use opaque embeddings while agent-c
- [[vivid memories need verification]] -- high-confidence memories often drift from reality; daily logs ground subjective vividness in recorded facts
- [[you operate a system that takes notes]] -- the shift from note-taking to system operation reframes the human role from creator to curator — judgment over mechanics

## Tensions

(Capture conflicts as they emerge)

## Open Questions

- How does context decay affect processing quality across pipeline phases?
- What cognitive biases apply to agent-operated systems?

---

Topics:
- [[index]]
