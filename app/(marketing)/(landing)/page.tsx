import { HeroSection } from "@/components/shared/landing/hero-section"
import { ExploreAllServicesSection } from "@/components/shared/landing/explore-all-services/explore-all-services-section"
import { HowItWorksSection } from "@/components/shared/landing/how-it-works/how-it-works-section"
import { PaymentMethodsSection } from "@/components/shared/landing/payment-methods/payment-methods-section"
import { WhoItsForSection } from "@/components/shared/landing/who-its-for/who-its-for-section"
import { WhatMakesUsDifferentSection } from "@/components/shared/landing/what-makes-us-different/what-makes-us-different-section"
import { WhyChooseUsSection } from "@/components/shared/landing/why-choose-us/why-choose-us-section"
import { CustomerReviewsSection } from "@/components/shared/landing/customer-reviews/customer-reviews-section"
import { FaqSection } from "@/components/shared/landing/faq/faq-section"
import { StatsHighlightSection } from "@/components/shared/landing/stats-highlight/stats-highlight-section"

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <StatsHighlightSection />
      <ExploreAllServicesSection />
      <HowItWorksSection />
      <PaymentMethodsSection />
      <WhoItsForSection />
      <WhatMakesUsDifferentSection />
      <WhyChooseUsSection />
      <CustomerReviewsSection />
      <FaqSection />
    </main>
  )
}
