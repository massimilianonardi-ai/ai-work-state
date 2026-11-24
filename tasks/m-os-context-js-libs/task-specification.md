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

# Task specification — m-os context js libs
Status: refining; [baseline-v003.md](baseline-v003.md) captures partial approval, not authorization for all system changes.

## Objective
A general, simple and robust method for selecting versioned JavaScript libraries from source builds and installed packages, making them available to Node.js, browser and Electron consumers without forcing application source changes for development vs production.

## Verified starting point
m-os@359469c59633f90c5f81e7825712544a15467c37: pkg v2 library validation accepts sh/java only; env-only facility package is insufficient under current validator. m-mk@9475f8a1785772532becd4f877f243c26ab1a2a6 coordinates project builds and context activation; JSC emits classic browser script and CommonJS bundles. Source documentation: [installed-library-boundary](https://github.com/massimilianonardi-ai/m-textedit-web/blob/3d7ddfd4ae5503e026a4d430caed60cf151de81b/docs/installed-library-boundary.md). link/lib/js is approved; facility-env asset roots remain hypotheses.

## Use cases and verification
| ID | Usage | Acceptance |
| --- | --- | --- |
| UC-01 | Local consumer selects local built lib | mk dependencies/build/context select actual intended source artifact, no publish/install |
| UC-02 | Installed consumer selects library | pkg installs correct compatible concrete, runtime finds it without sources/build tools |
| UC-03 | Node CommonJS/ESM consumers | Verify native resolution choices and documented constraints with actual execution |
| UC-04 | Browser and Electron consumers | Same selected assets delivered using URLs; main/renderer separation; no unsafe Node renderer access |
| UC-05 | Coexisting versions and local edits | Explicit selection, compatibility/fail-closed errors, local changes not changing installed releases |
| UC-06 | Existing m-os users | No regressions in shell/Java libraries, PATH/CLASSPATH, existing pkg/context and mk contracts |

## Open architecture decisions
- Model of JS artifacts and exports (classic script, CommonJS, ESM; package shape).
- Existing native resolution via node_modules vs explicit m-os-selected paths; whether/where a JS path projection is needed.
- Separation of library version selection, Node loader integration and URL asset serving; context local override and installed dependency rules.
- Whether minimal pkg changes can reuse existing typed export or facility contracts; scope, migration, security, impact and tests.
Investigate existing code and official runtime behavior. Present alternatives and one complete grounded recommendation before substantive changes. JS_PATH and NODE_PATH equality approved; no new loader or full implementation approved.

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

## Checkpoint 3 — revised direction
Operator prefers native node_modules and removing NODE_PATH if feasible. This conditionally supersedes the earlier NODE_PATH = JS_PATH requirement. Do not build a dual resolution mechanism. Retain link/lib/js; JS_PATH retained provisionally for runtime-neutral discovery/browser pending necessity assessment. No approval yet of detailed projection lifecycle or dependency layout.

## Practical investigation
- m-mk@9475f8a1785772532becd4f877f243c26ab1a2a6 docs/context-integration/{flows,interfaces}.md and examples/local-jsc/app/mk.json show existing dependency builds and context-run re-entry; no node_modules projection yet evidenced.
- Proposed: mk prepares app-specific generated symlinks after local dependency builds before relevant actions; installed launch prepares or uses context-specific projection independently of mk. Do not mutate shared installed immutable package roots at runtime, overwrite npm entries, or share a mutable view across incompatible concurrent contexts. Exact owner/location TBD.
- Executed isolated Node v22.16.0 ESM probe with NODE_PATH unset: app/node_modules/a and b symlink to separate real package roots; a imports b. Default fails ERR_MODULE_NOT_FOUND; --preserve-symlinks succeeds; a real package root with its own node_modules/b symlink also succeeds. Per-package links would need an appropriate immutable/install-time or isolated graph, not shared mutable roots. Flag has native-addon/module identity caveats; validate Electron and main-entry behavior. https://nodejs.org/download/release/v22.18.0/docs/api/cli.html ; https://nodejs.org/api/modules.html .
- Browser still needs public URL projection/import map; reuse same selected graph, not expose entire node_modules. Determine whether JS_PATH adds value once graph available. No product code changed.
