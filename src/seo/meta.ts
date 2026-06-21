import { site } from '../content/site';

/** Canonical production domain — no trailing slash */
export const CANONICAL_ORIGIN = 'https://hatem-alnajar.com';

/** TODO(owner): Confirm hero.png before production — used as default OG image */
export const DEFAULT_OG_IMAGE = `${CANONICAL_ORIGIN}/images/hero.png`;

export const SITE_LOCALE = 'ar_EG';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  ogType: 'website' | 'article' | 'profile';
  robots: 'index,follow' | 'noindex,nofollow';
  ogImage?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
}

export function absoluteUrl(path: string): string {
  if (path === '/') return `${CANONICAL_ORIGIN}/`;
  return `${CANONICAL_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildMeta(input: Omit<PageMeta, 'path'> & { path: string }): PageMeta {
  return {
    ogImage: DEFAULT_OG_IMAGE,
    ...input,
  };
}

export const sharedSiteMeta = {
  siteName: site.siteNameAr,
  locale: SITE_LOCALE,
  domain: CANONICAL_ORIGIN,
};
