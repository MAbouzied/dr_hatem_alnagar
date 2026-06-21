import type { SiteConfig } from './types';

export const site: SiteConfig = {
  siteName: 'Dr. Hatem Elnajar Clinic',
  siteNameAr: 'عيادة الدكتور حاتم النجار',
  doctorName: 'Prof. Dr. Hatem Elnajar',
  doctorNameAr: 'أ.د. حاتم النجار',
  domain: 'https://hatem-alnajar.com',
  phoneDisplay: '+20 11 3018 1737',
  phoneE164: '+201130181737',
  whatsappNumber: '201130181737',
  whatsappPrefill: 'مرحباً ،،، هل يمكنني الحصول على استشارة؟',
  email: 'info@hatem-alnajar.com',
  addressAr:
    '١ شارع إبراهيم باشا، الحي المنتزه، مصر الجديدة، القاهرة، مصر',
  mapsUrl: 'https://maps.app.goo.gl/qNinJ6twh9bF7efk6',
  taglineAr:
    'استشاري الجراحة العامة والمناظير والأورام والغدد — استشاري ورئيس قسم الجراحة العامة بالقوات المسلحة — خبرة تزيد عن ٢٥ عاماً',
  locale: 'ar-EG',
  direction: 'rtl',
  clinicHours: {
    // TODO(owner): Confirm clinic hours — FAQ says 8:00 AM–10:00 PM; contact page says 8:00 PM–10:00 PM on Sat/Mon/Wed.
    temporaryNote:
      'ساعات العمل مؤقتة حتى تأكيد العيادة — يوجد تعارض بين صفحة الأسئلة الشائعة وصفحة اتصل بنا في النسخة القديمة.',
    daysAr: 'السبت، الإثنين، والأربعاء',
    hoursAr: 'من ٨:٠٠ صباحاً حتى ١٠:٠٠ مساءً',
  },
  images: [
    {
      filename: 'logo-full.png',
      path: '/images/logo-full.png',
      sourcePath:
        'wp-content/uploads/2026/05/Logo-أ.د.-حاتم.png',
      purpose: 'شعار العيادة',
      altAr: 'شعار عيادة أ.د. حاتم النجار',
      needsApproval: false,
    },
    {
      filename: 'favicon.png',
      path: '/images/favicon.png',
      sourcePath: 'wp-content/uploads/2026/01/cropped-Fav-C.png',
      purpose: 'أيقونة الموقع',
      altAr: 'أيقونة عيادة الدكتور حاتم النجار',
      needsApproval: false,
    },
    {
      filename: 'hero.png',
      path: '/images/hero.png',
      sourcePath: 'wp-content/uploads/2026/05/CP.png',
      purpose: 'صورة رئيسية للصفحة الأولى',
      altAr: 'عيادة الدكتور حاتم النجار — استشاري الجراحة',
      needsApproval: true,
    },
    {
      filename: 'header-banner.png',
      path: '/images/header-banner.png',
      sourcePath: 'wp-content/uploads/2026/01/cropped-D1.png',
      purpose: 'بانر علوي (احتياطي)',
      altAr: 'عيادة الدكتور حاتم النجار',
      needsApproval: true,
    },
  ],
};

export const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappPrefill)}`;
export const telUrl = `tel:${site.phoneE164}`;
