# Dr. Hatem Alnagar — Static Clinic Website

Arabic RTL static website for [hatem-alnajar.com](https://hatem-alnajar.com), built with Vite + React + TypeScript.

Replaces a compromised WordPress installation with a clean, prerendered static app.

## Stack

- Vite 8 · React 19 · TypeScript · React Router · Tailwind CSS v4
- Build-time SSR prerendering for SEO (title, meta, JSON-LD in HTML)
- Apache `.htaccess` redirects (301) and 410 Gone rules for spam URLs

## Commands

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/
npm run preview  # preview dist/
```

## Project docs

See [`docs/`](docs/) for migration reports, deployment instructions, and Search Console cleanup.

## Deployment

Build locally, then upload **contents of `dist/`** (excluding `dist/server/`) to the Hostinger document root. See `docs/FINAL_DEPLOYMENT_INSTRUCTIONS.md`.

**Do not** deploy WordPress backup files or PHP from the old site.
