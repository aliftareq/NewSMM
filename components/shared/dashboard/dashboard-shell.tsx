"use client"

import { usePathname } from "next/navigation"

import { DashboardMainContent } from "@/components/shared/dashboard/dashboard-main-content"
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
    <div
      className={cn(
        "flex h-screen w-full overflow-hidden bg-[#F1F1F1]",
        className,
      )}
    >
      <DashboardSidebar activePath={pathname} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardNavbar
          activePath={pathname}
          className="z-10 shrink-0 border-b border-[#ebecef]"
        />
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <DashboardMainContent>{children}</DashboardMainContent>
        </main>
      </div>
    </div>
  )
}