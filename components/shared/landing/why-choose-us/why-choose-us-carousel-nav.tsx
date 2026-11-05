import Image from "next/image"

import { cn } from "@/lib/utils"
import type { WhyChooseUsContent } from "@/types/landing/why-choose-us"

type WhyChooseUsCarouselNavProps = Pick<
  WhyChooseUsContent,
  "chevronNextSrc" | "chevronPrevSrc"
> & {
  onPrev: () => void
  onNext: () => void
  canScrollPrev?: boolean
  canScrollNext?: boolean
  className?: string
}

const navButtonClassName = cn(
  "why-choose-us-carousel-nav__button group flex size-10 shrink-0 items-center justify-center rounded-full border border-[#1698e3] bg-white p-2",
  "touch-manipulation transition-colors duration-150 outline-none select-none",
  "hover:enabled:bg-[#1698e3] active:enabled:bg-[#1698e3]",
  "focus-visible:ring-[3px] focus-visible:ring-[#1698e3]/35",
  "disabled:pointer-events-none disabled:border-[#b8dff5] disabled:bg-white",
)

type NavChevronProps = {
  defaultSrc: string
  hoverSrc: string
  hoverClassName?: string
  defaultClassName?: string
  enabled: boolean
}

function NavChevron({
  defaultSrc,
  hoverSrc,
  hoverClassName,
  defaultClassName,
  enabled,
}: NavChevronProps) {
  return (
    <span className="relative flex size-[22px] items-center justify-center">
      <Image
        src={defaultSrc}
        alt=""
        width={23}
        height={23}
        unoptimized
        className={cn(
          "why-choose-us-carousel-nav__icon-default size-[22px] transition-opacity duration-150",
          enabled && "group-hover:opacity-0 group-active:opacity-0",
          !enabled && "opacity-40",
          defaultClassName
        )}
      />
      {enabled ? (
        <Image
          src={hoverSrc}
          alt=""
          width={23}
          height={23}
          unoptimized
          className={cn(
            "why-choose-us-carousel-nav__icon-hover absolute size-[22px] opacity-0 transition-opacity duration-150",
            "group-hover:opacity-100 group-active:opacity-100",
            hoverClassName
          )}
        />
      ) : null}
    </span>
  )
}

export function WhyChooseUsCarouselNav({
  chevronNextSrc,
  chevronPrevSrc,
  onPrev,
  onNext,
  canScrollPrev = false,
  canScrollNext = true,
  className,
}: WhyChooseUsCarouselNavProps) {
  return (
    <div className={cn("why-choose-us-carousel-nav flex items-center gap-2", className)}>
      <button
        type="button"
        aria-label="Previous services"
        disabled={!canScrollPrev}
        onClick={onPrev}
        className={navButtonClassName}
      >
        <NavChevron
          defaultSrc={chevronPrevSrc}
          hoverSrc={chevronNextSrc}
          hoverClassName="-scale-x-100"
          enabled={canScrollPrev}
        />
      </button>
      <button
        type="button"
        aria-label="Next services"
        disabled={!canScrollNext}
        onClick={onNext}
        className={navButtonClassName}
      >
        <NavChevron
          defaultSrc={chevronPrevSrc}
          hoverSrc={chevronNextSrc}
          defaultClassName="rotate-180"
          enabled={canScrollNext}
        />
      </button>
    </div>
  )
}
