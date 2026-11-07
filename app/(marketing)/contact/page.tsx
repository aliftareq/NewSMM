import type { Metadata } from "next"

import { BlogBreadcrumb } from "@/components/shared/blog/blog-breadcrumb"
import { ContactHeroHeading } from "@/components/shared/contact/contact-hero-heading"
import { HeroBackgroundLayer } from "@/components/shared/landing/hero-background"
import { MarketingNavbar } from "@/components/shared/landing/marketing-navbar"
import { ContactMainSection } from "@/components/shared/contact/contact-main-section"
import { contactPageContent } from "@/data/contact/contact"

export const metadata: Metadata = {
  title: "Contact Us | NewSMM",
  description: contactPageContent.hero.description,
}

export default function ContactPage() {
  const { breadcrumb, hero, form, supportChannels, assets } = contactPageContent

  return (
    <main className="m-0 bg-white p-0">
      <section className="landing-hero-shell relative isolate overflow-x-clip bg-white pb-14 sm:pb-16 lg:pb-20">
        <HeroBackgroundLayer
          content={{ backgroundHero: assets.heroBackgroundSrc }}
        />

        <MarketingNavbar overlay mountReveal />

        <div className="info-container relative z-10 flex flex-col items-center gap-8 px-4 pt-[118px] sm:gap-8 sm:px-6 sm:pt-[140px] lg:px-8 lg:pt-[157px]">
          <BlogBreadcrumb
            chevronSrc={assets.breadcrumbChevronSrc}
            items={[
              { label: breadcrumb.homeLabel, href: "/" },
              { label: breadcrumb.currentLabel, isCurrent: true },
            ]}
          />

          <ContactHeroHeading hero={hero} />
        </div>
      </section>

      <ContactMainSection
        form={form}
        supportChannels={supportChannels}
        assets={assets}
      />
    </main>
  )
}
