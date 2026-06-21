import { pages } from '../content/pages';
import { site } from '../content/site';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { CtaBlock } from '../components/ui/CtaBlock';
import { PageHero } from '../components/ui/PageHero';
import { Section } from '../components/ui/Section';

export function AboutPage() {
  const page = pages.about;
  const storySection = page.sections.find((s) => s.heading === 'قصة الدكتور حاتم النجار');
  const qualificationsSection = page.sections.find((s) => s.heading === 'المؤهلات العلمية');
  const philosophySection = page.sections.find((s) => s.heading === 'فلسفة الرعاية');

  return (
    <>
      <PageHero title={page.titleAr} subtitle={page.introAr} badge={site.doctorNameAr} />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: page.titleAr }]} />
      </div>

      <Section title={storySection?.heading} subtitle={storySection?.body}>
        {storySection?.items && (
          <div className="relative">
            <div className="absolute right-4 top-0 hidden h-full w-0.5 bg-teal-500/20 md:block" aria-hidden />
            <ol className="space-y-6">
              {storySection.items.map((item, index) => {
                const [year, ...rest] = item.split(':');
                const isYear = /^\d{4}$/.test(year.trim());
                return (
                  <li key={item} className="relative flex gap-6 md:pr-10">
                    <div
                      className="absolute right-2.5 top-1 hidden h-3 w-3 rounded-full border-2 border-teal-500 bg-white md:block"
                      aria-hidden
                    />
                    <div className="flex-1 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                      {isYear ? (
                        <>
                          <span className="text-sm font-bold text-teal-600">{year.trim()}</span>
                          <p className="mt-1 text-slate-700">{rest.join(':').trim()}</p>
                        </>
                      ) : (
                        <p className="text-slate-700">{item}</p>
                      )}
                      <span className="sr-only">الخطوة {index + 1}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </Section>

      <Section title={qualificationsSection?.heading} altBg>
        <div className="grid gap-4 sm:grid-cols-2">
          {qualificationsSection?.items?.map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900/5 text-lg" aria-hidden>
                🎓
              </span>
              <p className="text-sm leading-7 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={philosophySection?.heading}>
        <div className="max-w-3xl rounded-2xl border border-teal-500/20 bg-gradient-to-bl from-teal-500/5 to-transparent p-8">
          <p className="text-lg leading-9 text-slate-700">{philosophySection?.body}</p>
        </div>
      </Section>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <CtaBlock title="هل تريد استشارة مع الدكتور؟" />
      </div>
    </>
  );
}
