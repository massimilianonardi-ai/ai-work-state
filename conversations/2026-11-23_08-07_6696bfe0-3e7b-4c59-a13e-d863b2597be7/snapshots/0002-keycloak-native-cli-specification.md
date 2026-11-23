# rsudo keycloak — specification-phase checkpoint 2

Timestamp: 2026-11-23T08:18:49+01:00

## Explicitly confirmed operator requirements

- Build a complete, actually usable module named `rsudo keycloak <command> <args>` in the `massimilianonardi-ai/m-rsudo` repository.
- Native Keycloak administration CLI is mandatory: `kcadm.sh`. Prior REST-based and auth-module Keycloak implementations are considered failed and must not be reused as the basis. Removal is explicitly deferred.
- Password must be given to Keycloak through its process environment, specifically the documented `KC_CLI_PASSWORD` variable; never as a CLI password argument.
- First agree complete product objective, semantics, operating boundaries and realistic end-to-end acceptance; do not implement yet.

## Verified facts

- Keycloak official Admin CLI documentation confirms `kcadm.sh`, `KC_CLI_PASSWORD`, `config credentials` persistent config, `--no-config` stateless mode, and conventional commands get/create/update/delete/get-roles/add-roles/remove-roles/set-password.
- Current m-rsudo `rsudo.lib.sh` dispatches `rsudo keycloak ACTION` into `rsudo_mod_keycloak_ACTION` for known module functions. Current m-rsudo Keycloak module contains many obsolete legacy-forwarding functions plus OAuth `auth`; replacement may require resolving public command-name collisions without falling back.
- Existing rsudo noninteractive SSH/sudo transport prepends its own sudo-auth input line to stdin; KC_CLI_PASSWORD is a distinct secret. Any implementation must validate correct separated transfer with actual SSH/sudo, without placing Keycloak secret in argv or generated shell source.
- Upstream kcadm configuration is stored under the effective user's home by default; `--config` and `--no-config` are supported. SSH host, remote CLI host and Keycloak server can be separate.

## Proposed, not yet approved

- Make `rsudo keycloak <kcadm-command> <args>` a transparent official CLI proxy, not an invented duplicate resource-command API. For example `rsudo keycloak get realms`, `rsudo keycloak config credentials --server ... --realm ... --user ...`.
- Execute `kcadm.sh` on the selected rsudo remote sudo target, using a validated executable path, without automatic installation or Keycloak server lifecycle changes.
- Transfer operator's local KC_CLI_PASSWORD privately through stdin and place in kcadm child environment only; preserve stdout/stderr and status and support upstream config state/--no-config choices without custom OAuth logic.
- Optional independent discovery of remote CLI executable only if operator wants it; avoid conflating executable discovery with discovering Keycloak server instance.

## Material open decisions

1. Confirm remote SSH/sudo target as the place where native kcadm.sh runs (interpretation of 'local Keycloak command').
2. Confirm direct forwarding of native kcadm command set, rather than separately designed domain CRUD wrappers.
3. Decide persistent upstream kcadm config/session vs mandatory --no-config. Native flexibility preferred; protect sudo user's configuration.
4. Confirm how to select kcadm path if absent from remote PATH and whether a discovery operation is desired.

Phase specification remains active; implementation and retirement are not authorized. This snapshot supersedes the prior REST-centric tentative architectural proposal; the user's top-level outcome remains rsudo Keycloak administration.
