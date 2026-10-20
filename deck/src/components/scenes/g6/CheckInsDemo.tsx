"use client";

import { Arrow, C, MONO, SANS, Stage } from "./kit";

// Holding scene for the check-in demo: three morning projects feed one agent
// that writes a slide per project and a report document.
const PROJECTS = [
  { name: "1  RANGE", from: "W&B runs" },
  { name: "2  Galactic clustering", from: "W&B runs" },
  { name: "3  Fine-tuning", from: "notes, derivations" },
];

export function CheckInsDemo() {
  return (
    <Stage label="Three projects feed an agent that writes check-in slides and a report">
      <svg viewBox="0 0 1200 420" width="100%" style={{ width: "100%", height: "100%" }}>
        <Arrow id="ci-arrow" />
        {PROJECTS.map((p, i) => {
          const y = 40 + i * 125;
          return (
            <g key={p.name}>
              <rect x={10} y={y} width={360} height={95} rx={12} fill={C.card} stroke={C.faint} />
              <text x={32} y={y + 42} fontFamily={SANS} fontSize={25} fill={C.ink}>{p.name}</text>
              <text className="t-label" x={32} y={y + 74} fontFamily={MONO} fontSize={16} fill={C.muted}>{p.from}</text>
              <path d={`M 378 ${y + 47} C 440 ${y + 47}, 440 210, 490 210`} fill="none" stroke={C.muted} strokeWidth={2} markerEnd="url(#ci-arrow)" />
            </g>
          );
        })}
        <circle cx={570} cy={210} r={72} fill={C.accentSoft} stroke={C.accent} strokeWidth={2} />
        <text x={570} y={218} textAnchor="middle" fontFamily={SANS} fontSize={26} fill={C.accent} fontWeight={600}>agent</text>
        <path d="M 646 185 C 700 185, 700 110, 760 110" fill="none" stroke={C.muted} strokeWidth={2} markerEnd="url(#ci-arrow)" />
        <path d="M 646 235 C 700 235, 700 310, 760 310" fill="none" stroke={C.muted} strokeWidth={2} markerEnd="url(#ci-arrow)" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={780 + i * 18} y={52 + i * 14} width={170} height={100} rx={5} fill="#fff" stroke={C.faint} />
        ))}
        <text x={975} y={100} fontFamily={SANS} fontSize={25} fill={C.ink}>check-in</text>
        <text x={975} y={130} fontFamily={SANS} fontSize={25} fill={C.ink}>slides</text>
        <rect x={790} y={250} width={140} height={150} rx={4} fill="#fff" stroke={C.faint} />
        {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={806} y={274 + i * 18} width={i % 3 === 2 ? 70 : 108} height={7} fill={C.faint} />)}
        <text x={975} y={330} fontFamily={SANS} fontSize={25} fill={C.ink}>report</text>
      </svg>
    </Stage>
  );
}
