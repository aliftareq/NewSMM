"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { newOrderContent } from "@/data/service/new-order"
import { orderExtrasContent } from "@/data/service/order-extras"
import { buildCartItemsFromExtras } from "@/lib/build-cart-from-extras"
import { getDraftGroupId } from "@/lib/cart-draft-group"
import { mergeCartGroupItems } from "@/lib/cart-storage"
import { buildOrderHref, formatUsd } from "@/lib/build-order-href"
import { NewOrderBackButton } from "@/components/shared/service/new-order/new-order-back-button"
import { NewOrderProfileAvatarSlot } from "@/components/shared/service/new-order/new-order-profile-avatar-slot"
import { NewOrderSummaryCard } from "@/components/shared/service/new-order/new-order-summary-card"
import { OrderExtrasGrowthSlider } from "@/components/shared/service/order-extras/order-extras-growth-slider"
import { cn } from "@/lib/utils"

const INSTAGRAM_GRADIENT =
  "bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] bg-clip-text text-transparent"

function parseUsdAmount(value: string): number {
  return Number.parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0
}

export function OrderExtrasPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { growth, profile, assets, summary } = orderExtrasContent

  const handle = searchParams.get("handle")?.trim() ?? ""
  const quantity = Number.parseInt(searchParams.get("quantity") ?? "100", 10)
  const basePrice = formatUsd(searchParams.get("price") ?? "2.99")
  const platformId = searchParams.get("platform") ?? "instagram"
  const qualityId = searchParams.get("quality") ?? "high-quality"
  const unitLabel = searchParams.get("unit") ?? summary.unitLabel

  const levels = growth.levels
  const [activeLevel, setActiveLevel] = useState(growth.defaultLevel)
  const [storyIndex, setStoryIndex] = useState(0)
  const celebrationBoundaryRef = useRef<HTMLDivElement>(null)

  const activeLevelConfig = useMemo(
    () => levels.find((item) => item.level === activeLevel) ?? levels[0],
    [activeLevel, levels],
  )

  const extrasPrice = activeLevelConfig?.extraPrice ?? 0
  const totalPrice = formatUsd(parseUsdAmount(basePrice) + extrasPrice)
  const cartHref = "/cart"
  const extrasPriceLabel = formatUsd(extrasPrice)

  const storyViewsValue = activeLevelConfig?.storyViewsLabel ?? "1k"
  const canDecrementStoryViews = storyIndex > 0
  const canIncrementStoryViews = storyIndex < levels.length - 1

  const packageChipLabel = profile.packageLabelTemplate.replace(
    "{quantity}",
    String(Number.isFinite(quantity) ? quantity : 100),
  )

  const backHref = buildOrderHref({
    quantity: Number.isFinite(quantity) ? quantity : 100,
    price: basePrice,
    compareAtPrice: formatUsd(searchParams.get("compareAt") ?? "3.44"),
    platformId,
    qualityId,
    unitLabel,
    username: handle.replace(/^@/, ""),
  })

  useEffect(() => {
    if (!handle) {
      router.replace("/order")
    }
  }, [handle, router])

  useEffect(() => {
    if (!handle) {
      return
    }
    const groupId = getDraftGroupId()
    mergeCartGroupItems(
      groupId,
      buildCartItemsFromExtras({
        groupId,
        quantity: Number.isFinite(quantity) ? quantity : 100,
        unitLabel,
        platformLabel: summary.platformLabel,
        followersPrice: basePrice,
        storyViewsTitle: `${activeLevelConfig?.storyViewsLabel ?? "1k"} Story Views`,
        extrasPrice,
        handle,
        avatarSrc: newOrderContent.profile.defaultPreview.avatarSrc,
        followersCount: newOrderContent.profile.defaultPreview.followersCount,
        followingCount: newOrderContent.profile.defaultPreview.followingCount,
        qualityId,
      }),
    )
  }, [
    activeLevelConfig,
    basePrice,
    extrasPrice,
    handle,
    quantity,
    summary.platformLabel,
    unitLabel,
    qualityId,
  ])

  if (!handle) {
    return null
  }

  const displayHandle = handle.startsWith("@") ? handle : `@${handle}`

  return (
    <div className="info-container flex w-full flex-col items-start gap-6 lg:gap-[24px]">
      <div className="w-fit max-w-full shrink-0">
        <NewOrderBackButton
          href={backHref}
          label={newOrderContent.backLabel}
          arrowSrc={newOrderContent.assets.backArrow}
        />
      </div>

      <div
        ref={celebrationBoundaryRef}
        className="relative isolate overflow-visible grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(0,696px)_minmax(0,594px)] xl:items-stretch xl:justify-between xl:gap-x-[34px] xl:gap-y-0"
      >
        <div className="flex min-h-0 w-full min-w-0 flex-col gap-4 xl:col-start-1 xl:h-full xl:max-w-[696px]">
        <div className="w-full shrink-0 rounded-[24px] border border-[#f5f6f7] bg-white p-4 shadow-[0px_2px_6px_rgba(37,37,37,0.16)] sm:p-6 xl:p-8">
          <div className="flex w-full flex-col gap-6">
            <p className="text-lg font-semibold leading-[1.3] text-[#222e48]">
              {profile.sectionTitle}
            </p>
            <div className="h-px w-full border-t border-dashed border-[#c1c4cc]" />
            <div className="flex w-full flex-col gap-3 rounded-xl border-[0.5px] border-[#ebecef] bg-white p-3 shadow-[0px_2px_4px_rgba(50,50,50,0.13)] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <NewOrderProfileAvatarSlot
                  avatarSrc={newOrderContent.profile.defaultPreview.avatarSrc}
                  variant="raised"
                  className="!size-11 shrink-0 !rounded-lg !bg-[#f0f0f0]"
                />
                <div className="flex min-w-0 flex-col gap-1.5">
                  <p
                    className={cn(
                      "truncate text-lg font-semibold leading-[1.3]",
                      INSTAGRAM_GRADIENT,
                    )}
                  >
                    {displayHandle}
                  </p>
                  <p className="text-sm font-medium leading-[1.35] text-[#4f586d]">
                    {profile.profileTypeLabel}
                  </p>
                </div>
              </div>
              <span className="inline-flex h-10 shrink-0 items-center rounded-lg border border-[#798090] bg-white py-1.5 pl-4 pr-3 text-sm font-medium leading-[1.35] text-[#798090]">
                {packageChipLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-visible rounded-[24px] border border-[#f5f6f7] bg-white p-4 shadow-[0px_2px_6px_rgba(37,37,37,0.16)] sm:p-6">
          <div className="flex h-full min-h-0 w-full flex-col gap-6 overflow-visible">
            <div className="flex shrink-0 flex-col gap-2">
              <p className="text-lg font-semibold leading-[1.3] text-[#222e48]">
                {growth.sectionTitle}
              </p>
              <p className="text-sm font-normal leading-[1.3] text-[#4f586d]">
                {growth.sectionSubtitle}
              </p>
            </div>
            <div className="h-px w-full shrink-0 border-t border-dashed border-[#c1c4cc]" />
            <OrderExtrasGrowthSlider
              assets={assets}
              levels={levels}
              celebrationBoundaryRef={celebrationBoundaryRef}
              activeLevel={activeLevel}
              onLevelChange={(level) => {
                setActiveLevel(level)
                const nextIndex = levels.findIndex(
                  (item) => item.level === level,
                )
                if (nextIndex >= 0) {
                  setStoryIndex(nextIndex)
                }
              }}
              growthLevelLabel={growth.growthLevelLabel}
              totalExtrasLabel={growth.totalExtrasLabel}
              sliderHint={growth.sliderHint}
              storyViewsLabel={growth.storyViewsLabel}
              extrasPriceLabel={extrasPriceLabel}
              storyViewsValue={
                levels[storyIndex]?.storyViewsLabel ?? storyViewsValue
              }
              onDecrementStoryViews={() => {
                if (!canDecrementStoryViews) {
                  return
                }
                const next = storyIndex - 1
                setStoryIndex(next)
                const level = levels[next]
                if (level) {
                  setActiveLevel(level.level)
                }
              }}
              onIncrementStoryViews={() => {
                if (!canIncrementStoryViews) {
                  return
                }
                const next = storyIndex + 1
                setStoryIndex(next)
                const level = levels[next]
                if (level) {
                  setActiveLevel(level.level)
                }
              }}
              canDecrementStoryViews={canDecrementStoryViews}
              canIncrementStoryViews={canIncrementStoryViews}
              activeLevelTitle={activeLevelConfig?.title ?? ""}
              className="min-h-0 flex-1"
            />
          </div>
        </div>
        </div>

        <div className="flex min-h-0 w-full min-w-0 flex-col xl:col-start-2 xl:h-full xl:max-w-[594px] xl:justify-self-end">
          <NewOrderSummaryCard
            summary={{
              ...newOrderContent.summary,
              ...summary,
            }}
            assets={newOrderContent.assets}
            quantity={Number.isFinite(quantity) ? quantity : 100}
            unitLabel={unitLabel}
            platformLabel={summary.platformLabel}
            price={totalPrice}
            ctaHref={cartHref}
            canContinue
            ctaLabel={summary.ctaLabel}
            fillHeight
          />
        </div>
      </div>
    </div>
  )
}
