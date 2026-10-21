"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { Area, D, MONO, SERIF, Show, T } from "./kit";

// eth-history: ported from the ETH deck's InnerLoopHistory (2 steps, unchanged
// structure). Step 0: the two papers slide in. Step 1: the 1988 → 1991 ribbon
// and the years counter (1988 to 2026 = 38).

const CARDS = [
  {
    heading: "Bruce Denby · 1988",
    body: "Neural networks and cellular automata in experimental high energy physics",
    footer: "Comp. Phys. Comm. 49, 429",
    side: "left" as const,
  },
  {
    heading: "Stimpfl-Abele & Garrido · 1991",
    body: "Fast track finding with neural networks",
    footer: "Comp. Phys. Comm. 64, 46 · ALEPH TPC at LEP",
    side: "right" as const,
  },
];

function YearsCounter({ run }: { run: boolean }) {
  const mv = useMotionValue(0);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) {
      mv.set(0);
      return;
    }
    const controls = animate(mv, 38, { duration: 1.5, ease: [0.2, 0.8, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [run, mv]);
  return <span style={{ fontFamily: MONO, color: D.ink, fontVariantNumeric: "tabular-nums", ...T.huge }}>{run ? n : 38}</span>;
}

export function InnerLoopHistory({ step }: { step: number }) {
  return (
    <Area style={{ display: "grid", gridTemplateRows: "auto 1fr auto", rowGap: "3vh", justifyItems: "center", paddingBottom: "3vh" }}>
      <div style={{ ...T.big, ...T.serif, color: D.soft, justifySelf: "start" }}>None of this is new.</div>

      {/* card | ribbon | card: the ribbon has its own column, so it never covers card text */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", columnGap: "1.5vw", alignItems: "stretch", width: "100%", maxWidth: 1200, alignSelf: "center" }}>
        {CARDS.map((c, i) => (
          <motion.div
            key={c.heading}
            initial={{ opacity: 0, x: c.side === "left" ? -60 : 60 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.25 + i * 0.25 } }}
            style={{ gridColumn: c.side === "left" ? 1 : 3, gridRow: 1, justifySelf: c.side === "left" ? "end" : "start", width: "min(100%, 30vw)", minHeight: "26vh", display: "flex", flexDirection: "column", gap: "1.5vh", padding: "2.4vh 1.6vw", borderRadius: 6, border: `1px solid ${D.rule}`, background: D.card, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)" }}
          >
            <div style={{ fontFamily: SERIF, fontStyle: "italic", color: D.ink, ...T.big }}>{c.heading}</div>
            <div style={{ ...T.body, color: D.body }}>{c.body}</div>
            <div className="t-label" style={{ marginTop: "auto", fontFamily: MONO, ...T.label, color: D.faint }}>{c.footer}</div>
          </motion.div>
        ))}
        <motion.div
          data-reveal
          aria-hidden={step < 1}
          initial={false}
          animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.9 }}
          transition={{ duration: 0.6 }}
          className="t-label"
          style={{ gridColumn: 2, gridRow: 1, alignSelf: "center", fontFamily: MONO, ...T.label, letterSpacing: "0.2em", color: D.body, padding: "0.4em 0.9em", border: `1px solid ${D.rule}`, borderRadius: 3, background: "rgba(24,24,27,0.9)", whiteSpace: "nowrap" }}
        >
          1988 → 1991
        </motion.div>
      </div>

      <Show when={step >= 1} delay={0.2} style={{ display: "flex", alignItems: "baseline", gap: "1vw" }}>
        <YearsCounter run={step >= 1} />
        <span style={{ ...T.body, fontFamily: MONO, letterSpacing: "0.2em", textTransform: "uppercase", color: D.muted }}>years</span>
      </Show>
    </Area>
  );
}
