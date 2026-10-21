"use client";

import { motion } from "motion/react";
import { C, Canvas, Label, Reveal, T } from "./ui";

// excalidraw. Step 0: a hand sketch in Excalidraw. Step 1: through an MCP server
// the agent reads the sketch and draws back, here the clean version of it.
// Left: a hand sketch of the day's three loops, as drawn on a whiteboard.
// Right: the same idea as a clean diagram, built from the sketch.
const LOOPS = [
  { rx: 80, ry: 46, label: "experiment", ly: 8 },
  { rx: 155, ry: 98, label: "paper", ly: -64 },
  { rx: 230, ry: 150, label: "programme", ly: -118 },
];

// A wobbly closed ellipse: deterministic, so screenshots are stable.
function rough(cx: number, cy: number, rx: number, ry: number, seed: number) {
  const pts: string[] = [];
  const n = 64;
  for (let k = 0; k <= n + 3; k++) {
    const a = (k / n) * Math.PI * 2 + seed * 0.3;
    const w = 1 + 0.03 * Math.sin(k * 0.45 + seed) + 0.015 * Math.cos(k * 1.3 + seed * 2);
    pts.push(`${(cx + rx * w * Math.cos(a)).toFixed(1)},${(cy + ry * w * Math.sin(a)).toFixed(1)}`);
  }
  return `M ${pts[0]} L ${pts.slice(1).join(" ")}`;
}

const CX = 250, CY = 190;

export function ExcalidrawScene({ step }: { step: number }) {
  const built = step >= 1;
  return (
    <Canvas style={{ gap: "2vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 15vw 1fr", alignItems: "center", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2vh" }}>
          <svg viewBox="0 0 500 380" width="100%" style={{ maxHeight: "50vh" }} role="img" aria-label="A hand sketch of three nested loops">
            {LOOPS.map((l, i) => (
              <g key={l.label}>
                <path d={rough(CX, CY, l.rx, l.ry, i + 1)} fill="none" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d={rough(CX + 2, CY - 1, l.rx + 3, l.ry - 2, i + 4)} fill="none" stroke={C.ink} strokeWidth="1.2" opacity="0.55" />
                <text x={CX + 6} y={CY + l.ly} textAnchor="middle" fontSize="26" fill={C.ink}
                  style={{ fontFamily: "var(--font-serif), Georgia, serif", fontStyle: "italic" }} transform={`rotate(${[-4, 3, -2][i]} ${CX} ${CY + l.ly})`}>
                  {l.label}
                </text>
              </g>
            ))}
          </svg>
          <Label>My sketch in Excalidraw</Label>
        </div>

        <Reveal at={1} step={step} dimTo={0} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1vh" }}>
          <svg viewBox="0 0 120 40" width="100%" aria-hidden>
            <motion.path d="M 6 20 H 104" stroke={C.accent} strokeWidth="3" fill="none" initial={false} animate={{ pathLength: built ? 1 : 0 }} transition={{ duration: 0.6 }} />
            <path d="M 98 10 L 112 20 L 98 30" stroke={C.accent} strokeWidth="3" fill="none" />
            <path d="M 20 10 L 6 20 L 20 30" stroke={C.accent} strokeWidth="3" fill="none" />
          </svg>
          <span style={{ fontSize: T.body, color: C.accent, textAlign: "center", lineHeight: 1.2 }}>via an Excalidraw MCP server, the agent reads and draws</span>
        </Reveal>

        <Reveal at={1} step={step} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2vh" }}>
          <svg viewBox="0 0 500 380" width="100%" style={{ maxHeight: "50vh" }} role="img" aria-label="The same three loops as a clean diagram">
            {LOOPS.slice().reverse().map((l, j) => {
              const i = LOOPS.length - 1 - j;
              return (
                <g key={l.label}>
                  <ellipse cx={CX} cy={CY} rx={l.rx} ry={l.ry} fill={C.accent} fillOpacity={0.06 + 0.05 * (2 - i)} stroke={C.accent} strokeWidth="2" />
                  <text x={CX} y={CY + l.ly} textAnchor="middle" fontSize="24" fill={C.ink}>{l.label}</text>
                </g>
              );
            })}
          </svg>
          <Label>The agent&apos;s clean version</Label>
        </Reveal>
      </div>
      <span style={{ fontSize: T.body, color: C.muted }}>Excalidraw: a free, open-source whiteboard with a hand-drawn look.</span>
    </Canvas>
  );
}
