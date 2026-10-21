"use client";

import { Arrow, C, Canvas, SERIF, Show, T, TINT } from "./kit";

// The same two axes as q3-professional, now with named practices placed on them.
const L = 150, R = 1010, TOP = 20, BOT = 440;
const MX = (L + R) / 2, MY = (TOP + BOT) / 2;

const vibe = { x: 860, y: 370 };
const eng = { x: 860, y: 215 };
const goal = { x: 860, y: 80 };

function Point({ x, y, color, name, quote, who, side = "left" }: { x: number; y: number; color: string; name: string; quote: string; who: string; side?: "left" | "right" }) {
  const tx = side === "left" ? x - 24 : x + 24;
  const anchor = side === "left" ? "end" : "start";
  return (
    <g>
      <circle cx={x} cy={y} r={12} fill={color} />
      <text x={tx} y={y - 8} textAnchor={anchor} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 2} fill={C.ink}>{name}</text>
      <text x={tx} y={y + 20} textAnchor={anchor} fontSize={T.body - 1} fill={C.ink}>{quote}</text>
      <text x={tx} y={y + 42} textAnchor={anchor} fontSize={T.label} fill={C.muted} className="t-label">{who}</text>
    </g>
  );
}

// Software already made the move up the method axis in one year.
export function WaysOfWorking({ step }: { step: number }) {
  return (
    <Canvas>
      <defs>
        <Arrow id="ww-ink" color={C.ink} />
        <Arrow id="ww-warm" color={C.warm} />
      </defs>

      {/* Quadrant guides and axes, as on the previous scene */}
      <line x1={MX} y1={TOP} x2={MX} y2={BOT} stroke={C.rule} strokeDasharray="4 6" />
      <line x1={L} y1={MY} x2={R} y2={MY} stroke={C.rule} strokeDasharray="4 6" />
      <line x1={L} y1={BOT} x2={R + 30} y2={BOT} stroke={C.ink} strokeWidth={2} markerEnd="url(#ww-ink)" />
      <line x1={L} y1={BOT} x2={L} y2={TOP - 10} stroke={C.ink} strokeWidth={2} markerEnd="url(#ww-ink)" />
      <text x={L} y={BOT + 32} fontSize={T.small} fill={C.muted} className="t-label">a chat window</text>
      <text x={R + 30} y={BOT + 32} textAnchor="end" fontSize={T.small} fill={C.ink} className="t-label">agentic tools and workflows →</text>
      <text x={L - 16} y={BOT - 6} textAnchor="end" fontSize={T.small} fill={C.muted} className="t-label">anecdote</text>
      <text x={L - 16} y={TOP + 14} textAnchor="end" fontSize={T.small} fill={C.ink} className="t-label">scientific</text>
      <text x={L - 16} y={TOP + 36} textAnchor="end" fontSize={T.small} fill={C.ink} className="t-label">method ↑</text>

      {/* Faint reminders of the previous scene's quadrants */}
      <text x={L + 20} y={TOP + 30} fontSize={T.label} fill={C.muted} className="t-label">professional scientist</text>
      <text x={L + 20} y={BOT - 20} fontSize={T.label} fill={C.muted} className="t-label">person on the street</text>

      <Show when={step >= 0}>
        <Point {...vibe} color={C.faint} name="Vibe coding" quote="“I ‘Accept All’ always, I don’t read the diffs”" who="Karpathy, Feb 2025" />
      </Show>

      <Show when={step >= 1}>
        <line x1={vibe.x} y1={vibe.y - 16} x2={eng.x} y2={eng.y + 18} stroke={C.accent} strokeWidth={2.5} markerEnd="url(#ww-ink)" />
        <text x={vibe.x + 18} y={(vibe.y + eng.y) / 2 + 6} fontSize={T.label} fill={C.accent} className="t-label">one year</text>
        <Point {...eng} color={C.accent} name="Agentic engineering" quote="“more oversight and scrutiny”" who="Karpathy, Feb 2026" />
        <line x1={eng.x} y1={eng.y - 16} x2={goal.x} y2={goal.y + 20} stroke={C.warm} strokeWidth={2.5} strokeDasharray="6 5" markerEnd="url(#ww-warm)" />
        <rect x={goal.x - 400} y={goal.y - 46} width={424} height={74} rx={12} fill={TINT.warm} stroke={C.warm} strokeWidth={1.5} />
        <circle cx={goal.x} cy={goal.y} r={12} fill={C.warm} />
        <text x={goal.x - 380} y={goal.y - 12} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 2} fill={C.ink}>Professional agentic science</text>
        <text x={goal.x - 380} y={goal.y + 16} fontSize={T.body - 1} fill={C.ink}>frozen metrics, held-out checks, logs</text>
        <text x={L} y={BOT + 84} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead} fill={C.ink}>Software engineering made this move in about a year. Today we try it in science.</text>
      </Show>
    </Canvas>
  );
}
