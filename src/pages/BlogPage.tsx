import { getArticlesSorted } from '../content/articles';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { ArticleCard } from '../components/ui/ArticleCard';
import { CtaBlock } from '../components/ui/CtaBlock';
import { PageHero } from '../components/ui/PageHero';
import { Section } from '../components/ui/Section';

export function BlogPage() {
  const articles = getArticlesSorted();

  return (
    <>
      <PageHero
        title="المدونة الطبية"
        subtitle="مقالات توعوية موثوقة عن الجراحة، المناظير، السمنة، وصحة الجهاز الهضمي — بأسلوب واضح يناسب زوار العيادة."
        badge="معلومات للتوعية"
        compact
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: 'المدونة' }]} />

        <div className="mt-6 max-w-3xl space-y-3 text-sm leading-8 text-slate-600 md:text-base">
          <p>
            نشرّفكم في هذه الصفحة بمقالات طبية مبسّطة تساعدكم على فهم الحالات الشائعة، خيارات
            العلاج، ومتى يكون التقييم عند الطبيب ضرورياً. المحتوى للتوعية فقط ولا يغني عن
            الاستشارة المباشرة.
          </p>
          <p className="text-slate-500">
            {articles.length} مقالات في تخصصات: جراحة الشرج والمستقيم، المناظير، السمنة، الأورام،
            والغدد.
          </p>
        </div>
      </div>

      <Section className="pt-0">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Section>

      <Section className="pt-4">
        <CtaBlock
          title="هل لديك سؤال طبي بعد قراءة المقال؟"
          subtitle="تواصل مع عيادة أ.د. حاتم النجار لحجز استشارة وتقييم حالتك بشكل شخصي."
          trackingLocation="blog_bottom_cta"
        />
      </Section>
    </>
  );
}
