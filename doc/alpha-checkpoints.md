# AI-Workflow — alpha checkpoint storage procedure

**Status:** experimental minimal implementation agreement for `ai-work-state/dev`. Not the final general-purpose persistence schema; not an automatic daemon or a native ChatGPT feature.

## Records and ownership

1. `conversations/<chat-id>/branch-N.yaml`: branch `created_at`, latest confirmed assistant-response `message_id`, current `tasks` associations, and optional *verified* `parent_branch` / `fork_message` metadata. The path already identifies chat and branch. `tasks: []` means confirmed empty, `tasks: null` means unrecoverable.
2. `requests/<chat-id>/N-<six-digit-message>.yaml`: checkpoint record with actually available `request_ref` / `request_refs`, `tasks_added`, `tasks_removed` and event references. Do not invent host-native message IDs. A checkpoint path is unique and immutable; it serves as an idempotency key.
3. `tasks/<task-id>/baseline-vNNN.md`: immutable history of approved goal/scope; create a later revision only on explicit authorization.
4. `task-state.md`: current active workflow, phase/episode, progress, explicit accepted decisions and relevant evidence validity. Task state must never be inferred from mere task association.
5. `task-log.md`: append-only meaningful events with evidence references, including approvals, progress, obstacles, audit and invalidations. Never rewrite an old event to obscure history.
6. `handoff.md`: exact verified restart point and next *authorized* action. Update in the same logical transaction with the above; do not claim a later result than the records support.

All files are per-task/per-conversation. No global `tasks.yaml` registry or secondary log is introduced in this alpha. An explicit task identifier can be used for recovery; discovery from arbitrary similarity is not guaranteed.

## Git checkpoint algorithm

Use a single Git tree and commit for **EVERY assistant-response checkpoint** (even when no task changed), provided the host exposes authorized writable GitHub tools. Task documents remain conditional; the request record and conversation-branch checkpoint are unconditional:

1. Read the current `dev` Git ref `H`, the tree at `H`, and all relevant task/branch records; verify the incoming source marker and approval boundaries.
2. Compute the next checkpoint and request delta. For example, source `branch-0/1` and persisted `branch-0/1` implies next `branch-0/2`. If `source < persisted`, reconstruct task associations **at source** from immutable request deltas; reserve the next branch number without overwriting another branch. If `source > persisted` or a pending write is unresolved, investigate; do not blindly fork.
3. Create a tree based on the exact original tree at `H` with all affected records: any newly approved baseline, task state/log/handoff, one request delta and the updated branch checkpoint. Check for pre-existing immutable checkpoint paths before writing.
4. Create a commit with parent `H`, then update `refs/heads/dev` using a **compare-and-swap expected head** `H`, without force. If another writer wins, reload, reconcile and retry only if safe; no blind write or force push.
5. Verify the new `dev` head and read back the checkpoint, request record, and affected task documents. Only then claim persistence confirmed. On uncertain writes, reread; disclose pending if verification fails.

A Git tree/commit alone is not a durable update until the branch ref points to it. Separate file writes are not one atomic checkpoint. Do not use a marker as evidence of a Git write. Branch IDs and UUIDs must be generated from actual capabilities for live use; the UUID-looking values under `tests/fixtures/` are **explicitly artificial**.

## Reconstruction example

At checkpoint `0/1`, tasks might be `[]`; at `0/2` a task `fixture-a` may be associated. A fork from source `0/1` must retain `[]`, not the current `0/2` task list. The branch inherits the source checkpoint number and increments on its next response. `message-id` values have meaning relative to the branch ancestry and real response markers, not repository commit count.

## What this does not guarantee

Git CAS protects against lost updates **only when the conditional tool/action enforces its expected-head precondition correctly**. Test and record this property; do not assume it from an API label. Actual ChatGPT host still needs available connectors, an unambiguous identity and a configured experimental bootstrap. No background task, automatic chat ID or tool execution is created by these Markdown files.

When a connection error occurs after a commit, perform read-back and compare records before concluding that the write failed or succeeded. Never present synthetic fixtures as user messages.

## v0.2.2 per-response checkpoint correction

- Every response requires a new `requests/<chat-id>/N-<six-digit-message>.yaml` record and a branch-head update on `conversations/<chat-id>/branch-N.yaml`, including a reply with no task changes.
- Task event files, baselines and handoffs are **not** needlessly rewritten when only the conversation counter advances.
- `source_checkpoint`, `request_refs: null` (when unavailable), empty `tasks_added`/`tasks_removed`, `event_refs`, and `checkpoint_integrity` make unchanged responses explicit.
- For older unrecoverable `sync = pending` markers, carry `sync_gaps: [[start,end]]` and `synchronization: incomplete` in the branch. Do not manufacture old request records.
- Only an actual conditional Git ref update **plus file read-back** is evidence of persistence. `persisted_with_gaps` means the new checkpoint exists but the marker remains `sync = pending`.
- If writable GitHub actions are absent in the host, report `storage_unavailable`. If they were available but not invoked, report `write_not_attempted`, not "no task changed".
- The separately maintained protocol at `ai-workflow/state/protocol.md` and its connector runbook define the active operational method. Repository files alone do not intercept ChatGPT responses.
