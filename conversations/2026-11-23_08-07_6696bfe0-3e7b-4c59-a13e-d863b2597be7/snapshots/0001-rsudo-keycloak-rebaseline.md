# RumiAI m-rsudo Keycloak redesign — context snapshot

Date: 2026-11-23T08:12:42+01:00

User outcome: redesign from first principles a usable `rsudo keycloak <command> <args>` administrative CLI; extract the user's actual directives from exported chats under `rumiai-dev/chats/m-os`, relevant handoffs, TODOs and canonical specifications. Design only: no product code, tests, deployments or protected systems were modified or authorized by this request.

Checked AI-Workflow bootstrap and system-design workflow. Current design phase is `specification`; no new canonical baseline approved.

Evidence: two Keycloak-specific chats in `chats/m-os/2026-11-04 keycloak k04` and `2026-11-06 rsudo keycloak` were read; also eleven accessible m-os HTML exports, but the oversized `2026-10-26 m context/index.html` was not fully retrievable. The archived old handoff `handoff/rsudo-keycloak-administration.md` was recovered from Git history at commit ad7e2c822ab680b2dba9d54857c465a6234cba97. Read current `specifications/rumiai-os/RSUDO-KEYCLOAK.md`, `RSUDO.md`, `SSH.md`, `KEYCLOAK-CLI.md`, pertinent documentation and `m-rsudo/main` Keycloak module and dispatcher. Old handoff records explicit abandonment on 2026-11-06 because usable public administrative commands were not delivered. A separate `m keycloak admin` CLI does not fulfill this new goal. No current active Keycloak handoff found.

User directives from past chats: practical finished-product operability, real end-to-end test through actual public command before extended refinements, robust minimal interface, strict scope; rsudo remains a composable SSH/sudo primitive; an APISIX-specific directive favors independent read-only discovery and operator-selected environment, but is not yet approved as Keycloak-specific.

Observed m-rsudo/current: `rsudo` dispatches `rsudo keycloak ACTION ...` to `rsudo_mod_keycloak_ACTION` in a projected module; the Keycloak module has compatibility forwarding and `auth`, not general public realm/user/client CRUD; old normative document's full K03-K08 interface is an unimplemented historical forward contract.

Proposed, not approved: REST Admin API over the existing SSH/sudo boundary, optional read-only discovery and explicitly operator-selected target/context, simple resource-focused shell commands plus general request escape hatch; do not automatically duplicate large OAuth-grant matrix or add Keycloak remote agent. Decide transport strategy, normal identity selection and minimum authentication path as actual specification choices before implementation. Physical privileged validation requires separately authorized disposable target.
