---
id: "task:m-os-context-js-libs"
status: refining
scope: "m-os / JavaScript library resolution and package integration"
subject: "m-os context js libs"
phase: specification
workflow_refs:
  - behavior/task-records.md
  - workflows/develop.md
  - behavior/specification.md
state_refs:
  - chat_id: "2026-11-23_13-03_dbc9f717-cee0-45bb-86e4-f9bfe8316ce4"
    branch_id: 0
    source_checkpoint: 15
    relation: "source conversation; task registration at checkpoint 16"
source:
  authority: "Operator's previously evidenced product decisions and current explicit task registration request; assistant delegated task partition"
  revision: "2026-11-24T13:15:53+01:00 / checkpoint 16"
---

# Handoff — m-os context js libs
Checkpoint 2026-11-24T13:15:53+01:00; latest EV-0002 in [task-log.md](task-log.md). State, draft baseline, specification and proposed plan registered together.
## Where work stopped
Native loader differences and existing pkg validation gap identified. No system contract selected; no code changes.
## Next authorized action
Read [task-specification.md](task-specification.md), inspect actual m-os context/pkg/mk/JSC code and official Node/Electron/browser resolution semantics. Compare native node_modules, explicit paths and contextual projections; use minimal representative tests and propose one coherent solution, with impact on existing users and package metadata. Present consequential synthesis before any substantive change. Do not assume PATH or NODE_PATH universally resolves JS. TextEdit task:textedit-app-service is acceptance consumer; no duplicate editor-specific system design.
