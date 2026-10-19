"use client";

import { type Beat, d } from "./_types";
import { asset } from "@/lib/asset";

function WhatChanged() { return <img className="quality-chart" src={asset("/quality/behaviour_shifts.png")} alt="Dumbbell chart: between May–June and September–October 2026 the researcher\u2019s messages showed more approval gates, style corrections, plain-language requests and provenance questions, and fewer status checks, short challenges and too-good-number challenges." />; }

const beat: Beat = {kicker: "Q2 · preregistered, then tested", title: "What changed in six months?", lines: ["Agents accepted first time: 54% → 69%. Subagent use more than tripled. Commits roughly doubled.", "Errors moved from \u201cdidn\u2019t run it\u201d to \u201cmisunderstood what I wanted\u201d and \u201cwrong style\u201d.", "But only about half of \u201cdone\u201d claims come with evidence, and memory notes didn\u2019t reduce repeat errors. 3 of 7 hypotheses failed."], links: [d("evidence/what-changed/", "scorecard & charts"), d("methodology/", "methodology")], Visual: WhatChanged};

export default beat;
