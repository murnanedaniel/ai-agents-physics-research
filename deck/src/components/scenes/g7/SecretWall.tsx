"use client";

import { useState } from "react";
import { C, Canvas, MONO, SANS, stop } from "./kit";

// demo-newuniverse: three directories. The oracle is the only way from the
// secret theory to the swarm; hover a zone for what lives there.
type Zone = { key: string; x: number; title: string; files: string[]; detail: string; fill: string; ink: string };
const ZONES: Zone[] = [
  { key: "secret", x: 20, title: "secret/", files: ["theory (UFO)", "MadGraph runs", "truth"], detail: "The swarm never reads here.", fill: C.warmTint, ink: C.ink },
  { key: "oracle", x: 430, title: "oracle/", files: ["beams, √s, N", "fast detector sim", "raw hits | objects"], detail: "Runs the theory, copies out only detector output.", fill: C.tint, ink: C.ink },
  { key: "swarm", x: 840, title: "swarm/", files: ["outbox (Parquet)", "ledger.csv", "NOTEBOOK.md, THEORY.md"], detail: "Every request and its cost lands in the ledger.", fill: "#fffdf8", ink: C.ink },
];
const W = 340, Y = 30, H = 270;

export function SecretWall() {
  const [hover, setHover] = useState<string | null>(null);
  const shown = ZONES.find((z) => z.key === hover);
  return (
    <Canvas label="Three directories: the secret theory, the oracle that is the only way out, and the swarm's workspace">
      {ZONES.map((z, i) => (
        <g key={z.key} {...stop} onMouseEnter={() => setHover(z.key)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
          <rect x={z.x} y={Y} width={W} height={H} rx={16} fill={z.fill} stroke={hover === z.key ? C.accent : i === 0 ? C.ink : C.muted} strokeWidth={hover === z.key || i === 0 ? 3 : 1.5} />
          <text x={z.x + 28} y={Y + 52} fontFamily={MONO} fontSize={30} fill={z.ink}>{z.title}</text>
          {z.files.map((f, k) => (
            <text key={f} className="t-label" x={z.x + 28} y={Y + 115 + k * 48} fontFamily={MONO} fontSize={19} fill={C.muted}>{f}</text>
          ))}
          {i < 2 && <path d={`M ${z.x + W + 8} ${Y + H / 2} H ${ZONES[i + 1].x - 10}`} stroke={i === 0 ? C.warm : C.accent} strokeWidth={3} markerEnd="url(#g7-arr3)" />}
        </g>
      ))}
      <text x={600} y={Y + H + 52} textAnchor="middle" fontFamily={SANS} fontSize={24} fill={C.accent}>
        {shown ? shown.detail : "One door: the oracle."}
      </text>
      <g transform="translate(20 400)">
        <rect x={0} y={0} width={1160} height={70} rx={12} fill="none" stroke={C.warm} strokeWidth={1.5} strokeDasharray="6 5" />
        <text x={30} y={44} fontFamily={SANS} fontSize={22} fill={C.ink}>Honest limit: same user, so deny rules on secret/ and an audit of every transcript.</text>
      </g>
      <defs>
        <marker id="g7-arr3" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill={C.muted} />
        </marker>
      </defs>
    </Canvas>
  );
}
