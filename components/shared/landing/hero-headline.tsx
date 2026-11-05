import type { HeroHeadlineLine } from "@/types/landing/hero"
import { cn } from "@/lib/utils"

type HeroHeadlineProps = {
  lineOne: HeroHeadlineLine
  lineTwo: HeroHeadlineLine
}

const HEADLINE_SIZE =
  "text-[26px] font-bold leading-[1.2] tracking-[-0.52px] sm:text-[36px] sm:tracking-[-0.72px] lg:text-[48px] lg:tracking-[-0.96px]"

const HEADLINE_TEXT = cn(HEADLINE_SIZE, "text-ink")

function HeadlineSegment({
  segment,
}: {
  segment: HeroHeadlineLine["segments"][number]
}) {
  if (segment.type === "text") {
    return (
      <span className={cn("whitespace-nowrap", HEADLINE_TEXT)}>
        {segment.content}
      </span>
    )
  }

  if (segment.type === "gradient-text") {
    return (
      <span
        className={cn("bg-clip-text text-transparent", HEADLINE_SIZE)}
        style={{ backgroundImage: segment.gradient }}
      >
        {segment.content}
      </span>
    )
  }

  return (
    <span
      className="relative h-8 w-[84px] shrink-0 overflow-hidden rounded-2xl bg-[#d9d9d9] sm:h-11 sm:w-[120px] sm:rounded-[22px] lg:h-[52px] lg:w-[146px] lg:rounded-[26px]"
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
  const [lineOneLead, ...lineOneRest] = lineOne.segments

  return (
    <h1
      className={cn(
        "flex max-w-[653px] flex-col gap-0.5",
        HEADLINE_TEXT,
      )}
    >
      <span className="flex flex-col items-start gap-1.5 lg:flex-row lg:flex-wrap lg:items-center lg:gap-3">
        {lineOneLead ? (
          <HeadlineSegment key="line-one-lead" segment={lineOneLead} />
        ) : null}
        {lineOneRest.length > 0 ? (
          <span className="flex flex-nowrap items-center gap-1.5 sm:gap-2 lg:contents">
            {lineOneRest.map((segment, index) => (
              <HeadlineSegment key={`line-one-rest-${index}`} segment={segment} />
            ))}
          </span>
        ) : null}
      </span>
      <span>
        {lineTwo.segments.map((segment, index) => (
          <HeadlineSegment key={`line-two-${index}`} segment={segment} />
        ))}
      </span>
    </h1>
  )
}
