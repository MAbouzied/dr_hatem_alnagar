import { site } from '../content/site';
import { CANONICAL_ORIGIN } from './meta';

/** Valid Schema.org MedicalSpecialty enumeration URLs for structured data only. */
export const SCHEMA_MEDICAL_SPECIALTIES = {
  generalSurgery: 'https://schema.org/Surgical',
  laparoscopicSurgery: 'https://schema.org/Surgical',
  bariatricSurgery: 'https://schema.org/Surgical',
  colorectalSurgery: 'https://schema.org/Gastroenterologic',
  oncologySurgery: 'https://schema.org/Oncologic',
  endocrineSurgery: 'https://schema.org/Endocrine',
} as const;

/** Clinic-level specialties — valid Schema.org enum URLs only. */
export const CLINIC_MEDICAL_SPECIALTIES = [
  SCHEMA_MEDICAL_SPECIALTIES.generalSurgery,
  SCHEMA_MEDICAL_SPECIALTIES.colorectalSurgery,
  SCHEMA_MEDICAL_SPECIALTIES.oncologySurgery,
  SCHEMA_MEDICAL_SPECIALTIES.endocrineSurgery,
] as const;

const SERVICE_SLUG_SPECIALTY: Record<string, string> = {
  'general-surgery': SCHEMA_MEDICAL_SPECIALTIES.generalSurgery,
  'laparoscopic-surgery': SCHEMA_MEDICAL_SPECIALTIES.laparoscopicSurgery,
  'bariatric-surgery': SCHEMA_MEDICAL_SPECIALTIES.bariatricSurgery,
  'colorectal-surgery': SCHEMA_MEDICAL_SPECIALTIES.colorectalSurgery,
  'oncology-surgery': SCHEMA_MEDICAL_SPECIALTIES.oncologySurgery,
  'endocrine-surgery': SCHEMA_MEDICAL_SPECIALTIES.endocrineSurgery,
};

export function getServiceSchemaSpecialty(slug: string): string {
  return SERVICE_SLUG_SPECIALTY[slug] ?? SCHEMA_MEDICAL_SPECIALTIES.generalSurgery;
}

/** TODO(owner): Confirm clinic opening hours before production schema goes live */
export const OPENING_HOURS_SPEC = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'https://schema.org/Saturday',
      'https://schema.org/Monday',
      'https://schema.org/Wednesday',
    ],
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

export function doctorEntity() {
  return {
    '@type': 'Person',
    '@id': `${CANONICAL_ORIGIN}/#doctor`,
    name: site.doctorNameAr,
    alternateName: site.doctorName,
    jobTitle: 'استشاري الجراحة العامة والمناظير والأورام والغدد',
    telephone: site.phoneE164,
    email: site.email,
    url: `${CANONICAL_ORIGIN}/about`,
    image: `${CANONICAL_ORIGIN}/images/hero.png`,
    worksFor: { '@id': `${CANONICAL_ORIGIN}/#clinic` },
    knowsAbout: [
      'الجراحة العامة',
      'جراحة المناظير',
      'جراحات السمنة',
      'جراحة الأورام',
      'جراحة الغدد الصماء',
      'جراحة الشرج والمستقيم',
    ],
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
    medicalSpecialty: [...CLINIC_MEDICAL_SPECIALTIES],
    employee: { '@id': `${CANONICAL_ORIGIN}/#doctor` },
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

export function serviceEntity(
  slug: string,
  name: string,
  description: string,
  serviceType: string,
) {
  const path = `/services/${slug}`;
  return {
    '@type': 'Service',
    '@id': `${CANONICAL_ORIGIN}${path}#service`,
    name,
    description,
    url: `${CANONICAL_ORIGIN}${path}`,
    provider: { '@id': `${CANONICAL_ORIGIN}/#clinic` },
    areaServed: {
      '@type': 'Country',
      name: 'Egypt',
    },
    serviceType,
    relevantSpecialty: getServiceSchemaSpecialty(slug),
  };
}

export function graph(...nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
