"use client";

import type { ReactNode } from "react";
import { docs, openExternal } from "@/lib/links";
import { Area, C, Show, T, stop } from "../r11/kit";

// browser-options: four ways an agent can use a browser, after browser-automate.
// Step 0: the four options. Step 1: what each is good for, and its risk.
// Step 2: the rule of thumb, plus the hands-on 2 card.
// Facts (read 21 Oct 2026): code.claude.com/docs/en/chrome (own login state,
// Pro/Max/Team/Enterprise plan); /desktop "Preview your app", "Browse external
// sites" (clean profile, safety classifiers on clicks and typing), "Let Claude
// use your computer" (macOS and Windows research preview, Pro or Max);
// /computer-use (CLI: macOS, Pro or Max); playwright.dev intro and auth
// (headless, isolated browser contexts, logins loaded from saved state).

const lbl = { ...T.label, ...T.mono, letterSpacing: "0.1em", textTransform: "uppercase" } as const;
const small = { ...T.label, ...T.mono, color: C.muted, marginTop: 4 } as const;
const block = (e: { stopPropagation: () => void }) => e.stopPropagation();

type Option = { name: string; is: string; good: string; eg: string; risk: string; rule: string; icon: ReactNode };

const OPTIONS: Option[] = [
  {
    name: "Claude in Chrome",
    is: "an extension that drives your own Chrome, logged in as you",
    good: "Forms and portals behind my logins",
    eg: "my ERC Part A, the arXiv submission",
    risk: "it acts as you, so payment and submit stay with me · paid plans only",
    rule: "when it has to be you, logged in",
    icon: <ChromeIcon />,
  },
  {
    name: "Browser pane",
    is: "Desktop app, Code tab: starts your dev server and checks its own changes",
    good: "Build-and-check loops on web apps",
    eg: "no setup; on outside sites, safety classifiers check its clicks and typing",
    risk: "not logged in as you: a clean browser profile",
    rule: "while you build the thing",
    icon: <PaneIcon />,
  },
  {
    name: "Playwright",
    is: "a scriptable headless browser",
    good: "Repeatable checks with no human",
    eg: "mine today: every screenshot of this deck, the cover QR code, the live-wall test",
    risk: "no logins unless scripted; brittle on complex portals",
    rule: "if it's a script you'll rerun",
    icon: <ScriptIcon />,
  },
  {
    name: "Computer use",
    is: "sees and clicks your whole screen",
    good: "GUI-only tools with no web or API route",
    eg: "Desktop app: macOS, Windows · CLI: macOS · research preview, Pro or Max",
    risk: "the slowest, with the broadest access",
    rule: "only when nothing else reaches it",
    icon: <ScreenIcon />,
  },
];

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 120 72" height="100%" role="img" aria-label={label} style={{ display: "block" }}>
      {children}
    </svg>
  );
}

function ChromeIcon() {
  return (
    <Frame label="your own browser, with your profile">
      <rect x={2} y={4} width={116} height={64} rx={8} fill={C.card} stroke={C.ink} strokeWidth={2} />
      <line x1={2} x2={118} y1={20} y2={20} stroke={C.ink} strokeWidth={1.5} />
      {[0, 1, 2].map((i) => <circle key={i} cx={12 + i * 10} cy={12} r={3} fill={C.rule} />)}
      <circle cx={104} cy={12} r={5} fill={C.accent} />
      <rect x={14} y={32} width={60} height={8} rx={2} fill={C.rule} />
      <rect x={14} y={46} width={80} height={10} rx={2} fill="none" stroke={C.accent} strokeWidth={2} />
    </Frame>
  );
}

function PaneIcon() {
  return (
    <Frame label="an app window: chat on the left, browser on the right">
      <rect x={2} y={4} width={116} height={64} rx={8} fill={C.card} stroke={C.ink} strokeWidth={2} />
      <line x1={50} x2={50} y1={4} y2={68} stroke={C.ink} strokeWidth={1.5} />
      {[18, 28, 38].map((y, i) => <rect key={y} x={10} y={y} width={i === 1 ? 24 : 32} height={5} rx={2} fill={C.rule} />)}
      <rect x={58} y={14} width={52} height={46} rx={4} fill="#fff" stroke={C.rule} />
      <path d="M68 40 l7 7 l13 -16" stroke={C.accent} strokeWidth={3} fill="none" />
    </Frame>
  );
}

function ScriptIcon() {
  return (
    <Frame label="a script that runs again and again">
      <rect x={2} y={4} width={116} height={64} rx={8} fill={C.ink} />
      <text x={12} y={26} fontSize={12} fill="#fff" fontFamily="monospace">$ run</text>
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={20 + i * 16} cy={50} r={5} fill={i < 3 ? C.accent : "#5b9ec9"} />)}
      <path d="M92 50 a10 10 0 1 1 -3 -7" stroke="#fff" strokeWidth={2} fill="none" />
      <path d="M86 38 l4 6 l5 -5" stroke="#fff" strokeWidth={2} fill="none" />
    </Frame>
  );
}

function ScreenIcon() {
  return (
    <Frame label="a whole desktop screen with a pointer">
      <rect x={6} y={2} width={108} height={56} rx={6} fill={C.card} stroke={C.ink} strokeWidth={2} />
      <rect x={14} y={10} width={40} height={28} rx={3} fill="none" stroke={C.rule} strokeWidth={1.5} />
      <rect x={60} y={18} width={46} height={32} rx={3} fill="none" stroke={C.rule} strokeWidth={1.5} />
      <path d="M78 26 l14 14 l-6 1 l3 7 l-3 1 l-3 -7 l-5 4 z" fill={C.accent} />
      <rect x={50} y={58} width={20} height={8} fill={C.ink} />
      <rect x={38} y={66} width={44} height={4} rx={2} fill={C.ink} />
    </Frame>
  );
}

const cell = (i: number) => ({ paddingLeft: i ? "1.4vw" : 0, paddingRight: "1.2vw", borderLeft: i ? `1px solid ${C.rule}` : "none" }) as const;

export function BrowserOptions({ step }: { step: number }) {
  const card = docs("exercises/hands-on-2-putting-off/");
  return (
    <Area style={{ justifyContent: "center", gap: "3vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", rowGap: "2vh" }}>
        {OPTIONS.map((o, i) => (
          <div key={o.name} style={cell(i)}>
            <div style={{ height: "9vh" }}>{o.icon}</div>
            <div style={{ ...T.big, ...T.serif, color: C.ink, marginTop: "1.4vh" }}>{o.name}</div>
            <div className="t-label" style={small}>{o.is}</div>
          </div>
        ))}
        {OPTIONS.map((o, i) => (
          <Show key={o.name} when={step >= 1} style={cell(i)}>
            <div className="t-label" style={{ ...lbl, color: C.accent }}>good for</div>
            <div style={{ ...T.body, color: C.ink, marginTop: 4 }}>{o.good}</div>
            <div className="t-label" style={small}>{o.eg}</div>
          </Show>
        ))}
        {OPTIONS.map((o, i) => (
          <Show key={o.name} when={step >= 1} style={cell(i)}>
            <div className="t-label" style={{ ...lbl, color: C.warm }}>risk</div>
            <div className="t-label" style={{ ...small, color: C.warm }}>{o.risk}</div>
          </Show>
        ))}
        {OPTIONS.map((o, i) => (
          <Show key={o.name} when={step >= 2} style={cell(i)}>
            <div style={{ background: "rgba(3,105,161,0.08)", borderLeft: `4px solid ${C.accent}`, borderRadius: 8, padding: "1.2vh 0.9vw" }}>
              <div className="t-label" style={{ ...lbl, color: C.accent }}>use it</div>
              <div style={{ ...T.body, color: C.ink, marginTop: 4 }}>{o.rule[0].toUpperCase() + o.rule.slice(1)}.</div>
            </div>
          </Show>
        ))}
      </div>
      <Show when={step >= 2}>
        <a href={card} target="_blank" rel="noopener noreferrer" onPointerDown={block}
          onClick={(e) => { stop(e); e.preventDefault(); openExternal(card); }}
          className="t-label"
          style={{ ...T.label, ...T.mono, color: C.accent, border: `1.5px solid ${C.accent}`, borderRadius: 100, padding: "0.4em 1em", textDecoration: "none", whiteSpace: "nowrap" }}>
          card: exercises/hands-on-2-putting-off ↗
        </a>
      </Show>
    </Area>
  );
}
