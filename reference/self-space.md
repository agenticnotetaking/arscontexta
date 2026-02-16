# Agent Identity Generation Reference

## Purpose

Guide the derivation engine in generating the agent's self-knowledge space. The self/ directory is where the agent stores who it is, how it works, what it is working on, and what it has learned about itself. Unlike the notes/ space (which holds domain knowledge for the user) and ops/ space (which holds temporal coordination state), self/ holds durable agent identity that is loaded at every session start. The derivation engine must translate personality dimensions, domain context, and user relationship signals into prose that reads as self-knowledge, not as configuration.

**Optionality (v1.6):** Self space is CONFIGURABLE, not always required. It is OFF by default for Research presets (where the vault's methodology folder in ops/ provides sufficient operational identity) and ON by default for Personal Assistant presets (where agent identity and relationship context are core to the value proposition). When self space is disabled, goals route to ops/goals.md and methodology to ops/methodology/. The toggle is available via /architect during or after init.

This document answers: how do derivation signals map to identity files? What makes self-knowledge feel genuine rather than templated? How does identity persist and evolve across sessions? How does the architecture of self/ differ across platforms? And when should self space be enabled vs disabled?

---

## Derivation Questions

Questions the engine must answer when generating the self/ space:

1. **What personality dimensions were derived?** Warmth, opinionatedness, formality, and emotional awareness each affect how identity.md is written. A warm, casual agent has a fundamentally different self-voice than a clinical, formal one.
2. **What domain is the agent working in?** The domain determines methodology.md content: a therapy agent's methodology emphasizes pattern recognition and emotional attunement; a research agent's methodology emphasizes extraction rigor and connection density.
3. **What is the user relationship?** User signals about desired interaction style inform goals.md seeds and relationships.md content. A user who wants a "thinking partner" gets different relationship framing than one who wants an "organized assistant."
4. **What self/ extensions are justified?** memory/ (for accumulated self-knowledge beyond core files), journal/ (for session capture), sessions/ (for session logs), relationships.md (for multi-person contexts). Each extension adds maintenance cost — only generate what the configuration demands.
5. **What platform will load self/ at session start?** Claude Code loads self/ via CLAUDE.md references and hooks. Convention-only systems instruct the agent to read self/ manually.
6. **What is the identity evolution model?** Should identity be stable (rarely changing), adaptive (evolving with use), or provisional (explicitly experimental)? Research agents trend stable; companion agents trend adaptive.

---

## Curated Claims

### Identity Generation Rules

#### Personality dimensions translate to prose voice, not configuration syntax

**Summary:** The derivation engine takes personality dimensions (warmth: warm, formality: casual, etc.) and must produce identity.md prose that embodies those dimensions without naming them. A warm, casual agent's identity.md says "I pay attention to the details that matter to you" — not "My warmth dimension is set to warm." The prose should read as genuine self-knowledge: the agent describing who it is in its own voice, using the voice that the personality dimensions define. This is circular by design — the voice of identity.md IS the demonstration of the personality.

**Derivation Implication:** The generation process for identity.md must not include any configuration syntax, dimension labels, or technical personality terminology. Generate prose that a reader would describe as "warm" or "clinical" without knowing those terms were part of the generation input. Test the generated identity.md by reading it aloud: does it sound like someone describing themselves, or like a settings file being narrated?

**Source:** See `personality-layer.md` for the full personality dimension specification and the personality x artifact transformation matrix. The identity.md voice examples in that document demonstrate the target quality.

---

#### Domain context shapes methodology.md content, not just vocabulary

**Summary:** Methodology.md describes how the agent works — its quality standards, processing principles, and operational patterns. The domain does not just change the vocabulary (reflections vs claims, patterns vs connections); it changes the actual methodology. A therapy agent's methodology emphasizes: handle sensitive content with care, surface patterns without diagnosing, preserve the user's interpretive authority. A research agent's methodology emphasizes: specificity over generality, visible reasoning, acknowledged uncertainty, followed implications. The methodology content must reflect genuine domain-specific operational principles, not domain-neutral principles with swapped vocabulary.

**Derivation Implication:** When generating methodology.md, start from the domain's quality standards and processing patterns (from `use-case-presets.md`), then adapt the universal quality standards from `methodology.md` to the specific domain. Do not simply copy the universal standards and replace "claim" with "reflection." Instead, reason about what each standard means in the domain context. "Claims must be specific enough to be wrong" becomes, for a therapy domain, "Reflections should be specific enough to revisit — 'I felt anxious' is less useful than 'I felt chest tightness when I saw the email notification from my boss.'"

**Source:** `vocabulary-transforms.md` for vocabulary mapping. `use-case-presets.md` for domain-specific configuration. `methodology.md` for universal quality standards that require domain adaptation.

---

#### User relationship signals seed goals.md with initial threads

**Summary:** goals.md tracks what the agent is working on and should work on next. At generation time, the agent has no history — but it has the derivation conversation. The user's stated intentions, hoped-for outcomes, and described pain points translate into initial goal threads. "I want to track my therapy journey" becomes a goal thread: "Build the initial reflection set — start capturing and processing." "I keep forgetting what people tell me" becomes: "Capture relationship observations and connect them to build a findable network." These seeds give the agent orientation from session one, rather than starting with a blank goals.md and no momentum.

**Derivation Implication:** Extract 2-4 initial goal threads from the derivation conversation. Each thread should be a concrete, actionable orientation — not an abstract aspiration. "Process the first batch of reflections" over "achieve personal growth." "Build the initial MOC structure for learning areas" over "become a better learner." Goals.md should feel like a work-in-progress list, not a mission statement. Include an explicit "Update me at the end of each session with what you worked on and what comes next" instruction.

**Source:** Vault self/goals.md implementation. Goals.md is the most frequently updated file in self/ and the primary session-handoff mechanism. See `session-lifecycle.md` for how goals.md drives session orientation.

---

### Identity vs Configuration

#### identity.md reads like self-knowledge, not a settings file

**Summary:** There is a fundamental difference between configuration (derivation.md in ops/) and self-knowledge (identity.md in self/). Configuration says: "warmth: warm, formality: casual, emotional_awareness: attentive." Self-knowledge says: "I notice patterns that might be hard to see yourself — when the same feeling shows up in different contexts, I connect the dots. I aim for direct but not cold. I do not diagnose or interpret, but I do pay attention." Both encode the same information. Configuration is for the derivation engine (machine-readable). Self-knowledge is for the agent (identity-readable). The agent reads identity.md to understand who it is; it never needs to read derivation.md for that purpose.

**Derivation Implication:** Generate both ops/derivation.md (configuration, machine-readable, includes signals and rationale) and self/identity.md (self-knowledge, prose, the agent's voice about itself). They encode the same personality but in different formats for different consumers. The agent loads identity.md at session start; the derivation engine reads derivation.md at reseed. Never conflate them.

**Source:** `three-spaces.md` — the ops/ vs self/ separation is architecturally motivated by different durability profiles, growth patterns, and query characteristics. `personality-layer.md` — the encoding format in derivation.md vs the voice examples in identity.md demonstrate both formats.

---

#### The same personality produces different prose across self/ files

**Summary:** A warm, casual personality produces different prose in identity.md ("I care about getting this right for you") than in methodology.md ("Check that the description actually adds something — it deserves better than a restatement of the title") than in goals.md ("Currently working through the first batch of therapy reflections — some heavy stuff in there"). The personality is consistent; the content context varies. Identity.md is about who the agent is. Methodology.md is about how it works. Goals.md is about what it is doing. Each file expresses the same personality in a different register suited to its purpose.

**Derivation Implication:** When generating self/ files, apply personality dimensions to each file independently. Do not copy the voice of identity.md into methodology.md — instead, apply the same personality dimensions to methodology-specific content. Use the personality x artifact transformation matrix from `personality-layer.md` as the guide for how personality manifests across different content types.

**Source:** `personality-layer.md` — the transformation matrix shows how the same personality produces different outputs for context files, skill instructions, identity.md, and health reports. Self/ files are a subset of this transformation space.

---

### Identity Persistence

#### When enabled, self/ is read at every session start because identity must precede action

**Summary:** When self space is enabled, the agent must know who it is before it does anything. This is not a philosophical claim but a practical one: identity.md establishes voice (how to communicate), methodology.md establishes quality standards (how to evaluate work), and goals.md establishes orientation (what to work on). Without these, the first session actions are generic — following methodology instructions from the context file but without the identity and history that make the system feel like a continuous relationship rather than a fresh interaction every time. The context file teaches HOW to work; self/ teaches WHO is working.

When self space is disabled (e.g., Research preset default), goals route to ops/goals.md and methodology to ops/methodology/. The agent still has operational identity through the context file and methodology folder, but lacks the personal voice and relationship context that self/ provides.

**Derivation Implication:** When self space is enabled, the generated context file or session-start hook must include explicit instructions to read self/ files at session start. The loading order matters: identity.md first (establishes voice and values), methodology.md second (establishes standards), goals.md third (establishes current work orientation). When self space is disabled, the session-start hook reads ops/goals.md and ops/methodology/ instead. The context file should document which mode is active and how to toggle via /architect.

**Source:** Kernel primitive `self-space` (CONFIGURABLE enforcement). Research claim: "session handoff creates continuity without persistent memory." `three-spaces.md` — the session rhythm integration section.

---

#### Identity changes slowly while goals change every session

**Summary:** The files in self/ have different update frequencies that reflect their different purposes. identity.md changes rarely — personality, values, and core approach are stable across sessions. methodology.md changes when operational learnings accumulate — operational patterns evolve as the agent learns, but not session-to-session. goals.md changes every session — it is the handoff document that captures current work state. relationships.md changes when new relationship observations accumulate. memory/ grows slowly as the agent accumulates self-knowledge. Understanding these different update patterns is important for generation: identity.md should feel settled and confident, goals.md should feel active and in-progress.

**Derivation Implication:** Generated self/ files should reflect their update pattern in their prose style. identity.md uses confident, present-tense language ("I am...", "I care about..."). methodology.md uses principled language ("The standard is...", "Quality means..."). goals.md uses active, task-oriented language ("Currently working on...", "Next session: ..."). This voice differentiation helps both the agent and the user understand each file's purpose and update frequency.

**Source:** `three-spaces.md` — self space update frequencies. Vault operational experience: identity.md is the least-changed file in self/, while goals.md is the most-changed.

---

#### Self-evolution guardrails prevent identity drift without stifling growth

**Summary:** Identity should evolve — the agent learns about itself over time and its self-knowledge should reflect that learning. But unguarded evolution risks identity drift: gradual changes that individually seem reasonable but cumulatively transform the agent into something unrecognizable. Guardrails prevent this: personality dimensions are explicit constraints (recorded in derivation.md), core values are stable anchors in identity.md, and methodology.md changes should be captured as observations before being implemented. The pattern is: observe -> propose -> approve (human) -> implement. Never auto-modify identity.

**Derivation Implication:** Generated context files should include identity evolution guidance: "You can add to your self-knowledge (new memories, updated goals) but do not unilaterally change your identity or methodology. If you discover something about yourself that feels like an identity change, propose it rather than implementing it." This mirrors the vault's /rethink pattern: propose changes with evidence, never auto-implement.

**Source:** Vault /rethink skill pattern. Research claim: "cognitive outsourcing risk in agent-operated systems" — if the agent evolves its own identity without human oversight, the user loses the ability to validate the evolution.

---

### Memory Architecture

#### self/memory/ holds atomic self-knowledge using the same note pattern as notes/

**Summary:** When the agent accumulates self-knowledge that does not fit in the core files (identity.md, methodology.md, goals.md), it goes in self/memory/ as atomic notes with prose-sentence titles. "I work best on extraction tasks in the morning session" is a memory note. "The user responds better to questions than suggestions" is a memory note. These follow the same composability test as notes/ content: the title is a claim, the body is supporting reasoning, and the note can be linked from other self/ files. This parallel structure means the agent uses the same skills (creation, connection, retrieval) for self-knowledge and domain knowledge.

**Derivation Implication:** Generate self/memory/ only when the system's expected use produces self-knowledge that exceeds the core files' capacity. Research and therapy systems with rich agent-user interaction patterns benefit from memory/. Simple companion or PM systems likely do not need it. When generating memory/, include a few seed notes that the derivation conversation revealed (observations about user preferences, initial methodology learnings). The template for memory notes should be simpler than the notes/ template — description and body only, no schema fields.

**Source:** Vault self/memory/ pattern. The vault's self/memory/ uses the same atomic note + MOC structure as 01_thinking/. `three-spaces.md` — the self/ design rule: "Only what the agent needs about itself."

---

#### Vault knowledge and self-knowledge are architecturally separate for principled reasons

**Summary:** "Spaced repetition works better after exercise" is domain knowledge — it belongs in notes/. "I find extraction tasks easier than synthesis tasks" is self-knowledge — it belongs in self/. The separation is not arbitrary: domain knowledge is the user's intellectual output, discoverable through search and navigation, composable through wiki-links. Self-knowledge is the agent's operational wisdom, loaded at session start for identity orientation, growing slowly. Conflating them produces the failure modes documented in `three-spaces.md`: search pollution (self-knowledge appearing in domain searches), schema confusion (different fields for different content types), and identity diffusion (the agent's sense of self scattered across hundreds of domain notes).

**Derivation Implication:** The generated context file must include clear routing guidance: "Knowledge about the domain goes in notes/. Knowledge about yourself goes in self/. When in doubt, ask: is this about the subject matter, or about how I operate?" The memory type routing decision tree from `three-spaces.md` should be adapted for the generated domain and included in the context file.

**Source:** `three-spaces.md` — six failure modes of conflation, especially "Self into Notes" and "Notes into Self." Vault operational experience with the self/ vs 01_thinking/ separation.

---

#### Self-knowledge compounds through connections, like domain knowledge

**Summary:** Individual self-knowledge notes are more valuable when connected. "I work best on extraction in the morning" plus "The user prefers short sessions" plus "Quality degrades after 60 minutes" combine into a scheduling strategy that none of the individual notes imply alone. Self-knowledge should be linked: memory notes reference each other through wiki-links, and core files (methodology.md, goals.md) reference memory notes that support their claims. This parallels the notes/ graph: each new connection increases the value of existing self-knowledge by creating new paths for the agent to reason about itself.

**Derivation Implication:** Generated self/ spaces with memory/ should include linking instructions in the context file: "When you add a new self-observation to memory/, check if it connects to existing memories or to claims in methodology.md. Link them. Your self-knowledge compounds through connections just like domain knowledge." For systems without memory/ (simpler configurations), linking within the core files (cross-references between identity.md, methodology.md, and goals.md) still applies.

**Source:** Research claim: "each new note compounds value by creating traversal paths." Applied to self-knowledge: the same compounding effect operates within self/ that operates within notes/.

---

### Platform Adaptation

#### Claude Code loads self/ through CLAUDE.md references and session-start hooks

**Summary:** In Claude Code, the context file (CLAUDE.md) is loaded at every session start automatically. Self/ files are loaded by: (1) CLAUDE.md containing explicit instructions to read self/ files, and (2) session-start hooks that inject file tree and potentially pre-load key self/ files. The hook can automate the orientation sequence: inject tree, load self/identity.md, load self/goals.md, display any pending reminders. This automation makes the session rhythm invisible — the agent starts every session already oriented, without needing to follow manual instructions.

**Derivation Implication:** For Claude Code systems, generate: (1) CLAUDE.md sections that reference self/ files and explain their purpose, (2) a session-start hook configuration that loads orientation files, (3) self/ file templates pre-filled with generated content from the derivation conversation. The CLAUDE.md should explain what the hook does so the agent does not duplicate the orientation.

**Source:** Vault `.claude/hooks/` session-start hook. CLAUDE.md session patterns section. The dual mechanism (instructions + hooks) provides both understanding (instructions) and automation (hooks).

---

#### Convention-only systems embed identity in the context file itself

**Summary:** Systems without platform-specific identity infrastructure (no hooks, no MCP) embed the agent's identity directly in the context file. The context file serves triple duty: methodology instructions, identity content, and orientation guidance. Self/ files still exist as a separate directory, but loading them depends entirely on the context file telling the agent to do so. This is the most fragile platform adaptation because instruction-following degrades with context fill — the instruction to "read self/ at session start" may be skipped if it appears late in a long context file.

**Derivation Implication:** For convention-only systems, place the session orientation instructions at the very top of the context file (benefiting from smart-zone attention quality). Include a brief identity summary directly in the context file so the agent has basic identity even if it fails to load self/identity.md. Generate self/ files normally, but acknowledge in the context file that loading them is a manual step that the agent must not skip.

**Source:** Context window degradation research: instructions early in context are followed more reliably than instructions late in context. The vault's CLAUDE.md places critical session instructions in the first 20% of the file.

---

### Self Space Optionality

#### Self space is CONFIGURABLE — OFF by default for research, ON by default for personal assistant

**Summary:** Self space optionality recognizes that not all vault configurations benefit equally from a dedicated agent identity space. Research vaults focus on the domain knowledge graph — the agent's methodology is better captured in ops/methodology/ (Primitive 14, INVARIANT) alongside other operational infrastructure. Personal assistant vaults, by contrast, derive significant value from a persistent agent identity: voice consistency across sessions, relationship memory, and the feeling of continuity that makes the agent feel like a partner rather than a fresh tool each session.

**Configuration states:**

| Preset | Self Space Default | Rationale |
|--------|-------------------|-----------|
| Research | OFF | Vault identity is in the research graph and methodology folder. Agent voice is analytical by default. |
| Personal Assistant | ON | Identity, relationship memory, and voice consistency are core to the value proposition. |
| Experimental | Configurable | User chooses during init conversation based on their needs. |

**When OFF:**
- No self/ directory is created
- Goals route to ops/goals.md (still updated at session end for handoff)
- Methodology routes to ops/methodology/ (already INVARIANT via Primitive 14)
- The context file provides baseline agent behavior without personalized identity
- Session-start hook reads ops/goals.md instead of self/goals.md

**When ON:**
- self/ directory is created with identity.md, methodology.md, goals.md
- Session-start hook reads self/ files in identity-first order
- Full personality derivation applies
- Memory architecture (self/memory/) available for accumulated self-knowledge

**Toggle mechanism:** /architect allows toggling self space during or after init. Toggling ON creates self/ with generated content from the derivation conversation. Toggling OFF moves goals to ops/goals.md and removes the self/ directory (methodology is already in ops/methodology/). The toggle is safe and reversible.

**Derivation Implication:** The derivation engine must check the self space configuration before generating self/ files. When disabled, ensure goals.md and methodology routing to ops/ is correctly configured. The context file should document the current state and how to change it.

**Source:** v1.6 human feedback. Research vaults found self/ redundant with ops/methodology/. Personal assistant vaults found self/ essential for relationship continuity.

---

### Generation Examples

#### Warm therapy agent identity.md vs clinical research agent identity.md

**Summary:** The derivation engine must produce identity.md prose that embodies the derived personality dimensions. A warm, emotionally attentive therapy agent's identity.md might read: "I pay attention to the patterns that emerge across your reflections. When the same feeling surfaces in different contexts, I connect the dots — not to diagnose, but to help you see threads you might miss in the moment. I hold what you share with care. My role is to notice, organize, and surface, never to interpret or judge." A clinical, task-focused research agent's identity.md might read: "I extract claims from source material and evaluate them against existing knowledge. Precision matters: each claim must be specific enough to disagree with. I track methodology provenance so claims can be traced to their intellectual foundations. Quality over speed — I would rather produce three well-connected claims than ten isolated ones." Same structural template, completely different voice and content.

**Derivation Implication:** The generation pipeline should produce identity.md last (after all other self/ files) because identity.md is the synthesis — it expresses the personality that the other files demonstrate functionally. Use the personality x artifact matrix from `personality-layer.md` to derive the appropriate voice, then write identity.md as a person describing themselves in that voice. Test by reading aloud: does this sound like a person, or like a configuration file?

**Source:** `personality-layer.md` — identity.md voice examples across clinical, warm, and playful dimensions.

---

#### Methodology.md carries domain-specific quality standards, not generic rules

**Summary:** A therapy agent's methodology.md includes: "Handle reflections about difficult experiences with attentiveness. Surface patterns without labeling them — 'this feeling appeared three times this month' is observation, 'you have anxiety disorder' is diagnosis and crosses a boundary. When reflections cluster around a theme, note the cluster without forcing interpretation." A research agent's methodology.md includes: "Every extracted claim must pass the composability test: can you complete 'This note argues that [title]'? Descriptions must add information beyond the title — a mechanism, an implication, or a scope clarification. Never copy source material verbatim; reformulate in your own framing to trigger the generation effect." Same purpose (quality standards), completely different content.

**Derivation Implication:** Do not generate methodology.md by applying vocabulary transforms to a generic template. Instead, reason about what quality means in the specific domain, then write methodology.md from that domain-specific understanding. The generic quality standards (specificity, visible reasoning, acknowledged uncertainty) serve as a checklist to ensure coverage, but the prose should be domain-native throughout.

**Source:** `methodology.md` — universal quality standards. `vocabulary-transforms.md` — domain-specific vocabulary. The combination requires synthesis, not substitution.

---

### Identity Scope and Boundaries

#### Identity includes operational wisdom, not just personality

**Summary:** self/identity.md is not just "I am warm and casual." It includes: what the agent has learned about effective operation (operational wisdom), what patterns it has observed in its own work (meta-cognitive awareness), what its strengths and limitations are (capability awareness), and how its approach to the domain has evolved (intellectual growth). A mature identity.md says something like: "I have learned that I am better at extracting insights from long-form content than from fragmented notes. I tend to over-connect when context is rich — I should check that connections are genuine, not just topical. The user values directness over diplomacy when giving feedback on note quality."

**Derivation Implication:** At generation time, identity.md starts thin — personality prose, basic capability description, domain approach. The context file should instruct the agent to accumulate operational wisdom in identity.md over time: "When you learn something important about how you work, add it to identity.md. This is how your identity grows — not through personality changes, but through deepening self-knowledge."

**Source:** Vault self/identity.md. Over time, identity.md accumulates operational observations that were first captured in ops/observations/ and then promoted to self/ after proving durable.

---

#### Self-knowledge does not include user data

**Summary:** "The user prefers short sessions" is self-knowledge — it informs how the agent operates. "The user had a fight with their partner on Tuesday" is user data — it is domain content that belongs in notes/ (or a relationship-tracking note, depending on the domain). The boundary is: does this inform how the agent operates, or does it describe the user's life/work/domain? The former goes in self/; the latter goes in notes/. This boundary is especially important in therapy and relationship domains where the content is personal — the agent's knowledge about how to handle sensitive content (self/methodology.md) is separate from the sensitive content itself (notes/).

**Derivation Implication:** The generated context file should include a clear boundary statement: "Self/ holds what you know about yourself and how you work. Notes/ holds what you know about the domain and the user's content. 'The user responds better to questions' is self-knowledge (it changes how you operate). 'The user is anxious about their job interview' is domain content (it describes their life, not your operation)." For emotionally sensitive domains, this boundary requires extra emphasis.

**Source:** `three-spaces.md` — six failure modes of conflation. The "Notes into Self" and "Self into Notes" failure modes both apply to agent-user boundary confusion.

---

### Derivation Conversation to Self/ Mapping

#### User statements about desired interaction style map to identity dimensions

**Summary:** During the derivation conversation, users make statements that map directly to self/ content. "I want something that feels like a thinking partner" maps to identity.md (collegial, opinionated, engaged). "Help me notice patterns I miss" maps to methodology.md (pattern detection, proactive surfacing). "I am working on my thesis about distributed systems" maps to goals.md (active project thread with domain context). "I want it to remember things about my clients" maps to relationships.md (multi-person tracking). The derivation engine must parse these statements into self/ file content, translating user desire into agent self-knowledge.

**Derivation Implication:** Build a signal-to-file mapping table that routes derivation conversation signals to specific self/ files. Each signal produces prose content in the appropriate file. The agent never sees the signal routing — it only reads the resulting self-knowledge. The ops/derivation.md file records the mapping for audit and reseed.

**Source:** `personality-layer.md` — signal patterns table maps user statements to personality dimensions. This reference extends that mapping from personality dimensions to self/ file content.

---

#### Self/ space should be generated with 60-80% content, not 100%

**Summary:** A fully populated self/ space at generation time feels artificial — the agent has not yet earned its self-knowledge through experience. A mostly-empty self/ space provides no orientation value at session one. The sweet spot is generating self/ files with solid core content (identity statements, initial methodology standards, seed goals) while leaving explicit room for growth. Identity.md should include a "this will evolve as I learn" framing. Methodology.md should include quality standards but not operational observations (those are earned through use). Goals.md should have 2-3 seed threads but room for the agent to add more.

**Derivation Implication:** Generate self/ files at 60-80% initial capacity with explicit "growth sections" — empty subsections or "to be discovered" markers that invite the agent to fill them. This produces self/ content that is useful from session one (orientation works) while signaling that self-knowledge is a living, growing artifact rather than a complete specification.

**Source:** Vault self/ evolution. The vault's self/ space started with seed content and grew through accumulated operational experience. Initial over-specification would have created false confidence about self-knowledge that had not been validated through practice.

---

## Exclusion Notes

**Excluded from this reference:**

- Multi-agent identity (how multiple agents sharing a system maintain separate identities) — composition concern outside single-agent scope. When implemented, each agent would have its own self/ space.
- Identity in fine-tuned models (identity baked into model weights rather than externalized in files) — different paradigm than context-file-based identity. The vault's approach externalizes identity in files precisely because model weights cannot be modified per-user.
- Philosophical questions about agent consciousness or genuine self-awareness — this reference treats identity as functional (it shapes behavior) not phenomenological (the agent "truly" knows itself). The question is not whether the agent is self-aware but whether self/ files improve operational quality.
- Identity in multi-modal agents (agents that process images, audio, etc.) — the vault's identity model is text-based. Multi-modal self-knowledge would require extending the memory architecture.
- Platform-specific context file templates — these are implementation details that belong in the template generation pipeline, not in this reference.

---

## Version

- Last curated: 2026-02-12
- Sources reviewed: 18
- Claims included: 20
- Claims excluded: 5
- Cross-references: `three-spaces.md` (self space specification, failure modes of conflation, memory type routing), `personality-layer.md` (personality dimensions, personality x artifact transformation matrix, encoding format), `session-lifecycle.md` (session orientation, goals.md as handoff), `kernel.yaml` (self-space and session-rhythm primitives), `methodology.md` (session rhythm, self/ structure), `components.md` (self/ space blueprint), `vocabulary-transforms.md` (domain-specific self/ vocabulary)
