import { landingHeroContent } from "@/data/landing/hero"
import type { HeroReviewSource } from "@/types/landing/hero"

function ServiceGoogleStars({ icons }: { icons: string[] }) {
  return (
    <div className="flex items-center">
      {icons.map((src, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${src}-${index}`}
          alt=""
          src={src}
          width={index === icons.length - 1 ? 14 : 16}
          height={index === icons.length - 1 ? 14 : 16}
          className="block max-w-none shrink-0 object-contain"
        />
      ))}
    </div>
  )
}

function ServiceTrustpilotStars({ icons }: { icons: string[] }) {
  return (
    <div className="flex items-center gap-0.5">
      {icons.map((src, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${src}-${index}`}
          alt=""
          src={src}
          width={16}
          height={16}
          className="block size-4 max-w-none shrink-0 object-contain"
        />
      ))}
    </div>
  )
}

function ServiceReviewMeta({
  review,
  variant,
}: {
  review: HeroReviewSource
  variant: "google" | "trustpilot"
}) {
  const stars =
    variant === "google" ? (
      <ServiceGoogleStars icons={review.starIcons} />
    ) : (
      <ServiceTrustpilotStars icons={review.starIcons} />
    )

  return (
    <div
      className={
        variant === "google"
          ? "flex h-10 w-[79px] flex-col items-start justify-center gap-[3px]"
          : "flex h-[41px] w-[141px] flex-col items-start gap-1"
      }
    >
      {stars}
      <p className="m-0 whitespace-nowrap font-geist text-sm font-medium leading-[1.5] text-[#232323]">
        <span className={review.rating.valueClassName}>{review.rating.value}</span>
        <span>{review.rating.suffix}</span>
      </p>
    </div>
  )
}

export function ServiceHeroReviews() {
  const [google, trustpilot] = landingHeroContent.reviews

  return (
    <div
      className="flex flex-wrap items-center gap-[15px]"
      data-slot="service-hero-review-badges"
    >
      <a
        className="flex h-10 w-[124px] shrink-0 items-center gap-[5px] no-underline text-inherit"
        href={google.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="size-10 shrink-0 object-contain"
          src={google.iconSrc}
          width={40}
          height={40}
          alt="Google"
        />
        <ServiceReviewMeta review={google} variant="google" />
      </a>

      <span
        className="hidden h-7 w-px shrink-0 rounded-full bg-[#5a5a5a] min-[360px]:block"
        aria-hidden
      />

      <a
        className="flex h-[41px] shrink-0 items-center no-underline text-inherit"
        href={trustpilot.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ServiceReviewMeta review={trustpilot} variant="trustpilot" />
      </a>
    </div>
  )
}
