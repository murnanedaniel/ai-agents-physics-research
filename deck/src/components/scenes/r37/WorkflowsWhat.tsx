"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Area, C, G, Show, T } from "../r11/kit";

// workflows-what (round 3 rewrite). Frames dynamic workflows as one answer to
// the outer-loop problem from outer-intro: juggling many projects loses
// context, and orchestrating by hand puts every result into one context.
// Step 0: by hand, each agent's result returns into the orchestrator's
// context (the meter fills). Step 1: a workflow. Claude writes a script; the
// runtime fans agents out in parallel, pipes each result to a verifier, merges,
// and returns one answer; the orchestrator's context stays small. Step 2: what
// the script looks like and when to reach for one.
// Source: Claude Code docs, "Orchestrate subagents at scale with dynamic
// workflows" (code.claude.com/docs/en/workflows), read 22 Oct 2026:
// "a JavaScript script that orchestrates many subagents at once. Claude writes
// the script ... and a runtime executes it in the background"; "A workflow
// moves the plan into code ... the script holds the loop, the branching, and
// the intermediate results itself, so Claude's context holds only the final
// answer"; agent() spawns one subagent, pipeline() runs one per item,
// parallel() runs a set at once; the audit-routes example script; quality
// patterns (adversarial review); saved as a command and rerun; examples:
// codebase-wide sweep, 500-file migration, cross-checked research; up to 16
// concurrent agents by default, 1,000 agents per run.
// Dot counts in the picture are schematic.
const MONO = "var(--font-geist-mono), monospace";
const Lbl = ({ x, y, children, fill = C.muted, anchor = "middle", size = 17 }: { x: number; y: number; children: ReactNode; fill?: string; anchor?: "start" | "middle" | "end"; size?: number }) => (
  <text className="t-label" x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} fontFamily={MONO}>{children}</text>
);

const LANES = [70, 115, 160, 205, 250, 295];
const COLS = [
  { x: 560, name: "find", n: 1 },
  { x: 720, name: "audit", n: 6 },
  { x: 880, name: "verify", n: 6 },
  { x: 1040, name: "merge", n: 1 },
];
const CYCLE = 6; // seconds per run of the animation

function Meter({ fill, warm }: { fill: number; warm: boolean }) {
  return (
    <g>
      <rect x={60} y={230} width={120} height={150} rx="6" fill="#fff" stroke={C.rule} strokeWidth="1.5" />
      <motion.rect x={60} width={120} rx="6" fill={warm ? C.warm : C.accent} opacity={0.75} initial={false}
        animate={{ y: 380 - 150 * fill, height: 150 * fill }} transition={{ duration: 1.6, ease: "easeInOut" }} />
      <Lbl x={120} y={218}>Claude&apos;s context</Lbl>
    </g>
  );
}

function ByHand() {
  // results fly back from six agents into the orchestrator, one after another
  return (
    <g>
      {LANES.map((y, i) => (
        <g key={y}>
          <line x1={210} y1={130} x2={700} y2={y} stroke={C.rule} strokeWidth="1.5" />
          <circle cx={710} cy={y} r={14} fill={C.accent} opacity={0.85} />
          <motion.rect width={14} height={14} fill={C.warm} initial={{ x: 703, y: y - 7, opacity: 0 }}
            animate={{ x: [703, 113], y: [y - 7, 300 - i * 12], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, delay: 0.3 + i * 0.45, repeat: Infinity, repeatDelay: 3.2 }} />
        </g>
      ))}
      <Lbl x={710} y={340}>each result comes back to you</Lbl>
    </g>
  );
}

function Workflow() {
  return (
    <g>
      {/* the script */}
      <rect x={250} y={60} width={190} height={170} rx="8" fill="#fff" stroke={C.accent} strokeWidth="2" />
      <Lbl x={345} y={50} fill={C.accent}>script Claude wrote</Lbl>
      <Lbl x={266} y={100} anchor="start" fill={C.accent}>agent()</Lbl>
      <Lbl x={266} y={136} anchor="start" fill={C.accent}>parallel()</Lbl>
      <Lbl x={266} y={172} anchor="start" fill={C.accent}>pipeline()</Lbl>
      <Lbl x={266} y={208} anchor="start" fill={C.accent}>return</Lbl>
      <line x1={210} y1={130} x2={246} y2={130} stroke={C.muted} strokeWidth="1.5" />
      {/* the runtime */}
      <rect x={480} y={30} width={700} height={330} rx="12" fill="none" stroke={C.rule} strokeWidth="1.5" strokeDasharray="6 5" />
      <Lbl x={830} y={22}>runtime, in the background · results stay in script variables</Lbl>
      <line x1={440} y1={130} x2={476} y2={130} stroke={C.muted} strokeWidth="1.5" />
      {COLS.map((c, k) => (
        <g key={c.name}>
          <Lbl x={c.x} y={56} fill={C.ink}>{c.name}</Lbl>
          {(c.n === 1 ? [182] : LANES.map((y) => y + 4)).map((y, i) => (
            <motion.circle key={i} cx={c.x} cy={y} r={14} fill={k === 2 ? C.warm : C.accent}
              initial={{ opacity: 0.2 }} animate={{ opacity: [0.2, 1, 1, 0.35] }}
              transition={{ duration: CYCLE, times: [0, 0.08 + k * 0.2, 0.9, 1], delay: k === 0 ? 0 : 0.05 * i, repeat: Infinity }} />
          ))}
        </g>
      ))}
      {/* tokens: one per lane, find -> audit -> verify -> merge */}
      {LANES.map((y, i) => (
        <motion.circle key={y} r={5} fill={C.ink} initial={{ cx: 560, cy: 182, opacity: 0 }}
          animate={{ cx: [560, 720, 880, 1040, 1040], cy: [182, y + 4, y + 4, 182, 182], opacity: [0, 1, 1, 1, 0] }}
          transition={{ duration: CYCLE, times: [0.1, 0.3, 0.55, 0.8, 0.9], delay: i * 0.08, repeat: Infinity }} />
      ))}
      <Lbl x={880} y={340} fill={C.warm}>verifiers try to refute each finding</Lbl>
      {/* one answer back */}
      <path d="M 1040 200 L 1040 395 L 120 395 L 120 384" fill="none" stroke={C.ink} strokeWidth="2" />
      <Lbl x={600} y={388} fill={C.ink}>one answer comes back</Lbl>
    </g>
  );
}

export function WorkflowsWhat({ step }: { step: number }) {
  const script = step >= 1;
  return (
    <Area style={{ gap: "2vh" }}>
      <svg viewBox="0 0 1200 420" className="min-h-0 w-full flex-1" role="img" aria-label="Left: Claude and a meter for its context. By hand, six agents each send a result back and the meter fills. With a workflow, Claude writes a script; a runtime runs find, audit, verify and merge stages in the background, and only one answer comes back, so the meter stays low.">
        <rect x={40} y={80} width={170} height={100} rx="12" fill={C.card} stroke={C.ink} strokeWidth="2" />
        <text x={125} y={125} textAnchor="middle" fontSize="24" fill={C.ink}>Claude</text>
        <Lbl x={125} y={155}>orchestrating</Lbl>
        <Meter fill={script ? 0.12 : 0.85} warm={!script} />
        <G when={!script}><ByHand /></G>
        <G when={script}><Workflow /></G>
      </svg>
      <div className="relative" style={{ minHeight: "4em" }}>
        <Show when={step === 0} className="absolute inset-0" style={{ ...T.body, color: C.ink }}>
          Across many projects, the hard part is holding the plan. By hand, every agent reports back into one context, and it fills with intermediate results.
        </Show>
        <Show when={step === 1} className="absolute inset-0" style={{ ...T.body, color: C.ink }}>
          A dynamic workflow moves the plan into a script. Agents fan out, run in parallel or as a pipeline, get checked, and only the merged answer returns. Claude&apos;s context stays small.
        </Show>
        <Show when={step >= 2} className="absolute inset-0" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "2.5vw", alignItems: "start" }}>
          <pre className="t-label" style={{ ...T.label, ...T.mono, color: C.ink, background: "#fff", border: `1px solid ${C.rule}`, borderRadius: 10, padding: "1vh 1vw", margin: 0, whiteSpace: "pre-wrap" }}>
{`const found = await agent('List every file under src/routes/.')
const audits = await pipeline(found.files, f =>
  agent(\`Audit \${f} for missing auth checks.\`))
return audits.filter(Boolean)`}
          </pre>
          <div style={{ ...T.body, color: C.ink }}>
            Reach for one when a job needs more agents than one conversation can steer. Save a good run as a command and rerun it next month.
          </div>
        </Show>
      </div>
    </Area>
  );
}
