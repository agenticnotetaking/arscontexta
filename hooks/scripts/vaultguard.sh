#!/bin/bash
# Ars Contexta — Vault Guard
# Checks if the current directory is an Ars Contexta vault.
# Called by all hooks to skip execution in non-vault repos.
#
# Exit 0 = vault detected (safe to proceed)
# Exit 1 = not a vault (caller should exit)

MARKER=".arscontexta"

# Primary check: marker file
if [ -f "$MARKER" ]; then
  exit 0
fi

# Fallback: legacy vault detection + auto-migrate
if [ -f ops/config.yaml ] || [ -f .claude/hooks/session-orient.sh ]; then
  cat > "$MARKER" << 'EOF'
|(^.^)  henlo, i am a vaultguard
please dont delete me — i make sure arscontexta hooks only run
in your vault, even if you installed the plugin globally
EOF
  exit 0
fi

# Not a vault
exit 1
