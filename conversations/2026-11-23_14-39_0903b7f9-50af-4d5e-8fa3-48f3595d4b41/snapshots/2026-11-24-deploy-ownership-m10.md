# rsudo-deploy — authorization and local-vs-remote ownership correction (m10)

Source chat checkpoint 9, user clarification at checkpoint 10.

## Hard operator restrictions (explicit, binding)
- **Do not modify `rsudo` in any way**, including `rsudo.lib.sh`, its dispatcher, invocation contract and established encrypted/unattended credential management.
- **`rsudo-admin` can be modified only to add a Deploy menu item**, which sources and invokes the deployment menu library. Do not redesign admin.
- **Never modify `rsudo` modules `fs`, `db-pg`, or `exec`**.
- **`apisix`, `keycloak`, `keysix`** may need changes, but each change requires prior **explicit user approval**. Existing capabilities should not be presumed correct beyond their verified public interface.
- **`rsudo deploy <args>` is reserved for remote server operations using rsudo's established selection/credential model**, with credentials activated beforehand. It is not a required entrypoint for purely local operations.
- Local-only filesystem, JSON, schema, validation and planning functions **must be outside the native `rsudo deploy` module**, e.g. sourceable `rsudo-deploy.lib.sh` or more cohesive dedicated local libraries. Menu invokes these directly, and native rsudo module only when remote effects are necessary.
- Earlier specifications were contextual proposals, not immutable universal contracts; operator demands surfacing material alternatives before binding interpretations. No product code changes authorized in this turn.

## Existing code/docs mismatch to reconcile, not to patch silently
- Product `m-rsudo/main@05d1b08791a3f85c47b619a2f1169edbe5953332` contains initial interface-only slice. No rsudo core/fixed modules modified.
- `doc/deploy/requirements.md` REQ-03, `doc/deploy/interfaces.md` IF-03, `doc/deploy/decisions.md` ADR-02 state that **all** `rsudo-deploy <args>` go to `rsudo deploy <args>` and that the latter is authoritative for all administration. These are now **overgeneralized** for future local CLI requirements. Mark them `needs_revalidation` under the revision methodology, preserve historical approval provenance and correct after choosing CLI split.
- The initial executable currently forwards all args and the menu handles some local credential-group operations. This is not by itself evidence of a remote-credential defect; the open topic is future local CLI command contract.

## Operator-level open decisions and assistant recommendation
1. Should `rsudo-deploy <args>` support locally scoped CLI verbs in addition to delegating remote verbs? **Recommended yes**, explicit local/remote command contract, with `rsudo deploy` reserved for remote-only.
2. Should JSON directory be authoritative desired configuration while observed runtime state is gathered separately, or another ownership model? **Recommended yes** (desired vs observed separation, no implicit drift adoption).
3. Prioritize first supported end-to-end resource; recommend local inventory/validation + one read-only remote service, avoiding premature mutations and weak current adapters.
4. Safety contract for destructive and unattended changes; recommend explicit plan/approval gates, no implicit destructive mutation.

## AI-Workflow
Current phase: specification reopened for scope/CLI revision, no product edits. Scope-specific operator restrictions approved; unresolved questions must be answered before dependent implementation. Continue documentation layers after choices, not treat every prior phrase as immutable.
