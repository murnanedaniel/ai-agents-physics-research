# Exercise: interview your research setup

Goal: turn your research habits and boundaries into short agent rules, one or two starter skills and a decision log.

Time box: 20 minutes, about 10 for the interview and 10 for drafting and review.

Choose a tier:

1. **Web chat:** open [PROMPT.md](https://github.com/murnanedaniel/ai-agents-physics-research/blob/main/skills/research-setup/PROMPT.md), paste the prompt into claude.ai or ChatGPT and answer the interview. Review the drafts, give explicit OK, then copy the printed files into your project.
2. **Terminal agent:** get the skill and copy it into your skills folder:

    ```bash
    git clone https://github.com/murnanedaniel/ai-agents-physics-research
    cp -r ai-agents-physics-research/skills/research-setup ~/.claude/skills/
    ```

    (Or into your project's `.claude/skills/`. Codex users: `.agents/skills/`.) [Browse the skill](https://github.com/murnanedaniel/ai-agents-physics-research/blob/main/skills/research-setup/SKILL.md). Start Claude Code and say "interview me about my research setup". Review drafts and paths before giving explicit OK to write.
3. **Own project:** run the interview inside your real repository. Use your actual tools, compute limits and collaboration policies, without sharing secrets. Review and approve the files, then commit the result yourself.

Done looks like:

- You have corrected a five-bullet summary of your setup.
- A `CLAUDE.md` (or `AGENTS.md` for Codex) records your baseline, compute limits, approval gates and preferences, under 80 lines.
- One or two starter skills match tasks you actually do, each under 60 lines.
- `DECISIONS.md` records why you set up these rules today.
- You have checked that no passwords, tokens, keys or restricted material appear in the files.

Stretch goals:

- Try one starter skill on a small, safe task and improve a rule from what happens.
- Turn one recurring failure into an automated check, such as comparing a reproduced baseline against an agreed tolerance.

[Back to the deck ↩](../../?scene=outer-intro)
