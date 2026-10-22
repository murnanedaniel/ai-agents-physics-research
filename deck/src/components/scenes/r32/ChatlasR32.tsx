"use client";

import { motion } from "motion/react";
import { C, Canvas, Reveal, T, mono, serif } from "../g1/kit";

// Step 0: the problem. How much ATLAS documentation chATLAS indexes, by source
// (chATLAS draft paper, ATLAS ML Forum, 3 Sep 2026, slide 4; CDS = 1,914
// papers + 1,250 CONF + 39 PUB notes), and the 2025 survey line (public talk).
// Indico slide-deck count: Daniel, 22 Oct 2026 (round-3 feedback).
// Step 1: the answer, a drawn mock of the chATLAS assistant (the Jun 2025 screenshot was out of date),
// with the survey's citation number (72%) and its origin (2023, two prototypes).
const SOURCES = [
  { name: "ATLAS forum threads", n: 13824, txt: "13,824" },
  { name: "GitLab docs pages", n: 9982, txt: "9,982" },
  { name: "TWiki pages, last 5 years", n: 4450, txt: "4,450" },
  { name: "CDS papers and notes", n: 3203, txt: "3,203" },
  { name: "Indico lectures", n: 217, txt: "217" },
];
const LOG_MIN = 2, LOG_MAX = 5; // 100 to 100,000
const frac = (n: number) => (Math.log10(n) - LOG_MIN) / (LOG_MAX - LOG_MIN);

export function ChatlasR32({ step }: { step: number }) {
  return (
    <Canvas style={{ justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "4vw", alignItems: "center", minHeight: 0, flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.6vh" }}>
          {SOURCES.map((s, i) => (
            <div key={s.name} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>{s.name}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${frac(s.n) * 72}%` }} transition={{ delay: 0.2 + i * 0.12, duration: 0.8 }}
                  style={{ height: 22, background: C.accent, borderRadius: 3 }}
                />
                <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.ink }}>{s.txt}</span>
              </div>
            </div>
          ))}
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>indexed in chATLAS, 2026 · five of 10+ sources · log scale</span>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>About 31,000 documents, split into 1.2M chunks.</span>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>Indico alone now holds about 500,000 slide decks: several million slides of images, text and diagrams.</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: "0.6vh" }}>
            <span style={{ fontFamily: serif, fontSize: T.big, lineHeight: 1.1 }}>85%</span>
            <span style={{ fontSize: T.body, lineHeight: 1.3 }}>of members surveyed in 2025 find it overwhelming.</span>
          </div>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>Most of it sits behind the ATLAS login, out of public models&apos; training data.</span>
        </div>
        <Reveal at={1} step={step} style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
          <Mock />
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>chATLAS: ask in plain words, get an answer that cites its sources. 72% of those surveyed named citations as what matters most.</span>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>two prototypes, one of them mine, merged in 2023 · in use since April 2024</span>
        </Reveal>
      </div>
    </Canvas>
  );
}

// A drawn mock of the assistant: a question, an answer, and the sources it cites.
function Mock() {
  const line = (w: string) => <div style={{ height: 10, width: w, background: C.rule, borderRadius: 5 }} />;
  const chips = ["TWiki", "Indico slides", "GitLab docs"];
  return (
    <div aria-label="Drawn mock of chATLAS: a question box, an answer, and chips for the sources it cites"
      style={{ display: "flex", flexDirection: "column", gap: 12, padding: "18px 20px", border: `1px solid ${C.rule}`, borderRadius: 10, background: "#fff", boxShadow: "0 12px 30px -14px rgba(20,20,20,0.3)" }}>
      <div style={{ alignSelf: "flex-end", maxWidth: "80%", background: C.accentSoft, borderRadius: 10, padding: "8px 12px", fontSize: T.body, lineHeight: 1.3 }}>Where is the recipe for this calibration?</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{line("92%")}{line("84%")}{line("60%")}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {chips.map((c, k) => (
          <span key={c} className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.accent, border: `1px solid ${C.accent}`, borderRadius: 12, padding: "2px 10px" }}>[{k + 1}] {c}</span>
        ))}
      </div>
      <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>drawn mock, not a screenshot</span>
    </div>
  );
}
