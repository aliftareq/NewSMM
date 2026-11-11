"use client"

import {
  formatUserAccountTeamLabel,
  userAccountNavContent,
} from "@/app/(auth)/_data/user-account-nav"
import type { UserAccountNavContent } from "@/app/(auth)/_types/user-account-nav"
import { LinkTo } from "@/components/shared/link-to"
import { cn } from "@/lib/utils"

const SELECTED_PACKAGE_BG =
  "linear-gradient(121.78deg, rgba(0, 135, 212, 0.16) 2.53%, rgba(50, 180, 255, 0.16) 61.03%, rgba(7, 149, 231, 0.14) 91.98%)"

const NAV_ROW_HOVER_CLASS =
  "transition-colors hover:bg-[#269de7]/20"
const LOGOUT_ROW_HOVER_CLASS = "transition-colors hover:bg-[#fff5f5]"

type UserAccountNavPanelProps = {
  displayName: string
  email: string
  content?: UserAccountNavContent
  onLogout: () => void
  onNavigate?: () => void
  onAddFunds?: () => void
  className?: string
}

function NavDivider({ src }: { src: string }) {
  return (
    <div className="relative h-px w-full shrink-0" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={src} className="block h-px w-full max-w-none" />
    </div>
  )
}

/** Figma 25704:32233 — account navigation flyout */
export function UserAccountNavPanel({
  displayName,
  email,
  content = userAccountNavContent,
  onLogout,
  onNavigate,
  onAddFunds,
  className,
}: UserAccountNavPanelProps) {
  const teamLabel = formatUserAccountTeamLabel(displayName)

  const iconShellClass =
    "flex size-8 shrink-0 items-center justify-center rounded-full p-1"
  const rowIconClass = "block size-4 shrink-0 object-contain"

  return (
    <div
      role="menu"
      className={cn(
        "flex w-[min(292px,calc(100vw-2rem))] flex-col gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-[0px_6px_10px_rgba(0,0,0,0.12)] sm:w-[min(308px,calc(100vw-2rem))] sm:gap-3.5 sm:px-4 sm:py-4",
        className,
      )}
    >
      <div className="flex w-full shrink-0 items-center gap-2.5 rounded-xl border border-[rgba(137,137,137,0.09)] bg-[rgba(244,244,244,0.55)] py-2 pl-3 pr-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#21aeff] p-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={content.assets.avatarHeader}
            width={16}
            height={16}
            className="block size-4"
          />
        </span>
        <div className="flex min-w-0 flex-col text-left">
          <p className="truncate text-sm font-medium leading-[1.3] text-[#13203b] sm:text-[15px]">
            {teamLabel}
          </p>
          <p className="truncate text-xs font-medium leading-[1.4] text-[#4f586d] sm:text-sm">
            {email}
          </p>
        </div>
      </div>

      <NavDivider src={content.assets.divider} />

      <div className="flex w-full flex-col gap-3 sm:gap-3.5">
        <div
          className="flex w-full shrink-0 items-center justify-between rounded-xl border border-[rgba(33,174,255,0.4)] px-3 py-2 sm:py-2.5"
          style={{ backgroundImage: SELECTED_PACKAGE_BG }}
        >
          <div className="flex flex-col gap-0.5 text-left">
            <p className="text-xs font-medium leading-[1.35] text-[#5b6477] sm:text-sm">
              {content.balanceLabel}
            </p>
            <p className="text-sm font-semibold leading-[1.3] text-[#222e48] sm:text-base">
              {content.defaultBalance}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onAddFunds?.()
            }}
            className="flex h-8 shrink-0 items-center justify-center gap-0.5 rounded-lg border border-[#21aeff] bg-white py-1 pl-1.5 pr-2 text-xs font-medium leading-[1.35] text-[#21aeff] sm:h-9 sm:pl-2 sm:pr-2.5 sm:text-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={content.assets.addFundsPlus}
              width={14}
              height={14}
              className="block size-3.5 sm:size-4"
            />
            {content.addFundsLabel}
          </button>
        </div>

        <div className="flex w-full flex-col gap-0.5">
          {content.items.map((item) =>
            item.variant === "primary" ? (
              <LinkTo
                key={item.id}
                href={item.href}
                role="menuitem"
                onClick={onNavigate}
                className="flex w-full items-center gap-2.5 overflow-hidden rounded-lg bg-[#269de7] px-3 py-1.5 sm:py-2"
              >
                <span
                  className={cn(iconShellClass, "bg-[#f7f8f9]")}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={item.iconSrc}
                    width={16}
                    height={16}
                    className={rowIconClass}
                  />
                </span>
                <span className="text-sm font-medium leading-[1.35] text-white">
                  {item.label}
                </span>
              </LinkTo>
            ) : (
              <LinkTo
                key={item.id}
                href={item.href}
                role="menuitem"
                onClick={onNavigate}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 sm:px-2.5",
                  NAV_ROW_HOVER_CLASS,
                )}
              >
                <span className={cn(iconShellClass, "bg-[#f7f8f9]")}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={item.iconSrc}
                    width={16}
                    height={16}
                    className={rowIconClass}
                  />
                </span>
                <span className="text-sm font-medium leading-[1.35] text-[#404040]">
                  {item.label}
                </span>
              </LinkTo>
            ),
          )}

          <NavDivider src={content.assets.divider} />

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onNavigate?.()
              onLogout()
            }}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left sm:px-2.5",
              LOGOUT_ROW_HOVER_CLASS,
            )}
          >
            <span className={cn(iconShellClass, "bg-[#ff4d4d]")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={content.assets.logout}
                width={16}
                height={16}
                className={rowIconClass}
              />
            </span>
            <span className="text-sm font-medium leading-[1.35] text-[#ff4d4d]">
              {content.logOutLabel}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
