# Authoritative TextEdit ownership and staged migration

Updated 2026-11-24T10:04:29+01:00. User explicitly fixed final architecture and delegated migration path. This correction supersedes checkpoint 0012's incorrect reversed extraction direction, as well as earlier conflicting roadmap ownership claims.

## Required final architecture
- `m-js-core`: general JS utilities only. Remove the entire `m/text` tree and ALL TextEdit references from active sources and compilation descriptors; no dependency on TextEdit.
- `m-js-textedit`: logical TextEdit engine, all existing `m-js-core/m/text` engine sources, excluding GUI. Preserve the existing engine namespace and contracts where appropriate.
- `m-js-textedit-gui`: GUI derived from existing PoC 066, located under `m/text/ui`, consuming the TextEdit engine.
- Separate web-service/browser and Electron desktop application repositories/packages consume the common engine/GUI (working names m-textedit-web and m-textedit-desktop). Both applications later use general utilities from cleaned m-js-core directly.
- Forward-only ownership migration: no duplicated permanent implementations, no fallback to previous core ownership, no rewriting historical releases.

## Recommended migration path
1. Create final engine and GUI repos directly, verify extraction and API/test parity with existing core and PoC, then remove m/text and TextEdit references from active m-js-core (after dependency/consumer impact analysis). Build/test both libraries and web consumer via mk/jsc, release/install genuine pkg dependencies, test local library change versus unchanged installed release and explicit version upgrade.
2. Build/test/release/install Electron app using same engine and GUI, verify shared local changes and installed isolation.
3. Add direct real general m-js-core usage in web and desktop applications, testing local and installed dependencies, version selection, identity, and runtime integration.
4. Clean installed-only acceptance without developer source trees or build tools.

The user delegated path selection but requested clarification, not a code-write in this turn. Before substantive implementation, prepare inspected design and compatibility/test synthesis per bootstrap. Current answer makes no product repository changes.
