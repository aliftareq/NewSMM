import { serviceHeroContent } from "@/data/service/hero"
import { getServiceHeroContent } from "@/lib/service-hero-content"
import type { ServiceHeroContent } from "@/types/service/hero"
import type { ServicesModalPlatformId } from "@/types/landing/services-modal"
import { MarketingNavbar } from "@/components/shared/landing/marketing-navbar"
import {
  MarketingHeroShell,
} from "@/components/shared/landing/marketing-hero-shell"
import { ServiceHeroIntro } from "@/components/shared/service/service-hero-intro"
import { ServiceOrderWidget } from "@/components/shared/service/service-order-widget"

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
      backgroundHeightClassName="h-[min(720px,120vh)] sm:h-[840px] md:h-[900px] lg:h-[955px]"
      className="pb-12 sm:pb-16 md:pb-24 lg:pb-[120px]"
    >
      <MarketingNavbar className="relative z-20" mountReveal />

      <div className="info-container relative z-10 mt-6 grid grid-cols-1 items-start gap-6 sm:mt-8 sm:gap-8 md:gap-10 lg:mt-8 lg:grid-cols-2 lg:items-start lg:gap-8 xl:mt-[35px] xl:grid-cols-[minmax(0,594px)_minmax(0,661px)] xl:justify-between xl:gap-[65px]">
        <ServiceHeroIntro content={content.intro} className="xl:mt-[73px]" />

        <div className="mx-auto w-full min-w-0 max-w-[661px] lg:mx-0 lg:max-w-none lg:justify-self-stretch xl:justify-self-end">
          <ServiceOrderWidget
            content={content.orderWidget}
            platformTabsNavigateToServicePages
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
