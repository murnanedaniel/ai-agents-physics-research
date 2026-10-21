"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { asset } from "@/lib/asset";
import { openExternal } from "@/lib/links";
import { Area, C, T } from "../r11/kit";
import { clip, firstImage, parseSpotlightComment, plain } from "./spotlight";

// The live show-and-tell wall. Static export, so everything happens in the browser:
// fetch the course repo's pull requests from the public GitHub API (no token, so 60
// requests per hour per IP), keep those titled "[show-and-tell N]" and show them as
// cards. One cache is shared by every wall, so moving between show-0..show-3 does not
// spend extra requests. Text is rendered as React text only, never as HTML.
//
// Spotlight: a PR labelled "spotlight" goes first as a large card, with the reviewer's
// verdict from the latest issue comment starting "**Spotlight**". Comments are fetched
// only for spotlighted PRs on this wall, only when the PR's updated_at has moved (a new
// comment bumps it), and with If-None-Match, so a quiet refresh costs one request.

const REPO = "murnanedaniel/ai-agents-physics-research";
const REPO_URL = `https://github.com/${REPO}`;
const API = `https://api.github.com/repos/${REPO}/pulls?state=all&per_page=100&sort=created&direction=desc`;
const COMMENTS = (n: number) => `https://api.github.com/repos/${REPO}/issues/${n}/comments?per_page=100`;
const SPOTLIGHT_LABEL = "spotlight";
const REFRESH_MS = 120_000;
const FRESH_MS = 30_000; // reuse a fetch younger than this when a wall mounts

type PR = {
  number: number; title: string; body: string | null; html_url: string; updated_at?: string;
  user: { login: string; avatar_url: string } | null;
  labels?: { name?: string }[];
};
type Entry = { id: number; handle: string; avatar: string; title: string; snippet: string; image: string | null; url: string; spotlight: boolean; key: string };
type Comment = { body?: string | null };
// Per-PR spotlight verdict. key = the PR's updated_at when this was fetched; count = comments seen.
type Spot = { key: string; etag: string | null; count: number; verdict: string; image: string | null };
type Status = { kind: "ok" } | { kind: "rate"; reset: Date | null } | { kind: "error"; message: string };

let cache: { at: number; prs: PR[]; etag: string | null } | null = null;
let inflight: Promise<PR[]> | null = null;

const spots = new Map<number, Spot>();
const spotInflight = new Map<number, Promise<void>>();

class RateLimited extends Error {
  constructor(public reset: Date | null) { super("rate limited"); }
}

function rateCheck(res: Response) {
  if (res.status === 403 || res.status === 429) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    const reset = Number(res.headers.get("x-ratelimit-reset"));
    if (remaining === "0" || res.status === 429) throw new RateLimited(reset ? new Date(reset * 1000) : null);
  }
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
      rateCheck(res);
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

// One spotlighted PR's comments. Skipped when updated_at has not moved since the last
// good fetch. On any failure the last good verdict stays in the map.
function fetchSpot(e: Entry): Promise<void> {
  const have = spots.get(e.id);
  if (have && have.key === e.key) return Promise.resolve();
  const running = spotInflight.get(e.id);
  if (running) return running;
  const job = (async () => {
    try {
      const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
      if (have?.etag) headers["If-None-Match"] = have.etag;
      const res = await fetch(COMMENTS(e.id), { headers, cache: "no-store" });
      if (res.status === 304 && have) { spots.set(e.id, { ...have, key: e.key }); return; }
      rateCheck(res);
      if (!res.ok) throw new Error(`GitHub answered ${res.status}`);
      const raw = (await res.json()) as Comment[];
      const comments = Array.isArray(raw) ? raw : [];
      let found: { verdict: string; image: string | null } | null = null;
      for (let i = comments.length - 1; i >= 0 && !found; i--) found = parseSpotlightComment(comments[i]?.body);
      spots.set(e.id, { key: e.key, etag: res.headers.get("etag"), count: comments.length, verdict: found?.verdict ?? "", image: found?.image ?? null });
    } finally {
      spotInflight.delete(e.id);
    }
  })();
  spotInflight.set(e.id, job);
  return job;
}

// All spotlighted PRs on a wall, in parallel. Rethrows a rate limit (or the first error)
// after every request has settled, so whatever did arrive is kept.
async function fetchSpots(list: Entry[]): Promise<void> {
  const results = await Promise.allSettled(list.filter((e) => e.spotlight).map(fetchSpot));
  const failed = results.filter((r): r is PromiseRejectedResult => r.status === "rejected").map((r) => r.reason);
  const rate = failed.find((r) => r instanceof RateLimited);
  if (rate) throw rate;
  if (failed[0]) throw failed[0];
}

// "[show-and-tell 2] My title", tolerant of case and spaces: "[ Show and tell 2 ]", "[show-and-tell2]".
const prefix = (n: number) => new RegExp(`^\\s*\\[\\s*show[\\s_-]*and[\\s_-]*tell\\s*-?\\s*${n}\\s*\\]\\s*[:\\-–]?\\s*`, "i");

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
        spotlight: (p.labels ?? []).some((l) => (l?.name ?? "").trim().toLowerCase() === SPOTLIGHT_LABEL),
        key: p.updated_at ?? "",
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
  const [, setSpotTick] = useState(0); // spots live in the module map; bump to re-render

  const load = useCallback(async (force: boolean) => {
    setLoading(true);
    try {
      const list = await fetchPRs(force);
      setPrs(list);
      setUpdated(cache ? new Date(cache.at) : new Date());
      try {
        await fetchSpots(entries(list, n));
      } finally {
        setSpotTick((t) => t + 1);
      }
      setStatus({ kind: "ok" });
    } catch (e) {
      if (e instanceof RateLimited) setStatus({ kind: "rate", reset: e.reset });
      else setStatus({ kind: "error", message: e instanceof Error ? e.message : "network error" });
    } finally {
      setLoading(false);
    }
  }, [n]);

  useEffect(() => {
    let alive = true;
    const run = (force: boolean) => { if (alive) void load(force); };
    run(false);
    const id = window.setInterval(() => run(true), REFRESH_MS);
    return () => { alive = false; window.clearInterval(id); };
  }, [load]);

  const list = prs ? entries(prs, n) : [];
  const spotlit = list.filter((p) => p.spotlight);
  const rest = list.filter((p) => !p.spotlight);
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
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: "2vh", paddingRight: 4 }}>
          {spotlit.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 27vw, 640px), 1fr))", gap: "1.4vw", alignContent: "start" }}>
              {spotlit.map((p) => <SpotCard key={p.id} p={p} spot={spots.get(p.id)} open={open} />)}
            </div>
          )}
          {spotlit.length > 0 && rest.length > 0 && (
            <span className="t-label" style={lbl}>+ {rest.length} more {rest.length === 1 ? "share" : "shares"}</span>
          )}
          {rest.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(220px, 21vw, 400px), 1fr))", gap: "1.4vw", alignContent: "start" }}>
          {rest.map((p) => (
            <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" onPointerDown={block} onClick={open(p.url)}
              style={{ display: "flex", flexDirection: "column", background: C.card, border: `1px solid ${C.rule}`, borderRadius: 14, overflow: "hidden", textDecoration: "none", color: C.ink, cursor: "pointer" }}>
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt="" loading="lazy" referrerPolicy="no-referrer"
                  style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block", background: C.paper, borderBottom: `1px solid ${C.rule}` }} />
              )}
              <div style={{ padding: "1.4vh 1vw", display: "flex", flexDirection: "column", gap: "0.8vh" }}>
                <Who p={p} size={28} />
                <span className="t-label" style={{ ...T.body, ...T.serif, fontSize: "clamp(18px, 1.4vw, 26px)", color: C.ink }}>{p.title}</span>
                {p.snippet && <span className="t-label" style={{ ...T.label, color: C.muted }}>{p.snippet}</span>}
              </div>
            </a>
          ))}
          </div>
          )}
        </div>
      )}
    </Area>
  );
}

function Who({ p, size }: { p: Entry; size: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.6vw" }}>
      {p.avatar && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.avatar} alt="" loading="lazy" referrerPolicy="no-referrer" width={size} height={size} style={{ borderRadius: "50%", objectFit: "cover" }} />
      )}
      <span className="t-label" style={{ ...lbl, color: C.accent }}>@{p.handle}</span>
    </div>
  );
}

function SpotCard({ p, spot, open }: { p: Entry; spot: Spot | undefined; open: (url: string) => (e: MouseEvent) => void }) {
  const image = spot?.image ?? p.image;
  const verdict = spot?.verdict || "";
  return (
    <a href={p.url} target="_blank" rel="noopener noreferrer" onPointerDown={block} onClick={open(p.url)}
      style={{ display: "flex", flexDirection: "column", background: C.card, border: `2px solid ${C.accent}`, borderRadius: 16, overflow: "hidden", textDecoration: "none", color: C.ink, cursor: "pointer" }}>
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" loading="lazy" referrerPolicy="no-referrer"
          style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "contain", display: "block", background: C.paper, borderBottom: `1px solid ${C.rule}` }} />
      )}
      <div style={{ padding: "1.6vh 1.2vw", display: "flex", flexDirection: "column", gap: "1vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
          <Who p={p} size={40} />
          <span className="t-label" style={{ ...lbl, marginLeft: "auto", color: C.accent, border: `1.5px solid ${C.accent}`, borderRadius: 100, padding: "0.1em 0.7em", whiteSpace: "nowrap" }}>
            ★ spotlight
          </span>
        </div>
        <span className="t-label" style={{ ...T.body, ...T.serif, fontSize: "clamp(20px, 1.7vw, 32px)", color: C.ink }}>{p.title}</span>
        {verdict ? (
          <span className="t-label" style={{ ...T.label, color: C.ink, borderLeft: `3px solid ${C.accent}`, paddingLeft: "0.7em" }}>{verdict}</span>
        ) : p.snippet ? (
          <span className="t-label" style={{ ...T.label, color: C.muted }}>{p.snippet}</span>
        ) : null}
      </div>
    </a>
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
