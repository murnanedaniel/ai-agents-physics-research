# Course deck rebuild handoff

91 scenes, in storyboard order. All 44 IDs from the NEW-scene table are present.
60 new beats are explicit `lines: ["[build]"]`, `draft: true` stubs; the renamed
`p-newuniverse` preserves its existing content. Existing content remains for rebuilding.

The fixed project numbering is 1 RANGE (molecular energies and forces), 2 galactic
clustering, 3 fine-tuning, 4 global track fitting, 5 The Basic Model (a new universe).
`p-anomaly` is deleted; `p-detector` is renamed to `p-newuniverse`.
`super-poster` immediately follows `p-range` in the inner loop.

## Scheduling decisions

- Session 1: 09:00–10:20; coffee 10:20–10:40.
- Session 2: 10:40–12:00; lunch 12:00–13:15.
- Session 3: 13:15–14:30; coffee 14:30–14:50.
- Session 4: 14:50–16:10, including Outer loop, Outro and reminders.
- Buffer/Q&A/hands-on: 16:10–17:00. `buffer` starts at 16:10; hands-ons 2 and 3 follow.

Storyboard block budgets are preserved, with untimed scenes sharing each block
evenly. Session 4 uses its proposed 50 minutes for the outer loop, 20 for the outro,
and the remaining 10 for reminders. Seconds are rounded at each boundary.
Breaks are timeline gaps, displayed by the agenda. The agenda combines Outer loop
and Outro into S4 and derives its boundaries from SCENES. Mapped existing IDs are
retained even where the storyboard suggests a merge. `basic-model-paper` (§3.6)
and `paper-reviewer` (§3.15) cover keynote bullets omitted from the NEW-scene table.
Contiguous live demo bullets have holding scenes with `demo-` IDs.

## Renderer contract for scene builders

Each beat may define `Scene: ({step}) => ReactElement`. That branch renders only
the shared title, full-canvas Scene, and optional source. It suppresses Visual,
lines and links. Reserve the top 14vh and bottom 7vh inside custom visuals for the
shared title and citation. Otherwise the existing Visual/lines/links layout applies.
Titles are sentence-case, italic serif, on one line. No kicker or draft badge renders.
Section names and scheduled starts appear in PresenterClock (P). Use `source` for
the actual short citation, rendered bottom right. Sources for preserved numbers
still need review during the scene rebuild; no unverified citations were invented.

## Validation

- TypeScript passed: `npx --no-install tsc --noEmit --tsBuildInfoFile /tmp/course-rebuild.tsbuildinfo`.
- Timeline validation passed: unique IDs, all 44 NEW-table IDs, beat registrations,
  positive durations, 1–4 steps, light themes, exact session/break boundaries and
  RANGE/poster adjacency.
- `node --check scripts/shoot.mjs` and `git diff --check` passed.
- `npm run shoot -- --scenes nonexistent-scene` rejects the unknown ID with exit 2.
- Full export build is left to the external orchestrator because Google Fonts needs
  network access. No fresh course screenshots were generated. Runtime checker
  verification was blocked: the sandbox denies both localhost listening (EPERM)
  and Chromium startup. Existing `out/` is not evidence for this revised deck.

After exporting, run `npm run shoot -- --scenes title,agenda,p-range` (or omit
`--scenes` for all scenes). The checker serves `out/` on 127.0.0.1 and captures
all steps at 1280×720. It writes PNGs, aggregate reports and per-scene Markdown/JSON
reports in `shots/`, with word count, overflow, minimum font size, missing sources
and placeholders on every step. It also retains the template's overlap, contrast,
em-dash, page-error and unchanged-step checks. `[build]` stubs intentionally fail.
`CHROMIUM_PATH` and `LD_LIBRARY_PATH` override the requested homebox defaults;
`NEXT_BASE_PATH` supports an export built for a project subdirectory.

## Final ordered scene list

| ID | Start | Title |
|---|---|---|
| `title` | 09:00:00 | AI agents change how we do physics. |
| `agenda` | 09:02:30 | A day from experiments to programmes. |
| `q1-possible` | 09:05:00 | Agentic science already takes many forms. |
| `ex-trackfit` | 09:06:52 | The agent does not get to believe its own win. |
| `ex-hep4m` | 09:08:45 | One model connects many particle modalities. |
| `ex-pandora` | 09:10:38 | Profile, change, check, then keep or discard. |
| `ex-chatlas` | 09:12:30 | Automate a task, then reuse it. |
| `ex-erc` | 09:14:22 | Writing together needs a pull-first workflow. |
| `ex-hamlet` | 09:16:15 | Building was fast; engagement was harder. |
| `ex-sciencedash` | 09:18:08 | A search box outlived the dashboard. |
| `q2-machinery` | 09:20:00 | An agent acts, observes and tries again. |
| `agent-cell` | 09:22:08 | An agent is a cell with a porous membrane. |
| `llm-inference` | 09:24:15 | Every new token carries a memory cost. |
| `llm-scaling` | 09:26:22 | Scale training, then scale time to think. |
| `llm-jagged` | 09:28:30 | Intelligence has a ragged outline. |
| `llm-training` | 09:30:38 | Training moves towards checkable outcomes. |
| `bench-timetravel` | 09:32:45 | Watch yesterday’s benchmarks fill up. |
| `bench-unsolved` | 09:34:52 | Interactive work leaves harder tests open. |
| `quality` | 09:37:00 | Working with agents changed over six months. |
| `what-changed` | 09:38:40 | Practice improved, but errors remained. |
| `q2-limits` | 09:40:20 | Confidence is not evidence. |
| `limits-patterns` | 09:42:00 | Failure has patterns we can recognise. |
| `limits-style` | 09:43:40 | Generated prose leaves a vocabulary fingerprint. |
| `limits-architecture` | 09:45:20 | Context grows while the weights stay frozen. |
| `q3-professional` | 09:47:00 | Professional science needs more than a model. |
| `two-axes` | 09:49:00 | Choose the loop, then choose the tools. |
| `stack-layers` | 09:51:00 | Models need harnesses, environments and practices. |
| `compute-fallback` | 09:53:00 | Keep a route around the unavailable cluster. |
| `three-loops` | 09:55:00 | Experiments, papers and programmes form nested loops. |
| `hands-on-1` | 10:00:00 | Interview your research setup. |
| `one-lesson` | 10:05:00 | Be ambitious, then automate yourself. |
| `cooking` | 10:10:00 | Five projects start cooking today. |
| `inner-intro` | 10:40:00 | One experiment closes the inner loop. |
| `p-galactic` | 10:43:20 | Project 2: find structure in galactic neighbours. |
| `demo-galactic-chat` | 10:46:40 | Demo: start galactic clustering from a chat. |
| `rc-magic` | 10:50:00 | A phone can reach a session on the cluster. |
| `demo-galactic-repo` | 10:53:20 | Demo: connect the cluster and register the project. |
| `plan-mode` | 10:56:40 | Put the opinion beside the changelog. |
| `p-finetuning` | 11:00:00 | Project 3: derive fine-tuning from first principles. |
| `pychm-story` | 11:02:30 | Old theory code meets independent validation. |
| `claude-science` | 11:05:00 | Test the workbench against a real project. |
| `demo-finetuning` | 11:07:30 | Demo: explore fine-tuning in Claude Science. |
| `p-range` | 11:10:00 | Project 1: can transformers beat RANGE? |
| `super-poster` | 11:14:00 | A super-poster makes a paper explorable. |
| `demo-range-baseline` | 11:18:00 | Demo: register RANGE and reproduce its baseline. |
| `wandb-trail` | 11:22:00 | Every run should leave a visible trail. |
| `demo-training-logs` | 11:26:00 | Demo: inspect the training logs. |
| `slides-project` | 11:30:00 | Choose slides that suit the check-in. |
| `demo-check-ins` | 11:35:00 | Demo: turn run results into slides and a report. |
| `tdd` | 11:40:00 | Write the checks, then run the simplest experiment. |
| `hillclimb-autoresearch` | 11:45:00 | Freeze the metric, change one file, keep or reset. |
| `hillclimb-anthropic` | 11:50:00 | A held-out check keeps the climb honest. |
| `demo-hillclimbing` | 11:55:00 | Demo: start the research hill-climbing loops. |
| `demo-progress` | 13:15:00 | Demo: check what the projects cooked over lunch. |
| `middle-intro` | 13:20:00 | Experiments become an argument through review. |
| `p-newuniverse` | 13:25:00 | Project 5: discover the laws of a new universe. |
| `demo-newuniverse` | 13:30:00 | Demo: set up the hidden universe and its readout. |
| `basic-model-ladder` | 13:35:00 | Each discovery must pass the next test. |
| `basic-model-paper` | 13:40:00 | Let validated milestones fill the paper. |
| `p-tracking` | 13:45:00 | Project 4: fit tracks together. |
| `demo-tracking-review` | 13:52:30 | Demo: inspect and review the pre-cooked tracking paper. |
| `browser-automate` | 14:00:00 | Give forms, files and decisions the right tools. |
| `demo-eurohpc` | 14:03:40 | Demo: prepare a EuroHPC application. |
| `judges` | 14:07:20 | Calibrate the judges before trusting their scores. |
| `demo-arxiv` | 14:11:00 | Demo: take the tracking paper to the submission edge. |
| `paper-reviewer` | 14:14:40 | A held-out reviewer tests the revision. |
| `demo-science-credits` | 14:18:20 | Demo: find research credits and prepare an application. |
| `two-slide-skills` | 14:22:00 | Keynotes and check-ins need different slides. |
| `add-a-slide` | 14:24:40 | A scene travels from the repo to the web. |
| `teaching` | 14:27:20 | Use agents to prepare for learning together. |
| `outer-intro` | 14:50:00 | A research programme needs its own loop. |
| `research-memory` | 14:54:00 | The dashboard became a searchable memory. |
| `ideation` | 14:58:00 | A promising idea still has to survive execution. |
| `collab` | 15:05:00 | Find connections that have not become collaborations. |
| `website` | 15:12:00 | A research site begins with a repo. |
| `sessions-talk` | 15:20:00 | Any session can message any other. |
| `landscape` | 15:24:00 | Choose an ecosystem around the work. |
| `big-science` | 15:28:00 | Automating analysis leaves choices about measurement. |
| `bench-ours` | 15:32:00 | Test the work with an oracle that can fail. |
| `collider2031` | 15:36:00 | Imagine a defence in an automated laboratory. |
| `serving` | 15:40:00 | Open the ovens and inspect the evidence. |
| `thanks` | 15:50:00 | Which question do you want back first? |
| `flights-guardrails` | 16:00:00 | Set the boundaries before booking travel. |
| `demo-flights` | 16:01:40 | Demo: book travel within the agreed boundaries. |
| `security-trifecta` | 16:03:20 | Risk grows where three capabilities meet. |
| `security-controls` | 16:05:00 | Permissions and sandboxes set different boundaries. |
| `security-identity-money` | 16:06:40 | Match each kind of harm to a control. |
| `excalidraw` | 16:08:20 | Sketch the idea before building it. |
| `buffer` | 16:10:00 | Make room for questions and hands-on work. |
| `hands-on-2` | 16:26:40 | Review a draft, then audit its claims. |
| `hands-on-3` | 16:43:20 | Turn a rule into a check that can fail. |

## Files changed by this task

Paths below are relative to the repository root. Pre-existing edits to
`deck/src/app/embed/page.tsx`, `deck/src/app/layout.tsx`, and
`deck/tsconfig.tsbuildinfo` were left untouched.

- `deck/package.json`
- `deck/scripts/REBUILD.md`
- `deck/scripts/shoot.mjs`
- `deck/src/app/globals.css`
- `deck/src/components/PresenterClock.tsx`
- `deck/src/components/Stage.tsx`
- `deck/src/components/scenes/BeatScene.tsx`
- `deck/src/components/scenes/ClaudeFinalSlide.tsx`
- `deck/src/components/scenes/CourseScenes.tsx`
- `deck/src/content/beats/_types.ts`
- `deck/src/content/beats/add-a-slide.tsx`
- `deck/src/content/beats/agenda.tsx`
- `deck/src/content/beats/agent-cell.tsx`
- `deck/src/content/beats/basic-model-ladder.tsx`
- `deck/src/content/beats/basic-model-paper.tsx`
- `deck/src/content/beats/bench-ours.tsx`
- `deck/src/content/beats/bench-timetravel.tsx`
- `deck/src/content/beats/bench-unsolved.tsx`
- `deck/src/content/beats/big-science.tsx`
- `deck/src/content/beats/browser-automate.tsx`
- `deck/src/content/beats/buffer.tsx`
- `deck/src/content/beats/claude-science.tsx`
- `deck/src/content/beats/collab.tsx`
- `deck/src/content/beats/collider2031.tsx`
- `deck/src/content/beats/compute-fallback.tsx`
- `deck/src/content/beats/cooking.tsx`
- `deck/src/content/beats/demo-arxiv.tsx`
- `deck/src/content/beats/demo-check-ins.tsx`
- `deck/src/content/beats/demo-eurohpc.tsx`
- `deck/src/content/beats/demo-finetuning.tsx`
- `deck/src/content/beats/demo-flights.tsx`
- `deck/src/content/beats/demo-galactic-chat.tsx`
- `deck/src/content/beats/demo-galactic-repo.tsx`
- `deck/src/content/beats/demo-hillclimbing.tsx`
- `deck/src/content/beats/demo-newuniverse.tsx`
- `deck/src/content/beats/demo-progress.tsx`
- `deck/src/content/beats/demo-range-baseline.tsx`
- `deck/src/content/beats/demo-science-credits.tsx`
- `deck/src/content/beats/demo-tracking-review.tsx`
- `deck/src/content/beats/demo-training-logs.tsx`
- `deck/src/content/beats/ex-chatlas.tsx`
- `deck/src/content/beats/ex-erc.tsx`
- `deck/src/content/beats/ex-hamlet.tsx`
- `deck/src/content/beats/ex-hep4m.tsx`
- `deck/src/content/beats/ex-pandora.tsx`
- `deck/src/content/beats/ex-sciencedash.tsx`
- `deck/src/content/beats/ex-trackfit.tsx`
- `deck/src/content/beats/excalidraw.tsx`
- `deck/src/content/beats/flights-guardrails.tsx`
- `deck/src/content/beats/hands-on-1.tsx`
- `deck/src/content/beats/hands-on-2.tsx`
- `deck/src/content/beats/hands-on-3.tsx`
- `deck/src/content/beats/hillclimb-anthropic.tsx`
- `deck/src/content/beats/hillclimb-autoresearch.tsx`
- `deck/src/content/beats/ideation.tsx`
- `deck/src/content/beats/index.ts`
- `deck/src/content/beats/inner-intro.tsx`
- `deck/src/content/beats/judges.tsx`
- `deck/src/content/beats/landscape.tsx`
- `deck/src/content/beats/limits-architecture.tsx`
- `deck/src/content/beats/limits-patterns.tsx`
- `deck/src/content/beats/limits-style.tsx`
- `deck/src/content/beats/llm-inference.tsx`
- `deck/src/content/beats/llm-jagged.tsx`
- `deck/src/content/beats/llm-scaling.tsx`
- `deck/src/content/beats/llm-training.tsx`
- `deck/src/content/beats/middle-intro.tsx`
- `deck/src/content/beats/one-lesson.tsx`
- `deck/src/content/beats/outer-intro.tsx`
- `deck/src/content/beats/p-anomaly.tsx` (deleted)
- `deck/src/content/beats/p-detector.tsx` (deleted)
- `deck/src/content/beats/p-finetuning.tsx`
- `deck/src/content/beats/p-galactic.tsx`
- `deck/src/content/beats/p-newuniverse.tsx`
- `deck/src/content/beats/p-range.tsx`
- `deck/src/content/beats/p-tracking.tsx`
- `deck/src/content/beats/paper-reviewer.tsx`
- `deck/src/content/beats/plan-mode.tsx`
- `deck/src/content/beats/pychm-story.tsx`
- `deck/src/content/beats/q1-possible.tsx`
- `deck/src/content/beats/q2-limits.tsx`
- `deck/src/content/beats/q2-machinery.tsx`
- `deck/src/content/beats/q3-professional.tsx`
- `deck/src/content/beats/quality.tsx`
- `deck/src/content/beats/rc-magic.tsx`
- `deck/src/content/beats/research-memory.tsx`
- `deck/src/content/beats/security-controls.tsx`
- `deck/src/content/beats/security-identity-money.tsx`
- `deck/src/content/beats/security-trifecta.tsx`
- `deck/src/content/beats/serving.tsx`
- `deck/src/content/beats/sessions-talk.tsx`
- `deck/src/content/beats/slides-project.tsx`
- `deck/src/content/beats/stack-layers.tsx`
- `deck/src/content/beats/super-poster.tsx`
- `deck/src/content/beats/tdd.tsx`
- `deck/src/content/beats/teaching.tsx`
- `deck/src/content/beats/three-loops.tsx`
- `deck/src/content/beats/title.tsx`
- `deck/src/content/beats/two-axes.tsx`
- `deck/src/content/beats/two-slide-skills.tsx`
- `deck/src/content/beats/wandb-trail.tsx`
- `deck/src/content/beats/website.tsx`
- `deck/src/content/beats/what-changed.tsx`
- `deck/src/lib/sceneRegistry.tsx`
- `deck/src/lib/timeline.ts`
