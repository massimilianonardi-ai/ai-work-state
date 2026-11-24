# Sourceable deployment menu design assessment — checkpoint 8

## User's proposed revision
- Develop in existing `massimilianonardi-ai/m-rsudo`; CLI remains `rsudo deploy <args>`.
- Make deployment menu a sourceable library `rsudo-deploy.lib.sh`; `rsudo-admin` sources the library and calls a function in a subshell instead of executing external `rsudo-deploy`.
- Consider thin `rsudo-deploy` executable sourcing library and invoking menu with no arguments, forwarding args to `rsudo deploy <args>`.
- Consider eliminating standalone executable if it provides no practical value.

## Analysis grounded in current sources
- Inspected `m-rsudo/main@fad7b8b49ea9b966e56013f1a66736587633ba65`: `bin/sys/rsudo-admin`, `lib/sys/sh/rsudo/rsudo.lib.sh`, package README, etc. `rsudo-admin` currently decrypts credential source via `encoded_file_eval`, keeping named groups as non-exported shell variables. A spawned external shell does not inherit those; a sourced library called inside a POSIX subshell `( . "$lib" && rsudo_deploy_menu )` does, with menu-local changes isolated from admin parent. Checked the inheritance property using local POSIX sh.
- Prefer separate dedicated sourceable library `rsudo-deploy.lib.sh` with side-effect-free definitions and `rsudo_deploy_menu` entrypoint. Avoid dual executable/sourceable shell script because auto-run detection, exits, traps, positional args and environment side effects are fragile.
- Prefer KEEP a tiny public `bin/sys/rsudo-deploy` executable for standalone menu; with args it forwards to `rsudo deploy "$@"`, subject to m runtime setup. In the no-args path, source the same selected installed library and enter menu. Avoid duplicating business logic.
- `rsudo-admin` adds one menu item, resolves library only in selected `m-rsudo` package context, and calls source+menu inside subshell, not launching an executable, not exporting credential variables or introducing IPC.
- The standalone menu, started from a new process, cannot access credentials from admin; load same trusted encrypted file explicitly when needed, fail closed.
- `rsudo()` currently validates host/password before module dispatch; `rsudo deploy <args>` for local config/status without credentials is blocked until narrow safe dispatch change. This is independent of sourceability. Preserve all existing remote authentication paths.
- Static source inspection and local POSIX sh inheritance test only; no integrated implementation tests or live remote operations.

## Recommendation / scope
This architecture is assessed as preferred, with the binary kept only as a thin convenience public entrypoint, not a second controller. No product code changed, user architectural approval still pending. Maintain AI-Workflow phase specification and prepare formal L1-L4 documentation after gate.
