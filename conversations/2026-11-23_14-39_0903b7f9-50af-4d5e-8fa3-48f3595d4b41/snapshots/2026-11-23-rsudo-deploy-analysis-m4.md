# Source study of rsudo and rsudo-admin (checkpoint 4)

## Verified existing code and boundaries

Read `massimilianonardi-ai/m-rsudo@fad7b8b49ea9b966e56013f1a66736587633ba65`: `bin/sys/rsudo`, `bin/sys/rsudo-admin`, `lib/sys/sh/rsudo/rsudo.lib.sh`, seven `rsudo-mod-*.lib.sh` modules (exec, fs, db-pg, keycloak, apisix, apisixlegacy, keysix), relevant manuals, build.sh and testlab scenario.

- `rsudo` dispatch is in-shell: `rsudo <module> <operation>` maps to `rsudo_mod_<module>_<operation>` from source found **only** under `m-rsudo@*/link/lib/sh` in active package PATH. A separate package cannot add `rsudo deploy` without changing this dispatch contract. `rsudo --` forces remote exec.
- `rsudo-admin` implements a static 4-entry menu (connect, browse, jobs, encrypted files), loads `rsudo.lib.sh` and uses `m-term` menu. Credentials are shell variables, discovered by prefix, decrypted/evaluated via `encoded_file_eval`; not necessarily exported to child processes. Existing connect and browse operations use subshell and selected rsudo group.
- Credential edge: in rsudo.lib.sh, `--load file:group` warns and can fall back to existing shell state after decrypt failure, and invalid/missing groups may leave stale host state. **rsudo-deploy must fail closed** on decryption failure, unknown group and mismatched host; use direct encoded_file_eval after explicit trusted file selection then `rsudo --load :group` in an operation-local subshell.
- `exec inject` transfers trusted remote shell source, not general application stdin. `fs` does tar get/put staging with non-atomic replacement; destructive delete available. `db-pg` has psql/getdb/putdb/createdb/dropdb/resetdb and online/offline/rename; can impact live connections. `keycloak kcadm` requires explicitly configured remote executable and does not forward caller stdin. `apisix rest/key` limited to APISIX Traditional and BODY argv may leak to logs. `keysix` is help-only. `apisixlegacy` is not suitable as safe new base.
- No native rsudo modules for GeoServer, nginx/OpenResty, DNS, TLS or generic host package management verified in this repository; orchestration should use supported rsudo primitive commands or future explicit adapters.
- Read m-core `enc.lib.sh` and m-term `menu.lib.sh`; examined m-rsudo package presence in pkg-catalog and m-rsudo testlab scenario. No live privileged SSH/sudo test performed.

## Proposed positioning and incremental integration — not yet approved

- New sibling source repository and m-os package: `m-rsudo-deploy`; command: `rsudo-deploy`.
- Keep command source, versioned data directory `deployment/`, and encrypted creds file distinct.
- Build CLI/menu over common controller; use m-rsudo modules and in-process rsudo library, m-core encryption, m-term UI. No rewrite of rsudo SSH/sudo or a new plugin system.
- Include a callable `rsudo_deploy_main` library entrypoint from day 1. In future add static rsudo-admin menu item which loads this library from a selected package view and calls inside subshell, inheriting non-exported credentials safely. Do not assume launching an external executable inherits them.
- Stepwise implementation proposal: docs/contracts → independent read-only CLI/menu JSON → credential and testlab read checks → targeted safe mutations → optional rsudo-admin menu integration.
- User's immediate request was source investigation and placement, not implementation. No product repo created, no source file modified.

## Interim documentation output

Six small Markdown research documents created as a conversation artifact (ZIP `rsudo-deploy-study-v01.zip`). Not yet published to a product repo; keep implementation architecture status proposed and avoid mistaking state snapshot for product documentation.

## AI-Workflow

Principal phase remains `specification` (source-boundary investigation under L2/L3, an L4 positioning alternative proposed). Before code, formalize L1-L3 and present complete, reviewable architecture synthesis; require approval only for material product choices, not routine implementation details.
