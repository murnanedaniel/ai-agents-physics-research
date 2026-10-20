"use client";

import { useState } from "react";
import { Arrow, C, MONO, SANS, Show, Stage, stop } from "./kit";

// Karpathy's autoresearch (github.com/karpathy/autoresearch, program.md, read
// 20 Oct 2026): three files, one editable; a fixed 5-minute run; keep the
// commit if val_bpb is lower, otherwise git reset.
const FILES = [
  { name: "program.md", role: "instructions", lock: false, edit: false, detail: "“LOOP FOREVER” · the human writes it" },
  { name: "prepare.py", role: "data and metric, frozen", lock: true, edit: false, detail: "read-only: holds the fixed evaluation" },
  { name: "train.py", role: "only file it edits", lock: false, edit: true, detail: "architecture, optimiser, batch size" },
];
const CX = 870, CY = 235, RX = 235, RY = 165;
const NODES = [
  { a: -90, lines: ["edit", "train.py"] },
  { a: 0, lines: ["train", "5 minutes"] },
  { a: 90, lines: ["val_bpb", "lower?"] },
  { a: 180, lines: ["keep, or", "git reset"] },
];

export function AutoresearchLoop({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Stage label="Three files, one of them frozen and one editable, then a loop: edit, train five minutes, compare val_bpb, keep or reset">
      <svg viewBox="0 0 1200 470" width="100%" style={{ width: "100%", height: "100%" }} onClick={stop}>
        <Arrow id="ar-arrow" />
        {FILES.map((f, i) => {
          const y = 30 + i * 128;
          return (
            <g key={f.name} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
              <rect x={10} y={y} width={400} height={104} rx={10} fill={f.edit ? C.accentSoft : C.card} stroke={f.edit ? C.accent : C.faint} strokeWidth={f.edit ? 2.5 : 1.5} />
              <text x={34} y={y + 44} fontFamily={MONO} fontSize={25} fill={f.edit ? C.accent : C.ink} fontWeight={600}>{f.name}</text>
              <text x={34} y={y + 80} fontFamily={SANS} fontSize={22} fill={C.ink}>{hover === i ? f.detail : f.role}</text>
              {f.lock && (
                <g transform={`translate(368 ${y + 22})`}>
                  <rect x={0} y={12} width={24} height={20} rx={3} fill={C.warm} />
                  <path d="M 5 12 V 6 a 7 7 0 0 1 14 0 V 12" fill="none" stroke={C.warm} strokeWidth={3} />
                </g>
              )}
            </g>
          );
        })}
        <Show at={1} step={step} ghost>
          <path d={`M 416 ${30 + 2 * 128 + 52} C 520 ${30 + 2 * 128 + 52}, 560 ${CY - RY}, ${CX - 100} ${CY - RY}`} fill="none" stroke={C.accent} strokeWidth={2} strokeDasharray="5 5" />
          
          {NODES.map((n, i) => {
            const a1 = ((n.a + 28) * Math.PI) / 180, a2 = ((n.a + 62) * Math.PI) / 180;
            return (
              <path key={`arc-${i}`} d={`M ${CX + RX * Math.cos(a1)} ${CY + RY * Math.sin(a1)} A ${RX} ${RY} 0 0 1 ${CX + RX * Math.cos(a2)} ${CY + RY * Math.sin(a2)}`} fill="none" stroke={C.muted} strokeWidth={2.5} markerEnd="url(#ar-arrow)" />
            );
          })}
          {NODES.map((n) => {
            const a = (n.a * Math.PI) / 180;
            const nx = CX + RX * Math.cos(a), ny = CY + RY * Math.sin(a);
            const w = 180, h = 70;
            return (
              <g key={n.lines[0]}>
                <rect x={nx - w / 2} y={ny - h / 2} width={w} height={h} rx={10} fill="#fff" stroke={C.ink} strokeWidth={1.5} />
                {n.lines.map((l, k) => (
                  <text key={l} x={nx} y={ny - 6 + k * 26} textAnchor="middle" fontFamily={l.includes("val_bpb") || l.includes("train.py") ? MONO : SANS} fontSize={20} fill={C.ink}>{l}</text>
                ))}
              </g>
            );
          })}
          <text x={CX} y={CY - 6} textAnchor="middle" fontFamily={SANS} fontSize={22} fill={C.ink} fontWeight={600}>about 12 an hour,</text>
          <text x={CX} y={CY + 24} textAnchor="middle" fontFamily={SANS} fontSize={22} fill={C.ink} fontWeight={600}>100 overnight</text>
        </Show>
      </svg>
    </Stage>
  );
}
