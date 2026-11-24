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

# Task log — rsudo-deploy

**History recovered at registration, 2026-11-24T10:30:39.015Z.** EV-0001–0007 summarize accessible prior checkpoint evidence; they are not backdated contemporaneous task writes or a full transcript. Prior conversation events/snapshots are preserved unmodified: [events](https://github.com/massimilianonardi-ai/ai-work-state/tree/976088fd03856e28ab1ca08d2afaad01d4824130/conversations/2026-11-23_14-39_0903b7f9-50af-4d5e-8fa3-48f3595d4b41/events), [snapshots](https://github.com/massimilianonardi-ai/ai-work-state/tree/976088fd03856e28ab1ca08d2afaad01d4824130/conversations/2026-11-23_14-39_0903b7f9-50af-4d5e-8fa3-48f3595d4b41/snapshots). EV-0008 records actual current registration action.

### EV-0001 — recovered m1–m3 — objective and model
POSIX shell menu/CLI for infrastructure deployment, initially broad service scope. Single deployment.json proposal superseded by multiple structured JSON files; reuse rsudo and encrypted credential model. Desired/observed separation and ownership explored. Source: m1–m3 snapshots. No code or deployment then.

### EV-0002 — recovered m4–m6 — source audit and placement
Inspected m-rsudo@fad7b8b49ea9b966e56013f1a66736587633ba65 and existing modules, packaging, rsudo-admin. Separate-package proposal superseded by native module within m-rsudo. Source audit only; no live tests. See m4–m6 snapshots and current scenario-01-dependencies.md. Historical research ZIP not a required dependency for restart.

### EV-0003 — recovered m7–m9 — sourceable menu and initial integration
External command proposal refined: source-only menu library + thin executable; admin invokes menu in subshell preserving unexported credential groups. Operator approved. Initial source implementation and docs committed (2adc16f1, 3528260b, 3f80ce65, 73c59726, 05d1b08791a3f85c47b619a2f1169edbe5953332). CI #45345542189 passed Ubuntu/macOS for new interface tests with synthetic state, not actual remote deployment. Historical wrapper forwards all args; superseded later. Do not infer full architecture approval from that slice.

### EV-0004 — recovered m10 — material boundary correction
Operator rejected treating contextual CLI decision as absolute. Do not change rsudo or protected modules; local operations outside native rsudo module. apisix/keycloak/keysix modifications require explicit consent and separate tasks. Prior universal forwarding now needs revision. No product writes.

### EV-0005 — recovered m11 — CLI and project lifecycle
Full CLI function in sourceable library approved; desired project staged/reviewed, partial/full deploy, separate observed state, no automatic remediation, top-down first secure static-app scope, preparation and audit evidence required. Docs-only commit c69da1ee14cf9c44cb8f9d40ac1b595608e78359. No new code.

### EV-0006 — recovered m12–m13 — functional scenario and D01–D04
Source contract study of APISIX rest/key, Keycloak remote kcadm, Keysix help, fs and exec. Candidate acceptance, decisions and actual reported topology clarified; exclusive structural ownership with operational exceptions, authoritative Git content, initial export. Docs commits 8809c2bd3409d49ac56cd2bf04a7a6392075cbaf and 193a2c8a047d8a089a75b4d2af294f12fa157959. See pinned decision and dependency docs; no live collection.

### EV-0007 — recovered m14 — functional scope settled; architecture begins
D05–D08 answered; conceptual resource model and read-only acquisition proposed, 12 product docs updated, HEAD 27705b4ac4dedb1bc4f1ee2d178d9efa7c3ec57a verified. L1–L3 substantially settled, L4 in progress, L5–L8 pending. No actual discovery or application. See product docs and m14 snapshot.

### EV-0008 — checkpoint 15 — persistence omission corrected
Operator explicitly requested durable task initialization and handoff after detecting tasks: [] despite ongoing complex work. Verified prior branch checkpoint 14 and empty association, task roots and rules (behavior/task-records.md, state/task-model.md, behavior/specification.md). Fault: durable task record method not applied; conversation checkpointing/product documentation alone insufficient. Register this one root task with reconstructed evidence, specification, baseline, planning revision, indexes and handoff in same transaction as new branch association. No prior history rewritten, no product modifications, no new execution permission. Audit verdict: correct. No claim of complete transcript recovery. Publication verification is external to this file and checked by ref/file readback before reporting.

### EV-0009 — resumed conversation checkpoint 0/2 — acquisition contract proposed
Operator authorized next design step. Inspected current m-rsudo@27705b4ac4dedb1bc4f1ee2d178d9efa7c3ec57a native rsudo/fs/exec manuals, APISIX and Keycloak adapters and dispatcher argument logging. Published and verified docs-only revision a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f: initial-acquisition.md, acquisition-operations.md, acquisition-evidence.md, README.md, execution-plan.md. Proposed bounded observation using existing rsudo context, private manifest and local restricted evidence; identified APISIX HTTP response/header and Keycloak session/cache handling risks. No new implementation, live connections, source modifications, runtime tests, release or dependency tasks. STEP-02 design delivered for review; collection remains blocked on explicit scope and authorization. L4 remains active; baseline and plan-001 unchanged. Next: review design and confirm authorized execution context/target map/identity scope/session/storage/limits; no premature JSON model or apply.

### EV-0010 — checkpoint 0/3 — bounded adapter read test
Operator approved rsudo-admin > rsudo jobs, local output redirection and a bounded read-only test of existing adapters before designing a full collector. APISIX: SSL resources, services, routes; Keycloak: realm list/details, LDAP provider configuration and clients. Deliver inline source-only helper library and job template for operator execution, not product code; use existing credential groups and existing Keycloak CLI session. Actual target references and executable/config paths remain operator-local, not inferred. APISIX native response includes HTTP headers; extract/validate JSON locally. Keycloak native get produces JSON. First-page collection for paginated lists is a smoke test, not comprehensive export or re-import contract; known secret fields excluded and outputs private. No import, mutation, protected module changes or remote login performed by assistant. Actual execution/results pending operator run; review sanitized status/counts before expanding acquisition. Architecture and baseline unchanged; no full collector or deployment implementation approval inferred.

### EV-0011 — checkpoint 0/4 — first read test failed
Operator returned first smoke-test summary. All three APISIX GET operations and Keycloak realm GET failed with status 16 in approximately one second; no JSON artifacts. LDAP/client reads skipped. Native dispatcher at m-rsudo@a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f returns 16 when delegated function is unavailable; actual stderr and selected installed concrete are not yet inspected, so cause remains provisional. Request sanitized stderr for APISIX routes and Keycloak realms and optionally a local-only module resolution check. No retry, protected code edit, new dependency task, or claim of API/auth/transport failure. STEP-02 still refining; resolve installed module availability before further collection.

### EV-0012 — checkpoint 0/5 — release interface mismatch identified
Compared last published release m-rsudo/v0.1.3 (2026-11-18) against main a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f. Release modules have legacy get functions and APISIX key, but lack apisix rest and keycloak kcadm; main has both requested new functions. This explains observed exit 16 if older installed concrete selected, but actual local version is unverified. APISIX module blob IDs release 4be87edb9856daa4e9577e229fd58873840d4fcf / main b96c0a3533ff5608c1c02ad3ed6e95b758b07a7a; Keycloak release 698ca2e9ffbcf0ff251a5d2cae5515bb85d59a00 / main 7d7967f451436972254b74503f93760ec1928c7a. Provide local-only job using actual dispatcher lookup, file digest and function checks; operator runs within same rsudo-admin context with prior source-only library. No remote commands, upgrade, release, product edits or new dependency task authorized/performed. Await diagnostic log, then decide installed-version correction versus actual defect.

### EV-0013 — checkpoint 0/6 — native adapter release published
Operator confirmed installed m-rsudo v0.1.3 and explicitly authorized new release. Release mismatch established: v0.1.3 lacks required rest/kcadm interfaces. Updated version-bound build, release workflow, archive-check workflows and README only (no runtime or module source edits); commit 6833394026174c254bd15da89042d2938c9bb734. Native release workflow run 45402444549 completed success, including local adapter and entrypoint test/build step and publish step. Verified v0.1.4 tag at exact commit, published non-draft release and assets m-rsudo-v0.1.4-all.tar.gz and SHA256SUMS. Archive digest reported by GitHub sha256:d789dad259ccb07cbc9f2d1a2b06c2f397cbf77ce2575a2c4a45947f9666724c. Updated pkg-catalog/main at a7c3cd8e2bbf9c9a224c738ad440eeecd925dfea with n0005=v0.1.4, version list and archive projections; readback verified, prior entries unchanged, removed legacy Keycloak projection only for new version. Separate matrix workflows queued at last observation; real public pkg installation and live reads not verified. Next: operator refreshes catalog, installs/selects v0.1.4 and reruns original acquisition smoke test. Architecture status refining, baseline unchanged, full deploy implementation not approved or completed.

### EV-0014 — checkpoint 0/7 — clean install CI success; operator installation unresolved
Operator attempted uninstall/install; v0.1.4 selected and archive downloaded (39273 bytes), but pkg-install.integration-failed status 18. Current m-os master 359469c59633f90c5f81e7825712544a15467c37 maps any pkg_integrate failure to install status 18; precise local root cause unknown. Fixed pre-existing malformed first line of pkg-catalog .gitattributes (comment), verified catalog main 96a2d0ac27e07d541cc454ad6bfbe912e29f58af. Added actual public package install CI workflow to m-rsudo main 549052762b8d6009c0506b05d29eaa5c8f06cd1b, no product runtime edits or immutable release changes. Ubuntu CI run 45404172213 completed success: real m pkg install of v0.1.4 with pinned m-os master and corrected catalog; checks of executable projections, readable native libraries and new functions. This proves clean environment installation, not operator host success or cause of earlier failure. Operator to retry exact version and if failed provide local m-os HEAD and package integration diagnostics; no need for new release or speculative installer modification. Prior task architecture and baseline unchanged.
