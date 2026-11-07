import { useMemo, useRef, useState } from 'react';
import { Lightbox } from '../components/Lightbox';
import { Picture } from '../components/Picture';
import { Reveal } from '../components/Reveal';
import { GALLERY_PHOTOS } from '../data/images';
import { fill, useI18n } from '../i18n/I18nProvider';

export function Gallery() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const photos = useMemo(
    () => GALLERY_PHOTOS.map((p) => ({ ...p, alt: t.gallery.alts[p.index] })),
    [t],
  );

  const close = () => {
    const last = openIndex;
    setOpenIndex(null);
    // Dopo la chiusura del dialog il fuoco torna sulla foto da cui si era partiti.
    if (last !== null) requestAnimationFrame(() => triggers.current[last]?.focus());
  };

  return (
    <section id="galleria" aria-labelledby="galleria-title" className="page-x pb-20 md:pb-36">
      <Reveal as="h2" className="heading">
        <span id="galleria-title">{t.gallery.title}</span>
      </Reveal>

      <ul className="mt-8 grid grid-flow-dense auto-rows-[44vw] grid-cols-2 gap-2 md:mt-12 md:auto-rows-[23vw] md:grid-cols-4 md:gap-3">
        {photos.map((photo, i) => (
          <Reveal as="li" key={photo.image.name} delay={(i % 4) * 60} className={photo.layout}>
            <button
              ref={(node) => {
                triggers.current[i] = node;
              }}
              type="button"
              className="photo-zoom block size-full cursor-zoom-in overflow-hidden"
              aria-label={fill(t.gallery.open, { alt: photo.alt })}
              onClick={() => setOpenIndex(i)}
            >
              <Picture
                image={photo.image}
                alt=""
                sizes={photo.layout ? '(max-width: 767px) 100vw, 50vw' : '(max-width: 767px) 50vw, 25vw'}
                className="size-full object-cover"
              />
            </button>
          </Reveal>
        ))}
      </ul>

      {openIndex !== null && (
        <Lightbox photos={photos} index={openIndex} onChange={setOpenIndex} onClose={close} />
      )}
    </section>
  );
}
