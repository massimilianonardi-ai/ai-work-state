# AI-Workflow — Current operational handoff

**Updated:** 23 November 2026  
**Purpose:** resume the validation and maintenance of the AI-Workflow project from verified GitHub state.

## Active sources and storage

- Framework instructions: [ai-workflow/bootstrap.md](https://github.com/massimilianonardi-ai/ai-workflow/blob/main/bootstrap.md), branch `main`; read and apply the complete bootstrap on every request.
- Mutable state: `massimilianonardi-ai/ai-work-state`, branch `main`.
- Time zone: `Europe/Rome`; public state repository, so durable records must contain only information appropriate for public disclosure.
- Implement through the assistant and actually available, authorized GitHub capabilities; publish changes in conditional commits and verify ref/files after writing.

## Current conversation-state contract

```text
conversations/<chat-id>/
  branch-0.yaml
  branch-N.yaml
  events/       # meaningful state transitions, on demand
  snapshots/    # context necessary to resume work, on demand

tasks/<task-id>/
  baseline-vNNN.md
  task-state.md
  task-log.md
  handoff.md
  ...
```

The `branch-N.yaml` semantics remain unchanged. Every assistant response attempts a verified advancement of the current branch checkpoint, including ordinary replies with no task changes. Events are written for meaningful state changes; snapshots capture necessary continuation context. Task records change only when a durable task undergoes an actual authorized modification. Preserve the actual branch lineage and distinguish `tasks: []` from `tasks: null`.

## Validation status

| Area | Current status | Evidence |
| --- | --- | --- |
| P1–P3 conversation continuity, branching and elementary task persistence | Previously validated in their dated scenarios; broader regressions still matter | [P1–P3 test log](ai-workflow-validation-p1-p3-2026-11-18.md) |
| P4 concurrency, P5 failure/recovery, P6 task integrity | **Suspended by user decision** | Historical handoffs and task evidence |
| P7.1 universal finalization | **PARTIAL**; initial-chat compliance remains to be retested | [P7 test log](ai-workflow-p7-validation-2026-11-18.md) |
| P7.2 command and routing checks | **PARTIAL** | [P7 test log](ai-workflow-p7-validation-2026-11-18.md) |
| P7.3–P7.5 | Not started | [P7 test log](ai-workflow-p7-validation-2026-11-18.md) |

A new-chat two-message check on 23 November demonstrated verified persistence and continuation, but inconsistent first-response behavior. A subsequent documentation cleanup now defines only the current operating model. Its correctness must be checked with a fresh conversation; documentation publication alone is not an end-to-end test.

## Next authorized validation

1. Start a **new conversation** in the AI-Workflow project with an ordinary question; verify the first Git commit contains exactly that chat's `branch-0.yaml` unless a genuine event/snapshot was needed.
2. Continue the same chat with a second ordinary message; verify the same identity, `message_id: 2` and no unrelated state changes.
3. Separately exercise an explicit, meaningful state transition and confirm its `events/` entry; create a `snapshots/` record only when there is genuine resume context to preserve.
4. Test branch continuation and fork recovery using known source checkpoints and compare real Git history. Keep P4–P6 suspended until explicitly resumed.

Dated test reports are evidence logs. The current bootstrap and conditional protocol documents define runtime behavior.

## Persistent task used in earlier validation

`task:aw-test-persistence-20261118-01` remains a historical test task in `refining` state, with `parent: null` and no dependencies. Its baseline and task records are preserved; this documentation pass makes no change to that task.
