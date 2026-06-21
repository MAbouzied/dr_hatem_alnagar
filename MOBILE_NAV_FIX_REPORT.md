# MOBILE_NAV_FIX_REPORT

**Project:** `hatem-alnajar-static/`  
**Date:** 2026-06-22  
**Scope:** Replace mobile dropdown navigation with RTL side drawer

---

## What was wrong before

On viewports below `lg` (1024px), the hamburger menu opened a **full-width panel dropping down below the header** (`fixed inset-0 top-[65px]` with white background). This felt dated and disconnected from the premium navy/teal clinic design:

- No backdrop overlay
- Abrupt appearance (simple fade-in, no slide)
- Menu pushed content visually rather than overlaying it
- Limited hierarchy — plain list on white
- Only one CTA (WhatsApp) at the bottom
- Did not match modern Arabic RTL app patterns (side drawer from the right)

Desktop navigation was unaffected but mobile UX was weak.

---

## What was changed

Created a dedicated **`MobileDrawer`** component and wired it from `Header.tsx`. Desktop header (`lg:flex` nav + WhatsApp CTA) is **unchanged**.

### New mobile drawer behavior

| Requirement | Implementation |
|-------------|----------------|
| Opens from right (RTL) | `fixed top-0 right-0`, slides with `translate-x-full` → `translate-x-0` |
| 80–90% width | `w-[88%] max-w-sm` |
| Backdrop overlay | `bg-navy-950/65 backdrop-blur-sm` full-screen button |
| Close on backdrop | Backdrop is a `<button aria-label="إغلاق القائمة">` |
| Close on X | Dedicated close button in drawer header |
| Close on nav link | `onClick={onClose}` on each `NavLink` |
| Escape key | `keydown` listener closes drawer |
| Body scroll lock | `document.body.style.overflow = 'hidden'` while open (in `Header`) |
| Smooth animation | 300ms `transition-transform` / `transition-opacity` with mount/unmount delay for exit |
| No layout jump | `position: fixed` overlay; no document reflow |
| No horizontal overflow | Drawer off-screen when closed via `translate-x-full` |

### Visual design

- **Deep navy gradient drawer** (`from-navy-950 via-navy-900 to-navy-950`) aligned with site hero/sections
- **Header row:** clinic logo + doctor name + close button
- **Large tappable nav rows** with RTL chevron (`←`), active state in teal tint
- **Footer CTAs:** WhatsApp (`احجز الآن عبر واتساب`) + `CallButton` dark theme (`اتصال مباشر`)
- **Safe area padding** on bottom for notched devices
- Scrollable nav area with `overscroll-contain`

---

## Accessibility notes

- Hamburger: `aria-expanded`, `aria-controls="mobile-menu"`, dynamic `aria-label` (فتح/إغلاق القائمة)
- Drawer: `role="dialog"`, `aria-modal="true"`, `aria-label="قائمة التنقل"`
- Backdrop close button: `aria-label="إغلاق القائمة"`
- Close (X) button: `aria-label="إغلاق القائمة"`
- Visible `focus-visible` outlines on interactive controls
- Escape closes drawer
- No aggressive focus trap (simple, robust pattern per requirements)

---

## Files changed

| File | Change |
|------|--------|
| `src/components/layout/MobileDrawer.tsx` | **New** — RTL side drawer with backdrop, nav, CTAs |
| `src/components/layout/Header.tsx` | Removed dropdown panel; integrated `MobileDrawer` |

**Not changed:** `Layout.tsx`, `navigation.ts`, SEO/prerender/sitemap, content, desktop nav.

---

## Build status

```bash
npm run build
```

**Result:** ✅ Passed  
- 17 routes prerendered  
- No TypeScript or lint errors  

```bash
npm run preview
```

Use for manual mobile testing at ~360px width.

---

## Manual test checklist

- [ ] Open menu from hamburger
- [ ] Drawer slides in from right
- [ ] Close via X button
- [ ] Close via backdrop tap
- [ ] Close via nav link navigation
- [ ] Close via Escape key
- [ ] Body does not scroll while open
- [ ] Desktop header unchanged at `lg+`
- [ ] Mobile CTA bar hidden under drawer when menu open (drawer z-index 60–70 vs CTA z-50)
- [ ] No horizontal page scroll

---

## Remaining TODOs

1. **Screenshots:** No automated mobile screenshots captured; verify visually in `npm run preview` DevTools.
2. **Focus trap (optional):** Could add focus return to hamburger on close for enhanced a11y — not required for this task.
3. **Reduced motion:** Could respect `prefers-reduced-motion` to shorten/disable slide animation.

---

## Summary

Mobile dropdown navigation replaced with a **premium RTL right-side drawer** with blurred backdrop, smooth slide animation, clinic branding header, large nav rows, and dual CTAs. Desktop navigation and all SEO/build pipelines remain intact.
