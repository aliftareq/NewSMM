import { landingHeroContent } from "@/data/landing/hero"
import type { LandingHeroContent } from "@/types/landing/hero"

import { HeroSectionContent } from "@/components/shared/landing/hero-section-content"

type HeroSectionProps = {
  content?: LandingHeroContent
}

/** Figma: nav ~100px overlay + 120px gap → content starts 220px from section top */
const HERO_CONTENT_PADDING_TOP_PX = 220

export function HeroSection({ content = landingHeroContent }: HeroSectionProps) {
  return (
    <section className="landing-hero-shell relative isolate overflow-x-clip bg-white pb-[120px]">
      <HeroSectionContent
        content={content}
        contentPaddingTopPx={HERO_CONTENT_PADDING_TOP_PX}
      />
    </section>
  )
}
