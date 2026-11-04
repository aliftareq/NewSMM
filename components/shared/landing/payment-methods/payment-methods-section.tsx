import Image from "next/image"

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
        <div className="flex w-full max-w-[759px] flex-col items-center gap-3 text-center">
          <div className="stats-highlight-subheading shrink-0 overflow-visible rounded-[33px] border-[0.5px] border-[#e8e8e3] bg-white/50 px-2 py-1">
            <div className="overflow-visible rounded-full border border-white bg-[#fafafa] px-3 py-1.5 shadow-[0px_2px_1.5px_0px_rgba(183,183,183,0.25)]">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="relative flex size-2.5 shrink-0 items-center justify-center overflow-visible"
                >
                  <span className="section-heading-dot-ripple" />
                  <span className="section-heading-dot-ripple section-heading-dot-ripple--delayed" />
                  <span className="relative z-1 block size-1 rounded-full bg-button shadow-[0_0_4px_2px_rgba(38,157,231,0.45)]" />
                </span>
                <p className="section-subtitle-label text-button font-medium">
                  {badgeLabel}
                </p>
              </div>
            </div>
          </div>

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
        </div>

        <div className="relative w-full max-w-[1280px]">
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
        </div>
      </div>
    </section>
  )
}
