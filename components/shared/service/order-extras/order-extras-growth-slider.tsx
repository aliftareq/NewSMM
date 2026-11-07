"use client"

import { useCallback, useEffect, useRef, useState, type RefObject } from "react"
import { gsap } from "gsap"

import { GrowthLevelCelebration } from "@/components/shared/service/order-extras/growth-level-celebration"
import type { OrderExtrasAssets, OrderExtrasGrowthLevel } from "@/types/service/order-extras"
import {
  getGrowthLevelTrackPosition,
} from "@/lib/growth-level-celebration"
import { cn } from "@/lib/utils"

const INSTAGRAM_GRADIENT =
  "bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] bg-clip-text text-transparent"

type OrderExtrasGrowthSliderProps = {
  assets: OrderExtrasAssets
  levels: OrderExtrasGrowthLevel[]
  activeLevel: number
  onLevelChange: (level: number) => void
  growthLevelLabel: string
  totalExtrasLabel: string
  sliderHint: string
  storyViewsLabel: string
  extrasPriceLabel: string
  storyViewsValue: string
  onDecrementStoryViews: () => void
  onIncrementStoryViews: () => void
  canDecrementStoryViews: boolean
  canIncrementStoryViews: boolean
  activeLevelTitle: string
  className?: string
  celebrationBoundaryRef?: RefObject<HTMLElement | null>
}

export function OrderExtrasGrowthSlider({
  assets,
  levels,
  activeLevel,
  onLevelChange,
  growthLevelLabel,
  totalExtrasLabel,
  sliderHint,
  storyViewsLabel,
  extrasPriceLabel,
  storyViewsValue,
  onDecrementStoryViews,
  onIncrementStoryViews,
  canDecrementStoryViews,
  canIncrementStoryViews,
  activeLevelTitle,
  className,
  celebrationBoundaryRef,
}: OrderExtrasGrowthSliderProps) {
  const minLevel = levels[0]?.level ?? 1
  const maxLevel = levels[levels.length - 1]?.level ?? 5
  const progress = getGrowthLevelTrackPosition(activeLevel, minLevel, maxLevel)
  const isThumbAtTrackEnd = activeLevel >= maxLevel

  const titleRef = useRef<HTMLParagraphElement>(null)
  const trackZoneRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const isMountRef = useRef(true)
  const prevLevelRef = useRef(activeLevel)
  const [burstId, setBurstId] = useState(0)

  useEffect(() => {
    if (isMountRef.current) {
      isMountRef.current = false
      prevLevelRef.current = activeLevel
      return
    }
    if (prevLevelRef.current === activeLevel) {
      return
    }
    prevLevelRef.current = activeLevel

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { scale: 0.88, opacity: 0.65 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.55,
          ease: "back.out(2.2)",
        },
      )
    }

    setBurstId((current) => current + 1)
  }, [activeLevel])

  const commitLevel = useCallback(
    (level: number) => {
      const clamped = Math.min(maxLevel, Math.max(minLevel, level))
      if (clamped === activeLevel) {
        return
      }
      onLevelChange(clamped)
    },
    [activeLevel, maxLevel, minLevel, onLevelChange],
  )

  const handleRangeChange = (value: number) => {
    commitLevel(value)
  }

  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col gap-12 overflow-visible rounded-xl border-[0.5px] border-[#ebecef] bg-white p-5 shadow-[0px_2px_4px_rgba(50,50,50,0.13)]",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-[140px] flex-col gap-2 sm:gap-2">
            <p className="text-sm font-medium leading-[1.35] text-[#4f586d]">
              {growthLevelLabel}
            </p>
            <p
              ref={titleRef}
              className={cn(
                "text-[28px] font-medium leading-[35px]",
                INSTAGRAM_GRADIENT,
              )}
            >
              {activeLevelTitle}
            </p>
          </div>
          <div className="flex min-w-[79px] flex-col gap-2 text-right sm:gap-2">
            <p className="text-sm font-medium leading-[1.35] text-[#4f586d]">
              {totalExtrasLabel}
            </p>
            <p
              className={cn(
                "text-2xl font-semibold leading-[1.45]",
                INSTAGRAM_GRADIENT,
              )}
            >
              {extrasPriceLabel}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium leading-[1.35] text-[#e24377]">
              {sliderHint}
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={assets.sliderHintArrow}
              width={20}
              height={20}
              className="size-5 shrink-0"
            />
          </div>

          <div
            ref={trackZoneRef}
            className="relative w-full min-h-[5.25rem] overflow-visible pb-9 pt-2 sm:min-h-[5.5rem]"
          >
            <GrowthLevelCelebration
              anchorRef={trackZoneRef}
              thumbRef={thumbRef}
              boundaryRef={celebrationBoundaryRef}
              level={activeLevel}
              burstId={burstId}
            />

            <div className="relative z-10 w-full">
              <div className="relative h-3 w-full">
                <div className="relative h-3 w-full rounded-full bg-[#e6e6e6]">
                  <div
                    className="absolute left-0 top-0 h-3 rounded-full bg-[#e24377] transition-[width] duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {levels.map((level) => {
                  const tickLeft = getGrowthLevelTrackPosition(
                    level.level,
                    minLevel,
                    maxLevel,
                  )
                  const isTrackEnd = level.level === maxLevel
                  const isCurrent = level.level === activeLevel
                  const isPassed = level.level < activeLevel
                  if (isCurrent) {
                    return null
                  }
                  return (
                    <span
                      key={`tick-${level.level}`}
                      className={cn(
                        "pointer-events-none absolute top-1/2 z-[1] size-2.5 -translate-y-1/2 rounded-full",
                        isTrackEnd ? "-translate-x-full" : "-translate-x-1/2",
                        isPassed
                          ? "bg-white ring-1 ring-[#e24377]/20"
                          : "bg-[#919191]",
                      )}
                      style={{ left: isTrackEnd ? "100%" : `${tickLeft}%` }}
                    />
                  )
                })}

                <div
                  ref={thumbRef}
                  className={cn(
                    "pointer-events-none absolute top-1/2 z-10 box-border flex size-[26px] -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#e24377] bg-white",
                    isThumbAtTrackEnd ? "-translate-x-full" : "-translate-x-1/2",
                  )}
                  style={{
                    left: isThumbAtTrackEnd ? "100%" : `${progress}%`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={assets.growthRunner}
                    width={16}
                    height={16}
                    className="size-4"
                  />
                </div>

                <input
                  type="range"
                  min={minLevel}
                  max={maxLevel}
                  step={1}
                  value={activeLevel}
                  onChange={(event) =>
                    handleRangeChange(Number.parseInt(event.target.value, 10))
                  }
                  className="absolute inset-x-0 top-1/2 z-40 h-12 w-full -translate-y-1/2 cursor-pointer opacity-0"
                  aria-label={sliderHint}
                  aria-valuemin={minLevel}
                  aria-valuemax={maxLevel}
                  aria-valuenow={activeLevel}
                />
              </div>

              <div className="relative mt-7 h-5 w-full sm:mt-8">
                {levels.map((level) => {
                  const tickLeft = getGrowthLevelTrackPosition(
                    level.level,
                    minLevel,
                    maxLevel,
                  )
                  const isTrackEnd = level.level === maxLevel
                  const isActive = level.level === activeLevel
                  return (
                    <button
                      key={level.level}
                      type="button"
                      onClick={() => commitLevel(level.level)}
                      className={cn(
                        "absolute top-0 -translate-x-1/2 whitespace-nowrap text-base font-medium leading-5 transition-colors",
                        isActive
                          ? "text-[#e24377]"
                          : "text-[#3b3b3b] hover:text-[#e24377]",
                      )}
                      style={{
                        left: isTrackEnd
                          ? "calc(100% - 5px)"
                          : `${tickLeft}%`,
                      }}
                      aria-pressed={isActive}
                    >
                      {level.shortLabel}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex w-full flex-col items-center gap-[38px] rounded-2xl border border-[#ffe5ee] bg-[rgba(224,76,87,0.1)] px-4 pb-4 pt-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-medium leading-[1.48] text-[#4f586d]">
            {storyViewsValue}
          </p>
          <p
            className={cn(
              "text-base font-medium leading-5",
              INSTAGRAM_GRADIENT,
            )}
          >
            {storyViewsLabel}
          </p>
        </div>
        <div className="flex w-full gap-4 self-stretch">
          <button
            type="button"
            onClick={onDecrementStoryViews}
            disabled={!canDecrementStoryViews}
            className="flex h-[50px] flex-1 items-center justify-center rounded-xl border border-[#ffc2c6] bg-white p-2.5 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Decrease story views"
          >
            <span className="block h-0.5 w-7 rounded-full bg-[#202020]" />
          </button>
          <button
            type="button"
            onClick={onIncrementStoryViews}
            disabled={!canIncrementStoryViews}
            className="flex h-[50px] flex-1 items-center justify-center rounded-xl border border-[#ffc2c6] bg-white p-2.5 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Increase story views"
          >
            <span className="relative block size-7">
              <span className="absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#202020]" />
              <span className="absolute left-1/2 top-1/2 block h-5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#202020]" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
