---
id: "task:aw-test-persistence-20261118-01"
status: refining
scope: "AI-Workflow / TEST P3.1 — verifica sperimentale della persistenza"
subject: "Checklist di verifica per servizio software fittizio"
workflow_refs:
  - behavior/intent.md
  - behavior/task-records.md
state_refs: []
source:
  authority: "utente — TEST P3.1"
  revision: "richiesta iniziale, senza riferimento nativo al messaggio"
---

# Baseline v001 — Checklist di verifica per servizio software fittizio

Created: 2026-11-18T10:14:58+01:00
Task ID: `task:aw-test-persistence-20261118-01`
Baseline status: **initial user-authorized scope; not an execution approval**.

## Objective
Prepare a simple, documentary verification checklist for a **fictitious software service**.

## Authorized scope
- Create exactly one experimental task in `ai-work-state/main`.
- Prepare a generic checklist, without connecting to or inspecting any real service.
- Persist task records, minimal hierarchy indexes and this response checkpoint.

## Explicit constraints
- No real checks or executions.
- No other task creation.
- `parent: null`; `depends_on: []`.
- Initial task status: `refining`.
- No approval to execute the checklist.
- No automatic status transition to `approved` or `executing`.

## Acceptance boundary
The checklist and task registration are **documentary artifacts only**. No runtime or service functionality is claimed to have been verified.
