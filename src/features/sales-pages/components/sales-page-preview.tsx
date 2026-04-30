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
import { buildSalesPagePreviewModel } from "@/src/features/sales-pages/services/sales-page-preview-model";
import { getSalesPageThemePreset } from "@/src/features/sales-pages/services/sales-page-theme";
import type { SalesPageRecord } from "@/src/types/sales-page";

interface SalesPagePreviewProps {
  record: SalesPageRecord;
}

export function SalesPagePreview({ record }: SalesPagePreviewProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const theme = getSalesPageThemePreset(record.theme);
  const preview = buildSalesPagePreviewModel(record);

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
            painPoints={preview.painPoints}
          />
          <PreviewBenefitsSection
            benefits={preview.benefits}
            accentTextClassName={theme.accentTextClassName}
          />
          <PreviewFeaturesSection
            features={preview.features}
            priceText={record.aiOutput.pricing.priceText}
            guarantee={record.aiOutput.pricing.guarantee}
            accentBlockClassName={theme.accentBlockClassName}
          />
          <PreviewSocialProofSection
            socialProof={preview.socialProof}
          />
          <PreviewFaqSection
            items={preview.faqs}
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
