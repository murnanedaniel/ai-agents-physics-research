"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { C, Canvas, SANS } from "../g2/kit";

// r3 section scene: the section question is the title; a quiet picture on the
// left, then 2 to 4 short lines saying what is coming.
export function Section({ lines, children }: { lines: string[]; children: ReactNode }) {
  return (
    <Canvas>
      <div className="grid h-full w-full grid-cols-[1fr_1.1fr] items-center gap-[4vw]">
        <div className="flex h-full items-center justify-center">{children}</div>
        <ol className="flex flex-col gap-[3.2vh]" style={{ fontFamily: SANS, color: C.ink }}>
          {lines.map((l, i) => (
            <motion.li
              key={l}
              className="flex items-baseline gap-4"
              style={{ fontSize: "clamp(20px, 2.1vw, 40px)", lineHeight: 1.3 }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 + 0.18 * i }}
            >
              <span className="font-mono text-[0.75em]" style={{ color: C.accent }}>{i + 1}</span>
              <span>{l}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </Canvas>
  );
}
