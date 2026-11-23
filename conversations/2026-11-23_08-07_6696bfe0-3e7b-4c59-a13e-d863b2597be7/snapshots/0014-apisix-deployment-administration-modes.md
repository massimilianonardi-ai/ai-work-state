# rsudo apisix — configuration-mode research after explicit user rejection of a6

Timestamp 2026-11-23T11:23:36+01:00

## Binding current operator choice
User rejected proposal to use API7 a6, and all new externally installed products/tools, for rebuild of rsudo apisix. Requested summary of deployment modes and differences in administration. DO NOT use a6 or introduce additional products. User did not yet approve a replacement public CLI design. No product changes made this turn.

## Verified official APISIX modes and admin interfaces
Sources: https://apisix.apache.org/docs/apisix/deployment-modes/ ; https://apisix.apache.org/docs/apisix/architecture-design/apisix/ ; https://apisix.apache.org/docs/apisix/admin-api/ ; https://apisix.apache.org/docs/apisix/installation-guide/.

- Traditional: role traditional + role_traditional.config_provider etcd; Admin API on same APISIX gateway node (default TCP 9180); CRUD individual routes, services, upstreams etc, saved in etcd; no restart on normal resource updates.
- Decoupled: separate control_plane and data_plane roles; etcd shared; Admin API on CP, not DP. Same resource API administration as traditional, but use correct control-plane endpoint.
- Standalone file-driven: role data_plane + role_data_plane.config_provider yaml or json; full file conf/apisix.yaml (requires #END) or conf/apisix.json; hot polling/reload on change; no Admin API/etcd, administer full file safely rather than CRUD over HTTP.
- Standalone API-driven: role traditional + role_traditional.config_provider yaml; no etcd, in-memory config through dedicated GET/PUT /apisix/admin/configs using full resource-set replacement, conf_version/modifiedIndex, optional wait/digest. Designed for APISIX Ingress Controller/ADC and cautioned against direct usage without complete understanding. Does NOT provide normal per-resource Admin API CRUD semantics.
- Binary `apisix` is native process-operation CLI (version, test, start, reload, stop, quit), distinct from resource administration. Packaging via Docker/Kubernetes/Helm/package install is a deployment mechanism separate from the config/administration mode.

## Architectural implication and next step
Need design thin rsudo adapter whose common process CLI is separate from distinct native configuration interfaces: generic Admin API for traditional/decoupled, complete YAML/JSON file for standalone file-driven, state-replacement API for standalone API-driven. Assess what subset to support and how to safely identify active runtime and configuration; no self-invented discovery or assumption of a single server. Never modify etcd directly; use APISIX Admin API where appropriate. Must not install a6. Previous Keycloak work and CI successful at m-rsudo head 83e63d02; separate goal. No code edits in m-rsudo during current turn.
