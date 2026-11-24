---
id: "task:rsudo-deploy"
status: refining
scope: "m-rsudo / deployment orchestration"
subject: "Design and develop rsudo-deploy"
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

# Handoff — rsudo-deploy

**Task:** task:rsudo-deploy. **Checkpoint:** 15, 2026-11-24T10:30:39.015Z. **Phase:** architecture; status refining. Registration is a correction of missing task persistence, not new scope or implementation approval.

## Resume pointers
- Read [task-state.md](task-state.md), then [task-specification.md](task-specification.md), [task-log.md](task-log.md) through EV-0008, [baseline-v001.md](baseline-v001.md), [plans/plan-001.yaml](plans/plan-001.yaml), all from the same verified task registration or later coherent revision.
- Product: [m-rsudo docs at 27705b4ac4dedb1bc4f1ee2d178d9efa7c3ec57a](https://github.com/massimilianonardi-ai/m-rsudo/tree/27705b4ac4dedb1bc4f1ee2d178d9efa7c3ec57a/doc/deploy); verify current main HEAD before changes. Source interface implementation 05d1b08791a3f85c47b619a2f1169edbe5953332. [Prior CI](https://github.com/massimilianonardi-ai/m-rsudo/actions/runs/45345542189) passed for original interface only.
- [Recovered conversation snapshots](https://github.com/massimilianonardi-ai/ai-work-state/tree/976088fd03856e28ab1ca08d2afaad01d4824130/conversations/2026-11-23_14-39_0903b7f9-50af-4d5e-8fa3-48f3595d4b41/snapshots) and [events](https://github.com/massimilianonardi-ai/ai-work-state/tree/976088fd03856e28ab1ca08d2afaad01d4824130/conversations/2026-11-23_14-39_0903b7f9-50af-4d5e-8fa3-48f3595d4b41/events) are available for provenance or deeper detail, not necessary to reread all for ordinary restart.

## Where work stopped
D01–D08 answered; L1–L3 settled for first scenario. Conceptual resource model and initial read-only acquisition proposed. Existing entrypoint slice installed in source only; old unconditional CLI forwarding no longer matches approved full CLI. No actual collection, JSON schema, apply or real acceptance completed. No live deployment or release authorized. Latest product docs commit 27705b4ac4dedb1bc4f1ee2d178d9efa7c3ec57a was read back at m14. Current task registration requested by user at m15; it is not an authorization to modify any product.

## Next authorized action
When the operator resumes and says to proceed, design the concrete initial acquisition contract in product docs: target identification and permitted scope, read-only commands/interfaces per domain (respect existing rsudo), output structure and completeness/errors, sensitive data protection and private storage, source revision and identity mappings. Present practical read-only collection approach and get needed access/authorization before running against real servers. No assumed access, no remote mutation, no guesses about installed plugins/versions. Then use real observations to refine resource schema and architecture; present full L4–L8 synthesis before substantive code and obtain approval. Do not re-ask D01–D08 or repeat source study unnecessarily.

## Restart safeguards
Preserve protected rsudo components; separate tasks for missing capabilities, explicit approval for apisix/keycloak/keysix changes. Never promote a proposed architecture to approved, reinterpret prior contextual decisions as unconditional, or automatically fix drift. Keep task-state/log/spec/handoff updated with meaningful work and persist them together with conversation checkpoint. The state repo is public; never store raw private exports, secrets or personal data. If any referenced revision is missing, report it, recover from actual evidence, and do not fabricate a transcript. Use `!aw resume --context task:rsudo-deploy` in another chat. Task record is authoritative for restart, not ChatGPT memory.

## Latest resume delta (supersedes earlier next-action text)
## STEP-02 progress — 2026-11-24, resumed checkpoint 0/2

Concrete initial acquisition design published and read back at [product revision a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f](https://github.com/massimilianonardi-ai/m-rsudo/tree/a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f/doc/deploy). Three documents define private manifest, staged preflight, bounded read operation catalog, session/secret boundaries, evidence/coverage and planned tests. Product source unchanged; no collector code, actual connection, server read, deployment, or test execution. Functional baseline and plan milestones unchanged; STEP-02 design portion delivered as a proposal, collection pending. Architecture remains refining. Next gate: review the proposed approach and confirm authorized runner context, target/group scope, identity/session effects, private storage and limits. Implementation of a collector requires appropriate code authorization; real collection requires separately explicit scope. Do not proceed to final desired JSON schema before actual observations.
Read the latest acquisition contract, operations and evidence docs at [a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f](https://github.com/massimilianonardi-ai/m-rsudo/tree/a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f/doc/deploy); no need to repeat source audit. Previous source and D01–D08 references remain valid. Resume at the review/authorization gate, not design-from-scratch. Latest task event EV-0009; plan-001 remains the immutable planning revision.

## Latest gate (supersedes prior next-action text)

## STEP-02 smoke-test scope — checkpoint 0/3

Operator approved rsudo-admin > rsudo jobs, local output redirection and a bounded read-only test of existing adapters before designing a full collector. APISIX: SSL resources, services, routes; Keycloak: realm list/details, LDAP provider configuration and clients. Deliver inline source-only helper library and job template for operator execution, not product code; use existing credential groups and existing Keycloak CLI session. Actual target references and executable/config paths remain operator-local, not inferred. APISIX native response includes HTTP headers; extract/validate JSON locally. Keycloak native get produces JSON. First-page collection for paginated lists is a smoke test, not comprehensive export or re-import contract; known secret fields excluded and outputs private. No import, mutation, protected module changes or remote login performed by assistant. Actual execution/results pending operator run; review sanitized status/counts before expanding acquisition. Architecture and baseline unchanged; no full collector or deployment implementation approval inferred.
Next: operator executes the provided job and returns sanitized log/status; diagnose actual module read errors before any comprehensive collection or architecture change.

## Latest gate — checkpoint 0/4
Operator returned first smoke-test summary. All three APISIX GET operations and Keycloak realm GET failed with status 16 in approximately one second; no JSON artifacts. LDAP/client reads skipped. Native dispatcher at m-rsudo@a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f returns 16 when delegated function is unavailable; actual stderr and selected installed concrete are not yet inspected, so cause remains provisional. Request sanitized stderr for APISIX routes and Keycloak realms and optionally a local-only module resolution check. No retry, protected code edit, new dependency task, or claim of API/auth/transport failure. STEP-02 still refining; resolve installed module availability before further collection.

## Latest gate — checkpoint 0/5
Compared last published release m-rsudo/v0.1.3 (2026-11-18) against main a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f. Release modules have legacy get functions and APISIX key, but lack apisix rest and keycloak kcadm; main has both requested new functions. This explains observed exit 16 if older installed concrete selected, but actual local version is unverified. APISIX module blob IDs release 4be87edb9856daa4e9577e229fd58873840d4fcf / main b96c0a3533ff5608c1c02ad3ed6e95b758b07a7a; Keycloak release 698ca2e9ffbcf0ff251a5d2cae5515bb85d59a00 / main 7d7967f451436972254b74503f93760ec1928c7a. Provide local-only job using actual dispatcher lookup, file digest and function checks; operator runs within same rsudo-admin context with prior source-only library. No remote commands, upgrade, release, product edits or new dependency task authorized/performed. Await diagnostic log, then decide installed-version correction versus actual defect.

## Latest gate — checkpoint 0/6
Operator confirmed installed m-rsudo v0.1.3 and explicitly authorized new release. Release mismatch established: v0.1.3 lacks required rest/kcadm interfaces. Updated version-bound build, release workflow, archive-check workflows and README only (no runtime or module source edits); commit 6833394026174c254bd15da89042d2938c9bb734. Native release workflow run 45402444549 completed success, including local adapter and entrypoint test/build step and publish step. Verified v0.1.4 tag at exact commit, published non-draft release and assets m-rsudo-v0.1.4-all.tar.gz and SHA256SUMS. Archive digest reported by GitHub sha256:d789dad259ccb07cbc9f2d1a2b06c2f397cbf77ce2575a2c4a45947f9666724c. Updated pkg-catalog/main at a7c3cd8e2bbf9c9a224c738ad440eeecd925dfea with n0005=v0.1.4, version list and archive projections; readback verified, prior entries unchanged, removed legacy Keycloak projection only for new version. Separate matrix workflows queued at last observation; real public pkg installation and live reads not verified. Next: operator refreshes catalog, installs/selects v0.1.4 and reruns original acquisition smoke test. Architecture status refining, baseline unchanged, full deploy implementation not approved or completed.
