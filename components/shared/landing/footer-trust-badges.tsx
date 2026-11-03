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
    <div className="flex items-center justify-center gap-2">
      <p className="text-base capitalize leading-6 tracking-[0.32px] text-[#a3a3a3]">
        {reviewsLabel}
      </p>
      <div className="flex h-6 items-center gap-[5px] rounded-[5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={ratingStarSrc} className={`block shrink-0 ${starClassName}`} />
        <span className="text-base capitalize leading-6 tracking-[0.32px] text-[#a3a3a3]">
          {rating}
        </span>
      </div>
    </div>
  )
}

export function FooterTrustBadges({ badges }: FooterTrustBadgesProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="flex flex-col items-center gap-3 text-center"
        >
          {badge.type === "trustpilot" ? (
            <div className="flex items-center gap-[5px] rounded-[5px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={badge.logo.src}
                width={badge.logo.width}
                height={badge.logo.height}
                className="block shrink-0"
              />
              <span className="text-2xl capitalize leading-6 tracking-[0.32px] text-white">
                {badge.title}
              </span>
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
