"use client"

import { useMemo, useState } from "react"

import type {
  HeroOrderPlatformOption,
  HeroOrderServiceOption,
  LandingHeroContent,
} from "@/types/landing/hero"
import { HeroSpriteIcon } from "@/components/shared/landing/hero-sprite-icon"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type HeroOrderCardProps = {
  orderCard: LandingHeroContent["orderCard"]
  chevronSrc: string
  spriteSrc: string
}

const triggerClassName =
  "h-auto min-h-[63px] w-full max-w-none justify-between gap-3 rounded-xl border border-n20 bg-n20 px-5 py-[18px] text-lg font-medium text-n600 shadow-none focus-visible:border-[#8ad8ff] focus-visible:ring-[3px] focus-visible:ring-[#8ad8ff]/30 data-[size=default]:h-auto [&>svg]:hidden"

function ServiceLeadingIcon({ service }: { service: HeroOrderServiceOption }) {
  if (!service.icon) {
    return null
  }

  return (
    <span className="relative h-[18px] w-[20.195px] shrink-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={service.icon.src}
        width={service.icon.width}
        height={service.icon.height}
        className={service.icon.className}
      />
    </span>
  )
}

function HeroSelectField({
  label,
  chevronSrc,
  value,
  onValueChange,
  children,
}: {
  label: string
  chevronSrc: string
  value: string
  onValueChange: (value: string | null) => void
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-base font-medium leading-[1.35] text-n500">{label}</p>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={triggerClassName} size="default">
          <SelectValue className="flex flex-1 items-center gap-1.5 text-lg font-medium leading-normal text-n600" />
          <span className="relative size-6 shrink-0 rotate-180 -scale-y-100" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={chevronSrc} className="block size-full max-w-none" />
          </span>
        </SelectTrigger>
        <SelectContent align="start" className="max-h-60 w-(--anchor-width)">
          {children}
        </SelectContent>
      </Select>
    </div>
  )
}

export function HeroOrderCard({
  orderCard,
  chevronSrc,
  spriteSrc,
}: HeroOrderCardProps) {
  const {
    platformField,
    serviceField,
    defaultPlatformId,
    defaultServiceId,
    platforms,
    servicesByPlatform,
    submitLabel,
  } = orderCard

  const [platformId, setPlatformId] = useState(defaultPlatformId)
  const [serviceId, setServiceId] = useState(defaultServiceId)

  const services = useMemo(
    () => servicesByPlatform[platformId] ?? [],
    [platformId, servicesByPlatform]
  )

  const handlePlatformChange = (nextPlatformId: string | null) => {
    if (!nextPlatformId) return
    setPlatformId(nextPlatformId)
    const nextServices = servicesByPlatform[nextPlatformId] ?? []
    setServiceId(nextServices[0]?.id ?? "")
  }

  const handleServiceChange = (nextServiceId: string | null) => {
    if (!nextServiceId) return
    setServiceId(nextServiceId)
  }

  return (
    <div className="h-[325.6px] w-full shrink-0 overflow-hidden rounded-2xl border-[1.3px] border-[#8ad8ff] bg-white">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-4">
          <HeroSelectField
            label={platformField.label}
            chevronSrc={chevronSrc}
            value={platformId}
            onValueChange={handlePlatformChange}
          >
            {platforms.map((platform) => (
              <SelectItem key={platform.id} value={platform.id}>
                <PlatformOptionContent platform={platform} spriteSrc={spriteSrc} />
              </SelectItem>
            ))}
          </HeroSelectField>

          <HeroSelectField
            label={serviceField.label}
            chevronSrc={chevronSrc}
            value={serviceId}
            onValueChange={handleServiceChange}
          >
            {services.map((service) => (
              <SelectItem key={service.id} value={service.id}>
                <span className="flex items-center gap-1.5">
                  <ServiceLeadingIcon service={service} />
                  {service.label}
                </span>
              </SelectItem>
            ))}
          </HeroSelectField>
        </div>

        <button
          type="button"
          className="relative flex w-full items-center justify-center rounded-xl bg-button px-6 py-4 text-lg font-semibold leading-[1.3] text-white shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04)]"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  )
}

function PlatformOptionContent({
  platform,
  spriteSrc,
}: {
  platform: HeroOrderPlatformOption
  spriteSrc: string
}) {
  return (
    <span className="flex items-center gap-1.5">
      <HeroSpriteIcon spriteSrc={spriteSrc} crop={platform.spriteIcon} />
      {platform.label}
    </span>
  )
}
