# AI-Workflow state store — active branch `main`

This repository holds mutable state for AI-Workflow. All authorized live conversation and task-state updates go to `main`; `dev` contains historical test fixtures.

## Active paths

```text
conversations/<chat-id>/
  branch-0.yaml
  branch-1.yaml
  events/                   # created on demand for meaningful state changes
    0-000026.yaml
  snapshots/                # created when resume context is needed
    0-000026.yaml
tasks/<task-id>/
  baseline-v001.md
  task-state.md
  task-log.md
  handoff.md
```

The existing `branch-N.yaml` behavior is unchanged: it records the latest response checkpoint and effective task associations. Every assistant response attempts a conditional, verified update of its branch file, even if no task changes. Only meaningful state changes generate immutable files in `events/`; only genuine resume needs generate `snapshots/`. Empty Git directories are not created until they contain a real record.

See [persistence policy](doc/persistence.md) and the rules in [ai-workflow](https://github.com/massimilianonardi-ai/ai-workflow).

## Public repository privacy warning

This repository is currently PUBLIC. Do not store private conversation transcripts, credentials, confidential task information or personal details. Use a suitably protected store before preserving nonpublic context.
