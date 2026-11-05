import Image from "next/image"

import { AnimatedContent } from "@/components/shared/animated-content"
import { LandingSectionBadge } from "@/components/shared/landing/landing-section-badge"
import {
  LandingSectionHeadingReveal,
  landingScrollRevealProps,
} from "@/components/shared/landing/landing-section-heading-reveal"
import { PaymentMethodsMapArcs } from "@/components/shared/landing/payment-methods/payment-methods-map-arcs"
import { PaymentMethodsOrbitIcons } from "@/components/shared/landing/payment-methods/payment-methods-orbit-icons"
import {
  landingPaymentMethodsData,
  paymentMethodsImageAlts,
  paymentMethodsSectionAssets,
} from "@/data/landing/payment-methods"
import { cn } from "@/lib/utils"
import type { PaymentMethodsSectionContent } from "@/types/landing/payment-methods"

type PaymentMethodsSectionProps = {
  content?: PaymentMethodsSectionContent
  className?: string
}

/** Figma 25704:29581 — payment methods with orbiting icons */
export function PaymentMethodsSection({
  content = landingPaymentMethodsData,
  className,
}: PaymentMethodsSectionProps) {
  const { badgeLabel, headlineBefore, headlineHighlight, description } = content

  return (
    <section
      id="paymentmethods"
      aria-labelledby="paymentmethods-heading"
      data-slot="payment-methods-section"
      className={cn(
        "relative overflow-x-clip bg-background py-16 md:py-20 lg:py-20",
        className,
      )}
    >
      <div className="info-container relative z-10 flex flex-col items-center gap-[60px]">
        <LandingSectionHeadingReveal className="flex w-full max-w-[759px] flex-col items-center gap-3 text-center">
          <LandingSectionBadge label={badgeLabel} />

          <h2
            id="paymentmethods-heading"
            className="text-[32px] font-semibold leading-normal text-black"
          >
            {headlineBefore}
            <span className="text-button">{headlineHighlight}</span>
          </h2>

          <p className="max-w-[759px] text-base font-normal leading-normal text-n600">
            {description}
          </p>
        </LandingSectionHeadingReveal>

        <AnimatedContent
          className="relative w-full max-w-[1280px]"
          {...landingScrollRevealProps}
          stagger={0}
        >
          <div className="relative aspect-[1280/460] w-full overflow-hidden">
            <Image
              src={paymentMethodsSectionAssets.mapVisual}
              alt={paymentMethodsImageAlts.mapVisual}
              fill
              priority={false}
              quality={100}
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover object-top"
              unoptimized
            />
            <PaymentMethodsMapArcs />
            <PaymentMethodsOrbitIcons />
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}
