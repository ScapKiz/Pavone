import { copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const LANGS = ['it', 'en', 'es', 'de', 'fr'] as const;

/**
 * Dopo la build crea una pagina statica per ogni lingua (/en/, /es/, /de/, /fr/)
 * con lang, title, description e hreflang corretti, così i motori di ricerca le
 * indicizzano senza eseguire JavaScript. Rimuove inoltre da dist gli originali
 * pesanti che il sito non carica mai (restano nel repository).
 */
function languagePages(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/$/, '');
  const urlFor = (l: string) => (l === 'it' ? `${base}/` : `${base}/${l}/`);
  return {
    name: 'pavone-language-pages',
    apply: 'build',
    async closeBundle() {
      const dist = resolve('dist');
      const template = await readFile(join(dist, 'index.html'), 'utf8');
      const alternates = [
        ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${urlFor(l)}" />`),
        `<link rel="alternate" hreflang="x-default" href="${urlFor('it')}" />`,
      ].join('\n    ');

      for (const lang of LANGS) {
        const locale = JSON.parse(await readFile(resolve(`src/locales/${lang}.json`), 'utf8'));
        const { title, description } = locale.meta as { title: string; description: string };
        const safe = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
        let html = template
          .replace('<html lang="it">', `<html lang="${lang}">`)
          .replace(/<title>.*?<\/title>/s, `<title>${safe(title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${safe(description)}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${safe(title)}`)
          .replace(/(<meta property="og:description" content=")[^"]*/, `$1${safe(description)}`)
          .replace(/(<meta property="og:url" content=")[^"]*/, `$1${urlFor(lang)}`)
          .replace(/(<meta property="og:image" content=")[^"]*/, `$1${base}/images/web/og.jpg`)
          .replace(/(<meta property="og:locale" content=")[^"]*/, `$1${lang}`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${urlFor(lang)}`)
          .replace('<!--alternates-->', alternates);
        if (lang !== 'it') {
          html = html.replace(/(href|src)="\.\//g, '$1="../');
          await mkdir(join(dist, lang), { recursive: true });
          await writeFile(join(dist, lang, 'index.html'), html);
        } else {
          await writeFile(join(dist, 'index.html'), html);
        }
      }

      await copyFile(join(dist, 'index.html'), join(dist, '404.html'));
      await rm(join(dist, 'images/originali'), { recursive: true, force: true });
      await rm(join(dist, 'images/tematiche'), { recursive: true, force: true });
      await rm(join(dist, 'images/galleria'), { recursive: true, force: true });
      for (const f of await readdir(join(dist, 'images'))) {
        if (f.endsWith('.jpg')) await rm(join(dist, 'images', f));
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = env.VITE_SITE_URL || 'https://www.trattoriailpavone.com';
  return {
    // Percorsi relativi: funziona sia su username.github.io/repo/ sia su un dominio proprio.
    base: './',
    plugins: [react(), tailwindcss(), languagePages(siteUrl)],
    build: { target: 'es2020', cssMinify: true },
  };
});
