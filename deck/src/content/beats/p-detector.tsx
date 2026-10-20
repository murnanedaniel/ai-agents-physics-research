"use client";

import { type Beat, d } from "./_types";

function DetectorGoals() {
  return (
    <div className="card-grid two">
      <div className="course-card">
        <h2>Base goal</h2>
        <p>
          A hidden universe, its particles named only by letters. The agents choose the beams and the energy, read
          raw detector hits, and rebuild the particle table and its conservation laws.
        </p>
      </div>
      <div className="course-card">
        <h2>Stretch</h2>
        <p>
          Spins, couplings and finally a Lagrangian that predicts experiments it hasn&apos;t run yet. The hidden
          theory is revealed at the end.
        </p>
      </div>
    </div>
  );
}

const beat: Beat = {
  kicker: "Inner loop · 10:55",
  title: "Project 6: a new universe",
  lines: [
    "A structurally new quantum field theory, hidden from the agents. They get a collider, a detector and a beam-time budget.",
    "A swarm of roles: spectroscopist, bookkeeper, amplitude analyst, theorist, referee. Every run goes in a ledger, and every claim in a lab notebook.",
    "Cooked twice: a pre-cook to see how far it gets, and a fresh run from scratch today on the same universe.",
    "The score is predictions on held-out experiments, not whether the Lagrangian looks the same.",
  ],
  links: [d("patterns/reproduce-baseline/", "reproduce the baseline")],
  draft: true,
  Visual: DetectorGoals,
};

export default beat;
