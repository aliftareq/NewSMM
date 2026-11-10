import { landingHeroContent } from "@/data/landing/hero"
import type { LandingHeroContent } from "@/types/landing/hero"

import { HeroSectionContent } from "@/components/shared/landing/hero-section-content"
import { MarketingHeroShell } from "@/components/shared/landing/marketing-hero-shell"

type HeroSectionProps = {
  content?: LandingHeroContent
}

export function HeroSection({ content = landingHeroContent }: HeroSectionProps) {
  return (
    <MarketingHeroShell
      backgroundSrc={content.assets.backgroundHero}
      className="pb-[120px]"
    >
      <HeroSectionContent content={content} />
    </MarketingHeroShell>
  )
}
