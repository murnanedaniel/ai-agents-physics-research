# Verification before showing

- [ ] Confirm the paper identity, authors, venue, year and version against the source. Do not invent a venue for a preprint.
- [ ] Obtain and read the full text, including relevant captions and tables. If only the abstract is available, show the access warning prominently and disclose it in chat. Mark unsupported sections unavailable.
- [ ] Check the question, method, datasets, metrics and baseline descriptions against the source. Every claim in "The idea" appears in the paper.
- [ ] For every reported number, compare its exact text, sign, units, uncertainty and experimental context with the paper. Record its table/figure/section and page or anchor. Do not silently compute or round. Label any derived or rounded value, cite its inputs and describe the calculation.
- [ ] Make each reported number a link to its precise source location. Use a verified HTML anchor or PDF `#page=N`, with a visible provenance tag such as "Table 2" or "Fig. 3b". A DOI landing page alone is insufficient for locating a result.
- [ ] Retain at most four headline numbers, each with a big figure, one-line label and provenance. Use fewer when evidence is insufficient. Distinguish results from different datasets or settings.
- [ ] Keep one question sentence, at most three idea bullets, three to five pipeline boxes, one line per baseline and at most three limits. Label limits absent from the paper "our reading".
- [ ] Include two or three feasible experiments, each specifying a concrete intervention/comparison and a figure of merit. Mark these as our proposals, not paper claims.
- [ ] Include code and data links, or state that availability is not stated. Open every paper/code/data link and check anchors and PDF page destinations. Report inaccessible or unverified links.
- [ ] Replace every `{{...}}` placeholder, including SVG labels and accessible descriptions. Remove unused cards and template guidance. Escape inserted HTML text and attributes.
- [ ] Inspect in a browser at 1280x720 and normal zoom. The entire top half is visible without scrolling; aim for the whole page to fit. Check legibility when projected, SVG text, line wrapping, card overlap and clipping. Shorten text rather than hide overflow or reduce type to fit. If visual inspection is unavailable, disclose that limitation.
- [ ] Keep inline CSS and inline SVG only, with a system font stack. No scripts, external fonts, stylesheets, images, embedded remote content, CSS imports or remote CSS URLs. The palette is surface `#fcfcfb`, text `#1f1f1d`, accent `#2a78d6` and grid `#e6e5e0`.
- [ ] Search the output, for example `rg -n -i 'https?://|src\s*=|href\s*=|url\s*\(|@import|<script|<iframe|<link' <output.html>`. Inspect every match, including multiline attributes. Only paper and code/data navigation links may use HTTP(S); the standard SVG namespace URI is not a network request. Check for protocol-relative URLs and event handlers too.
- [ ] Load offline and confirm no network requests are initiated and the complete dashboard renders. Navigation to remote evidence may need connectivity. For local PDFs, verify the relative path from the output directory.
- [ ] Use British spelling and no em dashes in prose. Preserve the required footer with the actual source.
- [ ] Save to `./dashboards/<short-name>.html` or the user's path. Report the path, up to four verified headline numbers and their locations, and all remaining verification gaps. Aim for under 10 minutes; omit uncertain items.
