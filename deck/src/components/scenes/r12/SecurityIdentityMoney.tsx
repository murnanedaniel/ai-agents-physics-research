"use client";

import { motion } from "motion/react";
import { C, Canvas, Label, T, serif } from "./ui";

// security-identity-money: three kinds of harm. Step 0: the harm and what is at stake.
// Step 1: the control that limits it, and a real case.
const COLS = [
  {
    harm: "Personal",
    stake: "accounts, email, identity",
    control: "A separate user or VM, no credentials inside",
    example: "My threads: a token and a password pasted into a transcript.",
  },
  {
    harm: "Professional",
    stake: "code, data, reputation",
    control: "Pinned, trusted MCP; scoped tokens; review",
    example: "postmark-mcp 1.0.16 (Sep 2025) copied every sent email to an attacker.",
  },
  {
    harm: "Financial",
    stake: "cards, API bills, compute",
    control: "Single-use cards, capped keys, a budget file",
    example: "My runs: a budget file capped one agent at 100 GPU-hours.",
  },
];

export function SecurityIdentityMoneyScene({ step }: { step: number }) {
  const shown = step >= 1;
  return (
    <Canvas>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3vw", width: "100%", alignItems: "start" }}>
        {COLS.map((c, i) => (
          <div key={c.harm} style={{ display: "flex", flexDirection: "column", gap: "2.4vh" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8vh", borderBottom: `2px solid ${C.ink}`, paddingBottom: "1.6vh" }}>
              <span style={{ ...serif, fontSize: T.big, lineHeight: 1.1 }}>{c.harm}</span>
              <Label>{c.stake}</Label>
            </div>
            <motion.div initial={false} animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 8 }} transition={{ duration: 0.6, delay: shown ? i * 0.15 : 0 }}
              aria-hidden={!shown} style={{ display: "flex", flexDirection: "column", gap: "2.4vh" }}>
              <span style={{ fontSize: T.body, lineHeight: 1.25, borderLeft: `4px solid ${C.accent}`, paddingLeft: "1vw" }}>{c.control}</span>
              <Label style={{ textTransform: "none", letterSpacing: 0, color: C.muted, lineHeight: 1.45 }}>{c.example}</Label>
            </motion.div>
          </div>
        ))}
      </div>
    </Canvas>
  );
}
