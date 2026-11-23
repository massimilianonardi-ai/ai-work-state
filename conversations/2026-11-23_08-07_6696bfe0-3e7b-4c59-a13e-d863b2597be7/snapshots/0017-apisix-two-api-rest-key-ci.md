# rsudo apisix — user-corrected two-operation module, delivered

Timestamp 2026-11-23T12:00:57+01:00; checkpoint 17; product m-rsudo/main at `52dc0c4137ddc92755f48d1ee88a44df9c7fe6e5`.

## Authoritative user correction

The user strongly rejected the previous module's 35 legacy-like functions as unnecessary design complexity and explicitly demanded a complete clean-slate replacement, analogous to minimal rsudo keycloak. Binding public contract:

1. `rsudo apisix rest METHOD RESOURCE [BODY]` is the ONE universal REST wrapper for APISIX Traditional Admin API and reads its credential exclusively from `APISIX_KEY` in the calling environment. No implicit key lookup, CRUD helpers, mode detection, service/route helper APIs or other products.
2. `rsudo apisix key /absolute/remote/path/config.yaml` reads the admin key from that path using a selection algorithm derived from the original legacy module; prints the key to stdout so caller may use `export APISIX_KEY="$(rsudo apisix key /usr/local/apisix/conf/config.yaml)"`.
3. `rsudo-mod-apisixlegacy.lib.sh` remains byte-identical and separate for old operations, no changes to core rsudo, no a6 or new product installation, no remote service mutation.

## Product implementation and verification

- `6c14698b4b48f155152ab46c98bc295e849c4f66`: wholesale replaced main module and manual, replaced tests for exactly two APIs, updated existing Ubuntu+macOS CI workflow. Initial CI failed because verbatim legacy sed pipeline incorrectly selected `-name:viewer` when `role: admin` follows key in standard APISIX YAML.
- `7962a0a336941db617818f9b0394d79d4461e83f`: temporary CI tracing of mock credentials to isolate failing test; this failed CI was diagnostic only, no real creds.
- `4c8e8138e0d5b929dc623fe7cf9990f33baa48bf`: corrected key parser using POSIX awk, keeping the legacy intent of finding admin key in config `admin_key` list but avoiding greedy sed bug. Removed debug tracing. CI `45160923452` passed Ubuntu/macOS.
- `52dc0c4137ddc92755f48d1ee88a44df9c7fe6e5`: corrected the manual to match awk dependency. Final GitHub CI run `45161091065` COMPLETED SUCCESS on Ubuntu 24.04 and macOS, both job checks passing (syntax, simulated remote rsudo/curl rest and key, package with legacy).
- Final product GitHub file readback confirmed exactly two exported public functions `rsudo_mod_apisix_rest()` and `rsudo_mod_apisix_key()`. Private shell quoting `_rs_apisix_sq` exists but is not a public API. GitHub blob SHA of old and new `lib/sys/sh/rsudo/rsudo-mod-apisixlegacy.lib.sh` is equal, `2fe884e9d9e4d464bffdec8f7029134dcff65ce5`.
- `rest` accepts GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS; path relative to `APISIX_ADMIN_URL`, default localhost:9180/apisix/admin; optional body sent verbatim via stdin to remote curl; key delivered via rsudo stdin script and curl reads through fd3, not argv. Missing APISIX_KEY fails without trying to read config. No new software installation.
- `key` requires exactly one absolute remote config path; no fallback. It prints admin entry from admin_key list, and exits nonzero on missing/unreadable or not found. The previous hardcoded legacy sed pipeline was intentionally not copied verbatim, since that had a verified incorrect greedy selection.

## Acceptance boundary

No real rsudo SSH/sudo + APISIX Traditional server was accessed; no live end-to-end acceptance, deployment or physical server changes. Automated mocks and package build passed on both OSes. This task should not be reopened into 35 helper functions or multi-deployment-mode discovery without operator approval. Keep the two-operation contract and unchanged legacy implementation as the baseline.
