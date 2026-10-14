# Single Page Apps: Lecture kit

Two 45-minute lectures for *Phase III · Building Applications · Single Page Apps*, covering everything on the
[overview](https://codeplatoon.github.io/se-curriculum/phase-III/09-Building-Applications/1-single-page-apps/),
[UI Fundamentals](https://codeplatoon.github.io/se-curriculum/phase-III/09-Building-Applications/1-single-page-apps/1-ui-fundamentals/),
[Building SPAs](https://codeplatoon.github.io/se-curriculum/phase-III/09-Building-Applications/1-single-page-apps/2-building-spas/) and the
[assignments](https://codeplatoon.github.io/se-curriculum/phase-III/09-Building-Applications/1-single-page-apps/assignments/).

```
spa-claude/
├── lecture-1-ui-fundamentals/
│   ├── slides.html                     ← 25 slides, notes on every slide
│   └── activity-ui-crime-scene/        ← Activity 1: 16 broken mini-UIs
├── lecture-2-building-spas/
│   ├── slides.html                     ← 22 slides, notes on every slide
│   ├── activity-spa-detective/         ← Activity 1: same radio site built 2 ways + real-site lineup
│   ├── activity-whos-responsible/      ← Activity 2: 14 rapid-fire "which tool owns this?" cards
│   └── demo-kit/                       ← everything for the live Claude Code build (see RUNBOOK.md)
├── diagrams/                           ← editable .tldr + .png for every diagram
└── shared/                             ← slide engine (deck.css / deck.js)
```

## Presenting

```bash
cd spa-claude
python3 -m http.server 8000
# Lecture 1: http://localhost:8000/lecture-1-ui-fundamentals/slides.html
# Lecture 2: http://localhost:8000/lecture-2-building-spas/slides.html
```

Serve it over HTTP rather than opening the files directly. The presenter window syncs through the browser, which doesn't work reliably with `file://`.

| Key | Does |
|---|---|
| → / Space, ← | next / back |
| **P** | opens a **presenter window** with notes, lecture clock, target time per slide, and next slide. Keep it on your screen and share only the slides tab. |
| **T** | start / pause the lecture clock (it turns red when you're 3+ min behind the slide's target) |
| **O** | overview grid, to jump back when someone asks about an earlier slide |
| **F** | fullscreen |
| click a diagram | zoom it full screen |
| click a countdown | start / pause the activity timer · **R** resets it |

Every slide is tagged with a target minute (top-left, e.g. "~21 min"), so you can see at a glance whether the questions are eating your buffer.

## Diagrams (tldraw)

Every diagram is a real, editable tldraw file. To open one, **drag the `.tldr` file onto [tldraw.com](https://www.tldraw.com)** and click "Open file." The PNGs are what the slides use.

| File | Used in | Shows |
|---|---|---|
| `L1-01-restaurant` | L1 | Frontend / backend / database as dining room / kitchen / pantry |
| `L1-02-vague-vs-blueprint` | L1 | "make a workout app" vs a context package |
| `L1-03-planning-pipeline` | L1 | Idea → problem → users → features → journey → screens → errors → context package |
| `L1-04-eight-questions` | L1 | The 8-question template with Workout Tracker answers (homework) |
| `L1-05-workout-journey` | L1 | Full worked example: journey, error branches, 3 lo-fi wireframes |
| `ACT-live-blueprint-board` | L1 activity 2 | **Blank board you fill in live with the class** |
| `L2-01-tech-stack` | L2 | Node / npm / Vite / React / Router as engine / parts store / workshop / LEGO / receptionist |
| `L2-02-router-shell` | L2 | How React Router swaps one outlet while the shell stays |
| `L2-03-toolbelt` | L2 | Claude Code + context + skills + MCPs + sub-agent |
| `L2-04-build-loop` | L2 | Phase loop: build → Playwright screenshot → compare → you approve → commit |
| `L2-05-app-outline` | L2 | The `app_outline/` folder and why each file exists |
| `WF-home`, `WF-log`, `WF-history` | L2 demo | Per-page wireframes used in `demo-kit/app_outline/` |

Your existing SPA vs traditional tldraw drops in at Lecture 2, slide 3 (the notes remind you).

---

## Lecture 1: UI Fundamentals (45 min)

| Min | Segment | What happens |
|---|---|---|
| 0–5 | Open | Goals → **chat waterfall** ("app you open most + first thing you tap") → "Claude can't read your mind" → vague vs blueprint diagram |
| 5–12 | What is a UI? | Definition + elements → restaurant/dashboard diagram → why UI is the first impression → "app you quit because of the UI" |
| 12–20 | **Activity: UI Crime Scene** | Students each take an exhibit #, try it, post "#n: crime + fix" in chat. 7-min timer. Press **K** on the page for the answer key. |
| 20–21 | Debrief | "Every crime was a planning question nobody answered" |
| 21–33 | Plan your app | Pipeline map → what/problem → users → goals → CRUD → user journey → screens in TLDraw → what goes wrong → worked Workout Tracker example |
| 33–42 | **Activity: Live Blueprint** | Class votes on an app (study-group finder / chore tracker / potluck planner). You fill `ACT-live-blueprint-board.tldr` live from chat answers: 8 boxes → journey → what goes wrong → sketch 1 screen. 9-min timer. |
| 42–45 | Wrap | 8-question template → "AI accelerates execution, not architecture" → homework Part I → exit ticket |

**Why these activities:** *Crime Scene* uses the same "everyone takes a box" format that worked for your stateful-components page, but each box is a UI failure, so students discover "what happens when things go wrong" before you teach it. *Live Blueprint* models the exact homework (8 questions → journey → wireframe) with the whole class driving, so nobody leaves without having seen it done end to end.

## Lecture 2: Building Your SPA (45 min)

| Min | Segment | What happens |
|---|---|---|
| 0–2 | Open | Goals |
| 2–4 | What is a SPA? | Definition + **your SPA vs traditional tldraw** |
| 4–11 | **Activity: SPA Detective** | Warm-up: KSPA radio site built both ways (the music timer resets on the traditional one and keeps playing on the SPA). Then you visit real sites and they vote SPA/TRAD in chat; settle it with DevTools → Network → Doc. **K** shows verdicts. |
| 11–12 | Debrief | 3 ways to catch a SPA |
| 12–21 | Tech stack | Who's responsible → stack diagram → React components → Router diagram → `npm create vite` |
| 21–26 | Equip Claude | Toolbelt diagram → 3 MCPs (`/mcp`) → 4 skills (`/skills`) |
| 26–31 | Build it | app_outline diagram → the prompt → **paste prompt, approve phases, let it run** → build-loop diagram |
| 31–37 | **Activity: Who's responsible?** | 14 rapid-fire cards while Claude builds phase 1. Chat waterfall, space to reveal. |
| 37–40 | Check in on Claude | Compare the phase 1 screenshot with `home.png`, take class feedback, approve |
| 40–43 | Ship it | git commit per phase + `gh repo create` → front-end sub-agent |
| 43–45 | Wrap | Homework Part II → exit ticket |

**Why these activities:** *SPA Detective* is the same idea as your "which HTTP method am I using?" site tour. You drive real websites, they call it. The KSPA radio warm-up gives them a concrete "tell" (does the music stop?) before the real sites. *Who's Responsible?* fills the dead air while Claude builds, and drills the tech-stack and MCP/skill roles with problems they'll actually hit this week.

---

## Night-before checklist

- [ ] `bash lecture-2-building-spas/demo-kit/setup-mcps.sh` (or confirm all 3 MCPs show in `/mcp`)
- [ ] Follow `demo-kit/RUNBOOK.md` steps 1–3: scaffold the `liftlog` demo project with skills + `app_outline`, commit
- [ ] Dry-run the prompt once so you know how long phase 1 takes on your machine, then reset to the scaffold commit
- [ ] `cd demo-kit/backup-liftlog && npm install && npm run dev`: confirm the backup runs
- [ ] Open both decks, press **P**, and check the presenter window shows notes
- [ ] Point students at the class site's "Set up Claude Code" section for `setup-skills.sh`
- [x] Class site is live at https://kabeier.github.io/SPAs-and-Claude/ (every slide deck, activity and diagram, each opening in a new tab)
