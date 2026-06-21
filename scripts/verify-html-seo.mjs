import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

const files = [
  'index.html',
  'about/index.html',
  'services/index.html',
  'services/general-surgery/index.html',
  'blog/laser-hemorrhoids/index.html',
  'contact/index.html',
  'faq/index.html',
];

const spamPattern = /casino|betting|escort|vavada|ringospin|wp-admin|wp-content|wp-includes|\.php|wordpress|woocommerce/i;

let allPass = true;

for (const rel of files) {
  const filePath = path.join(distDir, rel);
  const html = fs.readFileSync(filePath, 'utf-8');
  const head = html.split('</head>')[0] ?? html;
  const body = html.split('<div id="root">')[1]?.split('</div>')[0] ?? '';

  const titleCount = (head.match(/<title>/gi) ?? []).length;
  const hasDescription = /<meta name="description"/i.test(head);
  const canonical = head.match(/rel="canonical"\s+href="([^"]+)"/i)?.[1];
  const hasOg = /property="og:title"/i.test(head);
  const hasTwitter = /name="twitter:card"/i.test(head);
  const hasJsonLd = /application\/ld\+json/i.test(head);
  const hasArabic = /[\u0600-\u06FF]{10,}/.test(body);
  const spamInHeadBody = spamPattern.test(head + body);

  const checks = {
    titleCount: titleCount === 1,
    hasDescription,
    canonicalOk: canonical?.startsWith('https://hatem-alnajar.com') ?? false,
    hasOg,
    hasTwitter,
    hasJsonLd,
    hasArabic,
    noSpam: !spamInHeadBody,
  };

  const pass = Object.values(checks).every(Boolean);
  if (!pass) allPass = false;

  console.log(`\n${rel}:`);
  console.log(`  title count: ${titleCount} ${checks.titleCount ? '✓' : '✗'}`);
  console.log(`  meta description: ${checks.hasDescription ? '✓' : '✗'}`);
  console.log(`  canonical: ${canonical ?? 'MISSING'} ${checks.canonicalOk ? '✓' : '✗'}`);
  console.log(`  OG tags: ${checks.hasOg ? '✓' : '✗'}`);
  console.log(`  Twitter card: ${checks.hasTwitter ? '✓' : '✗'}`);
  console.log(`  JSON-LD: ${checks.hasJsonLd ? '✓' : '✗'}`);
  console.log(`  Arabic body: ${checks.hasArabic ? '✓' : '✗'}`);
  console.log(`  no spam/WP refs: ${checks.noSpam ? '✓' : '✗'}`);
}

process.exit(allPass ? 0 : 1);
