"use client";

import { Area, C, Show, T } from "../r11/kit";

// hardening: what keeps an agent alive when the machine restarts?
// Step 0: three machines and what restarts the agent on each.
//   Home server: user systemd services (dashboard, tunnel, remote-control
//   bridge) enabled with lingering, so they start at boot (systemctl --user,
//   checked 21 Oct 2026; "Auto-start Claude RC on homebox restart" thread,
//   3 Sep 2026). Deploys build into a spare slot then swap
//   (ScienceDash docs/specs/production-mode.md, README).
//   NERSC cluster: scrontab keeper fires every 5 min and restarts the
//   remote-control bridge; after kill -9 it was back in 5 min and fully live
//   in about 16 min (memory perlmutter-rc-keeper; notes/w8/production-keeper.md;
//   course-state-2026-10-15.md).
//   Argonne cluster: bridge and keeper loop in tmux; user crontab denied, no
//   scrontab equivalent, so not self-healing (memory polaris-alcf-setup).
// Step 1: what broke.
//   Ten scene agents run locally: load 15 on 4 cores, session restarted,
//   20 Oct 2026; moved to cloud sessions (course-build thread, 22:06 UTC;
//   memory no-serious-compute-on-homebox: 4 cores, 7 GB).
//   NERSC maintenance 21 Oct 2026: three pieces of course work only on the
//   cluster (memory cluster-work-needs-remote).
//   pyCHM: a cloud session lost its unpushed commits; recovered from a git
//   bundle of 53 commits (w19/HOMEBOX-STORIES.md section 3, 18 Oct 2026).
// Step 2: checklist. 07:15 CEST check: scheduled task "bridge check after
//   maintenance (course morning)", created 8 Oct, due 22 Oct 05:15 UTC.
const MONO = "var(--font-geist-mono), monospace";
const card = { background: C.card, border: `1px solid ${C.rule}`, borderRadius: 14, padding: "1.6vh 1.2vw" } as const;

const MACHINES = [
  { name: "Home server", keeper: "Services start at boot; updates build beside the live copy.", ok: true },
  { name: "NERSC cluster", keeper: "A job every 5 minutes restarts the bridge.", ok: true },
  { name: "Argonne cluster", keeper: "A keeper loop in tmux. Reboots kill it.", ok: false },
];

const BROKE = [
  { where: "home server, 20 Oct", what: "Ten agents and builds on 4 cores: load 15, session restarted." },
  { where: "NERSC maintenance, 21 Oct", what: "Cluster-only code was stranded." },
  { where: "cloud session", what: "Unpushed commits lost; a git bundle saved them." },
];

const CHECK = [
  { c: "Keeper or scheduler" },
  { c: "State on disk" },
  { c: "Push every milestone" },
  { c: "Morning check", note: "07:15 tomorrow" },
];

export function Hardening({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "3.4vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.6vw" }}>
        {MACHINES.map((m) => (
          <div key={m.name} style={{ ...card, display: "flex", flexDirection: "column", gap: "1vh" }}>
            <div style={{ ...T.big, ...T.serif, color: C.ink }}>{m.name}</div>
            <div style={{ ...T.body, color: C.muted, flex: 1 }}>{m.keeper}</div>
            <div className="t-label" style={{ ...T.label, fontFamily: MONO, color: m.ok ? C.accent : C.warm }}>
              {m.ok ? "● comes back after a restart" : "○ needs me after a reboot"}
            </div>
          </div>
        ))}
      </div>

      <Show when={step >= 1}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.6vw" }}>
          {BROKE.map((b) => (
            <div key={b.where} style={{ ...card, padding: "1.2vh 1vw", borderLeft: `4px solid ${C.warm}` }}>
              <div className="t-label" style={{ ...T.label, fontFamily: MONO, color: C.warm }}>broke: {b.where}</div>
              <div style={{ ...T.body, color: C.ink }}>{b.what}</div>
            </div>
          ))}
        </div>
      </Show>

      <Show when={step >= 2}>
        <div style={{ display: "flex", gap: "2.4vw", flexWrap: "wrap", justifyContent: "center" }}>
          {CHECK.map(({ c, note }) => (
            <div key={c} style={{ ...T.body, color: C.ink, display: "flex", alignItems: "baseline", gap: "0.6vw" }}>
              <span aria-hidden style={{ color: C.accent }}>☑</span>{c}
              {note && <span className="t-label" style={{ ...T.label, fontFamily: MONO, color: C.muted }}>{note}</span>}
            </div>
          ))}
        </div>
      </Show>
    </Area>
  );
}
