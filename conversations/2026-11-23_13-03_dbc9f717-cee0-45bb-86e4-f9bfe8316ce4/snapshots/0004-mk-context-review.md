# m-os / mk design checkpoint — test orchestration and context integration

At 2026-11-23T14:45:59+01:00 user corrected previous implementation workflow: public tests must run through `mk test`, not a user-facing `sh tests/example-local-jsc.sh ...`. Any modifications to `mk` must be explained beforehand (what/why).

Current product: m-mk/main previously added examples/local-jsc with library and app mk.json and tests/example-local-jsc.sh in commit cf245bd964d1a8b8dfbb6cfec55aeca27ee998ca. No product changes during this review.

Code verified: m-mk/lib/mk.lib.js supports goals, project dependencies, pkg facility requirements (read-only `pkg requirement resolve`), process execution with environment inherited from m bootstrap. It does not provide dedicated automatic per-project context activation. m-os/lib/sys/sh/context.lib.sh owns context selection and PATH/CLASSPATH projections; it has a shell function `context()` and inherited environment envelope validation. Project-level test goal already exists in example.

Proposed sequence for operator review: (1) remove user-facing external test script and update docs while keeping mk run/test on existing environment; (2) design public m-os execution-in-context interface in owning component, not duplicate context inside mk; (3) integrate optional mk runtime activation after approval, retaining plan/watch/dependency/incremental contracts. Do not silently install missing packages, mutate parent environment, add redundant manifest or alter JSC. No implementation authorized from this review alone.
