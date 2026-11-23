# rsudo keysix — minimal initial module

Timestamp 2026-11-23T12:32:20+01:00.

User explicitly requested near-empty new module `rsudo keysix` containing ONLY `help`, which prints module name and describes that keysix administers linked APISIX and Keycloak instances for web services protected by authentication and role-based authorization.

Product `massimilianonardi-ai/m-rsudo` branch main commit `fad7b8b49ea9b966e56013f1a66736587633ba65` added:
- `lib/sys/sh/rsudo/rsudo-mod-keysix.lib.sh`: 371 bytes with a single `rsudo_mod_keysix_help()` function using `printf`. Prints exactly:
  `rsudo keysix` plus the three-line Italian description `Amministra istanze collegate di APISIX e Keycloak per la gestione / di servizi web protetti da autenticazione e autorizzazioni basate / sui ruoli (RBAC).`
- `res/sys/manual/rsudo-mod-keysix.lib.sh`: short manual, explicitly states no admin operations yet.
- `build.sh`: appended `rsudo-mod-keysix` to module packaging names list.

No changes to the prior Keycloak and APISIX modules, rsudo core or protected legacy. Existing dispatcher automatically routes `rsudo keysix help` to function if packaged. Ran local `sh -n` and invoked sourced module `rsudo_mod_keysix_help`, output matched. Read back all three GitHub files and verified commit+HEAD. GitHub release job `45166027320` passed, APISIX CI job `45166027318` passed; other jobs in progress when last checked. Product is a help-only stub, intentionally not yet linked to real systems.
