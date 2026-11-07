#!/usr/bin/env node
/**
 * Scarica le fotografie originali dal vecchio sito Wix e le salva in public/images/.
 *
 * L'URL Wix "static.wixstatic.com/media/<id>" senza trasformazioni (/v1/fill/...)
 * restituisce il file caricato originariamente, cioè la massima qualità disponibile.
 *
 * Uso: npm run images:download
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.trattoriailpavone.com/';
const MEDIA = 'https://static.wixstatic.com/media/';
const UA = 'Mozilla/5.0 (compatible; PavoneSiteMigration/1.0)';

/** Le 8 foto della galleria, nell'ordine in cui compaiono nel sito originale. */
const GALLERY = [
  'dba338_cfb8311dc9a440f4bd34115530a53d1a~mv2.png',
  'dba338_0683d2bfd70747a386665100693f3887~mv2.jpg',
  'dba338_b8a20ac295ae44088db4a5520844c2a1~mv2.jpg',
  'dba338_c710185271984a97875a457d186f55de~mv2.jpg',
  'dba338_dfde54787a0e4655917fb211008e21cc~mv2.jpg',
  'dba338_d4ab2fa3e01546e18093d12274ddac05~mv2.jpg',
  '11062b_e2afdafa399740b7b7c85fcb44ad5a4a~mv2.jpg',
  'dba338_7eff865e79f0448a984638f4b8e52ff2~mv2.jpg',
];

/** Altre immagini della home: sala, staff e logo. */
const OTHERS = [
  ['dba338_45014ef994a8426aa827c8c837557d92~mv2.png', 'originali/sala-pavone'],
  ['dba338_8d6fe088790946c1a794a376a5e01c62~mv2.jpg', 'originali/staff-pavone'],
  ['dba338_2dda224e3ea04739a3abbee33ce6228a~mv2.png', 'originali/logo-pavone'],
  ['dba338_2942b03f3acc4157ad7e87cfbd50f9fc~mv2.png', 'originali/logo-2'],
  ['dba338_a288c08da34d4190b7c479330f72644f~mv2.png', 'originali/logo-3'],
  ['dba338_e19c666583684e2697bac46ae8085d1b~mv2.png', 'originali/favicon'],
];

async function save(id, relBase) {
  const res = await fetch(MEDIA + id, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  // Verifica che il file sia davvero un'immagine leggibile, non una pagina di errore.
  const meta = await sharp(buf).metadata();
  const ext = meta.format === 'jpeg' ? 'jpg' : meta.format;
  const rel = `public/images/${relBase}.${ext}`;
  const out = join(ROOT, rel);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, buf);
  return { rel, width: meta.width, height: meta.height, kb: Math.round(buf.length / 1024) };
}

const html = await (await fetch(SITE, { headers: { 'User-Agent': UA } })).text();
const report = { found: GALLERY.length, ok: [], failed: [] };

for (const [i, id] of GALLERY.entries()) {
  const name = `galleria/galleria-${String(i + 1).padStart(2, '0')}`;
  try {
    if (!html.includes(id)) console.warn(`  attenzione: ${id} non compare più nella pagina`);
    const r = await save(id, name);
    report.ok.push(r);
    console.log(`OK  ${r.rel}  ${r.width}x${r.height}  ${r.kb} KB`);
  } catch (err) {
    report.failed.push({ id, error: String(err) });
    console.error(`ERR ${id}: ${err}`);
  }
}

for (const [id, name] of OTHERS) {
  try {
    const r = await save(id, name);
    console.log(`OK  ${r.rel}  ${r.width}x${r.height}  ${r.kb} KB`);
  } catch (err) {
    console.error(`ERR ${id}: ${err}`);
  }
}

console.log(`\nGalleria: individuate ${report.found}, scaricate ${report.ok.length}, non recuperate ${report.failed.length}`);
if (report.failed.length) process.exitCode = 1;
