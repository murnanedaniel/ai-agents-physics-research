"use client";

import { type Beat, d } from "./_types";

const beat: Beat = {
  kicker: "Middle loop · 13:10",
  title: "A super-poster: grok a paper in three minutes",
  lines: [
    "A poster is skimmed in one minute. A super-poster gives about three minutes of depth, and it's interactive.",
    "A Poster/Full toggle, a mechanism stepper, charts you can query, evidence rows that open to the paper's sentences.",
    "It's an agent skill in the course repo, skills/super-poster/. Every number carries its source; the RANGE super-poster opens project 1.",
  ],
  links: [d("patterns/provenance-audit/", "audit the provenance"), d("demos/range/", "RANGE dashboard")],
};

export default beat;
