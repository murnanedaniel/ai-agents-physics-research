"use client";

import { Arrow, C, Canvas, SERIF, Show, T } from "./kit";

const OX = 330, OY = 470, XEND = 1120, YEND = 40;
const loops = [
  { y: 390, name: "An experiment", tag: "inner loop", color: C.accent },
  { y: 255, name: "A paper", tag: "middle loop", color: C.warm, text: C.warmText },
  { y: 120, name: "A programme", tag: "outer loop", color: C.violet },
];
const tools = [
  { x: 470, name: "Models", sub: "and harnesses" },
  { x: 730, name: "Hardware", sub: "and environments" },
  { x: 990, name: "Middleware", sub: "and practices" },
];

// Method on one axis, implementation on the other: the loops are chosen first.
export function TwoAxes({ step }: { step: number }) {
  return (
    <Canvas>
      <defs><Arrow id="ax-a" color={C.ink} /></defs>

      <Show when={step >= 0}>
        <line x1={OX} y1={OY} x2={OX} y2={YEND} stroke={C.ink} strokeWidth={2} markerEnd="url(#ax-a)" />
        <text x={OX - 20} y={YEND + 6} textAnchor="end" fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>Method</text>
        <text x={OX - 20} y={YEND + 32} textAnchor="end" fontSize={T.label} fill={C.muted} className="t-label">slower feedback upwards</text>
        {loops.map((l) => (
          <g key={l.name}>
            <circle cx={OX} cy={l.y} r={7} fill={l.color} />
            <text x={OX - 20} y={l.y + 2} textAnchor="end" fontSize={T.body + 2} fill={C.ink}>{l.name}</text>
            <text x={OX - 20} y={l.y + 24} textAnchor="end" fontSize={T.label} fill={"text" in l ? l.text : l.color} className="t-label">{l.tag}</text>
          </g>
        ))}
      </Show>

      <Show when={step >= 1}>
        <line x1={OX} y1={OY} x2={XEND} y2={OY} stroke={C.ink} strokeWidth={2} markerEnd="url(#ax-a)" />
        <text x={XEND - 20} y={OY - 18} textAnchor="end" fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>Implementation</text>
        {tools.map((t) => (
          <g key={t.name}>
            <line x1={t.x} y1={OY - 6} x2={t.x} y2={OY + 6} stroke={C.ink} strokeWidth={2} />
            <text x={t.x} y={OY + 30} textAnchor="middle" fontSize={T.body} fill={C.ink}>{t.name}</text>
            <text x={t.x} y={OY + 50} textAnchor="middle" fontSize={T.label} fill={C.muted} className="t-label">{t.sub}</text>
          </g>
        ))}
        {/* Each loop runs on whichever stack fits; the method does not change. */}
        {loops.map((l) =>
          tools.map((t) => <circle key={l.name + t.name} cx={t.x} cy={l.y} r={6} fill="none" stroke={l.color} strokeWidth={1.5} />),
        )}
        {loops.map((l) => <line key={l.name} x1={OX + 12} y1={l.y} x2={XEND - 30} y2={l.y} stroke={l.color} strokeWidth={1} strokeDasharray="3 6" />)}
      </Show>
    </Canvas>
  );
}
