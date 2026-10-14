#!/usr/bin/env bash
# Installs the 4 design skills from Lecture 2 into ./.claude/skills/ of the current project.
# Run from your project root:   bash setup-skills.sh
#
# Why not just curl SKILL.md (as the curriculum page shows)?
#  - Two of those URLs 404 (UI UX Pro Max, Design Motion Principles).
#  - Three of the skills ship supporting folders (data/, references/, assets/) that a
#    single-file curl silently leaves behind. A skill is a FOLDER, not just a file.
set -euo pipefail

DEST=".claude/skills"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$DEST"

grab() { # grab <github-owner/repo> <path-inside-repo> <skill-name>
  local repo="$1" src="$2" name="$3"
  echo "→ $name  ($repo/$src)"
  git clone --quiet --depth 1 --filter=blob:none --sparse "https://github.com/$repo.git" "$TMP/$name"
  git -C "$TMP/$name" sparse-checkout set "$src" >/dev/null
  rm -rf "$DEST/$name"
  cp -R "$TMP/$name/$src" "$DEST/$name"
  test -f "$DEST/$name/SKILL.md" || { echo "   ✗ SKILL.md missing for $name"; exit 1; }
}

grab anthropics/skills                    skills/frontend-design              frontend-design
grab nextlevelbuilder/ui-ux-pro-max-skill .claude/skills/ui-ux-pro-max         ui-ux-pro-max
grab Leonxlnx/taste-skill                 skills/taste-skill                  taste-skill
grab kylezantos/design-motion-principles  skills/design-motion-principles     design-motion-principles

echo
echo "Installed skills:"
for d in "$DEST"/*/; do printf '  ✓ %-28s %s files\n' "$(basename "$d")" "$(find "$d" -type f | wc -l | tr -d ' ')"; done
echo
echo "Now start Claude Code in this folder and run /skills to confirm they loaded."
