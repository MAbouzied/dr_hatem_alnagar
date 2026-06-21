import { Link } from 'react-router-dom';
import { getArticlesSorted } from '../content/articles';
import { faqs } from '../content/faqs';
import { pages } from '../content/pages';
import { services } from '../content/services';
import { site, whatsappUrl } from '../content/site';
import { Button } from '../components/ui/Button';
import { CallButton } from '../components/ui/CallButton';
import { CtaBlock } from '../components/ui/CtaBlock';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { Section } from '../components/ui/Section';
import { ServiceCard } from '../components/ui/ServiceCard';
import { ArticleCard } from '../components/ui/ArticleCard';

const previewFaqIds = ['booking', 'qualifications', 'location', 'hours', 'insurance'];

export function HomePage() {
  const page = pages.home;
  const latestArticles = getArticlesSorted().slice(0, 3);
  const previewFaqs = faqs.filter((f) => previewFaqIds.includes(f.id));
  const whySection = page.sections.find((s) => s.heading === 'لماذا تختارون عيادتنا؟');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-navy-950 via-navy-900 to-navy-950 text-white py-16 md:py-24 border-b border-navy-950/35">
        {/* Modern Medical Decorative Gradients */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden>
          <div className="absolute top-[-10%] right-[-10%] h-[60%] w-[60%] rounded-full bg-teal-500/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-teal-600/15 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 items-center md:grid-cols-12">
            {/* Hero Text details */}
            <div className="space-y-6 md:col-span-7 text-right">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 px-4 py-1.5 text-sm font-semibold text-teal-300">
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                {site.doctorNameAr}
              </span>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.25] text-white">
                {page.introAr}
              </h1>
              <p className="text-base leading-8 text-slate-300 border-r-2 border-teal-500/30 pr-4">
                {site.taglineAr}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button href={whatsappUrl} external variant="whatsapp" size="lg" trackingLocation="homepage_hero" className="shadow-lg shadow-emerald-950/20">
                  احجز الآن عبر واتساب
                </Button>
                <CallButton theme="dark" trackingLocation="homepage_hero" />
              </div>
            </div>

            {/* Hero Portrait Image (Square / Aspect 4/5) */}
            <div className="md:col-span-5 relative w-full flex justify-center">
              <div className="relative w-full max-w-[420px] md:max-w-none overflow-hidden rounded-3xl shadow-2xl shadow-black/40 border border-white/10 bg-navy-950/40 p-2">
                {/* Visual frame decoration */}
                <div className="absolute top-2 left-2 right-2 h-1 bg-gradient-to-l from-teal-500/40 to-transparent rounded" />
                <img
                  src="/images/hero-square.png"
                  alt="عيادة الدكتور حاتم النجار — استشاري الجراحة العامة والمناظير"
                  className="w-full aspect-square object-cover block rounded-2xl"
                  loading="eager"
                  width={500}
                  height={500}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-2xl bg-white px-5 py-4 text-navy-900 shadow-xl md:-bottom-6 md:-right-6 border border-slate-100/50 flex flex-col items-center justify-center min-w-[120px]">
                <p className="text-3xl font-extrabold text-teal-600 font-sans leading-none">+٢٥</p>
                <p className="text-xs font-bold text-slate-600 mt-2">سنة خبرة جراحية</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / credentials */}
      <Section
        variant="tint"
        title="خبرة موثوقة ورعاية متخصصة"
        subtitle="نقدم رعاية جراحية تجمع بين الخبرة الطبية العميقة والتقنيات الحديثة"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              label: 'استشاري جراحة عامة',
              desc: 'رئيس سابق لقسم الجراحة العامة بالمستشفيات العسكرية بالقوات المسلحة.',
              icon: '🏥',
            },
            {
              label: 'جراحة طفيفة التوغل',
              desc: 'استشاري المناظير المتقدمة واستئصال الأورام وجراحات الغدد الصماء والسمنة.',
              icon: '🔬',
            },
            {
              label: 'رعاية متكاملة',
              desc: 'متابعة طبية دقيقة ومستمرة للتعافي الآمن قبل وبعد الإجراء الجراحي.',
              icon: '🤝',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group relative rounded-2xl border-t-4 border-t-teal-500 border-x border-b border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/5"
            >
              <div className="mb-4 text-3xl shrink-0 select-none bg-slate-50 rounded-xl h-12 w-12 flex items-center justify-center border border-slate-100">
                {item.icon}
              </div>
              <h3 className="font-extrabold text-navy-900 text-lg group-hover:text-teal-700 transition-colors duration-200">{item.label}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        {whySection?.items && (
          <div className="mt-12 rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-navy-900 mb-6 border-r-4 border-teal-500 pr-3">
              لماذا يثق المرضى في عيادتنا؟
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {whySection.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm md:text-base leading-7 text-slate-700 font-medium">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-teal-600 border border-teal-500/20 text-xs" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* Services preview */}
      <Section
        variant="dark"
        title="التخصصات الجراحية"
        subtitle="ستة تخصصات رئيسية تغطي احتياجاتك الجراحية بأحدث التقنيات الطبية المعترف بها دولياً"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} theme="dark" />
          ))}
        </div>
      </Section>

      {/* About preview */}
      <Section
        variant="white"
        title="عن الدكتور حاتم النجار"
        subtitle={pages.about.introAr}
      >
        <div className="grid items-start gap-10 md:grid-cols-12">
          <div className="space-y-6 md:col-span-7">
            <p className="leading-8 text-slate-600 text-base md:text-lg">
              {pages.about.introAr}
            </p>
            <div className="pt-2">
              <Button to="/about" variant="primary" size="lg">
                المزيد عن المسيرة الطبية والدراسات العلمية
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border-r-4 border-r-teal-500 border-y border-l border-slate-200/80 bg-slate-50/50 p-6 md:p-8 shadow-sm md:col-span-5">
            <h3 className="mb-5 font-bold text-navy-900 text-lg border-b border-slate-200/60 pb-3">أبرز المؤهلات العلمية والمهنية</h3>
            <ul className="space-y-4">
              {(pages.about.sections[1]?.items ?? []).slice(0, 4).map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700 font-medium">
                  <span className="text-teal-600 text-xs mt-1" aria-hidden>✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ preview */}
      <Section variant="tint" title="الأسئلة الشائعة عن العيادة" subtitle="إجابات سريعة ومبسطة عن أكثر ما يسأل عنه مراجعو عيادتنا">
        <div className="max-w-4xl mx-auto">
          <FAQAccordion items={previewFaqs} />
          <div className="mt-8 text-center">
            <Link to="/faq" className="inline-flex items-center gap-1.5 text-base font-bold text-teal-600 hover:text-teal-700 transition-colors duration-200">
              تصفح كافة الأسئلة الشائعة
              <span aria-hidden className="text-lg">←</span>
            </Link>
          </div>
        </div>
      </Section>

      {/* Articles preview */}
      <Section
        variant="white"
        title="آخر المقالات الطبية والتوعوية"
        subtitle="معلومات طبية موثوقة ومحررة بعناية فائقة لتوعية زوار العيادة بصحتهم"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button to="/blog" variant="secondary">
            تصفح المدونة الطبية بالكامل
          </Button>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section variant="tint" className="border-t-0">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl font-bold text-navy-900">يسعدنا استقبالكم في العيادة</h2>
            <p className="text-base md:text-lg leading-8 text-slate-700 font-medium">{site.addressAr}</p>
            <div className="inline-flex items-center gap-2 rounded-xl bg-teal-500/10 border border-teal-500/15 px-4 py-2 text-sm font-bold text-teal-800">
              🗓️ {site.clinicHours.daysAr} — {site.clinicHours.hoursAr}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/50">
              <CtaBlock variant="inline" trackingLocation="homepage_contact_cta" />
            </div>
          </div>

          <div className="md:col-span-5 w-full">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-teal-500/30 bg-white p-8 text-center transition-all duration-300 hover:border-teal-500/50 hover:bg-teal-500/5 shadow-md shadow-teal-500/2"
            >
              <span className="text-5xl transition-transform duration-300 group-hover:scale-110" aria-hidden>📍</span>
              <div>
                <p className="font-extrabold text-navy-900 text-lg group-hover:text-teal-700 transition-colors duration-200">افتح الموقع على خرائط Google</p>
                <p className="mt-1.5 text-sm font-semibold text-slate-500">مصر الجديدة، القاهرة، مصر</p>
              </div>
            </a>
          </div>
        </div>
      </Section>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 mt-6">
        <CtaBlock trackingLocation="homepage_bottom_cta" />
      </div>
    </>
  );
}
