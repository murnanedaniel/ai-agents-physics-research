"use client";

import { motion } from "motion/react";
import { Arrowheads, C, Canvas, G, MONO, SANS } from "../g2/kit";

// llm-transformer: tokens -> attention -> next-token distribution, with real
// numbers from GPT-2 small run on CPU (deck-scenes-r2/r3/data/gpt2_next_token.py).
// Attention: from the last token, averaged over 12 layers x 12 heads, first
// token excluded (it soaks up about half of all attention) and renormalised.
const TOKENS = ["A", "mu", "on", "is", "heavier", "than", "an"];
const ATT = [0, 0.118, 0.1, 0.151, 0.163, 0.274, 0.194];
const NEXT: [string, number][] = [
  ["atom", 0.1103],
  ["electron", 0.0803],
  ["ordinary", 0.059],
  ["elephant", 0.0311],
  ["atomic", 0.0306],
  ["iron", 0.0241],
];
const REST = 1 - NEXT.reduce((a, [, p]) => a + p, 0);

const TX = (i: number) => 80 + i * 88;
const TY = 470, TW = 78, TH = 50;

// Vaswani et al. 2017: each token's query is scored against every earlier key;
// the scores weight a sum of the values. GPT-2 small has 12 layers.
const MECH = [
  "In every layer each token makes a query, a key and a value.",
  "The query-key match sets how much of each value gets mixed in.",
  "GPT-2 small stacks 12 such layers.",
];

const CAPTIONS = [
  "Text is cut into tokens. The last token looks back at all the others: attention.",
  "Out comes a probability for every next token. One is sampled: “electron” could win.",
];

export function Transformer({ step }: { step: number }) {
  const last = TOKENS.length - 1;
  const bx = 860, bw = 260, by = 150, bh = 42;
  const px = (p: number) => (p / 0.12) * bw;
  return (
    <Canvas>
      <svg viewBox="0 0 1200 620" className="h-full w-full" role="img" aria-label="GPT-2 reads 'A muon is heavier than an'. Attention from the last token to the earlier ones, then the next-token probabilities: atom 11%, electron 8%, ordinary 6%, elephant 3%">
        <Arrowheads id="r3-tf-a" color={C.accent} />
        <Arrowheads id="r3-tf-m" color={C.muted} />

        {/* tokens */}
        {TOKENS.map((t, i) => (
          <g key={i}>
            <rect x={TX(i) - TW / 2} y={TY} width={TW} height={TH} rx="8" fill={i === last ? "#dbe8f3" : C.card} stroke={i === last ? C.accent : C.faint} strokeWidth={i === last ? 2.5 : 1.5} />
            <text x={TX(i)} y={TY + 33} textAnchor="middle" fill={C.ink} fontSize="21" fontFamily={SANS}>{t}</text>
          </g>
        ))}
        <path d={`M ${TX(1) - TW / 2} ${TY + TH + 36} L ${TX(2) + TW / 2} ${TY + TH + 36}`} stroke={C.muted} strokeWidth="1.5" />
        <text className="t-label" x={(TX(1) + TX(2)) / 2} y={TY + TH + 58} textAnchor="middle" fill={C.muted} fontSize="16" fontFamily={MONO}>“muon” is two tokens</text>

        {/* attention arcs from the last token */}
        {TOKENS.slice(0, last).map((t, i) => {
          const w = ATT[i];
          if (!w) return null;
          const h = 60 + 34 * (last - i);
          return (
            <g key={i}>
              <motion.path
                d={`M ${TX(last)} ${TY - 6} C ${TX(last)} ${TY - h}, ${TX(i)} ${TY - h}, ${TX(i)} ${TY - 6}`}
                fill="none" stroke={C.accent} strokeWidth={2 + 40 * w} strokeOpacity={0.25 + 2 * w} strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.3 + 0.12 * (last - i) }}
              />
              <text className="t-label" x={TX(i)} y={TY + TH + 22} textAnchor="middle" fill={C.accent} fontSize="15" fontFamily={MONO}>{Math.round(w * 100)}%</text>
            </g>
          );
        })}
        <text className="t-label" x={TX(0) - TW / 2} y={TY - 270} fill={C.muted} fontSize="17" fontFamily={MONO}>attention from “an”, averaged over 12 layers</text>

        {/* to the output */}
        <G on={step >= 1}>
          <path d={`M ${TX(last) + TW / 2 - 8} ${TY - 6} C ${TX(last) + 70} 380, 700 300, ${bx - 125} 300`} fill="none" stroke={C.muted} strokeWidth="2.5" markerEnd="url(#r3-tf-m)" />
          <text className="t-label" x={bx - 100} y={by - 34} fill={C.muted} fontSize="17" fontFamily={MONO}>next token: probability</text>
          {NEXT.map(([w, p], i) => (
            <g key={w}>
              <text x={bx - 12} y={by + i * (bh + 8) + 28} textAnchor="end" fill={C.ink} fontSize="21" fontFamily={SANS} fontWeight={i === 0 ? 600 : 400}>{w}</text>
              <motion.rect x={bx} y={by + i * (bh + 8) + 6} height={bh - 12} rx="3" fill={C.s1} initial={{ width: 0 }} animate={{ width: step >= 1 ? px(p) : 0 }} transition={{ duration: 0.7, delay: 0.3 + 0.08 * i }} />
              <text className="t-label" x={bx + px(p) + 10} y={by + i * (bh + 8) + 28} fill={C.ink} fontSize="18" fontFamily={MONO}>{(p * 100).toFixed(1)}%</text>
            </g>
          ))}
          <text className="t-label" x={bx} y={by + 6 * (bh + 8) + 26} fill={C.muted} fontSize="17" fontFamily={MONO}>50,251 other tokens: {Math.round(REST * 100)}%</text>
          <text className="t-label" x={bx - 100} y={by + 6 * (bh + 8) + 60} fill={C.muted} fontSize="17" fontFamily={MONO}>
            <tspan x={bx - 100}>sampled, usually at temperature 1,</tspan>
            <tspan x={bx - 100} dy="22">often with a top-k or top-p cut</tspan>
          </text>
        </G>

        {/* pick, append: the chosen token joins the row */}
        <G on={step >= 1} delay={1.2}>
          <motion.g initial={false} animate={step >= 1 ? { x: [bx - 60 - (TX(last + 1) - TW / 2), 0], y: [by - TY, 0] } : {}} transition={{ duration: 1.1, delay: 1.3, ease: "easeInOut" }}>
            <rect x={TX(last + 1) - TW / 2} y={TY} width={TW} height={TH} rx="8" fill="#fff" stroke={C.warm} strokeWidth="2.5" strokeDasharray="5 4" />
            <text x={TX(last + 1)} y={TY + 33} textAnchor="middle" fill={C.ink} fontSize="21" fontFamily={SANS}>atom</text>
          </motion.g>
        </G>

        {CAPTIONS.map((c, i) => (
          <G key={c} on={step === i}>
            <text x="20" y="30" fill={C.ink} fontSize="25" fontFamily={SANS}>{c}</text>
          </G>
        ))}

        {/* what attention is made of: the query, key and value the KV cache will store */}
        {MECH.map((m, i) => (
          <text key={m} className={i === 2 ? "t-label" : undefined} x="20" y={76 + i * 30} fill={i === 2 ? C.muted : C.ink} fontSize={i === 2 ? 18 : 21} fontFamily={i === 2 ? MONO : SANS}>{m}</text>
        ))}
      </svg>
    </Canvas>
  );
}
