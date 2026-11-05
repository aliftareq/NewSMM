"use client"

import { forwardRef } from "react"

import {
  BrandLogomarkSplit,
  WHO_ITS_FOR_CENTER_LOGOMARK,
} from "@/components/shared/landing/brand-logomark-split"
import { WhoItsForCenterStepperGraphic } from "@/components/shared/landing/who-its-for/who-its-for-center-stepper-graphic"
import { cn } from "@/lib/utils"

type WhoItsForCenterStepperProps = {
  className?: string
  /** Mount logomark in stacked state before center reveal animation. */
  revealed?: boolean
  /** Run logomark layer split after center column is visible. */
  logomarkSplitReveal?: boolean
}

/** Figma 25704:30539–30548 — vertical stepper + center logomark */
export const WhoItsForCenterStepper = forwardRef<
  HTMLDivElement,
  WhoItsForCenterStepperProps
>(function WhoItsForCenterStepper(
  { className, revealed = false, logomarkSplitReveal = false },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "relative hidden w-9 shrink-0 self-center lg:block",
        className,
      )}
      data-slot="who-its-for-center-stepper"
    >
      <div className="relative mx-auto h-[342px] w-9">
        <WhoItsForCenterStepperGraphic />
        <div
          data-slot="who-its-for-logomark-anchor"
          className="absolute left-1/2 top-1/2 z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-visible rounded-xl border border-[#86d3ff] bg-white"
        >
          <div className="relative h-9 w-[46px] overflow-visible">
            <BrandLogomarkSplit
              {...WHO_ITS_FOR_CENTER_LOGOMARK}
              className="size-full max-w-none"
              holdStacked={revealed && !logomarkSplitReveal}
              splitReveal={logomarkSplitReveal}
            />
          </div>
        </div>
      </div>
    </div>
  )
})

WhoItsForCenterStepper.displayName = "WhoItsForCenterStepper"
