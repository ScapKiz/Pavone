import { BOOKING_URL } from '../data/site';
import { useI18n } from '../i18n/I18nProvider';

/** Tutti i pulsanti di prenotazione passano da qui: stesso link, testo tradotto. */
export function BookButton({ long = false, className = '' }: { long?: boolean; className?: string }) {
  const { t } = useI18n();
  return (
    <a href={BOOKING_URL} target="_blank" rel="noopener" data-book className={`btn btn-gold ${className}`}>
      {long ? t.nav.bookNow : t.nav.book}
      <span className="sr-only"> ({t.nav.newWindow})</span>
    </a>
  );
}
