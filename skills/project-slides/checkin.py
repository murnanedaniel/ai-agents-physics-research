#!/usr/bin/env python3
"""Build a compact project check-in from local evidence and optional W&B data."""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import shutil
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any


SKILL_DIR = Path(__file__).resolve().parent
NOTE_RE = re.compile(r"(?i)^\s*[-*]?\s*(TODO|BLOCKER|BLOCKED|NEXT|DECISION)[:\s]")
SKIP_DIRS = {".git", "node_modules", ".venv", "venv", "wandb", "examples", "shots",
             "out", ".next", "__pycache__"}
PREFERRED_FIGURE_DIRS = {"plots", "figures", "figs", "results", "outputs"}
FIGURE_SUFFIXES = {".png", ".jpg", ".jpeg", ".svg", ".pdf"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create a lightweight project check-in deck.")
    parser.add_argument("--project-dir", type=Path, required=True)
    parser.add_argument("--wandb", metavar="ENTITY/PROJECT")
    parser.add_argument("--metric")
    parser.add_argument("--since-days", type=int, default=7)
    parser.add_argument("--out", type=Path, default=Path("checkin-output"))
    parser.add_argument("--format", choices=("html", "tex", "both"), default="both")
    parser.add_argument("--title")
    parser.add_argument("--author", default="")
    parser.add_argument("--figure", type=Path, action="append", default=[], metavar="PATH")
    parser.add_argument("--next", dest="next_steps", action="append", default=[], metavar="TEXT")
    parser.add_argument("--blocker", action="append", default=[], metavar="TEXT")
    return parser.parse_args()


def run_git(project: Path, *args: str) -> str:
    result = subprocess.run(
        ["git", "-C", str(project), *args], capture_output=True, text=True,
        timeout=20, check=True,
    )
    return result.stdout.strip()


def gather_git(project: Path, since_days: int, warnings: list[str]) -> dict[str, Any]:
    facts: dict[str, Any] = {"is_repo": False, "commits": [], "files_changed": 0,
                             "branch": None, "uncommitted_changes": 0}
    try:
        run_git(project, "rev-parse", "--is-inside-work-tree")
        facts["is_repo"] = True
        log = run_git(project, "log", f"--since={since_days}.days", "--pretty=%h%x09%ad%x09%s", "--date=short")
        for line in log.splitlines():
            parts = line.split("\t", 2)
            if len(parts) == 3:
                facts["commits"].append({"hash": parts[0], "date": parts[1], "subject": parts[2]})
        names = run_git(project, "log", f"--since={since_days}.days", "--name-only", "--pretty=format:")
        facts["files_changed"] = len({line for line in names.splitlines() if line.strip()})
        facts["branch"] = run_git(project, "branch", "--show-current") or "detached HEAD"
        porcelain = run_git(project, "status", "--porcelain")
        facts["uncommitted_changes"] = len(porcelain.splitlines()) if porcelain else 0
    except (FileNotFoundError, subprocess.SubprocessError) as exc:
        warnings.append(f"Git facts unavailable: {exc}")
    return facts


def gather_notes(project: Path, warnings: list[str]) -> list[dict[str, str]]:
    candidates: set[Path] = set()
    for pattern in ("README*", "NOTES*", "TODO*", "DECISIONS*", "*.md"):
        candidates.update(path for path in project.glob(pattern) if path.is_file())
    notes: list[dict[str, str]] = []
    for path in sorted(candidates):
        try:
            for number, line in enumerate(path.read_text(encoding="utf-8", errors="replace").splitlines(), 1):
                if NOTE_RE.match(line):
                    notes.append({"file": path.name, "line": str(number), "text": line.strip()})
                    if len(notes) == 20:
                        return notes
        except OSError as exc:
            warnings.append(f"Could not read notes from {path.name}: {exc}")
    return notes


def gather_figures(project: Path, explicit: list[Path],
                   warnings: list[str]) -> list[dict[str, Any]]:
    figures: list[dict[str, Any]] = []
    seen: set[Path] = set()
    for supplied in explicit:
        path = supplied if supplied.is_absolute() else project / supplied
        path = path.resolve()
        if not path.is_file():
            warnings.append(f"Figure not found: {supplied}")
            continue
        if path.suffix.lower() not in FIGURE_SUFFIXES:
            warnings.append(f"Unsupported figure type: {supplied}")
            continue
        seen.add(path)
        try:
            label = str(path.relative_to(project))
        except ValueError:
            label = str(path)
        try:
            figures.append({"path": label, "source": str(path), "mtime": path.stat().st_mtime})
        except OSError as exc:
            warnings.append(f"Could not inspect figure {supplied}: {exc}")

    discovered: list[dict[str, Any]] = []
    try:
        for root, dirs, files in os.walk(project):
            dirs[:] = [name for name in dirs if name not in SKIP_DIRS]
            for name in files:
                path = Path(root) / name
                resolved = path.resolve()
                if path.suffix.lower() in FIGURE_SUFFIXES and resolved not in seen:
                    try:
                        relative = path.relative_to(project)
                        discovered.append({"path": str(relative), "source": str(resolved),
                                           "mtime": path.stat().st_mtime,
                                           "preferred": bool(PREFERRED_FIGURE_DIRS & set(relative.parts[:-1]))})
                    except OSError:
                        continue
    except OSError as exc:
        warnings.append(f"Figure scan incomplete: {exc}")
    preferred = [item for item in discovered if item["preferred"]]
    fallback = [item for item in discovered if not item["preferred"]]
    candidates = preferred if preferred else fallback
    figures.extend({key: value for key, value in item.items() if key != "preferred"}
                   for item in sorted(candidates, key=lambda item: item["mtime"], reverse=True))
    return figures[:3]


def gather_wandb(path: str | None, metric: str | None, since_days: int,
                 out_dir: Path, warnings: list[str]) -> dict[str, Any] | None:
    if not path:
        return None
    try:
        import wandb  # type: ignore
    except ImportError:
        warnings.append("W&B skipped: the wandb package is not installed (pip install wandb)")
        return None
    try:
        api = wandb.Api(timeout=20)
        iso = (datetime.now(timezone.utc) - timedelta(days=since_days)).isoformat()
        runs = list(api.runs(path, filters={"created_at": {"$gt": iso}}, order="-created_at")[:20])
        records = []
        for run in runs:
            summary = dict(getattr(run, "summary", {}) or {})
            records.append({"name": run.name, "id": run.id, "state": run.state,
                            "created_at": str(run.created_at), "url": run.url,
                            "metric": summary.get(metric) if metric else None})
        eligible = [(record, run) for record, run in zip(records, runs)
                    if not metric or isinstance(record["metric"], (int, float))]
        best_pair = max(eligible, key=lambda pair: pair[0]["metric"]) if metric and eligible else (eligible[0] if eligible else None)
        plot_name = None
        if best_pair and metric:
            record, run = best_pair
            try:
                import matplotlib.pyplot as plt  # type: ignore
                history = run.history(keys=[metric])
                x_values = list(history["_step"])
                y_values = list(history[metric])
                pairs = [(x, y) for x, y in zip(x_values, y_values) if y is not None]
                if pairs:
                    # 3.3 x 1.65 in at 10.5 pt lands near 9 pt in beamer and above 14 px in HTML.
                    plt.rcParams.update({"font.size": 10.5})
                    fig, axis = plt.subplots(figsize=(3.3, 1.65), dpi=300)
                    xs, ys = zip(*pairs)
                    fig.patch.set_facecolor("#fcfcfb"); axis.set_facecolor("#fcfcfb")
                    axis.plot(xs, ys, color="#2a78d6", linewidth=1.8)
                    axis.grid(axis="y", color="#e6e5e0")
                    axis.spines[["top", "right"]].set_visible(False)
                    axis.set_xlabel("step"); axis.set_ylabel(metric)
                    axis.annotate(f"{ys[-1]:.4g}", (xs[-1], ys[-1]), xytext=(-6, 7),
                                  textcoords="offset points", ha="right", color="#2a78d6")
                    fig.tight_layout(pad=0.3)
                    safe_metric = re.sub(r"[^A-Za-z0-9_.-]+", "_", metric)
                    plot_name = f"wandb_{safe_metric}.png"
                    fig.savefig(out_dir / plot_name)
                    plt.close(fig)
            except ImportError:
                warnings.append("W&B plot skipped: install the optional 'matplotlib' package.")
            except Exception as exc:  # W&B history and plotting failures must not stop a deck.
                warnings.append(f"W&B plot unavailable: {exc}")
        return {"runs": records, "best": best_pair[0] if best_pair else None, "plot": plot_name}
    except Exception as exc:
        warnings.append(f"W&B skipped: {type(exc).__name__}: {str(exc)[:120]}")
        return None


def copy_figures(project: Path, out_dir: Path, figures: list[dict[str, Any]],
                 warnings: list[str]) -> list[dict[str, Any]]:
    copied = []
    for index, item in enumerate(figures, 1):
        source = Path(item.get("source", project / item["path"]))
        destination = out_dir / f"figure-{index}{source.suffix.lower()}"
        try:
            shutil.copy2(source, destination)
            copied.append({key: value for key, value in item.items() if key != "source"}
                          | {"copied": destination.name})
        except OSError as exc:
            warnings.append(f"Could not copy figure {item['path']}: {exc}")
    return copied


def clean_note(text: str) -> tuple[str, str]:
    text = re.sub(r"^\s*[-*]?\s*", "", text)
    match = re.match(r"(?i)(TODO|BLOCKER|BLOCKED|NEXT|DECISION)[:\s]+(.*)", text)
    return (match.group(1).upper(), match.group(2).strip()) if match else ("NOTE", text)


def shorten(text: str, words: int = 12) -> str:
    parts = text.split()
    return " ".join(parts[:words]) + ("…" if len(parts) > words else "")


def truncate_subject(text: str, limit: int = 70) -> str:
    if len(text) <= limit:
        return text
    shortened = text[:limit - 3].rsplit(None, 1)[0]
    return (shortened or text[:limit - 3]).rstrip() + "..."


def html_slide_content(facts: dict[str, Any], title: str, author: str, date_text: str,
                       since_date: str) -> str:
    git = facts["git"]; wandb = facts.get("wandb"); figures = facts["figures"]
    esc = html.escape
    slides = [f'''    <section class="slide title" data-title="Project check-in" aria-roledescription="slide">
      <h1 class="claim">{esc(title)}</h1>
      <p class="subtitle">Project check-in generated from local evidence.</p><p class="byline">{esc(author or "Add author")} · {esc(date_text)}</p>
    </section>''']
    points = []
    if git["is_repo"]:
        points.append(f"{len(git['commits'])} commits since {since_date}")
    if wandb and wandb.get("best") and facts.get("metric") and isinstance(wandb["best"].get("metric"), (int, float)):
        points.append(f"Best {facts['metric']} {wandb['best']['metric']:.4g} ({wandb['best']['id']})")
    if git["is_repo"]:
        points.append(f"{git['uncommitted_changes']} uncommitted changes")
    figure_name = wandb.get("plot") if wandb else None
    if not figure_name and figures:
        figure_name = figures[0]["copied"]
    if figure_name:
        visual = f'<img src="{esc(figure_name)}" alt="Most recent project figure">'
        caption = "W&B metric history" if wandb and wandb.get("plot") else f"Most recent figure: {figures[0]['path']}"
    else:
        visual = '<svg viewBox="0 0 700 390" role="img" aria-labelledby="generated-placeholder"><title id="generated-placeholder">Placeholder for the key plot</title><rect x="2" y="2" width="696" height="386" fill="none" stroke="#9aa7b8" stroke-width="2" stroke-dasharray="10 8"/><text x="350" y="200" text-anchor="middle" fill="#6b6a64" font-family="ui-monospace,monospace" font-size="20">add the key plot</text></svg>'
        caption = "No local figure found"
    ids = ", ".join(run["id"] for run in (wandb or {}).get("runs", [])) or "none"
    commit_range = f"{git['commits'][-1]['hash']} to {git['commits'][0]['hash']}" if git["commits"] else "no commits in window"
    point_html = "".join(f"<li>{esc(shorten(point))}</li>" for point in points[:3]) or "<li>No status facts found.</li>"
    slides.append(f'''    <section class="slide fig-points" data-title="Status" aria-roledescription="slide">
      <h1 class="claim">Claim needed: current project status</h1>
      <div class="body"><div class="fig">{visual}<p class="caption">{esc(caption)}</p></div><ul class="points">{point_html}</ul></div>
      <p class="src">source: git {esc(commit_range)}{(" · W&amp;B runs " + esc(ids)) if wandb else ""}</p>
    </section>''')
    if len(git["commits"]) > 3:
        changed = [truncate_subject(item["subject"]) for item in git["commits"][:2]]
        changed.append(f"and {len(git['commits']) - 2} more commits")
    else:
        changed = [truncate_subject(item["subject"]) for item in git["commits"][:3]]
    if not changed:
        changed = [f"No commits found in the {facts['since_days']}-day window."]
    bullets = "".join(f"<li>{esc(text)}</li>" for text in changed)
    repository = (f"<p>{git['files_changed']} files changed</p><p>Branch: {esc(str(git['branch']))}</p>"
                  if git["is_repo"] else "<p>Git repository not detected.</p>")
    slides.append(f'''    <section class="slide two-col" data-title="What changed" aria-roledescription="slide">
      <h1 class="claim">Claim needed: changes since {esc(since_date)}</h1>
      <div class="columns"><div class="column"><h2>Changes</h2><ul>{bullets}</ul></div><div class="column"><h2>Repository</h2>{repository}</div></div>
      <p class="src">source: git log {esc(commit_range)}</p>
    </section>''')
    notes = [(clean_note(n["text"]), n) for n in facts["notes"]]
    next_items = [("NEXT", text, None) for text in facts["next_steps"]]
    next_items += [(kind, text, note) for (kind, text), note in notes if kind in {"TODO", "NEXT"}][:4]
    blockers = [("BLOCKER", text, None) for text in facts["blockers"]]
    blockers += [(kind, text, note) for (kind, text), note in notes if kind in {"BLOCKER", "BLOCKED"}][:2]
    if next_items or blockers:
        steps = "".join(f"<li>{esc(shorten(text))}</li>" for _, text, _ in next_items) or "<li>Add the next concrete action.</li>"
        blocker_html = "".join(f'<p><span class="status blocked">blocked</span> {esc(shorten(text, 8))}</p>' for _, text, _ in blockers) or '<p><span class="status ok">none recorded</span></p>'
        note_sources = [f"{n['file']}:{n['line']}" for _, _, n in next_items + blockers if n]
        if facts["next_steps"] or facts["blockers"]:
            note_sources.insert(0, "command line")
        slides.append(f'''    <section class="slide next" data-title="Next steps" aria-roledescription="slide">
      <h1 class="claim">Claim needed: next steps and blockers</h1>
      <div class="columns"><div class="column"><h2>Next steps</h2><ol>{steps}</ol></div><div class="column blockers"><h2>Blockers</h2>{blocker_html}</div></div>
      <p class="src">source: {esc(', '.join(note_sources))}</p>
    </section>''')
    if len(figures) > 1:
        second = figures[1]
        slides.append(f'''    <section class="slide full-fig" data-title="Figures" aria-roledescription="slide">
      <h1 class="claim">Claim needed: {esc(Path(second['path']).stem)}</h1>
      <div class="fig"><img src="{esc(second['copied'])}" alt="Project figure"><p class="caption">{esc(second['path'])}</p></div>
      <p class="src">source: local file {esc(second['path'])}</p>
    </section>''')
    return "\n".join(slides[:5])


LATEX_REPLACEMENTS = {"\\": r"\textbackslash{}", "&": r"\&", "%": r"\%", "$": r"\$", "#": r"\#",
                      "_": r"\_", "{": r"\{", "}": r"\}", "~": r"\textasciitilde{}", "^": r"\textasciicircum{}"}


def tex_escape(value: Any) -> str:
    return "".join(LATEX_REPLACEMENTS.get(char, char) for char in str(value))


def tex_document(facts: dict[str, Any], title: str, author: str, date_text: str,
                 since_date: str) -> str:
    template = (SKILL_DIR / "template.tex").read_text(encoding="utf-8")
    preamble = template.split("% ==== EXAMPLE DOCUMENT BEGINS ====", 1)[0]
    git = facts["git"]; wandb = facts.get("wandb"); figures = facts["figures"]
    points = []
    if git["is_repo"]:
        points.append(f"{len(git['commits'])} commits since {since_date}")
    if wandb and wandb.get("best") and facts.get("metric") and isinstance(wandb["best"].get("metric"), (int, float)):
        points.append(f"Best {facts['metric']} {wandb['best']['metric']:.4g} ({wandb['best']['id']})")
    if git["is_repo"]:
        points.append(f"{git['uncommitted_changes']} uncommitted changes")
    points = (points + [""] * 3)[:3]  # empty arguments drop the bullet
    figure = wandb.get("plot") if wandb else None
    if not figure and figures and Path(figures[0]["copied"]).suffix.lower() in {".png", ".jpg", ".jpeg", ".pdf"}:
        figure = figures[0]["copied"]
    figure = figure or "plots/key-plot.png"
    figure_argument = r"\detokenize{" + figure + "}"
    caption = "W&B metric history" if wandb and wandb.get("plot") else (figures[0]["path"] if figures else "No local figure found")
    commit_range = f"{git['commits'][-1]['hash']} to {git['commits'][0]['hash']}" if git["commits"] else "no commits in window"
    run_ids = ", ".join(run["id"] for run in (wandb or {}).get("runs", [])) or "none"
    wandb_src = f" · W\\&B runs {tex_escape(run_ids)}" if wandb else ""
    body = [preamble, f"\\title[{tex_escape(title)}]{{{tex_escape(title)}}}",
            "\\subtitle{Project check-in generated from local evidence}", f"\\author{{{tex_escape(author or 'Add author')}}}",
            f"\\date{{{tex_escape(date_text)}}}", "\\begin{document}", "\\begin{frame}[plain]\\titlepage\\end{frame}",
            f"\\figslide{{Claim needed: current project status}}{{{figure_argument}}}{{{tex_escape(caption)}}}"
            f"{{{tex_escape(points[0])}}}{{{tex_escape(points[1])}}}{{{tex_escape(points[2])}}}{{git {tex_escape(commit_range)}{wandb_src}}}"]
    if len(git["commits"]) > 3:
        changed = [truncate_subject(commit["subject"]) for commit in git["commits"][:2]]
        changed.append(f"and {len(git['commits']) - 2} more commits")
    else:
        changed = [truncate_subject(commit["subject"]) for commit in git["commits"][:3]]
    items = "".join(f"\\item {tex_escape(subject)}" for subject in changed)
    if not items:
        items = f"\\item No commits found in the {facts['since_days']}-day window."
    body.append(f"\\textslide{{Claim needed: changes since {tex_escape(since_date)}}}"
                f"{{\\begin{{itemize}}{items}\\end{{itemize}}\\src{{git log {tex_escape(commit_range)}}}}}")
    notes = [(clean_note(n["text"]), n) for n in facts["notes"]]
    next_items = [(text, None) for text in facts["next_steps"]]
    next_items += [(text, n) for (kind, text), n in notes if kind in {"TODO", "NEXT"}][:4]
    blockers = [(text, None) for text in facts["blockers"]]
    blockers += [(text, n) for (kind, text), n in notes if kind in {"BLOCKER", "BLOCKED"}][:2]
    if next_items or blockers:
        steps = "".join(f"\\item {tex_escape(shorten(text))}" for text, _ in next_items) or "\\item Add the next concrete action."
        blocked = "\\\\[3mm]".join("\\statusblocked{} " + tex_escape(shorten(text, 8)) for text, _ in blockers) or "\\statusok{} none recorded"
        note_sources = [f"{n['file']}:{n['line']}" for _, n in next_items + blockers if n]
        if facts["next_steps"] or facts["blockers"]:
            note_sources.insert(0, "command line")
        body.append(f"\\nextslide{{Claim needed: next steps and blockers}}"
                    f"{{\\begin{{enumerate}}{steps}\\end{{enumerate}}}}{{{blocked}}}{{{tex_escape(', '.join(note_sources))}}}")
    if len(figures) > 1:
        second = figures[1]; path = second["copied"]
        usable = path if Path(path).suffix.lower() in {".png", ".jpg", ".jpeg", ".pdf"} else "plots/convert-svg-to-pdf.pdf"
        usable_argument = r"\detokenize{" + usable + "}"
        body.append(f"\\begin{{frame}}[t]{{Claim needed: {tex_escape(Path(second['path']).stem)}}}"
                    f"\\centering\\figurecontent{{{usable_argument}}}\\par\\small\\color{{Muted}}{tex_escape(second['path'])}"
                    f"\\src{{local file {tex_escape(second['path'])}}}\\end{{frame}}")
    body.append("\\end{document}\n")
    return "\n".join(body)


def main() -> int:
    args = parse_args()
    project = args.project_dir.resolve()
    out_dir = args.out.resolve()
    warnings: list[str] = []
    if not project.is_dir():
        print(f"error: project directory does not exist: {project}", file=sys.stderr)
        return 2
    out_dir.mkdir(parents=True, exist_ok=True)
    now = datetime.now()
    since = now - timedelta(days=max(args.since_days, 0))
    git = gather_git(project, args.since_days, warnings)
    notes = gather_notes(project, warnings)
    figures = copy_figures(project, out_dir, gather_figures(project, args.figure, warnings), warnings)
    wandb = gather_wandb(args.wandb, args.metric, args.since_days, out_dir, warnings)
    title = args.title or project.name
    facts = {"generated_at": now.astimezone().isoformat(), "project_dir": str(project), "title": title,
             "author": args.author, "since_days": args.since_days, "metric": args.metric,
             "git": git, "notes": notes, "next_steps": args.next_steps, "blockers": args.blocker,
             "figures": figures, "wandb": wandb, "warnings": warnings}
    json_path = out_dir / "checkin.json"
    json_path.write_text(json.dumps(facts, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    outputs = [json_path]
    date_text = now.strftime("%-d %b %Y")
    since_date = since.strftime("%-d %b")
    if args.format in {"html", "both"}:
        template = (SKILL_DIR / "template.html").read_text(encoding="utf-8")
        generated = html_slide_content(facts, title, args.author, date_text, since_date)
        output = re.sub(r"(?s)(<!-- SLIDES:BEGIN -->).*?(<!-- SLIDES:END -->)",
                        lambda match: f"{match.group(1)}\n{generated}\n{match.group(2)}", template)
        html_path = out_dir / "checkin.html"
        html_path.write_text(output, encoding="utf-8")
        outputs.append(html_path)
    if args.format in {"tex", "both"}:
        tex_path = out_dir / "checkin.tex"
        tex_path.write_text(tex_document(facts, title, args.author, date_text, since_date), encoding="utf-8")
        outputs.append(tex_path)
    for path in outputs:
        print(path)
    for warning in warnings:
        print(f"warning: {warning}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
