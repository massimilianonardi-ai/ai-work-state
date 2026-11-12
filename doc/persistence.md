# Active persistence policy — `ai-work-state/main`

**Current target:** `massimilianonardi-ai/ai-work-state`, Git branch **`main`**.
**Historical fixture branch:** `dev`. It is not a destination for new live checkpoints.

1. Recover an actual conversation identity from the current chat, never a quoted example from elsewhere.
2. Check available **writable** GitHub connector permissions, not just reading access.
3. For each assistant response, attempt to update `conversations/<chat-id>/branch-N.yaml` and add `requests/<chat-id>/N-<message-id-padded-to-6-digits>.yaml` on **main**, even with no changed task.
4. Add task baseline/state/log/handoff changes only when they are real, authorized and relevant.
5. Read the exact `refs/heads/main` head SHA `H` and current files; create a new tree based on `H`, a commit with parent `H`, and conditionally advance **main** with `expected_sha=H`, `force=false`. Do not silently fall back to `dev` when `main` cannot be written.
6. Read back `main` and all changed file contents; only then report `persisted`. If older checkpoints are not recoverable, record gaps explicitly and use `persisted_with_gaps` with `sync = pending`.
7. If the write fails, is unavailable, or is not attempted, report the correct outcome. Do not declare zero modifications a successful checkpoint.
8. Keep previous synthetic files on `dev` unchanged and avoid copying them to active `main`.

**Visibility:** the repository is currently **public**. Do not write confidential messages, task data, personal information, secrets or other sensitive metadata. A private repository is required before such data is used for persistence. The framework's current versioned guidance resides in `ai-workflow/state/protocol.md` and `ai-workflow/state/connector-runbook.md`.

**Host boundary:** publishing this policy does not enable a native ChatGPT write hook; the connected assistant needs to invoke authorized GitHub actions in its own conversation.
