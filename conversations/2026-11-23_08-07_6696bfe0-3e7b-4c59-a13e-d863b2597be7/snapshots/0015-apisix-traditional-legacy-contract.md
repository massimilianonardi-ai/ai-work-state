# rsudo apisix — Traditional only, legacy preserved

At 2026-11-23T11:35:49+01:00.

## User-approved decisions

- Only APISIX Traditional (etcd-backed with native Admin API on same node). No Standalone file/API or Decoupled support in new rsudo apisix module.
- Retain current administrative legacy behavior, command compatibility and legacy implementation (`lib/sys/sh/rsudo/rsudo-mod-apisixlegacy.lib.sh`) unchanged, available as `rsudo apisixlegacy ...`.
- Rebuild `lib/sys/sh/rsudo/rsudo-mod-apisix.lib.sh` from scratch, preserving public operations (CRUD and helper functions) formerly delegated to legacy where applicable. Do not alter APISIX legacy library; no a6/new software installations. Use existing rsudo SSH/sudo transport and existing curl/Admin API where necessary. Treat secure credentials, quoting, error propagation, use-case parity as engineering obligations.
- The original APISIX manual is likely subject to this development; previous no-touch restriction was in Keycloak cleanup context. Do not make incidental changes while specifications are being clarified; preserve relevant contracts.

## Verified m-rsudo repository facts

At m-rsudo main `83e63d02f5a3f44ce5d02b92c1879931c551424c`, the main `rsudo-mod-apisix.lib.sh` begins with a compatibility bridge sourcing `rsudo-mod-apisixlegacy.lib.sh` and forwarding ~36 legacy APIs (set_auth_vars, key, keyset, api/get/put/post/del, create/delete service/upstream/route etc). The same main module also contains extensive nonlegacy `mode`, `inspect`, `runtime`, `admin_read` logic supporting multiple deployment modes; these do not belong in the replacement focused on Traditional.

Legacy library `rsudo-mod-apisixlegacy.lib.sh` is approx 15037 bytes with original admin-key discovery and curl-based Admin API functions and Keycloak-related authn/authz route helpers. `build.sh` already includes both `rsudo-mod-apisix` and `rsudo-mod-apisixlegacy` entries. Preserve legacy byte-for-byte; no changes in this turn.

## Next work

Develop minimal inspectable Traditional-only design for new Admin API operations, maintain compatibility from existing legacy interface, distinguish security/error/parity issues to correct in new code, keep legacy independently callable. After approved design/authorization execute replacement in separate commit, add specific tests and verify CI, then real SSH/sudo and Traditional APISIX Admin API acceptance if access granted. No product changes have been made at this point.
