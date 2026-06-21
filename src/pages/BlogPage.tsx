import { getArticlesSorted } from '../content/articles';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { ArticleCard } from '../components/ui/ArticleCard';
import { PageHero } from '../components/ui/PageHero';
import { Section } from '../components/ui/Section';

export function BlogPage() {
  const articles = getArticlesSorted();

  return (
    <>
      <PageHero
        title="المدونة الطبية"
        subtitle="مقالات توعوية من فريق عيادة الدكتور حاتم النجار"
        badge="معلومات موثوقة"
        compact
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: 'المدونة' }]} />
      </div>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Section>
    </>
  );
}
