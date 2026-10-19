"use client";

import { type Beat, d } from "./_types";

const tiers: [string, string][] = [
 ["Web chat only", "Paste the printed prompt into claude.ai or ChatGPT and answer the interview."],
 ["Terminal agent", "Copy the skill into your skills folder, then say “interview me about my research setup.”"],
 ["Your own project", "Run the interview inside your real repository, with your own tools and limits."],
];
function Tiers() { return <div className="card-grid three">{tiers.map(([title, text]) => <div className="course-card" key={title}><h2>{title}</h2><p>{text}</p></div>)}</div>; }

const beat: Beat = {
 kicker: "Inner loop · 11:30",
 title: "Hands-on 1: interview your research setup",
 lines: [
  "Goal: interview your research setup, then draft a CLAUDE.md, one or two starter skills and DECISIONS.md.",
  "Card: exercises/setup-interview. Stretch goal: the research-memory kit makes this state automatic.",
 ],
 links: [d("exercises/setup-interview/", "setup interview"), d("kit/research-memory/", "research memory kit")],
 Visual: Tiers,
};

export default beat;
