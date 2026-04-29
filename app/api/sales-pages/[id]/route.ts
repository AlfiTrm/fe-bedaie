import { NextResponse } from "next/server";

import { requireCurrentUser } from "@/src/features/auth/services/auth-api.server";
import { deleteSalesPage } from "@/src/features/sales-pages/services/sales-pages-api.server";
import { ApiError } from "@/src/lib/http/api-error";

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireCurrentUser();
    const { id } = await context.params;

    await deleteSalesPage(session.token, id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal menghapus sales page.";
    const status = error instanceof ApiError ? error.status : 500;

    return NextResponse.json({ message }, { status });
  }
}
