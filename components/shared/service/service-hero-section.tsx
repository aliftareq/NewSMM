import { serviceHeroContent } from "@/data/service/hero"
import { getServiceHeroContent } from "@/lib/service-hero-content"
import type { ServiceHeroContent } from "@/types/service/hero"
import type { ServicesModalPlatformId } from "@/types/landing/services-modal"
import { MarketingNavbar } from "@/components/shared/landing/marketing-navbar"
import {
  MarketingHeroShell,
  SERVICE_HERO_BACKGROUND_HEIGHT_CLASS,
} from "@/components/shared/landing/marketing-hero-shell"
import { ServiceHeroIntro } from "@/components/shared/service/service-hero-intro"
import { ServiceOrderWidgetSuspense } from "@/components/shared/service/service-order-widget-suspense"

type ServiceHeroSectionProps = {
  content?: ServiceHeroContent
  platformId?: ServicesModalPlatformId
}

export function ServiceHeroSection({
  content: contentProp,
  platformId,
}: ServiceHeroSectionProps) {
  const content =
    contentProp ??
    (platformId ? getServiceHeroContent(platformId) : serviceHeroContent)
  return (
    <MarketingHeroShell
      backgroundSrc={content.assets.backgroundHero}
      backgroundHeightClassName={SERVICE_HERO_BACKGROUND_HEIGHT_CLASS}
      className="pb-12 sm:pb-16 md:pb-24 lg:pb-[140px]"
    >
      <MarketingNavbar overlay mountReveal />

      <div className="info-container relative z-10 grid grid-cols-1 items-start gap-6 pt-[118px] sm:gap-8 sm:pt-[160px] md:gap-10 lg:grid-cols-2 lg:items-start lg:gap-8 lg:pt-[180px] xl:grid-cols-[minmax(0,594px)_minmax(0,661px)] xl:justify-between xl:gap-[65px] xl:pt-[128px]">
        <ServiceHeroIntro
          content={content.intro}
          className="mt-8 sm:mt-10 lg:mt-12 xl:mt-16"
        />

        <div className="mx-auto w-full min-w-0 max-w-[661px] lg:mx-0 lg:max-w-none lg:justify-self-stretch xl:mt-4 xl:justify-self-end">
          <ServiceOrderWidgetSuspense
            content={content.orderWidget}
            platformTabsNavigateToServicePages
            compact
            assets={{
              orderDividerLine: content.assets.orderDividerLine,
              secureLockIcon: content.assets.secureLockIcon,
              socialIconsSprite: content.assets.socialIconsSprite,
            }}
          />
        </div>
      </div>
    </MarketingHeroShell>
  )
}
