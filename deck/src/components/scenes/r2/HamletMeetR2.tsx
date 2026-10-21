"use client";

import { useState, type ReactNode } from "react";
import { asset } from "@/lib/asset";
import { C, Canvas, Reveal, T, mono } from "../g1/kit";

// Three phone screens from HAMLET Meet, run offline on synthetic attendees
// (21 Oct 2026). The feed pings are real Brain output from the Aug 2026 sim
// runs; the partner-page opening line and the map layout are illustrative.
// A missing image falls back to a marker.
const PHONES = [
  { file: "hamlet-partner.png", caption: "who to meet", at: 0 },
  { file: "hamlet-feed.png", caption: "pings from the Brain", at: 0 },
  { file: "hamlet-map.png", caption: "the research map", at: 1 },
];

function Missing({ file }: { file: string }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 14, textAlign: "center" }}>
      <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.warmText }}>[Daniel: screenshot {file} from the offline run]</span>
    </div>
  );
}

function Phone({ file, children }: { file: string; children: ReactNode }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{ width: "100%", maxWidth: "26vw", maxHeight: "52vh", aspectRatio: "3 / 4", borderRadius: 18, border: `6px solid ${C.ink}`, background: "#fff", overflow: "hidden", boxShadow: "0 16px 34px -18px rgba(20,20,20,0.45)" }}>
      {failed ? children : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset(`/r2/${file}`)} alt={`HAMLET Meet screen: ${file}`} onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
      )}
    </div>
  );
}

export function HamletMeetR2({ step }: { step: number }) {
  return (
    <Canvas style={{ justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2vw", alignItems: "start", justifyItems: "center" }}>
        {PHONES.map((p) => (
          <Reveal key={p.file} at={p.at} step={step} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: "100%" }}>
            <Phone file={p.file}><Missing file={p.file} /></Phone>
            <span style={{ fontSize: T.body, textAlign: "center", lineHeight: 1.25 }}>{p.caption}</span>
          </Reveal>
        ))}
      </div>
      <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, marginTop: "2vh", textAlign: "center" }}>offline run, synthetic attendees · feed pings: real Brain output · partner text and map layout: illustrative</span>
    </Canvas>
  );
}
