import { pages } from '../content/pages';
import { services } from '../content/services';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { CtaBlock } from '../components/ui/CtaBlock';
import { PageHero } from '../components/ui/PageHero';
import { Section } from '../components/ui/Section';
import { ServiceCard } from '../components/ui/ServiceCard';

export function ServicesPage() {
  const page = pages.servicesHub;

  return (
    <>
      <PageHero title={page.titleAr} subtitle={page.introAr} badge="التخصصات الجراحية" />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: page.titleAr }]} />
      </div>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <CtaBlock
          title="غير متأكد من التخصص المناسب؟"
          subtitle="تواصل معنا وسنساعدك في تحديد الاستشارة المناسبة لحالتك"
        />
      </div>
    </>
  );
}
