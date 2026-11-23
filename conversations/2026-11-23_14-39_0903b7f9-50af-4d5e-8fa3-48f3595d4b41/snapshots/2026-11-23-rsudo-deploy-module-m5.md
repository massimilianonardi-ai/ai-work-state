# rsudo deploy module positioning — m5

Source chat 2026-11-23_14-39_0903b7f9-50af-4d5e-8fa3-48f3595d4b41, checkpoint 5. User asks whether `rsudo deploy` should replace `rsudo-deploy` if integration constraints are solved. Assistant supports the module route.

## Source findings
- `m-rsudo` dispatcher `rsudo.lib.sh` searches only paths `$m_PKG_DIR/m-rsudo@*/link/lib/sh/rsudo-mod-<name>.lib.sh`, so package-independent discovery requires an explicit controlled resolver enhancement.
- `rsudo()` currently validates remote host/user/password before dispatch and demands at least module + operation; `rsudo deploy` with no operation therefore falls to remote `rsudo_core`. Local browsing must not require connection, while remote operations must never bypass authentication.
- `rsudo-admin` holds nonexported credential groups in parent shell; calling the new module as a function via the existing `rsudo` function in its shell/subshell preserves credentials. External process invocation would not automatically inherit those variables.

## Proposed architecture pending approval
- Public command `rsudo deploy` for interactive menu, `rsudo deploy <operation>` for CLI.
- New sibling `m-rsudo-deploy` package/repository owns deployment core, JSON model, menu/CLI, resource adapters; `m-rsudo` owns the minimal resolver/local-dispatch extensions.
- No general plugin framework unless justified. Discovery must use selected installed package path, never arbitrary untrusted shell library from ambient PATH.
- Preserve existing rsudo behavior/CLI and compatibility, with explicit regression tests for original modules, credential boundaries and zero-operand local menu.
- Later add `Deployment` entry to `rsudo-admin`, calling `rsudo deploy` in a subshell sharing in-memory group state, not by exporting secrets.

No implementation authorized, no product code change or host operation. AI-Workflow principal phase specification, with L4 design alternative recorded; material architecture approval pending.
