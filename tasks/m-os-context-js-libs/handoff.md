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
Latest EV-0004; baseline v003; refining/specification. No implementation.

## Checkpoint 3 — revised direction
Operator prefers native node_modules and removing NODE_PATH if feasible. This conditionally supersedes the earlier NODE_PATH = JS_PATH requirement. Do not build a dual resolution mechanism. Retain link/lib/js; JS_PATH retained provisionally for runtime-neutral discovery/browser pending necessity assessment. No approval yet of detailed projection lifecycle or dependency layout.

## Practical investigation
- m-mk@9475f8a1785772532becd4f877f243c26ab1a2a6 docs/context-integration/{flows,interfaces}.md and examples/local-jsc/app/mk.json show existing dependency builds and context-run re-entry; no node_modules projection yet evidenced.
- Proposed: mk prepares app-specific generated symlinks after local dependency builds before relevant actions; installed launch prepares or uses context-specific projection independently of mk. Do not mutate shared installed immutable package roots at runtime, overwrite npm entries, or share a mutable view across incompatible concurrent contexts. Exact owner/location TBD.
- Executed isolated Node v22.16.0 ESM probe with NODE_PATH unset: app/node_modules/a and b symlink to separate real package roots; a imports b. Default fails ERR_MODULE_NOT_FOUND; --preserve-symlinks succeeds; a real package root with its own node_modules/b symlink also succeeds. Per-package links would need an appropriate immutable/install-time or isolated graph, not shared mutable roots. Flag has native-addon/module identity caveats; validate Electron and main-entry behavior. https://nodejs.org/download/release/v22.18.0/docs/api/cli.html ; https://nodejs.org/api/modules.html .
- Browser still needs public URL projection/import map; reuse same selected graph, not expose entire node_modules. Determine whether JS_PATH adds value once graph available. No product code changed.

Next: evaluate projection topology and lifecycle for local and installed contexts, native CommonJS/ESM and Electron, npm collisions, browser public assets and necessity of JS_PATH; consolidate before code changes.
