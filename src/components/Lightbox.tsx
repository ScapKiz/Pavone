import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { src, type WebImage } from '../data/images';
import { fill, useI18n } from '../i18n/I18nProvider';

interface LightboxProps {
  photos: { image: WebImage; alt: string }[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}

/** Visore a schermo intero: frecce, tastiera e scorrimento col dito. */
export function Lightbox({ photos, index, onChange, onClose }: LightboxProps) {
  const { t } = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const total = photos.length;
  const go = (delta: number) => onChange((index + delta + total) % total);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      dialog.close();
    };
  }, []);

  // Precarica le foto vicine così il passaggio è immediato.
  useEffect(() => {
    [index - 1, index + 1].forEach((i) => {
      const preload = new Image();
      preload.src = src(photos[(i + total) % total].image);
    });
  }, [index, photos, total]);

  const photo = photos[index];
  const control =
    'flex size-12 cursor-pointer items-center justify-center bg-field text-ink transition-colors hover:bg-[#274a3b] active:scale-95 focus-visible:outline-gold-strong';

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={t.gallery.dialog}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-3">
          <p aria-live="polite" className="pl-1 text-base">
            {fill(t.gallery.counter, { current: index + 1, total })}
          </p>
          <button type="button" autoFocus className={control} aria-label={t.gallery.close} onClick={onClose}>
            <X size={24} aria-hidden />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center px-3">
          <img
            key={photo.image.name}
            src={src(photo.image)}
            alt={photo.alt}
            width={photo.image.width}
            height={photo.image.height}
            className="fade-up h-auto max-h-full w-auto max-w-full object-contain"
            style={{ animationDuration: '280ms' }}
          />
        </div>
        <div className="flex items-center justify-between gap-4 p-3">
          <button type="button" className={control} aria-label={t.gallery.prev} onClick={() => go(-1)}>
            <ChevronLeft size={26} aria-hidden />
          </button>
          <p className="min-w-0 flex-1 text-center text-base leading-snug text-muted">{photo.alt}</p>
          <button type="button" className={control} aria-label={t.gallery.next} onClick={() => go(1)}>
            <ChevronRight size={26} aria-hidden />
          </button>
        </div>
      </div>
    </dialog>
  );
}
