# Deployment project — current design checkpoint (m3)

Scope: POSIX-shell tool for multi-host application and web-service administration. This is DESIGN, not implementation.

## Explicit user requirements
- Without arguments the tool enters an interactive menu; with arguments it is a CLI. Both must share the same core.
- Handles installation and management of m-os and host components (nginx, APISIX, OpenResty, PostgreSQL, Podman etc.), services with environment/commands/user/dependencies, resources in Keycloak/APISIX/PostgreSQL/GeoServer, networking, DNS, TLS and application authorization.
- The prior monolithic `deployment.json` requirement was revised: prefer a directory with multiple structured JSON files. Canonical root file/index is a design proposal only.
- Server operations MUST use existing `rsudo` modules and rsudo-admin-style encrypted credential files; future integration into rsudo-admin is preferred but not immediately binding.
- User requires many compact but complete, progressively deeper product documentation levels using current AI-Workflow rules.

## Inspected current repository contracts
- ai-workflow/main: `bootstrap.md`, `workflows/system-design.md`, `workflows/progressive-levels.md` and `behavior/product-documentation.md`; levels L1-L8 for standalone design, L9-L11 for development/delivery as applicable.
- m-rsudo/main: README, rsudo and rsudo-admin operational manuals, module manuals; also inspected `rsudo-mod-db-pg.lib.sh` and `rsudo.lib.sh` source.
- Existing rsudo modules: exec/inject, fs, db-pg, keycloak/kcadm, apisix/rest. rsudo-admin loads authenticated encrypted POSIX shell source through `encoded_file_eval`, then selects in-memory named groups through `rsudo --load :group`. Do not misuse `--load file:group` to mean direct encrypted-file loading.

## Proposed, not approved
- Split deployment/ with index JSON, server/component/service/application/product/network JSON files; separate observed state from desired declarations.
- Treat JSON files as data; credential material remains outside versioned configuration. Serialize/validate cross-file changes; use atomic individual writes with recovery protocol, not false multi-file atomicity.
- Independent deployment core that reuses rsudo, m-os services when suitable, native host service backend as required; future rsudo-admin menu wrapper, no immediate rsudo-admin changes.
- Product docs must live in a product repo, not solely as AI-Workflow state snapshots; use canonical L1–L8 docs before implementation and L9–L11 after authorization.

## Status and next gates
- Main phase remains `specification` (L1–L3). Architectural L4–L8 and code remain pending.
- Source code unchanged; no remote operations and no acceptance test performed.
- Must inspect exact interfaces/code of target app and obtain material architecture approval before substantive code edits.
