"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { ComparisonPanel } from "@/components/shared/landing/what-makes-us-different/comparison-panel"
import { ComparisonVsBadge } from "@/components/shared/landing/what-makes-us-different/comparison-vs-badge"
import type { WhatMakesUsDifferentContent } from "@/types/landing/what-makes-us-different"

gsap.registerPlugin(ScrollTrigger)

type WhatMakesUsDifferentComparisonProps = {
  content: WhatMakesUsDifferentContent
}

export function WhatMakesUsDifferentComparison({
  content,
}: WhatMakesUsDifferentComparisonProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const { assets } = content

  useLayoutEffect(() => {
    const root = rootRef.current
    const leftPanel = leftPanelRef.current
    const rightPanel = rightPanelRef.current
    if (!root || !leftPanel || !rightPanel) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (reduceMotion) {
      leftPanel.classList.remove("comparison-panel-entrance--left")
      rightPanel.classList.remove("comparison-panel-entrance--right")
      gsap.set([leftPanel, rightPanel], { clearProps: "all" })
      return
    }

    const finishEntrance = () => {
      leftPanel.classList.remove("comparison-panel-entrance--left")
      rightPanel.classList.remove("comparison-panel-entrance--right")
      gsap.set([leftPanel, rightPanel], { clearProps: "all" })
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          once: true,
          invalidateOnRefresh: true,
        },
        onComplete: finishEntrance,
      })

      timeline.to(
        leftPanel,
        { opacity: 1, x: 0, y: 0, duration: 0.85, ease: "power3.out" },
        0,
      )
      timeline.to(
        rightPanel,
        { opacity: 1, x: 0, y: 0, duration: 0.85, ease: "power3.out" },
        0.12,
      )

      ScrollTrigger.refresh()
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className="flex w-full min-w-0 max-w-[1320px] flex-col items-stretch gap-8 sm:gap-10 xl:flex-row xl:items-center xl:justify-between xl:gap-3"
    >
      <div
        ref={leftPanelRef}
        className="comparison-panel-entrance--left w-full min-w-0 xl:w-[460px] xl:max-w-[460px] xl:shrink-0"
      >
        <ComparisonPanel
          variant="positive"
          sideLabel={content.positiveSideLabel}
          features={content.features}
          checkIconSrc={assets.checkIconSrc}
          crossIconSrc={assets.crossIconSrc}
          logomarkSrc={assets.logomarkSrc}
          positiveBrandLinePrimary={content.positiveBrandLinePrimary}
          positiveBrandLineAccent={content.positiveBrandLineAccent}
          negativeHeaderTitle={content.negativeHeaderTitle}
        />
      </div>

      <ComparisonVsBadge className="w-full min-w-0 max-w-[340px] shrink-0 self-center xl:w-[340px]" />

      <div
        ref={rightPanelRef}
        className="comparison-panel-entrance--right w-full min-w-0 xl:w-[460px] xl:max-w-[460px] xl:shrink-0"
      >
        <ComparisonPanel
          variant="negative"
          sideLabel={content.negativeSideLabel}
          features={content.features}
          checkIconSrc={assets.checkIconSrc}
          crossIconSrc={assets.crossIconSrc}
          logomarkSrc={assets.logomarkSrc}
          positiveBrandLinePrimary={content.positiveBrandLinePrimary}
          positiveBrandLineAccent={content.positiveBrandLineAccent}
          negativeHeaderTitle={content.negativeHeaderTitle}
        />
      </div>
    </div>
  )
}
