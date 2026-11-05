"use client"

import { useEffect } from "react"

import type { HeroReviewSource } from "@/types/landing/hero"

type HeroReviewsProps = {
  reviews: HeroReviewSource[]
}

function HeroStarsRow({ icons }: { icons: string[] }) {
  return (
    <div className="hero-stars-row flex shrink-0 items-center gap-0.5">
      {icons.map((src, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${src}-${index}`}
            alt=""
            src={src}
            width={13}
            height={13}
            className="hero-star-pop block size-[13px] max-w-none shrink-0 object-contain"
          />
        ))}
    </div>
  )
}

function ReviewMeta({ review }: { review: HeroReviewSource }) {
  return (
    <div className="flex h-10 shrink-0 flex-col justify-center gap-0.5">
      <HeroStarsRow icons={review.starIcons} />
      <p className="m-0 font-geist text-sm font-medium leading-none text-ink whitespace-nowrap">
        <span className={review.rating.valueClassName}>{review.rating.value}</span>
        <span>{review.rating.suffix}</span>
      </p>
    </div>
  )
}

export function HeroReviews({ reviews }: HeroReviewsProps) {
  const [google, trustpilot] = reviews

  useEffect(() => {
    const start = () => {
      document.documentElement.classList.add("hero-animations-ready")
    }

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }

    const id = globalThis.setTimeout(start, 300)
    return () => globalThis.clearTimeout(id)
  }, [])

  return (
    <div
      className="flex flex-wrap items-center gap-[15px]"
      data-slot="hero-review-badges"
    >
      <a
        className="flex w-fit max-w-full shrink-0 items-center gap-1.5 no-underline text-inherit"
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
        <ReviewMeta review={google} />
      </a>

      <span
        className="hidden h-7 w-px shrink-0 rounded-full bg-[#5a5a5a] min-[360px]:block"
        aria-hidden
      />

      <a
        className="flex h-10 w-fit max-w-full shrink-0 items-center gap-1.5 no-underline text-inherit"
        href={trustpilot.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ReviewMeta review={trustpilot} />
      </a>
    </div>
  )
}
