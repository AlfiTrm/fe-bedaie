"use client";

import { Icon } from "@iconify/react";

interface PreviewCtaSectionProps {
  subheadline: string;
  guarantee: string;
  ctaText: string;
  accentBlockClassName: string;
}

const commercialMotifs = [
  {
    icon: "solar:buildings-3-bold-duotone",
    title: "Unit komersial",
    caption: "Tampil profesional",
  },
  {
    icon: "solar:map-point-wave-bold-duotone",
    title: "Lokasi kuat",
    caption: "Mudah dijangkau",
  },
  {
    icon: "solar:shield-check-bold-duotone",
    title: "Lebih aman",
    caption: "Jaminan lebih jelas",
  },
];

export function PreviewCtaSection({
  subheadline,
  guarantee,
  ctaText,
  accentBlockClassName,
}: PreviewCtaSectionProps) {
  return (
    <section id="cta" className="border-t border-slate-200 py-14">
      <div
        className={`${accentBlockClassName} overflow-hidden rounded-[2.8rem] px-6 py-8 sm:px-8 sm:py-10`}
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-semibold tracking-[-0.06em] sm:text-[3.5rem] sm:leading-[1]">
                Tutup keputusan dengan langkah yang terasa jelas.
              </h2>
              <p className="max-w-2xl text-base leading-8 opacity-92">
                {subheadline}
              </p>
              <p className="max-w-xl text-sm leading-7 opacity-78">
                {guarantee}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="landing-secondary-button landing-button-compact border-white/16 bg-white text-slate-950"
              >
                {ctaText}
              </button>
              <button
                type="button"
                className="landing-secondary-button landing-button-compact border-white/20 bg-transparent text-white hover:bg-white/8"
              >
                Minta brosur
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2.4rem] bg-white/10 blur-2xl" />
            <div className="relative grid gap-3">
              {commercialMotifs.map((motif, index) => (
                <div
                  key={motif.title}
                  className={`rounded-[1.8rem] border border-white/16 bg-white/10 px-5 py-5 backdrop-blur-sm ${
                    index === 1 ? "translate-x-4" : index === 2 ? "translate-x-8" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/14">
                      <Icon icon={motif.icon} className="h-6 w-6" />
                    </span>
                    <div className="space-y-1">
                      <p className="text-base font-semibold">{motif.title}</p>
                      <p className="text-sm opacity-80">{motif.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
