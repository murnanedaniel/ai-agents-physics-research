"use client";

import { type Beat, d } from "./_types";

function Panel() { return <table className="course-table"><caption>Calibrated judge panel - held-out AUC 0.93 (95% CI 0.71-1.00, n = 11)</caption><thead><tr><th>Set</th><th>n</th><th>Role</th></tr></thead><tbody>{[["Anchors", "3", "shown with known outcomes"], ["Held-out", "11", "scored blind"], ["Unseen proposal", "1", "placed close to its real ranking range"]].map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table>; }

const beat: Beat = {
  title: "Calibrate the judges before trusting their scores.",
  lines: [
    "Three real past grant proposals were shown to the panel with known outcomes; eleven others were scored blind, held out.",
    "Held-out AUC 0.93, 95% CI 0.71 to 1.00 (n = 11). An unpublished proposal landed close to its real ranking range.",
    "Caveats: small sample, famous proposals may be recognised, the categories barely discriminate, and you can optimise against the judge.",
  ],
  links: [d("patterns/calibrated-judges/", "calibrated judges")],
  Visual: Panel,
};

export default beat;
