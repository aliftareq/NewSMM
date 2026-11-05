"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"

import { AnimatedContent } from "@/components/shared/animated-content"
import { HeroBackgroundLayer } from "@/components/shared/landing/hero-background"
import { HeroHeadline } from "@/components/shared/landing/hero-headline"
import { HeroOrderCard } from "@/components/shared/landing/hero-order-card"
import { HeroReviews } from "@/components/shared/landing/hero-reviews"
import { HeroVisual } from "@/components/shared/landing/hero-visual"
import { MarketingNavbar } from "@/components/shared/landing/marketing-navbar"
import type { LandingHeroContent } from "@/types/landing/hero"

const HERO_ENTRANCE = {
  trigger: "mount" as const,
  distance: 100,
  duration: 0.8,
  ease: "power3.out",
  threshold: 0.1,
  delay: 0,
  stagger: 0,
}

type HeroSectionContentProps = {
  content: LandingHeroContent
}

export function HeroSectionContent({ content }: HeroSectionContentProps) {
  const reduceMotion = useReducedMotion()
  const [visualEffectsReady, setVisualEffectsReady] = useState(Boolean(reduceMotion))
  const completedCountRef = useRef(0)

  useEffect(() => {
    if (reduceMotion) {
      setVisualEffectsReady(true)
    }
  }, [reduceMotion])

  const markEntranceLayerComplete = useCallback(() => {
    if (reduceMotion) return
    completedCountRef.current += 1
    if (completedCountRef.current >= 3) {
      setVisualEffectsReady(true)
    }
  }, [reduceMotion])

  return (
    <>
      <HeroBackgroundLayer content={content.assets} />

      <MarketingNavbar
        overlay
        mountReveal
        onMountRevealComplete={markEntranceLayerComplete}
      />

      <div className="info-container relative z-10 grid grid-cols-1 items-start gap-5 pt-[118px] sm:gap-10 sm:pt-[192px] lg:grid-cols-[minmax(0,684px)_minmax(0,480px)] lg:justify-between lg:gap-[156px] lg:pt-[220px]">
        <AnimatedContent
          className="flex w-full max-w-[684px] flex-col gap-4 lg:gap-7"
          direction="horizontal"
          reverse
          onComplete={markEntranceLayerComplete}
          {...HERO_ENTRANCE}
        >
          <div className="flex flex-col gap-2.5 sm:gap-5">
            <HeroReviews reviews={content.reviews} />
            <div className="flex flex-col gap-2.5 sm:gap-4">
              <HeroHeadline
                lineOne={content.headline.lineOne}
                lineTwo={content.headline.lineTwo}
              />
              <p className="max-w-[684px] text-sm font-normal leading-normal text-n800 sm:text-base">
                {content.description}
              </p>
            </div>
          </div>

          <HeroOrderCard
            orderCard={content.orderCard}
            chevronSrc={content.assets.chevronDown}
            spriteSrc={content.assets.socialIconsSprite}
          />
        </AnimatedContent>

        <AnimatedContent
          className="relative mx-auto w-full max-w-[480px] justify-self-center overflow-visible lg:mx-0 lg:justify-self-end"
          direction="horizontal"
          onComplete={markEntranceLayerComplete}
          {...HERO_ENTRANCE}
        >
          <HeroVisual
            visual={content.visual}
            spriteSrc={content.assets.socialIconsSprite}
            panelAnimationReady={visualEffectsReady}
          />
        </AnimatedContent>
      </div>
    </>
  )
}
