import { CustomerReviewsSection } from "@/components/shared/landing/customer-reviews/customer-reviews-section"
import { ExploreAllServicesSection } from "@/components/shared/landing/explore-all-services/explore-all-services-section"
import { FaqSection } from "@/components/shared/landing/faq/faq-section"
import { HeroSection } from "@/components/shared/landing/hero-section"
import { HowItWorksSection } from "@/components/shared/landing/how-it-works/how-it-works-section"
import { PaymentMethodsSection } from "@/components/shared/landing/payment-methods/payment-methods-section"
import { StatsHighlightSection } from "@/components/shared/landing/stats-highlight/stats-highlight-section"
import { WhatMakesUsDifferentSection } from "@/components/shared/landing/what-makes-us-different/what-makes-us-different-section"
import { WhyChooseUsSection } from "@/components/shared/landing/why-choose-us/why-choose-us-section"

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <StatsHighlightSection />
      <ExploreAllServicesSection />
      <HowItWorksSection />
      <PaymentMethodsSection />
      <WhatMakesUsDifferentSection />
      <WhyChooseUsSection />
      <CustomerReviewsSection />
      <FaqSection />
    </main>
  )
}
