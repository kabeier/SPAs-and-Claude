# Live demo runbook: Liftlog (Workout Tracker)

Everything Lecture 2 needs to run the build live. Do steps 1–4 **the night before**.

## 1 · One-time machine setup (night before)

```bash
node -v            # need Node 20.19+ or 22.12+ for current Vite
bash setup-mcps.sh # adds playwright, context7, chrome-devtools MCPs (user scope)
```

## 2 · Make the demo project (night before)

```bash
cd ~/demos
npm create vite@latest liftlog -- --template react   # or run it interactively in class
cd liftlog
npm install
npm install react-router-dom
bash /path/to/demo-kit/setup-skills.sh              # installs the 4 skills into .claude/skills/
cp -r /path/to/demo-kit/app_outline .                # wireframes + stories + journey + style guide
mkdir -p .claude/agents && cp /path/to/demo-kit/.claude/agents/front-end-agent.md .claude/agents/
git init && git add -A && git commit -m "Scaffold: Vite + React + router, skills, app_outline"
```

## 3 · Dry run (night before)

- `claude` in the project → `/skills` shows 4 design skills → `/mcp` shows 3 connected servers
- Optional: actually run the prompt once to see how long phase 1 takes on your machine, then `git reset --hard && git clean -fd` back to the scaffold commit (re-copy `app_outline` if clean removes it — it's committed, so it shouldn't).

## 4 · Backup

`backup-liftlog/` is a finished build of this exact spec. If the live build stalls:
```bash
cd backup-liftlog && npm install && npm run dev   # http://localhost:5173
```
Screenshots of every page are in `backup-liftlog/screenshots/`.

## 5 · In class (the ~13 live minutes)

| When | Do | Say |
|---|---|---|
| ~min 21 | Show `app_outline/` in the file tree, open one `user_story.md` and its PNG | "This is the TLDraw homework, turned into a folder." |
| ~min 22 | Paste the **short 2-phase prompt** from `prompt.md` into Claude Code | Walk the prompt's parts (stack, skills, no API, context, MCPs, phases, confirm first) |
| ~min 24 | Claude summarizes journey + proposes phases | **Approve the phases out loud.** "I'm the architect; I approve the plan." Let phase 1 run. |
| ~min 26–31 | Run the Who's Responsible quiz while it builds | Stop as soon as phase 1 is done |
| ~min 31 | Back to Claude: open localhost:5173, show the Playwright screenshot next to `home.png` | Ask class: "Does it match? What feedback would you give?" Type one piece of their feedback in. |
| ~min 34 | `git add -A && git commit -m "Phase 1: shell + Home"` | "Every approved phase gets a commit, which is a save point." |

If Claude asks permission prompts during the demo, accept them. Consider starting Claude with auto-accept edits to keep it moving.

If phase 1 isn't done by ~min 31, don't wait: switch to `backup-liftlog` for the comparison and let Claude keep going in the background.
