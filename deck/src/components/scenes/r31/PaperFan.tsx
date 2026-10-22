"use client";

import { motion } from "motion/react";
import { asset } from "@/lib/asset";
import { C, mono } from "../r1/kit";

// The agent's 16-page beam-spot draft, fanned out over the scene (after the ETH talk's EasterReveal).
// Closed: the pages sit stacked and invisible. Open: they fly out into a 4 x 4 grid on a light backdrop.
// Pages: notes/round2/materials/eth-beamspot/img/paper (pdftoppm renders of the 7 Apr 2026 draft).
const N = 16;
const src = (i: number) => asset(`/r3x/beamspot-paper/page-${String(i + 1).padStart(2, "0")}.png`);
const FAN = Array.from({ length: N }, (_, i) => {
  const row = Math.floor(i / 8), col = i % 8;
  const jx = ((i * 137.508) % 360) / 360 - 0.5;
  const jy = ((i * 211.111) % 360) / 360 - 0.5;
  // two rows of eight, in % of the overlay box
  return { x: (col - 3.5) * 12 + jx * 0.8, y: (row - 0.5) * 44 + jy * 1.5, rot: jx * 6 };
});

export function PaperFan({ open, caption }: { open: boolean; caption: string }) {
  return (
    <motion.div
      aria-hidden={!open}
      initial={false}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", top: "13vh", left: 0, right: 0, bottom: 0, zIndex: 20, pointerEvents: open ? "auto" : "none", background: "rgba(250,248,243,0.94)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2vh" }}
    >
      <div style={{ position: "relative", width: "100%", height: "78%" }}>
        {FAN.map((f, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={open
              ? { left: `${50 + f.x}%`, top: `${50 + f.y}%`, rotate: f.rot, scale: 1 }
              : { left: `${78 + i * 0.1}%`, top: `${62 + i * 0.1}%`, rotate: 0, scale: 0.6 }}
            transition={{ duration: open ? 1.0 : 0.4, delay: open ? i * 0.04 : 0, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: "absolute", width: "11%", aspectRatio: "935 / 1210", translateX: "-50%", translateY: "-50%", zIndex: N - i, background: "#fff", boxShadow: "0 12px 28px -12px rgba(20,20,20,0.45)", border: `1px solid ${C.rule}` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src(i)} alt={`draft page ${i + 1}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </motion.div>
        ))}
      </div>
      <span className="t-label" style={{ fontFamily: mono, fontSize: "clamp(14px, 1.15vw, 22px)", color: C.muted }}>{caption}</span>
    </motion.div>
  );
}
