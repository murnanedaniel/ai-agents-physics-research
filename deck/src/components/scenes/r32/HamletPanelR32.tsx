"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { C, Canvas, Reveal, T, mono, serif, stop } from "../g1/kit";

// The closing panel of HAMLET-PHYSICS 2026 (21 Aug): an agent listened to the
// room microphone and put cards on the projector behind the panellists.
// Ten card texts verbatim from the panel log (notes/round2/materials/hamlet/panel-cards.md;
// em dashes set as spaced en dashes; … marks an excerpt). Cards that name or quote a person are left out.
// The projector cycles through them on its own; arrows still browse.
// Step 0: the projector with four panellist silhouettes in front.
// Step 1: what the agent brought to the panel, and all 61 cards by kind.
const CARDS = [
  { t: "13:07", kind: "question", text: "If agents take over the scaffolding – the fits, the pipelines, the first two years of every PhD – where does the next generation’s physical intuition come from?" },
  { t: "13:16", kind: "idea", text: "The calculator analogy is lovely – but a calculator never surprises you. An agent will. …" },
  { t: "13:17", kind: "idea", text: "Maybe intuition never came from writing the pipeline – it came from being wrong cheaply, hundreds of times. …" },
  { t: "13:19", kind: "idea", text: "… Students who spend year one checking an agent’s work start where we ended: doubting, verifying, signing. …" },
  { t: "13:20", kind: "idea", text: "… an agent never skips the ablation you were too tired to run at 11pm. …" },
  { t: "13:21", kind: "idea", text: "… Verification isn’t a tax on the result – it’s the door understanding walks through. …" },
  { t: "13:23", kind: "idea", text: "… a foundation model never meets the world – only our detectors’ opinion of it. …" },
  { t: "13:26", kind: "idea", text: "If agents can write every problem set, maybe assessment drifts back to our oldest technology: the conversation. …" },
  { t: "13:37", kind: "idea", text: "A correct-but-not-understood answer has a signature: it can’t survive perturbation. Change one assumption, ask what shifts. …" },
  { t: "13:43", kind: "idea", text: "… You can’t look up the anomaly you didn’t notice. …" },
];
const KINDS = [
  { k: "idea", n: 44 }, { k: "connection", n: 7 }, { k: "opinion", n: 7 }, { k: "question", n: 3 },
];
const CYCLE_MS = 6000;

// Four seated panellists seen from behind, in front of the screen.
function Panellists() {
  const xs = [150, 380, 620, 850];
  return (
    <svg viewBox="0 0 1000 170" width="100%" preserveAspectRatio="xMidYMax meet" aria-hidden
      style={{ position: "absolute", left: 0, right: 0, bottom: "-3vh", height: "15vh", pointerEvents: "none" }}>
      <rect x={60} y={150} width={880} height={20} rx={4} fill="#5b5550" />
      {xs.map((x) => (
        <g key={x} fill="#3d3833">
          <circle cx={x} cy={52} r={30} />
          <path d={`M${x - 64},160 C${x - 62},104 ${x - 36},88 ${x},88 C${x + 36},88 ${x + 62},104 ${x + 64},160 Z`} />
        </g>
      ))}
    </svg>
  );
}

export function HamletPanelR32({ step }: { step: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((k) => (k + 1) % CARDS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [paused]);
  const card = CARDS[i];
  const go = (d: number) => (e: React.MouseEvent) => { stop(e); setPaused(true); setI((i + d + CARDS.length) % CARDS.length); };
  return (
    <Canvas style={{ justifyContent: "center", gap: "2.4vh" }}>
      <span style={{ fontSize: T.body, lineHeight: 1.3 }}>In the closing panel, Claude listened to the room and put cards on the projector behind the panellists.</span>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "1.5vw" }}>
        <button onClick={go(-1)} onKeyDown={stop} aria-label="previous card" style={btn}>‹</button>
        <div style={{ position: "relative", paddingBottom: "8vh" }}>
          <div style={{ position: "relative", height: "30vh", borderRadius: 12, background: "#fff", color: C.ink, border: `1px solid ${C.rule}`, padding: "3vh 4vw 5vh", overflow: "hidden", boxShadow: "0 18px 40px -20px rgba(20,20,20,0.35)" }}>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }}
                style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.accent, position: "absolute", top: 14, left: 18 }}>{card.t} · {card.kind}</span>
                <span style={{ fontFamily: serif, fontSize: "clamp(22px, 2.1vw, 40px)", lineHeight: 1.3, maxWidth: "52ch" }}>{card.text}</span>
              </motion.div>
            </AnimatePresence>
            <span className="t-label" style={{ position: "absolute", right: 18, top: 14, fontFamily: mono, fontSize: T.label, color: C.muted }}>{i + 1} / {CARDS.length}</span>
          </div>
          <Panellists />
        </div>
        <button onClick={go(1)} onKeyDown={stop} aria-label="next card" style={btn}>›</button>
      </div>
      <Reveal at={1} step={step} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: T.body, lineHeight: 1.3 }}>It took part in the panel with all the week&apos;s context: every speaker, their scientific record, the conversations and the notes. 61 cards in about 50 minutes.</span>
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
