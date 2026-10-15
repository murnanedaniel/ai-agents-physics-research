"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { SceneLinks, type BeatLink } from "@/components/DocsLink";
export type BeatProps = { kicker: string; title: string; lines: string[]; links?: BeatLink[]; draft?: boolean; step: number; children?: ReactNode };
export function BeatScene({ kicker, title, lines, links = [], draft = true, step, children }: BeatProps) {
 return <motion.section className="beat canvas-grid paper-grid" initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} transition={{duration: .25}}>
  <header className="beat-header"><span>{kicker}</span>{draft && <span className="draft-badge">draft</span>}</header>
  <h1>{title}</h1>
  <div className="beat-body">{children}<div className="beat-lines">{lines.map((line, i) => <motion.p key={line} initial={false} animate={{opacity: step >= i ? 1 : 0, y: step >= i ? 0 : 8}} aria-hidden={step < i}>{line}</motion.p>)}</div></div>
  <SceneLinks links={links} />
  <footer className="beat-footer">KIT · 22 October 2026 <span>← / → to navigate · P presenter clock</span></footer>
 </motion.section>;
}
