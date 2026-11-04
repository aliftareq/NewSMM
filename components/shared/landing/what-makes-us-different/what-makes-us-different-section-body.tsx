import { ComparisonPanel } from "@/components/shared/landing/what-makes-us-different/comparison-panel"
import { ComparisonVsBadge } from "@/components/shared/landing/what-makes-us-different/comparison-vs-badge"
import { LandingSectionDescription } from "@/components/shared/landing/landing-section-description"
import type { WhatMakesUsDifferentContent } from "@/types/landing/what-makes-us-different"

type WhatMakesUsDifferentComparisonProps = {
  content: WhatMakesUsDifferentContent
}

export function WhatMakesUsDifferentComparison({
  content,
}: WhatMakesUsDifferentComparisonProps) {
  const { assets } = content

  return (
    <div className="flex w-full max-w-[1320px] flex-col items-center gap-10 xl:flex-row xl:items-center xl:justify-between xl:gap-3">
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

      <ComparisonVsBadge className="w-full max-w-[340px] shrink-0 self-center xl:w-[340px]" />

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
  )
}

type WhatMakesUsDifferentHeaderProps = {
  content: WhatMakesUsDifferentContent
}

export function WhatMakesUsDifferentHeader({
  content,
}: WhatMakesUsDifferentHeaderProps) {
  return (
    <div className="flex w-full max-w-[760px] flex-col items-center gap-3 text-center">
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
        id="landing-what-makes-us-different-heading"
        className="text-[32px] font-semibold leading-[39px] text-black"
      >
        {content.headingPrimary}
        <span className="text-[#21aeff]">{content.headingAccent}</span>
      </h2>

      <LandingSectionDescription>{content.description}</LandingSectionDescription>
    </div>
  )
}
