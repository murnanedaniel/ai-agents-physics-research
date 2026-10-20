"use client";

import { motion } from "motion/react";
import { C, Canvas, Reveal, T, mono, stop } from "./kit";

// The task (finding things in ATLAS documentation) became a pipeline of
// four packages; step 1 shows they are released and reused.
const SOURCES = ["TWiki", "CDS", "GitLab docs"];
const STAGES = [
  { pkg: "chATLAS_Scrape", does: "collect", first: "Jun 2025", href: "https://pypi.org/project/chATLAS-Scrape/" },
  { pkg: "chATLAS_Embed", does: "index", first: "Jan 2025", href: "https://pypi.org/project/chATLAS-Embed/" },
  { pkg: "chATLAS_Chains", does: "answer", first: "Apr 2025", href: "https://pypi.org/project/chATLAS-Chains/" },
  { pkg: "chATLAS_Benchmark", does: "score", first: "Feb 2025", href: "https://pypi.org/project/chATLAS-Benchmark/" },
];

function Arrow() {
  return (
    <svg width="34" height="20" viewBox="0 0 34 20" aria-hidden style={{ flex: "0 0 auto" }}>
      <line x1="2" y1="10" x2="28" y2="10" stroke={C.muted} strokeWidth="2" />
      <path d="M24,4 L32,10 L24,16" fill="none" stroke={C.muted} strokeWidth="2" />
    </svg>
  );
}

export function ChatlasScene({ step }: { step: number }) {
  return (
    <Canvas style={{ justifyContent: "center", gap: "4.5vh" }}>
      <div style={{ display: "flex", alignItems: "stretch", gap: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 8, flex: "0 0 auto" }}>
          {SOURCES.map((s, i) => (
            <motion.span key={s} className="t-label" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              style={{ fontFamily: mono, fontSize: T.label, color: C.ink, padding: "6px 10px", border: `1px dashed ${C.faint}`, borderRadius: 6, textAlign: "center" }}>{s}</motion.span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}><Arrow /></div>
        {STAGES.map((s, i) => (
          <div key={s.pkg} style={{ display: "flex", alignItems: "stretch", gap: 10, flex: "1 1 0", minWidth: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.55 }}
              style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8, padding: "16px 14px", borderRadius: 10, background: C.card, border: `1.5px solid ${C.accent}` }}
            >
              <span style={{ fontSize: T.body }}>{s.does}</span>
              <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, overflowWrap: "anywhere" }}>{s.pkg}</span>
              <Reveal at={1} step={step}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" onClick={stop} className="t-label"
                  style={{ display: "block", fontFamily: mono, fontSize: T.label, color: C.accent, textDecoration: "none", borderTop: `1px solid ${C.rule}`, paddingTop: 8 }}>
                  PyPI, {s.first}
                </a>
              </Reveal>
            </motion.div>
            {i < STAGES.length - 1 && <div style={{ display: "flex", alignItems: "center" }}><Arrow /></div>}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3vw", fontSize: T.body, lineHeight: 1.35 }}>
        <div style={{ borderLeft: `3px solid ${C.ink}`, paddingLeft: 14 }}>
          Search for a collaboration of about 6,000 people.
          <div className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, marginTop: 6 }}>tuned embeddings: retrieval about 30% to 70%</div>
        </div>
        <Reveal at={1} step={step} style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: 14 }}>
          Released as packages for later tools and agents.
        </Reveal>
      </div>
    </Canvas>
  );
}
