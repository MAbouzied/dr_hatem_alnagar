import { Link } from 'react-router-dom';
import type { ArticleContent } from '../../content/types';
import { getServiceBySlug } from '../../content/services';

interface ArticleCardProps {
  article: ArticleContent;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const relatedService = getServiceBySlug(article.relatedServiceId);

  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-500/30 hover:shadow-lg"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <time dateTime={article.datePublished}>{article.datePublished}</time>
        <span aria-hidden>·</span>
        <span>{article.readingTimeMinutes} دقائق قراءة</span>
        {relatedService && (
          <>
            <span aria-hidden>·</span>
            <span className="rounded-full bg-teal-500/10 px-2.5 py-0.5 font-medium text-teal-700">
              {relatedService.titleAr}
            </span>
          </>
        )}
      </div>
      <h3 className="text-lg font-bold leading-snug text-navy-900 group-hover:text-teal-700">
        {article.titleAr}
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-slate-600">
        {article.excerptAr.replace(/\*\*/g, '').slice(0, 180)}
      </p>
      <span className="mt-4 text-sm font-medium text-teal-600">اقرأ المقال ←</span>
    </Link>
  );
}
