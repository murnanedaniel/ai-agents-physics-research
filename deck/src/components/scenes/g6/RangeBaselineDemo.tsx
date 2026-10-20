"use client";

import { Arrow, C, MONO, SANS, Stage } from "./kit";

// Holding scene for the live demo: register the project, then reproduce the
// paper's PaiNN baseline before any variant runs. Target from Caruso et al.,
// Nat. Commun. 17 (2026), Table 1 (MD22 DHA, PaiNN, four seeds).
const STATIONS = [
  { x: 40, title: "1  Register", lines: ["hypothesis", "figure of merit", "budget, timeline"], tone: "on" },
  { x: 430, title: "2  Reproduce", lines: ["PaiNN on MD22 DHA", "target 0.199 ± 0.004", "kcal/mol energy MAE"], tone: "hero" },
  { x: 820, title: "3  Then variants", lines: ["+ RANGE", "+ a transformer"], tone: "off" },
] as const;

export function RangeBaselineDemo() {
  return (
    <Stage label="Three stations: register the project, reproduce the PaiNN baseline, then run variants">
      <svg viewBox="0 0 1200 400" width="100%" style={{ width: "100%", height: "100%" }}>
        <Arrow id="rb-arrow" />
        {STATIONS.map((s, i) => {
          const hero = s.tone === "hero", off = s.tone === "off";
          return (
            <g key={s.title} opacity={off ? 0.5 : 1} data-dim={off || undefined}>
              <rect x={s.x} y={60} width={340} height={230} rx={14} fill={hero ? C.accentSoft : C.card} stroke={hero ? C.accent : C.faint} strokeWidth={hero ? 2.5 : 1.5} strokeDasharray={off ? "6 6" : undefined} />
              <text x={s.x + 24} y={108} fontFamily={SANS} fontSize={28} fontWeight={600} fill={hero ? C.accent : C.ink}>{s.title}</text>
              {s.lines.map((l, j) => (
                <text key={l} x={s.x + 24} y={160 + j * 40} fontFamily={j === 1 && hero ? MONO : SANS} fontSize={23} fill={C.ink}>{l}</text>
              ))}
              {i < 2 && <path d={`M ${s.x + 350} 175 H ${s.x + 380}`} stroke={C.muted} strokeWidth={2.5} markerEnd="url(#rb-arrow)" />}
            </g>
          );
        })}
        <text className="t-label" x={600} y={330} textAnchor="middle" fontFamily={MONO} fontSize={17} fill={C.muted}>paper: mean of four seeds; a short live run may land above it</text>
      </svg>
    </Stage>
  );
}
