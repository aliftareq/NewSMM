import { HeroSection } from "@/components/shared/landing/hero-section"
import { ExploreAllServicesSection } from "@/components/shared/landing/explore-all-services/explore-all-services-section"
import { HowItWorksSection } from "@/components/shared/landing/how-it-works/how-it-works-section"
import { PaymentMethodsSection } from "@/components/shared/landing/payment-methods/payment-methods-section"
import { StatsHighlightSection } from "@/components/shared/landing/stats-highlight/stats-highlight-section"

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <StatsHighlightSection />
      <ExploreAllServicesSection />
      <HowItWorksSection />
      <PaymentMethodsSection />
    </main>
  )
}
