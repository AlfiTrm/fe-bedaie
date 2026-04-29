"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { deleteSalesPageClient } from "@/src/features/sales-pages/services/sales-pages-client";

export function useDeleteSalesPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeId, setActiveId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function remove(id: number, redirectTo?: string) {
    setErrorMessage(null);
    setActiveId(id);

    startTransition(async () => {
      try {
        await deleteSalesPageClient(id);

        if (redirectTo) {
          router.push(redirectTo);
          router.refresh();
          return;
        }

        router.refresh();
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Gagal menghapus sales page.",
        );
      } finally {
        setActiveId(null);
      }
    });
  }

  return {
    activeId,
    errorMessage,
    isPending,
    remove,
  };
}
