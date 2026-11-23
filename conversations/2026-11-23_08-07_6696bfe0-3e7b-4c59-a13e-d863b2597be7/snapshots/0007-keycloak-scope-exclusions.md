# rsudo keycloak — corrected cleanup scope for clean development

At: 2026-11-23T09:31:26+01:00
Phase: architecture, no code changes authorized/performed in m-rsudo in this checkpoint.

## Binding current user decisions

- The primary source `lib/sys/sh/rsudo/rsudo-mod-keycloak.lib.sh` and manual `res/sys/manual/rsudo-mod-keycloak.lib.sh` MUST be deleted and recreated from zero, with no reuse of existing contents.
- DO NOT TOUCH the following files in the cleanup or module redevelopment; they are owned by other development work:
  - `lib/sys/sh/rsudo/rsudo-mod-apisixlegacy.lib.sh`
  - `res/sys/manual/rsudo-mod-apisix.lib.sh`
- Preserve the whole existing APISIX subsystem and its Keycloak-linked APISIX functionality rather than applying the prior too-broad policy to erase every literal mention of Keycloak across m-rsudo.
- The earlier instruction to eliminate failed Keycloak implementations before new development still applies to Keycloak's own legacy source and manual: `lib/sys/sh/rsudo/rsudo-mod-keycloaklegacy.lib.sh` and `res/sys/manual/rsudo-mod-keycloaklegacy.lib.sh`. Delete those without recreating legacy files; update `build.sh` packaging references as needed to keep the new main Keycloak module and remove legacy. Do not alter unrelated modules or references unless necessary and explicitly reviewed.

## Architecture implications

- Once this limited cleanup is authorized, make a separate auditable clean-state cleanup followed by a from-scratch implementation of `rsudo_mod_keycloak_kcadm` and clean manual; never adapt old Keycloak source/manual.
- Preserve approved `rsudo keycloak kcadm <args>` and mandatory `RSUDO_KEYCLOAK_PATH`, remote stdin/heredoc transport of `KC_CLI_PASSWORD`, native Keycloak kcadm behavior, and no change to proven rsudo core.
- Remaining references to Keycloak in APISIX do NOT violate the revised clean-slate boundary; they belong to another module and are explicitly excluded from modification.
- Do not claim files deleted until product repository commit and readback verification. Current user turn is a correction to architecture scope, not authorization to start new module code.
