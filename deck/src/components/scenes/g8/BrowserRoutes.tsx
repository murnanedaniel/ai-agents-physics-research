"use client";

import { useState } from "react";
import { C, T, Stage, Label, stop } from "./kit";

// Three kinds of admin work, each routed to the tool that handles it reliably.
const ROUTES = [
  { task: "Forms", eg: "portal fields, Part A", tool: "Browser agent", toolEg: "Claude in Chrome", at: 0,
    detail: "Typing into web forms is what the browser agent does well." },
  { task: "Files", eg: "PDFs, tarballs, downloads", tool: "Shell or API", toolEg: "curl, git, gh", at: 0,
    detail: "Browser uploads are capped at 10 MB and have bug reports from March to October 2026. Fallbacks: the shell, Playwright MCP, or the site's API." },
  { task: "Human-only steps", eg: "pay, log in, CAPTCHA, submit", tool: "You", toolEg: "agent hands over", at: 1,
    detail: "The agent hands over at logins and CAPTCHAs and stops before anything that cannot be undone." },
];

export function BrowserRoutes({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Stage>
      <div className="grid w-full max-w-[82vw] items-center" style={{ gridTemplateColumns: "1fr 120px 1fr", rowGap: "3.2vh" }}>
        {ROUTES.map((r, i) => {
          const shown = step >= r.at;
          const human = r.tool === "You";
          const colour = human ? C.warm : C.accent;
          return (
            <div key={r.task} className="contents" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onClick={stop}>
              <div data-dim={!shown || undefined} data-reveal={r.at} className="flex flex-col gap-1 rounded-xl px-6 py-3 transition-opacity duration-700"
                style={{ border: `1px solid ${hover === i ? C.ink : C.line}`, background: C.paper, opacity: shown ? 1 : 0.18 }}>
                <span style={{ fontSize: T.body }}>{r.task}</span>
                <Label>{r.eg}</Label>
              </div>
              <svg viewBox="0 0 120 24" className="w-full transition-opacity duration-700" style={{ opacity: shown ? 1 : 0.18 }} aria-hidden>
                <path d="M8 12 H104" stroke={colour} strokeWidth="2" />
                <path d="M100 5 L112 12 L100 19 z" fill={colour} />
              </svg>
              <div data-dim={!shown || undefined} data-reveal={r.at} className="flex flex-col gap-1 rounded-xl px-6 py-3 transition-opacity duration-700"
                style={{ border: `2px solid ${colour}`, background: C.paper, opacity: shown ? 1 : 0.18 }}>
                <span style={{ fontSize: T.body, color: human ? C.warm : C.ink }}>{r.tool}</span>
                <Label>{r.toolEg}</Label>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-[3.5vh] h-[3em] max-w-[70vw] text-center" style={{ fontSize: T.label, color: C.muted }}>
        {hover !== null && step >= ROUTES[hover].at ? <span className="t-label">{ROUTES[hover].detail}</span> : null}
      </div>
    </Stage>
  );
}
