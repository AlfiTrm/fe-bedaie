import type { SalesPageRecord } from "@/src/types/sales-page";
import { EmptySalesPagesState } from "@/src/features/sales-pages/components/empty-sales-pages-state";
import { SalesPagesTable } from "@/src/features/sales-pages/components/sales-pages-table";

interface SalesPagesOverviewProps {
  records: SalesPageRecord[];
}

export function SalesPagesOverview({ records }: SalesPagesOverviewProps) {
  if (records.length === 0) {
    return <EmptySalesPagesState />;
  }

  return <SalesPagesTable records={records} />;
}
