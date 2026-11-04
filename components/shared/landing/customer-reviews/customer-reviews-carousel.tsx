import { CustomerReviewCard } from "@/components/shared/landing/customer-reviews/customer-review-card"
import type { LandingCustomerReviewsContent } from "@/types/landing/customer-reviews"

type CustomerReviewsCarouselProps = Pick<
  LandingCustomerReviewsContent,
  "reviews" | "quoteIconSrc" | "starIconSrc"
>

export function CustomerReviewsCarousel({
  reviews,
  quoteIconSrc,
  starIconSrc,
}: CustomerReviewsCarouselProps) {
  if (!reviews.length) return null

  const loop = [...reviews, ...reviews, ...reviews]

  return (
    <div
      data-slot="landing-customer-reviews-carousel"
      className="relative w-full self-stretch overflow-hidden"
      aria-label="Customer reviews"
      role="region"
    >
      <div className="customer-reviews-marquee-track flex w-max items-center gap-5 will-change-transform">
        {loop.map((review, index) => (
          <CustomerReviewCard
            key={`${review.id}-${index}`}
            review={review}
            quoteIconSrc={quoteIconSrc}
            starIconSrc={starIconSrc}
          />
        ))}
      </div>
    </div>
  )
}
