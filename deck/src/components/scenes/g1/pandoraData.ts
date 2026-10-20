// Pandora particle flow, one mu=200 ttbar event, single thread, dedicated CPU node.
// From notes/w19/pandora_speedup.csv (rows 0 to 13), itself from the ColliderML
// testbed OPTIMIZATION_LOG.md, 30 May to 1 Jun 2026. Minutes = runtime_seconds / 60.
export type Attempt = {
  key: string;
  label: string;          // short axis label
  min: number | null;     // wall minutes per event; null = killed with no timing
  status: "start" | "kept" | "slower" | "physics";
  note: string;           // hover text: what changed and what the check said
};

export const ATTEMPTS: Attempt[] = [
  { key: "first", label: "first run", min: 100, status: "start", note: "Killed by the Slurm limit after 1 h 40 min (lower bound). Truth-link step was O(N²)." },
  { key: "stock", label: "stock", min: 3614 / 60, status: "kept", note: "Stock LCContent after the truth-link fix: 60.2 min. Reference output." },
  { key: "prunes", label: "prunes", min: 2980 / 60, status: "kept", note: "Profile: FragmentRemoval is 90% of wall time, not reclustering. Bounding-sphere prunes: 49.7 min, byte-identical." },
  { key: "v1", label: "hash grid", min: null, status: "slower", note: "Uniform hash grid per call: slower than brute force, killed. Discarded." },
  { key: "v2", label: "cell grid", min: null, status: "slower", note: "Sorted-cell grid per call: slower than brute force, killed. Discarded." },
  { key: "v3", label: "sorted sweep", min: 1386 / 60, status: "kept", note: "1-D sorted-axis sweep: 23.1 min, byte-identical. Kept." },
  { key: "v4", label: "k-d tree", min: 1482 / 60, status: "slower", note: "Cached 3-D k-d tree: 24.7 min, slower than the sweep. Discarded." },
  { key: "cut300", label: "cut 300", min: 1372 / 60, status: "physics", note: "Contact cut 500 to 300 mm: 22.9 min, but PFO sum E +0.47%. Rejected." },
  { key: "pass50", label: "50 passes", min: 832 / 60, status: "physics", note: "NMaxPasses = 50: 13.9 min, but sum E +2.47%, neutrons +13.9%. Rejected." },
  { key: "aggr", label: "aggressive", min: 640 / 60, status: "physics", note: "Fewer passes plus tighter cut: 10.7 min, but jet response +7.64%. Rejected." },
  { key: "cache", label: "contact cache", min: 638 / 60, status: "kept", note: "Sweep plus cross-pass contact cache: 10.6 min, byte-identical. Shipped." },
  { key: "cachep50", label: "cache + 50", min: 485 / 60, status: "physics", note: "Cache plus 50 passes: 8.1 min, but jet response +8.5%, over the 3% budget. Rejected." },
];
