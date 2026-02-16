# Ars Contexta

**A second brain for your agent.**

A Claude Code plugin that generates complete knowledge systems from conversation.
You describe how you think and work. The engine derives a cognitive architecture
-- folder structure, context files, processing pipeline, hooks, navigation maps,
and note templates -- tailored to your domain and backed by 249 research claims.

No templates. No configuration. Just conversation.

**v0.8.0** · Claude Code plugin · MIT

---

## Installation

1. Add the marketplace to Claude Code:
   ```
   /plugin marketplace add agenticnotetaking/arscontexta
   ```

2. Install the plugin:
   ```
   /plugin install arscontexta@agenticnotetaking
   ```

3. Restart Claude Code, then run:
   ```
   /arscontexta:setup
   ```

4. Answer 2-4 questions about your domain (~20 minutes -- token-intensive but one-time)

5. The engine generates your complete knowledge system

6. Restart Claude Code again to activate generated hooks and skills

7. Run `/arscontexta:help` to see everything available

---

## What It Does

Most AI tools start every session blank. Ars Contexta changes that by generating
a persistent thinking system derived from how you actually work.

**What you get:**

- **A vault** -- plain markdown files connected by wiki links, forming a traversable
  knowledge graph. No database, no cloud, no lock-in.
- **A processing pipeline** -- skills that extract insights, find connections, update
  old notes with new context, and verify quality.
- **Automation** -- hooks that enforce structure on every write, detect maintenance
  needs, capture session state, and auto-commit.
- **Navigation** -- Maps of Content (MOCs) at hub, domain, and topic levels.
- **Templates** -- note templates with `_schema` blocks as single source of truth.
- **A user manual** -- 7 pages of domain-native documentation generated alongside.

**The key differentiator:** derivation, not templating. Every choice traces to
specific research claims. The engine reasons from principles about what your
domain needs and why.

---

## The Setup Flow

`/arscontexta:setup` runs a 6-phase process:

| Phase | What Happens |
|-------|-------------|
| **Detection** | Detects Claude Code environment and capabilities |
| **Understanding** | 2-4 conversation turns where you describe your domain |
| **Derivation** | Maps signals to eight configuration dimensions with confidence scoring |
| **Proposal** | Shows what will be generated and why, in your vocabulary |
| **Generation** | Produces all files: context file, folders, templates, skills, hooks, manual |
| **Validation** | Checks all 15 kernel primitives, runs pipeline smoke test |

The whole process takes about 20 minutes. It's token-intensive because the engine
reads research claims, reasons about your domain, and generates substantial output.
This is a one-time investment -- after setup, your agent remembers.

For advanced users: `/arscontexta:setup --advanced` to configure dimensions directly.

---

## Three-Space Architecture

Every generated system separates content into three spaces:

| Space | Purpose | Growth |
|-------|---------|--------|
| **self/** | Agent persistent mind -- identity, methodology, goals | Slow (tens of files) |
| **notes/** | Knowledge graph -- the reason the system exists | Steady (10-50/week) |
| **ops/** | Operational coordination -- queue state, sessions | Fluctuating |

Names adapt to your domain (`notes/` might become `reflections/`, `claims/`,
or `decisions/`), but the separation is invariant.

---

## Commands

### Plugin-Level (always available)

| Command | What It Does |
|---------|-------------|
| `/arscontexta:setup` | Conversational onboarding -- generates your full system |
| `/arscontexta:help` | Contextual guidance and command discovery |
| `/arscontexta:tutorial` | Interactive walkthrough (learn by doing) |
| `/arscontexta:ask` | Query the research graph for methodology answers |
| `/arscontexta:health` | Run diagnostic checks on your vault |
| `/arscontexta:recommend` | Get architecture advice for your use case |
| `/arscontexta:architect` | Research-backed evolution guidance |
| `/arscontexta:add-domain` | Add a new knowledge domain to an existing system |
| `/arscontexta:reseed` | Re-derive from first principles when drift accumulates |
| `/arscontexta:upgrade` | Apply plugin knowledge base updates to your system |

### Generated (available after setup)

| Command | What It Does |
|---------|-------------|
| `/reduce` | Extract insights from sources |
| `/reflect` | Find connections, update MOCs |
| `/reweave` | Update older notes with new connections |
| `/verify` | Combined quality check: description + schema + health |
| `/validate` | Schema compliance checking |
| `/seed` | Create extraction task with duplicate detection |
| `/ralph` | Queue-based orchestration with fresh context per phase |
| `/pipeline` | End-to-end source processing |
| `/tasks` | Queue management |
| `/stats` | Vault metrics |
| `/graph` | Graph analysis |
| `/next` | Next-action recommendation |
| `/learn` | Research and grow |
| `/remember` | Mine session learnings |
| `/rethink` | Challenge system assumptions |
| `/refactor` | Structural improvements |

---

## Processing Pipeline

The vault implements the **6 Rs**, extending Cornell Note-Taking's 5 Rs with a
meta-cognitive layer:

| Phase | What Happens | Command |
|-------|-------------|---------|
| **Record** | Zero-friction capture into inbox/ | Manual |
| **Reduce** | Extract insights with domain-native categories | `/reduce` |
| **Reflect** | Find connections, update MOCs | `/reflect` |
| **Reweave** | Update older notes with new context | `/reweave` |
| **Verify** | Description + schema + health checks | `/verify` |
| **Rethink** | Challenge system assumptions | `/rethink` |

### Fresh Context Per Phase

Each phase runs in its own context window via subagent spawning. LLM attention
degrades as context fills. By spawning a fresh subagent per phase, every phase
operates in the "smart zone."

```
/ralph 5
  |-- Read queue, find next unblocked task
  |-- Spawn subagent (fresh context)
  |   +-- Runs skill, updates task file, returns handoff
  |-- Parse handoff, capture learnings
  |-- Advance phase in queue
  +-- Repeat for 5 tasks
```

---

## Hooks

Four hooks automate quality enforcement:

| Hook | Event | What It Does |
|------|-------|-------------|
| **Session Orient** | `SessionStart` | Injects workspace tree, loads identity, surfaces maintenance signals |
| **Write Validate** | `PostToolUse` (Write) | Schema enforcement on every note write |
| **Auto Commit** | `PostToolUse` (Write, async) | Git auto-commit, non-blocking |
| **Session Capture** | `Stop` | Persists session state to `ops/sessions/` |

---

## The Research Graph

The `methodology/` directory contains **249 interconnected research claims**
about tools for thought, knowledge management, and agent-native cognitive
architecture. These claims back every configuration decision.

### Synthesizes

Zettelkasten -- Cornell Note-Taking -- Evergreen Notes -- PARA -- GTD -- Memory
Palaces -- Cognitive Science (extended mind, spreading activation, generation
effect) -- Network Theory (small-world topology, betweenness centrality) --
Agent Architecture (context windows, session boundaries, multi-agent patterns)

### How Claims Back Decisions

Every kernel primitive includes `cognitive_grounding` linking to specific research:

- **MOC hierarchy** -- context-switching cost research (Leroy 2009)
- **Description field** -- progressive disclosure principles
- **Wiki links** -- spreading activation theory

Query directly: `/arscontexta:ask "Why does my system use atomic notes?"`

---

## Semantic Search (optional)

[qmd](https://github.com/tobi/qmd) adds concept matching across vocabularies.
Not required -- the system works fully with ripgrep + MOC traversal.

```bash
brew install tobi/tap/qmd    # macOS
cd your-vault/ && qmd init && qmd update && qmd embed
```

The plugin bundles MCP configuration that connects qmd automatically.

---

## Prerequisites

| Dependency | Required | Purpose |
|-----------|----------|---------|
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) v1.0.33+ | Yes | Plugin host |
| `tree` | Yes | Workspace structure injection |
| `ripgrep` (`rg`) | Yes | YAML queries, schema validation |
| [qmd](https://github.com/tobi/qmd) | Optional | Semantic search |

---

## Project Structure

```
arscontexta/
|-- .claude-plugin/
|   |-- plugin.json              # Plugin manifest
|   +-- marketplace.json         # Marketplace listing
|-- skills/                      # 10 plugin-level commands
|   |-- setup/                   # Conversational onboarding
|   |-- help/                    # Contextual guidance
|   |-- tutorial/                # Interactive walkthrough
|   |-- ask/                     # Query the research graph
|   |-- health/                  # Diagnostic checks
|   |-- recommend/               # Architecture advice
|   |-- architect/               # Evolution guidance
|   |-- reseed/                  # Re-derive from first principles
|   |-- upgrade/                 # Apply knowledge base updates
|   +-- add-domain/              # Multi-domain extension
|-- skill-sources/               # 16 generated command templates
|   |-- reduce/                  # Extract insights
|   |-- reflect/                 # Find connections
|   |-- reweave/                 # Backward pass
|   |-- verify/                  # Combined quality check
|   +-- ...                      # 12 more processing commands
|-- agents/
|   +-- knowledge-guide.md       # Pipeline subagent
|-- hooks/
|   |-- hooks.json               # Hook configuration
|   +-- scripts/                 # Hook implementations
|-- generators/
|   |-- claude-md.md             # CLAUDE.md template
|   +-- features/                # 17 composable feature blocks
|-- methodology/                 # 249 research claims
|-- reference/                   # Core reference documents
|   |-- kernel.yaml              # 15 kernel primitives
|   |-- three-spaces.md          # Architecture spec
|   +-- use-case-presets.md      # Pre-validated configs
|-- platforms/                   # Platform-specific adapters
|   |-- claude-code/
|   +-- shared/
|-- presets/                     # Pre-validated configurations
|-- scripts/                     # Utility scripts
+-- README.md
```

---

## Development

Clone this repo and add the marketplace to Claude Code:

```
/plugin marketplace add ~/path-to-arscontexta
```

Install the plugin:

```
/plugin install arscontexta@agenticnotetaking
```

Every time you make changes, re-install the plugin:

```
/plugin uninstall arscontexta@agenticnotetaking
/plugin install arscontexta@agenticnotetaking
```

### Key Files for Contributors

- `reference/kernel.yaml` -- 15 primitives every system must include
- `generators/features/*.md` -- composable feature blocks
- `skill-sources/*/SKILL.md` -- generated command templates
- `skills/setup/SKILL.md` -- the derivation engine
- `reference/use-case-presets.md` -- preset definitions

---

## Presets

Three pre-validated configurations for common use cases:

| Preset | For | What You Get |
|--------|-----|-------------|
| **Research** | Academic work, literature reviews, synthesis | Atomic claims, citation tracking, methodology MOCs |
| **Personal** | Life management, journaling, relationships | Reflective notes, goal tracking, relationship MOCs |
| **Experimental** | Testing, iteration, rapid prototyping | Lightweight structure, fast capture, minimal ceremony |

Presets provide starting defaults. The derivation engine adapts from there based
on your conversation.

---

## Roadmap

| Feature | Status |
|---------|--------|
| Claude Code plugin | Available |
| Marketplace listing | Available |
| Multi-agent processing | In progress |

---

## Philosophy

The name connects to a tradition. **Ars Combinatoria**, **Ars Memoria**,
**Ars Contexta**: the art of context.

Llull's rotating wheels generated truth through combination. Bruno's memory wheels
created millions of image combinations. They were external thinking systems -- tools
to think with rather than just store in. The missing piece: they required a human
mind to do the traversing. Now LLMs can traverse. The wheels can spin again.

Built on [Tools for Thought for Agents](https://github.com/agenticnotetaking) research.

---

## License

MIT
