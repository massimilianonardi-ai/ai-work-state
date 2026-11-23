# AI-Workflow — Rapporto di validazione P1–P3

> **Historical test record.** This document preserves the observations and test conditions as recorded at the time. For current runtime rules use [bootstrap.md](https://github.com/massimilianonardi-ai/ai-workflow/blob/main/bootstrap.md); for current progress and next validation steps use the [operational handoff](ai-workflow-handoff-2026-11-18.md).

**Data:** 18 novembre 2026 · **Esito:** 9/9 PASS nei casi osservati · **Ambito:** verifica manuale end-to-end dei checkpoint GitHub.

> Questo documento riporta fatti verificati sul repository di stato, non equivale a una certificazione di produzione. I test sono stati eseguiti con conversazioni ChatGPT reali e controllati sui commit e sui file di `massimilianonardi-ai/ai-work-state`, branch `main`.

## 1. Invarianti osservate

- Ogni risposta crea un record immutabile `requests/<chat-id>/<branch-id>-<message-id>.yaml` e aggiorna `conversations/<chat-id>/branch-N.yaml`; gli aggiornamenti autorizzati dei task stanno nella stessa transazione Git.
- I marker di conversazione, da soli, non bastano: ogni PASS in questo rapporto si fonda su file e commit letti dal repository.
- L'ordine `source_checkpoint` → `message_id` è risultato coerente.
- Nessun task è stato creato nei test P1 e P2.
- Il ripristino di un task in una nuova chat non ha generato duplicati né modificato i suoi file.

## 2. Matrice risultati ed evidenze

| Test | Scenario | Esito | Commit principale verificato |
| --- | --- | --- | --- |
| P1.1 | Prima risposta, nuova identità, due file atomici | PASS | [1c4771d](https://github.com/massimilianonardi-ai/ai-work-state/commit/1c4771d30a32edc7f1b725ac0b4f9301027a23e5) |
| P1.2 | Seconda risposta, identità e ramo invariati | PASS | [8fbfa62](https://github.com/massimilianonardi-ai/ai-work-state/commit/8fbfa6204c7b8cfd3232d1bc6356eda31f9761d5) |
| P1.3 | Scrittura sospesa, `sync = pending`, recupero con `!aw sync` | PASS | [e15b470](https://github.com/massimilianonardi-ai/ai-work-state/commit/e15b470bd88a63db68ac236a2d94263371f00b29) |
| P2.1 | Fork BETA dal checkpoint ALFA `0/1` | PASS | [0b294ff](https://github.com/massimilianonardi-ai/ai-work-state/commit/0b294ff723158e4705e5b215c6dfbccadaa92d8c) |
| P2.2 | Avanzamento indipendente ALFA `0/4` e BETA `1/3` | PASS | [0c550d1](https://github.com/massimilianonardi-ai/ai-work-state/commit/0c550d16d7b77813987d552f920adab7d4346d60), [b37f6e0](https://github.com/massimilianonardi-ai/ai-work-state/commit/b37f6e02f102e1c5ac3c4eb4fed02e67e4fcbebd) |
| P2.3 | Identità di ALFA citata come testo, nuova chat indipendente | PASS | [fa2cf38](https://github.com/massimilianonardi-ai/ai-work-state/commit/fa2cf38085453b46887d100e1e2b86bbbd603bbb) |
| P3.1 | Creazione task, documenti, indici e checkpoint | PASS | [a923cd6](https://github.com/massimilianonardi-ai/ai-work-state/commit/a923cd689c45cf9094bab4199dd91a26f9eb5367) |
| P3.2 | Approvazione parziale requisiti, cronologia append-only | PASS | [5cfd7a7](https://github.com/massimilianonardi-ai/ai-work-state/commit/5cfd7a74b050fb34c6003c5b3b53f18c1a3bdb42) |
| P3.3 | `!aw resume` in una nuova chat, task recuperato senza mutazioni | PASS | [6a6cd2c](https://github.com/massimilianonardi-ai/ai-work-state/commit/6a6cd2c347d2e3c9a1d0300adbea660542500ff2) |

### P1 — Identità e recupero

Conversazione sperimentale: `2026-11-18_09-36_b5e21ed4-11a4-43ca-a9b7-2024e4228a3c`.

- P1.1: `branch-0.yaml` aveva `message_id: 1`, `tasks: []` e `synchronization: complete`; creato il record `0-000001.yaml` con `source_checkpoint: 0`.
- P1.2: stessa identità, `message_id: 2`; `0-000002.yaml` con `source_checkpoint: 1`.
- P1.3: la richiesta vietava la scrittura solo per una risposta. Il marker indicava `0/3; sync = pending` e `write_not_attempted`. Prima del recupero il ramo remoto era ancora a `0/2` e `0-000003.yaml` non esisteva. Il successivo `!aw sync` ha creato `0-000003.yaml` e `0-000004.yaml` nello stesso commit e portato il ramo a `0/4`, con `sync_gaps: []` e `synchronization: complete`.

### P2 — Diramazioni e separazione identità

Conversazione ALFA/BETA: `2026-11-18_09-53_f91b74e3-8ee4-444a-b9d4-9befbf171a62`.

- ALFA inizializzato su `branch-0`, arrivato a `0/3` prima del fork; origine verificata nel commit [e31b2fd](https://github.com/massimilianonardi-ai/ai-work-state/commit/e31b2fd8663952dccb5e6f7a34d47c1bd6b11255).
- BETA creato dal checkpoint `0/1` su `branch-1.yaml`: `parent_branch: 0`, `fork_message: 1`, primo `message_id: 2`, `tasks: []`. ALFA è rimasto a `0/3`.
- Continuazioni: ALFA `0/4` e BETA `1/3`. Il commit di ciascun percorso ha modificato solo il proprio `branch-N.yaml` e relativo `requests`.
- P2.3: una nuova chat non derivata ha ignorato l'ID di ALFA riportato nel prompt; nuova identità `2026-11-18_10-11_01f9a2fc-2ac1-4b15-bc9f-cb8cce70cb90`, `0/1`, senza modificare ALFA/BETA.

### P3 — Task e handoff tra conversazioni

Task sperimentale: `task:aw-test-persistence-20261118-01`, directory `tasks/aw-test-persistence-20261118-01/`.

- P3.1, conversazione `2026-11-18_10-14_bce6c728-fb56-4b71-aee9-b6bad4e109e5`, checkpoint `0/1`: creati `baseline-v001.md`, `task-state.md`, `task-log.md`, `task-specification.md`, `handoff.md`, `children.yaml`, `tasks/roots.yaml` e i due file di checkpoint. Tutti e 9 nel medesimo commit.
- P3.2, stessa conversazione `0/2`: approvati **solo come requisiti** R-01 (raggiungibilità) e R-02 (risposta HTTP attesa). R-03–R-06 ancora proposti. Stato `refining`, `parent: null`, `depends_on: []`, `active_plan: null`; nessuna esecuzione. Aggiornati `task-state.md`, `task-specification.md`, `task-log.md` e `handoff.md` assieme ai due file di checkpoint. `EV-0003` aggiunto una sola volta, preservando integralmente il log precedente; `baseline-v001.md`, `children.yaml` e `tasks/roots.yaml` con SHA Git invariato.
- P3.3, nuova conversazione `2026-11-18_11-03_09fb39d6-4ba4-4784-be6a-e83ff3f89540`, `0/1`: `!aw resume --context task:aw-test-persistence-20261118-01` ha letto e riassunto lo stesso task. Il commit ha creato soltanto `branch-0.yaml` e `0-000001.yaml` per la nuova chat, collegandola al task esistente; i sette file e indici del task avevano tutti SHA immutato rispetto a P3.2.

## 3. Limiti della prova

**Provato negli scenari descritti:** operazioni Git condizionali concluse con rilettura, checkpoint ordinari, sospensione volontaria e suo recupero, diramazione reale, indipendenza dei rami, task creation/update/resume e conservazione delle autorizzazioni.

**Non ancora provato:** due scritture realmente concorrenti sullo stesso ref; conflitti di assegnazione branch; indisponibilità involontaria o perdita di permessi; errore dopo un commit ma prima della risposta; recupero di un checkpoint storico non ricostruibile con `sync_gaps`; cicli e reparenting di task; DAG di dipendenze; revisione immutabile di execution plan; workflow end-to-end; archiviazione integrale del transcript (il protocollo salva metadati e normalmente `request_refs: null`).

Il successo di P1.3 non prova automaticamente il recupero di mutazioni complesse ai task durante una perdita di scrittura: la risposta sospesa non modificava task.

La verifica è manuale, guidata da conversazioni e commit osservabili: **non è una suite automatica di regressione né una garanzia contro ogni guasto**.

## 4. Collegamenti e uso

- Regole attive: [ai-workflow/bootstrap.md](https://github.com/massimilianonardi-ai/ai-workflow/blob/main/bootstrap.md).
- Store persistente: [ai-work-state/main](https://github.com/massimilianonardi-ai/ai-work-state/tree/main).
- Architettura task: [state/task-model.md](https://github.com/massimilianonardi-ai/ai-workflow/blob/main/state/task-model.md).
- Documento di ripresa e roadmap: [ai-workflow-handoff-2026-11-18.md](ai-workflow-handoff-2026-11-18.md).

**Policy privacy:** il repository di stato è pubblico. Non includere testi privati di conversazione, credenziali, segreti o dati riservati.
