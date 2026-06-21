import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CANONICAL_ORIGIN } from '../src/seo/meta.ts';
import { SITEMAP_ROUTES } from '../src/seo/routes.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const buildDate = new Date().toISOString().slice(0, 10);

const urls = SITEMAP_ROUTES.map((entry) => {
  const loc = entry.path === '/' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${entry.path}`;
  const lastmod = entry.lastmod ?? buildDate;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
}).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
console.log(`Generated sitemap.xml with ${SITEMAP_ROUTES.length} URLs → dist/sitemap.xml`);
