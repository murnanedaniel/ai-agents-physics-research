---
name: paper-dashboard
description: Turn one scientific paper (arXiv id, DOI/URL, or local PDF) into a self-contained HTML one-minute dashboard. Use for requests such as "make a dashboard", "one-minute summary", or "explainer of this paper".
---

# Paper dashboard

Help a physicist grasp a paper's important ideas in about 60 seconds, including during a live course on AI agents for physics research. Use British spelling and no em dashes in prose.

## Procedure

1. Get the full text from arXiv HTML, the publisher, or PDF text extraction. Resolve the supplied arXiv id, DOI/URL, or local PDF and record its version. Inspect relevant PDF pages if extraction loses tables, equations or captions. If only the abstract is accessible, state **Abstract only: full text unavailable** prominently on the page and in chat. Include only supported content and mark unavailable evidence; never infer results from inaccessible sections.
2. Read for the question, core idea, method, datasets, metrics, baselines, headline numbers, stated limitations, and code and data availability. Record code/data links or explicitly say availability is not stated. Keep an evidence ledger while drafting: exact numeric text, context, units, dataset, baseline, and table/figure/section plus page or anchor.
3. Copy [template.html](template.html) and replace all placeholders. Use concise cards: one sentence for the question; a simple inline SVG of the core idea with boxes and arrows, plus at most three idea bullets; a pipeline of three to five boxes; at most four headline numbers; one line per baseline; at most three limitations; and two or three concrete proposed experiments, each with a figure of merit. Label proposed experiments as ours. Draw no decorative art. Link code and data in the title strip. Remove unused result cards and unsupported bullets. If no numbers are verifiable, say so in the results card.
4. Read and complete [CHECKLIST.md](CHECKLIST.md), fixing issues before showing the page. Every reported number must occur verbatim in the paper with its table, figure or section; explicitly label any computed or rounded exception and give inputs and method. Every number links to its location in the paper. Every claim in "The idea" must appear in the paper. Label limitations absent from the paper as "our reading". Verify links. Inspect the page at 1280x720: the top half must be visible without scrolling, and aim to fit the entire dashboard. Shorten content instead of shrinking text or hiding overflow. Check for external requests, including a grep for http in src/href; only paper and code/data navigation links are allowed.
5. Write the finished dashboard to `./dashboards/<short-name>.html`, or a path supplied by the user. For a local PDF use a working relative file link with `#page=N`; HTML sources should use section/table/figure anchors where available. The dashboard itself must work offline without fetching dependencies; remote evidence links require connectivity when followed. Report the output path, the four headline numbers with their locations (or however many were verified), and anything that could not be verified. Disclose abstract-only access again in chat.
6. Aim for under 10 minutes of agent time. Prefer fewer verified items over coverage. Preserve the template's calm palette, system fonts, inline CSS and SVG, and absence of scripts or external assets.

## Before using live

Pre-run once on the target paper to check access to the full text.
