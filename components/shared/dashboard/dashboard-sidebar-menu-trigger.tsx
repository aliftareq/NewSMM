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
        "flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#269de7] bg-[#269de7] text-white shadow-[0px_4px_14px_rgba(38,157,231,0.4)] transition-[opacity,transform] hover:opacity-95 active:scale-[0.98] sm:size-11 lg:hidden",
        className,
      )}
    >
      <Menu className="size-5 sm:size-[22px]" strokeWidth={2.25} aria-hidden />
    </button>
  )
}