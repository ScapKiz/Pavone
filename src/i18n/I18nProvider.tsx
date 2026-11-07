import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import it from '../locales/it.json';
import { DEFAULT_LANG, pageUrl, storeLang, type Lang } from './languages';

type Base = typeof it;
/** Le voci del menù variano da lingua a lingua: l'italiano ne ha solo alcune. */
export type Messages = Omit<Base, 'menuData'> & {
  menuData: Omit<Base['menuData'], 'items' | 'groupLines'> & {
    items: Record<string, string>;
    groupLines: Record<string, string>;
  };
};

const loaders: Record<Exclude<Lang, 'it'>, () => Promise<{ default: unknown }>> = {
  en: () => import('../locales/en.json'),
  es: () => import('../locales/es.json'),
  de: () => import('../locales/de.json'),
  fr: () => import('../locales/fr.json'),
};

export async function loadMessages(lang: Lang): Promise<Messages> {
  if (lang === 'it') return it as Messages;
  const mod = await loaders[lang]();
  return mod.default as Messages;
}

interface I18nValue {
  lang: Lang;
  t: Messages;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

function applyDocumentMeta(lang: Lang, t: Messages) {
  document.documentElement.lang = lang;
  document.title = t.meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.meta.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.meta.description);
}

export function I18nProvider(props: { initialLang: Lang; initialMessages: Messages; children: ReactNode }) {
  const [state, setState] = useState({ lang: props.initialLang, t: props.initialMessages });

  useEffect(() => applyDocumentMeta(state.lang, state.t), [state]);

  const setLang = useCallback((lang: Lang) => {
    storeLang(lang);
    if (!import.meta.env.DEV) {
      window.history.replaceState(null, '', pageUrl(lang) + window.location.hash);
    }
    loadMessages(lang)
      .then((t) => setState({ lang, t }))
      .catch(() => {
        /* Se il file di lingua non arriva (rete assente) resta la lingua corrente. */
        loadMessages(DEFAULT_LANG);
      });
  }, []);

  const value = useMemo(() => ({ ...state, setLang }), [state, setLang]);
  return <I18nContext.Provider value={value}>{props.children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n va usato dentro I18nProvider');
  return value;
}

/** Sostituisce i segnaposto {nome} in una stringa tradotta. */
export const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));
