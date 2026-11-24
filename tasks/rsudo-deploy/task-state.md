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
Specification: [task-specification.md](task-specification.md). Baseline: [baseline-v001.md](baseline-v001.md) (first actual task baseline, recorded now). Latest event EV-0015. Documentation-only design authorized and published; no new implementation/live access authorized. Next: acquisition review and execution-scope approval.

## STEP-02 progress — 2026-11-24, resumed checkpoint 0/2

Concrete initial acquisition design published and read back at [product revision a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f](https://github.com/massimilianonardi-ai/m-rsudo/tree/a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f/doc/deploy). Three documents define private manifest, staged preflight, bounded read operation catalog, session/secret boundaries, evidence/coverage and planned tests. Product source unchanged; no collector code, actual connection, server read, deployment, or test execution. Functional baseline and plan milestones unchanged; STEP-02 design portion delivered as a proposal, collection pending. Architecture remains refining. Next gate: review the proposed approach and confirm authorized runner context, target/group scope, identity/session effects, private storage and limits. Implementation of a collector requires appropriate code authorization; real collection requires separately explicit scope. Do not proceed to final desired JSON schema before actual observations.

## STEP-02 smoke-test scope — checkpoint 0/3

Operator approved rsudo-admin > rsudo jobs, local output redirection and a bounded read-only test of existing adapters before designing a full collector. APISIX: SSL resources, services, routes; Keycloak: realm list/details, LDAP provider configuration and clients. Deliver inline source-only helper library and job template for operator execution, not product code; use existing credential groups and existing Keycloak CLI session. Actual target references and executable/config paths remain operator-local, not inferred. APISIX native response includes HTTP headers; extract/validate JSON locally. Keycloak native get produces JSON. First-page collection for paginated lists is a smoke test, not comprehensive export or re-import contract; known secret fields excluded and outputs private. No import, mutation, protected module changes or remote login performed by assistant. Actual execution/results pending operator run; review sanitized status/counts before expanding acquisition. Architecture and baseline unchanged; no full collector or deployment implementation approval inferred.

## STEP-02 first smoke-test result — checkpoint 0/4

Operator returned first smoke-test summary. All three APISIX GET operations and Keycloak realm GET failed with status 16 in approximately one second; no JSON artifacts. LDAP/client reads skipped. Native dispatcher at m-rsudo@a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f returns 16 when delegated function is unavailable; actual stderr and selected installed concrete are not yet inspected, so cause remains provisional. Request sanitized stderr for APISIX routes and Keycloak realms and optionally a local-only module resolution check. No retry, protected code edit, new dependency task, or claim of API/auth/transport failure. STEP-02 still refining; resolve installed module availability before further collection.

## STEP-02 diagnosis — checkpoint 0/5

Compared last published release m-rsudo/v0.1.3 (2026-11-18) against main a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f. Release modules have legacy get functions and APISIX key, but lack apisix rest and keycloak kcadm; main has both requested new functions. This explains observed exit 16 if older installed concrete selected, but actual local version is unverified. APISIX module blob IDs release 4be87edb9856daa4e9577e229fd58873840d4fcf / main b96c0a3533ff5608c1c02ad3ed6e95b758b07a7a; Keycloak release 698ca2e9ffbcf0ff251a5d2cae5515bb85d59a00 / main 7d7967f451436972254b74503f93760ec1928c7a. Provide local-only job using actual dispatcher lookup, file digest and function checks; operator runs within same rsudo-admin context with prior source-only library. No remote commands, upgrade, release, product edits or new dependency task authorized/performed. Await diagnostic log, then decide installed-version correction versus actual defect.

## STEP-02 release dependency — checkpoint 0/6

Operator confirmed installed m-rsudo v0.1.3 and explicitly authorized new release. Release mismatch established: v0.1.3 lacks required rest/kcadm interfaces. Updated version-bound build, release workflow, archive-check workflows and README only (no runtime or module source edits); commit 6833394026174c254bd15da89042d2938c9bb734. Native release workflow run 45402444549 completed success, including local adapter and entrypoint test/build step and publish step. Verified v0.1.4 tag at exact commit, published non-draft release and assets m-rsudo-v0.1.4-all.tar.gz and SHA256SUMS. Archive digest reported by GitHub sha256:d789dad259ccb07cbc9f2d1a2b06c2f397cbf77ce2575a2c4a45947f9666724c. Updated pkg-catalog/main at a7c3cd8e2bbf9c9a224c738ad440eeecd925dfea with n0005=v0.1.4, version list and archive projections; readback verified, prior entries unchanged, removed legacy Keycloak projection only for new version. Separate matrix workflows queued at last observation; real public pkg installation and live reads not verified. Next: operator refreshes catalog, installs/selects v0.1.4 and reruns original acquisition smoke test. Architecture status refining, baseline unchanged, full deploy implementation not approved or completed.

## STEP-02 installation diagnosis — checkpoint 0/7

Operator attempted uninstall/install; v0.1.4 selected and archive downloaded (39273 bytes), but pkg-install.integration-failed status 18. Current m-os master 359469c59633f90c5f81e7825712544a15467c37 maps any pkg_integrate failure to install status 18; precise local root cause unknown. Fixed pre-existing malformed first line of pkg-catalog .gitattributes (comment), verified catalog main 96a2d0ac27e07d541cc454ad6bfbe912e29f58af. Added actual public package install CI workflow to m-rsudo main 549052762b8d6009c0506b05d29eaa5c8f06cd1b, no product runtime edits or immutable release changes. Ubuntu CI run 45404172213 completed success: real m pkg install of v0.1.4 with pinned m-os master and corrected catalog; checks of executable projections, readable native libraries and new functions. This proves clean environment installation, not operator host success or cause of earlier failure. Operator to retry exact version and if failed provide local m-os HEAD and package integration diagnostics; no need for new release or speculative installer modification. Prior task architecture and baseline unchanged.

## STEP-02 repeated installation failure — checkpoint 0/8

Second operator install attempt still fails status 18; operator checkout HEAD matches successful clean CI m-os revision 359469c59633f90c5f81e7825712544a15467c37, but malformed .gitattributes warning persists. Verified remote pkg-catalog/main still at corrected 96a2d0ac27e07d541cc454ad6bfbe912e29f58af. Source pkg_catalog_init uses configured state-path system sys pkg conf/catalog, persistent state-path system sys pkg cache/catalog, git remote set-url + pull --ff-only and git archive of cache HEAD; pull success does not prove same branch/revision or clean working-tree attributes. Actual runtime root, cache HEAD and exact pkg_integrate failure unknown. Provide focused read-only local catalog/runtime checks plus private traced retry of existing pkg_install library (operator-authorized installation, no source change); request limited sanitized trace around failing exit. No new product/catalog changes or release; no root cause claim. STEP-02 remains refining and blocked on operator installation.
