"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { dashboardMyDiscountsContent } from "@/data/dashboard/my-discounts"
import { cn } from "@/lib/utils"
import type {
  DashboardDiscountCoupon,
  DashboardMyDiscountsContent,
} from "@/types/dashboard/my-discounts"

type DashboardMyDiscountsSectionProps = {
  content?: DashboardMyDiscountsContent
}

const COL_COUPON = "w-[140px] shrink-0 sm:w-[180px] lg:w-[240px]"
const COL_DISCOUNT = "w-[88px] shrink-0 sm:w-[120px] lg:w-[160px]"
const COL_EXPIRES = "w-[88px] shrink-0 sm:w-[120px] lg:w-[160px]"

const cellPad = "px-3 py-2.5 lg:pl-5 lg:pr-3"
const cellPadTight = "px-2.5 py-2.5 lg:pl-6 lg:pr-2.5"
const cellPadExpires = "px-2.5 py-2.5 lg:pl-7 lg:pr-2.5"

function DiscountTableHeader({
  columns,
}: {
  columns: DashboardMyDiscountsContent["table"]["columns"]
}) {
  return (
    <div className="flex w-full min-w-[720px] items-center justify-between rounded-xl bg-[#269de7] py-2">
      <div className={cn(COL_COUPON, cellPad)}>
        <span className="text-base font-medium leading-[1.35] text-white">
          {columns.couponCode}
        </span>
      </div>
      <div className={cn(COL_DISCOUNT, cellPadTight)}>
        <span className="text-base font-medium leading-[1.35] text-white">
          {columns.discount}
        </span>
      </div>
      <div className={cn(COL_EXPIRES, cellPadExpires)}>
        <span className="text-base font-medium leading-[1.35] text-white">
          {columns.expiresIn}
        </span>
      </div>
      <div className={cn("min-w-0 flex-1", cellPadExpires)}>
        <span className="text-base font-medium leading-[1.35] text-white">
          {columns.description}
        </span>
      </div>
    </div>
  )
}

function DiscountTableRow({ coupon }: { coupon: DashboardDiscountCoupon }) {
  return (
    <div className="flex w-full min-w-[720px] items-center justify-between rounded-2xl bg-[#f5f6f7] py-2">
      <div className={cn(COL_COUPON, cellPad)}>
        <span className="text-sm font-medium leading-[1.35] text-[#343e56]">
          {coupon.code}
        </span>
      </div>
      <div className={cn(COL_DISCOUNT, cellPadTight)}>
        <span className="text-sm font-medium leading-[1.35] text-[#343e56]">
          {coupon.discountAmount}
        </span>
      </div>
      <div className={cn(COL_EXPIRES, cellPadExpires)}>
        <span className="text-sm font-medium leading-[1.35] text-[#343e56]">
          {coupon.expiresIn}
        </span>
      </div>
      <div
        className={cn(
          "flex min-w-0 flex-1 items-center justify-between gap-3",
          cellPadExpires,
        )}
      >
        <span className="min-w-0 text-sm font-medium leading-[1.35] text-[#343e56]">
          {coupon.description}
        </span>
        <button
          type="button"
          className="inline-flex min-w-[120px] shrink-0 items-center justify-center rounded-xl border-[1.2px] border-[#21aeff] bg-white px-5 py-3 text-sm font-semibold leading-[1.5] text-[#21aeff] transition-colors hover:bg-[#f0f9ff]"
        >
          {coupon.applyLabel}
        </button>
      </div>
    </div>
  )
}

/** Figma 25704:14328 — dashboard my discounts table. */
export function DashboardMyDiscountsSection({
  content = dashboardMyDiscountsContent,
}: DashboardMyDiscountsSectionProps) {
  const { table, coupons, assets } = content
  const [visibleCount, setVisibleCount] = useState(table.initialVisibleCount)

  const visibleCoupons = coupons.slice(0, visibleCount)
  const hasMore = visibleCount < coupons.length

  const handleShowMore = () => {
    setVisibleCount((current) =>
      Math.min(current + table.loadMoreCount, coupons.length),
    )
  }

  return (
    <section className="flex w-full min-w-0 flex-col gap-4 rounded-2xl bg-white p-5">
      <div className="w-full overflow-x-auto">
        <div className="flex w-full min-w-0 flex-col gap-4">
          <DiscountTableHeader columns={table.columns} />
          <div className="relative h-px w-full min-w-[720px] shrink-0" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={assets.tableDivider} className="block h-px w-full max-w-none" />
          </div>
          <div className="flex w-full min-w-0 flex-col gap-3">
            {visibleCoupons.map((coupon) => (
              <DiscountTableRow key={coupon.id} coupon={coupon} />
            ))}
            {hasMore ? (
              <button
                type="button"
                onClick={handleShowMore}
                className="flex w-full min-w-[720px] items-center justify-center rounded-2xl bg-[#f5f6f7] py-4 text-base font-medium leading-[1.35] text-[#4f586d] transition-colors hover:bg-[#ebecef]"
                aria-expanded={false}
              >
                <span className="inline-flex items-center gap-1">
                  {table.showMoreLabel}
                  <ChevronDown className="size-6 shrink-0" aria-hidden />
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}