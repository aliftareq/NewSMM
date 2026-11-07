"use client"

import { useEffect, useRef, useState } from "react"

import { HowItWorksStepColumn } from "@/components/shared/landing/how-it-works/how-it-works-step-column"
import {
  clearHowItWorksItemMotionStyles,
  playHowItWorksEnterAnimation,
} from "@/components/shared/landing/how-it-works/how-it-works-enter-animation"
import { cn } from "@/lib/utils"
import type { HowItWorksStep } from "@/types/landing/how-it-works"

type HowItWorksStepsGridProps = {
  steps: HowItWorksStep[]
  /** Tailwind grid column classes from `md` breakpoint (default: `md:grid-cols-3`). */
  desktopGridClassName?: string
}

/**
 * Step columns rise from below the viewport, staggered left → right.
 * Service routes can override `desktopGridClassName` (e.g. 4 columns on xl).
 */
export function HowItWorksStepsGrid({
  steps,
  desktopGridClassName = "md:grid-cols-3",
}: HowItWorksStepsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const isAnimatingRef = useRef(false)
  const completeTimeoutRef = useRef<number | null>(null)
  const [hideUntilAnimated, setHideUntilAnimated] = useState(true)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return undefined

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    const getItems = () =>
      steps
        .map((_, index) => itemRefs.current[index])
        .filter((item): item is HTMLElement => item != null)

    const clearCompleteTimeout = () => {
      if (completeTimeoutRef.current != null) {
        window.clearTimeout(completeTimeoutRef.current)
        completeTimeoutRef.current = null
      }
    }

    const resetForReplay = () => {
      clearCompleteTimeout()
      isAnimatingRef.current = false
      setHideUntilAnimated(true)
      clearHowItWorksItemMotionStyles(getItems())
    }

    const revealImmediately = () => {
      clearCompleteTimeout()
      isAnimatingRef.current = false
      setHideUntilAnimated(false)
      clearHowItWorksItemMotionStyles(getItems())
    }

    const playFromViewportBottom = () => {
      if (isAnimatingRef.current) return

      const items = getItems()
      if (items.length === 0) return

      isAnimatingRef.current = true
      setHideUntilAnimated(false)

      clearCompleteTimeout()
      playHowItWorksEnterAnimation(
        items,
        () => {
          completeTimeoutRef.current = null
          isAnimatingRef.current = false
          clearHowItWorksItemMotionStyles(items)
        },
        (timeoutId) => {
          completeTimeoutRef.current = timeoutId
        },
      )
    }

    if (reducedMotion) {
      revealImmediately()
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          playFromViewportBottom()
        } else {
          resetForReplay()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    )

    observer.observe(grid)

    return () => {
      observer.disconnect()
      clearCompleteTimeout()
    }
  }, [steps])

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid w-full grid-cols-1 items-stretch gap-4",
        desktopGridClassName,
      )}
    >
      {steps.map((step, index) => (
        <HowItWorksStepColumn
          key={step.id}
          ref={(node) => {
            itemRefs.current[index] = node
          }}
          step={step}
          hideUntilAnimated={hideUntilAnimated}
        />
      ))}
    </div>
  )
}
