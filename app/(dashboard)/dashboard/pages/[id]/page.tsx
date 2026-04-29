import { notFound } from "next/navigation";

import { requireCurrentUser } from "@/src/features/auth/services/auth-api.server";
import { SalesPagePreview } from "@/src/features/sales-pages/components/sales-page-preview";
import { getSalesPageById } from "@/src/features/sales-pages/services/sales-pages-api.server";
import { ApiError } from "@/src/lib/http/api-error";

interface SalesPageDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SalesPageDetailPage({
  params,
}: SalesPageDetailPageProps) {
  const { id } = await params;
  const session = await requireCurrentUser();
  let record;

  try {
    record = await getSalesPageById(session.token, id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  return <SalesPagePreview record={record} />;
}
