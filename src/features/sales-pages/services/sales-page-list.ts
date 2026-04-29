import type { SalesPageRecord } from "@/src/types/sales-page";

export interface SalesPageListItem {
  id: number;
  productName: string;
  createdAt: string;
  theme: string;
  themeLabel: string;
}

function humanizeTheme(theme: string) {
  return theme
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function normalizeSalesPageListItem(
  record: Pick<SalesPageRecord, "id" | "productName" | "theme" | "createdAt">,
): SalesPageListItem {
  return {
    id: record.id,
    productName: record.productName,
    createdAt: record.createdAt,
    theme: record.theme,
    themeLabel: humanizeTheme(record.theme),
  };
}
