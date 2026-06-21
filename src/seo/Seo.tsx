import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { sharedSiteMeta } from './meta';
import { getSeoForPath } from './routes';

/** Head tags are injected at build time via scripts/prerender.ts (React 19 + helmet SSR gap). */
function SeoHead() {
  const { pathname } = useLocation();
  const { meta, jsonLd } = getSeoForPath(pathname);
  const canonical =
    meta.path === '/404' ? undefined : `https://hatem-alnajar.com${meta.path === '/' ? '' : meta.path}`;

  return (
    <Helmet htmlAttributes={{ lang: 'ar', dir: 'rtl' }}>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="robots" content={meta.robots} />

      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content={meta.ogType} />
      <meta property="og:site_name" content={sharedSiteMeta.siteName} />
      <meta property="og:locale" content={sharedSiteMeta.locale} />
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {meta.ogImage && <meta name="twitter:image" content={meta.ogImage} />}

      {meta.articlePublishedTime && (
        <meta property="article:published_time" content={meta.articlePublishedTime} />
      )}

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

export function Seo() {
  if (typeof document === 'undefined') return null;
  return <SeoHead />;
}
