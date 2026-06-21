import { Button } from './Button';
import { site, telUrl, whatsappUrl } from '../../content/site';

interface CtaBlockProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'inline';
}

export function CtaBlock({
  title = 'احجز موعدك الآن',
  subtitle = 'تواصل مع العيادة عبر الهاتف أو واتساب لحجز استشارتك',
  variant = 'default',
}: CtaBlockProps) {
  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-3">
        <Button href={whatsappUrl} external variant="whatsapp" size="lg">
          احجز عبر واتساب
        </Button>
        <Button href={telUrl} variant="secondary" size="lg">
          اتصال مباشر — {site.phoneDisplay}
        </Button>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-bl from-navy-900 via-navy-800 to-navy-950 px-6 py-12 text-white md:px-12 md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 0% 100%, rgba(20,184,166,0.4) 0%, transparent 50%)',
        }}
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        <p className="mt-3 text-base leading-8 text-slate-200">{subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={whatsappUrl} external variant="whatsapp" size="lg">
            احجز عبر واتساب
          </Button>
          <Button href={telUrl} variant="secondary" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
            {site.phoneDisplay}
          </Button>
        </div>
      </div>
    </section>
  );
}
