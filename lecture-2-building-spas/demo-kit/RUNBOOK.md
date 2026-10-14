# Live demo runbook: Liftlog (Workout Tracker)

In Lecture 2 you build the demo project **live**, so students see every install step: Vite, npm, the MCP servers, the skills, then the Claude Code build. The night before, you only get your machine ready and do one dry run.

## 1 · Night before: get your machine ready

```bash
node -v      # need Node 20.19+ or 22.12+ for current Vite
claude -v    # Claude Code installed and logged in

# Put the demo kit somewhere short, so the live commands are easy to type
cp -r /mnt/storage/CP/new_Lectures/spa-claude/lecture-2-building-spas/demo-kit ~/demo-kit
mkdir -p ~/demos
```

## 2 · Night before: dry run everything once

Doing it once fills npm's download cache, so tomorrow's live installs take seconds instead of minutes.

```bash
cd ~/demos
npm create vite@latest liftlog      # liftlog · React · JavaScript · Oxlint · Install + start: No
cd liftlog
npm install
npm install react-router-dom
npm run dev                         # check localhost:5173, then Ctrl+C

claude mcp add --scope user playwright      -- npx -y @playwright/mcp@latest
claude mcp add --scope user context7        -- npx -y @upstash/context7-mcp
claude mcp add --scope user chrome-devtools -- npx -y chrome-devtools-mcp@latest
claude mcp list                     # all three should say Connected

curl -fsSL https://kabeier.github.io/SPAs-and-Claude/lecture-2-building-spas/demo-kit/setup-skills.sh | bash
cp -r ~/demo-kit/app_outline .
claude                              # /mcp shows 3, /skills shows 4
```

After phase 1, also try `/init` once so you know how long it takes and what the CLAUDE.md looks like.

Optional: paste the **short** prompt from `prompt.md` and time phase 1. The lecture plan assumes about 5–8 minutes. If it takes much longer, plan to use the backup app at slide 16.

## 3 · Night before: reset so you can do it live

```bash
rm -rf ~/demos/liftlog              # also removes the CLAUDE.md /init wrote
claude mcp remove playwright -s user
claude mcp remove context7 -s user
claude mcp remove chrome-devtools -s user
claude mcp list                     # should no longer show the three
```

Removing the MCPs is what lets you add them live without an "already exists" error. npm and npx keep their caches, so tomorrow's installs are still fast.

## 4 · Backup

`backup-liftlog/` is a finished build of this exact spec. It's also on the class site as "Finished example: Liftlog". If the live build stalls:

```bash
cd ~/demo-kit/backup-liftlog && npm install && npm run dev   # http://localhost:5173
```

## 5 · In class

Two terminals, both starting in `~/demos`. Terminal 1 runs the dev server. Terminal 2 runs everything else.

| Slide (~min) | Terminal | Do | Say |
|---|---|---|---|
| 8 (~15) | 1 | `npm create vite@latest`: liftlog, React, **JavaScript** (not "React Router v7"), Oxlint, Install + start: **No**. Then `cd liftlog`, `npm install`, `npm install react-router-dom`, `npm run dev`. Open localhost:5173. | "npm reads package.json, the shopping list. Vite runs the dev server." |
| 10 (~19) | 2 | `cd liftlog`, the three `claude mcp add` lines, then `claude mcp list` | "Docs, eyes and hands, a debugger. --scope user means every project gets them." |
| 11 (~22) | 2 | The skills one-liner from the class site, then `ls .claude/skills` | "A skill is a folder, not a file." |
| 12 (~23) | 2 | `cp -r ~/demo-kit/app_outline .`, open `pages/home/user_story.md` and `home.png`. Then `claude`, `/mcp`, `/skills` | "This is the Lecture 1 homework, turned into a folder." |
| 13 (~26) | 2 (Claude) | Paste the **short 2-phase prompt** from `prompt.md`. Approve the phases out loud. | "I'm the architect. I approve the plan." |
| 15 (~29) | — | Who's Responsible quiz while Claude builds. Stop when phase 1 is done. | — |
| 16 (~34) | browser | localhost:5173 next to `home.png`. Take class feedback, type one in, approve. | "Does it match? What would you tell Claude?" |
| 17 (~37) | 3rd terminal | `claude`, `/init` (approve the CLAUDE.md write), read it out loud, `/exit`. Then `git init`, `git add -A`, `git commit -m "Phase 1: app shell + Home"` | "CLAUDE.md is what Claude reads first next session. Every approved phase gets a commit, which is a save point." |
| 18 (~39) | 3rd terminal | Optional: `mkdir -p .claude/agents && cp ~/demo-kit/.claude/agents/front-end-agent.md .claude/agents/`, then `/agents` in Claude | "Set it up once, reuse it everywhere." |

Claude asks permission before it edits files or runs commands. The first time it asks to edit a file, read the request out loud, then pick **"Yes, allow all edits during this session"** so the build doesn't stop on every file. It will still ask before running commands (like `npm install`) and before using Playwright: approve those live. That's the human-in-the-loop idea, on screen.

If phase 1 isn't done by ~min 34, don't wait: switch to the backup app for the comparison and let Claude keep going in the background.

Why `/init` waits until slide 17: before the prompt the project is only the Vite starter, so CLAUDE.md would describe a counter page and go stale in minutes. After phase 1 it describes the real app.
