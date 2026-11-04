import {
  WhatMakesUsDifferentComparison,
  WhatMakesUsDifferentHeader,
} from "@/components/shared/landing/what-makes-us-different/what-makes-us-different-section-body"
import { landingWhatMakesUsDifferentContent } from "@/data/landing/what-makes-us-different"
import { cn } from "@/lib/utils"
import type { WhatMakesUsDifferentContent } from "@/types/landing/what-makes-us-different"

type WhatMakesUsDifferentSectionProps = {
  content?: WhatMakesUsDifferentContent
  className?: string
}

/** Figma 25704:30634 — What Makes Us Different / our-platforms comparison */
export function WhatMakesUsDifferentSection({
  content = landingWhatMakesUsDifferentContent,
  className,
}: WhatMakesUsDifferentSectionProps) {
  return (
    <section
      data-slot="landing-what-makes-us-different-section"
      className={cn("relative bg-white font-sans", className)}
      aria-labelledby="landing-what-makes-us-different-heading"
    >
      <div className="info-container flex flex-col items-center gap-12 px-4 py-16 sm:px-6 md:gap-12 md:py-20 xl:gap-12 xl:py-[80px]">
        <WhatMakesUsDifferentHeader content={content} />
        <WhatMakesUsDifferentComparison content={content} />
      </div>
    </section>
  )
}
