# Hands-on 2: what have you been putting off?

Goal: Claude in Chrome drafts and fills in one real task you have been avoiding, up to the point of submitting. You read it and press submit yourself, or not.

Time box: about 20 minutes. Pick something small enough to get a full draft today.

Choose a tier:

1. **Web chat:** no browser control. Do the interview in claude.ai, ChatGPT or Copilot chat and get a draft you paste into the form yourself.
2. **Claude in Chrome:** the agent works in your own browser, with your logins. Steps below.
3. **Own project:** use the task that matters most to you this month, such as a real grant call or compute proposal with a deadline.

## Set up Claude in Chrome

1. Install the [Claude in Chrome extension](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn) in Chrome or Edge and sign in. It needs a paid plan (Pro, Max, Team or Enterprise). See [Get started with Claude in Chrome](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome).
2. Either use it from the Chrome side panel, or connect Claude Code to it: run `claude --chrome`, then `/chrome` to check the status shows Enabled. Full guide: [Use Claude Code with Chrome](https://code.claude.com/docs/en/chrome). Not supported inside WSL.
3. When it hits a login page or captcha it stops and asks you. Let it. Approve sites one at a time rather than allowing everything.

## Pick a task

- **A grant or fellowship** you are eligible for: find the call, check eligibility, draft the summary section.
- **A compute allocation** (a national centre, your university cluster, a cloud credit programme): draft the technical justification from your `HYPOTHESIS.md`.
- **Emails** you have been dodging: a collaborator, a reply to a referee, asking someone for data.
- **A paper review** you owe: a structured first pass for you to check and rewrite.
- **A conference abstract:** find the deadline, draft within the word limit.
- **A travel grant** for a school or conference: most are short forms with a motivation paragraph.
- **A personal website** to show your work: a one-page site from your publication list, hosted on GitHub Pages.

If you are a student: this is a chance to aim higher. Apply for the travel grant, submit the abstract, put your work where people can find it.

## Steps

1. Start with this interview prompt:

    > Interview me about one task I have been putting off. Ask me, one question at a time: what it is, what is blocking me, what a good result looks like, and the deadline. Then make a plan in three steps, find the form or page, and fill in a draft. Stop before anything is sent or submitted.

2. Watch it work. Correct it early when it drifts.
3. Read every field it filled in. Rewrite anything that does not sound like you or that you cannot stand behind.
4. Decide: submit, save as a draft, or finish tomorrow.

## Hard rules

- **You press submit.** The agent drafts and fills in; it never sends an email, submits a form or posts anything.
- **No passwords or payments by the agent.** Type logins yourself when it stops; never give it a password, card number or one-time code. No purchases, no fee payments.
- **Privacy.** The agent can see any site you are logged into. Close tabs it does not need (email, banking, HR systems). Don't let it open collaboration-internal pages or unpublished data unless your collaboration allows AI tools there. Check what it writes about other people before anything leaves your machine.

Done looks like:

- One task drafted to the point of submit, and you have read every word.
- You have either submitted it yourself or put a date in your calendar to do so.
- No password, payment or send was done by the agent.

Stretch goals:

- [Review a draft, then audit its claims](review-a-draft.md): run a three-view review on what Claude wrote and check every claim against its source.
- Save the interview prompt as a skill so next month's grant takes five minutes to start.

## Show and tell

With the skill: in Claude Code say "share my hands-on 2 to the course". The share-to-course skill asks three short questions, writes `showcase/<your-handle>/hands-on-2/README.md`, shows you the diff and opens the PR once you say OK.

By hand: follow the [show-and-tell guide](show-and-tell.md). Title the PR `[show-and-tell 2] <short title>`. Share what the task was and how it went, not the application itself. Blur names, email addresses and reference numbers in your screenshot.

[Back to the deck ↩](../../../?scene=hands-on-2)
