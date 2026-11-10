# AI-Workflow persistent state store

This repository contains **mutable state** for the independent AI-Workflow project.

- `main` is an initialization-only baseline. Do not write experimental tasks, conversations or checkpoints here.
- `dev` is the isolated experimental state branch used by the AI-Workflow alpha; no automatic synchronization or deployment is implied.
- The authoritative behavior and protocol are defined in `massimilianonardi-ai/ai-workflow`, not by this repository's directory names.
- State must be written only with verified authorization and conflict detection. Never invent conversation IDs, approvals, evidence or successful persistence.

The initial commit is a one-time technical prerequisite for creating `dev` in a previously empty Git repository. It **does not activate** the alpha.
