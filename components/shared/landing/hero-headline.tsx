import type { HeroHeadlineLine } from "@/types/landing/hero"

type HeroHeadlineProps = {
  lineOne: HeroHeadlineLine
  lineTwo: HeroHeadlineLine
}

function HeadlineSegment({
  segment,
}: {
  segment: HeroHeadlineLine["segments"][number]
}) {
  if (segment.type === "text") {
    return (
      <span className="whitespace-nowrap text-[48px] font-bold leading-[1.2] tracking-[-0.96px] text-ink">
        {segment.content}
      </span>
    )
  }

  if (segment.type === "gradient-text") {
    return (
      <span
        className="bg-clip-text text-[48px] font-bold leading-[1.2] tracking-[-0.96px] text-transparent"
        style={{ backgroundImage: segment.gradient }}
      >
        {segment.content}
      </span>
    )
  }

  return (
    <span
      className="relative h-[52px] w-[146px] shrink-0 overflow-hidden rounded-[26px] bg-[#d9d9d9]"
      aria-hidden={segment.alt ? undefined : true}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={segment.alt}
        src={segment.src}
        width={segment.width}
        height={segment.height}
        className={segment.imageClassName}
      />
    </span>
  )
}

export function HeroHeadline({ lineOne, lineTwo }: HeroHeadlineProps) {
  return (
    <h1 className="flex max-w-[653px] flex-col gap-0.5 text-[48px] font-bold leading-[1.2] tracking-[-0.96px] text-ink">
      <span className="flex flex-wrap items-center gap-3">
        {lineOne.segments.map((segment, index) => (
          <HeadlineSegment key={`line-one-${index}`} segment={segment} />
        ))}
      </span>
      <span>
        {lineTwo.segments.map((segment, index) => (
          <HeadlineSegment key={`line-two-${index}`} segment={segment} />
        ))}
      </span>
    </h1>
  )
}
