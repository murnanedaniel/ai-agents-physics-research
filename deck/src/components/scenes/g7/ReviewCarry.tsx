"use client";

import { motion } from "motion/react";
import { C, Canvas, MONO, SANS, Show } from "./kit";

// middle-intro: drafts in a row with review between them. Step 1: one finding
// sits in the same place in every draft. Step 2: a ledger row closes it.
const DRAFTS = [0, 1, 2, 3];
const dx = (i: number) => 330 + i * 215;
const DY = 70, DW = 120, DH = 160;

function Page({ x, label }: { x: number; label: string }) {
  return (
    <g>
      <rect x={x} y={DY} width={DW} height={DH} rx={6} fill="#fffdf8" stroke={C.muted} strokeWidth={1.5} />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <line key={k} x1={x + 16} x2={x + DW - (k % 3 === 2 ? 40 : 16)} y1={DY + 26 + k * 20} y2={DY + 26 + k * 20} stroke={C.rule} strokeWidth={5} strokeLinecap="round" />
      ))}
      <text className="t-label" x={x + DW / 2} y={DY + DH + 30} textAnchor="middle" fontFamily={MONO} fontSize={18} fill={C.muted}>{label}</text>
    </g>
  );
}

export function ReviewCarry({ step }: { step: number }) {
  const fy = DY + 86; // where the finding sits on each page
  return (
    <Canvas label="Experiments feed a draft; each draft is reviewed and revised; the same finding survives every draft until a ledger row closes it">
      {/* experiments */}
      <g>
        {[[70, 110], [110, 90], [150, 120], [90, 150], [135, 170], [180, 150], [60, 195], [120, 210], [170, 200]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={11} fill={C.accent} opacity={0.75} />
        ))}
        <text x={120} y={DY + DH + 30} textAnchor="middle" fontFamily={SANS} fontSize={22} fill={C.ink}>experiments</text>
        <path d={`M 215 ${DY + DH / 2} H 310`} stroke={C.muted} strokeWidth={2} markerEnd="url(#g7-arrow)" />
      </g>
      {DRAFTS.map((i) => (
        <g key={i}>
          <Page x={dx(i)} label={`draft ${i + 1}`} />
          {i < 3 && (
            <g>
              <path d={`M ${dx(i) + DW + 10} ${DY + DH / 2} H ${dx(i + 1) - 12}`} stroke={C.muted} strokeWidth={2} markerEnd="url(#g7-arrow)" />
              <text className="t-label" x={(dx(i) + DW + dx(i + 1)) / 2} y={DY + DH / 2 - 14} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>review</text>
            </g>
          )}
        </g>
      ))}
      <text x={dx(0) + DW / 2} y={DY - 22} textAnchor="middle" fontFamily={SANS} fontSize={22} fill={C.ink}>argument</text>
      <text x={dx(3) + DW / 2} y={DY - 22} textAnchor="middle" fontFamily={SANS} fontSize={22} fill={C.ink}>revision</text>

      {/* step 1: the same finding in every draft */}
      <Show at={1} step={step}>
        {DRAFTS.map((i) => {
          const closed = step >= 2 && i === 3;
          return (
            <motion.g key={i} initial={false} animate={{ opacity: 1 }}>
              <circle cx={dx(i) + DW - 26} cy={fy} r={17} fill={closed ? "#dcefe2" : C.warmTint} stroke={closed ? C.good : C.warm} strokeWidth={2.5} />
              <text x={dx(i) + DW - 26} y={fy + 7} textAnchor="middle" fontFamily={SANS} fontSize={20} fontWeight={700} fill={closed ? C.good : C.warm}>{closed ? "✓" : "!"}</text>
            </motion.g>
          );
        })}
        <path d={`M ${dx(0) + DW - 26} ${fy + 22} C ${dx(1)} 360, ${dx(2) + 60} 360, ${dx(3) + DW - 26} ${fy + 22}`} fill="none" stroke={C.warm} strokeWidth={1.5} strokeDasharray="5 5" />
        <text x={(dx(1) + dx(2) + DW) / 2} y={350} textAnchor="middle" fontFamily={SANS} fontSize={22} fill={C.warm}>the same finding, draft after draft</text>
      </Show>

      {/* step 2: a ledger row */}
      <Show at={2} step={step}>
        <g transform="translate(330 400)">
          <rect x={0} y={0} width={765} height={86} rx={10} fill={C.tint} stroke={C.accent} strokeWidth={1.5} />
          {[["finding", "one line"], ["owner", "a name"], ["fix", "a commit"], ["re-check", "passed ✓"]].map(([h, v], k) => (
            <g key={h} transform={`translate(${30 + k * 186} 0)`}>
              <text className="t-label" x={0} y={32} fontFamily={MONO} fontSize={16} fill={C.muted}>{h}</text>
              <text x={0} y={66} fontFamily={SANS} fontSize={24} fill={k === 3 ? C.good : C.ink}>{v}</text>
            </g>
          ))}
        </g>
      </Show>
      <defs>
        <marker id="g7-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill={C.muted} />
        </marker>
      </defs>
    </Canvas>
  );
}
