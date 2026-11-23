# Read-only audit: rsudo keycloak and rsudo apisix

At 2026-11-23T12:12:13+01:00, product main `52dc0c4137ddc92755f48d1ee88a44df9c7fe6e5`.

User requested a concise behavior explanation and audit for excess complexity. No product code changes authorized or made.

## Keycloak implementation

`lib/sys/sh/rsudo/rsudo-mod-keycloak.lib.sh` (83 lines, 1,913 bytes), exports `rsudo_mod_keycloak_kcadm` and private `rsudo_mod_keycloak__shell_quote`. It validates mandatory absolute `RSUDO_KEYCLOAK_PATH`, optionally transports local `KC_CLI_PASSWORD`, reconstructs CLI argv preserving quotes/newlines, generates a remote POSIX shell script over noninteractive rsudo stdin, tests remote executable, and execs official `kcadm.sh`. kcadm owns authentication and sessions. Caller stdin unavailable/redirected to /dev/null; interactive prompts unavailable. Mock-only CI, no validated real SSH/sudo or Keycloak end-to-end.

## APISIX implementation

`lib/sys/sh/rsudo/rsudo-mod-apisix.lib.sh` (206 lines, ~5KB) exports only `rsudo_mod_apisix_rest` and `rsudo_mod_apisix_key` plus private `_rs_apisix_sq`. `rest METHOD RESOURCE [BODY]` validates HTTP verb/resource and mandatory `APISIX_KEY`, optional `APISIX_ADMIN_URL` default loopback 9180, sends a generated remote shell script through rsudo stdin to curl; curl reads key from file descriptor 3 via `--header @/dev/fd/3`, body from stdin; returns headers/body on success, curl errors on 4xx+. `key /absolute/path/config.yaml` runs remote awk to extract entry named admin from APISIX admin_key YAML block and prints it to stdout for caller to capture in APISIX_KEY. It does not set env itself; rest never reads key automatically. Legacy module unchanged and independently callable. No support for standalone or decoupled modes by contract.

## Complexity judgments and actual risks

- Public API is minimal, but scripted remote code and POSIX shell quoting are roughly half the complexity. Do not delete them casually: they prevent shell injection and keep password/key off remote process command arguments.
- Two separate quote encoders implement similar logic; reasonable consolidation may simplify, if tested with existing rsudo environment and preserving secret handling. The APISIX key parser is a substantial block and only recognizes some YAML layouts, not a standards-complete YAML parser; could reject valid key forms or select incorrectly in atypical configs.
- Both modules take rsudo stdin to transfer a remote program. They cannot also forward caller stdin and do not support interactive CLI prompts. Keycloak deliberately redirects stdin from /dev/null.
- Secrets still exist in the generated stdin script and remote shell memory; not absolute secrecy. APISIX BODY is passed as a public module command argument; the existing rsudo dispatcher logs `args "$*"` at debug, so a JSON BODY containing secrets is potentially exposed in shell history/logs even though APISIX_KEY itself is not an argument. The key operation prints admin key to stdout intentionally; capture it safely rather than displaying it.
- APISIX rest limits verbs to GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS and accepts only relative Admin API paths with optional single BODY string; not arbitrary curl flags or caller stdin. Curl `--fail --include` returns 22 on HTTP 4xx/5xx but does not preserve useful error response body in general.
- Neither module confirms a real remote runtime; both have mock-based CI. Mock passing is not equivalent to live SSH/sudo with Keycloak or APISIX.

Recommendation for future work (not authorized here): keep two APISIX APIs/one Keycloak API, preserve security correctness, consolidate tested shell quoting if useful, reduce YAML parsing brittleness, strengthen tests around errors and the actual rsudo dispatcher, and resolve APISIX body logging before using sensitive JSON payloads. Do not add CRUD helpers or new products. Operator can choose whether to authorize changes.
