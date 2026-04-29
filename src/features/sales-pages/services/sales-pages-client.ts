export interface DeleteSalesPageResponse {
  ok: true;
}

export async function deleteSalesPageClient(id: number) {
  const response = await fetch(`/api/sales-pages/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof data?.message === "string"
        ? data.message
        : "Gagal menghapus sales page.",
    );
  }

  return data as DeleteSalesPageResponse;
}
