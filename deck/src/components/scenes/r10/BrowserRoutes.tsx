"use client";

import { useState } from "react";
import { Arrow, C, Canvas, MONO, SANS, Show, stop } from "./kit";

// browser-automate: first what a browser agent is, then which tool gets each
// kind of admin work. Step 0: forms and files. Step 1: the steps that stay human.
// Upload limits: code.claude.com/docs/en/chrome; bug reports #35850, #77240, #80632
// (notes/w19/WEB-RESEARCH.md §6).
const ROUTES = [
  { at: 0, task: "Forms", eg: "portal fields, grant Part A", tool: "Browser agent", toolEg: "Claude in Chrome", note: ["did my ERC Part A,", "Oct 2026"], col: C.accent },
  { at: 0, task: "Files", eg: "PDFs, source tarballs", tool: "Shell or API", toolEg: "curl, git, Playwright", note: ["browser upload: 10 MB cap,", "3 bug reports in 2026"], col: C.accent },
  { at: 1, task: "The last click", eg: "submit, pay, sign, CAPTCHA", tool: "Me", toolEg: "the agent hands over", note: ["cannot be undone,", "so it stays human"], col: C.warm },
];
const Y0 = 200, DY = 118, BW = 360, BH = 92;

function Browser({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden>
      <rect x={0} y={0} width={150} height={100} rx={10} fill={C.card} stroke={C.ink} strokeWidth={2} />
      <line x1={0} x2={150} y1={24} y2={24} stroke={C.ink} strokeWidth={1.5} />
      {[0, 1, 2].map((i) => <circle key={i} cx={14 + i * 14} cy={12} r={4} fill={C.rule} />)}
      <rect x={14} y={38} width={90} height={12} rx={3} fill={C.rule} />
      <rect x={14} y={60} width={120} height={14} rx={3} fill="none" stroke={C.accent} strokeWidth={2} />
      <path d="M100 66 l18 18 l-7 1 l4 8 l-4 2 l-4 -8 l-6 5 z" fill={C.accent} />
    </g>
  );
}

export function BrowserRoutes({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Canvas label="A browser agent reads, clicks and types in my own browser. Forms go to the browser agent, files to the shell or an API, and the last click stays with me">
      <Arrow id="r10-br" />
      <Browser x={0} y={10} />
      <text x={180} y={52} fontFamily={SANS} fontSize={27} fill={C.ink}>A browser agent reads the page, clicks and types</text>
      <text x={180} y={90} fontFamily={SANS} fontSize={27} fill={C.ink}>in my own logged-in browser.</text>
      <line x1={0} x2={1200} y1={140} y2={140} stroke={C.rule} strokeDasharray="4 6" />
      {ROUTES.map((r, i) => {
        const y = Y0 + i * DY;
        const hot = hover === i;
        return (
          <Show key={r.task} at={r.at} step={step} dim>
            <g {...stop} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
              <rect x={0} y={y - BH / 2} width={BW} height={BH} rx={12} fill={C.card} stroke={hot ? C.ink : C.rule} strokeWidth={1.5} />
              <text x={24} y={y - 4} fontFamily={SANS} fontSize={28} fill={C.ink}>{r.task}</text>
              <text className="t-label" x={24} y={y + 28} fontFamily={MONO} fontSize={16} fill={C.muted}>{r.eg}</text>
              <path d={`M ${BW + 10} ${y} H ${BW + 120}`} stroke={r.col} strokeWidth={2.5} markerEnd="url(#r10-br)" />
              <rect x={BW + 135} y={y - BH / 2} width={BW - 40} height={BH} rx={12} fill={r.col === C.warm ? C.warmTint : C.tint} stroke={r.col} strokeWidth={hot ? 3 : 2} />
              <text x={BW + 159} y={y - 4} fontFamily={SANS} fontSize={28} fill={r.col === C.warm ? C.warm : C.ink}>{r.tool}</text>
              <text className="t-label" x={BW + 159} y={y + 28} fontFamily={MONO} fontSize={16} fill={C.muted}>{r.toolEg}</text>
              {r.note.map((n, k) => (
                <text key={n} className="t-label" x={BW * 2 + 130} y={y - 6 + k * 26} fontFamily={MONO} fontSize={16} fill={C.muted}>{n}</text>
              ))}
            </g>
          </Show>
        );
      })}
    </Canvas>
  );
}
