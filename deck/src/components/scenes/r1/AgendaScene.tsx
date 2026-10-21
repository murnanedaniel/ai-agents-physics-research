"use client";

import { motion } from "motion/react";
import { SCENES, TOTAL_SEC, formatClock } from "@/lib/timeline";
import { C, Canvas, T, mono } from "./kit";

// Sessions and breaks are derived from the timeline, so the picture follows any re-timing.
// Each session lists what it covers, in the order of its scenes.
const bufferStart = SCENES.find((s) => s.id === "buffer")!.startSec;
const GROUPS = [
  { name: "Why agents", loop: 0, scenes: SCENES.filter((s) => s.part === "setup"),
    bullets: ["Examples", "How they work", "Failures", "Your setup"] },
  { name: "Inner loop", loop: 1, scenes: SCENES.filter((s) => s.part === "inner"),
    bullets: ["Galactic clustering", "Fine-tuning", "RANGE", "Hill-climbing"] },
  { name: "Middle loop", loop: 2, scenes: SCENES.filter((s) => s.part === "middle"),
    bullets: ["New universe", "Tracking", "Reviewers"] },
  { name: "Outer loop", loop: 3, scenes: SCENES.filter((s) => (s.part === "outer" || s.part === "close") && s.startSec < bufferStart),
    bullets: ["Research memory", "Collaboration", "Security"] },
  { name: "Hands-on", loop: -1, scenes: SCENES.filter((s) => s.startSec >= bufferStart),
    bullets: ["Audit a draft", "Write a check"] },
];
type Block = { name: string; start: number; end: number; kind: "session" | "break" | "buffer"; loop: number; bullets: string[] };
const sessions: Block[] = GROUPS.map((g) => ({
  name: g.name, loop: g.loop, bullets: g.bullets,
  start: g.scenes[0].startSec, end: Math.min(g.scenes.at(-1)!.endSec, TOTAL_SEC), kind: g.loop < 0 ? "buffer" : "session",
}));
const BLOCKS: Block[] = sessions.flatMap((s, i) => {
  const prev = sessions[i - 1];
  return prev && prev.end < s.start
    ? [{ name: s.start - prev.end >= 45 * 60 ? "lunch" : "coffee", start: prev.end, end: s.start, kind: "break" as const, loop: -1, bullets: [] }, s]
    : [s];
});

// Loop glyph: 1 to 3 nested rings, matching the inner, middle and outer loops.
function Rings({ n }: { n: number }) {
  return (
    <svg width="34" height="34" viewBox="-22 -22 44 44" aria-hidden style={{ flex: "none" }}>
      {[8, 14, 20].map((r, i) => (
        <circle key={r} r={r} fill="none" stroke={C.accent} strokeWidth={i < n ? 2.2 : 1} opacity={i < n ? 1 : 0.18} />
      ))}
    </svg>
  );
}

export function AgendaScene() {
  return (
    <Canvas style={{ justifyContent: "center" }}>
      <div style={{ display: "flex", gap: 6, width: "100%", alignItems: "stretch", height: "44vh" }} role="img" aria-label="The day from 09:00 to 17:00: four sessions and hands-on time, with coffee and lunch breaks, and what each session covers">
        {BLOCKS.map((b, i) => (
          b.kind === "break" ? (
            <motion.div
              key={b.start}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              style={{ flex: "0 0 2.6vw", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "#ebe4d7", padding: "12px 0" }}
            >
              <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, writingMode: "vertical-rl" }}>
                {formatClock(b.start)} {b.name}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key={b.start}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.12 }}
              style={{
                flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", gap: "2vh",
                background: b.kind === "session" ? "rgba(219,231,238,0.55)" : "repeating-linear-gradient(135deg, #f1ebdf, #f1ebdf 8px, #e9e2d5 8px, #e9e2d5 10px)",
                borderTop: `3px solid ${b.kind === "session" ? C.accent : C.faint}`, padding: "1.6vh 0.9vw",
              }}
            >
              <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>{formatClock(b.start)}</span>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontSize: T.body, lineHeight: 1.15 }}>{b.name}</span>
                {b.loop > 0 && <Rings n={b.loop} />}
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1.4vh" }}>
                {b.bullets.map((t, k) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.12 + k * 0.08 }}
                    style={{ fontSize: "clamp(18px, 1.45vw, 28px)", lineHeight: 1.2, color: C.ink, paddingLeft: 14, borderLeft: `2px solid ${b.kind === "session" ? C.accent : C.faint}` }}
                  >
                    {t}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )
        ))}
      </div>
    </Canvas>
  );
}
