# rsudo-deploy — approved L1–L3 refinement and product docs (m11)

## Source: explicit operator decisions on 2026-11-24
1. `rsudo-deploy <args>` is now the public comprehensive CLI, with executable as thin wrapper to `rsudo_deploy_cli "$@"` in sourceable `rsudo-deploy.lib.sh`. This library handles local operations locally, calls native `rsudo deploy` or other existing rsudo modules only for actual remote effects. Existing unconditional wrapper delegation is SUPERSEDED and not yet changed in code.
2. Desired deployment **project/plan** can be edited in stages and revised. Deploy can apply a selected subset or whole plan. Observed state is separate evidence for discrepancies. Drift or failed deployment must be diagnosed case by case; deploy replay is manual, not automatically triggered.
3. Scope of current task is **deployment** top-down, using existing services and products. First complete scenario: existing APISIX, Keycloak and nginx instances publishing HTML+JS+CSS web apps through URLs protected by Keycloak-managed authentication and authorization. New requirements/changes in rsudo modules or other tools are separate tasks. Do not alter protected products; apisix/keycloak/keysix edits require separate explicit user consent.
4. Hours-long unattended operations demand deep preflight (diffs, blockers, dependencies, preparation), carefully scoped authorization for destructive changes, durable precise logs, independent postcondition evidence and report of unknowns/remaining discrepancies. Logs by themselves do not logically guarantee continuing future state.

## Authority / exclusions
- Do not modify rsudo runtime/credential handling or fs, db-pg, exec.
- rsudo-admin only has Deploy menu item, existing integration.
- Native rsudo credential behavior stays established and untouched; no regression/retesting of credential mechanism in this task.
- Do not assume APISIX plugin, OIDC/authorization role layout, nginx reachability, DNS/TLS/app packaging topology until inspected/approved.
- Protected component needs generate separate scoped task with interfaces and acceptance, not in-task code changes.

## Actual verified work
- Product repo `massimilianonardi-ai/m-rsudo` `main` **docs-only commit `c69da1ee14cf9c44cb8f9d40ac1b595608e78359`** (parent `05d1b08791a3f85c47b619a2f1169edbe5953332`).
- 15 standalone documentation artifacts updated/created, fully read back: README, objectives, requirements, use-cases, acceptance, architecture, interfaces, decisions, initial-scenario, plan-model, deployment-lifecycle, logging-evidence, component-protection, components, execution-plan.
- **NO product source code or remote system modified this turn**. Existing preliminary CLI still forwards all args to rsudo and does not implement approved comprehensive CLI; documents explicitly disclose `not implemented`.
- Earlier Ubuntu/macOS CI checks at `3f80ce65` are historical evidence of initial interface only; do not claim they verify new approved CLI.

## Next design gate
Need an inspectable first-scenario contract: actual URL->APISIX->nginx route, identity/authorization enforcement via Keycloak, ownership of existing objects, deployed files and static content update, and dependency interfaces of existing rsudo modules. Distinguish operator-owned choices (topology/authz semantics, source of truth, destructive/retry policy) from technical decisions, document preflight/readback success/failure and then implement a narrow approved vertical slice. Remain in **specification** to settle first-scenario contract; no premature guess-based deployment code.
