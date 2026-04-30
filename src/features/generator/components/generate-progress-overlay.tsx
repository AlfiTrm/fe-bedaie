"use client";

import { useEffect, useState } from "react";

interface GenerateProgressOverlayProps {
  isRegenerating: boolean;
}

const progressSteps = [
  {
    label: "Preparing brief",
    detail: "Validating the product input and shaping the generation payload.",
  },
  {
    label: "Generating sections",
    detail: "Building the hero, benefits, proof, and conversion flow.",
  },
  {
    label: "Opening preview",
    detail: "Saving the result and preparing the preview workspace.",
  },
];

export function GenerateProgressOverlay({
  isRegenerating,
}: GenerateProgressOverlayProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setActiveStep(1), 800),
      window.setTimeout(() => setActiveStep(2), 1800),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 px-5 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-[rgba(17,19,24,0.96)] p-6 shadow-2xl sm:p-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-medium tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
              {isRegenerating ? "Re-generating" : "Generating"}
            </p>
            <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
              {isRegenerating
                ? "Building a stronger version of your sales page."
                : "Generating your sales page."}
            </h3>
            <p className="text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
              Hold on while the product brief is turned into a complete
              conversion-focused page.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-white">
                {progressSteps[activeStep]?.label}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {Math.round(((activeStep + 1) / progressSteps.length) * 100)}%
              </p>
            </div>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-[var(--color-accent)] transition-[width] duration-500 ease-out"
                style={{
                  width: `${((activeStep + 1) / progressSteps.length) * 100}%`,
                }}
              />
            </div>
            <p className="text-sm leading-7 text-[var(--color-text-muted)]">
              {progressSteps[activeStep]?.detail}
            </p>
          </div>

          <div className="space-y-3 rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4">
            {progressSteps.map((step, index) => (
              <div
                key={step.label}
                className="flex items-start gap-3 text-sm"
              >
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
                    index < activeStep
                      ? "border-[var(--color-accent)]/30 bg-[var(--color-accent)] text-slate-950"
                      : index === activeStep
                        ? "border-[var(--color-accent)]/40 bg-[rgba(205,163,73,0.16)] text-white"
                        : "border-white/10 bg-white/5 text-white"
                  }`}
                >
                  0{index + 1}
                </span>
                <div className="space-y-1">
                  <p
                    className={
                      index <= activeStep
                        ? "font-medium text-white"
                        : "font-medium text-[var(--color-text-muted)]"
                    }
                  >
                    {step.label}
                  </p>
                  <p className="text-xs leading-6 text-[var(--color-text-muted)]">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
