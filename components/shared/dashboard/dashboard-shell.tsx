"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { DashboardAddFundsProvider } from "@/components/shared/dashboard/dashboard-add-funds-context"
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
 * Below `lg`, sidebar is a slide-in drawer opened from the navbar menu button.
 */
export function DashboardShell({ children, className }: DashboardShellProps) {
  const pathname = usePathname()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileSidebarOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileSidebarOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileSidebarOpen])

  return (
    <DashboardAddFundsProvider>
    <div
      className={cn(
        "flex h-screen w-full overflow-hidden bg-[#F1F1F1]",
        className,
      )}
    >
      <div className="hidden shrink-0 lg:flex">
        <DashboardSidebar activePath={pathname} />
      </div>

      {mobileSidebarOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-[#13203b]/45 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      ) : null}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex transition-transform duration-300 ease-out lg:hidden",
          mobileSidebarOpen
            ? "translate-x-0"
            : "pointer-events-none -translate-x-full",
        )}
        role="dialog"
        aria-modal={mobileSidebarOpen}
        aria-hidden={!mobileSidebarOpen}
      >
        <DashboardSidebar
          activePath={pathname}
          onNavigate={() => setMobileSidebarOpen(false)}
        />
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardNavbar
          activePath={pathname}
          onOpenSidebar={() => setMobileSidebarOpen(true)}
          className="z-10 shrink-0 border-b border-[#ebecef]"
        />
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain px-[max(1rem,calc(100vw*0.042))] pb-8 pt-4 sm:pb-10 sm:pt-6 lg:px-8">
          <DashboardMainContent>{children}</DashboardMainContent>
        </main>
      </div>
    </div>
    </DashboardAddFundsProvider>
  )
}