---
id: "task:m-os-context-js-libs"
status: refining
scope: "m-os / JavaScript library resolution and package integration"
subject: "m-os context js libs"
parent: null
depends_on: []
active_plan: plans/plan-001.yaml
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

# Task state — m-os context js libs
Registered 2026-11-24T13:15:53+01:00. Status refining, specification phase. Independent root prerequisite of task:textedit-app-service.

## Current objective
Resolve the general JS-library selection and loading contract for development and production under m-os, in Node.js, Electron and browser. Reuse existing runtime/native mechanisms where feasible and maintain compatibility with mk/jsc/pkg/context.

## Known facts and boundaries
- PATH is executable discovery, not native JS import resolution. NODE_PATH is CommonJS-only; browser uses URLs; Electron is Node + Chromium.
- m-os current v2 library export accepts sh/java only and rejects env-only library packages. Exact implementation refs and candidate alternatives in specification.
- TextEdit package acceptance is blocked until usable solution exists.
- User explicitly delegated whether to create separate task; creation is authorized, architecture changes not yet approved.
No code changes. link/lib/js and NODE_PATH = JS_PATH approved at checkpoint 2; node_modules projection, export shapes and browser adapter remain proposals.

Baseline [v002](baseline-v002.md); [specification](task-specification.md); proposed plan plans/plan-001.yaml; latest EV-0003.

## Approved decisions — checkpoint 2 (2026-11-24)
- pkg v2 declarative export namespace: `link/lib/js`.
- Context canonical JS_PATH and equality NODE_PATH = JS_PATH; investigate integration, not approval of all loader/projection choices.
- Browser support is a primary use case. Preserve existing task scope and no substantive implementation until consequential synthesis is approved.
