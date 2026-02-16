#!/usr/bin/env bash
# validate-kernel.sh — Check a knowledge system against the 15 universal primitives
# Usage: ./validate-kernel.sh [path-to-vault]
# Defaults to current directory if no path given.

VAULT="${1:-.}"
PASS=0
WARN=0
FAIL=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

pass() { echo -e "  ${GREEN}PASS${NC} $1"; PASS=$((PASS + 1)); }
warn() { echo -e "  ${YELLOW}WARN${NC} $1"; WARN=$((WARN + 1)); }
fail() { echo -e "  ${RED}FAIL${NC} $1"; FAIL=$((FAIL + 1)); }

echo "=== Kernel Validation: $VAULT ==="
echo ""

# --- Primitive 1: Markdown files with YAML frontmatter ---
echo "1. Markdown files with YAML frontmatter"
md_files=$(find "$VAULT" -name "*.md" -not -path "*/.git/*" -not -path "*/node_modules/*" -not -name "README.md" -not -name "SKILL.md" -not -name "CLAUDE.md")
md_count=$(echo "$md_files" | grep -c . || true)

if [ "$md_count" -gt 0 ]; then
    yaml_count=$(echo "$md_files" | xargs -I{} head -1 {} 2>/dev/null | grep -c "^---$" || true)
    no_yaml=$((md_count - yaml_count))

    if [ "$no_yaml" -eq 0 ]; then
        pass "$md_count markdown files, all with YAML frontmatter"
    elif [ "$no_yaml" -lt "$((yaml_count / 5 + 1))" ]; then
        warn "$yaml_count with YAML, $no_yaml without (< 20% missing)"
    else
        fail "$no_yaml of $md_count files missing YAML frontmatter"
    fi
else
    fail "No markdown files found"
fi

# --- Primitive 2: Wiki links as graph edges ---
echo "2. Wiki links as graph edges"
link_files=$(grep -rl '\[\[' "$VAULT" --include="*.md" 2>/dev/null | grep -v ".git" | wc -l | tr -d ' ')
total_notes=$(echo "$md_count")
if [ "$total_notes" -eq 0 ]; then
    fail "No notes to check"
elif [ "$link_files" -gt "$((total_notes / 2))" ]; then
    pass "$link_files of $total_notes files contain wiki links"
else
    warn "Only $link_files of $total_notes files contain wiki links (< 50%)"
fi

# Build index of existing filenames for dangling link check
existing_files=$(find "$VAULT" -name "*.md" -not -path "*/.git/*" 2>/dev/null | xargs -I{} basename {} .md | sort -u)

# Extract wiki links from note content (scan known note directories)
dangling=0
checked=0

# Collect links from note directories only
link_candidates=""
for d in "01_thinking" "notes" "00_inbox" "04_meta/logs"; do
    if [ -d "$VAULT/$d" ]; then
        new_links=$(grep -roh '\[\[[A-Za-z][^]]*\]\]' "$VAULT/$d" 2>/dev/null | sed 's/\[\[//g;s/\]\]//g' | sort -u)
        if [ -n "$new_links" ]; then
            link_candidates=$(printf '%s\n%s' "$link_candidates" "$new_links")
        fi
    fi
done
# Also check parent self/ if it exists
[ -d "$VAULT/../self" ] && {
    new_links=$(grep -roh '\[\[[A-Za-z][^]]*\]\]' "$VAULT/../self" 2>/dev/null | sed 's/\[\[//g;s/\]\]//g' | sort -u)
    [ -n "$new_links" ] && link_candidates=$(printf '%s\n%s' "$link_candidates" "$new_links")
}

# Deduplicate and sample
link_candidates=$(echo "$link_candidates" | sort -u | head -100)

while IFS= read -r link; do
    [ -z "$link" ] && continue
    checked=$((checked + 1))
    if ! echo "$existing_files" | grep -qxF "$link"; then
        dangling=$((dangling + 1))
    fi
done <<< "$link_candidates"

if [ "$checked" -eq 0 ]; then
    warn "No wiki links found to check"
elif [ "$dangling" -eq 0 ]; then
    pass "No dangling wiki links (checked $checked unique links)"
else
    # Dangling links are common in mature vaults (examples, planned notes)
    # Report as info, not failure
    warn "$dangling unresolved wiki links out of $checked unique (may include examples)"
fi

# --- Primitive 3: MOC hierarchy ---
echo "3. MOC hierarchy for attention management"
moc_count=$(grep -rl '^type: moc' "$VAULT" --include="*.md" 2>/dev/null | grep -v ".git" | wc -l | tr -d ' ')
if [ "$moc_count" -eq 0 ]; then
    moc_like=$(grep -rl '## Core Ideas' "$VAULT" --include="*.md" 2>/dev/null | grep -v ".git" | wc -l | tr -d ' ')
    if [ "$moc_like" -gt 0 ]; then
        warn "$moc_like MOC-like files but none declare type: moc"
    else
        fail "No MOCs found"
    fi
elif [ "$moc_count" -lt 3 ]; then
    warn "$moc_count MOCs (minimum recommended: 3)"
else
    pass "$moc_count MOCs found"
fi

# --- Primitive 4: Tree injection / workspace map ---
echo "4. Tree injection at session start"
has_tree=false
[ -f "$VAULT/.claude/hooks/session-start.sh" ] && has_tree=true
[ -f "$VAULT/WORKSPACE-MAP.md" ] && has_tree=true
for ctx in "$VAULT/CLAUDE.md"; do
    [ -f "$ctx" ] && grep -qi "tree\|workspace.map\|orient" "$ctx" 2>/dev/null && has_tree=true
done
find "$VAULT" -name "session-orient.sh" -not -path "*/.git/*" 2>/dev/null | grep -q . && has_tree=true

if $has_tree; then
    pass "Tree injection mechanism found"
else
    warn "No tree injection mechanism detected"
fi

# --- Primitive 5: Description field ---
echo "5. Description field for progressive disclosure"
# Find notes in common locations
notes_dirs=""
for d in "notes" "01_thinking" "thinking" "knowledge"; do
    [ -d "$VAULT/$d" ] && notes_dirs="$notes_dirs $VAULT/$d"
done
[ -z "$notes_dirs" ] && notes_dirs="$VAULT"

desc_count=0
no_desc=0
for dir in $notes_dirs; do
    d=$(grep -rl '^description:' "$dir" --include="*.md" -l 2>/dev/null | grep -v ".git" | wc -l | tr -d ' ')
    n=$(find "$dir" -maxdepth 1 -name "*.md" -not -name "README.md" -not -name "SKILL.md" 2>/dev/null | wc -l | tr -d ' ')
    desc_count=$((desc_count + d))
    no_desc=$((no_desc + n - d))
done

total_n=$((desc_count + no_desc))
if [ "$total_n" -eq 0 ]; then
    warn "No notes found in expected directories"
elif [ "$no_desc" -le 0 ]; then
    pass "All $desc_count notes have description fields"
elif [ "$no_desc" -lt "$((total_n / 5 + 1))" ]; then
    warn "$desc_count with descriptions, $no_desc without (< 20% missing)"
else
    fail "$no_desc of $total_n notes missing description field"
fi

# --- Primitive 6: Topics footer ---
echo "6. Topics footer linking notes to MOCs"
topics_count=0
no_topics=0
for dir in $notes_dirs; do
    t=$(grep -rl '^topics:' "$dir" --include="*.md" 2>/dev/null | grep -v ".git" | wc -l | tr -d ' ')
    n=$(find "$dir" -maxdepth 1 -name "*.md" -not -name "README.md" -not -name "SKILL.md" 2>/dev/null | wc -l | tr -d ' ')
    topics_count=$((topics_count + t))
    no_topics=$((no_topics + n - t))
done

total_t=$((topics_count + no_topics))
if [ "$total_t" -eq 0 ]; then
    warn "No notes found in expected directories"
elif [ "$no_topics" -le 0 ]; then
    pass "All $topics_count notes have topics"
elif [ "$no_topics" -lt "$((total_t / 5 + 1))" ]; then
    warn "$topics_count with topics, $no_topics without (< 20% missing)"
else
    fail "$no_topics of $total_t notes missing topics"
fi

# --- Primitive 7: Schema enforcement ---
echo "7. Schema enforcement via validation"
has_templates=false
has_validation=false
for d in "templates" "04_meta/templates" "_templates"; do
    [ -d "$VAULT/$d" ] && has_templates=true && break
done
find "$VAULT" -name "validate-schema.sh" -o -name "validate.sh" -not -path "*/.git/*" 2>/dev/null | grep -q . && has_validation=true
find "$VAULT" -path "*/validate/SKILL.md" -o -path "*/verify/SKILL.md" 2>/dev/null | grep -q . && has_validation=true

if $has_templates && $has_validation; then
    pass "Templates and validation mechanism found"
elif $has_templates; then
    warn "Templates found but no validation mechanism"
elif $has_validation; then
    warn "Validation found but no template directory"
else
    fail "No templates or validation mechanism found"
fi

# --- Primitive 8: Self space (CONFIGURABLE) ---
echo "8. Self space for agent persistent memory (configurable)"
# Check for self/ in vault, sibling to vault, or common alternatives
self_dir=""
for candidate in "$VAULT/self" "$VAULT/../self" "$VAULT/self/memory"; do
    [ -d "$candidate" ] && self_dir="$candidate" && break
done

if [ -n "$self_dir" ]; then
    self_files=$(find "$self_dir" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
    has_identity=false; [ -f "$self_dir/identity.md" ] && has_identity=true
    has_methodology=false; [ -f "$self_dir/methodology.md" ] && has_methodology=true
    has_goals=false; [ -f "$self_dir/goals.md" ] && has_goals=true

    if $has_identity && $has_methodology && $has_goals; then
        pass "self/ with $self_files files (identity, methodology, goals present)"
    elif [ "$self_files" -gt 0 ]; then
        warn "self/ exists with $self_files files but missing some core MOCs"
    else
        warn "self/ directory exists but is empty"
    fi
else
    # Self space is configurable — check for ops/ fallback
    if [ -f "$VAULT/ops/goals.md" ]; then
        pass "self/ disabled, ops/ fallback in use (ops/goals.md found)"
    elif [ -d "$VAULT/.claude/memory" ]; then
        warn "Memory mechanism found but no dedicated self/ space"
    else
        warn "No self/ directory found (configurable — off by default for research vaults)"
    fi
fi

# --- Primitive 9: Session rhythm ---
echo "9. Session rhythm: orient, work, persist"
has_rhythm=false
for ctx in "$VAULT/CLAUDE.md"; do
    [ -f "$ctx" ] && grep -qi "orient\|session start\|session end\|persist\|session rhythm" "$ctx" 2>/dev/null && has_rhythm=true
done
[ -f "$VAULT/.claude/hooks/session-start.sh" ] && has_rhythm=true
find "$VAULT" -name "session-orient.sh" -not -path "*/.git/*" 2>/dev/null | grep -q . && has_rhythm=true

if $has_rhythm; then
    pass "Session rhythm documented or automated"
else
    warn "No session rhythm pattern found"
fi

# --- Primitive 10: Semantic search (CONFIGURABLE) ---
echo "10. Semantic search capability (configurable)"
has_search=false
[ -f "$VAULT/.mcp.json" ] && grep -q "qmd\|search\|embed" "$VAULT/.mcp.json" 2>/dev/null && has_search=true
command -v qmd &>/dev/null && has_search=true
for ctx in "$VAULT/CLAUDE.md"; do
    [ -f "$ctx" ] && grep -qi "semantic search\|qmd\|vsearch" "$ctx" 2>/dev/null && has_search=true
done

if $has_search; then
    pass "Semantic search capability found"
else
    pass "Semantic search not enabled (configurable)"
fi

# --- Primitive 10A: Filesystem graph database (unique-addresses) ---
echo "10A. Filesystem graph database (unique-addresses)"
has_graph_scripts=false
for d in "ops/scripts/graph" "04_meta/scripts/graph" "scripts/graph"; do
    [ -d "$VAULT/$d" ] && has_graph_scripts=true && break
done

if $has_graph_scripts; then
    pass "Graph analysis scripts directory found"
else
    warn "No ops/scripts/graph/ directory detected"
fi

# --- Primitive 11: Discovery-first quality gate ---
echo "11. Discovery-first quality gate"
has_discovery_section=false
has_discovery_skills=false

# Check context files for Discovery-First section
for ctx in "$VAULT/CLAUDE.md"; do
    [ -f "$ctx" ] && grep -qi "discovery.first" "$ctx" 2>/dev/null && has_discovery_section=true
done

# Check skills for discovery checks
skill_dirs=""
for d in ".claude/skills" "skills"; do
    [ -d "$VAULT/$d" ] && skill_dirs="$skill_dirs $VAULT/$d"
done
if [ -n "$skill_dirs" ]; then
    for dir in $skill_dirs; do
        grep -rqi "discovery\|findability" "$dir" 2>/dev/null && has_discovery_skills=true
    done
fi

if $has_discovery_section && $has_discovery_skills; then
    pass "Discovery-first gate in context file and skills"
elif $has_discovery_section; then
    warn "Discovery-first in context file but not in skills"
elif $has_discovery_skills; then
    warn "Discovery checks in skills but no context file section"
else
    warn "No discovery-first quality gate detected"
fi

# --- Primitive 12: Operational learning loop ---
echo "12. Operational learning loop"
has_obs_dir=false
has_tensions_dir=false
has_review_trigger=false
has_rethink=false

# Check for ops/observations/ and ops/tensions/ directories (or common variants)
for candidate in "ops/observations" "04_meta/logs/observations" "logs/observations" "observations"; do
    [ -d "$VAULT/$candidate" ] && has_obs_dir=true && break
done
for candidate in "ops/tensions" "04_meta/logs/tensions" "logs/tensions" "tensions"; do
    [ -d "$VAULT/$candidate" ] && has_tensions_dir=true && break
done

# Check context files for review trigger documentation
for ctx in "$VAULT/CLAUDE.md"; do
    [ -f "$ctx" ] && grep -qi "rethink\|review\|observations" "$ctx" 2>/dev/null && has_review_trigger=true
done

# Check for rethink command/skill
for d in ".claude/skills/rethink" "skills/rethink"; do
    [ -d "$VAULT/$d" ] && has_rethink=true && break
done
# Also check for rethink skill files directly
find "$VAULT" -path "*/rethink/SKILL.md" -not -path "*/.git/*" 2>/dev/null | grep -q . && has_rethink=true
find "$VAULT" -path "*/rethink.md" -not -path "*/.git/*" 2>/dev/null | grep -q . && has_rethink=true

checks_passed=0
$has_obs_dir && checks_passed=$((checks_passed + 1))
$has_tensions_dir && checks_passed=$((checks_passed + 1))
$has_review_trigger && checks_passed=$((checks_passed + 1))
$has_rethink && checks_passed=$((checks_passed + 1))

if [ "$checks_passed" -eq 4 ]; then
    pass "Operational learning loop: observations, tensions, review trigger, rethink mechanism"
elif [ "$checks_passed" -ge 2 ]; then
    details=""
    $has_obs_dir || details="${details}observations dir, "
    $has_tensions_dir || details="${details}tensions dir, "
    $has_review_trigger || details="${details}review trigger, "
    $has_rethink || details="${details}rethink mechanism, "
    details=$(echo "$details" | sed 's/, $//')
    warn "Partial learning loop ($checks_passed/4). Missing: $details"
else
    fail "No operational learning loop detected (need observations dir, tensions dir, review trigger, rethink mechanism)"
fi

# --- Primitive 13: Task stack ---
echo "13. Task stack"
has_tasks_md=false
has_queue_file=false

# Check for ops/tasks.md or common variants
for candidate in "ops/tasks.md" "04_meta/tasks/tasks.md"; do
    [ -f "$VAULT/$candidate" ] && has_tasks_md=true && break
done

# Check for queue file (JSON or YAML)
for candidate in "ops/queue/queue.json" "ops/queue/queue.yaml" "04_meta/tasks/queue.json" "04_meta/tasks/queue.yaml"; do
    [ -f "$VAULT/$candidate" ] && has_queue_file=true && break
done

if $has_tasks_md && $has_queue_file; then
    pass "Task stack: tasks.md and queue file found"
elif $has_tasks_md; then
    warn "tasks.md found but no queue file"
elif $has_queue_file; then
    warn "Queue file found but no tasks.md"
else
    warn "No task stack detected (ops/tasks.md + queue file)"
fi

# --- Primitive 14: Methodology folder ---
echo "14. Methodology folder"
has_methodology_dir=false
has_methodology_moc=false

for candidate in "ops/methodology" "04_meta/methodology"; do
    [ -d "$VAULT/$candidate" ] && has_methodology_dir=true
    [ -f "$VAULT/$candidate/methodology.md" ] && has_methodology_moc=true
    $has_methodology_dir && break
done

if $has_methodology_dir && $has_methodology_moc; then
    pass "Methodology folder with methodology.md MOC found"
elif $has_methodology_dir; then
    warn "ops/methodology/ exists but no methodology.md MOC inside"
else
    warn "No ops/methodology/ directory detected"
fi

# --- Primitive 15: Session capture ---
echo "15. Session capture"
has_sessions_dir=false

for candidate in "ops/sessions" "04_meta/sessions" "self/sessions"; do
    [ -d "$VAULT/$candidate" ] && has_sessions_dir=true && break
done

if $has_sessions_dir; then
    pass "Session capture directory found"
else
    warn "No ops/sessions/ directory detected"
fi

# --- Summary ---
echo ""
echo "=== Kernel Validation Summary ==="
echo -e "  ${GREEN}PASS:${NC} $PASS"
echo -e "  ${YELLOW}WARN:${NC} $WARN"
echo -e "  ${RED}FAIL:${NC} $FAIL"
echo ""

if [ "$FAIL" -eq 0 ] && [ "$WARN" -eq 0 ]; then
    echo -e "${GREEN}All 15 primitives validated successfully.${NC}"
    exit 0
elif [ "$FAIL" -eq 0 ]; then
    echo -e "${YELLOW}Kernel present with warnings. $WARN primitive(s) need attention.${NC}"
    exit 0
else
    echo -e "${RED}$FAIL kernel primitive(s) missing. System may not function reliably.${NC}"
    exit 1
fi
