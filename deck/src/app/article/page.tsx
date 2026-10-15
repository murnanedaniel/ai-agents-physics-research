import type { Metadata } from "next";
import { Article } from "@/components/Article";

export const metadata: Metadata = {
  title: "AI Agents in Practice for Physics Research — reading version",
  description: "Draft reading companion for KIT, 22 October 2026.",
};

export default function ArticlePage() {
  return <Article />;
}
