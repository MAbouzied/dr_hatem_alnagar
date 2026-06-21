function MenuIcon() {
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
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
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

export function MobileMenuButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="order-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-navy-900 shadow-sm transition-all hover:border-teal-500/30 hover:bg-teal-500/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 lg:hidden"
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
      onClick={onClick}
    >
      {open ? <CloseIcon /> : <MenuIcon />}
    </button>
  );
}
