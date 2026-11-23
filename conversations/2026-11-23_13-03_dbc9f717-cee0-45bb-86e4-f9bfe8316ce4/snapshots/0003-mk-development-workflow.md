# m-os development workflow — first mk experiment

Date: 2026-11-23T14:34:03+01:00

Accepted direction: `mk` is the development lifecycle orchestrator. `m` handles runtime/environment, `jsc` compiles JS/CSS, `pkg` handles published packages. No new `m run` command. Goal names are project-defined. Current supported CLI is `m mk run` in the project, or `m mk --project myproject run` elsewhere; `mk run myproject` currently selects two goals, not a project.

Product change committed in `massimilianonardi-ai/m-mk` `main`: `cf245bd964d1a8b8dfbb6cfec55aeca27ee998ca`.

Added `examples/local-jsc/`: `library` contains `modules.json`, JSC `src/greet.js`, and version-2 `mk.json` defining `build` with incremental JSC compilation. `app` contains Node `main.cjs`, `test.cjs`, and `mk.json` with `run/test` mapped to library's `build` via relative project dependency. Added `tests/example-local-jsc.sh` isolated smoke test, not wired into existing package integration suite so that JSC is not mandatory for mk package testing. Updated README.

Verification: GitHub HEAD and all ten new/changed files verified. Local JSON parse, JS `node --check`, smoke-script `sh -n` passed. Full `m mk` + real JSC execution was **not** performed here because no m-os installation is available. Run `sh tests/example-local-jsc.sh /absolute/path/to/m` in an environment with installed/default mk and jsc.

Next steps: execute real smoke test; inspect actual context and package resolution behavior; only if needed propose minimal integration improvements to mk (preserving current CLI and project schema); subsequently test browser and Electron runtimes on the same lifecycle model. Do not claim those runtime integrations are verified yet.
