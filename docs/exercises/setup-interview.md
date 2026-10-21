# Exercise: interview your research setup

Goal: turn your research habits and boundaries into a short rules file and one starter skill.

Time box: 5-10 minutes. The agent asks three questions, perhaps one follow-up, then shows everything in one message for you to approve. Short answers are fine; say "go" whenever you want it to draft.

Choose a tier:

1. **Web chat** (also works on a phone or a locked-down laptop): open [PROMPT.md](https://github.com/murnanedaniel/ai-agents-physics-research/blob/main/skills/research-setup/PROMPT.md), paste the prompt into claude.ai, ChatGPT or Copilot chat and answer three questions. You get a block of standing instructions to paste into your chat tool's custom or project instructions, and one reusable prompt. Do not paste unpublished data or collaboration-internal material into a chat tool your institution has not approved.
2. **Terminal agent:** get the skill and copy it into your skills folder:

    ```bash
    git clone https://github.com/murnanedaniel/ai-agents-physics-research
    cp -r ai-agents-physics-research/skills/research-setup ~/.claude/skills/
    ```

    (Or into your project's `.claude/skills/`. Codex users: `.agents/skills/`.) [Browse the skill](https://github.com/murnanedaniel/ai-agents-physics-research/blob/main/skills/research-setup/SKILL.md). Start Claude Code and say "interview me about my research setup". Read the drafts and paths, then reply OK to write.
3. **Own project:** run the interview inside your real repository. Use your actual tools, compute limits and collaboration policies, without sharing secrets. If you already have a `CLAUDE.md`, the agent proposes additions only, or one hook if you ask for it. Commit the result yourself.

Done looks like:

- A rules file of under 40 lines (`CLAUDE.md`, `AGENTS.md` for Codex or Copilot, or a pasted instructions block for chat tools) records your baseline habit, limits, what the agent must ask first, and one rule from a real failure.
- One starter skill or reusable prompt matches a task you actually do.
- Terminal tiers: a three-line `DECISIONS.md` entry records why you set up these rules today.
- You have checked that no passwords, tokens, keys or restricted material appear in it.

Stretch goals:

- Try the starter skill on a small, safe task and improve a rule from what happens.
- Add a second skill, or a hook that enforces your most important rule.
- Turn one recurring failure into an automated check, such as comparing a reproduced baseline against an agreed tolerance.

[Back to the deck ↩](../../?scene=outer-intro)
