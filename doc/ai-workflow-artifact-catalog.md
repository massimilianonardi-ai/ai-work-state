# AI-Workflow — Product documentation artifact catalog

**Status:** approved documentation principle now operationalized by [product documentation rules](https://github.com/massimilianonardi-ai/ai-workflow/blob/main/behavior/product-documentation.md) and [17 templates](https://github.com/massimilianonardi-ai/ai-workflow/tree/main/templates/product-docs), 2026-11-23. Companion to [Progressive Design & Execution](ai-workflow-progressive-design-execution.md). This catalog describes **user-facing/product documentation outputs**, not per-response workflow storage.

## Principle

Generate **many concise, exhaustive, purpose-specific artifacts** as the product's real scope warrants. Every meaningful design level should leave understandable, reusable material: diagrams, tables, decisions, contracts, flow descriptions, tests and usage instructions. A future engineer or assistant should be able to answer *what exists, why, where and how it works* without replaying the originating chat.

**Quality of an artifact:** one coherent subject; verified source/revision; sufficient important cases, invariants and constraints; clear public interfaces/flows; no speculation presented as fact; cross-links to dependent artifacts. Prefer diagrams/tables and compact explanations over prose volume. Update the exact affected documents when implementing or revising the product.

## Candidate product repository structure

```text
docs/
  00-overview.md                  # entry point and document map
  objectives.md                   # outcome, constraints, exclusions
  requirements.md                 # functional/nonfunctional contracts
  use-cases.md                    # representative scenarios
  acceptance.md                   # observable success, limitations, evidence
  architecture.md                 # overall system and alternatives
  components.md                   # ownership, cohesion, dependencies
  interfaces.md                   # public API, parameters, errors and contracts
  flows.md                        # sequence/data/control diagrams
  data-model.md                   # only when persistence/schema requires it
  code-design.md                  # module/class/function inventory
  algorithms.md                   # only where nontrivial algorithms exist
  tests.md                        # test matrix: behavior, setup, assertions
  execution-plan.md               # readable detailed implementation plan
  supervision.md                  # planned vs actual, quality signals, gates
  operations.md                   # setup/configuration/use/failure recovery
  decisions.md                    # concise material design rationale
```

The names and grouping are illustrative, not compulsory literal paths. For larger projects split by subsystem, e.g. `docs/components/<name>.md`, `docs/flows/<use-case>.md`, `docs/tests/<feature>.md`. For small projects documents may be shorter and some topics merged, provided each relevant concern remains explicitly findable. Do **not** suppress useful documents solely to minimize the file count. Do not generate empty placeholder files for topics that have no relevance.

## Artifact responsibilities

| Artifact | Minimum useful contents | Level |
| --- | --- | --- |
| Overview/index | System purpose, current version, navigation, key diagrams/links | all |
| Objectives and requirements | Approved outcome, scope/constraints, IDs and source | L1–L2 |
| Use cases and acceptance | Actors, input/action, positive and important failure observations, acceptance | L3 |
| Architecture | System boundaries, technologies, alternatives and decision rationale | L4 |
| Component ownership | Responsible module, excluded work, callers, dependencies, side effects | L5 |
| Interface contracts | Functions/API/commands, data types/shapes, errors, invariants and compatibility | L5 |
| Data/control flows | Representative sequence and branching, data transformations, error paths | L5–L6 |
| Code design | Relevant files/classes/functions, signatures, algorithm outline and exact ownership | L6 |
| Test descriptions | Trace to use cases; environment, fixtures, action, assertion and observed status | L7 |
| Execution plan | Deliverables, order/dependencies, check gates, risks and progress references | L8–L10 |
| Supervision | Baseline/plan SHA, evidence, drift, unnecessary complexity and corrective actions | L10 |
| Usage and operations | Commands/config, normal workflow, recovery and practical restrictions | L11 |
| Decision notes | Material alternatives, selected choice, reasons, approver and revision | L1–L11 |

Use Mermaid, ASCII diagrams or an editable diagram source when they improve comprehension. Keep diagram source accessible, not screenshots alone. Document significant functions/algorithms individually if their control flow or constraints require it; tiny obvious functions need only appear in an inventory or owning module documentation.

## Avoid unnecessary redundancy while keeping rich documentation

- Each claim has a **canonical home**; other documents link to it and present only the context needed for their reader.
- Requirement and use-case IDs connect architecture, interfaces, tests and acceptance without copying full text.
- Documents evolve in the **same product revision** as the corresponding code when possible; Git history preserves changes. Mark unverified behavior.
- A short `docs/00-overview.md` or equivalent connects specialized documents and their current status.
- AI-Workflow state references the product's exact Git SHA and documentation entry points; it does **not** replace external product documentation.

## Completion checks

Before reporting delivery, inspect the relevant docs against implemented code. Ensure public contract, component ownership, important flows, test scenarios and operational instructions match the published revision. A passing CI run does not replace accurate documentation or actual runtime acceptance; likewise, complete documentation alone does not prove the product works.
