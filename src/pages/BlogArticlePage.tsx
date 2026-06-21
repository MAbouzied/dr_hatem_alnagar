import { Link, useParams } from 'react-router-dom';
import { getArticleBySlug, getArticlesSorted } from '../content/articles';
import { getServiceBySlug } from '../content/services';
import { whatsappUrl } from '../content/site';
import { MarkdownContent } from '../components/MarkdownContent';
import { ArticleCard } from '../components/ui/ArticleCard';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { NotFoundPage } from './NotFoundPage';

export function BlogArticlePage() {
  const { slug } = useParams();
  const article = slug ? getArticleBySlug(slug) : undefined;
  if (!article) return <NotFoundPage />;

  const relatedService = getServiceBySlug(article.relatedServiceId);
  const relatedArticles = getArticlesSorted()
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
          <Breadcrumb
            items={[
              { label: 'الرئيسية', to: '/' },
              { label: 'المدونة', to: '/blog' },
              { label: article.titleAr },
            ]}
          />
          <header className="mt-4 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <time dateTime={article.datePublished}>{article.datePublished}</time>
              <span aria-hidden>·</span>
              <span>{article.readingTimeMinutes} دقائق قراءة</span>
              {relatedService && (
                <>
                  <span aria-hidden>·</span>
                  <Link
                    to={`/services/${relatedService.slug}`}
                    className="rounded-full bg-teal-500/10 px-3 py-0.5 font-medium text-teal-700 hover:bg-teal-500/20"
                  >
                    {relatedService.titleAr}
                  </Link>
                </>
              )}
            </div>
            <h1 className="text-3xl font-bold leading-snug text-navy-900 md:text-4xl">
              {article.titleAr}
            </h1>
          </header>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <MarkdownContent markdown={article.bodyMarkdown} />

        {relatedService && (
          <aside className="mt-12 rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6">
            <h2 className="font-bold text-navy-900">هل تحتاج استشارة؟</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              هذه المعلومات للتوعية فقط. للتشخيص والعلاج، تواصل مع العيادة في تخصص{' '}
              {relatedService.titleAr}.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button to={`/services/${relatedService.slug}`} variant="primary" size="sm">
                {relatedService.titleAr}
              </Button>
              <Button href={whatsappUrl} external variant="whatsapp" size="sm">
                احجز عبر واتساب
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
