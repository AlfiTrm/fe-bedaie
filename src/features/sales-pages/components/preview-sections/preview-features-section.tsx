"use client";

import { Icon } from "@iconify/react";

interface PreviewFeaturesSectionProps {
  features: string[];
  priceText: string;
  guarantee: string;
  accentBlockClassName: string;
}

const featureIcons = [
  "solar:verified-check-bold-duotone",
  "solar:home-angle-bold-duotone",
  "solar:city-bold-duotone",
  "solar:wallet-money-bold-duotone",
  "solar:route-bold-duotone",
  "solar:users-group-rounded-bold-duotone",
];

export function PreviewFeaturesSection({
  features,
  priceText,
  guarantee,
  accentBlockClassName,
}: PreviewFeaturesSectionProps) {
  return (
    <section id="features" className="border-b border-slate-200 bg-slate-50 py-14">
      <div className="space-y-10">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-[3.1rem] sm:leading-[1.02]">
            Fitur dan spesifikasi yang mendukung keputusan.
          </h2>
        </div>

        <div
          className={`${accentBlockClassName} mx-auto max-w-3xl rounded-[2rem] px-6 py-6 text-center`}
        >
          <p className="text-2xl font-semibold tracking-[-0.05em]">
            {priceText}
          </p>
          <p className="mt-3 text-sm leading-7 opacity-90">{guarantee}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature}
              className="landing-card landing-card-hover rounded-[1.8rem] px-5 py-5"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm">
                    <Icon
                      icon={featureIcons[index] ?? "solar:home-angle-bold-duotone"}
                      className="h-5 w-5"
                    />
                  </span>
                </div>
                <p className="text-base font-semibold leading-7 text-slate-950">
                  {feature}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
