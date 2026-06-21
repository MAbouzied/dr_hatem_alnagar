# Search Console Cleanup Checklist — hatem-alnajar.com

Use this checklist after uploading the clean static `dist/` to Hostinger and **removing all old WordPress PHP files** from the server.

---

## 1. Deploy the clean static site

- [ ] Upload contents of `hatem-alnajar-static/dist/` to the domain document root
- [ ] Confirm `dist/.htaccess` is active (Apache + `mod_rewrite`)
- [ ] **Delete** old WordPress: `wp-admin/`, `wp-includes/`, `wp-content/`, `*.php`, compromised plugins
- [ ] Do **not** restore old `llms.txt` from WordPress backup

---

## 2. Verify public SEO files

- [ ] Open `https://hatem-alnajar.com/robots.txt`
- [ ] Open `https://hatem-alnajar.com/sitemap.xml` (expect **19 URLs**)
- [ ] Open `https://hatem-alnajar.com/llms.txt` (clean version only)
- [ ] Test `https://hatem-alnajar.com/gone.html` loads (410 companion page)

---

## 3. Submit sitemap in Google Search Console

- [ ] Property: `https://hatem-alnajar.com`
- [ ] Sitemaps → Add: `https://hatem-alnajar.com/sitemap.xml`
- [ ] Wait for “Success” status (may take hours)

---

## 4. URL Inspection — legitimate pages

Request indexing for:

- [ ] `https://hatem-alnajar.com/`
- [ ] `https://hatem-alnajar.com/about`
- [ ] `https://hatem-alnajar.com/services`
- [ ] `https://hatem-alnajar.com/contact`
- [ ] `https://hatem-alnajar.com/faq`
- [ ] `https://hatem-alnajar.com/blog`

For each URL confirm:

- [ ] “URL is on Google” or successfully submitted
- [ ] Rendered HTML shows correct Arabic `<title>` and meta description
- [ ] Canonical points to `https://hatem-alnajar.com/...`

---

## 5. Verify 301 redirects (old → new)

Test in browser or curl:

- [ ] `/about-us/` → `/about`
- [ ] `/contact-us/` → `/contact`
- [ ] `/faqs/` → `/faq`
- [ ] `/service/radiology/` → `/services/laparoscopic-surgery`
- [ ] Old encoded Arabic blog URLs → `/blog/...` (see `redirects.ts`)
- [ ] `/سياسة-الخصوصية/` → `/privacy`
- [ ] `/الشروط-والأحكام/` → `/terms`

---

## 6. Verify 410 Gone for spam/demo URLs

Use URL Inspection on representative spam URLs (expect **410** or “Excluded”):

- [ ] URL containing `casino` or `vavada`
- [ ] `/shop/` or `/cart/`
- [ ] `/our-doctor/` or `/testimonial/`
- [ ] `/case-study-1/`

**Do not** redirect spam URLs to the homepage.

---

## 7. Removals tool (temporary de-index)

For high-volume spam still appearing in search results:

- [ ] GSC → Removals → New request
- [ ] Remove URLs with prefix (examples):
  - `/category/casino/`
  - `/tag/betting/`
  - `/product/` (WooCommerce junk)
- [ ] Removals are temporary (~6 months); 410 + clean site is the permanent fix

---

## 8. Monitor Coverage / Pages report

Weekly for 4–8 weeks:

- [ ] Watch indexed count drop for spam URLs
- [ ] Watch legitimate pages (`/`, `/services/*`, `/blog/*`) get indexed
- [ ] Review “Not found (404)” and “Excluded by ‘noindex’” — expected for gone spam
- [ ] Review “Crawled – currently not indexed” for new blog posts (request indexing if needed)

---

## 9. Safe Browsing / security warning

> If Google still shows a **Safe Browsing** or security warning after deploy:

- [ ] Confirm **all** old PHP, web shells, and compromised plugins are removed from server
- [ ] Confirm no malware in `dist/` (static files only)
- [ ] Visit [Google Safe Browsing status](https://transparencyreport.google.com/safe-browsing/search) for the domain
- [ ] Request a **Security Issues review** in Search Console only after the clean static site is live and old executable code is gone

---

## 10. Ongoing hygiene

- [ ] Never re-upload WordPress backup to production
- [ ] Re-run `npm run build` after content changes; redeploy `dist/`
- [ ] Keep `sitemap.xml` in sync (auto-generated on build)
- [ ] Do not add unverified social `sameAs` links to schema

---

**Primary contact on site:** +20 11 3018 1737 · info@hatem-alnajar.com
