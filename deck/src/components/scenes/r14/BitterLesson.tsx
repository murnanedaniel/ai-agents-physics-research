"use client";

import { motion } from "motion/react";
import { Area, C, Show, T } from "../r11/kit";

// bitter-lesson: Sutton's essay (13 Mar 2019), the trade-off as a schematic,
// and the four cases he cites. Quotes are verbatim from
// incompleteideas.net/IncIdeas/BitterLesson.html (Wayback copy, 21 Oct 2026).
// Notes: agentic-course-kit-main/notes/round2/BITTER-LESSON-RESEARCH.md
const SANS = "var(--font-geist-sans), system-ui, sans-serif";
const MONO = "var(--font-geist-mono), monospace";

// Schematic curves, t in [0, 1] along log compute. Not data.
const X0 = 40, XW = 500, Y0 = 266, YH = 240;
const known = (t: number) => 0.3 + 0.32 * (1 - Math.exp(-5 * t));
const general = (t: number) => 0.08 + 0.85 * t ** 1.6;
const px = (t: number) => X0 + t * XW;
const py = (v: number) => Y0 - v * YH;
const path = (f: (t: number) => number) =>
  Array.from({ length: 41 }, (_, j) => j / 40).map((t, j) => `${j ? "L" : "M"} ${px(t).toFixed(1)} ${py(f(t)).toFixed(1)}`).join(" ");
const CROSS = 0.745;

const CASES = [
  { d: "Chess", built: "human chess knowledge", won: "deep search, 1997" },
  { d: "Go", built: "human Go knowledge", won: "search and self-play" },
  { d: "Speech", built: "phonemes, the vocal tract", won: "statistics, then deep nets" },
  { d: "Vision", built: "edges, SIFT features", won: "convolutional networks" },
];

export function BitterLesson({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "3.5vh" }}>
      <div>
        <div style={{ ...T.big, ...T.serif, color: C.ink, maxWidth: "62em" }}>
          “The biggest lesson that can be read from 70 years of AI research is that general methods that leverage computation are ultimately the most effective, and by a large margin.”
        </div>
        <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted, marginTop: 8 }}>Rich Sutton, “The Bitter Lesson”, 13 March 2019</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4vw", alignItems: "center" }}>
        <Show when={step >= 1}>
          <svg viewBox="0 0 560 300" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Schematic: the approach with domain knowledge built in leads at low compute and plateaus; the general method starts lower and overtakes it as compute grows">
            <line x1={X0} y1={Y0} x2={X0 + XW} y2={Y0} stroke={C.ink} strokeWidth="1.5" />
            <line x1={X0} y1={Y0} x2={X0} y2={Y0 - YH - 10} stroke={C.ink} strokeWidth="1.5" />
            <text className="t-label" x={X0 + XW} y={Y0 + 26} textAnchor="end" fill={C.muted} fontSize="17" fontFamily={MONO}>compute (log) →</text>
            <text className="t-label" x={X0 + 8} y={Y0 - YH - 2} fill={C.muted} fontSize="17" fontFamily={MONO}>performance</text>
            <motion.path d={path(known)} fill="none" stroke={C.warm} strokeWidth="4" initial={false} animate={{ pathLength: step >= 1 ? 1 : 0 }} transition={{ duration: 1.1 }} />
            <motion.path d={path(general)} fill="none" stroke={C.accent} strokeWidth="4" initial={false} animate={{ pathLength: step >= 1 ? 1 : 0 }} transition={{ duration: 1.4, delay: 0.3 }} />
            <text x={px(0.02)} y={py(known(0.3)) - 34} fill={C.warm} fontSize="21" fontFamily={SANS}>domain knowledge built in</text>
            <text x={px(1)} y={Y0 - 92} textAnchor="end" fill={C.accent} fontSize="21" fontFamily={SANS}>general method</text>
            <text x={px(1)} y={Y0 - 66} textAnchor="end" fill={C.accent} fontSize="21" fontFamily={SANS}>+ more compute</text>
            <circle cx={px(CROSS)} cy={py(general(CROSS))} r="6" fill={C.paper} stroke={C.ink} strokeWidth="2" />
            <text className="t-label" x={X0 + XW} y={Y0 - 10} textAnchor="end" fill={C.faint} fontSize="16" fontFamily={MONO}>schematic, not data</text>
          </svg>
          <div style={{ ...T.body, ...T.serif, color: C.ink, marginTop: 10 }}>“Time spent on one is time not spent on the other.”</div>
        </Show>

        <Show when={step >= 2}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr", columnGap: "1.4vw", rowGap: "1.6vh", alignItems: "baseline" }}>
            <span />
            <span className="t-label" style={{ ...T.label, ...T.mono, color: C.warm }}>built in</span>
            <span className="t-label" style={{ ...T.label, ...T.mono, color: C.accent }}>what won</span>
            {CASES.map((c) => (
              <div key={c.d} style={{ display: "contents" }}>
                <span style={{ ...T.body, color: C.ink, fontWeight: 600 }}>{c.d}</span>
                <span style={{ ...T.body, color: C.muted }}>{c.built}</span>
                <span style={{ ...T.body, color: C.ink }}>{c.won}</span>
              </div>
            ))}
            <span />
            <span className="t-label" style={{ ...T.label, ...T.mono, color: C.muted, gridColumn: "2 / 4" }}>Sutton’s cases. Even the vision winners keep convolution and “certain kinds of invariances”.</span>
          </div>
        </Show>
      </div>
    </Area>
  );
}
