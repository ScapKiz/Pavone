import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/source-sans-3';
import './styles/index.css';
import App from './App';
import { I18nProvider, loadMessages } from './i18n/I18nProvider';
import { DEFAULT_LANG, langFromPath, readStoredLang } from './i18n/languages';

// Priorità: pagina di lingua aperta direttamente, poi scelta salvata, poi italiano.
const initialLang = langFromPath() ?? readStoredLang() ?? DEFAULT_LANG;

const start = (lang: typeof initialLang, messages: Awaited<ReturnType<typeof loadMessages>>) =>
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <I18nProvider initialLang={lang} initialMessages={messages}>
        <App />
      </I18nProvider>
    </StrictMode>,
  );

loadMessages(initialLang)
  .then((messages) => start(initialLang, messages))
  .catch(() => loadMessages(DEFAULT_LANG).then((messages) => start(DEFAULT_LANG, messages)));
