"use client";

import { type Beat } from "./_types";

function FinetuningGoals() {
  return (
    <div className="card-grid two">
      <div className="course-card">
        <h2>Base goal</h2>
        <p>A first-principles Bayesian derivation of fine-tuning that covers all orders at once.</p>
      </div>
      <div className="course-card">
        <h2>Stretch</h2>
        <p>A composite Higgs model built from strong-force dynamics.</p>
      </div>
    </div>
  );
}

const beat: Beat = {
  title: "Project 3: derive fine-tuning from first principles.",
  lines: [
    "The needle: a first-principles Bayesian derivation of fine-tuning, covering all orders at once.",
    "Needs a serious literature search driven by figures of merit, plus a custom literature dashboard.",
    "If it works, it could be an arXiv paper; composite Higgs is a stretch goal.",
  ],
  links: [],
  draft: true,
  Visual: FinetuningGoals,
};

export default beat;
