"use client";

import type { ReactNode } from "react";
import { docs, openExternal } from "@/lib/links";
import { Area, C, Show, T, stop } from "../r11/kit";

// The four hands-ons, one per loop (spec: /tmp/handson-spec.md, Daniel, 21 Oct 2026).
// One layout for all four. Step 0: what you do, the time box and the card.
// Step 1: what you leave with, the small picture and how to share it.

const card = { background: C.card, border: `1px solid ${C.rule}`, borderRadius: 14, padding: "2vh 1.6vw" } as const;
const lbl = { ...T.label, ...T.mono, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted } as const;
const block = (e: { stopPropagation: () => void }) => e.stopPropagation();

function CardPill({ path }: { path: string }) {
  return (
    <a href={docs(path)} target="_blank" rel="noopener noreferrer" onPointerDown={block}
      onClick={(e) => { stop(e); e.preventDefault(); openExternal(docs(path)); }}
      className="t-label"
      style={{ ...T.label, ...T.mono, color: C.accent, border: `1.5px solid ${C.accent}`, borderRadius: 100, padding: "0.4em 1em", textDecoration: "none", whiteSpace: "nowrap" }}>
      card: {path.replace(/\/$/, "")} ↗
    </a>
  );
}

type Props = {
  step: number;
  n: number;
  todo: ReactNode[];
  leave: ReactNode;
  minutes: string;
  card: string;
  picture?: ReactNode;
};

function HandsOn({ step, n, todo, leave, minutes, card: path, picture }: Props) {
  return (
    <Area style={{ justifyContent: "center", gap: "3vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)", gap: "3vw", alignItems: "center" }}>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "2.2vh" }}>
          {todo.map((t, i) => (
            <li key={i} style={{ display: "flex", gap: "1.2vw", alignItems: "baseline" }}>
              <span style={{ ...T.body, ...T.mono, color: C.accent, minWidth: "1.4em" }}>{i + 1}</span>
              <span style={{ ...T.body, color: C.ink }}>{t}</span>
            </li>
          ))}
        </ol>
        <Show when={step >= 1} style={{ display: "flex", flexDirection: "column", gap: "2.4vh" }}>
          {picture}
          <div style={{ ...card, borderLeft: `4px solid ${C.accent}` }}>
            <div className="t-label" style={lbl}>you leave with</div>
            <div style={{ ...T.body, color: C.ink, marginTop: 6 }}>{leave}</div>
          </div>
        </Show>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.2vh 1.6vw" }}>
        <CardPill path={path} />
        <span className="t-label" style={{ ...lbl, color: C.warm }}>{minutes}</span>
        <Show when={step >= 1} as="span" style={{ ...T.body, color: C.muted, flexBasis: "100%" }}>
          <span className="t-label" style={{ ...lbl, marginRight: "0.8em" }}>share</span>
          ask Claude to use the share-to-course skill, or open a PR titled{" "}
          <span style={{ ...T.mono, color: C.ink }}>[show-and-tell {n}]</span>
        </Show>
      </div>
    </Area>
  );
}

const code = (s: string) => <span style={{ ...T.mono, fontSize: "0.9em" }}>{s}</span>;

// ---- 0: setup (evolved from r6/HandsOnSetup: the research-setup interview, plus GitHub) ----
export function HandsOn0({ step }: { step: number }) {
  return (
    <HandsOn step={step} n={0} card="exercises/hands-on-0-setup/" minutes="15 minutes · the interview itself takes 5 to 10"
      todo={[
        <>Sign up at {code("github.com")}: Claude and git go hand in hand.</>,
        <>Install Claude Code and the course skills.</>,
        <>Say {code("“interview me about my setup”")}: your work, your resources.</>,
        <>Approve the drafts. No terminal? Paste them into chat.</>,
      ]}
      leave={<>A {code("CLAUDE.md")} and memory files that describe you.</>}
      picture={<SetupFiles />}
    />
  );
}

function SetupFiles() {
  const files = ["CLAUDE.md", "memory/"];
  return (
    <div style={{ display: "flex", gap: "1vw" }}>
      {files.map((f) => (
        <div key={f} className="t-label" style={{ ...T.label, ...T.mono, color: C.ink, background: C.paper, border: `1px solid ${C.rule}`, borderRadius: 8, padding: "0.6em 0.9em" }}>{f}</div>
      ))}
    </div>
  );
}

// ---- 1: inner loop, a metric to hill-climb ----
export function HandsOn1({ step }: { step: number }) {
  return (
    <HandsOn step={step} n={1} card="exercises/hands-on-1-hill-climb/" minutes="20 minutes · a conversation with Claude"
      todo={[
        <>Tell Claude about your project. Which number could it hill-climb?</>,
        <>Pin down the hypothesis, the metric and a held-out check.</>,
        <>Ask how the task could become compute-bound.</>,
        <>What would an overnight loop try?</>,
      ]}
      leave={<>A one-page {code("HYPOTHESIS.md")}.</>}
      picture={<Bound />}
    />
  );
}

// Intelligence-bound: progress waits on your ideas, a few tries. Compute-bound: a metric
// judges each try, so the agent can try many while you sleep.
function Bound() {
  const few = [[40, 52], [70, 30], [96, 58]];
  const many: [number, number][] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) many.push([300 + c * 16, 22 + r * 16]);
  return (
    <svg viewBox="0 0 460 120" width="100%" aria-label="From intelligence-bound to compute-bound" role="img">
      <rect x={4} y={6} width={130} height={76} rx={10} fill={C.paper} stroke={C.rule} />
      {few.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={6} fill={C.warm} />)}
      <path d="M 148 44 H 272" stroke={C.accent} strokeWidth={2.5} />
      <path d="M 264 36 L 278 44 L 264 52" stroke={C.accent} strokeWidth={2.5} fill="none" />
      <text x={211} y={34} textAnchor="middle" fontSize={13} fill={C.accent} className="t-label">a metric</text>
      <rect x={288} y={6} width={168} height={76} rx={10} fill={C.paper} stroke={C.rule} />
      {many.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4.5} fill={C.accent} />)}
      <text x={69} y={102} textAnchor="middle" fontSize={13} fill={C.ink} className="t-label">intelligence-bound</text>
      <text x={69} y={117} textAnchor="middle" fontSize={11} fill={C.muted} className="t-label">waits on your ideas</text>
      <text x={372} y={102} textAnchor="middle" fontSize={13} fill={C.ink} className="t-label">compute-bound</text>
      <text x={372} y={117} textAnchor="middle" fontSize={11} fill={C.muted} className="t-label">waits on GPU hours</text>
    </svg>
  );
}

// ---- 2: middle loop, the thing you keep putting off ----
export function HandsOn2({ step }: { step: number }) {
  return (
    <HandsOn step={step} n={2} card="exercises/hands-on-2-putting-off/" minutes="20 minutes · stretch: review a draft"
      todo={[
        <>Set up Claude in Chrome.</>,
        <>Let Claude interview you about a task you keep putting off.</>,
        <>It drafts the text and fills in the forms.</>,
        <>You read it, and <b style={{ color: C.warm, fontWeight: 600 }}>you press submit</b>.</>,
      ]}
      leave={<>One thing sent, or ready to send.</>}
      picture={<PutOff />}
    />
  );
}

function PutOff() {
  const chips = ["a grant", "compute time", "a travel grant", "an abstract", "a referee report", "your website"];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8vh 0.6vw" }}>
      {chips.map((c) => (
        <span key={c} className="t-label" style={{ ...T.label, color: C.ink, border: `1px solid ${C.rule}`, borderRadius: 100, padding: "0.3em 0.9em", background: C.paper }}>{c}</span>
      ))}
    </div>
  );
}

// ---- 3: outer loop, a dashboard; you steer for 20, then it works alone for 30 ----
export function HandsOn3({ step }: { step: number }) {
  return (
    <HandsOn step={step} n={3} card="exercises/hands-on-3-dashboard/" minutes="20 minutes with you, then 30 alone"
      todo={[
        <>Install ScienceDash, or ask Claude for something like it.</>,
        <>Claude interviews you: which dashboard fits your research?</>,
        <>Steer it for 20 minutes.</>,
        <>Leave it alone for 30 while the talk goes on.</>,
      ]}
      leave={<>A dashboard for your research, or its first version.</>}
      picture={<Rhythm />}
    />
  );
}

function Rhythm() {
  // 20 + 30 minutes to scale, then show and tell.
  const u = 7.4; // px per minute
  const x0 = 4, a = x0 + 20 * u, b = a + 30 * u;
  return (
    <svg viewBox="0 0 460 96" width="100%" role="img" aria-label="You steer for 20 minutes, the agent works alone for 30 while the talk continues, then show and tell">
      <rect x={x0} y={14} width={20 * u} height={34} rx={6} fill={C.accent} />
      <rect x={a + 2} y={14} width={30 * u - 2} height={34} rx={6} fill={C.paper} stroke={C.warm} strokeWidth={1.5} strokeDasharray="5 4" />
      <text x={x0 + 10 * u} y={36} textAnchor="middle" fontSize={13} fill="#fff" className="t-label">you steer</text>
      <text x={a + 15 * u} y={36} textAnchor="middle" fontSize={13} fill={C.warm} className="t-label">agent works alone</text>
      <circle cx={b + 22} cy={31} r={11} fill={C.ink} />
      <text x={b + 22} y={35} textAnchor="middle" fontSize={11} fill="#fff" className="t-label">3</text>
      <text x={x0 + 10 * u} y={66} textAnchor="middle" fontSize={12} fill={C.muted} className="t-label">20 min</text>
      <text x={a + 15 * u} y={66} textAnchor="middle" fontSize={12} fill={C.muted} className="t-label">30 min · the talk continues</text>
      <text x={b + 22} y={66} textAnchor="middle" fontSize={12} fill={C.muted} className="t-label">show</text>
      <text x={b + 22} y={81} textAnchor="middle" fontSize={12} fill={C.muted} className="t-label">and tell</text>
    </svg>
  );
}
