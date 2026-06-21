import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: React.ReactNode;
  compact?: boolean;
}

export function PageHero({ title, subtitle, badge, children, compact }: PageHeroProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-bl from-navy-950 via-navy-900 to-navy-950 text-white border-b border-navy-950/20 ${
        compact ? 'py-14 md:py-18' : 'py-18 md:py-26'
      }`}
    >
      {/* Decorative Blur bubbles */}
      <div className="absolute inset-0 opacity-25 pointer-events-none" aria-hidden>
        <div className="absolute -top-1/4 -right-1/4 h-[80%] w-[80%] rounded-full bg-teal-500/20 blur-[100px]" />
        <div className="absolute -bottom-1/4 -left-1/4 h-[80%] w-[80%] rounded-full bg-teal-600/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 text-right">
        {badge && (
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 px-4 py-1.5 text-xs md:text-sm font-semibold text-teal-300">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
            {badge}
          </span>
        )}
        <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 md:text-lg border-r-2 border-teal-500/30 pr-4">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </div>
  );
}
