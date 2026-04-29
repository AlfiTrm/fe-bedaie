"use client";

import { usePathname } from "next/navigation";

export function useDashboardNavigation() {
  const pathname = usePathname();

  const items = [
    {
      href: "/dashboard",
      label: "Saved Pages",
      description: "History proyek yang sudah tersimpan",
      active: pathname === "/dashboard",
    },
    {
      href: "#",
      label: "Generate New",
      description: "Masuk di phase berikutnya",
      active: false,
      disabled: true,
    },
  ];

  const currentLabel =
    items.find((item) => item.active)?.label ??
    (pathname.startsWith("/dashboard") ? "Workspace" : "Dashboard");

  return {
    currentLabel,
    items,
  };
}
