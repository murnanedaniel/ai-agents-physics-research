import type { ReactElement } from "react";
import type { BeatLink } from "@/components/DocsLink";

export type { BeatLink } from "@/components/DocsLink";
export type Beat = {
  kicker: string;
  title: string;
  lines: string[];
  links: BeatLink[];
  draft?: boolean;
  Visual?: (props: { step: number }) => ReactElement;
};

export const d = (path: string, title: string): BeatLink => ({ kind: "docs", path, title });
export const l = (target: Extract<BeatLink, { kind: "live" }>["target"], title: string): BeatLink => ({ kind: "live", target, title });
