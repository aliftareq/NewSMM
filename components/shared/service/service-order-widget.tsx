"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import { serviceHeroContent } from "@/data/service/hero"
import { mapHeroPackagesForOrder } from "@/lib/service-quality-pricing"
import type {
  ServiceHeroContent,
  ServicePackageBadge,
  ServicePackageOption,
} from "@/types/service/hero"
import { LinkTo } from "@/components/shared/link-to"
import { LAYOUT_IDS, SlidingTabPill } from "@/components/shared/sliding-tab-pill"
import {
  PlatformIcon,
  platformTabCssVars,
  platformTabInactiveHoverClasses,
} from "@/components/shared/landing/services-explorer/services-explorer-ui"
import {
  SERVICE_PAGE_SERVICE_QUERY_KEY,
  getServicePlatformPageHref,
  resolveServiceProductIdFromQuery,
} from "@/lib/service-platform-routes"
import { getPlatformThemeById } from "@/lib/services-platform-theme"
import { startNewDraftGroup } from "@/lib/cart-draft-group"
import { readCart } from "@/lib/cart-storage"
import { buildOrderHref } from "@/lib/build-order-href"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const SERVICE_PRODUCT_SELECT_TRIGGER_CLASS =
  "flex h-[58px] min-h-[58px] w-full items-center justify-between gap-2 rounded-xl border border-[#dfe0e4] bg-white px-5 py-4 text-base font-medium text-[#13203b] shadow-none focus-visible:border-[#8ad8ff] focus-visible:ring-[3px] focus-visible:ring-[#8ad8ff]/30 data-[size=default]:h-[58px] [&>svg]:hidden"

const SERVICE_PRODUCT_MENU_CLASS =
  "max-h-60 w-(--anchor-width) rounded-xl border border-[#dfe0e4] bg-white p-1.5 text-[#13203b] shadow-[0px_8px_24px_rgba(38,157,231,0.14)] ring-0"

const SERVICE_PRODUCT_MENU_ITEM_CLASS =
  "rounded-lg py-2.5 pr-8 pl-3 text-base font-medium text-[#13203b] data-highlighted:bg-[#eaf6fd] data-highlighted:text-button data-selected:bg-[#eaf6fd] data-selected:text-button focus:bg-[#eaf6fd] focus:text-button"

type ServiceOrderWidgetProps = {
  content?: ServiceHeroContent["orderWidget"]
  assets?: Pick<
    ServiceHeroContent["assets"],
    "orderDividerLine" | "secureLockIcon" | "socialIconsSprite"
  >
  className?: string
  /** Always start a new cart draft group before navigating to /order. */
  forceNewDraftGroup?: boolean
  /** Append `newOrder=1` for /order to pick up the new draft group. */
  appendNewOrderQuery?: boolean
  onBeforeNavigate?: () => void
  /** Hero: platform tabs link to `/{platform}-services` instead of switching in-widget. */
  platformTabsNavigateToServicePages?: boolean
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
  showBadge,
}: {
  pkg: ServicePackageOption
  selected: boolean
  onSelect: () => void
  showBadge?: boolean
}) {
  const secondaryLabel = pkg.saveLabel ?? pkg.unitLabel

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative isolate box-border flex h-[72px] min-w-0 flex-1 basis-0 items-center justify-center overflow-visible rounded-xl border border-solid px-2 py-3 sm:h-[85px] sm:min-w-0 sm:px-3 sm:py-4 lg:px-2 xl:min-w-[120px] xl:px-5",
        selected
          ? "border-[#21aeff]"
          : "border-[#ebecef] bg-white hover:border-[#c5e8fc]",
      )}
      style={selected ? { backgroundImage: SELECTED_PACKAGE_BG } : undefined}
    >
      {showBadge && pkg.badge ? (
        <span
          className={cn(
            "pointer-events-none absolute -top-[9px] left-1/2 z-10 flex h-[22px] min-w-max max-w-none -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-md bg-[#db3761] px-2.5 py-1 text-[10px] font-medium leading-none text-white sm:-top-[11px] sm:h-[26px] sm:px-[14px] sm:py-1 sm:text-xs sm:leading-[1.5]",
            pkg.badge === "max-value" && "sm:min-w-[98px]",
            pkg.badge === "popular" && "sm:min-w-[85px]",
          )}
        >
          {BADGE_LABEL[pkg.badge]}
        </span>
      ) : null}
      <span className="flex flex-col items-center justify-center gap-2">
        <span
          className={cn(
            "text-base font-semibold leading-[1.3] sm:text-lg",
            selected ? "text-[#21aeff]" : "text-[#343e56]",
          )}
        >
          {pkg.quantity}
        </span>
        <span
          className={cn(
            "text-sm font-medium leading-[1.35] sm:text-base",
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
  className,
  forceNewDraftGroup = false,
  appendNewOrderQuery = false,
  onBeforeNavigate,
  platformTabsNavigateToServicePages = false,
  assets = {
    orderDividerLine: serviceHeroContent.assets.orderDividerLine,
    secureLockIcon: serviceHeroContent.assets.secureLockIcon,
    socialIconsSprite: serviceHeroContent.assets.socialIconsSprite,
  },
}: ServiceOrderWidgetProps) {
  const searchParams = useSearchParams()
  const serviceFromUrl = searchParams.get(SERVICE_PAGE_SERVICE_QUERY_KEY)

  const [qualityId, setQualityId] = useState(content.defaultQualityId)
  const [platformId, setPlatformId] = useState(content.defaultPlatformId)
  const [packageId, setPackageId] = useState(content.defaultPackageId)
  const [serviceProductId, setServiceProductId] = useState(() =>
    resolveServiceProductIdFromQuery(
      content.defaultPlatformId,
      content.serviceProductsByPlatform,
      content.defaultServiceProductId,
      serviceFromUrl,
    ),
  )
  const [username, setUsername] = useState("")

  const serviceProducts = useMemo(
    () => content.serviceProductsByPlatform[platformId] ?? [],
    [content.serviceProductsByPlatform, platformId],
  )

  const selectedServiceProduct = useMemo(
    () =>
      serviceProducts.find((item) => item.id === serviceProductId) ??
      serviceProducts[0],
    [serviceProductId, serviceProducts],
  )

  useEffect(() => {
    const fromUrl = searchParams.get(SERVICE_PAGE_SERVICE_QUERY_KEY)
    if (fromUrl) {
      const resolved = resolveServiceProductIdFromQuery(
        platformId,
        content.serviceProductsByPlatform,
        content.defaultServiceProductId,
        fromUrl,
      )
      if (resolved !== serviceProductId) {
        setServiceProductId(resolved)
        return
      }
    }
    if (serviceProducts.some((item) => item.id === serviceProductId)) return
    const fallback = serviceProducts[0]?.id
    if (fallback) setServiceProductId(fallback)
  }, [
    content.defaultServiceProductId,
    content.serviceProductsByPlatform,
    platformId,
    searchParams,
    serviceProductId,
    serviceProducts,
  ])

  const platform = useMemo(
    () => content.platforms.find((p) => p.id === platformId) ?? content.platforms[0],
    [content.platforms, platformId],
  )

  const packagesForOrder = useMemo(
    () => mapHeroPackagesForOrder(content.packages, qualityId, platformId),
    [content.packages, qualityId, platformId],
  )

  const selectedPackage = useMemo(
    () => packagesForOrder.find((p) => p.id === packageId) ?? packagesForOrder[0],
    [packagesForOrder, packageId],
  )

  const qualityLabel =
    content.qualityOptions.find((q) => q.id === qualityId)?.label ?? ""

  const ctaLabel = `Get ${selectedPackage.quantity} ${selectedPackage.unitLabel}`

  const orderHref = useMemo(() => {
    const href = buildOrderHref({
      quantity: selectedPackage.quantity,
      price: selectedPackage.price,
      compareAtPrice: selectedPackage.compareAtPrice,
      platformId,
      qualityId,
      unitLabel: selectedPackage.unitLabel,
      username,
    })
    return appendNewOrderQuery ? `${href}&newOrder=1` : href
  }, [
    appendNewOrderQuery,
    platformId,
    qualityId,
    selectedPackage.compareAtPrice,
    selectedPackage.price,
    selectedPackage.quantity,
    selectedPackage.unitLabel,
    username,
  ])

  const handleNavigateToOrder = () => {
    if (forceNewDraftGroup || readCart().items.length > 0) {
      startNewDraftGroup()
    }
    onBeforeNavigate?.()
  }

  return (
    <div
      className={cn(
        "box-border mx-auto flex w-full min-w-0 max-w-[661px] items-start gap-[10px] rounded-[20px] border border-[#f5f6f7] bg-white px-4 pb-6 pt-4 shadow-[0px_2px_6px_rgba(37,37,37,0.16)] sm:rounded-[24px] sm:px-6 sm:pb-8 sm:pt-5 md:px-7 lg:px-6 xl:px-8",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col items-start gap-5 sm:gap-6">
        <div
          role="tablist"
          aria-label="Package quality"
          className="box-border flex min-h-[60px] w-full flex-col justify-center rounded-2xl border border-[#f2f2f2] bg-[#f5f6f7] p-1 sm:h-[66px]"
        >
          <div className="flex min-h-[52px] gap-2 sm:h-[56px]">
            {content.qualityOptions.map((option, index) => {
              const active = option.id === qualityId
              return (
                <div key={option.id} className="relative min-w-0 flex-1">
                  {option.recommendedBadge ? (
                    <span className="absolute -top-[13px] left-1/2 z-20 flex h-[22px] max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center justify-center rounded-md bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] px-2 py-0.5 text-[10px] font-medium leading-[1.5] text-white sm:h-[26px] sm:max-w-none sm:px-[14px] sm:py-1 sm:text-xs sm:w-[124px]">
                      {option.recommendedBadge}
                    </span>
                  ) : null}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setQualityId(option.id)}
                    className={cn(
                      "relative box-border flex h-full w-full items-center justify-center rounded-xl border border-solid text-sm font-semibold leading-[1.5] transition-[border-color,color,transform] duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#269de7]/45 focus-visible:ring-offset-1 sm:text-base",
                      index === 0 ? "px-3 py-3 sm:px-6 sm:py-4" : "px-3.5 py-3 sm:px-7 sm:py-4",
                      active
                        ? cn(
                            "z-10 border-transparent text-white",
                            QUALITY_BUTTON_INSET_SHADOW,
                          )
                        : "border-[#ebecef] bg-white text-[#404a60] hover:border-[#c5e8fc] hover:bg-[#fafafa] [text-shadow:0px_0.4px_0.3px_rgba(0,0,0,0.08)]",
                    )}
                  >
                    {active ? (
                      <SlidingTabPill
                        layoutId={LAYOUT_IDS.serviceHeroQuality}
                        className="rounded-xl border border-[#269de7] bg-[#269de7] shadow-[0px_4px_14px_rgba(38,157,231,0.4)]"
                      />
                    ) : null}
                    <span className="relative z-10">{option.label}</span>
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

        <div className="flex w-full flex-col items-center gap-5 sm:gap-6">
          <div
            role="tablist"
            aria-label="Social platforms"
            className="-mx-1 flex w-full gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 [scrollbar-width:none] sm:mx-0 sm:gap-3 sm:px-0 sm:pb-0 md:h-[56px] lg:overflow-x-auto lg:pb-1 xl:h-[56px] xl:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            {content.platforms.map((item) => {
              const active = item.id === platformId
              const theme = getPlatformThemeById(item.id)
              const tabClassName = cn(
                "relative box-border flex h-12 min-w-[52px] shrink-0 flex-col items-center justify-center rounded-xl border border-solid p-2 transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.97] sm:h-auto sm:min-w-[48px] sm:flex-1 sm:p-2.5 lg:min-w-[44px] xl:min-w-0 xl:p-3",
                active ? "z-10 border-transparent" : platformTabInactiveHoverClasses,
              )
              const tabStyle = active ? undefined : platformTabCssVars(theme)
              const tabBody = (
                <>
                  {active ? (
                    <SlidingTabPill
                      layoutId={LAYOUT_IDS.serviceHeroPlatform}
                      className="rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.08)]"
                      style={{ backgroundColor: theme.tabActiveBg }}
                    />
                  ) : null}
                  <span className="relative z-10">
                    <PlatformIcon
                      icon={item.icon}
                      size={32}
                      spriteSrc={assets.socialIconsSprite}
                    />
                  </span>
                </>
              )

              if (platformTabsNavigateToServicePages) {
                return (
                  <LinkTo
                    key={item.id}
                    href={getServicePlatformPageHref(item.id)}
                    role="tab"
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                    aria-selected={active}
                    className={tabClassName}
                    style={tabStyle}
                  >
                    {tabBody}
                  </LinkTo>
                )
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-label={item.label}
                  aria-selected={active}
                  onClick={() => setPlatformId(item.id)}
                  className={tabClassName}
                  style={tabStyle}
                >
                  {tabBody}
                </button>
              )
            })}
          </div>

          <div
            className={cn(
              "box-border flex w-full flex-col items-start gap-5 self-stretch rounded-2xl border border-[#f5f6f7] bg-[#f9f9f9] p-3 transition-[border-color,box-shadow] duration-300",
              qualityId === "real-followers" &&
                "border-[#c5e8fc] shadow-[inset_0_0_0_1px_rgba(33,174,255,0.12)]",
              platformId !== "instagram" &&
                "shadow-[inset_0_0_0_1px_rgba(38,157,231,0.08)]",
            )}
          >
            <div className="flex w-full flex-col gap-2">
              <p className="text-base font-medium leading-[1.35] text-[#5b6477]">
                {content.serviceSelectLabel}
              </p>
              <Select
                value={selectedServiceProduct?.id ?? serviceProductId}
                onValueChange={(next) => {
                  if (next) setServiceProductId(next)
                }}
              >
                <SelectTrigger
                  className={SERVICE_PRODUCT_SELECT_TRIGGER_CLASS}
                  size="default"
                >
                  <SelectValue className="flex min-w-0 flex-1 items-center gap-2">
                    <span className="flex min-w-0 flex-1 items-center gap-2">
                      <PlatformIcon
                        icon={platform.icon}
                        size={24}
                        className="shrink-0"
                        spriteSrc={assets.socialIconsSprite}
                      />
                      <span className="truncate leading-[1.35]">
                        {selectedServiceProduct?.label}
                      </span>
                    </span>
                  </SelectValue>
                  <span
                    className="flex size-6 shrink-0 items-center justify-center p-1"
                    aria-hidden
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src={content.serviceSelectChevronSrc}
                      width={16}
                      height={16}
                      className="size-4 rotate-180"
                    />
                  </span>
                </SelectTrigger>
                <SelectContent align="start" className={SERVICE_PRODUCT_MENU_CLASS}>
                  {serviceProducts.map((product) => (
                    <SelectItem
                      key={product.id}
                      value={product.id}
                      className={SERVICE_PRODUCT_MENU_ITEM_CLASS}
                    >
                      <span className="flex items-center gap-2">
                        <PlatformIcon
                          icon={platform.icon}
                          size={24}
                          className="shrink-0"
                          spriteSrc={assets.socialIconsSprite}
                        />
                        {product.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <label className="box-border flex h-[52px] w-full min-w-[120px] shrink-0 items-center gap-2 self-stretch rounded-xl border border-[#21aeff] bg-white px-3 py-3 sm:h-[58px] sm:gap-2 sm:px-5 sm:py-4">
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
                className="min-w-0 flex-1 bg-transparent text-sm font-medium leading-[1.35] text-[#232323] placeholder:text-[#979ca8] outline-none sm:text-base"
                autoComplete="off"
                spellCheck={false}
              />
            </label>

            <div className="relative isolate flex w-full flex-col items-start gap-3 self-stretch overflow-visible pt-1 sm:min-h-[279px] sm:pt-0">
              {[0, 1, 2].map((rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex w-full items-start gap-2 overflow-visible sm:gap-3"
                >
                  {packagesForOrder
                    .slice(rowIndex * 3, rowIndex * 3 + 3)
                    .map((pkg) => (
                      <PackageCard
                        key={pkg.id}
                        pkg={pkg}
                        selected={pkg.id === packageId}
                        onSelect={() => setPackageId(pkg.id)}
                        showBadge
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-3 sm:gap-4">
            <div className="flex w-full flex-col items-stretch gap-3 md:flex-row md:items-start md:justify-center md:gap-4">
              <div className="flex min-h-[59px] w-full flex-col justify-center gap-0.5 md:w-[min(100%,200px)] md:shrink-0">
                <span className="text-sm font-medium leading-[1.35] text-[#343e56]">
                  Total price
                </span>
                <p className="line-clamp-1 text-xs font-normal text-[#798090]">
                  {qualityLabel} · {platform.label}
                </p>
                <div className="flex items-center gap-2 tabular-nums transition-opacity duration-200">
                  <span className="text-2xl font-semibold leading-[1.5] text-[#21aeff]">
                    {selectedPackage.price}
                  </span>
                  <span className="text-sm font-normal leading-[1.3] text-[#798090] line-through">
                    {selectedPackage.compareAtPrice}
                  </span>
                </div>
              </div>
              <LinkTo
                href={orderHref}
                onClick={handleNavigateToOrder}
                className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#269de7] px-4 py-3.5 text-sm font-medium leading-[1.35] text-white md:h-[59px] md:min-w-[120px] md:flex-1 md:py-4 md:pl-4 md:pr-3 md:text-base"
              >
                {ctaLabel}
              </LinkTo>
            </div>

            <p className="flex items-center justify-center gap-1 px-1 text-center text-xs font-medium leading-[1.35] text-[#5b6477] sm:text-sm">
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
