"use client";

import { motion } from "motion/react";
import { asset } from "@/lib/asset";
import { C, Canvas, Reveal, T, mono, serif } from "../g1/kit";

// Step 0: the problem. How much ATLAS documentation chATLAS indexes, by source
// (chATLAS draft paper, ATLAS ML Forum, 3 Sep 2026, slide 4; CDS = 1,914
// papers + 1,250 CONF + 39 PUB notes), and the 2025 survey line (public talk).
// Step 1: the answer, the chATLAS search and assistant (screenshot, Jun 2025),
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

export function ChatlasR2({ step }: { step: number }) {
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
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: "0.6vh" }}>
            <span style={{ fontFamily: serif, fontSize: T.big, lineHeight: 1.1 }}>85%</span>
            <span style={{ fontSize: T.body, lineHeight: 1.3 }}>of members surveyed in 2025 find it overwhelming.</span>
          </div>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>Most of it sits behind the ATLAS login, out of public models&apos; training data.</span>
        </div>
        <Reveal at={1} step={step} style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/r2/chatlas-ui.jpg")} alt="The chATLAS interface: one message box, with filters for TWiki, GitLab docs, CDS, Indico and the ATLAS forum"
            style={{ width: "100%", maxHeight: "42vh", objectFit: "cover", objectPosition: "top", border: `1px solid ${C.rule}`, borderRadius: 6, boxShadow: "0 12px 30px -14px rgba(20,20,20,0.3)", background: "#fff" }} />
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>chATLAS: ask in plain words, get an answer that cites its sources. 72% of those surveyed named citations as what matters most.</span>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>two prototypes, one of them mine, merged in 2023 · in use since April 2024</span>
        </Reveal>
      </div>
    </Canvas>
  );
}
