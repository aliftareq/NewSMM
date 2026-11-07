"use client"

import { useEffect, useState } from "react"

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { SocialMediaSolutionCard } from "@/components/shared/landing/social-media-solution/social-media-solution-card"
import type { SocialMediaSolutionContent } from "@/types/landing/social-media-solution"
import { cn } from "@/lib/utils"

type SocialMediaSolutionCardsPanelProps = Pick<
  SocialMediaSolutionContent,
  "cards" | "arrowUpSrc" | "arrowDownSrc"
> & {
  onCarouselReady?: (reInit: () => void) => void
}

const WHEEL_MASK =
  "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)"

/** Vertical feature wheel — matches TechSMM `feature-slider` (Embla loop + fixed snap). */
export function SocialMediaSolutionCardsPanel({
  cards,
  arrowUpSrc,
  arrowDownSrc,
  onCarouselReady,
}: SocialMediaSolutionCardsPanelProps) {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return undefined

    const reInit = () => api.reInit()

    onCarouselReady?.(reInit)

    const timeouts = [0, 80, 320, 900].map((ms) =>
      window.setTimeout(() => reInit(), ms),
    )

    const viewport = api.rootNode()
    const resizeObserver =
      typeof ResizeObserver !== "undefined" && viewport
        ? new ResizeObserver(() => reInit())
        : null
    resizeObserver?.observe(viewport)

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id))
      resizeObserver?.disconnect()
    }
  }, [api, onCarouselReady])

  const navButtonClassName = cn(
    "group flex size-8 items-center justify-center rounded-full border border-[#21aeff] bg-white p-2.5",
    "transition-[background-color,box-shadow,border-color] duration-200",
    "hover:border-[#21aeff] hover:bg-[#21aeff] hover:shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04)]",
  )

  return (
    <div className="flex w-full items-center gap-7 lg:w-[573.398px] lg:max-w-none lg:shrink-0">
      <div className="relative w-full max-w-[513.398px]">
        <Carousel
          setApi={setApi}
          orientation="vertical"
          className="w-full"
          opts={{
            axis: "y",
            align: "center",
            loop: true,
            containScroll: false,
            duration: 28,
            dragFree: false,
            watchDrag: true,
            watchResize: true,
          }}
        >
          <div
            className="relative max-h-[min(520px,70vh)] overflow-hidden lg:h-[596px] [&_[data-slot=carousel-content]]:h-full"
            style={{
              maskImage: WHEEL_MASK,
              WebkitMaskImage: WHEEL_MASK,
            }}
          >
            <CarouselContent className="-mt-4 h-full">
              {cards.map((card) => (
                <CarouselItem
                  key={card.id}
                  className="basis-[206px] pt-4"
                >
                  <SocialMediaSolutionCard card={card} className="h-full" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>

        <div
          className="absolute top-1/2 -right-[45px] hidden -translate-y-1/2 flex-col gap-2 lg:flex"
          aria-label="Solution cards navigation"
        >
          <button
            type="button"
            aria-label="Show previous solution"
            onClick={() => api?.scrollPrev()}
            className={navButtonClassName}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={arrowDownSrc}
              width={12}
              height={12}
              className="block size-3 rotate-180 group-hover:hidden"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={arrowUpSrc}
              width={12}
              height={12}
              className="hidden size-3 rotate-180 group-hover:block"
            />
          </button>
          <button
            type="button"
            aria-label="Show next solution"
            onClick={() => api?.scrollNext()}
            className={navButtonClassName}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={arrowDownSrc}
              width={12}
              height={12}
              className="block size-3 -scale-y-100 rotate-180 group-hover:hidden"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={arrowUpSrc}
              width={12}
              height={12}
              className="hidden size-3 -scale-y-100 rotate-180 group-hover:block"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
