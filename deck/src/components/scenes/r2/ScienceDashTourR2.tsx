"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { asset } from "@/lib/asset";
import { C, Canvas, Reveal, T, mono, stop } from "../g1/kit";

// Screenshots of ScienceDash, 21 Oct 2026 (sidebar cropped off).
// Step 0: the course programme and an agent's check-in deck.
// Step 1: a paper as a super-poster and the conversation search.
// Click a tile to enlarge it; click again to close.
const TILES = [
  { img: "sd-programme.jpg", says: "today's projects, as one programme", at: 0 },
  { img: "sd-checkin.jpg", says: "an agent's check-in, as slides", at: 0 },
  { img: "sd-poster.jpg", says: "a paper, as an explorable poster", at: 1 },
  { img: "sd-search.jpg", says: "search every past agent conversation", at: 1 },
];

export function ScienceDashTourR2({ step }: { step: number }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Canvas style={{ justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "2.4vh 2.4vw", flex: 1, minHeight: 0 }}>
        {TILES.map((t, k) => (
          <Reveal key={t.img} at={t.at} step={step} style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 0 }}>
            <button onClick={(e) => { stop(e); setOpen(k); }} onKeyDown={stop} aria-label={`Enlarge: ${t.says}`}
              style={{ flex: 1, minHeight: 0, padding: 0, border: `1px solid ${C.rule}`, borderRadius: 8, background: "#fafafc", cursor: "zoom-in", overflow: "hidden", boxShadow: "0 10px 24px -14px rgba(20,20,20,0.3)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(`/r2/${t.img}`)} alt={`ScienceDash: ${t.says}`} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "top center", display: "block" }} />
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
            <img src={asset(`/r2/${TILES[open].img}`)} alt={`ScienceDash: ${TILES[open].says}`} style={{ maxWidth: "100%", maxHeight: "100%", border: `1px solid ${C.rule}`, borderRadius: 8, background: "#fff" }} />
            <span className="t-label" style={{ position: "absolute", right: 8, bottom: 4, fontFamily: mono, fontSize: T.label, color: C.muted }}>click to close</span>
          </motion.div>
        )}
      </AnimatePresence>
    </Canvas>
  );
}
