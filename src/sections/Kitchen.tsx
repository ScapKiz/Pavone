import { useEffect, useRef, useState } from 'react';
import { Picture } from '../components/Picture';
import { Reveal } from '../components/Reveal';
import { KITCHEN_PHOTOS } from '../data/images';
import { useI18n } from '../i18n/I18nProvider';

/**
 * Da desktop la foto resta ferma a sinistra e cambia con il piatto al centro dello schermo.
 * Su smartphone ogni piatto ha la propria foto sopra il testo.
 */
export function Kitchen() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll('[data-row]');
    if (!rows || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.row));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cucina" aria-labelledby="cucina-title" className="page-x section-y">
      <div className="grid gap-x-16 md:grid-cols-12">
        <Reveal as="h2" className="heading md:col-span-5">
          <span id="cucina-title">{t.kitchen.title}</span>
        </Reveal>
        <Reveal as="p" delay={70} className="lead mt-6 md:col-span-7 md:mt-0">
          {t.kitchen.lead}
        </Reveal>
      </div>

      <div className="mt-14 grid gap-x-16 md:mt-24 md:grid-cols-12">
        <div className="hidden md:col-span-5 md:block">
          <div className="sticky top-[calc(var(--header-h)+2rem)] aspect-[4/5] max-h-[calc(100svh-var(--header-h)-4rem)] w-full overflow-hidden">
            {KITCHEN_PHOTOS.map((photo, i) => (
              <Picture
                key={photo.id}
                image={photo.image}
                alt={i === active ? t.kitchen.items[photo.id].alt : ''}
                sizes="42vw"
                position={photo.position}
                className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${photo.id === 'pasta' ? 'brightness-[0.85]' : ''} ${
                  i === active ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </div>

        <ol ref={listRef} className="flex flex-col gap-14 md:col-span-7 md:gap-0 md:pb-[10vh]">
          {KITCHEN_PHOTOS.map((photo, i) => {
            const item = t.kitchen.items[photo.id];
            return (
              <li key={photo.id} data-row={i} className="md:flex md:min-h-[46svh] md:flex-col md:justify-center">
                <Reveal className="mb-5 aspect-[4/3] overflow-hidden md:hidden">
                  <Picture
                    image={photo.image}
                    alt={item.alt}
                    sizes="100vw"
                    position={photo.position}
                    className={`size-full object-cover ${photo.id === 'pasta' ? 'brightness-[0.85]' : ''}`}
                  />
                </Reveal>
                <h3
                  className={`text-[2rem] transition-colors duration-300 md:text-[2.75rem] ${
                    i === active ? 'md:text-gold-strong' : ''
                  }`}
                >
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[38rem] md:mt-4">{item.text}</p>
              </li>
            );
          })}
        </ol>
      </div>

      <Reveal as="p" className="lead mt-16 max-w-[52rem] md:mt-8">
        {t.kitchen.closing}
      </Reveal>
    </section>
  );
}
