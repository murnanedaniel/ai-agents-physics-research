"use client";

import { useState } from "react";
import { Ask, C, Canvas, Reveal, RevealG, T, mono, serif, stop } from "./kit";

// Left: my opinion and the habit behind it. Right (step 1): dated changelog
// entries that touch plan mode, March to October 2026.
// Sources: notes/w19/WEB-RESEARCH.md §3 (CHANGELOG.md + GitHub releases API,
// read 2026-10-20); notes/w10/LOOP-PATTERNS-perlmutter.md pattern 7.
const ENTRIES = [
  { v: "2.1.81", date: "2026-03-20", text: "plan mode hides the clear-context option by default" },
  { v: "2.1.218", date: "2026-07-22", text: "plan mode with auto: the classifier judges Bash commands" },
  { v: "2.1.290", date: "2026-10-05", text: "fixes plan restore on --resume and after a container restart" },
  { v: "2.1.299", date: "2026-10-14", text: "adds a note when bypass permissions means plan mode won't ask" },
];
const D0 = Date.parse("2026-03-01"), D1 = Date.parse("2026-11-01");
const X0 = 30, X1 = 590;
const xd = (d: string) => X0 + ((Date.parse(d) - D0) / (D1 - D0)) * (X1 - X0);
const MONTHS = ["2026-03-01", "2026-05-01", "2026-07-01", "2026-09-01", "2026-11-01"];
const MLAB = ["Mar", "May", "Jul", "Sep", "Nov"];

export function PlanMode({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Canvas className="flex items-center gap-[4vw]">
      <div className="flex-[0.8] min-w-0 flex flex-col gap-[3vh]">
        <div style={{ ...serif, fontSize: T.big, lineHeight: 1.1 }}>&ldquo;It&rsquo;s out of date.&rdquo;</div>
        <div style={{ fontSize: T.body, lineHeight: 1.35 }}>Six threads where I asked to discuss before any plan.</div>
        <Ask>one line on why</Ask>
      </div>
      <Reveal at={1} step={step} className="flex-1 min-w-0">
        <svg viewBox="0 0 680 250" className="w-full h-auto" role="img" aria-label="Changelog entries touching plan mode, March to October 2026">
          <line x1={X0} y1={150} x2={X1} y2={150} stroke={C.ink} strokeWidth={1.5} />
          {MONTHS.map((m, i) => (
            <g key={m}>
              <line x1={xd(m)} y1={144} x2={xd(m)} y2={156} stroke={C.ink} strokeWidth={1.5} />
              <text x={xd(m)} y={182} textAnchor="middle" fontSize={17} style={mono} fill={C.muted} className="t-label">{MLAB[i]}</text>
            </g>
          ))}
          <RevealG at={1} step={step}>
            {ENTRIES.map((e, i) => {
              const x = xd(e.date);
              const ly = [62, 92, 92, 62][i];
              const anchor = ["middle", "middle", "end", "start"][i] as "middle" | "end" | "start";
              const tx = x + (anchor === "end" ? -6 : anchor === "start" ? 6 : 0);
              return (
                <g key={e.v} {...stop} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
                  <title>{`v${e.v}, ${e.date}: ${e.text}`}</title>
                  <line x1={x} y1={ly + 8} x2={x} y2={140} stroke={C.accent} strokeWidth={1.2} />
                  <circle cx={x} cy={150} r={hover === i ? 10 : 8} fill={C.accent} />
                  <text x={tx} y={ly} textAnchor={anchor} fontSize={17} style={mono} fill={C.ink} className="t-label">v{e.v}</text>
                </g>
              );
            })}
          </RevealG>
          <text x={X0} y={232} fontSize={17} style={mono} fill={C.muted} className="t-label">
            {hover !== null ? `${ENTRIES[hover].date}: ${ENTRIES[hover].text}` : "dated changelog entries that touch plan mode"}
          </text>
        </svg>
        <div className="mt-[3vh]" style={{ fontSize: T.body, lineHeight: 1.35 }}>No deprecation in docs or changelog; only Ultraplan was removed.</div>
      </Reveal>
    </Canvas>
  );
}
