"use client";

import type { Beat } from "./_types";
import { VectorSearch } from "@/components/scenes/r22/VectorSearch";

const beat: Beat = {
  title: "Do you need vector search?",
  source: "Cormack et al., SIGIR 2009 · chATLAS draft paper (ATLAS ML Forum, Sep 2026); public in about two weeks · Cherny, Latent Space, May 2025 · Cursor blog, Nov 2025",
  Scene: VectorSearch,
};

export default beat;
