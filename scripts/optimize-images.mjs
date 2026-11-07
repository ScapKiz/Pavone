#!/usr/bin/env node
/**
 * Genera le versioni WebP usate dal sito in public/images/web/ partendo dagli originali.
 * Non altera i colori: ridimensiona, ritaglia dove serve e comprime (qualità 82).
 *
 * I ritagli delle foto 01, 02 e 08 eliminano elementi rimasti impressi nei file originali
 * (frecce del vecchio carosello Wix, scritta in basso).
 *
 * Uso: npm run images:optimize
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const IMG = join(ROOT, 'public/images');
const OUT = join(IMG, 'web');
await mkdir(OUT, { recursive: true });

/** extract in frazioni dell'originale: [sinistra, alto, larghezza, altezza] */
const JOBS = [
  { src: 'originali/sala-pavone.png', name: 'sala', widths: [800, 1591] },
  { src: 'originali/sala-pavone.png', name: 'sala-parete', crop: [0, 0.02, 0.3, 0.78], widths: [480] },
  { src: 'originali/staff-pavone.jpg', name: 'staff', widths: [640, 1000] },
  { src: 'galleria/galleria-01.png', name: 'galleria-01', crop: [0.085, 0, 0.83, 0.98], widths: [389] },
  { src: 'galleria/galleria-02.jpg', name: 'galleria-02', crop: [0.07, 0.012, 0.86, 0.988], widths: [800, 1800] },
  { src: 'galleria/galleria-03.jpg', name: 'galleria-03', widths: [640, 1000] },
  { src: 'galleria/galleria-04.jpg', name: 'galleria-04', widths: [734] },
  { src: 'galleria/galleria-05.jpg', name: 'galleria-05', widths: [640, 1000] },
  { src: 'galleria/galleria-06.jpg', name: 'galleria-06', widths: [640, 1000] },
  { src: 'galleria/galleria-07.jpg', name: 'galleria-07', widths: [800, 1800] },
  { src: 'galleria/galleria-08.jpg', name: 'galleria-08', crop: [0, 0.04, 1, 0.92], widths: [800, 1400] },
  { src: 'tematiche/baccala-vicentina.jpg', name: 'baccala', widths: [800] },
  { src: 'tematiche/bigoli.jpg', name: 'bigoli', widths: [800] },
  { src: 'tematiche/risotto-radicchio.jpg', name: 'risotto', widths: [800] },
];

for (const job of JOBS) {
  const file = join(IMG, job.src);
  const meta = await sharp(file).metadata();
  const region = job.crop && {
    left: Math.round(job.crop[0] * meta.width),
    top: Math.round(job.crop[1] * meta.height),
    width: Math.round(job.crop[2] * meta.width),
    height: Math.round(job.crop[3] * meta.height),
  };
  for (const w of job.widths) {
    let img = sharp(file).rotate();
    if (region) img = img.extract(region);
    const { data, info } = await img
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82, smartSubsample: true })
      .toBuffer({ resolveWithObject: true });
    const out = `${job.name}-${w}.webp`;
    await writeFile(join(OUT, out), data);
    console.log(`${out.padEnd(26)} ${info.width}x${info.height}  ${Math.round(data.length / 1024)} KB`);
  }
}

// Logo completo (bianco su trasparente) e pavone senza scritta, tinto oro.
const logo = await sharp(join(IMG, 'originali/logo-pavone.png')).resize({ width: 480 }).webp({ quality: 90 }).toBuffer();
await writeFile(join(OUT, 'logo.webp'), logo);

const alpha = await sharp(join(IMG, 'originali/logo-2.png'))
  .ensureAlpha()
  .extractChannel('alpha')
  .resize({ width: 192 })
  .toBuffer();
const { width, height } = await sharp(alpha).metadata();
const mark = await sharp({ create: { width, height, channels: 3, background: '#c9a24b' } })
  .joinChannel(alpha)
  .webp({ quality: 92 })
  .toBuffer();
await writeFile(join(OUT, 'pavone-oro.webp'), mark);
console.log(`pavone-oro.webp ${width}x${height}`);

// Icone e immagine di condivisione.
const iconBg = { r: 16, g: 33, b: 26, alpha: 1 };
const inner = await sharp(join(IMG, 'originali/logo-2.png')).ensureAlpha().extractChannel('alpha').resize({ width: 150 }).toBuffer();
const im = await sharp(inner).metadata();
const gold = await sharp({ create: { width: im.width, height: im.height, channels: 3, background: '#c9a24b' } })
  .joinChannel(inner)
  .png()
  .toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: iconBg } })
  .composite([{ input: gold, gravity: 'center' }])
  .png()
  .toFile(join(ROOT, 'public/favicon.png'));
await sharp(join(IMG, 'originali/sala-pavone.png'))
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 82 })
  .toFile(join(OUT, 'og.jpg'));
console.log('favicon.png, og.jpg');
