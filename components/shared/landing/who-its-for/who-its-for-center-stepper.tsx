"use client"

import Image from "next/image"
import { forwardRef } from "react"

import {
  BrandLogomarkSplit,
  WHO_ITS_FOR_CENTER_LOGOMARK,
} from "@/components/shared/landing/brand-logomark-split"
import { cn } from "@/lib/utils"

type WhoItsForCenterStepperProps = {
  stepperSrc: string
  className?: string
  /** Stepper + logomark visible after card spread. */
  revealed?: boolean
  /** Run logomark layer split when stepper is revealed. */
  logomarkSplitReveal?: boolean
}

/** Figma 25704:30539–30548 — vertical stepper + center logomark */
export const WhoItsForCenterStepper = forwardRef<
  HTMLDivElement,
  WhoItsForCenterStepperProps
>(function WhoItsForCenterStepper(
  { stepperSrc, className, revealed = false, logomarkSplitReveal = false },
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
      style={revealed ? undefined : { opacity: 0 }}
      data-slot="who-its-for-center-stepper"
    >
      <div className="relative mx-auto h-[342px] w-9">
        <Image
          src={stepperSrc}
          alt=""
          width={36}
          height={342}
          className="size-full object-contain"
          unoptimized
        />
        <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-visible rounded-xl border border-[#86d3ff] bg-white">
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
