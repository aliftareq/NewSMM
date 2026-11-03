import { landingHeroContent } from "@/data/landing/hero"
import type { LandingHeroContent } from "@/types/landing/hero"

import { HeroBackgroundLayer } from "@/components/shared/landing/hero-background"
import { HeroHeadline } from "@/components/shared/landing/hero-headline"
import { HeroOrderCard } from "@/components/shared/landing/hero-order-card"
import { HeroReviews } from "@/components/shared/landing/hero-reviews"
import { HeroVisual } from "@/components/shared/landing/hero-visual"
import { MarketingNavbar } from "@/components/shared/landing/marketing-navbar"

type HeroSectionProps = {
  content?: LandingHeroContent
}

/** Figma: nav 100px tall, hero content starts at y=220 → 120px below nav */
const HERO_CONTENT_OFFSET_PX = 120

export function HeroSection({ content = landingHeroContent }: HeroSectionProps) {
  return (
    <section className="landing-hero-shell relative isolate overflow-x-clip bg-white pb-[120px]">
      <HeroBackgroundLayer content={content.assets} />

      <MarketingNavbar className="relative z-20" />

      <div
        className="info-container relative z-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,684px)_minmax(0,480px)] lg:justify-between lg:gap-[156px]"
        style={{ marginTop: HERO_CONTENT_OFFSET_PX }}
      >
        <div className="flex w-full max-w-[684px] flex-col gap-7">
          <div className="flex flex-col gap-5">
            <HeroReviews reviews={content.reviews} />
            <div className="flex flex-col gap-4">
              <HeroHeadline
                lineOne={content.headline.lineOne}
                lineTwo={content.headline.lineTwo}
              />
              <p className="max-w-[684px] text-base font-normal leading-normal text-n800">
                {content.description}
              </p>
            </div>
          </div>

          <HeroOrderCard
            orderCard={content.orderCard}
            chevronSrc={content.assets.chevronDown}
            spriteSrc={content.assets.socialIconsSprite}
          />
        </div>

        <div className="relative w-full max-w-[480px] justify-self-end overflow-visible">
          <HeroVisual
            visual={content.visual}
            spriteSrc={content.assets.socialIconsSprite}
          />
        </div>
      </div>
    </section>
  )
}
