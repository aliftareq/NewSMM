import type { ServicesModalPlatformId } from "@/types/landing/services-modal"

export function getServicePlatformPageHref(
  platformId: ServicesModalPlatformId | string,
): string {
  return `/${platformId}-services`
}
