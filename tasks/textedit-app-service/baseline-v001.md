---
id: "task:textedit-app-service"
status: blocked
scope: "TextEdit product / JavaScript libraries, web and Electron applications"
subject: "TextEdit app & service"
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

# Baseline v001 — TextEdit app & service
Registered 2026-11-24T13:15:53+01:00; retrospective first task baseline, not a new approval of all implementation details. Sources: source conversation 2026-11-23_13-03_dbc9f717-cee0-45bb-86e4-f9bfe8316ce4, branch 0, checkpoints 10–15; registration at checkpoint 16.

## Approved outcome and boundaries
One editor reused by a web service/browser and an Electron application. m-js-textedit owns existing m/text logical engine, excluding GUI; m-js-textedit-gui owns PoC GUI under m/text/ui; m-js-core must contain no TextEdit references. Forward-only extraction; no permanent duplicated implementation or fallback. Distinct application repos/packages. Step 1: standalone libraries and web host; mk build/test/run; initial release and genuine installed-library consumption, local source change vs unchanged installed release. Step 2: Electron reuses both libraries, same development and installed tests. Step 3: introduce direct general m-js-core usage in both applications, verify combinations of local and installed dependencies. Explicit library update and clean installed-only acceptance were assistant recommendations consistent with the agreed goal, not independently approved detailed contracts.
Operator approved ownership at checkpoint 13 and authorized proceeding at checkpoint 14. New infrastructure architecture still unresolved; no blanket permission to modify pkg/context.
