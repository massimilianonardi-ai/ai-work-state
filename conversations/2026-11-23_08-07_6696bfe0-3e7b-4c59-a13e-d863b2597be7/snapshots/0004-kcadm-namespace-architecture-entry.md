# rsudo keycloak — specification accepted; architecture phase open

At: 2026-11-23T09:12:01+01:00
Repository for future development: massimilianonardi-ai/m-rsudo
No product code edits authorized or executed.

## Approved user-facing contract

- Public syntax for native Keycloak CLI: `rsudo keycloak kcadm <args>`, forwarding all remaining args unchanged to the official remote `kcadm.sh`.
- This name separates universal wrapping from possible future Keycloak-specific simplified functions under `rsudo keycloak <simplified-function> <args>`, which are NOT in current product scope.
- `RSUDO_KEYCLOAK_PATH` is a mandatory environment variable containing the executable path on the remote rsudo SSH/sudo host; absent, empty, or not usable => clear failure. No automatic path discovery, fallback to PATH or arbitrary defaults.
- `KC_CLI_PASSWORD` provided in operator environment, transmitted confidentially via existing noninteractive rsudo stdin/heredoc mechanisms to remote `kcadm.sh` environment; preserve newlines, no needless password constraints. Distinct from `RSUDO_PASSWORD`, which rsudo itself manages and must not be redesigned or retested.
- Let kcadm itself handle credentials/session, config credentials, tokens, --no-config, server realm selection, syntax, error reporting. Don't build a separate REST/OAuth/admin engine.
- Runtime: SSH/sudo handled by rsudo, then official kcadm on selected remote host; Keycloak server may be elsewhere. Exactly forward argv, stdout, stderr and exit code. Run module tests end-to-end against official CLI, without redundant general rsudo infrastructure tests.
- Previously failed m-rsudo Keycloak implementations must not be relied upon; remove them only under separate future authorization. No new installation, server changes, product repository commits, or code changes authorized now.

## Verified integration fact

Current m-rsudo dispatcher maps `rsudo keycloak kcadm` to `rsudo_mod_keycloak_kcadm` without changing rsudo core; the current `rsudo-mod-keycloak.lib.sh` has no existing `rsudo_mod_keycloak_kcadm`. It does source the legacy module unconditionally; architecture must ensure new kcadm execution is independent of failed legacy mechanisms while honoring deferral of old-code deletion.

## Current phase and open architectural questions

System-design specification gate has enough explicit approvals, integration boundaries, acceptance criteria to transition to `architecture`, not implementation. Architecture still needs a minimal secure transport realization over existing rsudo stdin/heredoc, with exact preservation of optional kcadm stdin usage where applicable; secure exact args/exit/output forwarding; isolated legacy dependency; and robust remote executable resolution without discovery.
