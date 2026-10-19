"use client";

import { type Beat, d } from "./_types";

function Axes() { return <table className="course-table"><caption>Research loops × implementation</caption><thead><tr><th>Loop ↓ / implementation →</th><th>Models</th><th>Harnesses</th><th>Environments</th></tr></thead><tbody>{[["Inner", "Propose a test", "Execute and verify", "Laptop / HPC"], ["Middle", "Critique an argument", "Track findings", "Home box / cloud"], ["Outer", "Scope a programme", "Dispatch and remember", "One fleet"]].map(row => <tr key={row[0]}>{row.map((cell,i) => i === 0 ? <th key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table>; }

const beat: Beat = {kicker: "Method × implementation", title: "Two axes, one scientific method", lines: ["Choose the scientific loop.", "Then choose the model, harness and environment."], links: [d("environments/", "five environments")], Visual: Axes};

export default beat;
