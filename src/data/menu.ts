/**
 * Menù della Trattoria Il Pavone.
 *
 * Fonte: https://www.trattoriailpavone.com/menus ("Menù alla Carta", "Carta Vini", "Menù per Gruppi").
 * Categorie e prezzi sono quelli dell'originale; i nomi sono invariati salvo i refusi corretti
 * elencati in docs/NOTE-MENU.md, che riporta anche i punti da verificare con la trattoria.
 *
 * Questo file contiene la struttura comune a tutte le lingue. Descrizioni e nomi delle
 * categorie stanno in src/locales/<lingua>.json, sotto "menuData", indicizzati per id.
 */

export interface Variant {
  /** Chiave di menuData.units (es. "glass") oppure testo invariabile ("hg"). */
  unit: string;
  price: string;
}

export interface MenuItem {
  id: string;
  /** Nome originale in italiano, identico in tutte le lingue. */
  name: string;
  price?: string;
  variants?: Variant[];
  /** Nota invariabile tra le lingue (es. "75cl"). */
  note?: string;
}

export interface MenuSection {
  id: string;
  items: MenuItem[];
}

export interface GroupCourse {
  id: string;
  /** Righe originali in italiano; la traduzione è in menuData.items[id]. */
  lines: string[];
}

export interface GroupMenu {
  id: string;
  /** Nome originale della sezione. */
  name: string;
  price: string;
  courses: GroupCourse[];
}

const i = (id: string, name: string, price: string, note?: string): MenuItem => ({ id, name, price, note });

const glass4 = (half: string, quarter: string, glass: string): Variant[] => [
  { unit: 'half', price: half },
  { unit: 'quarter', price: quarter },
  { unit: 'glass', price: glass },
];
const litre4 = (litre: string, half: string, quarter: string, glass: string): Variant[] => [
  { unit: 'litre', price: litre },
  ...glass4(half, quarter, glass),
];

export const carta: MenuSection[] = [
  {
    id: 'antipasti',
    items: [
      i('tris-radicchio', 'Tris Degustazione Radicchio', '20 €'),
      i('crostoni-lardo', 'Crostoni con Lardo di Colonnata', '10,00 €'),
      i('panaro-baccala', 'Panaro con Baccalà Mantecato', '12,00 €'),
      i('porchetta-radicchio', 'Porchetta di Ariccia e Radicchio ai Ferri', '14,50 €'),
      i('carpaccio-radicchio', 'Carpaccio di Manzo con Radicchio Marinato', '14,50 €'),
      i('polenta-musetto', 'Polenta, Musetto, Crauti e Purè al Tartufo', '13,50 €'),
      i('panaro-pavone', 'Panaro del Pavone', '14,00 €'),
      i('tartare-zucca', 'Tartare di Manzo con Zucca e Tartufo', '18,50 €'),
      i('tris-baccala', 'Tris di Degustazione Baccalà', '20,00 €'),
      i('misticanza', 'Misticanza Invernale (radicchio, zucca, pecorino e noci)', '10,00 €'),
    ],
  },
  {
    id: 'primi',
    items: [
      i('bigoli-anitra', "Bigoli all'Anitra", '12,50 €'),
      i('tagliatelle-radicchio', 'Tagliatelle al Radicchio e Morlacco', '13,50 €'),
      i('paccheri-cinghiale', 'Paccheri al Cinghiale e Tartufo', '14,00 €'),
      i('maccheroncini-baccala', 'Maccheroncini al Baccalà', '14,50 €'),
      i('tortelli-zucca', 'Tortelli di Zucca, Tartufo e Ricotta Affumicata', '13,50 €'),
      i('crespelle-radicchio', 'Crespelle Radicchio e Asiago', '13,00 €'),
      i('gnocchetti-radicchio', 'Gnocchetti al radicchio e Guanciale', '13,50 €'),
      i('risotto-zucca', 'Risotto alla Zucca e Tartufo', '16,00 €'),
      i('zuppa-porcini', 'Zuppa di Porcini', '12,00 €'),
    ],
  },
  {
    id: 'secondi',
    items: [
      i('cotoletta-pollo', 'Cotoletta di Pollo', '11,50 €'),
      i('galletto-brace', 'Galletto alla Brace', '14,00 €'),
      i('arrosto-maialino', 'Arrosto di Maialino al Radicchio', '14,00 €'),
      i('bistecca-manzo', 'Bistecca di Manzo', '13,50 €'),
      i('costine-maialino', 'Costine di Maialino alla Brace', '15,00 €'),
      i('seppie-piselli', 'Seppie in Umido con Piselli', '16,00 €'),
      i('tagliata-rosmarino', 'Tagliata di Sorana al Rosmarino', '19,00 €'),
      i('tagliata-zucca', 'Tagliata con Zucca e Tartufo', '20,00 €'),
      i('spiedone', 'Spiedone di Carni Miste', '20,00 €'),
      { id: 'costata-sorana', name: 'Costata di Sorana', variants: [{ unit: 'hg', price: '6,5 €' }] },
      i('baccala-vicentina', 'Baccalà alla Vicentina', '18,00 €'),
      i('piatto-rustico', 'Piatto Rustico', '16,00 €'),
    ],
  },
  {
    id: 'contorni',
    items: [
      i('insalata-mista', 'Insalata Mista', '4,50 €'),
      i('patate-fritte', 'Patate Fritte', '5,50 €'),
      i('fagioli-veneta', 'Fagioli in Salsa Veneta', '5,50 €'),
      i('erbette-cotte', 'Erbette Cotte', '5,50 €'),
      i('verdure-grigliate', 'Verdure Grigliate', '5,50 €'),
      i('radicchio-ferri', 'Radicchio ai Ferri', '7,00 €'),
      i('radicchio-marinato', 'Radicchio Marinato', '7,00 €'),
      i('pure-tartufo', 'Purè al Tartufo', '6,50 €'),
      i('crauti-rossi', 'Crauti Rossi', '5,50 €'),
    ],
  },
  {
    id: 'unici',
    items: [
      i('u-cotoletta', 'Cotoletta con Insalatina e Patatine', '15,50 €'),
      i('u-arrosto', 'Arrosto di Maialino con Insalatina e Patatine', '19,00 €'),
      i('u-galletto', 'Galletto con Insalatina e Patatine', '19,50 €'),
      i('u-bistecca', 'Bistecca con Insalatina e Patatine', '18,50 €'),
      i('u-costine', 'Costine con Insalatina e Patatine', '19,50 €'),
      i('u-polenta', 'Polenta Musetto, Crauti e Purè al Tartufo', '18,00 €'),
    ],
  },
  {
    id: 'dolci',
    items: [
      i('sorbetto', 'Sorbetto', '3,00 €'),
      i('tiramisu', 'Tiramisù', '5,50 €'),
      i('crema-catalana', 'Crema Catalana', '5,50 €'),
      i('cheesecake', 'Cheesecake al Mango e Cocco', '6,00 €'),
      i('mousse-cioccolato', 'Mousse al cioccolato', '6,00 €'),
      i('mousse-torroncino', 'Mousse al Torroncino', '5,50 €'),
    ],
  },
  {
    id: 'aperitivi',
    items: [
      i('spritz-aperol', 'Spritz Aperol', '4,00 €'),
      i('spritz-campari', 'Spritz Campari', '4,00 €'),
      i('spritz-select', 'Spritz Select', '4,00 €'),
      i('spritz-cynar', 'Spritz Cynar', '4,00 €'),
      i('spritz-cedro', 'Spritz Cedro', '4,00 €'),
      i('spritz-bianco', 'Spritz Bianco', '2,50 €'),
      i('hugo', 'Hugo', '4,00 €'),
      i('mezzo-mezzo', 'Mezzo e Mezzo', '3,50 €'),
      i('americano', 'Americano', '6,00 €'),
      i('gin-tonic', 'Gin Tonic', '7,00 €'),
      i('tulipano', 'Tulipano', '4,00 €'),
    ],
  },
  {
    id: 'bibite',
    items: [
      i('acqua-naturale', 'Acqua Naturale', '3,00 €', '75cl'),
      i('acqua-frizzante', 'Acqua Frizzante', '3,00 €', '75cl'),
      i('the-limone', 'Thè al Limone', '3,00 €'),
      i('the-pesca', 'Thè alla Pesca', '3,00 €'),
      i('coca-cola', 'Coca Cola', '3,00 €'),
      i('coca-zero', 'Coca Cola Zero', '3,00 €'),
      i('fanta', 'Fanta', '3,00 €'),
      i('gingerino', 'Gingerino', '3,00 €'),
      i('tonica', 'Tonica', '4,00 €'),
    ],
  },
];

export const vini: MenuSection[] = [
  {
    id: 'bollicine',
    items: [
      i('w-extra-brut', 'Col Vetoraz Extra Brut', '35,00 €'),
      i('w-brut', 'Col Vetoraz Brut', '30,00 €'),
      i('w-millesimato', 'Col Vetoraz Millesimato', '35,00 €'),
      i('w-extra-dry', 'Col Vetoraz Extra Dry', '30,00 €'),
      i('w-blanc', 'Blanc de Blancs', '30,00 €'),
    ],
  },
  {
    id: 'bianchi',
    items: [
      i('w-pinot-grigio', 'Pinot Grigio', '27,00 €'),
      i('w-vespaiolo-sup', 'Vespaiolo Superiore', '27,00 €'),
      i('w-vespaiolo-brenta', 'Vespaiolo Brenta', '25,00 €'),
      i('w-lugana', 'Lugana', '27,00 €'),
      i('w-gewurz', 'Gewürztraminer', '30,00 €'),
      i('w-tufjano', 'Tufjano', '27,00 €'),
      i('w-scaia-chard', 'Scaia Chardonnay', '22,00 €'),
      i('w-sauvignon', 'Sauvignon', '27,00 €'),
    ],
  },
  {
    id: 'rossi',
    items: [
      i('w-amarone', 'Amarone Costanera', '60,00 €'),
      i('w-campofiorin', 'Campofiorin Masi', '35,00 €'),
      i('w-bentino', 'Bentino Maculan', '30,00 €'),
      i('w-scaia-corvina', 'Scaia Corvina', '22,00 €'),
      i('w-due-santi', 'Due Santi Zonta', '40,00 €'),
      i('w-gelsaia', 'Gelsaia', '50,00 €'),
      i('w-teroldego', 'Teroldego', '27,00 €'),
      i('w-pinot-nero', 'Pinot Nero', '28,00 €'),
      i('w-nero-ass', 'Nero Assolutamente', '30,00 €'),
      i('w-governo', 'Governo', '24,00 €'),
      i('w-ripasso', 'Valpolicella Ripasso', '28,00 €'),
      i('w-suam', 'Suam', '30,00 €'),
    ],
  },
  {
    id: 'mescita',
    items: [
      { id: 'm-governo', name: 'Governo', variants: glass4('17 €', '8,5 €', '4 €') },
      { id: 'm-pinot-nero', name: 'Pinot Nero', variants: glass4('22 €', '11 €', '5 €') },
      { id: 'm-ripasso', name: 'Valpolicella Ripasso', variants: glass4('22 €', '11 €', '5 €') },
      { id: 'm-lugana', name: 'Lugana', variants: glass4('18 €', '9 €', '4,5 €') },
      { id: 'm-vespaiolo', name: 'Vespaiolo Superiore', variants: glass4('18 €', '9 €', '4,5 €') },
      { id: 'm-pinot-grigio', name: 'Pinot Grigio', variants: glass4('17,5 €', '9 €', '4,5 €') },
      { id: 'm-scaia', name: 'Scaia Chardonnay', variants: glass4('15 €', '8 €', '4 €') },
    ],
  },
  {
    id: 'spina',
    items: [
      { id: 's-cabernet', name: 'Cabernet', variants: litre4('13,00 €', '7,00 €', '5,00 €', '2,30 €') },
      { id: 's-chardonnay', name: 'Chardonnay Garganega', variants: litre4('13,00 €', '7,00 €', '5,00 €', '2,30 €') },
      { id: 's-primitivo', name: 'Primitivo', variants: litre4('14,00 €', '7,50 €', '5,30 €', '2,80 €') },
      { id: 's-prosecco', name: 'Prosecco', variants: litre4('14,00 €', '7,50 €', '5,30 €', '2,80 €') },
      { id: 's-rabosello', name: 'Rabosello', variants: litre4('14,00 €', '7,50 €', '5,30 €', '2,80 €') },
    ],
  },
];

const contorniGruppo = ['Patate al rosmarino', 'Fagioli in salsa veneta', 'Verdura fresca'];
const antipastoRicco = [
  'Porchetta di Ariccia con radicchio ai ferri, sopressa vicentina D.O.P.',
  'crostone aromatico, fiocco di Sauris, baccalà mantecato su polenta di Storo, conchiglia di mare',
];

export const gruppi: GroupMenu[] = [
  {
    id: 'classico',
    name: 'Menù Classico',
    price: '43€',
    courses: [
      { id: 'antipasto', lines: ['Polenta di Storo, porchetta di Ariccia e radicchio di Treviso ai ferri'] },
      { id: 'primi', lines: ["Bigoli al sugo d'anitra", 'Risotto al radicchio di Treviso'] },
      { id: 'secondo', lines: ['Tagliata di Sorana alla brace'] },
      { id: 'contorni', lines: contorniGruppo },
      { id: 'dolce', lines: ['Tiramisù del Pavone'] },
      { id: 'caffe', lines: [] },
    ],
  },
  {
    id: 'innovazione',
    name: 'Menù Innovazione',
    price: '46€',
    courses: [
      { id: 'antipasto', lines: antipastoRicco },
      { id: 'primi', lines: ['Tagliatelle al radicchio e Morlacco', 'Risotto alla zucca, tartufo e ricotta affumicata'] },
      { id: 'secondo', lines: ['Spiedone di carni miste alla brace'] },
      { id: 'contorni', lines: contorniGruppo },
      { id: 'dolce', lines: ['Crema catalana'] },
      { id: 'caffe', lines: [] },
    ],
  },
  {
    id: 'tradizione',
    name: 'Menù Tradizione',
    price: '50€',
    courses: [
      { id: 'antipasto', lines: antipastoRicco },
      { id: 'primi', lines: ['Tortelli di zucca, tartufo e ricotta affumicata', 'Risotto al radicchio di Treviso'] },
      { id: 'secondi', lines: ['Tagliata di Sorana alla brace', 'Cosciotto di maialino al forno'] },
      { id: 'contorni', lines: contorniGruppo },
      { id: 'dolce', lines: ['Cabossa al cioccolato ripiena'] },
      { id: 'caffe', lines: [] },
    ],
  },
];
