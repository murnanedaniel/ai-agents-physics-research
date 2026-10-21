---
name: share-to-course
description: Share hands-on work from the "AI Agents in Practice for Physics Research" course as a show-and-tell pull request. Use when the participant says "share my hands-on N", "show and tell", or "open a PR to the course".
---

# Share to course

Opens a PR to `murnanedaniel/ai-agents-physics-research` adding `showcase/<handle>/hands-on-<N>/README.md` and at most one screenshot. Plain language, British spelling, no em dashes. Never ask for or print tokens or passwords. Never push or open the PR without an explicit OK.

## Steps

1. **N.** Ask which hands-on (0 to 3) if they did not say.
2. **gh.** Run `gh --version` and `gh auth status`. Not installed: point to https://cli.github.com and stop, or offer the web fallback. Not logged in: ask them to type `! gh auth login` themselves (GitHub.com, HTTPS, browser login). Never handle the code or token for them.
3. **Handle.** `HANDLE=$(gh api user --jq .login)`.
4. **Fork and clone.** Work in `~/course-showcase`.
    - First time: `gh repo fork murnanedaniel/ai-agents-physics-research --clone=false --default-branch-only`, then `gh repo clone "$HANDLE/ai-agents-physics-research" ~/course-showcase`.
    - Already there: `gh repo sync "$HANDLE/ai-agents-physics-research"`, then `git -C ~/course-showcase switch main && git -C ~/course-showcase pull`.
5. **Branch.** `git -C ~/course-showcase switch -c show-and-tell-<N>-<short-slug>`.
6. **Interview.** One message, three questions, short answers fine:
    1. What did you build or try?
    2. What surprised you?
    3. One thing that went wrong, and what you did about it.
7. **Write** `showcase/$HANDLE/hands-on-<N>/README.md`, at most 150 words, in their words:

    ```markdown
    # <short title>
    **Hands-on <N>** · <one line: field or project type, no internal names>
    ## What I built
    ## What surprised me
    ## What went wrong
    ![screenshot](screenshot.png)
    ```

    Drop the image line if there is no screenshot; match its extension to the real file.
8. **Screenshot (optional, one only).** Ask for the path. Run `bash "${CLAUDE_SKILL_DIR}/shrink-image.sh" <path> ~/course-showcase/showcase/$HANDLE/hands-on-<N>`. It copies or shrinks to under 1 MB as `screenshot.png` or `screenshot.jpg`. Ask them to look at the image for names, emails, tokens or unpublished plots.
9. **Privacy check.** Grep the new files for `ghp_`, `github_pat_`, `sk-`, `AKIA`, `BEGIN .*PRIVATE KEY`, `password`, `token`, email addresses and internal hostnames. Then ask, one line each: no secrets; no unpublished data or results; no collaboration-internal material (internal notes, unapproved plots, analysis names under embargo); no personal data of other people. Any doubt: remove it.
10. **Show the diff.** `git -C ~/course-showcase add showcase/$HANDLE/hands-on-<N>` then `git -C ~/course-showcase diff --cached`. Show the README in full and the image size. Say the repo is public. Wait for "OK".
11. **Commit, push, PR.**

    ```bash
    git -C ~/course-showcase commit -m "Show and tell <N>: <short title>"
    git -C ~/course-showcase push -u origin HEAD
    gh pr create --repo murnanedaniel/ai-agents-physics-research --base main \
      --head "$HANDLE:<branch>" --title "[show-and-tell <N>] <short title>" \
      --body "Hands-on <N> show and tell. See showcase/$HANDLE/hands-on-<N>/README.md."
    ```

    Give them the PR link. The title prefix must be exact: the live wall in the deck filters on it.

## Web-only fallback (no terminal)

1. Open https://github.com/murnanedaniel/ai-agents-physics-research and click **Fork**, then **Create fork**.
2. In your fork: **Add file** → **Create new file**. Name it `showcase/<handle>/hands-on-<N>/README.md` (typing `/` makes folders). Paste the README, choose **Create a new branch**, then **Propose changes**.
3. Optional screenshot: on that branch and folder, **Add file** → **Upload files** (one image, under 1 MB). Files added to the branch later join the same PR.
4. **Contribute** → **Open pull request** (or the button GitHub shows after step 2). Base: `murnanedaniel/ai-agents-physics-research`, `main`. Title: `[show-and-tell <N>] <short title>`.
