"use client"

import { useRef } from "react"

import { AnimatedContent } from "@/components/shared/animated-content"
import { landingScrollRevealProps } from "@/components/shared/landing/landing-section-heading-reveal"
import { SocialMediaSolutionCardsPanel } from "@/components/shared/landing/social-media-solution/social-media-solution-cards-panel"
import type { SocialMediaSolutionContent } from "@/types/landing/social-media-solution"

type SocialMediaSolutionCardsBlockProps = Pick<
  SocialMediaSolutionContent,
  "cards" | "arrowUpSrc" | "arrowDownSrc"
>

export function SocialMediaSolutionCardsBlock({
  cards,
  arrowUpSrc,
  arrowDownSrc,
}: SocialMediaSolutionCardsBlockProps) {
  const reInitRef = useRef<() => void>(() => {})

  return (
    <AnimatedContent
      className="w-full lg:w-auto"
      {...landingScrollRevealProps}
      delay={0.1}
      stagger={0}
      threshold={0.12}
      onComplete={() => reInitRef.current()}
    >
      <SocialMediaSolutionCardsPanel
        cards={cards}
        arrowUpSrc={arrowUpSrc}
        arrowDownSrc={arrowDownSrc}
        onCarouselReady={(reInit) => {
          reInitRef.current = reInit
        }}
      />
    </AnimatedContent>
  )
}
