"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Area, C, G, Show, T } from "../r11/kit";

// excalidraw. A claude.ai chat with the official Excalidraw connector
// (https://mcp.excalidraw.com/mcp, in the Claude connector directory since Feb 2026).
// Step 0: you ask for a sketch and Claude draws it inline, as an editable Excalidraw view.
// Step 1: you edit it full screen; the app passes your edit back to Claude
// (excalidraw-mcp src/edit-context.ts: "User edited diagram ... Added ..."), which carries on.
// Step 2: why it helps, and how to turn it on.

const HAND = { fontFamily: "var(--font-serif), Georgia, serif", fontStyle: "italic" } as const;

// Deterministic wobble, so screenshots are stable.
const wob = (k: number, seed: number) => Math.sin(k * 12.9898 + seed * 78.233) * 1.6;

// One hand-drawn stroke from (x1,y1) to (x2,y2): slight overshoot and a bow.
function stroke(x1: number, y1: number, x2: number, y2: number, seed: number) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  const ox = (dx / len) * 3, oy = (dy / len) * 3;
  const mx = (x1 + x2) / 2 + wob(1, seed) - (dy / len) * wob(2, seed);
  const my = (y1 + y2) / 2 + wob(3, seed) + (dx / len) * wob(4, seed);
  return `M ${(x1 - ox + wob(5, seed)).toFixed(1)} ${(y1 - oy + wob(6, seed)).toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${(x2 + ox).toFixed(1)} ${(y2 + oy).toFixed(1)}`;
}

function RoughBox({ x, y, w, h, seed, label, colour = C.ink, fill = "none" }: { x: number; y: number; w: number; h: number; seed: number; label: string; colour?: string; fill?: string }) {
  const sides = (s: number) => [stroke(x, y, x + w, y, s), stroke(x + w, y, x + w, y + h, s + 1), stroke(x + w, y + h, x, y + h, s + 2), stroke(x, y + h, x, y, s + 3)].join(" ");
  return (
    <g>
      <rect x={x + 2} y={y + 2} width={w - 4} height={h - 4} fill={fill} rx="6" />
      <path d={sides(seed)} fill="none" stroke={colour} strokeWidth="2.2" strokeLinecap="round" />
      <path d={sides(seed + 7)} fill="none" stroke={colour} strokeWidth="1.1" opacity="0.5" strokeLinecap="round" />
      <text x={x + w / 2} y={y + h / 2 + 8} textAnchor="middle" fontSize="24" fill={colour} style={HAND}>{label}</text>
    </g>
  );
}

function RoughArrow({ x1, y1, x2, y2, seed, colour = C.ink }: { x1: number; y1: number; x2: number; y2: number; seed: number; colour?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1), s = 13;
  const h1 = `${(x2 - s * Math.cos(a - 0.45)).toFixed(1)} ${(y2 - s * Math.sin(a - 0.45)).toFixed(1)}`;
  const h2 = `${(x2 - s * Math.cos(a + 0.45)).toFixed(1)} ${(y2 - s * Math.sin(a + 0.45)).toFixed(1)}`;
  return (
    <g fill="none" stroke={colour} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={stroke(x1, y1, x2, y2, seed)} />
      <path d={`M ${h1} L ${x2} ${y2} L ${h2}`} />
    </g>
  );
}

// The pipeline Claude draws, then the box and arrows you add.
const BH = 64, Y0 = 50, MID = Y0 + BH / 2;
const BOXES = [
  { x: 15, w: 160, label: "detector hits" },
  { x: 225, w: 160, label: "build graph" },
  { x: 435, w: 200, label: "GNN scores edges" },
  { x: 685, w: 150, label: "fit tracks" },
];
const NEW = { x: 560, y: 180, w: 180, label: "cut on score" };

function Sketch({ edited }: { edited: boolean }) {
  return (
    <svg viewBox="0 0 850 280" className="w-full" style={{ maxHeight: "34vh" }} role="img"
      aria-label={edited ? "Hand-drawn pipeline from detector hits to fitted tracks, with a new box, cut on score, added between the GNN and the fit" : "Hand-drawn pipeline: detector hits, build graph, GNN scores edges, fit tracks"}>
      {BOXES.map((b, i) => (
        <RoughBox key={b.label} x={b.x} y={Y0} w={b.w} h={BH} seed={i * 11 + 1} label={b.label} fill={i === 2 ? "rgba(3,105,161,0.07)" : "none"} />
      ))}
      {[0, 1].map((i) => (
        <RoughArrow key={i} x1={BOXES[i].x + BOXES[i].w + 8} y1={MID} x2={BOXES[i + 1].x - 8} y2={MID} seed={3 + 2 * i} />
      ))}
      {/* GNN -> fit: the direct arrow, faded once you route it through your cut */}
      <motion.g initial={false} animate={{ opacity: edited ? 0.18 : 1 }} transition={{ duration: 0.6 }}>
        <RoughArrow x1={BOXES[2].x + BOXES[2].w + 8} y1={MID} x2={BOXES[3].x - 8} y2={MID} seed={9} />
      </motion.g>
      <G when={edited} delay={0.2}>
        <RoughBox x={NEW.x} y={NEW.y} w={NEW.w} h={BH} seed={40} label={NEW.label} colour={C.warm} fill="rgba(154,74,11,0.06)" />
        <RoughArrow x1={560} y1={Y0 + BH + 8} x2={600} y2={NEW.y - 8} seed={21} colour={C.warm} />
        <RoughArrow x1={720} y1={NEW.y - 8} x2={760} y2={Y0 + BH + 8} seed={23} colour={C.warm} />
        {/* your pointer, dropping the new box */}
        <path d="M 752 226 l 0 30 l 8 -8 l 6 14 l 5 -2 l -6 -14 l 11 0 z" fill={C.paper} stroke={C.ink} strokeWidth="1.6" strokeLinejoin="round" />
      </G>
    </svg>
  );
}

function Bubble({ who, children, align = "left" }: { who: string; children: ReactNode; align?: "left" | "right" }) {
  return (
    <div className="flex flex-col" style={{ alignItems: align === "right" ? "flex-end" : "flex-start", gap: "0.3vh" }}>
      <span className="t-label" style={{ ...T.label, ...T.mono, color: C.faint }}>{who}</span>
      <div style={{ ...T.body, color: C.ink, background: align === "right" ? "#ece5d6" : "transparent", borderRadius: 14, padding: align === "right" ? "0.5em 0.9em" : "0 0.1em", maxWidth: "92%" }}>
        {children}
      </div>
    </div>
  );
}

export function ExcalidrawChat({ step }: { step: number }) {
  const edited = step >= 1;
  return (
    <Area style={{ flexDirection: "row", gap: "3vw", alignItems: "stretch" }}>
      {/* the claude.ai chat */}
      <div className="flex min-w-0 flex-col" style={{ flex: "0 0 60%", background: C.card, border: `1px solid ${C.rule}`, borderRadius: 18, padding: "1.6vh 1.6vw", gap: "1.4vh", boxShadow: "0 6px 24px rgba(20,20,20,0.06)" }}>
        <span className="t-label" style={{ ...T.label, ...T.mono, color: C.muted, borderBottom: `1px solid ${C.rule}`, paddingBottom: "0.8vh" }}>claude.ai · Excalidraw connector on</span>
        <Bubble who="you" align="right">Sketch our pipeline, from detector hits to fitted tracks.</Bubble>
        <div className="flex flex-col" style={{ gap: "0.6vh" }}>
          <span className="t-label" style={{ ...T.label, ...T.mono, color: C.faint }}>Claude</span>
          <div style={{ background: "#fff", border: `1px solid ${C.rule}`, borderRadius: 12, padding: "1vh 1vw" }}>
            <div className="flex items-center justify-between" style={{ marginBottom: "0.4vh" }}>
              <span className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>Excalidraw</span>
              <span className="t-label" style={{ ...T.label, ...T.mono, color: edited ? C.warm : C.muted }}>{edited ? "edited by you" : "⤢ full screen"}</span>
            </div>
            <Sketch edited={edited} />
          </div>
        </div>
        <Show when={edited} delay={0.6}>
          <Bubble who="Claude">I see your new step: a cut on the GNN score before the fit. I&apos;ll add a threshold scan to the plan.</Bubble>
        </Show>
      </div>

      {/* what is happening, then why and how */}
      <div className="relative flex-1" style={{ ...T.body, color: C.ink }}>
        <Show when={step === 0} className="absolute inset-x-0" style={{ top: "30%" }}>
          Describe an idea and Claude draws it right in the chat. It is a real Excalidraw sketch, so every box can be edited.
        </Show>
        <Show when={step === 1} className="absolute inset-x-0" style={{ top: "30%" }}>
          Open it full screen, add a box, move an arrow. Claude gets your edit back and carries on from your version.
        </Show>
        <Show when={step >= 2} className="absolute inset-x-0 flex flex-col" style={{ top: "12%", gap: "3vh" }}>
          <span>Agree the picture before anyone builds anything. Then export it to excalidraw.com for a talk or a paper.</span>
          <span style={{ color: C.accent }}>Turn it on: claude.ai → Connectors → Excalidraw. Nothing to install, no sign-in.</span>
        </Show>
      </div>
    </Area>
  );
}
