"use client";
import { C, Canvas, MONO, SANS, Step, stop } from "./common";

// notes/STORYBOARD.md §1.4.3; numbers and dates from notes/w19/WEB-RESEARCH.md §2.
const CARDS = [
  { name: "Hallucination", what: "Training rewards a guess over “I don’t know”", cite: "Kalai et al., 4 Sep 2025 · arXiv:2509.04664", href: "https://arxiv.org/abs/2509.04664" },
  { name: "Sycophancy", what: "Agreeing beats being right", cite: "Sharma et al. 2023 · GPT-4o rollback, 29 Apr 2025", href: "https://arxiv.org/abs/2310.13548" },
  { name: "Reward hacking", what: "o3 hacked 30.4% of RE-Bench runs", cite: "METR, 5 Jun 2025 · 100% of runs on one task", href: "https://metr.org/blog/2025-06-05-recent-reward-hacking/" },
  { name: "Long-horizon drift", what: "Every model had runs that derailed", cite: "Vending-Bench, Feb 2025 · over 20M tokens per run", href: "https://arxiv.org/abs/2502.15840" },
];
const W = 556, H = 200;

export function Patterns({ step }: { step: number }) {
  return (
    <Canvas label="Four failure patterns named in the literature: hallucination, sycophancy, reward hacking, long-horizon drift">
      <Step at={0} step={step}>
        <text className="t-label" x={0} y={14} fontSize={14} fontFamily={MONO} fill={C.muted}>a model saying what scores well</text>
      </Step>
      <Step at={1} step={step}>
        <text className="t-label" x={0} y={282} fontSize={14} fontFamily={MONO} fill={C.muted}>an agent acting over many steps</text>
      </Step>
      {CARDS.map((c, i) => {
        const x0 = (i % 2) * (W + 40), y0 = 30 + Math.floor(i / 2) * (H + 68);
        return (
          <Step key={c.name} at={Math.floor(i / 2)} step={step} delay={(i % 2) * 0.2}>
            <a href={c.href} target="_blank" rel="noopener noreferrer" onClick={stop}>
              <rect x={x0} y={y0} width={W} height={H} rx={14} fill="#e9f0f2" stroke="rgba(3,105,161,0.35)" strokeWidth={1.2} />
              <text x={x0 + 30} y={y0 + 58} fontSize={30} fontFamily={SANS} fill={C.ink}>{c.name}</text>
              <text x={x0 + 30} y={y0 + 108} fontSize={22} fontFamily={SANS} fill={C.ink}>{c.what}</text>
              <text className="t-label" x={x0 + 30} y={y0 + 160} fontSize={15} fontFamily={MONO} fill={C.muted}>{c.cite}</text>
            </a>
          </Step>
        );
      })}
    </Canvas>
  );
}
