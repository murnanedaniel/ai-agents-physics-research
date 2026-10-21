"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { C, Canvas, G, MONO, SANS, stop } from "../g2/kit";

// llm-inference (round 2): what the KV cache is.
// Step 0: every layer stores a key and a value for every past token; the new
//         token's query is compared with all stored keys.
// Step 1: prefill (the prompt, all at once) vs decode (one token at a time).
// Step 2: memory grows linearly with context. Llama 3.1 8B in bf16:
//         2 (K, V) x 32 layers x 8 KV heads x 128 dims x 2 bytes = 131,072 B/token.
const PROMPT = ["A", "mu", "on", "is", "heavier", "than", "an"];
const GEN = ["atom", ",", "and"]; // GPT-2 small's greedy continuation
const ALL = [...PROMPT, ...GEN];
const LAYERS = ["layer 1", "layer 2", "layer 32"];

const KV_GB_PER_TOKEN = (2 * 32 * 8 * 128 * 2) / 1e9;
const WEIGHTS_GB = 8.03 * 2;
const MAX_GB = 40;

const CAPTIONS = [
  "Each layer keeps a key and a value for every token so far.",
  "Prefill writes the prompt at once. Decode adds one token at a time.",
  "Memory grows with context. At 128k tokens the cache outweighs the model.",
];

const COL = (i: number) => 190 + i * 92;
const ROW = (j: number) => 110 + j * 70;

export function KvCacheR3({ step }: { step: number }) {
  const [tokens, setTokens] = useState(128000);
  useEffect(() => { if (step < 2) setTokens(128000); }, [step]);
  const kv = tokens * KV_GB_PER_TOKEN;
  const L = 190, R = 1100;
  const x = (gb: number) => L + (Math.min(gb, MAX_GB) / MAX_GB) * (R - L);
  // which columns are filled at this step: step 0 shows the prompt plus the new token
  const shown = (i: number) => (step === 0 ? i <= PROMPT.length : true);
  const delay = (i: number) => (step === 1 ? (i < PROMPT.length ? 0.2 : 1.0 + 0.7 * (i - PROMPT.length)) : 0);
  const q = step === 0 ? PROMPT.length : ALL.length - 1; // the token whose query we draw

  return (
    <Canvas>
      <div className="flex h-full w-full flex-col">
        <svg viewBox="0 0 1200 560" className="min-h-0 w-full flex-1" role="img" aria-label="The KV cache: a key and a value per token per layer, written all at once for the prompt and one column at a time while generating; its size grows linearly with context">
          {CAPTIONS.map((c, i) => (
            <G key={c} on={step === i}>
              <text x="20" y="30" fill={C.ink} fontSize="25" fontFamily={SANS}>{c}</text>
            </G>
          ))}

          {/* layer labels */}
          {LAYERS.map((l, j) => (
            <text key={l} className="t-label" x="120" y={ROW(j) + 22} textAnchor="end" fill={C.muted} fontSize="16" fontFamily={MONO}>{l}</text>
          ))}
          <text className="t-label" x="120" y={ROW(1) + 58} textAnchor="end" fill={C.muted} fontSize="16" fontFamily={MONO}>⋮</text>

          {/* token columns: K and V chips per layer */}
          {ALL.map((t, i) => {
            const isNew = i === q;
            return (
              <G key={`${step}-${i}`} on={shown(i)} delay={delay(i)}>
                {LAYERS.map((l, j) => (
                  <g key={l}>
                    <rect x={COL(i) - 30} y={ROW(j)} width="28" height="30" rx="4" fill={C.s1} fillOpacity={isNew ? 1 : 0.55} />
                    <rect x={COL(i) + 2} y={ROW(j)} width="28" height="30" rx="4" fill={C.s2} fillOpacity={isNew ? 1 : 0.55} />
                  </g>
                ))}
                <rect x={COL(i) - 40} y={ROW(2) + 50} width="80" height="40" rx="7" fill={isNew ? "#dbe8f3" : C.card} stroke={isNew ? C.accent : C.faint} strokeWidth={isNew ? 2.5 : 1.5} />
                <text x={COL(i)} y={ROW(2) + 77} textAnchor="middle" fill={C.ink} fontSize="19" fontFamily={SANS}>{t}</text>
              </G>
            );
          })}
          <text className="t-label" x="120" y={ROW(2) + 66} textAnchor="end" fill="#1f5fae" fontSize="16" fontFamily={MONO}>■ key</text>
          <text className="t-label" x="120" y={ROW(2) + 88} textAnchor="end" fill={C.warmText} fontSize="16" fontFamily={MONO}>■ value</text>

          {/* the new token's query against every stored key, in the top layer */}
          <G key={`q${step}`} on={step <= 1} delay={step === 1 ? 2.6 : 0.6}>
            {ALL.slice(0, q).map((_, i) => (
              <path key={i} d={`M ${COL(q)} ${ROW(0)} Q ${(COL(q) + COL(i)) / 2} ${ROW(0) - 34 - 4 * (q - i)} ${COL(i) - 16} ${ROW(0)}`} fill="none" stroke={C.ink} strokeOpacity="0.5" strokeWidth="1.5" />
            ))}
            {step === 0 && <text className="t-label" x={COL(q) + 44} y={ROW(0) + 20} fill={C.ink} fontSize="16" fontFamily={MONO}>new query · every key</text>}
          </G>

          {/* prefill / decode braces */}
          <G on={step >= 1}>
            <path d={`M ${COL(0) - 40} ${ROW(2) + 104} L ${COL(PROMPT.length - 1) + 40} ${ROW(2) + 104}`} stroke={C.accent} strokeWidth="3" />
            <text className="t-label" x={(COL(0) + COL(PROMPT.length - 1)) / 2} y={ROW(2) + 130} textAnchor="middle" fill={C.accent} fontSize="17" fontFamily={MONO}>prefill: in parallel, compute-bound</text>
            <path d={`M ${COL(PROMPT.length) - 40} ${ROW(2) + 104} L ${COL(ALL.length - 1) + 40} ${ROW(2) + 104}`} stroke={C.warm} strokeWidth="3" />
            <text className="t-label" x={(COL(PROMPT.length) + COL(ALL.length - 1)) / 2} y={ROW(2) + 130} textAnchor="middle" fill={C.warmText} fontSize="17" fontFamily={MONO}>decode: reads it all, memory-bound</text>
          </G>

          {/* memory bar */}
          <G on={step >= 2}>
            <text className="t-label" x={L} y="452" fill={C.ink} fontSize="17" fontFamily={MONO}>GPU memory, Llama 3.1 8B</text>
            <rect x={x(0)} y="464" height="44" width={x(WEIGHTS_GB) - x(0) - 1} rx="4" fill={C.s1} fillOpacity="0.35" stroke={C.s1} />
            <text x={x(0) + 12} y="493" fill={C.ink} fontSize="19" fontFamily={SANS}>weights 16 GB</text>
            <motion.rect y="464" height="44" rx="4" fill={C.s2} initial={false} animate={{ x: x(WEIGHTS_GB) + 1, width: Math.max(0, x(WEIGHTS_GB + kv) - x(WEIGHTS_GB) - 1) }} transition={{ duration: 0.6 }} />
            <text x={Math.min(x(WEIGHTS_GB + kv) + 12, 1000)} y="493" fill={C.ink} fontSize="19" fontFamily={SANS}>KV cache {kv.toFixed(1)} GB</text>
            {[0, 10, 20, 30, 40].map((t) => (
              <text key={t} className="t-label" x={x(t)} y="534" textAnchor="middle" fill={C.muted} fontSize="15" fontFamily={MONO}>{t} GB</text>
            ))}
          </G>
        </svg>
        <div className="flex shrink-0 items-center justify-center gap-4 pb-1 font-mono text-[14px] [&_input]:accent-[#eb6834]" style={{ color: C.muted, visibility: step >= 2 ? "visible" : "hidden" }} onClick={stop} onKeyDown={stop} onPointerDown={stop}>
          <label className="t-label flex items-center gap-3">context
            <input type="range" min={0} max={128000} step={1000} value={tokens} onChange={(e) => setTokens(+e.target.value)} aria-label="Tokens of context" />
            <span className="w-36 whitespace-nowrap text-right" style={{ color: C.ink }}>{tokens.toLocaleString("en-GB")} tokens</span>
          </label>
          <span className="t-label">0.13 MB per token</span>
        </div>
      </div>
    </Canvas>
  );
}
