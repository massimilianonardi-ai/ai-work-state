# Binding correction: TextEdit staged development

Date 2026-11-24T09:53:00+01:00; user clarified architecture and rejected assistant's early-core-dependency interpretation.

## Step 1
Create independent m-textedit source repository with complete m/text tree copied from m-js-core (document, selection and related text subsystems), and include editor GUI in m/text/ui under same repository. m-textedit has NO dependency on m-js-core in source, mk plan or installed pkg. m-textedit-web is separate repo and pkg, consumes m-textedit. Perform mk build/test/run and versioned release/pkg install, local trivial string edit vs immutable installed package, controlled update to later release. Library package linkage from installed web app to m-textedit pkg is an acceptance scenario; don't substitute a copy silently. No extra GUI project.

## Step 2
Create separate Electron desktop app using same m-textedit engine and GUI as web; development mk and real installed pkg; STILL NO dependency on m-js-core.

## Step 3 (FORWARD ONLY)
Refactor m-textedit to REMOVE embedded m/text core engine/document/selection implementations that are now to be supplied by m-js-core, declare real m-js-core dependency, and retain GUI m/text/ui within m-textedit. In parallel add direct m-js-core consumption from web and desktop applications for real utility usage (logging/JSON/Queue etc). Avoid dual implementations, parallel compatibility shims or fallback to embedded core. Existing released package versions are historically immutable; only new forward evolution changes dependency structure. Verify installed/shared runtime JS library resolution, nominal class identity and version constraints at this stage.

Guiding scope: don't prematurely split GUI to a new product. m/text/ui can be extracted in some future project, not part of this staged experiment. Previous assistant proposal suggesting m-textedit→m-js-core dependency from step 1 is **retracted**, not an approved baseline. No changes to product repos in correction response.
