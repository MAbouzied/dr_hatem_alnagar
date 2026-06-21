import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../../lib/navigation';
import { site, whatsappUrl } from '../../content/site';
import { Button } from '../ui/Button';
import { MobileDrawer } from './MobileDrawer';
import { MobileMenuButton } from './MobileMenuButton';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 border ${
      isActive
        ? 'bg-teal-500/10 text-teal-700 border-teal-500/20 shadow-sm shadow-teal-500/2'
        : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-navy-900 hover:border-slate-100'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-md shadow-sm shadow-navy-900/1">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Mobile: order-1 = inline-start = right in RTL. Desktop: logo stays on the right. */}
        <MobileMenuButton
          open={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        />

        <Link
          to="/"
          className="order-2 flex min-w-0 flex-1 items-center gap-3 lg:order-1 lg:flex-none"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/images/favicon.png"
            alt=""
            className="h-10 w-10 shrink-0 rounded-full ring-2 ring-teal-500/20 shadow-md"
            width={40}
            height={40}
          />
          <div className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-bold leading-none text-navy-900">
              {site.doctorNameAr}
            </span>
            <span className="mt-1 hidden truncate text-xs font-medium text-slate-500 sm:block">
              استشاري الجراحة العامة والمناظير والأورام
            </span>
          </div>
        </Link>

        <nav
          className="order-3 hidden items-center gap-1 lg:flex"
          aria-label="التنقل الرئيسي"
        >
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={'end' in link ? link.end : false} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="order-4 hidden items-center gap-2 lg:flex">
          <Button href={whatsappUrl} external variant="whatsapp" size="sm" trackingLocation="global_header" className="shadow-md shadow-emerald-950/10">
            احجز الآن
          </Button>
        </div>
      </div>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
