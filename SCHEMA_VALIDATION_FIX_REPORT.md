# Schema.org JSON-LD Validation Fix Report

**Date:** 2026-06-22  
**Project:** `hatem-alnajar-static/`  
**Scope:** Structured data only — no visible page content, routes, GTM, sitemap, or robots changes.

---

## Original Errors (Schema.org Validator)

The homepage JSON-LD graph reported **11 errors and 1 warning**, including:

| Issue | Detail |
|-------|--------|
| Invalid `medicalSpecialty` values | Free-text English strings (`General Surgery`, `Laparoscopic Surgery`, `Bariatric Surgery`, `Colorectal Surgery`, `Oncologic Surgery`, `Endocrine Surgery`) are not valid Schema.org `MedicalSpecialty` enumeration values |
| Invalid `physician` on `MedicalClinic` | `physician` is not a recognized property on `MedicalClinic` |
| Invalid `worksFor` on `Physician` | `worksFor` is valid on `Person` / `Organization`, not on `Physician` |
| Duplicate clinic node | Homepage included a second `MedicalClinic` (`#homepage-clinic`) alongside the main clinic entity |

---

## What Was Changed

### 1. `medicalSpecialty` — valid enum URLs only

Replaced all free-text specialty strings with Schema.org `MedicalSpecialty` enumeration URLs.

**Mapping used:**

| Service slug | Schema.org URL |
|--------------|----------------|
| `general-surgery` | `https://schema.org/Surgical` |
| `laparoscopic-surgery` | `https://schema.org/Surgical` |
| `bariatric-surgery` | `https://schema.org/Surgical` |
| `colorectal-surgery` | `https://schema.org/Gastroenterologic` |
| `oncology-surgery` | `https://schema.org/Oncologic` |
| `endocrine-surgery` | `https://schema.org/Endocrine` |

**Clinic-level `medicalSpecialty` (deduplicated safe set):**

```json
[
  "https://schema.org/Surgical",
  "https://schema.org/Gastroenterologic",
  "https://schema.org/Oncologic",
  "https://schema.org/Endocrine"
]
```

Visible Arabic specialty names on the website were **not** changed.

### 2. Doctor entity — `Person` instead of `Physician`

- `@type` changed from `Physician` → `Person`
- `@id` changed from `#physician` → `#doctor`
- `worksFor` retained and now valid on `Person`
- Removed invalid `medicalSpecialty` from doctor node
- Added `jobTitle` and `knowsAbout` (Arabic specialty names as readable text — not enum fields)

### 3. Clinic entity — `employee` instead of `physician`

- Removed unrecognized `physician` property
- Added `employee: { "@id": "https://hatem-alnajar.com/#doctor" }`
- `founder` was **not** used (not explicitly stated as founder in content)

### 4. Service detail pages — `Service` instead of `MedicalProcedure`

- Replaced `MedicalProcedure` with `Service` schema
- Added `relevantSpecialty` with the correct valid enum URL per service slug
- `serviceType` uses Arabic readable text (`titleAr`)
- `provider` points to `#clinic`

### 5. Homepage graph cleanup

- Removed duplicate `#homepage-clinic` `MedicalClinic` node
- `openingHoursSpecification.dayOfWeek` updated to Schema.org day URLs (`https://schema.org/Saturday`, etc.)

### 6. About page references

- `AboutPage` and `ProfilePage` `mainEntity` updated from `#physician` → `#doctor`

---

## Doctor / Clinic Relationship (After Fix)

```
MedicalClinic (#clinic)
  └── employee → Person (#doctor)

Person (#doctor)
  └── worksFor → MedicalClinic (#clinic)
```

Bidirectional linking via `@id` references in the same `@graph`.

---

## Files Changed

| File | Changes |
|------|---------|
| `src/seo/schema.ts` | Added `SCHEMA_MEDICAL_SPECIALTIES`, `CLINIC_MEDICAL_SPECIALTIES`, `getServiceSchemaSpecialty()`, `doctorEntity()`, `serviceEntity()`; fixed `clinicEntity()`; updated opening hours day URLs |
| `src/seo/routes.ts` | Switched to `doctorEntity` / `serviceEntity`; removed duplicate homepage clinic; updated about page `mainEntity` IDs |

---

## Build Status

```bash
npm run build
```

**Result:** ✅ Passed — 17 routes prerendered successfully.

---

## Post-Build Verification

### Grep scan (`dist/`)

```bash
grep -RniE '"medicalSpecialty":\s*"General Surgery"|...|"physician"\s*:|"@type"\s*:\s*"Physician".*"worksFor"' dist
```

**Result:** ✅ No matches — no invalid patterns in generated HTML.

### JSON-LD graph inspection

| Route | Graph nodes |
|-------|-------------|
| `/` | Organization, MedicalClinic, Person, WebSite, WebPage |
| `/about` | Person, MedicalClinic, AboutPage, ProfilePage, BreadcrumbList |
| `/services/oncology-surgery` | MedicalClinic, Person, Service, WebPage, BreadcrumbList |
| `/faq` | FAQPage, WebPage, BreadcrumbList |

### Homepage field checks

| Field | Value |
|-------|-------|
| `MedicalClinic.medicalSpecialty` | 4 valid Schema.org URLs |
| `MedicalClinic.employee` | `{ "@id": ".../#doctor" }` |
| `MedicalClinic.physician` | **absent** |
| `Person.worksFor` | `{ "@id": ".../#clinic" }` |
| `Person.@type` | `Person` (not `Physician`) |
| SEO `<title>` / `meta description` | **present** |

---

## Manual Validator Check

**Status:** Not run against live Schema.org Validator API in this session (requires external fetch).

**Expected result after deploy / local HTML upload:**

- ✅ No `medicalSpecialty` invalid value errors
- ✅ No invalid `physician` property on `MedicalClinic`
- ✅ No `worksFor` warning on `Physician` (type is now `Person`)

### Possible remaining warnings (non-blocking)

- `dayOfWeek` as full Schema.org URLs — valid but some validators prefer short day names; current format follows Schema.org `DayOfWeek` enumeration style
- `relevantSpecialty` on `Service` — valid per Schema.org; validator acceptance may vary by version

---

## Intentionally Unchanged

- Visible Arabic page content
- Routes and navigation
- SEO titles and meta descriptions
- GTM / `dataLayer` tracking
- Sitemap, robots, redirects
- No invented credentials, ratings, reviews, or social links
