"use client"

import { useState } from "react"

import { ServiceOrderWidgetSuspense } from "@/components/shared/service/service-order-widget-suspense"
import { PlatformIcon } from "@/components/shared/landing/services-explorer/services-explorer-ui"
import {
  dashboardNewOrderContent,
  dashboardOrderWidgetContent,
} from "@/data/dashboard/new-order"
import { serviceHeroContent } from "@/data/service/hero"
import { getPlatformThemeById } from "@/lib/services-platform-theme"
import { cn } from "@/lib/utils"

const PLATFORM_RAIL_GAP = "gap-3"

/** Figma 25704:13937 — single dashboard content card (platform rail + order form) */
export function DashboardNewOrderCard() {
  const [platformId, setPlatformId] = useState(
    dashboardOrderWidgetContent.defaultPlatformId,
  )
  const spriteSrc = serviceHeroContent.assets.socialIconsSprite

  return (
    <article className="w-full min-w-0 rounded-[24px] border border-[#ebecef] bg-white">
      <div className="flex w-full min-w-0 flex-col lg:flex-row lg:items-stretch">
        <aside className="box-border hidden shrink-0 p-[18px] lg:block lg:w-[316px]">
          <nav
            aria-label="Social platforms"
            className={cn("flex w-full flex-col", PLATFORM_RAIL_GAP)}
          >
            {dashboardOrderWidgetContent.platforms.map((item) => (
              <PlatformRailButton
                key={item.id}
                platformId={item.id}
                active={item.id === platformId}
                label={item.label}
                icon={item.icon}
                spriteSrc={spriteSrc}
                onSelect={() => setPlatformId(item.id)}
              />
            ))}
          </nav>
        </aside>

        <div
          className="hidden w-px shrink-0 self-stretch bg-[#ebecef] lg:block"
          aria-hidden
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <nav
            aria-label="Social platforms"
            className="flex gap-2 overflow-x-auto border-b border-[#f5f6f7] p-4 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {dashboardOrderWidgetContent.platforms.map((item) => (
              <PlatformRailButton
                key={item.id}
                platformId={item.id}
                active={item.id === platformId}
                label={item.label}
                icon={item.icon}
                spriteSrc={spriteSrc}
                compact
                onSelect={() => setPlatformId(item.id)}
              />
            ))}
          </nav>

          <div className="w-full min-w-0 px-4 py-6 sm:px-5 lg:px-4 lg:py-6">
            <ServiceOrderWidgetSuspense
              content={dashboardOrderWidgetContent}
              className="mx-0 w-full max-w-none rounded-none border-0 bg-transparent shadow-none"
              shellPadding={false}
              hideQualityTabs
              hidePlatformTabs
              platformId={platformId}
              onPlatformIdChange={setPlatformId}
              serviceSelectAbovePanel
              showPackageBadges={false}
              showOrderFooterMeta={false}
              showSecureCheckoutNote={false}
              forceNewDraftGroup
              appendNewOrderQuery
              assets={{
                orderDividerLine: serviceHeroContent.assets.orderDividerLine,
                secureLockIcon: serviceHeroContent.assets.secureLockIcon,
                socialIconsSprite: spriteSrc,
              }}
            />
          </div>
        </div>
      </div>
    </article>
  )
}

function PlatformRailButton({
  platformId,
  active,
  label,
  icon,
  spriteSrc,
  onSelect,
  compact,
}: {
  platformId: string
  active: boolean
  label: string
  icon: (typeof dashboardOrderWidgetContent.platforms)[number]["icon"]
  spriteSrc: string
  onSelect: () => void
  compact?: boolean
}) {
  const themeById = getPlatformThemeById(platformId)

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex items-center gap-2 rounded-2xl text-left transition-colors",
        compact
          ? "shrink-0 px-3 py-2.5 text-sm"
          : "w-full p-4 text-base font-medium leading-[1.35]",
        active
          ? "bg-[#269de7] text-white shadow-[0px_4px_4px_rgba(0,0,0,0.08)]"
          : "bg-white text-[#222e48] hover:bg-[#f5f6f7]",
      )}
      style={active ? { backgroundColor: themeById.tabActiveBg } : undefined}
    >
      <PlatformIcon
        icon={icon}
        size={compact ? 24 : 32}
        spriteSrc={spriteSrc}
      />
      <span className={cn(!compact && "font-medium")}>{label}</span>
    </button>
  )
}