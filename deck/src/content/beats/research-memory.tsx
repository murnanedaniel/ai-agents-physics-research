"use client";

import { type Beat, d } from "./_types";

function Fate() { return <table className="course-table"><caption>ScienceDash usage, by feature</caption><thead><tr><th>Feature</th><th>Upkeep</th><th>Fate</th></tr></thead><tbody>{[["Check-ins", "manual", "about 10 ever, none after May"], ["Paper pipeline, advisor chat", "manual", "never adopted"], ["Transcript ingest and search", "automatic", "still running and used"], ["Session-start brief", "automatic", "still running"]].map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table>; }

const beat: Beat = {
  kicker: "Outer loop · 14:50",
  title: "Research memory without a dashboard",
  lines: [
    "ScienceDash usage data: the parts needing manual upkeep went unused - check-ins, papers, a chat-with-project feature, all stalled.",
    "The automatic parts kept running: transcript search across machines and a project brief at session start.",
    "So the kit keeps only that: local search, a session-start brief, one-line decisions - no server, no dashboard to maintain.",
  ],
  links: [d("kit/research-memory/", "research memory kit")],
  Visual: Fate,
};

export default beat;
