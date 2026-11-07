import { assetUrl } from '../i18n/languages';

export interface WebImage {
  name: string;
  widths: number[];
  width: number;
  height: number;
}

const img = (name: string, widths: number[], width: number, height: number): WebImage => ({
  name,
  widths,
  width,
  height,
});

/** Immagini generate da scripts/optimize-images.mjs in public/images/web/. */
export const IMAGES = {
  sala: img('sala', [800, 1591], 1591, 989),
  salaParete: img('sala-parete', [480], 477, 771),
  staff: img('staff', [640, 1000], 1000, 690),
  baccala: img('baccala', [800], 800, 497),
  bigoli: img('bigoli', [800], 800, 600),
  risotto: img('risotto', [800], 800, 533),
  g01: img('galleria-01', [389], 389, 287),
  g02: img('galleria-02', [800, 1800], 1800, 1310),
  g03: img('galleria-03', [640, 1000], 1000, 645),
  g04: img('galleria-04', [734], 734, 367),
  g05: img('galleria-05', [640, 1000], 1000, 813),
  g06: img('galleria-06', [640, 1000], 1000, 568),
  g07: img('galleria-07', [800, 1800], 1800, 1202),
  g08: img('galleria-08', [800, 1400], 1400, 966),
} as const;

export const src = (image: WebImage, width = image.widths[image.widths.length - 1]) =>
  assetUrl(`images/web/${image.name}-${width}.webp`);

export const srcSet = (image: WebImage) =>
  image.widths.map((w) => `${src(image, w)} ${w}w`).join(', ');

/** Foto della sezione "La Nostra Cucina", nell'ordine del brief. */
export const KITCHEN_PHOTOS = [
  { id: 'antipasti', image: IMAGES.g03, position: '50% 50%' },
  { id: 'pasta', image: IMAGES.bigoli, position: '60% 50%' },
  { id: 'risotti', image: IMAGES.risotto, position: '72% 50%' },
  { id: 'carne', image: IMAGES.g08, position: '35% 50%' },
  { id: 'asparagi', image: IMAGES.g02, position: '50% 50%' },
  { id: 'baccala', image: IMAGES.baccala, position: '22% 50%' },
  { id: 'dolci', image: IMAGES.g05, position: '42% 50%' },
] as const;

/**
 * Le 8 foto della galleria del vecchio sito. "index" punta a gallery.alts nei file di lingua.
 * "layout" definisce la griglia a mosaico: mobile 2 colonne, da tablet in su 4 colonne.
 */
export const GALLERY_PHOTOS = [
  { index: 1, image: IMAGES.g02, layout: 'col-span-2 row-span-2' },
  { index: 0, image: IMAGES.g01, layout: '' },
  { index: 2, image: IMAGES.g03, layout: '' },
  { index: 4, image: IMAGES.g05, layout: '' },
  { index: 3, image: IMAGES.g04, layout: '' },
  { index: 5, image: IMAGES.g06, layout: '' },
  { index: 6, image: IMAGES.g07, layout: 'col-span-2' },
  { index: 7, image: IMAGES.g08, layout: '' },
] as const;
