import { landingHeroContent } from "@/data/landing/hero"
import type { LandingHeroContent } from "@/types/landing/hero"

import { HeroHeadline } from "@/components/shared/landing/hero-headline"
import { HeroOrderCard } from "@/components/shared/landing/hero-order-card"
import { HeroReviews } from "@/components/shared/landing/hero-reviews"
import { HeroVisual } from "@/components/shared/landing/hero-visual"

type HeroSectionProps = {
  content?: LandingHeroContent
}

export function HeroSection({ content = landingHeroContent }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pb-20 pt-[120px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[963px]"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={content.assets.backgroundFade}
          className="size-full object-cover object-top"
        />
      </div>

      <div className="info-container relative grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,684px)_minmax(0,480px)] lg:justify-between lg:gap-[156px]">
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

        <HeroVisual
          visual={content.visual}
          spriteSrc={content.assets.socialIconsSprite}
        />
      </div>
    </section>
  )
}
