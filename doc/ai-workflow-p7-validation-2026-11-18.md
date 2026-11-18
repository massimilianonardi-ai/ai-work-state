# AI-Workflow — P7, primo ciclo di verifica (18 novembre 2026)

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
