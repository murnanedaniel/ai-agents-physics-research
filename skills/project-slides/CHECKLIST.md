# Verification before showing

## Content

- [ ] Three to five slides for a check-in (title, status, what changed, next steps and blockers, optional extra figure). Any slide with nothing to say is gone.
- [ ] Every headline is a one-sentence, sentence-case claim the evidence on that slide supports. No "Claim needed", no kickers or section labels above it, no topic labels.
- [ ] Each slide has at most one figure and at most three bullets: about 12 words each in HTML, about 8 words each in beamer (two lines in the 0.42 column). At most 40 words of body text per slide; sources and SVG or diagram labels excluded, but those labels are a few words each.
- [ ] Every number on a slide has a source line: W&B run id, commit range, file path, or paper and table. Numbers match `checkin.json` or the source exactly, with units.
- [ ] Negative or flat results are stated plainly, not buried. If nothing changed, the status slide says so.
- [ ] Blockers name what is needed and from whom. Status markers use a shape and a word (● ok, ▲ waiting, ■ blocked), never colour alone.
- [ ] No placeholder text left: TODO, TBD, `{{...}}`, "REPLACE ME" in the HTML `<title>`, dashed placeholder boxes, "EXAMPLE" in titles.
- [ ] Facts from threads, reports or a cluster went through `facts.md` (each fact with its source) before any slide was written.
- [ ] British spelling, no em dashes, plain wording (my-voice skill). Light mode only.

## Secrecy

- [ ] Nothing on the slides that must stay private: secrets (keys, tokens, passwords, hostnames, IP addresses), held-out answers, hidden truths for blind tests.
- [ ] Leak grep run against the list of secret terms and values (`grep -n -F -i -f secrets.txt` on the HTML or TeX, and on `pdftotext` output), with no hits. Figure images checked by eye.

## Figures

- [ ] The key plot is the one that answers "where is the project?", not the most recent file. Chosen with `--figure` if the automatic pick was wrong.
- [ ] Plots follow the dataviz skill: one axis, labelled axes with units, direct label on the latest value, light grid, no chart-junk title duplicating the headline.
- [ ] Axis text is readable at slide size: at least 14px rendered on the 1280x720 canvas (SVG `font-size` is in viewBox units, so measure the rendered size), about 9pt in beamer (matplotlib at 3.3 x 1.65 in with 10.5pt fonts).
- [ ] Light background on every figure; hover tooltips not needed (a native SVG `<title>` is enough).
- [ ] Caption says what is plotted, not what it means; the meaning is in the headline.

## HTML deck

- [ ] `<title>` set to the deck's title (the one edit outside the SLIDES markers).
- [ ] `node shoot.mjs deck.html shots/` reports 0 problems and 0 console errors, and every `shots/slide-<n>.png` plus `overview.png` has been opened and read. The counter shows the right total.
- [ ] Source lines are at most two lines and fully visible (they wrap; nothing is cut off with an ellipsis).
- [ ] If it goes to ScienceDash as a note poster: file starts with `<!doctype html>`, one inline script, `data:` images only, at most 2 MB.
- [ ] Self-contained when it must travel (artifact, email): no external URLs in `src`, `href` for assets, `url(` or `@import`; images inlined as SVG or data URIs.
- [ ] Print to PDF gives one slide per page if a handout is needed.

## Beamer

- [ ] `tectonic` compiles with no errors and no `Overfull \vbox` warnings.
- [ ] PDF pages rendered to PNG and read: nothing cut off at the bottom, no hyphenation inside short labels, figures not stretched.
- [ ] Source lines present at the foot of slides with numbers.
- [ ] Footline shows the short title and date from `\title[short]{...}` and `\date{...}`; the preamble is unchanged.

## Check-in mode

- [ ] `checkin.py` warnings read and either fixed or reported (for example "W&B skipped: the wandb package is not installed").
- [ ] Facts in `checkin.json` sanity-checked: the commit window, the best run and its metric direction (higher or lower is better), and that the plotted run is the one named on the slide.
- [ ] Next steps and blockers confirmed with the researcher, not only scraped from notes.
- [ ] Report: output paths, slide count, what was verified, what was not (for example W&B not reachable), and any claims the researcher should check.
