"use client";

import { C, Canvas, mono, serif } from "../g1/kit";
import { ChatlasDetailR2 } from "../r2/ChatlasDetailR2";

// ex-chatlas-detail (round 3): steps 0-1 are the round-2 pipeline and ranking
// gains; step 2 redraws the top-k retrieval plot from the chATLAS draft-paper
// talk (ATLAS ML Forum, 3 Sep 2026, slide 7, "Top-k Retrieval Accuracy").
// Values are read off that plot by eye (about +-1 point), TWiki questions from
// the chATLAS benchmark. Approved internal numbers; the image itself is not used.
// Check: k=1 baseline 33 -> fine-tuned + contextual 80.5 is +144%, matching the
// slide's ">140% relative" headline.
const W = 1160, H = 556;
const K = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const SERIES = [
  { name: "tuned embeddings + context", color: C.accent, width: 3.5, dash: undefined, v: [80.5, 86, 88, 90, 91.5, 93, 93, 93.5, 94, 94.5] },
  { name: "context only", color: "#5b9bc4", width: 2.5, dash: undefined, v: [70, 77, 80.5, 83, 85, 86, 87, 88, 89, 89.5] },
  { name: "tuned embeddings only", color: C.warm, width: 2.5, dash: "7 5", v: [59, 70, 74, 76, 77.5, 79, 81, 81.5, 82.5, 83.5] },
  { name: "baseline", color: C.faint, width: 2.5, dash: "7 5", v: [33, 42, 47, 50, 54, 56, 57.5, 59, 60.5, 62] },
];
const P = { l: 90, r: 600, t: 104, b: 470 };
const LO = 30, HI = 100;
const x = (k: number) => P.l + ((k - 1) / 9) * (P.r - P.l);
const y = (v: number) => P.b - ((v - LO) / (HI - LO)) * (P.b - P.t);

function TopK() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img"
      aria-label="Top-k retrieval accuracy on TWiki questions, k from 1 to 10. At k equals 1: baseline 33%, tuned embeddings 59%, context only 70%, tuned embeddings plus context 81%. At k equals 10 the four lines reach 62, 84, 90 and 95%.">
      <text x={20} y={40} fontFamily={serif} fontStyle="italic" fontSize="26" fill={C.ink}>Does giving each chunk its context help?</text>
      <text className="t-label" x={20} y={68} fontFamily={mono} fontSize="15" fill={C.muted}>TWiki questions from the chATLAS benchmark · is the right document in the top k results?</text>
      {[40, 60, 80, 100].map((t) => (
        <g key={t}>
          <line x1={P.l} x2={P.r} y1={y(t)} y2={y(t)} stroke={C.rule} strokeWidth={1} />
          <text className="t-label" x={P.l - 12} y={y(t) + 5} textAnchor="end" fontFamily={mono} fontSize="15" fill={C.muted}>{t}%</text>
        </g>
      ))}
      {K.map((k) => (
        <text key={k} className="t-label" x={x(k)} y={P.b + 26} textAnchor="middle" fontFamily={mono} fontSize="15" fill={C.muted}>{k}</text>
      ))}
      <text className="t-label" x={(P.l + P.r) / 2} y={P.b + 52} textAnchor="middle" fontFamily={mono} fontSize="15" fill={C.muted}>k, documents returned</text>
      {SERIES.map((s) => (
        <g key={s.name}>
          <path d={s.v.map((v, i) => `${i ? "L" : "M"}${x(K[i])},${y(v)}`).join("")} fill="none" stroke={s.color} strokeWidth={s.width} strokeDasharray={s.dash} strokeLinejoin="round" />
          {s.v.map((v, i) => <circle key={i} cx={x(K[i])} cy={y(v)} r={3.5} fill={s.color} />)}
          <text className="t-label" x={P.r + 14} y={y(s.v[9]) + 5} fontFamily={mono} fontSize="15" fill={s.color === C.faint ? C.muted : s.color}>{s.name}</text>
        </g>
      ))}
      <text fontSize="19" fill={C.ink}>
        <tspan x={860} y={330}>Before indexing, a small LLM</tspan>
        <tspan x={860} dy={26}>writes a line of context for</tspan>
        <tspan x={860} dy={26}>each chunk from its document.</tspan>
        <tspan x={860} dy={38}>With tuned embeddings too,</tspan>
        <tspan x={860} dy={26}>top-1 goes from 33% to 81%.</tspan>
      </text>
      <text className="t-label" x={860} y={520} fontFamily={mono} fontSize="13" fill={C.muted}>redrawn from the draft-paper plot</text>
    </svg>
  );
}

export function ChatlasDetailR39({ step }: { step: number }) {
  if (step < 2) return <ChatlasDetailR2 step={step} />;
  return (
    <Canvas>
      <TopK />
    </Canvas>
  );
}
