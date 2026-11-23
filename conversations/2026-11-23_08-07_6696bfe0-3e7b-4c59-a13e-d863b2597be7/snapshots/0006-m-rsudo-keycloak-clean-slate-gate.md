# rsudo keycloak — clean-slate architectural prerequisite

Updated at: 2026-11-23T09:22:28+01:00
Product repository: massimilianonardi-ai/m-rsudo
Current workflow: system-design/architecture. No implementation or cleanup performed in this response.

## Binding revision of operator direction

The operator explicitly requires **all existing Keycloak implementations and references throughout m-rsudo removed BEFORE development of the new module**. This supersedes older plan to defer removal. The new module must be from scratch, independent of all failed Keycloak implementations. Preserve approved target behavior: `rsudo keycloak kcadm <args>` native CLI on rsudo remote host; mandatory locally configured remote path `RSUDO_KEYCLOAK_PATH` (no fallback), `KC_CLI_PASSWORD` in remote kcadm process environment, reuse proven noninteractive rsudo stdin/heredoc, native kcadm auth/config/session; preserve argv/stdout/stderr/status. General rsudo code is not to be redesigned or retested.

## Verified repository inventory

GitHub m-rsudo main recursive Git tree (full, not truncated), SHA 355294bc406a3392b029283972cd9fdd59e9a1a1, contains four directly named Keycloak files:

- `lib/sys/sh/rsudo/rsudo-mod-keycloak.lib.sh`
- `lib/sys/sh/rsudo/rsudo-mod-keycloaklegacy.lib.sh`
- `res/sys/manual/rsudo-mod-keycloak.lib.sh`
- `res/sys/manual/rsudo-mod-keycloaklegacy.lib.sh`

Keycloak references in other tracked files:

- `build.sh`: source packaging list references both Keycloak libs; must remove to avoid build errors after deletion.
- `lib/sys/sh/rsudo/rsudo-mod-apisixlegacy.lib.sh`: Keycloak-specific environment variables, OIDC/UMA discovery, `authz-keycloak` plugin template, and Keycloak-specific route helpers, used by APISIX legacy functions. Must remove relevant code carefully; this can affect existing APISIX authentication-specific functions.
- `res/sys/manual/rsudo-mod-apisix.lib.sh` and `res/sys/manual/rsudo-mod-apisixlegacy.lib.sh`: Keycloak-specific usage/documentation references. Remove or adapt accordingly.
- `lib/sys/sh/rsudo/rsudo-mod-apisix.lib.sh`: no literal Keycloak name, but bridges APISIX legacy auth functions; review and remove dangling Keycloak-specific entrypoints, preserving unrelated APISIX.

Other tracked files in repository were scanned for literal Keycloak/kcadm/KC_CLI_PASSWORD references; none found. A full semantic dependency assessment remains required before cleanup claim. No user request to rewrite git history; removal means tracked files at future clean main revision, not rewriting past commits.

## Required ordered work before coding new Keycloak module

1. Produce exact deletion/edits impact list, including indirect APISIX references and functionality dependencies.
2. Execute and commit clean-slate removal as a separate, auditable change, only when work on product repository is explicitly authorized; do not mix new module code into cleanup commit.
3. Verify repo tree, text references, build/package resolution and non-Keycloak regressions (especially generic APISIX) after cleanup; document any unavoidable behavior removed due to operator directive.
4. Only then start fresh Keycloak module development, with no code reuse from old Keycloak implementations.

The architecture design phase remains open. Do not call cleanup done until readback and checks actually pass; existing state is not clean yet.
