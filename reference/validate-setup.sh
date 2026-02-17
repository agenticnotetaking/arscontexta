#!/usr/bin/env bash
# validate-setup.sh — Validate YAML frontmatter on generated skills
# Usage:
#   ./validate-setup.sh                          # Validate all skills in .claude/skills/
#   ./validate-setup.sh reduce                   # Validate a single skill in current vault
#   ./validate-setup.sh /path/to/vault           # Validate all skills in target vault
#   ./validate-setup.sh /path/to/vault reduce    # Validate a single skill in target vault
#   VAULT=/path/to/vault ./validate-setup.sh     # Equivalent via env var

ARG1="${1:-}"
ARG2="${2:-}"
VAULT="${VAULT:-.}"
SKILL_NAME=""

# Backward compatible argument parsing:
# - One arg -> skill name (unless it looks like a vault path)
# - Two args -> [vault-path] [skill-name]
if [ -n "$ARG1" ]; then
    if [ -d "$ARG1" ] || [[ "$ARG1" == */* ]]; then
        VAULT="$ARG1"
        SKILL_NAME="$ARG2"
    else
        SKILL_NAME="$ARG1"
    fi
fi

SKILLS_DIR="$VAULT/.claude/skills"

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

# Validate a single skill's SKILL.md frontmatter
# Returns 0 on pass, 1 on failure
validate_skill() {
    local skill_dir="$1"
    local skill_file="$skill_dir/SKILL.md"
    local name
    name=$(basename "$skill_dir")

    if [ ! -f "$skill_file" ]; then
        fail "$name: SKILL.md not found in $skill_dir"
        return 1
    fi

    local failed=0

    # Check 1: First line must be '---'
    local first_line
    first_line=$(head -1 "$skill_file")
    if [ "$first_line" != "---" ]; then
        fail "$name: first line is '$(echo "$first_line" | head -c 40)' — expected '---'. Frontmatter needs regeneration."
        failed=1
    else
        pass "$name: opens with '---'"
    fi

    # Check 2: Closing '---' delimiter (frontmatter is complete)
    # Find the first delimiter after line 1 in absolute line numbers.
    local closing_line
    closing_line=$(awk 'NR > 1 && $0 == "---" { print NR; exit }' "$skill_file")
    if [ -z "$closing_line" ]; then
        fail "$name: no closing '---' delimiter found. Frontmatter is incomplete — needs regeneration."
        failed=1
    else
        pass "$name: closing '---' delimiter present"
    fi

    # Check 3: Required fields and structure in frontmatter
    # Extract frontmatter (between first and second '---')
    if [ -n "$closing_line" ]; then
        if [ "$closing_line" -le 2 ]; then
            fail "$name: frontmatter block is empty."
            failed=1
            return $failed
        fi

        local frontmatter
        frontmatter=$(sed -n "2,$((closing_line - 1))p" "$skill_file")

        # Structural sanity check:
        # frontmatter must stay as YAML key:value lines, not markdown table/body text.
        local invalid_line
        invalid_line=$(echo "$frontmatter" | awk 'NF && $0 !~ /^[A-Za-z0-9_-]+:[[:space:]]*.*$/ { print; exit }')
        if [ -n "$invalid_line" ]; then
            fail "$name: invalid frontmatter line '$(echo "$invalid_line" | head -c 60)'. Expected YAML key:value format."
            failed=1
        else
            pass "$name: frontmatter structure is YAML-like"
        fi

        # Required fields shared by all source skills.
        for field in "name" "description" "user-invocable" "allowed-tools" "context" "model"; do
            if echo "$frontmatter" | grep -Eq "^${field}:[[:space:]]*.+$"; then
                pass "$name: has '${field}:' field"
            else
                fail "$name: missing or empty '${field}:' in frontmatter. Frontmatter needs regeneration."
                failed=1
            fi
        done

        # Value checks that /setup explicitly enforces.
        local context_value
        context_value=$(echo "$frontmatter" | sed -n 's/^context:[[:space:]]*//p' | head -1 | sed -E 's/^[[:space:]]+//; s/[[:space:]]+$//; s/^["'\'']//; s/["'\'']$//')
        if [ -n "$context_value" ] && [ "$context_value" != "fork" ]; then
            fail "$name: context is '$context_value' (expected 'fork')."
            failed=1
        fi

        local invocable_value
        invocable_value=$(echo "$frontmatter" | sed -n 's/^user-invocable:[[:space:]]*//p' | head -1 | sed -E 's/^[[:space:]]+//; s/[[:space:]]+$//; s/^["'\'']//; s/["'\'']$//')
        if [ -n "$invocable_value" ] && [ "$invocable_value" != "true" ]; then
            fail "$name: user-invocable is '$invocable_value' (expected 'true')."
            failed=1
        fi
    fi

    return $failed
}

# --- Single-skill mode ---
if [ -n "$SKILL_NAME" ]; then
    # Find the skill directory (may have a domain prefix)
    skill_dir=""
    for candidate in "$SKILLS_DIR/$SKILL_NAME" "$SKILLS_DIR"/*"$SKILL_NAME"; do
        [ -d "$candidate" ] && skill_dir="$candidate" && break
    done

    if [ -z "$skill_dir" ]; then
        echo -e "${RED}FAIL${NC} Skill directory not found for '$SKILL_NAME' in $SKILLS_DIR"
        exit 1
    fi

    echo "=== Skill Frontmatter Validation: $(basename "$skill_dir") ==="
    echo ""
    validate_skill "$skill_dir"
    result=$?
    echo ""
    if [ $result -eq 0 ]; then
        echo -e "${GREEN}Frontmatter valid.${NC}"
        exit 0
    else
        echo -e "${RED}Frontmatter invalid — needs regeneration. Preserve the skill body, replace only the frontmatter.${NC}"
        exit 1
    fi
fi

# --- Whole-vault mode ---
echo "=== Skill Frontmatter Validation: $SKILLS_DIR ==="
echo ""

skill_count=0
fail_count=0

for skill_dir in "$SKILLS_DIR"/*/; do
    [ ! -d "$skill_dir" ] && continue
    [ ! -f "$skill_dir/SKILL.md" ] && continue
    skill_count=$((skill_count + 1))
    validate_skill "$skill_dir" || fail_count=$((fail_count + 1))
done

if [ "$skill_count" -eq 0 ]; then
    echo -e "${RED}No skills found in $SKILLS_DIR${NC}"
    exit 1
fi

echo ""
echo "=== Skill Frontmatter Summary ==="
echo -e "  ${GREEN}PASS:${NC} $PASS"
echo -e "  ${RED}FAIL:${NC} $FAIL"
echo "  Skills checked: $skill_count"
echo ""

if [ "$fail_count" -eq 0 ]; then
    echo -e "${GREEN}All $skill_count skill(s) have valid frontmatter.${NC}"
    exit 0
else
    echo -e "${RED}$fail_count skill(s) have invalid frontmatter — needs regeneration. Preserve skill bodies, replace only the frontmatter.${NC}"
    exit 1
fi
