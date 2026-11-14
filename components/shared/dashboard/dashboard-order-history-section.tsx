"use client"

import { useDashboardAddFunds } from "@/components/shared/dashboard/dashboard-add-funds-context"
import { LinkTo } from "@/components/shared/link-to"
import { dashboardOrderHistoryContent } from "@/data/dashboard/order-history"
import { cn } from "@/lib/utils"
import type { DashboardOrderHistoryContent } from "@/types/dashboard/order-history"

type DashboardOrderHistorySectionProps = {
  content?: DashboardOrderHistoryContent
}

/** Figma 25704:14186 — dashboard order history (empty state). */
export function DashboardOrderHistorySection({
  content = dashboardOrderHistoryContent,
}: DashboardOrderHistorySectionProps) {
  const openAddFunds = useDashboardAddFunds()
  const { balance, empty, assets } = content

  return (
    <div className="flex w-full min-w-0 flex-col gap-[18px]">
      <section className="flex w-full items-center rounded-[20px] bg-white p-6">
        <div className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-base font-medium leading-[1.35] text-[#343e56]">
              {balance.label}
            </p>
            <p className="text-2xl font-semibold leading-[1.5] text-[#21aeff]">
              {balance.amount}
            </p>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <LinkTo
              href={balance.newOrderHref}
              className={cn(
                "inline-flex h-[54px] min-w-[120px] flex-1 items-center justify-center",
                "rounded-xl border border-[#269de7] px-6 py-4 text-base font-medium leading-[1.35] text-[#21aeff]",
                "transition-opacity hover:opacity-95 sm:flex-initial",
              )}
              style={{
                backgroundImage:
                  "linear-gradient(107.55deg, rgba(0, 135, 212, 0.1) 2.53%, rgba(50, 180, 255, 0.1) 61.03%, rgba(7, 149, 231, 0.087) 91.98%)",
              }}
            >
              {balance.newOrderLabel}
            </LinkTo>
            <button
              type="button"
              onClick={openAddFunds}
              className="inline-flex h-[54px] min-w-[120px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#269de7] px-6 py-4 text-base font-medium leading-[1.35] text-white transition-opacity hover:opacity-95 sm:flex-initial"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={assets.addFundsPlus}
                width={18}
                height={18}
                className="size-[18px] shrink-0"
              />
              {balance.addFundsLabel}
            </button>
          </div>
        </div>
      </section>

      <section className="flex min-h-[209px] w-full items-center justify-center rounded-[20px] bg-white p-6">
        <div className="flex max-w-full flex-col items-center gap-2 text-center">
          <h2 className="text-xl font-medium leading-[1.3] text-[#13203b]">
            {empty.title}
          </h2>
          <p className="text-base font-normal leading-[1.35] text-[#6a7283]">
            {empty.description}
          </p>
        </div>
      </section>
    </div>
  )
}