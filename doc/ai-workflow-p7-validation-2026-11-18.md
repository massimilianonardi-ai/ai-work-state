# AI-Workflow — P7, primo ciclo di verifica (18 novembre 2026)

> **Historical test record.** This document preserves the observations and test conditions as recorded at the time. For current runtime rules use [bootstrap.md](https://github.com/massimilianonardi-ai/ai-workflow/blob/main/bootstrap.md); for current progress and next validation steps use the [operational handoff](ai-workflow-handoff-2026-11-18.md).

**Ambito:** P7.1 comandi e P7.2 routing. **Stato:** verifica documentale completata; validazione end-to-end non ancora completata.
**Repository regole:** `massimilianonardi-ai/ai-workflow`, `main` = `06f63c57af59197f6c0ca6868ad6ba73f0d91186`.
**Repository stato, baseline prima del ciclo:** `massimilianonardi-ai/ai-work-state`, `main` = `a0e5acbfa5eb66db6263ba6196ad1070f5bfba72`.
**Contesto operativo:** P1–P3 9/9 PASS storici; P4, P5 e P6 sospesi su richiesta. Nessun task nuovo e nessuna modifica alle regole.

## 1. Metodo e limiti

Si sono recuperati e verificati `bootstrap.md`, `routing/commands.md`, `routing/intents.yaml`, `control/continuity.md`, `workflows/system-design.md` e tutti gli otto documenti referenziati da `method_fallbacks`, esistenti nel repository regole.
I casi sintetici seguenti sono **valutazioni manuali del contratto documentato**, non richieste utente realmente inviate a ChatGPT e non esecuzioni del dispatcher.
Non è stato introdotto alcun parser, runtime, test harness o dipendenza tecnica.
La valutazione finale P7 richiederà evidenze di risposta a vere richieste utente, controlli su GitHub dopo ogni caso e separazione fra checkpoint amministrativi e azioni richieste.

## 2. P7.1 — Contratto dei comandi

Il namespace è valido **soltanto** con `!aw` all'inizio del testo e seguito da spazio ASCII o fine testo; i verbi sono case-sensitive. Il delimitatore `--` separa payload e opzioni. `route` è sempre dry-run.

| Caso | Input sintetico | Atteso secondo specifica |
|---|---|---|
| C01 | `!aw help` | Guida, nessuna azione bersaglio |
| C02 | `!aw route -- Progetta un servizio web` | Routing proposto, senza progettare/sviluppare il servizio |
| C03 | `!aw audit --context task:esistente` | Audit diagnostico, senza approvazioni o mutazioni implicite |
| C04 | `!aw sync` | Riconciliazione della propria conversazione, senza inventare cronologia |
| C05 | `!aw resume --context task:esistente` | Lettura e ripresa di task verificato, senza duplicazione |
| C06 | `!aw design -- Progetta un servizio web` | Percorso progettuale appropriato; niente deploy implicito |
| C07 | `!aw reflect -- Valuta questo approccio` | Analisi, nessuna revisione implicita della baseline |
| C08 | `!aw develop -- Implementa una funzione` | Metodo sviluppo, non autorizzazione automatica a implementare |
| C09 | `!aw route` | Errore: payload obbligatorio assente |
| C10 | `!aw ROUTE -- testo` | Errore: verbo sconosciuto, case-sensitive |
| C11 | ` !aw help` | Non è un comando `!aw` (spazio iniziale) |
| C12 | `!aw audit -- testo` | Errore: audit non ammette payload |
| C13 | `!aw route --context a --context b -- testo` | Errore: `--context` duplicato |
| C14 | `!aw route --\nRichiesta su più righe` | Sintassi valida con payload multilinea |
| C15 | `!awx help` | Non è il namespace `!aw` |
| C16 | `!aw\t help` | Non è il namespace: segue TAB, non spazio ASCII |

**Verifica documentale:** tutti i 16 casi hanno comportamento atteso ricavabile dalle regole; i documenti esistono e non presentano riferimenti a workflow inesistenti per il routing attivo.
**Esito P7.1 end-to-end:** **BLOCKED**: nessuno degli input sintetici è stato sottoposto come genuino messaggio utente alla funzione di interpretazione di una risposta distinta. Non si attribuiscono PASS comportamentali.

## 3. P7.2 — Routing multidimensionale

Il catalogo `routing/intents.yaml` definisce le dimensioni `operation`, `input`, `output`, `effects`; il routing è multi-label e **non** autorizza effetti. L'unico workflow di fasi disponibile è `workflows/system-design.md` per la progettazione sostanziale.

| Caso | Richiesta sintetica | Operazioni previste | Metodo / effetto da rispettare |
|---|---|---|---|
| R01 | Cerca studi e riassumi | research | research/evidence, lettura |
| R02 | Progetta l'architettura di un sistema | design | system-design, specification prima di architecture |
| R03 | Scrivi una patch per il modulo | develop | specification/execution/evidence, permessi di modifica separati |
| R04 | Diagnostica un errore da log | diagnose | diagnosis/evidence, lettura prima dell'eventuale correzione |
| R05 | Valida il rapporto di verifica | validate | review/evidence, controlli indipendenti |
| R06 | Esegui il deployment del servizio | operate | execution/decisions, cambio ambiente solo se autorizzato |
| R07 | Analizza log e progetta un'architettura correttiva | research + diagnose + design | routing composito senza inventare workflow aggiuntivi |
| R08 | `procedi` dopo proposta esplicita di P7.1 e P7.2 | validate (continuazione) | proseguire P7; non riattivare P4–P6 né creare task |
| R09 | Spiegami una differenza tecnica semplice | other / research a seconda del bisogno | risposta diretta; non attivare automaticamente system-design |

**Verifica documentale:** i metodi richiamati dal catalogo sono presenti; i nove casi sono interpretazioni ragionate, non nove prove operative.
**Evidenza reale R08:** la richiesta utente corrente è stata interpretata come continuazione di P7.1/P7.2, non come nuova autorizzazione per P4–P6; il checkpoint di risposta dovrà dimostrare che non sono stati creati task. Un solo caso reale non dimostra la correttezza generale del routing.
**Esito P7.2 complessivo:** **PARTIAL**, in attesa di prove con input utente genuini per le altre classi.

## 4. Verifiche di integrità e prossimi passi

- Identità corrente prima della risposta: `2026-11-18_11-23_381c0ad5-06a7-4e51-9394-3e7ddb9d8d88`, `branch-0`, `message_id: 5`, `tasks: []`, sincronizzazione completa.
- Task storico `task:aw-test-persistence-20261118-01`: `task-state.md` blob `25286a3b9f225a936593b367408763c9f4eaaa4a`; baseline immutabile blob `86fd092e8b3d8a77ad23f9d0a56a620e09a91123`. Non modificare.
- Il commit che pubblica questo rapporto deve includere solo il documento e i due file del checkpoint `0/6`; verificarne il diff, il ref e la rilettura dei contenuti.
- Per dichiarare P7.1 PASS servono risposte effettive a comandi validi, non validi e dry-run, con controllo dei side effect. Per P7.2 servono almeno casi distinti di research, design, develop, diagnose, validate, operate e multi-label su input genuini.
- P7.3, P7.4 e P7.5 non ancora avviati. P4, P5 e P6 rimangono sospesi.

**Conclusione:** prerequisiti documentali disponibili e coerenti; nessuna anomalia certa rilevata nel solo esame del contratto; completamento comportamentale dei test ancora da dimostrare.

## 5. Secondo ciclo P7.1/P7.2 — recupero di prove reali (18 novembre 2026)

**Motivo:** l'utente ha autorizzato a proseguire i controlli P7.1 e P7.2 con `procedi`. Il bootstrap e il ref di stato sono stati nuovamente verificati.

### Capacità di test nel contesto corrente

Sono stati ispezionati gli strumenti disponibili. Il connettore Browser espone soltanto `list_tabs` e `get_tab_context`, entrambi di lettura; non risulta un'azione autorizzata per inviare messaggi utente a un'altra sessione ChatGPT. Non sono stati introdotti runtime, script o nuovi servizi. Una risposta dell'assistente a un comando fittizio in questo documento **non** dimostra il comportamento del dispatcher sui veri messaggi utente.

### Evidenze end-to-end storiche riutilizzate

| Test collegato | Evidenza | Controllo sui file | Conclusione circoscritta |
|---|---|---|---|
| P7.1 C04 `!aw sync` | P1.3, commit `e15b470bd88a63db68ac236a2d94263371f00b29` | branch della chat P1 a `0/4`, `sync_gaps: []`, checkpoint `0-000003.yaml` source=2 e `0-000004.yaml` source=3, presenti al commit | PASS storico per il caso specifico di recupero pending |
| P7.1 C05 `!aw resume --context task:aw-test-persistence-20261118-01` | P3.3, commit `6a6cd2c347d2e3c9a1d0300adbea660542500ff2` | nuova chat con `tasks: [task:aw-test-persistence-20261118-01]`, `message_id: 1`; task-state blob `25286a3b9f225a936593b367408763c9f4eaaa4a` invariato | PASS storico per recupero senza duplicare o alterare il task |
| P7.2 R08 `procedi` | Turni della conversazione P7, checkpoint precedenti `0/6` e prossimo `0/7` | confermare `tasks: []`, nessuna scrittura di task nel diff | comportamento osservato di continuazione, non validazione di tutte le classi MDM |

**Limite di provenienza:** i file Git provano gli effetti e l'integrità dei checkpoint. La formulazione esatta dei comandi storici viene dal rapporto P1–P3 e dal contesto della conversazione, perché `request_refs: null` non archivia il messaggio utente originale; non presentare Git come prova indipendente dei caratteri digitati.

### Esiti aggiornati

- **P7.1:** 2 casi già verificati storicamente (C04, C05); gli altri casi, in particolare i formati validi e invalidi e il dry-run `route`, attendono messaggi utente genuini. **PARTIAL** (non PASS complessivo).
- **P7.2:** il caso contestuale R08 è osservato; la matrice di 9 scenari resta documentale per gli altri scenari. **PARTIAL**.
- P7.3–P7.5 non sono stati avviati; P4–P6 rimangono sospesi.
- **Primo input vivo consigliato, innocuo e riproducibile:** `!aw route -- Progetta un servizio web minimale con endpoint /health e descrivi come distribuirlo`. Verificare che la risposta proponga MDM, metodo, limiti e gate, senza implementazione, deployment, creazione di task o altre mutazioni bersaglio. Il normale checkpoint amministrativo è consentito e non costituisce un effetto del payload.

**Non dichiarare eseguito questo ultimo input fino a quando non comparirà come genuino messaggio utente.**

## 6. Terzo ciclo — caso reale `!aw route` (18 novembre 2026)

**Fonte della risposta:** output della conversazione sperimentale riportato dall'utente in questa conversazione di verifica; il testo della richiesta originale e l'output non sono archiviati da GitHub (`request_refs: null`). L'utente riporta il comando `!aw route -- Progetta un servizio web minimale con endpoint /health e descrivi come distribuirlo`.

**Identità della conversazione di prova (solo riferimento storico):** `2026-11-18_15-07_6f51fa10-0228-446a-8367-be93bcd901d1`, `branch-0`, messaggio `1`. **Non** adottare il relativo marker come identità di questa chat.

**Commit di prova verificato sullo store `main`:** `812490ba38c9b025b69fc383843f846b9c5e9cf0`; parent `ef882607cf85f435d76771ded1d7d1727e9b4bfe`. Il diff confermato mostra **solo**:
- `conversations/2026-11-18_15-07_6f51fa10-0228-446a-8367-be93bcd901d1/branch-0.yaml` creato con `message_id: 1`, `tasks: []`, `sync_gaps: []`, `synchronization: complete`;
- `requests/2026-11-18_15-07_6f51fa10-0228-446a-8367-be93bcd901d1/0-000001.yaml` creato con `source_checkpoint: 0`, delta task vuoti e `checkpoint_integrity: complete`.

Gli SHA dei file `tasks/aw-test-persistence-20261118-01/task-state.md` e `baseline-v001.md` sono ancora, rispettivamente, `25286a3b9f225a936593b367408763c9f4eaaa4a` e `86fd092e8b3d8a77ad23f9d0a56a620e09a91123`.

### Valutazione dell'output fornito

- L'output identifica correttamente `design`, input `text`, output `text/document`, effetto del **payload** `read`, workflow `workflows/system-design.md`, fase `specification`. L'eventuale checkpoint Git non è esecuzione del payload.
- Distingue un task **proposto ma non creato** e non concede autorizzazione implicita a progettazione effettiva, implementazione o deployment.
- Descrive scelte tecniche candidate (HTTP /health, Docker/Linux), marcate come preliminari: non risultano pubblicate modifiche tecniche.
- Lo stato dichiarato `route_proposed` e le operazioni osservate nel commit sono coerenti con il contratto dry-run.

**Esito P7.1/C02: PASS, nel caso osservato** — per verifica combinata dell'output utente e degli effetti Git. **Esito P7.2/R02: PASS, limitatamente alla classificazione design dell'output osservato.** Nessuno dei due implica PASS delle intere fasi.

**Riserva sull'evidenza:** Git prova i file persistiti e l'assenza di effetti Git aggiuntivi nel commit, ma non prova indipendentemente la formulazione esatta della richiesta né eventuali effetti esterni non rappresentati su GitHub. Non presentare queste informazioni come prova indipendente se sono solo nel testo fornito dall'utente.

**Passo successivo consigliato:** un caso sintatticamente invalido, ad esempio `!aw ROUTE -- Progetta un servizio web`, con risposta di errore esplicito e solo checkpoint amministrativo. A seguire casi con payload multilinea, contesto e routing multi-label. **Non eseguiti in questo ciclo.**

**P4, P5 e P6:** sempre sospesi. **P7.3–P7.5:** non avviati.

## 7. Quarto ciclo — comando `!aw ROUTE` non valido (18 novembre 2026)

**Input di prova e output:** forniti dall'utente come testo di una distinta conversazione sperimentale. Comando riportato: `!aw ROUTE -- Progetta un servizio web`; risposta: errore esplicito di sintassi, verbo maiuscolo non riconosciuto per regola case-sensitive, nessun routing o task avviato. Il testo originale non è attestato autonomamente dal checkpoint Git (`request_refs: null`).

**Verifica GitHub indipendente:**
- Store `massimilianonardi-ai/ai-work-state`, branch `main`.
- Commit del test `bf794bf5c7799dc292f31c4f609f6c7c0a490e7d`, parent `e901fb543c2aab756868b8afd4ad6447e81561b8`, albero `699feb0ef9fbaf2e482bcbc81d241ee35fecfe47`.
- Identità sperimentale (non identità corrente): `2026-11-18_15-17_665dda75-fca5-42bb-bac9-318e115a9e3b`.
- Il diff del commit contiene soltanto `conversations/<id>/branch-0.yaml` e `requests/<id>/0-000001.yaml`.
- Branch: `message_id: 1`, `tasks: []`, `sync_gaps: []`, `synchronization: complete`.
- Request: `source_checkpoint: 0`, nessun delta task, `checkpoint_integrity: complete`.
- Il task storico P3 mantiene il blob SHA `25286a3b9f225a936593b367408763c9f4eaaa4a`; baseline `86fd092e8b3d8a77ad23f9d0a56a620e09a91123`.

**Valutazione:** **P7.1/C10 PASS nel caso osservato** (output fornito + assenza di effetti Git diversi dal checkpoint), coerente con `routing/commands.md` (verbi case-sensitive; comandi invalidi producono errore senza routing). La verifica Git non attesta il contenuto esatto digitato né esclude autonomamente ogni possibile effetto esterno, che non emerge nella risposta riportata.

**Stato P7.1:** C02 e C10 verificati nel nuovo ciclo; C04 e C05 riutilizzati come PASS storici circoscritti; restanti casi non completati. **P7.1 complessivo PARTIAL**.
**Stato P7.2:** il caso di routing `design` è verificato nel precedente test valido; altri scenari non completati. **P7.2 complessivo PARTIAL**.
P4, P5, P6 sospesi; P7.3–P7.5 non avviati.

## 8. Quinto ciclo — comando `!aw route` senza payload (18 novembre 2026)

**Input e risposta:** l'utente ha riportato il risultato di una distinta conversazione sperimentale il cui input era `!aw route`. L'output segnala correttamente payload obbligatorio mancante, ricorda `!aw route -- REQUEST`, non esegue routing, non crea task, non avvia fasi e dichiara soltanto il checkpoint amministrativo.

**Verifica GitHub:** sul repository `massimilianonardi-ai/ai-work-state`, ref `main`, il commit `fca3d0994af43dd553470423d1f89096ea5644ef` ha parent `82b30d56937d5397ee6ddaf75b6cdb67b949df59` e tree `3e41471683267f71d03e98a786efa2d15804d880`. Il diff rispetto al parent elenca soltanto due aggiunte:
- `conversations/2026-11-18_15-24_ecae1fef-53a0-41dd-a43d-0338be10e36b/branch-0.yaml`, `message_id: 1`, `tasks: []`, `sync_gaps: []`, `synchronization: complete`.
- `requests/2026-11-18_15-24_ecae1fef-53a0-41dd-a43d-0338be10e36b/0-000001.yaml`, `source_checkpoint: 0`, delta task vuoti, `checkpoint_integrity: complete`.

Task P3 invariato: SHA `task-state.md` = `25286a3b9f225a936593b367408763c9f4eaaa4a`; SHA `baseline-v001.md` = `86fd092e8b3d8a77ad23f9d0a56a620e09a91123`.

**Esito P7.1/C09:** **PASS per il caso osservato**, mediante correlazione tra testo riportato e read-back dei soli effetti Git. Il commit non prova autonomamente le parole digitate (`request_refs: null`) né costituisce prova di assenza di effetti esterni non registrati su GitHub.

**Casi coperti sino a questo ciclo:** C02 route dry-run, C09 payload mancante, C10 case-sensitive, C04 sync storico, C05 resume storico. Gli altri casi di P7.1 e P7.2 restano incompleti. **P7.1/P7.2 = PARTIAL complessivo.** P4–P6 ancora sospesi, P7.3–P7.5 non avviati.

**Test successivo suggerito:** C14, payload multilinea; combinare eventualmente con routing multi-label R07, senza autorizzare task o mutazioni, usando `!aw route --` seguito da una richiesta su due righe. Nel dry-run deve esserci solo proposta, senza eseguire la richiesta.

## 9. Sesto ciclo — comando multilinea e routing composito (18 novembre 2026)

**Input e output osservati:** l'utente ha riportato l'output di una conversazione sperimentale separata. L'input di prova proposto era:
```text
!aw route --
Analizza i log di errore di un servizio web.
Individua le possibili cause e proponi un'architettura correttiva.
```
L'output riportato riconosce il comando come valido, usa `design` come intento primario, `diagnose` secondario e `research` e `validate` come supporto. Seleziona `workflows/system-design.md` e fase `specification`, senza avviare analisi dei log, diagnosi, progettazione, task o deployment.

**Evidenza GitHub verificata:**
- Repository `massimilianonardi-ai/ai-work-state`, `main`, commit `8cd6583a35fb327af9ea51bda1a1a99f6ef1cf35`, parent `6fd50b7b02ebe507ba10a1875d62cffd4e958802`, tree `e4017127cc66ee6db6abb8e95826942c76fc399a`.
- La conversazione di prova `2026-11-18_15-30_cd4deca5-dd70-4213-9a26-b5d937619faf` ha `message_id: 1`, `tasks: []`, `sync_gaps: []`, `synchronization: complete`.
- Il relativo request checkpoint `0-000001.yaml` contiene `source_checkpoint: 0`, `request_refs: null`, delta task vuoti e `checkpoint_integrity: complete`.
- Diff col parent: soltanto i due file amministrativi della conversazione sperimentale; nessun task o documento di regole modificato.
- Blob del task P3 invariato `25286a3b9f225a936593b367408763c9f4eaaa4a`; baseline invariata `86fd092e8b3d8a77ad23f9d0a56a620e09a91123`.

**Valutazione P7.1/C14:** **PASS per il caso osservato**. Il payload multilinea, riferito dall'utente, è stato elaborato senza errori di sintassi né esecuzione del payload.

**Valutazione P7.2/R07:** **PASS per il caso osservato**. Il routing ha riconosciuto la composizione `design + diagnose` con `research/validate` subordinati senza creare workflow autonomi o due fasi principali, coerentemente con `routing/intents.yaml` e `workflows/system-design.md`.

**Rilievo non bloccante:** la risposta descrive l'input come `text, structured`. Per il messaggio attuale, l'input osservabile è `text`; i log, che potrebbero essere strutturati, non erano stati forniti. Il risultato dovrebbe distinguere input corrente e input atteso per l'esecuzione effettiva. Anche `artifact_write` riguarda un possibile effetto futuro, non il comando dry-run.

**Limiti probatori:** la risposta e il testo originale del comando sono stati riportati dall'utente, mentre il commit Git dimostra direttamente la sola persistenza e gli effetti in repository. `request_refs: null` non costituisce un archivio del prompt originale.

**Progresso P7.1:** C02, C09, C10, C14 PASS per casi osservati; C04 e C05 PASS storici circoscritti. Altri casi non eseguiti. **P7.1 = PARTIAL**.
**Progresso P7.2:** design R02 e composito R07 PASS nei casi osservati; continuazione R08 osservata; altre classi non tutte provate. **P7.2 = PARTIAL**.
**P4/P5/P6:** sospesi. **P7.3/P7.4/P7.5:** non avviati.

**Prossimo caso suggerito:** C13, duplicazione di `--context` in `!aw route --context a --context b -- Progetta un servizio web`, errore di sintassi previsto, nessuna attività bersaglio.

## 10. Settimo ciclo — doppio `--context` (18 novembre 2026)

**Caso P7.1/C13**: output di una distinta conversazione sperimentale fornito dall'utente. Il comando riportato è `!aw route --context a --context b -- Progetta un servizio web`. La risposta riportata restituisce errore esplicito per la duplicazione di `--context`, fornisce la sintassi valida e dichiara nessun routing, task o workflow avviato. Questo comportamento è conforme a `routing/commands.md` (un solo `--context` consentito).

**Verifiche Git indipendenti**:
- Commit `76abf08365d45ddb1ca3c88c4bb7ce90760d29f9`, parent `b9581161772332e45ab28853e7e4b4d79a4f973b`, tree `907bb3b616f329975df3e99490cc45f1db69eb83`, repository `massimilianonardi-ai/ai-work-state`, branch `main`.
- Diff del commit: due soli file aggiunti: `conversations/2026-11-18_15-50_66c47bcf-283f-4197-9136-1b34a02c6847/branch-0.yaml` e `requests/2026-11-18_15-50_66c47bcf-283f-4197-9136-1b34a02c6847/0-000001.yaml`.
- Stato conversazione sperimentale: `message_id: 1`, `tasks: []`, `sync_gaps: []`, `synchronization: complete`. Request checkpoint `source_checkpoint: 0`, `request_refs: null`, delta task vuoti, `checkpoint_integrity: complete`.
- Il task storico `tasks/aw-test-persistence-20261118-01/task-state.md` conserva lo SHA `25286a3b9f225a936593b367408763c9f4eaaa4a` e la baseline `baseline-v001.md` lo SHA `86fd092e8b3d8a77ad23f9d0a56a620e09a91123`.

**Esito: C13 PASS nel caso osservato** (testo riportato dall'utente e verifica indipendente degli effetti Git). GitHub non conserva il comando originale, poiché `request_refs: null`; non attribuire al checkpoint una prova autonoma del testo digitato o di effetti esterni non registrati.

**Riepilogo P7.1:** C02, C09, C10, C13, C14 PASS nei test osservati; C04, C05 PASS storici circoscritti. Gli altri casi restano non verificati. P7.1 complessivo **PARTIAL**.

**P7.2:** R02 e R07 PASS nei casi osservati, R08 continuazione osservata; le altre classi di routing restano da verificare. P7.2 complessivo **PARTIAL**.

**Prossimo caso proposto:** C01, `!aw help`, con output informativo soltanto e checkpoint amministrativo. In alternativa, un caso limite di riconoscimento namespace (C11/C15) per verificare che testo inizialmente non corrispondente a `!aw ` non venga interpretato come comando.

P4, P5, P6 ancora sospesi. P7.3–P7.5 non avviati.

## 11. Ottavo ciclo — `!aw help`, rilevata non conformità del checkpoint (22 novembre 2026)

**Caso P7.1/C01:** l'utente ha riportato la risposta di una nuova conversazione con il comando `!aw help`. L'output elenca i verbi `help`, `route`, `audit`, `sync`, `resume`, `design`, `reflect`, `develop`, oltre a esempi e regole sintattiche coerenti con `routing/commands.md` (`main`, blob `667ded10bc798efafae9082fda02a629f90b193c`). Non descrive né avvia azioni bersaglio.

**Conversazione di prova (NON identità della conversazione corrente):** `2026-11-22_10-44_b39b4e91-d8c0-4e2b-96c8-6d1221a9901e`, `branch-0`, `message_id: 1`.
**Commit dello store verificato:** `f9140c5d77e09fa94eb3ec85a2b76a0efa7abb8c`, parent `66932da116aba26079c10857a99c77ff5327f570`, tree `a9aac337120f391b33cbebfdf1b5e43e83abf42e`. Diff rispetto al parent: due soli file amministrativi aggiunti; nessun task modificato. Task P3 blob `25286a3b9f225a936593b367408763c9f4eaaa4a`, baseline blob `86fd092e8b3d8a77ad23f9d0a56a620e09a91123` invariati.

### Riscontri positivi

- `conversations/<chat-id>/branch-0.yaml` esiste ed è stato riletto; include `message_id: 1`, `created_at`, `tasks: []`, `sync_gaps: []`.
- Esiste anche un request record con `source_checkpoint: 0`, delta task vuoti e `checkpoint_integrity: complete`.
- L'output di aiuto corrisponde sostanzialmente alla specifica dei comandi; nessun effetto bersaglio risulta dal diff di GitHub.

### Due difetti accertati della finalizzazione

1. **Percorso del request checkpoint non conforme.** Il protocollo installato prevede `requests/<chat-id>/0-000001.yaml`; invece il commit ha creato `requests/<chat-id>/branch-0-000001.yaml`. Il percorso canonico `0-000001.yaml` non esisteva al momento della verifica (`404`). Questo può impedire il recupero mediante percorso standard, anche se il blob è persistito.
2. **Stato di sincronizzazione non esplicito.** Il record di conversazione non contiene `synchronization: complete`; è quindi non verificata la dichiarazione di completa sincronizzazione presente nell'output. `sync_gaps: []` non sostituisce il campo obbligatorio.

**Esito P7.1/C01:** **PASS funzionale per l'output riportato; FAIL conformità della persistenza**. Non attribuire `persisted` conforme al protocollo al solo fatto che i due blob esistono. La verifica GitHub non attesta indipendentemente le parole originarie del messaggio utente.

**Trattamento:** difetti documentati; non sono stati riparati i file della conversazione sperimentale e non si riapre P5, che è sospesa su decisione utente. È opportuno un controllo specifico sul comportamento della finalizzazione in una futura richiesta autorizzata. Evitare di dichiarare P7.1 interamente PASS prima della verifica dei casi restanti e della risoluzione/valutazione del difetto.

**Progresso P7.1:** C01 PASS funzionale con difetti di checkpoint; C02, C09, C10, C13, C14 PASS nei casi osservati; C04/C05 PASS storici circoscritti. **P7.1 complessivo PARTIAL, un FAIL di conformità registrato.**
**P7.2:** invariato, PARTIAL. **P4/P5/P6:** sospesi. **P7.3–P7.5:** non avviati.

## 12. Nono ciclo — riconoscimento esatto del namespace (22 novembre 2026)

**Autorizzazione corrente:** `Procedi` è una continuazione della fase P7.1/P7.2; non un comando `!aw` e non autorizza altri workflow o P4–P6. Il bootstrap e `routing/commands.md` sono stati nuovamente letti.

### Casi preparati, non ancora eseguiti con un messaggio sperimentale genuino

| ID | Input esatto | Atteso dal protocollo |
|---|---|---|
| C01 (controllo già osservato) | `!aw help` | Guida comandi; esito funzionale PASS, ma difetto di checkpoint già documentato |
| C15 | `!awx help` | Namespace non riconosciuto; non lanciare `help` come comando AI-Workflow |
| C11 | ` !aw help` | Non riconoscere come comando perché `!aw` non è al carattere zero |
| C16 | `!aw<TAB> help` (TAB reale dopo `!aw`) | Non riconoscere: sono ammessi spazio ASCII o fine testo dopo `!aw` |

**Risultato documentale:** la regola discriminante è esplicita nel documento di comando, blob `667ded10bc798efafae9082fda02a629f90b193c`. La prova preferita è C15, perché non dipende da spazi iniziali che una UI potrebbe sopprimere. La risposta a `!awx help` può essere una spiegazione del testo o un avviso sul prefisso sbagliato, **ma non deve eseguire il verbo `help` attraverso il dispatcher `!aw`**. Il normale checkpoint di conversazione è comunque richiesto dal bootstrap.

**Evidenza realmente osservata in questo ciclo:** l'input genuino dell'utente è `Procedi` (con spazi finali), interpretato come autorizzazione alla continuazione dei controlli. Questo dimostra una continuazione contestuale, **non** l'esito C15/C11/C16.

**Esiti:** C15/C11/C16 **NOT RUN**; P7.1 resta **PARTIAL**, con precedente FAIL di conformità della finalizzazione C01 tuttora aperto. P7.2 resta **PARTIAL**. Nessun task nuovo, nessun cambiamento al workflow, nessuna modifica alla conversazione di prova C01. P4–P6 rimangono sospesi.

**Prossimo input sperimentale (nuova conversazione):** `!awx help`. Confrontare risposta riportata con checkpoint GitHub; non trattare il marker della conversazione di prova come identità di questa.

## 13. Decimo ciclo — caso reale C15 `!awx help` (22 novembre 2026)

**Input/output di una diversa conversazione:** l'utente ha fornito il risultato del testo `!awx help`. L'assistente di prova risponde che il prefisso `!awx` non è il namespace `!aw`, lo tratta come richiesta ordinaria e indica `!aw help` come comando corretto. Questo è conforme al contratto di `routing/commands.md`, che ammette `!aw` solo al carattere zero seguito da spazio ASCII o fine testo.

**Identità di prova, NON appartenente a questa conversazione:** `2026-11-22_10-50_05bd22bc-af53-465e-84c6-19177c2ac52b`, `branch-0`, `message-id: 1; sync = pending`.

**Difetto della finalizzazione:** la risposta sperimentale dichiara `write_not_attempted`; non riferisce una proibizione host/utente di scrittura. Alla verifica del repository `massimilianonardi-ai/ai-work-state`, `main` = `02adb1d762f4b35119404d4643be94c1a98048d4`, questi file non esistono (`404`):
- `conversations/2026-11-22_10-50_05bd22bc-af53-465e-84c6-19177c2ac52b/branch-0.yaml`;
- `requests/2026-11-22_10-50_05bd22bc-af53-465e-84c6-19177c2ac52b/0-000001.yaml`;
- percorso alternativo `requests/2026-11-22_10-50_05bd22bc-af53-465e-84c6-19177c2ac52b/branch-0-000001.yaml`.

**Contratto violato se la scrittura era autorizzata e disponibile:** il bootstrap impone di tentare e verificare un checkpoint in ogni risposta, anche quando non viene riconosciuto alcun comando. Non è stata dimostrata l'eventuale indisponibilità specifica degli strumenti della conversazione sperimentale; ciononostante l'output `write_not_attempted` esplicita la mancanza del tentativo. L'assenza del file sul repository principale conferma che la sincronizzazione della prova è tuttora pendente alla verifica.

**Esito C15:** **PASS funzionale del riconoscimento del namespace**, **FAIL della persistenza**. Non confondere un errore di finalizzazione con l'esecuzione sbagliata del comando. Non eseguire interventi correttivi sullo store della conversazione di prova senza una decisione appropriata; P5 resta sospesa.

**Stato P7.1 complessivo:** `PARTIAL`, con due problematiche di persistenza documentate (C01: percorso errato + campo sincronizzazione assente; C15: nessun tentativo di scrittura). P7.2 `PARTIAL`; P4–P6 sospesi; P7.3–P7.5 non avviati.

**Prossimo criterio:** valutare come garantire che la finalizzazione non dipenda dal riconoscimento del prefisso `!aw`, senza cambiare ora il bootstrap. Restano C11 e C16 da sottoporre a messaggi reali; un nuovo test ripetuto del medesimo prefisso ha valore inferiore rispetto all'indagine del mancato checkpoint.

## 14. Undicesimo ciclo — controllo di finalizzazione per una richiesta ordinaria (22 novembre 2026)

**Scenario proposto:** aprire una conversazione nuova nel progetto e inviare soltanto `Rispondi con la parola OK.`, senza indicazioni su GitHub, checkpoint o persistenza. Il risultato atteso era risposta `OK` **e** checkpoint obbligatorio con marker genuino della nuova conversazione.

**Evidenza dell'output:** l'utente ha riportato prima `OK` e ha chiarito espressamente al turno successivo che `OK` era **l'intera risposta della conversazione sperimentale**, non una conferma o un nuovo comando inviato in questa chat. La risposta non includeva un marker `ai-work-state`, né resoconto di checkpoint.

**Evidenza Git:** nel controllo dello store `massimilianonardi-ai/ai-work-state/main` effettuato dopo la ricezione del risultato `OK` e prima del salvataggio del checkpoint `0/17` di questa chat, il HEAD era ancora `0f74d2d645d820a000d0066ccd1161fadace6245`, ossia il commit già registrato dopo aver proposto il test. Il successivo commit `963111df72d1e9e2cc566c451653c532264e796d` registra **solo il checkpoint 0/17 della presente chat**, non una conversazione sperimentale. Anche il successivo controllo su `main` rileva quest'ultimo come HEAD. **Non risulta alcun commit autonomo della conversazione di test** nel periodo osservato.

**Limite:** poiché l'output sperimentale è esclusivamente `OK`, non dispone di un `chat-id`/marker verificabile; non è quindi possibile cercare esattamente il file del suo checkpoint per percorso. L'assenza di nuovi commit nella finestra rilevante, sul branch `main` configurato, costituisce però evidenza più ampia che non sia stata effettuata la prevista persistenza in quello store.

**Esito:** **PASS** per il contenuto minimale richiesto; **FAIL** per la finalizzazione universale nella prova osservata (marker assente e nessuna scrittura Git visibile). Il risultato rafforza l'ipotesi che la mancata finalizzazione non dipenda specificamente dal prefisso `!awx` visto nel caso C15: è stata osservata anche con una richiesta ordinaria non legata alla grammatica AI-Workflow. Non è ancora provata l'universalità del difetto né la sua causa tecnica.

**Priorità:** aprire una diagnosi circoscritta del percorso di finalizzazione, verificando l'effettiva applicazione del bootstrap, la disponibilità del connettore GitHub e le condizioni che portano a interrompere il checkpoint in richieste minimali. Nessun cambiamento al bootstrap né recupero di conversazioni sperimentali è stato autorizzato in questo ciclo. P4/P5/P6 rimangono sospesi. P7.1/P7.2 restano PARTIAL.

**Nota sulla fonte:** l'appartenenza della risposta `OK` alla nuova chat è una dichiarazione esplicita dell'utente; non va reinterpretata come esito generato in questa chat. 

## 15. Ipotesi di differenza tra app Android e browser — disegno A/B (22 novembre 2026)

**Nuovo dato fornito dall'utente:** tutti i recenti test di P7 citati sono stati eseguiti nell'app smartphone; in precedenza il browser web aveva gestito correttamente la persistenza. Il client di ciascun test non è comunque registrato in `branch-0.yaml` o nei checkpoint: l'attribuzione del client deriva dall'utente, non dai commit Git.

**Ipotesi:** la superficie di utilizzo (app Android versus browser web) è una variabile potenzialmente correlata a inizializzazione del bootstrap, strumenti GitHub disponibili, permessi/connettori o comportamento della finalizzazione. Non è stabilita alcuna causalità. Anche nel periodo Android sono state osservate persistenze conformi, quindi la spiegazione «mobile non supporta GitHub» è incompatibile con le evidenze disponibili come regola universale.

**Test A/B proposto — non ancora eseguito:**
- Test A: nuova chat nel progetto AI-Workflow, browser web, stessa utenza, stesso modello/modalità e stesso messaggio.
- Test B: nuova chat nel progetto AI-Workflow, app Android, stessa utenza, stesso modello/modalità e stesso messaggio.
- Prompt identico, senza istruzioni che impongano risposta esclusivamente minimale: `Che cos'è il DNS?`.
- Eseguire le due prove in prossimità temporale, mantenere quanto possibile identiche impostazioni e connessione a GitHub; registrare il client manualmente.
- Leggere entrambi gli output e marker. Verificare nel repository `ai-work-state/main` l'effettiva scrittura e rilettura del file `conversations/<chat-id>/branch-0.yaml` e del file canonico `requests/<chat-id>/0-000001.yaml` (per una chat inizializzata a `branch-0`), il campo `synchronization: complete`, `tasks: []`, e il commit Git per ciascuna prova.
- Un esito browser PASS/app FAIL costituisce evidenza di correlazione da ripetere, non causalità certa. Entrambi FAIL suggeriscono condizione condivisa; entrambi PASS suggeriscono difetto intermittente o differenza nel tipo di richiesta. Se l'esito è ambiguo, ripetere in ordine invertito e variare **una sola** dimensione per volta.

**Osservazione progettuale:** la risposta `Rispondi con la parola OK.` era vincolata a un output brevissimo, perciò è possibile un conflitto di priorità/percorso di generazione che sopprima marker e finalizzazione; l'esperimento `Che cos'è il DNS?` riduce questa variabile. Non si modifica il bootstrap prima dei risultati.

**Stato:** P7.1 e P7.2 `PARTIAL`; diagnosi del comportamento di finalizzazione avviata, confronto A/B **NOT RUN**; P4–P6 sospesi; nessuna modifica a task o file di regole.

## 16. Esperimento A/B: prova Android del DNS — scrittura riuscita, conformità parziale (22 novembre 2026)

**Dati provenienti dall'utente:** è stato identificato il client come **app Android**; il testo dell'output della conversazione nuova è una spiegazione di DNS con marker finale `ai-work-state: chat-id = 2026-11-22_14-16_056b77bd-b893-4db1-af73-db91e5e69b94; branch-id = 0; message-id = 1` e dichiarazione `persisted`. Il messaggio originale proposto è `Che cos'è il DNS?`. Questa identità è della chat sperimentale, non di quella che aggiorna il rapporto.

**Evidenza GitHub alla verifica:** lo store `massimilianonardi-ai/ai-work-state/main` aveva HEAD `ef06e13da9ad28b9b66c501d06c500db85d53436`.
- Commit iniziale `e83ab97e725a28c9c51b1afb84b1f790fe028492` (parent `d2755ccef350766afcd21194f8256c85d459f549`) crea due soli file della chat Android, stato e checkpoint numero 1; il commit è quindi la prova effettiva della scrittura della risposta DNS.
- Commit successivo `ef06e13da9ad28b9b66c501d06c500db85d53436` (parent `e83ab97e725a28c9c51b1afb84b1f790fe028492`) aggiunge un checkpoint della stessa chat, relativo a feedback Android sulla visualizzazione della risposta e tempo trascorso: numero 2. Non confondere il marker riportato del primo messaggio con lo stato successivamente avanzato della chat sperimentale.
- File attuale `conversations/2026-11-22_14-16_056b77bd-b893-4db1-af73-db91e5e69b94/branch-0.yaml`: `message_id: 2`, `tasks: []`, `sync_gaps: []`, ma **non** `synchronization: complete`.
- I request checkpoint realmente presenti sono `requests/<chat-id>/branch-0-000001.yaml` e `requests/<chat-id>/branch-0-000002.yaml`, con `checkpoint_integrity: complete` e `request_refs: null`. Entrambi i percorsi canonici `requests/<chat-id>/0-000001.yaml` e `0-000002.yaml` sono assenti (404).
- Task P3 storico invariato: `task-state.md` SHA `25286a3b9f225a936593b367408763c9f4eaaa4a`; `baseline-v001.md` SHA `86fd092e8b3d8a77ad23f9d0a56a620e09a91123`.

**Valutazione prova Android:** **PASS** contenuto/marker e scrittura GitHub reale (due commit), **FAIL** conformità del percorso checkpoint e mancanza del campo `synchronization`. La dichiarazione `persisted` è fondata quanto all'esistenza dei file, ma non dimostra piena conformità al protocollo. Lo stesso genere di non conformità era stato osservato in C01.

**Implicazione:** è falsa l'ipotesi che Android impedisca sempre la persistenza. Rimangono plausibili difetti intermittenti o differenze nell'applicazione delle istruzioni, nella modalità/modello, nella disponibilità del connettore e nella forma dei metadati. Il client non è memorizzato nei file Git: l'etichetta Android dipende dall'indicazione dell'utente.

**Prossima osservazione necessaria:** prova browser con lo **stesso** messaggio `Che cos'è il DNS?` in una nuova conversazione del medesimo progetto; riportare output completo e marker, poi verificare commit e formato. Non modificare bootstrap o task prima del confronto.

**Stato A/B:** Android osservato, **persistenza effettiva ma non conforme al 100%**; browser **NOT RUN / risultato non ancora fornito**. P7.1/P7.2 PARTIAL; P4/P5/P6 sospesi; P7.3–P7.5 non avviati.

## 17. Confronto A/B completato — prova browser DNS e comparazione con Android (22 novembre 2026)

**Prove, client identificato dall'utente:** due nuove chat nel progetto AI-Workflow, messaggio `Che cos'è il DNS?` inviato rispettivamente da app Android e browser web. Entrambe le risposte spiegano il DNS e terminano con dichiarazione `persisted` e un marker AI-Workflow genuino. I metadati Git non riportano direttamente il client: la piattaforma di ciascuna prova deriva da quanto fornito dall'utente.

**Android (già documentato nella sezione 16):**
- Chat `2026-11-22_14-16_056b77bd-b893-4db1-af73-db91e5e69b94`, commit iniziale `e83ab97e725a28c9c51b1afb84b1f790fe028492`.
- Il checkpoint del primo messaggio esiste a `requests/<chat-id>/branch-0-000001.yaml`, ma il percorso canonico `requests/<chat-id>/0-000001.yaml` manca.
- Il file di stato contiene `tasks: []`, `sync_gaps: []`, ma manca il campo `synchronization: complete`.
- Un secondo commit della stessa chat (`ef06e13da9ad28b9b66c501d06c500db85d53436`) porta il checkpoint a `message_id: 2`, senza correggere i problemi di convenzione.

**Browser web (nuovo risultato):**
- Chat `2026-11-22_14-18_5f58f0a0-49f2-4709-adde-5f4acbbc0b49`, marker riportato `branch-id = 0; message-id = 1`.
- Commit `5945bdaaef67f60767709c353a466fb0769d4647` (parent `ef06e13da9ad28b9b66c501d06c500db85d53436`, tree `d3f9de867fb0fac3d4e1124cba0b66076540125d`), messaggio `checkpoint: DNS explanation (2026-11-22_14-18)`.
- Diff rispetto al parent: soltanto `conversations/2026-11-22_14-18_5f58f0a0-49f2-4709-adde-5f4acbbc0b49/branch-0.yaml` e `requests/2026-11-22_14-18_5f58f0a0-49f2-4709-adde-5f4acbbc0b49/branch-0-000001.yaml`, entrambi aggiunti.
- Lo stato della chat web include `message_id: 1`, `tasks: []`, `sync_gaps: []`, ma **non** `synchronization: complete`.
- Il request checkpoint realmente salvato include `source_checkpoint: 0`, `request_refs: null`, delte task vuote e `checkpoint_integrity: complete`; il percorso canonico `requests/<chat-id>/0-000001.yaml` è assente (`404`).
- Il test browser non ha modificato task; SHA storico del task P3 `25286a3b9f225a936593b367408763c9f4eaaa4a`, baseline `86fd092e8b3d8a77ad23f9d0a56a620e09a91123`, ancora invariati alla verifica.

**Tabella comparativa della prova controllata:**

| Controllo | Android | Browser |
|---|---|---|
| Risposta DNS + marker | PASS | PASS |
| Effettiva scrittura nel repository | PASS | PASS |
| Percorso request checkpoint canonico | FAIL | FAIL |
| Campo `synchronization: complete` | FAIL | FAIL |
| Nessuna mutazione task nel commit di prova | PASS | PASS |

**Conclusione circoscritta:** nei due casi `Che cos'è il DNS?` l'app Android e il browser hanno lo stesso comportamento di persistenza: **scrittura Git riuscita ma checkpoint non pienamente conforme al bootstrap**. Non è sostenuta l'ipotesi di un problema **esclusivo** dell'app Android. Non è invece ancora stata isolata la causa del difetto intermittente `write_not_attempted` visto con C15 e della risposta solo `OK` senza marker; restano variabili potenziali la brevità del prompt, il percorso di interpretazione e la disponibilità o impiego degli strumenti.

**Priorità successiva:** valutare e testare separatamente due invarianti, mantenendo identico il client: (1) finalizzazione universale per input ordinario minimo; (2) formato canonico di tutti i checkpoint scritti. Confrontare l'effettivo bootstrap letto e i campi scritti in ciascuna prova, senza presumere che la semplice etichetta `persisted` basti. Nessuna modifica a `ai-workflow/bootstrap.md` né al task/alla baseline autorizzata in questo turno.

**Stato:** confronto A/B DNS **completato**, entrambi i client PASS per scrittura effettiva e FAIL per conformità dei metadati; P7.1/P7.2 ancora `PARTIAL`; P4/P5/P6 sospesi, P7.3–P7.5 non avviati.

## 18. Rettifica del giudizio sui checkpoint e riepilogo del contratto `requests/` (22 novembre 2026)

**Motivo:** a seguito della domanda dell'utente su tutte le decisioni prese riguardo `requests/`, è stato riesaminato il testo operativo di `ai-workflow/bootstrap.md`, `state/protocol.md`, `state/connector-runbook.md`, `doc/conversation-identity.md` e `ai-work-state/doc/persistence.md`, oltre alle validazioni P1–P3.

**Contratto deciso e attivo:**
- `requests/` è l'indice dei checkpoint delle **risposte**, non una copia integrale dei messaggi utente. Ogni risposta, anche con nessun task cambiato, comporta un record immutabile di request e l'avanzamento del ramo in `conversations/`.
- Percorso canonico `requests/<chat-id>/<branch-id>-<message-id-su-6-cifre>.yaml`. Esempio per primo messaggio del ramo 0: `requests/<chat-id>/0-000001.yaml`. Il nome `branch-0-000001.yaml` dei test del 22 novembre è davvero **non conforme alla convenzione**.
- Record minimo: `source_checkpoint`, `request_refs` (oppure `null` se i riferimenti effettivi al prompt non esistono), `tasks_added`, `tasks_removed`, `event_refs`, `checkpoint_integrity`. `request_refs: null` non dimostra il contenuto del prompt originario.
- Scrivere i due file amministrativi ed eventuali veri aggiornamenti task in un unico commit condizionale su `ai-work-state/main`, rileggere ref/file prima di dichiarare `persisted`; nessuna modifica a `dev`. Il repository è pubblico: niente transcript privati, segreti o informazioni sensibili.
- `source_checkpoint` identifica il punto di origine della risposta: per il primo messaggio `0`; il file si riferisce al `message-id` dell'output. In caso di ramo derivato, la numerazione continua dal checkpoint di origine.
- Lo storico serve anche per ricostruire associazioni ai task a un fork; mai inventare checkpoint storici perduti. Se vi sono lacune non recuperate, dichiarare `sync_gaps`, `synchronization: incomplete`, `persisted_with_gaps` e mantenere `sync = pending`.

**Rettifica di un errore di analisi già riportato nelle sezioni 11, 13, 16 e 17:** l'assenza del campo `synchronization: complete` nei file di stato dei test non costituisce **di per sé** una violazione dimostrata dalle norme operative. La specifica stabilisce espressamente `synchronization: incomplete` quando esistono gap, ma non prescrive in modo altrettanto esplicito la presenza materiale del campo `synchronization: complete` quando lo storico non ha gap. Conseguentemente, la classificazione `FAIL` per *quel solo campo mancante* è **ritirata**. Non interpretare `sync_gaps: []` come equivalente a una verifica indipendente della completezza, ma nemmeno il campo positivo assente come errore certo.

**Valutazione rettificata dell'A/B DNS:** sia Android sia browser hanno davvero persistito i checkpoint su GitHub; in entrambi si osserva una **non conformità del solo percorso del request record** rispetto alla regola di naming. Non sono documentati altri difetti certi del contenuto minimo dei due record. Il comportamento intermittente `write_not_attempted` di C15 e la risposta `OK` priva di marker restano test distinti da diagnosticare.

**Stato:** P7.1/P7.2 PARTIAL; P4/P5/P6 sospesi; nessun task o bootstrap modificato. Questa sezione rettifica esplicitamente i punti precedenti, che vanno letti alla luce della presente correzione.

## 19. Chiarimento architetturale richiesto dall'utente — conversazioni con `events/` e `snapshots/` (22 novembre 2026)

**Indicazione esplicita:** il comportamento di `conversations/` **deve rimanere come prima**. Non modificare la semantica dei file `conversations/<chat-id>/branch-N.yaml`, la numerazione e il modello dei rami. Aggiungere nella directory **di ciascuna conversazione** due sottodirectory concettuali:
```text
conversations/
  <chat-id>/
    branch-0.yaml
    branch-1.yaml
    events/
    snapshots/
```
- `events/`: registrazioni dei **cambiamenti di stato**, non di ogni risposta ordinaria.
- `snapshots/`: **fotografie del contesto necessario a riprendere il lavoro**.
- Queste due categorie sono collocate sotto la rispettiva chat, non in directory parallele globali.
- La decisione su `requests/` e su **quali dati salvare e quando** va riesaminata separatamente: non supporre che un record quasi vuoto per risposta equivalga all'archivio del testo delle chat; non cancellare né migrare storici prima di una decisione e di un piano di compatibilità.
- La specifica e la finalizzazione attualmente installate restano **operative** fino a un'eventuale revisione esplicita completa; per questa risposta rimane l'obbligo del checkpoint per turno.

**Stato:** chiarimento dei requisiti di struttura registrato, **nessun cambiamento attivo del bootstrap, del protocollo e dei task**. La creazione di una directory Git realmente vuota non è possibile senza file: la materializzazione delle due sottodirectory richiede un contenuto effettivo e la definizione del relativo schema, non file segnaposto arbitrari. P7.1 e P7.2 restano PARTIAL, P4–P6 sospesi.

## 20. Decisione attuata: eliminazione di `requests/` dallo stato attivo (22 novembre 2026)

**Autorizzazione esplicita dell'utente:** `requests va eliminato`. Resta invariato il comportamento dei file `conversations/<chat-id>/branch-N.yaml`, incluso il checkpoint di ramo per ogni risposta. Le sottodirectory `events/` (cambiamenti di stato effettivi) e `snapshots/` (fotografie del contesto necessario a riprendere il lavoro) risiedono sotto la directory della rispettiva chat.

**Implementazione della nuova architettura:** il bootstrap e i documenti di protocollo vengono aggiornati per dismettere la scrittura del request record a ogni risposta. Il repository `ai-work-state/main` non contiene più la directory `requests/` nell'albero attivo; i file storici non sono distrutti, essendo recuperabili dalla cronologia Git. La presente transizione è un cambiamento significativo registrato come event e come snapshot del contesto nella chat corrente, non un nuovo checkpoint ridondante per ogni risposta.

**Validazione:** verificare il branch finale, le directory `events/` e `snapshots/` in questa chat, l'assenza di `requests/` nel nuovo tree, la conservazione delle altre directory e dei task, e l'assenza di nuovi riferimenti operativi alla vecchia scrittura obbligatoria. Le sezioni storiche P7 anteriori a questa data documentano il comportamento **precedente** e non sono specifica attiva del nuovo schema. I nuovi test P7 dovranno verificare questa policy.

**Nota:** la revisione del protocollo non comporta un cambiamento della numerazione, dell'identità, o dei campi di `branch-N.yaml`; le regole di recovery devono usare la storia verificata dei rami e gli eventi pertinenti, senza fabbricare turni mancanti.

## 21. Validazione dopo eliminazione di `requests/`: nuova chat, due risposte (23 novembre 2026)

**Scenario eseguito dall'utente:** aprire nuova chat AI-Workflow e inviare `Che cos'è un indirizzo IP?`; nella stessa chat inviare `Grazie`. L'utente riporta dalla prima risposta l'avviso: `Incongruenza rilevata: il bootstrap pubblicato richiede ancora requests/` e dalla seconda risposta `Prego! ... checkpoint persisted` con marker `chat-id = 2026-11-23_07-41_cf74cdf0-ce50-4822-b05e-7d2ea82a8dfc; branch-id = 0; message-id = 2`.

**Verifica GitHub — commit:**
- Prima risposta `27142993705a8d3a4717f4148d9492667f3be287` (parent `8e8e7ba4d0a8f69586288d0dcd020d11bce39565`): crea `conversations/<trial-chat>/branch-0.yaml` **e** `requests/<trial-chat>/0-000001.yaml`. **FAIL:** ricrea la directory eliminata e produce un record per risposta vietato dalla nuova regola. Il file richieste contiene i consueti metadati vuoti e non il transcript.
- Seconda risposta `5bc47288bcbd24de2deb190cb9d21333ab838acb` (parent `27142993705a8d3a4717f4148d9492667f3be287`): modifica **solo** `conversations/<trial-chat>/branch-0.yaml`, da `message_id: 1` a `message_id: 2`. **PASS:** nessun nuovo request record, evento o snapshot inutile.
- Stato corrente sperimentale: `message_id: 2`, `tasks: []`, `sync_gaps: []`. Il file include anche `chat_id`, `branch_id` e `updated_at` ridondanti rispetto al modello essenziale precedente: annotato come rilievo separato, senza alterare ora la chat sperimentale.
- Lo store `ai-work-state/main` conserva, a seguito della prima risposta, `requests/<trial-chat>/0-000001.yaml`. Questa osservazione è preservata come evidenza del FAIL; non è stata rimossa né ricostruita.

**Verifica bootstrap attualmente pubblicato:**
- `ai-workflow/main` HEAD `eb6aee37f3cddfd3b362f94f16065a1f459bf2c2`; commit di rimozione delle richieste datato 22/11/2026, ore 13:59:38 UTC. Il test nuovo è del 23/11/2026. Il testo corrente del bootstrap dice espressamente che `requests/` e i relativi record per risposta sono dismessi. Quindi **non è vero** che il bootstrap attuale pubblicato su `main` richieda ancora `requests/`.
- Le istruzioni di questo progetto includono un collegamento non canonico `https://github.com/massimilianonardi-ai/ai-workflow/bootstrap.md`. La prova di accesso via connettore GitHub produce `INVALID_ARGUMENT` per tale URL. Il collegamento canonico `https://github.com/massimilianonardi-ai/ai-workflow/blob/main/bootstrap.md` restituisce il testo aggiornato; anche `fetch_file` del percorso `bootstrap.md` su `main` è riuscito.
- **Ipotesi, non causa provata:** nella prima risposta sperimentale il bootstrap potrebbe essere stato letto tramite un riferimento sbagliato, una fonte obsoleta o istruzioni non aggiornate, inducendo la scrittura legacy. Non abbiamo i log interni di lettura effettiva della chat sperimentale. Non attribuire causalità certa al client o all'URL senza un nuovo test controllato.

**Esito:** nuova conversazione inizializzata, continuità `0/1 → 0/2` e persistenza Git riuscite; **FAIL della conformità del primo checkpoint** alla regola che elimina `requests/`; **PASS del secondo checkpoint**. La finalizzazione opera, ma l'inizializzazione della chat applica in modo incoerente lo schema.

**Prossimo test:** correggere nelle istruzioni del progetto il collegamento al bootstrap canonico (se presente con URL incompleto) e ripetere la creazione di una nuova chat con richiesta ordinaria e un secondo messaggio. Verificare per il *primo* commit l'assenza di `requests/` e presenza di solo `branch-0.yaml`, e al secondo avanzamento il contatore `message_id: 2`. Non modificare i file della chat di prova per non compromettere l'evidenza. P7.1/P7.2 continuano `PARTIAL`; P4–P6 sospesi.
