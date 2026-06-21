import type { TocEntry } from '../lib/markdown';

interface ArticleTableOfContentsProps {
  entries: TocEntry[];
}

export function ArticleTableOfContents({ entries }: ArticleTableOfContentsProps) {
  if (entries.length < 3) return null;

  return (
    <nav aria-label="فهرس المقال" className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-bold text-navy-900">محتويات المقال</h2>
      <ol className="space-y-2 text-sm leading-6">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={entry.level === 3 ? 'mr-4 text-slate-500' : 'text-slate-600'}
          >
            <a
              href={`#${entry.id}`}
              className="transition-colors hover:text-teal-600"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
