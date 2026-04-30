"use client";

import type { SocialProofItem } from "@/src/types/sales-page";

interface PreviewSocialProofSectionProps {
  socialProof: SocialProofItem[];
}

export function PreviewSocialProofSection({
  socialProof,
}: PreviewSocialProofSectionProps) {
  return (
    <section className="border-b border-slate-200 bg-white py-14">
      <div className="space-y-10">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-[3.1rem] sm:leading-[1.02]">
            Bukti sosial yang menjaga momentum.
          </h2>
        </div>

        <div className="-mx-2 overflow-x-auto px-2 pb-2">
          <div className="flex min-w-max gap-3">
          {socialProof.map((proof) => (
            <blockquote
              key={`${proof.name}-${proof.review}`}
              className="landing-card landing-card-hover min-h-[13.5rem] w-[16.5rem] shrink-0 rounded-[1.7rem] px-5 py-5"
            >
              <div className="flex h-full flex-col justify-between">
              <p
                className="overflow-hidden text-sm leading-7 text-slate-700 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]"
              >
                &ldquo;{proof.review}&rdquo;
              </p>
              <footer className="mt-4 text-xs font-semibold text-slate-950">
                {proof.name}
              </footer>
              </div>
            </blockquote>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
