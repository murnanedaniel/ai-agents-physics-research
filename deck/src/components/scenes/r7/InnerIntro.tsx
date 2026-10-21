"use client";

import { C, Canvas, Reveal, T, mono, serif } from "./kit";

// Section scene for the inner loop. Left: the day's three nested loops with
// the inner one lit; one dot makes a single lap on entry. Right: what is
// coming, one line per step.
const CX = 260, CY = 250;
const LOOPS = [
  { r: 220, label: "programme", sub: "outer" },
  { r: 150, label: "paper", sub: "middle" },
  { r: 80, label: "experiment", sub: "inner" },
];
const LINES = [
  <>One experiment: hypothesis, run, check, keep or discard.</>,
  <>Three projects start from scratch: galactic clustering, fine-tuning, RANGE.</>,
  <>Along the way: surfaces, skills, logs, hill-climbing.</>,
];

export function InnerIntro({ step }: { step: number }) {
  const inner = LOOPS[2].r;
  return (
    <Canvas className="flex items-center gap-[4vw]">
      <div className="h-full flex-[0.9] min-w-0 flex items-center justify-center">
        <svg viewBox="0 0 520 500" className="h-full max-h-full w-auto max-w-full" role="img" aria-label="Three nested loops: programme, paper and experiment; the inner experiment loop is highlighted">
          {LOOPS.map((l, i) => {
            const on = i === 2;
            return (
              <g key={l.label} data-dim={on ? undefined : true}>
                <circle cx={CX} cy={CY} r={l.r} fill={on ? C.accentSoft : "none"} stroke={on ? C.accent : C.rule} strokeWidth={on ? 3 : 2} />
                <text x={CX} y={on ? CY + 8 : CY - l.r + 28} textAnchor="middle" fontSize={on ? 24 : 20} style={mono}
                  fill={on ? C.accent : "#8a847b"} className="t-label">{l.label}</text>
              </g>
            );
          })}
          <g>
            <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="3.5s" begin="0.3s" repeatCount="1" fill="freeze" />
            <circle cx={CX + inner} cy={CY} r={10} fill={C.accent} />
          </g>
        </svg>
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-[5vh]">
        {LINES.map((l, i) => (
          <Reveal key={i} at={i} step={step}>
            <div className="flex gap-4 items-start">
              <span className="shrink-0 rounded-full" style={{ width: 12, height: 12, background: C.accent, marginTop: "0.5em" }} />
              <span style={{ fontSize: T.body, lineHeight: 1.3 }}>{l}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Canvas>
  );
}
