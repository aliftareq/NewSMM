"use client"

import { useMemo, useCallback, useState } from "react"

import { cartPageContent } from "@/data/cart/cart"
import { newOrderContent } from "@/data/service/new-order"
import { useCart } from "@/hooks/use-cart"
import { useCartRemoveConfirm } from "@/hooks/use-cart-remove-confirm"
import { formatUsd } from "@/lib/build-order-href"
import { getUpsellId, isPrimaryServiceLine } from "@/lib/cart-storage"
import { CartAddServiceLink } from "@/components/shared/cart/cart-add-service-link"
import { LinkTo } from "@/components/shared/link-to"
import { CartLineExpandedDetails } from "@/components/shared/cart/cart-line-expanded-details"
import { CartLineUpsellDividerSwap } from "@/components/shared/cart/cart-line-upsell-divider-swap"
import { CartRemoveItemDialog } from "@/components/shared/cart/cart-remove-item-dialog"
import { NewOrderPlatformIconSlot } from "@/components/shared/service/new-order/new-order-platform-icon-slot"
import type { CartLineItem } from "@/types/cart/cart"
import { cn } from "@/lib/utils"

const INSTAGRAM_GRADIENT =
  "bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] bg-clip-text text-transparent"

const { assets: cartAssets } = cartPageContent

const CART_SLIDE_GRID = (open: boolean) =>
  cn(
    "grid transition-[grid-template-rows,margin-top] duration-300 ease-in-out motion-reduce:transition-none",
    open ? "mt-0 grid-rows-[1fr]" : "mt-0 grid-rows-[0fr]",
  )

const CART_SLIDE_INNER = (open: boolean) =>
  cn(
    "min-h-0 overflow-hidden transition-opacity duration-300 ease-in-out motion-reduce:transition-none",
    open ? "opacity-100" : "opacity-0",
  )

function CartDashedDivider() {
  return <div className="h-px w-full border-t border-dashed border-[#c1c4cc]" />
}

function CartUpsellRow({
  upsellAdded,
  onAddUpsell,
}: {
  upsellAdded: boolean
  onAddUpsell: () => void
}) {
  return (
    <button
      type="button"
      disabled={upsellAdded}
      onClick={onAddUpsell}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition-colors",
        upsellAdded
          ? "cursor-default border-[#20ad83] bg-[#eef9f4]"
          : "border-[#ffc4d1] bg-[#fdf7f9] hover:border-[#ff9fb3]",
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="relative flex size-[42px] shrink-0 items-center justify-center rounded-[9px] bg-white shadow-[0px_2px_4px_rgba(114,114,114,0.12)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={upsellAdded ? cartAssets.upsellCheckIcon : cartAssets.upsellPlusIcon}
            width={20}
            height={20}
            className="block size-5"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <p
            className={cn(
              "text-lg font-semibold leading-[1.3]",
              upsellAdded ? "text-[#20ad83]" : INSTAGRAM_GRADIENT,
            )}
          >
            {cartPageContent.upsellFollowersTitle}
          </p>
          <p className="text-sm leading-[1.3] text-[#4f586d]">
            {cartPageContent.upsellFollowersSubtitle}
          </p>
        </div>
      </div>

      {upsellAdded ? (
        <span className="shrink-0 rounded-lg border border-[#20ad83] bg-white px-2 py-1.5 text-sm font-medium leading-[1.35] text-[#20ad83]">
          {cartPageContent.upsellBestValueBadge}
        </span>
      ) : (
        <div className="flex shrink-0 items-start gap-2 whitespace-nowrap">
          <p className="text-lg font-semibold leading-[1.3] text-[#e11d48]">
            {cartPageContent.upsellFollowersPrice}
          </p>
          <p className="text-base font-medium leading-[1.35] text-[#4f586d] line-through">
            {cartPageContent.upsellFollowersCompareAtPrice}
          </p>
        </div>
      )}
    </button>
  )
}

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
  const [expanded, setExpanded] = useState(false)
  const lineDetails = item.details ?? cartPageContent.defaultExpandedDetails

  const panelId = `cart-line-panel-${item.id}`
  const triggerId = `cart-line-trigger-${item.id}`

  return (
    <div
      data-slot="cart-line-item"
      data-state={expanded ? "open" : "closed"}
      className="w-full rounded-[24px] border border-[#f5f6f7] bg-white p-6 shadow-[0px_2px_3px_rgba(37,37,37,0.16)]"
    >
      <div className="flex flex-col">
        <div className="flex flex-col gap-5">
        <div className="flex w-full items-center gap-3 rounded-xl border border-[#ebecef] bg-white px-3 py-3.5">
          <button
            type="button"
            id={triggerId}
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={() => setExpanded((open) => !open)}
            className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left"
          >
            <span className="flex min-w-0 items-center gap-3">
              <NewOrderPlatformIconSlot
                icon={newOrderContent.service.platformIcon}
                spriteSrc={newOrderContent.assets.socialIconsSprite}
              />
              <span className="text-base font-medium leading-[1.35] text-[#343e56]">
                {item.title}
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="text-lg font-semibold leading-[1.3] text-[#343e56]">
                {item.price}
              </span>
              <span className="relative flex h-[34px] w-[33px] shrink-0 items-center justify-center rounded-[7px] bg-[#21aeff] shadow-[0px_1.6px_3.2px_rgba(114,114,114,0.12)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={cartAssets.expandChevronIcon}
                  width={12}
                  height={7}
                  className={cn(
                    "block w-3 max-w-none transition-transform duration-300 ease-out",
                    expanded && "rotate-180",
                  )}
                />
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={onRemoveRequest}
            className="flex size-5 shrink-0 items-center justify-center opacity-80 hover:opacity-100"
            aria-label={`Remove ${item.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={cartAssets.trashIcon}
              width={20}
              height={20}
              className="block size-5"
            />
          </button>
        </div>

        <CartLineUpsellDividerSwap
          lineId={item.id}
          expanded={expanded}
          upsell={
            <CartUpsellRow
              upsellAdded={upsellAdded}
              onAddUpsell={onAddUpsell}
            />
          }
          divider={<CartDashedDivider />}
        />
        </div>

        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          aria-hidden={!expanded}
          className={cn(
            CART_SLIDE_GRID(expanded),
            expanded ? "mt-5" : "h-0 overflow-hidden",
          )}
        >
          <div className={CART_SLIDE_INNER(expanded)}>
            <CartLineExpandedDetails
              details={lineDetails}
              placeholderAvatarSrc={cartAssets.profilePlaceholder}
            />
          </div>
        </div>
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
    <div className="info-container flex w-full flex-col items-start gap-6">
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

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold leading-[1.5] text-[#222e48]">
          {cartPageContent.title}
        </h1>
        <p className="text-base font-medium leading-[1.35] text-[#222e48]">
          {titleCount}
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(0,750px)_minmax(0,1fr)] xl:items-start xl:justify-between xl:gap-x-8">
        <div className="flex w-full min-w-0 max-w-[750px] flex-col gap-4">
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

        <div className="w-full max-w-[548px] shrink-0 justify-self-end rounded-[24px] border border-[#f5f6f7] bg-white p-6 shadow-[0px_2px_3px_rgba(37,37,37,0.16)] xl:sticky xl:top-24">
          <div className="mx-auto flex w-full max-w-[500px] flex-col gap-7">
            <div className="flex w-full gap-3">
              <input
                type="text"
                placeholder={cartPageContent.couponPlaceholder}
                className="h-[50px] min-w-0 flex-1 rounded-xl border border-[#ace1ff] bg-white px-4 text-sm font-medium text-[#343e56] outline-none placeholder:text-[#888e9c]"
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

            <div className="flex w-full flex-col gap-5">
              <LinkTo
                href="/checkout"
                className="flex h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] text-lg font-medium leading-[1.5] text-white"
              >
                {cartPageContent.checkoutCtaLabel}
              </LinkTo>

              <div className="flex items-center justify-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={newOrderContent.assets.secureCheckoutGreenIcon}
                  width={20}
                  height={20}
                  className="size-5"
                />
                <p className="text-sm font-medium leading-[1.35] text-[#6a7283]">
                  {cartPageContent.sslLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
