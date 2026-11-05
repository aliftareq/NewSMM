import { landingHeroContent } from "@/data/landing/hero"
import type { LandingHeroContent } from "@/types/landing/hero"

import { HeroSectionContent } from "@/components/shared/landing/hero-section-content"

type HeroSectionProps = {
  content?: LandingHeroContent
}

/** Figma: nav 100px tall, hero content starts at y=220 → 120px below nav */
const HERO_CONTENT_OFFSET_PX = 120

export function HeroSection({ content = landingHeroContent }: HeroSectionProps) {
  return (
    <section className="landing-hero-shell relative isolate overflow-x-clip bg-white pb-[120px]">
      <HeroSectionContent
        content={content}
        contentOffsetPx={HERO_CONTENT_OFFSET_PX}
      />
    </section>
  )
}
