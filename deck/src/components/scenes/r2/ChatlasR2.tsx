"use client";

import { motion } from "motion/react";
import { asset } from "@/lib/asset";
import { C, Canvas, Reveal, T, mono, serif } from "../g1/kit";

// Step 0: the problem. How much ATLAS documentation there is, by source
// (LIPS DESY talk, Feb 2024; three of 10+ sources), and the 2025 survey line.
// Step 1: the answer, the chATLAS search and assistant (screenshot, Jun 2025),
// with the survey's citation number (72%) and its origin (2023, two prototypes).
const SOURCES = [
  { name: "Indico meeting events", n: 440440, txt: "440,440" },
  { name: "e-group topics", n: 8900, txt: "about 8,900" },
  { name: "TWiki topics", n: 2000, txt: "2,000+" },
];
const LOG_MIN = 3, LOG_MAX = 6; // 1,000 to 1,000,000
const frac = (n: number) => (Math.log10(n) - LOG_MIN) / (LOG_MAX - LOG_MIN);

export function ChatlasR2({ step }: { step: number }) {
  return (
    <Canvas style={{ justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "4vw", alignItems: "center", minHeight: 0, flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2.4vh" }}>
          {SOURCES.map((s, i) => (
            <div key={s.name} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>{s.name}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${frac(s.n) * 72}%` }} transition={{ delay: 0.2 + i * 0.12, duration: 0.8 }}
                  style={{ height: 22, background: C.accent, borderRadius: 3 }}
                />
                <span style={{ fontSize: T.body }}>{s.txt}</span>
              </div>
            </div>
          ))}
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>three of 10+ sources, by Feb 2024 · log scale</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: "1vh" }}>
            <span style={{ fontFamily: serif, fontSize: T.big, lineHeight: 1.1 }}>85%</span>
            <span style={{ fontSize: T.body, lineHeight: 1.3 }}>of members surveyed in 2025 find it overwhelming.</span>
          </div>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>Most of it sits behind the ATLAS login, so it isn&apos;t in public models&apos; training data.</span>
        </div>
        <Reveal at={1} step={step} style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/r2/chatlas-ui.jpg")} alt="The chATLAS interface: one message box, with filters for TWiki, GitLab docs, CDS, Indico and the ATLAS forum"
            style={{ width: "100%", maxHeight: "42vh", objectFit: "cover", objectPosition: "top", border: `1px solid ${C.rule}`, borderRadius: 6, boxShadow: "0 12px 30px -14px rgba(20,20,20,0.3)", background: "#fff" }} />
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>chATLAS: ask in plain words, get an answer that cites its sources. 72% of those surveyed named citations as the feature that matters most.</span>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>two prototypes, one of them mine, merged in 2023 · in use since April 2024</span>
        </Reveal>
      </div>
    </Canvas>
  );
}
