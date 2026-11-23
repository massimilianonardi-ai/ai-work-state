# Design request — deployment administration CLI

- Chat: 2026-11-23_14-39_0903b7f9-50af-4d5e-8fa3-48f3595d4b41, branch 0, message 1.
- Active phase: specification; this is a new design objective, not an approved implementation.
- User goal: develop a POSIX-shell command to administer application/web-service deployment on Keycloak, Apache APISIX, PostgreSQL and GeoServer.
- Proposed: one modular CLI with native adapters for the four products, plus an optional application-runtime adapter; support independent resource administration and coordinated app plan/apply/status/verify.
- Proposed: declarative versioned JSON/SQL manifests; idempotent comparisons, dry-run planning, explicit ownership, dependency ordering, secure external secrets; no implicit deletion, no cross-system atomic transaction claims.
- Open consequential decision: whether the CLI operates only the four infrastructure services or also installs/starts apps on hosts; determine the actual host runtime / remote transport if latter.
- Prior m-os ecosystem: mk for development, jsc for JS compilation, pkg for distribution; no binding integration to m-os was assumed or approved here.
- No source-code changes or production operations were performed.
