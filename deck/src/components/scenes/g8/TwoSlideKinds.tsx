"use client";

import { C, T, Stage, Label, Reveal } from "./kit";

const mono = "var(--font-geist-mono)";

// Drawn thumbnails, not screenshots: what each kind of slide is made of.
function KeynoteThumb() {
  return (
    <svg viewBox="0 0 400 225" className="w-full rounded-lg" style={{ border: `1px solid ${C.line}` }} aria-hidden>
      <rect width="400" height="225" fill="#f6f1e7" />
      {Array.from({ length: 7 }, (_, i) => <line key={`v${i}`} x1={i * 64} x2={i * 64} y1={0} y2={225} stroke="rgba(20,20,20,0.05)" />)}
      {Array.from({ length: 4 }, (_, i) => <line key={`h${i}`} x1={0} x2={400} y1={i * 64} y2={i * 64} stroke="rgba(20,20,20,0.05)" />)}
      <rect x="26" y="22" width="230" height="12" rx="6" fill={C.ink} opacity="0.75" transform="skewX(-12)" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={70 + i * 85} cy={130} r={20 - i * 3} fill="none" stroke={C.accent} strokeWidth="2.5" opacity={i < 3 ? 1 : 0.25} />
          {i < 3 && <path d={`M${92 + i * 85 - i * 3} 130 h${40 + i * 6}`} stroke={C.muted} strokeWidth="1.5" />}
        </g>
      ))}
      <text x="380" y="212" fontSize="10" textAnchor="end" fill={C.faint} fontFamily={mono}>source</text>
    </svg>
  );
}

function CheckinThumb() {
  return (
    <svg viewBox="0 0 400 225" className="w-full rounded-lg" style={{ border: `1px solid ${C.line}` }} aria-hidden>
      <rect width="400" height="225" fill="#ffffff" />
      <rect x="20" y="18" width="250" height="11" rx="2" fill={C.ink} opacity="0.8" />
      <rect x="20" y="48" width="210" height="140" fill="none" stroke={C.line} />
      <polyline points="30,170 70,140 110,120 150,108 190,102 220,100" fill="none" stroke={C.accent} strokeWidth="2.5" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={252} cy={66 + i * 34} r={3.5} fill={C.ink} />
          <rect x={262} y={62 + i * 34} width={110 - i * 18} height={8} rx="2" fill={C.muted} opacity="0.7" />
        </g>
      ))}
      <rect x="20" y="202" width="140" height="7" rx="2" fill={C.faint} opacity="0.6" />
    </svg>
  );
}

const KINDS = [
  { at: 0, name: "Keynote", what: "a scene deck in the browser", how: "for talks and lectures: one picture per scene, in steps", thumb: <KeynoteThumb /> },
  { at: 1, name: "Check-in", what: "beamer PDF or a Claude artifact", how: "for group meetings: one figure, three bullets, about 10 min", thumb: <CheckinThumb /> },
];

export function TwoSlideKinds({ step }: { step: number }) {
  return (
    <Stage>
      <div className="grid w-full max-w-[86vw] grid-cols-2 gap-[4vw]">
        {KINDS.map((k) => (
          <Reveal key={k.name} at={k.at} step={step} className="flex flex-col gap-3">
            <div data-dim={step < k.at || undefined}>{k.thumb}</div>
            <span style={{ fontSize: T.body, color: C.ink }}>
              <span style={{ fontFamily: "var(--font-serif), Georgia, serif", fontStyle: "italic" }}>{k.name}:</span> {k.what}
            </span>
            <Label>{k.how}</Label>
          </Reveal>
        ))}
      </div>
    </Stage>
  );
}
