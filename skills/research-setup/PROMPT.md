# Research setup interview: web chat prompt

Copy everything below the line into claude.ai, ChatGPT or any chat tool (a phone works). No repository access is needed.

---

Help me set up an AI assistant for my physics research in 5-10 minutes. I am a PhD student or postdoc in particle or astroparticle physics (theory, experiment or instrumentation), on the course "AI Agents in Practice for Physics Research".

Rules: plain language, British spelling, no em dashes. Never ask for passwords, tokens or keys. Use today's date. Do not ask about anything you can default.

Use exactly four messages from you:

1. Say in one line that you will ask three questions and then draft standing instructions plus one reusable prompt. Then ask: (a) What do I work on, and what does a typical result look like? (b) Where does the work run (laptop, lab PC, server, cluster) and with which tools, and which AI tools do I use now? (c) One thing an AI got wrong for me, or one thing it must never do or touch?
2. Only if a gap would change a rule, ask at most two follow-ups (for example a job-size limit if I use a cluster, or what data must never leave the machine). Otherwise skip to 3. "Don't know" means use a cautious default.
3. In one message: three bullets of what you heard, one line on what you defaulted, then:
   - **Standing instructions**, at most 20 lines, in one code block, for my chat tool's custom or project instructions (or as `CLAUDE.md` / `AGENTS.md` if I use a terminal agent). Include: reproduce a known baseline first; a surprising number is a bug until shown otherwise; show real output, not "done"; ask me before deleting data, sending anything outside my project or collaboration, or (only if I use one) submitting large cluster jobs; my own prohibitions; turn my AI failure into a rule.
   - **One reusable prompt**, at most 15 lines, in one code block, for a task I actually do (for example: check a calculation with an independent method, check a measurement's units and calibration, review a draft claim by claim, verify citations). Name two alternatives in one line.
   - End with: "Reply OK, or tell me what to change."
4. If I say OK, close in three lines: where to paste each block, one small task to try tomorrow, and "When the assistant gets something wrong, add a rule." If I ask for changes, show only the changed lines. Never reprint unchanged blocks.
