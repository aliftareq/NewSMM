"use client"

import { useMemo, useCallback } from "react"

import { cartPageContent } from "@/data/cart/cart"
import { newOrderContent } from "@/data/service/new-order"
import { useCart } from "@/hooks/use-cart"
import { useCartRemoveConfirm } from "@/hooks/use-cart-remove-confirm"
import { formatUsd } from "@/lib/build-order-href"
import { getUpsellId, isPrimaryServiceLine } from "@/lib/cart-storage"
import { CartAddServiceLink } from "@/components/shared/cart/cart-add-service-link"
import { CartRemoveItemDialog } from "@/components/shared/cart/cart-remove-item-dialog"
import { NewOrderPlatformIconSlot } from "@/components/shared/service/new-order/new-order-platform-icon-slot"
import type { CartLineItem } from "@/types/cart/cart"
import { cn } from "@/lib/utils"

const INSTAGRAM_GRADIENT =
  "bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] bg-clip-text text-transparent"

function CartServiceCard({
  item,
  upsellAdded,
  onRemoveRequest,
  onAddUpsell,
}: {
  item: CartLineItem
  upsellAdded: boolean
  onRemoveRequest: () => void
  onAddUpsell: () => void
}) {
  return (
    <div className="w-full rounded-[24px] border border-[#f5f6f7] bg-white p-4 shadow-[0px_2px_3px_rgba(37,37,37,0.16)] sm:p-6">
      <div className="flex flex-col gap-5">
        <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#ebecef] bg-white px-3 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <NewOrderPlatformIconSlot
              icon={newOrderContent.service.platformIcon}
              spriteSrc={newOrderContent.assets.socialIconsSprite}
            />
            <p className="text-base font-medium leading-[1.35] text-[#343e56]">
              {item.title}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <p className="text-lg font-semibold leading-[1.3] text-[#343e56]">
              {item.price}
            </p>
            <button
              type="button"
              onClick={onRemoveRequest}
              className="flex size-5 items-center justify-center text-[#798090] hover:text-[#343e56]"
              aria-label={`Remove ${item.title}`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M3.5 5.5H16.5M8 5.5V4.25C8 3.83579 8.33579 3.5 8.75 3.5H11.25C11.6642 3.5 12 3.83579 12 4.25V5.5M7.25 8.25V14.25M12.75 8.25V14.25M5.25 5.5L6 15.25C6 15.6642 6.33579 16 6.75 16H13.25C13.6642 16 14 15.6642 14 15.25L14.75 5.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="h-px w-full border-t border-dashed border-[#c1c4cc]" />
        <button
          type="button"
          disabled={upsellAdded}
          onClick={onAddUpsell}
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition-colors",
            upsellAdded
              ? "cursor-default border-[#a7f3d0] bg-[#ecfdf5]"
              : "border-[#ffc4d1] bg-[#fdf7f9] hover:border-[#ff9fb3]",
          )}
        >
          <div className="flex min-w-0 items-start gap-3">
            <div
              className={cn(
                "flex size-[42px] shrink-0 items-center justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(114,114,114,0.12)]",
                upsellAdded && "text-[#059669]",
              )}
            >
              <span
                className={cn(
                  "text-lg font-semibold",
                  upsellAdded ? "text-[#059669]" : "text-[#e11d48]",
                )}
              >
                {upsellAdded ? "✓" : "+"}
              </span>
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
              <p
                className={cn(
                  "text-lg font-semibold leading-[1.3]",
                  upsellAdded ? "text-[#047857]" : INSTAGRAM_GRADIENT,
                )}
              >
                {cartPageContent.upsellFollowersTitle}
              </p>
              <p className="text-sm leading-[1.3] text-[#4f586d]">
                {upsellAdded
                  ? "Added to this order"
                  : cartPageContent.upsellFollowersSubtitle}
              </p>
            </div>
          </div>
          <p
            className={cn(
              "shrink-0 text-lg font-semibold leading-[1.3]",
              upsellAdded ? "text-[#047857]" : "text-[#e11d48]",
            )}
          >
            {cartPageContent.upsellFollowersPrice}
          </p>
        </button>
      </div>
    </div>
  )
}

export function CartPageContent() {
  const { items, removeItem, addItem, itemCount, subtotal } = useCart()
  const {
    pendingTitle,
    removeDialogOpen,
    requestRemove,
    dismissRemove,
    confirmRemove,
  } = useCartRemoveConfirm(removeItem)

  const titleCount = cartPageContent.itemsLabelTemplate.replace(
    "{count}",
    String(itemCount).padStart(2, "0"),
  )

  const primaryItems = useMemo(
    () => items.filter((line) => isPrimaryServiceLine(line)),
    [items],
  )

  const upsellParentIds = useMemo(() => {
    const ids = new Set<string>()
    for (const line of items) {
      if (line.parentId) {
        ids.add(line.parentId)
      }
    }
    return ids
  }, [items])

  const handleAddUpsell = useCallback(
    (parent: CartLineItem) => {
      addItem({
        id: getUpsellId(parent.id),
        title: cartPageContent.upsellFollowersTitle,
        platformLabel: parent.platformLabel,
        price: cartPageContent.upsellFollowersPrice,
        parentId: parent.id,
      })
    },
    [addItem],
  )

  return (
    <div className="info-container flex w-full flex-col items-start gap-6 lg:gap-[24px]">
      <CartRemoveItemDialog
        open={removeDialogOpen}
        itemTitle={pendingTitle}
        onOpenChange={(open) => {
          if (!open) {
            dismissRemove()
          }
        }}
        onConfirm={confirmRemove}
      />

      <div className="flex flex-wrap items-end gap-3">
        <h1 className="text-2xl font-semibold leading-[1.5] text-[#222e48]">
          {cartPageContent.title}
        </h1>
        <p className="text-base font-medium leading-[1.35] text-[#222e48]">
          {titleCount}
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(0,750px)_minmax(0,1fr)] xl:items-start xl:justify-between xl:gap-x-8">
        <div className="flex w-full min-w-0 flex-col gap-4">
          {primaryItems.length === 0 ? (
            <div className="flex flex-col gap-4">
              <div className="rounded-[24px] border border-[#f5f6f7] bg-white p-6 text-center text-base text-[#4f586d] shadow-[0px_2px_3px_rgba(37,37,37,0.16)]">
                Your cart is empty. Complete the order flow to add items.
              </div>
              <CartAddServiceLink />
            </div>
          ) : (
            <>
              {primaryItems.map((item) => (
                <CartServiceCard
                  key={item.id}
                  item={item}
                  upsellAdded={upsellParentIds.has(item.id)}
                  onRemoveRequest={() => requestRemove(item.id, item.title)}
                  onAddUpsell={() => handleAddUpsell(item)}
                />
              ))}
              <CartAddServiceLink />
            </>
          )}
        </div>

        <div className="w-full max-w-[548px] shrink-0 justify-self-end rounded-[24px] border border-[#f5f6f7] bg-white p-4 shadow-[0px_2px_3px_rgba(37,37,37,0.16)] sm:p-6 xl:sticky xl:top-24">
          <div className="mx-auto flex w-full max-w-[500px] flex-col gap-7">
            <div className="flex w-full gap-3">
              <input
                type="text"
                placeholder={cartPageContent.couponPlaceholder}
                className="h-[50px] min-w-0 flex-1 rounded-xl border border-[#ace1ff] bg-white px-4 text-sm font-medium text-[#888e9c] outline-none placeholder:text-[#888e9c]"
              />
              <button
                type="button"
                className="h-[50px] w-[115px] shrink-0 rounded-xl border border-[#0087d4] bg-[rgba(33,174,255,0.1)] text-base font-medium text-[#21aeff]"
              >
                {cartPageContent.couponApplyLabel}
              </button>
            </div>

            <div className="w-full rounded-xl bg-[#1c2533] p-4">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={newOrderContent.assets.orderSummaryIcon}
                  width={28}
                  height={28}
                  className="size-7"
                />
                <h2 className="text-lg font-semibold leading-[1.3] text-white">
                  {cartPageContent.summaryHeading}
                </h2>
              </div>
            </div>

            <div className="flex w-full flex-col gap-5">
              <div className="flex items-center justify-between">
                <p className="text-base font-medium text-[#4f586d]">
                  {cartPageContent.subtotalLabel}
                </p>
                <p className="text-lg font-semibold text-[#343e56]">
                  {formatUsd(subtotal)}
                </p>
              </div>
              <div className="h-px w-full border-t border-dashed border-[#c1c4cc]" />
              <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold text-[#222e48]">
                  {cartPageContent.totalLabel}
                </p>
                <p className="text-2xl font-semibold text-[#222e48]">
                  {formatUsd(subtotal)}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="flex h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] text-lg font-medium text-white"
            >
              {cartPageContent.checkoutCtaLabel}
            </button>

            <div className="flex items-center justify-center gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={newOrderContent.assets.secureCheckoutGreenIcon}
                width={20}
                height={20}
                className="size-5"
              />
              <p className="text-sm font-medium text-[#6a7283]">
                {cartPageContent.sslLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
