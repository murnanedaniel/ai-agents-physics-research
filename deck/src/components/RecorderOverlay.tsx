"use client";

import { createPortal } from "react-dom";
import { recordingTime, useRecorder } from "@/lib/useRecorder";

type Props = { recorder: ReturnType<typeof useRecorder> };

export function RecorderOverlay({ recorder: r }: Props) {
  if (r.state === "disabled") return null;
  return createPortal(
    <div onClick={(event) => event.stopPropagation()}>
      {r.clap ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white" aria-label="Sync clap">
          <div className="grid grid-cols-8 grid-rows-4" style={{ width: "min(100vw, 200vh)", aspectRatio: "2 / 1" }}>
            {Array.from({ length: 32 }, (_, i) => (
              <div key={i} style={{ background: (Math.floor(i / 8) + i % 8) % 2 ? "#fff" : "#000" }} />
            ))}
          </div>
          <span className="absolute bg-white px-8 py-3 font-mono text-8xl font-black text-black">SYNC</span>
        </div>
      ) : r.state === "armed" || r.state === "finished" ? (
        <div className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center">
          <div className="pointer-events-auto max-w-md rounded-xl border border-black/10 bg-white/95 p-6 text-center text-sm text-black shadow-lg">
            {r.state === "armed" ? (
              <>
                <p>Recording mode. Start CleanShot, then press <strong>B</strong> to begin.</p>
                {r.unfinished && (
                  <p className="mt-3 text-xs text-zinc-600">
                    An unfinished recording from {new Date(r.unfinished.startedAt).toLocaleString()} exists.{" "}
                    <button type="button" className="underline" onClick={r.downloadUnfinished}>Download it</button>
                  </p>
                )}
              </>
            ) : (
              <p>Recording log saved: {r.eventCount} events, {recordingTime(r.elapsed)}.{" "}
                <button type="button" className="underline" onClick={r.downloadAgain}>Download again</button>
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="pointer-events-none fixed right-3 top-3 z-[60] flex items-center gap-2 font-mono text-[11px] text-red-500">
          <span>{recordingTime(r.elapsed)}</span>
          <span className="h-[10px] w-[10px] rounded-full" style={{ background: r.flagged ? "#facc15" : "#ef4444", animation: r.flagged ? "none" : "recorder-pulse 1.5s ease-in-out infinite" }} />
        </div>
      )}
      {r.storageError && <p className="fixed bottom-3 right-3 z-[70] rounded bg-white p-2 text-xs text-red-700">Recording recovery storage is unavailable. Keep this tab open until you download the log.</p>}
      <style>{`@keyframes recorder-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }`}</style>
    </div>,
    document.body,
  );
}
