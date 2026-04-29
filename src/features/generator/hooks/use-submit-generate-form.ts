"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { generateSalesPageClient } from "@/src/features/generator/services/generator-client";
import {
  buildGeneratePayload,
  type GeneratorDraftValues,
} from "@/src/features/generator/services/generator-form";
import { getSalesPageDetailHref } from "@/src/features/sales-pages/services/sales-page-routes";

export function useSubmitGenerateForm(values: GeneratorDraftValues) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function submit() {
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const payload = buildGeneratePayload(values);
        const response = await generateSalesPageClient(payload);

        router.push(getSalesPageDetailHref(response.id));
        router.refresh();
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Gagal membuat sales page.",
        );
      }
    });
  }

  return {
    errorMessage,
    isPending,
    submit,
  };
}
