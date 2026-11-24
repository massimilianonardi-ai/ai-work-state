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
Latest EV-0003. Baseline v002 records partial approval; specification contains findings and use cases. Phase specification, refining.
## Approved decisions — checkpoint 2 (2026-11-24)
- pkg v2 declarative export namespace: `link/lib/js`.
- Context canonical JS_PATH and equality NODE_PATH = JS_PATH; investigate integration, not approval of all loader/projection choices.
- Browser support is a primary use case. Preserve existing task scope and no substantive implementation until consequential synthesis is approved.

## Investigation / proposal (not approved implementation)
- Ordered colon-separated absolute search roots; context owns selection and lifecycle, including reactivation, deactivation, host state, envelope and readonly preflight. Host merge/conflict policy unresolved.
- m-os@359469c59633f90c5f81e7825712544a15467c37: pkg-integration.lib.sh lines 310–437 validates only sh/java and readable regular files; v2 descriptors are text paths and materialized symlinks. JS file or package-directory export and containment/entrypoint rules need explicit design. context.lib.sh lines 1460–1525 iterates selected concrete bin/sh/java; JS analogous but no Java wildcard. No source edits.
- Node 22.16.0 local isolated probe: CJS loads package through NODE_PATH, ESM fails with NODE_PATH alone; symlink node_modules enables ESM; nearer node_modules wins over NODE_PATH. Transitive ESM realpath dependencies remain to test; no production acceptance.
- Browser: JS_PATH is server-side only. Propose selected export registry mapped to stable public URL /js/<name>/<asset>; serve classic jsc outputs unchanged or use native import maps for browser ESM. Only explicit browser-public artifacts; protect containment, collisions, traversal, MIME, caching and authorization. No browser exposure of environment/local paths/private assets. Static deploy may generate projection/import map; Electron renderer uses same URLs/import map via local secure protocol or HTTP host, main uses Node; sandbox retained.
- Source/local override versus installed: same logical name and URL, context selects concrete root; no per-file fallback across versions. Project-specific node_modules projection optional; npm collision/precedence and transitive dependencies need tests. Exact browser entry metadata and URL implementation are proposals.
- References: https://nodejs.org/api/modules.html ; https://nodejs.org/api/esm.html ; https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap ; https://www.electronjs.org/docs/latest/tutorial/esm .

## Next step
Refine export shape/entry metadata and context lifecycle, test transitive ESM with multiple selected package roots and browser serving/import maps; inspect mk/JSC integration. Present one cohesive contract for approval. No product source changes.
