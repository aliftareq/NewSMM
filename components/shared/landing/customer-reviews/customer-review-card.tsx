import Image from "next/image"

import type { LandingCustomerReview } from "@/types/landing/customer-reviews"

type CustomerReviewCardProps = {
  review: LandingCustomerReview
  quoteIconSrc: string
  starIconSrc: string
}

export function CustomerReviewCard({
  review,
  quoteIconSrc,
  starIconSrc,
}: CustomerReviewCardProps) {
  return (
    <article
      data-slot="landing-customer-review-card"
      className="w-[455px] max-w-[calc(100vw-2rem)] shrink-0 rounded-[20px] bg-[#f1f2f1] p-5 sm:max-w-none"
    >
      <div className="flex w-full max-w-[415px] flex-col gap-3.5">
        <div className="flex flex-col items-center justify-center rounded-[19px] bg-white p-7">
          <div className="flex w-full max-w-[348px] flex-col items-center gap-5">
            <Image
              src={quoteIconSrc}
              alt=""
              width={38}
              height={38}
              className="size-[38px]"
              unoptimized
            />
            <div className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: review.rating }, (_, index) => (
                <Image
                  key={index}
                  src={starIconSrc}
                  alt=""
                  width={24}
                  height={24}
                  className="size-6"
                  unoptimized
                />
              ))}
            </div>
            <p className="text-center text-base leading-[1.35] font-medium text-[rgba(0,0,0,0.8)]">
              &ldquo;{review.quote}&rdquo;
            </p>
          </div>
        </div>

        <div className="rounded-[19px] bg-white px-6 py-[27px]">
          <div className="flex items-center gap-3">
            <div className="relative size-[62px] shrink-0 overflow-hidden rounded-xl bg-[#f4f4f4]">
              <Image
                src={review.avatarSrc}
                alt={review.avatarAlt}
                fill
                className="object-cover"
                sizes="65px"
              />
            </div>
            <div className="min-w-0 flex flex-col gap-2">
              <p className="text-xl leading-[1.15] font-semibold tracking-[0.01em] text-[#222e48]">
                {review.authorName}
              </p>
              <p className="text-base leading-[1.15] font-medium tracking-[0.01em] text-[#222e48]">
                {review.authorRole}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
