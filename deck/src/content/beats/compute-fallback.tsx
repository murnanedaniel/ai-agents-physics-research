"use client";

import { type Beat, d } from "./_types";

function Ready() { return <div className="card-grid three">{[["Data staged", "ready"], ["Smoke test", "passed"], ["Bridge", "up"]].map(([title, chip]) => <div className="course-card" key={title}><h2>{title}</h2><span className="status-chip">{chip}</span></div>)}</div>; }

const beat: Beat = {
  title: "Keep a route around the unavailable cluster.",
  lines: [
    "The main cluster is in maintenance until about two hours before the course; a second national HPC site is the fallback.",
    "Data staged, smoke test passed, bridge up - but no self-healing, and multi-node jobs can wait days; one node starts fast.",
  ],
  links: [d("environments/", "five environments")],
  Visual: Ready,
};

export default beat;
