"use client";

import { motion } from "motion/react";
import { C, Canvas, T, mono, stop } from "./kit";

// Seven things agents did in Daniel's work in 2026, by the size of the job.
// Each card deep-links to its example scene.
const COLUMNS = [
  { head: "a task", items: [
    { id: "ex-pandora", name: "Pandora speed-up", when: "May 2026" },
    { id: "ex-chatlas", name: "ChATLAS search", when: "2024 to 2026" },
  ] },
  { head: "a paper", items: [
    { id: "ex-trackfit", name: "Track-fitting paper", when: "Apr 2026" },
    { id: "ex-hep4m", name: "HEP4M paper", when: "Aug to Sep 2026" },
  ] },
  { head: "a programme", items: [
    { id: "ex-erc", name: "ERC grant", when: "Oct 2026" },
    { id: "ex-hamlet", name: "HAMLET conference app", when: "Aug 2026" },
    { id: "ex-sciencedash", name: "ScienceDash", when: "Apr to Oct 2026" },
  ] },
];

export function PossibleScene({ step }: { step: number }) {
  return (
    <Canvas style={{ justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2.4vw", alignItems: "start" }}>
        {COLUMNS.map((col, ci) => {
          const lit = step >= ci + 1;
          return (
            <div key={col.head} style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: `2px solid ${C.accent}`, paddingBottom: 10 }}>
                <svg width="40" height="40" viewBox="-20 -20 40 40" aria-hidden>
                  {[7, 12.5, 18].map((r, i) => (
                    <circle key={r} r={r} fill="none" stroke={C.accent} strokeWidth={i <= ci ? 2 : 1} opacity={i <= ci ? 1 : 0.2} />
                  ))}
                </svg>
                <span style={{ fontSize: T.body, fontStyle: "italic", fontFamily: "var(--font-serif), Georgia, serif" }}>{col.head}</span>
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
                  animate={{ opacity: lit ? 1 : 0.04, y: lit ? 0 : 6 }}
                  transition={{ duration: 0.55, delay: lit ? ii * 0.12 : 0 }}
                  style={{
                    display: "flex", flexDirection: "column", gap: 6, padding: "14px 16px", borderRadius: 10,
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
