"use client"

import { useCallback, useRef } from "react"

import {
  LAYOUT_IDS,
  SlidingTabPill,
} from "@/components/shared/sliding-tab-pill"
import type {
  GrowthPackageQualityId,
  GrowthPackageQualityTab,
} from "@/types/service/growth-package"
import { cn } from "@/lib/utils"

const SELECTED_INSET =
  "shadow-[inset_0px_-1.21154px_0px_rgba(255,255,255,0.06)]"

const MOBILE_QUALITY_MEDIA = "(max-width: 639px)"

type GrowthPackageQualityToggleProps = {
  tabs: GrowthPackageQualityTab[]
  value: GrowthPackageQualityId
  onChange: (id: GrowthPackageQualityId) => void
}

export function GrowthPackageQualityToggle({
  tabs,
  value,
  onChange,
}: GrowthPackageQualityToggleProps) {
  const buttonRefs = useRef<Partial<Record<GrowthPackageQualityId, HTMLButtonElement>>>(
    {},
  )

  const handleSelect = useCallback(
    (id: GrowthPackageQualityId) => {
      onChange(id)

      if (typeof window === "undefined") return
      if (!window.matchMedia(MOBILE_QUALITY_MEDIA).matches) return

      const button = buttonRefs.current[id]
      button?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
    },
    [onChange],
  )

  return (
    <div
      role="tablist"
      aria-label="Package quality"
      className="w-full overflow-visible rounded-2xl border border-[#f2f2f2] bg-[#f5f6f7] p-1 pt-2 sm:min-h-[66px] sm:pt-1"
    >
      <div className="flex flex-row gap-2">
        {tabs.map((tab, index) => {
          const selected = tab.id === value

          return (
            <div key={tab.id} className="relative min-w-0 flex-1">
              {tab.recommendedBadge ? (
                <span className="pointer-events-none absolute -top-[11px] left-1/2 z-20 flex max-w-[calc(100%-8px)] -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-md bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] px-2.5 py-0.5 text-[10px] font-medium leading-[1.5] text-white sm:-top-[13px] sm:px-3.5 sm:py-1 sm:text-xs">
                  RECOMMENDED
                </span>
              ) : null}
              <button
                ref={(node) => {
                  if (node) buttonRefs.current[tab.id] = node
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => handleSelect(tab.id)}
                className={cn(
                  "relative flex min-h-[51px] w-full scroll-mx-4 items-center justify-center rounded-xl border border-solid px-4 py-3 text-sm font-semibold leading-[1.5] transition-[border-color,transform,color] duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#269de7]/45 focus-visible:ring-offset-1 sm:min-h-[54px] sm:px-6 sm:text-lg",
                  selected
                    ? cn("z-10 border-transparent text-white", SELECTED_INSET)
                    : "border-[#ebecef] bg-white text-[#404a60] hover:border-[#c5e8fc] hover:bg-[#fafafa] [text-shadow:0px_0.4px_0.3px_rgba(0,0,0,0.08)]",
                  index === 1 && "sm:px-7",
                )}
              >
                {selected ? (
                  <SlidingTabPill
                    layoutId={LAYOUT_IDS.growthPackageQuality}
                    className="rounded-xl border border-[#269de7] bg-button shadow-[0px_4px_14px_rgba(38,157,231,0.4)]"
                  />
                ) : null}
                <span className="relative z-10 truncate">{tab.label}</span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
