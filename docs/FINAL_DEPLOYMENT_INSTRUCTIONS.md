# Final Deployment Instructions — hatem-alnajar.com

**Target host:** Hostinger (Apache)  
**Upload package:** `hatem-alnajar-static-upload-ready.zip` (project root)  
**Package contents:** Static files only — **no** `server/` folder, **no** source code, **no** WordPress

---

## Before you start

1. Download and keep a **private offline backup** of current production files (for legal/audit only).
2. **Do not restore** the compromised WordPress backup to production as-is.
3. Use Hostinger File Manager or FTP/SFTP with a user that can write to the domain document root (usually `public_html/`).

---

## Step 1 — Backup current production

- [ ] Export/download entire current `public_html/` (or domain root) to a secure local folder
- [ ] Note current DNS and SSL certificate status (should remain unchanged)

---

## Step 2 — Remove compromised WordPress files

Delete from the **document root** (not just hide):

| Remove | Examples |
|---|---|
| WordPress core | `wp-admin/`, `wp-includes/`, all root `*.php` (`index.php`, `wp-config.php`, etc.) |
| WordPress content | `wp-content/` (themes, plugins, uploads — entire folder) |
| Old config | Old `.htaccess`, old `robots.txt`, old polluted `llms.txt` |
| Backups on server | Any `.sql`, `.zip`, `.tar.gz` of old site left on server |

**Critical:** Remove all PHP files. The new site is static HTML/CSS/JS only.

---

## Step 3 — Upload the clean static build

1. Unzip `hatem-alnajar-static-upload-ready.zip` locally.
2. Upload **the contents inside the zip** (not the zip itself) to the document root.
3. Confirm these exist at root level after upload:

```
index.html
.htaccess
sitemap.xml
robots.txt
llms.txt
gone.html
site.webmanifest
_redirects
assets/
images/
about/
services/
contact/
faq/
blog/
privacy/
terms/
```

4. Confirm `.htaccess` is visible (enable “show hidden files” in File Manager).
5. **Do not upload** `dist/server/` — it is build tooling only and is excluded from the upload zip.

---

## Step 4 — Apache requirements

- [ ] `mod_rewrite` must be enabled (standard on Hostinger Apache)
- [ ] `AllowOverride All` (or equivalent) for `.htaccess` to work
- [ ] PHP is **not required** for the new site

---

## Step 5 — Post-upload smoke tests

Open in browser:

| URL | Expected |
|---|---|
| `https://hatem-alnajar.com/` | Homepage loads, Arabic RTL |
| `https://hatem-alnajar.com/about` | About page |
| `https://hatem-alnajar.com/services` | Services index |
| `https://hatem-alnajar.com/services/oncology-surgery` | Service detail (must NOT 410) |
| `https://hatem-alnajar.com/contact` | Contact page |
| `https://hatem-alnajar.com/sitemap.xml` | 19 URLs |
| `https://hatem-alnajar.com/robots.txt` | Clean robots file |
| `https://hatem-alnajar.com/llms.txt` | Clean AI index |

---

## Step 6 — Test redirects (301)

| Old URL | New URL |
|---|---|
| `/about-us/` | `/about` |
| `/contact-us/` | `/contact` |
| `/faqs/` | `/faq` |
| `/home-1-2/` | `/` |
| `/service/radiology/` | `/services/laparoscopic-surgery` |
| `/service/pharmacology/` | `/services/oncology-surgery` |
| Old encoded Arabic blog URLs | `/blog/...` (see `redirects.ts`) |
| `/سياسة-الخصوصية/` | `/privacy` |
| `/الشروط-والأحكام/` | `/terms` |

Use browser or: `curl -I https://hatem-alnajar.com/about-us/`

---

## Step 7 — Test 410 Gone (spam/demo)

Representative URLs should return **410** (not redirect to homepage):

- URL containing `casino` or `vavada`
- `/shop/`, `/cart/`, `/checkout/`
- `/our-doctor/`, `/testimonial/`, `/case-study-1/`

Use: `curl -I https://hatem-alnajar.com/shop/`

---

## Step 8 — Google Search Console

Follow `SEARCH_CONSOLE_CLEANUP.md`:

1. Submit `https://hatem-alnajar.com/sitemap.xml`
2. URL Inspection → Request indexing for `/`, `/about`, `/services`, `/contact`, `/faq`, `/blog`
3. Use Removals for high-volume spam prefixes if still indexed
4. Monitor Coverage report weekly

---

## Step 9 — Security review (if warning persists)

Only after Steps 2–5 are complete:

- [ ] Confirm no PHP remains on server
- [ ] Request Safe Browsing / security review in Search Console if a warning still appears

---

## Rollback policy

| Situation | Action |
|---|---|
| Static site broken | Re-upload zip contents; check `.htaccess` |
| Need old content | Reference **offline** backup only — never restore compromised PHP live |
| Full WordPress restore | Only after complete malware cleanup on a **new** clean install — not recommended |

---

## Owner confirmations still pending (non-blocking for upload)

- Clinic hours in FAQ/contact/schema
- Hero image (`hero.png`) approval for marketing use
- Optional official social media URLs (not added yet)

---

## Support references

| Document | Purpose |
|---|---|
| `FINAL_QA_REPORT.md` | QA results for this build |
| `SEARCH_CONSOLE_CLEANUP.md` | GSC step-by-step |
| `SEO_IMPLEMENTATION_REPORT.md` | SEO/prerender technical details |
| `CONTENT_EXTRACTION_REPORT.md` | Content migration audit |

**Primary contact on site:** +20 11 3018 1737 · info@hatem-alnajar.com
