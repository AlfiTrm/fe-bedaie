"use client";

import { useState } from "react";

import { PreviewBenefitsSection } from "@/src/features/sales-pages/components/preview-sections/preview-benefits-section";
import { PreviewConsultationSection } from "@/src/features/sales-pages/components/preview-sections/preview-consultation-section";
import { PreviewCtaSection } from "@/src/features/sales-pages/components/preview-sections/preview-cta-section";
import { PreviewFaqSection } from "@/src/features/sales-pages/components/preview-sections/preview-faq-section";
import { PreviewFeaturesSection } from "@/src/features/sales-pages/components/preview-sections/preview-features-section";
import { PreviewHeroSection } from "@/src/features/sales-pages/components/preview-sections/preview-hero-section";
import { PreviewPainPointsSection } from "@/src/features/sales-pages/components/preview-sections/preview-pain-points-section";
import { PreviewSocialProofSection } from "@/src/features/sales-pages/components/preview-sections/preview-social-proof-section";
import { PreviewTopbar } from "@/src/features/sales-pages/components/preview-sections/preview-topbar";
import { getSalesPageThemePreset } from "@/src/features/sales-pages/services/sales-page-theme";
import type { SalesPageRecord } from "@/src/types/sales-page";

interface SalesPagePreviewProps {
  record: SalesPageRecord;
}

function limitWords(value: string, maxWords: number) {
  const words = value.trim().split(/\s+/).filter(Boolean);

  if (words.length <= maxWords) {
    return value.trim();
  }

  return `${words.slice(0, maxWords).join(" ")}...`;
}

export function SalesPagePreview({ record }: SalesPagePreviewProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const theme = getSalesPageThemePreset(record.theme);
  const benefits = record.aiOutput.benefits.slice(0, 3);
  const features = record.aiOutput.features.slice(0, 6);
  const socialProof = [
    ...record.aiOutput.socialProof,
    {
      name: "Owner bisnis lokal",
      review: `${record.productName} terasa lebih meyakinkan karena nilai utamanya langsung jelas sejak bagian awal halaman.`,
    },
    {
      name: "Calon investor",
      review: `Presentasinya membantu ${record.rawInput.targetAudience.toLowerCase()} memahami penawaran ini lebih cepat tanpa harus menebak-nebak detail penting.`,
    },
  ].slice(0, 4);
  const painPoints = [
    {
      title: "Nilai Kabur",
      description: limitWords(
        `Penawaran sering belum terasa cukup relevan untuk ${record.rawInput.targetAudience.toLowerCase()}.`,
        20,
      ),
    },
    {
      title: "Detail Tersebar",
      description: limitWords(
        "Detail penting sering tersebar, jadi keputusan terasa lebih lama dari yang seharusnya.",
        20,
      ),
    },
    {
      title: "Keputusan Lambat",
      description: limitWords(
        "Tanpa manfaat, bukti, dan jaminan yang jelas, minat mudah turun sebelum sampai ke CTA.",
        20,
      ),
    },
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

  return (
    <section className="-mx-5 -mt-6 lg:-mx-8 lg:-mt-8">
      <div className={`${theme.canvasClassName} min-h-[calc(100vh-6rem)]`}>
        <PreviewTopbar
          recordId={record.id}
          ctaClassName={theme.ctaClassName}
          secondaryCtaClassName={theme.secondaryCtaClassName}
        />

        <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
          <PreviewHeroSection
            productName={record.productName}
            headline={record.aiOutput.hero.headline}
            subheadline={record.aiOutput.hero.subheadline}
            ctaText={record.aiOutput.pricing.callToActionText}
            ctaClassName={theme.ctaClassName}
            secondaryCtaClassName={theme.secondaryCtaClassName}
            accentHaloClassName={theme.accentHaloClassName}
            accentTextClassName={theme.accentTextClassName}
          />
          <PreviewPainPointsSection
            accentBlockClassName={theme.accentBlockClassName}
            painPoints={painPoints}
          />
          <PreviewBenefitsSection
            benefits={benefits}
            accentTextClassName={theme.accentTextClassName}
          />
          <PreviewFeaturesSection
            features={features}
            priceText={record.aiOutput.pricing.priceText}
            guarantee={record.aiOutput.pricing.guarantee}
            accentBlockClassName={theme.accentBlockClassName}
          />
          <PreviewSocialProofSection
            socialProof={socialProof}
          />
          <PreviewFaqSection
            items={faqs}
            openIndex={openFaqIndex}
            onToggle={(index) =>
              setOpenFaqIndex((current) => (current === index ? -1 : index))
            }
          />
          <PreviewCtaSection
            subheadline={record.aiOutput.hero.subheadline}
            guarantee={record.aiOutput.pricing.guarantee}
            ctaText={record.aiOutput.pricing.callToActionText}
            accentBlockClassName={theme.accentBlockClassName}
          />
          <PreviewConsultationSection ctaClassName={theme.ctaClassName} />
        </div>
      </div>
    </section>
  );
}
