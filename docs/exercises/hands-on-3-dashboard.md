# Hands-on 3: what dashboard would fit your research?

Goal: a research dashboard that runs on your machine, either ScienceDash or one Claude builds for you, and an agent that keeps working on it for 30 minutes without you.

Time box: 20 minutes working with Claude, then 30 minutes of the agent working alone while the talk continues, then show and tell.

Choose a tier:

1. **Web chat:** do the interview, and ask for a one-file HTML dashboard you can open in a browser. Paste in made-up or public numbers only.
2. **Terminal agent:** route A or B below.
3. **Own project:** point the dashboard at your real runs, papers or `HYPOTHESIS.md` from hands-on 1.

## First, the interview (5 minutes)

> Interview me about what a research dashboard should show me. Ask one question at a time: what I work on, what I check every morning, what I keep losing track of (runs, papers, deadlines, ideas, compute), and what would make me open it every day. Then propose three panels and the data each one needs.

## Route A: install ScienceDash

[ScienceDash](https://github.com/murnanedaniel/sciencedash) is Daniel's own dashboard: projects, hypotheses, runs against a metric, and paper skeletons. Open source (MIT), single user, runs on localhost. It needs Node 20.19 or newer, and Claude Code logged in to a Pro or Max plan for its AI features.

```bash
git clone https://github.com/murnanedaniel/sciencedash
cd sciencedash/web
npm install
cp .env.example .env
```

Open `.env`: it has a short block of commands that generate the four login values. Run them in your terminal, choose your own password, and paste the four resulting lines into `.env`. (On macOS replace `sha256sum` with `shasum -a 256`.) Then:

```bash
npx prisma migrate dev
npm run db:seed        # optional sample projects
npm run build && npm run start
```

Open `http://localhost:3000` and log in. If port 3000 is taken, run `npm run start -- -p 3001`. Stuck? Ask Claude to read the [README](https://github.com/murnanedaniel/sciencedash#readme) and do the install with you.

## Route B: build something like it

> Look at https://github.com/murnanedaniel/sciencedash for inspiration. Don't install it. Using what you learned in the interview, build me a much smaller dashboard for my research: the three panels we agreed, one page, running locally, with sample data I can replace. Tell me how to start it.

Keep it small: one page, local files or SQLite, no accounts, no cloud.

## The 20 + 30 rhythm

**20 minutes with Claude.** Get it running and looking roughly right. Agree on what "better" means.

**30 minutes alone.** Before you go back to the talk, give it a task it can finish without you:

1. **Work in a safe place.** A folder under git, on a new branch (`git switch -c agent-30min`), with nothing in it you can't lose.
2. **Safe permissions.** Start with `claude --permission-mode acceptEdits` (file edits allowed, other actions still ask) or `claude --permission-mode auto` (a classifier reviews each action). Never use `bypassPermissions` on your own laptop. See [permission modes](https://code.claude.com/docs/en/permission-modes).
3. **A clear task with a done criterion.** For example:

    > Work on your own for the next 30 minutes. Task: add a panel that shows [X] from [file]. Done means: the page loads with no errors, the panel shows real numbers from the file, and you have checked it in the browser or with a test. Commit after each working step with a clear message. Don't install anything new without asking, don't touch files outside this folder, don't push. When done, or at 30 minutes, write SUMMARY.md: what you did, what you checked, what is left.

4. Glance at it once or twice. If it is waiting for a permission, answer and move on.

Done looks like:

- A dashboard running at a localhost address on your machine.
- A branch with several small commits from the 30-minute run, and a `SUMMARY.md` you have read.
- You checked at least one number on the dashboard against its source.

Stretch goals:

- Feed it your `HYPOTHESIS.md` from hands-on 1 and track the metric over runs.
- Turn your done criterion into a test that the agent must pass before committing ([Turn a rule into a check](gates-and-checks.md)).

## Show and tell

With the skill: in Claude Code say "share my hands-on 3 to the course". The share-to-course skill asks three short questions, writes `showcase/<your-handle>/hands-on-3/README.md`, adds one screenshot of your dashboard (shrunk if over 1 MB), shows you the diff and opens the PR once you say OK.

By hand: follow the [show-and-tell guide](show-and-tell.md). Title the PR `[show-and-tell 3] <short title>`. Use sample data in the screenshot if your real data is unpublished.

[Back to the deck ↩](../../../?scene=hands-on-3)
