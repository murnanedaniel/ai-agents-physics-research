"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { C, Canvas, Reveal, T, mono, serif, stop } from "../g1/kit";

// The closing panel of HAMLET-PHYSICS 2026 (21 Aug): an agent listened to the
// room microphone and put cards on the projector behind the panellists.
// Card text verbatim from the panel log (em dashes set as spaced en dashes; … marks an excerpt).
// Step 0: the projector, clickable through five cards.
// Step 1: all 61 cards by kind.
const CARDS = [
  { t: "13:07", kind: "question", text: "If agents take over the scaffolding – the fits, the pipelines, the first two years of every PhD – where does the next generation’s physical intuition come from?" },
  { t: "13:26", kind: "idea", text: "If agents can write every problem set, maybe assessment drifts back to our oldest technology: the conversation. \u2026" },
  { t: "13:28", kind: "idea", text: "When every applicant’s plots are flawless, the plot stops carrying signal. …" },
  { t: "13:37", kind: "idea", text: "A correct-but-not-understood answer has a signature: it can’t survive perturbation. Change one assumption, ask what shifts. \u2026" },
  { t: "13:43", kind: "idea", text: "… You can’t look up the anomaly you didn’t notice. …" },
];
const KINDS = [
  { k: "idea", n: 44 }, { k: "connection", n: 7 }, { k: "opinion", n: 7 }, { k: "question", n: 3 },
];

export function HamletSlidesR2({ step }: { step: number }) {
  // Step 0 opens on the first question, step 1 on a short card; arrows browse.
  const [sel, setSel] = useState<number | null>(null);
  useEffect(() => setSel(null), [step]);
  const i = sel ?? (step >= 1 ? CARDS.length - 1 : 0);
  const card = CARDS[i];
  const go = (d: number) => (e: React.MouseEvent) => { stop(e); setSel((i + d + CARDS.length) % CARDS.length); };
  return (
    <Canvas style={{ justifyContent: "center", gap: "3vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "1.5vw" }}>
        <button onClick={go(-1)} onKeyDown={stop} aria-label="previous card" style={btn}>‹</button>
        <div style={{ position: "relative", height: "38vh", borderRadius: 12, background: "#fff", color: C.ink, border: `1px solid ${C.rule}`, padding: "3vh 4vw", overflow: "hidden", boxShadow: "0 18px 40px -20px rgba(20,20,20,0.35)" }}>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }}
              style={{ display: "flex", flexDirection: "column", gap: "2vh", height: "100%", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.accent, position: "absolute", top: 14, left: 18 }}>{card.t} · {card.kind}</span>
              <span style={{ fontFamily: serif, fontSize: "clamp(24px, 2.4vw, 46px)", lineHeight: 1.3, maxWidth: "52ch" }}>{card.text}</span>
            </motion.div>
          </AnimatePresence>
          <span className="t-label" style={{ position: "absolute", right: 18, bottom: 12, fontFamily: mono, fontSize: T.label, color: C.muted }}>{i + 1} / {CARDS.length}</span>
        </div>
        <button onClick={go(1)} onKeyDown={stop} aria-label="next card" style={btn}>›</button>
      </div>
      <Reveal at={1} step={step} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: T.body }}>61 cards in about 50 minutes.</span>
        <div style={{ display: "flex", height: 30, gap: 2 }}>
          {KINDS.map((k) => (
            <div key={k.k} style={{ flex: k.n, background: k.k === "idea" ? C.accent : "#9bb8cc", borderRadius: 3, display: "flex", alignItems: "center", paddingLeft: 8, minWidth: 0 }}>
              <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: k.k === "idea" ? "#fff" : C.ink, whiteSpace: "nowrap" }}>{k.n} {k.k === "idea" ? "ideas" : ""}</span>
            </div>
          ))}
        </div>
        <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>44 ideas · 7 connections · 7 opinions · 3 questions</span>
      </Reveal>
    </Canvas>
  );
}

const btn: React.CSSProperties = {
  width: 44, height: 44, borderRadius: 22, border: `1px solid ${C.rule}`, background: C.card, color: C.ink, fontSize: 26, lineHeight: 1, cursor: "pointer",
};
