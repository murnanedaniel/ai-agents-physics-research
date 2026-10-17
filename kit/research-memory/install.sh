#!/usr/bin/env bash
set -eu
apply=0
project=0
for arg in "$@"; do
  case "$arg" in
    --apply-hook) apply=1 ;;
    --project) project=1 ;;
    *) echo "Unknown option: $arg" >&2; exit 1 ;;
  esac
done
if [ "$project" = 1 ] && [ "$apply" = 0 ]; then
  echo '--project requires --apply-hook' >&2
  exit 1
fi
src=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
mkdir -p "$HOME/.local/bin" "$HOME/.claude/skills/research-memory"
cp "$src/rmem" "$HOME/.local/bin/rmem"
chmod +x "$HOME/.local/bin/rmem"
cp "$src/skill/research-memory/SKILL.md" "$HOME/.claude/skills/research-memory/SKILL.md"
case ":$PATH:" in
  *":$HOME/.local/bin:"*) ;;
  *) echo 'Warning: ~/.local/bin is not on PATH. Add it to PATH for your shell and Claude Code.' >&2 ;;
esac
cat <<'TEXT'
Installed rmem and the research-memory skill.
SessionStart hook JSON:
{"hooks": {"SessionStart": [{"hooks": [{"type": "command", "command": "rmem context"}]}]}}
Add this to ~/.claude/settings.json for all projects or .claude/settings.json per project.
Codex users: add `rmem context` output via AGENTS.md instructions (see README)
TEXT
if [ "$apply" = 1 ]; then
  settings="$HOME/.claude/settings.json"
  if [ "$project" = 1 ]; then settings="$PWD/.claude/settings.json"; fi
  python3 - "$settings" <<'PY'
import datetime
import json
from pathlib import Path
import shutil
import sys

path = Path(sys.argv[1])
try:
    exists = path.exists()
    data = json.loads(path.read_text()) if exists else {}
    if not isinstance(data, dict):
        raise ValueError('settings must be a JSON object')
    hooks = data.setdefault('hooks', {})
    if not isinstance(hooks, dict):
        raise ValueError('hooks must be an object')
    starts = hooks.setdefault('SessionStart', [])
    if not isinstance(starts, list):
        raise ValueError('SessionStart must be a list')
    present = any(isinstance(item, dict) and item.get('matcher', '') in ('', '*')
                  and any(isinstance(h, dict) and h.get('type') == 'command'
                          and h.get('command') == 'rmem context'
                          for h in item.get('hooks', [])) for item in starts)
    if not present:
        starts.append({'hooks': [{'type': 'command', 'command': 'rmem context'}]})
    serialised = json.dumps(data, indent=2) + '\n'
    path.parent.mkdir(parents=True, exist_ok=True)
    if exists:
        backup = path.with_name(path.name + '.bak-' + datetime.datetime.now().strftime('%Y%m%d-%H%M%S-%f'))
        shutil.copy2(path, backup)
        print('Backup: ' + str(backup))
    path.write_text(serialised)
    print('Hook configured: ' + str(path))
except (OSError, ValueError, TypeError) as exc:
    sys.exit('Could not merge hook: ' + str(exc))
PY
fi
