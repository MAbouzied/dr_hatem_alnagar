import React from 'react';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'white' | 'tint' | 'dark';
  altBg?: boolean; // Keep for backward compatibility
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  variant,
  altBg,
}: SectionProps) {
  // Determine variant based on altBg for backward compatibility if variant is not specified
  const activeVariant = variant ?? (altBg ? 'white' : 'light');

  const bgClasses = {
    light: 'bg-cream text-navy-900',
    white: 'bg-white text-navy-900',
    tint: 'bg-[#f4fbfc] border-y border-teal-500/5 text-navy-900',
    dark: 'bg-gradient-to-bl from-navy-950 via-navy-900 to-navy-950 text-white border-y border-navy-950/20',
  }[activeVariant];

  const headerTitleClasses = activeVariant === 'dark' ? 'text-white' : 'text-navy-900';
  const headerSubtitleClasses = activeVariant === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <section id={id} className={`py-14 md:py-20 ${bgClasses} ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {(title || subtitle) && (
          <header className="mb-10 max-w-2xl text-right">
            {title && (
              <h2 className={`text-2xl font-bold md:text-3xl ${headerTitleClasses}`}>{title}</h2>
            )}
            {subtitle && (
              <p className={`mt-3 text-base leading-8 md:text-lg ${headerSubtitleClasses}`}>{subtitle}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
