// Shared data for the NBI collaboration scenes (collab, collab-match), ported
// from my NBI talk (NBI-AI-future: NbiGraph, ResearchGraph, Matchmaking,
// lib/winningPair, lib/sectionColors). Anonymised for the public deck:
// names, staff ids, titles and research texts removed (src/data/r37/nbiGraph.json);
// the matched pair is "Researcher A" and "Researcher B", fields only.
// Graph: 124 NBI faculty (assistant professor and up). Each person has two
// text embeddings (text-embedding-3-large): P, their background, from about ten
// recent arXiv abstracts; W, their ongoing work, from their three latest
// lead-author papers. Layout: PCA of P, 3 components. Edges: each person's top 3
// by score = W similarity minus P similarity; "mutual" = both ends picked each other.
import raw from "@/data/r37/nbiGraph.json";

export type GNode = { x: number; y: number; z: number; s: number; valid: boolean };
export type GEdge = { a: number; b: number; mutual: boolean; w: number; p: number };

const data = raw as unknown as {
  sections: string[];
  nodes: [number, number, number, number, number][];
  edges: [number, number, number, number, number][];
  pair: [number, number];
};

export const SECTIONS: string[] = data.sections;
export const NODES: GNode[] = data.nodes.map(([x, y, z, s, v]) => ({ x, y, z, s, valid: v === 1 }));
export const EDGES: GEdge[] = data.edges.map(([a, b, m, w, p]) => ({ a, b, mutual: m === 1, w, p }));
export const PAIR: [number, number] = data.pair;

const LIGHT: Record<string, string> = {
  "Climate and Geophysics": "#1d4ed8",
  "Theoretical Particle Physics and Cosmology": "#7c3aed",
  "Quantum Optics": "#0d9488",
  "Condensed Matter Physics": "#16a34a",
  "Cosmic Dawn Center (DAWN)": "#db2777",
  "Experimental Subatomic Physics": "#ea580c",
  Biophysics: "#15803d",
  "Astrophysics and Planetary Science": "#ca8a04",
  "Dark Cosmology Centre (DARK)": "#6d28d9",
  "Niels Bohr International Academy": "#4338ca",
  Support: "#52525b",
};
export const sectionColor = (s: number) => LIGHT[SECTIONS[s]] ?? "#52525b";

// The pair the talk's roulette lands on. Fields only.
export const RESEARCHERS = {
  a: { label: "Researcher A", field: "Condensed matter theory", detail: "spin models for molecular magnets", s: NODES[PAIR[0]].s },
  b: { label: "Researcher B", field: "Climate and geophysics", detail: "volcanic ash layers in polar ice cores", s: NODES[PAIR[1]].s },
};
