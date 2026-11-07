import { Mail, MapPin, Phone } from 'lucide-react';
import { BookButton } from '../components/BookButton';
import { OpenStatus } from '../components/OpenStatus';
import { Reveal } from '../components/Reveal';
import { ADDRESS_LINES, EMAIL, MAPS_URL, PHONE_DISPLAY, PHONE_HREF } from '../data/site';
import { useI18n } from '../i18n/I18nProvider';

export function Contact() {
  const { t } = useI18n();
  return (
    <section id="contatti" aria-labelledby="contatti-title" className="page-x section-y">
      <div className="grid gap-x-16 gap-y-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <Reveal as="h2" className="heading">
            <span id="contatti-title">{t.contact.title}</span>
          </Reveal>
          <Reveal as="p" delay={70} className="lead mt-5 max-w-[36rem]">
            {t.contact.lead}
          </Reveal>
          <Reveal delay={140} className="mt-8">
            <a
              href={PHONE_HREF}
              aria-label={`${t.contact.call}: ${PHONE_DISPLAY}`}
              className="font-display text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] leading-none font-light tracking-tight whitespace-nowrap transition-colors hover:text-gold-strong"
            >
              {PHONE_DISPLAY}
            </a>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookButton long className="w-full sm:w-auto" />
              <a href={PHONE_HREF} className="btn btn-field w-full sm:w-auto">
                <Phone size={18} aria-hidden />
                {t.contact.call}
              </a>
            </div>
          </Reveal>
        </div>

        <address className="flex flex-col gap-9 not-italic md:col-span-5">
          <Reveal>
            <h3 className="text-[1.625rem]">{t.contact.addressLabel}</h3>
            <p className="mt-2">
              {ADDRESS_LINES[0]}
              <br />
              {ADDRESS_LINES[1]}
            </p>
            <a href={MAPS_URL} target="_blank" rel="noopener" className="text-link mt-2 inline-flex min-h-11 items-center gap-2">
              <MapPin size={18} aria-hidden className="text-gold-strong" />
              {t.contact.maps}
              <span className="sr-only"> ({t.nav.newWindow})</span>
            </a>
          </Reveal>
          <Reveal>
            <h3 className="text-[1.625rem]">{t.contact.emailLabel}</h3>
            <a href={`mailto:${EMAIL}`} className="text-link mt-1 inline-flex min-h-11 items-center gap-2 break-all">
              <Mail size={18} aria-hidden className="shrink-0 text-gold-strong" />
              {EMAIL}
            </a>
          </Reveal>
          <Reveal>
            <h3 className="text-[1.625rem]">{t.contact.hoursLabel}</h3>
            <OpenStatus className="mt-2" />
            <dl className="mt-3 flex flex-col gap-2">
              {t.contact.hours.map((row) => (
                <div key={row.days}>
                  <dt className="font-semibold">{row.days}</dt>
                  <dd className="tabular-nums text-muted">{row.time}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </address>
      </div>
    </section>
  );
}
