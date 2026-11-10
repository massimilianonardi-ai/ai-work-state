# Synthetic persistence fixtures

Everything under `tests/fixtures/` is made-up test data, **not real ChatGPT conversation state**. In particular, UUID-looking values are deliberately synthetic and MUST NOT be interpreted as an active chat ID or copied into any final response marker.

The fixture is evolved in Git commits to exercise multi-file updates, historical task-association reconstruction, a derived branch, and conflict handling. It is intentionally isolated from the live paths `conversations/`, `requests/`, and `tasks/`.

`state-contract.test.mjs` is a dependency-free Node test suite runnable after checking out `dev`. It validates file-level invariants; Git atomic update and compare-and-swap behavior require a real GitHub connector test, reported separately.
