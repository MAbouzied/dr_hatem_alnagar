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
      className={`relative overflow-hidden bg-gradient-to-bl from-navy-900 via-navy-800 to-navy-950 text-white ${
        compact ? 'py-12 md:py-16' : 'py-16 md:py-24'
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 80%, rgba(20,184,166,0.35) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(45,212,191,0.2) 0%, transparent 40%)',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {badge && (
          <span className="mb-4 inline-block rounded-full bg-teal-500/20 px-4 py-1 text-sm font-medium text-teal-300">
            {badge}
          </span>
        )}
        <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </div>
  );
}
