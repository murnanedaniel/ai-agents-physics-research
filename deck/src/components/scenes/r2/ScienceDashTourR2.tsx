"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { asset } from "@/lib/asset";
import { C, Canvas, T, mono, stop } from "../g1/kit";

// Screenshots of ScienceDash, 21 Oct 2026 (sidebar cropped off).
// Step 0 opens on Today, step 1 on a project's check-in deck; the tabs are clickable.
const TABS = [
  { id: "today", img: "sd-today.jpg", name: "Today", says: "What needs you this morning: blockers, stalled projects, recent runs." },
  { id: "project", img: "sd-project.jpg", name: "Project", says: "Each project holds its status, hypothesis and figures of merit; every change is logged." },
  { id: "checkin", img: "sd-checkin.jpg", name: "Check-in", says: "An agent reports progress as a slide deck attached to the project." },
  { id: "poster", img: "sd-poster.jpg", name: "Reading", says: "A paper on the reading list, with an agent-written explorable summary." },
];
const DEFAULT = [0, 2];

export function ScienceDashTourR2({ step }: { step: number }) {
  const [sel, setSel] = useState<number | null>(null);
  useEffect(() => setSel(null), [step]);
  const i = sel ?? DEFAULT[Math.min(step, DEFAULT.length - 1)];
  const tab = TABS[i];
  return (
    <Canvas style={{ gap: "2vh" }}>
      <div style={{ display: "flex", gap: 8 }} role="tablist">
        {TABS.map((t, k) => (
          <button key={t.id} role="tab" aria-selected={k === i} onClick={(e) => { stop(e); setSel(k); }} onKeyDown={stop}
            className="t-label" style={{ padding: "8px 16px", borderRadius: 18, cursor: "pointer", fontSize: "clamp(15px, 1.2vw, 22px)", fontFamily: mono,
              border: `1.5px solid ${k === i ? C.accent : C.rule}`, background: k === i ? C.accentSoft : C.card, color: k === i ? C.accent : C.ink }}>
            {t.name}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2.1fr 1fr", gap: "3vw", flex: 1, minHeight: 0, alignItems: "start" }}>
        <div style={{ position: "relative", height: "100%", minHeight: 0 }}>
          <AnimatePresence mode="wait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img key={tab.id} src={asset(`/r2/${tab.img}`)} alt={`ScienceDash ${tab.name} page`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
              style={{ display: "block", maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", border: `1px solid ${C.rule}`, borderRadius: 8, background: "#fff", boxShadow: "0 12px 30px -14px rgba(20,20,20,0.3)" }} />
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: 14, fontSize: T.body, lineHeight: 1.35 }}>
            {tab.says}
          </motion.div>
        </AnimatePresence>
      </div>
    </Canvas>
  );
}
