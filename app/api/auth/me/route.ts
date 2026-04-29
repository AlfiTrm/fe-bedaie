import { NextResponse } from "next/server";

import { requireCurrentUser } from "@/src/features/auth/services/auth-api.server";
import { ApiError } from "@/src/lib/http/api-error";

export async function GET() {
  try {
    const session = await requireCurrentUser();
    return NextResponse.json({ user: session.user });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Sesi pengguna tidak ditemukan.";
    const status = error instanceof ApiError ? error.status : 401;

    return NextResponse.json({ message }, { status });
  }
}
