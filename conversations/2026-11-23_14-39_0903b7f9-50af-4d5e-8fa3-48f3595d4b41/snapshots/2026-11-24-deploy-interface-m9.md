# rsudo deployment integration milestone — checkpoint 9

## Operator decisions and critical correction
- Operator explicitly APPROVED `m-rsudo` architecture: `rsudo deploy <args>` for native CLI; `rsudo-deploy` executable runs its own menu without operands and forwards CLI args otherwise; `rsudo-deploy.lib.sh` is source-only; `rsudo-admin` adds just one menu entry invoking the sourceable library in a subshell.
- Operator emphasized that rsudo credential management (encrypted credentials, shell group state, unattended operation and SSH/sudo access) is a long-tested daily-used product contract. DO NOT redesign, question or generally retest rsudo credential mechanics; the new subsystem exists by reusing them. Previous speculative pre-auth dispatcher change is withdrawn.
- New integration checks can verify only the NEW interface boundary (sourcing and unexported shell-variable inheritance), not the internal rsudo credential model.

## Actual delivered product, source evidence
- Repository: `massimilianonardi-ai/m-rsudo`, branch `main`, verified HEAD `05d1b08791a3f85c47b619a2f1169edbe5953332`.
- New `bin/sys/rsudo-deploy`: sourceable menu entry without args, `exec rsudo deploy "$@"` with args. The no-args path loads `rsudo.lib.sh` (existing m-core credential dependencies) then `rsudo-deploy.lib.sh`.
- New `lib/sys/sh/rsudo/rsudo-deploy.lib.sh`: definition-only menu, uses m-term `menu`, synthetic group-name selection, and trusted existing `encoded_file_eval` to load encrypted file within menu shell context.
- New `lib/sys/sh/rsudo/rsudo-mod-deploy.lib.sh`: native `rsudo deploy help` entrypoint only (resource operations explicitly not implemented).
- `bin/sys/rsudo-admin`: minimal Deploy choice and one function invoking the sourceable menu inside subshell using selected m-rsudo library directory. Existing credential functions untouched.
- `build.sh`: explicit new executable and libraries included; no release/tag published; immutable v0.1.3 preserved.
- `tests/deploy-entrypoints.sh` and dedicated CI workflow added. CI run `https://github.com/massimilianonardi-ai/m-rsudo/actions/runs/45345542189` passed on Ubuntu 24.04 and macOS-latest for syntax, source-only load, wrapper argv, synthetic unexported group from admin into menu, standalone menu exit and package build. NO network SSH/sudo or cryptographic re-testing.
- 11 short product-facing docs in `doc/deploy/`, plus manuals under `res/sys/manual/`: objectives, requirements, use cases, acceptance, architecture, interfaces, decisions, tests, execution-plan, supervision, overview.
- Only first entrypoint integration slice completed. No JSON schema/model, status/plan/apply, production changes or remote operations implemented. No code in `rsudo.lib.sh` modified.

## Current phase and next steps
- Route develops usable product, principal phase `implementation` for approved interface slice, with one verified milestone; next undertake `specification/architecture` for actual deployment resources before modifying resources.
- Next technical task: formalize directory JSON model with resource IDs/references, desired/observed states, dependency/consistency and credential references; present choices/risks for operator approval when material. Then implement read-only vertical use case, and targeted admin actions only after accepted contracts. No need to ask again to approve the previously settled interface.
- Milestone output real, but full deployment product is NOT complete or accepted. 
