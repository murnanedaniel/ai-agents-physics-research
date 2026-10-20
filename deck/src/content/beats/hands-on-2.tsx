"use client";

import { type Beat } from "./_types";

const tiers: [string, string][] = [
 ["Web chat only", "Paste the reviewer personas and the audit prompt into a chat UI."],
 ["Terminal agent", "Run the personas and the audit table with an agent in your terminal."],
 ["Your own project", "Point it at your own abstract, grant draft or paper draft."],
];
function Tiers() { return <div className="card-grid three">{tiers.map(([title, text]) => <div className="course-card" key={title}><h2>{title}</h2><p>{text}</p></div>)}</div>; }

const beat: Beat = {
 title: "Review a draft, then audit its claims.",
 lines: [
  "Goal: run three reviewer personas on a public abstract, a hypothetical grant or your own draft.",
  "Then audit claim by claim (claim, source, verdict: OK/WRONG/OVERCLAIM/UNSUPPORTED) and compare it with the judges. Card: [TODO]",
 ],
 links: [],
 draft: true,
 Visual: Tiers,
};

export default beat;
