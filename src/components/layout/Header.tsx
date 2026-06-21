import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../../lib/navigation';
import { site, whatsappUrl } from '../../content/site';
import { Button } from '../ui/Button';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-teal-500/10 text-teal-700'
        : 'text-slate-600 hover:bg-slate-100 hover:text-navy-900'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img
            src="/images/favicon.png"
            alt=""
            className="h-10 w-10 rounded-full ring-2 ring-teal-500/20"
            width={40}
            height={40}
          />
          <div className="leading-tight">
            <span className="block text-sm font-bold text-navy-900">{site.doctorNameAr}</span>
            <span className="hidden text-xs text-slate-500 sm:block">استشاري الجراحة العامة</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقل الرئيسي">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={'end' in link ? link.end : false} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href={whatsappUrl} external variant="whatsapp" size="sm">
            احجز الآن
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-navy-900 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="text-xl" aria-hidden>
            {menuOpen ? '✕' : '☰'}
          </span>
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-[65px] z-40 bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="قائمة التنقل"
        >
          <nav className="flex flex-col gap-1 p-4" aria-label="التنقل للجوال">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={'end' in link ? link.end : false}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-medium ${
                    isActive ? 'bg-teal-500/10 text-teal-700' : 'text-navy-900 hover:bg-slate-50'
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-4 border-t border-slate-100 pt-4">
              <Button href={whatsappUrl} external variant="whatsapp" size="lg" className="w-full">
                احجز عبر واتساب
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
