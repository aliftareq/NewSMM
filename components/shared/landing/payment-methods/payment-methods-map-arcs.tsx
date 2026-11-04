import Image from "next/image"

import { paymentMethodsSectionAssets } from "@/data/landing/payment-methods"

/** Figma 25704:30369–30415 — half-circle arc rings (828×398), aligned to 1280×460 diagram. */
export function PaymentMethodsMapArcs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute relative z-[1]"
      style={{
        left: `${(240 / 1280) * 100}%`,
        top: `${(76 / 460) * 100}%`,
        width: `${(800 / 1280) * 100}%`,
        aspectRatio: "828 / 398",
      }}
    >
      <Image
        src={paymentMethodsSectionAssets.arcRings}
        alt=""
        fill
        className="object-contain object-left-top"
        unoptimized
      />
    </div>
  )
}
