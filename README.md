# AI-Workflow state store — active branch `main`

This repository holds mutable state for AI-Workflow. All authorized live conversation and task-state updates go to `main`.

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

## Reference documents

- [Persistence policy](doc/persistence.md): current state layout and writing behavior.
- [Current operational handoff](doc/ai-workflow-handoff-2026-11-18.md): validated status and next tests.
- [AI-Workflow rules](https://github.com/massimilianonardi-ai/ai-workflow): authoritative bootstrap and conditional methods.
- [Active progressive design/develop model](doc/ai-workflow-progressive-design-execution.md) and [product documentation artifact catalog](doc/ai-workflow-artifact-catalog.md): approved design now implemented in ai-workflow/main; live behavior remains to be tested.
- [Activation and structural verification](doc/ai-workflow-progressive-activation-2026-11-23.md): rules commits and test status.
- [P1–P3 test evidence](doc/ai-workflow-validation-p1-p3-2026-11-18.md) and [P7 test evidence](doc/ai-workflow-p7-validation-2026-11-18.md): dated verification records, not operational instructions.

## Public repository privacy warning

This repository is currently PUBLIC. Do not store private conversation transcripts, credentials, confidential task information or personal details. Use a suitably protected store before preserving nonpublic context.
