import { redirect } from "next/navigation";

import { getOptionalCurrentUser } from "@/src/features/auth/services/auth-api.server";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getOptionalCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return children;
}
