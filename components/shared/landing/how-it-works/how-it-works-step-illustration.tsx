"use client"

import Image from "next/image"

import { HowItWorksEnterUsernameIllustration } from "@/components/shared/landing/how-it-works/how-it-works-enter-username-illustration"
import { HowItWorksPickServiceIllustration } from "@/components/shared/landing/how-it-works/how-it-works-pick-service-illustration"
import { HowItWorksWatchGrowIllustration } from "@/components/shared/landing/how-it-works/how-it-works-watch-grow-illustration"
import type { HowItWorksStep } from "@/types/landing/how-it-works"

export function HowItWorksStepIllustration({ step }: { step: HowItWorksStep }) {
  if (step.illustrationKind === "pick-service-carousel") {
    return <HowItWorksPickServiceIllustration />
  }

  if (step.id === "enter-username") {
    return <HowItWorksEnterUsernameIllustration />
  }

  if (step.id === "watch-grow") {
    return <HowItWorksWatchGrowIllustration />
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
