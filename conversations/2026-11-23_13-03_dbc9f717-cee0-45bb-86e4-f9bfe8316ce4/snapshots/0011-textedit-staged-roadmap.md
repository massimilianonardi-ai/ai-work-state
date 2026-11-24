# TextEdit real-world validation — proposed execution roadmap

2026-11-24T09:00:30+01:00; current conversation checkpoint 11. This is a planning refinement, not product implementation authorization. User agrees with TextEdit real-world case and proposes concrete step sequence; assistant supplied recommendations that remain open for operator review.

Source findings:
- `m-js-core` already exports `m.text.document.Document`, `Document2D`, `RawDocument2D`, `CellDocument2D`, Flat/Piece stores, selections, and `m.json.canonicalize`.
- `m-js-extra/pocs/066-text-edit-browser-gui/canonical-gui.html` uses `../../../../lib/sys/js/core/document2d-browser.generated.js` from legacy layout and real PoC browser renderer/controller. Porting to standalone build assets is mandatory before independent release, preserving actual API compatibility.
- m-os pkg manual documents library projections for `lib/sh` and `lib/java`; no general installed-JavaScript library export/import contract established. Do not invent that installed browser/server automatically resolves pkg JS dependencies; inspect and propose minimal proper-owner change if Step 1 requires it. JS package consumed by installed web server is an acceptance gate, not merely two independent successful installations.
- `m-mk` optional project context and inter-project goal dependencies are available in source, not yet end-to-end runtime accepted on reference host.

Recommended plan:
0. Inspect actual core and PoC boundaries, identify TextEdit-specific GUI/controller library and keep document/core implementation in m-js-core; set minimal common API and packaging constraints.
1A. Create separate version-controlled TextEdit library and web service projects, `mk build/test` both and `mk run` web; real browser test with local compiled JS plus basic document operations.
1B. Release both e.g. v0.1.0 to correct distribution/catalog machinery; install into disposable m-os root; installed web package genuinely loads JS from installed TextEdit library pkg; if current pkg lacks runtime JS export, design minimal mechanism with impact review, no speculative automatic loader.
1C. Freeze installed 0.1.0; change visible string in TextEdit local source only; mk incremental rebuild propagates change to local web while installed web remains original. Verify assets/cache/ports are isolated.
1D. Release upgraded TextEdit 0.1.1 and explicitly update installed dependency, checking pinned-version behavior and installed change only after upgrade.
2. Add separate Electron desktop project/pkg, reusing EXACT TextEdit GUI/renderer, mk build/test/run + package release/install; secure Electron IPC / contextIsolation, no Node in renderer; shared one-line TextEdit change appears in both LOCAL apps but not installed apps until upgraded.
3. Add explicit direct consumer use of `m-js-core` (e.g. JSON canonicalization of real document metadata). Distinguish existing TextEdit→core dependency from new consumers→core direct dependencies. Test local/local, local/installed, installed/local, installed/installed source/package combinations where valid, runtime/class identity and version incompatibility fail closed. Avoid duplicating incompatible Document2D classes across JS bundles.
4. Final clean-machine acceptance: no source checkouts, mk or jsc required at end-user runtime, installed executable and web service, browser/Electron genuine interactions, controlled upgrade/uninstall, accurate dependency declarations and no implicit persistence changes.

Provisional packages: m-textedit (library), m-textedit-web (Node service), m-textedit-desktop (Electron app). Two app packages preferable because runtime dependency sets diverge; names provisional. Avoid shipping duplicate SOURCE m-js-core in TextEdit. If necessary include m-js-core compiled artifacts in library release until its separate JS-pkg contract is exercised deliberately; do not claim this proves independent installed m-js-core consumer resolution.

Next step: operator confirms staged plan; then inspect up-to-date source/spec and provide full design/contracts/test/compatibility synthesis before substantive code changes per bootstrap. No product files changed this turn.
