# Single Page Apps: Lecture kit

Two lectures, about 40 minutes of talking each (so the rest of the hour can go to questions), for *Phase III · Building Applications · Single Page Apps*, covering everything on the
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

## Lecture 1: UI Fundamentals (~40 min, 21 slides)

| Min | Segment | What happens |
|---|---|---|
| 0–5 | Open | Goals → "Claude can't read your mind" → vague vs blueprint diagram |
| 5–9 | What is a UI? | Definition + elements → restaurant/dashboard diagram (why users judge the app by its UI) |
| 9–16 | **Activity: UI Crime Scene** | Students each take an exhibit #, try it, post "#n: crime + fix" in chat. 6-min timer. Press **K** on the page for the answer key. Then "every crime was a planning question nobody answered." |
| 16–33 | Plan your app | Pipeline map → what/problem → users → goals → CRUD → user journey → screens in TLDraw → what goes wrong → worked Workout Tracker example |
| 33–40 | Wrap | 8-question template → "AI accelerates execution, not architecture" → homework Part I → exit ticket |

**Why this activity:** *Crime Scene* uses the same "everyone takes a box" format that worked for your stateful-components page, but each box is a UI failure, so students discover "what happens when things go wrong" before you teach it.

The blank blueprint board (`diagrams/ACT-live-blueprint-board.tldr`) is still in the kit if you ever have spare time to plan an app live with the class.

## Lecture 2: Building Your SPA (~40 min, 20 slides)

| Min | Segment | What happens |
|---|---|---|
| 0–2 | Open | Goals |
| 2–4 | What is a SPA? | Definition + **your SPA vs traditional tldraw** |
| 4–9 | **Activity: SPA Detective** | Warm-up: KSPA radio site built both ways (the music timer resets on the traditional one, keeps playing on the SPA). Then 3 real sites: YouTube, Wikipedia (with DevTools → Network → Doc), the curriculum site. **K** shows verdicts. |
| 9–16 | Tech stack | Stack diagram → React components → Router diagram → `npm create vite` |
| 16–21 | Equip Claude | Toolbelt diagram → 3 MCPs (`/mcp`) → 4 skills (`/skills`) |
| 21–26 | Build it | app_outline diagram → **paste the short 2-phase prompt, approve the phases** → build-loop diagram |
| 26–31 | **Who's responsible?** | Core 8 cards while Claude builds phase 1. Stop when Claude finishes. |
| 31–34 | Check in on Claude | Compare phase 1 with `home.png`, take class feedback, approve. Not done? Use the backup app. |
| 34–38 | Ship it | git commit → front-end sub-agent |
| 38–40 | Wrap | Homework Part II → exit ticket |

**Why these activities:** *SPA Detective* is the same idea as your "which HTTP method am I using?" site tour. You drive real websites, they call it. *Who's Responsible?* fills the dead air while Claude builds, and drills the tech-stack and MCP/skill roles.

---

## Night-before checklist

- [ ] `bash lecture-2-building-spas/demo-kit/setup-mcps.sh` (or confirm all 3 MCPs show in `/mcp`)
- [ ] Follow `demo-kit/RUNBOOK.md` steps 1–3: scaffold the `liftlog` demo project with skills + `app_outline`, commit
- [ ] Dry-run the prompt once so you know how long phase 1 takes on your machine, then reset to the scaffold commit
- [ ] `cd demo-kit/backup-liftlog && npm install && npm run dev`: confirm the backup runs
- [ ] Open both decks, press **P**, and check the presenter window shows notes
- [ ] Point students at the class site's "Set up Claude Code" section for `setup-skills.sh`
- [x] Class site is live at https://kabeier.github.io/SPAs-and-Claude/ (every slide deck, activity and diagram, each opening in a new tab)
