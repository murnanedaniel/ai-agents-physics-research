"use client";

import { Arrow, C, MONO, SANS, Show, Stage } from "./kit";

// Two routes from run results to quick project slides (the project-slides
// skill), then the running deck: one file, a slide appended per check-in.
function PdfPage({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={200} height={140} rx={4} fill="#fff" stroke={C.faint} />
      <rect x={x} y={y} width={200} height={26} rx={4} fill={C.accent} />
      <rect x={x + 16} y={y + 44} width={110} height={8} fill={C.faint} />
      <rect x={x + 16} y={y + 60} width={80} height={8} fill={C.faint} />
      <polyline points={`${x + 110},${y + 120} ${x + 135},${y + 96} ${x + 158},${y + 104} ${x + 184},${y + 62}`} fill="none" stroke={C.accent} strokeWidth={2.5} />
    </g>
  );
}
function ArtifactCard({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={200} height={140} rx={8} fill="#fff" stroke={C.faint} />
      <circle cx={x + 12} cy={y + 12} r={3.5} fill={C.faint} /><circle cx={x + 24} cy={y + 12} r={3.5} fill={C.faint} /><circle cx={x + 36} cy={y + 12} r={3.5} fill={C.faint} />
      <rect x={x + 16} y={y + 36} width={120} height={10} fill={C.ink} opacity={0.7} />
      {[0, 1, 2].map((i) => <rect key={i} x={x + 24 + i * 58} y={y + 120 - [40, 62, 30][i]} width={36} height={[40, 62, 30][i]} fill={C.grey} />)}
    </g>
  );
}

export function CheckInSlides({ step }: { step: number }) {
  return (
    <Stage label="Run results flow into either a beamer PDF built with tectonic or a Claude slide artifact; then one running deck grows by a slide per check-in">
      <svg viewBox="0 0 1200 470" width="100%" style={{ width: "100%", height: "100%" }}>
        <Arrow id="cs-arrow" />
        {/* source */}
        <rect x={10} y={170} width={210} height={110} rx={12} fill={C.card} stroke={C.faint} />
        <text x={115} y={218} textAnchor="middle" fontFamily={SANS} fontSize={24} fill={C.ink}>run results</text>
        <text className="t-label" x={115} y={250} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>plots, tables, logs</text>
        <path d="M 225 205 C 280 205, 280 110, 330 110" fill="none" stroke={C.muted} strokeWidth={2} markerEnd="url(#cs-arrow)" />
        <path d="M 225 245 C 280 245, 280 340, 330 340" fill="none" stroke={C.muted} strokeWidth={2} markerEnd="url(#cs-arrow)" />
        {/* route A */}
        <text x={340} y={104} fontFamily={SANS} fontSize={24} fill={C.ink}>LaTeX beamer</text>
        <text className="t-label" x={340} y={132} fontFamily={MONO} fontSize={16} fill={C.muted}>compiled with tectonic</text>
        <PdfPage x={560} y={40} />
        <text className="t-label" x={660} y={202} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>PDF</text>
        {/* route B */}
        <text x={340} y={334} fontFamily={SANS} fontSize={24} fill={C.ink}>slide artifact</text>
        <text className="t-label" x={340} y={362} fontFamily={MONO} fontSize={16} fill={C.muted}>native in Claude</text>
        <ArtifactCard x={560} y={270} />
        <text className="t-label" x={660} y={432} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>shareable link</text>
        {/* running deck */}
        <Show at={1} step={step} ghost>
          <path d="M 775 110 C 830 110, 830 230, 870 230" fill="none" stroke={C.accent} strokeWidth={2} markerEnd="url(#cs-arrow)" />
          <path d="M 775 340 C 830 340, 830 250, 870 250" fill="none" stroke={C.accent} strokeWidth={2} markerEnd="url(#cs-arrow)" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={890 + i * 22} y={150 + i * 22} width={200} height={130} rx={6} fill={i === 3 ? C.accentSoft : "#fff"} stroke={i === 3 ? C.accent : C.faint} strokeWidth={i === 3 ? 2 : 1} />
              <text className="t-label" x={900 + i * 22} y={167 + i * 22} fontFamily={MONO} fontSize={15} fill={i === 3 ? C.accent : C.muted}>check-in {i + 1}</text>
            </g>
          ))}
          <text x={1000} y={388} textAnchor="middle" fontFamily={SANS} fontSize={24} fill={C.ink}>one running deck</text>
          <text x={1000} y={418} textAnchor="middle" fontFamily={SANS} fontSize={20} fill={C.muted}>a slide per check-in</text>
        </Show>
      </svg>
    </Stage>
  );
}
