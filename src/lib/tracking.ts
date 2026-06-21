import { site, telUrl, whatsappUrl } from '../content/site';

/** GTM container from WordPress Google Site Kit (`googlesitekit_tagmanager_settings`). */
export const gtmContainerId = 'GTM-TZZVFSKC';

export const TRACKING_EVENTS = {
  WHATSAPP_CLICK: 'whatsapp_click',
  PHONE_CALL_CLICK: 'phone_call_click',
} as const;

export type ClickLocation =
  | 'global_header'
  | 'mobile_drawer'
  | 'mobile_sticky_cta'
  | 'homepage_hero'
  | 'homepage_contact_cta'
  | 'homepage_bottom_cta'
  | 'service_detail_sidebar'
  | 'service_detail_bottom_cta'
  | 'services_bottom_cta'
  | 'contact_card'
  | 'contact_bottom_cta'
  | 'about_bottom_cta'
  | 'faq_bottom_cta'
  | 'blog_bottom_cta'
  | 'blog_related_service'
  | 'blog_article_sidebar'
  | 'footer'
  | 'page_cta';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushDataLayer(payload: Record<string, unknown>): void {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch {
    // Tracking must never block navigation.
  }
}

export function trackWhatsAppClick(clickLocation: ClickLocation, linkUrl: string = whatsappUrl): void {
  pushDataLayer({
    event: TRACKING_EVENTS.WHATSAPP_CLICK,
    click_location: clickLocation,
    page_path: window.location.pathname,
    link_url: linkUrl,
    phone_number: site.whatsappNumber,
  });
}

export function trackPhoneCallClick(clickLocation: ClickLocation, linkUrl: string = telUrl): void {
  pushDataLayer({
    event: TRACKING_EVENTS.PHONE_CALL_CLICK,
    click_location: clickLocation,
    page_path: window.location.pathname,
    link_url: linkUrl,
    phone_number: site.phoneE164,
  });
}

export function isWhatsAppHref(href: string): boolean {
  return href.includes('wa.me') || href.includes('whatsapp');
}

export function isPhoneHref(href: string): boolean {
  return href.startsWith('tel:');
}
