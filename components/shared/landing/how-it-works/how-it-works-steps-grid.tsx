"use client"

import { useEffect, useState } from "react"

import { AnimatedContent } from "@/components/shared/animated-content"
import { HowItWorksStepColumn } from "@/components/shared/landing/how-it-works/how-it-works-step-column"
import { landingScrollRevealProps } from "@/components/shared/landing/landing-section-heading-reveal"
import type { HowItWorksStep } from "@/types/landing/how-it-works"

/** Matches Tailwind `md` — stacked steps below, 3-column grid at md+. */
const HOW_IT_WORKS_DESKTOP_MEDIA = "(min-width: 768px)"

function useHowItWorksDesktopViewport(): boolean {
  // Mobile layout first so SSR and the first client render match (avoids hydration errors).
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(HOW_IT_WORKS_DESKTOP_MEDIA)
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return isDesktop
}

type HowItWorksStepsGridProps = {
  steps: HowItWorksStep[]
}

/**
 * Mobile: each step scroll-reveals when it enters the viewport (stacked layout).
 * md+: single staggered reveal when the row enters view (unchanged).
 */
export function HowItWorksStepsGrid({ steps }: HowItWorksStepsGridProps) {
  const isDesktop = useHowItWorksDesktopViewport()

  if (isDesktop) {
    return (
      <AnimatedContent
        className="grid w-full grid-cols-1 gap-4 md:grid-cols-3"
        {...landingScrollRevealProps}
      >
        {steps.map((step) => (
          <HowItWorksStepColumn key={step.id} step={step} />
        ))}
      </AnimatedContent>
    )
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4">
      {steps.map((step) => (
        <AnimatedContent
          key={step.id}
          className="w-full min-w-0"
          {...landingScrollRevealProps}
          stagger={0}
        >
          <HowItWorksStepColumn step={step} />
        </AnimatedContent>
      ))}
    </div>
  )
}
