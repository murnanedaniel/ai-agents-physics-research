"use client";
import { motion } from "motion/react";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { SceneLinks, type BeatLink } from "@/components/DocsLink";
import type { Beat } from "@/content/beats/_types";
export type BeatProps = { title: string; lines?: string[]; links?: BeatLink[]; source?: string; Scene?: Beat["Scene"]; step: number; children?: ReactNode };
export function BeatScene({ title, lines = [], links = [], source, Scene, step, children }: BeatProps) {
 const bodyRef = useRef<HTMLDivElement>(null);
 const contentRef = useRef<HTMLDivElement>(null);
 useLayoutEffect(() => {
  const body = bodyRef.current;
  const content = contentRef.current;
  if (!body || !content) return;
  const fit = () => {
   // Measure at natural width, then shrink uniformly without reflow loops.
   content.style.zoom = "1";
   content.style.width = `${body.clientWidth}px`;
   const scale = Math.min(1, body.clientHeight / Math.max(1, content.scrollHeight));
   content.style.zoom = String(scale);
  };
  const observer = new ResizeObserver(fit);
  observer.observe(body);
  observer.observe(content);
  fit();
  return () => observer.disconnect();
 }, [Scene]);
 return <motion.section className={`beat canvas-grid paper-grid${Scene ? " beat-custom" : ""}`} initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} transition={{duration: .25}}>
  <header data-region="title">
  <h1>{title}</h1></header>
  {Scene ? <div className="beat-custom-scene" data-region="visual"><Scene step={step} /></div> : <>
   <div className="beat-body" data-region="visual" ref={bodyRef}><div className="beat-content" ref={contentRef}>{children}<div className="beat-lines">{lines.map((line, i) => <motion.p key={line} initial={false} animate={{opacity: step >= i ? 1 : 0, y: step >= i ? 0 : 8}} aria-hidden={step < i}>{line}</motion.p>)}</div></div></div>
   <SceneLinks links={links} />
  </>}
  {source && <div className="beat-source t-source" data-region="source">{source}</div>}
 </motion.section>;
}
