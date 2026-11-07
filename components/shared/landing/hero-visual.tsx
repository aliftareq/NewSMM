"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"

import type { LandingHeroContent } from "@/types/landing/hero"

import { HeroSocialDock } from "@/components/shared/landing/hero-social-dock"
import { HeroVerticalTitle } from "@/components/shared/landing/hero-vertical-title"
import {
  HERO_PANEL_OPEN_DURATION_S,
  HERO_PANEL_OPEN_EASE,
} from "@/components/shared/landing/hero-entrance"
import { cn } from "@/lib/utils"

type HeroVisualProps = {
  visual: LandingHeroContent["visual"]
  spriteSrc: string
  /** When true, blue panel + fold text run (after hero column entrance). */
  panelAnimationReady?: boolean
}

export function HeroVisual({
  visual,
  spriteSrc,
  panelAnimationReady = false,
}: HeroVisualProps) {
  const reduceMotion = useReducedMotion()
  const [titleReady, setTitleReady] = useState(false)

  useEffect(() => {
    if (!panelAnimationReady) {
      setTitleReady(false)
      return
    }
    if (reduceMotion) {
      setTitleReady(true)
    }
  }, [panelAnimationReady, reduceMotion])

  const panelOpen = panelAnimationReady || reduceMotion

  return (
    <div
      className={cn(
        "@container/hero-visual relative mx-auto aspect-[480/560] w-full max-w-[calc(100vw-2rem)] overflow-visible",
        "lg:aspect-auto lg:h-[560px] lg:max-w-[480px]",
      )}
    >
      <div
        className={cn(
          "absolute left-1/2 top-0 overflow-visible rounded-[24px] bg-white",
          "h-[560px] w-[480px] origin-top -translate-x-1/2",
          "scale-[calc(100cqw/480px)]",
          "lg:relative lg:left-0 lg:h-[560px] lg:w-full lg:max-w-[480px] lg:translate-x-0 lg:scale-100",
        )}
      >
        <motion.div
          className="absolute top-0 right-0 h-[560px] w-[238px] origin-bottom bg-blue-brand"
          aria-hidden
          initial={reduceMotion ? false : { scaleY: 0 }}
          animate={panelOpen ? { scaleY: 1 } : { scaleY: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: HERO_PANEL_OPEN_DURATION_S, ease: HERO_PANEL_OPEN_EASE }
          }
          onAnimationComplete={() => {
            if (panelOpen && !reduceMotion) setTitleReady(true)
          }}
        />

        <div className="absolute top-[10px] right-0 flex h-[529px] w-20 items-center justify-center">
          <HeroVerticalTitle
            social={visual.verticalTitle.social}
            growth={visual.verticalTitle.growth}
            ready={titleReady}
          />
        </div>

        <div className="absolute top-[15px] left-[23px] h-[548px] w-[404px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={visual.professionalImage.alt}
            src={visual.professionalImage.src}
            className={visual.professionalImage.className}
          />
        </div>

        <HeroSocialDock icons={visual.socialBarIcons} spriteSrc={spriteSrc} />
      </div>
    </div>
  )
}
