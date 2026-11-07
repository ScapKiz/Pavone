import { ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { carta, gruppi, vini, type MenuItem, type MenuSection } from '../data/menu';
import { useI18n, type Messages } from '../i18n/I18nProvider';

type Tab = 'carta' | 'vini' | 'gruppi';
const TABS: Tab[] = ['carta', 'vini', 'gruppi'];
const SECTIONS: Record<'carta' | 'vini', MenuSection[]> = { carta, vini };

function Item({ item, data }: { item: MenuItem; data: Messages['menuData'] }) {
  const description = data.items[item.id];
  return (
    <li className="py-3">
      <div className="flex items-baseline justify-between gap-4">
        <p className="min-w-0 font-display text-[1.25rem] leading-snug md:text-[1.375rem]">
          {item.name}
          {item.note && <span className="ml-2 font-body text-base text-paper-muted">{item.note}</span>}
        </p>
        {item.price && (
          <p className="shrink-0 text-[1.125rem] font-semibold tabular-nums whitespace-nowrap">{item.price}</p>
        )}
      </div>
      {description && <p className="mt-0.5 text-[1.0625rem] leading-snug text-paper-muted">{description}</p>}
      {item.variants && (
        <dl className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1">
          {item.variants.map((v) => (
            <div key={v.unit} className="flex items-baseline gap-1.5">
              <dt className="text-[1.0625rem] text-paper-muted">
                {data.units[v.unit as keyof typeof data.units] ?? v.unit}
              </dt>
              <dd className="font-semibold tabular-nums whitespace-nowrap">{v.price}</dd>
            </div>
          ))}
        </dl>
      )}
    </li>
  );
}

function Groups({ t, showTranslation }: { t: Messages; showTranslation: boolean }) {
  const data = t.menuData;
  return (
    <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
      {gruppi.map((menu) => (
        <article key={menu.id}>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[2rem]">{menu.name}</h3>
            <p className="font-display text-[2rem] font-light whitespace-nowrap text-paper-gold">{menu.price}</p>
          </div>
          <p className="text-[1.0625rem] text-paper-muted">{t.menu.drinksExcluded}</p>
          <div className="mt-5 flex flex-col gap-4">
            {menu.courses.map((course) => (
              <div key={course.id}>
                <h4 className="font-semibold text-paper-gold">
                  {data.courses[course.id as keyof typeof data.courses]}
                </h4>
                <ul>
                  {course.lines.map((line) => (
                    <li key={line} className="mt-1 leading-snug">
                      <span className="font-display text-[1.1875rem]">{line}</span>
                      {showTranslation && data.groupLines[line] && (
                        <span className="block text-[1.0625rem] text-paper-muted">{data.groupLines[line]}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export function Menu() {
  const { t, lang } = useI18n();
  const [tab, setTab] = useState<Tab>('carta');
  const [sectionByTab, setSectionByTab] = useState({ carta: carta[0].id, vini: vini[0].id });
  const sheetRef = useRef<HTMLDivElement>(null);
  const data = t.menuData;

  const keepInView = () => {
    const sheet = sheetRef.current;
    if (sheet && sheet.getBoundingClientRect().top < 0) {
      sheet.scrollIntoView({ block: 'start' });
    }
  };

  const chooseTab = (next: Tab) => {
    setTab(next);
    keepInView();
  };

  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = TABS[(TABS.indexOf(tab) + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length];
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  const intro = { carta: t.menu.cartaIntro, vini: t.menu.viniIntro, gruppi: t.menu.gruppiIntro }[tab];
  const sections = tab === 'gruppi' ? null : SECTIONS[tab];
  const currentId = tab === 'gruppi' ? '' : sectionByTab[tab];
  const current = sections?.find((s) => s.id === currentId) ?? sections?.[0];
  const sectionNote = current && (data.sectionNotes as Record<string, string>)[current.id];

  return (
    <section id="menu" aria-labelledby="menu-title" className="section-y md:px-8">
      <Reveal as="h2" className="heading page-x md:px-0">
        <span id="menu-title">{t.menu.title}</span>
      </Reveal>

      <Reveal delay={70} className="mt-8 md:mt-12">
        <div ref={sheetRef} className="scroll-mt-[var(--header-h)] bg-paper text-paper-ink">
          <div
            role="tablist"
            aria-label={t.menu.tabsLabel}
            onKeyDown={onTabKey}
            className="grid grid-cols-3 bg-paper-tone"
          >
            {TABS.map((id) => (
              <button
                key={id}
                id={`tab-${id}`}
                type="button"
                role="tab"
                aria-selected={tab === id}
                aria-controls="menu-panel"
                tabIndex={tab === id ? 0 : -1}
                onClick={() => chooseTab(id)}
                className={`min-h-16 cursor-pointer px-2 py-2 font-display text-[1.0625rem] leading-tight transition-colors focus-visible:outline-offset-[-3px] focus-visible:outline-paper-gold sm:text-[1.25rem] md:text-2xl ${
                  tab === id ? 'bg-paper font-normal' : 'font-light hover:bg-[#e2dac5]'
                }`}
              >
                {t.menu.tabs[id]}
              </button>
            ))}
          </div>

          <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
            <div className="px-4 pt-7 md:px-10 md:pt-10 lg:px-16">
              <p className="lead max-w-[46rem]">{intro}</p>
              {lang !== 'it' && tab !== 'vini' && <p className="mt-2 text-[1.0625rem] text-paper-muted">{t.menu.translationNote}</p>}
            </div>

            {sections && current && (
              <>
                <nav
                  aria-label={t.menu.sectionsLabel}
                  className="z-20 mt-5 bg-paper md:sticky md:top-[var(--header-h)] md:mt-7"
                >
                  <ul className="flex flex-wrap gap-1.5 px-4 py-2.5 md:px-10 lg:px-16">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          aria-current={s.id === current.id ? 'true' : undefined}
                          onClick={() => {
                            setSectionByTab((prev) => ({ ...prev, [tab]: s.id }));
                            keepInView();
                          }}
                          className={`min-h-11 cursor-pointer px-3.5 text-[1.0625rem] whitespace-nowrap transition-colors focus-visible:outline-paper-gold active:scale-[0.97] ${
                            s.id === current.id
                              ? 'bg-paper-ink text-paper'
                              : 'bg-paper-tone text-paper-ink hover:bg-[#e2dac5]'
                          }`}
                        >
                          {data.sections[s.id as keyof typeof data.sections]}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div key={`${tab}-${current.id}`} className="fade-up px-4 pt-4 pb-10 md:px-10 md:pb-14 lg:px-16" style={{ animationDuration: '320ms' }}>
                  <h3 className="text-[2rem] md:text-[2.5rem]">{data.sections[current.id as keyof typeof data.sections]}</h3>
                  {sectionNote && <p className="mt-1 text-paper-muted">{sectionNote}</p>}
                  <ul className="mt-3 md:columns-2 md:gap-x-16 [&>li]:break-inside-avoid">
                    {current.items.map((item) => (
                      <Item key={item.id} item={item} data={data} />
                    ))}
                  </ul>
                </div>
              </>
            )}

            {tab === 'gruppi' && (
              <div className="fade-up px-4 pt-8 pb-10 md:px-10 md:pb-14 lg:px-16" style={{ animationDuration: '320ms' }}>
                <Groups t={t} showTranslation={lang !== 'it'} />
              </div>
            )}
          </div>

          {tab !== 'gruppi' && (
            <div className="flex flex-col gap-4 bg-paper-tone px-4 py-7 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
              <p className="font-display text-[1.375rem] leading-snug">{t.menu.eventsTitle}</p>
              <button type="button" className="btn btn-paper shrink-0" onClick={() => chooseTab('gruppi')}>
                {t.menu.eventsButton}
                <ArrowRight size={18} aria-hidden />
              </button>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
