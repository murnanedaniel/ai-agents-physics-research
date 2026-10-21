"use client";

import { C, Canvas, MONO, SANS } from "../g7/kit";

// demo-progress: the lunch break as a time axis. Lanes that kept running show
// a bar across it (started in the morning, so it fades in from the left);
// at 13:15 each lane names where to look. Project numbers follow the
// round-2 order: 1 galactic, 2 fine-tuning, 3 RANGE, 4 Basic Model, 5 tracking.
const X0 = 330, X1 = 960; // 12:00 and 13:15
const tx = (min: number) => X0 + ((X1 - X0) * min) / 75;

type Lane = { name: string; look: string; bar: "lunch" | "before" | "none"; note?: string };
const LANES: Lane[] = [
  { name: "1  Galactic", look: "W&B runs", bar: "before" },
  { name: "2  Fine-tuning", look: "Claude Science", bar: "none", note: "to be decided live" },
  { name: "3  RANGE", look: "W&B, ScienceDash", bar: "before" },
  { name: "4  Basic Model", look: "starts after lunch", bar: "none" },
  { name: "5  Track fitting", look: "pre-cooked paper", bar: "none", note: "pre-cooked; reruns after lunch" },
];

export function LunchCheck() {
  const top = 110, gap = 82;
  return (
    <Canvas viewBox="0 -10 1200 500" label="The lunch break as a time axis, with five project lanes and where to look for each at 13:15">
      {/* axis */}
      <g fontFamily={MONO} fill={C.muted}>
        {[0, 15, 30, 45, 60, 75].map((m) => (
          <g key={m}>
            <line x1={tx(m)} x2={tx(m)} y1={60} y2={top + gap * 4 + 30} stroke={C.rule} strokeWidth={1} />
            {(m === 0 || m === 75 || m === 30 || m === 60) && (
              <text className="t-label" x={tx(m)} y={44} textAnchor="middle" fontSize={17}>
                {["12:00", "", "12:30", "", "13:00", "13:15"][m / 15]}
              </text>
            )}
          </g>
        ))}
        <text className="t-label" x={(X0 + X1) / 2} y={18} textAnchor="middle" fontSize={17} fill={C.muted}>lunch</text>
      </g>
      <rect x={X0} y={60} width={X1 - X0} height={gap * 4 + 70} fill={C.warmTint} opacity={0.45} />
      <line x1={X1} x2={X1} y1={56} y2={top + gap * 4 + 34} stroke={C.accent} strokeWidth={2.5} />
      {LANES.map((l, i) => {
        const y = top + i * gap;
        return (
          <g key={l.name}>
            <text x={40} y={y + 8} fontFamily={SANS} fontSize={26} fill={C.ink}>{l.name}</text>
            {l.bar !== "none" && (
              <rect x={l.bar === "lunch" ? tx(-5) : X0 - 60} y={y - 10} width={l.bar === "lunch" ? X1 - tx(-5) : X1 - X0 + 60} height={20} rx={10} fill={C.accent} opacity={0.85} />
            )}
            {l.bar === "before" && <rect x={X0 - 60} y={y - 10} width={60} height={20} fill="url(#g7-fade)" />}
            {l.note && <text x={(X0 + X1) / 2} y={y + 7} textAnchor="middle" fontFamily={MONO} fontSize={18} fill={C.warm}>{l.note}</text>}
            <circle cx={X1} cy={y} r={9} fill={C.paper} stroke={C.accent} strokeWidth={3} />
            <text className="t-label" x={X1 + 24} y={y + 7} fontFamily={MONO} fontSize={19} fill={C.ink}>{l.look}</text>
          </g>
        );
      })}
      <defs>
        <linearGradient id="g7-fade" x1="0" x2="1">
          <stop offset="0" stopColor={C.paper} stopOpacity={1} />
          <stop offset="1" stopColor={C.paper} stopOpacity={0} />
        </linearGradient>
      </defs>
    </Canvas>
  );
}
