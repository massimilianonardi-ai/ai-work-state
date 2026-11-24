---
id: "task:rsudo-deploy"
status: refining
scope: "m-rsudo / deployment orchestration"
subject: "Design and develop rsudo-deploy"
parent: null
depends_on: []
active_plan: plans/plan-001.yaml
phase: architecture
workflow_refs:
  - behavior/task-records.md
  - workflows/develop.md
  - behavior/specification.md
state_refs:
  - chat_id: "2026-11-23_14-39_0903b7f9-50af-4d5e-8fa3-48f3595d4b41"
    branch_id: 0
    relation: "source conversation and recovered task history"
    source_checkpoint: 14
source:
  authority: "operator's evidenced decisions through checkpoint 14; explicit task registration request at checkpoint 15"
  revision: "2026-11-24 / task registration at checkpoint 15"
---

# Task state — rsudo-deploy

**Registered:** 2026-11-24T10:30:39.015Z. **Status:** refining (functional scope defined; architecture L4–L8 underway). **Not completed or approved for further substantive implementation.** This task is newly registered after prior conversation work; there was no task association at checkpoints 1–14.

## Objective and accepted boundaries

Develop a POSIX-shell deployment orchestrator in existing m-rsudo. First operational scope: existing web gateway, identity and static hosting infrastructure, with authenticated/authorized applications. Future resource coverage (other services, databases, packages, networking) is incremental; not an obligation to implement everything in the first slice.

| Decision | Authority |
| --- | --- |
| One package/repo; standalone interactive menu and complete CLI, thin executable calling sourceable library; same shared operations. Native rsudo deploy is remote-only; local functions stay outside native module. | m6–m11, especially m10–11 |
| rsudo runtime/dispatcher/credential model, fs/db-pg/exec immutable; rsudo-admin only Deploy menu hook. Existing apisix/keycloak/keysix changes only via separate tasks and prior explicit consent. No retest/redesign of established credential internals. | m9–m11 |
| Desired project is editable and reviewable, structured directory of multiple JSON files; selected/full deployment applies approved scope; observe separately, detect drift and assess case by case; redeploy manual. | m3, m11 |
| Top-down delivery, initial application scenario and explicit separation of dependency tasks. | m11 |
| Preflight/diffs/blockers before hours-long work; explicit authorization for destructive work, precise logs and actual independent verification; no automatic remediation. | m11 |
| D01–D08 approved: first-scenario functional topology, source/identity/ownership scope, initial export of global and application configuration. Canonical detailed decisions in pinned product docs, not repeated as private infrastructure data here. | m13–m14 |

## Actual status and evidence

Product source revision 05d1b08791a3f85c47b619a2f1169edbe5953332; product documentation revision 27705b4ac4dedb1bc4f1ee2d178d9efa7c3ec57a, verified at m14. [Product index](https://github.com/massimilianonardi-ai/m-rsudo/tree/27705b4ac4dedb1bc4f1ee2d178d9efa7c3ec57a/doc/deploy). Initial interface wiring and synthetic CI passed at commit 3f80ce65ea282fe184b5dbda37d6c7946315e336 ([CI run](https://github.com/massimilianonardi-ai/m-rsudo/actions/runs/45345542189)). Current executable still forwards all args to native rsudo; superseded contract, NOT implemented full CLI. No JSON schema, resource operations, actual acquisition, live acceptance, or production changes. No new release. Existing docs distinguish approved vs proposed. Functional decisions complete for initial scenario; architecture proposals (resource-model, initial-acquisition) not approved implementation contracts.

## Relationships and readiness

Parent null; dependencies [] (no verified separate dependency tasks created); children index empty; active plan plans/plan-001.yaml is a proposed planning revision, not execution permission. Task status independent of any future children.
Specification: [task-specification.md](task-specification.md). Baseline: [baseline-v001.md](baseline-v001.md) (first actual task baseline, recorded now). Latest event EV-0010. Documentation-only design authorized and published; no new implementation/live access authorized. Next: acquisition review and execution-scope approval.

## STEP-02 progress — 2026-11-24, resumed checkpoint 0/2

Concrete initial acquisition design published and read back at [product revision a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f](https://github.com/massimilianonardi-ai/m-rsudo/tree/a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f/doc/deploy). Three documents define private manifest, staged preflight, bounded read operation catalog, session/secret boundaries, evidence/coverage and planned tests. Product source unchanged; no collector code, actual connection, server read, deployment, or test execution. Functional baseline and plan milestones unchanged; STEP-02 design portion delivered as a proposal, collection pending. Architecture remains refining. Next gate: review the proposed approach and confirm authorized runner context, target/group scope, identity/session effects, private storage and limits. Implementation of a collector requires appropriate code authorization; real collection requires separately explicit scope. Do not proceed to final desired JSON schema before actual observations.

## STEP-02 smoke-test scope — checkpoint 0/3

Operator approved rsudo-admin > rsudo jobs, local output redirection and a bounded read-only test of existing adapters before designing a full collector. APISIX: SSL resources, services, routes; Keycloak: realm list/details, LDAP provider configuration and clients. Deliver inline source-only helper library and job template for operator execution, not product code; use existing credential groups and existing Keycloak CLI session. Actual target references and executable/config paths remain operator-local, not inferred. APISIX native response includes HTTP headers; extract/validate JSON locally. Keycloak native get produces JSON. First-page collection for paginated lists is a smoke test, not comprehensive export or re-import contract; known secret fields excluded and outputs private. No import, mutation, protected module changes or remote login performed by assistant. Actual execution/results pending operator run; review sanitized status/counts before expanding acquisition. Architecture and baseline unchanged; no full collector or deployment implementation approval inferred.
