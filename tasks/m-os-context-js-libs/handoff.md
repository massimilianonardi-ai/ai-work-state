---
id: "task:m-os-context-js-libs"
status: refining
scope: "m-os / JavaScript library resolution and package integration"
subject: "m-os context js libs"
phase: specification
workflow_refs:
  - behavior/task-records.md
  - workflows/develop.md
  - behavior/specification.md
state_refs:
  - chat_id: "2026-11-23_13-03_dbc9f717-cee0-45bb-86e4-f9bfe8316ce4"
    branch_id: 0
    source_checkpoint: 15
    relation: "source conversation; task registration at checkpoint 16"
source:
  authority: "Operator's previously evidenced product decisions and current explicit task registration request; assistant delegated task partition"
  revision: "2026-11-24T13:15:53+01:00 / checkpoint 16"
---

# Handoff — m-os context js libs
Latest EV-0005; baseline v004; refining/specification.

## Approved architecture — checkpoint 8
- Application runtime view in m-os state, usable via existing launcher; reuse preparation in mk for development. Preserve installed package immutability and context-specific selection.
- Investigate symlink realization first; seriously consider hard links if incompatible. No final materialization policy, exact state location, runtime declaration or browser/Electron contract approved yet.
- NODE_PATH removal remains conditional on native resolution feasibility. No product implementation authorized beyond the approved concept until complete synthesis.

## Isolated verification — checkpoint 8
Actually executed Node v22.16.0 in temporary directories. Separate app, a and b roots; ESM app imports a, a imports b; NODE_PATH and NODE_OPTIONS removed. State view of symlinks: default failed ERR_MODULE_NOT_FOUND; preserve-symlinks-main alone failed; both preservation flags passed (a:b). State view with real directories and hard-linked regular files passed with no flags (a:b); verified shared inode, same device. Hard links require same filesystem, platform/permissions support, cannot hard-link directories; modification/chmod through a link affects original inode. Do not allow mutable view to bypass package immutability; validate ownership and write authority, development rebuild atomic replacement can stale hardlinks; no hardlink fallback selected automatically. Electron unavailable in local environment; browser/Electron and m-os launch integration not tested. Next verify runtime contract and topology, provider resolution, safe immutable view lifecycle and web public projection; propose concrete policy before code changes.

Previous runtime launcher investigation: [snapshot 0007](../../conversations/2026-11-24_14-16_2d25a3ce-52bf-4652-9cae-15df88a54824/snapshots/0007-runtime-view-launch.md). pkg/context proposal: [snapshot 0005](../../conversations/2026-11-24_14-16_2d25a3ce-52bf-4652-9cae-15df88a54824/snapshots/0005-pkg-context-proposal.md).
