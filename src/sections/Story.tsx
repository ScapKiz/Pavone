import { Picture } from '../components/Picture';
import { Reveal } from '../components/Reveal';
import { IMAGES } from '../data/images';
import { useI18n } from '../i18n/I18nProvider';

export function Story() {
  const { t } = useI18n();
  return (
    <section id="storia" aria-labelledby="storia-title" className="bg-field">
      <Reveal className="relative">
        <Picture
          image={IMAGES.staff}
          alt={t.story.staffAlt}
          sizes="100vw"
          position="50% 25%"
          className="aspect-[4/3] w-full object-cover md:aspect-[21/9]"
        />
      </Reveal>

      <div className="page-x grid gap-x-16 py-16 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Reveal as="h2" className="heading">
              <span id="storia-title">{t.story.title}</span>
            </Reveal>
            <Reveal delay={70} className="mt-10 hidden lg:block">
              <Picture
                image={IMAGES.salaParete}
                alt={t.story.wallAlt}
                sizes="30vw"
                className="aspect-[4/5] w-full max-w-[22rem] object-cover"
              />
            </Reveal>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-10 md:gap-14 lg:col-span-8 lg:mt-0">
          {t.story.chapters.map((chapter, i) => (
            <Reveal key={i} className="grid gap-x-10 md:grid-cols-[9rem_1fr]">
              <p
                aria-hidden={!chapter.mark}
                className={`font-display text-[3.25rem] leading-none font-light tracking-tight text-gold-strong md:text-[3.75rem] ${
                  chapter.mark ? 'mb-3 md:mb-0' : 'hidden md:block'
                }`}
              >
                {chapter.mark}
              </p>
              <p className="max-w-[40rem] text-[1.1875rem] leading-relaxed">{chapter.text}</p>
            </Reveal>
          ))}
          <Reveal className="lg:hidden">
            <Picture
              image={IMAGES.salaParete}
              alt={t.story.wallAlt}
              sizes="100vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
