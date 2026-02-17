---
name: learn
description: Research a topic and grow your knowledge graph. Uses Exa deep researcher, web search, or basic search to investigate topics, files results with full provenance, and chains to processing pipeline. Triggers on "/learn", "/learn [topic]", "research this", "find out about".
user-invocable: true
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, mcp__exa__web_search_exa, mcp__exa__deep_researcher_start, mcp__exa__deep_researcher_check, WebSearch
context: fork
---

## EXECUTE NOW

**Topic: $ARGUMENTS**

Parse immediately:
- If topic provided: research that topic
- If topic empty: read `self/goals.md` for highest-priority unexplored direction and propose it
- If topic includes `--deep`/`--light`/`--moderate`: force that depth, strip flag from topic
- If no topic and no goals.md: ask "What would you like to research?"

**Steps:**

1. **Read config** — tool preferences, depth, domain vocabulary
2. **Determine depth** — from flags, config default, or fallback to moderate
3. **Research** — tool cascade: primary → fallback → last resort
4. **File to inbox** — with full provenance metadata
5. **Chain to processing** — next step based on pipeline chaining mode
6. **Update goals.md** — append new research directions discovered

**START NOW.** Reference below explains methodology.

---

## Step 1: Read Configuration

```
ops/config.yaml             — research tools, depth, pipeline chaining
ops/derivation-manifest.md  — domain vocabulary (inbox folder, reduce skill name)
```

**From config.yaml** (defaults if missing):
```yaml
research:
  primary: exa-deep-research      # exa-deep-research | exa-web-search | web-search
  fallback: exa-web-search
  last_resort: web-search
  default_depth: moderate          # light | moderate | deep
pipeline:
  chaining: suggested             # manual | suggested | automatic
```

**From derivation-manifest.md** (universal defaults if missing):
- Inbox folder: `inbox/` (could be `journal/`, `encounters/`, etc.)
- Reduce skill name: `/reduce` (could be `/surface`, `/break-down`, etc.)
- Domain name and hub MOC name

---

## Step 2: Determine Depth

Priority: explicit flag > config default > `moderate`

| Depth | Tool | Sources | Duration | Use When |
|-------|------|---------|----------|----------|
| light | WebSearch | 2-3 | ~5s | Checking a specific fact |
| moderate | mcp__exa__web_search_exa | 5-8 | ~10-30s | Exploring a subtopic |
| deep | mcp__exa__deep_researcher_start | Comprehensive | 15s-3min | Major research direction |

---

## Step 3: Research — Tool Cascade

Output header:
```
Researching: [topic]

  Depth: [depth]
  Using: [tool name]
```

Try tools in config priority order. If a tool fails (MCP unavailable, error, empty results), fall to next tier. If ALL tiers fail:
```
FAIL: Research failed — no research tools available

  Tried:
    1. [primary] — [error]
    2. [fallback] — [error]
    3. WebSearch — [error]

  Try again later or manually add research to [inbox-folder]/
```

### Tool Invocation Patterns

**exa-deep-research:**
```
mcp__exa__deep_researcher_start
  instructions: "Research comprehensively: [topic]. Focus on practical findings, key patterns, recent developments, and actionable insights."
  model: "exa-research-fast" (moderate) | "exa-research" (deep)
```
Poll with `mcp__exa__deep_researcher_check` until `completed`. Output during wait:
```
  Research ID: [id]
  Waiting for results...
```

**exa-web-search:**
```
mcp__exa__web_search_exa  query: "[topic]"  numResults: 8
```

**web-search (last resort, also used for light depth):**
```
WebSearch  query: "[topic]"
```

On completion: `Research complete — [source count] sources analyzed`

---

## Step 4: File Results to Inbox

**Filename:** `YYYY-MM-DD-[slugified-topic].md` — lowercase, spaces to hyphens, no special chars.

**Write to** the domain inbox folder (from derivation-manifest, default `inbox/`). Create folder if missing.

### Provenance Frontmatter

Every field serves the provenance chain. The `exa_prompt` field is most critical — it captures the intellectual context that shaped the research.

```yaml
---
description: [1-2 sentence summary of key findings]
source_type: exa-deep-research | exa-web-search | web-search
exa_prompt: "[full query/instruction string sent to the research tool]"
exa_research_id: "[deep researcher ID, omit for web search]"
exa_model: "[exa-research-fast | exa-research, omit for web search]"
exa_tool: "[mcp tool name, omit for deep researcher]"
generated: [ISO 8601 timestamp — run: date -u +"%Y-%m-%dT%H:%M:%SZ"]
domain: "[domain name from derivation-manifest]"
topics: ["[[domain-hub-moc]]"]
---
```

Include only the fields relevant to the tool used:
- Deep researcher: `source_type`, `exa_prompt`, `exa_research_id`, `exa_model`, `generated`, `domain`, `topics`
- Exa web search: `source_type`, `exa_prompt`, `exa_tool`, `generated`, `domain`, `topics`
- WebSearch: `source_type`, `exa_prompt`, `exa_tool`, `generated`, `domain`, `topics`

### Body Structure

Format for downstream reduce extraction — findings as clear propositions, not raw dumps:

```markdown
# [Topic Title]

## Key Findings

[Synthesized findings organized by theme, not by source. Each finding
should be a clear proposition the reduce phase can extract as an atomic insight.]

## Sources

[List of sources with titles and URLs]

## Research Directions

[New questions, unexplored angles, follow-up topics. These feed goals.md.]
```

---

## Step 5: Chain to Processing

Read chaining mode from config (default: `suggested`).

```
Research complete

  Filed to: [inbox-folder]/[filename]

  Next: /[reduce-skill-name] [inbox-folder]/[filename]
```

Append based on mode:
- **manual:** (nothing extra)
- **suggested:** `Ready for processing when you are.`
- **automatic:** Replace "Next" line with `Queued for /[reduce-skill-name] -- processing will begin automatically.`

---

## Step 6: Update goals.md

If `self/goals.md` exists AND the research uncovered meaningful new directions:

1. Read goals.md, match existing format
2. Append under the appropriate section:
   ```
   - [New direction] (discovered via /learn: [original topic])
   ```

Skip silently if goals.md missing or no meaningful directions found. Do not add filler.

---

## Output Summary

Clean output wrapping the full flow:
```
ars contexta

Researching: [topic]

  Depth: [depth]
  Using: [tool name]
  [Research ID: abc-123]

  Research complete -- [N] sources analyzed

  Filed to: [inbox-folder]/[filename]

  Next: /[reduce-skill-name] [inbox-folder]/[filename]
    [chaining context]

  [goals.md updated with N new research directions]
```

---

## Error Handling

| Error | Behavior |
|-------|----------|
| No topic, no goals.md | Ask: "What would you like to research?" |
| Exa MCP unavailable | Fall through cascade to WebSearch |
| All tools fail | Report failures with FAIL status, suggest manual inbox filing |
| Deep researcher timeout (>5 min) | Report timeout, suggest `--moderate` |
| Empty results | Report "No results found", suggest refining topic |
| Config files missing | Use defaults silently |
| Inbox folder missing | Create it before writing |

---

## Skill Selection Routing

After /learn, the self-building loop continues:

| Phase | Skill | Purpose |
|-------|-------|---------|
| Extract insights | /[reduce-name] | Mine research for atomic propositions |
| Find connections | /[reflect-name] | Link new insights to existing graph |
| Update old notes | /[reweave-name] | Backward pass on touched notes |
| Quality check | /[verify-name] | Description quality, schema, links |

/learn is the entry point. Each run feeds the graph, and the graph feeds the next direction through goals.md.
