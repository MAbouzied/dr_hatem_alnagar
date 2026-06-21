import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'default' | 'light';
}

export function Breadcrumb({ items, variant = 'default' }: BreadcrumbProps) {
  const isLight = variant === 'light';
  return (
    <nav aria-label="مسار التنقل" className="mb-6">
      <ol className={`flex flex-wrap items-center gap-2 text-sm ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden className={isLight ? 'text-slate-500' : 'text-slate-300'}>
                  /
                </span>
              )}
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className={`transition-colors ${isLight ? 'hover:text-teal-300' : 'hover:text-teal-600'}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? `font-medium ${isLight ? 'text-white' : 'text-navy-900'}` : ''}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
