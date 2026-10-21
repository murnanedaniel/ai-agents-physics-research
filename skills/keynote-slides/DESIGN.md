# Design: do and don't

Concrete pairs from the two real decks. **ETH** = `~/PrivateWork/ETH-Agentic-AI-for-Collider-Physics/src/components/scenes/` (the reference). **Course** = `deck/src/` in this repo (the course deck as of 20 October 2026, which the shoot script fails on every capture). Screenshots of both are in `examples/` (`eth-*.png`, `course-*.png`, all 1280x720, final step).

The ETH deck is not perfect either; where it slips, that is called out too.

## 1. One idea, shown, not listed

**Do.** `SpeedJourney.tsx`: one timeline, four clocks shrinking left to right, one italic line per step ("five years. six hundred times faster."). The picture is the argument; the words are captions. `examples/eth-speedJourney.png`.

**Don't.** `content/beats/one-lesson.tsx` (course): a title plus three full sentences, 58 words, nothing to look at. The same template holds every course scene (`components/scenes/BeatScene.tsx`): title, then `lines` as paragraphs, then an optional `Visual` bolted on above them. The visual is an afterthought by construction. `examples/course-one-lesson.png`.

**Rule.** Write the visual concept line before the text. If a scene has no visual concept, it is either a quote scene (one sentence, large) or it should be cut.

## 2. The headline is a claim

**Do.** Use one italic serif line in sentence case, phrased as a thought or claim. Capitalise like a normal sentence, never all lowercase or Title Case. Examples: "How fast we got, how fast we're getting." / "Write the check before you run the experiment." Adapted ETH headlines: "How fast we got, how fast we're getting." (`SpeedJourney.tsx:43`), "The inner loop spans nearly four decades." (`InnerLoopHistory.tsx`), "Treat the hits as a graph." (`GnnSolution.tsx`).

**Don't.** Course titles name a topic: "What is it?" (`content/beats/q2-machinery.tsx`), "Serving" (`serving.tsx`), "Structure of the day" (`agenda.tsx`). Some repeat the title in the body: `p-galactic.tsx` opens its lines with "Project 2: galactic nearest-neighbour clustering", the title verbatim, and states the base goal twice (card and line 2). `examples/course-p-galactic.png`.

## 3. Layout regions that cannot collide

**Do.** The template's `SceneFrame` gives the visual region `flex-1 min-h-0` and clips it, so a tall visual is cut off visibly in the screenshot instead of sliding under the headline.

**Don't.** The course's `.beat-body` (`app/globals.css:97`) is `flex: 1; min-height: 0; justify-content: center` without clipping. When the cards plus lines are taller than the space, centring pushes content up into the title and down into the links: "Six projects, cooked today" sits on top of the cards (`cooking.tsx`), and "Serving" and the trust-tally line collide with the cards and the docs pill (`serving.tsx`). `examples/course-cooking.png`. The shoot script reports this as "crosses a box edge".

## 4. No scaffolding on screen

No kicker or section label above the title. Section names and time live in the presenter view, hidden during the talk. Keep only the one-line title, visual and a small citation in a corner on the slide.

**Don't.** `components/scenes/BeatScene.tsx:5` defaults `draft = true`, so every course scene shows a DRAFT badge, including the title. Visible placeholders: "[TODO: Daniel]" (`p-galactic.tsx:14`, `p-tracking.tsx`), "↗ live: ovens status · TODO" six times (`cooking.tsx` via `components/DocsLink.tsx`), "Card: [TODO]" (`hands-on-2.tsx`, `hands-on-3.tsx`), a trust tally with a dash in place of every count (`serving.tsx`). Every scene also carries a footer "KIT · 22 October 2026 ← / → to navigate · P presenter clock" at 10px.

**Do.** The ETH deck shows nothing but the scene. Navigation help lives in the presenter clock (`P`), which is hidden by default. If a scene is unfinished, the shoot script fails on it until it is finished or removed from the timeline.

## 5. Reveal steps that match the speech

**Do.** `SpeedJourney.tsx:70` reveals one clock per step (`step >= i`), then the conclusion at step 2 and "and forward." at step 3. Four steps, four things said. `InnerLoopHistory.tsx:109` shows two papers, then reveals the 38-year counter at step 1.

**Don't.** In the course `BeatScene`, steps only gate the text `lines`; the visual is fully visible at step 0, so the audience reads the cards while the speaker is still on line one. `q1-possible.tsx` gates its four caveats with `step >= Math.min(i + 1, 3)`, so with 4 steps the third and fourth caveats appear together on the last click and the first click reveals the first caveat while its number has been on screen since step 0.

**Rule.** For each step, write down what appears. If two things appear on one step, either they are one thing or the step count is wrong.

## 6. Typography: one scale, readable at the back

**Do.** Template scale (`templates/keynote-deck/src/app/globals.css`): display number `clamp(72px, 9vw, 176px)`, headline `clamp(30px, 3vw, 58px)`, body `clamp(20px, 1.7vw, 32px)`, labels 13px+, sources 12px+ at 1280x720.

**Don't.** Course body text is full sentences at `clamp(18px, 1.9vw, 36px)` sans, which looks like a document. Chrome text is 10.2px at 1280x720 (draft badge, footer). Tables carry the key content in 16px cells (`p-range.tsx`, `two-axes.tsx`, `judges.tsx`).

**ETH slips.** Mono labels in SVG at `fontSize="11"` (`SpeedJourney.tsx:86,90`) and 9.5 (`StatsFeint.tsx:333`) are fine on a laptop and unreadable on a projector; the 2021 label "Exa.TrkX prototype · CPU baseline" is also clipped at the left edge at 1280x720 (`examples/eth-speedJourney.png`). Keep the look, raise the floor to 12px.

## 7. Charts: drawn in the scene, sourced, one message

**Do.** `StatsFeint.tsx` draws its paper-count dot plot as SVG in the deck's own fonts and colours, highlights the one row that matters (particle physics), and reveals the featured paper with its arXiv id (`StatsFeint.tsx:521`). The template's `ChartScene.tsx` shows the pattern with sources per row, round ticks, a hover tooltip and a screen-reader table.

**Don't.** `quality.tsx` pastes a matplotlib PNG (`public/quality/pushback.png`) with its own white background, title and fonts onto the cream paper, then explains it in three sentences underneath (79 words). The chart's title and the scene headline say different things. `examples/course-quality.png`.

**Rule.** Follow the dataviz skill: form first, one axis, direct labels, text in text colour, small citation in a corner. If a figure has to come from a paper, crop it to the panel that matters, put it on a matching background and cite the figure number.

## 8. Numbers need sources on the scene

**Do.** ETH keeps `FACTS.md` with every number and its citation; scenes carry a small corner source line ("Comp. Phys. Comm. 49, 429 · CDS:185108", `InnerLoopHistory.tsx:17`).

**Don't.** The course q1 cards ("16×", "187k", "188.8M", "28") have no source on screen, only a docs link pill. The shoot script found numbers with no source line on most course scenes.

**ETH slips.** `SpeedJourney.tsx:49` says "see FACTS.md for exact citations", which nobody in the audience can see. Put the short citation on the scene.

## 9. Interaction that explains

**Do.** ETH: hover and click on the NBI research graph (`NbiGraph.tsx`), a live matchmaking scene that lands on a pair of faculty and shows their joint abstract (`Matchmaking.tsx`), cards that open the real tools (`Deliverables2026.tsx`). Template: hover on diagram stages and chart points, links that stop propagation.

**Don't.** The course agenda (`agenda.tsx`) has an "Expand all" accordion on a projected slide: interaction for the presenter's convenience, not the audience's understanding, and the expanded state is never shown.

## 10. Light theme only

Light theme only.

Use warm off-white paper, dark ink, the existing accent blue and a subtle grid. Keep the type scale and italic serif headlines.

## 11. Narrative: signpost, introduce, then go deep

These pairs come from a review of the first full draft of the course deck (21 October 2026). Each scene passed the layout checks; the review still failed it.

**Don't.** An example section ends, and the next scene is titled "An agent acts, observes and tries again." Nobody asked how an agent works yet, so the claim has nothing to attach to. **Do.** A section scene, "How does an agent work?", then the state of a harness (model, context, tools, memory, permissions), then the loop that acts on that state.

**Don't.** "Building was fast; engagement was harder." under a project name the audience has never seen, with a usage curve. It answers a question nobody asked and tells the wrong story. **Do.** One scene introducing the system and what it is for, then screenshots of what it can do, then (if relevant) how quickly it was built.

**Don't.** A plot of scores from a study with no setup on the scene: is it your data or published, what was measured, what question does it answer? **Do.** A short setup line on the scene ("my own agent threads, May to October, each response scored by …"), the question as the title, the answer as the next title.

**Don't.** A project that runs live later in the day introduced with last week's speed-up numbers. **Do.** The physics task, why it matters, the state of the art, and the plan for today; results come when they exist.

**Don't.** A slide on a tool that assumes the audience knows what a skill, a KV cache or hill-climbing is. **Do.** The first mention defines it in one plain sentence and shows one concrete example (for a skill: the folder, the SKILL.md, what triggers it).

## Scene kinds in the template

| kind | file | when |
|---|---|---|
| title | `TitleScene.tsx` | once, light paper |
| big number | `BigNumberScene.tsx` | the problem or the result in one number, then its comparator |
| diagram with stepper | `DiagramScene.tsx` | a mechanism or workflow, one stage per click, hover for detail |
| chart | `ChartScene.tsx` | the evidence, sourced, with one annotation step |
| two-column comparison | `ComparisonScene.tsx` | before and after, old and new; the losing side dims |
| quote | `QuoteScene.tsx` | the takeaway or a close, one sentence, attributed |

New kinds are welcome (event displays, live counters, a phone mock-up, a terminal replay, as in the ETH deck). They still use `SceneFrame`, `Reveal` and a source line.
