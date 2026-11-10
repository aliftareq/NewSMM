import { forwardRef } from "react"

import { HowItWorksStepIllustration } from "@/components/shared/landing/how-it-works/how-it-works-step-illustration"
import { cn } from "@/lib/utils"
import type { HowItWorksStep } from "@/types/landing/how-it-works"

type HowItWorksStepColumnProps = {
  step: HowItWorksStep
  hideUntilAnimated?: boolean
  className?: string
}

export const HowItWorksStepColumn = forwardRef<
  HTMLElement,
  HowItWorksStepColumnProps
>(function HowItWorksStepColumn(
  { step, hideUntilAnimated = false, className },
  ref,
) {
  return (
    <article
      ref={ref}
      data-slot="how-it-works-step"
      className={cn(
        "flex min-w-0 flex-1 flex-col will-change-transform",
        hideUntilAnimated && "opacity-0",
        className,
      )}
    >
      <div className="flex h-[78px] shrink-0 items-center justify-center rounded-2xl bg-[#269de7] p-6 shadow-[0px_6px_8px_0px_rgba(0,0,0,0.12)]">
        <p className="w-full text-center text-2xl font-medium leading-none text-white">
          {step.stepLabel}
        </p>
      </div>

      <div className="flex h-[200px] shrink-0 items-center justify-center border-x border-dashed border-[#dfe0e4] px-6 py-5">
        <HowItWorksStepIllustration step={step} />
      </div>

      <div className="flex min-h-[132px] flex-1 flex-col justify-center rounded-2xl bg-[#f5f6f7] p-6">
        <h3 className="text-xl font-medium leading-[1.3] text-[#13203b]">{step.title}</h3>
        <p className="mt-2 text-sm font-medium leading-[1.35] text-n600">
          {step.description}
        </p>
      </div>
    </article>
  )
})
