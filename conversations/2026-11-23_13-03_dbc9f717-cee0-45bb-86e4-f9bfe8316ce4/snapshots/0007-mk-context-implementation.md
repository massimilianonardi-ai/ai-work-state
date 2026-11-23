# mk/context — implementation milestone and verification boundary

Recorded 2026-11-23T16:00:43+01:00. Approved scope: update mk to use m-os context capabilities with punctual changes and full backward compatibility, examine every contract change, no rewrite or implicit package install.

Published source revisions:
- m-os/master `359469c59633f90c5f81e7825712544a15467c37`: `bin/sys/context-run` isolates context selection, reboots m using validated envelope, and queries provider-pin requirements, falling back to pkg default. Updated manual, README and POSIX smoke.
- m-mk/main `9475f8a1785772532becd4f877f243c26ab1a2a6`: optional v2 `context` array, project-boundary reentry, inherited environment for projects without field, selected-provider read-only requirement verification with old-m-os fallback, dependency chain preserved, watch trigger delegated to project context. Root `mk.json` exports `test` and `test-jsc`; bootstrap scripts retained internally. Docs in `docs/context-integration/` and manual updated.
- rumiai-dev/main `7999bf76d9d6e53616b426488633dc26dcbd9634`: normative specification updated.

Observed verification: POSIX `sh -n` and mocked `context-run` smoke PASS; JS V8 syntax PASS; mocked mk runtime cases PASS for context reentry, goal listing, v1 behavior, invalid selector refusal, dependency ancestry and watch-trigger delegation. All affected GitHub files/heads verified. GitHub combined CI statuses and PR workflow runs were empty; no real managed m-os integration or full regression suite executed. Do not claim full acceptance; source code committed only, no pkg-catalog release/install/host deployment.

Next: run `m mk test` on a configured m-os host with managed Node, plus `m mk test-jsc` when JSC installed; verify context-run selector application and provider pins, two installed runtime versions, cache invalidation, --watch cancellation, dependence chain/cycles, old and new mk.json. If regressions appear, fix within approved architecture and update affected docs; seek approval only for material contract change. Consider package release through pkg-catalog separately, not implied by source commit.
