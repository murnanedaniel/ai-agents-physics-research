"use client";
import { ARTICLE_SECTIONS } from "@/data/articleNarration";
import { DocsLink } from "./DocsLink";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function Article() {
 return <main className="theme-light paper-texture text-ink min-h-screen"><article className="mx-auto max-w-4xl px-8 py-20">
 <p className="font-mono mb-6">KIT · 22 October 2026 · draft reading version</p>
 <h1 className="font-serif text-5xl mb-6">AI Agents in Practice for Physics Research</h1>
 <p className="mb-8">Daniel Murnane</p>
 <div className="flex gap-4 mb-10"><a href={`${BASE}/`}>↩ Back to the deck</a><DocsLink title="course home" path="" /></div>
 {ARTICLE_SECTIONS.map((section, i) => <section key={i} className="my-10"><h2>{section.heading}</h2>{section.say.map((p,j) => <p key={j}>{p}</p>)}{section.scene && <iframe title={section.heading ?? section.scene} src={`${BASE}/embed/?scene=${section.scene}&step=${section.step ?? 0}`} className="w-full aspect-video border-0" />}</section>)}
 </article></main>;
}
