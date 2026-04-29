export const SALES_PAGE_THEME_VALUES = [
  "clean-midnight",
  "clean-coral",
  "clean-gold",
  "clean-forest",
  "clean-ocean",
] as const;

export type SalesPageTheme = (typeof SALES_PAGE_THEME_VALUES)[number];

export interface SalesPageThemeOption {
  value: SalesPageTheme;
  label: string;
}

const THEME_OPTIONS: SalesPageThemeOption[] = [
  { value: "clean-midnight", label: "Midnight" },
  { value: "clean-coral", label: "Coral" },
  { value: "clean-gold", label: "Gold" },
  { value: "clean-forest", label: "Forest" },
  { value: "clean-ocean", label: "Ocean" },
];

export function getSalesPageThemeOptions() {
  return THEME_OPTIONS;
}

export function isSalesPageTheme(value: string): value is SalesPageTheme {
  return SALES_PAGE_THEME_VALUES.includes(value as SalesPageTheme);
}
