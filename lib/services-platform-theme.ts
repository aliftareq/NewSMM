import { landingServicesModalContent } from "@/data/landing/services-modal"
import type {
  ServicesModalPlatformId,
  ServicesModalPlatformTheme,
} from "@/types/landing/services-modal"

const platformThemeById = Object.fromEntries(
  landingServicesModalContent.platforms.map((platform) => [
    platform.id,
    platform.theme,
  ]),
) as Record<ServicesModalPlatformId, ServicesModalPlatformTheme>

const defaultTheme = landingServicesModalContent.platforms[0]!.theme

export function getPlatformThemeById(
  platformId: string,
): ServicesModalPlatformTheme {
  return platformThemeById[platformId as ServicesModalPlatformId] ?? defaultTheme
}
