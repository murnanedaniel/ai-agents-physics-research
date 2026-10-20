"use client";

import type { ReactNode } from "react";
import { Area, C, Show, T } from "./kit";

// Two home-made benchmarks, idea only. Step 0: SWE-P-Bench, where the oracle
// test must fail on the old code and pass on the fix. Step 1: qtbench, where
// the agent sees only pre-cutoff material and is judged against the real
// merge request.
function Card({ children, tone = C.rule, fill = C.card }: { children: ReactNode; tone?: string; fill?: string }) {
  return <div className="flex items-center rounded-xl px-[1.2vw] py-[2vh]" style={{ border: `2px solid ${tone}`, background: fill, ...T.body, color: C.ink }}>{children}</div>;
}
const Arrow = () => <span aria-hidden style={{ ...T.body, color: C.faint }}>→</span>;

export function BenchOurs({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "4.5vh" }}>
      <div>
        <div className="t-label mb-[1vh]" style={{ ...T.label, ...T.mono, color: C.muted }}>SWE-P-Bench · pyhf, uproot, awkward</div>
        <div className="grid items-stretch gap-[0.8vw]" style={{ gridTemplateColumns: "1fr auto 1fr auto 1fr 1fr" }}>
          <Card>Real HEP issue</Card>
          <div className="flex items-center"><Arrow /></div>
          <Card>Oracle test</Card>
          <div className="flex items-center"><Arrow /></div>
          <Card tone={C.warm}><span><span style={{ color: C.warm }}>✗</span> old code fails</span></Card>
          <Card tone={C.accent}><span><span style={{ color: C.accent }}>✓</span> fix passes</span></Card>
        </div>
        <div className="mt-[1.6vh]" style={{ ...T.serif, ...T.big, color: C.ink }}>If it can&apos;t fail, it tests nothing.</div>
      </div>
      <Show when={step >= 1}>
        <div className="t-label mb-[1vh]" style={{ ...T.label, ...T.mono, color: C.muted }}>qtbench · ATLAS qualification tasks (idea only)</div>
        <div className="grid items-stretch gap-[0.8vw]" style={{ gridTemplateColumns: "1fr auto 1fr auto 1.6fr" }}>
          <Card>Task, pre-cutoff</Card>
          <div className="flex items-center"><Arrow /></div>
          <Card>Agent&apos;s patch</Card>
          <div className="flex items-center"><Arrow /></div>
          <Card tone={C.accent}>judged against the real merge request</Card>
        </div>
      </Show>
    </Area>
  );
}
