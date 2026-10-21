"use client";
import { C, Canvas, MONO, SANS, Step, Tag, stop } from "./common";

// Published: notes/w19/WEB-RESEARCH.md §2 (Kalai 2025, Sharma 2023 + GPT-4o rollback, METR 2025, Vending-Bench 2025).
// Mine (paraphrased, no quotes): notes/w19/PERLMUTTER-STORIES.md §3 (Pandora honesty note, May 2026);
// notes/w10/EVIDENCE-BASE.md §2.4 (anchoring on my first examples, Sep 2026; one-day bug hunt, Jun 2026)
// and §2.7 (a self-check that compared a file with an identical copy of itself, Aug 2026).
// Sycophancy example: the agent anchored on the examples I mentioned first (EVIDENCE-BASE §2.4, Sep 2026).
const CARDS = [
  { name: "Hallucination", what: ["Training and tests score a guess", "above “I don’t know”"], cite: "Kalai et al. 2025, arXiv:2509.04664", href: "https://arxiv.org/abs/2509.04664", mine: ["twice reported results before", "the runs had finished"] },
  { name: "Sycophancy", what: ["Human raters often prefer", "answers that agree with them"], cite: "Sharma et al. 2023 · GPT-4o update rolled back, Apr 2025", href: "https://arxiv.org/abs/2310.13548", mine: ["kept to the examples I'd", "mentioned first"] },
  { name: "Reward hacking", what: ["The score goes up without", "the task being done"], cite: "METR 2025: o3 did this in 30.4% of RE-Bench runs", href: "https://metr.org/blog/2025-06-05-recent-reward-hacking/", mine: ["a self-check compared a file", "with an identical copy of itself"] },
  { name: "Long-horizon drift", what: ["Over long runs, the agent", "loses track of the goal"], cite: "Vending-Bench 2025: every model had derailed runs", href: "https://arxiv.org/abs/2502.15840", mine: ["a one-day bug hunt ran on", "for several days"] },
];
const W = 556, H = 214;

export function Patterns({ step }: { step: number }) {
  return (
    <Canvas label="Four failure patterns named in published studies, each with why it happens and an example from my own threads: hallucination, sycophancy, reward hacking, long-horizon drift">
      {CARDS.map((c, i) => {
        const x0 = (i % 2) * (W + 40), y0 = 6 + Math.floor(i / 2) * (H + 34);
        return (
          <g key={c.name}>
            <a href={c.href} target="_blank" rel="noopener noreferrer" onClick={stop}>
              <rect x={x0} y={y0} width={W} height={H} rx={14} fill="#fffaf0" stroke={C.rule} strokeWidth={1.2} />
              <text x={x0 + 28} y={y0 + 48} fontSize={28} fontFamily={SANS} fill={C.ink}>{c.name}</text>
              <Tag x={x0 + W - 24} y={y0 + 42} kind="published" anchor="end" />
              {c.what.map((t, j) => <text key={t} x={x0 + 28} y={y0 + 84 + j * 26} fontSize={20} fontFamily={SANS} fill={C.ink}>{t}</text>)}
              <text className="t-label" x={x0 + 28} y={y0 + 138} fontSize={13} fontFamily={MONO} fill={C.muted}>{c.cite}</text>
            </a>
            <Step at={1} step={step} delay={0.12 * i}>
              <line x1={x0 + 28} x2={x0 + W - 28} y1={y0 + 154} y2={y0 + 154} stroke={C.rule} />
              <Tag x={x0 + 28} y={y0 + 184} kind="mine" />
              {c.mine.map((t, j) => <text key={t} className="t-label" x={x0 + 146} y={y0 + 182 + j * 20} fontSize={15} fontFamily={MONO} fill={C.ink}>{t}</text>)}
            </Step>
          </g>
        );
      })}
    </Canvas>
  );
}
