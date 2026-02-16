#!/bin/bash
# Ars Contexta — Schema Enforcement Hook
# Validates notes in the knowledge space have required fields.
# Runs as PostToolUse hook on Write events.
# Receives tool input as JSON on stdin.

# Read JSON from stdin
INPUT=$(cat)

# Extract file path (requires jq)
if command -v jq &>/dev/null; then
  FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
else
  # Fallback: try to extract with grep/sed if jq unavailable
  FILE=$(echo "$INPUT" | grep -o '"file_path":"[^"]*"' | head -1 | sed 's/"file_path":"//;s/"//')
fi

# Early exit if no file path
[ -z "$FILE" ] && exit 0
[ ! -f "$FILE" ] && exit 0

# Only validate notes in the knowledge space
case "$FILE" in
  */notes/*|*thinking/*)
    WARNS=""
    if ! head -20 "$FILE" | grep -q "^description:"; then
      WARNS="${WARNS}Missing description field. "
    fi
    if ! head -20 "$FILE" | grep -q "^topics:"; then
      WARNS="${WARNS}Missing topics field. "
    fi
    if ! head -1 "$FILE" | grep -q "^---$"; then
      WARNS="${WARNS}Missing YAML frontmatter. "
    fi
    if [ -n "$WARNS" ]; then
      FILENAME=$(basename "$FILE" .md)
      echo "{\"additionalContext\": \"Schema warnings for $FILENAME: $WARNS\"}"
    fi
    ;;
esac

exit 0
