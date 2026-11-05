"use client"

import {
  AnimatedContent,
  type AnimatedContentProps,
} from "@/components/shared/animated-content"

/** Default scroll-in preset for landing section intros (matches How it works). */
export const landingScrollRevealProps = {
  distance: 100,
  direction: "vertical" as const,
  duration: 0.8,
  ease: "power3.out",
  blur: 0,
  threshold: 0.1,
  stagger: 0.08,
} as const

type LandingSectionHeadingRevealProps = Omit<
  AnimatedContentProps,
  keyof typeof landingScrollRevealProps
> &
  Partial<typeof landingScrollRevealProps> & {
    className: string
  }

export function LandingSectionHeadingReveal({
  className,
  children,
  ...overrides
}: LandingSectionHeadingRevealProps) {
  return (
    <AnimatedContent
      className={className}
      {...landingScrollRevealProps}
      {...overrides}
    >
      {children}
    </AnimatedContent>
  )
}
