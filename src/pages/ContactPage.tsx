import { pages } from '../content/pages';
import { site, telUrl, whatsappUrl } from '../content/site';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { ContactCard, ContactIcons } from '../components/ui/ContactCard';
import { CtaBlock } from '../components/ui/CtaBlock';
import { PageHero } from '../components/ui/PageHero';
import { Section } from '../components/ui/Section';

export function ContactPage() {
  const page = pages.contact;

  return (
    <>
      <PageHero title={page.titleAr} subtitle={page.introAr} badge="تواصل معنا" />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: page.titleAr }]} />
      </div>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCard
            icon={<ContactIcons.PhoneIcon />}
            title="الهاتف"
            action={
              <Button href={telUrl} variant="primary" size="sm" className="w-full">
                {site.phoneDisplay}
              </Button>
            }
          >
            <p>اتصل مباشرة لحجز موعد أو للاستفسارات.</p>
          </ContactCard>

          <ContactCard
            icon={<ContactIcons.WhatsAppIcon />}
            title="واتساب"
            action={
              <Button href={whatsappUrl} external variant="whatsapp" size="sm" className="w-full">
                مراسلة العيادة
              </Button>
            }
          >
            <p>راسلنا على واتساب للحصول على استشارة أولية.</p>
          </ContactCard>

          <ContactCard
            icon={<ContactIcons.EmailIcon />}
            title="البريد الإلكتروني"
            action={
              <Button href={`mailto:${site.email}`} variant="secondary" size="sm" className="w-full">
                {site.email}
              </Button>
            }
          >
            <p>للمراسلات الرسمية والاستفسارات غير العاجلة.</p>
          </ContactCard>

          <ContactCard
            icon={<ContactIcons.MapIcon />}
            title="العنوان"
            action={
              <Button href={site.mapsUrl} external variant="secondary" size="sm" className="w-full">
                فتح على Google Maps
              </Button>
            }
          >
            <p>{site.addressAr}</p>
          </ContactCard>

          <ContactCard
            icon={<ContactIcons.ClockIcon />}
            title="مواعيد العيادة"
          >
            <p className="font-medium text-navy-900">{site.clinicHours.daysAr}</p>
            <p className="mt-1">{site.clinicHours.hoursAr}</p>
          </ContactCard>
        </div>
      </Section>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <CtaBlock title="احجز موعدك الآن" subtitle="فريقنا جاهز لمساعدتك في تحديد موعد يناسب جدولك" />
      </div>
    </>
  );
}
