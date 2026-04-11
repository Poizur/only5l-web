// Pure server component — uses <details>/<summary> instead of useState
// No "use client" needed, works perfectly with next-mdx-remote v6 RSC

import { ui } from "@/lib/site";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-surface-900 mb-6">{ui.faq}</h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-xl border border-surface-200 bg-surface-0 open:border-brand-200 open:bg-brand-50"
          >
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 gap-4 list-none [&::-webkit-details-marker]:hidden">
              <span className="font-semibold text-surface-900 text-sm sm:text-base">
                {item.question}
              </span>
              <svg
                className="w-5 h-5 shrink-0 text-brand-500 transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5">
              <p className="text-surface-700 text-sm leading-relaxed">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
