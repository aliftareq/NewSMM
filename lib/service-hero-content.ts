import { serviceHeroIntroByPlatform } from "@/data/service/hero-intros"
import { getDefaultServiceProductId } from "@/data/service/order-widget-services"
import { serviceHeroContent } from "@/data/service/hero"
import type { ServiceHeroContent } from "@/types/service/hero"
import type { ServicesModalPlatformId } from "@/types/landing/services-modal"

export function getServiceHeroContent(
  platformId: ServicesModalPlatformId,
): ServiceHeroContent {
  const introCopy = serviceHeroIntroByPlatform[platformId]
  return {
    ...serviceHeroContent,
    intro: {
      trustCard: serviceHeroContent.intro.trustCard,
      ...introCopy,
    },
    orderWidget: {
      ...serviceHeroContent.orderWidget,
      defaultPlatformId: platformId,
      defaultServiceProductId: getDefaultServiceProductId(platformId),
    },
  }
}
