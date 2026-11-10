import { LandingSectionBadge } from "@/components/shared/landing/landing-section-badge"
import { LandingSectionDescription } from "@/components/shared/landing/landing-section-description"
import { AnimatedContent } from "@/components/shared/animated-content"
import {
  LandingSectionHeadingReveal,
  landingScrollRevealProps,
} from "@/components/shared/landing/landing-section-heading-reveal"
import { CustomerReviewsCarousel } from "@/components/shared/landing/customer-reviews/customer-reviews-carousel"
import { CustomerReviewsSectionDecoration } from "@/components/shared/landing/customer-reviews/customer-reviews-section-decoration"
import { landingCustomerReviewsContent } from "@/data/landing/customer-reviews"
import { cn } from "@/lib/utils";
import type { LandingCustomerReviewsContent } from "@/types/landing/customer-reviews";

type CustomerReviewsSectionProps = {
  content?: LandingCustomerReviewsContent
  className?: string
  /** Top-left rotating torus. Default true (landing / service). */
  showDecoration?: boolean
}

/** Figma 25704:30886 — Real Customer, Real Result / customer reviews */
export function CustomerReviewsSection({
  content = landingCustomerReviewsContent,
  className,
  showDecoration = true,
}: CustomerReviewsSectionProps) {
  return (
    <section
      data-slot="landing-customer-reviews-section"
      className={cn("relative isolate bg-white font-sans", className)}
      aria-labelledby="landing-customer-reviews-heading"
    >
      {showDecoration ? <CustomerReviewsSectionDecoration /> : null}

      <div className="relative z-[2] flex flex-col items-center gap-12 py-16 md:py-20 xl:gap-[60px] xl:py-[100px]">
        <div className="info-container flex w-full flex-col items-center px-4 sm:px-6">
          <LandingSectionHeadingReveal className="flex w-full max-w-[723px] flex-col items-center gap-3 text-center">
            <LandingSectionBadge label={content.badgeLabel} />

            <h2
              id="landing-customer-reviews-heading"
              className="text-[28px] leading-tight font-semibold text-black sm:text-[32px] sm:leading-[39px]"
            >
              {content.headingPrimary}
              <span className="text-[#21aeff]">{content.headingAccent}</span>
            </h2>

            <LandingSectionDescription>{content.description}</LandingSectionDescription>
          </LandingSectionHeadingReveal>
        </div>

        <AnimatedContent
          className="relative w-full self-stretch"
          {...landingScrollRevealProps}
        >
          <CustomerReviewsCarousel
            reviews={content.reviews}
            quoteIconSrc={content.quoteIconSrc}
            starIconSrc={content.starIconSrc}
          />
        </AnimatedContent>
      </div>
    </section>
  );
}
