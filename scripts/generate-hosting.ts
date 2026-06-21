import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { redirects } from '../src/content/redirects.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');
const distDir = path.resolve(__dirname, '../dist');

const spamPatterns = [
  ...redirects.gonePatterns.map((p) => p.pattern),
  'ringospin',
  'listcrawlers',
];

const exactGone = [
  ...redirects.exactGonePaths,
  '/portfolio/',
  '/portfolio',
  '/case-study/',
  '/case-study',
];

const htaccessLines: string[] = [
  '# hatem-alnajar.com — static React site (generated from redirects.ts)',
  'Options -Indexes',
  'DirectoryIndex index.html',
  '',
  'RewriteEngine On',
  '',
  '# --- 1. 410 Gone: spam keyword patterns ---',
];

for (const pattern of spamPatterns) {
  htaccessLines.push(
    `RewriteCond %{REQUEST_URI} ${pattern} [NC]`,
    'RewriteRule .* - [G,L]',
    '',
  );
}

htaccessLines.push('# --- 2. 410 Gone: exact demo/spam paths ---');
for (const gonePath of exactGone) {
  const trimmed = gonePath.replace(/^\//, '').replace(/\/$/, '');
  const pattern = trimmed ? `^${trimmed}/?$` : '^$';
  htaccessLines.push(`RewriteRule ${pattern} - [G,L]`);
}

htaccessLines.push('', '# --- 3. 301 redirects: legitimate old URLs ---');

for (const redirect of redirects.permanent) {
  const from = redirect.from.replace(/^\//, '').replace(/\/$/, '');
  const to = redirect.to.startsWith('/') ? redirect.to : `/${redirect.to}`;
  if (from.includes('%')) {
    htaccessLines.push(`RewriteRule ^${from}/?$ ${to} [R=301,L,NE]`);
  } else {
    htaccessLines.push(`RewriteRule ^${from}/?$ ${to} [R=301,L]`);
  }
}

htaccessLines.push(
  '',
  '# --- 4. Static files & prerendered routes ---',
  'RewriteCond %{REQUEST_FILENAME} -f [OR]',
  'RewriteCond %{REQUEST_FILENAME} -d',
  'RewriteRule ^ - [L]',
  '',
  '# --- 5. SPA fallback for unknown client routes ---',
  'RewriteRule ^ index.html [L]',
  '',
);

const htaccess = htaccessLines.join('\n');
fs.writeFileSync(path.join(publicDir, '.htaccess'), htaccess, 'utf-8');
fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, '.htaccess'), htaccess, 'utf-8');

const netlifyRedirects: string[] = [
  '# Netlify / Cloudflare Pages redirects (generated)',
  '',
];

for (const pattern of spamPatterns) {
  netlifyRedirects.push(`/*${pattern}* /gone.html 410`);
}

for (const gonePath of exactGone) {
  const p = gonePath.endsWith('/') ? gonePath : `${gonePath}/`;
  netlifyRedirects.push(`${p} /gone.html 410`);
  if (!gonePath.endsWith('/')) {
    netlifyRedirects.push(`${gonePath} /gone.html 410`);
  }
}

for (const redirect of redirects.permanent) {
  netlifyRedirects.push(`${redirect.from} ${redirect.to} 301`);
}

netlifyRedirects.push('', '/* /index.html 200');

fs.writeFileSync(path.join(publicDir, '_redirects'), netlifyRedirects.join('\n'), 'utf-8');
fs.writeFileSync(path.join(distDir, '_redirects'), netlifyRedirects.join('\n'), 'utf-8');

console.log('Generated public/.htaccess, public/_redirects, and dist copies');
