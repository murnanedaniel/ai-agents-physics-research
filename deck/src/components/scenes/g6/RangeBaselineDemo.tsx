"use client";

import { Arrow, C, MONO, SANS, Stage } from "./kit";

// Holding scene for the live demo: register the project, then reproduce the
// paper's PaiNN baseline before any variant runs. Target from Caruso et al.,
// Nat. Commun. 17 (2026), Table 1 (MD22 DHA, PaiNN, four seeds). The score
// (force error at matched size and speed) is the figure of merit in the RANGE
// prep notes, the same one the hill-climb scene uses.
const STATIONS = [
  { x: 40, title: "1  Register", lines: ["hypothesis", "figure of merit", "budget, timeline"], note: ["score: force error at", "matched size and speed"], tone: "on" },
  { x: 430, title: "2  Reproduce", lines: ["PaiNN on MD22 DHA", "target 0.199 ± 0.004", "energy error, kcal/mol"], note: ["agents on Perlmutter, told", "the job rules first"], tone: "hero" },
  { x: 820, title: "3  Then variants", lines: ["+ RANGE", "+ a transformer"], note: ["only once step 2 passes"], tone: "off" },
] as const;

export function RangeBaselineDemo() {
  return (
    <Stage label="Three stations: register the project, reproduce the PaiNN baseline, then run variants">
      <svg viewBox="0 0 1200 440" width="100%" style={{ width: "100%", height: "100%" }}>
        <Arrow id="rb-arrow" />
        <text x={600} y={34} textAnchor="middle" fontFamily={SANS} fontSize={25} fill={C.ink}>A variant only counts once the known number comes out.</text>
        {STATIONS.map((s, i) => {
          const hero = s.tone === "hero", off = s.tone === "off";
          return (
            <g key={s.title} opacity={off ? 0.5 : 1} data-dim={off || undefined}>
              <rect x={s.x} y={70} width={340} height={270} rx={14} fill={hero ? C.accentSoft : C.card} stroke={hero ? C.accent : C.faint} strokeWidth={hero ? 2.5 : 1.5} strokeDasharray={off ? "6 6" : undefined} />
              <text x={s.x + 24} y={118} fontFamily={SANS} fontSize={28} fontWeight={600} fill={hero ? C.accent : C.ink}>{s.title}</text>
              {s.lines.map((l, j) => (
                <text key={l} x={s.x + 24} y={168 + j * 38} fontFamily={j === 1 && hero ? MONO : SANS} fontSize={23} fill={C.ink}>{l}</text>
              ))}
              {s.note.map((n, j) => (
                <text key={n} className="t-label" x={s.x + 24} y={298 + j * 22} fontFamily={MONO} fontSize={16} fill={C.muted}>{n}</text>
              ))}
              {i < 2 && <path d={`M ${s.x + 350} 205 H ${s.x + 380}`} stroke={C.muted} strokeWidth={2.5} markerEnd="url(#rb-arrow)" />}
            </g>
          );
        })}
        <text className="t-label" x={600} y={380} textAnchor="middle" fontFamily={MONO} fontSize={17} fill={C.muted}>paper: mean of four seeds; a short live run may land above it</text>
      </svg>
    </Stage>
  );
}
