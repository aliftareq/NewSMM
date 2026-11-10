"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

import { cartPageContent } from "@/data/cart/cart"
import { landingNavbarContent } from "@/data/landing/navbar"
import { useCart } from "@/hooks/use-cart"
import { useCartRemoveConfirm } from "@/hooks/use-cart-remove-confirm"
import { formatUsd } from "@/lib/build-order-href"
import { LinkTo } from "@/components/shared/link-to"
import { CartMiniLineItem } from "@/components/shared/cart/cart-mini-line-item"
import { CartRemoveItemDialog } from "@/components/shared/cart/cart-remove-item-dialog"

type PanelPosition = {
  top: number
  right: number
  width: number
}

export function MarketingNavbarCart() {
  const { cart } = landingNavbarContent
  const { items, removeItem, itemCount, subtotal } = useCart()
  const {
    pendingTitle,
    removeDialogOpen,
    requestRemove,
    dismissRemove,
    confirmRemove,
  } = useCartRemoveConfirm(removeItem)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [panelPosition, setPanelPosition] = useState<PanelPosition | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<number | null>(null)

  const itemsLabel = cartPageContent.miniCartItemsTemplate.replace(
    "{count}",
    String(itemCount),
  )

  const measurePanel = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) {
      return
    }
    const rect = trigger.getBoundingClientRect()
    setPanelPosition({
      top: rect.bottom + 4,
      right: Math.max(16, window.innerWidth - rect.right),
      width: Math.min(360, window.innerWidth - 32),
    })
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) {
      return
    }
    measurePanel()
    const onLayout = () => measurePanel()
    window.addEventListener("resize", onLayout)
    window.addEventListener("scroll", onLayout, true)
    return () => {
      window.removeEventListener("resize", onLayout)
      window.removeEventListener("scroll", onLayout, true)
    }
  }, [measurePanel, open])

  useEffect(() => {
    if (!open) {
      return
    }
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        triggerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return
      }
      setOpen(false)
    }
    window.addEventListener("mousedown", onPointerDown)
    return () => window.removeEventListener("mousedown", onPointerDown)
  }, [open])

  const cancelCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const scheduleClose = () => {
    cancelCloseTimer()
    closeTimerRef.current = window.setTimeout(() => setOpen(false), 160)
  }

  const openPanel = () => {
    cancelCloseTimer()
    measurePanel()
    setOpen(true)
  }

  const panel = open && panelPosition && mounted ? (
    createPortal(
      <div
        ref={panelRef}
        className="fixed z-[220]"
        style={{
          top: panelPosition.top,
          right: panelPosition.right,
          width: panelPosition.width,
        }}
        onMouseEnter={cancelCloseTimer}
        onMouseLeave={scheduleClose}
      >
        <div className="rounded-2xl border border-[#ebecef] bg-white p-4 shadow-[0px_8px_24px_rgba(37,37,37,0.12)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-base font-semibold leading-[1.3] text-[#222e48]">
              {cartPageContent.miniCartTitle}
            </p>
            <p className="text-sm font-medium leading-[1.35] text-[#798090]">
              {itemsLabel}
            </p>
          </div>
          <div className="flex max-h-[240px] flex-col gap-4 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-sm text-[#4f586d]">No items yet.</p>
            ) : (
              items.map((item) => (
                <CartMiniLineItem
                  key={item.id}
                  item={item}
                  onRemove={() => requestRemove(item.id, item.title)}
                />
              ))
            )}
          </div>
          <div className="mt-4 h-px w-full border-t border-dashed border-[#c1c4cc]" />
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm font-semibold tracking-wide text-[#222e48]">
              {cartPageContent.miniCartTotalLabel}
            </p>
            <p className="text-lg font-semibold leading-[1.3] text-[#222e48]">
              {formatUsd(subtotal)}
            </p>
          </div>
          <LinkTo
            href={cart.href}
            className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-[#21aeff] text-base font-medium leading-[1.35] text-white shadow-[0px_4px_6px_rgba(0,0,0,0.12)]"
            onClick={() => setOpen(false)}
          >
            {cartPageContent.miniCartCheckoutLabel}
          </LinkTo>
        </div>
      </div>,
      document.body,
    )
  ) : null

  return (
    <>
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
      <button
        ref={triggerRef}
        type="button"
        aria-label={cart.label}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => {
          if (open) {
            setOpen(false)
          } else {
            openPanel()
          }
        }}
        onMouseEnter={openPanel}
        onMouseLeave={scheduleClose}
        className="relative flex size-12 cursor-pointer items-center justify-center rounded-xl border border-[rgba(97,197,255,0.29)] bg-white shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={cart.iconSrc} width={24} height={24} className="block" />
        {itemCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#21aeff] text-[11px] font-semibold leading-none text-white">
            {itemCount}
          </span>
        ) : null}
      </button>
      {panel}
    </>
  )
}
