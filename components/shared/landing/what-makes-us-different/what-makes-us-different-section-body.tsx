import { LandingSectionBadge } from "@/components/shared/landing/landing-section-badge"
import { LandingSectionDescription } from "@/components/shared/landing/landing-section-description"
import type { WhatMakesUsDifferentContent } from "@/types/landing/what-makes-us-different"

export { WhatMakesUsDifferentComparison } from "@/components/shared/landing/what-makes-us-different/what-makes-us-different-comparison"

type WhatMakesUsDifferentHeaderProps = {
  content: WhatMakesUsDifferentContent
}

export function WhatMakesUsDifferentHeader({
  content,
}: WhatMakesUsDifferentHeaderProps) {
  return (
    <div className="flex w-full max-w-[760px] flex-col items-center gap-3 text-center">
      <LandingSectionBadge label={content.badgeLabel} />

      <h2
        id="landing-what-makes-us-different-heading"
        className="text-[clamp(1.5rem,5vw,2rem)] font-semibold leading-tight text-black sm:text-[32px] sm:leading-[39px]"
      >
        {content.headingPrimary}
        <span className="text-[#21aeff]">{content.headingAccent}</span>
      </h2>

      <LandingSectionDescription>{content.description}</LandingSectionDescription>
    </div>
  )
}
