"use client"

import { Plus } from "lucide-react"

import { useDashboardAddFunds } from "@/components/shared/dashboard/dashboard-add-funds-context"
import { dashboardBalanceHistoryContent } from "@/data/dashboard/balance-history"
import type { DashboardBalanceHistoryContent } from "@/types/dashboard/balance-history"

type DashboardBalanceHistorySectionProps = {
  content?: DashboardBalanceHistoryContent
}

/** Figma 25704:14259 — dashboard balance history (empty state). */
export function DashboardBalanceHistorySection({
  content = dashboardBalanceHistoryContent,
}: DashboardBalanceHistorySectionProps) {
  const openAddFunds = useDashboardAddFunds()
  const { balance, empty } = content

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
          <button
            type="button"
            onClick={openAddFunds}
            className="inline-flex h-[54px] w-full min-w-[120px] items-center justify-center gap-2 rounded-xl bg-[#269de7] px-6 py-4 text-base font-medium leading-[1.35] text-white transition-opacity hover:opacity-95 sm:w-auto"
          >
            <Plus className="size-[18px] shrink-0 stroke-[2.5]" aria-hidden />
            {balance.addFundsLabel}
          </button>
        </div>
      </section>

      <section className="flex min-h-[209px] w-full items-center justify-center rounded-[20px] bg-white p-6">
        <div className="flex max-w-full flex-col items-center gap-2 text-center">
          <h2 className="text-xl font-medium leading-[1.3] text-[#13203b]">
            {empty.title}
          </h2>
          <p className="max-w-[540px] text-base font-normal leading-[1.35] text-[#6a7283]">
            {empty.description}
          </p>
        </div>
      </section>
    </div>
  )
}