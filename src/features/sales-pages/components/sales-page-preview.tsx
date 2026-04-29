"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

import { DeleteSalesPageButton } from "@/src/features/sales-pages/components/delete-sales-page-button";
import { getSalesPageThemePreset } from "@/src/features/sales-pages/services/sales-page-theme";
import type { SalesPageRecord } from "@/src/types/sales-page";

interface SalesPagePreviewProps {
  record: SalesPageRecord;
}

const heroIcons = [
  "solar:buildings-3-bold-duotone",
  "solar:map-point-wave-bold-duotone",
  "solar:shield-check-bold-duotone",
];

const featureIcons = [
  "solar:verified-check-bold-duotone",
  "solar:home-angle-bold-duotone",
  "solar:city-bold-duotone",
  "solar:wallet-money-bold-duotone",
  "solar:route-bold-duotone",
  "solar:users-group-rounded-bold-duotone",
];

export function SalesPagePreview({ record }: SalesPagePreviewProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const theme = getSalesPageThemePreset(record.theme);
  const benefits = record.aiOutput.benefits.slice(0, 3);
  const features = record.aiOutput.features.slice(0, 6);
  const socialProof = record.aiOutput.socialProof.slice(0, 2);
  const painPoints = [
    `Banyak calon pembeli butuh penawaran yang langsung terasa relevan untuk ${record.rawInput.targetAudience.toLowerCase()}.`,
    "Sering kali detail penting tersebar, sehingga keputusan terasa lebih lambat dari yang seharusnya.",
    "Tanpa manfaat, bukti, dan jaminan yang jelas, minat mudah turun sebelum sampai ke CTA.",
  ];
  const faqs = [
    {
      question: "Apakah penawaran ini cocok untuk saya?",
      answer: `Penawaran ini dirancang untuk ${record.rawInput.targetAudience.toLowerCase()} yang ingin melihat nilai utama dengan cepat dan jelas.`,
    },
    {
      question: "Apa keuntungan utamanya?",
      answer: record.rawInput.usp,
    },
    {
      question: "Apa yang membuatnya lebih aman dipertimbangkan?",
      answer: record.aiOutput.pricing.guarantee,
    },
  ];
  const pricingItems = [
    {
      label: "Harga mulai",
      value: record.aiOutput.pricing.priceText,
    },
    {
      label: "Jaminan",
      value: record.aiOutput.pricing.guarantee,
    },
    {
      label: "Nilai utama",
      value: record.rawInput.usp,
    },
  ];

  return (
    <section className="-mx-5 -mt-6 lg:-mx-8 lg:-mt-8">
      <div className={`${theme.canvasClassName} min-h-[calc(100vh-6rem)]`}>
        <div className="sticky top-[4.55rem] z-20 border-b border-slate-200/80 bg-white/92 backdrop-blur">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-end gap-3 px-5 py-4 sm:px-8 lg:px-10">
            <Link
              href="/dashboard"
              className={`${theme.secondaryCtaClassName} landing-button-compact`}
            >
              Back to library
            </Link>
            <Link
              href="/dashboard/generate"
              className={`${theme.ctaClassName} landing-button-compact`}
            >
              Generate another
            </Link>
            <DeleteSalesPageButton
              id={record.id}
              redirectTo="/dashboard"
              variant="light"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
          <section className="relative overflow-hidden rounded-[2.8rem] border border-slate-200 bg-white">
            <div
              className={`absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl ${theme.accentHaloClassName}`}
            />
            <div className="relative flex min-h-[calc(100vh-8rem)] flex-col justify-center px-6 py-14 text-center sm:px-10 lg:px-16 lg:py-20">
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
                    {record.productName}
                  </p>
                  <h1 className="mx-auto max-w-5xl text-5xl font-semibold tracking-[-0.08em] text-slate-950 sm:text-[5.8rem] sm:leading-[0.9]">
                    {record.aiOutput.hero.headline}
                  </h1>
                  <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
                    {record.aiOutput.hero.subheadline}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="#cta"
                    className={`${theme.ctaClassName} inline-flex items-center justify-center`}
                  >
                    {record.aiOutput.pricing.callToActionText}
                  </a>
                  <a
                    href="#features"
                    className={`${theme.secondaryCtaClassName} inline-flex items-center justify-center`}
                  >
                    Lihat spesifikasi
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-slate-200 bg-slate-50 py-10">
            <div className={`${theme.accentBlockClassName} rounded-[2.8rem] px-6 py-8 sm:px-8 sm:py-10`}>
              <div className="space-y-8">
                <div className="space-y-3 text-center">
                  <h2 className="text-4xl font-semibold tracking-[-0.06em] sm:text-[3.2rem] sm:leading-[1]">
                    Masalah yang sering bikin keputusan tertunda.
                  </h2>
                  <p className="mx-auto max-w-2xl text-sm leading-7 opacity-90">
                    Bagian ini dibuat agar audiens merasa halaman ini memang bicara soal kebutuhan mereka.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                  {painPoints.map((item) => (
                    <div
                      key={item}
                      className="landing-card landing-card-hover rounded-[1.9rem] border-white/16 px-5 py-5 text-slate-950 sm:px-6"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-slate-950" />
                        <p className="text-base font-semibold leading-7 tracking-[-0.04em] text-slate-950">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="benefits"
            className="border-b border-slate-200 py-14"
          >
            <div className="space-y-10">
              <div className="space-y-4 text-center">
                <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-[3.2rem] sm:leading-[1.02]">
                Solusi dan manfaat yang langsung terasa.
                </h2>
                <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">
                  Setelah masalahnya jelas, bagian ini menunjukkan bagaimana penawaranmu membantu menyelesaikannya.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {benefits.map((benefit, index) => (
                  <article
                    key={benefit.title}
                    className={
                      index === 0
                        ? `${theme.accentBlockClassName} landing-card-hover rounded-[2rem] px-6 py-7`
                        : "landing-card landing-card-hover rounded-[2rem] px-6 py-7"
                    }
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <span
                        className={
                          index === 0
                            ? "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/16"
                            : `inline-flex h-11 w-11 items-center justify-center rounded-full ${theme.accentBlockClassName}`
                        }
                      >
                        <Icon icon="solar:star-bold-duotone" className="h-6 w-6" />
                      </span>
                    </div>
                    <p
                      className={
                        index === 0
                          ? "text-2xl font-semibold tracking-[-0.05em]"
                          : `text-2xl font-semibold tracking-[-0.05em] ${theme.accentTextClassName}`
                      }
                    >
                      {benefit.title}
                    </p>
                    <p
                      className={
                        index === 0
                          ? "mt-4 text-sm leading-8 opacity-90"
                          : "mt-4 text-sm leading-8 text-slate-600"
                      }
                    >
                      {benefit.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="features"
            className="border-b border-slate-200 bg-slate-50 py-14"
          >
            <div className="space-y-10">
              <div className="space-y-4 text-center">
                <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-[3.1rem] sm:leading-[1.02]">
                  Fitur dan spesifikasi yang mendukung keputusan.
                </h2>
                <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">
                  Detail ini membantu calon pembeli melihat alasan rasional di balik ketertarikan awal.
                </p>
              </div>

              <div className={`${theme.accentBlockClassName} mx-auto max-w-3xl rounded-[2rem] px-6 py-6 text-center`}>
                <p className="text-2xl font-semibold tracking-[-0.05em]">
                  {record.aiOutput.pricing.priceText}
                </p>
                <p className="mt-3 text-sm leading-7 opacity-90">
                  {record.aiOutput.pricing.guarantee}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <div
                    key={feature}
                    className="landing-card landing-card-hover rounded-[1.8rem] px-5 py-5"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${theme.accentBlockClassName}`}
                      >
                        <Icon
                          icon={featureIcons[index] ?? "solar:home-angle-bold-duotone"}
                          className="h-5 w-5"
                        />
                      </span>
                      <p className="text-base font-semibold text-slate-950">
                        {feature}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-b border-slate-200 bg-white py-14">
            <div className="space-y-10">
              <div className="space-y-4 text-center">
                <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-[3.1rem] sm:leading-[1.02]">
                  Bukti sosial yang menjaga momentum.
                </h2>
                <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">
                  Testimoni yang singkat tapi cukup meyakinkan untuk menurunkan keraguan sebelum CTA.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {socialProof.map((proof, index) => (
                  <blockquote
                    key={`${proof.name}-${proof.review}`}
                    className={
                      index === 0
                        ? `${theme.accentBlockClassName} landing-card-hover rounded-[2rem] px-6 py-6`
                        : "landing-card landing-card-hover rounded-[2rem] px-6 py-6"
                    }
                  >
                    <p
                      className={
                        index === 0
                          ? "text-base leading-8 opacity-95"
                          : "text-base leading-8 text-slate-700"
                      }
                    >
                      &ldquo;{proof.review}&rdquo;
                    </p>
                    <footer
                      className={
                        index === 0
                          ? "mt-5 text-sm font-semibold opacity-90"
                          : "mt-5 text-sm font-semibold text-slate-950"
                      }
                    >
                      {proof.name}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 bg-slate-50 py-14">
            <div className="space-y-10">
              <div className="space-y-4 text-center">
                <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-[3.1rem] sm:leading-[1.02]">
                  Harga dan jaminan yang mengurangi rasa ragu.
                </h2>
                <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">
                  Harga harus jelas, jaminan harus terasa aman, dan langkah berikutnya harus mudah dipahami.
                </p>
              </div>

              <div className={`${theme.accentBlockClassName} rounded-[2.8rem] px-6 py-8 sm:px-8 sm:py-10`}>
                <div className="grid gap-4 sm:grid-cols-3">
                  {pricingItems.map((item) => (
                    <div
                      key={item.label}
                      className="landing-card landing-card-hover rounded-[1.9rem] border-white/16 px-5 py-5 text-slate-950"
                    >
                      <p className="text-sm text-slate-500">{item.label}</p>
                      <p className="mt-3 text-base font-semibold leading-7 tracking-[-0.04em] text-slate-950">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 py-14">
            <div className="space-y-10">
              <div className="space-y-4 text-center">
                <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-[3.1rem] sm:leading-[1.02]">
                  FAQ yang paling sering ditanyakan.
                </h2>
                <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">
                  Bagian ini membantu menjawab pertanyaan umum sebelum calon pembeli masuk ke CTA terakhir.
                </p>
              </div>

              <div className="mx-auto grid max-w-4xl gap-4">
                {faqs.map((item, index) => (
                  <article
                    key={item.question}
                    className="landing-card landing-card-hover landing-card-interactive overflow-hidden rounded-[1.9rem]"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left"
                      onClick={() =>
                        setOpenFaqIndex((current) =>
                          current === index ? -1 : index,
                        )
                      }
                      aria-expanded={openFaqIndex === index}
                    >
                      <span className="text-lg font-semibold tracking-[-0.04em] text-slate-950">
                        {item.question}
                      </span>
                      <span
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition ${
                          openFaqIndex === index
                            ? "rotate-180 border-slate-300 bg-white text-slate-950"
                            : ""
                        }`}
                      >
                        <Icon icon="solar:alt-arrow-down-linear" className="h-4 w-4" />
                      </span>
                    </button>
                    <div
                      className="landing-faq-answer"
                      data-open={openFaqIndex === index}
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

          <section id="cta" className="border-t border-slate-200 py-14">
            <div className={`${theme.accentBlockClassName} rounded-[2.8rem] px-6 py-8 sm:px-8 sm:py-10`}>
              <div className="space-y-6 text-center">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <h2 className="text-4xl font-semibold tracking-[-0.06em] sm:text-[3.5rem] sm:leading-[1]">
                      Saatnya ambil langkah berikutnya.
                    </h2>
                    <p className="mx-auto max-w-2xl text-base leading-8 opacity-90">
                      {record.aiOutput.hero.subheadline}
                    </p>
                    <p className="mx-auto max-w-xl text-sm leading-7 opacity-80">
                      {record.aiOutput.pricing.guarantee}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      className="landing-secondary-button landing-button-compact border-white/16 bg-white text-slate-950"
                    >
                      {record.aiOutput.pricing.callToActionText}
                    </button>
                    <button
                      type="button"
                      className="landing-secondary-button landing-button-compact border-white/20 bg-transparent text-white hover:bg-white/8"
                    >
                      Minta brosur
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="consultation" className="border-t border-slate-200 bg-slate-50 py-14">
            <div className="space-y-10">
              <div className="space-y-4 text-center">
                <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-[3.1rem] sm:leading-[1.02]">
                  Konsultasi gratis
                </h2>
                <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">
                  Tinggalkan kontak dan tim kami akan menghubungi Anda untuk detail penawaran.
                </p>
              </div>

              <div className="mx-auto max-w-3xl rounded-[2.6rem] border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nama lengkap"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white"
                  />
                  <input
                    type="tel"
                    placeholder="Nomor telepon"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white"
                  />
                  <textarea
                    placeholder="Tulis kebutuhan atau pertanyaan Anda"
                    className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white"
                  />
                  <button
                    type="button"
                    className={`${theme.ctaClassName} inline-flex w-full items-center justify-center`}
                  >
                    Kirim permintaan
                  </button>
                </form>
              </div>
            </div>
          </section>

          <footer className="border-t border-slate-200 py-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <p className="text-lg font-semibold text-slate-950">
                  {record.productName}
                </p>
                <p className="max-w-xl text-sm leading-7 text-slate-500">
                  {record.aiOutput.hero.subheadline}
                </p>
              </div>
              <div className="text-sm leading-7 text-slate-500 sm:text-right">
                <p>{record.aiOutput.pricing.priceText}</p>
                <p>{record.aiOutput.pricing.guarantee}</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
