import { useEffect, useState } from 'react';
import { OPENING_HOURS } from '../data/site';
import { fill, useI18n } from '../i18n/I18nProvider';

const fmt = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

/** Giorno della settimana e minuti correnti in Italia, ovunque si trovi il visitatore. */
function romeNow(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

type Status =
  | { kind: 'open'; time: string }
  | { kind: 'today'; time: string }
  | { kind: 'later'; time: string; day: number };

export function computeStatus(date: Date): Status | null {
  const { day, minutes } = romeNow(date);
  if (day < 0) return null;
  for (const [from, to] of OPENING_HOURS[day]) {
    if (minutes >= from && minutes < to) return { kind: 'open', time: fmt(to) };
  }
  const next = OPENING_HOURS[day].find(([from]) => from > minutes);
  if (next) return { kind: 'today', time: fmt(next[0]) };
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (OPENING_HOURS[d].length) return { kind: 'later', day: d, time: fmt(OPENING_HOURS[d][0][0]) };
  }
  return null;
}

/** Stato di apertura calcolato dagli orari ufficiali, aggiornato ogni minuto. */
export function OpenStatus({ className = '' }: { className?: string }) {
  const { t } = useI18n();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const status = computeStatus(now);
  if (!status) return null;

  const text =
    status.kind === 'open'
      ? fill(t.status.openUntil, { time: status.time })
      : status.kind === 'today'
        ? fill(t.status.opensToday, { time: status.time })
        : fill(t.status.opensOn, { time: status.time, day: t.status.days[status.day] });

  return (
    <p className={`flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className={`size-2.5 shrink-0 rounded-full ${status.kind === 'open' ? 'bg-[#7fd18c]' : 'bg-gold'}`}
      />
      {text}
    </p>
  );
}
