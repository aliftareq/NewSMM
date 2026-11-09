"use client"

import type { CSSProperties } from "react"

import type {
  ServicesModalFeaturedService,
  ServicesModalGridService,
  ServicesModalPlatform,
  ServicesModalPlatformIcon,
  ServicesModalPlatformId,
} from "@/types/landing/services-modal"
import { servicesModalSpriteSrc } from "@/data/landing/services-modal"
import { LinkTo } from "@/components/shared/link-to"
import { AnimatedContent } from "@/components/shared/animated-content"
import {
  landingScrollRevealProps,
} from "@/components/shared/landing/landing-section-heading-reveal"
import { cn } from "@/lib/utils"

export const SERVICES_EXPLORER_BADGE_MOST_POPULAR =
  "/images/landing/services-modal/most-popular.svg"
export const SERVICES_EXPLORER_BADGE_BEST_SELLER =
  "/images/landing/services-modal/best-seller.svg"

const SERVICE_ARROW_BTN_CLASS = "service-explorer-arrow-btn"
const SERVICE_ARROW_BOX_BTN_CLASS = "service-explorer-arrow-btn--box"

const SERVICE_ARROW_BOX_HOVER_CLASS =
  "transition-[background-color,box-shadow,border-color] duration-200 hover:shadow-[0px_2px_6px_rgba(15,23,42,0.08)]"

type ServiceArrowLinkStyle = CSSProperties & {
  "--service-arrow-brand": string
}

function ServicesArrowIcon({
  color,
  size = 16,
  className,
}: {
  color: string
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block shrink-0", className)}
      aria-hidden
    >
      <path
        d="M13 3L3 13M13 12V3H4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PlatformIcon({
  icon,
  size = 32,
  className,
}: {
  icon: ServicesModalPlatformIcon
  size?: number
  className?: string
}) {
  const src = icon.kind === "sprite" ? servicesModalSpriteSrc : icon.src
  const crop = icon.cropClassName ?? "absolute inset-0 size-full max-w-none object-cover"

  return (
    <span
      className={cn("relative block shrink-0 overflow-hidden", className)}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={src} className={crop} />
    </span>
  )
}

export function ServiceArrowLink({
  href,
  borderColor,
  arrowColor,
  size = "md",
  className,
}: {
  href: string
  borderColor: string
  arrowColor: string
  size?: "md" | "sm"
  className?: string
}) {
  const dim = size === "sm" ? "size-7 rounded-[5.5px]" : "size-[41px] rounded-lg"
  const iconSize = size === "sm" ? 11 : 16

  return (
    <LinkTo
      href={href}
      className={cn(
        "flex shrink-0 items-center justify-center border border-solid bg-white",
        SERVICE_ARROW_BTN_CLASS,
        SERVICE_ARROW_BOX_BTN_CLASS,
        SERVICE_ARROW_BOX_HOVER_CLASS,
        dim,
        className
      )}
      style={
        {
          borderColor,
          "--service-arrow-brand": arrowColor,
        } as ServiceArrowLinkStyle
      }
      aria-label="Open service"
    >
      <ServicesArrowIcon
        color={arrowColor}
        size={iconSize}
        className={cn(
          "service-explorer-arrow-icon transition-[stroke] duration-200 [&_path]:transition-[stroke] [&_path]:duration-200",
          size === "sm" && "service-explorer-arrow-icon--sm",
        )}
      />
    </LinkTo>
  )
}

function PriceFrom({ price, color }: { price: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span className="text-sm leading-[1.3] text-n500">from</span>
      <span className="text-lg font-medium leading-normal" style={{ color }}>
        {price}
      </span>
    </span>
  )
}

function FeaturedServiceCard({
  service,
  platform,
}: {
  service: ServicesModalFeaturedService
  platform: ServicesModalPlatform
}) {
  const isPopular = service.badge === "most-popular"
  const border = isPopular
    ? platform.theme.featuredBorder
    : platform.theme.featuredSecondaryBorder
  const gradientFrom = isPopular
    ? platform.theme.featuredGradientFrom
    : platform.theme.featuredSecondaryGradientFrom
  const gradientTo = isPopular
    ? platform.theme.featuredGradientTo
    : platform.theme.featuredSecondaryGradientTo

  return (
    <div
      className="flex min-w-0 flex-1 flex-col rounded-2xl border border-solid px-5 py-7"
      style={{
        borderColor: border,
        backgroundImage: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      <div className="flex w-full flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2.5"
            style={{
              backgroundColor: isPopular
                ? platform.theme.badgePopularBg
                : platform.theme.badgeSellerBg,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={
                isPopular
                  ? SERVICES_EXPLORER_BADGE_MOST_POPULAR
                  : SERVICES_EXPLORER_BADGE_BEST_SELLER
              }
              width={20}
              height={20}
              className="block shrink-0"
            />
            <span
              className="text-sm leading-[1.3]"
              style={{
                color: isPopular
                  ? platform.theme.accentPrice
                  : platform.theme.badgeSellerText,
              }}
            >
              {isPopular ? "MOST POPULAR" : "BEST SELLER"}
            </span>
          </div>
          <ServiceArrowLink
            href={service.href}
            borderColor={border}
            arrowColor={platform.theme.accentText}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="relative block h-[37px] w-[35px] shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={service.iconSrc}
                className={cn(
                  "max-w-none",
                  service.iconCropClassName ?? "absolute inset-0 size-full object-contain"
                )}
              />
            </span>
            <div className="min-w-0">
              <p className="text-lg font-medium leading-normal text-[#0f172a]">
                {service.title}
              </p>
              <p className="text-sm leading-[1.3] text-n500">{service.description}</p>
            </div>
          </div>
          <PriceFrom price={service.priceFrom} color={platform.theme.accentPrice} />
        </div>
      </div>
    </div>
  )
}

function GridServiceCard({
  service,
  platform,
}: {
  service: ServicesModalGridService
  platform: ServicesModalPlatform
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col rounded-2xl border border-[#ebecef] bg-[#f5f6f7] px-[18px] py-6">
      <div className="flex w-full flex-col gap-5">
        <span className="relative block h-[34px] w-[72px] max-w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={service.iconSrc}
            className="h-full w-auto max-w-none object-contain object-left"
          />
        </span>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-base font-medium leading-[1.35] text-[#0f172a]">
              {service.title}
            </p>
            <div className="mt-1">
              <PriceFrom price={service.priceFrom} color={platform.theme.accentPrice} />
            </div>
          </div>
          <ServiceArrowLink
            href={service.href}
            borderColor={platform.theme.gridArrowBorder}
            arrowColor={platform.theme.accentText}
            size="sm"
          />
        </div>
      </div>
    </div>
  )
}

export function PlatformSidebar({
  platforms,
  activeId,
  onSelect,
}: {
  platforms: ServicesModalPlatform[]
  activeId: ServicesModalPlatformId
  onSelect: (id: ServicesModalPlatformId) => void
}) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-3 lg:w-[235px]">
      {platforms.map((platform) => {
        const active = platform.id === activeId
        return (
          <button
            key={platform.id}
            type="button"
            onClick={() => onSelect(platform.id)}
            className={cn(
              "flex w-full flex-col justify-center rounded-xl p-4 text-left transition-shadow",
              active
                ? "text-white shadow-[0px_4px_4px_rgba(0,0,0,0.08)]"
                : "border border-[#ebecef] bg-white text-n700 hover:border-[#d8dce3]"
            )}
            style={
              active
                ? { backgroundColor: platform.theme.tabActiveBg }
                : undefined
            }
          >
            <span className="flex w-full items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <PlatformIcon icon={platform.icon} />
                <span className="text-base font-medium leading-[1.35]">{platform.label}</span>
              </span>
              <span
                className={cn(
                  "text-sm font-medium leading-[1.35]",
                  active ? "text-white" : "text-n700"
                )}
              >
                {String(platform.packageCount).padStart(2, "0")}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

/** Figma 25704:29241 — horizontal platform tabs in Explore All Services */
export function PlatformTabsRow({
  platforms,
  activeId,
  onSelect,
  tabLabels,
}: {
  platforms: ServicesModalPlatform[]
  activeId: ServicesModalPlatformId
  onSelect: (id: ServicesModalPlatformId) => void
  /** Optional display labels (e.g. TikTok vs Tik tok) keyed by platform id */
  tabLabels?: Partial<Record<ServicesModalPlatformId, string>>
}) {
  return (
    <div className="-mx-1 grid grid-cols-2 gap-3 px-1 pb-1 xl:grid-cols-8">
      {platforms.map((platform) => {
        const active = platform.id === activeId
        const label = tabLabels?.[platform.id] ?? platform.label
        return (
          <button
            key={platform.id}
            type="button"
            onClick={() => onSelect(platform.id)}
            className={cn(
              "flex w-full min-w-0 flex-col items-center justify-center rounded-xl p-3 transition-shadow xl:min-w-0 xl:p-4",
              active
                ? "text-white shadow-[0px_4px_4px_rgba(0,0,0,0.08)]"
                : "border border-[#ebecef] bg-white text-n700 hover:border-[#d8dce3]"
            )}
            style={
              active
                ? { backgroundColor: platform.theme.tabActiveBg }
                : undefined
            }
          >
            <span className="flex items-center gap-2 whitespace-nowrap">
              <PlatformIcon icon={platform.icon} />
              <span className="text-base font-medium leading-[1.35]">{label}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function ServicesPanel({
  platform,
  enableScrollReveal = true,
  onScrollRevealComplete,
}: {
  platform: ServicesModalPlatform
  enableScrollReveal?: boolean
  onScrollRevealComplete?: () => void
}) {
  const headerIcon = platform.headerIcon ?? platform.icon
  const reveal = landingScrollRevealProps

  const wrap = (
    className: string,
    content: React.ReactNode,
    options?: { delay?: number; stagger?: number; onComplete?: () => void },
  ) => {
    if (!enableScrollReveal) {
      return <div className={className}>{content}</div>
    }
    return (
      <AnimatedContent
        className={className}
        {...reveal}
        stagger={options?.stagger ?? reveal.stagger}
        delay={options?.delay ?? 0}
        onComplete={options?.onComplete}
      >
        {content}
      </AnimatedContent>
    )
  }

  const headerInner = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <PlatformIcon icon={headerIcon} size={37} />
        <div>
          <h3 className="text-xl font-semibold leading-[1.35] text-[#0f172a]">
            {platform.label} Services
          </h3>
          <p className="text-sm leading-[1.3] text-n500">{platform.subtitle}</p>
        </div>
      </div>
      <LinkTo
        href={platform.allServicesHref}
        className={cn(
          "relative inline-flex h-[49px] shrink-0 items-center justify-center gap-3 rounded-2xl px-6 py-1.5 shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04)] transition-[box-shadow] duration-200 hover:shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04),0px_2px_8px_rgba(15,23,42,0.08)]",
          SERVICE_ARROW_BTN_CLASS,
        )}
        style={{ backgroundColor: platform.theme.allButtonBg }}
      >
        <span
          className="text-sm font-semibold leading-normal"
          style={{ color: platform.theme.allButtonText }}
        >
          {platform.allServicesLabel}
        </span>
        <ServicesArrowIcon
          color={platform.theme.allButtonText}
          className="service-explorer-arrow-icon"
        />
      </LinkTo>
    </div>
  )

  const completeOnLast = enableScrollReveal ? onScrollRevealComplete : undefined

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6">
      {wrap("w-full", headerInner, { stagger: 0, delay: 0.05 })}

      {platform.featured?.length
        ? wrap(
            "flex w-full flex-col gap-4 xl:flex-row",
            platform.featured.map((service) => (
              <FeaturedServiceCard
                key={service.id}
                service={service}
                platform={platform}
              />
            )),
            { delay: 0.1 },
          )
        : null}

      {platform.grid?.length ? (
        <div className="flex flex-col gap-4">
          {wrap(
            "grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
            platform.grid.slice(0, 4).map((service) => (
              <GridServiceCard key={service.id} service={service} platform={platform} />
            )),
            { delay: 0.14 },
          )}
          {wrap(
            "grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
            platform.grid.slice(4).map((service) => (
              <GridServiceCard key={service.id} service={service} platform={platform} />
            )),
            { delay: 0.18, onComplete: completeOnLast },
          )}
        </div>
      ) : (
        wrap(
          "w-full",
          <div className="rounded-2xl border border-[#ebecef] bg-[#f5f6f7] px-6 py-10 text-center">
            <p className="text-base font-medium text-[#0f172a]">
              Browse all {platform.label} packages
            </p>
            <p className="mt-2 text-sm text-n500">
              Full service lineup is available on the platform page.
            </p>
            <LinkTo
              href={platform.allServicesHref}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-button px-5 py-3 text-sm font-semibold text-white"
            >
              {platform.allServicesLabel}
            </LinkTo>
          </div>,
          { delay: 0.1, stagger: 0, onComplete: completeOnLast },
        )
      )}
    </div>
  )
}
