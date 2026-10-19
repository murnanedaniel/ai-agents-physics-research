"use client";

import { type Beat, d } from "./_types";

function ToBeat() { return <table className="course-table"><caption>MD22 DHA, Table 1 of Caruso et al. 2026</caption><thead><tr><th>Method</th><th>Energy MAE (kcal/mol)</th><th>Force MAE (kcal/mol/Å)</th></tr></thead><tbody>{[["PaiNN baseline", "0.199 ± 0.004", "0.238 ± 0.004"], ["Neural P3M", "0.113 ± 0.007", "0.126 ± 0.007"], ["RANGE", "0.110 ± 0.002", "0.160 ± 0.004"]].map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table>; }

const beat: Beat = {
  kicker: "Inner loop · 10:13",
  title: "Project 1: can a transformer beat RANGE? (from scratch)",
  lines: [
    "RANGE adds attention-based virtual “master” nodes to a GNN backbone, for long-range message passing on molecules.",
    "The data is free, 126 MB (MD22 DHA); the code is public, MIT. Nobody has published this head-to-head.",
    "Prepared in advance: the literature review, the paper super-poster, a data check. Everything else starts now.",
  ],
  links: [d("demos/range/", "RANGE dashboard"), d("patterns/reproduce-baseline/", "reproduce the baseline")],
  Visual: ToBeat,
};

export default beat;
