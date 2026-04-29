export interface SalesPageThemePreset {
  canvasClassName: string;
  surfaceClassName: string;
  ctaClassName: string;
  secondaryCtaClassName: string;
  featurePillClassName: string;
  accentBlockClassName: string;
  accentTextClassName: string;
  accentHaloClassName: string;
}

const themePresets: Record<string, SalesPageThemePreset> = {
  "clean-midnight": {
    canvasClassName: "landing-page-canvas",
    surfaceClassName: "landing-page-surface",
    ctaClassName: "landing-primary-button landing-primary-button-midnight",
    secondaryCtaClassName:
      "landing-secondary-button landing-secondary-button-midnight",
    featurePillClassName: "landing-feature-pill landing-feature-pill-midnight",
    accentBlockClassName: "landing-accent-block landing-accent-block-midnight",
    accentTextClassName: "landing-accent-text-midnight",
    accentHaloClassName: "landing-accent-halo-midnight",
  },
  "clean-coral": {
    canvasClassName: "landing-page-canvas",
    surfaceClassName: "landing-page-surface",
    ctaClassName: "landing-primary-button landing-primary-button-coral",
    secondaryCtaClassName:
      "landing-secondary-button landing-secondary-button-coral",
    featurePillClassName: "landing-feature-pill landing-feature-pill-coral",
    accentBlockClassName: "landing-accent-block landing-accent-block-coral",
    accentTextClassName: "landing-accent-text-coral",
    accentHaloClassName: "landing-accent-halo-coral",
  },
  "clean-gold": {
    canvasClassName: "landing-page-canvas",
    surfaceClassName: "landing-page-surface",
    ctaClassName: "landing-primary-button landing-primary-button-gold",
    secondaryCtaClassName:
      "landing-secondary-button landing-secondary-button-gold",
    featurePillClassName: "landing-feature-pill landing-feature-pill-gold",
    accentBlockClassName: "landing-accent-block landing-accent-block-gold",
    accentTextClassName: "landing-accent-text-gold",
    accentHaloClassName: "landing-accent-halo-gold",
  },
  "clean-forest": {
    canvasClassName: "landing-page-canvas",
    surfaceClassName: "landing-page-surface",
    ctaClassName: "landing-primary-button landing-primary-button-forest",
    secondaryCtaClassName:
      "landing-secondary-button landing-secondary-button-forest",
    featurePillClassName: "landing-feature-pill landing-feature-pill-forest",
    accentBlockClassName: "landing-accent-block landing-accent-block-forest",
    accentTextClassName: "landing-accent-text-forest",
    accentHaloClassName: "landing-accent-halo-forest",
  },
  "clean-ocean": {
    canvasClassName: "landing-page-canvas",
    surfaceClassName: "landing-page-surface",
    ctaClassName: "landing-primary-button landing-primary-button-ocean",
    secondaryCtaClassName:
      "landing-secondary-button landing-secondary-button-ocean",
    featurePillClassName: "landing-feature-pill landing-feature-pill-ocean",
    accentBlockClassName: "landing-accent-block landing-accent-block-ocean",
    accentTextClassName: "landing-accent-text-ocean",
    accentHaloClassName: "landing-accent-halo-ocean",
  },
};

export function getSalesPageThemePreset(theme: string): SalesPageThemePreset {
  return themePresets[theme] ?? themePresets["clean-midnight"];
}
