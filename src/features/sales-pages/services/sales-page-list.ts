import type { SalesPageRecord } from "@/src/types/sales-page";
import {
  getSalesPageThemeOptions,
  isSalesPageTheme,
} from "./sales-page-theme-options.ts";

export interface SalesPageListItem {
  id: number;
  productName: string;
  createdAt: string;
  theme: string;
  themeLabel: string;
  themeBadgeClassName: string;
}

function humanizeTheme(theme: string) {
  return theme
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getThemeLabel(theme: string) {
  const legacyMap: Record<string, string> = {
    "dark-luxury": "clean-midnight",
  };
  const normalizedTheme = legacyMap[theme] ?? theme;

  if (isSalesPageTheme(normalizedTheme)) {
    const option = getSalesPageThemeOptions().find(
      (item) => item.value === normalizedTheme,
    );

    if (option) {
      return option.label;
    }
  }

  return humanizeTheme(theme);
}

function getThemeBadgeClassName(theme: string) {
  switch (theme) {
    case "clean-coral":
      return "border-orange-500/18 bg-orange-500/10 text-orange-100";
    case "clean-gold":
      return "border-amber-400/18 bg-amber-400/10 text-amber-100";
    case "clean-forest":
      return "border-emerald-500/18 bg-emerald-500/10 text-emerald-100";
    case "clean-ocean":
      return "border-sky-500/18 bg-sky-500/10 text-sky-100";
    case "dark-luxury":
    case "clean-midnight":
    default:
      return "border-slate-300/12 bg-slate-300/8 text-slate-100";
  }
}

export function normalizeSalesPageListItem(
  record: Pick<SalesPageRecord, "id" | "productName" | "theme" | "createdAt">,
): SalesPageListItem {
  return {
    id: record.id,
    productName: record.productName,
    createdAt: record.createdAt,
    theme: record.theme,
    themeLabel: getThemeLabel(record.theme),
    themeBadgeClassName: getThemeBadgeClassName(record.theme),
  };
}
