import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CANONICAL_ORIGIN } from '../src/seo/meta.ts';
import { getSeoForPath, PRERENDER_ROUTES } from '../src/seo/routes.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const serverEntry = path.resolve(distDir, 'server/entry-server.js');

const templatePath = path.join(distDir, 'index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

const { render } = await import(serverEntry);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHeadHtml(pathname: string): string {
  const { meta, jsonLd } = getSeoForPath(pathname);
  const canonical =
    meta.path === '/404'
      ? null
      : `${CANONICAL_ORIGIN}${meta.path === '/' ? '' : meta.path}`;

  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    canonical ? `<link rel="canonical" href="${canonical}" />` : '',
    `<meta name="robots" content="${meta.robots}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    canonical ? `<meta property="og:url" content="${canonical}" />` : '',
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:site_name" content="عيادة الدكتور حاتم النجار" />`,
    `<meta property="og:locale" content="ar_EG" />`,
    meta.ogImage ? `<meta property="og:image" content="${meta.ogImage}" />` : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    meta.ogImage ? `<meta name="twitter:image" content="${meta.ogImage}" />` : '',
    meta.articlePublishedTime
      ? `<meta property="article:published_time" content="${meta.articlePublishedTime}" />`
      : '',
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  ].filter(Boolean);

  return tags.join('\n    ');
}

function injectPage(templateHtml: string, route: string, appHtml: string): string {
  let out = templateHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  out = out.replace(/<title>[\s\S]*?<\/title>/i, '');
  out = out.replace(/<meta name="description"[^>]*>/i, '');
  out = out.replace('<!--seo-head-->', '');
  const headHtml = buildHeadHtml(route);
  out = out.replace('</head>', `    ${headHtml}\n  </head>`);
  return out;
}

function routeToFile(route: string): string {
  if (route === '/') return path.join(distDir, 'index.html');
  const segments = route.replace(/^\//, '').split('/');
  return path.join(distDir, ...segments, 'index.html');
}

for (const route of PRERENDER_ROUTES) {
  const { html } = render(route);
  const pageHtml = injectPage(template, route, html);
  const outFile = routeToFile(route);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, pageHtml, 'utf-8');
  console.log(`Prerendered ${route} → ${path.relative(distDir, outFile)}`);
}

console.log(`\nPrerendered ${PRERENDER_ROUTES.length} routes.`);
