"use client"

import { useCallback, useRef } from "react"

import { LandingSectionBadge } from "@/components/shared/landing/landing-section-badge"
import { LandingSectionDescription } from "@/components/shared/landing/landing-section-description"
import { AnimatedContent } from "@/components/shared/animated-content"
import {
  LandingSectionHeadingReveal,
  landingScrollRevealProps,
} from "@/components/shared/landing/landing-section-heading-reveal"
import {
  WhyChooseUsCarousel,
  type WhyChooseUsCarouselHandle,
} from "@/components/shared/landing/why-choose-us/why-choose-us-carousel"
import { WhyChooseUsCarouselNav } from "@/components/shared/landing/why-choose-us/why-choose-us-carousel-nav"
import type { WhyChooseUsContent } from "@/types/landing/why-choose-us"

type WhyChooseUsSectionBodyProps = {
  content: WhyChooseUsContent
}

export function WhyChooseUsSectionBody({ content }: WhyChooseUsSectionBodyProps) {
  const carouselRef = useRef<WhyChooseUsCarouselHandle>(null)

  const handleCarouselRevealComplete = useCallback(() => {
    carouselRef.current?.reInit()
    carouselRef.current?.resetScroll()
  }, [])

  return (
    <div className="relative z-[1] flex w-full flex-col gap-12 py-16 md:py-20 xl:py-[80px]">
      <div className="info-container flex w-full flex-col items-center px-4 sm:px-6">
        <LandingSectionHeadingReveal className="flex w-full flex-col items-center gap-6 text-center md:items-stretch md:text-left">
        <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row md:items-start md:gap-3">
          <LandingSectionBadge label={content.badgeLabel} />

          <h2
            id="landing-why-choose-us-heading"
            className="text-center text-[32px] leading-[39px] font-semibold text-black md:flex md:flex-col md:items-end"
          >
            <span className="md:block md:w-full md:text-right">
              {content.headingLineOnePrimary}
              <br className="md:hidden" aria-hidden />
              <span className="text-[#21aeff]">{content.headingLineOneAccent}</span>
            </span>
            <span className="text-[#21aeff] max-md:before:content-['\00a0'] md:block md:w-full md:self-start md:text-left">
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
            onPrev={() => carouselRef.current?.scrollPrev()}
            onNext={() => carouselRef.current?.scrollNext()}
          />
        </div>
        </LandingSectionHeadingReveal>
      </div>

      <AnimatedContent
        className="relative w-full self-stretch overflow-x-clip"
        {...landingScrollRevealProps}
        stagger={0}
        onComplete={handleCarouselRevealComplete}
      >
        <WhyChooseUsCarousel
          ref={carouselRef}
          cards={content.cards}
          serviceIconSrc={content.serviceIconSrc}
          textArrowSrc={content.textArrowSrc}
        />
      </AnimatedContent>

      <div className="info-container flex justify-center px-4 sm:px-6 md:hidden">
        <WhyChooseUsCarouselNav
          chevronNextSrc={content.chevronNextSrc}
          chevronPrevSrc={content.chevronPrevSrc}
          onPrev={() => carouselRef.current?.scrollPrev()}
          onNext={() => carouselRef.current?.scrollNext()}
        />
      </div>
    </div>
  )
}
