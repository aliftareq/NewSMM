"use client"

import { usePathname } from "next/navigation"

import { DashboardNavbar } from "@/components/shared/dashboard/dashboard-navbar"
import { DashboardSidebar } from "@/components/shared/dashboard/dashboard-sidebar"
import { cn } from "@/lib/utils"

type DashboardShellProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Figma dashboard shell — sidebar (25704:13904) + top bar (25704:13905) on #F1F1F1.
 */
export function DashboardShell({ children, className }: DashboardShellProps) {
  const pathname = usePathname()

  return (
    <div className={cn("flex min-h-screen w-full bg-[#F1F1F1]", className)}>
      <DashboardSidebar activePath={pathname} className="min-h-screen" />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardNavbar activePath={pathname} />
        <main className="min-w-0 flex-1 px-8 pb-10 pt-6">{children}</main>
      </div>
    </div>
  )
}