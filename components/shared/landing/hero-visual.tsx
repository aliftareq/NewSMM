"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"

import type { LandingHeroContent } from "@/types/landing/hero"

import { HeroSocialDock } from "@/components/shared/landing/hero-social-dock"
import { HeroVerticalTitle } from "@/components/shared/landing/hero-vertical-title"

type HeroVisualProps = {
  visual: LandingHeroContent["visual"]
  spriteSrc: string
}

export function HeroVisual({ visual, spriteSrc }: HeroVisualProps) {
  const reduceMotion = useReducedMotion()
  const [titleReady, setTitleReady] = useState(Boolean(reduceMotion))

  return (
    <div className="relative mx-auto h-[560px] w-full max-w-[480px] overflow-visible rounded-[24px] bg-white">
      <motion.div
        className="absolute top-0 right-0 h-[560px] w-[238px] origin-bottom bg-blue-brand"
        aria-hidden
        initial={reduceMotion ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
        }
        onAnimationComplete={() => {
          if (!reduceMotion) setTitleReady(true)
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
  )
}
