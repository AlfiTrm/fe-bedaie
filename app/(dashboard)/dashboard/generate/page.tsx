import { GenerateSalesPageForm } from "@/src/features/generator/components/generate-sales-page-form";
import { buildDraftValuesFromSalesPage } from "@/src/features/generator/services/generator-form";
import { requireCurrentUser } from "@/src/features/auth/services/auth-api.server";
import { getSalesPageById } from "@/src/features/sales-pages/services/sales-pages-api.server";
import { ApiError } from "@/src/lib/http/api-error";

interface GenerateSalesPagePageProps {
  searchParams?: Promise<{
    from?: string;
  }>;
}

export default async function GenerateSalesPagePage({
  searchParams,
}: GenerateSalesPagePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const sourceId = resolvedSearchParams?.from;

  if (!sourceId) {
    return <GenerateSalesPageForm />;
  }

  const session = await requireCurrentUser();
  let record = null;

  try {
    record = await getSalesPageById(session.token, sourceId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return <GenerateSalesPageForm />;
    }

    throw error;
  }

  return (
    <GenerateSalesPageForm
      initialValues={buildDraftValuesFromSalesPage(record)}
      sourceProductName={record.productName}
    />
  );
}
