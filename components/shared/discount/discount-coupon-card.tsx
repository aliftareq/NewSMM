"use client"

import { useCallback, useState, type CSSProperties } from "react"

import type { DiscountCouponItem } from "@/types/discount/discount-page"

type DiscountCouponCardProps = {
  coupon: DiscountCouponItem
  spineLabel: string
  revealLabel: string
  couponPercentIconSrc: string
}

/** Four notches at 20% / 40% / 60% / 80% of stub height (equal H/5 gaps). */
const STUB_NOTCH_MASK = [
  "radial-gradient(circle var(--r) at 0 20%, #0000 98%, #000)",
  "radial-gradient(circle var(--r) at 0 40%, #0000 98%, #000)",
  "radial-gradient(circle var(--r) at 0 60%, #0000 98%, #000)",
  "radial-gradient(circle var(--r) at 0 80%, #0000 98%, #000)",
].join(",")

/**
 * Coupon ticket card — Figma `25853:54846` / body `25853:54852`.
 *
 * @example
 * ```tsx
 * <DiscountCouponCard
 *   coupon={discountPageContent.couponSection.coupons[0]}
 *   spineLabel="COUPON"
 *   revealLabel="REVEAL CODE"
 *   couponPercentIconSrc="/images/discount/coupon-section/coupon-percent-icon.svg"
 * />
 * ```
 */
export function DiscountCouponCard({
  coupon,
  spineLabel,
  revealLabel,
  couponPercentIconSrc,
}: DiscountCouponCardProps) {
  const [revealed, setRevealed] = useState(false)

  const handleReveal = useCallback(() => {
    setRevealed(true)
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(coupon.code)
    }
  }, [coupon.code])

  return (
    <article
      className="relative w-full min-w-0 max-w-[321px] xl:max-w-none drop-shadow-[0px_4px_4px_rgba(35,39,47,0.12),0px_2px_2px_rgba(35,39,47,0.04)]"
      data-slot="discount-coupon-card"
    >
      <div className="relative flex h-[145px] w-full flex-row items-stretch overflow-hidden rounded-lg">
        {/* Left stub — transparent notches via intersecting radial masks */}
        <div
          className="coupon-stub relative flex h-full w-[61px] shrink-0 items-center justify-center bg-brand"
          style={
            {
              ["--r" as string]: "9px",
              WebkitMask: STUB_NOTCH_MASK,
              WebkitMaskComposite: "source-in",
              mask: STUB_NOTCH_MASK,
              maskComposite: "intersect",
            } as CSSProperties
          }
        >
          <div className="-rotate-90 flex-none">
            <div className="flex h-[61px] w-[145px] flex-col items-start justify-center px-3">
              <p className="w-full text-center text-base font-bold leading-[30px] tracking-[0.02em] text-white uppercase">
                {spineLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Right body — Figma 25853:54852 */}
        <div className="flex h-full w-[260px] min-w-0 flex-1 flex-col items-start justify-end gap-3 bg-white p-4">
          <div className="flex w-full min-h-0 flex-1 flex-col items-start justify-center">
            <div className="flex flex-col items-start whitespace-nowrap">
              <p className="text-lg font-medium leading-[1.5] text-brand">
                {coupon.offerTitle}
              </p>
              <p className="text-sm font-medium leading-[22px] text-n500">
                {coupon.offerSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReveal}
            className="flex h-[35px] w-[230px] max-w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md border border-dashed border-brand bg-[rgba(38,157,231,0.1)] px-6 py-2"
          >
            <span className="text-sm font-medium leading-[1.35] tracking-[0.5px] text-brand uppercase">
              {revealed ? coupon.code : revealLabel}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={couponPercentIconSrc}
              width={16}
              height={16}
              className="relative block size-4 shrink-0 overflow-hidden"
            />
          </button>
        </div>
      </div>
    </article>
  )
}
