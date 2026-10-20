"use client";

import { type Beat } from "./_types";

function TrackingGoals() {
  return (
    <div className="card-grid two">
      <div className="course-card">
        <h2>Base goal</h2>
        <p>[TODO: Daniel]</p>
      </div>
      <div className="course-card">
        <h2>Stretch</h2>
        <p>[TODO: Daniel]</p>
      </div>
    </div>
  );
}

const beat: Beat = {
  title: "Project 4: fit tracks together.",
  lines: [
    "Project 4: global track fitting. The source notes say almost nothing beyond the name.",
    "Goal, dataset and method: [TODO: Daniel].",
    "Like every project but RANGE, it gets a pre-cooked run to switch to.",
  ],
  links: [],
  draft: true,
  Visual: TrackingGoals,
};

export default beat;
