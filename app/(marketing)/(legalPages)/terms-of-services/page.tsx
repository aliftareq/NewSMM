import type { Metadata } from "next"

import { PrivacyPolicyHero } from "@/components/shared/legal/privacy-policy-hero"
import { PrivacyPolicyMainSection } from "@/components/shared/legal/privacy-policy-main-section"
import { HeroBackgroundLayer } from "@/components/shared/landing/hero-background"
import { MarketingNavbar } from "@/components/shared/landing/marketing-navbar"
import { termsOfServicesPageContent } from "@/data/legal/terms-of-services-page"

export const metadata: Metadata = {
  title: "Terms of Services | NewSMM",
  description: termsOfServicesPageContent.hero.description,
}

export default function TermsOfServicesPage() {
  const { hero, sections, searchPlaceholder, tabs, assets } =
    termsOfServicesPageContent

  return (
    <main className="m-0 bg-white p-0">
      <section className="landing-hero-shell relative isolate overflow-x-clip bg-white pb-14 sm:pb-16 lg:pb-[124px]">
        <HeroBackgroundLayer
          content={{ backgroundHero: assets.heroBackgroundSrc }}
        />

        <MarketingNavbar overlay mountReveal />

        <div className="info-container relative z-10 flex flex-col items-center gap-8 px-4 pt-[118px] sm:gap-8 sm:px-6 sm:pt-[140px] lg:px-8 lg:pt-[157px]">
          <PrivacyPolicyHero
            hero={hero}
            breadcrumbChevronSrc={assets.breadcrumbChevronSrc}
          />
        </div>
      </section>

      <PrivacyPolicyMainSection
        sections={sections}
        searchPlaceholder={searchPlaceholder}
        tabs={tabs}
        assets={assets}
        activeTab="terms"
        ariaLabel="Terms of services"
      />
    </main>
  )
}
