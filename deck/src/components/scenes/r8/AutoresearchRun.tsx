"use client";

import { useState } from "react";
import { Arrow, C, MONO, SANS, Show, Stage, stop } from "./kit";

// hillclimb-autoresearch. Karpathy's autoresearch (github.com/karpathy/
// autoresearch, program.md and README, read 20 Oct 2026): three files, one
// frozen, one editable; a fixed 5-minute run; keep the commit if val_bpb is
// lower, otherwise git reset. Step 1: his two-day result (x.com/karpathy/
// status/2031135152349524125, 9 Mar 2026): about 700 changes, about 20 kept,
// time to GPT-2 from 2.02 h to 1.80 h; "not novel, ground-breaking research
// (yet)".
const FILES = [
  { name: "program.md", role: "the human's instructions", lock: false, edit: false, detail: "ends: NEVER STOP" },
  { name: "prepare.py", role: "data and score, frozen", lock: true, edit: false, detail: "the agent may not touch it" },
  { name: "train.py", role: "the one file it edits", lock: false, edit: true, detail: "model, optimiser, batch size" },
];
const CX = 880, CY = 190, RX = 220, RY = 140;
const NODES = [
  { a: -90, lines: ["edit", "train.py"] },
  { a: 0, lines: ["train", "5 minutes"] },
  { a: 90, lines: ["score", "lower?"] },
  { a: 180, lines: ["keep, or", "git reset"] },
];

export function AutoresearchRun({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Stage label="Three files, one frozen and one editable, and a loop: edit, train five minutes, compare the score, keep or reset. Then the result of two days: about 700 changes, about 20 kept, time to GPT-2 from 2.02 to 1.80 hours">
      <svg viewBox="0 0 1200 470" width="100%" style={{ width: "100%", height: "100%" }} onClick={stop}>
        <Arrow id="ar2-arrow" />
        {FILES.map((f, i) => {
          const y = 20 + i * 112;
          return (
            <g key={f.name} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
              <rect x={10} y={y} width={420} height={92} rx={10} fill={f.edit ? C.accentSoft : C.card} stroke={f.edit ? C.accent : C.faint} strokeWidth={f.edit ? 2.5 : 1.5} />
              <text x={32} y={y + 38} fontFamily={MONO} fontSize={24} fill={f.edit ? C.accent : C.ink} fontWeight={600}>{f.name}</text>
              <text x={32} y={y + 72} fontFamily={SANS} fontSize={21} fill={C.ink}>{hover === i ? f.detail : f.role}</text>
              {f.lock && (
                <g transform={`translate(390 ${y + 20})`}>
                  <rect x={0} y={12} width={24} height={20} rx={3} fill={C.warm} />
                  <path d="M 5 12 V 6 a 7 7 0 0 1 14 0 V 12" fill="none" stroke={C.warm} strokeWidth={3} />
                </g>
              )}
            </g>
          );
        })}
        <text className="t-label" x={10} y={372} fontFamily={MONO} fontSize={16} fill={C.muted}>to run: one GPU, then tell the agent</text>
        <text className="t-label" x={10} y={394} fontFamily={MONO} fontSize={16} fill={C.muted}>“have a look at program.md”</text>

        <path d={`M 436 ${20 + 2 * 112 + 46} C 540 ${20 + 2 * 112 + 46}, 560 ${CY - RY}, ${CX - 100} ${CY - RY}`} fill="none" stroke={C.accent} strokeWidth={2} strokeDasharray="5 5" />
        {NODES.map((n, i) => {
          const a1 = ((n.a + 28) * Math.PI) / 180, a2 = ((n.a + 62) * Math.PI) / 180;
          return <path key={`arc-${i}`} d={`M ${CX + RX * Math.cos(a1)} ${CY + RY * Math.sin(a1)} A ${RX} ${RY} 0 0 1 ${CX + RX * Math.cos(a2)} ${CY + RY * Math.sin(a2)}`} fill="none" stroke={C.muted} strokeWidth={2.5} markerEnd="url(#ar2-arrow)" />;
        })}
        {NODES.map((n) => {
          const a = (n.a * Math.PI) / 180;
          const nx = CX + RX * Math.cos(a), ny = CY + RY * Math.sin(a);
          return (
            <g key={n.lines[0]}>
              <rect x={nx - 85} y={ny - 33} width={170} height={66} rx={10} fill="#fff" stroke={C.ink} strokeWidth={1.5} />
              {n.lines.map((l, k) => (
                <text className="t-label" key={l} x={nx} y={ny - 6 + k * 25} textAnchor="middle" fontFamily={l === "train.py" ? MONO : SANS} fontSize={20} fill={C.ink}>{l}</text>
              ))}
            </g>
          );
        })}
        <text x={CX} y={CY - 4} textAnchor="middle" fontFamily={SANS} fontSize={21} fill={C.ink} fontWeight={600}>~12 runs</text>
        <text x={CX} y={CY + 24} textAnchor="middle" fontFamily={SANS} fontSize={21} fill={C.ink} fontWeight={600}>an hour</text>

        {/* step 1: what two days gave */}
        <Show at={1} step={step}>
          <rect x={500} y={372} width={700} height={92} rx={12} fill={C.card} stroke={C.accent} strokeWidth={2} />
          <text x={524} y={410} fontFamily={SANS} fontSize={23} fill={C.ink}>
            Two days: <tspan fontWeight={700}>~700 changes, ~20 kept</tspan>
          </text>
          <text className="t-label" x={524} y={444} fontFamily={MONO} fontSize={18} fill={C.ink}>time to GPT-2: 2.02 → 1.80 h · “not novel … (yet)”</text>
        </Show>
      </svg>
    </Stage>
  );
}
