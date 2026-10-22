"use client";

import type { ReactElement } from "react";

// Small top-right label tying a limits-* scene back to its heading on q2-limits
// (Behaviour, Writing, Memory). Sits in the gap between the title and the canvas.
export function SectionTag({ label }: { label: string }) {
  return (
    <div className="t-label" style={{ position: "absolute", top: "14.6vh", right: "5vw", fontFamily: "var(--font-serif), Georgia, serif", fontStyle: "italic", fontSize: "clamp(14px, 1.1vw, 20px)", color: "#075985", background: "rgba(3,105,161,0.10)", border: "1px solid rgba(3,105,161,0.45)", borderRadius: 12, padding: "0.2vh 0.9vw", zIndex: 2 }}>
      {label}
    </div>
  );
}

export function withSectionTag(label: string, Scene: (p: { step: number }) => ReactElement) {
  return function Tagged({ step }: { step: number }) {
    return (
      <>
        <SectionTag label={label} />
        <Scene step={step} />
      </>
    );
  };
}
