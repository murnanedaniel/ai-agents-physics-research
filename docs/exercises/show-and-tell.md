# Show and tell: share your work by pull request

Each hands-on ends with a show and tell. You open a pull request (PR) to the course repository that adds a short note about what you did, plus one screenshot if you like. The deck shows every PR on a live wall, and Daniel's agent reviews them and comments as they come in.

A PR is how almost all agent work should land: a change you can read, discuss and undo. This is practice for that.

## What you add

```
showcase/<your-github-handle>/hands-on-<N>/README.md
showcase/<your-github-handle>/hands-on-<N>/screenshot.png   (optional)
```

- README of at most about 150 words: what you built, what surprised you, one thing that went wrong.
- At most one screenshot, under 1 MB, as `.png` or `.jpg`.
- PR title starting with `[show-and-tell N]`, for example `[show-and-tell 0] My first CLAUDE.md for a calorimeter analysis`. The wall filters on this prefix, so copy it exactly.

## Route 1: the skill (terminal)

If you installed the course skills in [hands-on 0](hands-on-0-setup.md), start Claude Code and say:

> Share my hands-on 1 to the course.

The [share-to-course skill](https://github.com/murnanedaniel/ai-agents-physics-research/tree/main/skills/share-to-course) then:

1. Checks the [GitHub CLI](https://cli.github.com) (`gh`) is installed and logged in. If not, it asks you to run `gh auth login` yourself.
2. Forks the course repository to your account and clones it to `~/course-showcase` (or updates it if it is already there).
3. Makes a new branch.
4. Asks three short questions and writes your README.
5. Adds one screenshot, shrunk if it is over 1 MB.
6. Runs a privacy check, then shows you the full diff.
7. Opens the PR only after you say OK, and gives you the link.

## Route 2: by hand in the browser

No terminal needed.

1. Open the [course repository](https://github.com/murnanedaniel/ai-agents-physics-research) and click **Fork**, then **Create fork**.
2. In your fork, click **Add file** → **Create new file**. Name it `showcase/<your-handle>/hands-on-<N>/README.md` (typing `/` makes the folders). Write your note.
3. Choose **Create a new branch**, then **Propose changes**.
4. Optional: in the same folder on that branch, **Add file** → **Upload files** for your screenshot.
5. Click **Contribute** → **Open pull request** (or use the button GitHub shows straight after step 3). Check the base is `murnanedaniel/ai-agents-physics-research`, `main`. Set the title to `[show-and-tell N] <short title>` and create the PR.

GitHub's own guides: [adding a file](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository) and [creating a PR from a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

## Before you press create

The repository is **public**, and stays public after the course. Check that your README and screenshot contain:

- no passwords, tokens or keys (look at terminal screenshots carefully)
- no unpublished data or results
- no collaboration-internal material
- no names, emails or faces of other people without their consent

If in doubt, describe it in words and leave the screenshot out. Rules and layout: [showcase/README.md](https://github.com/murnanedaniel/ai-agents-physics-research/tree/main/showcase).

[Back to all hands-on exercises](index.md)
