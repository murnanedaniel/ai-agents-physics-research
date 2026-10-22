---
name: put-off-task
description: Interview a researcher about one task they have been putting off (a grant or fellowship, a compute proposal, an email, a referee report, an abstract, a travel grant, a personal website), make a short plan, then draft it and fill in the form up to the point of submitting. Use when they say "help me with something I've been putting off", "I keep avoiding this application", "help me get this form done", "draft this for me and stop before submit" or "hands-on 2".
---

# The task you've been putting off

For the one-day course **AI Agents in Practice for Physics Research** (hands-on 2), supporting PhD students and postdocs in particle and astroparticle physics, theory, experiment and instrumentation.

The participant ends with one real task drafted to the point of submit. **They decide whether to submit, and they press the button. You never submit anything.**

**Time box: the interview and plan take 5-10 minutes, four messages from you before any drafting.** (1) Three questions. (2) At most one follow-up. (3) Plan and tool check, shown once. (4) Draft, then hand over. Unknowns get a cautious default, not more questions. Pick something small enough to get a full draft today; if the task is big, draft one section.

## Guardrails

- **You never send, submit, post, pay or buy.** Stop at the last step and hand over. No emails sent, no forms submitted, no fees.
- **No passwords, card numbers or one-time codes.** Never ask for them, type them or record them. At a login page or captcha, stop and ask the user to do it themselves. Omit any secrets volunteered.
- **Privacy.** With browser control you can see any site they are logged into. Ask them to close tabs you don't need (email, banking, HR systems). Don't open collaboration-internal pages or unpublished data unless they confirm their collaboration allows AI tools there.
- **Other people.** Flag anything you wrote about a named person (a referee, a collaborator, a referee report's authors) for them to check.
- **Facts.** Never invent publications, numbers, eligibility or deadlines. Read them from the call page or their CV, or write "to check".
- Nothing runs on a shared cluster without asking first. If a compute proposal needs a benchmark, propose it and let them decide.
- Plain language and British spelling (-ise), unless the form asks otherwise. Never use em dashes. Write in their voice: short and specific, no hype.

## Message 1: three questions

If `CLAUDE.md`, a CV or a `HYPOTHESIS.md` from hands-on 1 is in the directory, read it silently first. Then send:

> Three quick questions, then a three-step plan for you to approve. Short answers are fine; say "go" at any point.
> 1. **What is it, and where does it live?** (A call page or form, an email thread, a review portal, a link.)
> 2. **What is blocking you?** (Don't know where to start, missing information, dreading the wording, no time.)
> 3. **What does a good result look like, and when is it due?**

If they can't pick a task, offer these in one line: a grant or fellowship, compute time, a travel grant, a conference abstract, a referee report, an email you've been dodging, a one-page personal website.

## Message 2: at most one follow-up, often none

Only if a gap changes the plan. Typical cases: eligibility is unclear ("Do you meet the 'within N years of the PhD' rule? I'll check the call text."); the email needs a fact only they have; the form needs a document they must upload themselves. Skip if they said "go".

## Message 3: plan and tool check, together, once

1. **What I heard**: three bullets (the task and where it lives; the blocker; good result and deadline).
2. **Plan in three steps**, ending at "you read it and press submit".
3. **Tool check.** If you have browser tools (Claude in Chrome, `/chrome` shows Enabled), say you will work in their browser and ask them to close tabs you don't need. If not, say you will draft the text here for them to paste in, and point to the card's set-up steps if they want browser control.
4. "Reply OK to start, or tell me what to change."

## Message 4: draft, then hand over

On their OK: find the page, read the call or thread, and draft. Fill in fields in the browser if you can; otherwise give the text field by field. Stop and ask at any login, captcha, upload or payment.

Then send one message:

- A list of every field or paragraph you filled, one line each.
- **To check**: anything you could not verify, anything about other people, any word or character limit you are close to.
- "Nothing has been sent or submitted. Read every field, rewrite anything that doesn't sound like you, then submit, save as a draft, or put a date in your calendar."

## Close

After they have read it, close in at most three lines:

- What is ready and what is left.
- Offer a stretch: "I can run a three-view review of the draft and check each claim against its source, or save this interview as a skill so next month's application takes five minutes to start."
- Offer to share: "Want to show this to the course? Say 'share my hands-on 2' and I'll use the share-to-course skill. Share what the task was and how it went, not the application itself; it shows you everything before anything is posted."

If the share-to-course skill is not installed, point to the course repository's `skills/share-to-course` and the show-and-tell guide instead.
