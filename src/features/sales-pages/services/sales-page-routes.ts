export function getSalesPageDetailHref(id: string | number) {
  return `/dashboard/pages/${id}`;
}

export function getSalesPageRegenerateHref(id: string | number) {
  return `/dashboard/generate?from=${id}`;
}
