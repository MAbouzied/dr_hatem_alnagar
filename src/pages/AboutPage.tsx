import { pages } from '../content/pages';
import type { PageSection } from '../content/types';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { CtaBlock } from '../components/ui/CtaBlock';
import { PageHero } from '../components/ui/PageHero';
import { Section } from '../components/ui/Section';

function splitTimelineItem(item: string): { label: string; detail: string } | null {
  const colonIndex = item.indexOf(':');
  if (colonIndex <= 0) return null;
  return {
    label: item.slice(0, colonIndex).trim(),
    detail: item.slice(colonIndex + 1).trim(),
  };
}

function TimelineSection({ section }: { section: PageSection }) {
  return (
    <Section title={section.heading} subtitle={section.body}>
      <div className="relative">
        <div className="absolute right-4 top-0 hidden h-full w-0.5 bg-teal-500/20 md:block" aria-hidden />
        <ol className="space-y-6">
          {section.items?.map((item, index) => {
            const parsed = splitTimelineItem(item);
            return (
              <li key={item} className="relative flex gap-6 md:pr-10">
                <div
                  className="absolute right-2.5 top-1 hidden h-3 w-3 rounded-full border-2 border-teal-500 bg-white md:block"
                  aria-hidden
                />
                <div className="flex-1 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  {parsed ? (
                    <>
                      <span className="text-sm font-bold text-teal-600">{parsed.label}</span>
                      <p className="mt-1 leading-7 text-slate-700">{parsed.detail}</p>
                    </>
                  ) : (
                    <p className="leading-7 text-slate-700">{item}</p>
                  )}
                  <span className="sr-only">الخطوة {index + 1}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

function CardsSection({ section, altBg }: { section: PageSection; altBg?: boolean }) {
  return (
    <Section title={section.heading} subtitle={section.body} variant={altBg ? 'tint' : 'white'}>
      <div className="grid gap-4 sm:grid-cols-2">
        {section.items?.map((item) => (
          <div
            key={item}
            className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500/25 hover:shadow-md"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900/5 text-lg"
              aria-hidden
            >
              ✓
            </span>
            <p className="text-sm leading-7 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function NumberedSection({ section, altBg }: { section: PageSection; altBg?: boolean }) {
  return (
    <Section title={section.heading} subtitle={section.body} variant={altBg ? 'tint' : 'white'}>
      <ol className="space-y-4">
        {section.items?.map((item, index) => (
          <li
            key={item}
            className="flex gap-4 rounded-2xl border border-teal-500/15 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500/25 hover:shadow-md"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-sm font-bold text-teal-700">
              {index + 1}
            </span>
            <p className="flex-1 text-sm leading-7 text-slate-700">{item}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function GroupsSection({ section }: { section: PageSection }) {
  return (
    <Section title={section.heading} subtitle={section.body} variant="tint">
      <div className="grid gap-5 sm:grid-cols-2">
        {section.groups?.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500/25 hover:shadow-md"
          >
            <h3 className="mb-4 border-r-4 border-teal-500 pr-3 text-base font-bold text-navy-900">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-7 text-slate-700">
                  <span className="text-teal-600" aria-hidden>
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ListSection({ section, altBg }: { section: PageSection; altBg?: boolean }) {
  return (
    <Section title={section.heading} subtitle={section.body} variant={altBg ? 'tint' : 'white'}>
      <ul className="grid gap-3 sm:grid-cols-2">
        {section.items?.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm leading-7 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500/25 hover:shadow-md"
          >
            <span className="mt-1 text-teal-600" aria-hidden>
              ✦
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function MissionVisionValues({ sections }: { sections: PageSection[] }) {
  const mission = sections.find((s) => s.heading === 'مهمتنا');
  const vision = sections.find((s) => s.heading === 'رؤيتنا');
  const values = sections.find((s) => s.heading === 'قيمنا الأساسية');

  if (!mission && !vision && !values) return null;

  return (
    <Section
      title="مبادئنا السامية ورسالتنا"
      subtitle="الرؤية والرسالة والقيم الجوهرية التي توجه جهودنا اليومية لرعاية المرضى"
      variant="tint"
      className="border-t border-slate-200/50"
    >
      <div className="grid gap-8 lg:grid-cols-3 items-stretch">
        {/* Mission Card */}
        {mission && (
          <div className="group relative flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-xl hover:shadow-teal-500/2 border-t-4 border-t-teal-500">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-3xl shadow-md shadow-teal-500/5 border border-teal-100 transition-transform duration-300 group-hover:scale-110">
              🎯
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-4 transition-colors group-hover:text-teal-700">
              {mission.heading}
            </h3>
            <p className="text-sm md:text-base leading-8 text-slate-600 font-medium">
              {mission.body}
            </p>
          </div>
        )}

        {/* Vision Card */}
        {vision && (
          <div className="group relative flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-xl hover:shadow-teal-500/2 border-t-4 border-t-navy-800">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-3xl shadow-md shadow-navy-900/5 border border-navy-100 transition-transform duration-300 group-hover:scale-110">
              ✨
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-4 transition-colors group-hover:text-navy-800">
              {vision.heading}
            </h3>
            <div className="space-y-4 flex-1">
              {vision.body?.split('\n\n').filter(Boolean).map((para, i) => (
                <p key={i} className="text-sm md:text-base leading-8 text-slate-600 font-medium">
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Values Card */}
        {values && (
          <div className="group relative flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-xl hover:shadow-teal-500/2 border-t-4 border-t-teal-600">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-3xl shadow-md shadow-teal-500/5 border border-teal-100 transition-transform duration-300 group-hover:scale-110">
              🛡️
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-4 transition-colors group-hover:text-teal-700">
              {values.heading}
            </h3>
            <div className="space-y-4 flex-1">
              {values.body?.split('\n\n').filter(Boolean).map((para, i) => (
                <p key={i} className="text-sm md:text-base leading-8 text-slate-600 font-medium">
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

const TIMELINE_HEADING = 'قصة الدكتور حاتم النجار';
const CARDS_HEADINGS = new Set(['المؤهلات العلمية والشهادات', 'الخبرات والمناصب']);
const NUMBERED_HEADING = 'فلسفة الرعاية الطبية';
const GROUPS_HEADING = 'التخصصات الجراحية';
const PROSE_HEADINGS = new Set(['مهمتنا', 'رؤيتنا', 'قيمنا الأساسية']);

export function AboutPage() {
  const page = pages.about;

  return (
    <>
      <PageHero title={page.titleAr} subtitle={page.introAr} badge="أساس عملنا" />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: page.titleAr }]} />
      </div>

      {page.sections.map((section, index) => {
        if (!section.heading) return null;

        // Skip individual rendering of prose sections to combine them as unified components at the bottom
        if (PROSE_HEADINGS.has(section.heading)) {
          return null;
        }

        if (section.heading === TIMELINE_HEADING) {
          return <TimelineSection key={section.heading} section={section} />;
        }

        if (section.heading === GROUPS_HEADING) {
          return <GroupsSection key={section.heading} section={section} />;
        }

        if (section.heading === NUMBERED_HEADING) {
          return <NumberedSection key={section.heading} section={section} altBg={index % 2 === 1} />;
        }

        if (CARDS_HEADINGS.has(section.heading)) {
          return <CardsSection key={section.heading} section={section} altBg={index % 2 === 1} />;
        }

        return <ListSection key={section.heading} section={section} altBg={index % 2 === 1} />;
      })}

      {/* Modern Unified Mission, Vision, and Values Area */}
      <MissionVisionValues sections={page.sections} />

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <CtaBlock title="هل تريد استشارة مع الدكتور؟" trackingLocation="about_bottom_cta" />
      </div>
    </>
  );
}
