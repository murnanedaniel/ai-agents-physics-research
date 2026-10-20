"use client";

import { C, Canvas, SERIF, Show, T } from "./kit";

const layers = [
  { name: "Models & harnesses", color: C.accent, fill: "#e3eef5", chips: ["Claude: drafts, specs", "Codex: reviews, builds", "Open models: to test"], note: "complementary, not ranked" },
  { name: "Hardware & environments", color: C.warm, fill: "#f6e8d8", chips: ["Laptop", "Home server", "HPC cluster"], note: "joined by remote-control sessions" },
  { name: "Middleware & practices", color: C.violet, fill: "#ede6fa", chips: ["Skills", "Domain context", "Structured data"], note: "query, delegate, validate, interrogate" },
];

const X = 40, W = 1070, H = 120, GAP = 22, BASE = 525;

// Three layers, built from the bottom up, one per step.
export function StackLayers({ step }: { step: number }) {
  return (
    <Canvas>
      {layers.map((l, i) => {
        const y = BASE - (i + 1) * H - i * GAP;
        return (
          <Show key={l.name} when={step >= i}>
            <rect x={X + 8} y={y + 8} width={W} height={H} rx={14} fill={l.color} opacity={0.18} />
            <rect x={X} y={y} width={W} height={H} rx={14} fill={l.fill} stroke={l.color} strokeWidth={1.5} />
            <text x={X + 32} y={y + H / 2 + 10} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 6} fill={C.ink}>{l.name}</text>
            {l.chips.map((c, k) => {
              const cw = 205, cx = X + 410 + k * (cw + 14);
              return (
                <g key={c}>
                  <rect x={cx} y={y + H / 2 - 24} width={cw} height={48} rx={24} fill="#fbf8f2" stroke={l.color} strokeWidth={1.2} />
                  <text x={cx + cw / 2} y={y + H / 2 + 7} textAnchor="middle" fontSize={T.small + 2} fill={C.ink} className="t-label">{c}</text>
                </g>
              );
            })}
            {l.note && <text x={X + W - 16} y={y + H - 10} textAnchor="end" fontSize={T.label} fill={C.muted} className="t-label">{l.note}</text>}
          </Show>
        );
      })}
    </Canvas>
  );
}
