"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { asset } from "@/lib/asset";
import { C, Canvas, Reveal, T, mono, stop } from "../g1/kit";

// ScienceDash screens of the track-finding project (project 5, Apr 2026), cropped
// so no hostnames or paths show; plus the conversation search (21 Oct 2026).
// Step 0: the project as hypotheses with compute budgets, and the agent's brief.
// Step 1: the search across every past agent conversation.
// Click a tile to enlarge it; click again to close.
const TILES = [
  { img: "/r3x/sd-hypotheses.jpg", says: "a project, split into hypotheses, each with a compute budget", at: 0, area: "1 / 1 / 3 / 2", fit: "cover" as const },
  { img: "/r3x/sd-plan.jpg", says: "the brief its agent works from, and a box to steer it", at: 0, area: "1 / 2 / 2 / 3", fit: "cover" as const },
  { img: "/r2/sd-search.jpg", says: "search across every past agent conversation, from every machine", at: 1, area: "2 / 2 / 3 / 3", fit: "contain" as const },
];

export function ScienceDashTourR32({ step }: { step: number }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Canvas style={{ justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gridTemplateRows: "1fr 1fr", gap: "2.4vh 2.4vw", flex: 1, minHeight: 0 }}>
        {TILES.map((t, k) => (
          <Reveal key={t.img} at={t.at} step={step} style={{ gridArea: t.area, display: "flex", flexDirection: "column", gap: 8, minHeight: 0 }}>
            <button onClick={(e) => { stop(e); setOpen(k); }} onKeyDown={stop} aria-label={`Enlarge: ${t.says}`}
              style={{ flex: 1, minHeight: 0, padding: 0, border: `1px solid ${C.rule}`, borderRadius: 8, background: "#fafafc", cursor: "zoom-in", overflow: "hidden", boxShadow: "0 10px 24px -14px rgba(20,20,20,0.3)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(t.img)} alt={`ScienceDash: ${t.says}`} style={{ width: "100%", height: "100%", objectFit: t.fit, objectPosition: "top left", display: "block" }} />
            </button>
            <span style={{ fontSize: T.body, lineHeight: 1.2 }}>{t.says}</span>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div key="zoom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            onClick={(e) => { stop(e); setOpen(null); }}
            style={{ position: "absolute", inset: "12vh 4vw 6vh", background: "rgba(244,240,232,0.97)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out", zIndex: 5 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(TILES[open].img)} alt={`ScienceDash: ${TILES[open].says}`} style={{ maxWidth: "100%", maxHeight: "100%", border: `1px solid ${C.rule}`, borderRadius: 8, background: "#fff" }} />
            <span className="t-label" style={{ position: "absolute", right: 8, bottom: 4, fontFamily: mono, fontSize: T.label, color: C.muted }}>click to close</span>
          </motion.div>
        )}
      </AnimatePresence>
    </Canvas>
  );
}
