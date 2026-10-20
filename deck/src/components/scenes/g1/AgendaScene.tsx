"use client";

import { motion } from "motion/react";
import { SCENES, TOTAL_SEC, formatClock } from "@/lib/timeline";
import { C, Canvas, T, mono } from "./kit";

// Sessions and breaks are derived from the timeline, so the picture follows any re-timing.
const bufferStart = SCENES.find((s) => s.id === "buffer")!.startSec;
const GROUPS = [
  { name: "Why agents", loop: 0, scenes: SCENES.filter((s) => s.part === "setup") },
  { name: "Inner loop", loop: 1, scenes: SCENES.filter((s) => s.part === "inner") },
  { name: "Middle loop", loop: 2, scenes: SCENES.filter((s) => s.part === "middle") },
  { name: "Outer loop", loop: 3, scenes: SCENES.filter((s) => (s.part === "outer" || s.part === "close") && s.startSec < bufferStart) },
  { name: "Questions and hands-on", loop: -1, scenes: SCENES.filter((s) => s.startSec >= bufferStart) },
];
type Block = { name: string; start: number; end: number; kind: "session" | "break" | "buffer"; loop: number };
const sessions: Block[] = GROUPS.map((g) => ({
  name: g.name, loop: g.loop, start: g.scenes[0].startSec, end: Math.min(g.scenes.at(-1)!.endSec, TOTAL_SEC), kind: g.loop < 0 ? "buffer" : "session",
}));
const BLOCKS: Block[] = sessions.flatMap((s, i) => {
  const prev = sessions[i - 1];
  return prev && prev.end < s.start
    ? [{ name: s.start - prev.end >= 45 * 60 ? "lunch" : "coffee", start: prev.end, end: s.start, kind: "break" as const, loop: -1 }, s]
    : [s];
});
const DAY_END = BLOCKS.at(-1)!.end;
const HOURS = Array.from({ length: Math.floor(DAY_END / 3600) + 1 }, (_, h) => h * 3600);
const pct = (sec: number) => `${(sec / DAY_END) * 100}%`;

// Loop glyph: 1 to 3 nested rings, matching the inner, middle and outer loops.
function Rings({ n }: { n: number }) {
  return (
    <svg width="44" height="44" viewBox="-22 -22 44 44" aria-hidden>
      {[8, 14, 20].map((r, i) => (
        <circle key={r} r={r} fill="none" stroke={C.accent} strokeWidth={i < n ? 2 : 1} opacity={i < n ? 1 : 0.18} />
      ))}
    </svg>
  );
}

export function AgendaScene() {
  return (
    <Canvas style={{ justifyContent: "center" }}>
      <div style={{ position: "relative", width: "100%" }} role="img" aria-label="The day from 09:00 to 17:00: four sessions with coffee and lunch breaks">
        <div style={{ display: "flex", height: "34vh", gap: 3 }}>
          {BLOCKS.map((b, i) => (
            <motion.div
              key={b.start}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              style={{
                flex: b.end - b.start,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: b.kind === "break" ? "12px 0" : "14px 12px",
                alignItems: b.kind === "break" ? "center" : "flex-start",
                background:
                  b.kind === "session" ? "#dbe7ee" : b.kind === "buffer"
                    ? "repeating-linear-gradient(135deg, #ece5d8, #ece5d8 8px, #e3dccf 8px, #e3dccf 10px)"
                    : "#ebe4d7",
                borderTop: b.kind === "session" ? `3px solid ${C.accent}` : "3px solid transparent",
              }}
            >
              {b.kind === "break" ? (
                <span className="t-label" style={{ writingMode: "vertical-rl", fontFamily: mono, fontSize: T.label, color: C.muted }}>{b.name}</span>
              ) : (
                <>
                  <span style={{ fontSize: T.body, lineHeight: 1.15 }}>{b.name}</span>
                  {b.loop > 0 ? <Rings n={b.loop} /> : <span />}
                </>
              )}
            </motion.div>
          ))}
        </div>
        <div style={{ position: "relative", height: 34, marginTop: 8 }}>
          {HOURS.map((h) => (
            <span
              key={h}
              className="t-label"
              style={{ position: "absolute", left: pct(h), transform: h === 0 ? "none" : h >= DAY_END ? "translateX(-100%)" : "translateX(-50%)", fontFamily: mono, fontSize: T.label, color: C.muted }}
            >
              {formatClock(h)}
            </span>
          ))}
        </div>
      </div>
    </Canvas>
  );
}
