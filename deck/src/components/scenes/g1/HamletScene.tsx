"use client";

import { motion } from "motion/react";
import { C, Canvas, RevealG, mono, serif } from "./kit";

// Left: commits per day while building the HAMLET 2026 conference app.
// Right (step 1): how many attendees used it.
const DAYS = [15, 34, 9, 1, 4, 22, 19, 10, 2, 17]; // 12 to 21 Aug 2026
const CONF = [7, 8, 9]; // 19 to 21 Aug: the conference
const USE = [
  { n: 139, what: "invited" },
  { n: 22, what: "looked up a partner" },
  { n: 10, what: "wrote a note" },
];
const W = 1160, H = 470;
const L = { l: 20, r: 520, base: 380, top: 90 };
const bw = (L.r - L.l) / DAYS.length;
const by = (n: number) => L.base - (n / 36) * (L.base - L.top);
const UX = 640, UW = 420;

export function HamletScene({ step }: { step: number }) {
  return (
    <Canvas>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="133 commits in ten days built the app; of 139 attendees, 22 looked up a partner and 10 wrote a note">
        <text x={L.l} y={34} fontFamily={serif} fontStyle="italic" fontSize="26" fill={C.ink}>Built: 133 commits in 10 days</text>
        <text className="t-label" x={L.l} y={60} fontFamily={mono} fontSize="16" fill={C.muted}>40 specs from one agent, code from another</text>
        <rect x={L.l + CONF[0] * bw} y={L.top - 10} width={bw * CONF.length} height={L.base - L.top + 10} fill={C.warmSoft} />
        <text className="t-label" x={L.l + CONF[0] * bw + 6} y={L.top + 10} fontFamily={mono} fontSize="16" fill={C.warmText}>conference</text>
        <line x1={L.l} x2={L.r} y1={L.base} y2={L.base} stroke={C.ink} strokeWidth={1} />
        {DAYS.map((n, i) => (
          <g key={i}>
            <motion.rect x={L.l + i * bw + 6} width={bw - 12} initial={{ y: L.base, height: 0 }} animate={{ y: by(n), height: L.base - by(n) }} transition={{ duration: 0.7, delay: 0.1 + i * 0.05 }} fill={C.accent} />
            <text className="t-label" x={L.l + i * bw + bw / 2} y={by(n) - 8} textAnchor="middle" fontFamily={mono} fontSize="15" fill={C.ink}>{n}</text>
            <text className="t-label" x={L.l + i * bw + bw / 2} y={L.base + 24} textAnchor="middle" fontFamily={mono} fontSize="15" fill={C.muted}>{12 + i}</text>
          </g>
        ))}
        <text className="t-label" x={L.r} y={L.base + 50} textAnchor="end" fontFamily={mono} fontSize="16" fill={C.muted}>August 2026</text>
        <RevealG at={1} step={step}>
          <text x={UX} y={34} fontFamily={serif} fontStyle="italic" fontSize="26" fill={C.ink}>Used: by few attendees</text>
          {USE.map((u, i) => {
            const y0 = 100 + i * 92;
            const w = (u.n / 139) * UW;
            return (
              <g key={u.what}>
                <motion.rect x={UX} y={y0} height={40} initial={false} animate={{ width: step >= 1 ? w : 0 }} transition={{ duration: 0.8, delay: 0.2 + i * 0.2 }} fill={i === 0 ? "#9bb8cc" : C.warm} />
                <text x={UX + Math.max(w, 0) + 12} y={y0 + 29} fontFamily={mono} fontSize="22" fill={C.ink}>{u.n}</text>
                <text x={UX} y={y0 + 66} fontSize="20" fill={C.ink}>{u.what}</text>
              </g>
            );
          })}
          <text className="t-label" x={UX} y={384} fontFamily={mono} fontSize="16" fill={C.ink}>the agent wrote 465 feed items; 27 were read</text>
          <text className="t-label" x={UX} y={418} fontFamily={mono} fontSize="16" fill={C.muted}>separately, the live closing panel:</text>
          <text className="t-label" x={UX} y={440} fontFamily={mono} fontSize="16" fill={C.muted}>61 cards written from the microphone in 50 min</text>
        </RevealG>
      </svg>
    </Canvas>
  );
}
