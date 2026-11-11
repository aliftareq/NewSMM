"use client"

import { useEffect, useMemo, useState } from "react"

import { landingServicesModalContent } from "@/data/landing/services-modal"
import type {
  ServicesModalContent,
  ServicesModalPlatformId,
} from "@/types/landing/services-modal"
import { PlatformSidebar } from "@/components/shared/landing/services-explorer/services-explorer-ui"
import {
  AnimatedServicesPanel,
  useTabSlideDirection,
} from "@/components/shared/landing/services-explorer/services-explorer-tabs-motion"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type OurServicesModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  content?: ServicesModalContent
  /** Viewport `top` for the dialog when sitting below the scrolled glass navbar. */
  anchorTopPx?: number
}

export function OurServicesModal({
  open,
  onOpenChange,
  content = landingServicesModalContent,
  anchorTopPx = 0,
}: OurServicesModalProps) {
  const [activePlatformId, setActivePlatformId] = useState<ServicesModalPlatformId>(
    content.defaultPlatformId,
  )
  const [slideDirection, setSlideDirection] = useState(0)

  const defaultIndex = useMemo(
    () =>
      Math.max(
        0,
        content.platforms.findIndex((p) => p.id === content.defaultPlatformId),
      ),
    [content.defaultPlatformId, content.platforms],
  )

  const { getDirection } = useTabSlideDirection(defaultIndex)

  useEffect(() => {
    if (open) {
      setActivePlatformId(content.defaultPlatformId)
      setSlideDirection(0)
    }
  }, [open, content.defaultPlatformId])

  const activePlatform = useMemo(
    () =>
      content.platforms.find((p) => p.id === activePlatformId) ??
      content.platforms[0],
    [activePlatformId, content.platforms],
  )

  const belowScrolledNavbar = anchorTopPx > 0
  const bottomInsetPx = belowScrolledNavbar ? anchorTopPx + 20 : 0
  const dialogPositionStyle = belowScrolledNavbar
    ? {
        top: anchorTopPx,
        maxHeight: `min(720px, calc(100vh - ${bottomInsetPx}px))`,
      }
    : undefined
  const panelMaxHeight = belowScrolledNavbar
    ? `min(664px, calc(100vh - ${bottomInsetPx}px - 2rem))`
    : undefined

  const handleSelect = (id: ServicesModalPlatformId) => {
    const index = content.platforms.findIndex((p) => p.id === id)
    if (index >= 0) {
      setSlideDirection(getDirection(index))
    }
    setActivePlatformId(id)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        centered={!belowScrolledNavbar}
        showCloseButton
        closeButtonClassName="top-2 right-2 rounded-xl bg-button/20 text-button hover:!bg-button hover:!text-white focus-visible:!ring-button/30 sm:top-2.5 sm:right-2.5"
        overlayClassName="z-[89]"
        style={dialogPositionStyle}
        className={cn(
          "z-[90] w-[min(1320px,calc(100vw-2rem))] max-w-none gap-0 overflow-hidden rounded-[20px] border-0 bg-white p-7 ring-0 sm:max-w-none",
          "duration-200 data-open:!opacity-100 data-open:zoom-in-100 data-closed:zoom-out-100",
          belowScrolledNavbar
            ? "transition-[top,max-height] duration-300 ease-out"
            : "max-h-[min(720px,calc(100vh-2rem))]",
        )}
      >
        <DialogTitle className="sr-only">Our services</DialogTitle>
        <div
          className={cn(
            "flex flex-col gap-6 overflow-y-auto lg:flex-row lg:overflow-hidden",
            !belowScrolledNavbar && "max-h-[min(664px,calc(100vh-4rem))]",
          )}
          style={panelMaxHeight ? { maxHeight: panelMaxHeight } : undefined}
        >
          <PlatformSidebar
            platforms={content.platforms}
            activeId={activePlatform.id}
            onSelect={handleSelect}
          />
          <div
            className="hidden w-px shrink-0 self-stretch bg-[#ebecef] lg:block"
            aria-hidden
          />
          <div className="min-h-0 min-w-0 flex-1 lg:overflow-y-auto lg:pr-1">
            <AnimatedServicesPanel
              platform={activePlatform}
              direction={slideDirection}
              panelMotion="vertical"
              enableScrollReveal
              allServicesLinkClassName="sm:mr-3"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
