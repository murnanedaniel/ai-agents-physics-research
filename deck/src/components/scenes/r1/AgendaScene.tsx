"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import * as BEATS from "@/content/beats";
import { SCENES, TOTAL_SEC, formatClock } from "@/lib/timeline";
import { C, Canvas, T, mono, stop } from "./kit";

// Sessions and breaks are derived from the timeline, so the picture follows any re-timing.
// Each session lists what it covers. Clicking a session opens the full list of its scenes
// (current beat titles, each a link); clicking again or on the panel closes it.
const bufferStart = SCENES.find((s) => s.id === "buffer")!.startSec;
const GROUPS = [
  { name: "Why agents", loop: 0, scenes: SCENES.filter((s) => s.part === "setup"),
    bullets: ["Examples", "How agents work", "Your setup"] },
  { name: "Inner loop", loop: 1, scenes: SCENES.filter((s) => s.part === "inner"),
    bullets: ["Galactic clustering", "Fine-tuning", "RANGE", "Hill-climbing"] },
  { name: "Middle loop", loop: 2, scenes: SCENES.filter((s) => s.part === "middle"),
    bullets: ["New universe", "Tracking", "Automation"] },
  { name: "Outer loop", loop: 3, scenes: SCENES.filter((s) => s.part === "outer"),
    bullets: ["Memory", "Collaboration", "Looking ahead"] },
  { name: "Wrap-up", loop: 0, scenes: SCENES.filter((s) => s.part === "close" && s.startSec < bufferStart),
    bullets: ["Results", "Limiting harm"] },
  { name: "Hands-on", loop: -1, scenes: SCENES.filter((s) => s.startSec >= bufferStart),
    bullets: ["Audits", "Checks"] },
];
type Block = { name: string; start: number; end: number; kind: "session" | "break" | "buffer"; loop: number; bullets: string[]; ids: string[] };
const sessions: Block[] = GROUPS.map((g) => ({
  name: g.name, loop: g.loop, bullets: g.bullets, ids: g.scenes.map((s) => s.id),
  start: g.scenes[0].startSec, end: Math.min(g.scenes.at(-1)!.endSec, TOTAL_SEC), kind: g.loop < 0 ? "buffer" : "session",
}));
const BLOCKS: Block[] = sessions.flatMap((s, i) => {
  const prev = sessions[i - 1];
  return prev && prev.end < s.start
    ? [{ name: s.start - prev.end >= 45 * 60 ? "lunch" : "coffee", start: prev.end, end: s.start, kind: "break" as const, loop: -1, bullets: [], ids: [] }, s]
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

const titleOf = (id: string) => (BEATS as Record<string, { title: string } | undefined>)[id]?.title ?? id;

export function AgendaScene() {
  const [open, setOpen] = useState<number | null>(null);
  const shown = open == null ? null : BLOCKS[open];
  return (
    <Canvas style={{ justifyContent: "center" }}>
      <div style={{ position: "relative", display: "flex", gap: 6, width: "100%", alignItems: "stretch", height: "44vh" }} aria-label="The day from 09:00 to 17:00: sessions and hands-on time, with coffee and lunch breaks; click a session to list its scenes">
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
            <motion.button
              type="button"
              key={b.start}
              aria-expanded={open === i}
              onClick={(e) => { stop(e); setOpen(open === i ? null : i); }}
              onKeyDown={stop}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.12 }}
              style={{
                flex: "1 1 0", minWidth: 0, display: "flex", textAlign: "left", font: "inherit", border: "none", color: C.ink, cursor: "pointer", flexDirection: "column", gap: "2vh",
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
              <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, marginTop: "auto" }}>{open === i ? "close" : `${b.ids.length} scenes ▸`}</span>
            </motion.button>
          )
        ))}
        <AnimatePresence>
          {shown && (
            <motion.div
              key={shown.start}
              onClick={(e) => { stop(e); setOpen(null); }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: "absolute", left: 0, right: 0, top: "-6vh", bottom: "-14vh", background: "#fffdf8", border: `1px solid ${C.accent}`, borderTop: `3px solid ${C.accent}`, borderRadius: 6, padding: "1.8vh 1.4vw", display: "flex", flexDirection: "column", gap: "1.4vh", boxShadow: "0 18px 40px -20px rgba(20,20,20,0.35)", zIndex: 2 }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <span style={{ fontSize: T.body }}>{shown.name}</span>
                <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>{formatClock(shown.start)} to {formatClock(shown.end)} · click a scene to jump, anywhere else to close</span>
              </div>
              <ol style={{ margin: 0, padding: 0, listStyle: "none", columnCount: shown.ids.length > 30 ? 4 : shown.ids.length > 12 ? 3 : 2, columnGap: "2vw", flex: 1, minHeight: 0, overflow: "hidden" }}>
                {shown.ids.map((id) => (
                  <li key={id} style={{ breakInside: "avoid", padding: "1px 0" }}>
                    <a href={`?scene=${id}`} onClick={stop} className="t-label" style={{ display: "block", fontSize: "clamp(12px, 0.95vw, 18px)", color: C.ink, textDecoration: "none", lineHeight: 1.25 }}>{titleOf(id)}</a>
                  </li>
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Canvas>
  );
}
