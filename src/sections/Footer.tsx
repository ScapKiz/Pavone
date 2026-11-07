import { BookButton } from '../components/BookButton';
import { Flag } from '../components/Flag';
import { Picture } from '../components/Picture';
import { ADDRESS_LINES, NAV_ITEMS, PHONE_DISPLAY, PHONE_HREF } from '../data/site';
import { IMAGES } from '../data/images';
import { useI18n } from '../i18n/I18nProvider';
import { assetUrl, LANGUAGES } from '../i18n/languages';

export function Footer() {
  const { t, lang, setLang } = useI18n();
  return (
    <footer className="relative isolate overflow-hidden">
      <Picture
        image={IMAGES.g02}
        alt=""
        sizes="(max-width: 767px) 300vw, 100vw"
        className="absolute inset-0 -z-10 size-full object-cover brightness-[0.28]"
      />
      <div className="page-x pt-14 pb-8 md:pt-20">
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={assetUrl('images/web/logo.webp')}
              alt="Trattoria Il Pavone"
              width={480}
              height={355}
              loading="lazy"
              className="h-auto w-44"
            />
          </div>
          <div>
            <p>
              {ADDRESS_LINES[0]}
              <br />
              {ADDRESS_LINES[1]}
            </p>
            <a href={PHONE_HREF} className="text-link mt-1 inline-flex min-h-11 items-center">
              {PHONE_DISPLAY}
            </a>
            <div className="mt-3">
              <BookButton long />
            </div>
          </div>
          <nav aria-label={t.footer.nav}>
            <h2 className="font-body text-lg font-semibold tracking-normal text-gold-strong">{t.footer.nav}</h2>
            <ul className="mt-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="inline-flex min-h-11 items-center transition-colors hover:text-gold-strong">
                    {t.nav[item.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="font-body text-lg font-semibold tracking-normal text-gold-strong">{t.footer.languages}</h2>
            <ul className="mt-1">
              {LANGUAGES.map((l) => (
                <li key={l.code}>
                  <button
                    type="button"
                    lang={l.code}
                    aria-current={l.code === lang ? 'true' : undefined}
                    onClick={() => setLang(l.code)}
                    className={`inline-flex min-h-11 cursor-pointer items-center gap-2.5 transition-colors hover:text-gold-strong ${
                      l.code === lang ? 'font-semibold' : ''
                    }`}
                  >
                    <Flag lang={l.code} />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-14 font-display text-[14.5vw] leading-none font-light tracking-[-0.03em] whitespace-nowrap md:mt-20"
        >
          Il Pavone
        </p>
        <p className="mt-5 text-base">
          © {new Date().getFullYear()} {t.footer.rights}
        </p>
        <p className="mt-1 text-sm text-muted">{t.footer.credits}</p>
      </div>
    </footer>
  );
}
