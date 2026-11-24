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
