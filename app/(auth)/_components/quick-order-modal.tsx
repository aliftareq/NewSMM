"use client"

import { useEffect, useState } from "react"

import { quickOrderModalContent } from "@/app/(auth)/_data/quick-order-modal"
import type { QuickOrderModalContent } from "@/app/(auth)/_types/quick-order-modal"
import { serviceHeroContent } from "@/data/service/hero"
import { ServiceOrderWidget } from "@/components/shared/service/service-order-widget"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const CLOSE_LAYOUT_HOLD_MS = 320

type QuickOrderModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  content?: QuickOrderModalContent
  /** Viewport `top` when sitting below the fixed marketing navbar bar + gap. */
  anchorTopPx?: number
}

/** Figma 25687:7054 — navbar quick order */
export function QuickOrderModal({
  open,
  onOpenChange,
  content = quickOrderModalContent,
  anchorTopPx = 0,
}: QuickOrderModalProps) {
  const [heldAnchorTopPx, setHeldAnchorTopPx] = useState(0)

  useEffect(() => {
    if (open) {
      setHeldAnchorTopPx(anchorTopPx)
      return
    }
    const timer = window.setTimeout(() => setHeldAnchorTopPx(0), CLOSE_LAYOUT_HOLD_MS)
    return () => window.clearTimeout(timer)
  }, [open, anchorTopPx])

  const layoutAnchorTopPx = open ? anchorTopPx : heldAnchorTopPx
  const belowNavbar = layoutAnchorTopPx > 0
  const bottomViewportGapPx = 8
  const bottomInsetPx = belowNavbar
    ? layoutAnchorTopPx + bottomViewportGapPx
    : 0
  const scrollMaxHeight = belowNavbar
    ? `min(700px, calc(100vh - ${bottomInsetPx}px))`
    : "min(700px, calc(100vh - 2rem))"

  const dialogPositionStyle = belowNavbar
    ? { top: layoutAnchorTopPx }
    : undefined

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        centered={!belowNavbar}
        showCloseButton={false}
        overlayClassName="z-[89]"
        style={dialogPositionStyle}
        className={cn(
          "z-[90] box-border w-[min(520px,calc(100vw-2rem))] max-w-[520px] gap-0 overflow-visible rounded-3xl border border-[#ebecef] bg-white !p-[28px] shadow-[0px_8px_32px_rgba(39,83,132,0.14)] sm:max-w-[520px]",
          belowNavbar &&
            open &&
            "translate-y-0 transition-[top] duration-300 ease-out",
        )}
      >
        <DialogClose className="absolute top-[-20px] right-[-22px] z-[60] flex h-[42px] w-[43.787px] items-center justify-center overflow-hidden rounded-[10.723px] border-0 bg-[#21aeff] p-0 outline-none transition-colors hover:bg-[#1da3f5] focus-visible:ring-2 focus-visible:ring-white/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={content.assets.closeIcon}
            width={30.383}
            height={30.383}
            className="block shrink-0"
          />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div
          className="flex min-h-0 flex-col overflow-x-hidden overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ maxHeight: scrollMaxHeight }}
        >
          <div className="flex flex-col gap-0.5">
            <DialogTitle className="text-left text-lg font-semibold leading-[1.35] text-[#222e48]">
              {content.title}
            </DialogTitle>
            <p className="text-xs font-medium leading-[1.35] text-[#6a7283] sm:text-sm">
              {content.subtitle}
            </p>
          </div>

          <div className="relative my-3 h-px w-full shrink-0" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={content.assets.divider}
              className="block h-px w-full max-w-none"
            />
          </div>

          {open ? (
            <ServiceOrderWidget
              className="mx-0 max-w-none rounded-none border-0 bg-transparent shadow-none"
              compact
              hideQualityTabs
              shellPadding={false}
              showSecureCheckoutNote={false}
              forceNewDraftGroup
              appendNewOrderQuery
              onBeforeNavigate={() => onOpenChange(false)}
              assets={{
                orderDividerLine: serviceHeroContent.assets.orderDividerLine,
                secureLockIcon: serviceHeroContent.assets.secureLockIcon,
                socialIconsSprite: serviceHeroContent.assets.socialIconsSprite,
              }}
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
