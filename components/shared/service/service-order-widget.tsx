"use client"

import { useMemo, useState } from "react"

import { serviceHeroContent } from "@/data/service/hero"
import type {
  ServiceHeroContent,
  ServicePackageBadge,
  ServicePackageOption,
} from "@/types/service/hero"
import { PlatformIcon } from "@/components/shared/landing/services-explorer/services-explorer-ui"
import { cn } from "@/lib/utils"

type ServiceOrderWidgetProps = {
  content?: ServiceHeroContent["orderWidget"]
  assets?: Pick<
    ServiceHeroContent["assets"],
    "orderDividerLine" | "secureLockIcon" | "socialIconsSprite"
  >
}

const BADGE_LABEL: Record<ServicePackageBadge, string> = {
  popular: "POPULAR",
  "max-value": "MAX VALUE",
}

const QUALITY_BUTTON_INSET_SHADOW =
  "shadow-[inset_0px_-1.21154px_0px_rgba(255,255,255,0.06)]"

const SELECTED_PACKAGE_BG =
  "linear-gradient(97.43deg, rgba(0, 135, 212, 0.08) 2.53%, rgba(50, 180, 255, 0.08) 61.03%, rgba(7, 149, 231, 0.0696) 91.98%)"

function PackageCard({
  pkg,
  selected,
  onSelect,
}: {
  pkg: ServicePackageOption
  selected: boolean
  onSelect: () => void
}) {
  const secondaryLabel = pkg.saveLabel ?? pkg.unitLabel

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative isolate flex h-[85px] min-w-[120px] flex-1 items-center justify-center rounded-xl border px-5 py-4 text-center transition-colors",
        selected
          ? "border-[#21aeff]"
          : "border-[#ebecef] bg-white hover:border-[#c5e8fc]",
      )}
      style={selected ? { backgroundImage: SELECTED_PACKAGE_BG } : undefined}
    >
      {pkg.badge ? (
        <span className="pointer-events-none absolute -top-[13px] left-1/2 z-10 flex h-[26px] -translate-x-1/2 items-center justify-center rounded-md bg-[#db3761] px-[14px] py-1 text-xs font-medium leading-[1.5] text-white">
          {BADGE_LABEL[pkg.badge]}
        </span>
      ) : null}
      <span className="flex flex-col items-center gap-2">
        <span
          className={cn(
            "text-lg font-semibold leading-[1.3]",
            selected ? "text-[#21aeff]" : "text-[#343e56]",
          )}
        >
          {pkg.quantity}
        </span>
        <span
          className={cn(
            "text-base font-medium leading-[1.35]",
            selected ? "text-[#4f586d]" : "text-[#979ca8]",
          )}
        >
          {secondaryLabel}
        </span>
      </span>
    </button>
  )
}

export function ServiceOrderWidget({
  content = serviceHeroContent.orderWidget,
  assets = {
    orderDividerLine: serviceHeroContent.assets.orderDividerLine,
    secureLockIcon: serviceHeroContent.assets.secureLockIcon,
    socialIconsSprite: serviceHeroContent.assets.socialIconsSprite,
  },
}: ServiceOrderWidgetProps) {
  const [qualityId, setQualityId] = useState(content.defaultQualityId)
  const [platformId, setPlatformId] = useState(content.defaultPlatformId)
  const [packageId, setPackageId] = useState(content.defaultPackageId)
  const [username, setUsername] = useState("")

  const platform = useMemo(
    () => content.platforms.find((p) => p.id === platformId) ?? content.platforms[0],
    [content.platforms, platformId],
  )

  const selectedPackage = useMemo(
    () => content.packages.find((p) => p.id === packageId) ?? content.packages[0],
    [content.packages, packageId],
  )

  const ctaLabel = `Get ${selectedPackage.quantity} ${selectedPackage.unitLabel}`

  return (
    <div className="box-border flex w-full max-w-[661px] items-start gap-[10px] rounded-[24px] border border-[#f5f6f7] bg-white px-8 pb-8 pt-5 shadow-[0px_2px_6px_rgba(37,37,37,0.16)]">
      <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
        <div className="box-border flex h-[66px] w-full flex-col justify-center rounded-2xl border border-[#f2f2f2] bg-[#f5f6f7] p-1">
          <div className="flex h-[56px] gap-2">
            {content.qualityOptions.map((option, index) => {
              const active = option.id === qualityId
              return (
                <div key={option.id} className="relative min-w-0 flex-1">
                  {option.recommendedBadge ? (
                    <span className="absolute -top-[13px] left-1/2 z-10 flex h-[26px] w-[124px] -translate-x-1/2 items-center justify-center rounded-md bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] px-[14px] py-1 text-xs font-medium leading-[1.5] text-white">
                      {option.recommendedBadge}
                    </span>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setQualityId(option.id)}
                    className={cn(
                      "relative box-border flex h-full w-full items-center justify-center rounded-xl border border-solid text-base font-semibold leading-[1.5] [text-shadow:0px_0.4px_0.3px_rgba(0,0,0,0.08)]",
                      QUALITY_BUTTON_INSET_SHADOW,
                      index === 0 ? "px-6 py-4" : "px-7 py-4",
                      active
                        ? "border-[#269de7] bg-[#269de7] text-white"
                        : "border-[#ebecef] bg-white text-[#404a60]",
                    )}
                  >
                    {option.label}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative h-0 w-full shrink-0">
          <div className="absolute inset-[-1px_0_0_0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={assets.orderDividerLine}
              className="block size-full max-w-none"
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex h-[56px] w-full gap-3">
            {content.platforms.map((item) => {
              const active = item.id === platformId
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.label}
                  aria-pressed={active}
                  onClick={() => setPlatformId(item.id)}
                  className={cn(
                    "box-border flex min-w-0 flex-1 flex-col items-center justify-center rounded-xl p-3 transition-colors",
                    active
                      ? "bg-[#269de7] shadow-[0px_4px_8px_rgba(0,0,0,0.08)]"
                      : "border border-[#ebecef] bg-white",
                  )}
                >
                  <PlatformIcon
                    icon={item.icon}
                    size={32}
                    spriteSrc={assets.socialIconsSprite}
                  />
                </button>
              )
            })}
          </div>

          <div className="box-border flex w-full flex-col gap-5 rounded-2xl border border-[#f5f6f7] bg-[#f9f9f9] p-3">
            <label className="flex h-[58px] w-full min-w-[120px] items-center gap-2 rounded-xl border border-[#21aeff] bg-white px-5 py-4">
              <PlatformIcon
                icon={platform.icon}
                size={24}
                className="shrink-0"
                spriteSrc={assets.socialIconsSprite}
              />
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder={platform.usernamePlaceholder}
                className="min-w-0 flex-1 bg-transparent text-base font-medium leading-[1.35] text-[#232323] placeholder:text-[#979ca8] outline-none"
                autoComplete="off"
                spellCheck={false}
              />
            </label>

            <div className="relative isolate flex w-full flex-col gap-3">
              {[0, 1, 2].map((rowIndex) => (
                <div key={rowIndex} className="flex gap-3">
                  {content.packages
                    .slice(rowIndex * 3, rowIndex * 3 + 3)
                    .map((pkg) => (
                      <PackageCard
                        key={pkg.id}
                        pkg={pkg}
                        selected={pkg.id === packageId}
                        onSelect={() => setPackageId(pkg.id)}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full items-start justify-center gap-4">
              <div className="flex h-[59px] w-[120px] shrink-0 flex-col justify-center gap-1">
                <span className="text-sm font-medium leading-[1.35] text-[#343e56]">
                  Total price
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-semibold leading-[1.5] text-[#21aeff]">
                    {selectedPackage.price}
                  </span>
                  <span className="text-sm font-normal leading-[1.3] text-[#798090] line-through">
                    {selectedPackage.compareAtPrice}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="flex h-[59px] min-w-[120px] flex-1 items-center justify-center rounded-xl bg-[#269de7] py-4 pl-4 pr-3 text-base font-medium leading-[1.35] text-white"
              >
                {ctaLabel}
              </button>
            </div>

            <p className="flex items-center gap-1 text-sm font-medium leading-[1.35] text-[#5b6477]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={assets.secureLockIcon}
                width={18}
                height={18}
                className="size-[18px] shrink-0"
              />
              {content.secureCheckoutLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
