# rsudo-deploy wrapper and admin menu — design revision (checkpoint 7)

## User's latest proposed architecture
- Keep all code in existing `massimilianonardi-ai/m-rsudo`.
- `rsudo deploy <args>` remains native deployment CLI (module).
- New external `rsudo-deploy` command: with **no** operands it runs own independent menu; with operands it delegates to `rsudo deploy <args>`.
- Add exactly one `Deploy` menu entry in `rsudo-admin` that launches `rsudo-deploy` as an external executable; no deployment-specific menu implementation in rsudo-admin.
- Shared deployment core is used by CLI and menu; avoid duplicated operations.
- Prior preference for rsudo-admin-contained deploy menu is superseded by this user proposal.

## Source analysis and integration constraints
- Existing `bin/sys/rsudo-admin` has a static `menu` with four entries, so an external command menu action is a small change.
- Existing `m-rsudo/build.sh` has explicit binary/module inclusion lists; packaging updates required.
- `rsudo.lib.sh` validates remote host/password *before* module dispatch, and dispatches module only when `# >= 2`. Pure local `rsudo deploy <args>` without remote credentials therefore requires a narrowly scoped change, or a deliberately credential-requiring contract for those direct CLI calls; avoid inadvertently bypassing checks for remote effects.
- Current `rsudo-admin` decrypts credential file using `encoded_file_eval` into non-exported shell variables. A new external child command cannot inherit those variables automatically. To retain separation, `rsudo-deploy` must independently load the same trusted encrypted file (possible repeat passphrase prompt); do not export secrets or create plaintext temporary files. If launched with arguments, wrapper may load in its shell then call the in-process rsudo function after initializing m environment.
- Prefer fail-closed credential/group/target validation: current `rsudo --load file:group` warns and falls back to current environment on failed decrypt.
- No new SSH mechanism, no new package or plugin framework.

## Status
- Architectural proposal is assessed positively but **not explicitly approved** and code writes not authorized.
- No changes to m-rsudo/servers. Conversation persistent checkpoint only.
- AI-Workflow phase: specification (L2-3, L4 positioning option), architecture still pending gate.
