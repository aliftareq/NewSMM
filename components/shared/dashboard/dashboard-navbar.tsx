"use client"

import { useMemo } from "react"

import {
  dashboardShellContent,
  resolveDashboardPageMeta,
} from "@/data/dashboard/shell"
import type { DashboardShellContent } from "@/types/dashboard/shell"
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

function MetaDivider({ src }: { src: string }) {
  return (
    <span
      className="flex h-[15px] w-px shrink-0 items-center justify-center"
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
        "flex min-h-[100px] w-full shrink-0 items-center justify-between gap-3 bg-white px-4 py-5 sm:px-7",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-[25px]">
        {onOpenSidebar ? (
          <DashboardSidebarMenuTrigger onOpen={onOpenSidebar} />
        ) : null}
        <div className="hidden rounded-lg border border-[#dfe0e4] px-4 py-2 sm:block">
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

      <div className="flex shrink-0 items-center gap-2 sm:gap-5">
        <LinkTo
          href={content.cart.href}
          className="flex h-[60px] items-center rounded-xl border border-[#dfe0e4] bg-white py-[7.5px] pl-2 pr-4"
        >
          <div className="flex items-center gap-1.5">
            <span className="flex size-[45px] shrink-0 items-center justify-center rounded-xl bg-[#269de7] p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={content.assets.cartIcon}
                width={24}
                height={24}
                className="block size-6 shrink-0"
              />
            </span>
            <span className="text-base font-medium leading-[1.35] text-[#202020]">
              {content.cart.label}
            </span>
          </div>
        </LinkTo>

        <MetaDivider src={content.assets.metaDivider} />

        <button
          type="button"
          className="relative flex size-[60px] shrink-0 items-center justify-center rounded-2xl bg-[#f5f6f7]"
          aria-label="Notifications"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={content.assets.notificationBell}
            width={24}
            height={24}
            className="block size-6 shrink-0"
          />
          <span
            className="absolute right-[18px] top-[18px] size-1.5 rounded-full bg-[#ff0013]"
            aria-hidden
          />
        </button>

        <MetaDivider src={content.assets.metaDivider} />

        <button
          type="button"
          className="flex h-[60px] items-center rounded-xl border border-[#dfe0e4] bg-white p-[7.5px]"
          aria-label="Account menu"
        >
          <div className="flex items-center gap-1.5">
            <span className="relative block size-[45px] shrink-0 overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={avatar}
                width={45}
                height={45}
                className="block size-full object-cover"
              />
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={content.assets.chevronDown}
              width={18}
              height={36}
              className="h-[18px] w-2 shrink-0 -scale-y-100 rotate-90"
            />
          </div>
        </button>
      </div>
    </header>
  )
}