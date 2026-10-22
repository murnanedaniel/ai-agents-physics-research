// Karpathy's autoresearch, the run shown in the repo README (progress.png,
// github.com/karpathy/autoresearch at 228791f, 25 Mar 2026): "83 Experiments,
// 15 Kept Improvements", validation bits per byte (lower is better) against
// experiment number. The repo does not publish results.tsv (it is gitignored),
// so these values were digitised from progress.png on 22 Oct 2026: axis
// calibration from the grid lines (x: 24.9 px per experiment; y: 0.005 bpb per
// 195.8 px), dot centres from the fill colours. Kept values agree with the
// plot's own grid to about 1e-5 bpb. 59 of the 68 discarded runs were
// recoverable; the other 9 are off the plot's scale (the original only draws
// runs within 0.0005 of the baseline) or hidden under labels and the line.
export const KEPT: [number, number][] = [
  [0, 0.99789], [2, 0.99072], [6, 0.98965], [8, 0.9874], [14, 0.98449],
  [23, 0.98392], [28, 0.98334], [32, 0.98211], [38, 0.97986], [39, 0.97958],
  [43, 0.97892], [64, 0.97828], [65, 0.97803], [67, 0.97772], [74, 0.97729],
];

export const DISCARDED: [number, number][] = [
  [3, 0.99355], [4, 0.99386], [5, 0.99345], [7, 0.98994], [9, 0.98834], [10, 0.9911],
  [11, 0.99028], [12, 0.99335], [13, 0.99056], [16, 0.99507], [17, 0.98551], [18, 0.99302],
  [19, 0.98786], [21, 0.98505], [22, 0.99802], [25, 0.98581], [26, 0.98413], [29, 0.98456],
  [30, 0.98418], [31, 0.98758], [33, 0.98318], [34, 0.9834], [35, 0.98604], [36, 0.98367],
  [37, 0.98326], [42, 0.98283], [44, 0.97999], [45, 0.97941], [46, 0.98084], [47, 0.98011],
  [48, 0.98257], [49, 0.98303], [50, 0.98073], [51, 0.98551], [52, 0.9862], [53, 0.97923],
  [54, 0.97912], [55, 0.98068], [56, 0.97951], [57, 0.97948], [58, 0.98191], [59, 0.984],
  [60, 0.97976], [61, 0.97935], [63, 0.9803], [66, 0.97886], [68, 0.97805], [69, 0.97892],
  [71, 0.97795], [72, 0.97879], [73, 0.97882], [75, 0.97902], [76, 0.98193], [77, 0.97769],
  [78, 0.97746], [79, 0.97872], [80, 0.97941], [81, 0.97775], [82, 0.97879],
];

// Kept-change labels as printed on progress.png (abbreviated there by the plot).
export const KEPT_NOTE: Record<number, string> = {
  2: "halve the batch",
  43: "embedding LR 0.6 → 0.8",
  64: "RoPE base frequency ×5",
  74: "random seed 42 → 137",
};
