"use client"

import Image from "next/image"

import { HowItWorksPickServiceIllustration } from "@/components/shared/landing/how-it-works/how-it-works-pick-service-illustration"
import type { HowItWorksStep } from "@/types/landing/how-it-works"

export function HowItWorksStepIllustration({ step }: { step: HowItWorksStep }) {
  if (step.illustrationKind === "pick-service-carousel") {
    return <HowItWorksPickServiceIllustration />
  }

  return (
    <Image
      src={step.illustrationSrc}
      alt=""
      width={step.illustrationWidth}
      height={step.illustrationHeight}
      className="h-auto max-h-[160px] w-auto max-w-full"
      unoptimized
    />
  )
}
