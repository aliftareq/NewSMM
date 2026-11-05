"use client"

import { useSyncExternalStore } from "react"

import { AnimatedContent } from "@/components/shared/animated-content"
import { HowItWorksStepColumn } from "@/components/shared/landing/how-it-works/how-it-works-step-column"
import { landingScrollRevealProps } from "@/components/shared/landing/landing-section-heading-reveal"
import { cn } from "@/lib/utils"
import type { HowItWorksStep } from "@/types/landing/how-it-works"

/** Matches Tailwind `md` — stacked steps below, 3-column grid at md+. */
const HOW_IT_WORKS_DESKTOP_MEDIA = "(min-width: 768px)"

function subscribeHowItWorksDesktop(onStoreChange: () => void) {
  const mq = window.matchMedia(HOW_IT_WORKS_DESKTOP_MEDIA)
  mq.addEventListener("change", onStoreChange)
  return () => mq.removeEventListener("change", onStoreChange)
}

function getHowItWorksDesktopSnapshot() {
  return window.matchMedia(HOW_IT_WORKS_DESKTOP_MEDIA).matches
}

function getHowItWorksDesktopServerSnapshot() {
  return false
}

function useHowItWorksDesktopViewport(): boolean {
  return useSyncExternalStore(
    subscribeHowItWorksDesktop,
    getHowItWorksDesktopSnapshot,
    getHowItWorksDesktopServerSnapshot,
  )
}

type HowItWorksStepsGridProps = {
  steps: HowItWorksStep[]
  /** Tailwind grid column classes from `md` breakpoint (default: `md:grid-cols-3`). */
  desktopGridClassName?: string
}

/**
 * Mobile: each step scroll-reveals when it enters the viewport (stacked layout).
 * md+: single staggered reveal when the row enters view (unchanged).
 */
export function HowItWorksStepsGrid({
  steps,
  desktopGridClassName = "md:grid-cols-3",
}: HowItWorksStepsGridProps) {
  const isDesktop = useHowItWorksDesktopViewport()
  const gridColumnsClassName = desktopGridClassName

  if (isDesktop) {
    return (
      <AnimatedContent
        className={cn(
          "grid w-full grid-cols-1 items-stretch gap-4",
          gridColumnsClassName,
        )}
        {...landingScrollRevealProps}
      >
        {steps.map((step) => (
          <div key={step.id} className="flex h-full min-h-0 min-w-0">
            <HowItWorksStepColumn step={step} />
          </div>
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
