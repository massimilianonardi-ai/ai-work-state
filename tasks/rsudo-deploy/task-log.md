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
