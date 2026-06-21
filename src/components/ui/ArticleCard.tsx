import { Link } from 'react-router-dom';
import type { ArticleContent } from '../../content/types';
import { getServiceBySlug } from '../../content/services';

interface ArticleCardProps {
  article: ArticleContent;
}

function formatDateAr(iso: string): string {
  try {
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function ArticleCard({ article }: ArticleCardProps) {
  const relatedService = getServiceBySlug(article.relatedServiceId);
  const visual = article.heroImagePath ?? article.heroIconPath;

  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-500/30 hover:shadow-lg"
    >
      {visual && (
        <div className="relative flex h-28 items-center justify-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 border-b border-slate-100/10">
          {/* Glowing teal background blur */}
          <div className="absolute -inset-10 opacity-30 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.3)_0%,transparent_60%)] pointer-events-none" />
          <img
            src={visual}
            alt={article.heroImageAlt ?? relatedService?.titleAr ?? article.titleAr}
            className={
              article.heroImagePath
                ? 'h-full w-full object-cover'
                : 'relative z-10 h-12 w-12 opacity-95 transition-transform duration-300 group-hover:scale-110 filter drop-shadow-[0_4px_12px_rgba(20,184,166,0.25)]'
            }
            width={article.heroImagePath ? 400 : 48}
            height={article.heroImagePath ? 112 : 48}
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <time dateTime={article.datePublished}>{formatDateAr(article.datePublished)}</time>
          <span aria-hidden>·</span>
          <span>{article.readingTimeMinutes} دقائق</span>
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
          {article.excerptAr.replace(/\*\*/g, '')}
        </p>
        <span className="mt-4 text-sm font-medium text-teal-600">اقرأ المقال ←</span>
      </div>
    </Link>
  );
}
