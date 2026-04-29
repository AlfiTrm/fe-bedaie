export interface AuthResponse {
  user: {
    id: number | string;
    name: string;
    email: string;
  };
}

async function postJson<T>(url: string, payload?: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof data?.message === "string"
        ? data.message
        : "Request gagal. Silakan coba lagi.",
    );
  }

  return data as T;
}

export function loginClient(payload: { email: string; password: string }) {
  return postJson<AuthResponse>("/api/auth/login", payload);
}

export function registerClient(payload: {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}) {
  return postJson<AuthResponse>("/api/auth/register", payload);
}

export function logoutClient() {
  return postJson("/api/auth/logout");
}
