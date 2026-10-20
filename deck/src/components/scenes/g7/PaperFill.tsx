"use client";

import { C, Canvas, MONO, SANS, Show } from "./kit";

// basic-model-paper: the paper outline is written before the results. A
// section fills only once its milestone's check has passed (illustrated with
// M1 and M2 passing; the live state comes from the swarm's notebook).
const SECTIONS = [
  { title: "Detector and data", m: "setup", passed: true },
  { title: "Particle table", m: "M1", passed: true },
  { title: "Conservation laws", m: "M2", passed: true },
  { title: "Decays", m: "M3", passed: false },
  { title: "Spins and couplings", m: "M4, M5", passed: false },
  { title: "Lagrangian and predictions", m: "M6", passed: false },
];

export function PaperFill({ step }: { step: number }) {
  const px = 420, py = 0, pw = 500, sh = 74;
  return (
    <Canvas label="A paper outline with one section per milestone; sections fill only after their milestone passes its check">
      <rect x={px} y={py} width={pw} height={SECTIONS.length * sh + 40} rx={8} fill="#fffdf8" stroke={C.muted} strokeWidth={1.5} />
      {SECTIONS.map((s, i) => {
        const y = py + 28 + i * sh;
        const filled = step >= 1 && s.passed;
        return (
          <g key={s.title}>
            <text className="t-label" x={px + 24} y={y + 20} fontFamily={MONO} fontSize={18} fill={C.ink}>{s.title}</text>
            <rect x={px + 24} y={y + 30} width={pw - 48} height={30} rx={4} fill="none" stroke={C.faint} strokeDasharray="5 5" opacity={filled ? 0 : 1} />
            <Show at={1} step={step}>
              {s.passed ? (
                <g>
                  <line x1={px + 28} x2={px + pw - 150} y1={y + 38} y2={y + 38} stroke={C.rule} strokeWidth={6} strokeLinecap="round" />
                  <line x1={px + 28} x2={px + pw - 210} y1={y + 52} y2={y + 52} stroke={C.rule} strokeWidth={6} strokeLinecap="round" />
                  <rect x={px + pw - 128} y={y + 30} width={100} height={30} rx={3} fill={C.tint} stroke={C.accent} />
                  <polyline points={[0, 22, 14, 16, 28, 19, 42, 6, 56, 12, 70, 4, 84, 9].reduce<string[]>((acc, v, k) => (k % 2 ? acc : [...acc, `${px + pw - 120 + v},${y + 33 + [22, 16, 19, 6, 12, 4, 9][k / 2]}`]), []).join(" ")} fill="none" stroke={C.accent} strokeWidth={2} />
                </g>
              ) : (
                <text className="t-label" x={px + pw - 36} y={y + 51} textAnchor="end" fontFamily={MONO} fontSize={16} fill={C.muted}>waits for its check</text>
              )}
            </Show>
            <text className="t-label" x={px - 24} y={y + 50} textAnchor="end" fontFamily={MONO} fontSize={18} fill={s.passed && step >= 1 ? C.good : C.muted}>
              {s.m}{s.passed && step >= 1 ? " ✓" : ""}
            </text>
          </g>
        );
      })}
      <g transform={`translate(${px + pw + 30} 40)`}>
        <text x={0} y={0} fontFamily={SANS} fontSize={22} fill={C.muted}>good enough:</text>
        <text x={0} y={36} fontFamily={SANS} fontSize={24} fill={C.ink}>a milestone</text>
        <text x={0} y={68} fontFamily={SANS} fontSize={24} fill={C.ink}>reached, and</text>
        <text x={0} y={100} fontFamily={SANS} fontSize={24} fill={C.ink}>held-out</text>
        <text x={0} y={132} fontFamily={SANS} fontSize={24} fill={C.ink}>predictions pass</text>
      </g>
      <Show at={1} step={step}>
        <text x={40} y={170} fontFamily={SANS} fontSize={24} fill={C.ink}>Figures come from</text>
        <text x={40} y={204} fontFamily={SANS} fontSize={24} fill={C.ink}>the ledger, once</text>
        <text x={40} y={238} fontFamily={SANS} fontSize={24} fill={C.ink}>the check passes.</text>
        <text className="t-label" x={40} y={278} fontFamily={MONO} fontSize={15} fill={C.muted}>illustration only</text>
      </Show>
    </Canvas>
  );
}
