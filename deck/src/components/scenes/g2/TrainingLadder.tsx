"use client";

import { Arrowheads, C, Canvas, G, MONO, SANS, SERIF } from "./kit";

// llm-training: four post-training stages, ordered by where the learning signal
// comes from: from human judgement towards outcomes a program can check.
const STAGES = [
  { verb: "Imitate", name: "SFT", signal: "human demonstrations", note: "InstructGPT, 2022" },
  { verb: "Prefer", name: "RLHF", signal: "human preference rankings", note: "1.3B preferred to 175B GPT-3" },
  { verb: "Verify", name: "RLVR", signal: "an automatic checker", note: "Tülu 3, 2024 · R1, 2025" },
  { verb: "Act", name: "agentic RL", signal: "outcomes in tool environments", note: "Kimi K2, 2025" },
];

const X0 = 40, W = 262, GAP = 18, Y0 = 70, H = 300;

export function TrainingLadder({ step }: { step: number }) {
  return (
    <Canvas>
      <svg viewBox="0 0 1200 600" className="h-full w-full" role="img" aria-label="Four training stages: supervised fine-tuning, RLHF, RL with verifiable rewards, agentic RL">
        <Arrowheads id="g2-tr" color={C.ink} />
        <defs>
          <linearGradient id="g2-tr-g" x1="0" x2="1">
            <stop offset="0" stopColor={C.warm} />
            <stop offset="1" stopColor={C.accent} />
          </linearGradient>
        </defs>
        {STAGES.map((s, i) => {
          const x = X0 + i * (W + GAP);
          const live = step === i;
          return (
            <G key={s.name} on={step >= i}>
              <rect x={x} y={Y0} width={W} height={H} rx="16" fill={live ? "#ffffff" : C.card} stroke={live ? C.accent : C.faint} strokeWidth={live ? 2.5 : 1.5} />
              <text x={x + 24} y={Y0 + 70} fill={C.ink} fontSize="44" fontFamily={SERIF} fontStyle="italic">{s.verb}</text>
              <text className="t-label" x={x + 24} y={Y0 + 108} fill={C.accent} fontSize="20" fontFamily={MONO}>{s.name}</text>
              <text className="t-label" x={x + 24} y={Y0 + 170} fill={C.muted} fontSize="16" fontFamily={MONO}>learns from</text>
              {s.signal.split(" ").reduce<string[]>((lines, w) => {
                const last = lines[lines.length - 1];
                if (last && (last + " " + w).length <= 18) lines[lines.length - 1] = last + " " + w; else lines.push(w);
                return lines;
              }, []).map((ln, k) => (
                <text key={k} x={x + 24} y={Y0 + 202 + k * 30} fill={C.ink} fontSize="24" fontFamily={SANS}>{ln}</text>
              ))}
              <text className="t-label" x={x + 24} y={Y0 + H + 32} fill={C.muted} fontSize="15" fontFamily={MONO}>{s.note}</text>
            </G>
          );
        })}

        <G on={step >= 1}>
          <rect x={X0} y={Y0 + H + 70} width={4 * W + 3 * GAP} height="8" rx="4" fill="url(#g2-tr-g)" />
          <text className="t-label" x={X0} y={Y0 + H + 112} fill={C.warmText} fontSize="19" fontFamily={MONO}>a person judges</text>
          <text className="t-label" x={X0 + 4 * W + 3 * GAP} y={Y0 + H + 112} textAnchor="end" fill={C.accent} fontSize="19" fontFamily={MONO}>a program checks</text>
        </G>
        <G on={step >= 3}>
          <text x="600" y={Y0 + H + 172} textAnchor="middle" fill={C.ink} fontSize="27" fontFamily={SANS}>Agentic work is trained where the outcome can be checked.</text>
        </G>
      </svg>
    </Canvas>
  );
}
