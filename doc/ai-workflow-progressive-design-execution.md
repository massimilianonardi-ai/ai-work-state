# AI-Workflow — Progressive Design & Execution

**Design status:** approved by the operator on 2026-11-23, with the explicit correction that rich, concise, independently useful product documentation is **required**, in addition to workflow state. **Runtime status:** not yet implemented as an active phase workflow. This design does not itself change bootstrap execution rules.

## Goal

Balance informed operator decisions and autonomous assistant implementation through progressive, inspectable abstraction levels. The assistant investigates facts, proposes coherent designs and performs the engineering; the operator approves product outcomes, consequential boundaries and authorization. Each level narrows uncertainty and provides usable inputs to the next.

## Levels and deliverables

| Level | Primary output | Quality/decision gate |
| --- | --- | --- |
| L1 Objectives and scope | Precise objectives, actors, boundaries, exclusions, priorities | Operator confirms desired outcome and material scope |
| L2 Requirements | Functional/nonfunctional requirements, invariants, integration, constraints | Resolve material uncertainty and contradictions |
| L3 Use cases and acceptance | Representative success/failure scenarios, observable outcomes | Operator confirms relevant behaviors and acceptance |
| L4 System architecture | Component diagram, architectural alternatives, reuse/build rationale | Operator approves consequential architecture |
| L5 Component design | Responsibility map, module contracts, interface/data flows, failure boundaries | Assistant verifies coherence; operator only if approved architecture changes |
| L6 Code design | Function/class inventory, signatures, call/data/control flow, significant algorithms | Assistant technical review; no routine operator microapproval |
| L7 Test design | Traceable unit/integration/E2E cases, fixtures, assertions and evidence scope | Assistant verifies coverage of characteristic use cases |
| L8 Execution plan | Ordered milestones, dependencies, risks, vertical slice, tests and done gates | Operator approves external effects/scope changes; technical plan is assistant-owned |
| L9 Implementation | Actual code, incremental checks, corrected defects, modularity/self-review | Assistant verifies product and associated documents |
| L10 Execution supervision | Planned vs observed progress, code quality, deviations, evidence-based verdict | Continue / correct / suspend; independent reviewer may advise without writing to target |
| L11 Acceptance and handoff | Observed outcome, residual limitations, usage/operations documents, next actions | Operator assesses actual result |

These are **abstraction levels and formalization checkpoints**, not eleven obligatory separate conversational phases or approvals. For complex tasks a level can be refined at multiple sublevels, such as system → subsystem → module → function. For simpler work, deliverables can be concise, but their required semantics must remain inspectable.

## One level at a time

Each level has a compact contract: **purpose → verified inputs → explicit/inferred decisions and authority → diagram/list/contract → exit evidence → next level**. Finish the level's meaningful analysis before relying on it for the next. A significant ambiguity with materially different architectures returns to the operator before dependent code; routine coding mechanics remain the assistant's responsibility.

When a defect invalidates an earlier decision, return to the **lowest affected abstraction level** and update dependent artifacts; do not restart all work. Track actual revisions and preserve the historical decision/evidence link.

## Three kinds of checkpoint

- **Decision checkpoint:** the operator reviews and approves outcomes, substantial constraints, acceptance, architecture and significant authorization/risk changes. Group decisions into coherent milestones.
- **Technical checkpoint:** the assistant validates facts, architecture/module ownership, algorithms, code flow, minimal test coverage, implementation correctness and complexity. Self-directed; not an operator questionnaire.
- **Supervision checkpoint:** a second chat or focused audit compares accepted artifacts, plan and real code/test evidence at pinned revisions. Reports continue/correct/suspend; never changes active code or specification without authorization.

These are design/execution checkpoints, **different from Git conversation persistence checkpoints**. Their frequency and outputs are driven by risk, complexity and progress.

## Adaptive detail

Depth depends on number of components and contracts, side effects, risk, uncertainty, novelty and critical integration boundaries—not code line count. Simple projects still get concise readable product documents; medium projects get explicit component/interface and code-flow artifacts; complex projects get nested designs, state diagrams and independently supervised execution.

Favor an early representative end-to-end vertical slice after architecture approval; keep remaining tests relevant to accepted use cases. Code must reside in the right owning module and reuse established interfaces. Choose the simplest *complete* maintainable solution, not whichever is easiest for the assistant to generate.

## Documentation as a product deliverable

**Approved correction to the original storage proposal:** the task specification, task log, handoff, versioned execution plan, events and snapshots are **not enough**. The assistant also produces **many distinct, compact yet exhaustive** user-facing and externally reusable documents, diagrams, inventories, contracts, test descriptions and operational guides, sized by actual project scope and meaningful concerns.

Their primary home is the **product/project repository** (usually a clear `docs/` or `doc/` tree, or another agreed published location), not only the state repository. They are deliverables intended to explain the product, support later changes, and allow the assistant to resume and evolve the product from authentic documentation. They must be maintained when code/contract changes.

Use [artifact catalog](ai-workflow-artifact-catalog.md) to select, link and validate them. Prefer separate single-purpose documents instead of an enormous narrative. Avoid redundant copies of canonical facts through references and cross-links, **not by omitting needed documents**. Do not use the number of generated files as evidence of success.

## Relationship to existing AI-Workflow records

- `task-specification.md` is the canonical approval/provenance and requirement authority record, linking to product documents.
- `plans/plan-NNN.yaml` tracks execution orchestration where warranted, linking to a readable detailed plan if useful.
- `task-state.md`, `task-log.md`, `handoff.md` track durable task progress and recovery.
- Conversation `events/` and `snapshots/` record significant state and resume context, rather than replace product documentation.
- Product docs explain the system itself, are versioned with its source, and can be consulted directly by users and future assistants.

## Next design work before activation

Specify the concise per-level content contracts and documents, exact operator approval boundaries, progressive escalation, traceability rules, execution-plan supervision triggers and the complete develop workflow. Validate against observed Keycloak/APISIX failures; then apply approved changes to runtime rules. No automatic change to the active task model or to per-response Git checkpoint frequency.
