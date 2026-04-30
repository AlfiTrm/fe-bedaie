"use client";

import { Icon } from "@iconify/react";

interface PreviewHeroSectionProps {
  productName: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaClassName: string;
  secondaryCtaClassName: string;
  accentHaloClassName: string;
  accentTextClassName: string;
}

const heroIcons = [
  "solar:buildings-3-bold-duotone",
  "solar:map-point-wave-bold-duotone",
  "solar:shield-check-bold-duotone",
];

export function PreviewHeroSection({
  productName,
  headline,
  subheadline,
  ctaText,
  ctaClassName,
  secondaryCtaClassName,
  accentHaloClassName,
  accentTextClassName,
}: PreviewHeroSectionProps) {
  const headlineWords = headline.trim().split(/\s+/).filter(Boolean);
  const highlightCount = headlineWords.length >= 6 ? 2 : 1;
  const shouldHighlight = headlineWords.length >= 3;
  const baseHeadline = shouldHighlight
    ? headlineWords.slice(0, -highlightCount).join(" ")
    : headline;
  const highlightedHeadline = shouldHighlight
    ? headlineWords.slice(-highlightCount).join(" ")
    : "";

  return (
    <section className="relative overflow-hidden rounded-[2.8rem] border border-slate-200 bg-white">
      <div
        className={`absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl ${accentHaloClassName}`}
      />
      <div className="relative flex min-h-[calc(100vh-10rem)] flex-col justify-center px-5 py-12 text-center sm:min-h-[calc(100vh-8rem)] sm:px-10 sm:py-14 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-3">
            {heroIcons.map((icon) => (
              <span
                key={icon}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm"
              >
                <Icon icon={icon} className="h-6 w-6" />
              </span>
            ))}
          </div>

          <div className="space-y-5">
            <p className="text-sm font-medium tracking-[0.12em] text-slate-500 uppercase">
              {productName}
            </p>
            <h1 className="mx-auto max-w-5xl text-[2.8rem] font-semibold tracking-[-0.08em] text-slate-950 sm:text-[5.8rem] sm:leading-[0.9]">
              {shouldHighlight ? (
                <>
                  {baseHeadline}{" "}
                  <span className={accentTextClassName}>{highlightedHeadline}</span>
                </>
              ) : (
                headline
              )}
            </h1>
            <p className="mx-auto max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {subheadline}
            </p>
          </div>

          <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
            <a
              href="#cta"
              className={`${ctaClassName} inline-flex items-center justify-center`}
            >
              {ctaText}
            </a>
            <a
              href="#features"
              className={`${secondaryCtaClassName} inline-flex items-center justify-center`}
            >
              Lihat spesifikasi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
