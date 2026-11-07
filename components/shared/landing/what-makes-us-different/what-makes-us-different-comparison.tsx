import { AnimatedContent } from "@/components/shared/animated-content"
import { ComparisonPanel } from "@/components/shared/landing/what-makes-us-different/comparison-panel"
import { ComparisonVsBadge } from "@/components/shared/landing/what-makes-us-different/comparison-vs-badge"
import { landingScrollRevealProps } from "@/components/shared/landing/landing-section-heading-reveal"
import type { WhatMakesUsDifferentContent } from "@/types/landing/what-makes-us-different"

const comparisonPanelRevealProps = {
  ...landingScrollRevealProps,
  duration: 1.1,
  delay: 0,
} as const

const comparisonPanelRevealDelayRight = 0.18

type WhatMakesUsDifferentComparisonProps = {
  content: WhatMakesUsDifferentContent
}

export function WhatMakesUsDifferentComparison({
  content,
}: WhatMakesUsDifferentComparisonProps) {
  const { assets } = content

  return (
    <div className="flex w-full min-w-0 max-w-[1320px] flex-col items-stretch gap-8 sm:gap-10 xl:flex-row xl:items-center xl:justify-between xl:gap-3">
      <AnimatedContent
        className="w-full min-w-0 xl:w-[460px] xl:max-w-[460px] xl:shrink-0"
        {...comparisonPanelRevealProps}
        direction="horizontal"
        reverse
        stagger={0}
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
      </AnimatedContent>

      <ComparisonVsBadge className="w-full min-w-0 max-w-[340px] shrink-0 self-center xl:w-[340px]" />

      <AnimatedContent
        className="w-full min-w-0 xl:w-[460px] xl:max-w-[460px] xl:shrink-0"
        {...comparisonPanelRevealProps}
        direction="horizontal"
        stagger={0}
        delay={comparisonPanelRevealDelayRight}
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
      </AnimatedContent>
    </div>
  )
}
