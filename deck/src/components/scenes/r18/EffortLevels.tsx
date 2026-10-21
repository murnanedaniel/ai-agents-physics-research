"use client";

import { Area, C, G, Show, T } from "../r11/kit";

// effort-levels: how hard should the model think?
// Sources (fetched 2026-10-21):
// - code.claude.com/docs/en/model-config, "Adjust effort level": effort controls
//   adaptive reasoning, "the model decide[s] whether and how much to think on each
//   step"; levels low, medium, high, xhigh, max; default high except Opus 5.5,
//   Sonnet 5.5 and Haiku 5.5 default to medium; max applies "to the current session
//   only" unless set through CLAUDE_CODE_EFFORT_LEVEL; how to set it (/effort,
//   /model arrows, --effort, env var, skill/subagent frontmatter `effort:`);
//   "Choose an effort level" table (low: quick exchanges; high: verification
//   matters, e.g. fixing a bug; max: hard problems without you). Thinking tokens
//   are charged "even when collapsed or redacted".
// - platform.claude.com/docs effort page: effort applies to all output tokens,
//   lower effort makes fewer, terser tool calls; Sonnet 5.5 defaults to high on
//   the API (the discrepancy flagged in the label).
// - platform.claude.com/docs thinking-steering-and-cost: thinking billed as output tokens.
// - claude.com/blog "Choosing a Claude model and effort level in Claude Code"
//   (Lydia Hallie): effort covers files read and tools used; the high-effort path
//   "generates roughly 7x more tokens" (one illustrative example); the diagnostic
//   (skipped a file or the tests -> higher effort; tried and still wrong -> more
//   capable model).
// - Task chips: Daniel's model-choice cards (low bulk search, medium code from a
//   spec, high verification, xhigh judgement); max from the docs table.
// The two timelines are schematic: block lengths are illustrative, not measured.

const MONO = "var(--font-geist-mono), monospace";

type Blk = { k: "think" | "act"; w: number };
const LOW: Blk[] = [
  { k: "act", w: 34 }, { k: "act", w: 34 }, { k: "think", w: 16 }, { k: "act", w: 34 }, { k: "act", w: 40 },
];
const HIGH: Blk[] = [
  { k: "think", w: 90 }, { k: "act", w: 34 }, { k: "act", w: 34 }, { k: "think", w: 60 }, { k: "act", w: 34 },
  { k: "think", w: 130 }, { k: "act", w: 34 }, { k: "act", w: 34 }, { k: "think", w: 70 }, { k: "act", w: 34 },
  { k: "act", w: 34 }, { k: "think", w: 110 }, { k: "act", w: 40 },
];

function Row({ y, blocks, label }: { y: number; blocks: Blk[]; label: string }) {
  let x = 110;
  return (
    <g>
      <text className="t-label" x={96} y={y + 21} textAnchor="end" fill={C.ink} fontSize="20" fontFamily={MONO}>{label}</text>
      {blocks.map((b, i) => {
        const r = (
          <rect key={i} x={x} y={y} width={b.w - 4} height={30} rx="4"
            fill={b.k === "think" ? C.warm : C.accent} opacity={b.k === "think" ? 0.85 : 0.75} />
        );
        x += b.w;
        return r;
      })}
    </g>
  );
}

const LEVELS = [
  { name: "low", job: "bulk search, quick sketches" },
  { name: "medium", job: "code from a spec", note: "default on 5.5 models" },
  { name: "high", job: "bug fixes, verification" },
  { name: "xhigh", job: "high-stakes judgement" },
  { name: "max", job: "hard problems, left alone", note: "this session only" },
];

const chip = { background: C.card, border: `1px solid ${C.rule}`, borderRadius: 10, padding: "6px 10px" } as const;

export function EffortLevels({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "2.2vh" }}>
      <svg viewBox="0 0 1200 170" style={{ width: "100%", height: "auto", maxHeight: "24vh", display: "block" }} role="img"
        aria-label="Same prompt at two effort levels: at low effort a short run of tool calls with one small thinking block; at high effort many more tool calls and long thinking blocks">
        <text className="t-label" x={110} y={18} fill={C.muted} fontSize="17" fontFamily={MONO}>same prompt, one turn (schematic)</text>
        <rect x={830} y={4} width={18} height={16} rx="3" fill={C.warm} opacity={0.85} />
        <text className="t-label" x={854} y={18} fill={C.muted} fontSize="17" fontFamily={MONO}>thinking</text>
        <rect x={950} y={4} width={18} height={16} rx="3" fill={C.accent} opacity={0.75} />
        <text className="t-label" x={974} y={18} fill={C.muted} fontSize="17" fontFamily={MONO}>tool call or text</text>
        <Row y={40} blocks={LOW} label="low" />
        <Row y={95} blocks={HIGH} label="high" />
        <G when={step >= 2}>
          <text className="t-label" x={1190} y={160} textAnchor="end" fill={C.warm} fontSize="17" fontFamily={MONO}>
            in one example, about 7× the tokens · thinking is billed as output
          </text>
        </G>
      </svg>

      <div style={{ ...T.body, color: C.ink }}>
        On each step the model decides whether to think, and how much. Effort sets how readily it does.
        <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted, marginTop: 4 }}>
          it also sets how many files it reads and tools it calls · next: why thinking longer helps
        </div>
      </div>

      <Show when={step >= 1}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "10%", right: "10%", top: 11, height: 3, background: `linear-gradient(90deg, ${C.accent}, ${C.warm})`, borderRadius: 2 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", columnGap: "1vw" }}>
            {LEVELS.map((l, i) => (
              <div key={l.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: 25, height: 25, borderRadius: "50%", zIndex: 1, background: l.name === "medium" ? C.ink : C.paper, border: `3px solid ${i < 2 ? C.accent : C.warm}` }} />
                <div style={{ ...T.big, ...T.mono, color: C.ink, marginTop: 4 }}>{l.name}</div>
                <div className="t-label" style={{ ...T.label, ...T.mono, color: l.name === "medium" ? C.accent : C.warm, minHeight: "1.3em" }}>{l.note ?? ""}</div>
                <Show when={step >= 2} style={{ ...chip, marginTop: 6, width: "100%" }}>
                  <div style={{ ...T.body, color: C.ink }}>{l.job}</div>
                </Show>
              </div>
            ))}
          </div>
          <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted, marginTop: 8, textAlign: "center" }}>
            set with /effort · arrows in /model · --effort · CLAUDE_CODE_EFFORT_LEVEL · effort: in a skill or subagent · Sonnet 5.5 defaults to high on the raw API
          </div>
        </div>
      </Show>

      <Show when={step >= 2}>
        <div style={{ borderLeft: `4px solid ${C.warm}`, paddingLeft: 16, ...T.body, ...T.serif, color: C.ink }}>
          Skipped a file or the tests? Turn effort up. Tried properly and still wrong? Use a bigger model.
        </div>
      </Show>
    </Area>
  );
}
