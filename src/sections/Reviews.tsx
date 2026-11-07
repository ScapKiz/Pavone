import { Reveal } from '../components/Reveal';
import { useI18n } from '../i18n/I18nProvider';

export function Reviews() {
  const { t } = useI18n();
  return (
    <section aria-labelledby="recensioni-title" className="bg-field">
      <div className="page-x section-y grid gap-x-16 gap-y-10 lg:grid-cols-12">
        <Reveal as="h2" className="heading lg:col-span-4">
          <span id="recensioni-title">{t.reviews.title}</span>
        </Reveal>
        <div className="flex flex-col gap-10 md:gap-14 lg:col-span-8">
          {t.reviews.items.map((review, i) => (
            <Reveal as="figure" key={review.name} delay={i * 70}>
              <blockquote className="lead max-w-[46rem]">“{review.quote}”</blockquote>
              <figcaption className="mt-3 font-semibold text-gold-strong">{review.name}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
