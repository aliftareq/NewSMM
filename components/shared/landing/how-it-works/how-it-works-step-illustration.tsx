"use client"

import Image from "next/image"

import { HowItWorksEnterUsernameIllustration } from "@/components/shared/landing/how-it-works/how-it-works-enter-username-illustration"
import { HowItWorksPickServiceIllustration } from "@/components/shared/landing/how-it-works/how-it-works-pick-service-illustration"
import { HowItWorksWatchGrowIllustration } from "@/components/shared/landing/how-it-works/how-it-works-watch-grow-illustration"
import { HowItWorksConfirmProfileIllustration } from "@/components/shared/service/how-it-works-confirm-profile-illustration"
import { HowItWorksCompleteCheckoutIllustration } from "@/components/shared/service/how-it-works-complete-checkout-illustration"
import type { HowItWorksStep } from "@/types/landing/how-it-works"

export function HowItWorksStepIllustration({ step }: { step: HowItWorksStep }) {
  const kind =
    step.illustrationKind ??
    (step.id === "enter-username"
      ? "enter-username"
      : step.id === "watch-grow"
        ? "watch-grow"
        : "static")

  if (kind === "pick-service-carousel") {
    return <HowItWorksPickServiceIllustration />
  }

  if (kind === "enter-username") {
    return <HowItWorksEnterUsernameIllustration />
  }

  if (kind === "watch-grow") {
    return <HowItWorksWatchGrowIllustration />
  }

  if (kind === "confirm-profile") {
    return <HowItWorksConfirmProfileIllustration />
  }

  if (kind === "complete-checkout") {
    return <HowItWorksCompleteCheckoutIllustration />
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
