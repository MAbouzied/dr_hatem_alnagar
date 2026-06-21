import { MarkdownContent } from '../components/MarkdownContent';
import { privacyPolicy, termsAndConditions } from '../content/legal';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { PageHero } from '../components/ui/PageHero';

export function PrivacyPage() {
  return (
    <>
      <PageHero title={privacyPolicy.titleAr} compact />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: privacyPolicy.titleAr }]} />
        <MarkdownContent markdown={privacyPolicy.bodyMarkdown} className="mt-8" />
      </div>
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <PageHero title={termsAndConditions.titleAr} compact />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: termsAndConditions.titleAr }]} />
        <MarkdownContent markdown={termsAndConditions.bodyMarkdown} className="mt-8" />
      </div>
    </>
  );
}
