"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { UserAccountNavPanel } from "@/app/(auth)/_components/user-account-nav-panel"
import { cn } from "@/lib/utils"

type MarketingNavbarUserMenuProps = {
  displayName: string
  email: string
  avatarIconSrc: string
  chevronIconSrc: string
  onLogout: () => void
  /** Desktop pill in the header bar; drawer fills mobile menu width. */
  placement?: "navbar" | "drawer"
  className?: string
}

const HOVER_CLOSE_DELAY_MS = 120

/** Figma 25687:8096 trigger + 25704:32233 panel */
export function MarketingNavbarUserMenu({
  displayName,
  email,
  avatarIconSrc,
  chevronIconSrc,
  onLogout,
  placement = "navbar",
  className,
}: MarketingNavbarUserMenuProps) {
  const [pinned, setPinned] = useState(false)
  const [hovered, setHovered] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<number | null>(null)

  const isDrawer = placement === "drawer"
  const open = isDrawer ? pinned : pinned || hovered

  const cancelCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const scheduleHoverClose = useCallback(() => {
    if (pinned) return
    cancelCloseTimer()
    closeTimerRef.current = window.setTimeout(() => {
      setHovered(false)
    }, HOVER_CLOSE_DELAY_MS)
  }, [cancelCloseTimer, pinned])

  const closeAll = useCallback(() => {
    cancelCloseTimer()
    setPinned(false)
    setHovered(false)
  }, [cancelCloseTimer])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeAll()
      }
    }
    window.addEventListener("mousedown", onPointerDown)
    return () => window.removeEventListener("mousedown", onPointerDown)
  }, [closeAll, open])

  const handleTriggerClick = () => {
    cancelCloseTimer()
    setPinned((value) => {
      const next = !value
      if (next) setHovered(true)
      return next
    })
  }

  const handlePanelNavigate = () => {
    closeAll()
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative",
        isDrawer ? "w-full" : "hidden shrink-0 lg:block",
        className,
      )}
      onMouseEnter={() => {
        if (isDrawer) return
        cancelCloseTimer()
        setHovered(true)
      }}
      onMouseLeave={() => {
        if (isDrawer) return
        scheduleHoverClose()
      }}
    >
      <button
        type="button"
        onClick={handleTriggerClick}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "relative flex h-12 items-center justify-center gap-1 rounded-xl bg-button py-1.5 shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04)]",
          isDrawer ? "w-full px-4" : "px-3",
        )}
      >
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white p-1"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={avatarIconSrc}
            width={16}
            height={16}
            className="block size-4 shrink-0"
          />
        </span>
        <span className="max-w-[min(140px,40vw)] truncate text-sm font-semibold leading-[1.5] text-white">
          {displayName}
        </span>
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-full p-1.5"
          aria-hidden
        >
          <span
            className={cn(
              "flex shrink-0 items-center justify-center transition-transform duration-200",
              open ? "rotate-0" : "rotate-180",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={chevronIconSrc}
              width={14}
              height={8}
              className="block h-[8px] w-[14px] shrink-0"
            />
          </span>
        </span>
      </button>

      {open ? (
        <div
          className={cn(
            "absolute z-[230]",
            isDrawer
              ? "left-0 right-0 top-[calc(100%+8px)]"
              : "right-0 top-[calc(100%+8px)]",
          )}
        >
          <UserAccountNavPanel
            displayName={displayName}
            email={email}
            onLogout={onLogout}
            onNavigate={handlePanelNavigate}
            className={isDrawer ? "w-full" : undefined}
          />
        </div>
      ) : null}
    </div>
  )
}
