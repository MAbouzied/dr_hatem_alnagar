import { Link, useParams } from 'react-router-dom';
import { getArticleBySlug } from '../content/articles';
import { getServiceBySlug } from '../content/services';
import { telUrl, whatsappUrl } from '../content/site';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { CtaBlock } from '../components/ui/CtaBlock';
import { NotFoundPage } from './NotFoundPage';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = slug ? getServiceBySlug(slug) : undefined;
  if (!service) return <NotFoundPage />;

  return (
    <>
      <div className="bg-gradient-to-bl from-navy-900 via-navy-800 to-navy-950 py-12 text-white md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Breadcrumb
            variant="light"
            items={[
              { label: 'الرئيسية', to: '/' },
              { label: 'التخصصات', to: '/services' },
              { label: service.titleAr },
            ]}
          />
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <img src={service.iconPath} alt="" className="h-12 w-12" width={48} height={48} />
            </div>
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">{service.titleAr}</h1>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-200">
                {service.shortDescriptionAr}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <section>
              <h2 className="mb-4 text-xl font-bold text-navy-900">نظرة عامة</h2>
              <p className="leading-8 text-slate-600">{service.fullDescriptionAr}</p>
            </section>

            <div className="grid gap-8 sm:grid-cols-2">
              <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-navy-900">
                  <span className="text-teal-600" aria-hidden>?</span>
                  متى تستشير الطبيب؟
                </h2>
                <ul className="space-y-2">
                  {service.whenToConsultAr.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-7 text-slate-600">
                      <span className="text-teal-500" aria-hidden>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-navy-900">
                  <span className="text-teal-600" aria-hidden>✓</span>
                  الفوائد
                </h2>
                <ul className="space-y-2">
                  {service.benefitsAr.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-7 text-slate-600">
                      <span className="text-teal-500" aria-hidden>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {service.relatedArticleIds.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-bold text-navy-900">مقالات ذات صلة</h2>
                <div className="space-y-3">
                  {service.relatedArticleIds.map((id) => {
                    const article = getArticleBySlug(id);
                    if (!article) return null;
                    return (
                      <Link
                        key={id}
                        to={`/blog/${article.slug}`}
                        className="block rounded-xl border border-slate-200/80 bg-white p-4 transition-colors hover:border-teal-500/30 hover:bg-teal-500/5"
                      >
                        <p className="font-medium text-navy-900">{article.titleAr}</p>
                        <p className="mt-1 text-sm text-slate-500">{article.readingTimeMinutes} دقائق قراءة</p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-navy-900">احجز استشارتك</h3>
              <p className="text-sm leading-7 text-slate-600">
                {service.ctaTextAr} — تواصل مع العيادة لتحديد موعد يناسبك.
              </p>
              <Button href={whatsappUrl} external variant="whatsapp" className="w-full">
                {service.ctaTextAr}
              </Button>
              <Button href={telUrl} variant="secondary" className="w-full">
                اتصال مباشر
              </Button>
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <CtaBlock />
        </div>
      </div>
    </>
  );
}
