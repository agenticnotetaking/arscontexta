#!/bin/bash
# Ars Contexta — Session Orientation Hook
# Injects workspace structure, identity, methodology, and maintenance signals at session start.

# Only run in Ars Contexta vaults
GUARD_DIR="$(cd "$(dirname "$0")" && pwd)"
"$GUARD_DIR/vaultguard.sh" || exit 0

echo "## Workspace Structure"
echo ""

# Show directory tree (3 levels deep, markdown files only)
if command -v tree &> /dev/null; then
    tree -L 3 --charset ascii -I '.git|node_modules' -P '*.md' .
else
    find . -name "*.md" -not -path "./.git/*" -not -path "*/node_modules/*" -maxdepth 3 | sort | while read -r file; do
        depth=$(echo "$file" | tr -cd '/' | wc -c)
        indent=$(printf '%*s' "$((depth * 2))" '')
        basename=$(basename "$file")
        echo "${indent}${basename}"
    done
fi

echo ""
echo "---"
echo ""

# Previous session state (continuity)
if [ -f ops/sessions/current.json ]; then
  echo "--- Previous session context ---"
  cat ops/sessions/current.json
  echo ""
fi

# Persistent working memory (goals)
if [ -f self/goals.md ]; then
  cat self/goals.md
  echo ""
elif [ -f ops/goals.md ]; then
  cat ops/goals.md
  echo ""
fi

# Identity (if self space enabled)
if [ -f self/identity.md ]; then
  cat self/identity.md self/methodology.md 2>/dev/null
  echo ""
fi

# Learned behavioral patterns (recent methodology notes)
for f in $(ls -t ops/methodology/*.md 2>/dev/null | head -5); do
  head -3 "$f"
done

# Condition-based maintenance signals
OBS_COUNT=$(ls -1 ops/observations/*.md 2>/dev/null | wc -l | tr -d ' ')
TENS_COUNT=$(ls -1 ops/tensions/*.md 2>/dev/null | wc -l | tr -d ' ')
SESS_COUNT=$(ls -1 ops/sessions/*.json 2>/dev/null | grep -cv current 2>/dev/null || echo 0)
INBOX_COUNT=$(ls -1 inbox/*.md 2>/dev/null | wc -l | tr -d ' ')

if [ "$OBS_COUNT" -ge 10 ]; then
  echo "CONDITION: $OBS_COUNT pending observations. Consider /rethink."
fi
if [ "$TENS_COUNT" -ge 5 ]; then
  echo "CONDITION: $TENS_COUNT unresolved tensions. Consider /rethink."
fi
if [ "$SESS_COUNT" -ge 5 ]; then
  echo "CONDITION: $SESS_COUNT unprocessed sessions. Consider /remember --mine-sessions."
fi
if [ "$INBOX_COUNT" -ge 3 ]; then
  echo "CONDITION: $INBOX_COUNT items in inbox. Consider /reduce or /pipeline."
fi

# Workboard reconciliation
if [ -f ops/scripts/reconcile.sh ]; then
  bash ops/scripts/reconcile.sh --compact 2>/dev/null
fi

# Methodology staleness check (Rule Zero)
if [ -d ops/methodology ] && [ -f ops/config.yaml ]; then
  CONFIG_MTIME=$(stat -f %m ops/config.yaml 2>/dev/null || stat -c %Y ops/config.yaml 2>/dev/null || echo 0)
  NEWEST_METH=$(ls -t ops/methodology/*.md 2>/dev/null | head -1)
  if [ -n "$NEWEST_METH" ]; then
    METH_MTIME=$(stat -f %m "$NEWEST_METH" 2>/dev/null || stat -c %Y "$NEWEST_METH" 2>/dev/null || echo 0)
    DAYS_STALE=$(( (CONFIG_MTIME - METH_MTIME) / 86400 ))
    if [ "$DAYS_STALE" -ge 30 ]; then
      echo "CONDITION: Methodology notes are ${DAYS_STALE}+ days behind config changes. Consider /rethink drift."
    fi
  fi
fi
