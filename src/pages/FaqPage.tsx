import { pages } from '../content/pages';
import { faqCategories, faqs } from '../content/faqs';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { CtaBlock } from '../components/ui/CtaBlock';
import { FAQByCategory } from '../components/ui/FAQAccordion';
import { PageHero } from '../components/ui/PageHero';
import { Section } from '../components/ui/Section';

export function FaqPage() {
  const page = pages.faq;

  return (
    <>
      <PageHero title={page.titleAr} subtitle={page.introAr} badge="مساعدة" compact />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: page.titleAr }]} />
      </div>

      <Section>
        <FAQByCategory categories={faqCategories} items={faqs} />
      </Section>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <CtaBlock title="لم تجد إجابتك؟" subtitle="تواصل معنا مباشرة وسنسعد بالإجابة على استفساراتك" />
      </div>
    </>
  );
}
