export type SchemaHint =
  | 'MedicalClinic'
  | 'Physician'
  | 'WebSite'
  | 'WebPage'
  | 'FAQPage'
  | 'ContactPage'
  | 'Service'
  | 'MedicalProcedure'
  | 'BlogPosting'
  | 'AboutPage';

export interface SeoFields {
  title: string;
  description: string;
}

export interface SiteImage {
  filename: string;
  path: string;
  sourcePath: string;
  purpose: string;
  altAr: string;
  needsApproval: boolean;
}

export interface ClinicHours {
  /** Temporary until owner confirms — FAQ vs contact page conflict */
  temporaryNote: string;
  daysAr: string;
  hoursAr: string;
}

export interface SiteConfig {
  siteName: string;
  siteNameAr: string;
  doctorName: string;
  doctorNameAr: string;
  domain: string;
  phoneDisplay: string;
  phoneE164: string;
  whatsappNumber: string;
  whatsappPrefill: string;
  email: string;
  addressAr: string;
  mapsUrl: string;
  taglineAr: string;
  locale: 'ar-EG';
  direction: 'rtl';
  clinicHours: ClinicHours;
  images: SiteImage[];
}

export interface PageSection {
  heading?: string;
  body?: string;
  items?: string[];
}

export interface PageContent extends SeoFields {
  slug: string;
  titleAr: string;
  introAr: string;
  sections: PageSection[];
}

export interface ServiceContent extends SeoFields {
  id: string;
  slug: string;
  oldWordPressSlug: string;
  titleAr: string;
  shortDescriptionAr: string;
  fullDescriptionAr: string;
  whenToConsultAr: string[];
  benefitsAr: string[];
  ctaTextAr: string;
  schemaHint: SchemaHint;
  relatedArticleIds: string[];
  iconPath: string;
}

export interface FaqItem {
  id: string;
  category: string;
  questionAr: string;
  answerAr: string;
}

export interface ArticleContent extends SeoFields {
  id: string;
  slug: string;
  oldUrl: string;
  wordpressId: string;
  titleAr: string;
  excerptAr: string;
  bodyMarkdown: string;
  datePublished: string;
  readingTimeMinutes: number;
  relatedServiceId: string;
}

export interface LegalDocument extends SeoFields {
  slug: string;
  titleAr: string;
  effectiveDate?: string;
  lastUpdated?: string;
  bodyMarkdown: string;
  editsNote?: string;
}

export interface Redirect301 {
  from: string;
  to: string;
  reason: string;
}

export interface GonePattern {
  pattern: string;
  description: string;
}

export interface RedirectsConfig {
  permanent: Redirect301[];
  gonePatterns: GonePattern[];
  exactGonePaths: string[];
}
