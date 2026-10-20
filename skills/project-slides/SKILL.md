---
name: project-slides
description: Quick, stripped-back scientific slides for project check-ins, supervisor meetings and group meetings - a figure and at most three bullets per slide. Two outputs - a single self-contained HTML slide deck (arrow-key navigation, works as a Claude artifact) or LaTeX beamer compiled with tectonic. Includes a check-in mode that builds a 3 to 5 slide update (status, key plot, what changed, next steps, blockers) from a project directory and/or a Weights & Biases project. Use for "slides for group meeting", "check-in slides", "make a quick update deck", "beamer slides for my project", "summarise my W&B runs as slides". Not for talks or keynotes (use keynote-slides).
---

# Project slides

Group-meeting slides have one job: tell the room where the project is, show the one plot that matters, and ask for what you need. Plain, fast, honest. Budget about 10 minutes of agent time for a check-in.

Files in this skill:

- `template.html`: the HTML deck (light, system fonts, 1280x720 canvas scaled to the window, ← → navigation, `#3` deep links, `g` overview grid, print to PDF gives one slide per page). Layouts: `title`, `fig-points` (default), `full-fig`, `two-col`, `next`. Example slides sit between `<!-- SLIDES:BEGIN -->` and `<!-- SLIDES:END -->`.
- `template.tex`: beamer with a minimal inline theme (no third-party theme), 16:9, `\figslide`, `\textslide`, `\nextslide`, `\src`, `\statusok`, `\statuswarn`, `\statusblocked`. The example document starts at the line `% ==== EXAMPLE DOCUMENT BEGINS ====`.
- `checkin.py`: gathers facts and writes `checkin.json`, `checkin.html` and/or `checkin.tex`.
- [CHECKLIST.md](CHECKLIST.md): verify before showing.
- `examples/`: rendered outputs (see the end of this file).

Use British spelling and no em dashes on slides.

## Rules for every slide

1. **Headline is a claim**, one full sentence: "Validation efficiency is flattening near 0.93 after ten epochs." Not "Results".
2. **One figure, at most three bullets**, each at most 12 words; at most 40 words of body text per slide, sources excluded.
3. **Every number has a source line** (`.src` in HTML, `\src{}` in beamer): run id, commit range, file path, paper and table.
4. **Status carries a shape and a word**, never colour alone: ● ok, ▲ waiting, ■ blocked.
5. **Plots follow the dataviz skill**: one axis, labelled with units, direct label on the last point, light grid, readable at slide size (axis text at least 14px on the 1280x720 canvas).
6. **Three to five slides for a check-in.** If there is nothing to say on a slide, drop the slide.

## Mode (a): HTML deck or Claude artifact

1. Copy `template.html`. Replace the slides between the `SLIDES` markers; keep the CSS and script untouched.
2. Pick a layout per slide via the section's class. Figures: an inline `<svg>` (best: crisp, styled with the deck's fonts) or an `<img>` with a data URI if the file must be self-contained; a relative path is fine when the HTML sits next to its images.
3. In claude.ai or the Claude app, the whole file can be returned as a single HTML artifact: it has no external assets or libraries, so it runs in the artifact sandbox. Keep it to one file; inline every image.
4. Render it (see Verify) and read every slide.

## Mode (b): beamer with tectonic

1. Copy `template.tex`, keep the preamble, replace everything after `% ==== EXAMPLE DOCUMENT BEGINS ====`.
2. Use `\figslide{kicker}{claim}{image}{caption}{bullet}{bullet}{bullet}{source}` for the standard slide; a missing image becomes a dashed placeholder with the path written in it, so the deck still compiles.
3. Compile: `tectonic slides.tex`. Tectonic downloads the packages it needs on first use (needs network once; cached afterwards).

Tectonic on homebox: it is installed in the `tex` conda environment but not on `PATH`. Use `~/miniconda3/envs/tex/bin/tectonic`, or `conda activate tex`. Elsewhere: `conda install -c conda-forge tectonic`, `brew install tectonic`, `cargo install tectonic`, or the static binary from github.com/tectonic-typesetting/tectonic/releases. Fonts load by file name (`texgyreheros`, `lmmono10`), because tectonic's bundle does not register family names with fontspec.

## Check-in mode

```bash
python checkin.py --project-dir ~/projects/my-study \
    [--wandb entity/project --metric val_eff] [--since-days 7] \
    [--figure plots/key.png] [--next "Run the larger sample"] [--blocker "Waiting on GPU allocation"] \
    --out checkin/ --format both --author "Daniel Murnane"
```

What it gathers (all optional; anything missing is skipped with a warning, exit code stays 0):

- **git**: commits in the window, files changed, branch, uncommitted changes.
- **notes**: lines starting `TODO`, `NEXT`, `BLOCKER`, `BLOCKED`, `DECISION` in top-level `README*`, `NOTES*`, `TODO*`, `DECISIONS*` and `*.md`.
- **figures**: `--figure` paths first; otherwise the most recent images under `plots/`, `figures/`, `figs/`, `results/` or `outputs/`, then anywhere else (skipping `.git`, `node_modules`, `wandb`, `examples`, `shots` and build directories).
- **W&B** (needs `pip install wandb` and a login via `wandb login` or `WANDB_API_KEY`): runs created in the window with state, URL and the summary value of `--metric`; the history of the best run is plotted to `wandb_<metric>.png` (needs matplotlib).

Slides: title; status (key plot plus up to three facts); what changed (commits condensed to three bullets); next steps and blockers; an extra figure slide if there is a second figure. The script writes facts, not conclusions: headlines it cannot know are written as "Claim needed: <topic>" with a `DRAFT CLAIM` kicker.

**Then the agent's real work starts.** Read `checkin.json`, look at the plot, and rewrite each "Claim needed" headline as a one-sentence claim the evidence supports ("Pruning low-score edges cut training time without an efficiency loss"). Ask the researcher for anything only they know (why a run was killed, what is blocking). Remove `DRAFT CLAIM` from kickers once the claim is written. A check-in shown with "Claim needed" headlines is not finished.

## Verify

- HTML: open in a headless browser at 1280x720, screenshot every slide (`#1` to `#n`), press `g` for the overview, check the counter and that no element overflows its slide. On homebox, set `LD_LIBRARY_PATH` and the Chromium path as in `templates/keynote-deck/README.md`, or use `shot <file.html> out.png 1280,720`.
- Beamer: compile with no errors and no `Overfull \vbox` warnings (an overfull vbox means something fell off the bottom of the slide), then render the PDF pages to PNG (`python -c "import pymupdf; ..."`) and look at them.
- Then go through CHECKLIST.md.

## Examples

- `examples/html-template.html` and `html-template-*.png`: the HTML template's five example slides plus the overview grid.
- `examples/beamer-example.pdf` and `beamer-example-p*.png`: the three-slide beamer example, compiled with tectonic 0.17.
- `examples/checkin-course/`: check-in mode run on this course repository (git and notes only), HTML and PDF, with screenshots. Headlines still read "Claim needed": that is the script's output before an agent writes the claims.
- `examples/checkin-wandb-stub/`: check-in mode with a stub `wandb` module standing in for the real API (no W&B account on the test machine), to exercise run selection and the metric plot. The runs and values are invented.
