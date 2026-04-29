export interface GeneratePayload {
  product_name: string;
  description: string;
  key_features: string[];
  target_audience: string;
  price: string;
  usp: string;
  theme: string;
}

export interface GenerateResponse {
  id: number;
}

export async function generateSalesPageClient(payload: GeneratePayload) {
  const response = await fetch("/api/generate-sales-page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof data?.message === "string"
        ? data.message
        : "Gagal membuat sales page.",
    );
  }

  return data as GenerateResponse;
}
