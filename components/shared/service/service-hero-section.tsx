import { serviceHeroContent } from "@/data/service/hero"
import type { ServiceHeroContent } from "@/types/service/hero"
import { MarketingNavbar } from "@/components/shared/landing/marketing-navbar"
import {
  MarketingHeroShell,
  SERVICE_HERO_BACKGROUND_HEIGHT_PX,
} from "@/components/shared/landing/marketing-hero-shell"
import { ServiceHeroIntro } from "@/components/shared/service/service-hero-intro"
import { ServiceOrderWidget } from "@/components/shared/service/service-order-widget"

/** Figma 25734:4636 nav 100px; widget ~35px below nav */
const SERVICE_NAV_TO_WIDGET_GAP_PX = 35
/** Figma intro column starts lower than the order widget (208px vs 134px) */

type ServiceHeroSectionProps = {
  content?: ServiceHeroContent
}

export function ServiceHeroSection({
  content = serviceHeroContent,
}: ServiceHeroSectionProps) {
  return (
    <MarketingHeroShell
      backgroundSrc={content.assets.backgroundHero}
      backgroundHeightPx={SERVICE_HERO_BACKGROUND_HEIGHT_PX}
      className="pb-16 md:pb-24 lg:pb-[120px]"
    >
      <MarketingNavbar className="relative z-20" mountReveal />

      <div
        className="info-container relative z-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,594px)_minmax(0,661px)] lg:justify-between lg:gap-[65px]"
        style={{ marginTop: SERVICE_NAV_TO_WIDGET_GAP_PX }}
      >
        <ServiceHeroIntro
          content={content.intro}
          className="lg:mt-[73px]"
        />

        <div className="w-full justify-self-stretch lg:justify-self-end lg:self-start">
          <ServiceOrderWidget
            content={content.orderWidget}
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
