"use client"

import { useCallback, useRef, useState } from "react"

import { LandingSectionDescription } from "@/components/shared/landing/landing-section-description"
import {
  WhyChooseUsCarousel,
  type WhyChooseUsCarouselHandle,
  type WhyChooseUsCarouselNavState,
} from "@/components/shared/landing/why-choose-us/why-choose-us-carousel"
import { WhyChooseUsCarouselNav } from "@/components/shared/landing/why-choose-us/why-choose-us-carousel-nav"
import type { WhyChooseUsContent } from "@/types/landing/why-choose-us"

type WhyChooseUsSectionBodyProps = {
  content: WhyChooseUsContent
}

export function WhyChooseUsSectionBody({ content }: WhyChooseUsSectionBodyProps) {
  const carouselRef = useRef<WhyChooseUsCarouselHandle>(null)
  const [navState, setNavState] = useState<WhyChooseUsCarouselNavState>({
    canScrollPrev: false,
    canScrollNext: true,
  })

  const handleNavStateChange = useCallback((state: WhyChooseUsCarouselNavState) => {
    setNavState(state)
  }, [])

  return (
    <div className="relative z-[1] flex w-full flex-col gap-12 py-16 md:py-20 xl:py-[80px]">
      <div className="info-container flex w-full flex-col items-center gap-6 px-4 text-center sm:px-6 md:items-stretch md:text-left">
        <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row md:items-start md:gap-3">
          <div className="rounded-[33px] border-[0.5px] border-[#e8e8e3] bg-white/50 p-1">
            <div className="rounded-full border border-white bg-[#fafafa] px-3 py-1.5 shadow-[0px_2px_3px_rgba(183,183,183,0.25)]">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-1 shrink-0 rounded-full border-2 border-[rgba(96,96,171,0.15)] bg-[#21aeff]"
                />
                <p className="text-xs leading-normal font-medium text-[#21aeff]">
                  {content.badgeLabel}
                </p>
              </div>
            </div>
          </div>

          <h2
            id="landing-why-choose-us-heading"
            className="text-center text-[32px] leading-[39px] font-semibold text-black md:text-right"
          >
            {content.headingLineOnePrimary}
            <br className="md:hidden" aria-hidden />
            <span className="text-[#21aeff]">{content.headingLineOneAccent}</span>
            <br className="hidden md:block" aria-hidden />
            <span className="text-[#21aeff] max-md:before:content-['\00a0'] md:before:content-none">
              {content.headingLineTwoAccent}
            </span>
          </h2>
        </div>

        <div className="flex w-full flex-col items-stretch justify-between gap-6 md:flex-row md:items-start md:gap-4">
          <div className="w-full md:max-w-[428px]">
            <LandingSectionDescription>{content.description}</LandingSectionDescription>
          </div>
          <WhyChooseUsCarouselNav
            className="hidden md:flex"
            chevronNextSrc={content.chevronNextSrc}
            chevronPrevSrc={content.chevronPrevSrc}
            canScrollPrev={navState.canScrollPrev}
            canScrollNext={navState.canScrollNext}
            onPrev={() => carouselRef.current?.scrollPrev()}
            onNext={() => carouselRef.current?.scrollNext()}
          />
        </div>
      </div>

      <WhyChooseUsCarousel
        ref={carouselRef}
        cards={content.cards}
        serviceIconSrc={content.serviceIconSrc}
        textArrowSrc={content.textArrowSrc}
        onNavStateChange={handleNavStateChange}
      />

      <div className="info-container flex justify-center px-4 sm:px-6 md:hidden">
        <WhyChooseUsCarouselNav
          chevronNextSrc={content.chevronNextSrc}
          chevronPrevSrc={content.chevronPrevSrc}
          canScrollPrev={navState.canScrollPrev}
          canScrollNext={navState.canScrollNext}
          onPrev={() => carouselRef.current?.scrollPrev()}
          onNext={() => carouselRef.current?.scrollNext()}
        />
      </div>
    </div>
  )
}
