import type { LandingHeroContent } from "@/types/landing/hero"

/** Hero background art (2:1) — matches landing hero shell height */
export const HERO_BACKGROUND_HEIGHT_PX = 960

type HeroBackgroundProps = {
  src: string
}

export function HeroBackground({ src }: HeroBackgroundProps) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[960px] w-full overflow-hidden bg-white"
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
