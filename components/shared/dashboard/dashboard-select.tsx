"use client"

import type { ComponentProps, ReactNode } from "react"

import { SelectContent, SelectItem } from "@/components/ui/select"
import { cn } from "@/lib/utils"

/** Shared listbox styling for dashboard Select menus (brand #269de7 / #eaf6fd). */
export const DASHBOARD_SELECT_MENU_CLASS =
  "z-50 max-h-[240px] w-(--anchor-width) rounded-xl border border-[#ebecef] bg-white p-1.5 text-[#202020] shadow-[0px_8px_24px_rgba(38,157,231,0.14)] ring-0"

export const DASHBOARD_SELECT_MENU_ITEM_CLASS =
  "rounded-lg py-2.5 pr-8 pl-3 text-sm font-medium text-[#202020] data-highlighted:bg-[#eaf6fd] data-highlighted:text-button data-selected:bg-[#eaf6fd] data-selected:text-button focus:bg-[#eaf6fd] focus:text-button [&_[data-slot=select-item-indicator]_svg]:text-button"

export function DashboardSelectContent({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 8,
  ...props
}: ComponentProps<typeof SelectContent>) {
  return (
    <SelectContent
      side={side}
      align={align}
      sideOffset={sideOffset}
      className={cn(DASHBOARD_SELECT_MENU_CLASS, className)}
      {...props}
    />
  )
}

export function DashboardSelectItem({
  className,
  ...props
}: ComponentProps<typeof SelectItem>) {
  return (
    <SelectItem
      className={cn(DASHBOARD_SELECT_MENU_ITEM_CLASS, className)}
      {...props}
    />
  )
}

export function labelsBySelectId<T extends { id: string; label: string }>(
  items: T[],
): Record<string, string> {
  return Object.fromEntries(items.map((item) => [item.id, item.label]))
}

export function dashboardSelectValueLabel(
  value: string | null | undefined,
  labelsByValue: Record<string, string>,
  placeholder?: ReactNode,
): ReactNode {
  if (value == null || value === "") {
    return placeholder ?? ""
  }
  return labelsByValue[value] ?? value
}