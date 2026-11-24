---
id: "task:textedit-app-service"
status: blocked
scope: "TextEdit product / JavaScript libraries, web and Electron applications"
subject: "TextEdit app & service"
parent: null
depends_on:
  - "task:m-os-context-js-libs"
active_plan: plans/plan-001.yaml
phase: implementation
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

# Task state — TextEdit app & service
Registered 2026-11-24T13:15:53+01:00. Source work already exists; task created now, not retroactively at previous turns.

## Current objective
Deliver standalone engine, GUI, web service and Electron app, using TextEdit as real development-to-production acceptance for m-os.

## Accepted decisions
- Final ownership: m-js-core has no m/text; m-js-textedit owns logical engine; m-js-textedit-gui owns m/text/ui. User checkpoint 13.
- Same engine/GUI consumed by both applications; staged web, Electron, then direct general m-js-core use. User checkpoints 10–13.
- Real mk build/test/run and release/pkg installed use; local minimal change vs immutable release. User checkpoint 11.
- Proceed with created repos: user checkpoint 14.

## Actual status
- [m-js-textedit](https://github.com/massimilianonardi-ai/m-js-textedit/tree/c84c806332e9180e6546e43e987c7e033da45304): 17 engine source files extracted unchanged, JSC manifest and mk build/test.
- [m-js-textedit-gui](https://github.com/massimilianonardi-ai/m-js-textedit-gui/tree/e473d84b13e08108ce95267d5ea562c930bc450b): canonical PoC 066 GUI under m/text/ui, mk build/test.
- [m-textedit-web](https://github.com/massimilianonardi-ai/m-textedit-web/tree/3d7ddfd4ae5503e026a4d430caed60cf151de81b): Node HTTP host, mk build/run/test, source integration workflow.
- [m-js-core](https://github.com/massimilianonardi-ai/m-js-core/tree/b09977600954ecd174b2a63a65ab0ee8b602898b): removed m/text and corresponding descriptor branch.
- m-textedit-desktop: created by operator, implementation deferred to Step 2.
Source extraction and preliminary checks complete, not whole Step 1. Installed library selection contract is unresolved; task blocked for release acceptance, while independent existing source validation may still be performed under prior scope. No TextEdit release or clean installed acceptance verified. Task dependency task:m-os-context-js-libs gates installed acceptance; it is a separate general infrastructure task, not a child. No new product writes this turn.

Baseline [v001](baseline-v001.md); [specification](task-specification.md); active plan plans/plan-001.yaml; latest event EV-0003.
