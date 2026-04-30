"use client";

import { Icon } from "@iconify/react";

interface FaqItem {
  question: string;
  answer: string;
}

interface PreviewFaqSectionProps {
  items: FaqItem[];
  openIndex: number;
  onToggle: (index: number) => void;
}

export function PreviewFaqSection({
  items,
  openIndex,
  onToggle,
}: PreviewFaqSectionProps) {
  return (
    <section className="border-t border-slate-200 py-14">
      <div className="space-y-10">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-[3.1rem] sm:leading-[1.02]">
            FAQ yang paling sering ditanyakan.
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">
            Bagian ini membantu menjawab pertanyaan umum sebelum calon pembeli
            masuk ke CTA terakhir.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4">
          {items.map((item, index) => (
            <article
              key={item.question}
              className="landing-card landing-card-hover landing-card-interactive overflow-hidden rounded-[1.9rem]"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left"
                onClick={() => onToggle(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-semibold tracking-[-0.04em] text-slate-950">
                  {item.question}
                </span>
                <span
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition ${
                    openIndex === index
                      ? "rotate-180 border-slate-300 bg-white text-slate-950"
                      : ""
                  }`}
                >
                  <Icon icon="solar:alt-arrow-down-linear" className="h-4 w-4" />
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className="landing-faq-answer"
                data-open={openIndex === index}
              >
                <div className="landing-faq-answer-inner px-6 pb-6">
                  <p className="border-t border-slate-200 pt-4 text-sm leading-8 text-slate-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
