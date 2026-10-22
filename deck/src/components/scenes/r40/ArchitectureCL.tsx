"use client";
import { motion } from "motion/react";
import { Architecture } from "../r5/Architecture";
import { C, Canvas, MONO, SANS, SERIF } from "../r5/common";

// Step 2 of limits-architecture: "Is anyone close to fixing this?"
// Sources (abstracts / official blog read 2026-10-22):
// - Behrouz, Zhong, Mirrokni, "Titans: Learning to Memorize at Test Time", arXiv:2501.00663:
//   neural long-term memory updated at test time; beats Transformers and linear RNNs; >2M-token needle-in-haystack.
// - Google Research blog, "Introducing Nested Learning" (NeurIPS 2025): Hope, a self-modifying architecture built on Titans;
//   reported gains on language modeling, long-context NIAH and continual-learning tasks; framed as research.
// - Lin et al. (Meta), "Continual Learning via Sparse Memory Finetuning", arXiv:2510.15103: updating only highly
//   activated memory-layer slots; NaturalQuestions F1 drop 11% vs 89% (full finetuning) and 71% (LoRA), same new-knowledge gain.
// - Zweiger et al. (MIT), "Self-Adapting Language Models" (SEAL), arXiv:2506.10943: model generates its own finetuning
//   data and directives, trained with RL; shown on knowledge incorporation and few-shot generalization.
const CARDS = [
  { t: "Memory that keeps training", who: "Titans, Hope · Google, 2025", body: ["A memory module keeps", "training as text streams in."] },
  { t: "Update only a few slots", who: "Sparse memory finetuning · Meta, 2025", body: ["New facts go into a few slots:", "old facts drop 11%, not 89%."] },
  { t: "It writes its own lessons", who: "SEAL · MIT, 2025", body: ["Writes its own training data,", "then updates on it."] },
];
const W = 360, G = 36;

function Cards() {
  return (
    <Canvas label="Three research directions in continual learning: Titans and Hope from Google, a memory module that keeps training on the text it reads; sparse memory finetuning from Meta, updating only a few memory slots so old facts are mostly kept; SEAL from MIT, a model writing its own training data. None is in products; today's agents still remember through files and context, not weights.">
      <text x={0} y={40} fontSize={23} fontFamily={SANS} fill={C.ink}>
        Is anyone close? <tspan fontFamily={SERIF} fontStyle="italic" fontSize={25}>Promising research, not in products yet.</tspan>
      </text>
      {CARDS.map((c, i) => (
        <motion.g key={c.t} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 * i }}>
          <rect x={i * (W + G)} y={84} width={W} height={300} rx={14} fill="#fffaf0" stroke={C.rule} strokeWidth={1.5} />
          <text className="t-label" x={i * (W + G) + 22} y={118} fontSize={13} fontFamily={MONO} fill={C.muted}>{c.who}</text>
          <text x={i * (W + G) + 22} y={160} fontSize={22} fontFamily={SANS} fontWeight={600} fill={C.accent}>{c.t}</text>
          <text fontSize={19} fontFamily={SANS} fill={C.ink}>
            {c.body.map((l, k) => <tspan key={k} x={i * (W + G) + 22} y={210 + k * 30}>{l}</tspan>)}
          </text>
        </motion.g>
      ))}
      <text x={0} y={440} fontSize={22} fontFamily={SANS} fill={C.ink}>Today’s agents still remember through files and context, not weights.</text>
      <text className="t-label" x={0} y={472} fontSize={13} fontFamily={MONO} fill={C.muted}>research papers, 2025; my reading of their abstracts</text>
    </Canvas>
  );
}

export function ArchitectureCL({ step }: { step: number }) {
  return step >= 2 ? <Cards /> : <Architecture step={step} />;
}
