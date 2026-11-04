import { LandingTorusDecoration } from "@/components/shared/landing/landing-torus-decoration"
import { landingCustomerReviewsContent } from "@/data/landing/customer-reviews"

/** Figma 25704:30984 — top-left torus (247×244) */
export function CustomerReviewsSectionDecoration() {
  return (
    <LandingTorusDecoration
      src={landingCustomerReviewsContent.decorationSrc}
      duration={32}
      reverse
      className="absolute -top-[133px] -left-[58px] z-[1] hidden h-[244px] w-[247px] xl:block"
    />
  )
}
