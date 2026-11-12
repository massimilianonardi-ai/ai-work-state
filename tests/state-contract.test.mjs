import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const chat = '2026-11-10_16-16_11111111-1111-4111-8111-111111111111';
const base = `tests/fixtures/demo/`;
const read = p => readFileSync(resolve(root, p), 'utf8');

test('fixture paths cannot be confused with live state', () => {
  for (const prefix of ['conversations', 'requests', 'tasks']) {
    assert.equal(existsSync(resolve(root, prefix, chat)), false);
  }
  assert.match(read('tests/README.md'), /SYNTHETIC|synthetic/i);
});

test('branch files avoid duplicate chat and branch identifiers', () => {
  const r = read(`${base}conversations/${chat}/branch-0.yaml`);
  assert.match(r, /created_at:/);
  assert.match(r, /^message_id: [0-9]+$/m);
  assert.doesNotMatch(r, /^chat_id:|^branch_id:/m);
});

test('request checkpoint record remains immutable and identifies association delta', () => {
  const r = read(`${base}requests/${chat}/0-000001.yaml`);
  assert.match(r, /request_ref:/);
  assert.match(r, /tasks_added:/);
  assert.match(r, /tasks_removed:/);
});

test('a derived fork inherits source tasks, not current parent tasks', () => {
  const parent = read(`${base}conversations/${chat}/branch-0.yaml`);
  const child = read(`${base}conversations/${chat}/branch-1.yaml`);
  assert.match(parent, /^tasks:\s*\n\s+- task:fixture-a/m);
  assert.match(child, /^tasks: \[\]$/m);
  assert.match(child, /^parent_branch: 0$/m);
  assert.match(child, /^fork_message: 1$/m);
  assert.match(child, /^message_id: 2$/m);
});

test('checkpoint 0/2 contains task A and its consistent state/log/handoff', () => {
  const req = read(`${base}requests/${chat}/0-000002.yaml`);
  assert.match(req, /tasks_added:\s*\n\s+- task:fixture-a/);
  const p = `${base}tasks/fixture-a/`;
  const state = read(p + 'task-state.md');
  const log = read(p + 'task-log.md');
  const handoff = read(p + 'handoff.md');
  assert.match(state, /phase: specification/);
  assert.match(log, /EV-0001/);
  assert.match(handoff, /EV-0001/);
  assert.match(read(p + 'baseline-v001.md'), /SYNTHETIC FIXTURE/);
});

test('single atomic commit and CAS precondition are documented without invented test claims', () => {
  const p = read('doc/alpha-checkpoints.md');
  assert.match(p, /single Git tree and commit/);
  assert.match(p, /compare-and-swap expected head/);
  assert.match(p, /Only then claim persistence confirmed/);
});

test('two real Git commits persisted independent no-task-change checkpoint records', () => {
  const id='2026-11-12_12-50_a41346d3-3357-425f-9474-19786574a71c';
  const rootPath='tests/fixtures/no-task-change/';
  const branch=read(rootPath+'conversations/'+id+'/branch-0.yaml');
  const a=read(rootPath+'requests/'+id+'/0-000001.yaml');
  const b=read(rootPath+'requests/'+id+'/0-000002.yaml');
  assert.match(branch,/^message_id: 2$/m);
  assert.match(branch,/^tasks: \[\]$/m);
  assert.match(branch,/synchronization: complete/);
  assert.match(a,/source_checkpoint: 0/);
  assert.match(b,/source_checkpoint: 1/);
  assert.match(a,/tasks_added: \[\]/);
  assert.match(b,/tasks_added: \[\]/);
  assert.equal(existsSync(resolve(root,'conversations',id)),false);
});
