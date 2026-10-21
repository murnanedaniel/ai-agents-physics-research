// Pandora particle flow speed-up, step by step, in the order the agent tried things.
// One mu=200 ttbar event on the Open Data Detector, single thread, dedicated CPU node.
// Times: notes/w19/pandora_speedup.csv (from the testbed OPTIMIZATION_LOG.md, 30 May to 1 Jun 2026).
// Code: notes/round2/materials/pandora/STEPS.md (trimmed from the LCContent and k4GaudiPandora
// commits). The committed fragment-removal source is the k-d tree (v4), so the sorted sweep (v3)
// is described, not quoted.

export type Status = "kept" | "info" | "slower" | "physics";
export type Step = {
  key: string;
  name: string;
  min: number | null;      // event wall minutes after this step; null = not recorded or killed
  timeLabel: string;
  speed?: string;          // speed-up against stock (60.2 min)
  status: Status;
  at: number;              // deck step at which the row appears
  before?: string;
  after?: string;
  note: string;            // one line: what it did and how it was checked
};

export const STEPS: Step[] = [
  {
    key: "truth", name: "Truth links: N×M to N+M", min: 3614 / 60, timeLabel: ">100 → 60.2 min", status: "kept", at: 0,
    before: `for (auto& rels : caloRelCollections)
  for (auto* hit : calorimeterHitVector)   // every hit
    for (auto&& link : *rels)              // x every link
      if (sameHit(link, hit)) accumulate(...);`,
    after: `std::unordered_set<uint64_t> validHitKeys;
for (auto* hit : calorimeterHitVector)
  validHitKeys.insert(key(hit));           // once
for (auto& rels : caloRelCollections)
  for (auto&& link : *rels)                // one pass
    if (validHitKeys.count(keyOf(link))) accumulate(...);`,
    note: "Matching calorimeter hits to true particles scanned every link for every hit. A lookup set makes it one pass, with identical links.",
  },
  {
    key: "profile", name: "Profile every algorithm", min: null, timeLabel: "measure", status: "info", at: 0,
    after: `NeutralFragmentRemoval   1995 s
MainFragmentRemoval       393 s
...
reclustering (first guess)  0.03 s`,
    note: "The first guess was reclustering: it took 0.03 s. Fragment removal took 90% of the time.",
  },
  {
    key: "prune", name: "Bounding spheres, worklist", min: 2980 / 60, timeLabel: "49.7 min", speed: "1.21×", status: "kept", at: 0,
    before: `for each (daughter, parent) cluster pair:
  compare every hit with every hit`,
    after: `// per cluster: centre = mean hit, radius = max hit distance
if (dist(daughter.centre, parent.centre)
      - daughter.radius - parent.radius > maxSeparation)
  continue;   // cannot contain a close hit pair`,
    note: "Skip cluster pairs too far apart to hold a close pair of hits, and re-check a hit only when a neighbour changes. Byte-identical output.",
  },
  {
    key: "grid", name: "Hash grids", min: null, timeLabel: "slower", status: "slower", at: 0,
    note: "Two hash-grid versions for the hit search were slower than brute force. Discarded.",
  },
  {
    key: "sweep", name: "Sorted sweep", min: 1386 / 60, timeLabel: "23.1 min", speed: "2.61×", status: "kept", at: 0,
    before: `for (auto& I : daughterHits)
  for (auto& J : parentHits) {        // every hit pair
    float d2 = dist2(I, J);
    minD2 = std::min(minD2, d2);      // + close-hit flags
  }`,
    after: `// exact nearest-hit search along one sorted axis
// (described in the log; not in the committed code)`,
    note: "Sort the hits along one axis, so the nearest-hit search skips most pairs. Same answer, far fewer comparisons. Byte-identical output.",
  },
  {
    key: "kdtree", name: "3-D k-d tree", min: 1482 / 60, timeLabel: "24.7 min", speed: "2.44×", status: "slower", at: 0,
    after: `const KDTree& tree = GetParentNN(pParent);   // cached
for (auto& I : daughterHits) {
  const float h = tree.NearestSquared(pos(I));
  minD2 = std::min(minD2, h);
}`,
    note: "A 3-D tree for the nearest-hit search, cached per cluster. Slower than the sweep, so discarded.",
  },
  {
    key: "cache", name: "Cache across passes", min: 638 / 60, timeLabel: "10.6 min", speed: "5.66×", status: "kept", at: 0,
    before: `// every one of ~200 passes rebuilds every contact
const NeutralClusterContact c(pDaughter, pParent, params);
if (PassesClusterContactCuts(c)) map[pDaughter].push_back(c);`,
    after: `auto it = cache.find({pDaughter, pParent});
if (it != end && unchanged(it, pDaughter, pParent)) {
  if (it->second.passed) map[pDaughter].push_back(it->second.c);
  continue;   // both clusters unchanged: reuse
}`,
    note: "Reuse a cluster contact across the ~200 passes while both clusters are unchanged. Shipped, byte-identical.",
  },
  {
    key: "tuning", name: "Looser cuts, fewer passes", min: 485 / 60, timeLabel: "8.1 min", speed: "7.45×", status: "physics", at: 1,
    note: "Faster, but unmerged fragments count their energy twice. Jet response moved by up to 8.5%, over the 3% budget. Rejected.",
  },
];
