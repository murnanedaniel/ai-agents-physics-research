// Pure text helpers for the show-and-tell wall. No React, no fetch, so they can be
// tested with plain node (node --experimental-strip-types).

const IMG_MD = /!\[[^\]]*\]\(\s*<?(https:\/\/[^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/i;
const IMG_HTML = /<img\b[^>]*\bsrc\s*=\s*["'](https:\/\/[^"']+)["']/i;
const IMG_ATTACH = /(https:\/\/github\.com\/user-attachments\/assets\/[A-Za-z0-9-]+)/i;

/** First image in a markdown body: markdown image, HTML img or a bare user-attachments URL. */
export function firstImage(body: string): string | null {
  const hits = [IMG_MD, IMG_HTML, IMG_ATTACH]
    .map((re) => { const m = re.exec(body); return m ? { at: m.index, url: m[1] } : null; })
    .filter((h): h is { at: number; url: string } => !!h)
    .sort((a, b) => a.at - b.at);
  return hits[0]?.url ?? null;
}

/** Markdown/HTML to one line of plain text. */
export function plain(md: string): string {
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

export function clip(s: string, n = 140): string {
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  const sp = cut.lastIndexOf(" ");
  return `${(sp > n * 0.6 ? cut.slice(0, sp) : cut).replace(/[\s,.;:]+$/, "")}…`;
}

// The reviewer's comment starts with the marker line "**Spotlight**" (a trailing colon
// or dash and text on the same line are allowed).
const MARKER = /^\s*\*\*\s*spotlight\s*:?\s*\*\*\s*[:\-–—]?[ \t]*/i;

export const isSpotlightComment = (body: string | null | undefined): boolean => !!body && MARKER.test(body);

/**
 * Parse a "**Spotlight**" review comment. Returns null if the body does not start with
 * the marker. verdict: the first paragraph with text, as plain text, about 200 chars.
 * image: the first image anywhere in the comment, or null.
 */
export function parseSpotlightComment(body: string | null | undefined): { verdict: string; image: string | null } | null {
  if (!isSpotlightComment(body)) return null;
  const rest = (body as string).replace(/\r\n?/g, "\n").replace(MARKER, "");
  let verdict = "";
  for (const para of rest.split(/\n[ \t]*\n/)) {
    const text = plain(para);
    if (text) { verdict = text; break; }
  }
  return { verdict: clip(verdict, 200), image: firstImage(rest) };
}
