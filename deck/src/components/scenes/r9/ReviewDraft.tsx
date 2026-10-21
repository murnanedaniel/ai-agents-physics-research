"use client";

import { useState } from "react";
import { C, Canvas, MONO, SANS, stop } from "./kit";

// demo-tracking-review: one draft page, three readers, each with one job and
// one tool (hover a reader to light the line it flags). Below: every finding
// becomes a ledger row that is closed only by a re-check. A last line places the
// demo in the middle loop: the tracking draft is pre-cooked, so we review it.
const READERS = [
  { key: "voice", job: "Is it plain, and in my voice?", tool: "my-voice skill: a SKILL.md of style rules", flag: "hype words, long sentences", line: 1 },
  { key: "referee", job: "Are the claims sized to the evidence?", tool: "a second model, read-only: GPT-6 Astra via Codex", flag: "“first systematic study” from one run", line: 3 },
  { key: "citations", job: "Is each citation real, and the right paper?", tool: "a skill we write live: arXiv, INSPIRE, DOI lookup; claim check", flag: "a real id pointing at the wrong paper", line: 6 },
];
const COL = [C.accent, C.warm, C.good];
const PX = 20, PY = 10, PW = 330, PH = 400;

export function ReviewDraft() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Canvas label="A draft page with three readers: a style skill, a second model as referee, and a citation check; each finding goes into a ledger row closed by a re-check; still the middle loop: the pre-cooked tracking draft is reviewed live" viewBox="0 0 1200 580">
      <rect x={PX} y={PY} width={PW} height={PH} rx={8} fill="#fffdf8" stroke={C.muted} strokeWidth={1.5} />
      <rect x={PX + 26} y={PY + 26} width={PW - 52} height={14} rx={4} fill={C.muted} opacity={0.6} />
      {Array.from({ length: 13 }, (_, k) => (
        <line key={k} x1={PX + 26} x2={PX + PW - (k % 4 === 3 ? 100 : 26)} y1={PY + 72 + k * 25} y2={PY + 72 + k * 25} stroke={C.rule} strokeWidth={6} strokeLinecap="round" />
      ))}
      <text className="t-label" x={PX + PW / 2} y={PY + PH + 26} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.muted}>the beam-spot draft (Apr 2026),</text>
      <text className="t-label" x={PX + PW / 2} y={PY + PH + 46} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.muted}>updated with the pre-cook runs</text>
      {READERS.map((r, i) => {
        const ly = PY + 72 + r.line * 50;
        const on = hover === null || hover === r.key;
        const ry = 10 + i * 135;
        return (
          <g key={r.key} {...stop} onMouseEnter={() => setHover(r.key)} onMouseLeave={() => setHover(null)} opacity={on ? 1 : 0.35} style={{ cursor: "default" }}>
            <rect x={PX + 20} y={ly - 10} width={PW - 80} height={20} rx={4} fill={COL[i]} opacity={0.22} />
            <path d={`M ${PX + PW - 56} ${ly} C ${PX + PW + 60} ${ly}, 400 ${ry + 40}, 440 ${ry + 40}`} fill="none" stroke={COL[i]} strokeWidth={2} />
            <rect x={450} y={ry} width={730} height={118} rx={12} fill="none" stroke={COL[i]} strokeWidth={1.2} />
            <text x={472} y={ry + 38} fontFamily={SANS} fontSize={25} fill={C.ink}>{r.job}</text>
            <text className="t-label" x={472} y={ry + 70} fontFamily={MONO} fontSize={16} fill={C.muted}>{r.tool}</text>
            <text className="t-label" x={472} y={ry + 98} fontFamily={MONO} fontSize={16} fill={COL[i]}>e.g. {r.flag}</text>
          </g>
        );
      })}
      <g transform="translate(450 440)">
        <rect x={0} y={0} width={730} height={80} rx={10} fill={C.tint} stroke={C.accent} strokeWidth={1.5} />
        {[["finding", "one line"], ["fix", "a commit"], ["re-check", "same reader"], ["status", "closed ✓"]].map(([h, v], k) => (
          <g key={h} transform={`translate(${24 + k * 178} 0)`}>
            <text className="t-label" x={0} y={30} fontFamily={MONO} fontSize={15} fill={C.muted}>{h}</text>
            <text x={0} y={62} fontFamily={SANS} fontSize={22} fill={k === 3 ? C.good : C.ink}>{v}</text>
          </g>
        ))}
      </g>
      <text className="t-label" x={20} y={488} fontFamily={MONO} fontSize={15} fill={C.muted}>Every finding becomes a row;</text>
      <text className="t-label" x={20} y={508} fontFamily={MONO} fontSize={15} fill={C.muted}>only a re-check closes it.</text>
      <text x={20} y={562} fontFamily={SANS} fontSize={22} fill={C.warm}>Still the middle loop: the tracking draft is pre-cooked, so today we review it.</text>
    </Canvas>
  );
}
