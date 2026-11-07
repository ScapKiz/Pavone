export const LANGUAGES = [
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
] as const;

export type Lang = (typeof LANGUAGES)[number]['code'];

const CODES = LANGUAGES.map((l) => l.code) as readonly string[];
export const DEFAULT_LANG: Lang = 'it';
export const STORAGE_KEY = 'pavone-lang';

export const isLang = (value: unknown): value is Lang =>
  typeof value === 'string' && CODES.includes(value);

/** Lingua indicata dal percorso (/en/, /de/...), se presente. */
export function langFromPath(pathname = window.location.pathname): Lang | null {
  const last = pathname.split('/').filter(Boolean).pop();
  return isLang(last) && last !== DEFAULT_LANG ? last : null;
}

export function readStoredLang(): Lang | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function storeLang(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* localStorage non disponibile: la scelta vale solo per questa visita */
  }
}

/** Radice del sito calcolata una sola volta, prima che il cambio lingua modifichi l'URL. */
const ROOT_URL = new URL(
  import.meta.env.DEV ? '/' : langFromPath() ? '../' : './',
  window.location.href,
).href;

export const assetUrl = (path: string) => ROOT_URL + path;

/** URL pubblico di una lingua: la radice per l'italiano, /<lingua>/ per le altre. */
export const pageUrl = (lang: Lang) => (lang === DEFAULT_LANG ? ROOT_URL : `${ROOT_URL}${lang}/`);
