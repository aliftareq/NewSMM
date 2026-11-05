"use client"

import { useMemo, useState } from "react"

import { landingServicesModalContent } from "@/data/landing/services-modal"
import type {
  ServicesModalContent,
  ServicesModalPlatformId,
} from "@/types/landing/services-modal"
import {
  AnimatedPlatformTabs,
  AnimatedServicesPanel,
  useTabSlideDirection,
} from "@/components/shared/landing/services-explorer/services-explorer-tabs-motion"
import { AnimatedContent } from "@/components/shared/animated-content"
import { landingScrollRevealProps } from "@/components/shared/landing/landing-section-heading-reveal"

type ServicesExplorerCardProps = {
  content?: ServicesModalContent
}

/** Interactive platform tabs + service grid (Figma 25704:29240) */
export function ServicesExplorerCard({
  content = landingServicesModalContent,
}: ServicesExplorerCardProps) {
  const [activePlatformId, setActivePlatformId] = useState<ServicesModalPlatformId>(
    content.defaultPlatformId
  )
  const [slideDirection, setSlideDirection] = useState(0)

  const defaultIndex = useMemo(
    () =>
      Math.max(
        0,
        content.platforms.findIndex((p) => p.id === content.defaultPlatformId)
      ),
    [content.defaultPlatformId, content.platforms]
  )

  const { getDirection } = useTabSlideDirection(defaultIndex)

  const activePlatform = useMemo(() => {
    const index = Math.max(
      0,
      content.platforms.findIndex((p) => p.id === activePlatformId)
    )
    return content.platforms[index] ?? content.platforms[0]
  }, [activePlatformId, content.platforms])

  const handleSelect = (id: ServicesModalPlatformId, index: number) => {
    setSlideDirection(getDirection(index))
    setActivePlatformId(id)
  }

  return (
    <div className="flex w-full flex-col gap-6 rounded-3xl bg-white p-7">
      <AnimatedContent className="w-full" {...landingScrollRevealProps} stagger={0}>
        <AnimatedPlatformTabs
          platforms={content.platforms}
          activeId={activePlatformId}
          onSelect={handleSelect}
        />
      </AnimatedContent>
      <AnimatedServicesPanel platform={activePlatform} direction={slideDirection} />
    </div>
  )
}
