import contextlib
import datetime
import io
import json
import os
from pathlib import Path
import runpy
import sqlite3
import subprocess
import tempfile
import time
import unittest
from unittest import mock

KIT = Path(__file__).resolve().parents[1]
CLI = KIT / 'rmem'


class MemoryTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.home = Path(self.tmp.name)
        self.project = self.home / 'project'
        self.project.mkdir()
        self.root = self.home / 'transcripts'
        self.root.mkdir()
        self.env = dict(os.environ, HOME=str(self.home), RMEM_HOME=str(self.home / 'state'), RMEM_ROOTS=str(self.root))
        self.file = self.root / 'session.jsonl'
        self.write([
            self.turn('user', 'Remember the boundary conditions for c++ (v2)'),
            self.turn('assistant', [{'type': 'text', 'text': 'The boundary conditions are periodic.'}, {'type': 'tool_use', 'name': 'secret tool'}]),
            self.turn('user', [{'type': 'tool_result', 'content': 'tool noise'}]),
            self.turn('user', '<system-reminder>system noise'),
            dict(self.turn('user', 'meta noise'), isMeta=True),
            self.turn('assistant', [{'type': 'thinking', 'thinking': 'thinking noise'}]),
            self.turn('user', 'Credentials sk-ant-' + 'x' * 30 + ' API_TOKEN=abc123def456'),
        ])

    def turn(self, role, text, session='one', cwd=None):
        return dict(type=role, sessionId=session, cwd=str(cwd or self.project), timestamp='2026-10-17T10:00:00Z', message={'content': text})

    def write(self, entries, mode='w'):
        with self.file.open(mode) as stream:
            for entry in entries:
                stream.write(json.dumps(entry) + '\n')

    def run_cli(self, *args, cwd=None):
        result = subprocess.run([str(CLI), *args], env=self.env, cwd=cwd or self.project, text=True, capture_output=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        return result.stdout

    def db(self):
        db = sqlite3.connect(self.home / 'state/index.db')
        self.addCleanup(db.close)
        return db

    def test_index_noise_redaction(self):
        self.run_cli('index')
        db = self.db()
        text = '\n'.join(r[0] for r in db.execute('SELECT text FROM turns'))
        self.assertEqual(db.execute('SELECT count(*) FROM turns').fetchone()[0], 3)
        for forbidden in ['noise', 'secret tool', 'sk-ant-', 'abc123def456']:
            self.assertNotIn(forbidden, text)
        self.assertIn('API_TOKEN=[REDACTED]', text)
        self.assertEqual(db.execute('SELECT title FROM threads').fetchone()[0], 'Remember the boundary conditions for c++ (v2)')
        raw = (self.home / 'state/index.db').read_bytes()
        self.assertNotIn(b'abc123def456', raw)

    def test_incremental_partial_and_shrink(self):
        self.run_cli('index')
        first = self.db().execute('SELECT id FROM turns ORDER BY id').fetchall()
        self.write([self.turn('assistant', 'Appended answer')], 'a')
        self.assertIn('1 new turns', self.run_cli('index'))
        self.assertEqual(self.db().execute('SELECT id FROM turns ORDER BY id LIMIT 3').fetchall(), first)
        self.assertIn('0 new turns', self.run_cli('index'))
        with self.file.open('a') as stream:
            stream.write(json.dumps(self.turn('user', 'Partial line')))
        self.assertIn('0 new turns', self.run_cli('index'))
        with self.file.open('a') as stream:
            stream.write('\n')
        self.assertIn('1 new turns', self.run_cli('index'))
        self.write([self.turn('user', 'Replacement')])
        self.run_cli('index')
        self.assertEqual(self.db().execute('SELECT text FROM turns').fetchall(), [('Replacement',)])
        self.assertNotIn('periodic', self.run_cli('search', 'periodic'))

    def test_search_phrase_punctuation_filters(self):
        self.assertIn('[boundary conditions]', self.run_cli('search', '"boundary conditions"'))
        self.assertIn('claude --resume one', self.run_cli('search', 'c++ (v2)'))
        self.assertEqual(self.run_cli('search', 'boundary', '--since', '2027-01-01'), '')
        result = self.run_cli('search', 'boundary', '--role', 'assistant')
        self.assertIn('assistant:', result)
        self.assertNotIn('  user:', result)
        self.assertEqual(self.run_cli('search', '!!!'), '')
        self.write([self.turn('user', 'boundary elsewhere', 'two', self.home / 'project-other')], 'a')
        self.assertNotIn('elsewhere', self.run_cli('search', 'boundary', '--here'))
        self.assertIn('elsewhere', self.run_cli('search', 'boundary'))

    def test_git_root(self):
        subprocess.run(['git', 'init', '-q', str(self.project)], check=True)
        nested = self.project / 'nested'
        nested.mkdir()
        self.assertIn('boundary', self.run_cli('search', 'boundary', '--here', cwd=nested))
        self.run_cli('decide', 'At root', cwd=nested)
        self.assertTrue((self.project / 'DECISIONS.md').exists())

    def test_context_order_tail_truncation_and_empty(self):
        self.assertEqual(self.run_cli('context'), '')
        self.assertFalse((self.home / 'state').exists())
        self.run_cli('init')
        for i in range(7):
            self.run_cli('decide', 'decision {}'.format(i))
            self.run_cli('checkin', 'checkin {}'.format(i))
        self.run_cli('index')
        before = self.db().execute('SELECT value FROM meta').fetchone()
        output = self.run_cli('context')
        self.assertLess(output.index('# Project'), output.index('# Decisions'))
        self.assertLess(output.index('# Decisions'), output.index('# Checkins'))
        self.assertLess(output.index('# Checkins'), output.index('Past sessions'))
        self.assertNotIn('decision 1', output)
        self.assertIn('decision 2', output)
        self.assertNotIn('checkin 3', output)
        self.assertIn('checkin 4', output)
        self.assertEqual(self.run_cli('context', '--max-chars', '47'), output[:47])
        self.assertEqual(self.db().execute('SELECT value FROM meta').fetchone(), before)
        empty = self.home / 'empty'
        empty.mkdir()
        self.assertEqual(self.run_cli('context', '--cwd', str(empty)), '')
        (self.home / 'state/index.db').write_bytes(b'broken database')
        self.assertNotIn('Traceback', self.run_cli('context'))

    def test_log_formats_and_init(self):
        self.run_cli('decide', 'Use A', '--why', 'Measured')
        self.run_cli('decide', 'Use B')
        today = datetime.date.today().isoformat()
        self.assertEqual((self.project / 'DECISIONS.md').read_text(), '# Decisions\n\nDate: ' + today + '\nDecision: Use A\nReason: Measured\n\nDate: ' + today + '\nDecision: Use B\n')
        self.run_cli('checkin', 'Next test', '--kind', 'plan')
        self.assertRegex((self.project / 'CHECKINS.md').read_text(), r'^# Checkins\n\n## \d{4}-\d{2}-\d{2} \d{2}:\d{2} \(plan\)\nNext test\n$')
        self.run_cli('init')
        path = self.project / 'PROJECT.md'
        self.assertEqual(path.read_text(), (KIT / 'templates/PROJECT.md').read_text())
        path.write_text('Keep me')
        self.run_cli('init')
        self.assertEqual(path.read_text(), 'Keep me')

    def test_codex_and_unknown(self):
        self.write([{'type': 'unknown', 'payload': {'nothing': 'noise'}},
                    {'type': 'session_meta', 'payload': {'id': 'codex-one', 'cwd': str(self.project)}},
                    {'type': 'response_item', 'timestamp': '2026-10-17', 'payload': {'role': 'user', 'content': [{'type': 'input_text', 'text': 'Codex question'}]}}])
        self.run_cli('index')
        self.write([{'type': 'response_item', 'payload': {'role': 'assistant', 'content': [{'type': 'output_text', 'text': 'Codex answer'}]}}], 'a')
        output = self.run_cli('search', 'Codex')
        self.assertIn('[Codex] answer', output)
        self.assertNotIn('claude --resume', output)
        self.assertEqual(self.db().execute('SELECT session_id, source FROM threads').fetchall(), [('codex-one', 'codex')])

    def test_like_fallback(self):
        self.run_cli('index')
        db = self.db()
        db.execute('DROP TABLE turns_fts')
        db.commit()
        module = runpy.run_path(str(CLI))
        real_connect = module['connect']
        def without_fts():
            conn = real_connect()
            conn.execute('DROP TABLE IF EXISTS turns_fts')
            return conn
        module['search'].__globals__['connect'] = without_fts
        args = type('Args', (), dict(query='"boundary conditions"', here=False, since=None, role=None, limit=10))()
        with mock.patch.dict(os.environ, self.env), contextlib.redirect_stdout(io.StringIO()) as out:
            module['search'](args)
        self.assertIn('[boundary conditions]', out.getvalue())

    def test_all_redaction_patterns(self):
        redact = runpy.run_path(str(CLI))['redact']
        secrets = ['ghp_' + 'a' * 20, 'github_pat_' + 'b' * 20, 'gho_' + 'c' * 20,
                   'wandb_v1_' + 'd' * 20, 'sk-proj-' + 'e' * 30, 'AKIA' + 'A' * 16,
                   '-----BEGIN RSA PRIVATE KEY-----\nprivate\n-----END RSA PRIVATE KEY-----',
                   'PASSWORD="with spaces"', 'MY_SECRET=short', 'KEY=x']
        for secret in secrets:
            self.assertIn('[REDACTED]', redact(secret))
            self.assertNotEqual(secret, redact(secret))

    def test_install_idempotent_and_backup(self):
        settings = self.home / '.claude/settings.json'
        settings.parent.mkdir()
        original = {'permissions': {'allow': ['Read']}, 'hooks': {'SessionStart': [{'hooks': [{'type': 'command', 'command': 'echo existing'}]}]}}
        settings.write_text(json.dumps(original))
        for _ in range(2):
            result = subprocess.run(['bash', str(KIT / 'install.sh'), '--apply-hook'], env=self.env, cwd=self.project, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
        data = json.loads(settings.read_text())
        self.assertEqual(data['permissions'], original['permissions'])
        commands = [h['command'] for item in data['hooks']['SessionStart'] for h in item['hooks']]
        self.assertEqual(commands, ['echo existing', 'rmem context'])
        backups = sorted(settings.parent.glob('settings.json.bak-*'))
        self.assertEqual(len(backups), 2)
        self.assertEqual(json.loads(backups[0].read_text()), original)
        self.assertTrue(os.access(self.home / '.local/bin/rmem', os.X_OK))
        subprocess.run(['bash', str(KIT / 'install.sh'), '--apply-hook', '--project'], env=self.env, cwd=self.project, check=True, capture_output=True)
        self.assertTrue((self.project / '.claude/settings.json').exists())
        self.assertEqual(json.loads(settings.read_text()), data)

    def test_context_fast_and_stats(self):
        self.run_cli('index')
        start = time.monotonic()
        self.run_cli('context')
        self.assertLess(time.monotonic() - start, 0.3)
        output = self.run_cli('stats')
        self.assertIn('Sessions: 1', output)
        self.assertIn('Turns: 3', output)
        self.assertIn('Sources: 1', output)


if __name__ == '__main__':
    unittest.main()
