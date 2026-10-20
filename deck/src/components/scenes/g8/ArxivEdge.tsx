"use client";

import { useState } from "react";
import { C, T, Stage, Label, Ask, stop } from "./kit";

// The tabs of arXiv's new-submission form (info.arxiv.org/help/submit), and who does each one live.
const STAGES = [
  { name: "Start", who: "agent", how: "browser", detail: "Category, licence and policy confirmations." },
  { name: "Add files", who: "agent", how: "shell builds the tarball", detail: "The source tarball is built and checked in the shell; browser uploads have open bug reports in 2026." },
  { name: "Process", who: "agent", how: "browser", detail: "arXiv compiles the source; the agent reads the log and fixes warnings." },
  { name: "Metadata", who: "agent", how: "browser", detail: "Title, authors, abstract and comments, pasted from the paper source." },
  { name: "Preview", who: "agent", how: "browser", detail: "The agent checks the compiled PDF against the local build." },
  { name: "Submit", who: "you", how: "one click", detail: "Not pressed in the session." },
];

export function ArxivEdge() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Stage>
      <div className="flex w-full max-w-[90vw] items-stretch">
        {STAGES.map((s, i) => {
          const you = s.who === "you";
          return (
            <div key={s.name} className="flex items-stretch" style={{ flex: you ? "0.9 1 0" : "1 1 0" }}>
              {you && (
                <div className="mx-3 flex flex-col items-center justify-start">
                  <div className="w-[3px] flex-1" style={{ background: C.warm }} />
                  <Label color={C.warm} style={{ marginTop: 6 }}>edge</Label>
                </div>
              )}
              <div
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onClick={stop}
                className="flex flex-1 flex-col gap-2 rounded-lg px-3 py-4"
                style={{ marginLeft: i && !you ? 8 : 0, border: `${you ? 2 : 1}px ${you ? "dashed" : "solid"} ${you ? C.warm : hover === i ? C.ink : C.line}`, background: C.paper }}
              >
                <Label color={you ? C.warm : C.accent}>{i + 1 < 6 ? `tab ${i + 1}` : "final"}</Label>
                <span style={{ fontSize: T.body, color: you ? C.warm : C.ink, whiteSpace: "nowrap" }}>{s.name}</span>
                <Label>{you ? "you" : s.how}</Label>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-[4vh] flex h-[3.2em] max-w-[70vw] flex-col items-center gap-2 text-center">
        {hover !== null ? (
          <span className="t-label" style={{ fontSize: T.label, color: C.muted }}>{STAGES[hover].detail}</span>
        ) : (
          <>
            <span style={{ fontSize: T.small, color: C.muted }}>Live: the track-fitting paper, stopped before the last click.</span>
            <Ask>test the file upload in Chrome on the day</Ask>
          </>
        )}
      </div>
    </Stage>
  );
}
