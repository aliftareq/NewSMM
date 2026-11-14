"use client"

import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"

type DashboardSidebarMenuTriggerProps = {
  onOpen: () => void
  className?: string
}

export function DashboardSidebarMenuTrigger({
  onOpen,
  className,
}: DashboardSidebarMenuTriggerProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open dashboard menu"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#dfe0e4] bg-white text-[#202020] transition-colors hover:bg-[#f5f6f7] lg:hidden",
        className,
      )}
    >
      <Menu className="size-5" strokeWidth={2} aria-hidden />
    </button>
  )
}