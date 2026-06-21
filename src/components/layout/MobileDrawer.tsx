import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../../lib/navigation';
import { site, telUrl, whatsappUrl } from '../../content/site';
import { trackPhoneCallClick } from '../../lib/tracking';
import { Button } from '../ui/Button';
import { CallButton } from '../ui/CallButton';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

function DrawerCloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), 300);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflowX = document.body.style.overflowX;

    document.body.style.overflow = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overflowX = previousBodyOverflowX;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!mounted || !portalRoot) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] lg:hidden" aria-hidden={!visible}>
      <button
        type="button"
        className={`fixed inset-0 z-[100] bg-[rgba(2,8,23,0.55)] backdrop-blur-sm transition-opacity duration-300 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="إغلاق القائمة"
        onClick={onClose}
      />

      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="قائمة التنقل"
        className={`fixed top-0 right-0 z-[110] flex h-[100dvh] min-h-[100dvh] w-[56vw] min-w-[280px] max-w-[340px] flex-col bg-navy-950 text-white shadow-[-12px_0_32px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="shrink-0 border-b border-white/10 bg-navy-900 px-4 py-4 pt-[max(1rem,env(safe-area-inset-top))]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              aria-label="إغلاق القائمة"
              onClick={onClose}
            >
              <DrawerCloseIcon />
            </button>

            <Link to="/" className="flex min-w-0 flex-1 items-center gap-3" onClick={onClose}>
              <img
                src="/images/favicon.png"
                alt=""
                className="h-11 w-11 shrink-0 rounded-full bg-white ring-2 ring-teal-500/40"
                width={44}
                height={44}
              />
              <div className="min-w-0 text-right leading-tight">
                <span className="block truncate text-sm font-bold text-white">{site.doctorNameAr}</span>
                <span className="mt-0.5 block truncate text-xs text-slate-300">
                  استشاري الجراحة العامة والمناظير والأورام
                </span>
              </div>
            </Link>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-5" aria-label="التنقل للجوال">
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={'end' in link ? link.end : false}
                  className={({ isActive }) =>
                    `flex min-h-[3.25rem] items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 ${
                      isActive
                        ? 'border border-teal-400/40 bg-teal-500/20 text-teal-100 shadow-sm shadow-teal-500/10'
                        : 'border border-transparent bg-white/5 text-slate-100 hover:border-white/10 hover:bg-white/10 hover:text-white'
                    }`
                  }
                  onClick={onClose}
                >
                  <span>{link.label}</span>
                  <span className="text-sm text-teal-300/80" aria-hidden>
                    ←
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 space-y-3 border-t border-white/10 bg-navy-950 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button
            href={whatsappUrl}
            external
            variant="whatsapp"
            size="lg"
            trackingLocation="mobile_drawer"
            className="w-full shadow-lg shadow-emerald-950/30"
          >
            احجز الآن
          </Button>
          <CallButton theme="dark" fullWidth trackingLocation="mobile_drawer" />
          <Link
            to="/contact"
            onClick={onClose}
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          >
            صفحة التواصل
          </Link>
          <a
            href={telUrl}
            className="block text-center text-xs text-slate-400 transition-colors hover:text-slate-200"
            onClick={() => trackPhoneCallClick('mobile_drawer', telUrl)}
          >
            {site.phoneDisplay}
          </a>
        </div>
      </aside>
    </div>,
    portalRoot,
  );
}
