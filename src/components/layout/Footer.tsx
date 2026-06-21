import { Link } from 'react-router-dom';
import { services } from '../../content/services';
import { site, telUrl, whatsappUrl } from '../../content/site';
import { navLinks } from '../../lib/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-navy-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/images/logo-full.png"
                alt={site.images.find((i) => i.filename === 'logo-full.png')?.altAr ?? site.siteNameAr}
                className="h-14 w-auto brightness-0 invert"
                loading="lazy"
                width={120}
                height={56}
              />
            </Link>
            <p className="mt-4 text-sm leading-7 text-slate-400">{site.taglineAr}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-teal-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">التخصصات</h3>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="transition-colors hover:text-teal-400"
                  >
                    {service.titleAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">تواصل معنا</h3>
            <ul className="space-y-3 text-sm leading-7">
              <li>{site.addressAr}</li>
              <li>
                <a href={telUrl} className="font-medium text-white hover:text-teal-400">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-teal-400">
                  واتساب
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-teal-400">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {currentYear} {site.siteNameAr}. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-teal-400">
              سياسة الخصوصية
            </Link>
            <Link to="/terms" className="hover:text-teal-400">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
