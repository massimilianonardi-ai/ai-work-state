# rsudo keycloak — CI integration verified

Date 2026-11-23T10:33:41+01:00. Latest product branch main commit `83e63d02f5a3f44ce5d02b92c1879931c551424c`.

## User authorization

Operator responded 'ok procedi' to the proposal to integrate the existing local Keycloak adapter test into m-rsudo CI. Scope only CI; no host/server access delegated.

## Actual product work

1. Commit `4b09ae526cd6fccdbb5fb2533aa0eb4c673ebf80` created `.github/workflows/rsudo-keycloak-kcadm.yml`, running on push to main and PR for changes to the module, test, manual, build, workflow. Uses Ubuntu 24.04 and macOS matrix, `sh -n`, `sh .github/scripts/rsudo-keycloak-kcadm-test.sh`, `sh build.sh release`, package identity and legacy absence checks.
2. Initial run `45147809470`: Ubuntu passed, macOS mock test failed silently.
3. Diagnostic run `45147921726` added temporary `sh -x` for isolated mock test only (no real secrets). macOS logs showed that test's `VAR=value shell_function` assignments leaked between calls on macOS; after intentionally assigning invalid executable path, later stub-failure check used wrong executable and got 127 instead of expected 42. Module itself passed all preceding checks.
4. Commit `83e63d02f5a3f44ce5d02b92c1879931c551424c` fixed test by executing temporary path assignments inside subshells, and removed diagnostic xtrace from CI workflow.
5. GitHub Actions run `45148052058` at final commit completed `success`. Both jobs for `ubuntu-24.04` and `macos-latest` succeeded in syntax, mocked kcadm forwarding, and package build checks. Repository commit and changed source/workflow readbacks verified.

## Boundary and next actual work

CI is complete. Integration test only mocks rsudo shell transport and kcadm stub, so it does not establish that SSH/sudo works on selected operator environment or that Keycloak authenticates and administers real resources. Pending end-to-end checks require an authorized real SSH/sudo test target with official kcadm.sh and Keycloak service. No APISIX code was modified.
