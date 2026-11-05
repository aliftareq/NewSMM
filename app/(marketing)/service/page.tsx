import { ServiceHeroSection } from "@/components/shared/service/service-hero-section"
import { ServiceHowItWorksSection } from "@/components/shared/service/service-how-it-works-section"
import { ServiceGrowthPackageSection } from "@/components/shared/service/service-growth-package-section"

export default function ServicePage() {
  return (
    <main>
      <ServiceHeroSection />
      <ServiceHowItWorksSection />
      <ServiceGrowthPackageSection />
    </main>
  )
}
