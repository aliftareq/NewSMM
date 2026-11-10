import type { Metadata } from "next"

import { ContactHeroHeading } from "@/components/shared/contact/contact-hero-heading"
import { FaqPageMainSection } from "@/components/shared/faq/faq-page-main-section"
import { HeroBackgroundLayer } from "@/components/shared/landing/hero-background"
import { MarketingNavbar } from "@/components/shared/landing/marketing-navbar"
import { faqPageContent } from "@/data/faq/faq-page"

export const metadata: Metadata = {
  title: "FAQ | NewSMM",
  description: faqPageContent.hero.description,
}

export default function FaqPage() {
  const { hero, faq, searchPlaceholder, categories, assets } = faqPageContent

  return (
    <main className="m-0 bg-white p-0">
      <section className="landing-hero-shell relative isolate overflow-x-clip bg-white pb-14 sm:pb-16 lg:pb-[124px]">
        <HeroBackgroundLayer
          content={{ backgroundHero: assets.heroBackgroundSrc }}
        />

        <MarketingNavbar overlay mountReveal />

        <div className="info-container relative z-10 flex flex-col items-center gap-8 px-4 pt-[118px] sm:gap-8 sm:px-6 sm:pt-[140px] lg:px-8 lg:pt-[157px]">
          <ContactHeroHeading hero={hero} />
        </div>
      </section>

      <FaqPageMainSection
        faq={faq}
        searchPlaceholder={searchPlaceholder}
        categories={categories}
        assets={assets}
      />
    </main>
  )
}
