import { Link } from 'react-router-dom';
import type { ServiceContent } from '../../content/types';

interface ServiceCardProps {
  service: ServiceContent;
  variant?: 'default' | 'compact';
}

export function ServiceCard({ service, variant = 'default' }: ServiceCardProps) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className={`group flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/5 ${
        variant === 'compact' ? 'p-5' : 'p-6 md:p-7'
      }`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/10 to-navy-900/5">
        <img
          src={service.iconPath}
          alt=""
          className="h-8 w-8 transition-transform duration-200 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <h3 className="text-lg font-bold text-navy-900 group-hover:text-teal-700">
        {service.titleAr}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">
        {service.shortDescriptionAr}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600">
        اعرف المزيد
        <span aria-hidden className="transition-transform group-hover:-translate-x-1">
          ←
        </span>
      </span>
    </Link>
  );
}
