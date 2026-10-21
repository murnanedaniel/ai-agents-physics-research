"use client";

import { motion } from "motion/react";
import { C, Canvas, T, mono, serif, stop } from "./kit";

// Section scene: seven things agents did in Daniel's work in 2026, sorted by loop.
// Step 0 names the three loops; steps 1 to 3 light one loop each, in the order the examples follow.
// Each card deep-links to its first example scene.
const COLUMNS = [
  { head: "Inner loop", sub: "one experiment", items: [
    { id: "ex-trackfit", name: "Track fitting", when: "Apr 2026" },
    { id: "ex-pandora", name: "Pandora speed-up", when: "May 2026" },
    { id: "ex-hep4m", name: "HEP4M model", when: "Aug to Sep 2026" },
  ] },
  { head: "Middle loop", sub: "a paper or a proposal", items: [
    { id: "ex-erc", name: "ERC proposal", when: "Oct 2026" },
  ] },
  { head: "Outer loop", sub: "a programme", items: [
    { id: "ex-chatlas", name: "chATLAS", when: "2024 to 2026" },
    { id: "ex-hamlet", name: "HAMLET app", when: "Aug 2026" },
    { id: "ex-sciencedash", name: "ScienceDash", when: "Apr to Oct 2026" },
  ] },
];

export function PossibleScene({ step }: { step: number }) {
  return (
    <Canvas style={{ justifyContent: "center", gap: "4vh" }}>
      <p style={{ fontSize: T.body, lineHeight: 1.35, color: C.ink, maxWidth: "52em", margin: 0 }}>
        Seven things agents did in my work this year.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2.4vw", alignItems: "start" }}>
        {COLUMNS.map((col, ci) => {
          const lit = step >= ci + 1;
          return (
            <div key={col.head} style={{ display: "flex", flexDirection: "column", gap: "1.6vh" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: `2px solid ${C.accent}`, paddingBottom: 10 }}>
                <svg width="40" height="40" viewBox="-20 -20 40 40" aria-hidden style={{ flex: "none" }}>
                  {[7, 12.5, 18].map((r, i) => (
                    <circle key={r} r={r} fill="none" stroke={C.accent} strokeWidth={i === ci ? 2.6 : 1} opacity={i === ci ? 1 : 0.25} />
                  ))}
                </svg>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: T.body, fontStyle: "italic", fontFamily: serif }}>{col.head}</span>
                  <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>{col.sub}</span>
                </span>
              </div>
              {col.items.map((it, ii) => (
                <motion.a
                  key={it.id}
                  href={`?scene=${it.id}`}
                  onClick={stop}
                  onKeyDown={stop}
                  data-reveal={ci + 1}
                  {...(!lit ? { "data-dim": "" } : {})}
                  aria-hidden={!lit}
                  tabIndex={lit ? 0 : -1}
                  initial={false}
                  animate={{ opacity: lit ? 1 : 0.05, y: lit ? 0 : 6 }}
                  transition={{ duration: 0.55, delay: lit ? ii * 0.12 : 0 }}
                  style={{
                    display: "flex", flexDirection: "column", gap: 4, padding: "12px 16px", borderRadius: 10,
                    background: C.card, border: `1px solid ${C.rule}`, color: C.ink, textDecoration: "none", cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: T.body, lineHeight: 1.2 }}>{it.name}</span>
                  <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>{it.when}</span>
                </motion.a>
              ))}
            </div>
          );
        })}
      </div>
    </Canvas>
  );
}
