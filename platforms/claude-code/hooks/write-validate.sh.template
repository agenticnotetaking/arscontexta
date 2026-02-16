#!/bin/bash
# Ars Contexta — Write Validation Hook (Claude Code)
# Event: PostToolUse (Write)
# Purpose: Validate YAML frontmatter and required fields on every note write.
#          Schema enforcement is an INVARIANT — active from day one.
#
# This is a TEMPLATE. During /init, {{VARIABLE}} markers are replaced
# with values from the derivation manifest.
#
# This hook WARNS but does not BLOCK. Capture speed matters more than
# perfection at the moment of creation. Warnings guide the agent to
# fix issues immediately while context is fresh.

# The written file path comes from the hook context
FILE="${TOOL_INPUT_PATH:-$1}"

# ─────────────────────────────────────────────
# Only validate notes in the knowledge space
# ─────────────────────────────────────────────
# Skip validation for operational files (ops/), inbox captures,
# session files, and configuration. Only notes in the knowledge
# space need schema enforcement.

case "$FILE" in
  {{NOTES_DIR:-notes}}/*|*thinking/*)
    # This is a knowledge note — validate it
    ;;
  *)
    # Not a knowledge note — skip validation
    exit 0
    ;;
esac

# ─────────────────────────────────────────────
# 1. YAML Frontmatter Existence
# ─────────────────────────────────────────────
if ! head -1 "$FILE" 2>/dev/null | grep -q "^---$"; then
  echo "SCHEMA WARN: Missing YAML frontmatter in $(basename "$FILE")"
  echo "  Every {{DOMAIN:note}} needs frontmatter with at least description and topics."
  exit 0
fi

# ─────────────────────────────────────────────
# 2. Required Field: description
# ─────────────────────────────────────────────
if ! head -20 "$FILE" 2>/dev/null | grep -q "^description:"; then
  echo "SCHEMA WARN: Missing 'description' field in $(basename "$FILE")"
  echo "  Description enables filtering and progressive disclosure."
  echo "  Add: description: [one sentence adding context beyond the title]"
fi

# ─────────────────────────────────────────────
# 3. Required Field: topics
# ─────────────────────────────────────────────
# Check both YAML frontmatter and markdown footer format
HAS_TOPICS=false
if head -20 "$FILE" 2>/dev/null | grep -q "^topics:"; then
  HAS_TOPICS=true
fi
if grep -q "^Topics:" "$FILE" 2>/dev/null; then
  HAS_TOPICS=true
fi

if [ "$HAS_TOPICS" = false ]; then
  echo "SCHEMA WARN: Missing 'topics' field in $(basename "$FILE")"
  echo "  Every {{DOMAIN:note}} must belong to at least one {{DOMAIN:topic_map}}."
  echo "  Add: topics: [\"[[index]]\"]"
fi

# ─────────────────────────────────────────────
# 4. Description Quality Check
# ─────────────────────────────────────────────
# Warn if description is suspiciously short (likely placeholder)
DESC=$(head -20 "$FILE" 2>/dev/null | grep "^description:" | sed 's/^description: *//')
if [ -n "$DESC" ]; then
  DESC_LEN=${#DESC}
  if [ "$DESC_LEN" -lt 20 ]; then
    echo "SCHEMA WARN: Description seems too short in $(basename "$FILE")"
    echo "  Description should add context beyond the title (~100-200 chars)."
  fi
fi

# ─────────────────────────────────────────────
# 5. Title Format Check
# ─────────────────────────────────────────────
# Check that the first heading matches prose-as-title pattern
TITLE=$(grep '^# ' "$FILE" 2>/dev/null | head -1 | sed 's/^# //')
if [ -n "$TITLE" ]; then
  # Warn on title-case or ALL-CAPS (should be lowercase sentence)
  if echo "$TITLE" | grep -qE '^[A-Z][A-Z]'; then
    echo "SCHEMA NOTE: Title may not follow prose-as-title convention in $(basename "$FILE")"
    echo "  Titles should be lowercase propositions (e.g., 'claims must be specific enough to be wrong')"
  fi
fi

# ─────────────────────────────────────────────
# 6. Discovery Nudge (optional)
# ─────────────────────────────────────────────
# {{IF_DISCOVERY_NUDGE}}
# Remind the agent to check for connections after creating a note.
# This is a nudge, not enforcement — the pipeline handles it systematically.
LINK_COUNT=$(grep -o '\[\[' "$FILE" 2>/dev/null | wc -l | tr -d ' ')
if [ "$LINK_COUNT" -eq 0 ]; then
  echo "NOTE: $(basename "$FILE") has no wiki links. Consider running /{DOMAIN:reflect} to find connections."
fi
# {{END_IF_DISCOVERY_NUDGE}}
