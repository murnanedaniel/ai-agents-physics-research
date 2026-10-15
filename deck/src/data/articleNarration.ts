import type { SceneId } from "@/lib/timeline";
export type ArticleSection = { scene?: SceneId; step?: number; url?: string; embedLabel?: string; heading?: string; say: string[] };
export const ARTICLE_SECTIONS: ArticleSection[] = [];
