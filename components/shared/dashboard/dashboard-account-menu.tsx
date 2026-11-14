"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { dashboardAccountMenuContent } from "@/data/dashboard/account-menu"
import type { DashboardAccountMenuContent } from "@/types/dashboard/account-menu"
import { LinkTo } from "@/components/shared/link-to"
import { cn } from "@/lib/utils"

type DashboardAccountMenuProps = {
  avatarSrc: string
  chevronSrc: string
  content?: DashboardAccountMenuContent
  className?: string
}

/** Figma 25749:13366 — dashboard navbar account dropdown */
export function DashboardAccountMenu({
  avatarSrc,
  chevronSrc,
  content = dashboardAccountMenuContent,
  className,
}: DashboardAccountMenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close()
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    window.addEventListener("mousedown", onPointerDown)
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("mousedown", onPointerDown)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [close, open])

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "flex h-11 items-center rounded-lg border border-[#dfe0e4] bg-white p-1 transition-colors sm:h-[52px] sm:rounded-xl sm:p-1.5 lg:h-[60px] lg:p-[7.5px]",
          open && "border-[#c5e8fc] bg-[#fafafb]",
        )}
      >
        <span className="flex items-center gap-1 sm:gap-1.5">
          <span className="relative block size-9 shrink-0 overflow-hidden rounded-lg sm:size-[40px] sm:rounded-xl lg:size-[45px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={avatarSrc}
              width={45}
              height={45}
              className="block size-full object-cover"
            />
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={chevronSrc}
            width={18}
            height={36}
            className={cn(
              "hidden h-[18px] w-2 shrink-0 -scale-y-100 rotate-90 transition-transform sm:block",
              open && "rotate-[270deg]",
            )}
          />
        </span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[200px] rounded-xl border border-[#ebecef] bg-white p-3.5 shadow-[0px_8px_24px_rgba(39,83,132,0.14)]"
        >
          <div className="flex flex-col gap-2">
            <LinkTo
              href={content.settings.href}
              role="menuitem"
              onClick={close}
              className="flex h-14 w-full items-center gap-3 rounded-xl border border-[#ebecef] bg-[#ebecef] py-2 pl-3 pr-4 transition-colors hover:bg-[#e4e5e9]"
            >
              <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[6.8px] bg-[#f7f8f9] p-[5.44px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={content.settings.iconSrc}
                  width={17}
                  height={17}
                  className="block size-[17px] shrink-0"
                />
              </span>
              <span className="text-sm font-medium leading-[1.35] text-[#404040]">
                {content.settings.label}
              </span>
            </LinkTo>

            <LinkTo
              href={content.logout.href}
              role="menuitem"
              onClick={close}
              className="flex h-14 w-full items-center gap-3 rounded-xl bg-white py-2 pl-2 pr-4 transition-colors hover:bg-[#fff5f5]"
            >
              <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[6.8px] bg-[#ffecec] p-[5.44px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={content.logout.iconSrc}
                  width={18}
                  height={18}
                  className="block size-[18px] shrink-0"
                />
              </span>
              <span className="text-sm font-medium leading-[1.35] text-[#ff4d4d]">
                {content.logout.label}
              </span>
            </LinkTo>
          </div>
        </div>
      ) : null}
    </div>
  )
}