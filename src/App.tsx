import { Header } from './components/Header';
import { useI18n } from './i18n/I18nProvider';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { Gallery } from './sections/Gallery';
import { Hero } from './sections/Hero';
import { Kitchen } from './sections/Kitchen';
import { Menu } from './sections/Menu';
import { Reviews } from './sections/Reviews';
import { Story } from './sections/Story';

export default function App() {
  const { t } = useI18n();
  return (
    <>
      <a href="#contenuto" className="skip-link">
        {t.nav.skip}
      </a>
      <Header />
      <main id="contenuto">
        <Hero />
        <Kitchen />
        <Story />
        <Menu />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
