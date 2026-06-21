import { Link } from 'react-router-dom';
import type { ServiceContent } from '../../content/types';

interface ServiceCardProps {
  service: ServiceContent;
  variant?: 'default' | 'compact';
  theme?: 'light' | 'dark';
}

export function ServiceCard({ service, variant = 'default', theme = 'light' }: ServiceCardProps) {
  const cardClasses =
    theme === 'dark'
      ? `group flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/40 hover:bg-white/10 hover:shadow-teal-500/10 text-white ${
          variant === 'compact' ? 'p-5' : 'p-6 md:p-7'
        }`
      : `group flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/5 text-navy-900 ${
          variant === 'compact' ? 'p-5' : 'p-6 md:p-7'
        }`;

  const iconContainerClasses =
    theme === 'dark'
      ? 'mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/20'
      : 'mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 shadow-md shadow-navy-950/10';

  const titleClasses =
    theme === 'dark'
      ? 'text-lg font-bold group-hover:text-teal-300 transition-colors duration-200'
      : 'text-lg font-bold group-hover:text-teal-700 transition-colors duration-200';

  const descriptionClasses =
    theme === 'dark'
      ? 'mt-2 flex-1 text-sm leading-7 text-slate-300'
      : 'mt-2 flex-1 text-sm leading-7 text-slate-600';

  const linkClasses =
    theme === 'dark'
      ? 'mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-300 transition-all duration-200 group-hover:text-teal-200'
      : 'mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 transition-all duration-200 group-hover:text-teal-700';

  return (
    <Link to={`/services/${service.slug}`} className={cardClasses}>
      <div className={iconContainerClasses}>
        <img
          src={service.iconPath}
          alt=""
          className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          width={32}
          height={32}
        />
      </div>
      <h3 className={titleClasses}>{service.titleAr}</h3>
      <p className={descriptionClasses}>{service.shortDescriptionAr}</p>
      <span className={linkClasses}>
        اعرف المزيد
        <span aria-hidden className="transition-transform duration-200 group-hover:-translate-x-1">
          ←
        </span>
      </span>
    </Link>
  );
}
