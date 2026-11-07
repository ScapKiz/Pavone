import { src, srcSet, type WebImage } from '../data/images';

interface PictureProps {
  image: WebImage;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  priority?: boolean;
}

/** Immagine WebP responsive con dimensioni dichiarate e caricamento differito. */
export function Picture({ image, alt, sizes, className, position, priority = false }: PictureProps) {
  return (
    <img
      src={src(image)}
      srcSet={srcSet(image)}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      className={className}
      style={position ? { objectPosition: position } : undefined}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
    />
  );
}
