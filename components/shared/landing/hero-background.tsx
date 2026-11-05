import type { LandingHeroContent } from "@/types/landing/hero"

import { cn } from "@/lib/utils"

/** Hero background art (2:1) — matches landing hero shell height */
export const HERO_BACKGROUND_HEIGHT_PX = 960

type HeroBackgroundProps = {
  src: string
  heightPx?: number
  className?: string
}

export function HeroBackground({
  src,
  heightPx = HERO_BACKGROUND_HEIGHT_PX,
  className,
}: HeroBackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-0 w-full overflow-hidden bg-white",
        className,
      )}
      style={className ? undefined : { height: heightPx }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={src}
        width={1024}
        height={512}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top select-none"
        draggable={false}
      />
    </div>
  )
}

export function HeroBackgroundLayer({
  content,
}: {
  content: Pick<LandingHeroContent["assets"], "backgroundHero">
}) {
  return <HeroBackground src={content.backgroundHero} />
}
