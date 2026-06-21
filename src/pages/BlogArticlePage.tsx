import { Link, useParams } from 'react-router-dom';
import { getArticleBySlug, getArticlesSorted } from '../content/articles';
import { getServiceBySlug } from '../content/services';
import { site, whatsappUrl } from '../content/site';
import { extractToc } from '../lib/markdown';
import { ArticleTableOfContents } from '../components/ArticleTableOfContents';
import { MarkdownContent } from '../components/MarkdownContent';
import { ArticleCard } from '../components/ui/ArticleCard';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { NotFoundPage } from './NotFoundPage';

function formatDateAr(iso: string): string {
  try {
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function BlogArticlePage() {
  const { slug } = useParams();
  const article = slug ? getArticleBySlug(slug) : undefined;
  if (!article) return <NotFoundPage />;

  const relatedService = getServiceBySlug(article.relatedServiceId);
  const relatedArticles = getArticlesSorted()
    .filter((a) => a.id !== article.id)
    .slice(0, 3);
  const toc = extractToc(article.bodyMarkdown);
  const heroVisual = article.heroImagePath ?? article.heroIconPath;

  return (
    <>
      <div className="bg-gradient-to-bl from-navy-900 via-navy-800 to-navy-950 py-10 text-white md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Breadcrumb
            variant="light"
            items={[
              { label: 'الرئيسية', to: '/' },
              { label: 'المدونة', to: '/blog' },
              { label: article.titleAr },
            ]}
          />

          <header className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
                <time dateTime={article.datePublished}>{formatDateAr(article.datePublished)}</time>
                <span aria-hidden>·</span>
                <span>{article.readingTimeMinutes} دقائق قراءة</span>
                {relatedService && (
                  <>
                    <span aria-hidden>·</span>
                    <Link
                      to={`/services/${relatedService.slug}`}
                      className="rounded-full bg-white/10 px-3 py-0.5 font-medium text-teal-300 transition-colors hover:bg-white/15"
                    >
                      {relatedService.titleAr}
                    </Link>
                  </>
                )}
              </div>
              <h1 className="text-3xl font-bold leading-snug md:text-4xl">{article.titleAr}</h1>
              <p className="text-base leading-8 text-slate-200">{article.excerptAr}</p>
            </div>

            {heroVisual && (
              <div
                className="flex h-28 w-full shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 md:h-32 md:w-32"
                aria-hidden={!!article.heroIconPath && !article.heroImagePath}
              >
                <img
                  src={heroVisual}
                  alt={article.heroImageAlt ?? ''}
                  className={article.heroImagePath ? 'h-full w-full rounded-2xl object-cover' : 'h-16 w-16'}
                  width={article.heroImagePath ? 128 : 64}
                  height={article.heroImagePath ? 128 : 64}
                />
              </div>
            )}
          </header>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="min-w-0">
            {toc.length >= 3 && (
              <div className="mb-8 lg:hidden">
                <ArticleTableOfContents entries={toc} />
              </div>
            )}

            <MarkdownContent markdown={article.bodyMarkdown} />

            {relatedService && (
              <aside className="mt-12 rounded-2xl border border-teal-500/20 bg-gradient-to-bl from-teal-500/5 to-white p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                  التخصص المرتبط
                </p>
                <h2 className="mt-2 text-xl font-bold text-navy-900">
                  {relatedService.titleAr}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {relatedService.shortDescriptionAr}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button to={`/services/${relatedService.slug}`} variant="primary" size="sm">
                    تعرف على التخصص
                  </Button>
                  <Button href={whatsappUrl} external variant="whatsapp" size="sm" trackingLocation="blog_related_service">
                    احجز عبر واتساب
                  </Button>
                  <Button to="/contact" variant="secondary" size="sm">
                    صفحة التواصل
                  </Button>
                </div>
              </aside>
            )}

            <div className="mt-10 border-t border-slate-200 pt-8">
              <Link to="/blog" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                ← العودة للمدونة
              </Link>
            </div>
          </article>

          <aside className="hidden space-y-5 lg:block">
            <div className="sticky top-24 space-y-5">
              <ArticleTableOfContents entries={toc} />

              <div className="rounded-2xl bg-gradient-to-bl from-navy-900 to-navy-950 p-5 text-white shadow-lg">
                <h2 className="text-base font-bold">احجز استشارتك</h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {site.doctorNameAr} — {relatedService?.titleAr ?? 'استشارة جراحية'}
                </p>
                <div className="mt-4 space-y-2">
                  <Button href={whatsappUrl} external variant="whatsapp" size="sm" className="w-full" trackingLocation="blog_article_sidebar">
                    واتساب
                  </Button>
                  <Button to="/contact" variant="secondary" size="sm" className="w-full">
                    تواصل مع العيادة
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50/50 py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-8 text-2xl font-bold text-navy-900">مقالات ذات صلة</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
