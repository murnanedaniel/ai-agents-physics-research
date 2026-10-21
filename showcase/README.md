# Showcase

Work shared by participants of **AI Agents in Practice for Physics Research** (KIT, 22 October 2026). Each hands-on ends with a show and tell: you open a pull request that adds a short note about what you built, and it appears on the live wall in the deck.

## Layout

```
showcase/
  <github-handle>/
    hands-on-0/
      README.md          what you built, at most about 150 words
      screenshot.png     optional, one image, under 1 MB (.png or .jpg)
    hands-on-1/
    ...
```

Use your GitHub handle exactly as it appears in your profile URL. One folder per hands-on (0 to 3).

## Rules

- **It's public.** This repository and its pull requests are visible to anyone, including after the course.
- **Size:** README of at most about 150 words; at most one screenshot, under 1 MB. No data files, notebooks or code dumps; link to your own repository instead.
- **Privacy:** no passwords, tokens or keys; no unpublished data or results; no collaboration-internal material; no personal data of other people (names, emails, faces) without their consent. Check your screenshot as well as the text.
- **Only touch your own folder.** A show-and-tell PR changes nothing outside `showcase/<your-handle>/`.

## Pull request title

Start the title with `[show-and-tell N]`, where N is the hands-on number, then a short title:

```
[show-and-tell 2] Drafted my first travel grant application
```

The deck's live wall filters pull requests on this prefix, so it must be exact.

## How to share

The [share-to-course skill](../skills/share-to-course/SKILL.md) does it for you from Claude Code: say "share my hands-on N to the course". To do it by hand, or in the browser only, see the [show-and-tell guide](https://www.danielmurnane.com/ai-agents-physics-research/docs/exercises/show-and-tell/).
