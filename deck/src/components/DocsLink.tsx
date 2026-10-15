"use client";
import { docs, LiveLinks, openExternal } from "@/lib/links";
export type BeatLink = { kind: "docs"; title: string; path: string } | { kind: "live"; title: string; target: keyof typeof LiveLinks };
export function DocsLink({ title, path }: { title: string; path: string }) {
 return <a className="course-link" href={docs(path)} target="_blank" rel="noopener noreferrer" onClick={e => { e.stopPropagation(); e.preventDefault(); openExternal(docs(path)); }}>→ docs: {title}</a>;
}
export function LiveLink({ title, target }: { title: string; target: keyof typeof LiveLinks }) {
 const url = LiveLinks[target];
 return <a className="course-link" href={url || undefined} role={url ? undefined : "link"} aria-disabled={!url} tabIndex={url ? undefined : 0} target="_blank" rel="noopener noreferrer" onClick={e => { e.stopPropagation(); e.preventDefault(); if (url) openExternal(url); }}>↗ live: {title}{!url && " · TODO"}</a>;
}
export function SceneLinks({ links }: { links: BeatLink[] }) {
 return <nav className="course-links" aria-label="Scene resources">{links.map((link, i) => link.kind === "docs" ? <DocsLink key={i} {...link} /> : <LiveLink key={i} {...link} />)}</nav>;
}
