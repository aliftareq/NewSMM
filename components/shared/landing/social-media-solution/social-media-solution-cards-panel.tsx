"use client"

import { useCallback, useRef, useState } from "react"

import { AnimatedContent } from "@/components/shared/animated-content"
import { landingScrollRevealProps } from "@/components/shared/landing/landing-section-heading-reveal"
import { SocialMediaSolutionCard } from "@/components/shared/landing/social-media-solution/social-media-solution-card"
import type { SocialMediaSolutionContent } from "@/types/landing/social-media-solution"
import { cn } from "@/lib/utils"

type SocialMediaSolutionCardsPanelProps = Pick<
  SocialMediaSolutionContent,
  "cards" | "arrowUpSrc" | "arrowDownSrc"
>

export function SocialMediaSolutionCardsPanel({
  cards,
  arrowUpSrc,
  arrowDownSrc,
}: SocialMediaSolutionCardsPanelProps) {
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToIndex = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(nextIndex, cards.length - 1))
      setActiveIndex(clamped)
      cardRefs.current[clamped]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    },
    [cards.length],
  )

  const navButtonClassName = cn(
    "group flex size-8 items-center justify-center rounded-full border border-[#21aeff] bg-white p-2.5",
    "transition-[background-color,box-shadow,border-color] duration-200",
    "hover:border-[#21aeff] hover:bg-[#21aeff] hover:shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04)]",
    "disabled:pointer-events-none disabled:opacity-40",
  )

  return (
    <div className="flex w-full items-center gap-7 lg:w-[573.398px] lg:max-w-none lg:shrink-0">
      <AnimatedContent
        className="flex w-full max-w-[513.398px] flex-col gap-4 lg:min-h-[596px] lg:justify-center"
        {...landingScrollRevealProps}
        delay={0.1}
        threshold={0.12}
      >
        {cards.map((card, index) => (
          <SocialMediaSolutionCard
            key={card.id}
            ref={(node) => {
              cardRefs.current[index] = node
            }}
            card={card}
          />
        ))}
      </AnimatedContent>

      <div
        className="hidden shrink-0 flex-col gap-2 lg:flex"
        aria-label="Solution cards navigation"
      >
        <button
          type="button"
          aria-label="Show previous solution"
          disabled={activeIndex <= 0}
          onClick={() => scrollToIndex(activeIndex - 1)}
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
          disabled={activeIndex >= cards.length - 1}
          onClick={() => scrollToIndex(activeIndex + 1)}
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
  )
}
