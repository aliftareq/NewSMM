import { aboutHeroContent } from "@/data/landing/about-hero"
import { FaqSection } from "@/components/shared/landing/faq/faq-section"
import { HeroSection } from "@/components/shared/landing/hero-section"
import { SocialMediaSolutionSection } from "@/components/shared/landing/social-media-solution/social-media-solution-section"
import { WhyChooseOurServiceSection } from "@/components/shared/landing/why-choose-our-service/why-choose-our-service-section"

export default function AboutPage() {
  return (
    <main className="m-0 p-0">
      <HeroSection content={aboutHeroContent} />
      <WhyChooseOurServiceSection />
      <SocialMediaSolutionSection />
      <FaqSection />
    </main>
  )
}
