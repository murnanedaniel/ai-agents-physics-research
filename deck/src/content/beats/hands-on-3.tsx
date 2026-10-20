"use client";

import { type Beat, d } from "./_types";

const tiers: [string, string][] = [
 ["Web chat only", "Describe the rule and ask for a gate or test design."],
 ["Terminal agent", "Write the gate or test as a script the agent must pass."],
 ["Your own project", "Add the check to your real pipeline, hook or CI."],
];
function Tiers() { return <div className="card-grid three">{tiers.map(([title, text]) => <div className="course-card" key={title}><h2>{title}</h2><p>{text}</p></div>)}</div>; }

const beat: Beat = {
 title: "Turn a rule into a check that can fail.",
 lines: [
  "Goal: take one rule from your morning CLAUDE.md and turn it into an approval gate or an automated check.",
  "A check is a test that can fail. Write your approval-gate list. Card: [TODO]",
 ],
 links: [d("patterns/approval-gates/", "approval gates"), d("patterns/hooks-over-memory/", "hooks over memory")],
 draft: true,
 Visual: Tiers,
};

export default beat;
