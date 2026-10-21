"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { asset } from "@/lib/asset";
import { openExternal } from "@/lib/links";
import { Area, C, T } from "../r11/kit";

// The live show-and-tell wall. Static export, so everything happens in the browser:
// fetch the course repo's pull requests from the public GitHub API (no token, so 60
// requests per hour per IP), keep those titled "[show-and-tell N]" and show them as
// cards. One cache is shared by every wall, so moving between show-0..show-3 does not
// spend extra requests. Text is rendered as React text only, never as HTML.

const REPO = "murnanedaniel/ai-agents-physics-research";
const REPO_URL = `https://github.com/${REPO}`;
const API = `https://api.github.com/repos/${REPO}/pulls?state=all&per_page=100&sort=created&direction=desc`;
const REFRESH_MS = 120_000;
const FRESH_MS = 30_000; // reuse a fetch younger than this when a wall mounts

type PR = { number: number; title: string; body: string | null; html_url: string; user: { login: string; avatar_url: string } | null };
type Entry = { id: number; handle: string; avatar: string; title: string; snippet: string; image: string | null; url: string };
type Status = { kind: "ok" } | { kind: "rate"; reset: Date | null } | { kind: "error"; message: string };

let cache: { at: number; prs: PR[]; etag: string | null } | null = null;
let inflight: Promise<PR[]> | null = null;

class RateLimited extends Error {
  constructor(public reset: Date | null) { super("rate limited"); }
}

async function fetchPRs(force: boolean): Promise<PR[]> {
  if (!force && cache && Date.now() - cache.at < FRESH_MS) return cache.prs;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      // A conditional request answered 304 does not count against the 60 per hour.
      const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
      if (cache?.etag) headers["If-None-Match"] = cache.etag;
      const res = await fetch(API, { headers, cache: "no-store" });
      if (res.status === 304 && cache) {
        cache = { ...cache, at: Date.now() };
        return cache.prs;
      }
      if (res.status === 403 || res.status === 429) {
        const remaining = res.headers.get("x-ratelimit-remaining");
        const reset = Number(res.headers.get("x-ratelimit-reset"));
        if (remaining === "0" || res.status === 429) throw new RateLimited(reset ? new Date(reset * 1000) : null);
      }
      if (!res.ok) throw new Error(`GitHub answered ${res.status}`);
      const prs = (await res.json()) as PR[];
      cache = { at: Date.now(), prs: Array.isArray(prs) ? prs : [], etag: res.headers.get("etag") };
      return cache.prs;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

// "[show-and-tell 2] My title", tolerant of case and spaces: "[ Show and tell 2 ]", "[show-and-tell2]".
const prefix = (n: number) => new RegExp(`^\\s*\\[\\s*show[\\s_-]*and[\\s_-]*tell\\s*-?\\s*${n}\\s*\\]\\s*[:\\-–]?\\s*`, "i");

const IMG_MD = /!\[[^\]]*\]\(\s*<?(https:\/\/[^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/i;
const IMG_HTML = /<img\b[^>]*\bsrc\s*=\s*["'](https:\/\/[^"']+)["']/i;
const IMG_ATTACH = /(https:\/\/github\.com\/user-attachments\/assets\/[A-Za-z0-9-]+)/i;

function firstImage(body: string): string | null {
  const hits = [IMG_MD, IMG_HTML, IMG_ATTACH]
    .map((re) => { const m = re.exec(body); return m ? { at: m.index, url: m[1] } : null; })
    .filter((h): h is { at: number; url: string } => !!h)
    .sort((a, b) => a.at - b.at);
  return hits[0]?.url ?? null;
}

function plain(md: string): string {
  return md
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, "")
    .replace(/(\*\*|__|\*|_|~~)(?=\S)([^*_~]+?)\1/g, "$2")
    .replace(/^\s*[-*_]{3,}\s*$/gm, " ")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function clip(s: string, n = 140) {
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  const sp = cut.lastIndexOf(" ");
  return `${(sp > n * 0.6 ? cut.slice(0, sp) : cut).replace(/[\s,.;:]+$/, "")}…`;
}

function entries(prs: PR[], n: number): Entry[] {
  const re = prefix(n);
  return prs
    .filter((p) => re.test(p.title ?? ""))
    .map((p) => {
      const body = p.body ?? "";
      return {
        id: p.number,
        handle: p.user?.login ?? "someone",
        avatar: p.user?.avatar_url ?? "",
        title: (p.title ?? "").replace(re, "").trim() || `pull request #${p.number}`,
        snippet: clip(plain(body)),
        image: firstImage(body),
        url: p.html_url,
      };
    });
}

const block = (e: { stopPropagation: () => void }) => e.stopPropagation();
const hhmm = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const lbl = { ...T.label, ...T.mono, color: C.muted } as const;

export function ShowWall({ n }: { n: number }) {
  const [prs, setPrs] = useState<PR[] | null>(cache?.prs ?? null);
  const [status, setStatus] = useState<Status>({ kind: "ok" });
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState<Date | null>(cache ? new Date(cache.at) : null);

  const load = useCallback(async (force: boolean) => {
    setLoading(true);
    try {
      const list = await fetchPRs(force);
      setPrs(list);
      setUpdated(cache ? new Date(cache.at) : new Date());
      setStatus({ kind: "ok" });
    } catch (e) {
      if (e instanceof RateLimited) setStatus({ kind: "rate", reset: e.reset });
      else setStatus({ kind: "error", message: e instanceof Error ? e.message : "network error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    const run = (force: boolean) => { if (alive) void load(force); };
    run(false);
    const id = window.setInterval(() => run(true), REFRESH_MS);
    return () => { alive = false; window.clearInterval(id); };
  }, [load]);

  const list = prs ? entries(prs, n) : [];
  const open = (url: string) => (e: MouseEvent) => { e.stopPropagation(); e.preventDefault(); openExternal(url); };

  return (
    <Area style={{ gap: "2vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.4vw", flexWrap: "wrap" }}>
        <span style={{ ...T.big, ...T.serif, color: C.ink }}>
          {prs === null ? "…" : list.length} {list.length === 1 ? "share" : "shares"}
        </span>
        <span className="t-label" style={lbl}>
          {loading ? "checking GitHub…" : updated ? `updated ${hhmm(updated)} · every 2 min` : ""}
        </span>
        <button type="button" onPointerDown={block}
          onClick={(e) => { e.stopPropagation(); void load(true); e.currentTarget.blur(); }}
          disabled={loading}
          className="t-label"
          style={{ ...lbl, marginLeft: "auto", padding: "0.4em 1em", borderRadius: 100, border: `1.5px solid ${C.accent}`, background: "transparent", color: C.accent, cursor: loading ? "wait" : "pointer" }}>
          ↻ refresh
        </button>
      </div>

      {status.kind !== "ok" && (
        <div className="t-label" style={{ ...T.label, color: C.warm, borderLeft: `3px solid ${C.warm}`, paddingLeft: "0.8em" }}>
          {status.kind === "rate"
            ? `GitHub has had enough requests from this network for now${status.reset ? `; it will answer again after ${hhmm(status.reset)}` : ""}. ${prs ? "Showing the last list." : ""}`
            : `Could not reach GitHub (${status.message}). ${prs ? "Showing the last list." : "Try refresh in a moment."}`}
        </div>
      )}

      {list.length === 0 ? (
        <Empty n={n} headline={prs !== null ? "No PRs yet." : status.kind === "ok" ? "Asking GitHub…" : "Cannot see the PRs just now."} />
      ) : (
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(220px, 21vw, 400px), 1fr))", gap: "1.4vw", alignContent: "start", paddingRight: 4 }}>
          {list.map((p) => (
            <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" onPointerDown={block} onClick={open(p.url)}
              style={{ display: "flex", flexDirection: "column", background: C.card, border: `1px solid ${C.rule}`, borderRadius: 14, overflow: "hidden", textDecoration: "none", color: C.ink, cursor: "pointer" }}>
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt="" loading="lazy" referrerPolicy="no-referrer"
                  style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block", background: C.paper, borderBottom: `1px solid ${C.rule}` }} />
              )}
              <div style={{ padding: "1.4vh 1vw", display: "flex", flexDirection: "column", gap: "0.8vh" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6vw" }}>
                  {p.avatar && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.avatar} alt="" loading="lazy" referrerPolicy="no-referrer" width={28} height={28} style={{ borderRadius: "50%", objectFit: "cover" }} />
                  )}
                  <span className="t-label" style={{ ...lbl, color: C.accent }}>@{p.handle}</span>
                </div>
                <span className="t-label" style={{ ...T.body, ...T.serif, fontSize: "clamp(18px, 1.4vw, 26px)", color: C.ink }}>{p.title}</span>
                {p.snippet && <span className="t-label" style={{ ...T.label, color: C.muted }}>{p.snippet}</span>}
              </div>
            </a>
          ))}
        </div>
      )}
    </Area>
  );
}

function Empty({ n, headline }: { n: number; headline: string }) {
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "4vw" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/qr-show-and-tell.svg")} alt="QR code: the show-and-tell page of the course docs"
        style={{ width: "30vh", height: "30vh", background: "#fff", padding: "0.6vh", borderRadius: 8, flex: "none" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
        <span style={{ ...T.big, color: C.ink }}>
          {headline}
        </span>
        <span style={{ ...T.body, color: C.ink }}>
          Share with the share-to-course skill, or open a PR titled{" "}
          <span style={{ ...T.mono }}>[show-and-tell {n}]</span>.
        </span>
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" onPointerDown={block}
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); openExternal(REPO_URL); }}
          className="t-label" style={{ ...T.label, ...T.mono, color: C.accent }}>
          github.com/{REPO} ↗
        </a>
      </div>
    </div>
  );
}

export const showWall = (n: number) => {
  function ShowWallScene() { return <ShowWall n={n} />; }
  return ShowWallScene;
};
