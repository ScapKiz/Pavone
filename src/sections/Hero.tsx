import { ArrowDown } from 'lucide-react';
import { BookButton } from '../components/BookButton';
import { OpenStatus } from '../components/OpenStatus';
import { Picture } from '../components/Picture';
import { IMAGES } from '../data/images';
import { useI18n } from '../i18n/I18nProvider';

export function Hero() {
  const { t, lang } = useI18n();
  const lines = t.hero.titleLines;
  // La dimensione del titolo dipende dalla riga più lunga, così resta su due righe in ogni lingua.
  const longest = Math.max(...lines.map((l) => l.length));

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-var(--header-h))] flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0">
        <Picture
          image={IMAGES.sala}
          alt={t.hero.photoAlt}
          sizes="(max-width: 767px) 200vw, 100vw"
          priority
          className="hero-photo size-full object-cover object-[58%_30%] md:object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.05)_0%,rgb(0_0_0/0.05)_28%,rgb(0_0_0/0.72)_60%,rgb(0_0_0/0.86)_100%)] md:bg-[linear-gradient(to_bottom,rgb(0_0_0/0)_35%,rgb(0_0_0/0.66)_72%,rgb(0_0_0/0.82)_100%)]"
        />
      </div>

      <div className="page-x relative pt-40 pb-8 md:pb-14">
        <h1
          key={lang}
          className="font-display"
          style={{ fontSize: `min(${(190 / longest).toFixed(2)}vw, 5.25rem)`, lineHeight: 1.08 }}
        >
          {lines.map((line, i) => (
            <span key={line} className="mask-line">
              <span style={{ '--d': `${i * 110}ms` } as React.CSSProperties}>{line}</span>
            </span>
          ))}
        </h1>

        <div className="mt-5 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="fade-up max-w-[38rem]" style={{ '--d': '420ms' } as React.CSSProperties}>
            <p className="text-[1.1875rem] leading-snug md:text-xl">{t.hero.text}</p>
            <OpenStatus className="mt-4 text-[1.0625rem]" />
          </div>
          <div
            className="fade-up flex flex-col gap-3 sm:flex-row md:shrink-0"
            style={{ '--d': '480ms' } as React.CSSProperties}
          >
            <BookButton long className="w-full sm:w-auto" />
            <a href="#menu" className="btn btn-field w-full sm:w-auto">
              {t.nav.discoverMenu}
              <ArrowDown size={18} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
