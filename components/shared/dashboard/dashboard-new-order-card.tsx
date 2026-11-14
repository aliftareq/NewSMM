"use client"

import { useState } from "react"

import { ServiceOrderWidgetSuspense } from "@/components/shared/service/service-order-widget-suspense"
import {
  PlatformIcon,
} from "@/components/shared/landing/services-explorer/services-explorer-ui"
import {
  dashboardNewOrderContent,
  dashboardOrderWidgetContent,
} from "@/data/dashboard/new-order"
import { serviceHeroContent } from "@/data/service/hero"
import { getPlatformThemeById } from "@/lib/services-platform-theme"
import { cn } from "@/lib/utils"

/** Figma 25704:13937 — dashboard new order card */
export function DashboardNewOrderCard() {
  const [platformId, setPlatformId] = useState(
    dashboardOrderWidgetContent.defaultPlatformId,
  )
  const spriteSrc = serviceHeroContent.assets.socialIconsSprite
  const { columnDivider } = dashboardNewOrderContent.assets

  return (
    <div className="flex w-full min-w-0 items-stretch justify-center rounded-[24px] border border-[#ebecef] bg-white">
      <aside className="box-border hidden w-[316px] shrink-0 self-stretch p-[18px] lg:block">
        <nav
          aria-label="Social platforms"
          className="flex flex-col gap-3"
        >
          {dashboardOrderWidgetContent.platforms.map((item) => {
            const active = item.id === platformId
            const theme = getPlatformThemeById(item.id)

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPlatformId(item.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-2xl p-4 text-left transition-colors",
                  active
                    ? "bg-[#269de7] text-white shadow-[0px_4px_4px_rgba(0,0,0,0.08)]"
                    : "bg-white text-[#222e48] hover:bg-[#f5f6f7]",
                )}
                style={
                  active
                    ? { backgroundColor: theme.tabActiveBg }
                    : undefined
                }
              >
                <PlatformIcon
                  icon={item.icon}
                  size={32}
                  spriteSrc={spriteSrc}
                />
                <span className="text-base font-medium leading-[1.35]">
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>
      </aside>

      <div
        className="hidden w-px shrink-0 self-stretch py-6 lg:flex lg:items-stretch lg:justify-center"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={columnDivider}
          className="h-full w-px max-w-none rotate-90 object-none"
        />
      </div>

      <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:max-w-[750px] lg:py-6 lg:pl-4 lg:pr-6">
        <nav
          aria-label="Social platforms"
          className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {dashboardOrderWidgetContent.platforms.map((item) => {
            const active = item.id === platformId
            const theme = getPlatformThemeById(item.id)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPlatformId(item.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium",
                  active
                    ? "text-white shadow-[0px_4px_4px_rgba(0,0,0,0.08)]"
                    : "border border-[#ebecef] bg-white text-[#222e48]",
                )}
                style={
                  active ? { backgroundColor: theme.tabActiveBg } : undefined
                }
              >
                <PlatformIcon
                  icon={item.icon}
                  size={24}
                  spriteSrc={spriteSrc}
                />
                {item.label}
              </button>
            )
          })}
        </nav>

        <ServiceOrderWidgetSuspense
          content={dashboardOrderWidgetContent}
          className="mx-0 max-w-none rounded-none border-0 bg-transparent shadow-none"
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
  )
}