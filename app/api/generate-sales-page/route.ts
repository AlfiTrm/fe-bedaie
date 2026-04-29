import { NextResponse } from "next/server";

import { getSessionToken } from "@/src/features/auth/services/auth-session.server";
import { generateAndSaveSalesPage } from "@/src/features/generator/services/generate-sales-page.server";
import { validateGeneratorInput } from "@/src/features/generator/services/generator-contracts";
import { ApiError } from "@/src/lib/http/api-error";

export async function POST(request: Request) {
  try {
    const token = await getSessionToken();

    if (!token) {
      return NextResponse.json(
        { message: "Sesi tidak ditemukan. Silakan login lagi." },
        { status: 401 },
      );
    }

    const payload = validateGeneratorInput(await request.json());
    const record = await generateAndSaveSalesPage(token, payload);

    return NextResponse.json({ id: record.id }, { status: 201 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        {
          message: error.message,
          details: error.details,
        },
        { status: error.status },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Gagal membuat sales page." },
      { status: 500 },
    );
  }
}
