"use client"

import { useState } from "react"

import { cartPageContent } from "@/data/cart/cart"
import { serviceHeroContent } from "@/data/service/hero"
import { ServiceOrderWidget } from "@/components/shared/service/service-order-widget"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type CartAddServiceLinkProps = {
  className?: string
}

export function CartAddServiceLink({ className }: CartAddServiceLinkProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex h-[54px] w-full min-w-[120px] items-center justify-center gap-2 rounded-xl border border-dashed border-[#21aeff] bg-[rgba(33,174,255,0.04)] px-4 py-4 text-base font-medium leading-[1.35] text-[#21aeff]",
          className,
        )}
      >
        <span
          className="relative flex size-6 shrink-0 items-center justify-center"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={cartPageContent.assets.addServicePlusVertical}
            width={3}
            height={17}
            className="absolute block"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={cartPageContent.assets.addServicePlusHorizontal}
            width={17}
            height={3}
            className="absolute block"
          />
        </span>
        {cartPageContent.addServiceLabel}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="max-h-[min(92vh,860px)] w-[calc(100%-2rem)] max-w-[700px] gap-0 overflow-y-auto border-[#ebecef] bg-[#f9fafb] p-3 sm:max-w-[700px] sm:p-4"
        >
          <DialogTitle className="sr-only">
            {cartPageContent.addServiceModalTitle}
          </DialogTitle>
          {open ? (
            <ServiceOrderWidget
              className="mx-0 max-w-none shadow-none"
              forceNewDraftGroup
              appendNewOrderQuery
              onBeforeNavigate={() => setOpen(false)}
              assets={{
                orderDividerLine: serviceHeroContent.assets.orderDividerLine,
                secureLockIcon: serviceHeroContent.assets.secureLockIcon,
                socialIconsSprite: serviceHeroContent.assets.socialIconsSprite,
              }}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
