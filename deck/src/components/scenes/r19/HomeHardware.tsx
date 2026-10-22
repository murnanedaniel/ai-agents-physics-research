"use client";

import { motion } from "motion/react";
import { asset } from "@/lib/asset";
import { Area, C, T } from "../r11/kit";

// Step 0: an imagined 8-GPU cabinet (generated image). Step 1: the real home
// server, a small box and a router on the floor. Step 2: the concrete setup in
// three blocks (home server, clusters, subscriptions).
const BLOCKS: { label: string; lines: string[] }[] = [
  {
    label: "home server",
    lines: [
      "A small box at home that's always on.",
      "It runs ScienceDash and my long Claude Code sessions.",
      "I reach it from my phone over Tailscale.",
      "No heavy compute.",
    ],
  },
  {
    label: "clusters",
    lines: [
      "Perlmutter (NERSC): a Remote Control bridge that a scheduled job restarts every 5 minutes.",
      "It came back by itself after this week's maintenance.",
      "Polaris (ALCF) as a backup.",
    ],
  },
  {
    label: "subscriptions",
    lines: [
      "A Claude subscription for Claude Code and claude.ai.",
      "A ChatGPT subscription for Codex, my second model and reviewer.",
    ],
  },
];

export function HomeHardware({ step }: { step: number }) {
  const real = step >= 1;
  const setup = step >= 2;
  const img = { position: "absolute" as const, inset: 0, width: "100%", height: "100%", objectFit: "cover" as const, borderRadius: 12 };
  return (
    <Area>
      <motion.div
        initial={false}
        animate={{ opacity: setup ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        aria-hidden={setup}
        style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "3vw", alignItems: "center", pointerEvents: setup ? "none" : "auto" }}
      >
        <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", borderRadius: 12, boxShadow: "0 2px 18px rgba(0,0,0,0.12)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/r19/gpu-dream.jpg")} alt="An imagined home setup: a wooden cabinet holding eight GPUs, with a screen showing all eight busy" style={img} />
          <motion.div initial={false} animate={{ opacity: real ? 1 : 0 }} transition={{ duration: 0.5 }} style={{ position: "absolute", inset: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/r19/homebox-real.jpg")} alt="The real home server: a small box and a router on the floor, in a tangle of cables, next to a laundry basket" style={img} />
          </motion.div>
        </div>
        <div style={{ position: "relative", minHeight: "14em" }}>
          <motion.div initial={false} animate={{ opacity: real ? 0 : 1 }} transition={{ duration: 0.4 }} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: "2vh" }}>
            <div style={{ ...T.big, color: C.ink }}>To do professional science with agents, you need eight GPUs at home and a fibre link to the web.</div>
          </motion.div>
          <motion.div initial={false} animate={{ opacity: real ? 1 : 0 }} transition={{ duration: 0.5, delay: real ? 0.2 : 0 }} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: "2vh" }} aria-hidden={!real}>
            <div style={{ ...T.serif, fontSize: "clamp(34px, 3.4vw, 64px)", color: C.ink }}>Just kidding.</div>
            <div style={{ ...T.body, color: C.ink }}>My home server is a small box and a router on the floor. The GPUs are on the clusters.</div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: setup ? 1 : 0 }}
        transition={{ duration: 0.5, delay: setup ? 0.2 : 0 }}
        aria-hidden={!setup}
        style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2.4vw", alignItems: "stretch", alignContent: "center", pointerEvents: setup ? "auto" : "none" }}
      >
        {BLOCKS.map((b, i) => (
          <motion.div
            key={b.label}
            initial={false}
            animate={{ opacity: setup ? 1 : 0, y: setup ? 0 : 12 }}
            transition={{ duration: 0.45, delay: setup ? 0.25 + i * 0.15 : 0 }}
            style={{ background: C.card, border: `1px solid ${C.rule}`, borderRadius: 12, padding: "2.6vh 1.6vw", display: "flex", flexDirection: "column", gap: "1.6vh" }}
          >
            <div className="t-label" style={{ ...T.mono, ...T.label, color: C.warm, textTransform: "uppercase", letterSpacing: "0.06em" }}>{b.label}</div>
            {b.lines.map((l) => (
              <div key={l} style={{ ...T.body, color: C.ink }}>{l}</div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </Area>
  );
}
