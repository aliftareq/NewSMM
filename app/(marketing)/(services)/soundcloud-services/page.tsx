import { ServiceHeroSection } from "@/components/shared/service/service-hero-section";
import { ServiceHowItWorksSection } from "@/components/shared/service/service-how-it-works-section";
import { ServiceFollowerComparisonSection } from "@/components/shared/service/service-follower-comparison-section";
import { ServiceGrowthPackageSection } from "@/components/shared/service/service-growth-package-section";
import { ServiceCustomerReviewsSection } from "@/components/shared/service/service-customer-reviews-section";
import { ServiceWhatMakesUsDifferentSection } from "@/components/shared/service/service-what-makes-us-different-section";

export default function SoundcloudServicesPage() {
  return (
    <main>
      <ServiceHeroSection />
      <ServiceHowItWorksSection />
      <ServiceGrowthPackageSection />
      <ServiceFollowerComparisonSection />
      <ServiceWhatMakesUsDifferentSection />
      <ServiceCustomerReviewsSection />
    </main>
  );
}
