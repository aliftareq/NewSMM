import type { ReactNode } from "react"

import {
  HERO_BACKGROUND_HEIGHT_PX,
  HeroBackground,
} from "@/components/shared/landing/hero-background"
import { cn } from "@/lib/utils"

/** Figma service hero frame height (25734:3505) — extra room for order widget + service select */
export const SERVICE_HERO_BACKGROUND_HEIGHT_PX = 1080

export const SERVICE_HERO_BACKGROUND_HEIGHT_CLASS =
  "h-[min(820px,125vh)] sm:h-[940px] md:h-[1000px] lg:h-[1080px]"

const HERO_GRADIENT_CLASS =
  "pointer-events-none absolute inset-x-0 top-0 z-[1] bg-gradient-to-b from-[rgba(239,250,255,0.3)] from-[24.69%] to-[rgba(15,175,255,0)] to-[58.96%]"

type MarketingHeroShellProps = {
  backgroundSrc: string
  backgroundHeightPx?: number
  /** When set, overrides fixed `backgroundHeightPx` for responsive hero art */
  backgroundHeightClassName?: string
  className?: string
  children: ReactNode
}

export function MarketingHeroShell({
  backgroundSrc,
  backgroundHeightPx = HERO_BACKGROUND_HEIGHT_PX,
  backgroundHeightClassName,
  className,
  children,
}: MarketingHeroShellProps) {
  return (
    <section
      className={cn(
        "landing-hero-shell relative isolate overflow-x-clip bg-white",
        className,
      )}
    >
      <HeroBackground
        src={backgroundSrc}
        heightPx={backgroundHeightPx}
        className={backgroundHeightClassName}
      />
      <div
        className={cn(HERO_GRADIENT_CLASS, backgroundHeightClassName)}
        style={backgroundHeightClassName ? undefined : { height: backgroundHeightPx }}
        aria-hidden
      />
      {children}
    </section>
  )
}
