# Trattoria Il Pavone

Sito ufficiale della Trattoria Il Pavone, Romano d'Ezzelino (VI). Dal 1941.
Sito statico mobile first in cinque lingue, costruito con React, TypeScript, Vite, Tailwind CSS e Lucide React.

## Avvio

Serve Node.js 22 o superiore.

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` crea la cartella `dist/`, con una pagina statica per ogni lingua: `/`, `/en/`, `/es/`, `/de/`, `/fr/`.

## Struttura

```
public/images/
  galleria/          le 8 foto originali scaricate dal vecchio sito
  originali/         sala, staff e logo in massima qualità
  tematiche/         3 foto con licenza aperta (baccalà, bigoli, risotto)
  web/               versioni WebP usate dal sito (generate)
scripts/
  download-gallery.mjs   scarica gli originali da Wix
  optimize-images.mjs    genera i WebP in public/images/web/
src/
  components/        Header, selettore lingua, pulsante prenota, lightbox...
  sections/          Hero, Cucina, Storia, Menù, Galleria, Recensioni, Contatti, Footer
  locales/           it.json, en.json, es.json, de.json, fr.json
  data/              menu.ts (piatti e prezzi), site.ts (contatti e orari), images.ts
  i18n/              caricamento e memorizzazione della lingua
  styles/index.css   palette, tipografia, animazioni
docs/NOTE-MENU.md    incongruenze del vecchio sito da verificare
```

## Modifiche frequenti

| Cosa | Dove |
| --- | --- |
| Testi e traduzioni | `src/locales/<lingua>.json` |
| Piatti, prezzi, vini | `src/data/menu.ts` |
| Descrizione di un piatto in una lingua | `menuData.items` in `src/locales/<lingua>.json`, stesso `id` di `menu.ts` |
| Telefono, email, link di prenotazione, orari | `src/data/site.ts` (orari anche in `contact.hours` di ogni lingua) |
| Colori e font | `@theme` in `src/styles/index.css` |

## Lingue

L'italiano è la lingua predefinita al primo accesso. La scelta viene salvata in `localStorage` (`pavone-lang`)
e mantenuta alle visite successive. Le traduzioni sono file statici: nessuna traduzione automatica a runtime.

## Immagini

```bash
npm run images:download
npm run images:optimize
```

Il primo comando riscarica gli originali da Wix, il secondo rigenera i WebP. Per sostituire una foto, metti
il file nella cartella giusta, aggiorna l'elenco in `scripts/optimize-images.mjs` e le dimensioni in
`src/data/images.ts`. Le foto originali restano nel repository, ma non vengono pubblicate in `dist/`.

### Crediti delle foto illustrative

Foto usate solo nella sezione Cucina, per le voci senza una foto del ristorante. Il credito è nel footer.

| Foto | Autore | Licenza | Fonte |
| --- | --- | --- | --- |
| Baccalà tradizionale alla vicentina | Alessandro Giannini | CC BY 2.0 | https://commons.wikimedia.org/w/index.php?curid=29566968 |
| Bigoli2 | Popo le Chien | CC0 | https://commons.wikimedia.org/w/index.php?curid=65328551 |
| Risotto with radicchio and oranges | Luca Nebuloni | CC BY 2.0 | https://commons.wikimedia.org/w/index.php?curid=57440977 |

## Pubblicazione su GitHub Pages

1. Crea un repository su GitHub e carica il progetto sul branch `main`.
2. In **Settings → Pages**, alla voce **Source**, scegli **GitHub Actions**.
3. In **Settings → Secrets and variables → Actions → Variables**, crea `SITE_URL` con l'indirizzo pubblico
   (per esempio `https://www.trattoriailpavone.com` oppure `https://utente.github.io/nome-repo`).

Ogni push su `main` pubblica il sito con `.github/workflows/deploy.yml`. I percorsi sono relativi, quindi il sito
funziona sia in una sottocartella sia su un dominio proprio. Per il dominio proprio aggiungi `public/CNAME`.
