import { useId, useState } from 'react';
import type { FaqItem } from '../../content/types';

interface FAQAccordionProps {
  items: FaqItem[];
  defaultOpenId?: string;
}

export function FAQAccordion({ items, defaultOpenId }: FAQAccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {items.map((faq) => {
        const isOpen = openId === faq.id;
        const panelId = `${baseId}-${faq.id}-panel`;
        const buttonId = `${baseId}-${faq.id}-button`;

        return (
          <div
            key={faq.id}
            className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right font-medium text-navy-900 transition-colors hover:bg-slate-50"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(faq.id)}
              >
                <span className="flex-1">{faq.questionAr}</span>
                <span
                  aria-hidden
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-teal-700 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  ▾
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="border-t border-slate-100 px-5 pb-5 pt-3"
            >
              <p className="leading-8 text-slate-600">{faq.answerAr}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface FAQByCategoryProps {
  categories: string[];
  items: FaqItem[];
}

export function FAQByCategory({ categories, items }: FAQByCategoryProps) {
  return (
    <div className="space-y-10">
      {categories.map((category) => {
        const categoryItems = items.filter((f) => f.category === category);
        if (categoryItems.length === 0) return null;
        return (
          <section key={category} aria-labelledby={`faq-cat-${category}`}>
            <h2 id={`faq-cat-${category}`} className="mb-5 text-xl font-bold text-navy-900">
              {category}
            </h2>
            <FAQAccordion items={categoryItems} />
          </section>
        );
      })}
    </div>
  );
}
