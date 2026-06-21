import type { ArticleContent } from '../types';
import { laserHemorrhoidsArticle } from './laser-hemorrhoids';
import {
  bariatricSurgeryArticle,
  colonCancerArticle,
  laparoscopicAdvancesArticle,
  thyroidSurgeryArticle,
} from './laparoscopic-and-more';

export const articles: ArticleContent[] = [
  laserHemorrhoidsArticle,
  laparoscopicAdvancesArticle,
  bariatricSurgeryArticle,
  colonCancerArticle,
  thyroidSurgeryArticle,
] as ArticleContent[];

export function getArticleBySlug(slug: string): ArticleContent | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesSorted(): ArticleContent[] {
  return [...articles].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}
