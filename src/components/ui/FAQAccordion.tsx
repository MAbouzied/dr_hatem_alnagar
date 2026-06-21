import { useId, useState, type ReactNode } from 'react';
import type { FaqItem } from '../../content/types';

const phonePattern = /(\+?\d[\d\s\-]{8,})/g;

function isPhoneSegment(part: string): boolean {
  return part.replace(/\D/g, '').length >= 10;
}

function formatTextWithLtrPhones(text: string): ReactNode[] {
  return text.split(phonePattern).map((part, index) => {
    if (!part) return null;

    if (isPhoneSegment(part)) {
      return (
        <span
          key={index}
          dir="ltr"
          className="inline-block whitespace-nowrap font-sans [unicode-bidi:isolate]"
        >
          {part}
        </span>
      );
    }

    return part;
  });
}

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
    <div className="space-y-4">
      {items.map((faq) => {
        const isOpen = openId === faq.id;
        const panelId = `${baseId}-${faq.id}-panel`;
        const buttonId = `${baseId}-${faq.id}-button`;

        return (
          <div
            key={faq.id}
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen
                ? 'border-teal-500/30 bg-white shadow-md shadow-teal-500/5'
                : 'border-slate-200/80 bg-white shadow-sm hover:border-slate-300 hover:shadow-md'
            }`}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-right font-medium transition-colors duration-200 ${
                  isOpen ? 'text-teal-700 bg-teal-500/5' : 'text-navy-900 hover:bg-slate-50'
                }`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(faq.id)}
              >
                <span className="flex-1 text-base font-bold">{faq.questionAr}</span>
                <span
                  aria-hidden
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen ? 'bg-teal-600 text-white rotate-180' : 'bg-teal-500/10 text-teal-700'
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
              className="border-t border-slate-100/80 px-6 pb-6 pt-4"
            >
              <p className="leading-8 text-slate-600 text-sm md:text-base">
                {formatTextWithLtrPhones(faq.answerAr)}
              </p>
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
    <div className="space-y-12">
      {categories.map((category) => {
        const categoryItems = items.filter((f) => f.category === category);
        if (categoryItems.length === 0) return null;
        return (
          <section key={category} aria-labelledby={`faq-cat-${category}`}>
            <h2 id={`faq-cat-${category}`} className="mb-6 border-r-4 border-teal-500 pr-3 text-xl font-bold text-navy-900">
              {category}
            </h2>
            <FAQAccordion items={categoryItems} />
          </section>
        );
      })}
    </div>
  );
}
