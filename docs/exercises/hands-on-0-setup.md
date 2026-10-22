# Hands-on 0: get set up

Goal: a GitHub account, Claude Code running, the course skills installed, and a short rules file (plus memory notes) written by an interview about how you work. Then your first pull request.

Time box: about 15 minutes. If installing stalls, switch to the web-chat tier and carry on; you can install later.

Choose a tier:

1. **Web chat** (no install, works on a phone): sign up to GitHub (step 1), then do the [setup interview](setup-interview.md) in claude.ai, ChatGPT or Copilot chat using the pasted prompt. Share by hand (see Show and tell).
2. **Terminal agent:** all the steps below.
3. **Own project:** the steps below, but run the interview inside your real research repository.

## Steps

1. **GitHub account.** Claude and git go hand in hand: every change an agent makes should land as a commit you can read and undo. Sign up at [github.com/signup](https://github.com/signup). Students and academic staff can apply for the free [GitHub Student Developer Pack](https://education.github.com/pack) with a university email address; approval can take a few days, so you don't need it today.
2. **Install Claude Code.** Use the official installer from the [setup page](https://code.claude.com/docs/en/setup):

    ```bash
    # macOS, Linux, WSL
    curl -fsSL https://claude.ai/install.sh | bash
    ```

    ```powershell
    # Windows PowerShell
    irm https://claude.ai/install.ps1 | iex
    ```

    Homebrew (`brew install --cask claude-code`) and WinGet (`winget install Anthropic.ClaudeCode`) also work. Check with `claude --version`, then run `claude` and log in through the browser. Claude Code needs a paid plan (Pro or above) or a Console account; the free claude.ai plan does not include it. No plan? Use the web-chat tier.

3. **Clone the course repository.**

    ```bash
    git clone https://github.com/murnanedaniel/ai-agents-physics-research
    ```

4. **Install the course skills.** Copy them into your personal skills folder (available in every project):

    ```bash
    mkdir -p ~/.claude/skills
    cp -r ai-agents-physics-research/skills/* ~/.claude/skills/
    ```

    Or copy them into one project's `.claude/skills/` instead. Restart Claude Code, then ask "what skills do you have?" to check they loaded.

5. **The setup interview.** Open your project folder (or an empty one), start `claude` and **ask your agent: "interview me about my research setup".** It asks three questions about your work, your compute and what it must never do, then drafts a `CLAUDE.md`, one starter skill and a `DECISIONS.md` entry, and writes them only when you say OK. Details and tiers: [Interview your research setup](setup-interview.md).
6. **Memory.** Keep talking for a minute: tell it what resources you have (cluster, GPUs, collaboration tools, deadlines) and ask "save what is worth remembering about me as memory notes". Run `/memory` to see and edit what it stored. See [how Claude remembers your project](https://code.claude.com/docs/en/memory).
7. **Keep your transcripts.** By default Claude Code deletes session transcripts after 30 days, silently. They are your research record, so keep them: add `"cleanupPeriodDays": 3650` to `~/.claude/settings.json` (0 is not allowed; a large number means about ten years). See [cleanupPeriodDays](https://code.claude.com/docs/en/settings-reference#cleanupperioddays).
8. **First pull request.** Share what you did (see Show and tell below). That PR is your first.

Done looks like:

- `claude --version` prints a version and you are logged in.
- `ls ~/.claude/skills` shows `research-setup`, `hill-climb-plan`, `put-off-task`, `research-dashboard`, `share-to-course` and the other course skills.
- A `CLAUDE.md` of under 40 lines, in your own words, that you have read.
- At least one memory note you have checked with `/memory`.
- A pull request open on the course repository.

Stretch goals:

- Put your project under git (`git init`, first commit) and ask the agent to commit only after you have read the diff.
- Ask Claude to explain one rule in your new `CLAUDE.md` back to you and fix anything it misread.

## Show and tell

With the skill: in Claude Code say "share my hands-on 0 to the course". The [share-to-course skill](https://github.com/murnanedaniel/ai-agents-physics-research/tree/main/skills/share-to-course) asks three short questions, writes `showcase/<your-handle>/hands-on-0/README.md`, shows you the diff and opens the PR once you say OK.

By hand: follow the [show-and-tell guide](show-and-tell.md). Title the PR `[show-and-tell 0] <short title>`. Never share your `CLAUDE.md` if it names unpublished data, internal tools or people.

[Back to the deck ↩](../../../?scene=hands-on-0)
