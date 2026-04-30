import { requireCurrentUser } from "@/src/features/auth/services/auth-api.server";
import { getSalesPageById } from "@/src/features/sales-pages/services/sales-pages-api.server";
import {
  buildSalesPageExportHtml,
  buildSalesPageExportFilename,
} from "@/src/features/sales-pages/services/sales-page-export";
import { ApiError } from "@/src/lib/http/api-error";

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireCurrentUser();
    const { id } = await context.params;
    const record = await getSalesPageById(session.token, id);
    const html = buildSalesPageExportHtml(record);
    const filename = buildSalesPageExportFilename(record.productName);

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal mengekspor sales page.";
    const status = error instanceof ApiError ? error.status : 500;

    return Response.json({ message }, { status });
  }
}
