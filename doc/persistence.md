# Active persistence policy — `ai-work-state/main`

**Active destination:** `massimilianonardi-ai/ai-work-state`, branch `main`.

1. Recover the genuine conversation identity from the current chat, not quoted markers from other chats.
2. Verify current writable GitHub permissions. A readable bootstrap is not a write capability.
3. **For each assistant response**, update `conversations/<chat-id>/branch-N.yaml` with the new `message_id` and evidenced task associations. Preserve the established behavior of branch files, including fork, recovery, `sync_gaps` and markers.
4. **Only when state materially changes**, create an immutable event inside `conversations/<chat-id>/events/`. Include the confirmed branch/checkpoint, change type and enough grounded detail to recover the transition. Do not write empty events for ordinary answers.
5. **When context is needed to resume work**, save a concise snapshot inside `conversations/<chat-id>/snapshots/`, scoped to the actual branch/checkpoint. Do not assume the complete transcript is accessible or copy private content into this public repository. Events and snapshots are stored in each chat's directory and created on demand.
6. Update task baseline, state, log, handoff, plans and derived indexes only for actual authorized changes. Include associated changed task files, event/snapshot if relevant and the branch checkpoint in the same Git tree/commit.
7. Read the exact `refs/heads/main` commit SHA `H`, create a tree preserving all other current files, commit with parent `H`, and update `main` conditionally with `expected_sha=H`, `force=false`. Reevaluate on concurrent changes, never silently overwrite.
8. Read back `main` and every changed file. Report `persisted` only for a verified checkpoint with no unresolved gaps. Otherwise distinguish `persisted_with_gaps`, `write_failed`, `storage_unavailable`, or `write_not_attempted` and retain `sync = pending` as appropriate.

**Privacy:** this repository remains public. Do not store confidential conversation content or sensitive metadata without an appropriate private destination.

**Operational rules:** `ai-workflow/bootstrap.md`, `state/protocol.md`, `doc/conversation-identity.md`, and `state/connector-runbook.md`.
