import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { LANGUAGES } from '../i18n/languages';
import { Flag } from './Flag';

/** Menu a tendina con bandiera e nome della lingua. */
export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const current = LANGUAGES.find((l) => l.code === lang)!;

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const onListKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const buttons = Array.from(e.currentTarget.querySelectorAll('button'));
    const at = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const next = (at + (e.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next].focus();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        className="flex min-h-11 cursor-pointer items-center gap-2 px-1.5 text-base transition-colors hover:text-gold-strong sm:px-2"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t.nav.chooseLanguage}: ${current.label}`}
        onClick={() => setOpen((v) => !v)}
      >
        <Flag lang={lang} />
        <span className="hidden xl:inline">{current.label}</span>
        <ChevronDown size={16} aria-hidden className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        // taste-skill-ignore: ombra su un vero menu sovrapposto
        <ul
          id={listId}
          aria-label={t.nav.chooseLanguage}
          onKeyDown={onListKey}
          className="absolute right-0 top-full z-50 mt-2 w-52 bg-paper py-2 text-paper-ink shadow-[0_12px_32px_rgb(0_0_0/0.4)]"
        >
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                lang={l.code}
                aria-current={l.code === lang ? 'true' : undefined}
                autoFocus={l.code === lang}
                className="flex min-h-12 w-full cursor-pointer items-center gap-3 px-4 text-left text-[1.0625rem] transition-colors hover:bg-paper-tone focus-visible:bg-paper-tone focus-visible:outline-offset-[-3px] focus-visible:outline-paper-gold"
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
              >
                <Flag lang={l.code} />
                <span className="flex-1">{l.label}</span>
                {l.code === lang && <Check size={18} aria-hidden className="text-paper-gold" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
