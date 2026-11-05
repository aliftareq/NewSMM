import { landingHeroContent } from "@/data/landing/hero"
import type { LandingHeroContent } from "@/types/landing/hero"

import { HeroSectionContent } from "@/components/shared/landing/hero-section-content"

type HeroSectionProps = {
  content?: LandingHeroContent
}

export function HeroSection({ content = landingHeroContent }: HeroSectionProps) {
  return (
    <section className="landing-hero-shell relative isolate overflow-x-clip bg-white pb-[120px]">
      <HeroSectionContent content={content} />
    </section>
  )
}
