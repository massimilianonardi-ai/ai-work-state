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

# Baseline v003 — m-os context js libs
Registered 2026-11-24T13:15:53+01:00. Revision of v002: partially approved requirements, not a fully approved solution. General infrastructure objective: determine how versioned JavaScript libraries can be selected and exposed in development and installed m-os environments, for Node.js, browser and Electron. TextEdit is the first acceptance consumer, not the owner of infrastructure.
Known constraints: PATH resolves executables, not JS module imports; NODE_PATH is not a universal answer (CommonJS only); browser consumes URL assets, Electron splits main/preload/renderer. Preserve existing mk, jsc, pkg, context behavior, prefer existing contracts and targeted justified changes. No arbitrary global loaders, duplicate libraries or dummy commands as a packaging workaround. Actual system architecture/contract must be investigated and approved before dependent code changes. 

## Approved decisions — checkpoint 2 (2026-11-24)
- pkg v2 declarative export namespace: `link/lib/js`.
- Context canonical JS_PATH and equality NODE_PATH = JS_PATH; investigate integration, not approval of all loader/projection choices.
- Browser support is a primary use case. Preserve existing task scope and no substantive implementation until consequential synthesis is approved.

## Checkpoint 3 — revised direction
Operator prefers native node_modules and removing NODE_PATH if feasible. This conditionally supersedes the earlier NODE_PATH = JS_PATH requirement. Do not build a dual resolution mechanism. Retain link/lib/js; JS_PATH retained provisionally for runtime-neutral discovery/browser pending necessity assessment. No approval yet of detailed projection lifecycle or dependency layout.
