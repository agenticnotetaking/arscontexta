#!/bin/bash
# Ars Contexta — Session Capture Hook (Primitive 15)
# Persists session state on session end.
# Runs as Stop hook. Receives session info as JSON on stdin.

# Read JSON from stdin
INPUT=$(cat)

# Extract session ID
if command -v jq &>/dev/null; then
  SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // empty')
else
  SESSION_ID=$(echo "$INPUT" | grep -o '"session_id":"[^"]*"' | head -1 | sed 's/"session_id":"//;s/"//')
fi

TIMESTAMP=$(date -u +"%Y%m%d-%H%M%S")
mkdir -p ops/sessions

# Save session state
if [ -n "$SESSION_ID" ]; then
  echo "{\"id\": \"$SESSION_ID\", \"ended\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\", \"status\": \"completed\"}" > "ops/sessions/${TIMESTAMP}.json"
fi

# Persist goals if they exist
if [ -f self/goals.md ]; then
  git add self/goals.md 2>/dev/null
elif [ -f ops/goals.md ]; then
  git add ops/goals.md 2>/dev/null
fi

# Auto-commit session artifacts
git add ops/sessions/ ops/observations/ ops/methodology/ 2>/dev/null
git commit -m "Session capture: ${TIMESTAMP}" --quiet --no-verify 2>/dev/null || true

exit 0
