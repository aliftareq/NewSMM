import type { Metadata } from "next"

import { DiscountCouponSection } from "@/components/shared/discount/discount-coupon-section"
import { DiscountPageHero } from "@/components/shared/discount/discount-page-hero"
import { DiscountSection } from "@/components/shared/discount/discount-section"
import { GetStartedSection } from "@/components/shared/discount/get-started-section"
import { CustomerReviewsSection } from "@/components/shared/landing/customer-reviews/customer-reviews-section"
import { HeroBackgroundLayer } from "@/components/shared/landing/hero-background"
import { MarketingNavbar } from "@/components/shared/landing/marketing-navbar"
import { discountPageContent } from "@/data/discount/discount-page"

export const metadata: Metadata = {
  title: "Discount | NewSMM",
  description: discountPageContent.hero.description,
}

export default function DiscountPage() {
  const { hero, couponSection, discountSection, getStartedSection, assets } =
    discountPageContent

  return (
    <main className="m-0 bg-white p-0">
      <section className="landing-hero-shell relative isolate overflow-x-clip bg-white pb-14 sm:pb-16 lg:pb-[124px]">
        <HeroBackgroundLayer
          content={{ backgroundHero: assets.heroBackgroundSrc }}
        />

        <MarketingNavbar overlay mountReveal />

        <div className="info-container relative z-10 flex flex-col items-center gap-8 px-4 pt-[118px] sm:gap-8 sm:px-6 sm:pt-[140px] lg:px-8 lg:pt-[157px]">
          <DiscountPageHero
            hero={hero}
            breadcrumbChevronSrc={assets.breadcrumbChevronSrc}
          />
        </div>
      </section>

      <DiscountCouponSection
        couponSection={couponSection}
        assets={{
          couponPercentIconSrc: assets.couponPercentIconSrc,
          signupCtaArrowSrc: assets.signupCtaArrowSrc,
        }}
      />

      <DiscountSection content={discountSection} />

      <CustomerReviewsSection showDecoration={false} />

      <GetStartedSection content={getStartedSection} />
    </main>
  )
}
