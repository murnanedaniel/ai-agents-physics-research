"use client";

import { useState } from "react";
import { C, Canvas, MONO, SANS, stop } from "../r9/kit";

// demo-tracking-review (round 3). The demo idea, stated first: an agent reads
// the draft the way a referee would, in three passes, in this order: claims
// without evidence, citations that don't support their sentence, then a voice
// pass. Hover a pass to light the line it flags. Every finding becomes a
// ledger row that only a re-check closes. The voice skill gets its own scene
// next (demo-voice-skill). Existing checkers (CiteScan; CheckIfExist,
// arXiv:2602.15871) test only that a reference exists; the live skill also
// reads the cited abstract against the sentence.
const PASSES = [
  { key: "claims", job: "Which claims have no evidence behind them?", tool: "a second model, read-only: GPT-6 Astra via Codex", flag: "“first systematic study”, from one run", line: 3 },
  { key: "citations", job: "Does each citation support its sentence?", tool: "a skill we write live: find the paper, read its abstract, compare", flag: "a real paper that says something else", line: 6 },
  { key: "voice", job: "Is it plain, and in my voice?", tool: "the my-voice skill (next scene)", flag: "hype words, long sentences", line: 1 },
];
const COL = [C.warm, C.good, C.accent];
const PX = 20, PY = 60, PW = 330, PH = 380;

export function ReviewDraft() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Canvas label="An agent reads the draft like a referee, in three passes: claims without evidence, citations that don't support their sentence, and a voice pass. Each finding becomes a ledger row that only a re-check closes. The draft is the pre-cooked tracking paper." viewBox="0 0 1200 600">
      <text x={0} y={26} fontFamily={SANS} fontSize={25} fill={C.ink}>The idea: an agent reads our draft the way a referee would, in three passes.</text>

      <rect x={PX} y={PY} width={PW} height={PH} rx={8} fill="#fffdf8" stroke={C.muted} strokeWidth={1.5} />
      <rect x={PX + 26} y={PY + 26} width={PW - 52} height={14} rx={4} fill={C.muted} opacity={0.6} />
      {Array.from({ length: 12 }, (_, k) => (
        <line key={k} x1={PX + 26} x2={PX + PW - (k % 4 === 3 ? 100 : 26)} y1={PY + 72 + k * 25} y2={PY + 72 + k * 25} stroke={C.rule} strokeWidth={6} strokeLinecap="round" />
      ))}
      <text className="t-label" x={PX + PW / 2} y={PY + PH + 24} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.muted}>the tracking draft, with the runs</text>
      <text className="t-label" x={PX + PW / 2} y={PY + PH + 44} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.muted}>from the previous scene</text>

      {PASSES.map((r, i) => {
        const ly = PY + 72 + r.line * 50;
        const on = hover === null || hover === r.key;
        const ry = PY + i * 128;
        return (
          <g key={r.key} {...stop} onMouseEnter={() => setHover(r.key)} onMouseLeave={() => setHover(null)} opacity={on ? 1 : 0.35} style={{ cursor: "default" }}>
            <rect x={PX + 20} y={ly - 10} width={PW - 80} height={20} rx={4} fill={COL[i]} opacity={0.22} />
            <path d={`M ${PX + PW - 56} ${ly} C ${PX + PW + 60} ${ly}, 400 ${ry + 40}, 440 ${ry + 40}`} fill="none" stroke={COL[i]} strokeWidth={2} />
            <rect x={450} y={ry} width={730} height={112} rx={12} fill="none" stroke={COL[i]} strokeWidth={1.2} />
            <circle cx={478} cy={ry + 30} r={14} fill="none" stroke={COL[i]} strokeWidth={1.5} />
            <text className="t-label" x={478} y={ry + 36} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={COL[i]}>{i + 1}</text>
            <text x={504} y={ry + 38} fontFamily={SANS} fontSize={24} fill={C.ink}>{r.job}</text>
            <text className="t-label" x={504} y={ry + 68} fontFamily={MONO} fontSize={16} fill={C.muted}>{r.tool}</text>
            <text className="t-label" x={504} y={ry + 94} fontFamily={MONO} fontSize={16} fill={COL[i]}>e.g. {r.flag}</text>
          </g>
        );
      })}

      <g transform="translate(450 450)">
        <rect x={0} y={0} width={730} height={80} rx={10} fill={C.tint} stroke={C.accent} strokeWidth={1.5} />
        {[["finding", "one line"], ["fix", "a commit"], ["re-check", "same pass"], ["status", "closed ✓"]].map(([h, v], k) => (
          <g key={h} transform={`translate(${24 + k * 178} 0)`}>
            <text className="t-label" x={0} y={30} fontFamily={MONO} fontSize={15} fill={C.muted}>{h}</text>
            <text x={0} y={62} fontFamily={SANS} fontSize={22} fill={k === 3 ? C.good : C.ink}>{v}</text>
          </g>
        ))}
      </g>
      <text className="t-label" x={20} y={520} fontFamily={MONO} fontSize={15} fill={C.muted}>Every finding becomes a row;</text>
      <text className="t-label" x={20} y={540} fontFamily={MONO} fontSize={15} fill={C.muted}>only a re-check closes it.</text>
      <text x={20} y={590} fontFamily={SANS} fontSize={21} fill={C.warm}>Still the middle loop: tracking is the one pre-cooked project, so its draft is ready to review.</text>
    </Canvas>
  );
}
