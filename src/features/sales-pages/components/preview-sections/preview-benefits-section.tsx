"use client";

import { Icon } from "@iconify/react";

import type { BenefitItem } from "@/src/types/sales-page";

interface PreviewBenefitsSectionProps {
  benefits: BenefitItem[];
  accentTextClassName: string;
}

export function PreviewBenefitsSection({
  benefits,
  accentTextClassName,
}: PreviewBenefitsSectionProps) {
  return (
    <section id="benefits" className="border-b border-slate-200 py-14">
      <div className="space-y-10">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-[3.2rem] sm:leading-[1.02]">
            Solusi dan manfaat yang langsung terasa.
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">
            Setelah masalahnya jelas, bagian ini menunjukkan bagaimana
            penawaranmu membantu menyelesaikannya.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="landing-card landing-card-hover rounded-[2rem] px-6 py-7"
            >
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-950"
                >
                  <Icon icon="solar:star-bold-duotone" className="h-6 w-6" />
                </span>
              </div>
              <p className={`text-2xl font-semibold tracking-[-0.05em] ${accentTextClassName}`}>
                {benefit.title}
              </p>
              <p className="mt-4 text-sm leading-8 text-slate-600">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
