# Note sul menù e sui contenuti da verificare

Fonte: https://www.trattoriailpavone.com/menus. Prezzi e categorie sono quelli del vecchio sito.
I refusi evidenti sono stati corretti su richiesta (elenco al punto 2).

## 1. Prezzi: vale il menù italiano (confermato)

Il vecchio sito ha due carte separate con quattro prezzi discordanti. Il nuovo sito usa un unico prezzo
per tutte le lingue: quello del **Menù alla Carta italiano**, confermato come corretto.

| Piatto | Menù italiano (usato) | Deutsche Speisekarte |
| --- | --- | --- |
| Panaro con Baccalà Mantecato | 12,00 € | 10,00 € |
| Polenta, Musetto, Crauti e Purè al Tartufo (antipasto) | 13,50 € | 18,00 € |
| Panaro del Pavone | 14,00 € | 15,00 € |
| Crespelle Radicchio e Asiago | 13,00 € | 13,50 € |

Per correggere un prezzo basta modificarlo in `src/data/menu.ts`.

Altre differenze della carta tedesca: "Verdure Grigliate" non compare (la descrizione tedesca
"Gegrilltes Gemüse" è stata aggiunta) e la polenta è ripetuta due volte nei piatti unici (qui una sola).

## 2. Refusi corretti rispetto al vecchio sito

**Italiano** (`src/data/menu.ts`, `src/locales/it.json`)

| Vecchio sito | Nuovo sito |
| --- | --- |
| Carpaccio di Manzo conRadicchio Marinato | Carpaccio di Manzo con Radicchio Marinato |
| Tagliatelle al Rdicchio e Morlacco | Tagliatelle al Radicchio e Morlacco |
| Isalata Mista | Insalata Mista |
| Purè al Tarufo | Purè al Tartufo |
| Gewurstraminer | Gewürztraminer |
| fioccho di Sauris | fiocco di Sauris |
| Tagliata di sorana alla brace | Tagliata di Sorana alla brace |
| Cerimonie, feste o complenni? su prenotazione… | Cerimonie, feste o compleanni? Su prenotazione… |

**Inglese** (`src/locales/en.json`)

| Vecchio sito | Nuovo sito |
| --- | --- |
| Radish (11 descrizioni) | Radicchio |
| Arccia Porchetta | Ariccia Porchetta |
| Tagliatellle | Tagliatelle |
| Crème Brûlée (per Crema Catalana) | Catalan Cream |
| Sauerkraut (per Crauti Rossi) | Red Sauerkraut |

**Tedesco** (`src/locales/de.json`)

| Vecchio sito | Nuovo sito |
| --- | --- |
| Komplette Huptgerichte | Komplette Hauptgerichte |
| Rettich (Piatto Rustico) | Radicchio |
| Crème Brûlée (per Crema Catalana) | Crema Catalana |
| House aperitif | Hausaperitif |
| Lemon Tea / Peach Tea | Zitroneneistee / Pfirsicheistee |
| White Spritz | Weißer Spritz |

## 3. Correzioni confermate

- **Piatto Rustico**: contiene radicchio. "Radish" e "Rettich" del vecchio sito indicano il ravanello, quindi
  in tutte le lingue è scritto radicchio.
- **Thè al Limone e Thè alla Pesca**: sono tè freddi in lattina, e le traduzioni lo indicano.
- **Storia**: la forma corretta è Don Pirani. Il vecchio sito scriveva anche "Don Pirami".

## 4. Altri punti

- **Menù per gruppi e PDF**: il PDF collegato alla vecchia home riporta "bevande escluse", assente dalla pagina
  web e mantenuto nel nuovo sito. Accanto agli antipasti del Classico e dell'Innovazione il testo estratto contiene
  anche "42" e "45", mentre in fondo alle stesse pagine si legge 43 e 46 come sul sito. Il nuovo sito usa 43, 46 e
  50 € e non pubblica il PDF finché la differenza non è chiarita.
- **Email**: nel brief è spezzata ("ilpavone snc@gmail.com"), come nel piè di pagina del vecchio sito.
  La pagina Contatti riporta `ilpavonesnc@gmail.com`, che è l'indirizzo usato.
- **Orari**: "Martedì - Sababato" è stato corretto in "Martedì – Sabato".
- **Staff**: la foto non indica i nomi delle persone. Non è stato scritto che siano membri della famiglia Lunardon.
- **Testi della sezione Cucina**: sono ricavati dal testo originale e riordinati per le sette voci richieste.
  Le frasi su risotti e baccalà sono state composte con informazioni del sito e del menù: da far rileggere.
- **Contatti**: la frase "ai piedi del Grappa" è un'aggiunta geografica, non viene dal vecchio sito.
- **Traduzioni**: spagnolo e francese, le descrizioni del menù per gruppi, le frasi del sito e le recensioni
  tradotte non esistono nell'originale. Sono traduzioni statiche da far rileggere a un madrelingua.
