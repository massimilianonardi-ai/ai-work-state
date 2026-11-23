# New objective: reimplement rsudo apisix using same thin native-CLI wrapping method

Timestamp 2026-11-23T11:14:12+01:00
New distinct objective in current conversation, no task records linked to conversation branch. Previous rsudo keycloak development and CI remain committed in m-rsudo/main at `83e63d02f5a3f44ce5d02b92c1879931c551424c`.

## User ask and material design discovery

User: 'adesso reimplementiamo da zero il modulo rsudo apisix secondo la stessa modalità.' Relevant preceding agreement: minimize proprietary logic, reuse rsudo SSH/sudo + stdin/heredoc, transparently invoke a dedicated existing CLI, passing auth via tool-supported environment; separate wrapper namespace from later helpers. Previous protection when cleaning Keycloak: do not edit `lib/sys/sh/rsudo/rsudo-mod-apisixlegacy.lib.sh` and `res/sys/manual/rsudo-mod-apisix.lib.sh` in Keycloak work (reserved for other developments). Current APISIX development could be that future work, but no files were changed in this turn.

Verified m-rsudo main module `lib/sys/sh/rsudo/rsudo-mod-apisix.lib.sh` has ~33.5KB of legacy forwarding, runtime discovery and Admin API routines, which are not an approved reusable foundation. Main APISIX manual describes various operations and known interim limitations. Dispatch maps `rsudo apisix a6 <args>` to `rsudo_mod_apisix_a6` with no core change. Need decide which APISIX purpose is targeted.

Official Apache APISIX native `apisix` executable provides process management (version/help/init/start/stop/quit/reload/test/restart), NOT routes/upstreams/services/consumers; these use Admin API. Source https://apisix.apache.org/docs/apisix/admin-api/ and https://docs.api7.ai/apisix/reference/apisix-cli

API7's separate Apache-2.0 `a6` CLI (not an Apache Software Foundation release, not built into APISIX) supports resource CRUD, contexts, declarative sync, diagnostics, route/upstream/service/consumer etc; needs APISIX 3.x and installation on remote rsudo execution host. Source https://github.com/api7/a6 ; docs https://github.com/api7/a6/blob/main/docs/user-guide/configuration.md. Supports A6_SERVER and A6_API_KEY env override, A6_CONFIG_DIR optional.

## Minimal proposed public interface (NOT YET APPROVED)

`rsudo apisix a6 <args>` maps to a minimal new `rsudo_mod_apisix_a6` forwarding args, A6_SERVER and A6_API_KEY through rsudo stdin to remote a6 executable. Proposed mandatory env `RSUDO_APISIX_A6_PATH` (absolute remote path) analogous to Keycloak. No custom REST, JSON, token handling, discovery or CLI normalization. a6 remote host must reach APISIX Admin API and APISIX version compatibility must be checked. Preserving stdout/stderr and exit code; initially stdin used for remote script as in kcadm. Simplified helpers optionally added separately later, not scope.

Consequential choice remains: user may actually intend native process lifecycle CLI rather than resource Admin API CLI; this changes public behavior, external dependency, required APISIX version. Recommend a6 for continuity with existing APISIX administrative resource functionality; native `apisix` could be separate eventual entrypoint. Do not destructively rewrite main module or delete APISIX legacy before resolving this operator-owned outcome choice, and inspect protected files before any changes. Previous Keycloak changes to product are not evidence of APISIX acceptance.
