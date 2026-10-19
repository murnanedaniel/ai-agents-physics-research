"use client";

import { type Beat, d } from "./_types";

function DetectorGoals() {
  return (
    <div className="card-grid two">
      <div className="course-card">
        <h2>Base goal</h2>
        <p>Recover an arbitrary Lagrangian&apos;s structure and mass spectrum from truth-level detector hits.</p>
      </div>
      <div className="course-card">
        <h2>Stretch</h2>
        <p>A toy telescope version of the same model, validated on real IceCube data.</p>
      </div>
    </div>
  );
}

const beat: Beat = {
  kicker: "Inner loop · 10:55",
  title: "Project 6: a hypothetical detector",
  lines: [
    "Pick an arbitrary Lagrangian, maybe not even Lorentz invariant; generate its truth-level hits.",
    "Ask the agent to recover the Lagrangian's structure and mass spectrum from the hits alone.",
    "The lesson is test-driven development: first reproduce a known toy model's spectrum, then try the unknown one.",
  ],
  links: [d("patterns/reproduce-baseline/", "reproduce the baseline")],
  draft: true,
  Visual: DetectorGoals,
};

export default beat;
