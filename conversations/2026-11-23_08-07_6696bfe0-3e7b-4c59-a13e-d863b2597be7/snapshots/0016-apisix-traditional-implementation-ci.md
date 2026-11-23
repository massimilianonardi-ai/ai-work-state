# rsudo apisix — Traditional-only module implementation

At 2026-11-23T11:51:56+01:00. Current product repository `massimilianonardi-ai/m-rsudo` at `46bdf6c88dc58ef424ff7416f9796733f26c982c` (main confirmed with commit and GitHub Actions).

## Scope/authorization

Operator requested clean-slate APISIX module with no new installed third-party tools or a6, only Traditional deployment, retain legacy behavior and preserve actual legacy implementation. User then explicitly said 'procedi'. This was interpreted as authorization to write module and its manual/test/CI within that settled product scope. No servers were modified.

## Changes / evidence

- Commit `73b90295a75edff7a155f167da93ad13a94a9ed1` replaces `lib/sys/sh/rsudo/rsudo-mod-apisix.lib.sh` with new source independent of unchanged `rsudo-mod-apisixlegacy.lib.sh`. Rewrites `res/sys/manual/rsudo-mod-apisix.lib.sh`, adds local shell test `.github/scripts/rsudo-apisix-traditional-test.sh` and GitHub Action `.github/workflows/rsudo-apisix-traditional.yml` for Ubuntu/macOS. Four files read back exactly, legacy blob SHA verified unchanged.
- Commit `46bdf6c88dc58ef424ff7416f9796733f26c982c` adds acceptance probes for extracting admin key from custom config.yaml, using APISIX_KEY, constructing OIDC authn+Keycloak authz route. New test read back verified.
- New main module exposes exactly the same 35 public function suffixes as legacy (source-level comparison), with Traditional-only native APISIX Admin API (GET/PUT/POST/DELETE and PATCH via api), server default `http://127.0.0.1:9180/apisix/admin`, optional `APISIX_ADMIN_URL`, optional explicit `APISIX_KEY`, fallback remote config path `RSUDO_APISIX_CONFIG_PATH` or default `/usr/local/apisix/conf/config.yaml`. All operations use existing rsudo noninteractive stdin remote shell, POSIX utilities and remote curl; no a6 or new installed product. The key travels in rsudo stdin script, then curl reads it via `--header @/dev/fd/3` instead of argv; JSON travels over stdin.
- All 35 legacy public function names (including create/delete helpers and auth route builders) are present in the new source, but function-presence evidence does not by itself guarantee exact runtime equivalence for every input.
- GitHub Actions `45159763532` at final product commit completed SUCCESS, Ubuntu 24.04 and macOS, including POSIX syntax, local mock REST adapter tests, explicit key/Keycloak auth route tests, package build including new + byte-identical legacy libraries. Link: https://github.com/massimilianonardi-ai/m-rsudo/actions/runs/45159763532
- Separate local localhost Python HTTP server + actual installed curl test confirmed `--header @/dev/fd/3` and simultaneous `--data-binary @-` upload both work (not APISIX/SSH acceptance).

## Differences/limitations and next evidence

- New created-by-ID helpers use official `PUT /collection/id` not necessarily legacy's raw `PUT /collection`; user-visible result rather than exact wire should be tested against real APISIX.
- curl --fail maps HTTP 4xx/5xx to status 22 instead of legacy curl's potential zero; this can affect existing callers. Response headers still requested with --include; failed HTTP body might be suppressed by --fail.
- YAML key extraction is a limited compatibility parser, not a general YAML implementation. Prefer explicit APISIX_KEY when deployment config is customized.
- Module is Traditional-only by supported contract; it does not actively verify remote mode. No Standalone/Decoupled modes, no mode/inspect/runtime read paths from prior transitional module. Source replaces them deliberately under new scope.
- No access or operator authorization to real privileged SSH/sudo and live APISIX instance in this chat. No runtime acceptance claim. Need on-environment verification of legacy workflows including CRUD and auth routes, plus failure handling; fix any discrepancies without altering preserved legacy module.
- Product now delivered as source + CI; operation on remote remains unobserved. Do not claim deployment or end-to-end completion until real evidence.
