"use client";

import { useState } from "react";
import { C, Canvas, MONO, SANS, stop } from "./kit";

// demo-tracking-review: one draft page, three readers in the margin, each
// looking for one kind of fault. Hover a reader to see what it flags.
const READERS = [
  { key: "voice", who: "my-voice skill", job: "plain words, no hype", flag: "tone and word choice", line: 1 },
  { key: "referee", who: "GPT-6 Astra (Codex)", job: "claims sized to evidence", flag: "“first systematic study”", line: 3 },
  { key: "citations", who: "citation check", job: "real, and the right paper", flag: "wrong id, wrong paper", line: 6 },
];
const PX = 40, PY = 10, PW = 380, PH = 500;

export function ThreeReaders() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Canvas label="A draft page with three reviewers in the margin: voice, referee and citation check">
      <rect x={PX} y={PY} width={PW} height={PH} rx={8} fill="#fffdf8" stroke={C.muted} strokeWidth={1.5} />
      <rect x={PX + 30} y={PY + 30} width={PW - 60} height={14} rx={4} fill={C.muted} opacity={0.6} />
      {Array.from({ length: 16 }, (_, k) => (
        <line key={k} x1={PX + 30} x2={PX + PW - (k % 4 === 3 ? 120 : 30)} y1={PY + 80 + k * 26} y2={PY + 80 + k * 26} stroke={C.rule} strokeWidth={6} strokeLinecap="round" />
      ))}
      {READERS.map((r, i) => {
        const ly = PY + 80 + r.line * 68;
        const on = hover === null || hover === r.key;
        const ry = 40 + i * 165;
        return (
          <g key={r.key} {...stop} onMouseEnter={() => setHover(r.key)} onMouseLeave={() => setHover(null)} opacity={on ? 1 : 0.35} style={{ cursor: "default" }}>
            <rect x={PX + 24} y={ly - 10} width={PW - 110} height={20} rx={4} fill={[C.accent, C.warm, C.good][i]} opacity={0.22} />
            <path d={`M ${PX + PW - 80} ${ly} C ${PX + PW + 60} ${ly}, ${520} ${ry + 40}, ${560} ${ry + 40}`} fill="none" stroke={[C.accent, C.warm, C.good][i]} strokeWidth={2} />
            <text x={580} y={ry + 30} fontFamily={SANS} fontSize={27} fill={C.ink}>{r.job}</text>
            <text className="t-label" x={580} y={ry + 66} fontFamily={MONO} fontSize={18} fill={C.muted}>{r.who}</text>
            <text className="t-label" x={580} y={ry + 98} fontFamily={MONO} fontSize={18} fill={[C.accent, C.warm, C.good][i]}>flags: {r.flag}</text>
          </g>
        );
      })}
    </Canvas>
  );
}
