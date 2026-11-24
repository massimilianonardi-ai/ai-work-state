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

# Task specification — TextEdit app & service
Status: previously approved product scope and source implementation; installed library contract pending separately.
Baseline: [baseline-v001.md](baseline-v001.md). Source: source conversation 2026-11-23_13-03_dbc9f717-cee0-45bb-86e4-f9bfe8316ce4, branch 0, checkpoints 10–15; registration at checkpoint 16.

## Outcome and use cases
| ID | Usage | Observable acceptance |
| --- | --- | --- |
| UC-01 | Developer builds/tests engine and GUI; runs web host with mk | Actual JSC output and Chromium edits/selection/undo using sibling projects; mk build/test/run observed |
| UC-02 | Operator installs initial released library packages and service | Installed command serves actual version-selected library assets with no source checkout or mk/jsc |
| UC-03 | Developer edits a simple visible source string in one library | Local rebuilt app changes; initial installed app remains unchanged; explicit release upgrade may change it |
| UC-04 | Developer/operator runs Electron in development and installed mode | Same GUI and engine, real editor behavior; no duplicate engine/GUI |
| UC-05 | Both apps additionally use general m-js-core | Actual direct use, version/dependency resolution of local and installed libraries; no m/text in core |

## Architecture and constraints
See baseline and product [architecture](https://github.com/massimilianonardi-ai/m-textedit-web/blob/3d7ddfd4ae5503e026a4d430caed60cf151de81b/docs/architecture.md), [execution plan](https://github.com/massimilianonardi-ai/m-textedit-web/blob/3d7ddfd4ae5503e026a4d430caed60cf151de81b/docs/execution-plan.md). Existing PoC behavior is starting point, not an approved final persistence/UI feature list. Initial web implementation is loopback-only, no remote filesystem or document persistence. Electron host integration details remain to be designed within accepted ownership. Do not expose Node indiscriminately in renderer. No new infrastructure contract chosen here: see task:m-os-context-js-libs. 
## Approval
Prior operator decisions and go-ahead authorize accepted TextEdit scope; detailed new system library resolution contract is not approved. No new product changes in registration turn.
## Observed result
- [m-js-textedit](https://github.com/massimilianonardi-ai/m-js-textedit/tree/c84c806332e9180e6546e43e987c7e033da45304): 17 engine source files extracted unchanged, JSC manifest and mk build/test.
- [m-js-textedit-gui](https://github.com/massimilianonardi-ai/m-js-textedit-gui/tree/e473d84b13e08108ce95267d5ea562c930bc450b): canonical PoC 066 GUI under m/text/ui, mk build/test.
- [m-textedit-web](https://github.com/massimilianonardi-ai/m-textedit-web/tree/3d7ddfd4ae5503e026a4d430caed60cf151de81b): Node HTTP host, mk build/run/test, source integration workflow.
- [m-js-core](https://github.com/massimilianonardi-ai/m-js-core/tree/b09977600954ecd174b2a63a65ab0ee8b602898b): removed m/text and corresponding descriptor branch.
- m-textedit-desktop: created by operator, implementation deferred to Step 2.
Preliminary JSC rendering/runtime checks with virtual filesystem and V8 passed per checkpoint 14; historical HTTP synthetic-fixture pass recorded there. Real managed mk and Chromium workflow, released pkgs and installed A/B tests not verified. Electron and Step 3 not implemented.
