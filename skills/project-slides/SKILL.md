---
name: project-slides
description: Quick, stripped-back scientific slides for project check-ins, supervisor meetings and group meetings - a figure and at most three bullets per slide. Two outputs - a single self-contained HTML slide deck (arrow-key navigation, works as a Claude artifact) or LaTeX beamer compiled with tectonic. Includes a check-in mode that builds a 3 to 5 slide update (status, key plot, what changed, next steps, blockers) from a project directory and/or a Weights & Biases project. Use for "slides for group meeting", "check-in slides", "make a quick update deck", "beamer slides for my project", "summarise my W&B runs as slides". Not for talks or keynotes (use keynote-slides).
---

# Project slides

Group-meeting slides have one job: tell the room where the project is, show the one plot that matters, and ask for what you need. Plain, fast, honest. Budget about 10 minutes of agent time for a check-in.

Files in this skill:

- `template.html`: the HTML deck (light, system fonts, 1280x720 canvas scaled to the window, ← → navigation, `#3` deep links, `g` overview grid, print to PDF gives one slide per page). Layouts: `title`, `fig-points` (default), `full-fig` (optional bullet row), `two-col`, `table`, `diagram`, `next`. Example slides sit between `<!-- SLIDES:BEGIN -->` and `<!-- SLIDES:END -->`.
- `template.tex`: beamer with a minimal inline theme (no third-party theme), 16:9, `\figslide`, `\textslide`, `\nextslide`, `\src`, `\statusok`, `\statuswarn`, `\statusblocked`. The example document starts at the line `% ==== EXAMPLE DOCUMENT BEGINS ====`.
- `checkin.py`: gathers facts from a local repo and W&B and writes `checkin.json`, `checkin.html` and/or `checkin.tex`.
- `shoot.mjs`: Playwright script that screenshots every HTML slide and the overview and reports overflow and console errors.
- [CHECKLIST.md](CHECKLIST.md): verify before showing.
- `examples/`: rendered outputs (see the end of this file).

House style: light mode only; no kickers or section labels above headlines; headlines are sentence-case, one-sentence claims; British spelling; no em dashes.

## Rules for every slide

1. **Headline is a claim**, one full sentence: "Validation efficiency is flattening near 0.93 after ten epochs." Not "Results". Nothing above the headline: no kicker, no section label, no "STATUS".
2. **One figure, at most three bullets.** HTML: about 12 words per bullet. Beamer: about 8 words per bullet (the bullet column is 0.42 of the text width, so 8 words is two lines). At most 40 words of body text per slide. Sources do not count; neither do labels inside an SVG figure or diagram, but those must be short (a few words per box or label).
3. **Every number has a source line** (`.src` in HTML, `\src{}` in beamer): run id, commit range, file path, paper and table. Keep it to two lines; it wraps and is never cut off, so a long source shows as a long source.
4. **Status carries a shape and a word**, never colour alone: ● ok, ▲ waiting, ■ blocked.
5. **Plots follow the dataviz skill**: one axis, labelled with units, direct label on the last point, light grid, light background, readable at slide size (axis text at least 14px on the 1280x720 canvas, about 9pt in beamer).
6. **Three to five slides for a check-in.** If there is nothing to say on a slide, drop the slide.

## What never goes on a slide

- Secrets: API keys, tokens, passwords, private URLs with credentials, internal hostnames or IP addresses.
- Held-out answers: test-set labels, the answers to a benchmark or exam the audience may later be scored on.
- Hidden truths for blind tests: injected signal parameters, unblinded results, the true values in a mock-data challenge.

If the project has any of these, ask for (or write down) the list of secret terms and values before building the deck. Then run the leak grep on the finished deck before anyone sees it, for example:

```bash
# secrets.txt: one secret term or value per line (never commit this file)
grep -n -F -i -f secrets.txt deck.html slides.tex   # must print nothing
pdftotext slides.pdf - | grep -n -F -i -f secrets.txt
```

Grep the rendered text too (PDF, or the HTML after any figure is inlined): numbers inside a plot image will not show up in a grep, so check figure labels by eye.

## Mode (a): HTML deck or Claude artifact

1. Copy `template.html`. Edit only two things: the `<title>` in the head (it reads `REPLACE ME: deck title`, the one thing outside the `SLIDES` markers that must change) and the slides between the `SLIDES` markers. Keep the CSS and script untouched.
2. Pick a layout per slide via the section's class:
   - `fig-points`: figure left, up to three bullets right. The default.
   - `full-fig`: one wide figure and caption. Add `<ul class="row">` after the figure for a short row of one or two bullets.
   - `two-col`: before and after, or two options. Column headings are sentence case ("Last week").
   - `table`: a `<table class="data">` of up to about five rows and four columns, plus an optional `<ul class="row">` of up to two bullets. Mark numeric cells `class="num"` and the row the headline is about `class="hl"`.
   - `diagram`: a full-width inline SVG for a pipeline or status flow, plus an optional one-line caption.
   - `next`: next steps and blockers.
3. Figures: an inline `<svg>` (best: crisp, styled with the deck's fonts) or an `<img>` with a data URI if the file must be self-contained; a relative path is fine when the HTML sits next to its images.
4. Kickers: the `.kicker` class still exists so an old deck renders, but do not add one.
5. In claude.ai or the Claude app, the whole file can be returned as a single HTML artifact: it has no external assets or libraries, so it runs in the artifact sandbox. Keep it to one file; inline every image.
6. Render it with `shoot.mjs` (see Verify) and read every slide.

### Figures and diagrams on HTML slides

- Light mode only. Draw on the slide surface `#fcfcfb`; no dark panels.
- SVG font sizes are in viewBox units, not pixels. A `font-size="14"` inside a 700-wide viewBox drawn into a 656px column renders at about 13px. Check the rendered size (≥14px) on the screenshot or with `getBoundingClientRect`, not the source value. Easiest: make the viewBox the size the figure is drawn at (`full-fig` and `diagram` are 1136px wide, so a 1136-wide viewBox renders at scale 1).
- Hover tooltips are optional on slides. A native `<title>` on the SVG (and on points, if you like) is enough; the room cannot hover anyway.
- Status colours in diagrams: use `style="fill:var(--ok)"`, `var(--warn)`, `var(--blocked)` so they match the status pills, and always add the word next to the shape.

### Uploading to ScienceDash as a note poster

A deck from this template can be uploaded to ScienceDash as a note poster. The upload checks that the file:

- starts with `<!doctype html>` (or `<html`): nothing before it, not even a comment (the template keeps its comment inside `<head>` for this reason);
- is self-contained HTML with one inline script (the template's) and no external URLs;
- uses only `data:` images (or inline SVG);
- is at most 2 MB.

## Mode (b): beamer with tectonic

1. Copy `template.tex` and keep everything above `% ==== EXAMPLE DOCUMENT BEGINS ====` unchanged. Replace everything after it. Set `\title[short title]{Full title}`, `\subtitle`, `\author` and `\date` after the marker: the footline prints the short title and the date from them, so there is nothing to edit in the preamble.
2. Slides:
   - `\figslide{claim}{image}{caption}{bullet}{bullet}{bullet}{source}`: the standard slide. One to three bullets: leave a bullet argument empty (`{}`) and it is dropped, with no marker. An empty source prints nothing. A missing image becomes a dashed placeholder with the path written in it, so the deck still compiles.
   - `\textslide{claim}{body}`: free body. Put `\src{...}` at the end of the body if the slide has numbers.
   - `\nextslide{claim}{next steps}{blockers}{source}`: "Next steps" and "Blockers" headings in sentence case; source may be empty.
3. Figure sizing for `\figslide`: the figure column is 0.54 of the text width and the image is capped at 0.43 of the text height. Draw matplotlib figures at about 3.3 x 1.65 in with 10.5pt fonts (`plt.rcParams["font.size"] = 10.5`, `figsize=(3.3, 1.65)`, `dpi=300`, `facecolor="#fcfcfb"`): the text then lands at about 9pt on the slide. A figure drawn at 8 x 4.5 in shrinks its 16pt labels to about 6pt.
4. Compile: `tectonic slides.tex`. Tectonic downloads the packages it needs on first use (needs network once; cached afterwards).

Installing tectonic: `conda install -c conda-forge tectonic` (if it lives in its own conda environment it may not be on `PATH`; call it by full path or `conda activate` that environment), `brew install tectonic`, `cargo install tectonic`, or the static binary from github.com/tectonic-typesetting/tectonic/releases. Fonts load by file name (`texgyreheros`, `lmmono10`), because tectonic's bundle does not register family names with fontspec.

## Check-in mode

Two routes, depending on where the evidence lives.

### From a local repository and W&B: `checkin.py`

```bash
python checkin.py --project-dir ~/projects/my-study \
    [--wandb entity/project --metric val_eff] [--since-days 7] \
    [--figure plots/key.png] [--next "Run the larger sample"] [--blocker "Waiting on GPU allocation"] \
    --out checkin/ --format both --author "Your Name"
```

What it gathers (all optional; anything missing is skipped with a warning, exit code stays 0):

- **git**: commits in the window, files changed, branch, uncommitted changes.
- **notes**: lines starting `TODO`, `NEXT`, `BLOCKER`, `BLOCKED`, `DECISION` in top-level `README*`, `NOTES*`, `TODO*`, `DECISIONS*` and `*.md`.
- **figures**: `--figure` paths first; otherwise the most recent images under `plots/`, `figures/`, `figs/`, `results/` or `outputs/`, then anywhere else (skipping `.git`, `node_modules`, `wandb`, `examples`, `shots` and build directories).
- **W&B** (needs `pip install wandb` and a login via `wandb login` or `WANDB_API_KEY`): runs created in the window with state, URL and the summary value of `--metric`; the history of the best run is plotted to `wandb_<metric>.png` (3.3 x 1.65 in, needs matplotlib).

Slides: title; status (key plot plus up to three facts); what changed (commits condensed to three bullets); next steps and blockers; an extra figure slide if there is a second figure. The script writes facts, not conclusions: headlines it cannot know are written as "Claim needed: <topic>". It writes no kickers.

### From session threads, reports or a cluster: `facts.md` first

`checkin.py` only reads a local repository and W&B. When the project lives on a cluster, in agent session threads, or in written reports, do not guess and do not point the script at a half-synced copy. Instead:

1. Write `facts.md` first: one line per fact, each with its source, for example `- Best validation efficiency 0.933 (run d4e5f6, metrics.json, epoch 10)` or `- Blocked on label audit (report of 18 Oct, section 3)`. Separate what changed, what is waiting and what is blocked.
2. Check it: every number copied exactly, every fact traceable, nothing secret (see "What never goes on a slide").
3. Then write the slides from `facts.md` by hand from the template. Every number on a slide must appear in `facts.md`, and its source line comes from there.

### Then the agent's real work starts

Read `checkin.json` (or `facts.md`), look at the plot, and rewrite each "Claim needed" headline as a one-sentence claim the evidence supports ("Pruning low-score edges cut training time without an efficiency loss"). Ask the researcher for anything only they know (why a run was killed, what is blocking). A check-in shown with "Claim needed" headlines is not finished.

## Verify

### HTML: `shoot.mjs`

```bash
# from any directory where `npm i playwright` has been run, or with PLAYWRIGHT_DIR pointing at one
node /path/to/skills/project-slides/shoot.mjs deck.html shots/
```

It opens the deck at 1280x720, screenshots every `#deck .slide` via `#1` to `#n` (`shots/slide-<n>.png`), presses `g` for `shots/overview.png`, and reports per slide any element whose content is wider or taller than its box (`scrollWidth > clientWidth`), any element that sticks out of its slide, a wrong counter, and console errors. It writes `shots/report.json` and exits 1 if anything is wrong.

- Environment: `CHROMIUM_PATH` sets the Chromium executable (for example a Playwright headless shell); `PLAYWRIGHT_DIR` is a directory whose `node_modules` holds Playwright. If your Chromium needs local libraries, set `LD_LIBRARY_PATH` too.
- Writing your own script: select slides with `#deck .slide`. The overview grid holds clones with class `slide-clone`, but a bare `.slide` selector in older decks counts every slide twice.
- Then open every PNG and read it. A clean report is not the same as a good slide.

### Beamer

Compile with no errors and no `Overfull \vbox` warnings (an overfull vbox means something fell off the bottom of the slide), then render the PDF pages to PNG and look at them:

```bash
python -c "import pymupdf; d=pymupdf.open('slides.pdf'); [p.get_pixmap(dpi=144).save(f'p{i+1}.png') for i, p in enumerate(d)]"
```

Then go through CHECKLIST.md.

## Examples

- `examples/html-template.html` and `html-template-*.png`: the HTML template's seven example slides (title, fig-points, two-col, full-fig with a bullet row, table, diagram, next) plus the overview grid.
- `examples/beamer-example.pdf` and `beamer-example-p*.png`: the four-page beamer example (title, figure slide, one-bullet figure slide with the missing-image placeholder, next steps), compiled with tectonic.
- `examples/checkin-course/`: check-in mode run on this course repository (git, command-line next steps and blocker, two `--figure` images), HTML and PDF, with screenshots. Headlines still read "Claim needed": that is the script's output before an agent writes the claims.
- `examples/checkin-wandb-stub/`: check-in mode with a stub `wandb` module standing in for the real API (no W&B account on the test machine), to exercise run selection and the metric plot. The runs and values are invented.
