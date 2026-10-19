"use client";

import { type Beat, d } from "./_types";

function GalacticGoals() {
  return (
    <div className="card-grid two">
      <div className="course-card">
        <h2>Base goal</h2>
        <p>Take visualisations from existing papers; the model does the mechanics, I bring the physics intuition.</p>
      </div>
      <div className="course-card">
        <h2>Stretch</h2>
        <p>[TODO: Daniel]</p>
      </div>
    </div>
  );
}

const beat: Beat = {
  kicker: "Inner loop · 10:30",
  title: "Project 2: galactic nearest-neighbour clustering",
  lines: [
    "Project 2: galactic nearest-neighbour clustering, framed as contributing to theory.",
    "We take visualisations from existing papers; the model does the mechanics, I bring the physics intuition.",
    "Flagged to start before the course, earlier than the other ovens.",
  ],
  links: [d("demos/galactic-neighbours/", "working notes")],
  draft: true,
  Visual: GalacticGoals,
};

export default beat;
