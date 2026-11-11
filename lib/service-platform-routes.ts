import type { ServicesModalPlatformId } from "@/types/landing/services-modal"

export const SERVICE_PAGE_SERVICE_QUERY_KEY = "service"

export function getServicePlatformPageHref(
  platformId: ServicesModalPlatformId | string,
  options?: { serviceProductId?: string },
): string {
  const base = `/${platformId}-services`
  const serviceId = options?.serviceProductId?.trim()
  if (!serviceId) {
    return base
  }
  const params = new URLSearchParams({ [SERVICE_PAGE_SERVICE_QUERY_KEY]: serviceId })
  return `${base}?${params.toString()}`
}

export function resolveServiceProductIdFromQuery(
  platformId: string,
  serviceProductsByPlatform: Record<string, { id: string }[]>,
  defaultServiceProductId: string,
  queryValue: string | null | undefined,
): string {
  const products = serviceProductsByPlatform[platformId] ?? []
  const trimmed = queryValue?.trim()
  if (trimmed && products.some((item) => item.id === trimmed)) {
    return trimmed
  }
  return defaultServiceProductId
}
