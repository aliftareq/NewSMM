import type { HeroReviewSource } from "@/types/landing/hero"

type HeroReviewsProps = {
  reviews: HeroReviewSource[]
}

function StarRow({ icons, sizes }: { icons: string[]; sizes: number[] }) {
  return (
    <div className="flex items-center">
      {icons.map((src, index) => (
        <span
          key={`${src}-${index}`}
          className="relative shrink-0"
          style={{ width: sizes[index], height: sizes[index] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={src} className="block size-full max-w-none" />
        </span>
      ))}
    </div>
  )
}

export function HeroReviews({ reviews }: HeroReviewsProps) {
  const [google, trustpilot] = reviews

  return (
    <div className="flex items-center gap-[15px]">
      <div className="flex items-center gap-[5px]">
        <span className="relative size-10 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={google.iconSrc}
            className="absolute inset-[6.25%_8%_6.25%_6.25%] block size-auto max-w-none"
          />
        </span>
        <div className="flex flex-col gap-[3px]">
          <StarRow
            icons={google.starIcons}
            sizes={[16, 16, 16, 16, 14]}
          />
          <p className="font-geist text-sm font-medium leading-normal text-ink whitespace-nowrap">
            <span className={google.rating.valueClassName}>
              {google.rating.value}
            </span>
            <span>{google.rating.suffix}</span>
          </p>
        </div>
      </div>

      <span className="h-7 w-px shrink-0 rounded-full bg-[#5a5a5a]" aria-hidden />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-0.5">
          <StarRow
            icons={trustpilot.starIcons}
            sizes={[16, 16, 16, 16, 16]}
          />
        </div>
        <p className="font-geist text-sm font-medium leading-normal text-ink whitespace-nowrap">
          <span className={trustpilot.rating.valueClassName}>
            {trustpilot.rating.value}
          </span>
          <span>{trustpilot.rating.suffix}</span>
        </p>
      </div>
    </div>
  )
}
