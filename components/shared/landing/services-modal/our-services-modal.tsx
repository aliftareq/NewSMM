"use client"

import { useEffect, useMemo, useState } from "react"

import { landingServicesModalContent } from "@/data/landing/services-modal"
import type {
  ServicesModalContent,
  ServicesModalPlatformId,
} from "@/types/landing/services-modal"
import {
  PlatformSidebar,
  ServicesPanel,
} from "@/components/shared/landing/services-explorer/services-explorer-ui"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

type OurServicesModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  content?: ServicesModalContent
}

export function OurServicesModal({
  open,
  onOpenChange,
  content = landingServicesModalContent,
}: OurServicesModalProps) {
  const [activePlatformId, setActivePlatformId] = useState<ServicesModalPlatformId>(
    content.defaultPlatformId
  )

  useEffect(() => {
    if (open) {
      setActivePlatformId(content.defaultPlatformId)
    }
  }, [open, content.defaultPlatformId])

  const activePlatform = useMemo(
    () =>
      content.platforms.find((p) => p.id === activePlatformId) ?? content.platforms[0],
    [activePlatformId, content.platforms]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-h-[min(720px,calc(100vh-2rem))] w-[min(1320px,calc(100vw-2rem))] max-w-none gap-0 overflow-hidden rounded-[20px] border-0 bg-white p-7 ring-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">Our services</DialogTitle>
        <div className="flex max-h-[min(664px,calc(100vh-4rem))] flex-col gap-6 overflow-y-auto lg:flex-row lg:overflow-hidden">
          <PlatformSidebar
            platforms={content.platforms}
            activeId={activePlatform.id}
            onSelect={setActivePlatformId}
          />
          <div
            className="hidden w-px shrink-0 self-stretch bg-[#ebecef] lg:block"
            aria-hidden
          />
          <div className="min-h-0 min-w-0 flex-1 lg:overflow-y-auto lg:pr-1">
            <ServicesPanel platform={activePlatform} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
