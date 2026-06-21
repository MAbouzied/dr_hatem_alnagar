# Content Extraction Report — hatem-alnajar.com

**Date:** 2026-06-22  
**Task:** Task 1 — clean content extraction + static React foundation  
**App path:** `hatem-alnajar-static/`

---

## Summary

Extracted clean Arabic clinic content from the read-only SQL dump (`u140527120_l8t3D.hatem-alnajar-com.20260621180827.sql`) and vetted media from `wp-content/uploads/`. Built a new **Vite + React + TypeScript** static app with RTL Arabic layout, typed content modules, route skeleton, and redirect data for Prompt 3.

**Build status:** ✅ `npm run build` succeeds (TypeScript + Vite production bundle).

---

## Files Created

### React app (`hatem-alnajar-static/`)

| Path | Purpose |
|---|---|
| `src/content/types.ts` | Shared TypeScript interfaces |
| `src/content/site.ts` | Site constants, hours TODO, image registry |
| `src/content/pages.ts` | Homepage, about, services hub, contact, FAQ page copy |
| `src/content/services.ts` | 6 services with corrected slugs |
| `src/content/faqs.ts` | 14 FAQ items (deduplicated categories) |
| `src/content/articles.ts` | 5 legitimate Arabic medical articles (full markdown bodies) |
| `src/content/legal.ts` | Privacy + terms (domain typo fixed in text) |
| `src/content/redirects.ts` | 301 map + 410 patterns for spam/demo URLs |
| `src/components/Layout.tsx` | RTL shell, nav, footer |
| `src/components/MarkdownContent.tsx` | Simple markdown renderer |
| `src/pages/*.tsx` | Route placeholders for all core pages |
| `src/App.tsx` | React Router routes |
| `scripts/generated-articles.json` | Intermediate extraction from SQL |
| `public/images/` | Vetted media assets |

### Reports

| Path | Purpose |
|---|---|
| `CONTENT_EXTRACTION_REPORT.md` | This file (workspace root) |

---

## Content Extracted

| Type | Count | Source (WP post IDs) |
|---|---|---|
| Core page content sets | 5 | 4692, 2091, 2729, 2881, 1432 |
| Services | 6 | 2715–2725 (titles/specialties; bodies rewritten) |
| FAQ items | 14 | 1432 (cleaned; removed form spam footer) |
| Blog articles | 5 | 6731, 6725, 6733, 6735, 6737 |
| Legal documents | 2 | 6773 (privacy), 6770 (terms) |

### Site constants (`site.ts`)

- Phone: **+20 11 3018 1737** / WhatsApp **201130181737**
- WhatsApp prefill from `ht_ctc_chat_options` in SQL
- Email: **info@hatem-alnajar.com**
- Address + Maps link (canonical FAQ map URL)
- **Hours (temporary):** Sat/Mon/Wed 8:00 AM – 10:00 PM — with explicit TODO for owner confirmation

---

## Images Copied

| File | Source | Purpose | Approval |
|---|---|---|---|
| `public/images/logo-full.png` | `uploads/2026/05/Logo-أ.د.-حاتم.png` | Clinic logo | No |
| `public/images/favicon.png` | `uploads/2026/01/cropped-Fav-C.png` | Favicon | No |
| `public/images/hero.png` | `uploads/2026/05/CP.png` | Homepage hero | **Yes — confirm official portrait** |
| `public/images/header-banner.png` | `uploads/2026/01/cropped-D1.png` | Optional header banner | **Yes** |
| `public/images/services/*.svg` | `uploads/2025/10/service-icon*.svg` | Service icons (6) | No |

**Not copied:** WooCommerce placeholders, demo doctor photos (`h4-team3.webp`, `avatar-*.webp`), Elementor PHP in uploads, spam-related assets.

---

## WordPress Content Discarded

- **~247 spam posts** (casino, betting, escort, porn, darknet, chat, fashion, etc.)
- **~26 demo/shop pages** (Mediverse homes, case studies, fake doctors, US locations, WooCommerce)
- **7 portfolio spam entries** ("Gateway Casinos" / Precision Oncology)
- **All plugins, themes, PHP, Elementor runtime, WooCommerce**
- **Fake testimonials** (Jonas Blue, Zocdoc, Olivia Brown)
- **Homepage broken stats** (`0 +` counters from compromised/demo Elementor)
- **YouTube embed** on old homepage (`RxMlX8VGC0Q`) — not migrated
- **Virtual care / telehealth blocks** on contact page — simplified to phone/WhatsApp/in-person

---

## Questionable Items Skipped or Flagged

| Item | Action |
|---|---|
| Secondary phone `+201227020058` in terms/privacy | Kept in legal text with **editsNote**; primary site uses +201130181737 |
| Homepage statistics (5000+ surgeries, 98% success) | Not used on homepage — needs owner verification |
| `hero.png` / `header-banner.png` | Copied but flagged `needsApproval: true` |
| Social media links | **Not added** — not reliably found in clean sources |
| FAQ form footer ("Send Massage", agree checkbox) | Discarded |
| Article duplicate revisions (6728, 6730, etc.) | Used published canonical posts only |

---

## URL Mapping (301 redirects prepared in `redirects.ts`)

| Old URL | New URL |
|---|---|
| `/about-us/` | `/about` |
| `/contact-us/` | `/contact` |
| `/faqs/` | `/faq` |
| `/home-1-2/` | `/` |
| `/service/general-surgery/` | `/services/general-surgery` |
| `/service/radiology/` | `/services/laparoscopic-surgery` |
| `/service/orthopedics/` | `/services/bariatric-surgery` |
| `/service/dental-care/` | `/services/colorectal-surgery` |
| `/service/pharmacology/` | `/services/oncology-surgery` |
| `/service/hematology/` | `/services/endocrine-surgery` |
| `/علاج-البواسير-بالليزر-.../` (encoded) | `/blog/laser-hemorrhoids` |
| `/التطورات-الحديثة-في-جراحة-المناظير-.../` | `/blog/laparoscopic-advances` |
| `/جراحات-السمنة-.../` | `/blog/bariatric-surgery-guide` |
| `/سرطان-القولون-.../` | `/blog/colon-cancer-early-detection` |
| `/الغدة-الدرقية-.../` | `/blog/thyroid-surgery-guide` |
| `/سياسة-الخصوصية/` (encoded) | `/privacy` |
| `/الشروط-والأحكام/` (encoded) | `/terms` |

**410 Gone patterns/paths:** shop/cart/checkout, demo pages, case studies, casino/betting/escort keyword patterns — see `src/content/redirects.ts`.

---

## Legal Text Edits

- Replaced `hatem-elnajar.com` → `hatem-alnajar.com` throughout privacy policy body
- Same domain fix in terms; noted alternate phone numbers in legal docs for owner review

---

## Unresolved TODOs (for owner / Task 2–3)

1. **Confirm clinic hours** — FAQ (8 AM–10 PM) vs contact page (8 PM–10 PM)
2. **Confirm primary phone** — site uses +201130181737; legal docs mention +201227020058
3. **Approve hero/clinic photos** (`hero.png`, `header-banner.png`)
4. **Verify homepage stats** if desired (surgeries count, success rate)
5. **Official social media URLs** — not migrated
6. **Deploy redirects** from `redirects.ts` (Netlify `_redirects` / Cloudflare — Task 3)
7. **SEO meta per page** — skeleton only; full titles/descriptions in content files ready for Helmet (Task 3)
8. **Google Search Console** — submit clean sitemap, request spam URL removals

---

## How to Run

```bash
cd hatem-alnajar-static
npm install
npm run dev      # local dev
npm run build    # production build → dist/
```

WordPress backup in `domains/` was **not modified**.
