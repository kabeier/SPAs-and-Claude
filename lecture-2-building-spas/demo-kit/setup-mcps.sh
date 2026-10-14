#!/usr/bin/env bash
# Adds the 3 MCP servers from Lecture 2 to Claude Code (user scope = available in every project).
# Run once:  bash setup-mcps.sh      Then inside Claude Code run /mcp to confirm they connect.
set -euo pipefail
claude mcp add --scope user playwright      -- npx -y @playwright/mcp@latest
claude mcp add --scope user context7        -- npx -y @upstash/context7-mcp
claude mcp add --scope user chrome-devtools -- npx -y chrome-devtools-mcp@latest
claude mcp list
