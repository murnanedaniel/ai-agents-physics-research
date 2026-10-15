export const DOCS_BASE = process.env.NEXT_PUBLIC_DOCS_BASE ?? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/docs/`;
export function docs(path = "") { return `${DOCS_BASE.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`; }
// Empty destinations are deliberate draft placeholders, not broken external URLs.
export const LiveLinks = {
 rangeDashboard: process.env.NEXT_PUBLIC_RANGE_DASHBOARD_URL ?? "",
 ovensStatus: process.env.NEXT_PUBLIC_OVENS_STATUS_URL ?? "",
 sciencedash: process.env.NEXT_PUBLIC_SCIENCEDASH_URL ?? "#sciencedash-link-set-at-runtime",
 repo: process.env.NEXT_PUBLIC_REPO_URL ?? "",
} as const;
export function openExternal(url: string) {
 if (url && typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
}
