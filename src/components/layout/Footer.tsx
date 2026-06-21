import { Link } from 'react-router-dom';
import { services } from '../../content/services';
import { site, whatsappUrl } from '../../content/site';
import { trackWhatsAppClick } from '../../lib/tracking';
import { PhoneNumber } from '../ui/PhoneNumber';
import { navLinks } from '../../lib/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-navy-950 text-slate-300 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/images/favicon.png"
                alt=""
                className="h-10 w-10 shrink-0 rounded-full ring-2 ring-teal-500/20 shadow-md"
                loading="lazy"
                width={40}
                height={40}
              />
              <div className="leading-tight">
                <span className="block text-sm font-bold leading-none text-white">
                  {site.doctorNameAr}
                </span>
                <span className="mt-1 block text-xs font-medium text-slate-400">
                  استشاري الجراحة العامة والمناظير والأورام
                </span>
              </div>
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
                <PhoneNumber as="a" trackingLocation="footer" className="font-medium text-white hover:text-teal-400" />
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400"
                  onClick={() => trackWhatsAppClick('footer', whatsappUrl)}
                >
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
          <p>
            Made by{' '}
            <a
              href="https://on-dm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-400 transition-colors hover:text-teal-400"
            >
              ON DM
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
