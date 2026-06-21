import { Link } from 'react-router-dom';
import { getArticlesSorted } from '../content/articles';
import { faqs } from '../content/faqs';
import { pages } from '../content/pages';
import { services } from '../content/services';
import { site, telUrl, whatsappUrl } from '../content/site';
import { Button } from '../components/ui/Button';
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
      <section className="relative overflow-hidden bg-gradient-to-bl from-navy-900 via-navy-800 to-navy-950 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(45,212,191,0.25) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(20,184,166,0.2) 0%, transparent 40%)',
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div className="space-y-6">
            <span className="inline-block rounded-full bg-teal-500/20 px-4 py-1.5 text-sm font-medium text-teal-300">
              {site.doctorNameAr}
            </span>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.25]">
              {page.introAr}
            </h1>
            <p className="text-base leading-8 text-slate-300">{site.taglineAr}</p>
            <div className="flex flex-wrap gap-3">
              <Button href={whatsappUrl} external variant="whatsapp" size="lg">
                احجز الآن عبر واتساب
              </Button>
              <Button href={telUrl} variant="secondary" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                اتصال مباشر
              </Button>
            </div>
          </div>
          <div className="relative">
            {/* TODO(owner): Confirm hero.png is approved official portrait before production launch */}
            <div className="overflow-hidden rounded-3xl shadow-2xl shadow-black/30 ring-1 ring-white/10">
              <img
                src="/images/hero.png"
                alt="عيادة الدكتور حاتم النجار — استشاري الجراحة العامة والمناظير"
                className="aspect-[4/5] w-full object-cover object-top"
                loading="eager"
                width={560}
                height={700}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-2xl bg-white px-5 py-4 text-navy-900 shadow-xl md:-bottom-6 md:-right-6">
              <p className="text-2xl font-bold text-teal-600">+٢٥</p>
              <p className="text-sm text-slate-600">سنة خبرة جراحية</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / credentials */}
      <Section
        title="خبرة موثوقة ورعاية متخصصة"
        subtitle="نقدم رعاية جراحية تجمع بين الخبرة الطبية العميقة والتقنيات الحديثة"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: 'استشاري جراحة عامة', desc: 'رئيس سابق لقسم الجراحة بالقوات المسلحة' },
            { label: 'جراحة طفيفة التوغل', desc: 'تخصص في المناظير والأورام والغدد الصماء' },
            { label: 'رعاية متكاملة', desc: 'متابعة شاملة قبل وبعد العمليات' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 h-1 w-10 rounded-full bg-teal-500" />
              <h3 className="font-bold text-navy-900">{item.label}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
        {whySection?.items && (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {whySection.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-700">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-xs text-teal-700" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Services preview */}
      <Section
        title="التخصصات الجراحية"
        subtitle="ستة تخصصات رئيسية تغطي احتياجاتك الجراحية"
        altBg
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button to="/services" variant="secondary">
            عرض جميع التخصصات
          </Button>
        </div>
      </Section>

      {/* About preview */}
      <Section
        title="عن الدكتور حاتم النجار"
        subtitle={pages.about.introAr}
      >
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <p className="leading-8 text-slate-600">
              {pages.about.sections[0]?.body}
            </p>
            <Button to="/about" variant="primary">
              المزيد عن الدكتور
            </Button>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-bold text-navy-900">المؤهلات العلمية</h3>
            <ul className="space-y-3">
              {(pages.about.sections[1]?.items ?? []).slice(0, 4).map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
                  <span className="text-teal-600" aria-hidden>●</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ preview */}
      <Section title="أسئلة شائعة" subtitle="إجابات سريعة عن أكثر ما يُسأل" altBg>
        <FAQAccordion items={previewFaqs} />
        <div className="mt-6 text-center">
          <Link to="/faq" className="text-sm font-medium text-teal-600 hover:text-teal-700">
            عرض جميع الأسئلة ←
          </Link>
        </div>
      </Section>

      {/* Articles preview */}
      <Section
        title="آخر المقالات الطبية"
        subtitle="معلومات موثوقة من فريق العيادة"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button to="/blog" variant="secondary">
            جميع المقالات
          </Button>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section altBg>
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-navy-900">زورونا في العيادة</h2>
            <p className="mt-3 leading-8 text-slate-600">{site.addressAr}</p>
            <p className="mt-2 text-sm text-slate-500">
              {site.clinicHours.daysAr} — {site.clinicHours.hoursAr}
            </p>
            <div className="mt-6">
              <CtaBlock variant="inline" />
            </div>
          </div>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-teal-500/30 bg-teal-500/5 p-8 text-center transition-colors hover:border-teal-500/50 hover:bg-teal-500/10"
          >
            <span className="text-4xl" aria-hidden>📍</span>
            <div>
              <p className="font-bold text-navy-900">افتح الموقع على خرائط Google</p>
              <p className="mt-1 text-sm text-slate-600">مصر الجديدة، القاهرة</p>
            </div>
          </a>
        </div>
      </Section>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <CtaBlock />
      </div>
    </>
  );
}
