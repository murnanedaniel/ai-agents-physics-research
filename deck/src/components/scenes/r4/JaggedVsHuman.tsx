"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { C, Canvas, G, MONO, SANS, SERIF, stop } from "./kit";

// llm-jagged: on each test that publishes a human baseline, where does the best
// frontier model sit relative to people? Ahead on three, far behind on one.
// Facts checked 2026-10-21 (arXiv abstracts, ARC Prize posts); hollow = secondary.
type Row = { name: string; what: string; ai: number; hu: number; aiNote: string; huNote: string; soft?: boolean };
const ROWS: Row[] = [
  { name: "GPQA Diamond", what: "graduate science quiz", ai: 97, hu: 65, soft: true, aiNote: "AI 97%: GPT-5.4, Mar 2026 (capitalandcompute.net, secondary)", huNote: "Humans 65%: PhD experts in the field, full 448-question set (Rein et al. 2023, arXiv:2311.12022)" },
  { name: "PHYBench", what: "500 physics problems", ai: 77.4, hu: 61.9, soft: true, aiNote: "AI 77.4%: top of llm-stats, Sep 2026 (unconfirmed). At launch, Apr 2025: 36.9%", huNote: "Humans 61.9%: physics experts (Qiu et al. 2025, arXiv:2504.16074)" },
  { name: "ARC-AGI-2", what: "abstract grid puzzles", ai: 85, hu: 60, soft: true, aiNote: "AI about 85 to 92%: aggregator mirrors, Jun to Sep 2026 (unconfirmed). At launch, Mar 2025: about 4%", huNote: "Humans 60%: average of 400+ test-takers (ARC Prize, 24 Mar 2025)" },
  { name: "ARC-AGI-3", what: "games learned while playing", ai: 0.51, hu: 100, aiNote: "AI 0.51%: best frontier model at launch (ARC Prize, 25 Mar 2026)", huNote: "Humans 100%: every game solved by human testers (ARC Prize, 25 Mar 2026)" },
];

const X0 = 300, XW = 360, Y0 = 92, DY = 108;
const xs = (v: number) => X0 + (v / 100) * XW;

export function JaggedVsHuman({ step }: { step: number }) {
  const [hov, setHov] = useState<string | null>(null);
  const note = hov ? (() => { const [i, k] = hov.split("-"); const r = ROWS[+i]; return k === "ai" ? r.aiNote : r.huNote; })() : "Best reported frontier score against the published human baseline on the same test";
  return (
    <Canvas>
      <svg viewBox="0 0 1200 600" className="h-full w-full" role="img" aria-label="Frontier AI against humans: ahead on GPQA Diamond, PHYBench and ARC-AGI-2; 0.5% against 100% on ARC-AGI-3">
        {/* legend */}
        <circle cx={X0} cy={22} r="8" fill={C.s1} />
        <text className="t-label" x={X0 + 16} y={28} fill={C.ink} fontSize="17" fontFamily={MONO}>best frontier AI</text>
        <rect x={X0 + 190} y={14} width="16" height="16" fill={C.warm} />
        <text className="t-label" x={X0 + 214} y={28} fill={C.ink} fontSize="17" fontFamily={MONO}>humans</text>

        {[0, 50, 100].map((t) => (
          <g key={t}>
            <line x1={xs(t)} x2={xs(t)} y1={50} y2={Y0 + DY * 3 + 40} stroke={C.rule} strokeDasharray={t ? "3 6" : ""} />
            <text className="t-label" x={xs(t)} y={Y0 + DY * 3 + 66} textAnchor="middle" fill={C.muted} fontSize="16" fontFamily={MONO}>{t}%</text>
          </g>
        ))}

        {ROWS.map((r, i) => {
          const y = Y0 + i * DY;
          const ahead = r.ai > r.hu;
          const d = Math.round(r.ai - r.hu);
          return (
            <g key={r.name}>
              <text x={20} y={y - 2} fill={C.ink} fontSize="23" fontFamily={SANS}>{r.name}</text>
              <text className="t-label" x={20} y={y + 22} fill={C.muted} fontSize="16" fontFamily={MONO}>{r.what}</text>
              <motion.line y1={y} y2={y} stroke={ahead ? C.s1 : C.warm} strokeWidth="4" strokeOpacity="0.45" initial={{ x1: xs(r.hu), x2: xs(r.hu) }} animate={{ x1: xs(r.hu), x2: xs(r.ai) }} transition={{ duration: 0.7, delay: 0.2 + 0.15 * i }} />
              <g onMouseEnter={() => setHov(`${i}-hu`)} onMouseLeave={() => setHov(null)} onClick={(e) => { stop(e); setHov(`${i}-hu`); }} style={{ cursor: "pointer" }}>
                <rect x={xs(r.hu) - 16} y={y - 16} width="32" height="32" fill="transparent" />
                <rect x={xs(r.hu) - 8} y={y - 8} width="16" height="16" fill={C.warm} />
              </g>
              <g onMouseEnter={() => setHov(`${i}-ai`)} onMouseLeave={() => setHov(null)} onClick={(e) => { stop(e); setHov(`${i}-ai`); }} style={{ cursor: "pointer" }}>
                <circle cx={xs(r.ai)} cy={y} r="16" fill="transparent" />
                <motion.circle cy={y} r="9" fill={r.soft ? C.paper : C.s1} stroke={C.s1} strokeWidth={r.soft ? 3 : 0} initial={{ cx: xs(r.hu) }} animate={{ cx: xs(r.ai) }} transition={{ duration: 0.7, delay: 0.2 + 0.15 * i }} />
              </g>
              <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 + 0.15 * i }} x={xs(100) + 22} y={y + 8} fill={C.ink} fontSize="22" fontFamily={MONO}>{ahead ? `+${d}` : `−${-d}`}</motion.text>
            </g>
          );
        })}
        <text className="t-label" x={xs(100) + 22} y={50} fill={C.muted} fontSize="15" fontFamily={MONO}>points vs humans</text>

        <G on={step >= 1}>
          <line x1={790} x2={790} y1={60} y2={440} stroke={C.rule} />
          <text x={815} y={98} fill={C.ink} fontSize="30" fontFamily={SERIF} fontStyle="italic">What happens at the edge?</text>
          <text className="t-label" x={815} y={128} fill={C.muted} fontSize="16" fontFamily={MONO}>randomised trial: 758 BCG consultants</text>
          <text className="t-label" x={815} y={150} fill={C.muted} fontSize="16" fontFamily={MONO}>realistic tasks, with or without GPT-4</text>
          <text x={815} y={188} fill={C.ink} fontSize="21" fontFamily={SANS}>18 tasks inside the frontier</text>
          <rect x={815} y={202} width={0.4 * 380} height="26" rx="4" fill={C.s1} />
          <text x={815 + 0.4 * 380 + 10} y={222} fill={C.ink} fontSize="21" fontFamily={MONO}>+40% quality</text>
          <text x={815} y={290} fill={C.ink} fontSize="21" fontFamily={SANS}>1 task just outside it</text>
          <text className="t-label" x={815} y={352} fill={C.muted} fontSize="15" fontFamily={MONO}>less often correct</text>
          <rect x={815} y={304} width={0.19 * 380} height="26" rx="4" fill={C.warm} />
          <text x={815 + 0.19 * 380 + 10} y={324} fill={C.ink} fontSize="21" fontFamily={MONO}>−19 points</text>
          <text className="t-label" x={815} y={402} fill={C.muted} fontSize="15" fontFamily={MONO}>Dell&apos;Acqua et al. 2023,</text>
          <text className="t-label" x={815} y={422} fill={C.muted} fontSize="15" fontFamily={MONO}>HBS working paper 24-013</text>
        </G>

        <G on={step >= 1}>
          <text className="t-label" x={20} y={526} fill={C.ink} fontSize="19" fontFamily={SERIF} fontStyle="italic">“At the same time a genius polymath and a confused and cognitively challenged grade schooler.”</text>
          <text className="t-label" x={20} y={550} fill={C.muted} fontSize="15" fontFamily={MONO}>Andrej Karpathy, “2025 LLM Year in Review”, 19 Dec 2025</text>
        </G>
        <text className="t-label" x={20} y={590} fill={C.muted} fontSize="15" fontFamily={MONO}>{note}{!hov && " · hollow = secondary, unconfirmed"}</text>
      </svg>
    </Canvas>
  );
}
