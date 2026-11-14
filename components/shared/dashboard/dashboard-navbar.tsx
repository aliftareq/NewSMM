"use client"

import { useMemo } from "react"

import {
  dashboardShellContent,
  resolveDashboardPageMeta,
} from "@/data/dashboard/shell"
import type { DashboardShellContent } from "@/types/dashboard/shell"
import { DashboardAccountMenu } from "@/components/shared/dashboard/dashboard-account-menu"
import { DashboardSidebarMenuTrigger } from "@/components/shared/dashboard/dashboard-sidebar-menu-trigger"
import { LinkTo } from "@/components/shared/link-to"
import { cn } from "@/lib/utils"

function formatDashboardDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

type DashboardNavbarProps = {
  activePath: string
  content?: DashboardShellContent
  userAvatarSrc?: string
  className?: string
  onOpenSidebar?: () => void
}

function MetaDivider({
  src,
  className,
}: {
  src: string
  className?: string
}) {
  return (
    <span
      className={cn(
        "flex h-[15px] w-px shrink-0 items-center justify-center",
        className,
      )}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={src} className="block h-px w-[15px] max-w-none rotate-90" />
    </span>
  )
}

/** Figma 25704:13905 */
export function DashboardNavbar({
  activePath,
  content = dashboardShellContent,
  userAvatarSrc,
  className,
  onOpenSidebar,
}: DashboardNavbarProps) {
  const pageMeta = useMemo(
    () => resolveDashboardPageMeta(activePath),
    [activePath],
  )
  const todayLabel = useMemo(() => formatDashboardDate(new Date()), [])
  const avatar = userAvatarSrc ?? content.assets.defaultUserAvatar

  return (
    <header
      className={cn(
        "relative z-20 flex min-h-[72px] w-full shrink-0 items-center justify-between gap-2 overflow-visible bg-white px-[max(1rem,calc(100vw*0.042))] py-3 sm:min-h-[88px] sm:gap-3 sm:px-6 sm:py-4 lg:min-h-[100px] lg:px-7 lg:py-5",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 lg:gap-[25px]">
        {onOpenSidebar ? (
          <DashboardSidebarMenuTrigger onOpen={onOpenSidebar} />
        ) : null}
        <div className="hidden items-center gap-[25px] lg:flex">
          <div className="rounded-lg border border-[#dfe0e4] px-4 py-2">
            <p className="text-sm font-medium leading-[1.35] text-[#202020]">
              {todayLabel}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={pageMeta.iconSrc}
              width={24}
              height={24}
              className="block size-6 shrink-0"
            />
            <p className="text-center text-xl font-medium leading-[1.3] text-[#21aeff]">
              {pageMeta.title}
            </p>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-5">
        <LinkTo
          href={content.cart.href}
          className="flex h-11 items-center rounded-lg border border-[#dfe0e4] bg-white py-1 pl-1 pr-2.5 sm:h-[52px] sm:rounded-xl sm:py-1.5 sm:pl-2 sm:pr-4 lg:h-[60px] lg:py-[7.5px]"
        >
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#269de7] p-0.5 sm:size-[40px] sm:rounded-xl lg:size-[45px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={content.assets.cartIcon}
                width={24}
                height={24}
                className="block size-5 shrink-0 sm:size-[22px] lg:size-6"
              />
            </span>
            <span className="hidden text-sm font-medium leading-[1.35] text-[#202020] sm:inline sm:text-base">
              {content.cart.label}
            </span>
          </div>
        </LinkTo>

        <MetaDivider
          src={content.assets.metaDivider}
          className="hidden sm:flex"
        />

        <button
          type="button"
          className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f5f6f7] sm:size-[52px] sm:rounded-2xl lg:size-[60px]"
          aria-label="Notifications"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={content.assets.notificationBell}
            width={24}
            height={24}
            className="block size-5 shrink-0 sm:size-[22px] lg:size-6"
          />
        </button>

        <MetaDivider
          src={content.assets.metaDivider}
          className="hidden sm:flex"
        />

        <DashboardAccountMenu
          avatarSrc={avatar}
          chevronSrc={content.assets.chevronDown}
        />
      </div>
    </header>
  )
}