---
id: "task:rsudo-deploy"
status: refining
scope: "m-rsudo / deployment orchestration"
subject: "Design and develop rsudo-deploy"
workflow_refs:
  - behavior/task-records.md
  - workflows/develop.md
  - behavior/specification.md
  - workflows/progressive-levels.md
  - behavior/product-documentation.md
state_refs:
  - chat_id: "2026-11-23_14-39_0903b7f9-50af-4d5e-8fa3-48f3595d4b41"
    branch_id: 0
    relation: "source conversation and recovered task history"
    source_checkpoint: 14
source:
  authority: "operator's evidenced decisions through checkpoint 14; explicit task registration request at checkpoint 15"
  revision: "2026-11-24 / task registration at checkpoint 15"
---

# Task specification — rsudo-deploy

**Working agreement, current revision m15.** Functional requirements and decisions explicitly accepted through m14; **complete architecture and further substantive implementation not yet approved**. The product owns detailed specifications at [pinned index](https://github.com/massimilianonardi-ai/m-rsudo/tree/27705b4ac4dedb1bc4f1ee2d178d9efa7c3ec57a/doc/deploy).

## Outcome and scope
Operator uses POSIX CLI or menu to edit/review desired project, prepare and apply whole/selected scope to existing infrastructure, observe/verify and report differences. First vertical scenario is protected HTML/JS/CSS apps with existing APISIX, Keycloak and nginx. D01–D08 in [scenario-01-decisions.md](https://github.com/massimilianonardi-ai/m-rsudo/blob/27705b4ac4dedb1bc4f1ee2d178d9efa7c3ec57a/doc/deploy/scenario-01-decisions.md) are the canonical specific functional decisions. Broader deployment capabilities deferred; changes needed in other products separate tasks. Do not make private infrastructure configuration public.

## Approved decisions and constraints
Read [task state](task-state.md) and [requirements.md](https://github.com/massimilianonardi-ai/m-rsudo/blob/27705b4ac4dedb1bc4f1ee2d178d9efa7c3ec57a/doc/deploy/requirements.md) (REQ-01–24). Preserve protected rsudo contract, separate local and remote operations, full CLI in sourceable library, menu reused, no implicit repair/deletion. Desired project directory of structured JSON; precise schema not approved. Existing architecture is baseline not permanent; future alternatives need evidence/approval. Initial acquisition spans infrastructure/global and application config. Explicit operational exceptions for identity management. No plaintext credentials in project or ordinary logs. Explicit noninteractive authorization of destructive changes, preflight before long work, actual result evidence.

## Use cases and checks
| Case | Expected observable result | Evidence plan |
| --- | --- | --- |
| UC local edit/validate | Project revised, invalid references reported; no server calls | Local tests, source/CLI boundary |
| UC initial acquisition | Both configuration levels captured read-only; unknown/unsupported parts identified | Authorized read-only collector, provenance and completeness, no secrets |
| UC prepare selected/full scope | Differences, dependencies, blockers and selected actions reviewed before mutations | Repeatable comparison/plan checks, scope and stale-state cases |
| UC apply | Only authorized changes, no automatic redeploy; partial effects distinguishable | Test environment actions, per-step log, independent observations |
| UC protected application | Correct public path/assets, allowed identity succeeds; anonymous/denied blocked; no origin bypass | Browser/public checks, approved identities, actual environment |
| UC drift/ordinary identity admin | Distinguish structural drift vs legitimate operational changes; no automatic correction | Readback and negative cases |
| UC unattended/failure | Precise evidence, no unapproved action or secret output | Long-run/interruption/partial outcome tests, explicit authorization |

See product use-cases.md, acceptance.md and scenario-01-acceptance.md (SCN-A01–22; proposed detailed checks, not executed). Existing CI only verifies old entrypoint integration, not revised CLI or live use cases.

## Architecture synthesis — work in progress
| Item | Current status |
| --- | --- |
| CLI/menu boundary and protected rsudo components | Approved; old wrapper superseded, must be replaced when authorized |
| Initial scenario and ownership | Approved D01–D08; actual installed configuration unverified |
| Conceptual resources and authority classes | Proposed resource-model.md; areas not file/module count |
| Initial read-only export/import | Required scope approved; concrete acquisition contract proposed at product revision a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f; execution not yet approved |
| JSON resource schema, identifiers, native mapping, dependencies, CLI grammar | Unresolved engineering design |
| Plan immutability/freshness, approval binding, retries/resume, failure and logging policy | Proposed principles, detailed contracts pending |
| Concrete access/permissions/capabilities and external behavior | Need separately authorized collection and tests |
| Release/live operations | Not authorized here |

## Readiness and next action
Functional scope settled (L1–L3); L4 in progress. Concrete acquisition plan now documented; review and approve actual target scope, runner/access, session policy, private storage and limits before actual collection. Review real evidence before fixing JSON, then L4–L8 synthesis and explicit approval for further code. Do not repeat D01–D08 interview. Do not treat registration as permission to develop or deploy. No verified dependent tasks yet.

## STEP-02 progress — 2026-11-24, resumed checkpoint 0/2

Concrete initial acquisition design published and read back at [product revision a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f](https://github.com/massimilianonardi-ai/m-rsudo/tree/a90b0ed9be31ef37d63a79ec492dcb2f3a742b4f/doc/deploy). Three documents define private manifest, staged preflight, bounded read operation catalog, session/secret boundaries, evidence/coverage and planned tests. Product source unchanged; no collector code, actual connection, server read, deployment, or test execution. Functional baseline and plan milestones unchanged; STEP-02 design portion delivered as a proposal, collection pending. Architecture remains refining. Next gate: review the proposed approach and confirm authorized runner context, target/group scope, identity/session effects, private storage and limits. Implementation of a collector requires appropriate code authorization; real collection requires separately explicit scope. Do not proceed to final desired JSON schema before actual observations.
