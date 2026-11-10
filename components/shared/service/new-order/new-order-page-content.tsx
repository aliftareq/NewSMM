"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import {
  isNewOrderFromSearchParams,
  startNewDraftGroup,
} from "@/lib/cart-draft-group"

import { newOrderContent } from "@/data/service/new-order"
import {
  buildOrderExtrasHref,
  formatUsd,
} from "@/lib/build-order-href"
import {
  clampOrderQuantity,
  computeScaledOrderPricing,
  stepOrderQuantity,
  getMinOrderQuantity,
} from "@/lib/order-quantity-pricing"
import type { NewOrderInitialSelection } from "@/types/service/new-order"
import { NewOrderBackButton } from "@/components/shared/service/new-order/new-order-back-button"
import { NewOrderConfigPanel } from "@/components/shared/service/new-order/new-order-config-panel"
import { NewOrderSummaryCard } from "@/components/shared/service/new-order/new-order-summary-card"

function parseUsdAmount(value: string): number {
  return Number.parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0
}

function parseSelection(
  searchParams: ReturnType<typeof useSearchParams>,
): NewOrderInitialSelection {
  const { service, summary } = newOrderContent
  const quantityParam = searchParams.get("quantity")
  const parsedQuantity = quantityParam
    ? Number.parseInt(quantityParam, 10)
    : service.defaultQuantity

  const priceParam = searchParams.get("price")
  const compareParam = searchParams.get("compareAt")
  const unit = searchParams.get("unit") ?? summary.unitLabel

  return {
    quantity: Number.isFinite(parsedQuantity)
      ? parsedQuantity
      : service.defaultQuantity,
    price: priceParam ? formatUsd(priceParam) : service.defaultPrice,
    compareAtPrice: compareParam
      ? formatUsd(compareParam)
      : service.defaultCompareAtPrice,
    platformId: searchParams.get("platform") ?? "instagram",
    qualityId: searchParams.get("quality") ?? "high-quality",
    unitLabel: unit,
    username: searchParams.get("username") ?? undefined,
  }
}

export function NewOrderPageContent() {
  const searchParams = useSearchParams()
  const selection = useMemo(
    () => parseSelection(searchParams),
    [searchParams],
  )

  useEffect(() => {
    if (isNewOrderFromSearchParams(searchParams)) {
      startNewDraftGroup()
    }
  }, [searchParams])
  const [quantity, setQuantity] = useState(() =>
    clampOrderQuantity(selection.quantity),
  )
  const [profileGateMessage, setProfileGateMessage] = useState<string | null>(
    null,
  )

  const normalizeHandle = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) {
      return ""
    }
    return trimmed.startsWith("@") ? trimmed : `@${trimmed}`
  }

  const initialFromUrl = selection.username?.trim() ?? ""

  const [confirmedHandle, setConfirmedHandle] = useState<string | null>(() =>
    initialFromUrl ? normalizeHandle(initialFromUrl) : null,
  )
  const [isEditingProfile, setIsEditingProfile] = useState(
    () => !initialFromUrl,
  )

  useEffect(() => {
    setQuantity(clampOrderQuantity(selection.quantity))
  }, [selection.quantity])

  useEffect(() => {
    const next = selection.username?.trim() ?? ""
    if (next) {
      setConfirmedHandle(normalizeHandle(next))
      setIsEditingProfile(false)
    } else {
      setConfirmedHandle(null)
      setIsEditingProfile(true)
    }
  }, [selection.username])

  const handleSaveProfile = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed || trimmed === newOrderContent.profile.usernamePlaceholder) {
      return
    }
    setConfirmedHandle(normalizeHandle(trimmed))
    setIsEditingProfile(false)
    setProfileGateMessage(null)
  }

  const platformLabel =
    selection.platformId === "instagram"
      ? newOrderContent.service.platformLabel
      : newOrderContent.summary.platformLabel

  const scaledPricing = useMemo(
    () =>
      computeScaledOrderPricing(
        selection.quantity,
        selection.price,
        selection.compareAtPrice,
        quantity,
      ),
    [
      quantity,
      selection.compareAtPrice,
      selection.price,
      selection.quantity,
    ],
  )

  const discountLabel = useMemo(() => {
    const savings =
      parseUsdAmount(scaledPricing.compareAtPrice) -
      parseUsdAmount(scaledPricing.price)
    if (savings <= 0) {
      return newOrderContent.service.discountLabel
    }
    return `${formatUsd(savings)} off`
  }, [scaledPricing.compareAtPrice, scaledPricing.price])

  const minQuantity = getMinOrderQuantity()
  const canDecrement = quantity > minQuantity

  const handleDecrementQuantity = () => {
    setQuantity((current) => stepOrderQuantity(current, "down"))
  }

  const handleIncrementQuantity = () => {
    setQuantity((current) => stepOrderQuantity(current, "up"))
  }

  const canContinue = Boolean(confirmedHandle) && !isEditingProfile

  const extrasHref =
    confirmedHandle && !isEditingProfile
      ? buildOrderExtrasHref({
          handle: confirmedHandle,
          quantity,
          price: scaledPricing.price,
          compareAtPrice: scaledPricing.compareAtPrice,
          platformId: selection.platformId,
          qualityId: selection.qualityId,
          unitLabel: selection.unitLabel,
        })
      : undefined

  return (
    <div className="info-container flex w-full flex-col items-start gap-6 lg:gap-[24px]">
      <div className="w-fit max-w-full shrink-0">
        <NewOrderBackButton
          href={newOrderContent.backHref}
          label={newOrderContent.backLabel}
          arrowSrc={newOrderContent.assets.backArrow}
        />
      </div>

      <div className="grid w-full min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,696px)_minmax(0,594px)] xl:items-stretch xl:justify-between xl:gap-x-[34px] xl:gap-y-0">
        <div className="flex w-full min-w-0 flex-col xl:col-start-1 xl:h-full">
          <NewOrderConfigPanel
            content={newOrderContent}
            assets={newOrderContent.assets}
            quantity={quantity}
            onDecrementQuantity={handleDecrementQuantity}
            onIncrementQuantity={handleIncrementQuantity}
            canDecrementQuantity={canDecrement}
            canIncrementQuantity
            confirmedHandle={confirmedHandle}
            isEditingProfile={isEditingProfile}
            onStartProfileEdit={() => setIsEditingProfile(true)}
            onCancelProfileEdit={() => setIsEditingProfile(false)}
            onSaveProfile={handleSaveProfile}
            price={scaledPricing.price}
            compareAtPrice={scaledPricing.compareAtPrice}
            discountLabel={discountLabel}
          />
        </div>
        <div className="flex min-h-0 w-full min-w-0 flex-col xl:col-start-2 xl:h-full">
          <NewOrderSummaryCard
            summary={newOrderContent.summary}
            assets={newOrderContent.assets}
            quantity={quantity}
            unitLabel={selection.unitLabel}
            platformLabel={platformLabel}
            price={scaledPricing.price}
            ctaHref={extrasHref}
            canContinue={canContinue}
            profileGateMessage={
              profileGateMessage ??
              newOrderContent.summary.profileRequiredMessage
            }
            onBlockedContinue={() => {
              setProfileGateMessage(
                newOrderContent.summary.profileRequiredMessage,
              )
            }}
            fillHeight
          />
        </div>
      </div>
    </div>
  )
}
