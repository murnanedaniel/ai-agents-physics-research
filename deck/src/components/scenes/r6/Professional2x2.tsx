"use client";

import { Arrow, C, Canvas, SERIF, Show, T, TINT } from "./kit";

// Plot box: method on y (anecdote to scientific method), AI use on x
// (chat window to agentic tools and workflows).
const L = 150, R = 1010, TOP = 20, BOT = 440;
const MX = (L + R) / 2, MY = (TOP + BOT) / 2;
const PAD = 16;

type Q = { x: number; y: number; name: string; sub: [string, string]; color: string; fill: string };
const q = {
  street: { x: L, y: MY, name: "Person on the street", sub: ["uses AI as a chatbot,", "sees science as anecdote"], color: C.faint, fill: TINT.paper },
  sci: { x: L, y: TOP, name: "Professional scientist", sub: ["adds the scientific method:", "hypothesis, test, validate"], color: C.ink, fill: TINT.paper },
  user: { x: MX, y: MY, name: "Professional agentic user", sub: ["adds agentic tools", "and changes how they work"], color: C.accent, fill: TINT.accent },
  both: { x: MX, y: TOP, name: "Professional agentic scientist", sub: ["the method and the tools,", "with workflows built for agents"], color: C.warm, fill: TINT.warm },
} satisfies Record<string, Q>;

const QW = (R - L) / 2 - 2 * PAD, QH = (BOT - TOP) / 2 - 2 * PAD;

function Quad({ d, strong = false }: { d: Q; strong?: boolean }) {
  const x = d.x + PAD, y = d.y + PAD;
  return (
    <g>
      <rect x={x} y={y} width={QW} height={QH} rx={14} fill={d.fill} stroke={d.color} strokeWidth={strong ? 3 : 1.5} />
      <text x={x + 26} y={y + 74} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>{d.name}</text>
      {d.sub.map((line, i) => <text key={line} x={x + 26} y={y + 112 + i * 30} fontSize={T.body} fill={C.ink}>{line}</text>)}
    </g>
  );
}

// The core argument, built in three steps: start casual, move along each
// axis separately, then do both at once.
export function Professional2x2({ step }: { step: number }) {
  const cxL = L + (R - L) / 4, cxR = R - (R - L) / 4;
  const cyT = TOP + (BOT - TOP) / 4, cyB = BOT - (BOT - TOP) / 4;
  return (
    <Canvas>
      <defs>
        <Arrow id="p2-ink" color={C.ink} />
        <Arrow id="p2-acc" color={C.accent} />
        <Arrow id="p2-warm" color={C.warm} />
      </defs>

      {/* Axes */}
      <line x1={L} y1={BOT} x2={R + 30} y2={BOT} stroke={C.ink} strokeWidth={2} markerEnd="url(#p2-ink)" />
      <line x1={L} y1={BOT} x2={L} y2={TOP - 10} stroke={C.ink} strokeWidth={2} markerEnd="url(#p2-ink)" />
      <text x={L} y={BOT + 32} fontSize={T.small} fill={C.muted} className="t-label">a chat window</text>
      <text x={R + 30} y={BOT + 32} textAnchor="end" fontSize={T.small} fill={C.ink} className="t-label">agentic tools and workflows →</text>
      <text x={L - 16} y={BOT - 6} textAnchor="end" fontSize={T.small} fill={C.muted} className="t-label">anecdote</text>
      <text x={L - 16} y={TOP + 14} textAnchor="end" fontSize={T.small} fill={C.ink} className="t-label">scientific</text>
      <text x={L - 16} y={TOP + 36} textAnchor="end" fontSize={T.small} fill={C.ink} className="t-label">method ↑</text>

      <Show when={step >= 0}><Quad d={q.street} /></Show>

      <Show when={step >= 1}>
        <Quad d={q.sci} />
        <Quad d={q.user} />
        <line x1={cxL} y1={cyB - QH / 2 + 2} x2={cxL} y2={cyT + QH / 2 - 4} stroke={C.ink} strokeWidth={2} markerEnd="url(#p2-ink)" />
        <line x1={MX - PAD - 2} y1={cyB + 52} x2={MX + PAD + 4} y2={cyB + 52} stroke={C.accent} strokeWidth={2} markerEnd="url(#p2-acc)" />
      </Show>

      <Show when={step >= 2}>
        <Quad d={q.both} strong />
        <line x1={MX - PAD - 2} y1={cyT + 52} x2={MX + PAD + 4} y2={cyT + 52} stroke={C.warm} strokeWidth={2.5} markerEnd="url(#p2-warm)" />
        <line x1={cxR} y1={cyB - QH / 2 + 2} x2={cxR} y2={cyT + QH / 2 - 4} stroke={C.warm} strokeWidth={2.5} markerEnd="url(#p2-warm)" />
        <text x={L} y={BOT + 78} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead} fill={C.ink}>My case: professional science needs to become professional agentic science.</text>
        <text x={L} y={BOT + 110} fontSize={T.body} fill={C.ink}>Next: today’s practice, the tool layers, then the loops.</text>
      </Show>
    </Canvas>
  );
}
