# Verification before showing

Run `npm run build:export && npm run shoot` first. Items marked **[auto]** are measured by `scripts/shoot.mjs` and appear in `shots/report.md`; the rest need a person (or an agent) looking at the screenshots. Screenshot creation alone is not inspection: open the images.

## Narrative (check first: most review failures are here)

- [ ] Scenes are grouped into sections, and each section opens with a section scene whose title is the section's question.
- [ ] Each title is a question, or the answer to the question just asked (by the section scene or the previous scene). Read the titles in order: no answer arrives before its question, and no topic change goes unannounced.
- [ ] Every concept is introduced in plain words the first time it appears (skill, harness, KV cache, hill-climbing...), before any scene goes deeper.
- [ ] Each topic is motivated before the method: why it matters, what the problem is, what exists already.
- [ ] Every plot or number states its provenance (own data or published), the setup, and the question it answers.
- [ ] Systems and projects are shown doing things (screenshots, animated mechanisms). No adoption statistics as the story.
- [ ] Work that hasn't run yet is presented as a plan, with no results.
- [ ] For every scene you can say which question it answers. If not, it is cut or the speaker is asked.

## Storyboard

- [ ] Every scene in `src/lib/timeline.ts` has a `line`: one sentence the speaker says. Read in order, the lines make the talk.
- [ ] Each line contains one idea. No "and" joining two claims.
- [ ] Every scene has a visual concept written down before its text, and the visual is the largest thing on screen (except quote and title scenes).
- [ ] Time budgets add up to the slot, with at least 10% slack. Rehearsed once with the presenter clock (`P`).
- [ ] Light theme only.

## Density and typography

- [ ] **[auto]** At most 40 words on screen on the final step of each scene (warning above 30). Sources and axis labels are not counted; numbers are not words.
- [ ] **[auto]** No text under 12px at 1280x720, including SVG text after scaling. Anything that is not a label or source is at least 18px (warning).
- [ ] At most one big number per scene, with its comparator. At most three items in any list or row of cards.
- [ ] Title is one italic serif line in sentence case, phrased as a question or the answer to the question just asked, in `.t-headline` (or `.t-title` on the opening scene). No topic labels ("Results", "Serving", "What is it?").
- [ ] No sentence on screen repeats the headline or another element of the same scene.
- [ ] Sizes only from the scale in `globals.css` (`.t-display`, `.t-title`, `.t-headline`, `.t-body`, `.t-label`, `.t-source`); no one-off pixel sizes in scenes.

## Layout

- [ ] no kicker/section label on the slide; section and time live in the presenter view

- [ ] **[auto]** No overlapping text and no text crossing the edge of a card, pill or panel it does not belong to.
- [ ] **[auto]** No text outside the viewport or outside its `SceneFrame` region, at both 1280x720 and 1920x1080.
- [ ] Screenshots at both sizes inspected: nothing clipped, labels inside their boxes, arrows not running into text, no large accidental empty areas, the visual centred on what matters.
- [ ] Every scene uses `SceneFrame` (or `bare` with its own layout for title and quote scenes). No scene invents its own header or footer.

## Colour and contrast

- [ ] **[auto]** Text contrast at least 4.5:1 (3:1 at 24px and above) against the theme surface. Deliberately ghosted elements (an upcoming diagram stage, the losing column) carry `data-dim` and are excluded.
- [ ] Charts follow the dataviz skill: categorical hues in fixed order, one axis, thin marks, direct labels, values in text colour not series colour, legend for two or more series, recessive grid. Run its palette validator for any new categorical palette.
- [ ] Colour is never the only carrier of meaning: status, highlight and comparison also use position, a label or a shape.

## Reveal steps and motion

- [ ] **[auto]** Every step changes something visible (no two consecutive step screenshots are identical).
- [ ] `steps` in the timeline equals the number of things the speaker says on that scene, and each step reveals exactly the thing being said at that moment.
- [ ] The visual reveals in steps too, not only the text. Nothing the speaker has not reached yet is readable (ghosted is fine, legible is not).
- [ ] Anything that appears on a step uses `Reveal` (or carries `data-reveal`) so space is reserved and nothing else on the scene jumps.
- [ ] Each animation explains a change or directs the eye. Entrances 0.5 to 0.9 s. No looping decoration competing with the speaker.
- [ ] Interactive elements (hover, toggles, links) call `stopPropagation` so clicking them does not advance the deck. Tried in a browser; screenshots cannot test hover or clicks.

## Evidence

- [ ] **[auto]** Every scene with a number on screen has a source line (warning).
- [ ] Every number is in the repo's `FACTS.md` (or `src/data/*.ts`) with exact value, units, uncertainty and citation (paper, arXiv id, table or figure, or "measured live on this machine").
- [ ] The source line is small in a corner, with an actual citation: who, where, year, table or figure. Never "see FACTS.md".
- [ ] Rounded or derived numbers ("six hundred times faster", "halved") are checked against the inputs, and the inputs are on the scene or in `FACTS.md`.
- [ ] Charts come from data files, not from memory; plotted positions match the values; ticks are round (1, 2, 5 steps).

## Placeholders and wording

- [ ] **[auto]** No placeholder text visible: TODO, TBD, lorem, `{{...}}`, `[?`, XXX. If a scene is genuinely unfinished, remove it from the timeline for the talk or mark the whole deck as a draft build, never a badge on each scene.
- [ ] **[auto]** No em dashes in visible text (warning). British spelling throughout.
- [ ] No navigation hints, dates or venue footers on content scenes. That lives on the title scene and in the presenter clock.
- [ ] Wording read through with the my-voice skill: plain, claims sized to evidence, no hype words.

## Delivery

- [ ] `npm run build:export` succeeds; `npm run shoot` reports 0 FAIL, and any warnings left are explained.
- [ ] `NEXT_BASE_PATH` matches the repository name and the deployed site loads its assets (check one image and the fonts on the live URL).
- [ ] Deep links work: `?scene=<id>&step=<n>` opens the right scene and step.
- [ ] The deck has been seen at 1920x1080 or on the actual projector resolution, not only on a laptop.
- [ ] Report: scenes built or changed, shoot summary (captures, FAIL, warnings), unverified items, and the URL.
