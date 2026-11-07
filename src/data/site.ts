/** Dati di contatto e collegamenti ufficiali: un solo punto da modificare. */
export const BOOKING_URL = 'https://pavone.risto.click/booking.php';
export const PHONE_DISPLAY = '+39 0424 382721';
export const PHONE_HREF = 'tel:+390424382721';
export const EMAIL = 'ilpavonesnc@gmail.com';
export const ADDRESS_LINES = ['Via Nardi 85', "36060 Romano d'Ezzelino (VI)"];
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Trattoria%20Il%20Pavone%2C%20Via%20Nardi%2085%2C%2036060%20Romano%20d'Ezzelino%20VI";

export const NAV_ITEMS = [
  { id: 'cucina', key: 'kitchen' },
  { id: 'storia', key: 'story' },
  { id: 'menu', key: 'menu' },
  { id: 'galleria', key: 'gallery' },
  { id: 'contatti', key: 'contact' },
] as const;

/**
 * Orari in minuti dalla mezzanotte, ora italiana. Indice: 0 = domenica.
 * Fonte: pagina Contatti del vecchio sito.
 */
const LUNCH: [number, number] = [12 * 60, 15 * 60 + 30];
const DINNER: [number, number] = [19 * 60, 23 * 60 + 30];
export const OPENING_HOURS: [number, number][][] = [
  [LUNCH],
  [],
  [LUNCH, DINNER],
  [LUNCH, DINNER],
  [LUNCH, DINNER],
  [LUNCH, DINNER],
  [LUNCH, DINNER],
];
