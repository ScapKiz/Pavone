import type { Lang } from '../i18n/languages';

/** Bandiere in SVG: le emoji delle bandiere non vengono mostrate su Windows. */
export function Flag({ lang, className = 'h-4 w-6' }: { lang: Lang; className?: string }) {
  const common = { viewBox: '0 0 24 16', className: `${className} shrink-0`, 'aria-hidden': true, focusable: false };
  switch (lang) {
    case 'it':
      return (
        <svg {...common}>
          <rect width="8" height="16" fill="#009246" />
          <rect x="8" width="8" height="16" fill="#fff" />
          <rect x="16" width="8" height="16" fill="#ce2b37" />
        </svg>
      );
    case 'en':
      return (
        <svg {...common}>
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="3" />
          <path d="M0 0 24 16M24 0 0 16" stroke="#c8102e" strokeWidth="1.2" />
          <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5" />
          <path d="M12 0v16M0 8h24" stroke="#c8102e" strokeWidth="3" />
        </svg>
      );
    case 'es':
      return (
        <svg {...common}>
          <rect width="24" height="16" fill="#aa151b" />
          <rect y="4" width="24" height="8" fill="#f1bf00" />
        </svg>
      );
    case 'de':
      return (
        <svg {...common}>
          <rect width="24" height="16" fill="#000" />
          <rect y="5.33" width="24" height="5.34" fill="#dd0000" />
          <rect y="10.67" width="24" height="5.33" fill="#ffce00" />
        </svg>
      );
    case 'fr':
      return (
        <svg {...common}>
          <rect width="8" height="16" fill="#002395" />
          <rect x="8" width="8" height="16" fill="#fff" />
          <rect x="16" width="8" height="16" fill="#ed2939" />
        </svg>
      );
  }
}
