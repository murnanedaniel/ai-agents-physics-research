"use client";

import { useState } from "react";
import { C, T, Stage, Label, Ask, stop } from "./kit";

// Two Anthropic pages on the AI for Science programme disagree; the newer one counts (WEB-RESEARCH §7b, read 20 Oct 2026).
const START = Date.UTC(2026, 2, 1), END = Date.UTC(2026, 10, 1);
const pos = (y: number, m: number, d: number) => ((Date.UTC(y, m - 1, d) - START) / (END - START)) * 100;

const PAGES = [
  { date: "16 Mar 2026", at: pos(2026, 3, 16), kind: "support page", amount: "$20,000", scope: "biology focus, 6 months", newest: false,
    url: "support.claude.com, article 11199177" },
  { date: "27 Aug 2026", at: pos(2026, 8, 27), kind: "announcement", amount: "$50,000", scope: "per project, beyond biology", newest: true,
    url: "anthropic.com/news/expanding-support-for-scientists" },
];

export function CreditsPages() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Stage>
      <div className="relative w-full" style={{ height: "48vh", maxWidth: "82vw" }}>
        {/* time axis */}
        <div className="absolute inset-x-0" style={{ bottom: "4vh", height: 2, background: C.ink }} />
        {["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m, i) => (
          <div key={m} className="absolute" style={{ left: `${pos(2026, i + 3, 1)}%`, bottom: 0 }}>
            <Label>{m}</Label>
          </div>
        ))}
        <div className="absolute" style={{ left: `${pos(2026, 10, 22)}%`, bottom: "4vh", height: "40vh", width: 2, background: C.warm }} />
        <div className="absolute" style={{ left: `calc(${pos(2026, 10, 22)}% + 8px)`, top: "1vh" }}>
          <Label color={C.warm}>today</Label>
        </div>
        {PAGES.map((p, i) => (
          <div key={p.date} className={`absolute flex flex-col ${p.newest ? "items-end" : "items-start"}`}
            style={p.newest ? { right: `calc(${100 - p.at}% - 1px)`, bottom: "4vh" } : { left: `${p.at}%`, bottom: "4vh" }}>
            <div
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onClick={stop}
              className="flex flex-col gap-1 rounded-xl px-5 py-3"
              style={{ border: `${p.newest ? 2 : 1}px solid ${p.newest ? C.accent : C.line}`, background: C.paper, width: "max-content" }}
              data-dim={!p.newest || undefined}
            >
              <Label color={p.newest ? C.accent : C.muted}>{p.date} · {p.kind}</Label>
              <span style={{ fontSize: p.newest ? T.big : "clamp(36px, 3.6vw, 64px)", fontFamily: "var(--font-serif), Georgia, serif", fontStyle: "italic", lineHeight: 1.15, paddingTop: "0.08em", color: p.newest ? C.ink : C.muted }}>
                {p.amount}
              </span>
              <span style={{ fontSize: T.small, color: p.newest ? C.ink : C.muted }}>{p.scope}</span>
              {hover === i && <Label>{p.url}</Label>}
            </div>
            <div style={{ width: 2, height: p.newest ? "16vh" : "4vh", background: p.newest ? C.accent : C.muted }} />
          </div>
        ))}
      </div>
      <div className="mt-[2vh] flex flex-col items-center gap-1">
        <span style={{ fontSize: T.small, color: C.muted }}>Live: the application form, with physics as a natural science.</span>
        <Ask>which project goes in the form?</Ask>
      </div>
    </Stage>
  );
}
