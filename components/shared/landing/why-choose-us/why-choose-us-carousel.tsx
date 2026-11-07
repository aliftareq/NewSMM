"use client"

import useEmblaCarousel from "embla-carousel-react"
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react"

import { WhyChooseUsFeatureCard } from "@/components/shared/landing/why-choose-us/why-choose-us-feature-card"
import { cn } from "@/lib/utils"
import type { WhyChooseUsContent } from "@/types/landing/why-choose-us"

export type WhyChooseUsCarouselNavState = {
  canScrollPrev: boolean
  canScrollNext: boolean
}

export type WhyChooseUsCarouselHandle = {
  scrollPrev: () => void
  scrollNext: () => void
  resetScroll: () => void
  reInit: () => void
}

type WhyChooseUsCarouselProps = Pick<
  WhyChooseUsContent,
  "cards" | "serviceIconSrc" | "textArrowSrc"
> & {
  className?: string
  onNavStateChange?: (state: WhyChooseUsCarouselNavState) => void
}

export const WhyChooseUsCarousel = forwardRef<
  WhyChooseUsCarouselHandle,
  WhyChooseUsCarouselProps
>(function WhyChooseUsCarousel(
  { cards, serviceIconSrc, textArrowSrc, className, onNavStateChange },
  ref
) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: false,
    dragFree: false,
    duration: 28,
    skipSnaps: false,
    slidesToScroll: 1,
    watchDrag: true,
    watchResize: true,
  })

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const resetScroll = useCallback(() => {
    emblaApi?.scrollTo(0, true)
  }, [emblaApi])

  const reInit = useCallback(() => {
    emblaApi?.reInit()
  }, [emblaApi])

  useImperativeHandle(ref, () => ({
    scrollPrev,
    scrollNext,
    resetScroll,
    reInit,
  }))

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.scrollTo(0, true)

    const syncNavState = () => {
      onNavStateChange?.({
        canScrollPrev: emblaApi.canScrollPrev(),
        canScrollNext: emblaApi.canScrollNext(),
      })
    }

    syncNavState()
    emblaApi.on("select", syncNavState)
    emblaApi.on("reInit", syncNavState)

    return () => {
      emblaApi.off("select", syncNavState)
      emblaApi.off("reInit", syncNavState)
    }
  }, [emblaApi, onNavStateChange])

  return (
    <div
      className={cn("why-choose-us-embla relative w-full", className)}
      data-slot="why-choose-us-carousel-shell"
    >
      <div
        ref={emblaRef}
        className="why-choose-us-embla__viewport"
        data-slot="why-choose-us-carousel"
        aria-label="Why choose us services"
      >
        <div className="why-choose-us-embla__container">
          {cards.map((card) => (
            <div
              key={card.id}
              className="why-choose-us-embla__slide"
              data-slot="why-choose-us-card-slide"
            >
              <WhyChooseUsFeatureCard
                card={card}
                serviceIconSrc={serviceIconSrc}
                textArrowSrc={textArrowSrc}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
