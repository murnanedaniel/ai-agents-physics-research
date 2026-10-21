"use client";

import { C, CardLink, Canvas, Label, Reveal, T, mono, serif } from "./ui";

// hands-on-2: the sample draft from the exercise card (docs/exercises/review-a-draft),
// one claim per row. Step 0: the claims as written. Step 1: what each was checked
// against, and the verdict, on the same row. The draft is made up for the exercise;
// the checks are real (ATLAS and CMS 2012 discovery papers; PDG Higgs mass).
const ROWS = [
  { claim: "The Higgs was observed in 2012.", checked: "2012 papers", verdict: "OK", colour: C.green, def: "the source says the same" },
  { claim: "Its mass is 135 GeV.", checked: "PDG: 125 GeV", verdict: "WRONG", colour: C.red, def: "the source says otherwise" },
  { claim: "Our tagger beats all others.", checked: "two baselines", verdict: "OVERCLAIM", colour: C.warm, def: "says more than the evidence" },
  { claim: "Agents cut analysis time 90%.", checked: "no source", verdict: "UNSUPPORTED", colour: C.muted, def: "nothing to check it against" },
];

export function HandsOnReviewScene({ step }: { step: number }) {
  return (
    <Canvas style={{ gap: "5vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 0.8fr) auto", columnGap: "2.4vw", rowGap: "2.6vh", alignItems: "center", width: "100%" }}>
        <Label>Draft</Label>
        <Reveal at={1} step={step}><Label>Checked</Label></Reveal>
        <span />
        {ROWS.map((r) => (
          <div key={r.verdict} style={{ display: "contents" }}>
            <span style={{ ...serif, fontSize: T.body, lineHeight: 1.25, borderLeft: `4px solid ${step >= 1 ? r.colour : C.line}`, paddingLeft: "1vw", transition: "border-color .6s" }}>{r.claim}</span>
            <Reveal at={1} step={step}><span style={{ fontSize: T.body, color: C.ink }}>{r.checked}</span></Reveal>
            <Reveal at={1} step={step}>
              <span title={r.def} className="t-label" style={{ ...mono, display: "inline-block", minWidth: "9em", fontSize: T.label, color: r.colour === C.muted ? C.ink : r.colour, border: `1.5px solid ${r.colour}`, borderRadius: 100, padding: "0.3em 0.9em", textAlign: "center" }}>{r.verdict}</span>
            </Reveal>
          </div>
        ))}
      </div>
      <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "1.6vw" }}>
        <CardLink path="exercises/review-a-draft/">exercise card ↗</CardLink>
      </div>
    </Canvas>
  );
}
