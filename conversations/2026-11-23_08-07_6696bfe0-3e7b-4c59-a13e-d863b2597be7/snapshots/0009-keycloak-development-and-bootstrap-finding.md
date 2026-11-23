# rsudo keycloak — independently executed development, pending real acceptance

At 2026-11-23T09:48:07+01:00. Conversation branch 0, checkpoint 9.

## Explicit user request

Operator suggested implementation of the approved `rsudo keycloak kcadm <args>` via existing rsudo+heredoc and questioned whether AI-Workflow inappropriately turns end-to-end project delegation into an interactive notebook requiring user to decide every technical implementation detail. User asked to identify counterproductive instructions.

## Verified critique of AI-Workflow

- Read current ai-workflow/bootstrap.md and workflows/system-design.md. Bootstrap encourages autonomy, fact checking, scoped approvals and continuity. It does not mandate approvals for routine implementation details.
- The only fully specified current workflow is system-design, whose out-of-scope line explicitly excludes implementation; there is no fully specified development lifecycle. This creates a real handoff/continuation gap for goal-driven delivery.
- Prior behavior wrongly sought approval for routine engineering mechanisms; recommend a result-oriented development method that carries approved work through implement/test/fix/verify and escalates only consequential changes and external operations outside authorization.
- No changes were made to ai-workflow rules repo; recommendation only.

## Actual m-rsudo changes and readback

1. Commit `a4ce2accecb0631729f6177b8ce095d4848979d7`: deleted four old Keycloak source/manual files (main and legacy) and temporarily removed Keycloak packaging entries. Verified Git tree absence of four deleted paths, updated build.sh readback, and two forbidden APISIX files still present.
2. Commit `63daf253fb5ecc289f26244a9e72c1f8431f5794`: recreated only main `lib/sys/sh/rsudo/rsudo-mod-keycloak.lib.sh` and `res/sys/manual/rsudo-mod-keycloak.lib.sh` from scratch; added `.github/scripts/rsudo-keycloak-kcadm-test.sh`; restored only new Keycloak library in build.sh. All changed files and Git HEAD verified. Legacy paths remain absent. No rsudo core or APISIX files changed.

## Implementation properties

- Function `rsudo_mod_keycloak_kcadm` uses mandatory absolute remote `RSUDO_KEYCLOAK_PATH`, rejects missing or relative values; on remote checks executable file permissions.
- POSIX shell quoting routine safely wraps arbitrary args and KC_CLI_PASSWORD including embedded single quotes and newline/trailing newline. Remote script is transported as stdin of recursive `rsudo` in forced noninteractive mode, avoiding password in ssh/sudo argv. Remote shell exports `KC_CLI_PASSWORD` only if set locally; then `exec`s path with original args and preserves stdout/stderr/status.
- No new REST/OAuth client; leverages native kcadm authentication/session functions.
- Adapter reserves stdin to transfer script and explicitly redirects kcadm stdin from /dev/null. This is a consciously documented constraint accepted under test criterion T12 (support or explicitly delimit stdin). Native stdin-consuming kcadm operations are not supported by this initial adapter.
- Local shell validation run: `sh -n` succeeded on equivalent local candidate; mocked rsudo remote /bin/sh and kcadm tests passed for quoting/newlines/metacharacters, empty and absent passwords, missing and relative executable path, remote absent executable, argv preservation, and propagation of error code. A repeat test covered actual apostrophes in argument and password. Committed test file was read back and reviewed but not run via GitHub CI yet.

## Remaining evidence/gates

- No authorized real SSH/sudo Keycloak server was available from current tools; acceptance T01-T12 not end-to-end verified. Build/package and committed scripted test are not proven by CI run. Product is implemented but NOT operationally accepted.
- The correct next agent action is run committed local test and build checks in an actual m-rsudo environment, then an operator-authorized real SSH/sudo + Keycloak test, fix defects automatically and report verified outcomes. Do not call product production-ready until these pass.
- Do not touch user-protected APISIX files. Don't accidentally reintroduce deprecated Keycloak files or custom admin clients. Do not modify AI-Workflow repo absent explicit authorization.
