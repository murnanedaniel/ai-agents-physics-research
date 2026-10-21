---
name: keynote-slides
description: Build compelling browser-based scientific slides for talks, keynotes and course lectures as a Next.js scene deck (Stage, timeline, one React component per scene, reveal steps, motion). Use for "make a talk / keynote / lecture deck", "build slides for my seminar", "add a scene to the deck", "the slides look sloppy, fix them", and for reviewing an existing scene deck against the house style. Not for quick group-meeting updates (use project-slides).
---

# Keynote slides

A keynote deck is a sequence of **scenes**. Each scene makes one point, shows it as a picture first, and reveals it in steps that match what the speaker says. The house style comes from two real talks: the NBI talk (`github.com/murnanedaniel/NBI-AI-future`, the "narrated-cinematic 20-minute talk") and its descendant, the ETH talk (`~/PrivateWork/ETH-Agentic-AI-for-Collider-Physics`, live at danielmurnane.com/ETH-Agentic-AI-for-Collider-Physics/). The starter engine is `templates/keynote-deck/` in the course repo.

Read [DESIGN.md](DESIGN.md) before building (do and don't, with examples from the real decks). Finish with [CHECKLIST.md](CHECKLIST.md). Use British spelling and no em dashes in anything on screen.

## When to use

- A talk, seminar, keynote or course block where a speaker narrates and the slides carry pictures, numbers and a few words.
- Adding or fixing scenes in an existing scene deck (the ETH deck, the course deck in `deck/`, or a copy of the template).
- Not for a 5-minute group-meeting update or a supervisor check-in: use `project-slides`, which is faster and plainer.

## Principles

1. **One idea per scene.** If the scene needs "and" in its storyboard line, it is two scenes. Splitting is cheap; the engine has no slide limit.
2. **A visual concept before words.** Decide what the audience *sees* (a number, a timeline, a graph, an event display, a before/after) before writing any text. Text that only restates what the speaker says goes in the speaker's mouth, not on the screen.
3. **The headline is a question, or the answer to a question already asked.** One italic serif line in sentence case. Section scenes ask the question ("How does an agent work?"); the scenes inside the section answer it ("A harness gives the model tools, memory and permissions."). A claim the audience has no question for yet ("An agent acts, observes and tries again." straight after a list of examples) lands as noise: ask first, then answer. Never all lowercase, Title Case or a bare topic label ("Serving"). Shorten until it fits on one line.
4. **Type scale, not ad hoc sizes.** Use the scale in the template's `globals.css` (`.t-display`, `.t-title`, `.t-headline`, `.t-body`, `.t-label`, `.t-source`). At 1280x720 nothing a viewer must read is under 12px, and anything that is not a label or source is at least 18px.
5. **Density limits.** At most 80 words on screen on the final step (aim for 60), sources and labels excluded. At most one big number per scene, plus one comparator. At most three items in any list. No paragraphs.
6. **Progressive reveal.** `steps` in the timeline equals the number of things the speaker says. Every click changes something visible, and what appears is what is being said. The visual is revealed in steps too, not just the text under it.
7. **Motion only when it explains.** Animate to show change (a rate climbing, a loop closing, an error bar shrinking) or to direct the eye to the next thing. Entrance fades are short (0.5 to 0.9 s). No motion as decoration.
8. **Light theme only.** Warm off-white paper and dark ink throughout.
9. **No kicker or section label on the slide.** Section and time live in the presenter view. Titles are one italic serif line in sentence case. Sources are small, muted and in a corner, with an actual citation. No per-scene footers, draft badges or navigation hints.
10. **Evidence with sources.** Every number on screen has a source on the same scene (paper, arXiv id, table or figure, or a "measured on this laptop" note). Keep a `FACTS.md` ledger in the repo, like the ETH deck's, with the exact value and citation for every number used.
11. **Interaction where it aids understanding.** A stepper through a mechanism, a toggle between before and after, hover for the exact value on a chart, a click-through to the paper. Interactive elements stop click propagation so they do not advance the deck.
12. **Charts follow the dataviz skill.** Pick the form first, one axis, thin marks, direct labels, a legend for two or more series, values in text colour not series colour, recessive grid. Draw charts as SVG in the scene, not as pasted PNGs with their own fonts and white backgrounds.

## Narrative (the most common review failures)

A first draft of the course deck had clean scenes that still failed review, because the audience could not tell what each scene was about. These rules come from that review; check them before polishing anything.

13. **Signpost every topic change.** Open each section with a section scene: the section's question as the title, two to four short lines on what is coming, and a quiet visual (for example the talk's map with the current part highlighted). Within a section, each title follows from the one before it. An audience that has to ask "have we switched topic?" has been lost.
14. **Introduce the concept, then go deep.** The first scene on a topic says what it is in plain words (what a skill is, what the KV cache is, what hill-climbing is). The following scenes go deeper: the mechanism, the example, the limits. Several scenes per topic is normal; one dense scene per topic is not.
15. **Motivate before the method.** Say why the audience should care (the physics question, the problem, who else tried) before showing how. "Zoom out" is the most frequent review note: what is the point, which tools exist, how do they connect.
16. **Context for every piece of evidence.** Each plot or number says where it comes from (your own data or a published source), what the setup was, and which question it answers. A plot the speaker has to explain from scratch, or that looks like nonsense without its setup, fails.
17. **Show what things do, not adoption statistics.** For a system or project, describe it, show it working (screenshots, demo stills, animations of the mechanism), and say how quickly it was built if that is the point. Commit counts and usage curves are not the story.
18. **Tense matches reality.** Work that will happen live or later is presented as a plan: the question, the background, the state of the art, the method. No results or speed-ups for work that has not run yet.
19. **Animate mechanisms.** Processes (training methods, a detector reconstruction, a data pipeline, nested loops) are clearer as a short step-gated animation than as a labelled box diagram.
20. **Cut scenes the speaker did not ask for** and scenes that only make sense to whoever built them. If you can't say what question a scene answers, remove it or ask.

## Workflow

1. **Storyboard.** Group scenes into sections, each opened by a question. Write one row per scene in `src/lib/timeline.ts`: `id`, `label`, `part`, `theme`, `steps`, time budget, and `line`, the one sentence you will say. Read the lines aloud in order, and for each scene name the question it answers. If the talk does not work as a list of sentences, no amount of animation will fix it.
2. **Visual concept.** For each scene write one line on what is seen: "a huge italic number, then its comparator", "four boxes lit in turn", "three measurements with error bars, the newest highlighted". Pick a scene kind from the template (title, big number, diagram with stepper, chart, quote, two-column comparison) or design a new one. Check it against DESIGN.md.
3. **Build.** One component per scene in `src/components/scenes/`, wrapped in `SceneFrame` (headline, visual region, corner source). Use `Reveal` for anything that appears on a step. Register it in `src/lib/sceneRegistry.tsx` (a missing entry is a type error). Data with sources goes in `src/data/`.
4. **Screenshot.** `npm run build:export && npm run shoot`. This captures every scene at every step at 1280x720 and 1920x1080 (`shots/`) and writes `shots/report.md` with the measurable checks: word count, minimum font size, text overlaps and text crossing box edges, overflow out of its region, contrast, placeholder text, em dashes, steps that change nothing, numbers without a source. On homebox set `LD_LIBRARY_PATH` and `CHROMIUM_PATH` as in the template README.
5. **Critique.** Open the screenshots and read them as an audience member at the back of the room. Go through CHECKLIST.md. The script cannot tell whether a scene says one thing, whether the picture explains the claim, or whether the reveal order matches the speech: those need eyes.
6. **Fix and repeat** until the report has no FAIL and every checklist box is ticked. Then rehearse with the presenter clock (`P`) and adjust the time budgets.

## How scenes plug in

- `src/lib/timeline.ts`: the storyboard and single source of truth for order, theme, steps and timing.
- `src/lib/sceneRegistry.tsx`: maps scene id to component. `Stage` renders `SCENE_COMPONENTS[scene.id]` with the current `step` (0-based).
- `src/components/Stage.tsx`: keyboard and click navigation (→, space, PageDown advance; ←, PageUp go back; `P` presenter clock; `R` restart), the light background, and deep links `?scene=<id>&step=<n>` for rehearsal and screenshots.
- `src/components/kit/`: `SceneFrame` (layout regions that cannot collide: header, visual with `min-h-0` and clipping, source), `Reveal` (step-gated, space reserved so nothing jumps), `Source`.
- Assets in `public/` are referenced through `asset()` so they work under a GitHub Pages base path.

To start a new deck, copy `templates/keynote-deck/` (see its README for GitHub Pages and the danielmurnane.com base path). To fix an existing deck, run the shoot script against it first (`node scripts/shoot.mjs --url <deck url>`; it falls back to pressing → on decks without `&step=` support) and work from the report.

## Reporting back

Say which scenes were built or changed, the shoot report summary (captures, FAIL count, warnings left and why), which checklist items need the speaker (claims, sources, timing), and the local or tailnet URL where the deck can be seen.
