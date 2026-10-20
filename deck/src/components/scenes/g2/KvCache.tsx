"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { C, Canvas, G, MONO, SANS, SERIF, stop } from "./kit";

// llm-inference: GPU memory for Llama-2-7B in fp16. Weights are fixed; the KV cache
// grows with every token of every conversation being served.
// Per token: 2 (K and V) x 32 layers x 4096 dims x 2 bytes = 524,288 bytes.
const KV_GB_PER_TOKEN = (2 * 32 * 4096 * 2) / 1e9;
const WEIGHTS_GB = 6.74 * 2; // 6.74B parameters x 2 bytes
const MAX_GB = 40;

const PRESETS = [
  { conv: 0, tokens: 10000 },
  { conv: 1, tokens: 10000 },
  { conv: 8, tokens: 4096 },
];

const CAPTIONS = [
  "The model itself: a fixed cost.",
  "One 10,000-token conversation adds 40% to the model.",
  "Serve eight users and the cache outgrows the model.",
];

const L = 110, R = 1130, BY = 230, BH = 92;
const x = (gb: number) => L + (Math.min(gb, MAX_GB) / MAX_GB) * (R - L);

function Bars({ step }: { step: number }) {
  const [conv, setConv] = useState(PRESETS[step].conv);
  const [tokens, setTokens] = useState(PRESETS[step].tokens);
  useEffect(() => { setConv(PRESETS[step].conv); setTokens(PRESETS[step].tokens); }, [step]);
  const kv = conv * tokens * KV_GB_PER_TOKEN;
  const custom = conv !== PRESETS[step].conv || tokens !== PRESETS[step].tokens;
  const fmt = (n: number) => n.toLocaleString("en-GB");

  return (
    <div className="flex h-full w-full flex-col">
      <svg viewBox="0 0 1200 470" className="min-h-0 w-full flex-1" role="img" aria-label={`GPU memory: weights ${WEIGHTS_GB.toFixed(1)} GB plus KV cache ${kv.toFixed(1)} GB`}>
        <text x="600" y="62" textAnchor="middle" fill={C.ink} fontSize="50" fontFamily={SERIF} fontStyle="italic">0.5 MB of cache for every token</text>
        <text className="t-label" x="600" y="102" textAnchor="middle" fill={C.muted} fontSize="18" fontFamily={MONO}>2 (keys and values) × 32 layers × 4,096 dims × 2 bytes · Llama-2-7B, fp16</text>

        {[0, 10, 20, 30, 40].map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={BY} y2={BY + BH + 12} stroke={C.rule} strokeWidth="1" />
            <text className="t-label" x={x(t)} y={BY + BH + 38} textAnchor="middle" fill={C.muted} fontSize="17" fontFamily={MONO}>{t} GB</text>
          </g>
        ))}

        <motion.rect y={BY} height={BH} rx="4" fill={C.s1} initial={false} animate={{ x: x(0), width: x(WEIGHTS_GB) - x(0) - 1 }} />
        <text x={x(0)} y={BY - 30} fill={C.ink} fontSize="22" fontFamily={SANS} fontWeight="500">weights <tspan fontFamily={MONO} fontWeight="400">{WEIGHTS_GB.toFixed(1)} GB</tspan></text>
        <text className="t-label" x={x(0)} y={BY - 6} fill={C.muted} fontSize="16" fontFamily={MONO}>6.74B parameters × 2 bytes</text>

        <motion.rect y={BY} height={BH} rx="4" fill={C.s2} initial={false} animate={{ x: x(WEIGHTS_GB) + 1, width: Math.max(0, x(WEIGHTS_GB + kv) - x(WEIGHTS_GB) - 1) }} transition={{ duration: 1.1, ease: "easeOut" }} />
        <G on={kv > 0}>
          <text x={x(WEIGHTS_GB) + 10} y={BY - 30} fill={C.ink} fontSize="22" fontFamily={SANS} fontWeight="500">KV cache <tspan fontFamily={MONO} fontWeight="400">{kv.toFixed(1)} GB</tspan></text>
          <text className="t-label" x={x(WEIGHTS_GB) + 10} y={BY - 6} fill={C.muted} fontSize="16" fontFamily={MONO}>{conv} × {fmt(tokens)} tokens</text>
        </G>

        {CAPTIONS.map((c, i) => (
          <G key={c} on={!custom && step === i}>
            <text x="600" y="440" textAnchor="middle" fill={C.ink} fontSize="27" fontFamily={SANS}>{c}</text>
          </G>
        ))}
        <G on={custom}>
          <text x="600" y="440" textAnchor="middle" fill={C.ink} fontSize="27" fontFamily={SANS}>Total {(WEIGHTS_GB + kv).toFixed(1)} GB</text>
        </G>
      </svg>

      <div className="flex shrink-0 items-center [&_input]:accent-[#eb6834] justify-center gap-10 pb-1 font-mono text-[14px]" style={{ color: C.muted }} onClick={stop} onKeyDown={stop}>
        <label className="t-label flex items-center gap-3">users
          <input type="range" min={0} max={16} value={conv} onChange={(e) => setConv(+e.target.value)} aria-label="Conversations served at once" />
          <span className="w-6 text-right" style={{ color: C.ink }}>{conv}</span>
        </label>
        <label className="t-label flex items-center gap-3">tokens each
          <input type="range" min={1000} max={16000} step={500} value={tokens} onChange={(e) => setTokens(+e.target.value)} aria-label="Tokens per conversation" />
          <span className="w-16 text-right" style={{ color: C.ink }}>{fmt(tokens)}</span>
        </label>
      </div>
    </div>
  );
}

export function KvCache({ step }: { step: number }) {
  return (
    <Canvas>
      <Bars step={Math.min(step, 2)} />
    </Canvas>
  );
}
