interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  altBg?: boolean;
}

export function Section({ id, title, subtitle, children, className = '', altBg }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-14 md:py-20 ${altBg ? 'bg-white' : ''} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {(title || subtitle) && (
          <header className="mb-10 max-w-2xl">
            {title && (
              <h2 className="text-2xl font-bold text-navy-900 md:text-3xl">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-3 text-base leading-8 text-slate-600 md:text-lg">{subtitle}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
