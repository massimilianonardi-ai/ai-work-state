# AI-Workflow — Handoff operativo e roadmap
**Fotografia al:** 18 novembre 2026 · **Ambito:** continuazione del progetto AI-Workflow dopo la verifica P1–P3.

> Questo è un promemoria operativo, non una modifica alle regole. All'inizio di ogni nuova richiesta è comunque obbligatorio leggere ed eseguire per intero il [bootstrap attivo](https://github.com/massimilianonardi-ai/ai-workflow/blob/main/bootstrap.md), verificare `main` e non presumere che questo documento sia aggiornato più dei file live.

## 1. Risultato attuale

**P1–P3: 9 test su 9 superati**, con verifica diretta di commit e contenuti su GitHub. Report dettagliato: [ai-workflow-validation-p1-p3-2026-11-18.md](ai-workflow-validation-p1-p3-2026-11-18.md).

Il framework è un **alpha assistito** con persistenza GitHub verificata per i casi ordinari, diramazioni di conversazioni e ciclo elementare di task. Non è ancora validato in condizioni di concorrenza, guasti o gerarchie complesse. Non dichiararlo “production-ready”.

## 2. Repository, fonte delle regole e vincoli confermati

| Voce | Valore / responsabilità |
| --- | --- |
| Repository regole | `massimilianonardi-ai/ai-workflow`, `main` |
| Commit regole osservato nel passaggio | `06f63c57af59197f6c0ca6868ad6ba73f0d91186` |
| Release/tag esistente | `v0.3.0` (alpha); il tag è stato verificato tramite lettura GitHub |
| Bootstrap obbligatorio | `ai-workflow/bootstrap.md`, lettura ed esecuzione completa **a ogni richiesta** |
| Repository di stato | `massimilianonardi-ai/ai-work-state`, `main` |
| Fuso orario | `Europe/Rome` |
| Identità conversazioni | `chat-id` (UUID v4 + timestamp), `branch-id`, `message-id` |
| Checkpoint | Aggiornamento di `conversations/<chat-id>/branch-N.yaml` per **ogni risposta**; `events/` solo per modifiche di stato e `snapshots/` quando serve contesto per riprendere il lavoro |
| Persistenza | Git tree + commit + CAS con `expected_sha`/`force:false` + rilettura del ref e di tutti i file |
| Stato task | File canonici `task-state.md` / log append-only / handoff; baseline versionata, indici roots/children derivati |
| Runtime | Assistente e strumenti autorizzati; **nessuno script o runtime ausiliario** richiesto o attivo nel percorso operativo |
| Visibilità stato | **Pubblica**: non scrivere dati privati, segreti, credenziali o transcript riservati |

Documenti di riferimento attivi: `state/protocol.md`, `state/connector-runbook.md`, `state/task-model.md`, `doc/conversation-identity.md`, `routing/commands.md`, `control/continuity.md`. L'unico workflow di fasi interamente definito è `workflows/system-design.md`.

Il README del repository di stato cita ancora la release `v0.2.3` e alcune sezioni "Verification status" delle specifiche potrebbero essere rimaste precedenti ai nove test: verificare la coerenza documentale prima di pubblicare nuovi claim ufficiali, senza modificare automaticamente le regole.

## 3. Stato concreto del lavoro

### Verifiche terminate

- **P1, conversazioni:** P1.1 creazione, P1.2 continuità, P1.3 scrittura sospesa/`!aw sync` — 3/3 PASS.
- **P2, branching:** P2.1 fork reale ALFA→BETA, P2.2 avanzamento indipendente, P2.3 identificatore citato non usato come identità corrente — 3/3 PASS.
- **P3, task:** P3.1 creazione atomica, P3.2 aggiornamento parziale + append-only, P3.3 `!aw resume` da nuova chat — 3/3 PASS.

### Task sperimentale lasciato intenzionalmente aperto

- ID: `task:aw-test-persistence-20261118-01`.
- Percorso: `ai-work-state/tasks/aw-test-persistence-20261118-01/`.
- Stato `refining`, parent `null`, dipendenze `[]`, piano attivo `null`.
- Requisiti R-01 (raggiungibilità) e R-02 (HTTP atteso) **approvati soltanto come requisiti**; R-03–R-06 non approvati.
- Nessun controllo reale, approvazione esecutiva o avanzamento di fase. Ultimo log `EV-0003`.
- Baseline `baseline-v001.md` immutata. Nuova chat P3.3 associata allo stesso task senza duplicazione.
- **Non chiudere né modificare il task di test solo perché si conclude questa chat.** Ogni modifica ulteriore richiede esplicita autorizzazione.

### Identità della chat da cui proviene l'handoff

`2026-11-12_14-26_0d93fd1c-4113-4960-92e6-e05c2833a94e`, branch `0`. Al momento della preparazione il checkpoint sorgente era `40`; la pubblicazione di questo documento è associata alla risposta `41` se il relativo commit Git è confermato.

**Questi identificatori sono riferimenti storici, non sono marker genuini della nuova chat.** La nuova conversazione deve ottenere un proprio `chat-id`, iniziare normalmente con `branch-0` e un proprio primo checkpoint; non importare artificialmente il marker della vecchia.

## 4. Cosa resta da fare — ordine consigliato

| Priorità | Area | Obiettivo misurabile | Vincoli |
| --- | --- | --- | --- |
| **1** | **P4 — Concorrenza e conflitti Git** | Dimostrare CAS quando il ref `main` cambia tra lettura e scrittura; nessun overwrite, retry dopo rilettura; analizzare collisioni di branch e due percorsi che avanzano quasi insieme | Usare fixture non riservate e un protocollo non distruttivo, concordato prima; mai `force:true` |
| **2** | **P5 — Errori e sincronizzazione incompleta** | Distinguere `write_failed`, `storage_unavailable`, `write_not_attempted`, `persisted_with_gaps`; provare errore Git dopo commit, read-back e recupero di lacune realmente non ricostruibili | Non inventare request storiche o task; non dichiarare `complete` con gap |
| **3** | **P6 — Integrità del modello task** | Verificare parent/children/roots, DAG delle dipendenze, rifiuto dei cicli, reparenting, status parent indipendente e versioni immutabili `plans/plan-NNN.yaml` | Usare task di prova approvati e commit atomici; niente esecuzione reale |
| **4** | **P7 — Comandi, routing e workflow** | Testare `!aw route` come dry run, `!aw audit` diagnostico, `!aw resume` e i gate di `workflows/system-design.md` | Non trasformare una diagnosi in approvazione |
| **5** | **Riconciliazione documentale e hardening** | Aggiornare soltanto a seguito di verifica le sezioni di documentazione rimaste indietro, definire regressione ripetibile, valutare privacy e permessi | La modifica di visibilità dei repository e le variazioni architetturali richiedono decisione esplicita |

**Prima attività concreta consigliata:** progettare P4.1–P4.3 con precondizioni, prompt, ordine delle azioni, risultato atteso e criteri PASS/FAIL/BLOCKED. Eseguire un caso per volta; confrontare commit, parent, ref, file e invarianti dopo ogni caso. Evitare esperimenti di conflitto distruttivi sullo store attivo.

## 5. Rischi aperti e avvertenze

1. **Concorrenza:** 9 PASS non dimostrano collisioni simultanee né CAS recovery in gara.
2. **P1.3:** la sospensione ha riguardato solo metadati senza cambiamenti task; non dimostra il recupero delle decisioni di task mai persistite dopo un crash.
3. **Tracciabilità:** `request_refs: null` compare nei checkpoint; lo store non contiene automaticamente il transcript integrale né gli ID nativi dei messaggi.
4. **Host/tool boundary:** il bootstrap testuale non crea da solo un hook nativo; un assistente deve usare davvero le capacità GitHub disponibili nella chat corrente.
5. **Privacy:** `ai-work-state` è pubblico; effettuare un passaggio a privato **solo su istruzione esplicita** prima di dati riservati.
6. **Documentazione asincrona con gli esperimenti:** i README e i testi di verifica di alcune specifiche descrivono uno stato precedente; prima aggiornare evidenze, poi rifletterle nei documenti normativi.

## 6. Procedura di ripartenza in una nuova chat

1. Leggere ed eseguire il bootstrap da `ai-workflow/main`, senza saltare sezioni.
2. Recuperare questo handoff e il report P1–P3 da `ai-work-state/main`, usando gli strumenti GitHub; verificare il commit corrente, non assumere che i file siano immutabili.
3. Distinguere dati storici qui citati da veri marker della **nuova** conversazione. Non generare task se non richiesti.
4. Controllare che i 9 PASS siano fondati sui commit indicati e non solo su asserzioni in chat; non ripetere P1–P3 se non serve una regressione.
5. Proporre i casi P4 con criteri chiari e rischio operativo minimo; **non eseguire esperimenti rischiosi, cambiare visibilità o modificare regole senza approvazione**.
6. Al termine della nuova risposta effettuare il checkpoint obbligatorio e mostrare il marker della nuova chat.

## 7. Punti di accesso

- [Regole AI-Workflow](https://github.com/massimilianonardi-ai/ai-workflow/tree/main)
- [Bootstrap](https://github.com/massimilianonardi-ai/ai-workflow/blob/main/bootstrap.md)
- [Store AI-Workflow](https://github.com/massimilianonardi-ai/ai-work-state/tree/main)
- [Report evidenze P1–P3](ai-workflow-validation-p1-p3-2026-11-18.md)

**Uso previsto:** questo documento è l'handoff per continuare la verifica di AI-Workflow; non attribuisce nuove autorizzazioni per creare task, eseguire test operativi, cambiare repository o alterare lo stato del task P3.
