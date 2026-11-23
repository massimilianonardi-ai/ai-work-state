# rsudo-deploy integration positioning (checkpoint 6)

## User-proposed architecture
- Develop in the existing `massimilianonardi-ai/m-rsudo` repository.
- Implement deployment CLI as the native `rsudo deploy <operation>...` module.
- Add a Deploy menu in existing `rsudo-admin` as the interactive interface, using exactly the same core operations as CLI.
- This supersedes earlier preferences for a separate repository and for a separate `rsudo-deploy` executable. Latest user message is a request to assess, **not implementation authorization**.

## Evaluated against actual m-rsudo source
- Current `_rsudo_module_lookup` resolves `rsudo-mod-<name>.lib.sh` only from active m-rsudo package `link/lib/sh`, therefore same-repo solution works without modifying general module lookup. `rsudo deploy <verb>` will resolve `rsudo_mod_deploy_<verb>`.
- `bin/sys/rsudo-admin` contains a static menu, adding a Deploy action is limited in UI code. Its shell stores nonexported encrypted credential groups, inherited in a subshell function call.
- `build.sh` explicitly lists library modules and copies a flat set to packaging root; add module and any new helper libraries to build/package recipe with source-safe relative loading.
- Current `rsudo()` insists on nonempty remote host/user/password **before** checking module; requires at least two operands to dispatch. Therefore offline local CLI reads and `rsudo deploy` without a verb are **not** automatically supported. Proposed: main menu lives in rsudo-admin; no-verb rsudo deploy can show usage/error; if offline CLI desired, an isolated, regression-tested local-dispatch accommodation is needed or alternative safe internal entrypoint. Preserve remote authentication, existing module semantics and command compatibility.
- Suggested code ownership: `rsudo-mod-deploy.lib.sh` thin CLI adapter; separate internal `deploy/` libraries for JSON parsing/model, resources/operations and UI; rsudo-admin UI calls shared library operations. Avoid new plugin framework, extra package, duplicated ssh/sudo or menu-specific business logic.
- Risk trade-off: single repo/package increases coupling/release size, but reduces actual integration complexity; internal modularity permits extraction later if justified.

## Open design/verification gates
- Formalize L1–L3 use cases, acceptance including offline view, menu, credentials and direct CLI; decide exact behavior of `rsudo deploy` without args and how offline local commands work without expanding rsudo remote privileges.
- Inspect package projection to ensure internal subdirectory packaging works; run rsudo baseline regressions, new menu/module source tests and authorized remote testlab before implementation acceptance.
- No code changes or operations performed. Main workflow phase specification; material architectural choice recommended, not yet approved.
