# AI-Workflow — alpha state store (`dev`)

**EXPERIMENTAL: branch `dev` only.** This repository stores mutable state for the independent AI-Workflow project. Rules are defined in [ai-workflow/dev](https://github.com/massimilianonardi-ai/ai-workflow/tree/dev), not in these data files.

The repository's `main` contains **only the one-time initialization README**. All experiments and future state records belong on `dev` and must be authorized and verified.

## Live logical layout (created only as needed)

```text
conversations/<chat-id>/branch-N.yaml
requests/<chat-id>/N-000001.yaml
tasks/<task-id>/
  baseline-v001.md
  task-state.md
  task-log.md
  handoff.md
  task-specification.md    # only for design/development tasks
```

No real conversation IDs or task records have been initialized by this branch setup. **Do not treat tests/fixtures as live state**; they contain invented synthetic identifiers for tests only.

- `conversations/`: branch checkpoint and task associations, not a transcript.
- `requests/`: immutable checkpoint deltas used to reconstruct associations at an earlier fork point.
- `tasks/`: immutable authorized baseline revisions, current truth, append-only event history and restart handoff.
- `tests/fixtures/`: explicitly synthetic data for repository-write verification, isolated from live paths.

Follow [doc/alpha-checkpoints.md](doc/alpha-checkpoints.md) and the approved identity contract in [ai-workflow/dev/doc/conversation-identity.md](https://github.com/massimilianonardi-ai/ai-workflow/blob/dev/doc/conversation-identity.md).

**Safety boundaries:** do not infer chat identity from example data, do not write to `main`, and do not claim persistence without read-back. A successful repository write alone does not activate ChatGPT Project instructions or enforce automatic cross-chat tracking.
