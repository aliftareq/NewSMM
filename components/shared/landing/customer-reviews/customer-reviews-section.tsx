import { LandingSectionDescription } from "@/components/shared/landing/landing-section-description"
import { CustomerReviewsCarousel } from "@/components/shared/landing/customer-reviews/customer-reviews-carousel"
import { CustomerReviewsSectionDecoration } from "@/components/shared/landing/customer-reviews/customer-reviews-section-decoration"
import { landingCustomerReviewsContent } from "@/data/landing/customer-reviews"
import { cn } from "@/lib/utils";
import type { LandingCustomerReviewsContent } from "@/types/landing/customer-reviews";

type CustomerReviewsSectionProps = {
  content?: LandingCustomerReviewsContent;
  className?: string;
};

/** Figma 25704:30886 — Real Customer, Real Result / customer reviews */
export function CustomerReviewsSection({
  content = landingCustomerReviewsContent,
  className,
}: CustomerReviewsSectionProps) {
  return (
    <section
      data-slot="landing-customer-reviews-section"
      className={cn("relative isolate bg-white font-sans", className)}
      aria-labelledby="landing-customer-reviews-heading"
    >
      <CustomerReviewsSectionDecoration />

      <div className="relative z-[2] flex flex-col items-center gap-12 py-16 md:py-20 xl:gap-[60px] xl:py-[100px]">
        <div className="info-container flex w-full flex-col items-center px-4 sm:px-6">
          <div className="flex w-full max-w-[723px] flex-col items-center gap-3 text-center">
            <div className="rounded-[33px] border-[0.5px] border-[#e8e8e3] bg-white/50 p-1">
              <div className="rounded-full border border-white bg-[#fafafa] px-3 py-1.5 shadow-[0px_2px_3px_rgba(183,183,183,0.25)]">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="size-1 shrink-0 rounded-full border-2 border-[rgba(96,96,171,0.15)] bg-[#21aeff]"
                  />
                  <p className="text-xs leading-normal font-medium text-[#21aeff]">
                    {content.badgeLabel}
                  </p>
                </div>
              </div>
            </div>

            <h2
              id="landing-customer-reviews-heading"
              className="text-[28px] leading-tight font-semibold text-black sm:text-[32px] sm:leading-[39px]"
            >
              {content.headingPrimary}
              <span className="text-[#21aeff]">{content.headingAccent}</span>
            </h2>

            <LandingSectionDescription>{content.description}</LandingSectionDescription>
          </div>
        </div>

        <CustomerReviewsCarousel
          reviews={content.reviews}
          quoteIconSrc={content.quoteIconSrc}
          starIconSrc={content.starIconSrc}
        />
      </div>
    </section>
  );
}
