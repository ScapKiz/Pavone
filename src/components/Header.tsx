import { Menu as MenuIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { assetUrl } from '../i18n/languages';
import { useI18n } from '../i18n/I18nProvider';
import { NAV_ITEMS, PHONE_DISPLAY, PHONE_HREF } from '../data/site';
import { BookButton } from './BookButton';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-bg">
      <div className="page-x flex h-[var(--header-h)] items-center justify-between gap-2">
        <a href="#top" aria-label={t.nav.home} className="flex min-h-11 min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={assetUrl('images/web/pavone-oro.webp')} alt="" width={192} height={105} className="h-8 w-auto md:h-10" />
          {/* Sugli schermi stretti resta il pavone: "Reservieren" occupa più spazio degli altri pulsanti. */}
          <span
            className={`font-display text-xl leading-none tracking-tight whitespace-nowrap max-[379px]:hidden md:text-[1.375rem] ${
              lang === 'de' ? 'max-[439px]:hidden' : ''
            }`}
          >
            Il Pavone
          </span>
        </a>

        <nav aria-label={t.nav.menu} className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-11 items-center text-[1.0625rem] whitespace-nowrap transition-colors hover:text-gold-strong"
                >
                  {t.nav[item.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher />
          <BookButton className="btn-sm" />
          <button
            type="button"
            className="-mr-2 flex size-11 cursor-pointer items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} aria-hidden /> : <MenuIcon size={26} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label={t.nav.menu}
          className="page-x fixed inset-x-0 top-[var(--header-h)] bottom-0 flex flex-col overflow-y-auto bg-bg pb-8 lg:hidden"
        >
          <ul className="flex flex-col pt-6">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.id} className="fade-up" style={{ '--d': `${i * 45}ms` } as React.CSSProperties}>
                <a
                  href={`#${item.id}`}
                  className="flex min-h-16 items-center font-display text-[2rem] font-light tracking-tight"
                  onClick={() => setOpen(false)}
                >
                  {t.nav[item.key]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <BookButton long className="w-full" />
            <a href={PHONE_HREF} className="btn btn-field w-full">
              {PHONE_DISPLAY}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
