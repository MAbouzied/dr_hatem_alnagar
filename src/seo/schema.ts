import { site } from '../content/site';
import { CANONICAL_ORIGIN } from './meta';

/** TODO(owner): Confirm clinic opening hours before production schema goes live */
export const OPENING_HOURS_SPEC = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday', 'Monday', 'Wednesday'],
    opens: '08:00',
    closes: '22:00',
  },
] as const;

export function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: '١ شارع إبراهيم باشا، الحي المنتزه',
    addressLocality: 'مصر الجديدة',
    addressRegion: 'القاهرة',
    addressCountry: 'EG',
  };
}

export function physicianEntity() {
  return {
    '@type': 'Physician',
    '@id': `${CANONICAL_ORIGIN}/#physician`,
    name: site.doctorNameAr,
    alternateName: site.doctorName,
    medicalSpecialty: [
      'General Surgery',
      'Laparoscopic Surgery',
      'Oncologic Surgery',
      'Endocrine Surgery',
    ],
    telephone: site.phoneE164,
    email: site.email,
    url: `${CANONICAL_ORIGIN}/about`,
    image: `${CANONICAL_ORIGIN}/images/hero.png`,
    worksFor: { '@id': `${CANONICAL_ORIGIN}/#clinic` },
  };
}

export function clinicEntity() {
  return {
    '@type': 'MedicalClinic',
    '@id': `${CANONICAL_ORIGIN}/#clinic`,
    name: site.siteNameAr,
    alternateName: site.siteName,
    url: CANONICAL_ORIGIN,
    telephone: site.phoneE164,
    email: site.email,
    image: `${CANONICAL_ORIGIN}/images/logo-full.png`,
    logo: `${CANONICAL_ORIGIN}/images/logo-full.png`,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.0889,
      longitude: 31.326,
    },
    hasMap: site.mapsUrl,
    openingHoursSpecification: OPENING_HOURS_SPEC,
    areaServed: {
      '@type': 'Country',
      name: 'Egypt',
    },
    medicalSpecialty: [
      'General Surgery',
      'Laparoscopic Surgery',
      'Bariatric Surgery',
      'Colorectal Surgery',
      'Oncologic Surgery',
      'Endocrine Surgery',
    ],
    physician: { '@id': `${CANONICAL_ORIGIN}/#physician` },
  };
}

export function organizationEntity() {
  return {
    '@type': 'Organization',
    '@id': `${CANONICAL_ORIGIN}/#organization`,
    name: site.siteNameAr,
    url: CANONICAL_ORIGIN,
    logo: `${CANONICAL_ORIGIN}/images/logo-full.png`,
    email: site.email,
    telephone: site.phoneE164,
  };
}

export function websiteEntity() {
  return {
    '@type': 'WebSite',
    '@id': `${CANONICAL_ORIGIN}/#website`,
    name: site.siteNameAr,
    url: CANONICAL_ORIGIN,
    inLanguage: 'ar-EG',
    publisher: { '@id': `${CANONICAL_ORIGIN}/#organization` },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbList(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${CANONICAL_ORIGIN}${item.path === '/' ? '/' : item.path}`,
    })),
  };
}

export function webPageEntity(name: string, path: string, description: string) {
  return {
    '@type': 'WebPage',
    '@id': `${CANONICAL_ORIGIN}${path}#webpage`,
    name,
    description,
    url: `${CANONICAL_ORIGIN}${path === '/' ? '/' : path}`,
    isPartOf: { '@id': `${CANONICAL_ORIGIN}/#website` },
    inLanguage: 'ar-EG',
  };
}

export function graph(...nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
