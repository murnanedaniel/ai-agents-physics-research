"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { C, Canvas, Reveal, T, mono, serif, stop } from "./ui";

// security-trifecta: Willison's three legs. Step 0: the three capabilities. Step 1:
// their overlap, where injected instructions can read your data and send it out.
// Click a leg to remove it; the overlap then closes.
const LEGS = [
  { name: "Private data", eg: "files, email, keys", cx: 480, cy: 230, lx: 270, ly: 120, anchor: "end" as const },
  { name: "Untrusted content", eg: "web pages, PDFs, issues", cx: 720, cy: 230, lx: 930, ly: 120, anchor: "start" as const },
  { name: "Outbound channel", eg: "web requests, email, git push", cx: 600, cy: 435, lx: 600, ly: 680, anchor: "middle" as const },
];
const R = 190;

export function SecurityTrifectaScene({ step }: { step: number }) {
  const [off, setOff] = useState<boolean[]>([false, false, false]);
  const live = off.every((o) => !o);
  const shown = step >= 1;

  return (
    <Canvas>
      <div style={{ display: "flex", alignItems: "center", width: "100%", height: "100%", gap: "2vw" }}>
        <svg viewBox="-80 40 1360 700" height="100%" style={{ flex: "1 1 auto", minWidth: 0, maxHeight: "100%" }} role="img" aria-label="Three overlapping circles: private data, untrusted content and an outbound channel">
          <defs>
            <clipPath id="r12-tri-b"><circle cx={LEGS[1].cx} cy={LEGS[1].cy} r={R} /></clipPath>
            <clipPath id="r12-tri-c"><circle cx={LEGS[2].cx} cy={LEGS[2].cy} r={R} /></clipPath>
          </defs>
          {LEGS.map((l, i) => (
            <g key={l.name} {...stop} onClick={(e) => { e.stopPropagation(); setOff((o) => o.map((v, j) => (j === i ? !v : v))); }} style={{ cursor: "pointer" }}>
              <title>{off[i] ? `Restore: ${l.name}` : `Remove this leg: ${l.name}`}</title>
              <motion.circle cx={l.cx} cy={l.cy} r={R} fill={C.accent} stroke={C.ink} strokeWidth="2"
                initial={false} animate={{ fillOpacity: off[i] ? 0 : 0.07, strokeOpacity: off[i] ? 0.3 : 1 }}
                strokeDasharray={off[i] ? "8 8" : undefined} />
              <g opacity={off[i] ? 0.35 : 1} data-dim={off[i] || undefined}>
                <text x={l.lx} y={l.ly} textAnchor={l.anchor} fontSize="30" fill={C.ink}>{l.name}</text>
                <text x={l.lx} y={l.ly + 34} textAnchor={l.anchor} fontSize="24" fill={C.muted} className="t-label" style={mono}>{l.eg}</text>
              </g>
            </g>
          ))}
          {/* the overlap of all three */}
          <motion.g clipPath="url(#r12-tri-b)" initial={false} animate={{ opacity: shown ? 1 : 0 }} transition={{ duration: 0.7 }} style={{ pointerEvents: "none" }}>
            <g clipPath="url(#r12-tri-c)">
              <motion.circle cx={LEGS[0].cx} cy={LEGS[0].cy} r={R} initial={false} animate={{ fill: live ? C.red : C.paper, fillOpacity: live ? 0.85 : 0 }} />
            </g>
          </motion.g>
        </svg>

        <Reveal at={1} step={step} style={{ flex: "0 0 32%", display: "flex", flexDirection: "column", gap: "2.4vh" }}>
          <span style={{ ...serif, fontSize: T.big, color: live ? C.red : C.ink, lineHeight: 1.05 }}>{live ? "The lethal trifecta" : "One leg removed"}</span>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>With all three, text planted in anything the agent reads can get it to fetch your data and send it out.</span>
          <span style={{ fontSize: T.body, lineHeight: 1.3, color: C.muted }}>Simon Willison&apos;s advice: avoid the combination entirely. Click a circle to remove one leg.</span>
        </Reveal>
      </div>
    </Canvas>
  );
}
