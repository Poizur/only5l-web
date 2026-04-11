"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ui } from "@/lib/site";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-surface-900 mb-6">{ui.faq}</h2>
      <div className="space-y-2">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={cn(
                "rounded-xl border transition-colors",
                isOpen ? "border-brand-200 bg-brand-50" : "border-surface-200 bg-surface-0"
              )}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex items-center justify-between w-full text-left px-5 py-4 gap-4"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-surface-900 text-sm sm:text-base">
                  {item.question}
                </span>
                <svg
                  className={cn("w-5 h-5 shrink-0 text-brand-500 transition-transform", isOpen && "rotate-180")}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                <div className="px-5 pb-5">
                  <p className="text-surface-700 text-sm leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
