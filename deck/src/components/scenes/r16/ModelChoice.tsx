"use client";

import { Area, C, Show, T } from "../r11/kit";

// model-choice: which model should do which job?
// Prices, $ per million tokens, platform.claude.com/docs/en/about-claude/pricing
// (read 2026-10-21): Opus 5.5 $4 in / $20 out; Sonnet 5.5 $2 / $10; Haiku 5.5
// $0.10 / $0.50 for prompts up to 100k tokens ($0.50 / $2.50 above); Fable 5.1
// $10 / $50. Fast mode on Opus 5.5: $8 / $40.
// Ratios against Opus 5.5 (same for input and output): Sonnet 2/4 = 10/20 = 1/2;
// Haiku 0.1/4 = 0.5/20 = 1/40 (prompts over 100k: 0.5/4 = 2.5/20 = 1/8);
// fast mode 8/4 = 40/20 = 2; Fable 10/4 = 50/20 = 2.5.
// Effort levels and defaults: code.claude.com/docs/en/model-config ("Adjust
// effort level", "Choose an effort level"). Fast mode "up to 2.5x faster":
// code.claude.com/docs/en/fast-mode.
// Daniel's practice: memory notes use-latest-models (alias "sonnet" resolved to
// claude-sonnet-5 on 2026-10-19) and codex-model-tiers; his global CLAUDE.md
// (Claude plans and reviews, Codex implements and gives a second opinion).

const OUT_MAX = 40; // fast-mode Opus output price sets the bar scale

type Job = { task: string; effort: string };
type Col = { name: string; price?: string; ratio: string; out?: number; jobs: Job[]; other?: boolean };

const COLS: Col[] = [
  {
    name: "Opus 5.5", price: "$4 in · $20 out", ratio: "1×", out: 20,
    jobs: [
      { task: "planning and architecture", effort: "high" },
      { task: "review and verification", effort: "high" },
      { task: "high-stakes judgement", effort: "xhigh" },
    ],
  },
  { name: "Sonnet 5.5", price: "$2 in · $10 out", ratio: "½×", out: 10, jobs: [{ task: "writing code from a spec", effort: "medium" }] },
  { name: "Haiku 5.5", price: "$0.10 in · $0.50 out", ratio: "1/40×", out: 0.5, jobs: [{ task: "bulk search and summarising", effort: "low" }] },
  { name: "GPT, via Codex", ratio: "", other: true, jobs: [{ task: "independent second review", effort: "trained by another lab" }] },
];

const chip = { background: C.card, border: `1px solid ${C.rule}`, borderRadius: 10, padding: "8px 12px", marginTop: 8 } as const;

function Bar({ out }: { out: number }) {
  const h = (out / OUT_MAX) * 100;
  return (
    <div style={{ position: "relative", height: "100%", width: "38%" }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${Math.max(h, 1.2)}%`, background: C.accent, borderRadius: "4px 4px 0 0" }} />
    </div>
  );
}

export function ModelChoice({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "1.6vh", bottom: "11vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr 1fr 1fr", columnGap: "1.6vw", alignItems: "start" }}>
        {COLS.map((c) => {
          const body = (
            <>
              <div style={{ height: "12vh", display: "flex", alignItems: "flex-end", gap: 10, borderBottom: `1.5px solid ${c.other ? "transparent" : C.ink}` }}>
                {c.out !== undefined && <Bar out={c.out} />}
                {c.name === "Opus 5.5" && (
                  <div style={{ position: "relative", height: "100%", width: "38%" }}>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100%", border: `2px dashed ${C.warm}`, borderBottom: "none", borderRadius: "4px 4px 0 0" }} />
                    <div className="t-label" style={{ ...T.label, ...T.mono, color: C.warm, position: "absolute", top: 4, left: 6 }}>fast</div>
                  </div>
                )}
                {c.out !== undefined && (
                  <div className="t-label" style={{ ...T.big, ...T.mono, color: C.accent, marginLeft: "auto" }}>{c.ratio}</div>
                )}
              </div>
              <div style={{ ...T.big, ...T.serif, color: C.ink, marginTop: 8 }}>{c.name}</div>
              <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>
                {c.price ?? "billed through a ChatGPT plan"}
              </div>
              <Show when={step >= 1}>
                {c.jobs.map((j) => (
                  <div key={j.task} style={{ ...chip, borderColor: c.other ? C.warm : C.rule, borderStyle: c.other ? "dashed" : "solid" }}>
                    <div style={{ ...T.body, color: C.ink }}>{j.task}</div>
                    <div className="t-label" style={{ ...T.label, ...T.mono, color: c.other ? C.warm : C.accent }}>
                      {c.other ? j.effort : `${j.effort} effort`}
                    </div>
                  </div>
                ))}
              </Show>
            </>
          );
          return c.other ? <Show key={c.name} when={step >= 1}>{body}</Show> : <div key={c.name}>{body}</div>;
        })}
      </div>

      <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>
        bars: output price per token, relative to Opus · /effort: low, medium (default), high, xhigh, max · /fast: Opus up to 2.5× faster at 2× the price · Haiku is 1/8× above 100k-token prompts · Fable 5.1 sits above Opus at 2.5×
      </div>

      <Show when={step >= 2} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "2.5vw", alignItems: "start" }}>
        <div style={{ ...T.body, color: C.muted }}>
          I run the newest models by full name; “sonnet” once gave me Sonnet 5, not 5.5.
        </div>
        <div style={{ borderLeft: `4px solid ${C.warm}`, paddingLeft: 16, ...T.body, ...T.serif, color: C.ink }}>
          Wrong answers cost more than saved tokens. Use the strongest model for anything you trust. Downshift only for bulk work you can check.
        </div>
      </Show>
    </Area>
  );
}
