"""Build public/r20/odd_event.bin for the eth-gnn scene.

Source: ColliderML Release 1 (CC BY 4.0), huggingface.co/datasets/CERN/ColliderML-Release-1,
config ttbar_pu200_tracker_hits, file data/ttbar_pu200_tracker_hits/train-00000-of-01000.parquet,
event_id 0. Open Data Detector (ODD), ttbar with 200 pile-up, full Geant4 simulation.

Kept: barrel hits (volumes 17, 24, 29) with |z| < 1 m, projected to x-y.
Candidate edges: hits on neighbouring barrel layers, close in phi and pointing back to the
beam line in z (a geometric stand-in for a module map). Truth: an edge is true when both hits
share a particle_id and sit on consecutive layers of that particle. "Focus" particles have
pT > PT_MIN GeV (circle fit in x-y, B = 2 T), a first hit on the innermost layer, |d0| < 2 mm and at least
5 barrel layers.

Binary layout (little endian):
  u32 magic 'GRAF' 0x46415247, u32 nHits, u32 nEdges, u32 nFocus, f32 scale (units per mm), u32 nTotalHits
  i16 hits[nHits*2]            x, y in units of 1/scale mm
  i16 trackId[nHits]           dense focus id or -1, padded to 4 bytes
  u32 edges[nEdges*2]
  u8  flag[nEdges]             0 false, 1 true, 2 true and both hits on one focus particle
Usage: python make_odd_event.py <parquet> <out.bin>
"""
import sys, struct
import numpy as np
import pyarrow.parquet as pq

src, out = sys.argv[1], sys.argv[2]
PT_MIN = 1.0
ev = pq.read_table(src).slice(0, 1).to_pylist()[0]
x = np.array(ev["x"], dtype=np.float64); y = np.array(ev["y"], dtype=np.float64); z = np.array(ev["z"], dtype=np.float64)
pid = np.array(ev["particle_id"], dtype=np.uint64)
vol = np.array(ev["volume_id"]); lay = np.array(ev["layer_id"])
n_total = len(x)

keep = np.isin(vol, [17, 24, 29]) & (np.abs(z) < 1000)
x, y, z, pid, vol, lay = x[keep], y[keep], z[keep], pid[keep], vol[keep], lay[keep]
r = np.hypot(x, y); phi = np.arctan2(y, x)

# order layers by mean radius
keys = vol.astype(np.int64) * 10000 + lay.astype(np.int64)
uk = np.unique(keys)
meanr = np.array([r[keys == k].mean() for k in uk])
order = np.argsort(meanr)
layer_of = {int(uk[i]): rank for rank, i in enumerate(order)}
L = np.array([layer_of[int(k)] for k in keys])
nL = len(uk)
print("layers", nL, [round(float(m)) for m in np.sort(meanr)])

# per-particle circle fit for pT
def circle_fit(xs, ys):
    A = np.c_[xs, ys, np.ones_like(xs)]
    b = -(xs ** 2 + ys ** 2)
    c, *_ = np.linalg.lstsq(A, b, rcond=None)
    xc, yc = -c[0] / 2, -c[1] / 2
    R = np.sqrt(max(xc ** 2 + yc ** 2 - c[2], 0))
    return xc, yc, R

focus_id = -np.ones(len(x), dtype=np.int64)
order_p = np.argsort(pid, kind="stable")
pids, starts = np.unique(pid[order_p], return_index=True)
ends = list(starts[1:]) + [len(order_p)]
true_pairs = []
nfocus = 0
for p, s, e in zip(pids, starts, ends):
    if p == 0:
        continue
    idx = order_p[s:e]
    idx = idx[np.argsort(r[idx])]
    if len(idx) < 2:
        continue
    # one hit per layer (first by radius) for the chain
    _, first = np.unique(L[idx], return_index=True)
    chain = idx[np.sort(first)]
    chain = chain[np.argsort(L[chain])]
    for a, b in zip(chain[:-1], chain[1:]):
        if L[b] - L[a] == 1:
            true_pairs.append((a, b))
    if len(chain) >= 5:
        xc, yc, R = circle_fit(x[chain], y[chain])
        pt = 0.3 * 2.0 * R / 1000.0  # GeV, R in mm
        d0 = abs(np.hypot(xc, yc) - R)
        if pt > PT_MIN and d0 < 2.0 and L[chain[0]] == 0:
            focus_id[idx] = nfocus
            nfocus += 1
print("focus particles", nfocus)
true_set = set(true_pairs)

# candidate edges between neighbouring layers
edges = []
by_layer = [np.where(L == l)[0] for l in range(nL)]
for l in range(nL - 1):
    A, B = by_layer[l], by_layer[l + 1]
    B = B[np.argsort(phi[B])]
    pb = phi[B]
    dr = meanr[order[l + 1]] - meanr[order[l]]
    win = 0.0003 * dr + 0.003
    for a in A:
        lo = np.searchsorted(pb, phi[a] - win); hi = np.searchsorted(pb, phi[a] + win)
        cand = B[lo:hi]
        if phi[a] - win < -np.pi:
            cand = np.r_[cand, B[pb > phi[a] - win + 2 * np.pi]]
        if phi[a] + win > np.pi:
            cand = np.r_[cand, B[pb < phi[a] + win - 2 * np.pi]]
        if len(cand) == 0:
            continue
        if l < 7:  # pixels and short strips measure z; long-strip hits sit at the strip centre
            z0 = z[a] - r[a] * (z[cand] - z[a]) / (r[cand] - r[a])
            cand = cand[np.abs(z0) < 100]
        else:
            cand = cand[np.abs(z[cand] / r[cand] - z[a] / r[a]) < 0.12]
        for b in cand:
            edges.append((a, b))
edge_set = set(edges)
missed = [p for p in true_pairs if p not in edge_set and focus_id[p[0]] >= 0 and focus_id[p[0]] == focus_id[p[1]]]
print("candidate", len(edges), "true", len(true_pairs), "focus true pairs added", len(missed))
edges += missed
edges = np.array(edges, dtype=np.uint32)
flag = np.zeros(len(edges), dtype=np.uint8)
for i, (a, b) in enumerate(edges):
    if (int(a), int(b)) in true_set:
        flag[i] = 2 if (focus_id[a] >= 0 and focus_id[a] == focus_id[b]) else 1
print("edges", len(edges), "true", int((flag > 0).sum()), "focus", int((flag == 2).sum()))
rng = np.random.default_rng(0)
perm = rng.permutation(len(edges))
edges, flag = edges[perm], flag[perm]

scale = 30.0
hx = np.round(x * scale).astype(np.int16); hy = np.round(y * scale).astype(np.int16)
hits = np.empty(len(x) * 2, dtype=np.int16); hits[0::2] = hx; hits[1::2] = hy
with open(out, "wb") as f:
    f.write(struct.pack("<IIIIfI", 0x46415247, len(x), len(edges), nfocus, scale, n_total))
    f.write(hits.tobytes())
    tid = focus_id.astype(np.int16).tobytes()
    f.write(tid)
    if len(tid) % 4:
        f.write(b"\0" * (4 - len(tid) % 4))
    f.write(edges.reshape(-1).tobytes())
    f.write(flag.tobytes())
print("hits kept", len(x), "of", n_total)
