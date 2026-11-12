# AI-Workflow state store — active branch `main`

This repository holds mutable state for AI-Workflow. **All new authorized conversation checkpoints and task-state records must be written on `main`.** Do not write active persistence to `dev`, which contains older synthetic fixtures and is retained only as test history.

## Branch contract

- **`main` — active persistence destination.** Use `refs/heads/main` and its exact expected commit SHA for conditional Git writes. Verify the new `main` ref and changed records before claiming persistence.
- **`dev` — historical test fixtures only.** Do not use it to store new live conversation/task records. There is no implicit synchronization from `dev` into `main`.
- The rules and checkpoint schema come from `massimilianonardi-ai/ai-workflow`, current release `v0.2.3`. The state repository does not itself run agents or execute the finalization automatically.

## Active paths (created as needed)

```text
conversations/<chat-id>/branch-N.yaml
requests/<chat-id>/N-000001.yaml
tasks/<task-id>/
  baseline-v001.md
  task-state.md
  task-log.md
  handoff.md
```

A response with no task changes still requires a conversation branch checkpoint **and** an immutable request record. Task files update only when the task genuinely changes. Do not create arbitrary historical records to fill `sync = pending` gaps. See [persistence policy](doc/persistence.md).

## Public repository privacy warning

**This repository is currently PUBLIC.** Any committed conversation ID, task association, event metadata or other stored content can be read publicly. Do **not** store private chat transcripts, secrets, personal data, access tokens or sensitive task details here. Before storing nonpublic user/workflow content, change this repository to private using the appropriate authorized GitHub settings; this commit does **not** change the repository's visibility.

No live chat checkpoint is created merely by publishing this README.
