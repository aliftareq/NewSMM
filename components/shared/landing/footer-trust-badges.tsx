import type { FooterTrustBadge } from "@/types/landing/footer"

type FooterTrustBadgesProps = {
  badges: FooterTrustBadge[]
}

function RatingRow({
  reviewsLabel,
  rating,
  ratingStarSrc,
  starClassName = "h-[12.663px] w-[13.315px]",
}: {
  reviewsLabel: string
  rating: string
  ratingStarSrc: string
  starClassName?: string
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
      <p className="text-sm capitalize leading-6 tracking-[0.32px] text-[#a3a3a3] sm:text-base">
        {reviewsLabel}
      </p>
      <div className="flex h-6 items-center gap-[5px] rounded-[5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={ratingStarSrc} className={`block shrink-0 ${starClassName}`} />
        <span className="text-sm capitalize leading-6 tracking-[0.32px] text-[#a3a3a3] sm:text-base">
          {rating}
        </span>
      </div>
    </div>
  )
}

export function FooterTrustBadges({ badges }: FooterTrustBadgesProps) {
  return (
    <div className="flex w-full flex-col items-stretch justify-between gap-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-10 xl:justify-between xl:gap-8">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="flex min-w-0 flex-1 flex-col items-center gap-3 text-center sm:min-w-[200px] xl:min-w-0"
        >
          {badge.type === "trustpilot" ? (
            <div className="flex flex-wrap items-center justify-center gap-[5px] rounded-[5px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={badge.logo.src}
                width={badge.logo.width}
                height={badge.logo.height}
                className="block shrink-0"
              />
              <span className="text-xl capitalize leading-6 tracking-[0.32px] text-white sm:text-2xl">
                {badge.title}
              </span>
            </div>
          ) : badge.type === "google" ? (
            <div className="relative h-[30px] w-[90px] overflow-hidden">
              <div className="absolute top-0 left-1/2 h-[29px] w-[90px] -translate-x-1/2 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={badge.logo.src}
                  className="absolute inset-0 block size-full max-w-none"
                />
              </div>
            </div>
          ) : (
            <div
              className="relative overflow-hidden"
              style={{ width: badge.logo.width, height: badge.logo.height }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={badge.logo.src}
                className={`block size-full max-w-none ${badge.logo.className ?? ""}`}
              />
            </div>
          )}

          <RatingRow
            reviewsLabel={badge.reviewsLabel}
            rating={badge.rating}
            ratingStarSrc={badge.ratingStarSrc}
            starClassName={
              badge.type === "trustpilot" ? "size-3.5" : "h-[12.663px] w-[13.315px]"
            }
          />
        </div>
      ))}
    </div>
  )
}
