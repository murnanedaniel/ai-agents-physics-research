"use client";

import type { ReactNode } from "react";
import { Area, C, Show, T } from "./kit";

// bench-ours: two home-made benchmarks, idea only (names as in Daniel's
// outline; repos SWE-P-Bench and qtbench). Step 0: SwePhys, real issues in
// HEP Python packages, with an oracle test that must fail on the old code and
// pass on the real fix. Step 1: Qual-Bench, a collaboration's qualification
// tasks: the agent sees only what existed before the task was done and is
// judged against what the person actually merged. Task contents are internal
// and never shown; no scores are shown, both are prototypes.
function Card({ children, tone = C.rule, fill = C.card }: { children: ReactNode; tone?: string; fill?: string }) {
  return <div className="flex items-center rounded-xl px-[1.2vw] py-[2vh]" style={{ border: `2px solid ${tone}`, background: fill, ...T.body, color: C.ink }}>{children}</div>;
}
const Arrow = () => <span aria-hidden style={{ ...T.body, color: C.faint }}>→</span>;
const Head = ({ name, what }: { name: string; what: string }) => (
  <div className="mb-[1.2vh] flex items-baseline gap-[1vw]">
    <span style={{ ...T.serif, ...T.big, color: C.ink }}>{name}</span>
    <span className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>{what}</span>
  </div>
);

export function BenchOurs({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "5vh" }}>
      <div>
        <Head name="SwePhys" what="fixes to HEP software · pyhf, uproot, awkward" />
        <div className="grid items-stretch gap-[0.8vw]" style={{ gridTemplateColumns: "1fr auto 1fr auto 1fr 1fr" }}>
          <Card>A real bug report</Card>
          <div className="flex items-center"><Arrow /></div>
          <Card>A test written for it</Card>
          <div className="flex items-center"><Arrow /></div>
          <Card tone={C.warm}><span><span style={{ color: C.warm }}>✗</span> old code fails</span></Card>
          <Card tone={C.accent}><span><span style={{ color: C.accent }}>✓</span> real fix passes</span></Card>
        </div>
      </div>
      <Show when={step >= 1}>
        <Head name="Qual-Bench" what="a collaboration’s qualification tasks (idea only)" />
        <div className="grid items-stretch gap-[0.8vw]" style={{ gridTemplateColumns: "1fr auto 1fr auto 1.4fr" }}>
          <Card>The original task</Card>
          <div className="flex items-center"><Arrow /></div>
          <Card>The agent&apos;s attempt</Card>
          <div className="flex items-center"><Arrow /></div>
          <Card tone={C.accent}>judged against the real merged fix</Card>
        </div>
      </Show>
    </Area>
  );
}
