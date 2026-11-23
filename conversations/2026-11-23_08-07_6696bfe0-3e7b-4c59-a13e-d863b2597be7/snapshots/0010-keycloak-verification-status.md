# rsudo keycloak — validation-status checkpoint

At 2026-11-23T09:57:24+01:00

## Product status
- m-rsudo main HEAD verified `63daf253fb5ecc289f26244a9e72c1f8431f5794`; clean-slate deletion happened in prior `a4ce2acc` commit.
- Current rebuilt `rsudo-mod-keycloak.lib.sh`, clean manual, CI-independent local regression script and build.sh published. GitHub Actions `Publish immutable m-rsudo source release` on this head run 45141340172 completed SUCCESS; the specific step `Build actual package sources and verify release archive` concluded SUCCESS. That workflow does not run `.github/scripts/rsudo-keycloak-kcadm-test.sh`.
- During current turn, reconstructed GitHub source and committed local test file contents in an isolated shell directory, ran sh -n, ran local adapter test with mocked rsudo and native shell stub; output `rsudo keycloak local adapter tests: PASS` and process status 0. Local git clone was not possible due to container DNS/no GitHub access. This is LOCAL regression only, not remote acceptance.

## Work remaining
1. Wire up the new local test into existing CI (future product commit), retaining protected APISIX files untouched.
2. Run real remote SSH/sudo + official kcadm.sh against authorized test Keycloak server, validating password propagation, auth and get/create/delete resources, session, output, errors, and exit status.
3. Fix any observed issues and repeat acceptance. Declare operational success only on actual passing end-to-end evidence.
4. Known documented boundary: initial adapter consumes stdin for rsudo remote shell source and redirects kcadm stdin from /dev/null; commands needing upstream stdin not supported (accepted test criterion T12 allows explicit delimitation).

AI-Workflow issue: user expects goal-driven autonomous development not notebook-style asking for implementation details. Current bootstrap now includes stronger assistant responsibility, but system-design workflow still expressly excludes development and current version has no fully defined develop workflow.
