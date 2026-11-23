# rsudo keycloak — confirmed specifications and simplification review

At: 2026-11-23T08:57:59+01:00
Project: massimilianonardi-ai/m-rsudo
Phase: specification; no implementation authorized.

## APPROVED by operator, checkpoint 3

1. Product objective from checkpoint 2 approved, plus an environment variable to specify the path to `kcadm.sh` ON THE SSH/sudo remote execution host. Environment variable exact name has not been approved. Working proposal: `RSUDO_KEYCLOAK_PATH` (locally set to a remote absolute executable path).
2. Expose native `kcadm.sh` command syntax as `rsudo keycloak <command> <args>`; favor simplicity and assess removal of redundant features. No custom CRUD verbs or Keycloak REST/OAuth client.
3. Remote execution (option A) approved: operator workstation -> existing rsudo SSH/sudo -> installed remote `kcadm.sh` -> independent Keycloak HTTP server.
4. rsudo core is already extensively used and validated: rely on its existing noninteractive stdin/heredoc mechanisms, do NOT redo rsudo general transport tests. RSUDO_PASSWORD unrelated to Keycloak password design. Test only new module integration, especially output, status and safe transfer.
5. Password authentication via `KC_CLI_PASSWORD` in kcadm process environment. No restriction on newline characters; shell environment variables permit newlines. Transport implementation must preserve bytes faithfully (except NUL, not representable in POSIX process environment). No secret in command line or logs.
6. All public CLI contract requirements (F01-F10), initial acceptance tests (T01-T12) and out-of-scope boundaries from previous assistant turn explicitly approved, read consistently with these corrections. Tests are end-to-end Keycloak integration not unnecessary retesting of rsudo implementation.
7. Legacy Keycloak implementations are regarded as failures; no use as baseline, defer deletion to separately authorized work.

## Verified upstream

Keycloak current official server admin documentation confirms `kcadm.sh`, `KC_CLI_PASSWORD` environment fallback when --password omitted, `config credentials` saved configuration and `--no-config` each-invocation login. `--config` selects alternative auth session file. See https://github.com/keycloak/keycloak/blob/main/docs/documentation/server_admin/topics/admin-cli.adoc

## Simplification recommendations (not separately approved)

- Let upstream kcadm do config credentials, authentication, token refresh, CA/truststore, REST, parsing, error meanings; remote wrapper need only runtime executable path resolution, exact arg forwarding, stdin transfer of KC_CLI_PASSWORD, exec and exit status.
- No automatic login, no forced --no-config, no home modification, no Keycloak server URL/realm variables, no CLI discovery, no installation, no fallback executable search when explicit env is mandatory, no custom response schema and no retry logic.
- Password env may be unset for operations not requiring credentials (help or authenticated config already present). Do not invent password handling on behalf of upstream.
- Existing m-rsudo dispatcher resolves command `rsudo keycloak foo` to function `rsudo_mod_keycloak_foo`; this is the remaining integration architecture challenge: identify least invasive way to forward all official kcadm commands without modifying proven rsudo core or retaining legacy forwarders. Compare small forwarding wrappers versus minimal generic dispatch extension; decide in architecture phase. Avoid claiming full arbitrary subcommand passthrough until solved.

## Pending minor decisions

- Final environment name (`RSUDO_KEYCLOAK_PATH` proposed), policy when missing/invalid, whether fallback to PATH allowed; favor fail early when mandatory.
- Minimize wrapper mechanism while preserving built-in rsudo dispatcher compatibility, including command aliases with hyphens and --help.

Specification substantially complete; no code edits, no server changes, no product repository commits authorized.
