import { getArticlesSorted, getArticleBySlug } from '../content/articles';
import { faqs } from '../content/faqs';
import { pages } from '../content/pages';
import { services, getServiceBySlug } from '../content/services';
import { site } from '../content/site';
import type { ArticleContent } from '../content/types';
import type { ServiceContent } from '../content/types';
import { absoluteUrl, buildMeta, type PageMeta } from './meta';
import {
  breadcrumbList,
  clinicEntity,
  doctorEntity,
  graph,
  organizationEntity,
  serviceEntity,
  webPageEntity,
  websiteEntity,
} from './schema';

export interface RouteSeo {
  meta: PageMeta;
  jsonLd: Record<string, unknown>;
}

function homeSchema(): Record<string, unknown> {
  return graph(
    organizationEntity(),
    clinicEntity(),
    doctorEntity(),
    websiteEntity(),
    webPageEntity(pages.home.title, '/', pages.home.description),
  );
}

function aboutSchema(): Record<string, unknown> {
  return graph(
    doctorEntity(),
    clinicEntity(),
    {
      '@type': 'AboutPage',
      '@id': `${absoluteUrl('/about')}#aboutpage`,
      name: pages.about.titleAr,
      description: pages.about.description,
      url: absoluteUrl('/about'),
      mainEntity: { '@id': `${absoluteUrl('/')}#doctor` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${absoluteUrl('/about')}#profile`,
      name: pages.about.titleAr,
      url: absoluteUrl('/about'),
      mainEntity: { '@id': `${absoluteUrl('/')}#doctor` },
    },
    breadcrumbList([
      { name: 'الرئيسية', path: '/' },
      { name: pages.about.titleAr, path: '/about' },
    ]),
  );
}

function servicesIndexSchema(): Record<string, unknown> {
  return graph(
    clinicEntity(),
    {
      '@type': 'CollectionPage',
      '@id': `${absoluteUrl('/services')}#collection`,
      name: pages.servicesHub.titleAr,
      description: pages.servicesHub.description,
      url: absoluteUrl('/services'),
    },
    {
      '@type': 'ItemList',
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.titleAr,
        url: absoluteUrl(`/services/${service.slug}`),
      })),
    },
    breadcrumbList([
      { name: 'الرئيسية', path: '/' },
      { name: pages.servicesHub.titleAr, path: '/services' },
    ]),
  );
}

function serviceDetailSchema(service: ServiceContent): Record<string, unknown> {
  return graph(
    clinicEntity(),
    doctorEntity(),
    serviceEntity(service.slug, service.titleAr, service.description, service.titleAr),
    webPageEntity(service.title, `/services/${service.slug}`, service.description),
    breadcrumbList([
      { name: 'الرئيسية', path: '/' },
      { name: pages.servicesHub.titleAr, path: '/services' },
      { name: service.titleAr, path: `/services/${service.slug}` },
    ]),
  );
}

function contactSchema(): Record<string, unknown> {
  return graph(
    clinicEntity(),
    {
      '@type': 'ContactPage',
      '@id': `${absoluteUrl('/contact')}#contact`,
      name: pages.contact.titleAr,
      description: pages.contact.description,
      url: absoluteUrl('/contact'),
    },
    breadcrumbList([
      { name: 'الرئيسية', path: '/' },
      { name: pages.contact.titleAr, path: '/contact' },
    ]),
  );
}

function faqSchema(): Record<string, unknown> {
  const mainEntity = faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.questionAr,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answerAr,
    },
  }));

  return graph(
    {
      '@type': 'FAQPage',
      '@id': `${absoluteUrl('/faq')}#faq`,
      name: pages.faq.titleAr,
      description: pages.faq.description,
      url: absoluteUrl('/faq'),
      mainEntity,
    },
    webPageEntity(pages.faq.title, '/faq', pages.faq.description),
    breadcrumbList([
      { name: 'الرئيسية', path: '/' },
      { name: pages.faq.titleAr, path: '/faq' },
    ]),
  );
}

function blogIndexSchema(): Record<string, unknown> {
  const articles = getArticlesSorted();
  return graph(
    {
      '@type': 'Blog',
      '@id': `${absoluteUrl('/blog')}#blog`,
      name: 'المدونة الطبية',
      description: 'مقالات طبية من عيادة الدكتور حاتم النجار',
      url: absoluteUrl('/blog'),
      publisher: { '@id': `${absoluteUrl('/')}#organization` },
      blogPost: articles.map((a) => ({
        '@type': 'BlogPosting',
        headline: a.titleAr,
        url: absoluteUrl(`/blog/${a.slug}`),
        datePublished: a.datePublished,
      })),
    },
    {
      '@type': 'CollectionPage',
      '@id': `${absoluteUrl('/blog')}#collection`,
      name: 'المدونة الطبية',
      url: absoluteUrl('/blog'),
    },
    breadcrumbList([
      { name: 'الرئيسية', path: '/' },
      { name: 'المدونة', path: '/blog' },
    ]),
  );
}

function articleSchema(article: ArticleContent): Record<string, unknown> {
  return graph(
    {
      '@type': 'BlogPosting',
      '@id': `${absoluteUrl(`/blog/${article.slug}`)}#article`,
      headline: article.titleAr,
      description: article.description,
      datePublished: article.datePublished,
      author: {
        '@type': 'Person',
        name: site.doctorNameAr,
      },
      publisher: {
        '@type': 'Organization',
        name: site.siteNameAr,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/images/logo-full.png'),
        },
      },
      image: absoluteUrl('/images/hero.png'),
      url: absoluteUrl(`/blog/${article.slug}`),
      inLanguage: 'ar-EG',
      mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
    },
    {
      '@type': 'MedicalWebPage',
      '@id': `${absoluteUrl(`/blog/${article.slug}`)}#medicalpage`,
      name: article.titleAr,
      description: article.description,
      url: absoluteUrl(`/blog/${article.slug}`),
      lastReviewed: article.datePublished,
    },
    breadcrumbList([
      { name: 'الرئيسية', path: '/' },
      { name: 'المدونة', path: '/blog' },
      { name: article.titleAr, path: `/blog/${article.slug}` },
    ]),
  );
}

function notFoundSeo(): RouteSeo {
  return {
    meta: buildMeta({
      path: '/404',
      title: 'الصفحة غير موجودة | عيادة الدكتور حاتم النجار',
      description: 'الصفحة المطلوبة غير متوفرة.',
      ogType: 'website',
      robots: 'noindex,nofollow',
    }),
    jsonLd: graph(webPageEntity('الصفحة غير موجودة', '/404', 'الصفحة غير موجودة')),
  };
}

export function getSeoForPath(pathname: string): RouteSeo {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (path === '/') {
    return {
      meta: buildMeta({
        path: '/',
        title: pages.home.title,
        description: pages.home.description,
        ogType: 'website',
        robots: 'index,follow',
      }),
      jsonLd: homeSchema(),
    };
  }

  if (path === '/about') {
    return {
      meta: buildMeta({
        path,
        title: pages.about.title,
        description: pages.about.description,
        ogType: 'profile',
        robots: 'index,follow',
      }),
      jsonLd: aboutSchema(),
    };
  }

  if (path === '/services') {
    return {
      meta: buildMeta({
        path,
        title: pages.servicesHub.title,
        description: pages.servicesHub.description,
        ogType: 'website',
        robots: 'index,follow',
      }),
      jsonLd: servicesIndexSchema(),
    };
  }

  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const service = getServiceBySlug(serviceMatch[1]);
    if (service) {
      return {
        meta: buildMeta({
          path,
          title: service.title,
          description: service.description,
          ogType: 'website',
          robots: 'index,follow',
        }),
        jsonLd: serviceDetailSchema(service),
      };
    }
  }

  if (path === '/contact') {
    return {
      meta: buildMeta({
        path,
        title: pages.contact.title,
        description: pages.contact.description,
        ogType: 'website',
        robots: 'index,follow',
      }),
      jsonLd: contactSchema(),
    };
  }

  if (path === '/faq') {
    return {
      meta: buildMeta({
        path,
        title: pages.faq.title,
        description: pages.faq.description,
        ogType: 'website',
        robots: 'index,follow',
      }),
      jsonLd: faqSchema(),
    };
  }

  if (path === '/blog') {
    return {
      meta: buildMeta({
        path,
        title: 'المدونة الطبية | عيادة الدكتور حاتم النجار',
        description: 'مقالات طبية موثوقة عن الجراحة، المناظير، السمنة، وصحة الجهاز الهضمي.',
        ogType: 'website',
        robots: 'index,follow',
      }),
      jsonLd: blogIndexSchema(),
    };
  }

  const articleMatch = path.match(/^\/blog\/([^/]+)$/);
  if (articleMatch) {
    const article = getArticleBySlug(articleMatch[1]);
    if (article) {
      return {
        meta: buildMeta({
          path,
          title: article.title,
          description: article.description,
          ogType: 'article',
          robots: 'index,follow',
          articlePublishedTime: article.datePublished,
        }),
        jsonLd: articleSchema(article),
      };
    }
  }

  return notFoundSeo();
}

/** All routes to prerender at build time */
export const PRERENDER_ROUTES = [
  '/',
  '/about',
  '/services',
  ...services.map((s) => `/services/${s.slug}`),
  '/contact',
  '/faq',
  '/blog',
  ...getArticlesSorted().map((a) => `/blog/${a.slug}`),
] as const;

/** Routes included in sitemap.xml */
export const SITEMAP_ROUTES: Array<{
  path: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}> = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  ...services.map((s) => ({
    path: `/services/${s.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  ...getArticlesSorted().map((a) => ({
    path: `/blog/${a.slug}`,
    priority: '0.6',
    changefreq: 'yearly',
    lastmod: a.datePublished,
  })),
];
